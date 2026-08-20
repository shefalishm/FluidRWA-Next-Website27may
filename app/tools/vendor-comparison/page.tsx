import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { VendorComparisonTool } from "@/components/VendorComparisonTool";
import { siteUrl } from "@/lib/routes";
import { vendorComparisonCategories } from "@/lib/vendorComparisonTool";

const pageUrl = `${siteUrl}/tools/vendor-comparison`;
const previewImage = `${siteUrl}/assets/social/fluidrwa-vendor-comparison-tool-announcement-16x9.png?v=20260803`;

export const metadata: Metadata = {
  title: "Vendor Comparison Tool for Web3, RWA and AI Vendors | FluidRWA",
  description:
    "Compare up to five Web3, RWA or AI vendors by pasting their URLs, describing your project and generating a source-referenced fit table.",
  alternates: {
    canonical: pageUrl
  },
  openGraph: {
    title: "Vendor Comparison Tool | FluidRWA",
    description:
      "Paste vendor URLs, describe your project and generate a source-referenced fit comparison before shortlisting Web3, RWA and AI infrastructure vendors.",
    url: pageUrl,
    siteName: "FluidRWA",
    type: "website",
    images: [
      {
        url: previewImage,
        width: 1600,
        height: 900,
        type: "image/png",
        alt: "FluidRWA vendor comparison tool"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Vendor Comparison Tool | FluidRWA",
    description: "Compare up to five vendor URLs and get a project-fit table with references, strengths and watch-outs.",
    images: [previewImage]
  }
};

export default function VendorComparisonPage() {
  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "FluidRWA Vendor Comparison Tool",
    url: pageUrl,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Interactive vendor comparison tool that reads public vendor URLs and creates a source-referenced project-fit comparison table for Web3, RWA and AI infrastructure buyers.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    },
    featureList: [
      "Paste up to five vendor website URLs",
      "Describe the buyer project and operating requirements",
      "Generate a source-referenced comparison table",
      "Score vendors by project fit and visible website signals",
      "Submit a comparison brief to FluidRWA"
    ],
    about: vendorComparisonCategories.map((category) => category.label)
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does the FluidRWA vendor comparison score work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The tool compares the project description against readable public content from each vendor URL. It looks for category, product, compliance, integration and use-case signals, then creates a first-pass project-fit score."
        }
      },
      {
        "@type": "Question",
        name: "How many vendor websites can I compare?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can compare up to five vendor website URLs at a time."
        }
      },
      {
        "@type": "Question",
        name: "Can I compare vendors from different categories?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The tool can compare vendors across tokenization, custody, KYC, stablecoins, smart contracts, data, infrastructure and AI categories."
        }
      },
      {
        "@type": "Question",
        name: "Is this a replacement for vendor due diligence?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. The output is a first-pass shortlist based on public website evidence. Buyers should still verify pricing, references, security evidence, jurisdiction support, contracts and implementation ownership."
        }
      }
    ]
  };

  return (
    <main>
      <JsonLd data={webApplicationSchema} />
      <JsonLd data={faqSchema} />
      <VendorComparisonTool />
    </main>
  );
}
