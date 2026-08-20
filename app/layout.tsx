import type { Metadata, Viewport } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { FluidRwaSignupPopup } from "@/components/FluidRwaSignupPopup";
import { FormScripts } from "@/components/FormScripts";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { Header } from "@/components/Header";
import { MotionShell } from "@/components/MotionShell";
import { PayPalMembershipCheckout } from "@/components/PayPalMembershipCheckout";
import { RouteReady } from "@/components/RouteReady";
import { siteUrl } from "@/lib/routes";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FluidRWA",
    template: "%s"
  },
  description: "Discover trusted Web3, RWA and AI infrastructure vendors across 1000+ tracked providers and 30+ categories including tokenization, compliance, custody, stablecoins, legal, AI, security and blockchain infrastructure.",
  icons: {
    icon: "/assets/favicon.png"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#fff8d7"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const buildRevision = process.env.VERCEL_GIT_COMMIT_SHA || process.env.NEXT_PUBLIC_BUILD_REVISION || "local";
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "FluidRWA",
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/assets/fluidrwa-small-logo.png`
    },
    description: "FluidRWA helps teams discover trusted Web3, RWA and AI infrastructure vendors across 1000+ tracked providers and 30+ categories.",
    sameAs: [
      "https://www.linkedin.com/company/fluidrwa",
      "https://x.com/fluid_rwa",
      "https://www.instagram.com/fluidrwa/",
      "https://www.youtube.com/channel/UCsiBOepcGO78f64tI5la_Qg"
    ],
    knowsAbout: [
      "RWA tokenization",
      "Web3 vendors",
      "digital asset infrastructure",
      "compliance infrastructure",
      "custody solutions",
      "stablecoin infrastructure",
      "blockchain development"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: `${siteUrl}/contact`
    }
  };

  return (
    <html lang="en">
      <body className="light-home" data-fluidrwa-build={buildRevision}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
        <Header />
        <MotionShell>{children}</MotionShell>
        <FluidRwaSignupPopup />
        <Footer />
        <FormScripts />
        <PayPalMembershipCheckout />
        <RouteReady />
        <GoogleAnalytics />
        <Script src="/assets/site.js?v=vendor-search-2" strategy="afterInteractive" />
      </body>
    </html>
  );
}
