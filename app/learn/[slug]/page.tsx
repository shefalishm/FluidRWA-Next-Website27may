import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { getLearnArticle, learnArticles } from "@/lib/learn";
import { siteUrl } from "@/lib/routes";

type LearnArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return learnArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: LearnArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getLearnArticle(slug);
  if (!article) return {};
  const url = `${siteUrl}/learn/${article.slug}`;
  return {
    title: `${article.title} | FluidRWA Learn`,
    description: article.description,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.description,
      url,
      type: "article"
    }
  };
}

export default async function LearnArticlePage({ params }: LearnArticlePageProps) {
  const { slug } = await params;
  const article = getLearnArticle(slug);
  if (!article) notFound();
  const pageUrl = `${siteUrl}/learn/${article.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: article.title,
        description: article.description,
        dateModified: article.updatedAt,
        datePublished: article.updatedAt,
        author: { "@type": "Organization", name: "FluidRWA" },
        publisher: { "@type": "Organization", name: "FluidRWA", url: siteUrl },
        mainEntityOfPage: pageUrl,
        articleSection: article.topic,
        about: [article.topic, "Real-world assets", "Web3 infrastructure", "Vendor selection"]
      },
      {
        "@type": "FAQPage",
        mainEntity: article.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer
          }
        }))
      }
    ]
  };

  return (
    <main className="learn-article-page">
      <JsonLd data={jsonLd} />
      <div className="learn-article-layout">
        <aside className="learn-toc" aria-label="In this article">
          <p>In this article</p>
          <nav>
            {article.sections.map((section) => (
              <a href={`#${section.id}`} key={section.id}>{section.title}</a>
            ))}
            {article.comparisonRows ? <a href="#vendor-comparison">Vendor comparison</a> : null}
            <a href="#faqs">FAQs</a>
            <a href="#references">References</a>
          </nav>
        </aside>

        <article className="learn-article">
          <Link className="learn-back" href="/learn">← Back to Learn</Link>
          <p className="learn-eyebrow">FluidRWA Learn</p>
          <h1>{article.title}</h1>
          <div className="learn-article-meta">
            <span>Last updated: {new Date(article.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
            <span>{article.readTime}</span>
          </div>
          <div className={`learn-article-visual learn-cover-${article.accent}`} aria-hidden="true">
            <span>{article.topic}</span>
            <div className="learn-cover-art">
              <i />
              <i />
              <i />
            </div>
          </div>
          {article.sections.map((section) => (
            <section id={section.id} key={section.id}>
              <h2>{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
          {article.comparisonRows ? (
            <section className="learn-comparison-block" id="vendor-comparison">
              <h2>Vendor comparison matrix</h2>
              <p>This matrix is designed for shortlist planning. It compares common fit patterns, not absolute rankings.</p>
              <div className="learn-comparison-table-wrap">
                <table className="learn-comparison-table">
                  <thead>
                    <tr>
                      <th>Vendor</th>
                      <th>Good fit</th>
                      <th>Strongest for</th>
                      <th>Watch for</th>
                    </tr>
                  </thead>
                  <tbody>
                    {article.comparisonRows.map((row) => (
                      <tr key={row.vendor}>
                        <th scope="row">{row.vendor}</th>
                        <td>{row.goodFit}</td>
                        <td>{row.strongestFor}</td>
                        <td>{row.watchFor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ) : null}
          <section className="learn-faq-block" id="faqs">
            <h2>FAQs</h2>
            {article.faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </section>
          <section className="learn-reference-block" id="references">
            <h2>References</h2>
            <ul>
              {article.references.map((reference) => (
                <li key={reference.href}>
                  <a href={reference.href} target="_blank" rel="noreferrer">{reference.label}</a>
                </li>
              ))}
            </ul>
          </section>
          <div className="learn-next-step">
            <div>
              <p className="learn-eyebrow">Next step</p>
              <h2>Turn the concept into a vendor shortlist</h2>
              <p>Use FluidRWA to compare relevant provider categories and move from research to procurement.</p>
            </div>
            <Link href={article.relatedHref}>{article.relatedLabel}</Link>
          </div>
        </article>
      </div>
    </main>
  );
}
