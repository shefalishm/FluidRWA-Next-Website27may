# November 6 audit release

## Read-only traffic findings

- October 20's saved GA4 snapshot for property 534444955 confirms the October 13 anomaly: 738 Direct sessions against GA4's expected 59. The GA insight mentioned Chrome/Singapore. The October 13–19 comparison recorded 1,957 Direct sessions versus 971 the previous week; total sessions increased by 981 while organic search fell from 190 to 183. These are acquisition signals, not a bot diagnosis.
- The supplied follow-up reports 924 Direct sessions landing on `/submit-requirement` at 4.22% engaged (roughly 39 engaged sessions, if the supplied denominator and rate are from the same report). Its full date range and row-level export were not supplied; do not join it to the October 13 spike. The independently preserved October 21–27 audit measured a different cohort: 85 Direct project-requirements landings, 11 engaged and zero key events. A landing is not a form view, a start or a saved enquiry.
- No October 13 request logs were available for attribution. The October 28 review's Cloudflare sample covers October 21–27 and cannot attribute October 13 or tie repeated GET requests to GA identities. Direct also includes legitimate traffic with no usable attribution. Leave historical data, Direct and traffic protection settings unchanged.
- Revisit in read-only GA4 explorations: align UTC, break out hour, landing page, hostname, browser/device and engagement, and compare with same-window Cloudflare document-path request samples where retained. Segment organic and Direct without excluding either. Keep route views, visible forms, starts, accepted submissions and qualification distinct.

## Editorial and routing decisions

- The October Explorer research already renders findings and citation guidance with Dataset markup. Link to the scoped findings for tokenization, funds and custody; link to ramp research for ramp and risk workflows. Do not duplicate the schema or imply that the sampled products represent market totals.
- The existing tax directory and TaxBit/Ledgible/Lukka and Bitwave/Cryptio/TRES comparisons already cover vendor selection. Add a synthetic reconciliation acceptance fixture to the existing canonical directory rather than another overlapping comparison or hub.
- Before release both HSBC retail-gold articles returned 200 with distinct self-canonicals. The query-bearing variant of the November article already canonicalized to its clean URL. Redirect the older duplicate to the November article and carry across its dated HSBC documents. SPiCE VC is a real profile, not an alias to redirect by prefix. The Spanish and translated English pages already have language alternates; preserve them.
- No search ranking, CTR, indexing or lead-volume gain is assumed. Compare matched Search Console page/query/device cohorts after 14 full days; separate impression mix and position from CTR. Use the protected dashboard for accepted and qualified intake.
