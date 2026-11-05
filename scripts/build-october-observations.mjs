import fs from 'node:fs';
import assert from 'node:assert/strict';

const archive = JSON.parse(fs.readFileSync('data/network-value-observations.json', 'utf8'));
const observations = archive.observations.filter(row => row.reportedAsOf >= '2026-10-01' && row.reportedAsOf <= '2026-10-31' && row.checked <= '2026-10-31');
assert.equal(observations.length, 17);
assert.equal(new Set(observations.map(row => `${row.assetId}/${row.reportedAsOf}/${row.metric}`)).size, 17);
const data = {
  title: 'October 2026 dated financial observations',
  published: '2026-11-05',
  period: 'Partial-month observations, 22-27 October 2026; not month-end',
  scope: 'Issuer-reported figures retained in the Network Explorer observation archive. USD fund AUM and stablecoin circulation are different measures and must not be added. No monthly flows or market total is calculated. Current source pages may no longer display these historical values.',
  selection: 'reportedAsOf >= 2026-10-01 and <= 2026-10-31; checked <= 2026-10-31. The November registry is not used to reconstruct October coverage.',
  observations
};
const columns = ['assetId', 'metric', 'value', 'currency', 'reportedAsOf', 'checked', 'source'];
const quote = value => `"${String(value).replaceAll('"', '""')}"`;
const stem = 'public/assets/datasets/october-2026-dated-observations-v1';
for (const [file, content] of [
  [`${stem}.json`, `${JSON.stringify(data, null, 2)}\n`],
  [`${stem}.csv`, [columns, ...observations.map(row => columns.map(key => row[key]))].map(row => row.map(quote).join(',')).join('\r\n') + '\r\n']
]) {
  if (process.argv.includes('--check')) assert.equal(fs.readFileSync(file, 'utf8'), content, `Stale ${file}`);
  else fs.writeFileSync(file, content);
}
console.log('PASS 17 October-dated observations; September and November excluded');
