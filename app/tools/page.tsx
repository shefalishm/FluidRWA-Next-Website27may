import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { siteUrl } from "@/lib/routes";

const pageUrl = `${siteUrl}/tools`;

export const metadata: Metadata = {
  title: "Free Web3 and RWA Tools | FluidRWA",
  description:
    "Explore free FluidRWA tools for RWA tokenization readiness, budget planning, vendor selection and Web3 infrastructure decisions.",
  alternates: {
    canonical: pageUrl
  },
  openGraph: {
    title: "Free Web3 and RWA Tools | FluidRWA",
    description:
      "Start with the free FluidRWA Tokenization Readiness Assessment for asset owners, funds, issuers and Web3 builders.",
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
      "Use FluidRWA tools to evaluate tokenization readiness, budget range, timeline and vendor categories.",
    images: [`${siteUrl}/assets/social/fluidrwa-preview.jpg`]
  }
};

export default function ToolsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "FluidRWA Tools",
    url: pageUrl,
    description: "Free tools for RWA tokenization readiness and Web3 infrastructure planning.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Free Tokenization Readiness Assessment Tool",
          url: `${siteUrl}/tokenization-readiness-assessment-tool`
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
            <h1>Free tools for Web3 and RWA decisions</h1>
            <p className="tra-hero-copy">
              Start with the Tokenization Readiness Assessment to understand readiness gaps, budget range, timeline and vendor categories before choosing tokenization providers.
            </p>
            <div className="tra-hero-actions">
              <Link className="btn-primary" href="/tokenization-readiness-assessment-tool">
                Free tokenization readiness tool
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
