import type { Metadata } from "next";
import { InvestorInterestForm } from "@/components/InvestorInterestForm";
import styles from "@/components/InvestorInterest.module.css";

export const metadata: Metadata = { title: "Tokenized Asset Updates for Investors | FluidRWA", description: "Share your interest in tokenized real estate, private credit, funds and other on-chain assets. Receive weekly updates and links to issuer or platform information.", alternates: { canonical: "https://www.fluidrwa.com/investors" } };

export default function InvestorsPage() {
  return <main className={styles.page}><header className={styles.intro}><p className={styles.eyebrow}>FluidRWA / For investors</p><h1>Follow the next wave of tokenized assets</h1><p>Interested in allocating to real-world assets on chain? Share what you are looking for. Our weekly updates will highlight newly launched tokenized assets and point you to the issuer or platform where you can learn more, buy or apply.</p><p className={styles.small}>From real estate and private credit to tokenized funds and commodities, follow the asset classes that matter to you.</p></header><InvestorInterestForm /><p className={styles.notice}>Information only, not investment, legal or tax advice, or an offer or solicitation to buy or sell any security or token. FluidRWA does not accept investments through this form. Availability and eligibility depend on the offering and your location. Do your own research and speak to a qualified advisor.</p></main>;
}
