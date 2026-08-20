import type { Metadata } from "next";
import Image from "next/image";
import { getChainEcosystems } from "@/lib/chainEcosystem";
import { chainProjectsBasePath, siteUrl } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Blockchain Projects | Web3 Projects by Chain | FluidRWA",
  description:
    "Explore Web3 projects by blockchain ecosystem. Compare chains, use cases and projects across Ethereum, Solana, Polygon, Base, Avalanche, Hedera, XRP Ledger and more.",
  alternates: { canonical: `${siteUrl}${chainProjectsBasePath}` },
  openGraph: {
    title: "Blockchain Projects by FluidRWA",
    description: "A simple way to explore Web3 projects by the blockchain ecosystems they are built on.",
    url: `${siteUrl}${chainProjectsBasePath}`,
    type: "website",
    images: [`${siteUrl}/assets/social/fluidrwa-preview.jpg`]
  },
  twitter: {
    card: "summary_large_image",
    title: "Blockchain Projects by FluidRWA",
    description: "Explore Web3 projects by chain across RWA, DeFi, payments, gaming, identity, infrastructure and consumer ecosystems.",
    images: [`${siteUrl}/assets/social/fluidrwa-preview.jpg`]
  }
};

export default function EcosystemPage() {
  const chains = getChainEcosystems();
  const projectCount = chains.reduce((total, chain) => total + chain.projects.length, 0);
  const categories = [...new Set(chains.flatMap((chain) => chain.projects.map((project) => project.category)))].sort();
  const faqs = [
    {
      question: "What is the FluidRWA blockchain projects directory?",
      answer: `FluidRWA maps ${projectCount}+ projects across ${chains.length} blockchain ecosystems so buyers, builders and ecosystem teams can compare project activity by chain.`
    },
    {
      question: "Which blockchain ecosystems are listed on FluidRWA?",
      answer: `FluidRWA currently lists ${chains.length} ecosystems, including ${chains.slice(0, 10).map((chain) => chain.name).join(", ")} and more.`
    },
    {
      question: "What types of projects are tracked?",
      answer: `FluidRWA tracks categories such as ${categories.slice(0, 10).join(", ")} and other ecosystem-specific segments.`
    },
    {
      question: "Can a blockchain or project request inclusion?",
      answer:
        "Yes. Chains, project teams and vendors can share ecosystem details, project links and official logo sources. Vendor and project listings require paid membership before FluidRWA activates review, and payment does not guarantee inclusion, ranking or endorsement."
    }
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "FluidRWA Blockchain Projects",
    description: "Explore Web3 projects by blockchain ecosystem.",
    url: `${siteUrl}${chainProjectsBasePath}`,
    hasPart: chains.map((chain) => ({
      "@type": "WebPage",
      name: `${chain.name} ecosystem projects`,
      url: `${siteUrl}${chainProjectsBasePath}/${chain.slug}`
    }))
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Blockchain Projects", item: `${siteUrl}${chainProjectsBasePath}` }
    ]
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer }
    }))
  };

  return (
    <main className="public-page chain-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <section className="public-hero chain-hero">
        <div className="public-shell public-hero-grid">
          <div>
            <p className="public-eyebrow">Blockchain projects</p>
            <h1>Explore Web3 projects by blockchain</h1>
            <p>
              See which projects are building across major chains, what each ecosystem is known for, and where activity is forming across DeFi,
              payments, gaming, RWA, identity, infrastructure and consumer applications.
            </p>
            <p>
              FluidRWA maps {projectCount}+ projects across {chains.length} ecosystems to support buyer research, chain partnership discovery and
              future verified project listings.
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
          <a className={`chain-card accent-${chain.accent}`} href={`${chainProjectsBasePath}/${chain.slug}`} key={chain.slug}>
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

      <section className="public-shell tra-faq-section solana-faq-section" aria-labelledby="blockchain-projects-faq">
        <div className="tra-faq-head">
          <h2 id="blockchain-projects-faq">Frequently asked questions about blockchain projects</h2>
        </div>
        <div className="tra-faq-grid">
          {faqs.map((faq) => (
            <article key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
        <p className="chain-get-listed">
          Want your chain or project added? Submit official details for free review. Vendors can join the limited verification waitlist for richer
          profiles and labelled visibility. <a href="mailto:contact@fluidrwa.com?subject=FluidRWA%20submission%20or%20verification%20waitlist">Contact FluidRWA</a>.
        </p>
      </section>
    </main>
  );
}
