import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { UseCaseLibrary } from "@/components/UseCaseLibrary";
import { siteUrl } from "@/lib/routes";
import { useCases } from "@/lib/useCases";

export const metadata: Metadata = { title: "Web3, Digital Asset and AI Use Cases | FluidRWA", description: "Explore practical infrastructure guides for digital assets, payments, identity and AI. Compare workflows, implementation risks and vendor requirements.", alternates: { canonical: `${siteUrl}/use-cases` } };

export default function UseCasesPage() {
  const jsonLd = { "@context": "https://schema.org", "@type": "CollectionPage", name: "Infrastructure use cases", url: `${siteUrl}/use-cases`, description: metadata.description, mainEntity: { "@type": "ItemList", itemListElement: useCases.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.guide.title, url: `${siteUrl}/use-cases/${item.slug}` })) } };
  return <main className="uc-page"><JsonLd data={jsonLd} />
    <section className="uc-hub-hero"><div className="uc-container"><p className="uc-kicker">FluidRWA / Use cases</p><h1>Infrastructure use cases</h1><p className="uc-lead">Understand the workflow. Assess the risks. Find the right infrastructure.</p><p className="uc-hub-intro">Practical guides to digital assets, payments, identity and enterprise AI, built around the decisions your team needs to make.</p><div className="uc-actions"><a className="uc-button" href="#library">Explore use cases <ArrowRight size={18} /></a><a className="uc-text-link" href="/tokenization-readiness-assessment-tool">Assess your project <ArrowRight size={17} /></a></div></div></section>
    <UseCaseLibrary items={useCases.map((item) => ({ slug: item.slug, title: item.guide.title, group: item.guide.group, industry: item.industry, image: item.image, imageAlt: item.imageAlt, summary: item.summary, stack: item.stack }))} />
    <section className="uc-hub-cta"><div className="uc-container"><div><p className="uc-kicker">From research to a project brief</p><h2>Define your next move.</h2><p>Share your requirements and the stage you are at.</p></div><a className="uc-button" href="/submit-requirement">Submit a brief <ArrowRight size={18} /></a></div></section>
    <div className="uc-container uc-library-date"><p className="uc-updated">Last updated <time dateTime="2026-09-26">September 26, 2026</time></p></div>
  </main>;
}
