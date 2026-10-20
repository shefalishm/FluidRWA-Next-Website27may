# Money-path repairs - 20 October 2026

## Changes

- Packaged content resolves only by exact project-relative path. Unknown nested indexes no longer match the root homepage. Unknown routes return real 404/noindex responses.
- Project stage and timeline are optional. Contact fields, category and project brief remain required. Inline accessible field errors retain entered details; first invalid field receives focus.
- Project forms now report first-field visibility and unfinished exits as diagnostics, separate from successful saved leads.
- The top tokenization article keeps its URL, content, directory design and comparison images. A buyer/vendor next-step section preserves article and category context, with contact@fluidrwa.com as an alternative.
- A single measurement-script capture listener reports email and enquiry intent. It queues early intent until Analytics is ready and does not count intent as a lead. Accepted submission IDs deduplicate generate_lead.
- GA4 now has event-scoped field_name and error_reason dimensions. Future processed data can expose field-level issues; this does not reconstruct past missing dimensions. Existing key-event settings remain unchanged.
- The restricted conversion dashboard has manually reviewed stages: unreviewed, qualified, proposal sent, paid, closed/lost, spam and QA. Paid means payment has been confirmed by the operator; website clicks never auto-qualify or auto-mark paid. No new database schema is needed.
- Email provider acceptance receipts are stored with new saved submissions. Authorized dashboard checks can retrieve the provider's last delivery event. Provider acceptance, delivery and an actual human enquiry remain different facts.

## Verification

Run `node scripts/test-content-resolution.mjs`, `node scripts/test-money-paths.mjs`, `node scripts/test-conversion-analytics.mjs`, `node scripts/check-measurement.mjs`, `node scripts/test-form-abuse.mjs`, and `npx tsc --noEmit`.

Run `node scripts/verify-money-routes.mjs` against local and production origins. It checks ten real money/content pages and six malformed/missing URLs. `TEST_BASE_URL` selects the origin.

The read-only `scripts/reconcile-lead-delivery.mjs` reports stored row counts without printing credentials or contact details. It excludes explicit QA/spam markers, not all potentially automated submissions. For 13-19 October UTC, the initial check found 23 stored rows, six vendor review applications and seventeen other enquiries; none had historical notification receipts. These are not confirmed human or paid-lead totals and cannot be equated to GA's five tracked lead events.

## Operating the pipeline

Use the existing `/conversion-analytics` access key. Review each company and update its stage only when supported by actual correspondence, a proposal or payment confirmation. No paid/qualified statuses are inferred or backfilled. Historical email records without provider IDs display "Not recorded" rather than an invented delivered status. New receipts can be checked individually with the email-check icon.

The dashboard represents the current stages of submissions received within the selected date range, not cumulative funnel progression or total company revenue. Direct-email-only enquiries are not automatically imported. No personal contact details or lifecycle-review actions are sent to GA.

Source: [Resend retrieve email API](https://resend.com/docs/api-reference/emails/retrieve-email), [GA event-scoped custom dimensions](https://support.google.com/analytics/answer/14239696).
