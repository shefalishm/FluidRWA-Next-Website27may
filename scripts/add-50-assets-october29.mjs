import fs from 'node:fs';
import assert from 'node:assert/strict';

const realt = JSON.parse(fs.readFileSync('/tmp/realt-contract-checks.json', 'utf8'));
const ondo = JSON.parse(fs.readFileSync('/tmp/ondo-oct27.json', 'utf8'));
const prior = JSON.parse(fs.readFileSync('public/assets/datasets/network-asset-registry.json', 'utf8'));
const previousAddresses = new Set(prior.assets.filter(x => x.chainId === 1 && x.contractAddress).map(x => x.contractAddress.toLowerCase()));
assert.equal(parseInt(realt.block, 16), 26296601);
assert.equal(realt.results.length, 25);
assert.equal(ondo.timestamp.slice(0, 10), '2026-10-27');
const base = {sourceReviewed:'2026-10-29', reportedValueUsd:null, reportedMetric:null, reportedAsOf:null, freshnessDays:7, chainId:1};
const properties = realt.results.map(r => {
  const slug = new URL(r.product).pathname.split('/')[2].replace(/^s-/, '').replace(/-\d{5}(?:-\d+)?$/, '').replaceAll('-', ' ').toLowerCase();
  assert.ok(r.name.toLowerCase().replace(/^realtoken s /, '').startsWith(slug), r.path);
  assert.match(r.address, /^0x[0-9a-f]{40}$/i);
  assert.ok(!previousAddresses.has(r.address.toLowerCase()));
  return {...base, id:`realt-property-${r.path.split('/')[2]}`, name:r.name, issuer:'RealT', assetClass:'Tokenized real estate', structure:'Property-linked token reference; legal interest requires offering documents', cohort:'RealT issuer references', source:`https://github.com/real-token/public-datas/blob/703e4139ed44d887e1e298223323e6818f1e0c4a/${r.path}`, sourceLabel:'RealT historical property voting record', sourcePublished:null, notes:'Issuer repository references this property and address. Ethereum name() matched at block 26296601 on 29 October 2026. Current listing, trading, property rights and valuation are not verified; the issuer product page was not independently reviewed.', contractEvidence:`https://etherscan.io/token/${r.address}`, contractAddress:r.address};
});
const fresh = ondo.tokens.filter(t => t.chainId === 1 && t.tags.includes('ondo') && /\(Ondo Tokenized\)$/.test(t.name) && !previousAddresses.has(t.address.toLowerCase()));
assert.equal(fresh.length, 24);
const dollar = ondo.tokens.filter(t => t.chainId === 1 && t.symbol === 'USDon' && t.tags.includes('ondo'));
assert.equal(dollar.length, 1);
const securities = [...fresh, ...dollar].map(t => ({...base, id:`ondo-${t.symbol.toLowerCase()}`, name:`${t.symbol} - ${t.name.replace(/ \(Ondo Tokenized\)$/, '')}`, issuer:'Ondo Finance', assetClass:t.symbol === 'USDon' ? 'Stablecoins' : 'Tokenized securities', structure:t.symbol === 'USDon' ? 'Issuer-listed dollar token; terms not independently verified' : 'Issuer-listed tokenized security; legal and investor rights require offering documents', cohort:'Ondo October 2026 issuer list', source:'https://github.com/ondoprotocol/ondo-global-markets-token-list/blob/a857ae3573576d0b9992a2867132941de9c651b4/tokenlist.json', sourceLabel:'Ondo official token list', sourcePublished:'2026-10-27', notes:t.symbol === 'USDon' ? 'Ondo lists this token and address. A 2025 Cyfrin audit describes USDon as a USD stablecoin; current supply, reserves, peg, redemption and trading are not verified.' : 'Ondo lists this Ethereum address. Current trading, redemption, investor eligibility, underlying rights and USD value have not been independently verified.', contractEvidence:`https://etherscan.io/token/${t.address}`, contractAddress:t.address}));
const assets = [...properties, ...securities];
assert.equal(new Set(assets.map(x => x.id)).size, 50);
assert.equal(new Set(assets.map(x => x.contractAddress.toLowerCase())).size, 50);
assert.ok(assets.every(x => !prior.assets.some(p => p.id === x.id)));
fs.writeFileSync('data/issuer-additions-october29.json', JSON.stringify({selection:'25 RealT historical property references with Ethereum contract names checked at a recorded block; 24 additional Ondo-listed securities and one Ondo dollar token. This is identification, not a market census or verification of current trading or valuation.', chainEvidence:{network:'Ethereum', blockNumber:26296601, blockTimestamp:new Date(parseInt(realt.blockTimestamp,16)*1000).toISOString(), checkedAt:realt.checkedAt, rpc:realt.rpc, method:'eth_call name()'}, assets}, null, 2)+'\n');
