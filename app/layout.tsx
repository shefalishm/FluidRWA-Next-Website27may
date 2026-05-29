import type { Metadata } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { FormScripts } from "@/components/FormScripts";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { Header } from "@/components/Header";
import { MotionShell } from "@/components/MotionShell";
import { siteUrl } from "@/lib/routes";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FluidRWA",
    template: "%s"
  },
  description: "FluidRWA helps teams discover Web3, RWA and digital asset infrastructure vendors.",
  icons: {
    icon: "/assets/favicon.png"
  },
  openGraph: {
    title: "FluidRWA | Find Trusted RWA and Web3 Infrastructure Vendors",
    description: "Find trusted Web3 and digital asset infrastructure vendors across tokenization, compliance, custody, payments, legal and AI.",
    url: siteUrl,
    siteName: "FluidRWA",
    images: [{ url: `${siteUrl}/assets/social/fluidrwa-preview.jpg`, width: 1200, height: 630 }],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "FluidRWA | Find Trusted RWA and Web3 Infrastructure Vendors",
    description: "Find trusted Web3 and digital asset infrastructure vendors across tokenization, compliance, custody, payments, legal and AI.",
    images: [`${siteUrl}/assets/social/fluidrwa-preview.jpg`]
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-Q5L2HZK162";
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "FluidRWA",
    url: siteUrl,
    logo: `${siteUrl}/assets/fluidrwa-small-logo.png`,
    sameAs: []
  };

  return (
    <html lang="en">
      <body className="light-home">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
        <Header />
        <MotionShell>{children}</MotionShell>
        <Footer />
        <FormScripts />
        <Script src="/assets/site.js?v=next-1" strategy="afterInteractive" />
        <GoogleAnalytics measurementId={googleAnalyticsId} />
      </body>
    </html>
  );
}
