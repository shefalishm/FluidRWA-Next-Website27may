import { NextResponse } from "next/server";

export const runtime = "nodejs";

type VendorIntroPayload = {
  vendorName?: string;
  vendorCategory?: string;
  source?: string;
  pageUrl?: string;
  leadSource?: string;
  contactEmail?: string;
  firstName?: string;
  lastName?: string;
  title?: string;
  companyName?: string;
  phone?: string;
  country?: string;
  website?: string;
  linkedin?: string;
  projectDescription?: string;
  rawPayload?: Record<string, unknown>;
};

const requiredFields: Array<keyof VendorIntroPayload> = ["contactEmail", "firstName", "lastName", "companyName", "projectDescription"];

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function parseRequest(request: Request): Promise<VendorIntroPayload> {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return (await request.json()) as VendorIntroPayload;
  }

  const formData = await request.formData();
  const field = (name: string) => clean(formData.get(name));
  const params = new URL(request.url).searchParams;

  return {
    vendorName: field("VENDOR_NAME") || params.get("vendor") || undefined,
    vendorCategory: field("VENDOR_CATEGORY") || params.get("category") || undefined,
    source: field("REQUEST_SOURCE") || params.get("source") || undefined,
    pageUrl: field("PAGE_URL") || undefined,
    leadSource: field("LEAD_SOURCE") || undefined,
    contactEmail: field("CONTACT_EMAIL"),
    firstName: field("FIRSTNAME"),
    lastName: field("LASTNAME"),
    title: field("TITLE"),
    companyName: field("COMPANYNAME"),
    phone: field("PHONE"),
    country: field("COUNTRY"),
    website: field("WEBSITE"),
    linkedin: field("LINKEDIN_HANDLE"),
    projectDescription: field("CONTACT_CF1"),
    rawPayload: Object.fromEntries(formData.entries())
  };
}

async function insertSupabaseRow(row: Record<string, unknown>) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return { mode: "preview" as const, data: null };
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
    throw new Error(`Supabase insert failed for vendor_intro_requests: ${detail}`);
  }

  return { mode: "supabase" as const, data: await response.json() };
}

export async function POST(request: Request) {
  try {
    const payload = await parseRequest(request);
    const normalized: VendorIntroPayload = {
      vendorName: clean(payload.vendorName),
      vendorCategory: clean(payload.vendorCategory),
      source: clean(payload.source) || "submit-requirement",
      pageUrl: clean(payload.pageUrl),
      leadSource: clean(payload.leadSource),
      contactEmail: clean(payload.contactEmail),
      firstName: clean(payload.firstName),
      lastName: clean(payload.lastName),
      title: clean(payload.title),
      companyName: clean(payload.companyName),
      phone: clean(payload.phone),
      country: clean(payload.country),
      website: clean(payload.website),
      linkedin: clean(payload.linkedin),
      projectDescription: clean(payload.projectDescription),
      rawPayload: payload.rawPayload || {}
    };

    const missing = requiredFields.filter((field) => !normalized[field]);
    if (missing.length > 0 || !isValidEmail(normalized.contactEmail || "")) {
      return NextResponse.json(
        {
          ok: false,
          message: "Please complete your name, email, company and project requirements before submitting."
        },
        { status: 400 }
      );
    }

    const row = {
      vendor_name: normalized.vendorName || null,
      vendor_category: normalized.vendorCategory || null,
      request_source: normalized.source || null,
      page_url: normalized.pageUrl || null,
      lead_source: normalized.leadSource || null,
      contact_email: normalized.contactEmail,
      first_name: normalized.firstName,
      last_name: normalized.lastName,
      title: normalized.title || null,
      company_name: normalized.companyName,
      phone: normalized.phone || null,
      country: normalized.country || null,
      website: normalized.website || null,
      linkedin: normalized.linkedin || null,
      project_description: normalized.projectDescription,
      status: "new",
      raw_payload: normalized.rawPayload
    };

    const insert = await insertSupabaseRow(row);
    const insertedRequest = Array.isArray(insert.data) ? insert.data[0] : null;

    return NextResponse.json({
      ok: true,
      mode: insert.mode,
      requestId: insertedRequest?.id || `preview-${Date.now()}`,
      message: "Your request has been received by FluidRWA."
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Your request could not be saved."
      },
      { status: 500 }
    );
  }
}
