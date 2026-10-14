import fs from 'node:fs';
import sharp from 'sharp';
const snapshot = JSON.parse(fs.readFileSync('data/network-intelligence.json', 'utf8'));
const ramp = JSON.parse(fs.readFileSync('data/ramp-onboarding-dataset.json', 'utf8'));
const candidates = JSON.parse(fs.readFileSync('data/asset-registry-candidates.json', 'utf8'));
const ondoTokenList = JSON.parse(fs.readFileSync('data/issuer-tokenlist-ondo.json', 'utf8'));
const relationships = JSON.parse(fs.readFileSync('data/asset-infrastructure-relationships.json', 'utf8'));
const registry = [
  ...snapshot.assets.map(asset => ({
    id: asset.id, name: asset.name, issuer: asset.issuer, assetClass: asset.category,
    structure: asset.id === 'usdc' ? 'USD-referenced stablecoin' : 'Tokenized government money fund',
    source: asset.source, sourceLabel: asset.sourceLabel, sourceReviewed: snapshot.reviewed,
    notes: asset.notes, reportedValueUsd: asset.value, reportedMetric: asset.metric,
    reportedAsOf: asset.asOf, freshnessDays: asset.freshnessDays,
    contractEvidence: asset.id === 'wtgxx' ? asset.source : null,
    cohort: 'Research profile', sourcePublished: null
  })),
  ...candidates.map(asset => ({ ...asset, cohort: 'Research profile', sourcePublished: null })),
  ...ondoTokenList.assets
].sort((a,b) => a.name.localeCompare(b.name));
if (new Set(registry.map(asset => asset.id)).size !== registry.length) throw new Error('Duplicate registry asset ID');
if (ondoTokenList.assets.length !== 100) throw new Error('Ondo sample must contain exactly 100 records');
const registryUpdated = [...registry.map(asset => asset.sourceReviewed), ...relationships.map(row => row.reviewed)].sort().at(-1);
for (const row of relationships) if (!registry.some(asset => asset.id === row.assetId)) throw new Error(`Unknown asset relationship: ${row.id}`);
const esc = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const cell = value => `"${String(value ?? '').replaceAll('"','""')}"`;
const keys = Object.keys(ramp.rows[0]);
const csv = [keys.map(cell).join(','), ...ramp.rows.map(row => keys.map(k => cell(row[k])).join(','))].join('\r\n');
const vendors = [...new Set(ramp.rows.map(r => r.provider))];
const dimensions = [...new Set(ramp.rows.map(r => r.dimension))];
const logo = `data:image/png;base64,${fs.readFileSync('public/assets/fluidrwa-small-logo.png').toString('base64')}`;
const width=1400,height=950;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="100%" height="100%" fill="#f7faff"/><rect width="100%" height="10" fill="#e8be38"/><image href="${logo}" x="65" y="42" width="175" height="62"/><text x="65" y="157" font-family="Arial" font-size="38" font-weight="700" fill="#162b43">Ramp onboarding evidence map</text><text x="65" y="198" font-family="Arial" font-size="20" fill="#536479">Public documentation cohort · 3 providers · 6 buyer dimensions</text><text x="65" y="233" font-family="Arial" font-size="18" fill="#536479">Observations checked ${ramp.checked} · Research edition ${snapshot.version}</text>
${vendors.map((v,i)=>`<text x="${615+i*280}" y="310" text-anchor="middle" font-family="Arial" font-size="25" font-weight="700" fill="#2169ae">${v}</text>`).join('')}
${dimensions.map((d,i)=>`<rect x="65" y="${334+i*73}" width="1270" height="68" fill="${i%2?'#f0f5fa':'#ffffff'}"/><text x="87" y="${376+i*73}" font-family="Arial" font-size="20" fill="#162b43">${esc(d)}</text>${vendors.map((v,j)=>{const r=ramp.rows.find(r=>r.provider===v&&r.dimension===d);return `<text x="${615+j*280}" y="${376+i*73}" text-anchor="middle" font-family="Arial" font-size="19" fill="${r.observation.startsWith('Not verified:')?'#806a22':'#2169ae'}">${r.observation.startsWith('Not verified:')?'Not verified':'Evidence present'}</text>`;}).join('')}`).join('')}
<text x="65" y="825" font-family="Arial" font-size="18" fill="#536479">Evidence present means documentation was reviewed, not a tested production guarantee.</text><text x="65" y="855" font-family="Arial" font-size="18" fill="#536479">Not verified does not mean a capability is absent. No scores, ranking or exhaustive market coverage.</text><text x="65" y="905" font-family="Arial" font-size="19" fill="#2169ae">fluidrwa.com/network-explorer/research/ramp-onboarding</text></svg>`;
for (const root of ['assets','public/assets']) {
  fs.mkdirSync(`${root}/datasets`,{recursive:true});fs.mkdirSync(`${root}/infographics`,{recursive:true});
  fs.writeFileSync(`${root}/datasets/network-intelligence.json`,JSON.stringify(snapshot,null,2));
  fs.writeFileSync(`${root}/datasets/network-asset-registry.json`,JSON.stringify({version:registryUpdated,reviewed:registryUpdated,scope:'Research profiles plus a 100-record alphabetical sample from Ondo’s dated official Ethereum token list; not a complete market census or comparable global market total.',issuerListSelection:ondoTokenList.selection,assets:registry,relationships},null,2));
  fs.writeFileSync(`${root}/datasets/network-infrastructure-relationships.json`,JSON.stringify({version:registryUpdated,reviewed:registryUpdated,scope:'Named service relationships in reviewed primary material; not a complete market census or endorsement.',relationships},null,2));
  fs.writeFileSync(`${root}/datasets/network-infrastructure-relationships.csv`,[Object.keys(relationships[0]).map(cell).join(','),...relationships.map(row => Object.keys(relationships[0]).map(key => cell(row[key])).join(','))].join('\r\n'));
  fs.writeFileSync(`${root}/datasets/network-ramp-evidence.csv`,csv);
  await sharp(Buffer.from(svg)).png().toFile(`${root}/infographics/network-ramp-evidence.png`);
}
console.log(`Built ${registry.length}-asset registry, ${relationships.length} sourced service roles, ${ramp.rows.length}-row ramp CSV and branded PNG`);
