import type { Metadata } from "next";
import { FreelancerMarketplacePreview } from "@/components/FreelancerMarketplacePreview";
import { JsonLd } from "@/components/JsonLd";
import { siteUrl } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Apply as a RWA and Web3 Freelancer | FluidRWA",
  description:
    "Submit your RWA, tokenization, compliance, smart contract, AI infrastructure or Web3 freelancer portfolio for the FluidRWA specialist launch directory.",
  alternates: {
    canonical: `${siteUrl}/apply-as-freelancer`
  },
  openGraph: {
    title: "Apply as a RWA and Web3 Freelancer | FluidRWA",
    description:
      "FluidRWA is collecting specialist portfolios for tokenization, compliance, smart contracts, AI infrastructure, research, legal, finance and growth roles.",
    url: `${siteUrl}/apply-as-freelancer`,
    siteName: "FluidRWA",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Apply as a RWA and Web3 Freelancer | FluidRWA",
    description:
      "Submit your RWA, tokenization or Web3 specialist portfolio for FluidRWA review before the specialist directory launch."
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function ApplyAsFreelancerPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Apply as a RWA and Web3 Freelancer",
      url: `${siteUrl}/apply-as-freelancer`,
      description:
        "Application page for RWA, tokenization, smart contract, compliance, AI infrastructure, legal, research, finance and Web3 specialists who want to be reviewed for FluidRWA's specialist launch directory.",
      isPartOf: {
        "@type": "WebSite",
        name: "FluidRWA",
        url: siteUrl
      },
      mainEntity: {
        "@type": "Service",
        name: "FluidRWA specialist directory application",
        serviceType: "Specialist portfolio submission",
        areaServed: "Global",
        provider: {
          "@type": "Organization",
          name: "FluidRWA",
          url: siteUrl
        },
        audience: {
          "@type": "Audience",
          audienceType: "RWA, tokenization and Web3 freelancers"
        }
      }
    },
    {
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
          name: "Apply as a Freelancer",
          item: `${siteUrl}/apply-as-freelancer`
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Who can apply to the FluidRWA specialist directory?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "RWA, tokenization, Web3, compliance, legal, smart contract, AI infrastructure, research, finance, design and growth specialists can submit a portfolio for FluidRWA review."
          }
        },
        {
          "@type": "Question",
          name: "When does the FluidRWA specialist directory launch?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The FluidRWA specialist directory is planned for launch on July 30, 2026."
          }
        },
        {
          "@type": "Question",
          name: "Is it free for freelancers to submit a portfolio?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "FluidRWA is collecting portfolio submissions before launch, and approved founding specialists are planned to receive free listing visibility for the first three months."
          }
        },
        {
          "@type": "Question",
          name: "Can buyers contact freelancers directly?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Buyer intro requests are planned to route through FluidRWA first, so the platform can track demand and protect specialist contact details."
          }
        }
      ]
    }
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <FreelancerMarketplacePreview />
    </>
  );
}
