import { NextResponse } from "next/server";
import { assessTokenization, type AssessmentAnswers, type LeadDetails } from "@/lib/tokenizationAssessmentRules";

export const runtime = "nodejs";

type AssessmentRequest = {
  answers?: AssessmentAnswers;
  lead?: LeadDetails;
};

const requiredLeadFields: Array<keyof Omit<LeadDetails, "consent">> = ["name", "company", "email", "role", "country"];

function isValidLead(lead: AssessmentRequest["lead"]) {
  if (!lead || lead.consent !== true) return false;
  return requiredLeadFields.every((field) => typeof lead[field] === "string" && lead[field].trim().length > 1);
}

async function insertSupabaseRow(table: string, row: Record<string, unknown>) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return { mode: "preview" as const, data: null };
  }

  const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/${table}`, {
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
    throw new Error(`Supabase insert failed for ${table}: ${detail}`);
  }

  return { mode: "supabase" as const, data: await response.json() };
}

async function sendAssessmentNotification({
  assessmentId,
  lead,
  report,
  answers,
  budgetRange
}: {
  assessmentId: string;
  lead: LeadDetails;
  report: ReturnType<typeof assessTokenization>;
  answers: AssessmentAnswers;
  budgetRange: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ASSESSMENT_NOTIFICATION_FROM;
  const to = process.env.ASSESSMENT_NOTIFICATION_EMAIL || "contact@fluidrwa.com";

  if (!apiKey || !from || !to) {
    return { ok: false, skipped: true };
  }

  const subject = `New Tokenization Readiness Assessment - ${lead.company} - Score ${report.score}`;
  const lines = [
    `Assessment ID: ${assessmentId}`,
    `Name: ${lead.name}`,
    `Company: ${lead.company}`,
    `Email: ${lead.email}`,
    `Role: ${lead.role}`,
    `Country: ${lead.country}`,
    `Asset type: ${answers.assetType || "Not provided"}`,
    `Readiness score: ${report.score}/100`,
    `Classification: ${report.classification.label}`,
    `Complexity: ${report.complexityRating}`,
    `Budget range: ${budgetRange}`,
    `Timeline: ${report.timelineMonths}`,
    "",
    "Recommended vendor categories:",
    ...report.recommendations.map((item) => `- ${item.category}: ${item.reason}`),
    "",
    "Top gaps:",
    ...(report.gaps.length ? report.gaps.map((item) => `- ${item.question} (${item.answer})`) : ["- No major gaps captured"])
  ];

  const html = `
    <div style="font-family:Arial,sans-serif;color:#12213a;line-height:1.55">
      <h2 style="margin:0 0 12px">New FluidRWA tokenization assessment</h2>
      <p><strong>${lead.company}</strong> completed the Tokenization Readiness Assessment.</p>
      <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;border:1px solid #dbe7f3;width:100%;max-width:720px">
        <tbody>
          <tr><td><strong>Assessment ID</strong></td><td>${assessmentId}</td></tr>
          <tr><td><strong>Name</strong></td><td>${lead.name}</td></tr>
          <tr><td><strong>Email</strong></td><td>${lead.email}</td></tr>
          <tr><td><strong>Role</strong></td><td>${lead.role}</td></tr>
          <tr><td><strong>Country</strong></td><td>${lead.country}</td></tr>
          <tr><td><strong>Asset type</strong></td><td>${answers.assetType || "Not provided"}</td></tr>
          <tr><td><strong>Score</strong></td><td>${report.score}/100</td></tr>
          <tr><td><strong>Classification</strong></td><td>${report.classification.label}</td></tr>
          <tr><td><strong>Complexity</strong></td><td>${report.complexityRating}</td></tr>
          <tr><td><strong>Budget range</strong></td><td>${budgetRange}</td></tr>
          <tr><td><strong>Timeline</strong></td><td>${report.timelineMonths}</td></tr>
        </tbody>
      </table>
      <h3>Recommended vendor categories</h3>
      <ul>${report.recommendations.map((item) => `<li><strong>${item.category}</strong>: ${item.reason}</li>`).join("")}</ul>
      <h3>Top gaps</h3>
      <ul>${(report.gaps.length ? report.gaps : [{ question: "No major gaps captured", answer: "" }]).map((item) => `<li>${item.question}${item.answer ? ` (${item.answer})` : ""}</li>`).join("")}</ul>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      text: lines.join("\n"),
      html
    })
  });

  if (!response.ok) {
    console.error("Assessment notification failed:", await response.text());
    return { ok: false, skipped: false };
  }

  return { ok: true, skipped: false };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AssessmentRequest;
    const answers = body.answers || {};
    const lead = body.lead;

    if (!isValidLead(lead)) {
      return NextResponse.json({ ok: false, message: "Please complete all lead fields and consent before viewing the report." }, { status: 400 });
    }
    const validLead = lead as LeadDetails;

    const report = assessTokenization({ answers, lead: validLead });
    const budgetLow = report.budget.reduce((sum, item) => sum + item.low, 0);
    const budgetHigh = report.budget.reduce((sum, item) => sum + item.high, 0);

    const assessmentRow = {
      country: validLead.country,
      asset_type: answers.assetType || null,
      readiness_score: report.score,
      readiness_classification: report.classification.label,
      complexity_rating: report.complexityRating,
      timeline_estimate: report.timelineMonths,
      budget_low_usd: budgetLow,
      budget_high_usd: budgetHigh,
      budget_range: report.totalBudgetRange,
      user_name: validLead.name,
      user_email: validLead.email,
      company: validLead.company,
      role: validLead.role,
      consent: validLead.consent,
      answers,
      pillar_scores: report.pillarScores,
      complexity_trace: report.complexityBreakdown,
      budget_trace: report.budget,
      recommendation_trace: report.recommendations
    };

    const insert = await insertSupabaseRow("tokenization_assessments", assessmentRow);
    const insertedAssessment = Array.isArray(insert.data) ? insert.data[0] : null;
    const assessmentId = insertedAssessment?.id || `preview-${Date.now()}`;

    if (insert.mode === "supabase") {
      await insertSupabaseRow("tokenization_assessment_events", {
        assessment_id: assessmentId,
        event_name: "assessment_completion",
        page_path: "/tools/tokenization-readiness-assessment",
        asset_type: answers.assetType || null,
        country: validLead.country,
        metadata: {
          score: report.score,
          classification: report.classification.label,
          complexityRating: report.complexityRating,
          budgetRange: report.totalBudgetRange
        }
      });
    }

    const notification = await sendAssessmentNotification({
      assessmentId,
      lead: validLead,
      report,
      answers,
      budgetRange: report.totalBudgetRange
    });

    return NextResponse.json({
      ok: true,
      mode: insert.mode,
      assessmentId,
      notification,
      report
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Assessment could not be saved."
      },
      { status: 500 }
    );
  }
}
