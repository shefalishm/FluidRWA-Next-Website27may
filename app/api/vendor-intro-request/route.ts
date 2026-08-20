import { NextResponse } from "next/server";
import { notifyFormSubmission } from "@/lib/emailNotifications";

export const runtime = "nodejs";

type VendorIntroPayload = {
  vendorName?: string;
  vendorCategory?: string;
  source?: string;
  requestSource?: string;
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
  paypalSubscriptionId?: string;
  payuTransactionId?: string;
  payuPaymentId?: string;
  payuAmount?: string;
  payuCurrency?: string;
  membershipPlan?: string;
  paymentProvider?: string;
  paymentStatus?: string;
  commercialIntent?: string;
  rawPayload?: Record<string, unknown>;
};

const requiredFields: Array<keyof VendorIntroPayload> = ["contactEmail", "firstName", "lastName", "companyName", "projectDescription"];
const minimumSubmissionMs = 1200;

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isLikelyAutomatedSubmission(payload: VendorIntroPayload) {
  const rawPayload = payload.rawPayload || {};
  const honeypot = clean(rawPayload.WEBSITE_URL || rawPayload.website_url || rawPayload.websiteUrl);
  if (honeypot) return true;

  const elapsedValue = Number(rawPayload.FORM_ELAPSED_MS || rawPayload.formElapsedMs || 0);
  if (Number.isFinite(elapsedValue) && elapsedValue > 0 && elapsedValue < minimumSubmissionMs) {
    return true;
  }

  return false;
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
    paypalSubscriptionId: field("PAYPAL_SUBSCRIPTION_ID"),
    payuTransactionId: field("PAYU_TRANSACTION_ID"),
    payuPaymentId: field("PAYU_PAYMENT_ID"),
    payuAmount: field("PAYU_AMOUNT"),
    payuCurrency: field("PAYU_CURRENCY"),
    membershipPlan: field("MEMBERSHIP_PLAN"),
    paymentProvider: field("PAYMENT_PROVIDER"),
    paymentStatus: field("PAYMENT_STATUS"),
    commercialIntent: field("COMMERCIAL_INTENT"),
    rawPayload: Object.fromEntries(formData.entries())
  };
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
    throw new Error(`Supabase insert failed for vendor_intro_requests: ${detail}`);
  }

  return { mode: "supabase" as const, data: await response.json() };
}

export async function POST(request: Request) {
  try {
    const payload = await parseRequest(request);
    const sourceValue = clean(payload.source) || clean(payload.requestSource) || "submit-requirement";
    const normalized: VendorIntroPayload = {
      vendorName: clean(payload.vendorName),
      vendorCategory: clean(payload.vendorCategory),
      source: sourceValue,
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
      paypalSubscriptionId: clean(payload.paypalSubscriptionId),
      payuTransactionId: clean(payload.payuTransactionId),
      payuPaymentId: clean(payload.payuPaymentId),
      payuAmount: clean(payload.payuAmount),
      payuCurrency: clean(payload.payuCurrency),
      membershipPlan: clean(payload.membershipPlan),
      paymentProvider: clean(payload.paymentProvider),
      paymentStatus: clean(payload.paymentStatus),
      commercialIntent: clean(payload.commercialIntent),
      rawPayload: payload.rawPayload || {}
    };
    if (!normalized.vendorName && normalized.source === "vendor-waitlist") {
      normalized.vendorName = normalized.companyName;
    }

    if (isLikelyAutomatedSubmission(normalized)) {
      return NextResponse.json({
        ok: true,
        mode: "filtered",
        message: "Your request has been received by FluidRWA."
      });
    }

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
      raw_payload: {
        ...(normalized.rawPayload || {}),
        paypalSubscriptionId: normalized.paypalSubscriptionId || null,
        payuTransactionId: normalized.payuTransactionId || null,
        payuPaymentId: normalized.payuPaymentId || null,
        payuAmount: normalized.payuAmount || null,
        payuCurrency: normalized.payuCurrency || null,
        membershipPlan: normalized.membershipPlan || null,
        paymentProvider: normalized.paymentProvider || null,
        paymentStatus: normalized.paymentStatus || null,
        commercialIntent: normalized.commercialIntent || null
      }
    };

    const insert = await insertSupabaseRow(row);
    const insertedRequest = Array.isArray(insert.data) ? insert.data[0] : null;
    const requestId = insertedRequest?.id || null;
    const notification = await notifyFormSubmission({
      requestId,
      source: row.request_source,
      firstName: row.first_name,
      lastName: row.last_name,
      contactEmail: row.contact_email,
      companyName: row.company_name,
      title: row.title,
      phone: row.phone,
      country: row.country,
      website: row.website,
      linkedin: row.linkedin,
      vendorName: row.vendor_name,
      vendorCategory: row.vendor_category,
      pageUrl: row.page_url,
      projectDescription: row.project_description,
      paypalSubscriptionId: normalized.paypalSubscriptionId,
      payuTransactionId: normalized.payuTransactionId,
      payuPaymentId: normalized.payuPaymentId,
      payuAmount: normalized.payuAmount,
      payuCurrency: normalized.payuCurrency,
      membershipPlan: normalized.membershipPlan,
      paymentProvider: normalized.paymentProvider,
      paymentStatus: normalized.paymentStatus
    });

    return NextResponse.json({
      ok: true,
      mode: "supabase",
      requestId,
      notification,
      message: "Your request has been received by FluidRWA."
    });
  } catch (error) {
    console.error("vendor intro request failed", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          "Your request could not be saved automatically. Please email contact@fluidrwa.com and we will review it manually."
      },
      { status: 500 }
    );
  }
}
