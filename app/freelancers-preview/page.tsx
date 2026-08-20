import type { Metadata } from "next";
import { FreelancerMarketplacePreview } from "@/components/FreelancerMarketplacePreview";
import { JsonLd } from "@/components/JsonLd";
import { siteUrl } from "@/lib/routes";

export const metadata: Metadata = {
  title: "FluidRWA Specialist Directory Launch",
  description:
    "Submit your RWA, Web3 and tokenization specialist portfolio before the FluidRWA specialist directory launches on July 30, 2026.",
  alternates: {
    canonical: `${siteUrl}/freelancers-preview`
  },
  robots: {
    index: false,
    follow: false
  }
};

export default function FreelancersPreviewPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "FluidRWA Specialist Directory Launch",
    url: `${siteUrl}/freelancers-preview`,
    description:
      "Launch page for RWA and Web3 specialists to submit portfolios before the FluidRWA specialist directory launch."
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <FreelancerMarketplacePreview />
    </>
  );
}
