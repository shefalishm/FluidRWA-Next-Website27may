import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { siteUrl } from "@/lib/routes";
import { web3Events, web3EventTracks } from "@/lib/web3Events";

const pageUrl = `${siteUrl}/web3-events`;
const confirmedEvents = web3Events.filter((event) => event.status === "Confirmed dates");

export const metadata: Metadata = {
  title: "Web3 Events Calendar 2026-2027 | FluidRWA",
  description:
    "A curated calendar of announced Web3, blockchain, tokenization, digital-asset, Ethereum and policy events from September 2026 through June 2027.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Web3 Events Calendar: 2026-2027",
    description: "Plan your Web3, tokenization and digital-asset conference calendar with confirmed organizer-announced events.",
    url: pageUrl,
    type: "website"
  }
};

function EventCard({ event }: { event: (typeof web3Events)[number] }) {
  return (
    <article className="events-card" id={event.slug} itemScope itemType="https://schema.org/Event">
      <div className="events-card-topline">
        <span className={`events-track events-track--${event.track.toLowerCase()}`}>{event.track}</span>
        <span className={`events-status ${event.status === "Confirmed dates" ? "is-confirmed" : "is-month"}`}>{event.status}</span>
      </div>
      <div className="events-date" aria-label={`Date: ${event.dateLabel}`}>
        <strong>{event.dateLabel}</strong>
        <span>{event.city}, {event.country}</span>
      </div>
      <h3 itemProp="name">{event.name}</h3>
      <p className="events-focus">{event.focus}</p>
      <p className="events-description">{event.description}</p>
      <div className="events-card-footer">
        <span>{event.audience}</span>
        {event.startDate ? <meta itemProp="startDate" content={event.startDate} /> : null}
        <meta itemProp="eventStatus" content="https://schema.org/EventScheduled" />
        <meta itemProp="location" content={`${event.city}, ${event.country}`} />
        <span className="events-card-marker" aria-hidden="true" />
      </div>
    </article>
  );
}

export default function Web3EventsPage() {
  const eventsByYear = [2026, 2027].map((year) => ({ year, events: web3Events.filter((event) => event.year === year) }));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Web3 Events Calendar 2026-2027",
    url: pageUrl,
    description: metadata.description,
    dateModified: "2026-09-02",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: web3Events.map((event, index) => ({
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
              A curated calendar of announced Web3, tokenization, digital-asset, Ethereum and policy gatherings from September 2026 through June 2027.
            </p>
          </div>
          <aside className="events-hero-panel" aria-label="Calendar coverage">
            <span>Coverage window</span>
            <strong>Sep 2026 - Jun 2027</strong>
            <div>
              <b>{web3Events.length}</b><span>organizer-announced events</span>
            </div>
            <div>
              <b>{confirmedEvents.length}</b><span>with confirmed dates</span>
            </div>
          </aside>
        </div>
      </section>

      <section className="events-planning-strip" aria-label="How to use this calendar">
        <div className="light-container events-planning-inner">
          <p>Choose events by the conversations you need: product and protocol building, institutional adoption, policy or ecosystem partnerships.</p>
          <div className="events-track-row" aria-label="Event tracks">
            {web3EventTracks.map((track) => <span key={track}>{track}</span>)}
          </div>
        </div>
      </section>

      <section className="events-calendar light-container" aria-labelledby="calendar-title">
        <div className="events-section-head">
          <div>
            <p className="eyebrow light-eyebrow">Calendar</p>
            <h2 id="calendar-title">Announced dates and planning windows</h2>
          </div>
          <p>Last reviewed 2 September 2026. Dates, venues and access can change; verify with the organizer before booking travel.</p>
        </div>

        {eventsByYear.map(({ year, events }) => (
          <section className="events-year" key={year} aria-labelledby={`events-${year}`}>
            <div className="events-year-label"><span>{year}</span><i /></div>
            <div className="events-card-grid">
              {events.map((event) => <EventCard event={event} key={event.slug} />)}
            </div>
          </section>
        ))}
      </section>

      <section className="events-note-section">
        <div className="light-container events-note-grid">
          <div>
            <p className="eyebrow light-eyebrow">Calendar standard</p>
            <h2>Useful signal, not an event dump</h2>
          </div>
          <p>
            This page prioritizes material conferences, builder gatherings and policy forums with an organizer-announced 2026 or first-half 2027 edition. It intentionally excludes most individual side events and unconfirmed conference rumours.
          </p>
        </div>
      </section>
    </main>
  );
}
