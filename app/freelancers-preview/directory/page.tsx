import type { Metadata } from "next";
import { FreelancerDirectoryPreview } from "@/components/FreelancerDirectoryPreview";
import { JsonLd } from "@/components/JsonLd";
import { siteUrl } from "@/lib/routes";

export const metadata: Metadata = {
  title: "FluidRWA Specialist Directory Preview",
  description:
    "Preview gated buyer access for the FluidRWA specialist directory, including search and FluidRWA-routed intro requests.",
  alternates: {
    canonical: `${siteUrl}/freelancers-preview/directory`
  },
  robots: {
    index: false,
    follow: false
  }
};

export default function FreelancerDirectoryPreviewPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "FluidRWA Specialist Directory Preview",
    url: `${siteUrl}/freelancers-preview/directory`,
    description: "Preview gated buyer access for FluidRWA specialist listings."
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <FreelancerDirectoryPreview />
    </>
  );
}
