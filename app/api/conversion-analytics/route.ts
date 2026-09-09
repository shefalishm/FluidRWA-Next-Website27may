import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type LeadRow = {
  created_at?: string;
  status?: string;
  vendor_name?: string | null;
  vendor_category?: string | null;
  request_source?: string | null;
  page_url?: string | null;
  lead_source?: string | null;
  raw_payload?: Record<string, unknown> | null;
};

const excludedBuyerSources = new Set([
  "contact-general",
  "contact-vendor",
  "submit-project-listing",
  "vendor-membership",
  "vendor-waitlist"
]);

function isBuyerSource(value: unknown) {
  const source = clean(value).toLowerCase();
  if (excludedBuyerSources.has(source)) return false;
  if (source.includes("vendor-review") || source.includes("membership") || source.includes("apply-as-vendor")) return false;
  if (/(^|[-_ ])(qa|test|smoke)([-_ ]|$)/.test(source)) return false;
  return true;
}

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function authorized(request: NextRequest) {
  const expected = process.env.ANALYTICS_DASHBOARD_KEY || "";
  const supplied = (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (!expected || !supplied) return false;
  const expectedBuffer = Buffer.from(expected);
  const suppliedBuffer = Buffer.from(supplied);
  return expectedBuffer.length === suppliedBuffer.length && timingSafeEqual(expectedBuffer, suppliedBuffer);
}

function rawValue(row: LeadRow, key: string) {
  return clean(row.raw_payload?.[key]);
}

function pathFromUrl(value: string) {
  if (!value) return "";
  try {
    return new URL(value, "https://www.fluidrwa.com").pathname;
  } catch {
    return value.startsWith("/") ? value : "";
  }
}

function safeOriginPath(value: string) {
  return value.startsWith("/") && !value.startsWith("//") ? value : "";
}

function sourceLabel(source: string) {
  const labels: Record<string, string> = {
    "buyer-guide": "Category buyer guide",
    "company-profile": "Vendor profile",
    "contact-project": "Contact page",
    "organic-category-page": "Vendor category",
    "submit-requirement": "Direct project brief",
    "tokenization-checklist": "Tokenization checklist",
    "vendor-card": "Vendor card",
    "vendor-card-contact": "Vendor card contact",
    "vendor-comparison-tool": "Comparison tool",
    "vendor-contact-modal": "Vendor contact form"
  };
  return labels[source] || source.replace(/[-_]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase()) || "Unattributed";
}

function classify(row: LeadRow) {
  const requestSource = clean(row.request_source) || "submit-requirement";
  const vendor = rawValue(row, "ATTRIBUTION_VENDOR_NAME") || clean(row.vendor_name);
  const category = rawValue(row, "ATTRIBUTION_VENDOR_CATEGORY") || clean(row.vendor_category) || "Unspecified";
  const originPath = safeOriginPath(rawValue(row, "ATTRIBUTION_ORIGIN_PATH")) || pathFromUrl(clean(row.page_url)) || "/submit-requirement";
  const originTitle = rawValue(row, "ATTRIBUTION_ORIGIN_TITLE");
  const isComparisonTool = requestSource === "vendor-comparison-tool";
  const profileVendor = vendor === "Vendor comparison shortlist" ? "" : vendor;
  return {
    createdAt: clean(row.created_at),
    status: clean(row.status) || "new",
    vendor: profileVendor,
    category,
    originPath,
    originTitle,
    source: requestSource,
    sourceLabel: sourceLabel(requestSource),
    vendorSpecific: Boolean(profileVendor) && !isComparisonTool
  };
}

function percentChange(current: number, previous: number) {
  if (!previous) return current ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}

export async function GET(request: NextRequest) {
  if (!process.env.ANALYTICS_DASHBOARD_KEY) {
    return NextResponse.json({ ok: false, message: "Analytics access has not been configured." }, { status: 503 });
  }
  if (!authorized(request)) {
    return NextResponse.json({ ok: false, message: "That analytics access key is not valid." }, { status: 401 });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json({ ok: false, message: "Supabase analytics is not configured." }, { status: 503 });
  }

  const days = Math.min(90, Math.max(7, Number(request.nextUrl.searchParams.get("days")) || 30));
  const now = new Date();
  const today = new Date(`${now.toISOString().slice(0, 10)}T00:00:00.000Z`);
  const currentStart = new Date(today.getTime() - (days - 1) * 86_400_000);
  const previousStart = new Date(currentStart.getTime() - days * 86_400_000);
  const query = new URLSearchParams({
    select: "created_at,status,vendor_name,vendor_category,request_source,page_url,lead_source,raw_payload",
    created_at: `gte.${previousStart.toISOString()}`,
    order: "created_at.desc",
    limit: "1000"
  });

  const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/vendor_intro_requests?${query}`, {
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`
    },
    cache: "no-store"
  });

  if (!response.ok) {
    console.error("conversion analytics query failed", await response.text());
    return NextResponse.json({ ok: false, message: "Conversion data could not be loaded." }, { status: 502 });
  }

  const rows = ((await response.json()) as LeadRow[])
    .filter((row) => isBuyerSource(row.request_source))
    .map(classify)
    .filter((row) => row.createdAt);
  const current = rows.filter((row) => new Date(row.createdAt) >= currentStart);
  const previous = rows.filter((row) => new Date(row.createdAt) < currentStart);

  const group = <T extends { name: string }>(items: T[]) =>
    [...new Map(items.map((item) => [item.name, item])).values()];

  const profiles = group(
    current
      .filter((row) => row.vendorSpecific)
      .map((row) => ({ name: row.vendor, category: row.category, count: 0, lastSubmittedAt: row.createdAt }))
  ).map((profile) => ({
    ...profile,
    count: current.filter((row) => row.vendor === profile.name).length,
    lastSubmittedAt: current.find((row) => row.vendor === profile.name)?.createdAt || profile.lastSubmittedAt
  })).sort((a, b) => b.count - a.count || b.lastSubmittedAt.localeCompare(a.lastSubmittedAt));

  const categoryNames = [...new Set(current.map((row) => row.category))];
  const categories = categoryNames.map((name) => {
    const matches = current.filter((row) => row.category === name);
    return {
      name,
      count: matches.length,
      vendorSpecific: matches.filter((row) => row.vendorSpecific).length,
      openBriefs: matches.filter((row) => !row.vendorSpecific).length
    };
  }).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

  const sourceNames = [...new Set(current.map((row) => row.source))];
  const sources = sourceNames.map((source) => ({
    name: sourceLabel(source),
    count: current.filter((row) => row.source === source).length
  })).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

  const daily = Array.from({ length: days }, (_, index) => {
    const date = new Date(currentStart.getTime() + index * 86_400_000).toISOString().slice(0, 10);
    return { date, count: current.filter((row) => row.createdAt.slice(0, 10) === date).length };
  });

  return NextResponse.json({
    ok: true,
    generatedAt: now.toISOString(),
    days,
    summary: {
      submissions: current.length,
      vendorIntros: current.filter((row) => row.vendorSpecific).length,
      openBriefs: current.filter((row) => !row.vendorSpecific).length,
      uniqueCategories: new Set(current.map((row) => row.category).filter((name) => name !== "Unspecified")).size,
      changePercent: percentChange(current.length, previous.length)
    },
    daily,
    profiles,
    categories,
    sources,
    recent: current.slice(0, 30).map((row) => ({
      createdAt: row.createdAt,
      status: row.status,
      vendor: row.vendor,
      category: row.category,
      originPath: row.originPath,
      originTitle: row.originTitle,
      source: row.sourceLabel
    }))
  }, { headers: { "Cache-Control": "private, no-store" } });
}
