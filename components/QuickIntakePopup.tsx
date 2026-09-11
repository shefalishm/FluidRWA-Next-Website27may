"use client";

import { Building2, Check, MessageSquareText, Send, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";

type IntakeMode = "project" | "vendor";

type SubmissionResult = {
  ok?: boolean;
  message?: string;
  mode?: string;
  requestId?: string | null;
};

const projectCategories = [
  "Tokenization platform",
  "Physical asset verification and oracles",
  "Custody and wallets",
  "KYC, AML and compliance",
  "Payments and stablecoins",
  "Security and audits",
  "Legal and regulatory",
  "Blockchain development",
  "AI infrastructure or tools",
  "Other / multiple categories"
];

const vendorCategories = [
  "Tokenization Platforms",
  "Physical Asset Verification & Oracles",
  "Blockchain Development",
  "Security & Audits",
  "Custody & Wallets",
  "KYC / AML / Identity",
  "Stablecoin & Payments",
  "Legal & Regulatory",
  "AI Infrastructure",
  "Data & Analytics",
  "Other"
];

export function QuickIntakePopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<IntakeMode>("project");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const renderedAt = useRef(Date.now());
  const dialogRef = useRef<HTMLDivElement>(null);

  const hidden = ["/submit-requirement", "/vendor-membership", "/apply-as-vendor", "/conversion-analytics", "/auth"].some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  ) || pathname.startsWith("/network-preview");

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.classList.add("has-quick-intake");
    document.addEventListener("keydown", handleKeyDown);
    requestAnimationFrame(() => dialogRef.current?.querySelector<HTMLElement>("button")?.focus());
    return () => {
      document.body.classList.remove("has-quick-intake");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const selectMode = (nextMode: IntakeMode) => {
    setMode(nextMode);
    setSubmitted(false);
    setError("");
    renderedAt.current = Date.now();
    window.fluidRwaTrackEvent?.("quick_intake_mode_selected", { intake_type: nextMode });
  };

  const close = () => {
    setOpen(false);
    setSubmitted(false);
    setError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const value = (name: string) => String(data.get(name) || "").trim();
    const companyName = value("companyName");
    const category = value("category");
    const source = mode === "project" ? "quick-project-popup" : "quick-vendor-popup";
    const payload = {
      vendorName: mode === "vendor" ? companyName : "",
      vendorCategory: category,
      source,
      pageUrl: window.location.href,
      leadSource: `FluidRWA ${mode} quick enquiry`,
      contactEmail: value("contactEmail"),
      firstName: value("firstName"),
      companyName,
      website: value("website"),
      projectDescription: value("projectDescription"),
      rawPayload: {
        INTAKE_MODE: mode,
        FORM_RENDERED_AT: String(renderedAt.current),
        FORM_ELAPSED_MS: String(Date.now() - renderedAt.current)
      }
    };

    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/vendor-intro-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = (await response.json()) as SubmissionResult;
      if (!response.ok || !result.ok) throw new Error(result.message || "Your enquiry could not be saved.");
      setSubmitted(true);
      form.reset();
      if (result.mode !== "filtered") {
        const eventName = mode === "project" ? "project_form_submit" : "vendor_application_submit";
        window.fluidRwaTrackEvent?.(eventName, {
          form_type: mode,
          form_variant: "quick_popup",
          interaction_source: source,
          vendor_category: category || undefined,
          submission_id: result.requestId || undefined
        });
        window.fluidRwaReportLeadConversion?.();
      }
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Your enquiry could not be saved. Please try again.");
      window.fluidRwaTrackEvent?.("form_submit_error", {
        form_type: mode,
        form_variant: "quick_popup",
        interaction_source: source
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (hidden) return null;

  return (
    <>
      <button
        className="quick-intake-launcher"
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => {
          renderedAt.current = Date.now();
          setOpen(true);
          window.fluidRwaTrackEvent?.("quick_intake_opened", { interaction_source: "site_launcher" });
        }}
      >
        <MessageSquareText aria-hidden="true" size={19} />
        <span>Quick enquiry</span>
      </button>

      {open ? (
        <div className="quick-intake-overlay" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && close()}>
          <div
            className="quick-intake-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-intake-title"
            ref={dialogRef}
          >
            <button className="quick-intake-close" type="button" aria-label="Close quick enquiry" onClick={close}>
              <X aria-hidden="true" size={20} />
            </button>

            {submitted ? (
              <div className="quick-intake-success">
                <span className="quick-intake-success-icon" aria-hidden="true"><Check size={24} /></span>
                <p className="quick-intake-eyebrow">Received</p>
                <h2 id="quick-intake-title">Thank you, we have your details.</h2>
                <p>FluidRWA will review the information and follow up if there is a relevant next step.</p>
                <button className="quick-intake-submit" type="button" onClick={close}>Done</button>
              </div>
            ) : (
              <>
                <p className="quick-intake-eyebrow">Start with the essentials</p>
                <h2 id="quick-intake-title">How can FluidRWA help?</h2>
                <div className="quick-intake-tabs" role="tablist" aria-label="Enquiry type">
                  <button type="button" role="tab" aria-selected={mode === "project"} onClick={() => selectMode("project")}>
                    <MessageSquareText aria-hidden="true" size={17} /> Project
                  </button>
                  <button type="button" role="tab" aria-selected={mode === "vendor"} onClick={() => selectMode("vendor")}>
                    <Building2 aria-hidden="true" size={17} /> Vendor
                  </button>
                </div>

                <form className="quick-intake-form" onSubmit={handleSubmit}>
                  <div className="quick-intake-pair">
                    <label>First name<input name="firstName" autoComplete="given-name" maxLength={100} required /></label>
                    <label>Work email<input name="contactEmail" type="email" autoComplete="email" maxLength={100} required /></label>
                  </div>
                  <label>Company<input name="companyName" autoComplete="organization" maxLength={100} required /></label>
                  {mode === "vendor" ? (
                    <label>Company website<input name="website" type="url" autoComplete="url" placeholder="https://" maxLength={250} required /></label>
                  ) : null}
                  <label>
                    {mode === "project" ? "What do you need?" : "Primary category"}
                    <select name="category" required defaultValue="">
                      <option value="">Select a category</option>
                      {(mode === "project" ? projectCategories : vendorCategories).map((item) => <option key={item}>{item}</option>)}
                    </select>
                  </label>
                  <label>
                    {mode === "project" ? "Brief project summary" : "What does your company provide?"}
                    <textarea name="projectDescription" maxLength={1200} rows={4} required />
                  </label>
                  {error ? <p className="quick-intake-error" role="alert">{error}</p> : null}
                  <button className="quick-intake-submit" type="submit" disabled={submitting}>
                    <Send aria-hidden="true" size={17} /> {submitting ? "Sending..." : "Send details"}
                  </button>
                  <p className="quick-intake-privacy">Your details are used only to review and respond to this enquiry.</p>
                </form>
              </>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
