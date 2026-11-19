# Intake friction review: November 19, 2026

## Observations

- GA4 Advisor field-level tables for October 20-November 18 report 12 users and 12 required-field errors for each of FIRSTNAME, CONTACT_EMAIL, COMPANYNAME, CONTACT_CF1 and REQUIREMENT_CATEGORY. The 60 events are not 60 distinct affected users. This pattern is compatible with empty-form submissions; it does not establish human intent or prove a backend failure.
- The /submit-requirement funnel table reports 517 form views from 514 users, 12 submission attempts, one typed start and one request sent. No successful submission event was returned for that exact path. The supplied overall project conversion count of one has a different scope.
- Form diagnostics and attempt measurement changed on October 20/23. Zero errors in the earlier period is not a comparable error-rate baseline.
- Read-only Cloudflare D1 queries found 20 records with request_source=submit-requirement in the current period, all with accepted notification requests and lastEvent=delivered receipts. These are saved submissions with recorded delivery, not independently qualified human leads. Dates used were UTC [2026-10-20, 2026-11-19), matching the configured GA property timezone in the measurement documentation.
- Historical rows include scanner payloads in identity/source fields. Do not use historical raw submission counts as genuine-lead totals.
- The quick vendor popup used native type=url validation before its submit handler. A plain website address could be blocked before normalization. Main intake forms already normalized WEBSITE on submit, but optional proof/media links did not receive the same treatment.
- Campaign attachment previously relied on the analytics measurement script. Form capture must not depend on loading GA.

## Changes

- Quick vendor, vendor application, membership and contact website fields show www.company.com and accept company.com or www.company.com. The submit handler normalizes these to HTTPS internally. Existing complete HTTP/HTTPS URLs still work.
- Proof and product/media links accept plain addresses as well. Malformed addresses receive a simple website example, not a requirement to type a protocol. Required website fields remain required for vendor applications.
- Project category is optional, including the popup. Contact identity, reply email, company and a brief requirement remain required. Project form required labels and email fallback are explicit.
- Form campaign capture now works independently of GA loading, preserves session UTMs on navigation, handles blocked storage without breaking submission, and does not turn internal source parameters into acquisition campaigns. No GA engagement or lead events are fabricated.
- Honeypots, scanner rejection, origin checks, rate limits, saved-only conversions and the existing D1/email pipeline are unchanged.

## Checks

- scripts/test-intake-simplification.mjs covers plain-domain normalization, malformed links, the real popup submit handler, optional category and campaign persistence with no analytics.
- Existing intake context, attempt measurement and form-abuse tests remain applicable.
- Local browser checks confirmed www.company.com normalizes on submission and is not flagged invalid. The popup accepts the plain address and sends the request; the intentionally unconfigured local backend returns its normal storage error without clearing inputs or showing false success.
- Production browser-to-D1-to-signed-delivery smoke checks are required after deployment; identify synthetic records as qa_test, not real leads.

## Limits

The organic/Direct traffic mix and Bing citation decline are separate from this confirmed form-format issue. Low Direct engagement alone does not prove bots. This review does not establish the cause of Bing citation loss or promise conversion recovery. Compare typed starts, sent requests, saved records, delivered notifications and qualified leads after release, not raw interaction totals.
