import { spawnSync } from 'node:child_process';

const result = spawnSync('npx', ['wrangler', 'auth', 'token', '--json'], { encoding: 'utf8' });
if (result.status !== 0) throw new Error('Cloudflare authorization unavailable');
const credentials = JSON.parse(result.stdout);
const token = credentials.token || credentials.apiToken || credentials.oauthToken;
if (!token) throw new Error(`Unsupported credential response fields: ${Object.keys(credentials).join(', ')}`);
const response = await fetch('https://api.cloudflare.com/client/v4/zones?name=fluidrwa.com', {
  headers: { Authorization: `Bearer ${token}` }
});
const payload = await response.json();
if (!payload.success) throw new Error(`Cloudflare domain query failed: HTTP ${response.status}`);
const zones = [];
for (const zone of payload.result) {
  const recordsResponse = await fetch(`https://api.cloudflare.com/client/v4/zones/${zone.id}/dns_records?per_page=100`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const recordsPayload = await recordsResponse.json();
  const records = recordsPayload.success
    ? recordsPayload.result.map(({ type, name, content, proxied, priority }) => ({
        type,
        name,
        content,
        proxied,
        ...(priority === undefined ? {} : { priority })
      }))
    : { unavailable: `HTTP ${recordsResponse.status}` };
  zones.push({
    id: zone.id,
    name: zone.name,
    status: zone.status,
    nameservers: zone.name_servers,
    records
  });
}
console.log(JSON.stringify(zones, null, 2));
