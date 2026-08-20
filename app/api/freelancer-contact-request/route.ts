import { NextResponse } from "next/server";
import { escapeEmailHtml, notificationRecipient, sendNotificationEmail } from "@/lib/emailNotifications";

export const runtime = "nodejs";

type ContactPayload = {
  buyerName?: string;
  buyerEmail?: string;
  company?: string;
  project?: string;
  freelancerId?: string;
  freelancerName?: string;
  freelancerCategory?: string;
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

  const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/freelancer_intro_requests`, {
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

async function notifyIntroRequest(row: Record<string, unknown>) {
  const subject = `New FluidRWA specialist intro request - ${row.freelancer_name}`;
  const html = `
    <div style="font-family:Arial,sans-serif;color:#12213a;line-height:1.55">
      <h2>New FluidRWA specialist intro request</h2>
      <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;border:1px solid #dbe7f3;width:100%;max-width:760px">
        <tr><td><strong>Buyer</strong></td><td>${escapeEmailHtml(row.buyer_name)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escapeEmailHtml(row.buyer_email)}</td></tr>
        <tr><td><strong>Company</strong></td><td>${escapeEmailHtml(row.company)}</td></tr>
        <tr><td><strong>Freelancer</strong></td><td>${escapeEmailHtml(row.freelancer_name)}</td></tr>
        <tr><td><strong>Category</strong></td><td>${escapeEmailHtml(row.freelancer_category)}</td></tr>
        <tr><td><strong>Page</strong></td><td>${escapeEmailHtml(row.page_url)}</td></tr>
      </table>
      <h3>Project context</h3>
      <p style="white-space:pre-wrap">${escapeEmailHtml(row.project)}</p>
    </div>
  `;
  const text = [
    `Buyer: ${row.buyer_name || ""}`,
    `Email: ${row.buyer_email || ""}`,
    `Company: ${row.company || ""}`,
    `Freelancer: ${row.freelancer_name || ""}`,
    `Category: ${row.freelancer_category || ""}`,
    "",
    "Project:",
    `${row.project || ""}`
  ].join("\n");

  return sendNotificationEmail({ to: notificationRecipient(), subject, text, html });
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload;
    const buyerEmail = clean(payload.buyerEmail);
    const project = clean(payload.project);

    if (!isValidEmail(buyerEmail) || project.length < 20) {
      return NextResponse.json({ ok: false, message: "Please add a valid email and project context." }, { status: 400 });
    }

    const row = {
      buyer_name: clean(payload.buyerName) || null,
      buyer_email: buyerEmail,
      company: clean(payload.company) || null,
      project,
      freelancer_id: clean(payload.freelancerId) || null,
      freelancer_name: clean(payload.freelancerName) || null,
      freelancer_category: clean(payload.freelancerCategory) || null,
      source: clean(payload.source) || "freelancer-directory",
      page_url: clean(payload.pageUrl) || null,
      status: "new",
      raw_payload: payload
    };

    let mode: "supabase" | "preview" | "needs_schema" = "preview";
    try {
      const insert = await insertSupabaseRow(row);
      mode = insert.mode;
    } catch {
      mode = "needs_schema";
    }

    const notification = await notifyIntroRequest(row);

    return NextResponse.json({
      ok: true,
      mode,
      notification,
      message:
        mode === "supabase"
          ? "Intro request saved. FluidRWA will review it before making an introduction."
          : "Preview request captured. Supabase needs the intro request table before this persists permanently."
    });
  } catch {
    return NextResponse.json({ ok: false, message: "Could not save this intro request yet." }, { status: 500 });
  }
}
