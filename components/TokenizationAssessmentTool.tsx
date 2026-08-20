"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  assessTokenization,
  budgetAssumptions,
  complexityInputs,
  readinessPillars,
  type AssessmentAnswers,
  type LeadDetails,
  type QuestionRule
} from "@/lib/tokenizationAssessmentRules";
import { tokenizationAssessmentFaqs } from "@/lib/tokenizationAssessmentContent";

declare global {
  interface Window {
    fluidRwaTrackEvent?: (eventName: string, params?: Record<string, unknown>) => void;
    fluidRwaReportLeadConversion?: () => void;
  }
}

type SelectStep = {
  type: "select";
  id: string;
  label: string;
  section: string;
  helper: string;
  options: readonly (readonly [string, string, number])[];
};

type QuestionStep = {
  type: "question";
  section: string;
  question: QuestionRule;
};

type AssessmentStep = SelectStep | QuestionStep;

const stepExplainers: Record<string, string> = {
  assetType: "Choose the asset or product closest to what you want to launch. Different assets usually need different legal, compliance and platform support.",
  complexityJurisdiction: "This is where the project may be legally structured or offered. Jurisdiction affects review time and regulatory complexity.",
  investorCount: "A larger investor base usually means more onboarding, reporting, support and compliance workflow.",
  investorType: "Retail access is usually more complex than accredited or qualified investor access.",
  secondaryTrading: "Secondary trading means investors may want a way to transfer or sell after issuance.",
  crossBorder: "Cross-border investors can add more regulatory, tax, onboarding and transfer considerations.",
  ownershipDocumented: "This means there is clear proof of who owns or controls the asset before any tokenization work begins.",
  legalEntity: "Most tokenization projects need a legal entity or issuer structure before vendors can implement the offering.",
  jurisdictionSelected: "A selected jurisdiction gives legal, compliance and platform teams a clear operating framework.",
  investorEligibility: "This means you know who is allowed to invest, such as accredited investors, qualified purchasers or retail investors.",
  complianceRequirements: "This means you understand the KYC, AML, transfer, reporting or securities obligations that may apply.",
  assetValuation: "A current valuation helps investors, legal teams and platforms understand the economic basis of the offering.",
  financialRecords: "Financial records support diligence, investor confidence and ongoing reporting.",
  cashFlowInfo: "Cash flow information helps determine distributions, yield expectations and reporting needs.",
  reportingProcess: "A reporting process is how investors receive updates after launch.",
  performanceHistory: "Performance history helps buyers evaluate the asset, fund or product with more confidence.",
  targetInvestor: "This means you know the buyer profile you are building for.",
  onboardingProcess: "Investor onboarding covers identity checks, eligibility, documents and account setup.",
  capitalStrategy: "A capital raising strategy explains how the project will reach, qualify and convert investors.",
  liquidityExpectations: "This means you have decided whether investors should expect transferability or secondary access.",
  distributionChannels: "Distribution channels are the routes you will use to reach investors, partners or platforms.",
  projectBudget: "Tokenization requires legal, compliance, technology, security and operating budget. Choose the closest current range.",
  internalTeam: "This means there is someone inside the project who can manage vendors, documents and launch decisions.",
  timelineDefined: "A defined timeline helps vendors scope the work and identify blockers early.",
  technologyStrategy: "This means you have decided whether to use a platform, custom build, hybrid model or vendor-led stack.",
  serviceBudget: "This means budget is set aside for outside providers such as legal, KYC, custody, audits or platform partners."
};

const defaultAnswers: AssessmentAnswers = {
  assetType: "real-estate",
  complexityJurisdiction: "single-clear",
  investorCount: "under25",
  investorType: "accredited",
  secondaryTrading: "no",
  crossBorder: "no"
};

readinessPillars.forEach((pillar) => {
  pillar.questions.forEach((question) => {
    defaultAnswers[question.id] = question.options[0]?.value || "yes";
  });
});

const emptyLead: LeadDetails = {
  name: "",
  company: "",
  email: "",
  role: "",
  country: "",
  consent: false
};

const assessmentSteps: AssessmentStep[] = [
  {
    type: "select",
    id: "assetType",
    label: "What are you planning to tokenize?",
    section: "Project profile",
    helper: "This helps estimate complexity, vendor categories and likely budget range.",
    options: complexityInputs.assetType
  },
  {
    type: "select",
    id: "complexityJurisdiction",
    label: "Where will the project be structured?",
    section: "Project profile",
    helper: "Jurisdiction affects legal work, compliance requirements and implementation timeline.",
    options: complexityInputs.jurisdiction
  },
  {
    type: "select",
    id: "investorCount",
    label: "How many investors do you expect?",
    section: "Project profile",
    helper: "Investor count affects onboarding, reporting, distribution and compliance operations.",
    options: complexityInputs.investorCount
  },
  {
    type: "select",
    id: "investorType",
    label: "Who will be allowed to invest?",
    section: "Project profile",
    helper: "Retail participation usually increases legal, disclosure and compliance complexity.",
    options: complexityInputs.investorType
  },
  {
    type: "select",
    id: "secondaryTrading",
    label: "Will secondary trading be required?",
    section: "Project profile",
    helper: "Secondary liquidity can introduce additional exchange, transfer, security and compliance requirements.",
    options: complexityInputs.secondaryTrading
  },
  {
    type: "select",
    id: "crossBorder",
    label: "Will investors come from multiple countries?",
    section: "Project profile",
    helper: "Cross-border distribution can materially increase compliance and legal review needs.",
    options: complexityInputs.crossBorder
  },
  ...readinessPillars.flatMap((pillar) =>
    pillar.questions.map((question) => ({
      type: "question" as const,
      section: pillar.title,
      question
    }))
  )
];

const issuerProfiles = [
  {
    icon: "IO",
    title: "Asset owners",
    text: "Check whether ownership records, valuation, reporting and servicing are ready before speaking to tokenization platforms."
  },
  {
    icon: "FM",
    title: "Fund managers",
    text: "Map investor eligibility, subscription workflows, liquidity expectations and the vendor stack needed for tokenized funds."
  },
  {
    icon: "RE",
    title: "Real estate issuers",
    text: "Pressure-test SPV structure, investor onboarding, distributions, reporting and transfer controls for property-backed offerings."
  },
  {
    icon: "PM",
    title: "Private market teams",
    text: "Estimate complexity for private credit, equity, revenue share, funds or alternative assets before committing budget."
  }
] as const;

const assetClasses = [
  ["Real estate", "SPVs, income assets, property funds"],
  ["Private credit", "Loans, receivables, yield products"],
  ["Funds", "Feeder funds, private funds, treasury products"],
  ["Equity", "Private company shares and cap table workflows"],
  ["Commodities", "Gold, energy, inventory and physical assets"],
  ["Intangibles", "IP, royalties, data rights and revenue streams"]
] as const;

export function TokenizationAssessmentTool() {
  const [answers, setAnswers] = useState<AssessmentAnswers>(defaultAnswers);
  const [lead, setLead] = useState<LeadDetails>(emptyLead);
  const [hasStarted, setHasStarted] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "preview" | "error">("idle");
  const [saveMessage, setSaveMessage] = useState("");

  const report = useMemo(() => assessTokenization({ answers, lead }), [answers, lead]);
  const currentStep = assessmentSteps[stepIndex];
  const progress = Math.round(((stepIndex + 1) / assessmentSteps.length) * 100);

  useEffect(() => {
    if (!hasStarted) return;
    const reset = () => window.scrollTo({ top: 0, behavior: "auto" });
    reset();
    const timeout = window.setTimeout(reset, 120);
    return () => window.clearTimeout(timeout);
  }, [hasStarted, showLeadCapture, showReport]);

  const updateAnswer = (id: string, value: string) => {
    setAnswers((current) => ({ ...current, [id]: value }));
    setShowReport(false);
  };

  const startAssessment = () => {
    setHasStarted(true);
    setShowLeadCapture(false);
    setShowReport(false);
    window.fluidRwaTrackEvent?.("assessment_started", {
      assessment_type: "tokenization_readiness",
      asset_type: answers.assetType
    });
  };

  const goNext = () => {
    if (stepIndex < assessmentSteps.length - 1) {
      setStepIndex((current) => current + 1);
      return;
    }
    setShowLeadCapture(true);
    window.fluidRwaTrackEvent?.("assessment_questions_completed", {
      assessment_type: "tokenization_readiness",
      asset_type: answers.assetType,
      investor_type: answers.investorType,
      cross_border: answers.crossBorder,
      secondary_trading: answers.secondaryTrading
    });
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
      const response = await fetch("/api/tokenization-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, lead })
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.message || "Assessment could not be saved.");
      }

      window.localStorage.setItem(
        "fluidrwa-tokenization-assessment-preview",
        JSON.stringify({
          assessmentId: data.assessmentId,
          mode: data.mode,
          timestamp: new Date().toISOString(),
          country: lead.country,
          assetType: answers.assetType,
          readinessScore: report.score,
          complexityRating: report.complexityRating,
          budgetRange: report.totalBudgetRange,
          userEmail: lead.email,
          company: lead.company,
          role: lead.role,
          allAnswers: answers
        })
      );

      setSaveState(data.mode === "supabase" ? "saved" : "preview");
      setSaveMessage(data.mode === "supabase" ? "Assessment saved. Your report is ready." : "Preview mode: Supabase keys are not connected yet, so this report is stored locally for testing.");
      setShowReport(true);
      window.fluidRwaTrackEvent?.("assessment_completed", {
        assessment_type: "tokenization_readiness",
        asset_type: answers.assetType,
        country: lead.country,
        readiness_score: report.score,
        readiness_classification: report.classification.label,
        complexity_rating: report.complexityRating,
        budget_range: report.totalBudgetRange,
        mode: data.mode
      });
      window.fluidRwaTrackEvent?.("assessment_result_viewed", {
        assessment_type: "tokenization_readiness",
        readiness_score: report.score,
        readiness_classification: report.classification.label
      });
      window.fluidRwaReportLeadConversion?.();
    } catch (error) {
      setSaveState("error");
      setSaveMessage(error instanceof Error ? error.message : "Assessment could not be saved. Please try again.");
    }
  };

  return (
    <div className={`tra-page ${hasStarted ? "is-assessing" : ""}`}>
      {!hasStarted ? (
      <section className="tra-hero">
        <div className="light-container tra-hero-grid tra-hero-rich">
          <div className="tra-hero-copy-wrap">
            <p className="eyebrow light-eyebrow">Free tokenization readiness tool</p>
            <h1>Should I Tokenize My Asset?</h1>
            <p className="tra-hero-copy">
              Get a practical readiness score, budget range, timeline estimate and vendor-category map before you spend months speaking with tokenization platforms, lawyers, KYC providers and smart contract teams.
            </p>
            <div className="tra-hero-pills" aria-label="Assessment output">
              <span>Readiness score</span>
              <span>Budget range</span>
              <span>Vendor stack</span>
            </div>
            <div className="tra-hero-actions">
              <button type="button" className="btn-primary" onClick={startAssessment}>Start assessment</button>
              <a className="btn-secondary" href="#tokenization-use-cases">Who should use it?</a>
            </div>
          </div>
          <aside className="tra-visual" aria-label="Tokenization readiness preview">
            <div className="tra-visual-card tra-visual-main">
              <span>Issuer readiness</span>
              <strong>82</strong>
              <p>Sample score</p>
            </div>
            <div className="tra-visual-card tra-visual-mini tra-visual-budget">
              <span>Budget</span>
              <strong>$5k-$25k</strong>
            </div>
            <div className="tra-visual-card tra-visual-mini tra-visual-stack">
              <span>Stack</span>
              <strong>Legal + KYC + Custody</strong>
            </div>
            <div className="tra-visual-orbit" />
          </aside>
        </div>
      </section>
      ) : null}

      {!hasStarted ? (
        <>
        <section className="light-container tra-use-section" id="tokenization-use-cases" aria-labelledby="tokenization-use-title">
          <div className="tra-section-head">
            <p className="eyebrow light-eyebrow">Who should use it</p>
            <h2 id="tokenization-use-title">Built for issuers before vendor selection</h2>
            <p>Use the tool before asking for quotes, choosing a chain, hiring smart contract developers or committing to a tokenization platform.</p>
          </div>
          <div className="tra-issuer-grid">
            {issuerProfiles.map((profile) => (
              <article className="tra-issuer-card" key={profile.title}>
                <div className="tra-3d-icon" aria-hidden="true">{profile.icon}</div>
                <h3>{profile.title}</h3>
                <p>{profile.text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="light-container tra-asset-section" aria-labelledby="tokenization-assets-title">
          <div className="tra-section-head">
            <p className="eyebrow light-eyebrow">Asset classes</p>
            <h2 id="tokenization-assets-title">See if the asset has enough structure to tokenize</h2>
            <p>The assessment is useful across income-producing assets, financial products and private market workflows where legal, compliance and investor operations matter.</p>
          </div>
          <div className="tra-asset-grid">
            {assetClasses.map(([title, text], index) => (
              <article className="tra-asset-tile" key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="light-container tra-faq-section" aria-labelledby="tokenization-readiness-faq">
          <div className="tra-faq-head">
            <p className="eyebrow light-eyebrow">Tokenization readiness FAQ</p>
            <h2 id="tokenization-readiness-faq">Questions buyers ask before tokenizing an asset</h2>
          </div>
          <div className="tra-faq-grid">
            {tokenizationAssessmentFaqs.map((item) => (
              <article className="tra-report-card" key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
        </>
      ) : null}

      {hasStarted && !showLeadCapture && !showReport ? (
        <main className="light-container tra-step-wrap" id="assessment-start">
          <section className="tra-panel tra-step-card">
            <div className="tra-progress">
              <span>Question {stepIndex + 1} of {assessmentSteps.length}</span>
              <strong>{progress}% complete</strong>
              <div><i style={{ width: `${progress}%` }} /></div>
            </div>

            <div className="tra-step-content">
              <p className="eyebrow light-eyebrow">{currentStep.section}</p>
              {currentStep.type === "select" ? (
                <>
                  <h2>{currentStep.label}</h2>
                  <p>{stepExplainers[currentStep.id] || currentStep.helper}</p>
                  <div className="tra-choice-grid">
                    {currentStep.options.map(([value, label]) => (
                      <button
                        type="button"
                        key={value}
                        className={answers[currentStep.id] === value ? "is-selected" : ""}
                        onClick={() => updateAnswer(currentStep.id, value)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h2>{currentStep.question.label}</h2>
                  <p>{stepExplainers[currentStep.question.id] || "Choose the answer that best reflects where the project stands today."}</p>
                  <div className="tra-choice-grid">
                    {currentStep.question.options.map((option) => (
                      <button
                        type="button"
                        key={option.value}
                        className={answers[currentStep.question.id] === option.value ? "is-selected" : ""}
                        onClick={() => updateAnswer(currentStep.question.id, option.value)}
                      >
                        <span>{option.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="tra-step-actions">
              <button type="button" className="btn-secondary" onClick={goBack} disabled={stepIndex === 0}>Back</button>
              <button type="button" className="btn-primary" onClick={goNext}>{stepIndex === assessmentSteps.length - 1 ? "Continue to report" : "Next"}</button>
            </div>
          </section>
        </main>
      ) : null}

      {showLeadCapture && !showReport ? (
        <section className="light-container tra-lead" id="assessment-lead">
          <div className="tra-panel tra-lead-panel">
            <div className="tra-panel-head">
              <p className="eyebrow light-eyebrow">Get your report</p>
              <h2>Enter your details to view your tokenization readiness report</h2>
              <p>Your preview is ready. Add your details to unlock the full report, vendor-category map and follow-up guidance.</p>
            </div>
            <div className="tra-lead-preview" aria-label="Assessment result preview">
              <div>
                <span>Preview score</span>
                <strong>{report.score}/100</strong>
                <p>{report.classification.label}</p>
              </div>
              <div>
                <span>Complexity</span>
                <strong>{report.complexityRating}</strong>
                <p>{report.timelineMonths}</p>
              </div>
              <div>
                <span>Budget range</span>
                <strong>{report.totalBudgetRange}</strong>
                <p>Estimated vendor stack</p>
              </div>
            </div>
            <div className="tra-lead-vendor-preview">
              <strong>Likely vendor categories</strong>
              <div>
                {report.recommendations.slice(0, 4).map((item) => (
                  <span key={item.category}>{item.category}</span>
                ))}
              </div>
            </div>
            <form className="tra-lead-form" onSubmit={submitLead}>
              {(["name", "company", "email", "role", "country"] as const).map((field) => (
                <label className="tra-field" key={field}>
                  <span>{field === "email" ? "Email" : field.charAt(0).toUpperCase() + field.slice(1)}</span>
                  <input
                    required
                    type={field === "email" ? "email" : "text"}
                    value={lead[field]}
                    onChange={(event) => setLead((current) => ({ ...current, [field]: event.target.value }))}
                  />
                </label>
              ))}
              <label className="tra-consent">
                <input type="checkbox" checked={lead.consent} onChange={(event) => setLead((current) => ({ ...current, consent: event.target.checked }))} required />
                <span>I agree to be contacted by FluidRWA about this assessment and related vendor discovery support.</span>
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
        <section className="light-container tra-report" id="assessment-report">
          <div className="tra-report-header">
            <p className="eyebrow light-eyebrow">Personalized report</p>
            <h2>{report.classification.label}: {report.score}/100</h2>
            <p>{report.classification.description}</p>
          </div>
          <div className="tra-report-grid">
            <article className="tra-report-card">
              <h3>Readiness score</h3>
              {report.pillarScores.map((pillar) => (
                <div className="tra-meter" key={pillar.id}>
                  <div><span>{pillar.title}</span><strong>{pillar.score}/{pillar.max}</strong></div>
                  <meter min={0} max={pillar.max} value={pillar.score} />
                </div>
              ))}
            </article>
            <article className="tra-report-card">
              <h3>Complexity trace</h3>
              <p><strong>{report.complexityRating}</strong> complexity, estimated timeline {report.timelineMonths}</p>
              <ul>
                {report.complexityBreakdown.map((item) => (
                  <li key={item.label}><span>{item.label}</span><strong>{item.answer} ({item.points})</strong></li>
                ))}
              </ul>
            </article>
            <article className="tra-report-card tra-wide">
              <h3>Budget estimate</h3>
              <p>Total estimated range: <strong>{report.totalBudgetRange}</strong></p>
              <div className="tra-budget-table">
                {report.budget.map((item) => (
                  <div key={item.category}>
                    <span>{item.category}</span>
                    <strong>{item.range}</strong>
                    <em>{item.rule}</em>
                  </div>
                ))}
              </div>
            </article>
            <article className="tra-report-card">
              <h3>Top strengths</h3>
              <ul>
                {report.strengths.length ? report.strengths.map((item) => <li key={item.questionId}>{item.label}</li>) : <li>No full-strength areas yet.</li>}
              </ul>
            </article>
            <article className="tra-report-card">
              <h3>Key gaps</h3>
              <ul>
                {report.gaps.length ? report.gaps.map((gap) => <li key={`${gap.pillar}-${gap.question}`}>{gap.question} — {gap.answer}</li>) : <li>No major gaps detected from the current answers.</li>}
              </ul>
            </article>
            <article className="tra-report-card tra-wide">
              <h3>Recommended vendor categories</h3>
              <div className="tra-rec-grid">
                {report.recommendations.map((item) => (
                  <div key={item.category}>
                    <strong>{item.category}</strong>
                    <p>{item.reason}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
          <div className="tra-report-actions">
            <a
              className="btn-primary"
              href="/submit-requirement"
              onClick={() =>
                window.fluidRwaTrackEvent?.("assessment_cta_clicked", {
                  assessment_type: "tokenization_readiness",
                  cta: "submit_project",
                  readiness_score: report.score
                })
              }
            >
              Submit your project
            </a>
            <a
              className="btn-secondary"
              href="/web3vendorecosystem"
              onClick={() =>
                window.fluidRwaTrackEvent?.("assessment_cta_clicked", {
                  assessment_type: "tokenization_readiness",
                  cta: "explore_vendors",
                  readiness_score: report.score
                })
              }
            >
              Explore vendors
            </a>
          </div>
        </section>
      ) : null}

      {showReport ? (
      <section className="light-container tra-methodology tra-methodology-small" id="assessment-methodology">
        <div className="tra-panel">
          <p className="eyebrow light-eyebrow">Calculation method</p>
          <h2>Rule-based and explainable</h2>
          <p>The readiness score is exactly 100 points across four 25-point pillars. Complexity is calculated independently. Budget ranges come from central assumptions, adjusted by complexity.</p>
          <div className="tra-method-grid">
            {readinessPillars.map((pillar) => <div key={pillar.id}><strong>{pillar.title}</strong><span>{pillar.maxPoints} points</span></div>)}
          </div>
          <details className="tra-rules">
            <summary>View budget assumption table</summary>
            {budgetAssumptions.map((item) => (
              <p key={item.category}><strong>{item.category}:</strong> {item.rule}</p>
            ))}
          </details>
        </div>
      </section>
      ) : null}
    </div>
  );
}
