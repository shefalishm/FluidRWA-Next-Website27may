import type { Metadata } from "next";
import { FreelancerDirectoryPreview } from "@/components/FreelancerDirectoryPreview";
import { JsonLd } from "@/components/JsonLd";
import { siteUrl } from "@/lib/routes";

export const metadata: Metadata = {
  title: "FluidRWA Specialist Directory",
  description:
    "Gated buyer access for the FluidRWA specialist directory, including search and FluidRWA-routed intro requests.",
  alternates: {
    canonical: `${siteUrl}/specialist-directory/directory`
  },
  robots: {
    index: false,
    follow: false
  }
};

export default function SpecialistDirectoryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "FluidRWA Specialist Directory",
    url: `${siteUrl}/specialist-directory/directory`,
    description: "Gated buyer access for FluidRWA specialist listings."
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <FreelancerDirectoryPreview />
    </>
  );
}
