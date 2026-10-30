import fs from 'node:fs';

const registry = JSON.parse(fs.readFileSync('public/assets/datasets/network-asset-registry.json'));
const backed = JSON.parse(fs.readFileSync('/tmp/fluid-xstocks-tokenlist/tokenlist.json'));
const ondo = JSON.parse(fs.readFileSync('/tmp/fluid-ondo-tokenlist/tokenlist.json'));
const ids = new Set(registry.assets.map(row => row.id));
const addresses = new Set(registry.assets.filter(row => row.chainId && row.contractAddress).map(row => `${row.chainId}:${row.contractAddress.toLowerCase()}`));
const common = {sourceReviewed:'2026-10-30', reportedValueUsd:null, reportedMetric:null, reportedAsOf:null, freshnessDays:7};
const assets = [];
for (const token of [...backed.tokens].sort((a,b) => (a.chainId === 1 ? -1 : 1) - (b.chainId === 1 ? -1 : 1))) {
  const id = `backed-${token.symbol.toLowerCase()}`;
  const key = `${token.chainId}:${token.address.toLowerCase()}`;
  if (!token.tags?.includes('xStocks') || !token.name.endsWith('xStock') || !/^0x[0-9a-f]{40}$/i.test(token.address) || ids.has(id) || addresses.has(key)) continue;
  ids.add(id); addresses.add(key);
  assets.push({...common, id, name:`${token.symbol} - ${token.name.replace(/ xStock$/, '')}`, issuer:'Backed Assets (JE) Limited', assetClass:'Tokenized securities', structure:'Issuer-listed xStock token; legal rights require product documentation', cohort:'xStocks additional issuer references', source:'https://github.com/backed-fi/cowswap-xstocks-tokenlist/blob/401edae9acf8e14152825864b974635e802ac948/tokenlist.json', sourceLabel:'Backed official xStocks token list', sourcePublished:backed.timestamp.slice(0,10), notes:'The issuer list identifies this token and chain. Current trading, legal rights, eligibility, reserves and market value were not independently verified.', chainId:token.chainId, contractAddress:token.address, contractEvidence:token.chainId === 1 ? `https://etherscan.io/token/${token.address}` : null});
}
for (const token of ondo.tokens) {
  const id = `ondo-${token.symbol.toLowerCase()}`;
  const key = `${token.chainId}:${token.address.toLowerCase()}`;
  if (token.chainId !== 1 || !token.tags?.includes('oip') || ids.has(id) || addresses.has(key)) continue;
  ids.add(id); addresses.add(key);
  assets.push({...common, id, name:`${token.symbol} - ${token.name}`, issuer:'Ondo Finance', assetClass:'Tokenized securities', structure:'Issuer-listed portfolio token; legal structure requires product documentation', cohort:'Ondo portfolio issuer references', source:'https://github.com/ondoprotocol/ondo-global-markets-token-list/blob/a857ae3573576d0b9992a2867132941de9c651b4/tokenlist.json', sourceLabel:'Ondo official token list', sourcePublished:ondo.timestamp.slice(0,10), notes:'The issuer list identifies this portfolio token and Ethereum address. Current trading, legal rights, investor eligibility and market value were not independently verified.', chainId:1, contractAddress:token.address, contractEvidence:`https://etherscan.io/token/${token.address}`});
}
if (assets.length !== 47) throw new Error(`Expected 47 distinct issuer references, found ${assets.length}`);
fs.writeFileSync('data/issuer-additions-october30.json', JSON.stringify({selection:'40 additional xStocks and 7 Ondo portfolio tokens from pinned issuer lists. Identification only; trading, rights, valuations and eligibility are not independently verified.', assets},null,2)+'\n');
console.log(`Prepared ${assets.length} issuer references`);
