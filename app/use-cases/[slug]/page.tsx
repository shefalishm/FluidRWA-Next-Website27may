import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { siteUrl } from "@/lib/routes";
import { getUseCase, useCases } from "@/lib/useCases";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return useCases.map((useCase) => ({ slug: useCase.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const useCase = getUseCase(slug);
  if (!useCase) return {};
  return {
    title: `${useCase.title} | FluidRWA Use Cases`,
    description: useCase.seoDescription || useCase.summary,
    alternates: { canonical: `${siteUrl}/use-cases/${useCase.slug}` },
    openGraph: {
      title: `${useCase.title} | FluidRWA Use Cases`,
      description: useCase.seoDescription || useCase.summary,
      url: `${siteUrl}/use-cases/${useCase.slug}`,
      images: [{ url: useCase.image }]
    }
  };
}

export default async function UseCaseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const useCase = getUseCase(slug);
  if (!useCase) notFound();

  const related = useCases.filter((item) => item.slug !== useCase.slug).slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: useCase.title,
        description: useCase.seoDescription || useCase.summary,
        image: useCase.image,
        url: `${siteUrl}/use-cases/${useCase.slug}`,
        about: useCase.stack,
        articleSection: useCase.industry,
        publisher: { "@id": `${siteUrl}/#organization` },
        citation: useCase.sources?.map((source) => source.href) || []
      },
      ...(useCase.faqs?.length
        ? [{
            "@type": "FAQPage",
            mainEntity: useCase.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a }
            }))
          }]
        : [])
    ]
  };

  return (
    <main className="use-case-detail-page">
      <JsonLd data={jsonLd} />
      <section className="use-case-detail-hero">
        <div className="light-container use-case-detail-grid">
          <div>
            <a className="use-case-back-link" href="/use-cases">Use cases</a>
            <p className="eyebrow light-eyebrow">{useCase.industry}</p>
            <h1>{useCase.title}</h1>
            <p>{useCase.summary}</p>
          </div>
          <img src={useCase.image} alt={useCase.imageAlt} width={900} height={600} fetchPriority="high" />
        </div>
      </section>
      <section className="use-case-detail-body">
        <div className="light-container use-case-detail-body-grid">
          <article className="use-case-narrative">
            <h2>The operational problem</h2>
            <p>{useCase.problem}</p>
            <h2>Where this applies</h2>
            <p>{useCase.example}</p>
            <h2>Infrastructure stack</h2>
            <div className="use-case-stack-list">
              {useCase.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            {useCase.sections?.map((section) => (
              <section className="use-case-rich-section" key={section.heading}>
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
                {section.bullets?.length ? (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
            {useCase.implementationSteps?.length ? (
              <section className="use-case-rich-section">
                <h2>Implementation workflow</h2>
                <ol className="use-case-step-list">
                  {useCase.implementationSteps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </section>
            ) : null}
            {useCase.buyerQuestions?.length ? (
              <section className="use-case-rich-section">
                <h2>Buyer questions to ask</h2>
                <ul>
                  {useCase.buyerQuestions.map((question) => (
                    <li key={question}>{question}</li>
                  ))}
                </ul>
              </section>
            ) : null}
            {useCase.sources?.length ? (
              <section className="use-case-rich-section use-case-source-section">
                <h2>References and further reading</h2>
                <ul>
                  {useCase.sources.map((source) => (
                    <li key={source.href}><a href={source.href} target="_blank" rel="noopener noreferrer">{source.label}</a></li>
                  ))}
                </ul>
              </section>
            ) : null}
            {useCase.faqs?.length ? (
              <section className="use-case-faq-section">
                <h2>FAQ</h2>
                {useCase.faqs.map((faq) => (
                  <details key={faq.q}>
                    <summary>{faq.q}</summary>
                    <p>{faq.a}</p>
                  </details>
                ))}
              </section>
            ) : null}
          </article>
          <aside className="use-case-category-panel">
            <h2>Relevant vendor categories</h2>
            {useCase.vendorCategories.map((category) => (
              <a href={category.href} key={category.href}>{category.label}</a>
            ))}
            <a className="use-case-submit-link" href="/submit-requirement">Submit a project brief</a>
          </aside>
        </div>
      </section>
      <section className="use-case-related">
        <div className="light-container">
          <h2>Related use cases</h2>
          <div className="use-case-related-grid">
            {related.map((item) => (
              <a href={`/use-cases/${item.slug}`} key={item.slug}>
                <img src={item.image} alt={item.imageAlt} loading="lazy" decoding="async" />
                <span>{item.industry}</span>
                <strong>{item.title}</strong>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
