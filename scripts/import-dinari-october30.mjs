import fs from 'node:fs';

const registry = JSON.parse(fs.readFileSync('public/assets/datasets/network-asset-registry.json'));
const symbols = ['SPY', 'QQQ', 'META', 'AAPL', 'NVDA', 'TSLA', 'AMZN', 'MSTR', 'SPCX'];
const assets = symbols.map(symbol => ({
  id: `dinari-${symbol.toLowerCase()}`,
  name: `${symbol} - Dinari dShare`, issuer: 'Dinari', assetClass: 'Tokenized securities',
  structure: 'Issuer-described dShare reference; product terms require verification',
  cohort: 'Dinari issuer case study', source: 'https://dinari.com/case-studies/flow-traders',
  sourceLabel: 'Dinari and Flow Traders case study', sourcePublished: null, sourceReviewed: '2026-10-30',
  notes: 'Dinari names this ticker in its dShares rollout. The product terms, contract address, current availability, investor eligibility and value were not independently verified. The announcement does not establish present trading conditions.',
  reportedValueUsd: null, reportedMetric: null, reportedAsOf: null, freshnessDays: 7, contractEvidence: null
}));
if (assets.some(row => registry.assets.some(existing => existing.id === row.id))) throw new Error('Duplicate asset ID');
fs.writeFileSync('data/issuer-additions-dinari-october30.json', JSON.stringify({selection: 'Nine dShares named in a Dinari case study; identification only, no independent current trading or contract verification.', assets}, null, 2) + '\n');
