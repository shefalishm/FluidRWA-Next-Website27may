"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  assessFamilyOfficeStack,
  familyOfficePillars,
  familyOfficeProfileQuestions,
  familyOfficeQuestions,
  type FamilyOfficeAnswers,
  type FamilyOfficeLead,
  type FamilyOfficeQuestion
} from "@/lib/familyOfficeStackRules";

type ProfileStep = {
  type: "profile";
  id: string;
  label: string;
  helper: string;
  section: string;
  options: Array<{ label: string; value: string }>;
};

type QuestionStep = {
  type: "question";
  section: string;
  question: FamilyOfficeQuestion;
};

type StackStep = ProfileStep | QuestionStep;

const defaultAnswers: FamilyOfficeAnswers = {
  officeType: familyOfficeProfileQuestions[0].options[0].value,
  complexity: familyOfficeProfileQuestions[1].options[1].value
};

familyOfficeQuestions.forEach((question) => {
  defaultAnswers[question.id] = question.options[0]?.value || "yes";
});

const emptyLead: FamilyOfficeLead = {
  name: "",
  familyOffice: "",
  email: "",
  role: "",
  country: "",
  consent: false
};

const stackSteps: StackStep[] = [
  ...familyOfficeProfileQuestions.map((question) => ({
    type: "profile" as const,
    section: "Family office profile",
    ...question
  })),
  ...familyOfficeQuestions.map((question) => ({
    type: "question" as const,
    section: familyOfficePillars.find((pillar) => pillar.id === question.pillar)?.title || "Service stack",
    question
  }))
];

const familyOfficeFaqs = [
  {
    question: "What is a family office service stack?",
    answer:
      "A family office service stack is the coordinated set of advisors, platforms and providers supporting governance, tax, legal, reporting, investments, risk, cybersecurity, succession and administration."
  },
  {
    question: "Who should use this tool?",
    answer:
      "It is designed for single-family offices, founder offices, embedded family offices, multi-family office clients and wealth owners who want to identify provider gaps before adding more complexity."
  },
  {
    question: "Does the tool recommend specific vendors?",
    answer:
      "The report recommends provider categories first, such as tax advisors, reporting platforms, cybersecurity firms or succession advisors. Specific vendor selection should follow a diligence process."
  },
  {
    question: "Is this only for digital assets or Web3?",
    answer:
      "No. The assessment is intentionally broad. It covers core family office operations and can also highlight specialist needs for private markets, direct deals, venture exposure or digital assets where relevant."
  }
];

export function FamilyOfficeStackTool() {
  const [answers, setAnswers] = useState<FamilyOfficeAnswers>(defaultAnswers);
  const [lead, setLead] = useState<FamilyOfficeLead>(emptyLead);
  const [hasStarted, setHasStarted] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "preview" | "error">("idle");
  const [saveMessage, setSaveMessage] = useState("");

  const report = useMemo(() => assessFamilyOfficeStack({ answers, lead }), [answers, lead]);
  const currentStep = stackSteps[stepIndex];
  const progress = Math.round(((stepIndex + 1) / stackSteps.length) * 100);

  useEffect(() => {
    if (!hasStarted) return;
    const reset = () => window.scrollTo({ top: 0, behavior: "auto" });
    reset();
    const timeout = window.setTimeout(reset, 120);
    return () => window.clearTimeout(timeout);
  }, [hasStarted, stepIndex, showLeadCapture, showReport]);

  const updateAnswer = (id: string, value: string) => {
    setAnswers((current) => ({ ...current, [id]: value }));
    setShowReport(false);
  };

  const goNext = () => {
    if (stepIndex < stackSteps.length - 1) {
      setStepIndex((current) => current + 1);
      return;
    }
    setShowLeadCapture(true);
  };

  const goBack = () => {
    setShowLeadCapture(false);
    setStepIndex((current) => Math.max(0, current - 1));
  };

  const submitLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!lead.consent) return;
    setSaveState("saving");
    setSaveMessage("");

    try {
      const response = await fetch("/api/family-office-stack-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, lead })
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.message || "Assessment could not be saved.");
      }

      window.localStorage.setItem(
        "fluidrwa-family-office-stack-preview",
        JSON.stringify({
          assessmentId: data.assessmentId,
          mode: data.mode,
          timestamp: new Date().toISOString(),
          country: lead.country,
          familyOffice: lead.familyOffice,
          role: lead.role,
          score: report.score,
          classification: report.classification.label,
          providerStack: report.providerStack,
          answers
        })
      );

      setSaveState(data.mode === "supabase" ? "saved" : "preview");
      setSaveMessage(
        data.mode === "supabase"
          ? "Assessment saved. Your family office stack report is ready."
          : "Preview mode: the report is ready and stored locally for testing."
      );
      setShowReport(true);
    } catch (error) {
      setSaveState("error");
      setSaveMessage(error instanceof Error ? error.message : "Assessment could not be saved. Please try again.");
    }
  };

  return (
    <div className={`tra-page family-office-tool ${hasStarted ? "is-assessing" : ""}`}>
      {!hasStarted ? (
        <section className="tra-hero family-office-hero">
          <div className="light-container tra-hero-grid tra-hero-simple">
            <div>
              <p className="eyebrow light-eyebrow">Free family office tool</p>
              <h1>Is Your Family Office Service Stack Complete?</h1>
              <p className="tra-hero-copy">
                A free assessment for family offices, founder offices and wealth owners to identify advisor gaps, vendor overlap, governance risks and service-provider categories to review.
              </p>
              <div className="tra-hero-actions">
                <button type="button" className="btn-primary" onClick={() => setHasStarted(true)}>
                  Start assessment
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {!hasStarted ? (
        <section className="light-container tra-faq-section" aria-labelledby="family-office-stack-faq">
          <div className="tra-faq-head">
            <p className="eyebrow light-eyebrow">Family office service stack FAQ</p>
            <h2 id="family-office-stack-faq">Questions family offices ask before reviewing providers</h2>
          </div>
          <div className="tra-faq-grid">
            {familyOfficeFaqs.map((item) => (
              <article className="tra-report-card" key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {hasStarted && !showLeadCapture && !showReport ? (
        <main className="light-container tra-step-wrap" id="family-office-assessment-start">
          <section className="tra-panel tra-step-card">
            <div className="tra-progress">
              <span>Question {stepIndex + 1} of {stackSteps.length}</span>
              <strong>{progress}% complete</strong>
              <div><i style={{ width: `${progress}%` }} /></div>
            </div>

            <div className="tra-step-content">
              <p className="eyebrow light-eyebrow">{currentStep.section}</p>
              {currentStep.type === "profile" ? (
                <>
                  <h2>{currentStep.label}</h2>
                  <p>{currentStep.helper}</p>
                  <div className="tra-choice-grid">
                    {currentStep.options.map((option) => (
                      <button
                        type="button"
                        key={option.value}
                        className={answers[currentStep.id] === option.value ? "is-selected" : ""}
                        onClick={() => updateAnswer(currentStep.id, option.value)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h2>{currentStep.question.label}</h2>
                  <p>{currentStep.question.helper}</p>
                  <div className="tra-choice-grid">
                    {currentStep.question.options.map((option) => (
                      <button
                        type="button"
                        key={option.value}
                        className={answers[currentStep.question.id] === option.value ? "is-selected" : ""}
                        onClick={() => updateAnswer(currentStep.question.id, option.value)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="tra-step-actions">
              <button type="button" className="btn-secondary" onClick={goBack} disabled={stepIndex === 0}>Back</button>
              <button type="button" className="btn-primary" onClick={goNext}>{stepIndex === stackSteps.length - 1 ? "Continue to report" : "Next"}</button>
            </div>
          </section>
        </main>
      ) : null}

      {showLeadCapture && !showReport ? (
        <section className="light-container tra-lead" id="family-office-lead">
          <div className="tra-panel tra-lead-panel">
            <div className="tra-panel-head">
              <p className="eyebrow light-eyebrow">Get your report</p>
              <h2>Enter your details to view your family office service stack report</h2>
              <p>Your answers will be saved with the report so FluidRWA can follow up with relevant service-provider guidance.</p>
            </div>
            <form className="tra-lead-form" onSubmit={submitLead}>
              <label className="tra-field">
                <span>Name</span>
                <input required type="text" value={lead.name} onChange={(event) => setLead((current) => ({ ...current, name: event.target.value }))} />
              </label>
              <label className="tra-field">
                <span>Family office / company</span>
                <input required type="text" value={lead.familyOffice} onChange={(event) => setLead((current) => ({ ...current, familyOffice: event.target.value }))} />
              </label>
              <label className="tra-field">
                <span>Email</span>
                <input required type="email" value={lead.email} onChange={(event) => setLead((current) => ({ ...current, email: event.target.value }))} />
              </label>
              <label className="tra-field">
                <span>Role</span>
                <input required type="text" value={lead.role} onChange={(event) => setLead((current) => ({ ...current, role: event.target.value }))} />
              </label>
              <label className="tra-field">
                <span>Country</span>
                <input required type="text" value={lead.country} onChange={(event) => setLead((current) => ({ ...current, country: event.target.value }))} />
              </label>
              <label className="tra-consent">
                <input type="checkbox" checked={lead.consent} onChange={(event) => setLead((current) => ({ ...current, consent: event.target.checked }))} required />
                <span>I agree to be contacted by FluidRWA about this assessment and related family office service-provider guidance.</span>
              </label>
              <button className="tra-submit" type="submit" disabled={saveState === "saving"}>
                {saveState === "saving" ? "Saving..." : "View my report"}
              </button>
              {saveMessage ? <p className="tra-save-message" data-state={saveState}>{saveMessage}</p> : null}
            </form>
          </div>
        </section>
      ) : null}

      {showReport ? (
        <section className="light-container tra-report" id="family-office-report">
          <div className="tra-report-header">
            <p className="eyebrow light-eyebrow">Personalized report</p>
            <h2>{report.classification.label}: {report.score}/100</h2>
            <p>{report.classification.description}</p>
          </div>
          <div className="tra-report-grid">
            <article className="tra-report-card">
              <h3>Service stack score</h3>
              {report.pillarScores.map((pillar) => (
                <div className="tra-meter" key={pillar.id}>
                  <div><span>{pillar.title}</span><strong>{pillar.score}/{pillar.max}</strong></div>
                  <meter min={0} max={pillar.max} value={pillar.score} />
                </div>
              ))}
            </article>
            <article className="tra-report-card">
              <h3>Office profile</h3>
              <ul>
                <li><span>Office type</span><strong>{report.profile.officeType}</strong></li>
                <li><span>Complexity</span><strong>{report.profile.complexity}</strong></li>
              </ul>
            </article>
            <article className="tra-report-card">
              <h3>Top strengths</h3>
              <ul>
                {report.strengths.length ? report.strengths.map((item) => <li key={item.questionId}>{item.label}</li>) : <li>No full-strength areas captured yet.</li>}
              </ul>
            </article>
            <article className="tra-report-card">
              <h3>Priority gaps</h3>
              <ul>
                {report.gaps.length ? report.gaps.slice(0, 6).map((gap) => <li key={`${gap.pillar}-${gap.question}`}>{gap.question} — {gap.answer}</li>) : <li>No major gaps detected from the current answers.</li>}
              </ul>
            </article>
            <article className="tra-report-card tra-wide">
              <h3>Recommended provider categories</h3>
              <div className="tra-rec-grid">
                {report.providerStack.length ? report.providerStack.map((item) => (
                  <div key={item.category}>
                    <strong>{item.category}</strong>
                    <p>{item.reasons.slice(0, 2).join(" ")}</p>
                  </div>
                )) : (
                  <div>
                    <strong>Annual provider benchmarking</strong>
                    <p>Maintain regular reviews across advisors, reporting, risk, insurance and continuity.</p>
                  </div>
                )}
              </div>
            </article>
            <article className="tra-report-card tra-wide">
              <h3>Recommended next steps</h3>
              <ul>
                {report.nextSteps.map((step) => <li key={step}>{step}</li>)}
              </ul>
            </article>
          </div>
          <div className="tra-report-actions">
            <a className="btn-primary" href="/contact">Discuss the stack</a>
            <a className="btn-secondary" href="/web3vendorecosystem">Explore providers</a>
          </div>
        </section>
      ) : null}

      {showReport ? (
        <section className="light-container tra-methodology tra-methodology-small">
          <div className="tra-panel">
            <p className="eyebrow light-eyebrow">Calculation method</p>
            <h2>Rule-based and explainable</h2>
            <p>The score is exactly 100 points across governance, provider coverage, risk and continuity. Each recommendation maps to a specific gap selected during the assessment.</p>
            <div className="tra-method-grid">
              {familyOfficePillars.map((pillar) => <div key={pillar.id}><strong>{pillar.title}</strong><span>{pillar.max} points</span></div>)}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
