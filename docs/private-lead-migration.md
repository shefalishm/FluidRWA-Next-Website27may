# Private lead storage migration

The private Cloudflare D1 database is `fluidrwa-private-leads`. It is separate from public Network Explorer data and is not bound to a public application. Live forms, authentication, delivery receipts and conversion reporting still use their current routing. Do not downgrade or switch off Supabase until the cutover checks below pass.

## Historical copy

Run `node --env-file=<existing-private-env-file> scripts/copy-form-submissions-to-d1.mjs fluidrwa-private-leads` from the repository with the existing authorized Cloudflare session. The script reads eight form and assessment tables, preserves each source ID, date, and full JSON row, and compares destination counts and row fingerprints, without printing records. Transfer scratch files are owner-only and cleaned on completion. The source is never changed. Keep database access restricted to authorized account members; do not export these records to a public Google Sheet. The cutoff excludes later arrivals; repeat while the source remains the system of record.

## Live cutover acceptance

1. Run the SQL in `migrations/private-leads/0001_form_submissions.sql`. The Worker binding is `LEADS_DB` and the server-side opt-in is `LEAD_STORE_DRIVER=d1`. Leave the flag unset in production while testing. Stage this on a protected preview and do not allow real data into the preview. The adapter uses an explicit internal table and filter allowlist and parameterized SQL. A missing D1 binding in D1 mode returns an error rather than silently changing data stores. Existing saved-mode response values are retained for client compatibility.
2. Verify browser-to-storage-to-inbox with synthetic, clearly marked test data for buyer brief, contact, vendor application, quick enquiry, vendor comparison, both assessments and supported freelancer forms. Confirm that mandatory fields and source attribution survive, and that QA or spam does not count toward leads. Test notification failure, retries and rollback without sending duplicates. Use a fixed internal QA email recipient for tests.
3. Address the protected analytics dashboard and delivery webhook reads and updates, and any sign-in dependency, before switching the database. Review retention and backup access. Keep customer-facing URLs and the existing anti-spam rules.
4. Refresh the verified copy again just before cutover and arrange a final reconciliation of late writes and status changes. Seed the working table from the archive while production is still on Supabase. Do not overwrite newer D1 stages or delivery receipts with a stale archive after activation. Verify new production rows and inbox delivery. Before any rollback, reconcile D1-only submissions and statuses back to the old store. Keep Supabase for authentication until that usage is replaced or explicitly retired.

## Manual test on the current live system

Open `https://www.fluidrwa.com/submit-requirement?source=qa-test`. Use your own FluidRWA address, a company name starting with `QA only`, and a description that says it is a synthetic test. Wait a few seconds before submitting. Check for the success message and the notification in the configured team inbox. Do not use a real customer's details. This checks the current production path, not future Cloudflare routing.
