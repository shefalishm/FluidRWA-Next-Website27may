"use client";

import { useMemo, useState } from "react";
import { calendarEvents, eventRegions, type CalendarEvent, type EventRegion, type EventTheme } from "@/lib/web3Events";

const themes: Array<"All events" | EventTheme> = ["All events", "Web3 & digital assets", "Family offices & private capital"];

function EventCard({ event }: { event: CalendarEvent }) {
  const [hasEventVisual, setHasEventVisual] = useState(Boolean(event.imageUrl));

  return (
    <article className="events-card" id={event.slug} itemScope itemType="https://schema.org/Event">
      <div className={`events-card-media ${hasEventVisual ? "has-image" : ""}`}>
        {hasEventVisual && event.imageUrl ? <img src={event.imageUrl} alt={`${event.name} official event visual`} loading="lazy" onError={() => setHasEventVisual(false)} /> : null}
        <div className="events-card-media-fallback" aria-hidden={hasEventVisual}>
          <span>{event.city}</span>
          <b>{event.country}</b>
        </div>
        <span className="events-card-theme">{event.theme === "Family offices & private capital" ? "Private capital" : event.track}</span>
      </div>
      <div className="events-card-body">
        <div className="events-card-topline">
          <span className={`events-track events-track--${event.track.toLowerCase()}`}>{event.region}</span>
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
      </div>
    </article>
  );
}

export function Web3EventsCalendar() {
  const [theme, setTheme] = useState<(typeof themes)[number]>("All events");
  const [region, setRegion] = useState<(typeof eventRegions)[number]>("All locations");
  const [dateStatus, setDateStatus] = useState<"All dates" | CalendarEvent["status"]>("All dates");

  const visibleEvents = useMemo(() => calendarEvents.filter((event) => (
    (theme === "All events" || event.theme === theme)
    && (region === "All locations" || event.region === region)
    && (dateStatus === "All dates" || event.status === dateStatus)
  )), [theme, region, dateStatus]);

  const eventsByYear = [2026, 2027].map((year) => ({ year, events: visibleEvents.filter((event) => event.year === year) }));

  return (
    <>
      <section className="events-filter-section" aria-labelledby="events-filter-title">
        <div className="light-container events-filter-inner">
          <div>
            <p className="eyebrow light-eyebrow">Find the right rooms</p>
            <h2 id="events-filter-title">Filter by who you need to meet</h2>
          </div>
          <div className="events-filter-controls">
            <div className="events-theme-control" aria-label="Event theme">
              {themes.map((option) => (
                <button className={theme === option ? "is-active" : ""} key={option} onClick={() => setTheme(option)} type="button">
                  {option === "All events" ? "All" : option === "Web3 & digital assets" ? "Web3" : "Family offices"}
                </button>
              ))}
            </div>
            <label className="events-filter-select">
              <span>Location</span>
              <select value={region} onChange={(event) => setRegion(event.target.value as "All locations" | EventRegion)}>
                {eventRegions.map((option) => <option key={option}>{option}</option>)}
              </select>
            </label>
            <label className="events-filter-select">
              <span>Date status</span>
              <select value={dateStatus} onChange={(event) => setDateStatus(event.target.value as "All dates" | CalendarEvent["status"])}>
                <option>All dates</option>
                <option>Confirmed dates</option>
                <option>Month announced</option>
              </select>
            </label>
          </div>
        </div>
      </section>

      <section className="events-calendar light-container" aria-labelledby="calendar-title">
        <div className="events-section-head">
          <div>
            <p className="eyebrow light-eyebrow">Calendar</p>
            <h2 id="calendar-title">Announced dates and planning windows</h2>
          </div>
          <p>{visibleEvents.length} relevant events shown. Last reviewed 2 September 2026. Dates, venues and access can change; verify with the organizer before booking travel.</p>
        </div>

        {eventsByYear.map(({ year, events }) => events.length > 0 ? (
          <section className="events-year" key={year} aria-labelledby={`events-${year}`}>
            <div className="events-year-label"><span id={`events-${year}`}>{year}</span><i /></div>
            <div className="events-card-grid">
              {events.map((event) => <EventCard event={event} key={event.slug} />)}
            </div>
          </section>
        ) : null)}

        {visibleEvents.length === 0 ? <p className="events-empty">No events match this combination yet. Try a different location, theme or date status.</p> : null}
      </section>
    </>
  );
}
