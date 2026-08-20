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
  robots: {
    index: false,
    follow: true
  }
};

export default function SpecialistDirectoryLaunchPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "FluidRWA Specialist Directory Launch",
    url: `${siteUrl}/specialist-directory`,
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
