import fs from 'node:fs';
import sharp from 'sharp';
const snapshot = JSON.parse(fs.readFileSync('data/network-intelligence.json', 'utf8'));
const ramp = JSON.parse(fs.readFileSync('data/ramp-onboarding-dataset.json', 'utf8'));
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
  fs.writeFileSync(`${root}/datasets/network-ramp-evidence.csv`,csv);
  await sharp(Buffer.from(svg)).png().toFile(`${root}/infographics/network-ramp-evidence.png`);
}
console.log(`Built source-linked snapshot, ${ramp.rows.length}-row CSV and branded PNG`);
