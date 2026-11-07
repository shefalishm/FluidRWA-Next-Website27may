import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { Web3EventsCalendar } from "@/components/Web3EventsCalendar";
import { siteUrl } from "@/lib/routes";
import { calendarEvents, familyOfficeEvents, eventPeriod, calendarReviewedDate } from "@/lib/web3Events";

const pageUrl = `${siteUrl}/web3-events`;
const confirmedEvents = calendarEvents.filter((event) => eventPeriod(event) === "Upcoming");

export const metadata: Metadata = {
  title: "Web3, RWA & AI Events Calendar 2026-2028 | FluidRWA",
  description:
    "Organizer-verified Web3, RWA, blockchain, AI and private-capital events. Upcoming dates through December 2027, early-2028 announcements and a past-event archive. Reviewed November 7, 2026.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Web3, RWA & AI Events Calendar: 2026-2028",
    description: "Plan your Web3, tokenization, private-capital and digital-asset conference calendar with organizer-announced events.",
    url: pageUrl,
    type: "website"
  }
};

export default function Web3EventsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Web3, RWA & AI Events Calendar 2026-2028",
    url: pageUrl,
    description: metadata.description,
    dateModified: calendarReviewedDate,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: calendarEvents.map((event, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: event.name,
        url: event.organizerUrl || `${pageUrl}#${event.slug}`
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
              Organizer-announced Web3, RWA, digital-asset, AI and private-capital gatherings. Research through March 2028, with confirmed dates kept separate from pending announcements.
            </p>
          </div>
          <aside className="events-hero-panel" aria-label="Calendar coverage">
            <span>Coverage window</span>
            <strong>Nov 2026 - Mar 2028</strong>
            <div>
              <b>{calendarEvents.filter((event) => event.checkedDate === calendarReviewedDate).length}</b><span>listings checked this review</span>
            </div>
            <div>
              <b>{confirmedEvents.length}</b><span>upcoming or ongoing at review</span>
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
            {familyOfficeEvents.filter((event) => eventPeriod(event) === "Upcoming").slice(0, 4).map((event) => (
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

    </main>
  );
}
