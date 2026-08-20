import { NextResponse } from "next/server";
import { sendNotificationEmail, escapeEmailHtml, notificationRecipient } from "@/lib/emailNotifications";

export const runtime = "nodejs";

type WaitlistPayload = {
  name?: string;
  email?: string;
  company?: string;
  role?: string;
  authMethod?: string;
  source?: string;
  pageUrl?: string;
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function insertSupabaseRow(row: Record<string, unknown>) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return { mode: "preview" as const, data: null };
  }

  const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/freelancer_marketplace_waitlist`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation"
    },
    body: JSON.stringify(row)
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return { mode: "supabase" as const, data: await response.json() };
}

async function notifyWaitlist(row: Record<string, unknown>) {
  const subject = `New FluidRWA signup - ${row.email}`;
  const html = `
    <div style="font-family:Arial,sans-serif;color:#12213a;line-height:1.55">
      <h2>New FluidRWA signup</h2>
      <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;border:1px solid #dbe7f3;width:100%;max-width:720px">
        <tr><td><strong>Name</strong></td><td>${escapeEmailHtml(row.name)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escapeEmailHtml(row.email)}</td></tr>
        <tr><td><strong>Company</strong></td><td>${escapeEmailHtml(row.company)}</td></tr>
        <tr><td><strong>Role</strong></td><td>${escapeEmailHtml(row.role)}</td></tr>
        <tr><td><strong>Auth method</strong></td><td>${escapeEmailHtml(row.auth_method)}</td></tr>
        <tr><td><strong>Source</strong></td><td>${escapeEmailHtml(row.source)}</td></tr>
        <tr><td><strong>Page</strong></td><td>${escapeEmailHtml(row.page_url)}</td></tr>
      </table>
    </div>
  `;
  const text = [
    `Name: ${row.name || ""}`,
    `Email: ${row.email || ""}`,
    `Company: ${row.company || ""}`,
    `Role: ${row.role || ""}`,
    `Auth method: ${row.auth_method || ""}`,
    `Source: ${row.source || ""}`,
    `Page: ${row.page_url || ""}`
  ].join("\n");

  return sendNotificationEmail({ to: notificationRecipient(), subject, text, html });
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as WaitlistPayload;
    const email = clean(payload.email);

    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, message: "Please add a valid email." }, { status: 400 });
    }

    const row = {
      name: clean(payload.name) || null,
      email,
      company: clean(payload.company) || null,
      role: clean(payload.role) || "Unknown",
      auth_method: clean(payload.authMethod) || "email",
      source: clean(payload.source) || "freelancer-marketplace",
      page_url: clean(payload.pageUrl) || null,
      raw_payload: payload
    };

    let mode: "supabase" | "preview" | "needs_schema" = "preview";
    try {
      const insert = await insertSupabaseRow(row);
      mode = insert.mode;
    } catch {
      mode = "needs_schema";
    }

    const notification = await notifyWaitlist(row);

    return NextResponse.json({
      ok: true,
      mode,
      notification,
      message:
        mode === "supabase"
          ? "You are on the FluidRWA launch list."
          : "Preview saved. Supabase needs the waitlist table before this persists permanently."
    });
  } catch {
    return NextResponse.json({ ok: false, message: "Could not save this signup yet." }, { status: 500 });
  }
}
