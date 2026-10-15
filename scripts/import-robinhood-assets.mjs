import fs from 'node:fs';

const input = process.argv[2];
if (!input) throw new Error('Usage: node scripts/import-robinhood-assets.mjs <official-assets-response.json>');
const response = JSON.parse(fs.readFileSync(input, 'utf8'));
if (!Array.isArray(response.assets)) throw new Error('Unexpected Robinhood assets response');

const source = 'https://api.robinhood.com/rhj/assets';
const symbols = new Set();
const assets = response.assets.filter(asset =>
  asset.status === 'ASSET_STATUS_ACTIVE' &&
  asset.tokenName?.endsWith('Robinhood Token') &&
  /^[A-Za-z0-9.\-]{1,16}$/.test(asset.tokenSymbol) &&
  asset.deployments?.some(deployment => deployment.chainId === 4663 && /^0x[a-fA-F0-9]{40}$/.test(deployment.contractAddress))
).sort((a, b) => a.tokenSymbol.localeCompare(b.tokenSymbol)).filter(asset => {
  const key = asset.tokenSymbol.toLowerCase();
  if (symbols.has(key)) return false;
  symbols.add(key);
  return true;
}).map(asset => {
  const deployment = asset.deployments.find(item => item.chainId === 4663 && /^0x[a-fA-F0-9]{40}$/.test(item.contractAddress));
  return {
    id: `robinhood-${asset.tokenSymbol.toLowerCase().replaceAll(/[^a-z0-9]/g, '-')}`,
    name: `${asset.tokenSymbol} - ${asset.tokenName.replace(/\s*•\s*Robinhood Token$/, '')}`,
    issuer: 'Robinhood Assets (Jersey) Limited',
    assetClass: 'Tokenized securities',
    structure: 'Robinhood tokenized debt security; Robinhood Chain contract in official API',
    cohort: 'Robinhood issuer API',
    source,
    sourceLabel: 'Robinhood official stock-token API',
    sourcePublished: null,
    sourceReviewed: '2026-10-15',
    notes: 'Marked active in the issuer API when reviewed. This does not independently verify current trading access, legal eligibility, reserves or USD value.',
    reportedValueUsd: null,
    reportedMetric: null,
    reportedAsOf: null,
    freshnessDays: 7,
    contractEvidence: `https://robinhoodchain.blockscout.com/address/${deployment.contractAddress}`,
    chainId: 4663,
    contractAddress: deployment.contractAddress
  };
});

if (assets.length !== 194) throw new Error(`Expected 194 unique active Robinhood securities; found ${assets.length}`);
fs.writeFileSync('data/issuer-api-robinhood.json', `${JSON.stringify({ source, apiDocumentation: 'https://docs.robinhood.com/chain/stock-token-apis/', snapshotReviewed: '2026-10-15', selection: 'All 194 active Robinhood Stock Tokens with a Robinhood Chain contract returned by the official public assets API on 15 October 2026; no live-trading or global-coverage claim.', assets }, null, 2)}\n`);
console.log(`Prepared ${assets.length} issuer-listed Robinhood securities`);
