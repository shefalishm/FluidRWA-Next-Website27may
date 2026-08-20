import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChainProjectTable } from "@/components/ChainProjectTable";
import { getChainEcosystem, getChainEcosystems } from "@/lib/chainEcosystem";
import { chainProjectsBasePath, siteUrl } from "@/lib/routes";

const solanaMetaDescription =
  "Explore notable Solana ecosystem projects across DeFi, RWA, DePIN and infrastructure, with what each one does and where it fits in the Web3 stack.";
const solanaOgImage = `${siteUrl}/assets/og/solana-ecosystem.png`;
const defaultOgImage = `${siteUrl}/assets/social/fluidrwa-preview.jpg`;

const solanaFaqs = [
  {
    question: "How many projects are in the Solana ecosystem on FluidRWA?",
    answer:
      "FluidRWA tracks dozens of live Solana projects across 16 categories, reviewed and categorised for buyer research, with the count shown at the top of the page and refreshed on each review."
  },
  {
    question: "What are the main categories of Solana projects?",
    answer:
      "The main categories are DeFi, real world assets, DePIN, payments, staking and restaking, wallets, oracles, NFT marketplaces and infrastructure, launchpads, interoperability, developer infrastructure, smart accounts and analytics."
  },
  {
    question: "What are the top DeFi projects on Solana?",
    answer: "Leading Solana DeFi projects include Jupiter, Raydium, Orca, Meteora, Drift, Kamino, Save, MarginFi, Lifinity and Zeta Markets."
  },
  {
    question: "What real world asset projects are on Solana?",
    answer:
      "Real world asset projects on Solana include Ondo Finance, Maple Finance, Parcl, Etherfuse, BAXUS, Backed, Securitize and Superstate, spanning tokenized treasuries, private credit, real estate, bonds, equities and collectibles."
  },
  {
    question: "What are the leading Solana wallets?",
    answer: "The leading Solana wallets are Phantom, Solflare and Backpack, with TipLink offering link-based onboarding for non-crypto users."
  },
  {
    question: "What DePIN projects are built on Solana?",
    answer:
      "DePIN projects on Solana include Helium, Render, io.net, Hivemapper, Grass and Nosana, covering wireless, GPU rendering, compute, mapping and bandwidth networks."
  },
  {
    question: "How does FluidRWA verify Solana projects?",
    answer:
      "Each project is reviewed, assigned a category and market role, source checked, and dated with a review date. Listings are curated for buyer research rather than scraped."
  },
  {
    question: "Can I list my Solana project on FluidRWA?",
    answer:
      "Yes. Solana project teams can save their company or project details through the FluidRWA listing intake, then choose a paid membership plan to activate listing review. Payment does not guarantee inclusion, ranking or endorsement."
  }
] as const;

function uniqueCategories(projects: { category: string; status: string }[]) {
  return [...new Set(projects.filter((project) => project.status === "Live").map((project) => project.category))];
}

function topCategoryNames(categories: string[]) {
  return categories.slice(0, 6).join(", ");
}

function leadSummary(chain: NonNullable<ReturnType<typeof getChainEcosystem>>) {
  const liveProjects = chain.projects.filter((project) => project.status === "Live");
  const categories = uniqueCategories(chain.projects);
  if (chain.slug === "solana") {
    return `FluidRWA tracks ${liveProjects.length} live projects in the Solana ecosystem across ${categories.length} categories, from DeFi and real world assets to DePIN, payments, staking, wallets and developer infrastructure. Every listing is reviewed, categorised and source checked for buyer research.`;
  }
  return `FluidRWA tracks ${liveProjects.length} live ${chain.name} ecosystem projects across ${categories.length} categories, including ${topCategoryNames(categories)}. The directory is built for buyer research, ecosystem mapping and future verified project profiles.`;
}

function buildChainFaqs(chain: NonNullable<ReturnType<typeof getChainEcosystem>>) {
  if (chain.slug === "solana") return solanaFaqs;
  const liveProjects = chain.projects.filter((project) => project.status === "Live");
  const categories = uniqueCategories(chain.projects);
  const notableProjects = liveProjects.slice(0, 6).map((project) => project.name).join(", ");
  const categoryText = topCategoryNames(categories);

  return [
    {
      question: `How many ${chain.name} ecosystem projects does FluidRWA track?`,
      answer: `FluidRWA tracks ${liveProjects.length} live ${chain.name} ecosystem projects across ${categories.length} categories, with listings reviewed for directory research and buyer discovery.`
    },
    {
      question: `What is ${chain.name} known for?`,
      answer: `${chain.name} is known for ${chain.standsOutFor.join(", ")}. FluidRWA maps projects that show where ecosystem activity is forming.`
    },
    {
      question: `What project categories are active in the ${chain.name} ecosystem?`,
      answer: `${chain.name} ecosystem categories tracked by FluidRWA include ${categoryText}.`
    },
    {
      question: `Which ${chain.name} projects are listed on FluidRWA?`,
      answer: `Examples of ${chain.name} projects listed on FluidRWA include ${notableProjects}.`
    },
    {
      question: `Can a ${chain.name} project get listed on FluidRWA?`,
      answer:
        "Yes. Project teams can save their company or project details through the FluidRWA listing intake, then choose a paid membership plan to activate listing review. Payment does not guarantee inclusion, ranking or endorsement."
    }
  ] as const;
}

export function generateStaticParams() {
  return getChainEcosystems().map((chain) => ({ chain: chain.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ chain: string }> }): Promise<Metadata> {
  const { chain: rawChain } = await params;
  const chain = getChainEcosystem(rawChain);
  if (!chain) {
    return { title: "Chain ecosystem not found | FluidRWA" };
  }
  if (chain.slug === "solana") {
    return {
      title: "Solana Ecosystem Projects: DeFi, RWA and DePIN | FluidRWA",
      description: solanaMetaDescription,
      alternates: { canonical: `${siteUrl}${chainProjectsBasePath}/${chain.slug}` },
      openGraph: {
        title: "Solana Ecosystem Projects | FluidRWA",
        description: solanaMetaDescription,
        url: `${siteUrl}${chainProjectsBasePath}/${chain.slug}`,
        type: "website",
        images: [solanaOgImage]
      },
      twitter: {
        card: "summary_large_image",
        title: "Solana Ecosystem Projects | FluidRWA",
        description: solanaMetaDescription,
        images: [solanaOgImage]
      }
    };
  }
  return {
    title: `${chain.name} Ecosystem Projects | FluidRWA`,
    description: `${leadSummary(chain)} Explore project categories, market roles, buyer fit and ecosystem signals.`,
    alternates: { canonical: `${siteUrl}${chainProjectsBasePath}/${chain.slug}` },
    openGraph: {
      title: `${chain.name} Ecosystem Projects | FluidRWA`,
      description: `${leadSummary(chain)} Explore project categories, market roles, buyer fit and ecosystem signals.`,
      url: `${siteUrl}${chainProjectsBasePath}/${chain.slug}`,
      type: "website",
      images: [defaultOgImage]
    },
    twitter: {
      card: "summary_large_image",
      title: `${chain.name} Ecosystem Projects | FluidRWA`,
      description: `${leadSummary(chain)} Explore project categories, market roles, buyer fit and ecosystem signals.`,
      images: [defaultOgImage]
    }
  };
}

export default async function ChainEcosystemPage({ params }: { params: Promise<{ chain: string }> }) {
  const { chain: rawChain } = await params;
  const chain = getChainEcosystem(rawChain);
  if (!chain) notFound();

  const liveProjects = chain.projects.filter((project) => project.status === "Live");
  const faqs = buildChainFaqs(chain);
  const isSolana = chain.slug === "solana";
  const pageLeadSummary = leadSummary(chain);
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${chain.name} Ecosystem Projects`,
    description: pageLeadSummary,
    url: `${siteUrl}${chainProjectsBasePath}/${chain.slug}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: liveProjects.length,
      itemListElement: liveProjects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "SoftwareApplication",
          name: project.name,
          applicationCategory: project.category,
          description: project.description,
          operatingSystem: chain.name,
          url: project.website
        }
      }))
    }
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Blockchain Projects", item: `${siteUrl}${chainProjectsBasePath}` },
      { "@type": "ListItem", position: 3, name: chain.name, item: `${siteUrl}${chainProjectsBasePath}/${chain.slug}` }
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <section className="public-hero compact chain-detail-hero">
        <div className="public-shell public-hero-grid">
          <div>
            <a className="chain-back-link" href={chainProjectsBasePath}>Back to Blockchain Projects</a>
            <div className="chain-title-row">
              <span className={`chain-logo-mark accent-${chain.accent}`}>
                <Image src={chain.logoSrc} alt={`${chain.name} logo`} width={46} height={46} />
              </span>
              <p className="public-eyebrow">{chain.projects.length} projects tracked</p>
            </div>
            <h1>{chain.name} ecosystem projects</h1>
            <p>{pageLeadSummary}</p>
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

      <section className="public-shell tra-faq-section solana-faq-section" aria-labelledby={`${chain.slug}-ecosystem-faq`}>
          <div className="tra-faq-head">
            <h2 id={`${chain.slug}-ecosystem-faq`}>Frequently asked questions about the {chain.name} ecosystem</h2>
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
            Building on {chain.name}? <a href="/submit-project.html">List Your Company on FluidRWA</a> to save your project or vendor details, then
            choose a paid membership plan to activate listing review.
          </p>
        </section>
    </main>
  );
}
