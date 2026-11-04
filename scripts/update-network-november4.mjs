import fs from 'node:fs';
import assert from 'node:assert/strict';

const checked = '2026-11-04';
const asOf = '2026-11-02';
const read = name => JSON.parse(fs.readFileSync(`data/${name}.json`, 'utf8'));
const write = (name, data) => fs.writeFileSync(`data/${name}.json`, `${JSON.stringify(data, null, 2)}\n`);
const compact = (name, rows) => fs.writeFileSync(`data/${name}.json`, `[\n${rows.map(row => `  ${JSON.stringify(row)}`).join(',\n')}\n]\n`);
const snapshot = read('network-intelligence');
const profiles = read('asset-registry-candidates');
const history = read('fund-disclosure-history');
const archive = read('network-value-observations');
const wisdomtree = read('issuer-funds-wisdomtree');
const roles = read('asset-infrastructure-relationships');
assert.equal(snapshot.version, '2026-10-29.2', 'Apply only to the October baseline');

const headline = { usdc: 69_800_000_000, wtgxx: 668_412_990 };
for (const asset of snapshot.assets.filter(row => row.id in headline)) {
  Object.assign(asset, { value: headline[asset.id], asOf, sourceReviewed: checked });
  archive.observations.push({ assetId: asset.id, metric: asset.metric, value: asset.value, currency: asset.currency, reportedAsOf: asOf, checked, source: asset.source });
}
snapshot.assets.find(row => row.id === 'wtgxx').notes = 'The fund table reports 668,412.99 in USD thousands on 2 November 2026. The separately dated NAV is not AUM. Prior AUM and September net assets remain in the observation archive; they do not establish net flows. Contract evidence remains the earlier September factsheet and was not reverified. The transfer agent maintains ownership; blockchain representations are not a separate security.';
snapshot.version = `${checked}.1`;
snapshot.updated = checked;

for (const [id, value, note] of [
  ['ustb', 635_618_049, 'The holdings table is separately dated 21 September 2026 and is not used as a current portfolio or allocated to networks.'],
  ['uscc', 177_579_856, 'Network values on the reviewed page do not reconcile with headline AUM; network allocations are excluded. This is a crypto carry strategy, not a Treasury-only fund.'],
  ['vbdc', 10_030_430, 'The fund holds listed BDC equities rather than originating loans. Valinor Digital Capital LLC is named as investment manager; the page does not name an appointed auditor.'],
]) {
  const asset = profiles.find(row => row.id === id);
  Object.assign(asset, { reportedValueUsd: value, reportedAsOf: asOf, sourceReviewed: checked, notes: `Issuer-reported fund AUM as of 2 November 2026, including tokenized and book-entry shares. ${note}` });
  history.observations.push({ assetId: id, reportedAsOf: asOf, value, checked, source: asset.source });
}
history.updated = checked;

// Issuer table reports USD thousands to two decimals; these are USD values.
const companion = { SPXUX: 18562740, TECHX: 6332760, FLTTX: 1891800, WTPIX: 1649590, WTSIX: 1274430, EQTYX: 1170310, WTSYX: 1009500, WTTSX: 964050, TIPSX: 932790, WTSTX: 922090, WTLGX: 756100, CRDYX: 585800, LNGVX: 578160, MODRX: 527610 };
for (const asset of wisdomtree.assets) {
  assert.ok(Object.hasOwn(companion, asset.symbol), asset.symbol);
  const record = { assetId: `wisdomtree-${asset.symbol.toLowerCase()}`, metric: wisdomtree.reportedMetric, currency: 'USD', source: wisdomtree.source };
  archive.observations.push({ ...record, value: asset.reportedValueUsd, reportedAsOf: wisdomtree.reportedAsOf, checked: wisdomtree.sourceReviewed });
  asset.reportedValueUsd = companion[asset.symbol];
  archive.observations.push({ ...record, value: asset.reportedValueUsd, reportedAsOf: asOf, checked });
}
Object.assign(wisdomtree, { reportedAsOf: asOf, sourceReviewed: checked, selection: 'Fourteen WisdomTree Digital Funds in the issuer AUM table dated 2 November 2026, reviewed 4 November 2026. WTGXX has its own profile. The earlier issuer FAQ classification of blockchain as a secondary ownership record is retained; no contract, investor eligibility or trading availability is inferred.' });

roles.push({ id: 'wtgxx-bitgo-shareholder-servicing', assetId: 'wtgxx', provider: 'BitGo Bank & Trust, N.A.', role: 'Shareholder servicing and sub-accounting', source: 'https://bitgo.com/resources/blog/bitgo-to-add-native-mint-and-burn-for-wisdomtrees-tokenized-money-market-fund/', sourceLabel: 'BitGo WTGXX announcement and servicing disclosure', sourceDate: '2026-10-27', reviewed: checked, scope: 'BitGo discloses shareholder servicing and sub-accounting under an agreement with WisdomTree Digital Management, Inc. This is not a fund custody, distribution or transfer-agent appointment. The announcement describes planned BitGo Mint access; launch, transfer availability, fees and client eligibility are not verified.' });

fs.writeFileSync('data/network-intelligence.json', `{\n${Object.entries(snapshot).map(([key, value]) => `  ${JSON.stringify(key)}: ${Array.isArray(value) ? `[\n${value.map(row => `    ${JSON.stringify(row)}`).join(',\n')}\n  ]` : JSON.stringify(value)}`).join(',\n')}\n}\n`);
compact('asset-registry-candidates', profiles);
compact('asset-infrastructure-relationships', roles);
write('fund-disclosure-history', history);
write('network-value-observations', archive);
write('issuer-funds-wisdomtree', wisdomtree);
