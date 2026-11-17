# Private lead storage migration

The private Cloudflare D1 database is `fluidrwa-private-leads`. It is separate from public Network Explorer data and is not bound to a public application. Live forms, authentication, delivery receipts and conversion reporting still use their current routing. Do not downgrade or switch off Supabase until the cutover checks below pass.

## Historical copy

Run `node --env-file=<existing-private-env-file> scripts/copy-form-submissions-to-d1.mjs fluidrwa-private-leads` from the repository with the existing authorized Cloudflare session. The script reads eight form and assessment tables, preserves each source ID, date, and full JSON row, and compares destination counts and row fingerprints, without printing records. Transfer scratch files are owner-only and cleaned on completion. The source is never changed. Keep database access restricted to authorized account members; do not export these records to a public Google Sheet. The cutoff excludes later arrivals; repeat while the source remains the system of record.

## Live cutover acceptance

1. Bind the private database to a staging Worker only. Implement server-only, validated, parameterized writes with saved IDs, rate limits and duplicate checks. Require a durable save before a success response, and record email accepted, delivered, failed, or unknown independently. Never treat an email failure as losing an already-saved lead.
2. Verify browser-to-storage-to-inbox with synthetic, clearly marked test data for buyer brief, contact, vendor application, quick enquiry, vendor comparison, both assessments and supported freelancer forms. Confirm that mandatory fields and source attribution survive, and that QA or spam does not count toward leads. Test notification failure, retries and rollback without sending duplicates. Use a fixed internal QA email recipient for tests.
3. Address the protected analytics dashboard and delivery webhook reads and updates, and any sign-in dependency, before switching the database. Review retention and backup access. Keep customer-facing URLs and the existing anti-spam rules.
4. Reconcile the historical copy again at cutover, including late writes and status changes. Verify new production rows and inbox delivery after cutover. Keep the old store available for rollback, then consider downgrading only once auth and reporting no longer depend on it.

## Manual test on the current live system

Open `https://www.fluidrwa.com/submit-requirement?source=qa-test`. Use your own FluidRWA address, a company name starting with `QA only`, and a description that says it is a synthetic test. Wait a few seconds before submitting. Check for the success message and the notification in the configured team inbox. Do not use a real customer's details. This checks the current production path, not future Cloudflare routing.
