"use client";

import { ArrowLeft, ArrowRight, Check, Send } from "lucide-react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Step = "brief" | "qualify" | "result";
type Stage = "exploring" | "planning" | "implementing";
type Timeline = "soon" | "quarter" | "later";

type CategoryRule = {
  name: string;
  slug: string;
  keywords: string[];
  adjacent: string[];
};

const categoryRules: CategoryRule[] = [
  { name: "Tokenization platforms", slug: "tokenization-platforms", keywords: ["token", "rwa", "asset issuance", "digital security", "fund issuance"], adjacent: ["Legal and regulatory", "KYC, AML and compliance"] },
  { name: "Payments and stablecoins", slug: "stablecoin-infrastructure-providers", keywords: ["stablecoin", "payment", "payout", "settlement", "treasury", "on-ramp", "off-ramp", "remittance"], adjacent: ["KYC, AML and compliance", "Custody and wallets"] },
  { name: "Custody and wallets", slug: "crypto-custody-providers", keywords: ["custody", "wallet", "key management", "mpc", "signing", "safekeeping"], adjacent: ["Security and audits", "KYC, AML and compliance"] },
  { name: "KYC, AML and compliance", slug: "kyc-aml-providers", keywords: ["kyc", "aml", "identity", "onboarding", "screening", "fraud", "compliance"], adjacent: ["Legal and regulatory", "Data and analytics"] },
  { name: "Security and audits", slug: "security-audit-companies", keywords: ["security", "audit", "security audit", "smart contract security", "smart contract audit", "risk", "monitoring", "incident"], adjacent: ["Blockchain development", "Data and analytics"] },
  { name: "Legal and regulatory", slug: "legal-regulatory-vendors", keywords: ["legal", "law", "regulatory", "licence", "license", "jurisdiction", "structuring"], adjacent: ["KYC, AML and compliance", "Tokenization platforms"] },
  { name: "Blockchain development", slug: "blockchain-development-companies", keywords: ["blockchain", "smart contract", "dapp", "protocol", "web3 development", "appchain"], adjacent: ["Security and audits", "Infrastructure and nodes"] },
  { name: "AI infrastructure and tools", slug: "ai-infrastructure-providers", keywords: ["ai", "agent", "document intelligence", "automation", "machine learning", "llm", "rag"], adjacent: ["Data and analytics", "Security and audits"] },
  { name: "Data, analytics and oracles", slug: "oracles-data-proof-of-reserve", keywords: ["data", "analytics", "oracle", "proof of reserve", "indexing", "market intelligence"], adjacent: ["Infrastructure and nodes", "Security and audits"] },
  { name: "Physical asset verification", slug: "physical-asset-verification-oracles", keywords: ["physical asset", "inspection", "verification", "condition", "provenance", "capex"], adjacent: ["Data, analytics and oracles", "Tokenization platforms"] },
  { name: "Infrastructure and nodes", slug: "node-as-a-service-rpc-providers", keywords: ["node", "rpc", "api", "validator", "infrastructure", "indexer"], adjacent: ["Blockchain development", "Security and audits"] },
  { name: "Trading and liquidity", slug: "defi-trading-margin-infrastructure", keywords: ["trading", "liquidity", "exchange", "market maker", "defi", "execution"], adjacent: ["Custody and wallets", "Data and analytics"] },
  { name: "Growth and marketing", slug: "growth-marketing-companies", keywords: ["marketing", "growth", "pr", "community", "content", "launch campaign"], adjacent: ["Data and analytics", "Legal and regulatory"] }
];

const examples = [
  "We need stablecoin payments for a marketplace in the UAE",
  "We need an audit before launching our smart contracts",
  "We want AI document review for investor onboarding"
];

function classifyNeed(brief: string) {
  const normalized = brief.toLowerCase();
  const ranked = categoryRules
    .map((rule) => ({ rule, score: rule.keywords.reduce((score, keyword) => score + (normalized.includes(keyword) ? keyword.length : 0), 0) }))
    .sort((a, b) => b.score - a.score);
  const primary = ranked[0]?.score > 0 ? ranked[0].rule : null;
  return primary || { name: "Cross-category vendor stack", slug: "", adjacent: ["Project advisory", "Specialist vendor research"], keywords: [] };
}

function getReadiness(stage: Stage, timeline: Timeline) {
  const base = stage === "implementing" ? 82 : stage === "planning" ? 68 : 48;
  const score = Math.max(35, base - (timeline === "soon" && stage === "exploring" ? 8 : 0));
  const label = stage === "implementing" ? "Vendor diligence ready" : stage === "planning" ? "Shortlist ready" : "Discovery ready";
  return { score, label };
}

export function HomeVendorReadiness() {
  const [host, setHost] = useState<Element | null>(null);
  const [step, setStep] = useState<Step>("brief");
  const [brief, setBrief] = useState("");
  const [stage, setStage] = useState<Stage>("exploring");
  const [timeline, setTimeline] = useState<Timeline>("quarter");
  const [showLead, setShowLead] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const startedAt = useRef(Date.now());

  useEffect(() => setHost(document.querySelector("[data-home-readiness-slot]")), []);
  useEffect(() => {
    if (step === "brief") return;
    window.requestAnimationFrame(() => {
      const tool = document.querySelector(".home-readiness");
      if (!tool) return;
      const top = tool.getBoundingClientRect().top + window.scrollY - 104;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    });
  }, [step]);

  const category = useMemo(() => classifyNeed(brief), [brief]);
  const readiness = getReadiness(stage, timeline);

  const begin = (event: FormEvent) => {
    event.preventDefault();
    if (brief.trim().length < 12) return;
    setStep("qualify");
    window.fluidRwaTrackEvent?.("vendor_readiness_started", { interaction_source: "homepage", project_need: brief.trim() });
  };

  const reveal = () => {
    setStep("result");
    window.fluidRwaTrackEvent?.("vendor_readiness_snapshot_viewed", {
      interaction_source: "homepage",
      vendor_category: category.name,
      project_stage: stage,
      project_timeline: timeline
    });
  };

  const submitLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;
    const form = event.currentTarget;
    if (!form.checkValidity()) return form.reportValidity();
    const data = new FormData(form);
    const value = (name: string) => String(data.get(name) || "").trim();
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/vendor-intro-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vendorCategory: category.name,
          source: "homepage-vendor-readiness",
          pageUrl: window.location.href,
          leadSource: "Homepage vendor readiness assessment",
          contactEmail: value("email"),
          firstName: value("firstName"),
          companyName: value("company"),
          projectDescription: brief.trim(),
          rawPayload: {
            ...Object.fromEntries([...data.entries()].filter(([key]) => key.startsWith("ATTRIBUTION_"))),
            PROJECT_STAGE: stage,
            PROJECT_TIMELINE: timeline,
            READINESS_SCORE: readiness.score,
            RECOMMENDED_CATEGORY: category.name,
            FORM_ELAPSED_MS: String(Date.now() - startedAt.current)
          }
        })
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.message || "Your request could not be saved.");
      setSubmitted(true);
      window.fluidRwaTrackEvent?.("project_form_submit", {
        form_variant: "homepage_vendor_readiness",
        vendor_category: category.name,
        submission_id: result.requestId || undefined
      });
      window.fluidRwaReportLeadConversion?.();
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!host) return null;

  return createPortal(
    <section className="home-readiness" aria-live="polite">
      {step === "brief" ? (
        <form onSubmit={begin} className="home-readiness-entry">
          <label htmlFor="home-project-brief">What are you building or looking for?</label>
          <div className="home-readiness-entry-row">
            <textarea
              id="home-project-brief"
              value={brief}
              onChange={(event) => setBrief(event.target.value)}
              rows={2}
              minLength={12}
              maxLength={500}
              placeholder="Example: We need stablecoin payments for a marketplace operating in the UAE"
              required
            />
            <button type="submit">Start assessment <ArrowRight size={18} aria-hidden="true" /></button>
          </div>
          <div className="home-readiness-examples" aria-label="Example project needs">
            <span>Try an example</span>
            {examples.map((example) => <button key={example} type="button" onClick={() => setBrief(example)}>{example}</button>)}
          </div>
        </form>
      ) : null}

      {step === "qualify" ? (
        <div className="home-readiness-qualify">
          <button className="home-readiness-back" type="button" onClick={() => setStep("brief")}><ArrowLeft size={17} aria-hidden="true" /> Edit project</button>
          <p className="home-readiness-kicker">Two quick choices</p>
          <h2>Where are you today?</h2>
          <div className="home-readiness-question">
            <span>Project stage</span>
            <div className="home-readiness-options">
              {([['exploring', 'Exploring'], ['planning', 'Planning'], ['implementing', 'Implementing']] as const).map(([value, label]) => (
                <button key={value} type="button" aria-pressed={stage === value} onClick={() => setStage(value)}>{label}</button>
              ))}
            </div>
          </div>
          <div className="home-readiness-question">
            <span>When do you need vendors?</span>
            <div className="home-readiness-options">
              {([['soon', 'As soon as possible'], ['quarter', 'Within 3 months'], ['later', 'Later / unsure']] as const).map(([value, label]) => (
                <button key={value} type="button" aria-pressed={timeline === value} onClick={() => setTimeline(value)}>{label}</button>
              ))}
            </div>
          </div>
          <button className="home-readiness-primary" type="button" onClick={reveal}>See my snapshot <ArrowRight size={18} aria-hidden="true" /></button>
        </div>
      ) : null}

      {step === "result" ? (
        <div className="home-readiness-result">
          <div className="home-readiness-result-head">
            <div className="home-readiness-score"><strong>{readiness.score}</strong><span>Readiness</span></div>
            <div><p className="home-readiness-kicker">Your vendor readiness snapshot</p><h2>{readiness.label}</h2><p>Your project is best matched with <strong>{category.name}</strong>.</p></div>
          </div>
          <div className="home-readiness-insights">
            <article><span>Primary category</span><strong>{category.name}</strong></article>
            <article><span>Also consider</span><strong>{category.adjacent.join(" + ")}</strong></article>
            <article><span>Next decision</span><strong>{stage === "exploring" ? "Clarify scope and must-have outcomes" : "Define evidence, integration and commercial criteria"}</strong></article>
          </div>
          <div className="home-readiness-actions">
            <button className="home-readiness-primary" type="button" onClick={() => setShowLead(true)}>Get a tailored shortlist <Send size={17} aria-hidden="true" /></button>
            <a href={category.slug ? `/vendors/${category.slug}` : "/web3vendorecosystem"}>Browse relevant vendors</a>
            <button type="button" onClick={() => setStep("qualify")}><ArrowLeft size={16} aria-hidden="true" /> Change answers</button>
          </div>
          {showLead ? (
            submitted ? (
              <div className="home-readiness-success"><Check size={22} aria-hidden="true" /><div><strong>Your request is in.</strong><p>FluidRWA will review your project and follow up with relevant next steps.</p></div></div>
            ) : (
              <form className="home-readiness-lead" onSubmit={submitLead}>
                <div><p className="home-readiness-kicker">Optional next step</p><h3>Where should we send your shortlist guidance?</h3></div>
                <label>First name<input name="firstName" autoComplete="given-name" required /></label>
                <label>Work email<input name="email" type="email" autoComplete="email" required /></label>
                <label>Company<input name="company" autoComplete="organization" required /></label>
                {error ? <p className="home-readiness-error" role="alert">{error}</p> : null}
                <button type="submit" disabled={submitting}>{submitting ? "Sending..." : "Request guidance"}</button>
                <small>Your details are used only to review and respond to this request.</small>
              </form>
            )
          ) : null}
        </div>
      ) : null}
      <a className="home-readiness-directory-link" href="/web3vendorecosystem">Prefer to explore independently? Browse the vendor directory</a>
    </section>,
    host
  );
}
