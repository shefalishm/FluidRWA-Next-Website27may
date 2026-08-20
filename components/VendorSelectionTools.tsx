"use client";

import { useMemo, useState } from "react";
import {
  formatVendorBrief,
  scoreVendorTool,
  vendorToolConfigs,
  type VendorRecommendation,
  type VendorToolAnswers,
  type VendorToolConfig,
  type VendorToolKey
} from "@/lib/vendorSelectionTools";

const defaultAnswers = (tool: VendorToolConfig): VendorToolAnswers => {
  const answers: VendorToolAnswers = {};
  tool.questions.forEach((question) => {
    answers[question.id] = question.type === "multi" ? [] : "";
  });
  return answers;
};

const completedQuestions = (tool: VendorToolConfig, answers: VendorToolAnswers) =>
  tool.questions.filter((question) => {
    const answer = answers[question.id];
    return Array.isArray(answer) ? answer.length > 0 : Boolean(answer);
  }).length;

export function VendorSelectionTools() {
  const [activeKey, setActiveKey] = useState<VendorToolKey>("vendor-stack");
  const activeTool = vendorToolConfigs.find((tool) => tool.key === activeKey) || vendorToolConfigs[0];
  const [answersByTool, setAnswersByTool] = useState<Record<VendorToolKey, VendorToolAnswers>>(() => {
    return Object.fromEntries(vendorToolConfigs.map((tool) => [tool.key, defaultAnswers(tool)])) as Record<VendorToolKey, VendorToolAnswers>;
  });
  const [lead, setLead] = useState({
    firstName: "",
    lastName: "",
    contactEmail: "",
    companyName: "",
    role: "",
    country: "",
    notes: ""
  });
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const answers = answersByTool[activeTool.key] || defaultAnswers(activeTool);
  const recommendations = useMemo(() => scoreVendorTool(activeTool, answers), [activeTool, answers]);
  const brief = useMemo(() => formatVendorBrief(activeTool, answers, recommendations), [activeTool, answers, recommendations]);
  const completion = completedQuestions(activeTool, answers);
  const isReady = completion === activeTool.questions.length && recommendations.length > 0;

  const updateAnswer = (questionId: string, value: string, checked?: boolean) => {
    setSubmitState("idle");
    setSubmitMessage("");
    setAnswersByTool((current) => {
      const currentAnswers = current[activeTool.key] || defaultAnswers(activeTool);
      const question = activeTool.questions.find((item) => item.id === questionId);
      const nextAnswers: VendorToolAnswers = { ...currentAnswers };

      if (question?.type === "multi") {
        const existing = Array.isArray(currentAnswers[questionId]) ? (currentAnswers[questionId] as string[]) : [];
        nextAnswers[questionId] = checked ? [...new Set([...existing, value])] : existing.filter((item) => item !== value);
      } else {
        nextAnswers[questionId] = value;
      }

      return { ...current, [activeTool.key]: nextAnswers };
    });
  };

  const selectTool = (key: VendorToolKey) => {
    setActiveKey(key);
    setSubmitState("idle");
    setSubmitMessage("");
    setCopied(false);
  };

  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(brief);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const submitLead = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isReady) {
      setSubmitState("error");
      setSubmitMessage("Complete the tool questions first so FluidRWA can route the right vendor categories.");
      return;
    }

    setSubmitState("loading");
    setSubmitMessage("Saving your vendor shortlist request...");

    const categoryLabels = recommendations.map((item) => item.label).join(", ");
    const payload = {
      vendorName: "FluidRWA vendor selection tools",
      vendorCategory: categoryLabels,
      source: "vendor-selection-tools",
      pageUrl: window.location.href,
      leadSource: `Vendor selection tool: ${activeTool.title}`,
      contactEmail: lead.contactEmail,
      firstName: lead.firstName,
      lastName: lead.lastName,
      title: lead.role,
      companyName: lead.companyName,
      country: lead.country,
      projectDescription: `${brief}\n\nBuyer notes:\n${lead.notes || "No additional notes provided."}`,
      rawPayload: {
        tool: activeTool.key,
        toolTitle: activeTool.title,
        answers,
        recommendations: recommendations.map((item) => ({
          category: item.label,
          href: item.href,
          confidence: item.confidence,
          reasons: item.reasons
        }))
      }
    };

    try {
      const response = await fetch("/api/vendor-intro-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.message || "The request could not be saved.");
      setSubmitState("success");
      setSubmitMessage("Received. FluidRWA has saved this vendor shortlist request.");
    } catch (error) {
      setSubmitState("error");
      setSubmitMessage(error instanceof Error ? error.message : "The request could not be saved. Please try again.");
    }
  };

  return (
    <div className="vendor-tools-shell">
      <section className="vendor-tools-hero">
        <div className="light-container vendor-tools-hero-grid">
          <div>
            <p className="eyebrow light-eyebrow">Vendor discovery tools</p>
            <h1>Find the right vendor categories before you start outreach</h1>
            <p>
              These tools are designed for lead routing, not toy quizzes. They use transparent rules, buyer inputs and FluidRWA category coverage to recommend vendor groups, verification questions and next-step shortlists.
            </p>
            <div className="vendor-tools-hero-actions">
              <a className="btn-primary" href="#vendor-tool-workspace">Start matching</a>
              <a className="btn-secondary" href="/web3vendorecosystem">Browse directory</a>
            </div>
          </div>
          <aside className="vendor-tools-proof" aria-label="Tool quality guardrails">
            <span>Rule-based scoring</span>
            <span>Visible recommendation reasons</span>
            <span>Category pages linked</span>
            <span>Lead brief saved to Supabase</span>
          </aside>
        </div>
      </section>

      <section className="light-container vendor-tools-section" id="vendor-tool-workspace">
        <div className="vendor-tools-layout">
          <aside className="vendor-tool-tabs" aria-label="Vendor selection tools">
            {vendorToolConfigs.map((tool) => (
              <button key={tool.key} type="button" className={tool.key === activeKey ? "is-active" : ""} onClick={() => selectTool(tool.key)}>
                <span>{tool.eyebrow}</span>
                {tool.shortTitle}
              </button>
            ))}
          </aside>

          <div className="vendor-tool-main">
            <div className="vendor-tool-card vendor-tool-intro">
              <p className="eyebrow light-eyebrow">{activeTool.eyebrow}</p>
              <h2>{activeTool.title}</h2>
              <p>{activeTool.description}</p>
              <small>{activeTool.intent}</small>
              <div className="vendor-tool-progress" aria-label="Tool completion">
                <span style={{ width: `${Math.round((completion / activeTool.questions.length) * 100)}%` }} />
              </div>
            </div>

            <div className="vendor-tool-questions">
              {activeTool.questions.map((question) => (
                <fieldset className="vendor-tool-question" key={question.id}>
                  <legend>{question.label}</legend>
                  <p>{question.helper}</p>
                  <div className={question.type === "multi" ? "vendor-tool-options is-multi" : "vendor-tool-options"}>
                    {question.options.map((option) => {
                      const answer = answers[question.id];
                      const selected = Array.isArray(answer) ? answer.includes(option.value) : answer === option.value;
                      return (
                        <label className={selected ? "is-selected" : ""} key={option.value}>
                          <input
                            type={question.type === "multi" ? "checkbox" : "radio"}
                            name={question.id}
                            value={option.value}
                            checked={selected}
                            onChange={(event) => updateAnswer(question.id, option.value, event.currentTarget.checked)}
                          />
                          <span>{option.label}</span>
                          <small>{option.reason}</small>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              ))}
            </div>
          </div>

          <aside className="vendor-tool-results" aria-label="Recommended vendor categories">
            <div className="vendor-tool-card">
              <div className="vendor-results-head">
                <div>
                  <p className="eyebrow light-eyebrow">Recommended path</p>
                  <h2>{isReady ? "Vendor categories to shortlist" : "Answer the questions to build a path"}</h2>
                </div>
                <button type="button" onClick={copyBrief} disabled={!recommendations.length}>
                  {copied ? "Copied" : "Copy brief"}
                </button>
              </div>

              <div className="vendor-recommendation-list">
                {recommendations.length ? (
                  recommendations.map((item: VendorRecommendation) => (
                    <article className={`vendor-recommendation confidence-${item.confidence.toLowerCase()}`} key={item.id}>
                      <div>
                        <span>{item.confidence}</span>
                        <h3>{item.label}</h3>
                      </div>
                      <p>{item.buyerUse}</p>
                      <ul>
                        {item.reasons.map((reason) => (
                          <li key={reason}>{reason}</li>
                        ))}
                      </ul>
                      <div className="vendor-rec-footer">
                        <small>Examples: {item.examples.join(", ")}</small>
                        <a href={item.href}>View category</a>
                      </div>
                    </article>
                  ))
                ) : (
                  <p className="vendor-empty-state">Select a few inputs and FluidRWA will map the likely vendor categories.</p>
                )}
              </div>
            </div>

            <form className="vendor-tool-lead-form" onSubmit={submitLead}>
              <p className="eyebrow light-eyebrow">Send me the shortlist</p>
              <h2>Ask FluidRWA to route this vendor path</h2>
              <div className="vendor-tool-form-grid">
                <label>
                  First name
                  <input value={lead.firstName} onChange={(event) => setLead({ ...lead, firstName: event.target.value })} required />
                </label>
                <label>
                  Last name
                  <input value={lead.lastName} onChange={(event) => setLead({ ...lead, lastName: event.target.value })} required />
                </label>
                <label>
                  Work email
                  <input type="email" value={lead.contactEmail} onChange={(event) => setLead({ ...lead, contactEmail: event.target.value })} required />
                </label>
                <label>
                  Company
                  <input value={lead.companyName} onChange={(event) => setLead({ ...lead, companyName: event.target.value })} required />
                </label>
                <label>
                  Role
                  <input value={lead.role} onChange={(event) => setLead({ ...lead, role: event.target.value })} />
                </label>
                <label>
                  Country
                  <input value={lead.country} onChange={(event) => setLead({ ...lead, country: event.target.value })} />
                </label>
              </div>
              <label>
                What are you trying to find?
                <textarea value={lead.notes} onChange={(event) => setLead({ ...lead, notes: event.target.value })} placeholder="Share context, timeline, budget stage or vendor categories you already considered." />
              </label>
              <button type="submit" disabled={submitState === "loading"}>
                {submitState === "loading" ? "Saving..." : "Send shortlist request"}
              </button>
              {submitMessage ? <p className={`vendor-tool-status is-${submitState}`}>{submitMessage}</p> : null}
            </form>
          </aside>
        </div>
      </section>
    </div>
  );
}
