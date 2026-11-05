import assert from 'node:assert/strict';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const reviewed = '2026-11-04';
const registryPath = 'public/assets/datasets/network-asset-registry.json';
const baseline = '98eb665f758cda0810df84a4a261add46defc41e';
const prior = JSON.parse(execFileSync('git', ['show', `${baseline}:${registryPath}`], { maxBuffer: 8_000_000 })).assets;
assert.equal(prior.length, 1906);
const verifyOnly = process.argv.includes('--verify');
const superstateDir = process.argv.find(arg => arg.startsWith('--superstate-dir='))?.split('=').slice(1).join('=');
assert.ok(superstateDir, 'Supply --superstate-dir with saved official superstate-{ticker}.html pages');
const pages = process.argv.slice(2).filter(path => path.endsWith('.json')).map(path => JSON.parse(fs.readFileSync(path))).sort((a, b) => a.page.currentPage - b.page.currentPage);
assert.ok(pages.length > 1 && pages.every(({ page }, index) => page.currentPage === index && page.hasNextPage === (index < pages.length - 1)), 'Provide every page from one issuer API capture');
let products = pages.flatMap(({ page, nodes }) => nodes.map(node => ({ ...node, page: page.currentPage })));
assert.equal(new Set(products.map(row => row.id)).size, products.length, 'Repeated product UUID across issuer pages');
if (verifyOnly) {
  const saved = JSON.parse(fs.readFileSync('data/issuer-additions-november4-expansion.json')).assets;
  const order = saved.filter(row => row.cohort === 'xStocks November issuer API').map(row => row.issuerProductId);
  const selected = order.map(id => products.find(row => row.id === id));
  assert.ok(selected.every(Boolean), 'Saved product missing from official API');
  products = [...selected, ...products.filter(row => !order.includes(row.id))];
}
const address = /^0x[0-9a-f]{40}$/i;
const isin = /^[A-Z]{2}[A-Z0-9]{9}[0-9]$/;
const issuer = 'Backed Assets (JE) Limited';
const ids = new Set(prior.map(row => row.id));
const deployments = new Set(prior.flatMap(row => [
  row.contractAddress?.toLowerCase(),
  row.contractEvidence?.match(/(?:0x[0-9a-f]{40}|\/token\/[1-9A-HJ-NP-Za-km-z]{32,44})$/i)?.[0].split('/').at(-1).toLowerCase()
]).filter(Boolean));
const normalize = name => name.toLowerCase().replace(/\s+xstock$/, '').replace(/[^a-z0-9]/g, '');
const names = new Set(prior.filter(row => row.issuer === issuer).map(row => normalize(row.name.split(' - ').slice(1).join(' - '))));
const productKeys = row => [row.id, row.isin, row.underlyingIsin, row.symbol.toLowerCase()].filter(Boolean);
const deploymentKeys = row => row.deployments.flatMap(item => [item.address, item.wrapperAddressV2].filter(Boolean).map(value => value.toLowerCase()));
const matchesPrior = row => ids.has(`backed-${row.symbol.toLowerCase()}`) || names.has(normalize(row.name)) ||
  deploymentKeys(row).some(key => deployments.has(key));
const seen = new Set(products.filter(matchesPrior).flatMap(productKeys));
const common = { sourcePublished: null, sourceReviewed: reviewed, reportedValueUsd: null, reportedMetric: null, reportedAsOf: null, freshnessDays: 7 };
const assets = [];

for (const row of products) {
  if (assets.length === 97) break;
  const id = `backed-${row.symbol.toLowerCase()}`;
  const ethereum = row.deployments.filter(item => item.network === 'Ethereum' && address.test(item.address));
  if (!row.name.endsWith(' xStock') || !isin.test(row.isin) || !isin.test(row.underlyingIsin) ||
      row.isTradingHalted !== false || row.trading?.isTradingHalted !== false ||
      !['Issuance', 'Redemption'].every(operation => row.allowedOperations.includes(operation)) ||
      ethereum.length !== 1 || matchesPrior(row) || productKeys(row).some(key => seen.has(key))) continue;
  const contractAddress = ethereum[0].address;
  productKeys(row).forEach(key => seen.add(key));
  deploymentKeys(row).forEach(key => deployments.add(key));
  ids.add(id);
  names.add(normalize(row.name));
  assets.push({
    ...common, id, name: `${row.symbol} - ${row.name.replace(/ xStock$/, '')}`, issuer,
    assetClass: 'Tokenized securities', structure: 'xStock tracker certificate, not a direct share',
    cohort: 'xStocks November issuer API', source: `https://api.xstocks.fi/api/v2/public/assets?page=${row.page}`,
    sourceLabel: 'Official xStocks product API', issuerProductId: row.id, productIsin: row.isin,
    underlyingIsin: row.underlyingIsin, chainId: 1, contractAddress,
    contractEvidence: `https://etherscan.io/token/${contractAddress}`,
    notes: 'Issuer API flags issuance and redemption as enabled and no trading halt; this does not establish venue liquidity or an open session. Not offered to U.S. persons or in the U.S.; local restrictions and issuer onboarding apply.'
  });
}
assert.equal(assets.length, 97);

// These product pages list outstanding tokenized shares; only one mint per share class is recorded.
for (const [symbol, issuer, cusip, mint] of [
  ['GLXY', 'Galaxy Digital Inc.', '36317J209', '2HehXG149TXuVptQhbiWAWDjbbuCsXSAtLTB5wc2aajK'],
  ['FWDI', 'Forward Industries, Inc.', '349862409', '7GzQgf6DPo6ZANjnbhe9tNCpkGTv3zqHbsDx74jyQf9'],
  ['EXOD', 'Exodus Movement, Inc.', '30209R106', '3DBudkWQNbXGAjzEAtpjMKorb76sjozcHCzc8ZtkHDAQ']
]) {
  const ticker = symbol.toLowerCase();
  const id = `opening-bell-${ticker}`;
  const html = fs.readFileSync(`${superstateDir}/superstate-${ticker}.html`, 'utf8');
  assert.ok(html.includes(mint) && html.includes(cusip) && html.includes(issuer), `Official share identity mismatch: ${symbol}`);
  assert.ok(!ids.has(id) && !deployments.has(mint.toLowerCase()) && !prior.some(row =>
    row.issuerProductId === cusip || normalize(row.issuer) === normalize(issuer)));
  deployments.add(mint.toLowerCase());
  assets.push({
    ...common, id, name: `${symbol} - ${issuer}`, issuer, assetClass: 'Tokenized securities',
    structure: 'Native public shares recorded onchain through Superstate, not a tracker certificate',
    cohort: 'Superstate Opening Bell shares', source: `https://superstate.com/assets/${ticker}`,
    sourceLabel: 'Superstate official product page', issuerProductId: cusip, network: 'Solana',
    contractAddress: mint, contractEvidence: `https://explorer.solana.com/address/${mint}`,
    notes: 'Superstate lists outstanding Solana shares. Holding onchain requires an approved account and allowlisted wallet; sanctioned jurisdictions are excluded. Venue trading and liquidity were not independently tested.'
  });
}
const selection = '97 additional xStocks tracker certificates with issuer API issuance/redemption flags and 3 native public share classes listed by Superstate Opening Bell, reviewed 4 November 2026. One deployment per product; no market values or venue liquidity assertions.';
const output = { selection, assets };
if (verifyOnly) {
  assert.deepEqual(JSON.parse(fs.readFileSync('data/issuer-additions-november4-expansion.json')), output,
    'Official capture no longer reproduces the saved cohort; investigate rather than silently replacing it');
} else {
  fs.writeFileSync('data/issuer-additions-november4-expansion.json', JSON.stringify(output, null, 2) + '\n');
}
console.log(selection);
