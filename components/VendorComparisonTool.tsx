"use client";

import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { vendorComparisonCategories } from "@/lib/vendorComparisonTool";

type VendorAnalysis = {
  url: string;
  name: string;
  score: number;
  fit: "Strong fit" | "Possible fit" | "Weak fit";
  summary: string;
  strengths: string[];
  watchouts: string[];
  relevantSignals: string[];
  missingSignals: string[];
  references: Array<{ label: string; url: string; evidence: string }>;
};

type ComparisonResult = {
  ok: boolean;
  message?: string;
  projectSignals?: string[];
  recommendation?: string;
  vendors?: VendorAnalysis[];
};

const MAX_URLS = 5;
const accessStorageKey = "fluidrwa.vendorComparison.access";
const pendingAccessStorageKey = "fluidrwa.vendorComparison.pendingAccess";
const signedUpStorageKey = "fluidrwa.accountSignup.completed";

const starterUrls = [
  "https://securitize.io",
  "https://tokeny.com",
  "https://www.taurusgroup.ch"
];

const comparisonSignals = [
  "Product and category fit",
  "Use-case language",
  "Compliance and jurisdiction signals",
  "Custody, onboarding and integration clues",
  "Visible gaps and diligence questions"
];

const exampleProjects = [
  "Tokenized private credit fund with KYC, custody, transfer restrictions and investor reporting",
  "Stablecoin payment workflow for marketplace payouts across multiple regions",
  "Smart contract audit shortlist for a DeFi or RWA protocol before mainnet launch"
];

const faqItems = [
  {
    question: "How does the vendor comparison score work?",
    answer:
      "The score compares the project description against public content from each vendor URL. It looks for matching category signals, product language, compliance clues, integration terms and missing requirements. It is useful for shortlisting, but it is not a replacement for procurement diligence."
  },
  {
    question: "Can I compare vendors from different categories?",
    answer:
      "Yes. You can compare up to five URLs even if the vendors are in different categories, such as tokenization platforms, custody providers, KYC tools, smart contract auditors, data providers or AI tools."
  },
  {
    question: "Which URLs should I paste?",
    answer:
      "Use the official vendor homepage, product page, category page or solution page. A specific product page usually gives a better result than a generic homepage because it contains clearer evidence for the comparison."
  },
  {
    question: "Does FluidRWA contact the vendors automatically?",
    answer:
      "No. The comparison is generated for research. If you want help with outreach, you can submit the brief and FluidRWA can review the project before making introductions."
  }
];

export function VendorComparisonTool() {
  const [urls, setUrls] = useState<string[]>(starterUrls);
  const [projectDescription, setProjectDescription] = useState("");
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [message, setMessage] = useState("");
  const [leadForm, setLeadForm] = useState({ name: "", email: "", company: "" });
  const [leadStatus, setLeadStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [leadMessage, setLeadMessage] = useState("");
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);

  const activeUrls = useMemo(() => urls.map((url) => url.trim()).filter(Boolean).slice(0, MAX_URLS), [urls]);
  const canAddUrl = urls.length < MAX_URLS;
  const needsBetterRecommendations = Boolean(result?.vendors?.length) && !result?.vendors?.some((vendor) => vendor.score >= 72);
  const recommendedCategories = useMemo(() => {
    const signals = new Set(result?.projectSignals || []);
    const categoryMap: Record<string, string[]> = {
      Tokenization: ["tokenization", "custody", "kyc-aml"],
      Custody: ["custody", "tokenization", "stablecoins"],
      "KYC / AML": ["kyc-aml", "blockchain-analytics"],
      "Stablecoin payments": ["stablecoins", "fiat-ramps", "custody"],
      "Smart contracts": ["smart-contracts", "oracles"],
      "Data / Oracles": ["oracles", "blockchain-analytics"],
      Infrastructure: ["rpc", "interoperability"],
      AI: ["smart-contracts", "blockchain-analytics", "rpc"]
    };
    const ids = [...signals].flatMap((signal) => categoryMap[signal] || []);
    const fallbackIds = ["tokenization", "custody", "kyc-aml", "smart-contracts"];
    const orderedIds = [...new Set([...ids, ...fallbackIds])].slice(0, 4);
    return orderedIds
      .map((id) => vendorComparisonCategories.find((category) => category.id === id))
      .filter(Boolean)
      .map((category) => category!);
  }, [result?.projectSignals]);

  const updateUrl = (index: number, value: string) => {
    setResult(null);
    setUrls((current) => current.map((item, itemIndex) => (itemIndex === index ? value : item)));
  };

  const removeUrl = (index: number) => {
    setResult(null);
    setUrls((current) => current.filter((_, itemIndex) => itemIndex !== index));
  };

  const addUrl = () => {
    if (canAddUrl) setUrls((current) => [...current, ""]);
  };

  const runComparison = async (override?: { urls?: string[]; projectDescription?: string }) => {
    const comparisonUrls = (override?.urls || activeUrls).map((url) => url.trim()).filter(Boolean).slice(0, MAX_URLS);
    const comparisonProjectDescription = (override?.projectDescription ?? projectDescription).trim();

    setStatus("loading");
    setMessage("Reading vendor websites and building the comparison...");
    setResult(null);

    try {
      const response = await fetch("/api/vendor-url-comparison", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls: comparisonUrls, projectDescription: comparisonProjectDescription })
      });
      const data = (await response.json()) as ComparisonResult;
      if (!response.ok || !data.ok) throw new Error(data.message || "The comparison could not be generated.");
      setResult(data);
      setStatus("success");
      setMessage("Comparison ready.");
      setShowProjectModal(false);
      setShowAccessModal(false);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "The comparison could not be generated.");
    }
  };

  useEffect(() => {
    try {
      const signedUp = window.localStorage.getItem(signedUpStorageKey);
      const unlocked = window.localStorage.getItem(accessStorageKey);
      const pendingRaw = window.localStorage.getItem(pendingAccessStorageKey);

      if (unlocked || signedUp) setHasAccess(true);

      if (!signedUp || !pendingRaw) return;

      const pending = JSON.parse(pendingRaw) as { urls?: string[]; projectDescription?: string };
      const restoredUrls = Array.isArray(pending.urls) ? pending.urls.map((url) => String(url || "").trim()).filter(Boolean).slice(0, MAX_URLS) : [];
      const restoredProjectDescription = typeof pending.projectDescription === "string" ? pending.projectDescription.trim() : "";

      if (!restoredUrls.length || restoredProjectDescription.length < 30) return;

      setUrls(restoredUrls);
      setProjectDescription(restoredProjectDescription);
      setHasAccess(true);
      window.localStorage.setItem(accessStorageKey, JSON.stringify({ method: "linkedin", unlockedAt: Date.now() }));
      window.localStorage.removeItem(pendingAccessStorageKey);
      void runComparison({ urls: restoredUrls, projectDescription: restoredProjectDescription });
    } catch {
      setHasAccess(false);
    }
  }, []);

  const requestComparisonAccess = () => {
    if (projectDescription.trim().length < 30) {
      setStatus("error");
      setMessage("Please describe the project in a little more detail before scoring vendors.");
      return;
    }

    if (hasAccess) {
      void runComparison();
      return;
    }
    setLeadStatus("idle");
    setLeadMessage("");
    setShowAccessModal(true);
  };

  const submitComparisonLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLeadStatus("loading");
    setLeadMessage("Unlocking the comparison...");

    try {
      const response = await fetch("/api/vendor-comparison-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...leadForm,
          projectDescription,
          pageUrl: typeof window !== "undefined" ? window.location.pathname : "/tools/vendor-comparison",
          urls: activeUrls,
          recommendation: result?.recommendation || "Lead captured before score reveal.",
          vendors: result?.vendors || []
        })
      });
      const data = (await response.json()) as { ok?: boolean; message?: string };
      if (!response.ok || !data.ok) throw new Error(data.message || "This comparison could not be sent.");
      try {
        window.localStorage.setItem(accessStorageKey, JSON.stringify({ email: leadForm.email, method: "email", unlockedAt: Date.now() }));
      } catch {
        // Browsers can block local storage in private mode; the current session still unlocks.
      }
      setHasAccess(true);
      setLeadStatus("success");
      setLeadMessage("Unlocked. Generating your vendor scores now...");
      setShowAccessModal(false);
      await runComparison();
    } catch (error) {
      setLeadStatus("error");
      setLeadMessage(error instanceof Error ? error.message : "This comparison could not be unlocked.");
    }
  };

  const rememberLinkedInAttempt = () => {
    try {
      window.localStorage.setItem(
        pendingAccessStorageKey,
        JSON.stringify({ method: "linkedin", urls: activeUrls, projectDescription, unlockedAt: Date.now() })
      );
    } catch {
      // The OAuth route still works without local storage.
    }
  };

  const submitBriefHref = `/submit-requirement?source=vendor-url-comparison&notes=${encodeURIComponent(
    `Project: ${projectDescription || "Not provided"}\nVendors: ${activeUrls.join(", ")}`
  )}`;

  return (
    <div className="vendor-compare-page">
      <section className="vendor-compare-hero">
        <div className="light-container vendor-compare-hero-grid">
          <div>
            <p className="eyebrow light-eyebrow">Vendor comparison tool</p>
            <h1>Compare Web3, RWA and AI vendors before you shortlist</h1>
            <p>
              Paste up to five vendor websites, describe your project and get a source-referenced comparison table with
              project-fit scoring, strengths, watch-outs and next diligence questions.
            </p>
            <div className="vendor-compare-actions">
              <a className="btn-primary" href="#compare-workspace">Start comparing</a>
              <a className="btn-secondary" href="/web3vendorecosystem">Browse vendors</a>
            </div>
          </div>
          <aside className="vendor-compare-hero-panel vendor-compare-scorecard" aria-label="Comparison tool outputs">
            <div>
              <small>What you get</small>
              <strong>Fit-ranked vendor table</strong>
            </div>
            <dl>
              <div>
                <dt>5</dt>
                <dd>URLs per comparison</dd>
              </div>
              <div>
                <dt>Live</dt>
                <dd>source-page references</dd>
              </div>
            </dl>
            <ul>
              <li>Strengths and watch-outs</li>
              <li>Signals matched to your brief</li>
              <li>Intro-ready project summary</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="light-container vendor-compare-trust-strip" aria-label="Supported comparison areas">
        <span>Tokenization platforms</span>
        <span>Custody providers</span>
        <span>KYC and AML</span>
        <span>Stablecoin payments</span>
        <span>Smart contract audits</span>
        <span>AI vendors</span>
      </section>

      <section className="light-container vendor-url-tool" id="compare-workspace">
        <div className="vendor-url-tool-head">
          <div>
            <p className="eyebrow light-eyebrow">Live comparison</p>
            <h2>Add the vendors you are considering</h2>
            <p>
              Use official homepage, product or category URLs. The tool works best when the pages clearly explain product,
              use cases, industries, coverage and compliance or infrastructure capabilities.
            </p>
          </div>
          <button type="button" onClick={() => setShowProjectModal(true)} disabled={!activeUrls.length}>
            Score vendor fit
          </button>
        </div>

        <div className="vendor-url-inputs">
          {urls.map((url, index) => (
            <label key={index}>
              <span>Vendor website {index + 1}</span>
              <div>
                <input
                  value={url}
                  onChange={(event) => updateUrl(index, event.target.value)}
                  placeholder="https://vendor.com"
                  inputMode="url"
                />
                {urls.length > 1 ? (
                  <button type="button" onClick={() => removeUrl(index)} aria-label={`Remove vendor website ${index + 1}`}>
                    Remove
                  </button>
                ) : null}
              </div>
            </label>
          ))}
        </div>

        <div className="vendor-url-actions">
          <button type="button" onClick={addUrl} disabled={!canAddUrl}>
            Add another vendor
          </button>
          <small>{activeUrls.length}/{MAX_URLS} vendors ready</small>
        </div>

        {message ? <p className={`vendor-url-status is-${status}`}>{message}</p> : null}
      </section>

      <section className="light-container vendor-compare-explain" aria-labelledby="vendor-compare-explain-title">
        <div className="vendor-compare-explain-copy">
          <p className="eyebrow light-eyebrow">How to use it</p>
          <h2 id="vendor-compare-explain-title">Built for early vendor research, not generic directory browsing</h2>
          <p>
            Most vendor lists tell you who exists. This tool is designed for the harder question buyers actually have:
            which vendors look relevant for this specific project, based on what they publicly claim and what still needs
            to be verified before outreach.
          </p>
        </div>
        <div className="vendor-compare-signal-grid">
          {comparisonSignals.map((signal, index) => (
            <div key={signal}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{signal}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="light-container vendor-compare-examples" aria-labelledby="vendor-compare-examples-title">
        <div>
          <p className="eyebrow light-eyebrow">Example briefs</p>
          <h2 id="vendor-compare-examples-title">Describe the buying problem, not only the category</h2>
        </div>
        <div>
          {exampleProjects.map((example) => (
            <button
              type="button"
              key={example}
              onClick={() => {
                setProjectDescription(example);
                setShowProjectModal(true);
              }}
            >
              {example}
            </button>
          ))}
        </div>
      </section>

      {showProjectModal ? (
        <div className="vendor-project-modal" role="dialog" aria-modal="true" aria-labelledby="vendor-project-modal-title">
          <div className="vendor-project-modal-card">
            <button className="vendor-project-modal-close" type="button" onClick={() => setShowProjectModal(false)} aria-label="Close">
              ×
            </button>
            <p className="eyebrow light-eyebrow">Project context</p>
            <h2 id="vendor-project-modal-title">Describe what you need the vendors for</h2>
            <p>
              Include asset type, region, buyer type, timeline, must-have integrations, compliance needs and anything that would make a vendor a poor fit.
            </p>
            <textarea
              value={projectDescription}
              onChange={(event) => setProjectDescription(event.target.value)}
              placeholder="Example: We are launching a tokenized private credit product for accredited investors in the US and UAE. We need issuance, investor onboarding, custody integration, stablecoin subscriptions and transfer restrictions..."
            />
            <div className="vendor-project-modal-actions">
              <button type="button" onClick={requestComparisonAccess} disabled={status === "loading"}>
                {status === "loading" ? "Generating..." : "Generate comparison"}
              </button>
              <button type="button" onClick={() => setShowProjectModal(false)}>
                Cancel
              </button>
            </div>
            {message ? <p className={`vendor-url-status is-${status}`}>{message}</p> : null}
          </div>
        </div>
      ) : null}

      {showAccessModal ? (
        <div className="vendor-project-modal" role="dialog" aria-modal="true" aria-labelledby="vendor-access-modal-title">
          <div className="vendor-project-modal-card vendor-access-modal-card">
            <button className="vendor-project-modal-close" type="button" onClick={() => setShowAccessModal(false)} aria-label="Close">
              ×
            </button>
            <p className="eyebrow light-eyebrow">Unlock scores</p>
            <h2 id="vendor-access-modal-title">Where should we send follow-up if this shortlist needs review?</h2>
            <p>
              Add your email or continue with LinkedIn to reveal the scored table. The comparison still runs instantly after this step.
            </p>
            <div className="vendor-access-options">
              <a
                href={`/api/auth/oauth?provider=linkedin&next=${encodeURIComponent("/tools/vendor-comparison#compare-workspace")}`}
                onClick={rememberLinkedInAttempt}
              >
                Continue with LinkedIn
              </a>
            </div>
            <form className="vendor-access-form" onSubmit={submitComparisonLead}>
              <label>
                <span>Work email</span>
                <input
                  type="email"
                  value={leadForm.email}
                  onChange={(event) => setLeadForm((current) => ({ ...current, email: event.target.value }))}
                  placeholder="name@company.com"
                  required
                />
              </label>
              <label>
                <span>Name</span>
                <input
                  value={leadForm.name}
                  onChange={(event) => setLeadForm((current) => ({ ...current, name: event.target.value }))}
                  placeholder="Optional"
                />
              </label>
              <label>
                <span>Company</span>
                <input
                  value={leadForm.company}
                  onChange={(event) => setLeadForm((current) => ({ ...current, company: event.target.value }))}
                  placeholder="Optional"
                />
              </label>
              <button type="submit" disabled={leadStatus === "loading"}>
                {leadStatus === "loading" ? "Unlocking..." : "Reveal comparison"}
              </button>
              {leadMessage ? <p className={`vendor-lead-status is-${leadStatus}`}>{leadMessage}</p> : null}
            </form>
          </div>
        </div>
      ) : null}

      {result?.vendors?.length ? (
        <section className="light-container vendor-url-results" aria-labelledby="vendor-url-results-title">
          <div className="vendor-url-results-head">
            <div>
              <p className="eyebrow light-eyebrow">Comparison result</p>
              <h2 id="vendor-url-results-title">Project-fit scoring table</h2>
              <p>{result.recommendation}</p>
              {result.projectSignals?.length ? (
                <div className="vendor-compare-tags">
                  {result.projectSignals.map((signal) => <span key={signal}>{signal}</span>)}
                </div>
              ) : null}
            </div>
            <a className="btn-primary" href={submitBriefHref}>
              Submit this brief
            </a>
          </div>

          <div className="vendor-url-table-wrap">
            <table className="vendor-url-table">
              <thead>
                <tr>
                  <th>Vendor</th>
                  <th>Score</th>
                  <th>Fit</th>
                  <th>Why it may fit</th>
                  <th>Watch-outs</th>
                  <th>References</th>
                </tr>
              </thead>
              <tbody>
                {result.vendors.map((vendor) => (
                  <tr key={vendor.url}>
                    <td>
                      <strong>{vendor.name}</strong>
                      <a href={vendor.url} target="_blank" rel="noreferrer">{vendor.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</a>
                    </td>
                    <td>
                      <span className={`vendor-score score-${vendor.fit.toLowerCase().replace(/\s+/g, "-")}`}>{vendor.score}</span>
                    </td>
                    <td>{vendor.fit}</td>
                    <td>
                      <p>{vendor.summary}</p>
                      <ul>
                        {vendor.strengths.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </td>
                    <td>
                      <ul>
                        {vendor.watchouts.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </td>
                    <td>
                      {vendor.references.map((reference) => (
                        <div className="vendor-reference" key={reference.url}>
                          <a href={reference.url} target="_blank" rel="noreferrer">{reference.label}</a>
                          <small>{reference.evidence}</small>
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {needsBetterRecommendations ? (
            <div className="vendor-recommendation-card">
              <div>
                <p className="eyebrow light-eyebrow">Shortlist gap</p>
                <h3>None of these vendors look like an obvious strong fit yet</h3>
                <p>
                  Use this as a signal to widen the search. FluidRWA can suggest stronger categories and vendors based on
                  the project brief before you spend time on outreach.
                </p>
              </div>
              <button type="button" onClick={() => setShowRecommendations((current) => !current)}>
                {showRecommendations ? "Hide recommendations" : "Generate recommendations"}
              </button>
              {showRecommendations ? (
                <div className="vendor-recommendation-grid">
                  {recommendedCategories.map((category) => (
                    <a href={category.href} key={category.id}>
                      <strong>{category.label}</strong>
                      <span>{category.buyerIntent}</span>
                      <small>{category.vendors.slice(0, 3).map((vendor) => vendor.name).join(" / ")}</small>
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}

          <div className="vendor-compare-lead-card">
            <div>
              <p className="eyebrow light-eyebrow">Need a second read?</p>
              <h3>Ask FluidRWA to review this vendor shortlist</h3>
              <p>
                The compared URLs and project brief have already been captured. Send a fuller requirement if you want
                FluidRWA to help with vendor outreach.
              </p>
            </div>
            <a className="btn-primary" href={submitBriefHref}>
              Submit full requirement
            </a>
          </div>
        </section>
      ) : null}

      <section className="light-container vendor-compare-bottom">
        <div>
          <p className="eyebrow light-eyebrow">Important</p>
          <h2>Use this as a first-pass shortlist, not final diligence</h2>
          <p>
            The tool scores public website fit and source-page evidence. Before buying, teams should still verify pricing,
            references, security evidence, jurisdiction support, contract terms and implementation ownership.
          </p>
        </div>
        <a className="btn-primary" href="/submit-requirement">
          Ask FluidRWA to help
        </a>
      </section>

      <section className="light-container vendor-compare-faq" aria-labelledby="vendor-compare-faq-title">
        <p className="eyebrow light-eyebrow">Questions buyers ask</p>
        <h2 id="vendor-compare-faq-title">Vendor comparison questions</h2>
        <div>
          {faqItems.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
