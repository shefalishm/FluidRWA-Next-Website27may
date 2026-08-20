import { NextResponse } from "next/server";
import { notifyFreelancerSubmission } from "@/lib/emailNotifications";
import { freelancerCategories, freelancerTags, type FreelancerCategory } from "@/lib/freelancerMarketplace";

export const runtime = "nodejs";

type FreelancerProfilePayload = {
  fullName?: string;
  contactEmail?: string;
  headline?: string;
  category?: string;
  location?: string;
  rate?: string;
  availability?: string;
  experience?: string;
  summary?: string;
  services?: string[];
  tags?: string[];
  portfolioUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  websiteUrl?: string;
  fileNames?: string[];
  consent?: boolean;
  source?: string;
  pageUrl?: string;
  startedAt?: number;
  websiteUrlTrap?: string;
};

const minimumSubmissionMs = 1200;

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function cleanList(values: unknown, fallback: string[] = []) {
  if (!Array.isArray(values)) return fallback;
  return values.map((value) => clean(value)).filter(Boolean).slice(0, 8);
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isCategory(value: string): value is FreelancerCategory {
  return freelancerCategories.includes(value as FreelancerCategory);
}

function isLikelyAutomatedSubmission(payload: FreelancerProfilePayload) {
  if (clean(payload.websiteUrlTrap)) return true;
  const startedAt = Number(payload.startedAt || 0);
  if (Number.isFinite(startedAt) && startedAt > 0 && Date.now() - startedAt < minimumSubmissionMs) return true;
  return false;
}

async function insertSupabaseRow(row: Record<string, unknown>) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return { mode: "preview" as const, data: null };
  }

  const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/freelancer_profiles`, {
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
    throw new Error(`Supabase insert failed for freelancer_profiles: ${detail}`);
  }

  return { mode: "supabase" as const, data: await response.json() };
}

export async function POST(request: Request) {
  try {
    let payload: FreelancerProfilePayload;
    try {
      payload = (await request.json()) as FreelancerProfilePayload;
    } catch {
      return NextResponse.json({ ok: false, message: "Please submit the freelancer profile form before sending." }, { status: 400 });
    }

    if (isLikelyAutomatedSubmission(payload)) {
      return NextResponse.json({
        ok: true,
        mode: "filtered",
        message: "Your profile has been received by FluidRWA."
      });
    }

    const category = clean(payload.category);
    const normalized = {
      fullName: clean(payload.fullName),
      contactEmail: clean(payload.contactEmail),
      headline: clean(payload.headline),
      category: isCategory(category) ? category : "Tokenization",
      location: clean(payload.location) || "Remote",
      rate: clean(payload.rate) || "Rate on request",
      availability: clean(payload.availability) || "Open to projects",
      experience: clean(payload.experience) || "Experience not listed",
      summary: clean(payload.summary),
      services: cleanList(payload.services, ["Portfolio review pending"]),
      tags: cleanList(payload.tags, ["RWA"]).filter((tag) => freelancerTags.includes(tag)).slice(0, 6),
      portfolioUrl: clean(payload.portfolioUrl),
      linkedinUrl: clean(payload.linkedinUrl),
      githubUrl: clean(payload.githubUrl),
      websiteUrl: clean(payload.websiteUrl),
      fileNames: cleanList(payload.fileNames),
      source: clean(payload.source) || "freelancer-preview",
      pageUrl: clean(payload.pageUrl)
    };

    const missingRequired =
      !normalized.fullName ||
      !isValidEmail(normalized.contactEmail) ||
      !normalized.headline ||
      !normalized.summary ||
      normalized.summary.length < 80 ||
      payload.consent !== true;

    if (missingRequired) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Please add your name, a valid email, headline, a useful profile summary and consent before submitting."
        },
        { status: 400 }
      );
    }

    const freeUntil = new Date();
    freeUntil.setMonth(freeUntil.getMonth() + 3);

    const row = {
      full_name: normalized.fullName,
      contact_email: normalized.contactEmail,
      headline: normalized.headline,
      category: normalized.category,
      location: normalized.location,
      rate: normalized.rate,
      availability: normalized.availability,
      years_experience: normalized.experience,
      summary: normalized.summary,
      services: normalized.services,
      tags: normalized.tags.length ? normalized.tags : ["RWA"],
      portfolio_url: normalized.portfolioUrl || null,
      linkedin_url: normalized.linkedinUrl || null,
      github_url: normalized.githubUrl || null,
      website_url: normalized.websiteUrl || null,
      uploaded_file_names: normalized.fileNames,
      free_until: freeUntil.toISOString(),
      status: "pending_review",
      payment_status: "free_trial",
      source: normalized.source,
      page_url: normalized.pageUrl || null,
      raw_payload: payload
    };

    let insert: Awaited<ReturnType<typeof insertSupabaseRow>> | { mode: "needs_schema"; data: null };
    let schemaWarning = "";

    try {
      insert = await insertSupabaseRow(row);
    } catch (error) {
      schemaWarning = error instanceof Error ? error.message : "Supabase freelancer profile table is not ready.";
      insert = { mode: "needs_schema", data: null };
    }

    const insertedProfile = Array.isArray(insert.data) ? insert.data[0] : null;
    const profileId = insertedProfile?.id || null;
    const notification = await notifyFreelancerSubmission({
      profileId,
      fullName: row.full_name,
      contactEmail: row.contact_email,
      headline: row.headline,
      category: row.category,
      location: row.location,
      rate: row.rate,
      availability: row.availability,
      experience: row.years_experience,
      services: row.services,
      tags: row.tags,
      portfolioUrl: row.portfolio_url,
      linkedinUrl: row.linkedin_url,
      githubUrl: row.github_url,
      websiteUrl: row.website_url,
      summary: row.summary,
      fileNames: row.uploaded_file_names,
      freeUntil: row.free_until
    });

    return NextResponse.json({
      ok: true,
      mode: insert.mode,
      profileId,
      notification,
      freeUntil: row.free_until,
      message:
        insert.mode === "supabase"
          ? "Your freelancer profile has been saved for FluidRWA review."
          : insert.mode === "needs_schema"
            ? "Preview profile captured locally. Supabase needs the freelancer_profiles table before this can save permanently."
            : "Preview profile received. Supabase is not configured in this environment.",
      schemaWarning: schemaWarning || undefined
    });
  } catch (error) {
    console.error("freelancer profile submission failed", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          "Your freelancer profile could not be saved automatically yet. FluidRWA needs the freelancer_profiles table created in Supabase first."
      },
      { status: 500 }
    );
  }
}
