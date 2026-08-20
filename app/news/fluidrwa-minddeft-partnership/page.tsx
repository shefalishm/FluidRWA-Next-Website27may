import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { siteUrl } from "@/lib/routes";

const pageUrl = `${siteUrl}/news/fluidrwa-minddeft-partnership`;
const title = "FluidRWA Welcomes Minddeft as a Vetted Development & Smart Contracts Partner";
const seoTitle = "Minddeft Joins FluidRWA as Vetted Web3 Partner";
const description =
  "Minddeft joins FluidRWA as a vetted smart contract and blockchain development partner for tokenization and enterprise Web3 projects.";
const publishedAt = "2026-07-09T00:00:00.000Z";
const coverImagePath = "/assets/news/fluidrwa-minddeft-partnership-cover.jpg";
const previewImagePath = "/assets/news/fluidrwa-minddeft-partnership-og.jpg";
const coverImageUrl = `${siteUrl}${coverImagePath}`;
const previewImageUrl = `${siteUrl}${previewImagePath}`;

export const metadata: Metadata = {
  title: `${seoTitle} | FluidRWA`,
  description,
  keywords: [
    "Minddeft FluidRWA partnership",
    "smart contract development partner",
    "blockchain development company",
    "tokenization services",
    "enterprise Web3 engineering",
    "vetted Web3 vendor"
  ],
  alternates: {
    canonical: pageUrl
  },
  openGraph: {
    title: seoTitle,
    description,
    url: pageUrl,
    type: "article",
    publishedTime: publishedAt,
    images: [
      {
        url: previewImageUrl,
        width: 1200,
        height: 675,
        alt: "FluidRWA welcomes Minddeft partnership announcement"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: seoTitle,
    description,
    images: [previewImageUrl]
  }
};

export default function FluidRwaMinddeftPartnershipPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    alternativeHeadline: "Minddeft joins FluidRWA as a vetted Web3 and smart contract development partner",
    description,
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    datePublished: publishedAt,
    dateModified: publishedAt,
    image: [previewImageUrl],
    isAccessibleForFree: true,
    articleSection: "Partnership announcements",
    keywords: [
      "smart contract development",
      "blockchain development company",
      "tokenization services",
      "enterprise Web3 engineering",
      "vetted vendor"
    ],
    author: {
      "@type": "Organization",
      name: "FluidRWA",
      url: siteUrl
    },
    publisher: {
      "@type": "Organization",
      name: "FluidRWA",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/assets/fluidrwa-small-logo.png`
      }
    },
    about: [
      "Smart contract development",
      "Blockchain development",
      "Tokenization services",
      "Enterprise Web3 engineering"
    ],
    mentions: [
      {
        "@type": "Organization",
        name: "Minddeft Technologies Pvt. Ltd.",
        url: `${siteUrl}/fluidrwa/minddeft-technologies`
      },
      {
        "@type": "Organization",
        name: "FluidRWA",
        url: siteUrl
      }
    ]
  };

  const breadcrumbJsonLd = {
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
        name: "News",
        item: `${siteUrl}/news`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "FluidRWA and Minddeft partnership",
        item: pageUrl
      }
    ]
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What category is Minddeft listed under on FluidRWA?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Minddeft is listed as a vetted vendor in the Development & Smart Contracts category on FluidRWA."
        }
      },
      {
        "@type": "Question",
        name: "What services can projects evaluate Minddeft for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Projects can evaluate Minddeft for smart contract development, dApp development, tokenization solutions, blockchain implementation and enterprise Web3 engineering."
        }
      },
      {
        "@type": "Question",
        name: "How does FluidRWA help projects looking for tokenization vendors?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "FluidRWA helps projects compare and discover vendors across tokenization, legal, compliance, custody, payments, AI infrastructure, security and blockchain development categories."
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
          <figure className="news-cover-card news-cover-card--wide" aria-label="FluidRWA and Minddeft partnership cover image">
            <img
              src={coverImagePath}
              alt="FluidRWA welcomes Minddeft as a new vetted vendor"
              width={1600}
              height={900}
              loading="eager"
              decoding="async"
            />
          </figure>
          <p>
            FluidRWA has added Minddeft Technologies Pvt. Ltd. as a vetted vendor in Development & Smart Contracts,
            strengthening the discovery path for teams comparing blockchain development, tokenization and enterprise
            Web3 engineering partners.
          </p>
          <div className="news-detail-meta">
            <span>Partnership announcement</span>
            <time dateTime={publishedAt}>July 9, 2026</time>
          </div>
        </div>
      </section>

      <article className="light-container news-article-card">
        <section className="news-answer-box" aria-labelledby="partnership-summary">
          <p className="eyebrow light-eyebrow">Partnership summary</p>
          <h2 id="partnership-summary">What changed?</h2>
          <p>
            Minddeft Technologies is now a vetted FluidRWA vendor for teams looking for smart contract development,
            blockchain development, tokenization solutions and enterprise Web3 engineering support.
          </p>
          <div className="news-answer-links">
            <Link href="/fluidrwa/minddeft-technologies">Minddeft profile</Link>
            <Link href="/vendors/smart-contract-development-companies">Smart contract development companies</Link>
            <Link href="/submit-requirement">Submit a project requirement</Link>
          </div>
        </section>

        <p>
          FluidRWA is pleased to announce that Minddeft Technologies Pvt. Ltd. has joined the FluidRWA ecosystem as a
          vetted vendor in the Development & Smart Contracts category.
        </p>
        <p>
          As more organizations explore tokenization, digital asset products and enterprise blockchain use cases, one of
          the biggest challenges is finding trusted technical partners. The collaboration gives FluidRWA projects access
          to Minddeft's experience in blockchain development, smart contracts, tokenization solutions and enterprise Web3
          engineering.
        </p>
        <p>
          Founded in 2015, Minddeft has delivered blockchain solutions across industries and global markets. Through
          FluidRWA, teams evaluating technical partners can now find Minddeft in relevant vendor discovery paths,
          including smart contract development and blockchain implementation.
        </p>

        <section className="news-detail-section">
          <h2>What the collaboration includes</h2>
          <ul>
            <li>Minddeft joins FluidRWA as a vetted vendor in Development & Smart Contracts.</li>
            <li>FluidRWA projects can discover Minddeft for smart contracts, dApps, tokenization and blockchain builds.</li>
            <li>Both organizations will collaborate on educational content and ecosystem awareness.</li>
          </ul>
        </section>

        <section className="news-detail-section">
          <h2>Why this matters for tokenization and Web3 projects</h2>
          <p>
            Projects searching for tokenization services often need more than one vendor. A typical shortlist can include
            smart contract developers, legal counsel, KYC and AML providers, custody infrastructure, payment rails and
            security reviewers. Minddeft's vetted profile gives teams another reviewed technical option inside FluidRWA's
            vendor discovery workflow.
          </p>
        </section>

        <section className="news-quote-grid" aria-label="Quotes">
          <blockquote>
            <p>
              "We are excited to welcome Minddeft to the FluidRWA ecosystem. Our goal is to make it easier for
              organizations to identify trusted service providers, and Minddeft's technical capabilities strengthen the
              options available to projects looking for experienced blockchain development partners."
            </p>
            <footer>Shefali Sharma, Co-Founder & CMO, FluidRWA</footer>
          </blockquote>
          <blockquote>
            <p>
              "We are delighted to collaborate with FluidRWA. As demand for tokenization and enterprise blockchain
              solutions continues to grow, this relationship allows us to connect with organizations seeking experienced
              development partners while contributing to a more trusted and transparent digital asset ecosystem."
            </p>
            <footer>Krunal Soni, CEO, Minddeft Technologies</footer>
          </blockquote>
        </section>

        <section className="news-detail-section">
          <h2>About FluidRWA</h2>
          <p>
            FluidRWA is a vendor discovery and matching platform for the digital asset ecosystem. It helps projects,
            institutions and enterprises find relevant vendors across tokenization, legal, compliance, custody, payments,
            AI infrastructure, security and blockchain development.
          </p>
        </section>

        <section className="news-detail-section">
          <h2>About Minddeft Technologies</h2>
          <p>
            Minddeft Technologies Pvt. Ltd. is a blockchain development company specializing in smart contracts, dApps,
            tokenization solutions, enterprise blockchain platforms and Web3 product engineering. Since 2015, Minddeft
            has delivered blockchain solutions across industries and global markets.
          </p>
        </section>

        <section className="news-detail-section">
          <h2>Frequently asked questions</h2>
          <h3>What category is Minddeft listed under?</h3>
          <p>Minddeft is listed as a vetted vendor in Development & Smart Contracts.</p>
          <h3>What can projects evaluate Minddeft for?</h3>
          <p>
            Projects can evaluate Minddeft for smart contract development, dApp development, tokenization solutions,
            blockchain implementation and enterprise Web3 engineering.
          </p>
          <h3>How can projects compare vendors?</h3>
          <p>
            Projects can use FluidRWA to explore smart contract vendors, review category pages or submit a project
            requirement for vendor matching.
          </p>
        </section>

        <div className="news-article-actions">
          <Link className="btn btn-primary" href="/fluidrwa/minddeft-technologies">
            View Minddeft profile
          </Link>
          <Link className="btn btn-secondary" href="/vendors/smart-contract-development-companies">
            Explore smart contract vendors
          </Link>
          <Link className="btn btn-secondary" href="/submit-requirement">
            Submit a project requirement
          </Link>
        </div>
      </article>
    </main>
  );
}
