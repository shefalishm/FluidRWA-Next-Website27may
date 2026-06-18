import { NextResponse } from "next/server";
import { assessFamilyOfficeStack, type FamilyOfficeAnswers, type FamilyOfficeLead } from "@/lib/familyOfficeStackRules";

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

    return NextResponse.json({
      ok: true,
      mode: insert.mode,
      assessmentId,
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
