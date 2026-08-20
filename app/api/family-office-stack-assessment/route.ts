import { NextResponse } from "next/server";
import { assessFamilyOfficeStack, type FamilyOfficeAnswers, type FamilyOfficeLead } from "@/lib/familyOfficeStackRules";
import { escapeEmailHtml, sendNotificationEmail } from "@/lib/emailNotifications";

export const runtime = "nodejs";

type StackAssessmentRequest = {
  answers?: FamilyOfficeAnswers;
  lead?: FamilyOfficeLead;
};

const requiredLeadFields: Array<keyof Omit<FamilyOfficeLead, "consent">> = ["name", "familyOffice", "email", "role", "country"];

function isValidLead(lead: StackAssessmentRequest["lead"]) {
  if (!lead || lead.consent !== true) return false;
  return requiredLeadFields.every((field) => typeof lead[field] === "string" && lead[field].trim().length > 1);
}

async function insertSupabaseRow(table: string, row: Record<string, unknown>) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return { mode: "preview" as const, data: null, storageError: null };
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
    return { mode: "preview" as const, data: null, storageError: `Supabase insert failed for ${table}: ${detail}` };
  }

  return { mode: "supabase" as const, data: await response.json(), storageError: null };
}

async function notifyFamilyOfficeAssessment({
  assessmentId,
  lead,
  report
}: {
  assessmentId: string;
  lead: FamilyOfficeLead;
  report: ReturnType<typeof assessFamilyOfficeStack>;
}) {
  const safe = {
    id: escapeEmailHtml(assessmentId),
    name: escapeEmailHtml(lead.name),
    familyOffice: escapeEmailHtml(lead.familyOffice),
    email: escapeEmailHtml(lead.email),
    role: escapeEmailHtml(lead.role),
    country: escapeEmailHtml(lead.country),
    score: escapeEmailHtml(report.score),
    classification: escapeEmailHtml(report.classification.label),
    description: escapeEmailHtml(report.classification.description),
    officeType: escapeEmailHtml(report.profile.officeType),
    complexity: escapeEmailHtml(report.profile.complexity)
  };
  const subject = `New Family Office Stack Assessment - ${lead.familyOffice} - Score ${report.score}`;
  const text = [
    `Assessment ID: ${assessmentId}`,
    `Name: ${lead.name}`,
    `Family office: ${lead.familyOffice}`,
    `Email: ${lead.email}`,
    `Role: ${lead.role}`,
    `Country: ${lead.country}`,
    `Score: ${report.score}/100`,
    `Classification: ${report.classification.label}`,
    `Office type: ${report.profile.officeType}`,
    `Complexity: ${report.profile.complexity}`,
    "",
    "Provider stack:",
    ...report.providerStack.map((item) => `- ${item.category}: ${item.reasons.join("; ")}`),
    "",
    "Top gaps:",
    ...(report.gaps.length ? report.gaps.map((item) => `- ${item.question} (${item.answer})`) : ["- No major gaps captured"])
  ].join("\n");
  const html = `
    <div style="font-family:Arial,sans-serif;color:#12213a;line-height:1.55">
      <h2 style="margin:0 0 12px">New FluidRWA family office assessment</h2>
      <p><strong>${safe.familyOffice}</strong> completed the Family Office Stack Builder.</p>
      <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;border:1px solid #dbe7f3;width:100%;max-width:760px">
        <tbody>
          <tr><td><strong>Assessment ID</strong></td><td>${safe.id}</td></tr>
          <tr><td><strong>Name</strong></td><td>${safe.name}</td></tr>
          <tr><td><strong>Email</strong></td><td>${safe.email}</td></tr>
          <tr><td><strong>Role</strong></td><td>${safe.role}</td></tr>
          <tr><td><strong>Country</strong></td><td>${safe.country}</td></tr>
          <tr><td><strong>Score</strong></td><td>${safe.score}/100</td></tr>
          <tr><td><strong>Classification</strong></td><td>${safe.classification}</td></tr>
          <tr><td><strong>Office type</strong></td><td>${safe.officeType}</td></tr>
          <tr><td><strong>Complexity</strong></td><td>${safe.complexity}</td></tr>
        </tbody>
      </table>
      <p>${safe.description}</p>
      <h3>Recommended provider stack</h3>
      <ul>${report.providerStack.map((item) => `<li><strong>${escapeEmailHtml(item.category)}</strong>: ${escapeEmailHtml(item.reasons.join("; "))}</li>`).join("")}</ul>
      <h3>Top gaps</h3>
      <ul>${(report.gaps.length ? report.gaps : [{ question: "No major gaps captured", answer: "" }]).map((item) => `<li>${escapeEmailHtml(item.question)}${item.answer ? ` (${escapeEmailHtml(item.answer)})` : ""}</li>`).join("")}</ul>
    </div>
  `;

  return sendNotificationEmail({ subject, text, html });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as StackAssessmentRequest;
    const answers = body.answers || {};
    const lead = body.lead;

    if (!isValidLead(lead)) {
      return NextResponse.json({ ok: false, message: "Please complete all lead fields and consent before viewing the report." }, { status: 400 });
    }

    const validLead = lead as FamilyOfficeLead;
    const report = assessFamilyOfficeStack({ answers, lead: validLead });
    const assessmentRow = {
      country: validLead.country,
      office_type: answers.officeType || null,
      complexity_profile: answers.complexity || null,
      service_stack_score: report.score,
      classification: report.classification.label,
      user_name: validLead.name,
      user_email: validLead.email,
      family_office: validLead.familyOffice,
      role: validLead.role,
      consent: validLead.consent,
      answers,
      pillar_scores: report.pillarScores,
      provider_stack: report.providerStack,
      gaps: report.gaps,
      strengths: report.strengths,
      risk_alerts: report.riskAlerts,
      next_steps: report.nextSteps
    };

    const insert = await insertSupabaseRow("family_office_stack_assessments", assessmentRow);
    const insertedAssessment = Array.isArray(insert.data) ? insert.data[0] : null;
    const assessmentId = insertedAssessment?.id || `preview-${Date.now()}`;

    if (insert.mode === "supabase") {
      await insertSupabaseRow("family_office_stack_assessment_events", {
        assessment_id: assessmentId,
        event_name: "assessment_completion",
        page_path: "/family-office-service-stack-builder",
        country: validLead.country,
        metadata: {
          score: report.score,
          classification: report.classification.label,
          officeType: report.profile.officeType,
          complexity: report.profile.complexity
        }
      });
    }
    const notification = await notifyFamilyOfficeAssessment({
      assessmentId,
      lead: validLead,
      report
    });

    return NextResponse.json({
      ok: true,
      mode: insert.mode,
      assessmentId,
      notification,
      storageError: insert.storageError,
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
