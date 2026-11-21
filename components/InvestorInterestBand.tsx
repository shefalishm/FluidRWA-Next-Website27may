"use client";

import { ArrowRight } from "lucide-react";
import styles from "./InvestorInterest.module.css";

export function InvestorInterestBand({ source }: { source: string }) {
  return <section className={styles.band} aria-labelledby={`investor-interest-${source}`}>
    <div className={styles.bandInner}>
      <div><p className={styles.eyebrow}>For investors</p><h2 id={`investor-interest-${source}`}>Interested in investing in tokenized assets</h2><p>Share what interests you. Receive weekly updates on newly launched on-chain assets and where to find issuer or platform information to buy or apply.</p></div>
      <a className={styles.button} href={`/investors?from=${encodeURIComponent(source)}`} onClick={() => {
        (window as Window & { fluidRwaTrackEvent?: (name: string, params: Record<string, string>) => void }).fluidRwaTrackEvent?.("investor_cta_click", { form_type: "investor", form_source: source });
      }}>Share your interest <ArrowRight size={18} aria-hidden="true" /></a>
    </div>
  </section>;
}
