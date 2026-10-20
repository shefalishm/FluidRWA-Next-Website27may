// Read-only aggregate checks. Never print credentials, addresses or submitted descriptions.
const start = process.env.AUDIT_START || '2026-10-13T00:00:00Z';
const end = process.env.AUDIT_END || '2026-10-20T00:00:00Z';
const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error('Supabase credentials are not configured.');
const rows = [];
for (let offset = 0; ; offset += 1000) {
  const query = new URLSearchParams({ select: 'id,created_at,status,request_source,raw_payload', and: `(created_at.gte.${start},created_at.lt.${end})`, order: 'created_at.asc,id.asc', offset: String(offset), limit: '1000' });
  const response = await fetch(`${url.replace(/\/$/, '')}/rest/v1/vendor_intro_requests?${query}`, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
  if (!response.ok) throw new Error(`Read-only lead query returned ${response.status}.`);
  const page = await response.json();
  rows.push(...page);
  if (page.length < 1000) break;
}
const qa = row => /(^|[-_ ])(qa|test|smoke)([-_ ]|$)/i.test(row.request_source || '') || ['qa_test', 'spam'].includes(row.status);
const usable = rows.filter(row => !qa(row));
const notifications = { accepted: 0, delivered: 0, bounced: 0, failed: 0, unknown: 0 };
for (const row of usable) {
  const receipt = row.raw_payload?.FLUIDRWA_NOTIFICATION;
  if (!receipt) { notifications.unknown++; continue; }
  if (receipt.status !== 'accepted') { notifications.failed++; continue; }
  notifications.accepted++;
  if (receipt.messageId && process.env.RESEND_API_KEY) {
    const response = await fetch(`https://api.resend.com/emails/${encodeURIComponent(receipt.messageId)}`, { headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` } });
    if (!response.ok) continue;
    const result = await response.json();
    if (result.last_event === 'delivered') notifications.delivered++;
    if (['bounced', 'failed', 'complained'].includes(result.last_event)) notifications.bounced++;
    await new Promise(resolve => setTimeout(resolve, 600));
  }
}
console.log(JSON.stringify({ start, end, stored: rows.length, explicitlyExcluded: rows.length - usable.length,
  vendorReviewApplications: usable.filter(row => row.request_source === 'vendor-review-application').length,
  otherStoredEnquiries: usable.filter(row => row.request_source !== 'vendor-review-application').length,
  notifications,
  note: 'Stored rows are not independently verified human or qualified leads. Provider delivered status does not prove the recipient read the message. Historical missing receipts cannot be reconstructed from this table.'
}, null, 2));
