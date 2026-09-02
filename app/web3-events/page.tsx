import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { Web3EventsCalendar } from "@/components/Web3EventsCalendar";
import { siteUrl } from "@/lib/routes";
import { calendarEvents, familyOfficeEvents } from "@/lib/web3Events";

const pageUrl = `${siteUrl}/web3-events`;
const confirmedEvents = calendarEvents.filter((event) => event.status === "Confirmed dates");

export const metadata: Metadata = {
  title: "Web3 Events Calendar 2026-2027 | FluidRWA",
  description:
    "A curated calendar of announced Web3, blockchain, tokenization, digital-asset, policy, family-office and private-capital events from September 2026 through June 2027.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Web3 Events Calendar: 2026-2027",
    description: "Plan your Web3, tokenization, private-capital and digital-asset conference calendar with organizer-announced events.",
    url: pageUrl,
    type: "website"
  }
};

export default function Web3EventsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Web3 Events Calendar 2026-2027",
    url: pageUrl,
    description: metadata.description,
    dateModified: "2026-09-02",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: calendarEvents.map((event, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: event.name,
        url: `${pageUrl}#${event.slug}`
      }))
    }
  };

  return (
    <main className="events-page">
      <JsonLd data={jsonLd} />
      <section className="events-hero">
        <div className="light-container events-hero-grid">
          <div>
            <p className="eyebrow light-eyebrow">FluidRWA field calendar</p>
            <h1>Web3 events worth planning around</h1>
            <p>
              A curated calendar of announced Web3, tokenization, digital-asset, policy and private-capital gatherings from September 2026 through June 2027.
            </p>
          </div>
          <aside className="events-hero-panel" aria-label="Calendar coverage">
            <span>Coverage window</span>
            <strong>Sep 2026 - Jun 2027</strong>
            <div>
              <b>{calendarEvents.length}</b><span>organizer-announced events</span>
            </div>
            <div>
              <b>{confirmedEvents.length}</b><span>with confirmed dates</span>
            </div>
          </aside>
        </div>
      </section>

      <section className="events-planning-strip" aria-label="Calendar coverage">
        <div className="light-container events-planning-inner">
          <p>Built for teams navigating product, policy, institutional adoption and private capital. Family-office events are included where they are useful for tokenization and digital-asset market access.</p>
          <div className="events-track-row" aria-label="Event tracks">
            <span>Web3 and digital assets</span>
            <span>{familyOfficeEvents.length} family-office events</span>
            <span>Global planning</span>
          </div>
        </div>
      </section>

      <section className="events-private-capital" aria-labelledby="private-capital-title">
        <div className="light-container">
          <div className="events-private-capital-head">
            <div>
              <p className="eyebrow light-eyebrow">Family offices and private capital</p>
              <h2 id="private-capital-title">The rooms where long-term capital compares notes</h2>
            </div>
            <p>
              For RWA and tokenization teams, these events can be more relevant than the largest general crypto conferences: they concentrate allocators, private-market investors and family office decision-makers.
            </p>
          </div>
          <div className="events-private-capital-grid">
            {familyOfficeEvents.slice(0, 4).map((event) => (
              <article key={event.slug}>
                <span>{event.dateLabel}</span>
                <h3>{event.name}</h3>
                <p>{event.city}, {event.country}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Web3EventsCalendar />

      <section className="events-note-section">
        <div className="light-container events-note-grid">
          <div>
            <p className="eyebrow light-eyebrow">Calendar standard</p>
            <h2>Useful signal, not an event dump</h2>
          </div>
          <p>
            This page prioritizes material Web3 conferences, builder gatherings, policy forums and private-capital meetings with an organizer-announced 2026 or first-half 2027 edition. It intentionally excludes most individual side events and unconfirmed conference rumours.
          </p>
        </div>
      </section>
    </main>
  );
}
