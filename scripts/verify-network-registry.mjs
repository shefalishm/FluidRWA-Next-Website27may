import fs from 'node:fs';

const snapshot = JSON.parse(fs.readFileSync('data/network-intelligence.json', 'utf8'));
const profiles = JSON.parse(fs.readFileSync('data/asset-registry-candidates.json', 'utf8'));
const issuerList = JSON.parse(fs.readFileSync('data/issuer-tokenlist-ondo.json', 'utf8'));
const additions = JSON.parse(fs.readFileSync('data/issuer-additions-october29.json', 'utf8'));
const xstocksList = JSON.parse(fs.readFileSync('data/issuer-tokenlist-xstocks.json', 'utf8'));
const robinhoodList = JSON.parse(fs.readFileSync('data/issuer-api-robinhood.json', 'utf8'));
const wisdomtreeList = JSON.parse(fs.readFileSync('data/issuer-funds-wisdomtree.json', 'utf8'));
const roles = JSON.parse(fs.readFileSync('data/asset-infrastructure-relationships.json', 'utf8'));
const fundHistory = JSON.parse(fs.readFileSync('data/fund-disclosure-history.json', 'utf8'));
const errors = [];
// Editorial review dates use the research team's calendar, not the worker's UTC day.
const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
const ids = new Set();
const contracts = new Set();
const wisdomtreeRows = wisdomtreeList.assets.map(row => ({ id: `wisdomtree-${row.symbol.toLowerCase()}`, name: row.symbol, issuer: 'WisdomTree', cohort: 'WisdomTree digital funds', source: wisdomtreeList.source, sourceReviewed: wisdomtreeList.sourceReviewed, reportedValueUsd: row.reportedValueUsd, reportedMetric: wisdomtreeList.reportedMetric, reportedAsOf: wisdomtreeList.reportedAsOf }));
const rows = [...snapshot.assets.map(row => ({ ...row, sourceReviewed: row.sourceReviewed || snapshot.reviewed })), ...profiles, ...issuerList.assets, ...additions.assets, ...xstocksList.assets, ...robinhoodList.assets, ...wisdomtreeRows];
const date = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(`${value}T00:00:00Z`)) && value <= today;
const https = value => typeof value === 'string' && value.startsWith('https://');

for (const row of rows) {
  if (!row.id || ids.has(row.id)) errors.push(`Duplicate or missing asset ID: ${row.id}`);
  ids.add(row.id);
  if (!row.name || !row.issuer) errors.push(`Missing name or issuer: ${row.id}`);
  if (!https(row.source) || !date(row.sourceReviewed)) errors.push(`Missing source or review date: ${row.id}`);
  if (row.cohort === 'Ondo issuer list' || row.cohort === 'xStocks issuer list' || row.cohort === 'Robinhood issuer API') {
    if (row.reportedValueUsd !== null || row.reportedAsOf !== null) errors.push(`Issuer list has unsupported value: ${row.id}`);
    const expectedChain = row.cohort === 'Robinhood issuer API' ? 4663 : 1;
    if (row.chainId !== expectedChain || !/^0x[a-fA-F0-9]{40}$/.test(row.contractAddress || '')) errors.push(`Invalid issuer-listed contract: ${row.id}`);
    const key = `${row.issuer}:${row.chainId}:${row.contractAddress?.toLowerCase()}`;
    if (contracts.has(key)) errors.push(`Duplicate contract: ${row.id}`);
    contracts.add(key);
    const list = row.cohort === 'Ondo issuer list' ? issuerList : row.cohort === 'xStocks issuer list' ? xstocksList : robinhoodList;
    if (row.source !== list.source || (row.cohort === 'Robinhood issuer API' ? row.sourcePublished !== null : row.sourcePublished !== list.sourcePublished.slice(0, 10))) errors.push(`Issuer provenance mismatch: ${row.id}`);
  } else if (['RealT issuer references', 'Ondo October 2026 issuer list'].includes(row.cohort)) {
    if (row.reportedValueUsd !== null || row.reportedAsOf !== null || row.chainId !== 1 || !/^0x[a-fA-F0-9]{40}$/.test(row.contractAddress || '')) errors.push(`Invalid additional asset: ${row.id}`);
    const key = `${row.issuer}:${row.chainId}:${row.contractAddress?.toLowerCase()}`;
    if (contracts.has(key)) errors.push(`Duplicate contract: ${row.id}`);
    contracts.add(key);
    if (row.cohort === 'RealT issuer references' && (!row.source.startsWith('https://github.com/real-token/public-datas/blob/703e4139ed44d887e1e298223323e6818f1e0c4a/') || row.sourcePublished !== null)) errors.push(`Invalid RealT provenance: ${row.id}`);
    if (row.cohort === 'Ondo October 2026 issuer list' && (!row.source.includes('a857ae3573576d0b9992a2867132941de9c651b4') || row.sourcePublished !== '2026-10-27')) errors.push(`Invalid Ondo provenance: ${row.id}`);
  } else if (row.reportedValueUsd !== null && row.reportedValueUsd !== undefined) {
    if (!(row.reportedValueUsd >= 0) || !date(row.reportedAsOf) || !row.reportedMetric) errors.push(`Value has no valid metric/date: ${row.id}`);
  }
}

if (issuerList.assets.length !== 450 || new Set(issuerList.assets.map(row => row.id)).size !== 450) errors.push('Ondo cohort must contain 450 unique assets');
if (additions.assets.filter(row => row.cohort === 'RealT issuer references').length !== 25 || additions.assets.filter(row => row.cohort === 'Ondo October 2026 issuer list').length !== 25) errors.push('Additional cohorts must each contain 25 assets');
if (xstocksList.assets.length !== 1052 || new Set(xstocksList.assets.map(row => row.id)).size !== 1052) errors.push('xStocks cohort must contain 1052 unique assets');
if (robinhoodList.assets.length !== 194 || new Set(robinhoodList.assets.map(row => row.id)).size !== 194) errors.push('Robinhood cohort must contain 194 unique assets');
if (wisdomtreeList.assets.length !== 14 || new Set(wisdomtreeList.assets.map(row => row.symbol)).size !== 14 || wisdomtreeList.assets.some(row => row.symbol === 'WTGXX')) errors.push('WisdomTree cohort must contain 14 unique new funds');
const roleIds = new Set();
for (const row of roles) {
  if (!row.id || roleIds.has(row.id)) errors.push(`Duplicate or missing role ID: ${row.id}`);
  roleIds.add(row.id);
  if (!ids.has(row.assetId) || !row.provider || !row.role || !row.scope) errors.push(`Incomplete role or unknown asset: ${row.id}`);
  if (!https(row.source) || !date(row.reviewed) || (row.sourceDate && !date(row.sourceDate))) errors.push(`Invalid role source/date: ${row.id}`);
}

const observationIds = new Set();
for (const observation of fundHistory.observations) {
  const key = `${observation.assetId}:${observation.reportedAsOf}`;
  if (observationIds.has(key)) errors.push(`Duplicate fund observation: ${key}`);
  observationIds.add(key);
  const asset = profiles.find(row => row.id === observation.assetId);
  if (!asset || asset.source !== observation.source || asset.reportedMetric !== fundHistory.metric || fundHistory.currency !== 'USD' || !(observation.value > 0) || !date(observation.reportedAsOf) || !date(observation.checked) || observation.checked < observation.reportedAsOf) errors.push(`Invalid fund observation: ${key}`);
}
for (const id of new Set(fundHistory.observations.map(row => row.assetId))) {
  const latest = fundHistory.observations.filter(row => row.assetId === id).sort((a,b) => b.reportedAsOf.localeCompare(a.reportedAsOf))[0];
  const asset = profiles.find(row => row.id === id);
  if (!asset || asset.reportedAsOf !== latest.reportedAsOf || asset.reportedValueUsd !== latest.value) errors.push(`Fund history/latest profile mismatch: ${id}`);
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Network registry valid: ${rows.length} assets, ${issuerList.assets.length} Ondo, ${xstocksList.assets.length} xStocks, ${robinhoodList.assets.length} Robinhood, ${wisdomtreeList.assets.length} WisdomTree, ${roles.length} sourced roles.`);
}
