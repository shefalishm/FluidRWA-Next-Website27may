process.loadEnvFile('.env.local');
const query = new URLSearchParams({ select: 'created_at,request_source,page_url,contact_email,first_name,company_name,project_description,raw_payload', order: 'created_at.asc', limit: '1000' });
query.append('created_at', 'gte.2026-10-06T18:00:00Z');
query.append('created_at', 'lt.2026-10-07T02:00:00Z');
const rows = [];
for (let offset = 0; offset < 10000; offset += 1000) {
  query.set('offset', String(offset));
  const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/vendor_intro_requests?${query}`, { headers: { apikey: process.env.SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}` } });
  if (!response.ok) throw new Error(`Read failed: ${response.status}`);
  const batch = await response.json();
  rows.push(...batch);
  if (batch.length < 1000) break;
}
const tally = (values) => Object.fromEntries([...new Set(values)].map(key => [key, values.filter(value => value === key).length]));
const probes = rows.filter(row => row.contact_email?.toLowerCase() === 'testing@example.com' || JSON.stringify(row).includes('pHqghUme'));
const ist = (date) => new Date(date).toLocaleString('en-GB', { timeZone: 'Asia/Kolkata' });
console.log(JSON.stringify({ total: rows.length, identifiedProbeRows: probes.length, firstIST: rows[0] && ist(rows[0].created_at), lastIST: rows.at(-1) && ist(rows.at(-1).created_at), sources: tally(probes.map(row => ['contact-general', 'vendor-waitlist', 'submit-requirement', 'site-page', 'company-profile'].includes(row.request_source) ? row.request_source : 'manipulated-source')), invalidPageUrls: probes.filter(row => !/^https:\/\//.test(row.page_url || '')).length, hours: tally(probes.map(row => ist(row.created_at).slice(0,14))), rawKeys: [...new Set(probes.flatMap(row => Object.keys(row.raw_payload || {})))], timingPresent: probes.filter(row => row.raw_payload?.FORM_ELAPSED_MS).length, honeypotPresent: probes.filter(row => row.raw_payload?.WEBSITE_URL).length }, null, 2));
