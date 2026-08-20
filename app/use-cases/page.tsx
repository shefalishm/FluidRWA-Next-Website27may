import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { siteUrl } from "@/lib/routes";
import { useCases } from "@/lib/useCases";

export const metadata: Metadata = {
  title: "Web3, RWA and AI Infrastructure Use Cases | FluidRWA",
  description: "Explore real-world use cases across real estate, tokenized treasuries, trade finance, healthcare, insurance, carbon markets, payments, identity and AI.",
  alternates: { canonical: `${siteUrl}/use-cases` }
};

export default function UseCasesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteUrl}/use-cases#webpage`,
    name: "Web3, RWA and AI Infrastructure Use Cases",
    description: metadata.description,
    url: `${siteUrl}/use-cases`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: useCases.map((useCase, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: useCase.title,
        url: `${siteUrl}/use-cases/${useCase.slug}`
      }))
    }
  };

  return (
    <main className="use-case-page">
      <JsonLd data={jsonLd} />
      <section className="use-case-hero">
        <div className="light-container">
          <p className="eyebrow light-eyebrow">Use case library</p>
          <h1 className="use-case-library-title">Explore how Web3, RWA and AI infrastructure is used across industries</h1>
          <p>
            Browse practical workflows across real estate, tokenized treasuries, trade finance, healthcare, insurance,
            carbon markets, payments, identity, AI and regulated operations.
          </p>
        </div>
      </section>
      <section className="use-case-library">
        <div className="light-container">
          <div className="use-case-library-grid">
            {useCases.map((useCase) => (
              <a className="use-case-library-card" href={`/use-cases/${useCase.slug}`} key={useCase.slug}>
                <img src={useCase.image} alt={useCase.imageAlt} width={900} height={600} loading="lazy" decoding="async" />
                <div>
                  <span>{useCase.industry}</span>
                  <h2>{useCase.title}</h2>
                  <p>{useCase.summary}</p>
                  <em>Read use case</em>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
