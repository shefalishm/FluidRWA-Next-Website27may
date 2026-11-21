"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { investorAssets, investorRegions, investorTickets, investorTypes } from "@/lib/investorInterest";
import styles from "./InvestorInterest.module.css";

function track(name: string) {
  (window as Window & { fluidRwaTrackEvent?: (name: string, params: Record<string, string>) => void }).fluidRwaTrackEvent?.(name, { form_type: "investor", form_source: "investor-interest" });
}

export function InvestorInterestForm() {
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const started = useRef(false);
  const busy = useRef(false);
  useEffect(() => { track("investor_page_view"); }, []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    busy.current = true;
    setStatus("saving"); setErrors({}); setMessage("");
    try {
      const response = await fetch("/api/investor-interest", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ firstName: fields.get("firstName"), email: fields.get("email"), companyName: fields.get("companyName"), investorType: fields.get("investorType"), region: fields.get("region"), ticketSize: fields.get("ticketSize"), assetClasses: fields.getAll("assetClasses"), consent: fields.get("consent") === "on", websiteUrl: fields.get("websiteUrl"), sourcePage: document.referrer }) });
      const result = await response.json();
      if (!response.ok || !result.ok) {
        setErrors(result.errors || {}); setMessage(result.message || "Please try again"); setStatus("idle");
        const key = Object.keys(result.errors || {})[0];
        if (key) form.querySelector<HTMLElement>(`[name="${key}"]`)?.focus();
      } else { setStatus("saved"); track("investor_form_submit"); }
    } catch { setMessage("We could not confirm that your interest was saved. Please try again, or email contact@fluidrwa.com"); setStatus("idle"); }
    finally { busy.current = false; }
  }
  const error = (key: string) => errors[key] ? <span id={`error-${key}`} className={styles.error}>{errors[key]}</span> : null;
  const invalid = (key: string) => ({ "aria-invalid": !!errors[key], "aria-describedby": errors[key] ? `error-${key}` : undefined });
  if (status === "saved") return <section className={styles.form} role="status"><h2>Your interest is saved</h2><p>Thank you for sharing what you are looking for. We will keep you updated by email about new tokenized assets and where to find out more.</p><p>You can unsubscribe at any time by replying to an update.</p><a href="/network-explorer">Continue exploring tokenized assets</a></section>;
  return <form className={styles.form} onSubmit={submit} onFocus={() => { if (!started.current) { started.current = true; track("investor_form_start"); } }}>
    <h2>Share your interest</h2><p className={styles.small}>Tell us what you would like to follow. No website, wallet connection or documents needed.</p>
    <label>First name<input name="firstName" autoComplete="given-name" required maxLength={100} {...invalid("firstName")} />{error("firstName")}</label>
    <label>Email address<input name="email" type="email" autoComplete="email" required maxLength={254} {...invalid("email")} />{error("email")}</label>
    <label>Investor type<select name="investorType" required defaultValue="" {...invalid("investorType")}><option value="" disabled>Select an option</option>{investorTypes.map(x => <option key={x}>{x}</option>)}</select>{error("investorType")}</label>
    <fieldset aria-describedby={errors.assetClasses ? "error-assetClasses" : undefined}><legend>Which assets interest you</legend><div className={styles.options}>{investorAssets.map(x => <label className={styles.check} key={x}><input type="checkbox" name="assetClasses" value={x} {...invalid("assetClasses")} />{x}</label>)}</div>{error("assetClasses")}</fieldset>
    <label>Region<select name="region" required defaultValue="" {...invalid("region")}><option value="" disabled>Select your region</option>{investorRegions.map(x => <option key={x}>{x}</option>)}</select>{error("region")}</label>
    <label>Typical allocation size (optional)<select name="ticketSize" defaultValue="" {...invalid("ticketSize")}><option value="">Prefer not to say</option>{investorTickets.map(x => <option key={x}>{x}</option>)}</select>{error("ticketSize")}</label>
    <label>Company or organisation (optional)<input name="companyName" autoComplete="organization" maxLength={200} /></label>
    <div className={styles.trap} aria-hidden="true"><label>Leave this blank<input name="websiteUrl" tabIndex={-1} autoComplete="off" /></label></div>
    <label className={styles.check}><input name="consent" type="checkbox" required {...invalid("consent")} /><span>I agree to receive weekly tokenized asset updates and related investor updates from FluidRWA. I can unsubscribe at any time.</span></label>{error("consent")}
    <p className={styles.small}>We use your answers to send relevant updates. We do not sell your data. <a href="/privacy">Privacy policy</a></p>
    {message ? <p className={styles.error} role="alert">{message}</p> : null}
    <button className={styles.button} type="submit" disabled={status === "saving"}>{status === "saving" ? "Saving your interest..." : "Keep me updated"}</button>
  </form>;
}
