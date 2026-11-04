import assert from 'node:assert/strict';
import fs from 'node:fs';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const reviewed = '2026-11-04';
const [marketFile, robinhoodFile] = process.argv.slice(2);
assert.ok(marketFile && robinhoodFile, 'Supply the reviewed Lofty marketplace HTML and Robinhood API JSON');
const read = path => JSON.parse(fs.readFileSync(path, 'utf8'));
const prior = read('public/assets/datasets/network-asset-registry.json').assets;
assert.equal(prior.length, 1855, 'Use the unmodified 50de1ea registry export');
const common = { sourcePublished: null, sourceReviewed: reviewed, reportedValueUsd: null, reportedMetric: null, reportedAsOf: null, freshnessDays: 7 };
const ids = new Set(prior.map(row => row.id));
const contracts = new Set(prior.map(row => row.contractAddress?.toLowerCase()).filter(Boolean));
const addresses = new Set(prior.filter(row => /real estate|property/i.test(row.assetClass)).map(row => normalize(row.name)));
const origin = 'https://www.lofty.ai';
const robinhoodSource = 'https://api.robinhood.com/rhj/assets';
const curl = promisify(execFile);

function normalize(value) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// The public React Router payload stores field names and values by index.
function loader(html) {
  const payload = html.match(/streamController\.enqueue\(("(?:[^"\\]|\\.)*")\)/);
  assert.ok(payload, 'Missing Lofty loader payload');
  const table = JSON.parse(JSON.parse(payload[1]));
  const decode = i => {
    const value = table[i];
    if (Array.isArray(value)) return value.map(decode);
    if (value && typeof value === 'object') {
      return Object.fromEntries(Object.entries(value).map(([key, ref]) => [table[Number(key.slice(1))], decode(ref)]));
    }
    return value;
  };
  return decode(0).loaderData;
}

const market = loader(fs.readFileSync(marketFile, 'utf8'))['routes/marketplace'];
assert.equal(market.includeSold, false);
const eligible = market.listings.filter(row => (row.tokensAvailable > 0 || row.demandAvailable > 0) && row.ownershipNumIssued > 0 &&
  ['single family', 'multi family', 'vacation rental', 'commercial'].includes(row.propertyType) &&
  ![...addresses].some(address => address.includes(normalize(row.address))));
const results = [];
for (let offset = 0; offset < eligible.length; offset += 6) {
  const batch = await Promise.all(eligible.slice(offset, offset + 6).map(async listing => {
    const source = new URL(`/property_deal/${listing.slug}`, origin).href;
    try {
      const { stdout } = await curl('curl', ['-fsS', '--max-time', '25', source], { maxBuffer: 4_000_000 });
      const { property } = loader(stdout)['routes/property-deal'];
      assert.equal(property.slug, listing.slug);
      assert.ok(property.address && property.numIssued > 0 && Number.isSafeInteger(property.assetId) &&
        property.assetId > 0 && /^LFTY\d+$/i.test(property.assetUnit), 'Missing matching issued property token');
      return { property, source, listing };
    } catch (error) {
      console.warn(`Excluded ${listing.slug}: ${error.message}`);
      return null;
    }
  }));
  results.push(...batch.filter(Boolean));
}

const propertyKeys = new Set();
const assets = [];
for (const { property, source, listing } of results) {
  const id = `lofty-${property.assetId}`;
  const keys = [listing.propertyId, property.assetUnit.toUpperCase(), normalize(property.address)];
  if (ids.has(id) || keys.some(key => propertyKeys.has(key))) continue;
  ids.add(id);
  keys.forEach(key => propertyKeys.add(key));
  assets.push({
    ...common, id, name: property.address, issuer: 'Lofty Marketplace', assetClass: 'Tokenized real estate',
    structure: 'Property-specific ownership token identified by Lofty', cohort: 'Lofty property listings',
    source, sourceLabel: 'Lofty official property listing', network: 'Algorand', networkAssetId: property.assetId,
    contractEvidence: `https://allo.info/asset/${property.assetId}/token`,
    notes: `Lofty identifies the property token as ${property.assetUnit} (Algorand asset ${property.assetId}). Lofty is the listing platform, not necessarily the legal issuer. Title, liquidity, eligibility and market value were not independently verified.`
  });
}
const loftyCount = assets.length;
const isinSeen = new Set();
const robinhood = read(robinhoodFile).assets;
const priorRobinhoodContracts = new Set(prior.filter(row => row.cohort === 'Robinhood issuer API').map(row => row.contractAddress.toLowerCase()));
for (const row of robinhood) {
  if (row.deployments.some(d => d.chainId === 4663 && priorRobinhoodContracts.has(d.contractAddress.toLowerCase()))) isinSeen.add(row.isin);
}
for (const row of robinhood) {
  const id = `robinhood-${row.tokenSymbol.toLowerCase()}`;
  const deployments = row.deployments.filter(d => d.chainId === 4663 && /^0x[a-f0-9]{40}$/i.test(d.contractAddress));
  if (row.status !== 'ASSET_STATUS_ACTIVE' || !row.tokenName.endsWith(' • Robinhood Token') ||
      !/^[A-Z]{2}[A-Z0-9]{9}[0-9]$/.test(row.isin) || deployments.length !== 1 || ids.has(id) || isinSeen.has(row.isin)) continue;
  const { chainId, contractAddress } = deployments[0];
  if (contracts.has(contractAddress.toLowerCase())) continue;
  ids.add(id);
  isinSeen.add(row.isin);
  contracts.add(contractAddress.toLowerCase());
  assets.push({
    ...common, id, name: `${row.tokenSymbol} - ${row.tokenName.replace(/ • Robinhood Token$/, '')}`,
    issuer: 'Robinhood Assets (Jersey) Limited', assetClass: 'Tokenized securities',
    structure: 'Robinhood tokenized debt security; Robinhood Chain contract in official API',
    cohort: 'Robinhood November issuer API', source: robinhoodSource, sourceLabel: 'Robinhood official stock-token API',
    chainId, contractAddress, contractEvidence: `https://robinhoodchain.blockscout.com/address/${contractAddress}`,
    underlyingIsin: row.isin,
    notes: 'Marked active in the issuer API when reviewed. Trading access, eligibility, reserves and market value were not independently verified.'
  });
}
assert.ok(assets.length >= 50 && assets.length <= 100, `Outside release range: ${assets.length}`);
const selection = `${loftyCount} distinct Lofty property tokens identified in individual marketplace listings and ${assets.length - loftyCount} additional Robinhood Stock Tokens from its official API, reviewed 4 November 2026. Identification only; no market values or independent trading verification.`;
fs.writeFileSync('data/issuer-additions-november4.json', JSON.stringify({ selection, assets: assets.sort((a, b) => a.id.localeCompare(b.id)) }, null, 2) + '\n');
console.log(selection);
