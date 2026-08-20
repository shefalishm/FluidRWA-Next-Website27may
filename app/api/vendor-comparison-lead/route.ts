import { NextResponse } from "next/server";
import { notifyFormSubmission } from "@/lib/emailNotifications";

export const runtime = "nodejs";

type VendorLead = {
  name?: string;
  email?: string;
  company?: string;
  projectDescription?: string;
  pageUrl?: string;
  urls?: string[];
  recommendation?: string;
  vendors?: Array<{
    name?: string;
    url?: string;
    score?: number;
    fit?: string;
    summary?: string;
    strengths?: string[];
    watchouts?: string[];
  }>;
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function splitName(value: string) {
  const parts = value.split(/\s+/).filter(Boolean);
  if (!parts.length) return { firstName: "Comparison", lastName: "Lead" };
  if (parts.length === 1) return { firstName: parts[0], lastName: "Lead" };
  return { firstName: parts.slice(0, -1).join(" "), lastName: parts.at(-1) || "Lead" };
}

function buildProjectSummary(payload: Required<Pick<VendorLead, "urls">> & VendorLead) {
  const vendorLines = (payload.vendors || [])
    .map((vendor, index) => {
      const strengths = (vendor.strengths || []).slice(0, 3).join("; ");
      const watchouts = (vendor.watchouts || []).slice(0, 3).join("; ");
      return [
        `${index + 1}. ${vendor.name || vendor.url || "Vendor"}`,
        `URL: ${vendor.url || ""}`,
        `Score: ${vendor.score ?? ""}`,
        `Fit: ${vendor.fit || ""}`,
        `Summary: ${vendor.summary || ""}`,
        strengths ? `Strengths: ${strengths}` : "",
        watchouts ? `Watch-outs: ${watchouts}` : ""
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n\n");

  return [
    "Lead source: Vendor comparison tool",
    "",
    "Project context:",
    clean(payload.projectDescription) || "Not provided",
    "",
    "Compared vendor URLs:",
    payload.urls.join("\n"),
    "",
    "Tool recommendation:",
    clean(payload.recommendation) || "Not generated",
    "",
    "Vendor scoring:",
    vendorLines || "No result table attached"
  ].join("\n");
}

async function insertSupabaseRow(row: Record<string, unknown>) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Supabase lead capture is not configured.");
  }

  const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/vendor_intro_requests`, {
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
    const detail = await response.text();
    throw new Error(`Supabase insert failed for vendor comparison lead: ${detail}`);
  }

  return await response.json();
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as VendorLead;
    const email = clean(payload.email).toLowerCase();
    const name = clean(payload.name);
    const company = clean(payload.company) || "Not provided";
    const urls = Array.isArray(payload.urls) ? payload.urls.map(clean).filter(Boolean).slice(0, 5) : [];

    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, message: "Please add a valid work email." }, { status: 400 });
    }

    if (!urls.length) {
      return NextResponse.json({ ok: false, message: "Please add at least one vendor URL before submitting." }, { status: 400 });
    }

    const { firstName, lastName } = splitName(name);
    const projectDescription = buildProjectSummary({ ...payload, urls });
    const row = {
      vendor_name: "Vendor comparison shortlist",
      vendor_category: "Vendor comparison",
      request_source: "vendor-comparison-tool",
      page_url: clean(payload.pageUrl) || "/tools/vendor-comparison",
      lead_source: "tool-result-capture",
      contact_email: email,
      first_name: firstName,
      last_name: lastName,
      title: null,
      company_name: company,
      phone: null,
      country: null,
      website: urls[0] || null,
      linkedin: null,
      project_description: projectDescription,
      status: "new",
      raw_payload: {
        name,
        company,
        urls,
        recommendation: clean(payload.recommendation),
        vendors: payload.vendors || []
      }
    };

    const insertedRows = await insertSupabaseRow(row);
    const insertedRequest = Array.isArray(insertedRows) ? insertedRows[0] : null;
    const requestId = insertedRequest?.id || null;
    const notification = await notifyFormSubmission({
      requestId,
      source: row.request_source,
      firstName: row.first_name,
      lastName: row.last_name,
      contactEmail: row.contact_email,
      companyName: row.company_name,
      website: row.website,
      vendorName: row.vendor_name,
      vendorCategory: row.vendor_category,
      pageUrl: row.page_url,
      projectDescription: row.project_description
    });

    return NextResponse.json({
      ok: true,
      requestId,
      notification,
      message: "Got it. FluidRWA received this comparison request."
    });
  } catch (error) {
    console.error("vendor comparison lead failed", error);
    return NextResponse.json(
      {
        ok: false,
        message: "This could not be saved automatically. Please email contact@fluidrwa.com and we will review it manually."
      },
      { status: 500 }
    );
  }
}
