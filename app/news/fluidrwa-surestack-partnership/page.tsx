import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { siteUrl } from "@/lib/routes";

const pageUrl = `${siteUrl}/news/fluidrwa-surestack-partnership`;
const title = "FluidRWA Welcomes SureStack as a New Vetted Risk Management & Security Partner";
const seoTitle = "SureStack Joins FluidRWA as Vetted Web3 Risk and Security Partner";
const description =
  "SureStack joins FluidRWA as a vetted risk management and security partner for digital asset issuers, funds and Web3 teams evaluating tokenization infrastructure.";
const publishedAt = "2026-07-23T00:00:00.000Z";
const coverImagePath = "/assets/news/fluidrwa-surestack-partnership-cover.jpg";
const previewImagePath = "/assets/news/fluidrwa-surestack-partnership-og.jpg";
const coverImageUrl = `${siteUrl}${coverImagePath}`;
const previewImageUrl = `${siteUrl}${previewImagePath}`;

export const metadata: Metadata = {
  title: `${seoTitle} | FluidRWA`,
  description,
  keywords: [
    "SureStack FluidRWA partnership",
    "Web3 risk management partner",
    "digital asset security intelligence",
    "tokenization security partner",
    "RWA security vendor",
    "vetted Web3 security provider"
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
        alt: "FluidRWA welcomes SureStack partnership announcement"
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

export default function FluidRwaSureStackPartnershipPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    alternativeHeadline: "SureStack joins FluidRWA as a vetted Web3 risk management and security partner",
    description,
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    datePublished: publishedAt,
    dateModified: publishedAt,
    image: [coverImageUrl, previewImageUrl],
    isAccessibleForFree: true,
    articleSection: "Partnership announcements",
    keywords: [
      "Web3 risk management",
      "digital asset security",
      "RWA tokenization security",
      "vendor discovery",
      "security intelligence"
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
      "Web3 security",
      "Digital asset risk management",
      "Tokenization infrastructure",
      "Vendor discovery"
    ],
    mentions: [
      {
        "@type": "Organization",
        name: "SureStack Technology Group Inc.",
        url: "https://surestack.tech/"
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
        name: "FluidRWA and SureStack partnership",
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
        name: "What category is SureStack relevant for on FluidRWA?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "SureStack is relevant for Web3 risk management, digital asset security intelligence, threat monitoring and tokenization security workflows."
        }
      },
      {
        "@type": "Question",
        name: "Who should evaluate SureStack?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Digital asset issuers, funds, tokenization projects and Web3 enterprises can evaluate SureStack when they need risk intelligence, security monitoring and proactive digital asset protection."
        }
      },
      {
        "@type": "Question",
        name: "How does FluidRWA help projects find vetted security partners?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "FluidRWA helps teams compare and discover relevant vendors across tokenization, legal, compliance, custody, payments, AI infrastructure, security and blockchain development categories."
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
          <figure className="news-cover-card news-cover-card--wide" aria-label="FluidRWA and SureStack partnership cover image">
            <img
              src={coverImagePath}
              alt="FluidRWA welcomes SureStack as a vetted risk management and security partner"
              width={1600}
              height={900}
              loading="eager"
              decoding="async"
            />
          </figure>
          <p>
            FluidRWA has welcomed SureStack Technology Group as a vetted risk management and security partner,
            strengthening the discovery path for digital asset issuers, funds and Web3 enterprises evaluating security
            intelligence for tokenized ecosystems.
          </p>
          <div className="news-detail-meta">
            <span>Partnership announcement</span>
            <time dateTime={publishedAt}>July 23, 2026</time>
          </div>
        </div>
      </section>

      <article className="light-container news-article-card">
        <section className="news-answer-box" aria-labelledby="partnership-summary">
          <p className="eyebrow light-eyebrow">Partnership summary</p>
          <h2 id="partnership-summary">What changed?</h2>
          <p>
            SureStack is now part of the FluidRWA ecosystem as a vetted risk management and security partner, giving
            tokenization and Web3 teams another security-focused provider to evaluate when they need threat monitoring,
            digital asset risk intelligence and proactive protection.
          </p>
          <div className="news-answer-links">
            <a href="https://surestack.tech/" target="_blank" rel="noopener noreferrer">
              SureStack website
            </a>
            <Link href="/vendors/security-audit-companies">Security and audit vendors</Link>
            <Link href="/submit-requirement">Submit a project requirement</Link>
          </div>
        </section>

        <p>
          FluidRWA is excited to announce a strategic partnership with SureStack Technology Group, an enterprise
          innovator in digital asset risk management and automated security intelligence.
        </p>
        <p>
          FluidRWA was built to remove friction from vendor discovery, helping asset issuers, funds and Web3 enterprises
          match with relevant service providers faster. By welcoming SureStack to the ecosystem, FluidRWA is strengthening
          its matching pipeline with institutional-grade security and risk mitigation capabilities.
        </p>

        <section className="news-detail-section">
          <h2>Connecting asset issuers with risk infrastructure</h2>
          <p>
            Projects using FluidRWA to source technology, legal and compliance partners can now evaluate SureStack when
            they need to secure a tokenized ecosystem, assess risk exposure or access Atlas Intelligence, SureStack's
            threat monitoring platform.
          </p>
          <p>
            For tokenization projects, security is not a final checklist item. It sits across wallet exposure, contract
            risk, infrastructure monitoring, incident response and ongoing operational controls. SureStack's inclusion
            gives teams a clearer path to compare risk intelligence alongside the other vendor categories required to
            launch and scale digital asset products.
          </p>
        </section>

        <section className="news-detail-section">
          <h2>What the collaboration includes</h2>
          <ul>
            <li>SureStack joins FluidRWA as a vetted risk management and security partner.</li>
            <li>
              FluidRWA projects can evaluate SureStack for threat monitoring, risk intelligence and digital asset
              protection workflows.
            </li>
            <li>
              The partnership supports faster vendor discovery for asset issuers, funds and Web3 teams building
              tokenized ecosystems.
            </li>
          </ul>
        </section>

        <section className="news-detail-section">
          <h2>Why this matters for RWA and Web3 teams</h2>
          <p>
            Teams building RWA and digital asset products rarely need one vendor in isolation. A real launch may require
            tokenization infrastructure, legal review, compliance onboarding, custody, payment rails, smart contract
            review, monitoring and risk controls. FluidRWA organizes those categories so teams can move from research to
            a vendor shortlist faster.
          </p>
          <p>
            Adding SureStack improves the security and risk management layer of that workflow, especially for teams that
            want to understand security exposure before an issue reaches the chain.
          </p>
        </section>

        <section className="news-quote-grid" aria-label="Quote">
          <blockquote>
            <p>
              "Speed, trust and relevance are at the heart of what we do at FluidRWA. Welcoming SureStack to our vendor
              ecosystem ensures that asset issuers and enterprises on our platform have access to a world-class security
              and risk intelligence platform."
            </p>
            <footer>Shefali Sharma, Founder & CEO, FluidRWA</footer>
          </blockquote>
          <blockquote>
            <p>
              "Finding trusted technology and security partners should be fast and seamless for projects scaling in
              Web3. Partnering with FluidRWA allows us to directly reach asset issuers and institutional funds looking
              for reliable digital asset risk protection."
            </p>
            <footer>Neşe Ünsal, Founder & CEO, SureStack</footer>
          </blockquote>
        </section>

        <section className="news-detail-section">
          <h2>About FluidRWA</h2>
          <p>
            FluidRWA is a vendor discovery and matching platform for the digital asset ecosystem, connecting startups,
            funds and enterprises with curated providers across RWA, compliance, legal, infrastructure, security,
            tokenization and Web3 operations.
          </p>
        </section>

        <section className="news-detail-section">
          <h2>About SureStack Technology Group Inc.</h2>
          <p>
            SureStack Technology Group Inc. is an AI-powered Web3 risk intelligence platform supporting institutions and
            individual crypto investors. By analyzing and detecting vulnerabilities before they hit the chain, SureStack
            provides real-time threat reporting and proactive asset protection.
          </p>
        </section>

        <section className="news-detail-section">
          <h2>Frequently asked questions</h2>
          <h3>What is SureStack joining FluidRWA as?</h3>
          <p>SureStack is joining FluidRWA as a vetted risk management and security partner.</p>
          <h3>Who should evaluate SureStack?</h3>
          <p>
            Digital asset issuers, funds, tokenization projects and Web3 enterprises can evaluate SureStack for risk
            intelligence, threat monitoring and proactive digital asset security workflows.
          </p>
          <h3>How can projects compare security vendors?</h3>
          <p>
            Projects can use FluidRWA to explore security vendors, review relevant vendor categories or submit a project
            requirement for vendor matching.
          </p>
        </section>

        <div className="news-article-actions">
          <a className="btn btn-primary" href="https://surestack.tech/" target="_blank" rel="noopener noreferrer">
            Visit SureStack
          </a>
          <Link className="btn btn-secondary" href="/vendors/security-audit-companies">
            Explore security vendors
          </Link>
          <Link className="btn btn-secondary" href="/submit-requirement">
            Submit a project requirement
          </Link>
        </div>
      </article>
    </main>
  );
}
