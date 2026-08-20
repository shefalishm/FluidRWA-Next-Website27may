import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { learnArticles, getLearnTopics } from "@/lib/learn";
import { siteUrl } from "@/lib/routes";

const pageUrl = `${siteUrl}/learn`;

export const metadata: Metadata = {
  title: "FluidRWA Learn | RWA, Tokenization and Web3 Infrastructure Guides",
  description:
    "Learn how tokenization, stablecoins, smart contracts, AI infrastructure and Web3 vendor stacks work with practical FluidRWA guides.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "FluidRWA Learn",
    description: "Practical guides for RWA tokenization, stablecoins, smart contracts, AI infrastructure and vendor selection.",
    url: pageUrl,
    type: "website"
  }
};

export default function LearnPage() {
  const topics = getLearnTopics();
  const featuredArticles = topics
    .map((topic) => learnArticles.find((article) => article.topic === topic))
    .filter((article): article is (typeof learnArticles)[number] => Boolean(article));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "FluidRWA Learn",
    url: pageUrl,
    description: metadata.description,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: learnArticles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteUrl}/learn/${article.slug}`,
        name: article.title
      }))
    }
  };

  return (
    <main className="learn-page">
      <JsonLd data={jsonLd} />
      <section className="learn-hero" aria-labelledby="learn-title">
        <div className="learn-hero-grid">
          <div className="learn-hero-inner">
            <p className="learn-eyebrow">FluidRWA Learn</p>
            <h1 id="learn-title">Research the vendor stack behind real-world assets</h1>
            <p>
              Short, practical explainers that connect RWA concepts to the vendors, controls and operating workflows teams actually need before procurement.
            </p>
            <div className="learn-hero-actions">
              <a href="#tokenization">Start with tokenization</a>
              <a href="/tokenization-readiness-assessment-tool">Run readiness check</a>
            </div>
          </div>
          <div className="learn-command-center" aria-label="FluidRWA Learn coverage">
            <div className="learn-command-top">
              <span>Research map</span>
              <strong>{learnArticles.length} guides live</strong>
            </div>
            <div className="learn-stack-map" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="learn-command-grid">
              <span>Tokenization</span>
              <span>Stablecoins</span>
              <span>Smart contracts</span>
              <span>AI infrastructure</span>
            </div>
          </div>
        </div>
      </section>

      <section className="learn-featured" aria-label="Featured FluidRWA Learn articles">
        <div className="learn-featured-head">
          <p className="learn-eyebrow">Featured guides</p>
        </div>
        <div className="learn-card-track">
          {featuredArticles.map((article) => (
            <Link className={`learn-cover learn-cover-${article.accent}`} href={`/learn/${article.slug}`} key={article.slug}>
              <span>{article.topic}</span>
              <h2>{article.title}</h2>
              <div className="learn-cover-art" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="learn-paths" aria-label="FluidRWA learning paths">
        <article>
          <span>01</span>
          <h2>Understand the asset workflow</h2>
          <p>Start with tokenization and treasury guides before comparing platforms.</p>
        </article>
        <article>
          <span>02</span>
          <h2>Map the operating vendors</h2>
          <p>Connect concepts to custody, compliance, smart contract and payment providers.</p>
        </article>
        <article>
          <span>03</span>
          <h2>Move into procurement</h2>
          <p>Use FluidRWA category pages and tools to build a defensible shortlist.</p>
        </article>
      </section>

      <section className="learn-search-panel" aria-label="FluidRWA Learn topics and search">
        <div className="learn-search-box">
          <span aria-hidden="true">⌕</span>
          <input type="search" placeholder="Search guides on tokenization, stablecoins, smart contracts..." aria-label="Search FluidRWA Learn" />
        </div>
        <div className="learn-topic-row" aria-label="Learn topics">
          {topics.map((topic) => (
            <a href={`#${topic.toLowerCase().replaceAll(" ", "-")}`} key={topic}>{topic}</a>
          ))}
        </div>
      </section>

      <section className="learn-library">
        {topics.map((topic) => (
          <div className="learn-topic-section" id={topic.toLowerCase().replaceAll(" ", "-")} key={topic}>
            <div className="learn-section-head">
              <p className="learn-eyebrow">{topic}</p>
              <h2>{topic} guides</h2>
            </div>
            <div className="learn-list">
              {learnArticles.filter((article) => article.topic === topic).map((article) => (
                <Link className="learn-list-card" href={`/learn/${article.slug}`} key={article.slug}>
                  <span>{article.readTime}</span>
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
