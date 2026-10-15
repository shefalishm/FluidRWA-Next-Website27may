import fs from 'node:fs';

const snapshot = JSON.parse(fs.readFileSync('data/network-intelligence.json', 'utf8'));
const profiles = JSON.parse(fs.readFileSync('data/asset-registry-candidates.json', 'utf8'));
const issuerList = JSON.parse(fs.readFileSync('data/issuer-tokenlist-ondo.json', 'utf8'));
const xstocksList = JSON.parse(fs.readFileSync('data/issuer-tokenlist-xstocks.json', 'utf8'));
const robinhoodList = JSON.parse(fs.readFileSync('data/issuer-api-robinhood.json', 'utf8'));
const wisdomtreeList = JSON.parse(fs.readFileSync('data/issuer-funds-wisdomtree.json', 'utf8'));
const roles = JSON.parse(fs.readFileSync('data/asset-infrastructure-relationships.json', 'utf8'));
const errors = [];
const today = new Date().toISOString().slice(0, 10);
const ids = new Set();
const contracts = new Set();
const wisdomtreeRows = wisdomtreeList.assets.map(row => ({ id: `wisdomtree-${row.symbol.toLowerCase()}`, name: row.symbol, issuer: 'WisdomTree', cohort: 'WisdomTree digital funds', source: wisdomtreeList.source, sourceReviewed: wisdomtreeList.sourceReviewed, reportedValueUsd: null, reportedAsOf: null }));
const rows = [...snapshot.assets.map(row => ({ ...row, sourceReviewed: snapshot.reviewed })), ...profiles, ...issuerList.assets, ...xstocksList.assets, ...robinhoodList.assets, ...wisdomtreeRows];
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
  } else if (row.reportedValueUsd !== null && row.reportedValueUsd !== undefined) {
    if (!(row.reportedValueUsd >= 0) || !date(row.reportedAsOf) || !row.reportedMetric) errors.push(`Value has no valid metric/date: ${row.id}`);
  }
}

if (issuerList.assets.length !== 450 || new Set(issuerList.assets.map(row => row.id)).size !== 450) errors.push('Ondo cohort must contain 450 unique assets');
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

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Network registry valid: ${rows.length} assets, ${issuerList.assets.length} Ondo, ${xstocksList.assets.length} xStocks, ${robinhoodList.assets.length} Robinhood, ${wisdomtreeList.assets.length} WisdomTree, ${roles.length} sourced roles.`);
}
