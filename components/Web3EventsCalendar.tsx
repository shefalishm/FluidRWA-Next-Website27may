"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { calendarEvents, eventRegions, eventPeriod, organizerTrackingUrl, calendarReviewedDate, type ReviewedCalendarEvent, type EventRegion, type EventTheme, type CalendarPeriod } from "@/lib/web3Events";

const themes: Array<"All events" | EventTheme> = ["All events", "Web3 & digital assets", "Family offices & private capital", "AI & infrastructure"];

function EventCard({ event }: { event: ReviewedCalendarEvent }) {
  const [hasEventVisual, setHasEventVisual] = useState(Boolean(event.imageUrl));

  return (
    <article className="events-card" id={event.slug}>
      <div className={`events-card-media ${hasEventVisual ? "has-image" : ""}`}>
        {hasEventVisual && event.imageUrl ? <img src={event.imageUrl} alt={event.imageAlt} width={480} height={270} loading="lazy" decoding="async" onError={() => setHasEventVisual(false)} /> : null}
        <div className="events-card-media-fallback" aria-hidden={hasEventVisual}>
          <span>{event.city}</span>
          <b>{event.country}</b>
        </div>
        <span className="events-card-theme">{event.theme === "Family offices & private capital" ? "Private capital" : event.track}</span>
        <span className="events-illustration-label">Illustration</span>
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
        <h3>{event.name}</h3>
        <p className="events-focus">{event.focus}</p>
        <p className="events-description">{event.description}</p>
        <dl className="events-details">
          <div><dt>Venue</dt><dd>{event.venue}</dd></div>
          <div><dt>Access</dt><dd>{event.access}</dd></div>
        </dl>
        {event.note ? <p className="events-review-note">{event.note}</p> : null}
        <div className="events-card-footer">
          <span>{event.audience}</span>
        </div>
        {event.organizerUrl ? <a className="events-organizer-link" href={organizerTrackingUrl(event)} onClick={() => window.fluidRwaTrackEvent?.("event_organizer_click", { event_slug: event.slug, organizer_url: event.organizerUrl, link_url: event.organizerUrl })} target="_blank" rel="noopener noreferrer" aria-label={`${event.name}: organizer details (opens in new tab)`}>Organizer details <ArrowUpRight size={16} aria-hidden="true" /></a> : null}
        <small className="events-checked">{event.checkedDate === calendarReviewedDate ? "Organizer checked 7 Nov 2026" : "Archived listing; last reviewed 2 Sep 2026"}</small>
      </div>
    </article>
  );
}

export function Web3EventsCalendar() {
  const [theme, setTheme] = useState<(typeof themes)[number]>("All events");
  const [region, setRegion] = useState<(typeof eventRegions)[number]>("All locations");
  const [period, setPeriod] = useState<CalendarPeriod>("Upcoming");
  const [query, setQuery] = useState("");
  const [today, setToday] = useState(calendarReviewedDate);

  useEffect(() => {
    const now = new Date();
    const currentDay = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    setToday(currentDay);
    const revealLinkedEvent = () => {
      const event = calendarEvents.find((item) => `#${item.slug}` === window.location.hash);
      if (!event) return;
      setPeriod(eventPeriod(event, currentDay));
      setTheme("All events");
      setRegion("All locations");
      setQuery("");
      requestAnimationFrame(() => document.getElementById(event.slug)?.scrollIntoView({ block: "start" }));
    };
    revealLinkedEvent();
    window.addEventListener("hashchange", revealLinkedEvent);
    return () => window.removeEventListener("hashchange", revealLinkedEvent);
  }, []);

  const visibleEvents = useMemo(() => calendarEvents.filter((event) => (
    (theme === "All events" || event.theme === theme)
    && (region === "All locations" || event.region === region)
    && eventPeriod(event, today) === period
    && `${event.name} ${event.city} ${event.country} ${event.focus} ${event.audience}`.toLowerCase().includes(query.trim().toLowerCase())
  )), [theme, region, period, query, today]);

  const eventsByYear = [2026, 2027, 2028].map((year) => ({ year, events: visibleEvents.filter((event) => event.year === year) }));

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
                <button aria-pressed={theme === option} className={theme === option ? "is-active" : ""} key={option} onClick={() => setTheme(option)} type="button">
                  {option === "All events" ? "All" : option === "Web3 & digital assets" ? "Web3" : option === "AI & infrastructure" ? "AI" : "Private capital"}
                </button>
              ))}
            </div>
            <label className="events-filter-select">
              <span>Location</span>
              <select aria-label="Location" value={region} onChange={(event) => setRegion(event.target.value as "All locations" | EventRegion)}>
                {eventRegions.map((option) => <option key={option}>{option}</option>)}
              </select>
            </label>
            <label className="events-filter-select">
              <span>Dates</span>
              <select aria-label="Dates" value={period} onChange={(event) => setPeriod(event.target.value as CalendarPeriod)}>
                <option>Upcoming</option>
                <option>Date pending</option>
                <option>Past</option>
              </select>
            </label>
            <label className="events-filter-select"><span>Search</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Event, city or topic" /></label>
          </div>
        </div>
      </section>

      <section className="events-calendar light-container" aria-labelledby="calendar-title">
        <div className="events-section-head">
          <div>
            <p className="eyebrow light-eyebrow">Calendar</p>
            <h2 id="calendar-title">{period === "Upcoming" ? "Upcoming and ongoing events" : period === "Past" ? "Past events archive" : "Dates still to be announced"}</h2>
          </div>
          <p aria-live="polite">{visibleEvents.length} events shown. Last reviewed 7 November 2026. Dates are local calendar days; session times are not inferred. Verify dates, venue and access with the organizer before travel.</p>
        </div>
        <p className="events-coverage-note">Exact dates for January-March 2028 events are not yet confirmed. The announced March 2028 Abu Dhabi forum appears under Date pending. Pictures are original AI-generated city or topic illustrations, not event photographs.</p>

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
