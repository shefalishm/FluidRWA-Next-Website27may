import type { Metadata } from "next";
import Image from "next/image";
import { getChainEcosystems } from "@/lib/chainEcosystem";
import { siteUrl } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Chain Ecosystem | Web3 Projects by Blockchain | FluidRWA",
  description:
    "Explore Web3 projects by blockchain ecosystem. Compare chains, use cases and projects across Ethereum, Solana, Polygon, Base, Avalanche, Hedera, XRP Ledger and more.",
  alternates: { canonical: `${siteUrl}/ecosystem` },
  openGraph: {
    title: "Chain Ecosystem by FluidRWA",
    description: "A simple way to explore Web3 projects by the blockchain ecosystems they are built on.",
    url: `${siteUrl}/ecosystem`,
    type: "website"
  }
};

export default function EcosystemPage() {
  const chains = getChainEcosystems();
  const projectCount = chains.reduce((total, chain) => total + chain.projects.length, 0);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "FluidRWA Chain Ecosystem",
    description: "Explore Web3 projects by blockchain ecosystem.",
    url: `${siteUrl}/ecosystem`,
    hasPart: chains.map((chain) => ({
      "@type": "WebPage",
      name: `${chain.name} ecosystem projects`,
      url: `${siteUrl}/ecosystem/${chain.slug}`
    }))
  };

  return (
    <main className="public-page chain-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="public-hero chain-hero">
        <div className="public-shell public-hero-grid">
          <div>
            <p className="public-eyebrow">Chain ecosystem</p>
            <h1>Explore Web3 projects by blockchain</h1>
            <p>
              See which projects are building across major chains, what each ecosystem is known for, and where activity is forming across DeFi,
              payments, gaming, RWA, identity, infrastructure and consumer applications.
            </p>
          </div>
          <div className="chain-orbit-card" aria-label={`${chains.length} chains and ${projectCount} projects`}>
            <strong>{chains.length}</strong>
            <span>chains mapped</span>
            <strong>{projectCount}+</strong>
            <span>projects tracked</span>
          </div>
        </div>
      </section>

      <section className="public-shell chain-card-grid" aria-label="Blockchain ecosystems">
        {chains.map((chain) => (
          <a className={`chain-card accent-${chain.accent}`} href={`/ecosystem/${chain.slug}`} key={chain.slug}>
            <div className="chain-card-top">
              <span className="chain-logo-mark">
                <Image src={chain.logoSrc} alt={`${chain.name} logo`} width={42} height={42} />
              </span>
              <span>{chain.projects.length} projects</span>
            </div>
            <h2>{chain.name}</h2>
            <p>{chain.summary}</p>
            <div className="chain-strengths">
              {chain.standsOutFor.slice(0, 4).map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </a>
        ))}
      </section>
    </main>
  );
}
