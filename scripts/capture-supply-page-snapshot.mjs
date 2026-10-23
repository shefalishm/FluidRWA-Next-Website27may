import fs from 'node:fs';
import assert from 'node:assert/strict';
const response = await fetch('https://www.fluidrwa.com/api/network-explorer/onchain-supply', { signal: AbortSignal.timeout(30000) });
assert.ok(response.ok, `Supply API returned ${response.status}`);
const data = await response.json();
assert.ok(typeof data.method === 'string' && Array.isArray(data.series) && data.series.length > 0);
for (const series of data.series) {
  assert.ok(series.id && series.address && series.source?.startsWith('https://') && Array.isArray(series.observations));
  for (const row of series.observations) {
    assert.ok(/^\d+$/.test(row.raw_supply) && /^\d{4}-\d{2}-\d{2}$/.test(row.day) && Number.isInteger(row.block_number) && row.observed_at);
  }
}
// Preserve the API's actual observations; the fetch time is not a new source-review date.
const snapshot = { ...data, pageSnapshotCapturedAt: new Date().toISOString() };
fs.writeFileSync('data/onchain-supply-page-snapshot.json', JSON.stringify(snapshot, null, 2) + '\n');
console.log(`Saved an HTML fallback snapshot for ${data.series.length} contracts, preserving observation dates and blocks.`);
