import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { formatSignalDate, getNewsItems } from "@/lib/marketSignals";
import { siteUrl } from "@/lib/routes";

export const revalidate = 900;

export const metadata: Metadata = {
  title: "RWA, Web3 and AI Infrastructure News | FluidRWA",
  description:
    "Curated RWA, Web3 and AI infrastructure news from trusted sources, organized for tokenization, compliance, custody, stablecoin and institutional digital asset teams.",
  alternates: {
    canonical: `${siteUrl}/news`
  },
  openGraph: {
    title: "RWA, Web3 and AI Infrastructure News | FluidRWA",
    description:
      "Daily market signals for tokenization, compliance, custody, stablecoins, blockchain ecosystems and AI infrastructure.",
    url: `${siteUrl}/news`,
    type: "website"
  }
};

export default async function NewsPage() {
  const items = await getNewsItems();
  const announcementItems = items.filter((item) => item.sourceName === "FluidRWA" && item.canonicalUrl.includes("/news/"));
  const announcementUrls = new Set(announcementItems.map((item) => item.canonicalUrl));
  const feedItems = announcementItems.length ? items.filter((item) => !announcementUrls.has(item.canonicalUrl)) : items;
  const categories = Array.from(new Set(feedItems.map((item) => item.category))).slice(0, 10);
  const structuredItems = announcementItems.length ? [...announcementItems, ...feedItems] : feedItems;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "RWA, Web3 and AI Infrastructure News",
    url: `${siteUrl}/news`,
    description:
      "Curated market-signal feed for RWA tokenization, Web3 infrastructure, stablecoins, custody, compliance, blockchain ecosystems and AI infrastructure.",
    isPartOf: {
      "@type": "WebSite",
      name: "FluidRWA",
      url: siteUrl
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: structuredItems.slice(0, 20).map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: item.canonicalUrl,
        name: item.title
      }))
    }
  };

  return (
    <main className="signal-page">
      <JsonLd data={jsonLd} />
      <section className="signal-hero">
        <div className="light-container signal-hero-grid signal-hero-single">
          <div>
            <p className="eyebrow light-eyebrow">FluidRWA market signals</p>
            <h1>RWA, Web3 and AI infrastructure news</h1>
            <p>
              Curated headlines from trusted publishers, organized for teams tracking tokenization, custody, compliance,
              stablecoins, blockchain ecosystems, DeFi and AI infrastructure.
            </p>
            <div className="signal-actions">
              <Link className="btn btn-primary" href="/web3vendorecosystem">
                Explore Vendors
              </Link>
              <Link className="btn btn-secondary" href="/jobs">
                View Jobs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {announcementItems.length ? (
        <section className="light-container signal-pinned-section" aria-labelledby="announcements-title">
          <div className="signal-section-head">
            <div>
              <p className="eyebrow light-eyebrow">FluidRWA announcements</p>
              <h2 id="announcements-title">Announcements</h2>
            </div>
          </div>
          <div className="signal-announcement-grid">
            {announcementItems.map((item, index) => {
              const relativeUrl = item.canonicalUrl.replace(siteUrl, "");
              const isSureStack = relativeUrl.includes("surestack");
              const secondaryHref = isSureStack ? "/vendors/security-audit-companies" : "/fluidrwa/minddeft-technologies";
              const secondaryText = isSureStack ? "Explore security vendors" : "View Minddeft profile";

              return (
                <article className="signal-pinned-card signal-announcement-card" key={item.canonicalUrl}>
                  <a className="signal-pinned-image" href={relativeUrl} aria-label={item.title}>
                    <img
                      src={item.imageUrl || "/assets/news/fluidrwa-minddeft-partnership-cover.jpg"}
                      alt={`${item.title} cover image`}
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  </a>
                  <div className="signal-pinned-content">
                    <div className="signal-card-meta">
                      <span>Partnership announcement</span>
                      <time dateTime={item.publishedAt}>{formatSignalDate(item.publishedAt)}</time>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.summary}</p>
                    <div className="signal-pinned-actions">
                      <Link className="btn btn-primary" href={relativeUrl}>
                        Read announcement
                      </Link>
                      <Link className="btn btn-secondary" href={secondaryHref}>
                        {secondaryText}
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className="light-container signal-section">
        <div className="signal-section-head">
          <div>
            <p className="eyebrow light-eyebrow">Live feed</p>
            <h2>Curated infrastructure signals</h2>
          </div>
          <div className="signal-chip-row" aria-label="News categories">
            {categories.map((category) => (
              <span key={category}>{category}</span>
            ))}
          </div>
        </div>

        <div className="signal-grid">
          {feedItems.map((item) => (
            <article className="signal-card" key={`${item.sourceName}-${item.canonicalUrl}`}>
              {item.imageUrl ? (
                <a className="signal-card-image" href={item.canonicalUrl} target="_blank" rel="noopener noreferrer">
                  <img src={item.imageUrl} alt="" loading="lazy" decoding="async" />
                </a>
              ) : null}
              <div className="signal-card-content">
                <div className="signal-card-meta">
                  <span>{item.category}</span>
                  <time dateTime={item.publishedAt}>{formatSignalDate(item.publishedAt)}</time>
                </div>
                <h3>
                  <a href={item.canonicalUrl} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                </h3>
                <p>{item.summary}</p>
                <div className="signal-card-footer">
                  <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">
                    {item.sourceName}
                  </a>
                  <a href={item.canonicalUrl} target="_blank" rel="noopener noreferrer">
                    Read original
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
