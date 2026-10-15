import fs from 'node:fs';

const input = process.argv[2];
if (!input) throw new Error('Usage: node scripts/import-xstocks-tokenlist.mjs <official-tokenlist.json>');

const list = JSON.parse(fs.readFileSync(input, 'utf8'));
if (list.name !== 'xStocks Token List' || !Number.isFinite(Date.parse(list.timestamp))) {
  throw new Error('Unexpected xStocks token-list format');
}

const revision = '401edae9acf8e14152825864b974635e802ac948';
const source = `https://github.com/backed-fi/cowswap-xstocks-tokenlist/blob/${revision}/tokenlist.json`;
const tokens = list.tokens.filter(token =>
  token.chainId === 1 &&
  token.name.endsWith('xStock') &&
  token.tags?.includes('xStocks') &&
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
  id: `backed-${token.symbol.toLowerCase()}`,
  name: `${token.symbol} - ${token.name.replace(/ xStock$/, '')}`,
  issuer: 'Backed Assets (JE) Limited',
  assetClass: 'Tokenized securities',
  structure: 'xStock tokenized tracker certificate; Ethereum contract in issuer list',
  cohort: 'xStocks issuer list',
  source,
  sourceLabel: 'Backed official xStocks token list',
  sourcePublished: list.timestamp.slice(0, 10),
  sourceReviewed: '2026-10-14',
  notes: 'Issuer-listed in the September 24 token-list snapshot. Current trading, redemption eligibility, reserves and USD value have not been independently verified.',
  reportedValueUsd: null,
  reportedMetric: null,
  reportedAsOf: null,
  freshnessDays: 7,
  contractEvidence: `https://etherscan.io/token/${token.address}`,
  chainId: 1,
  contractAddress: token.address
}));

if (assets.length !== 1052) throw new Error(`Expected 1052 unique Ethereum securities; found ${assets.length}`);
fs.writeFileSync('data/issuer-tokenlist-xstocks.json', `${JSON.stringify({ source, sourcePublished: list.timestamp, selection: 'All 1052 qualifying Ethereum xStocks entries in the pinned issuer snapshot, deduplicated by symbol; no ranking or global market-coverage claim.', assets }, null, 2)}\n`);
console.log(`Prepared ${assets.length} issuer-listed securities from xStocks revision ${revision}`);
