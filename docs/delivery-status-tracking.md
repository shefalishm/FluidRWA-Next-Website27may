# Form notification delivery tracking

## Connection

Resend sends six event types to `https://www.fluidrwa.com/api/email-delivery`:
`email.sent`, `email.delivered`, `email.delivery_delayed`, `email.bounced`,
`email.complained`, and `email.failed`. No open/click tracking is enabled by this connection.

The endpoint requires `RESEND_WEBHOOK_SECRET`, `SUPABASE_URL` and
`SUPABASE_SERVICE_ROLE_KEY` as production secrets. The existing `RESEND_API_KEY`
remains sending-only. Never copy a local invalid API key over the production key.

Svix verifies the raw body, signature and timestamp before storage is queried.
Only an exact stored notification message ID can select a submission. Updates
preserve the other form fields, use an optimistic concurrency check and record
event ID, event time, delivery state and verification source. Duplicate/older
events do not downgrade state; delivery failures and complaints take precedence.
Bodies are limited to 64 KiB. Storage failures return 503 for provider retries.
Unknown IDs retry for ten minutes in case the callback raced receipt storage;
older unmatched IDs are acknowledged without writing or matching by address.

`accepted` means the sending API accepted a notification, not inbox delivery.
`delivered` means the receiving server accepted it, not that a person read it or
that the enquiry is genuine. Missing historical receipt IDs remain unknown.

The private conversion dashboard reads saved delivery events. Its manual provider
lookup can be unavailable with sending-only credentials; this is not a failed
delivery. Use Resend's dashboard to verify historical receipts if necessary.

## Checks and rollback

Run `node scripts/test-email-delivery.mjs` for signature, timestamp, replay,
ordering, body-limit, exact-ID and storage-conflict checks (mocked database).
After deployment submit an explicitly labelled QA form, check its receipt in
Resend and confirm `signed_resend_webhook` with `lastEvent: delivered` in storage.
QA records must be marked `qa_test`, never counted as enquiries.

If callbacks need to be stopped, disable only this endpoint in Resend Webhooks.
Form saving and notification sending are independent of callback availability.
Do not delete submission data or weaken signature verification as a workaround.

References: [Resend webhook verification](https://resend.com/docs/webhooks/verify-webhooks-requests)
and [Resend webhooks](https://resend.com/docs/webhooks/introduction).
