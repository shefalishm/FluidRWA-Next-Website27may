# Vendor Application Funnel Audit

Checked October 6, 2026. Sources: FluidRWA GA4 property 534444955 and read-only Supabase vendor_intro_requests.

## Measured Results

| Period | Vendor page views | Active users | Form starts | GA saved-submit events | Unmarked saved database rows |
| --- | ---: | ---: | ---: | ---: | ---: |
| September 8-October 5 | 169 | 113 | 6 | 5 | 5 |
| September 29-October 5 | 18 | 13 | 1 | 1 | 1 |

Exact page: /vendor-membership. The .html variant received one additional view. Database counts exclude explicit QA tests; an additional vendor-waitlist record with no page URL cannot be assigned to this page. Database date boundaries use UTC; GA uses its property timezone. Aggregate matches are not individual event-to-record reconciliation. Unmarked rows are not independently verified human enquiries.

The 28-day page had 29 seconds average engagement; the seven-day page had 3 seconds. Direct traffic accounts for 100 active users and 112 views; organic accounts for 7 users and 8 views. Desktop accounts for 112 users and 164 views; mobile accounts for 1 user and 5 views. Source/device users can overlap and must not be added as distinct people.

These are views and active users, not sessions. Five saved requests divided by 113 measured users is approximately 4.4%, not an audited human conversion rate. Starts and submissions are aggregate events, not a matched cohort. We cannot classify every direct visitor as a bot or infer motives from analytics alone.

## Diagnosis

The largest observed gap is before form interaction. Recorded submit events and unmarked saved rows agree; there is no evidence that most completed vendor applications were lost. Low intent, traffic quality and unclear expectations are plausible contributors, not proven individual reasons.

Two reproducible defects were found: a valid company domain without a URL scheme failed native validation, and a submission faster than 1.2 seconds could be filtered while returning success without storage. Historical frequency of the latter cannot be established from available data. Source-label contamination was corrected in the preceding deployment.

## Fixes

- Clarified the vendor application heading, purpose and free-to-apply status without promising approval or placement.
- Kept six short fields and consent; shortened repeated cautions and added a direct email alternative.
- Normalize valid plain domains to HTTPS before validation.
- Fast submissions now receive a retryable error with their details retained, not false confirmation. Honeypot spam remains filtered.
- Added first-field visibility, actual input start, validation error, submit attempt, failure, saved submission and unfinished exit events.
- Tracking sends field names and completion counts only, never entered names, emails or descriptions. QA-source visits are excluded; early events wait for analytics readiness.

## Verification And Next Read

Local tests cover desktop 1440px and mobile 390px/360px, overflow, email link, domain normalization, source attribution, retry, successful storage response, invalid input, network failure and analytics privacy. Test submissions are intercepted and do not create leads or send mail. API regression tests verify rapid retries and honeypot filtering separately.

After a full week, compare form visibility to start, start to valid attempt, and attempt to saved submission in a GA4 funnel exploration. Inspect field errors and entry sources before changing additional fields. Anonymous visitors cannot be contacted; do not silently collect unfinished forms. The private conversion dashboard is buyer-focused and should not be used as the vendor application total.
