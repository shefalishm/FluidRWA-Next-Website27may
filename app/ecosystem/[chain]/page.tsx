import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChainProjectTable } from "@/components/ChainProjectTable";
import { getChainEcosystem, getChainEcosystems } from "@/lib/chainEcosystem";
import { siteUrl } from "@/lib/routes";

export function generateStaticParams() {
  return getChainEcosystems().map((chain) => ({ chain: chain.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ chain: string }> }): Promise<Metadata> {
  const { chain: rawChain } = await params;
  const chain = getChainEcosystem(rawChain);
  if (!chain) {
    return { title: "Chain ecosystem not found | FluidRWA" };
  }
  return {
    title: `${chain.name} Ecosystem Projects | FluidRWA`,
    description: `Explore projects built on ${chain.name}, including ${chain.standsOutFor.join(", ")} use cases and ecosystem activity.`,
    alternates: { canonical: `${siteUrl}/ecosystem/${chain.slug}` },
    openGraph: {
      title: `${chain.name} Ecosystem Projects`,
      description: `A filtered table of projects and applications building in the ${chain.name} ecosystem.`,
      url: `${siteUrl}/ecosystem/${chain.slug}`,
      type: "website"
    }
  };
}

export default async function ChainEcosystemPage({ params }: { params: Promise<{ chain: string }> }) {
  const { chain: rawChain } = await params;
  const chain = getChainEcosystem(rawChain);
  if (!chain) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${chain.name} ecosystem projects`,
    description: chain.summary,
    url: `${siteUrl}/ecosystem/${chain.slug}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: chain.projects.length,
      itemListElement: chain.projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: project.name,
        description: project.description
      }))
    }
  };

  return (
    <main className="public-page chain-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="public-hero compact chain-detail-hero">
        <div className="public-shell public-hero-grid">
          <div>
            <a className="chain-back-link" href="/ecosystem">Back to Chain Ecosystem</a>
            <div className="chain-title-row">
              <span className={`chain-logo-mark accent-${chain.accent}`}>
                <Image src={chain.logoSrc} alt={`${chain.name} logo`} width={46} height={46} />
              </span>
              <p className="public-eyebrow">{chain.projects.length} projects tracked</p>
            </div>
            <h1>{chain.name} ecosystem projects</h1>
            <p>{chain.summary}</p>
          </div>
          <div className="chain-profile-card">
            <h2>What {chain.name} stands out for</h2>
            <div className="chain-strengths">
              {chain.standsOutFor.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="public-shell">
        <ChainProjectTable projects={chain.projects} chainName={chain.name} />
      </div>
    </main>
  );
}
