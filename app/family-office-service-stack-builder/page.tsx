import type { Metadata } from "next";
import { FamilyOfficeStackTool } from "@/components/FamilyOfficeStackTool";
import { JsonLd } from "@/components/JsonLd";
import { siteUrl } from "@/lib/routes";

const pageUrl = `${siteUrl}/family-office-service-stack-builder`;

const familyOfficeFaqs = [
  {
    question: "What is a family office service stack?",
    answer:
      "A family office service stack is the coordinated set of advisors, platforms and providers supporting governance, tax, legal, reporting, investments, risk, cybersecurity, succession and administration."
  },
  {
    question: "Who should use a family office service stack assessment?",
    answer:
      "Single-family offices, founder offices, embedded family offices, multi-family office clients and wealth owners can use it to identify advisor gaps, vendor overlap and operational risks."
  },
  {
    question: "What provider categories does the tool evaluate?",
    answer:
      "The assessment evaluates governance advisors, family office consultants, tax advisors, legal advisors, reporting platforms, cybersecurity providers, insurance advisors, succession advisors and other service categories."
  },
  {
    question: "Is this family office tool only for Web3 or digital assets?",
    answer:
      "No. The assessment is broad and covers core family office operations. It can also surface specialist needs for private markets, venture exposure, direct deals or digital assets where relevant."
  }
];

export const metadata: Metadata = {
  title: "Free Family Office Service Stack Builder | FluidRWA",
  description:
    "Use FluidRWA's free family office service stack builder to assess advisor coverage, vendor gaps, governance, cybersecurity, reporting, succession and family office provider needs.",
  keywords: [
    "family office service providers",
    "family office service stack",
    "family office advisor assessment",
    "family office governance",
    "family office cybersecurity",
    "family office reporting",
    "family office vendor management",
    "family office succession planning",
    "single family office advisors",
    "family office consultant"
  ],
  alternates: {
    canonical: pageUrl
  },
  openGraph: {
    title: "Free Family Office Service Stack Builder | FluidRWA",
    description:
      "Assess family office advisor coverage, vendor gaps, governance, risk, reporting and succession provider needs with a free rule-based tool.",
    url: pageUrl,
    siteName: "FluidRWA",
    type: "website",
    images: [
      {
        url: `${siteUrl}/assets/social/fluidrwa-preview.jpg`,
        width: 1200,
        height: 630,
        alt: "FluidRWA family office service stack builder"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Family Office Service Stack Builder | FluidRWA",
    description:
      "Identify advisor gaps, vendor overlap and family office service-provider categories to review.",
    images: [`${siteUrl}/assets/social/fluidrwa-preview.jpg`]
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function FamilyOfficeServiceStackBuilderPage() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "FluidRWA Family Office Service Stack Builder",
    url: pageUrl,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Rule-based tool to assess family office service-provider coverage, advisor gaps, governance, cybersecurity, reporting and continuity needs.",
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
      "Family office service stack score",
      "Advisor and provider gap assessment",
      "Governance and decision clarity review",
      "Cybersecurity and privacy risk prompts",
      "Reporting and continuity review",
      "Recommended service-provider categories"
    ],
    audience: {
      "@type": "Audience",
      audienceType: "Family offices, founder offices, wealth owners and private investment offices"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: familyOfficeFaqs.map((item) => ({
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
        name: "Family Office Service Stack Builder",
        item: pageUrl
      }
    ]
  };

  return (
    <main>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <FamilyOfficeStackTool />
    </main>
  );
}
