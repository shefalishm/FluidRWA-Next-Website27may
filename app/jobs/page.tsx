import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { formatSignalDate, getJobItems } from "@/lib/marketSignals";
import { siteUrl } from "@/lib/routes";

export const revalidate = 900;

export const metadata: Metadata = {
  title: "RWA, Web3 and AI Infrastructure Jobs | FluidRWA",
  description:
    "Find RWA, Web3 and AI infrastructure roles across custody, smart contracts, compliance, tokenization, blockchain engineering, security and institutional digital assets.",
  alternates: {
    canonical: `${siteUrl}/jobs`
  },
  openGraph: {
    title: "RWA, Web3 and AI Infrastructure Jobs | FluidRWA",
    description:
      "A curated jobs board for tokenization, custody, compliance, blockchain engineering, AI infrastructure and institutional digital asset roles.",
    url: `${siteUrl}/jobs`,
    type: "website"
  }
};

export default async function JobsPage() {
  const jobs = await getJobItems();
  const categories = Array.from(new Set(jobs.map((job) => job.category))).slice(0, 10);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "RWA, Web3 and AI Infrastructure Jobs",
    url: `${siteUrl}/jobs`,
    description:
      "Curated jobs board for Web3, RWA tokenization, custody, compliance, stablecoin, smart contract and AI infrastructure roles.",
    isPartOf: {
      "@type": "WebSite",
      name: "FluidRWA",
      url: siteUrl
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: jobs.slice(0, 20).map((job, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: job.canonicalUrl,
        name: `${job.title} at ${job.companyName}`
      }))
    }
  };

  return (
    <main className="signal-page">
      <JsonLd data={jsonLd} />
      <section className="signal-hero signal-hero-jobs">
        <div className="light-container signal-hero-grid signal-hero-single">
          <div>
            <p className="eyebrow light-eyebrow">FluidRWA jobs</p>
            <h1>RWA, Web3 and AI infrastructure jobs</h1>
            <p>
              Roles from infrastructure companies building custody, smart contracts, security, stablecoins, compliance,
              tokenization and institutional digital asset systems.
            </p>
            <div className="signal-actions">
              <Link className="btn btn-primary" href="/vendor-membership">
                Feature a Role
              </Link>
              <Link className="btn btn-secondary" href="/web3vendorecosystem">
                Explore Companies
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="light-container signal-section">
        <div className="signal-section-head">
          <div>
            <p className="eyebrow light-eyebrow">Open roles</p>
            <h2>Infrastructure hiring signals</h2>
          </div>
          <div className="signal-chip-row" aria-label="Job categories">
            {categories.map((category) => (
              <span key={category}>{category}</span>
            ))}
          </div>
        </div>

        <div className="job-list">
          {jobs.map((job) => (
            <article className="job-card" key={`${job.companyName}-${job.canonicalUrl}`}>
              <div>
                <span className="job-company">{job.companyName}</span>
                <h3>
                  <a href={job.canonicalUrl} target="_blank" rel="noopener noreferrer">
                    {job.title}
                  </a>
                </h3>
                <p>
                  {job.department} · {job.location}
                </p>
              </div>
              <div className="job-card-side">
                <span>{job.category}</span>
                <time dateTime={job.postedAt}>Updated {formatSignalDate(job.postedAt)}</time>
                <a href={job.canonicalUrl} target="_blank" rel="noopener noreferrer">
                  View role
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
