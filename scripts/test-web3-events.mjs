import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const compile = file => ts.transpileModule(fs.readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const review = { exports: {} };
vm.runInNewContext(compile("lib/web3EventReview.ts"), review);
const calendar = { exports: {}, URL, require(name) { assert.equal(name, "./web3EventReview"); return review.exports; } };
vm.runInNewContext(compile("lib/web3Events.ts"), calendar);
const { calendarEvents: events, eventPeriod, organizerTrackingUrl } = calendar.exports;
assert.equal(new Set(events.map(e => e.slug)).size, events.length);
for (const event of events) {
  assert.ok(fs.existsSync(`public${event.imageUrl}`), event.slug);
  assert.ok(fs.statSync(`public${event.imageUrl}`).size < 80000);
  assert.match(event.imageAlt, /Illustration/);
  if (event.startDate) {
    assert.match(event.startDate, /^\d{4}-\d{2}-\d{2}$/);
    assert.equal(new Date(event.startDate).toISOString().slice(0, 10), event.startDate);
    assert.ok(event.endDate >= event.startDate);
    assert.equal(Number(event.startDate.slice(0, 4)), event.year);
  } else assert.notEqual(event.status, "Confirmed dates");
  if (eventPeriod(event) !== "Past") {
    assert.equal(event.checkedDate, "2026-11-07", `${event.slug}: future listings require review`);
    assert.ok(event.organizerUrl.startsWith("https://"));
    assert.ok(event.venue && event.access);
    assert.equal(new URL(organizerTrackingUrl(event)).searchParams.get("utm_source"), "fluidrwa");
  }
}
const bySlug = slug => events.find(e => e.slug === slug);
const organizerEvents = events.filter(event => event.organizerUrl);
for (const event of organizerEvents) {
  const clean = new URL(event.organizerUrl);
  const tagged = new URL(organizerTrackingUrl(event));
  assert.equal(tagged.searchParams.get("utm_source"), "fluidrwa");
  assert.equal(tagged.searchParams.get("utm_medium"), "referral");
  assert.equal(tagged.searchParams.get("utm_campaign"), "events_calendar");
  assert.equal(tagged.origin + tagged.pathname + tagged.hash, clean.origin + clean.pathname + clean.hash);
  for (const [key, value] of clean.searchParams) {
    if (!["utm_source", "utm_medium", "utm_campaign"].includes(key)) assert.ok(tagged.searchParams.getAll(key).includes(value));
  }
  assert.equal(organizerTrackingUrl({ ...event, organizerUrl: tagged.href }), tagged.href);
  assert.ok(!clean.searchParams.has("utm_source"), "Canonical organizer URLs must stay clean");
}
const queryFixture = { organizerUrl: "https://example.com/tickets?pass=investor&utm_content=agenda#register" };
assert.equal(new URL(organizerTrackingUrl(queryFixture)).hash, "#register");
assert.equal(new URL(organizerTrackingUrl(queryFixture)).searchParams.get("pass"), "investor");
assert.equal(new URL(organizerTrackingUrl(queryFixture)).searchParams.get("utm_content"), "agenda");
console.log(`Audited ${organizerEvents.length} organizer destinations across all date states.`);
assert.equal(bySlug("ethglobal-mumbai-2026").startDate, "2026-11-05");
assert.equal(eventPeriod(bySlug("ethglobal-mumbai-2026")), "Upcoming");
assert.equal(eventPeriod(bySlug("ethglobal-mumbai-2026"), "2026-11-08"), "Past");
assert.equal(bySlug("family-office-forum-dubai-2027").startDate, "2027-03-16");
assert.equal(bySlug("family-office-forum-riyadh-2026").year, 2027);
assert.equal(eventPeriod(bySlug("cosmoverse-hong-kong-2026")), "Past");
for (const slug of ["nzcryptocon-2027", "global-blockchain-crypto-symposium-2027", "incrypted-conference-2027", "digital-family-office-forum-2027", "mea-finance-forum-2028"]) {
  assert.equal(eventPeriod(bySlug(slug)), "Date pending");
  assert.equal(bySlug(slug).startDate, undefined);
}
const component = fs.readFileSync("components/Web3EventsCalendar.tsx", "utf8");
assert.ok(!/itemScope|itemProp|schema.org\/Event/.test(component), "Collection cards must not emit Event microdata");
assert.ok(component.includes('href={organizerTrackingUrl(event)}'));
assert.ok(component.includes('organizer_url: event.organizerUrl'));
assert.ok(component.includes('useState<CalendarPeriod>("Upcoming")'));
const page = fs.readFileSync("app/web3-events/page.tsx", "utf8");
assert.ok(!page.includes("events-hero-panel"), "Internal coverage panel must not be published");
assert.ok(!/at review|this review|publication QA|release QA|listings checked/i.test(page + component), "Events copy must be reader-facing");
assert.ok(page.includes('"@type": "CollectionPage"'));
assert.ok(!page.includes('"@type": "Event"'));
assert.ok(page.includes('`${siteUrl}/web3-events`'));
console.log(JSON.stringify({ total: events.length, added: review.exports.newReviewedEvents.length, reviewed: events.filter(e => e.checkedDate === "2026-11-07").length, upcoming: events.filter(e => eventPeriod(e) === "Upcoming").length, pending: events.filter(e => eventPeriod(e) === "Date pending").length, past: events.filter(e => eventPeriod(e) === "Past").length }, null, 2));

if (process.argv.includes("--register")) {
  const rows = events.filter(e => e.checkedDate === "2026-11-07").map(e => ({ slug: e.slug, name: e.name, primaryUrl: e.organizerUrl, checkedDate: e.checkedDate, startDate: e.startDate || null, endDate: e.endDate || null, dateLabel: e.dateLabel, venue: e.venue, city: e.city, country: e.country, audience: e.audience, access: e.access, status: e.status, period: eventPeriod(e), note: e.note || null }));
  fs.writeFileSync("docs/events-research-register-2026-11-07.json", JSON.stringify(rows, null, 2) + "\n");
}
