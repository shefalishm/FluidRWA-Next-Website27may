"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  freelancerCategories,
  freelancerTags,
  sampleFreelancers,
  type FreelancerCategory,
  type FreelancerProfile
} from "@/lib/freelancerMarketplace";

type AccessDraft = {
  name: string;
  email: string;
  company: string;
  authMethod: "email" | "google" | "linkedin";
};

type ContactDraft = {
  buyerName: string;
  buyerEmail: string;
  company: string;
  project: string;
};

const storageKey = "fluidrwa.freelancer.previewProfiles";
const accessStorageKey = "fluidrwa.freelancer.directoryAccess";

const emptyAccess: AccessDraft = {
  name: "",
  email: "",
  company: "",
  authMethod: "email"
};

const emptyContact: ContactDraft = {
  buyerName: "",
  buyerEmail: "",
  company: "",
  project: ""
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function FreelancerDirectoryPreview() {
  const [submittedProfiles, setSubmittedProfiles] = useState<FreelancerProfile[]>([]);
  const [access, setAccess] = useState<AccessDraft>(emptyAccess);
  const [hasAccess, setHasAccess] = useState(false);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"All" | FreelancerCategory>("All");
  const [activeTag, setActiveTag] = useState("All");
  const [selectedProfile, setSelectedProfile] = useState<FreelancerProfile | null>(null);
  const [contact, setContact] = useState<ContactDraft>(emptyContact);
  const [status, setStatus] = useState("");

  useEffect(() => {
    try {
      const savedAccess = window.localStorage.getItem(accessStorageKey);
      if (savedAccess) {
        const parsed = JSON.parse(savedAccess) as AccessDraft;
        setAccess(parsed);
        setHasAccess(true);
        setContact((current) => ({ ...current, buyerName: parsed.name, buyerEmail: parsed.email, company: parsed.company }));
      }
      const savedProfiles = window.localStorage.getItem(storageKey);
      if (savedProfiles) setSubmittedProfiles(JSON.parse(savedProfiles) as FreelancerProfile[]);
    } catch {
      setSubmittedProfiles([]);
    }
  }, []);

  const profiles = useMemo(() => [...submittedProfiles, ...sampleFreelancers], [submittedProfiles]);

  const filteredProfiles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return profiles.filter((profile) => {
      const text = [
        profile.name,
        profile.title,
        profile.location,
        profile.category,
        profile.summary,
        profile.tags.join(" "),
        profile.services.join(" ")
      ]
        .join(" ")
        .toLowerCase();
      return (
        (!normalizedQuery || text.includes(normalizedQuery)) &&
        (activeCategory === "All" || profile.category === activeCategory) &&
        (activeTag === "All" || profile.tags.includes(activeTag))
      );
    });
  }, [activeCategory, activeTag, profiles, query]);

  async function saveAccess(authMethod: AccessDraft["authMethod"]) {
    if (!access.email) {
      setStatus("Please add your email before opening the directory preview.");
      return;
    }

    const accessRecord = { ...access, authMethod };
    window.localStorage.setItem(accessStorageKey, JSON.stringify(accessRecord));
    setHasAccess(true);
    setContact((current) => ({
      ...current,
      buyerName: access.name,
      buyerEmail: access.email,
      company: access.company
    }));

    await fetch("/api/freelancer-marketplace-waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: access.name,
        email: access.email,
        company: access.company,
        role: "Hiring team",
        authMethod,
        source: "freelancer-directory-access",
        pageUrl: window.location.href
      })
    });
  }

  function startOAuth(authMethod: "google" | "linkedin") {
    window.localStorage.setItem("fluidrwa.accountSignup.dismissed", "true");
    window.location.href = `/api/auth/oauth?provider=${authMethod}&next=${encodeURIComponent("/specialist-directory/directory")}`;
  }

  async function submitAccess(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await saveAccess("email");
  }

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedProfile || !contact.buyerEmail || !contact.project) {
      setStatus("Please add your email and project context before requesting an intro.");
      return;
    }

    setStatus("Saving intro request...");
    const response = await fetch("/api/freelancer-contact-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        buyerName: contact.buyerName,
        buyerEmail: contact.buyerEmail,
        company: contact.company,
        project: contact.project,
        freelancerId: selectedProfile.id,
        freelancerName: selectedProfile.name,
        freelancerCategory: selectedProfile.category,
        source: "specialist-directory",
        pageUrl: window.location.href
      })
    });
    const result = (await response.json()) as { message?: string };
    setStatus(result.message || "Intro request saved for FluidRWA review.");
    setSelectedProfile(null);
    setContact((current) => ({ ...current, project: "" }));
  }

  if (!hasAccess) {
    return (
      <main className="freelancer-preview-page freelancer-directory-gate">
        <section className="freelancer-hero">
          <div className="light-container freelancer-hero-grid">
            <div>
              <p className="eyebrow light-eyebrow">Buyer access</p>
              <h1>Sign up before searching FluidRWA specialists</h1>
              <p>
                The launch directory will be gated. Buyers can search approved specialists after signing up, but intro
                requests will route through FluidRWA rather than direct freelancer contact.
              </p>
            </div>
            <div className="freelancer-form-card">
              <p className="eyebrow light-eyebrow">Access directory</p>
              <h2>Continue to directory</h2>
              <div className="freelancer-auth-row">
                <button onClick={() => startOAuth("google")} type="button">
                  Continue with Google
                </button>
                <button onClick={() => startOAuth("linkedin")} type="button">
                  Continue with LinkedIn
                </button>
              </div>
              <form className="freelancer-popup-form" onSubmit={submitAccess}>
                <input value={access.name} onChange={(event) => setAccess({ ...access, name: event.target.value })} placeholder="Name" />
                <input
                  value={access.email}
                  onChange={(event) => setAccess({ ...access, email: event.target.value })}
                  placeholder="Email"
                  type="email"
                />
                <input value={access.company} onChange={(event) => setAccess({ ...access, company: event.target.value })} placeholder="Company" />
                <button type="submit">Sign up with email</button>
              </form>
              {status ? <p className="freelancer-status is-error">{status}</p> : null}
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="freelancer-preview-page">
      <section className="light-container freelancer-directory-section" id="hire" aria-labelledby="freelancer-directory-title">
        <div className="freelancer-section-head freelancer-directory-head">
          <div>
            <p className="eyebrow light-eyebrow">Specialist directory</p>
            <h1 id="freelancer-directory-title">Search approved FluidRWA specialists</h1>
            <p className="freelancer-directory-note">
              Contact details stay hidden. Use intro requests so FluidRWA can track buyer demand and route opportunities.
            </p>
          </div>
          <div className="freelancer-count">{filteredProfiles.length} profiles</div>
        </div>

        <div className="freelancer-controls">
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Solidity, KYC, pitch decks, tokenization..." />
          <select value={activeCategory} onChange={(event) => setActiveCategory(event.target.value as "All" | FreelancerCategory)}>
            <option value="All">All categories</option>
            {freelancerCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select value={activeTag} onChange={(event) => setActiveTag(event.target.value)}>
            <option value="All">All tags</option>
            {freelancerTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        <div className="freelancer-card-grid">
          {filteredProfiles.map((profile) => (
            <article className="freelancer-card" key={profile.id}>
              <div className="freelancer-card-top">
                <div className="freelancer-avatar">{initials(profile.name)}</div>
                <div>
                  <h3>{profile.name}</h3>
                  <p>{profile.title}</p>
                </div>
                {profile.verified ? <span className="freelancer-verified">Verified</span> : <span className="freelancer-verified muted">In review</span>}
              </div>
              <p className="freelancer-summary">{profile.summary}</p>
              <div className="freelancer-meta-row">
                <span>{profile.category}</span>
                <span>{profile.location}</span>
                <span>{profile.experience}</span>
              </div>
              <div className="freelancer-tag-row">
                {profile.tags.map((tag) => (
                  <span key={`${profile.id}-${tag}`}>{tag}</span>
                ))}
              </div>
              <ul className="freelancer-services">
                {profile.services.map((service) => (
                  <li key={`${profile.id}-${service}`}>{service}</li>
                ))}
              </ul>
              <div className="freelancer-card-footer">
                <div>
                  <strong>{profile.rate}</strong>
                  <span>{profile.availability}</span>
                </div>
                <button className="freelancer-intro-button" onClick={() => setSelectedProfile(profile)} type="button">
                  Request intro
                </button>
              </div>
              <p className="freelancer-free-note">{profile.freeUntil}</p>
            </article>
          ))}
        </div>
        {status ? <p className="freelancer-status">{status}</p> : null}
      </section>

      {selectedProfile ? (
        <div className="freelancer-popup-backdrop" role="dialog" aria-modal="true" aria-labelledby="intro-request-title">
          <div className="freelancer-popup-card">
            <button aria-label="Close intro request" className="freelancer-popup-close" onClick={() => setSelectedProfile(null)} type="button">
              ×
            </button>
            <p className="eyebrow light-eyebrow">Intro request</p>
            <h2 id="intro-request-title">Request an intro to {selectedProfile.name}</h2>
            <p>Tell us what you need. FluidRWA will review the request before making an introduction.</p>
            <form className="freelancer-popup-form" onSubmit={submitContact}>
              <input value={contact.buyerName} onChange={(event) => setContact({ ...contact, buyerName: event.target.value })} placeholder="Your name" />
              <input
                value={contact.buyerEmail}
                onChange={(event) => setContact({ ...contact, buyerEmail: event.target.value })}
                placeholder="Email"
                type="email"
              />
              <input value={contact.company} onChange={(event) => setContact({ ...contact, company: event.target.value })} placeholder="Company" />
              <textarea
                value={contact.project}
                onChange={(event) => setContact({ ...contact, project: event.target.value })}
                placeholder="What do you want help with?"
              />
              <button type="submit">Send intro request</button>
            </form>
          </div>
        </div>
      ) : null}
    </main>
  );
}
