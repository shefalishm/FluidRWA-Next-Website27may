import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { siteUrl } from "@/lib/routes";

const pageUrl = `${siteUrl}/news/nowpayments-featured-on-fluidrwa`;
const title = "NOWPayments Is Now Featured on FluidRWA";
const description =
  "NOWPayments is featured in FluidRWA's Stablecoin Infrastructure Providers directory, helping businesses discover its crypto payment, settlement, treasury and mass payout capabilities.";
const publishedAt = "2026-09-10T00:00:00.000Z";
const coverImagePath = "/assets/news/nowpayments-featured-on-fluidrwa-cover.jpg";
const previewImageUrl = `${siteUrl}/assets/news/nowpayments-featured-on-fluidrwa-og.jpg`;

export const metadata: Metadata = {
  title: `${title} | FluidRWA`,
  description,
  keywords: [
    "NOWPayments",
    "stablecoin infrastructure providers",
    "crypto payment gateway",
    "stablecoin payments",
    "mass payouts",
    "digital asset treasury"
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    title,
    description,
    url: pageUrl,
    type: "article",
    publishedTime: publishedAt,
    images: [{ url: previewImageUrl, width: 1200, height: 675, alt: "NOWPayments featured on FluidRWA" }]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [previewImageUrl]
  }
};

export default function NowPaymentsFeaturedPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    description,
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    datePublished: publishedAt,
    dateModified: publishedAt,
    image: [previewImageUrl],
    isAccessibleForFree: true,
    articleSection: "Feature announcements",
    author: { "@type": "Organization", name: "FluidRWA", url: siteUrl },
    publisher: {
      "@type": "Organization",
      name: "FluidRWA",
      url: siteUrl,
      logo: { "@type": "ImageObject", url: `${siteUrl}/assets/fluidrwa-small-logo.png` }
    },
    about: ["Stablecoin infrastructure", "Crypto payments", "Mass payouts", "Digital asset treasury"],
    mentions: [
      { "@type": "Organization", name: "NOWPayments", url: "https://nowpayments.io/" },
      { "@type": "Organization", name: "FluidRWA", url: siteUrl }
    ]
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "News", item: `${siteUrl}/news` },
      { "@type": "ListItem", position: 3, name: title, item: pageUrl }
    ]
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Where is NOWPayments featured on FluidRWA?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "NOWPayments is featured first among 30 companies in FluidRWA's Stablecoin Infrastructure Providers directory."
        }
      },
      {
        "@type": "Question",
        name: "What NOWPayments capabilities does the FluidRWA profile cover?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The profile covers crypto and stablecoin payments, flexible settlement and asset conversion, treasury operations, and dashboard, CSV and API-based mass payouts."
        }
      }
    ]
  };

  return (
    <main className="signal-page news-detail-page">
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />

      <section className="news-detail-hero">
        <div className="light-container news-detail-hero-stack">
          <p className="eyebrow light-eyebrow">FluidRWA news</p>
          <h1>{title}</h1>
          <figure className="news-cover-card news-cover-card--wide" aria-label="NOWPayments feature announcement cover image">
            <img
              src={coverImagePath}
              alt="NOWPayments is now featured on FluidRWA"
              width={1600}
              height={900}
              loading="eager"
              decoding="async"
            />
          </figure>
          <p>
            Businesses researching stablecoin infrastructure can now discover NOWPayments through FluidRWA, with a
            dedicated profile covering payment acceptance, settlement, treasury operations and mass payouts.
          </p>
          <div className="news-detail-meta">
            <span>Feature announcement</span>
            <time dateTime={publishedAt}>September 10, 2026</time>
          </div>
        </div>
      </section>

      <article className="light-container news-article-card">
        <section className="news-answer-box" aria-labelledby="feature-summary">
          <p className="eyebrow light-eyebrow">Feature summary</p>
          <h2 id="feature-summary">What changed?</h2>
          <p>
            NOWPayments is featured first among 30 companies in FluidRWA's Stablecoin Infrastructure Providers
            directory, giving teams another direct path to research its crypto and stablecoin payment infrastructure.
          </p>
          <div className="news-answer-links">
            <Link href="/fluidrwa/nowpayments">NOWPayments profile</Link>
            <Link href="/vendors/stablecoin-infrastructure-providers">Stablecoin infrastructure providers</Link>
            <a
              href="https://nowpayments.io/blog/nowpayments-is-now-featured-on-fluidrwa"
              target="_blank"
              rel="noopener noreferrer"
            >
              NOWPayments announcement
            </a>
          </div>
        </section>

        <p>
          NOWPayments is now featured on FluidRWA, a research and vendor discovery platform focused on Web3,
          tokenization and digital asset infrastructure.
        </p>
        <p>
          FluidRWA's directories help businesses explore providers across payments, settlement, custody, compliance,
          tokenization and other critical infrastructure categories. The NOWPayments listing gives teams evaluating
          digital asset payment infrastructure a concise view of where its products can fit into their workflows.
        </p>

        <section className="news-detail-section">
          <h2>What the NOWPayments profile covers</h2>
          <ul>
            <li>Crypto and stablecoin payment acceptance.</li>
            <li>Flexible settlement and asset conversion.</li>
            <li>Digital asset treasury operations.</li>
            <li>Dashboard, CSV and API-based mass payouts.</li>
            <li>Zero-Fee Ecosystem Payouts to ChangeNOW Pro users via email.</li>
          </ul>
        </section>

        <section className="news-detail-section">
          <h2>Why vendor discovery matters</h2>
          <p>
            Choosing payment infrastructure is rarely a one-product decision. Businesses need to understand supported
            assets, settlement options, payout workflows, treasury requirements and the wider compliance stack. A
            structured vendor profile helps teams move from broad market research to a more relevant shortlist.
          </p>
          <p>
            NOWPayments' inclusion gives businesses another way to assess its capabilities alongside other stablecoin
            infrastructure providers in the FluidRWA ecosystem.
          </p>
        </section>

        <section className="news-detail-section">
          <h2>About NOWPayments</h2>
          <p>
            NOWPayments provides infrastructure for businesses to accept crypto and stablecoin payments, automate mass
            payouts, convert digital assets and manage settlement and treasury workflows.
          </p>
        </section>

        <section className="news-detail-section">
          <h2>About FluidRWA</h2>
          <p>
            FluidRWA is a research and vendor discovery platform helping teams explore companies across tokenization,
            payments, custody, compliance, legal, security, blockchain development and other Web3 infrastructure areas.
          </p>
        </section>

        <div className="news-article-actions">
          <Link className="btn btn-primary" href="/fluidrwa/nowpayments">
            View NOWPayments profile
          </Link>
          <Link className="btn btn-secondary" href="/vendors/stablecoin-infrastructure-providers">
            Explore stablecoin providers
          </Link>
          <a
            className="btn btn-secondary"
            href="https://nowpayments.io/blog/nowpayments-is-now-featured-on-fluidrwa"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read their announcement
          </a>
        </div>
      </article>
    </main>
  );
}
