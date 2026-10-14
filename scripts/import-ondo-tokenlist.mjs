import fs from 'node:fs';

const input = process.argv[2];
if (!input) throw new Error('Usage: node scripts/import-ondo-tokenlist.mjs <official-tokenlist.json>');

const list = JSON.parse(fs.readFileSync(input, 'utf8'));
if (list.name !== 'Ondo Tokenized Stocks List' || !Number.isFinite(Date.parse(list.timestamp))) {
  throw new Error('Unexpected Ondo token-list format');
}

const revision = 'f5a82fca4b2a81aa8fc1ce65b8982f36d6cd40f4';
const source = `https://github.com/ondoprotocol/ondo-global-markets-token-list/blob/${revision}/tokenlist.json`;
const tokens = list.tokens.filter(token =>
  token.chainId === 1 &&
  token.name.endsWith('(Ondo Tokenized)') &&
  token.tags?.includes('ondo') &&
  /^0x[a-fA-F0-9]{40}$/.test(token.address) &&
  /^[A-Za-z0-9]{2,16}$/.test(token.symbol)
);
const symbols = new Set();
const assets = tokens.sort((a, b) => a.symbol.localeCompare(b.symbol)).filter(token => {
  const key = token.symbol.toLowerCase();
  if (symbols.has(key)) return false;
  symbols.add(key);
  return true;
}).map(token => ({
  id: `ondo-${token.symbol.toLowerCase()}`,
  name: `${token.symbol} - ${token.name.replace(/ \(Ondo Tokenized\)$/, '')}`,
  issuer: 'Ondo Finance',
  assetClass: 'Tokenized securities',
  structure: 'Ondo tokenized stock or ETF; Ethereum contract in issuer list',
  cohort: 'Ondo issuer list',
  source,
  sourceLabel: 'Ondo official token list',
  sourcePublished: list.timestamp.slice(0, 10),
  sourceReviewed: '2026-10-14',
  notes: 'Issuer-listed in the September 17 token-list snapshot. Current trading, redemption eligibility, reserves and USD value have not been independently verified.',
  reportedValueUsd: null,
  reportedMetric: null,
  reportedAsOf: null,
  freshnessDays: 7,
  contractEvidence: `https://etherscan.io/token/${token.address}`,
  chainId: 1,
  contractAddress: token.address
}));

if (assets.length !== 450) throw new Error(`Expected 450 unique Ethereum securities; found ${assets.length}`);
fs.writeFileSync('data/issuer-tokenlist-ondo.json', `${JSON.stringify({ source, sourcePublished: list.timestamp, selection: 'All 450 unique Ethereum Ondo-tokenized securities in the pinned issuer snapshot, deduplicated by symbol; no ranking or global market-coverage claim.', assets }, null, 2)}\n`);
console.log(`Prepared ${assets.length} issuer-listed securities from Ondo revision ${revision}`);
