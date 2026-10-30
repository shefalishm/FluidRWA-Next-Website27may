import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import ts from 'typescript';
import sharp from 'sharp';

const report = JSON.parse(fs.readFileSync('data/research/tokenized-fund-infrastructure-2026-10-v2.json', 'utf8'));
const api = {};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('lib/fund-comparison.ts', 'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText, {exports:api,URLSearchParams,require(name){if(name==='@/data/research/tokenized-fund-infrastructure-2026-10-v2.json')return report;throw new Error(name)}});
const stats = api.fundEvidenceStatistics();
assert.equal(report.funds.length, 26);
const quote = value => `"${String(value).replaceAll('"','""')}"`;
const rows = stats.map(row => ({edition:report.version, responsibility:row.label, named_products:row.named, sampled_products:row.total, not_identified:row.unresolved, share_named_percent:row.percent, source_checks:'21 or 23 October 2026', scope:'Purposefully selected sample; not a market census; unknown is not absent.', evidence:'https://www.fluidrwa.com/assets/datasets/fund-operating-models-2026-10-v2.csv'}));
const keys=Object.keys(rows[0]);
const csv=[keys.map(quote).join(','),...rows.map(row=>keys.map(key=>quote(row[key])).join(','))].join('\r\n')+'\r\n';
const esc = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="950"><rect width="1400" height="950" fill="#fff"/><rect x="68" y="50" width="64" height="7" fill="#efc844"/><text x="68" y="105" font-family="Arial" font-size="25" font-weight="bold" fill="#2067aa">FLUIDRWA RESEARCH / OCTOBER 2026</text><text x="68" y="177" font-family="Arial" font-size="44" font-weight="bold" fill="#142943">Who is named in tokenized fund documents?</text><text x="68" y="223" font-family="Arial" font-size="23" fill="#52647a">Named providers in public documents for 26 selected fund products</text>${stats.map((r,i)=>{const y=305+i*117;return `<text x="68" y="${y}" font-family="Arial" font-size="25" fill="#142943">${esc(r.label)}</text><rect x="510" y="${y-25}" width="590" height="30" rx="4" fill="#e8eff4"/><rect x="510" y="${y-25}" width="${590*r.named/r.total}" height="30" rx="4" fill="${i===3?'#258a82':'#246bb1'}"/><text x="1135" y="${y}" font-family="Arial" font-size="27" font-weight="bold" fill="#142943">${r.named} / ${r.total}</text>`}).join('')}<line x1="68" y1="755" x2="1332" y2="755" stroke="#d8e2e9"/><text x="68" y="805" font-family="Arial" font-size="21" fill="#52647a">Selected sample, not market share. Not identified in reviewed sources does not mean absent.</text><text x="68" y="840" font-family="Arial" font-size="21" fill="#52647a">Checks: 21 or 23 October 2026. Four Spiko sub-funds share umbrella appointments.</text><text x="68" y="905" font-family="Arial" font-size="22" font-weight="bold" fill="#2067aa">fluidrwa.com/network-explorer/fund-comparison</text></svg>`;
const png=await sharp(Buffer.from(svg)).png().toBuffer();
for(const [file,data] of [['public/assets/datasets/fund-evidence-statistics-2026-10-v2.csv',Buffer.from(csv)],['public/assets/infographics/fund-evidence-statistics-2026-10-v2.png',png]]) {
  if(process.argv.includes('--check'))assert.ok(fs.existsSync(file)&&fs.readFileSync(file).equals(data),`Stale statistics file: ${file}`);else fs.writeFileSync(file,data);
}
console.log(`Fund evidence statistics: ${stats.length} documented role counts across ${report.funds.length} products.`);
