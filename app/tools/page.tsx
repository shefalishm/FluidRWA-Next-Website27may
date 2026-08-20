import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { siteUrl } from "@/lib/routes";

const pageUrl = `${siteUrl}/tools`;

export const metadata: Metadata = {
  title: "Free Web3 and RWA Tools | FluidRWA",
  description:
    "Explore free FluidRWA tools for tokenization readiness, family office service stacks and project brief intake across RWA and Web3 infrastructure.",
  alternates: {
    canonical: pageUrl
  },
  openGraph: {
    title: "Free Web3 and RWA Tools | FluidRWA",
    description:
      "Start with FluidRWA tools for tokenization readiness, family office service stack planning and project brief intake.",
    url: pageUrl,
    siteName: "FluidRWA",
    type: "website",
    images: [
      {
        url: `${siteUrl}/assets/social/fluidrwa-preview.jpg`,
        width: 1200,
        height: 630,
        alt: "FluidRWA Web3 vendor discovery"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Web3 and RWA Tools | FluidRWA",
    description:
      "Use FluidRWA tools to understand readiness, stack gaps and project requirements before vendor outreach.",
    images: [`${siteUrl}/assets/social/fluidrwa-preview.jpg`]
  }
};

export default function ToolsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "FluidRWA Tools",
    url: pageUrl,
    description: "Free tools for RWA tokenization readiness, family office service stack planning and project requirement intake.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Vendor Comparison Tool",
          url: `${siteUrl}/tools/vendor-comparison`
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Free Tokenization Readiness Assessment Tool",
          url: `${siteUrl}/tokenization-readiness-assessment-tool`
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Family Office Service Stack Builder",
          url: `${siteUrl}/family-office-service-stack-builder`
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Project Brief Intake",
          url: `${siteUrl}/submit-requirement`
        }
      ]
    }
  };

  return (
    <main className="tra-page">
      <JsonLd data={schema} />
      <section className="tra-hero tools-hub-hero">
        <div className="light-container tra-hero-grid tra-hero-simple">
          <div>
            <p className="eyebrow light-eyebrow">FluidRWA tools</p>
            <h1>Free tools to find the right Web3, RWA and AI vendors</h1>
            <p className="tra-hero-copy">
              Start with practical tools that translate a buyer problem into vendor categories, shortlist criteria and a project brief before outreach.
            </p>
            <div className="tra-hero-actions">
              <Link className="btn-primary" href="/tools/vendor-comparison">
                Compare vendors
              </Link>
              <Link className="btn-primary" href="/tokenization-readiness-assessment-tool">
                Start readiness assessment
              </Link>
              <Link className="btn-secondary" href="/family-office-service-stack-builder">
                Family office service stack builder
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="light-container tools-feature-section" aria-labelledby="tools-feature-title">
        <div className="tools-feature-card">
          <div className="tools-feature-icon" aria-hidden="true">VS</div>
          <div>
            <p className="eyebrow light-eyebrow">New comparison tool</p>
            <h2>Vendor comparison tool</h2>
            <p>
              Compare tokenization, custody, KYC, stablecoin, smart contract, analytics, ramp, oracle, RPC and interoperability providers side by side before shortlisting.
            </p>
            <div className="tools-feature-tags" aria-label="Comparison outputs">
              <span>3-way comparison</span>
              <span>Strengths</span>
              <span>Watch-outs</span>
              <span>Buyer questions</span>
            </div>
          </div>
          <Link className="tools-feature-cta" href="/tools/vendor-comparison">
            Compare vendors
          </Link>
        </div>
        <div className="tools-feature-card">
          <div className="tools-feature-icon" aria-hidden="true">RWA</div>
          <div>
            <p className="eyebrow light-eyebrow">Featured readiness tool</p>
            <h2 id="tools-feature-title">Tokenization readiness assessment</h2>
            <p>
              Built for issuers and asset owners before they speak with vendors. Estimate readiness gaps, budget range, timeline and the vendor categories likely needed for a tokenization project.
            </p>
            <div className="tools-feature-tags" aria-label="Assessment outputs">
              <span>Readiness score</span>
              <span>Budget range</span>
              <span>Timeline estimate</span>
              <span>Vendor stack</span>
            </div>
          </div>
          <Link className="tools-feature-cta" href="/tokenization-readiness-assessment-tool">
            Start assessment
          </Link>
        </div>
      </section>
    </main>
  );
}
