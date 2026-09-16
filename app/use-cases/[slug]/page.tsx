import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Plus } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { siteUrl } from "@/lib/routes";
import { getUseCase, useCases } from "@/lib/useCases";

type PageProps = { params: Promise<{ slug: string }> };
const reviewedDate = "2026-09-16";

export function generateStaticParams() { return useCases.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const item = getUseCase((await params).slug);
  if (!item) return {};
  const title = `${item.guide.title} | FluidRWA`;
  const description = `Explore ${item.guide.title.toLowerCase()}: operating workflows, implementation steps, risks, controls and vendor-selection questions.`;
  return { title, description, alternates: { canonical: `${siteUrl}/use-cases/${item.slug}` }, openGraph: { title, description, type: "article", modifiedTime: reviewedDate, url: `${siteUrl}/use-cases/${item.slug}`, images: [{ url: item.image, alt: item.imageAlt }] } };
}

export default async function UseCaseDetailPage({ params }: PageProps) {
  const item = getUseCase((await params).slug);
  if (!item) notFound();
  const guide = item.guide;
  // Shared categories matter more than array order when recommending a next read.
  const related = useCases.filter((candidate) => candidate.slug !== item.slug).map((candidate) => ({ candidate, score: candidate.vendorCategories.filter((category) => item.vendorCategories.some((other) => other.href === category.href)).length * 2 + Number(candidate.guide.group === guide.group) })).sort((a, b) => b.score - a.score).slice(0, 3).map(({ candidate }) => candidate);
  const sources = [guide.reference, ...(item.sources || []).filter((source) => source.href !== guide.reference.href)];
  const jsonLd = { "@context": "https://schema.org", "@graph": [
    { "@type": "Article", headline: guide.title, description: guide.answer, image: item.image, url: `${siteUrl}/use-cases/${item.slug}`, dateModified: reviewedDate, author: { "@type": "Organization", name: "FluidRWA Research Team", url: `${siteUrl}/about` }, reviewedBy: { "@type": "Organization", name: "FluidRWA Research Team", url: `${siteUrl}/about` }, publisher: { "@id": `${siteUrl}/#organization` }, articleSection: item.industry, citation: sources.map((source) => source.href) },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Use cases", item: `${siteUrl}/use-cases` }, { "@type": "ListItem", position: 2, name: guide.title, item: `${siteUrl}/use-cases/${item.slug}` }] },
    { "@type": "FAQPage", mainEntity: guide.faqs.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })) }
  ] };
  return <main className="uc-page uc-detail"><JsonLd data={jsonLd} />
    <section className="uc-detail-hero"><div className="uc-container"><a className="uc-back" href="/use-cases"><ArrowLeft size={15} /> Use cases</a><p className="uc-kicker">{item.industry}</p><h1>{guide.title}</h1><p className="uc-lead">{item.summary}</p><div className="uc-hero-meta"><span>For {guide.audience.toLowerCase()}</span><span>Reviewed by <a href="/about">FluidRWA Research Team</a></span></div><div className="uc-actions"><a className="uc-button" href="#workflow">Explore the workflow <ArrowRight size={18} /></a><a className="uc-text-link" href="/submit-requirement">Discuss your project <ArrowRight size={17} /></a></div></div></section>
    <div className="uc-image-band"><div className="uc-container"><img src={item.image} alt={item.imageAlt} width={900} height={600} fetchPriority="high" /></div></div>
    <div className="uc-container uc-reading-layout"><aside className="uc-toc"><p className="uc-kicker">In this guide</p><nav aria-label="Guide sections"><a href="#overview">Overview</a><a href="#workflow">Workflow</a><a href="#infrastructure">Infrastructure</a><a href="#risk">Risks and controls</a><a href="#implementation">Implementation</a><a href="#vendors">Vendor selection</a><a href="#questions">Common questions</a><a href="#sources">Sources</a></nav></aside>
      <article className="uc-article">
        <section id="overview"><p className="uc-kicker">The short answer</p><h2>What does this use case involve?</h2><p className="uc-answer">{guide.answer}</p><h3>Where the current process breaks down</h3><p>{item.problem} {item.example}</p></section>
        <section id="workflow"><p className="uc-kicker">From input to outcome</p><h2>How does the workflow operate?</h2><p>The following is an illustrative operating model, not a claim about a specific deployment. Ownership, approvals and exception handling should be agreed before implementation.</p><ol className="uc-workflow">{guide.workflow.map((step, index) => <li key={step.title}><span className="uc-step-number">{String(index + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.detail}</p></div></li>)}</ol></section>
        <section id="infrastructure"><p className="uc-kicker">Build the operating stack</p><h2>Which infrastructure is needed?</h2><p>These capabilities may sit inside an existing system, a specialist service or an integrated platform. Map each one to a responsible owner; do not assume a single vendor covers every function.</p><ul className="uc-capabilities">{item.stack.map((capability) => <li key={capability}><Check size={17} aria-hidden="true" />{capability}</li>)}</ul><div className="uc-reference"><p className="uc-kicker">Evidence and context</p><a href={guide.reference.href} target="_blank" rel="noopener noreferrer">{guide.reference.label}<ArrowUpRight size={17} /></a><p>{guide.reference.note}</p></div></section>
        <section id="risk"><p className="uc-kicker">Design for the exceptions</p><h2>What can go wrong?</h2><div className="uc-control-list">{guide.controls.map((entry) => <div key={entry.risk}><h3>{entry.risk}</h3><p>{entry.control}</p></div>)}</div><div className="uc-not-fit"><h3>When this is not the right fit</h3><p>{guide.notFit}</p></div></section>
        <section id="implementation"><p className="uc-kicker">A bounded first deployment</p><h2>How should a team start?</h2><p>Start with one workflow and named operational owners. A pilot should show that the process works through exceptions, not just that a transaction can succeed once.</p><ol className="uc-pilot">{guide.pilot.map((step) => <li key={step}>{step}</li>)}</ol><h3>What should the pilot measure?</h3><ul>{guide.measures.map((measure) => <li key={measure}>{measure}</li>)}</ul><p>Set a baseline and acceptance thresholds before choosing technology. Include support effort and failed cases in the comparison, and validate the result with the teams that will operate it.</p></section>
        <section id="vendors"><p className="uc-kicker">Procurement questions</p><h2>What should you ask vendors?</h2><ul className="uc-buyer-questions">{guide.questions.map((question) => <li key={question}>{question}</li>)}</ul><p>Request evidence from comparable workflows, a clear responsibility matrix, integration documentation and an export or exit plan. Confirm current capabilities directly rather than relying on a category listing.</p><h3>Relevant vendor directories</h3><div className="uc-directory-links">{item.vendorCategories.map((category) => <a key={category.href} href={category.href}>{category.label}<ArrowRight size={17} /></a>)}</div></section>
        <section id="questions"><h2>Common questions</h2><div className="uc-faq">{guide.faqs.map((faq) => <details key={faq.q}><summary>{faq.q}<Plus size={18} aria-hidden="true" /></summary><p>{faq.a}</p></details>)}</div></section>
        <section id="sources" className="uc-sources"><h2>Sources and further reading</h2><ul>{sources.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noopener noreferrer">{source.label}<ArrowUpRight size={15} /></a></li>)}</ul><p>Independent implementation guidance, not legal, investment or regulatory advice. Requirements depend on your product, jurisdiction and operating model.</p><p className="uc-updated">Last updated <time dateTime={reviewedDate}>September 16, 2026</time></p></section>
      </article>
    </div>
    <section className="uc-hub-cta"><div className="uc-container"><div><p className="uc-kicker">Your next step</p><h2>Turn the use case into a plan.</h2><p>Define your needs before you shortlist providers.</p></div><div className="uc-actions"><a className="uc-button" href="/tokenization-readiness-assessment-tool">Assess your project <ArrowRight size={18} /></a><a className="uc-text-link" href="/submit-requirement">Submit a brief <ArrowRight size={17} /></a></div></div></section>
    <section className="uc-related"><div className="uc-container"><p className="uc-kicker">Continue your research</p><h2>Related use cases</h2><div className="uc-related-grid">{related.map((next) => <a key={next.slug} href={`/use-cases/${next.slug}`}><p className="uc-kicker">{next.industry}</p><h3>{next.guide.title}</h3><ArrowRight size={19} aria-hidden="true" /></a>)}</div></div></section>
  </main>;
}
