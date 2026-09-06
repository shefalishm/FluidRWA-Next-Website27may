"use client";

import { FormEvent, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type SignupDraft = {
  name: string;
  email: string;
  role: "Founder / Operator" | "Investor" | "Service provider" | "Researcher" | "Other";
};

const popupStorageKey = "fluidrwa.accountSignup.dismissed";
const signedUpStorageKey = "fluidrwa.accountSignup.completed";

const emptySignup: SignupDraft = {
  name: "",
  email: "",
  role: "Founder / Operator"
};

function currentPath() {
  if (typeof window === "undefined") return "/";
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

export function FluidRwaSignupPopup() {
  const pathname = usePathname();
  const [showPopup, setShowPopup] = useState(false);
  const [signup, setSignup] = useState<SignupDraft>(emptySignup);
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const isEditorialPage = ["/blog", "/learn", "/news"].some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

  useEffect(() => {
    setShowPopup(false);
    if (!isEditorialPage) return;
    const timer = window.setTimeout(() => {
      const alreadyHandled = window.localStorage.getItem(popupStorageKey) || window.localStorage.getItem(signedUpStorageKey);
      const isInteracting = document.activeElement?.closest("form") || document.querySelector('[role="dialog"]');
      if (!alreadyHandled && !isInteracting) {
        setShowPopup(true);
      }
    }, 60000);

    return () => window.clearTimeout(timer);
  }, [pathname, isEditorialPage]);

  function updateSignup(field: keyof SignupDraft, value: string) {
    setSignup((current) => ({
      ...current,
      [field]: value
    }));
  }

  function dismissPopup() {
    window.localStorage.setItem(popupStorageKey, "true");
    setShowPopup(false);
  }

  function startOAuth(provider: "google" | "linkedin") {
    window.localStorage.setItem(popupStorageKey, "true");
    window.location.href = `/api/auth/oauth?provider=${provider}&next=${encodeURIComponent(currentPath())}`;
  }

  async function submitSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    if (!signup.email) {
      setStatus("Please add your email so we can keep you in the loop.");
      return;
    }

    setSubmitting(true);
    setStatus("Saving...");
    try {
      const response = await fetch("/api/freelancer-marketplace-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...signup,
          authMethod: "email",
          source: "fluidrwa-general-signup-popup",
          pageUrl: window.location.href
        })
      });
      const result = (await response.json()) as { message?: string; ok?: boolean };
      if (!response.ok || result.ok === false) throw new Error(result.message || "We could not save your signup. Please try again.");
      window.localStorage.setItem(signedUpStorageKey, "true");
      window.localStorage.setItem(popupStorageKey, "true");
      setStatus(result.message || "You are on the FluidRWA list.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "We could not save your signup. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!showPopup || !isEditorialPage) return null;

  return (
    <div className="freelancer-popup-backdrop" role="dialog" aria-modal="true" aria-labelledby="fluidrwa-signup-popup-title">
      <div className="freelancer-popup-card">
        <button aria-label="Close FluidRWA signup popup" className="freelancer-popup-close" onClick={dismissPopup} type="button">
          ×
        </button>
        <h2 id="fluidrwa-signup-popup-title">Create a FluidRWA account or get updates</h2>
        <p>Get vendor research, RWA market updates, tools, directory launches and early access notes from FluidRWA.</p>
        <div className="freelancer-auth-row">
          <button onClick={() => startOAuth("google")} type="button">
            Continue with Google
          </button>
          <button onClick={() => startOAuth("linkedin")} type="button">
            Continue with LinkedIn
          </button>
        </div>
        <form className="freelancer-popup-form" onSubmit={submitSignup}>
          <input value={signup.name} onChange={(event) => updateSignup("name", event.target.value)} placeholder="Name" aria-label="Name" />
          <input value={signup.email} onChange={(event) => updateSignup("email", event.target.value)} placeholder="Email" aria-label="Email" type="email" required />
          <select value={signup.role} onChange={(event) => updateSignup("role", event.target.value)} aria-label="Your role">
            <option>Founder / Operator</option>
            <option>Investor</option>
            <option>Service provider</option>
            <option>Researcher</option>
            <option>Other</option>
          </select>
          <button type="submit" disabled={submitting}>{submitting ? "Saving..." : "Join FluidRWA"}</button>
        </form>
        {status ? <p className="freelancer-popup-status" role="status">{status}</p> : null}
      </div>
    </div>
  );
}
