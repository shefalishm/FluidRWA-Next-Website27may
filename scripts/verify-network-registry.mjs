import fs from 'node:fs';

const snapshot = JSON.parse(fs.readFileSync('data/network-intelligence.json', 'utf8'));
const profiles = JSON.parse(fs.readFileSync('data/asset-registry-candidates.json', 'utf8'));
const issuerList = JSON.parse(fs.readFileSync('data/issuer-tokenlist-ondo.json', 'utf8'));
const xstocksList = JSON.parse(fs.readFileSync('data/issuer-tokenlist-xstocks.json', 'utf8'));
const roles = JSON.parse(fs.readFileSync('data/asset-infrastructure-relationships.json', 'utf8'));
const errors = [];
const today = new Date().toISOString().slice(0, 10);
const ids = new Set();
const contracts = new Set();
const rows = [...snapshot.assets.map(row => ({ ...row, sourceReviewed: snapshot.reviewed })), ...profiles, ...issuerList.assets, ...xstocksList.assets];
const date = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(`${value}T00:00:00Z`)) && value <= today;
const https = value => typeof value === 'string' && value.startsWith('https://');

for (const row of rows) {
  if (!row.id || ids.has(row.id)) errors.push(`Duplicate or missing asset ID: ${row.id}`);
  ids.add(row.id);
  if (!row.name || !row.issuer) errors.push(`Missing name or issuer: ${row.id}`);
  if (!https(row.source) || !date(row.sourceReviewed)) errors.push(`Missing source or review date: ${row.id}`);
  if (row.cohort === 'Ondo issuer list' || row.cohort === 'xStocks issuer list') {
    if (row.reportedValueUsd !== null || row.reportedAsOf !== null) errors.push(`Issuer list has unsupported value: ${row.id}`);
    if (row.chainId !== 1 || !/^0x[a-fA-F0-9]{40}$/.test(row.contractAddress || '')) errors.push(`Invalid Ethereum contract: ${row.id}`);
    const key = `${row.issuer}:${row.chainId}:${row.contractAddress?.toLowerCase()}`;
    if (contracts.has(key)) errors.push(`Duplicate contract: ${row.id}`);
    contracts.add(key);
    const list = row.cohort === 'Ondo issuer list' ? issuerList : xstocksList;
    if (row.source !== list.source || row.sourcePublished !== list.sourcePublished.slice(0, 10)) errors.push(`Issuer provenance mismatch: ${row.id}`);
  } else if (row.reportedValueUsd !== null && row.reportedValueUsd !== undefined) {
    if (!(row.reportedValueUsd >= 0) || !date(row.reportedAsOf) || !row.reportedMetric) errors.push(`Value has no valid metric/date: ${row.id}`);
  }
}

if (issuerList.assets.length !== 450 || new Set(issuerList.assets.map(row => row.id)).size !== 450) errors.push('Ondo cohort must contain 450 unique assets');
if (xstocksList.assets.length !== 150 || new Set(xstocksList.assets.map(row => row.id)).size !== 150) errors.push('xStocks cohort must contain 150 unique assets');
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
  console.log(`Network registry valid: ${rows.length} assets, ${issuerList.assets.length} Ondo, ${xstocksList.assets.length} xStocks, ${roles.length} sourced roles.`);
}
