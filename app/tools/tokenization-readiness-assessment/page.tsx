import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { TokenizationAssessmentTool } from "@/components/TokenizationAssessmentTool";
import { siteUrl } from "@/lib/routes";
import { tokenizationAssessmentFaqs } from "@/lib/tokenizationAssessmentContent";

const pageUrl = `${siteUrl}/tools/tokenization-readiness-assessment`;

export const metadata: Metadata = {
  title: "Free Tokenization Readiness Assessment Tool for RWA Projects | FluidRWA",
  description:
    "Use FluidRWA's free tokenization readiness assessment tool to evaluate RWA tokenization gaps, budget range, timeline, complexity and vendor categories before choosing tokenization platforms or providers.",
  keywords: [
    "tokenization readiness assessment",
    "free tokenization tool",
    "RWA tokenization tool",
    "RWA tokenization assessment",
    "asset tokenization readiness",
    "tokenization platforms",
    "tokenization companies",
    "RWA tokenization providers",
    "real world asset tokenization",
    "Web3 vendor discovery"
  ],
  alternates: {
    canonical: pageUrl
  },
  openGraph: {
    title: "Free Tokenization Readiness Assessment Tool for RWA Projects | FluidRWA",
    description:
      "A free rule-based assessment for asset owners, funds, issuers and Web3 teams evaluating tokenization readiness, budget range, timeline and vendor needs.",
    url: pageUrl,
    siteName: "FluidRWA",
    type: "website",
    images: [
      {
        url: `${siteUrl}/assets/social/fluidrwa-preview.jpg`,
        width: 1200,
        height: 630,
        alt: "FluidRWA Web3 vendor discovery and tokenization readiness"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Tokenization Readiness Assessment Tool for RWA Projects | FluidRWA",
    description:
      "Check tokenization readiness, estimate budget ranges and identify the tokenization vendor categories your project may need.",
    images: [`${siteUrl}/assets/social/fluidrwa-preview.jpg`]
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function TokenizationReadinessAssessmentPage() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "FluidRWA Tokenization Readiness & Budget Assessment",
    alternateName: [
      "Free Tokenization Readiness Tool",
      "RWA Tokenization Readiness Assessment",
      "Asset Tokenization Assessment"
    ],
    url: pageUrl,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Rule-based assessment tool for tokenization readiness, complexity, budget ranges and recommended Web3 vendor categories.",
    provider: {
      "@type": "Organization",
      name: "FluidRWA",
      url: siteUrl
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    },
    featureList: [
      "Tokenization readiness score",
      "RWA tokenization budget range",
      "Tokenization timeline estimate",
      "Complexity rating",
      "Recommended tokenization vendor categories",
      "Rule-based readiness report"
    ],
    audience: {
      "@type": "Audience",
      audienceType: "Asset owners, fund managers, real estate teams, private market issuers, tokenization companies and Web3 builders"
    }
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to assess whether an asset is ready for tokenization",
    description:
      "A simple workflow for asset owners and issuers to evaluate tokenization readiness before selecting RWA tokenization platforms or providers.",
    step: [
      {
        "@type": "HowToStep",
        name: "Review legal and regulatory readiness",
        text: "Confirm ownership records, legal entity status, jurisdiction, investor eligibility and compliance requirements."
      },
      {
        "@type": "HowToStep",
        name: "Review asset and operational readiness",
        text: "Check valuation, financial records, cash flow information, reporting process and performance history."
      },
      {
        "@type": "HowToStep",
        name: "Review investor and distribution readiness",
        text: "Identify target investors, onboarding needs, capital raising strategy, liquidity expectations and distribution channels."
      },
      {
        "@type": "HowToStep",
        name: "Review budget and execution readiness",
        text: "Estimate budget, internal team capacity, timeline, technology strategy and service provider requirements."
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tokenizationAssessmentFaqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: `${siteUrl}/tools`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Tokenization Readiness Assessment",
        item: pageUrl
      }
    ]
  };

  return (
    <main>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={howToSchema} />
      <TokenizationAssessmentTool />
    </main>
  );
}
