"use client";

import { FormEvent, useState } from "react";
import { freelancerCategories, freelancerTags, type FreelancerCategory, type FreelancerProfile } from "@/lib/freelancerMarketplace";

type DraftProfile = {
  name: string;
  email: string;
  title: string;
  location: string;
  category: FreelancerCategory;
  tags: string[];
  rate: string;
  availability: string;
  experience: string;
  summary: string;
  services: string;
  portfolioUrl: string;
  linkedinUrl: string;
  githubUrl: string;
  websiteUrl: string;
  fileNames: string[];
  consent: boolean;
  websiteUrlTrap: string;
};

const storageKey = "fluidrwa.freelancer.previewProfiles";

const emptyDraft: DraftProfile = {
  name: "",
  email: "",
  title: "",
  location: "",
  category: "Tokenization",
  tags: ["RWA"],
  rate: "",
  availability: "",
  experience: "",
  summary: "",
  services: "",
  portfolioUrl: "",
  linkedinUrl: "",
  githubUrl: "",
  websiteUrl: "",
  fileNames: [],
  consent: false,
  websiteUrlTrap: ""
};

function isCategory(value: string): value is FreelancerCategory {
  return freelancerCategories.includes(value as FreelancerCategory);
}

function formatFreeUntil(value?: string) {
  if (!value) return "Free listing for the first 3 months after approval";
  return `Free listing until ${new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value))}`;
}

export function FreelancerMarketplacePreview() {
  const [draft, setDraft] = useState<DraftProfile>(emptyDraft);
  const [status, setStatus] = useState("");
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [startedAt] = useState(() => Date.now());

  function updateDraft(field: keyof DraftProfile, value: string | boolean | string[]) {
    setDraft((current) => ({
      ...current,
      [field]: field === "category" && typeof value === "string" && isCategory(value) ? value : value
    }));
  }

  function toggleTag(tag: string) {
    setDraft((current) => {
      const tags = current.tags.includes(tag) ? current.tags.filter((item) => item !== tag) : [...current.tags, tag];
      return { ...current, tags: tags.slice(0, 6) };
    });
  }

  async function submitProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.name || !draft.email || !draft.title || !draft.summary || !draft.consent) {
      setSubmitState("error");
      setStatus("Please add name, email, headline, profile summary and consent before submitting.");
      return;
    }

    if (draft.summary.trim().length < 80) {
      setSubmitState("error");
      setStatus("Please add more detail in the summary so we can understand your portfolio properly.");
      return;
    }

    setSubmitState("submitting");
    setStatus("Saving your portfolio submission for FluidRWA review...");

    const services = draft.services
      .split(",")
      .map((service) => service.trim())
      .filter(Boolean)
      .slice(0, 5);

    const profile: FreelancerProfile = {
      id: `preview-${Date.now()}`,
      name: draft.name.trim(),
      title: draft.title.trim(),
      location: draft.location.trim() || "Remote",
      category: draft.category,
      tags: draft.tags.length ? draft.tags : ["RWA"],
      rate: draft.rate.trim() || "Rate on request",
      availability: draft.availability.trim() || "Open to projects",
      experience: draft.experience.trim() || "Experience not listed",
      summary: draft.summary.trim(),
      services: services.length ? services : ["Portfolio review pending"],
      portfolioUrl: draft.portfolioUrl.trim() || "#",
      linkedinUrl: draft.linkedinUrl.trim() || "#",
      githubUrl: draft.githubUrl.trim() || undefined,
      websiteUrl: draft.websiteUrl.trim() || undefined,
      fileNames: draft.fileNames,
      verified: false,
      status: "pending_review",
      freeUntil: "Submitted for review - free first 3 months after approval"
    };

    try {
      const response = await fetch("/api/freelancer-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: draft.name,
          contactEmail: draft.email,
          headline: draft.title,
          category: draft.category,
          location: draft.location,
          rate: draft.rate,
          availability: draft.availability,
          experience: draft.experience,
          summary: draft.summary,
          services,
          tags: draft.tags,
          portfolioUrl: draft.portfolioUrl,
          linkedinUrl: draft.linkedinUrl,
          githubUrl: draft.githubUrl,
          websiteUrl: draft.websiteUrl,
          fileNames: draft.fileNames,
          consent: draft.consent,
          source: "freelancer-launch-form",
          pageUrl: window.location.href,
          startedAt,
          websiteUrlTrap: draft.websiteUrlTrap
        })
      });
      const result = (await response.json()) as { ok?: boolean; message?: string; profileId?: string; freeUntil?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "Profile could not be saved.");
      }

      const savedProfile = {
        ...profile,
        id: result.profileId || profile.id,
        freeUntil: formatFreeUntil(result.freeUntil)
      };
      const saved = window.localStorage.getItem(storageKey);
      const profiles = saved ? (JSON.parse(saved) as FreelancerProfile[]) : [];
      window.localStorage.setItem(storageKey, JSON.stringify([savedProfile, ...profiles]));
      setDraft(emptyDraft);
      setSubmitState("success");
      setStatus(
        result.message ||
          "Your portfolio submission has been received. We will review it before listings go live on July 30."
      );
    } catch (error) {
      setSubmitState("error");
      setStatus(error instanceof Error ? error.message : "Profile could not be saved yet.");
    }
  }

  return (
    <main className="freelancer-preview-page freelancer-launch-page">
      <section className="freelancer-hero freelancer-launch-hero">
        <div className="light-container freelancer-hero-grid">
          <div>
            <p className="eyebrow light-eyebrow">Launching July 30, 2026</p>
            <h1>Put your RWA and Web3 portfolio in front of the right buyers</h1>
            <p>
              FluidRWA is collecting portfolio submissions from specialists across tokenization, compliance, legal,
              smart contracts, research, design, finance, AI infrastructure and growth before the launch.
            </p>
            <div className="freelancer-actions">
              <a className="btn btn-primary" href="#submit-portfolio">
                Submit portfolio
              </a>
              <a className="btn btn-secondary" href="/specialist-directory/directory">
                Buyer access
              </a>
            </div>
          </div>
          <div className="freelancer-hero-panel" aria-label="Launch timeline">
            <div className="freelancer-panel-top">
              <span>Launch date</span>
              <strong>30 July</strong>
            </div>
            <div className="freelancer-mini-card">
              <b>Now collecting portfolios</b>
              <span>Reviewed submissions become launch listings</span>
            </div>
            <div className="freelancer-mini-card">
              <b>Free first 3 months</b>
              <span>Founding specialists get early visibility</span>
            </div>
          </div>
        </div>
      </section>

      <section className="light-container freelancer-flow-section" aria-labelledby="launch-model-title">
        <div className="freelancer-section-head">
          <p className="eyebrow light-eyebrow">How it will work</p>
          <h2 id="launch-model-title">Launch flow</h2>
        </div>
        <div className="freelancer-model-grid">
          <article>
            <span>01</span>
            <h3>Specialists submit portfolios</h3>
            <p>Profiles include skills, links, services, tags, availability, proof points and portfolio files.</p>
          </article>
          <article>
            <span>02</span>
            <h3>FluidRWA reviews listings</h3>
            <p>Submissions stay in review until they are approved for the July 30 launch directory.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Buyers sign up first</h3>
            <p>Google, LinkedIn or email sign-up will gate the directory before users can search profiles.</p>
          </article>
          <article>
            <span>04</span>
            <h3>Contacts route through FluidRWA</h3>
            <p>Buyers request an intro instead of contacting specialists directly, creating trackable demand.</p>
          </article>
        </div>
      </section>

      <section className="light-container freelancer-apply-grid" id="submit-portfolio" aria-labelledby="freelancer-apply-title">
        <div className="freelancer-form-card">
          <p className="eyebrow light-eyebrow">Portfolio submission</p>
          <h2 id="freelancer-apply-title">Apply for a launch listing</h2>
          <p>
            We are collecting profiles now. Approved specialists will be included when the FluidRWA specialist directory
            launches on July 30.
          </p>

          <form className="freelancer-form" onSubmit={submitProfile}>
            <label className="freelancer-hidden-field">
              Company website
              <input
                autoComplete="off"
                tabIndex={-1}
                value={draft.websiteUrlTrap}
                onChange={(event) => updateDraft("websiteUrlTrap", event.target.value)}
              />
            </label>
            <label>
              Name
              <input value={draft.name} onChange={(event) => updateDraft("name", event.target.value)} placeholder="Full name" />
            </label>
            <label>
              Email
              <input
                value={draft.email}
                onChange={(event) => updateDraft("email", event.target.value)}
                placeholder="you@example.com"
                type="email"
              />
            </label>
            <label>
              Professional headline
              <input
                value={draft.title}
                onChange={(event) => updateDraft("title", event.target.value)}
                placeholder="RWA compliance consultant"
              />
            </label>
            <label>
              Category
              <select value={draft.category} onChange={(event) => updateDraft("category", event.target.value)}>
                {freelancerCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Location
              <input value={draft.location} onChange={(event) => updateDraft("location", event.target.value)} placeholder="Remote, Dubai, London..." />
            </label>
            <label>
              Rate
              <input value={draft.rate} onChange={(event) => updateDraft("rate", event.target.value)} placeholder="$75/hr or project-based" />
            </label>
            <label>
              Experience
              <input value={draft.experience} onChange={(event) => updateDraft("experience", event.target.value)} placeholder="5 years" />
            </label>
            <label>
              Availability
              <input value={draft.availability} onChange={(event) => updateDraft("availability", event.target.value)} placeholder="Available from August" />
            </label>
            <label className="freelancer-form-wide">
              Portfolio summary
              <textarea
                value={draft.summary}
                onChange={(event) => updateDraft("summary", event.target.value)}
                placeholder="Explain what you do, who you help, your strongest proof points and what kind of projects you want."
              />
            </label>
            <label className="freelancer-form-wide">
              Services, separated by commas
              <input
                value={draft.services}
                onChange={(event) => updateDraft("services", event.target.value)}
                placeholder="Smart contract development, KYC workflow design, tokenization research"
              />
            </label>
            <label>
              Portfolio link
              <input value={draft.portfolioUrl} onChange={(event) => updateDraft("portfolioUrl", event.target.value)} placeholder="https://..." />
            </label>
            <label>
              LinkedIn
              <input value={draft.linkedinUrl} onChange={(event) => updateDraft("linkedinUrl", event.target.value)} placeholder="https://linkedin.com/in/..." />
            </label>
            <label>
              GitHub or code profile
              <input value={draft.githubUrl} onChange={(event) => updateDraft("githubUrl", event.target.value)} placeholder="https://github.com/..." />
            </label>
            <label>
              Personal website
              <input value={draft.websiteUrl} onChange={(event) => updateDraft("websiteUrl", event.target.value)} placeholder="https://..." />
            </label>
            <label className="freelancer-form-wide">
              Portfolio files
              <input
                multiple
                onChange={(event) => updateDraft("fileNames", Array.from(event.target.files || []).map((file) => file.name).slice(0, 5))}
                type="file"
              />
              <span className="freelancer-field-note">
                Preview captures file names only. Production should upload PDFs, resumes and case studies to Supabase Storage.
              </span>
            </label>

            <div className="freelancer-tag-picker freelancer-form-wide" aria-label="Select freelancer tags">
              {freelancerTags.map((tag) => (
                <button className={draft.tags.includes(tag) ? "is-active" : ""} key={tag} type="button" onClick={() => toggleTag(tag)}>
                  {tag}
                </button>
              ))}
            </div>
            <label className="freelancer-consent freelancer-form-wide">
              <input checked={draft.consent} onChange={(event) => updateDraft("consent", event.target.checked)} type="checkbox" />
              <span>
                I agree that FluidRWA can review this portfolio, contact me about the launch and publish approved
                profile information in the specialist directory.
              </span>
            </label>

            <button className="btn btn-primary freelancer-form-wide" disabled={submitState === "submitting"} type="submit">
              {submitState === "submitting" ? "Submitting..." : "Submit for July 30 launch"}
            </button>
          </form>
          {status ? <p className={`freelancer-status ${submitState === "error" ? "is-error" : ""}`}>{status}</p> : null}
        </div>

        <aside className="freelancer-requirements-card">
          <h3>What happens next</h3>
          <ul>
            <li>Your submission is saved for FluidRWA review.</li>
            <li>Approved profiles become launch listings on July 30.</li>
            <li>Listings are free for the first three months.</li>
            <li>Buyers will need to sign up before they can search.</li>
            <li>Buyer contact requests will route through FluidRWA first.</li>
          </ul>
        </aside>
      </section>

      <section className="light-container freelancer-flow-section" aria-labelledby="freelancer-faq-title">
        <div className="freelancer-section-head">
          <p className="eyebrow light-eyebrow">Freelancer application FAQ</p>
          <h2 id="freelancer-faq-title">Questions specialists ask before applying</h2>
        </div>
        <div className="freelancer-model-grid">
          <article>
            <span>01</span>
            <h3>Who should submit a portfolio?</h3>
            <p>
              Independent specialists, boutique teams and consultants working in tokenization, RWA compliance, smart
              contracts, legal structuring, AI infrastructure, research, finance, design or growth can apply.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>What makes a strong listing?</h3>
            <p>
              Clear services, relevant project examples, proof of domain experience, links to previous work and a
              specific description of the buyers or projects you support.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Will every profile go live?</h3>
            <p>
              No. FluidRWA will review submissions before publishing approved profiles so the directory remains useful
              for buyers looking for credible RWA and Web3 specialists.
            </p>
          </article>
          <article>
            <span>04</span>
            <h3>How do buyer introductions work?</h3>
            <p>
              Buyers will sign up before browsing, then request introductions through FluidRWA instead of contacting
              specialists directly from the directory.
            </p>
          </article>
        </div>
      </section>

    </main>
  );
}
