# Events calendar review: 7 November 2026

Canonical: https://www.fluidrwa.com/web3-events

## Evidence and coverage

The machine-readable companion `events-research-register-2026-11-07.json` records exact primary URLs, checked date, start/end dates (null when unknown), venue, city, country, audience, access and review notes. It is generated from the same reviewed records shown on the calendar using `node scripts/test-web3-events.mjs --register`.

25 added listings; 24 existing listings checked. 59 total records, including 10 older historical records retained with their original September review date. Historical records were not silently described as reverified. The additions include CoinDesk, TOKEN2049, Blockworks, Ethereum France, Signal Week, Informa AI events, World Summit AI, The Tech Capital and private-capital organizers.

Research window is November 7, 2026 through March 31, 2028. Exact-date future/ongoing listings extend from November 5-7, 2026 through December 8-9, 2027. The organizer's March 2028 Middle East & Africa Finance Forum announcement is separately pending: no startDate or endDate. No exact-date January-March 2028 event passed this review's verification gate. This is a curated calendar, not a claim of exhaustive global coverage.

## Corrections and uncertainty

- ETHGlobal Mumbai: November 5-7, not November 6-8.
- Cosmoverse Hong Kong: November 5-6 summit at Grand Hyatt, now past; November 4 invitation-only Business Day is not conflated with summit-pass access.
- Family Office Forum Dubai: March 16-17, 2027, not March 24-25.
- Riyadh: organizer now announces April 6-7, 2027. Unsupported December 2-3, 2026 dates withdrawn; this does not assert an organizer cancellation. Old anchor preserved.
- Digital Family Office Forum: February 9-10, 2027 could not be verified. Retained only as date-pending follow-up, explicitly not a confirmed edition.
- NZCryptoCon, Incrypted and Global Blockchain & Crypto Symposium: primary sources announce June 2027, not exact days. Old 2026 headings/agendas are not promoted to 2027 dates.
- EthCC: official April 12-15, 2027 supersedes third-party April 5-8 projections.
- Digital Asset Summit NYC: official March 30-April 1, 2027, not projected March 23-25 dates.
- International Finance Forum: November 16 forum; November 15 awards are separately ticketed. Combined package is not misrepresented as two forum days.
- COAIEMA 2028 search snippet conflicted with the opened primary page (2026 archive); excluded. Generic recurring conference-directory 2028 entries were excluded. Consensus May 2028 and EthCC April 2028 are outside the requested January-March window.
- No unsupported cancellations, ticket prices, attendance counts, speakers or session times added. Dates remain organizer-local calendar days, with no fabricated midnight or timezone offsets.

## Search markup

Google's official guidance checked November 7, 2026:
https://developers.google.com/search/docs/appearance/structured-data/event

Google requires a unique leaf URL focused on one event; a multiple-event calendar is not an eligible event-experience page. Membership/invitation requirements also affect eligibility, but are not assumed for all family-office events. This page retains CollectionPage + ItemList only. All card Event microdata (including the four missing-startDate items) is removed rather than filled with false dates. No new leaf pages or rich-result promises were created. Search Console validation/reprocessing is a separate Google action and is not claimed complete by source tests.

Canonical URL and existing header link retained. Sitemap lastmod updated only for this page. Organizer clicks use `event_organizer_click`, not `generate_lead` or conversion events, and outbound UTM source/medium/campaign identify calendar referrals.

## Images

Twelve original AI-generated city/topic illustrations, created for FluidRWA on this review, compressed to local 480x270 WebP assets (21-43 KB). No organizer photos or logos are copied or hotlinked. City art is reused for events in the same city; neutral finance/AI art is used elsewhere. Every image has descriptive illustrative alt text, explicit dimensions, lazy loading and an on-card Illustration label. These are not documentary event scenes. Generator source: original atlas retained in Codex generated images; `scripts/build-event-illustrations.mjs` reproducibly crops/compresses it without requiring it at runtime.

## Verification

Source/date/image tests pass: 59 total, 25 added, 49 reviewed, 43 upcoming/ongoing, five pending, 11 past. Production build and TypeScript passed. Browser checks at 1440x1000 and 390x844 verified no horizontal overflow, loaded card illustrations, combined AI + Latin America filtering, five pending records, Abu Dhabi search, 11-record past archive, empty state and recovery to 43 upcoming records. Browser console had no errors. Event microdata count is zero. Final publication uses a clean clone of the committed canonical repository because unrelated untracked planning notes are user work and must not be hidden, moved or committed with this update.
