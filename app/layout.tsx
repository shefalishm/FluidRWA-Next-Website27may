import type { Metadata, Viewport } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { FormScripts } from "@/components/FormScripts";
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
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#fff8d7"
};

export default function RootLayout({ children }: { children: ReactNode }) {
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
      </body>
    </html>
  );
}
