import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const dataset = JSON.parse(fs.readFileSync(new URL('../data/ramp-onboarding-dataset.json', import.meta.url), 'utf8'));
const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
export function renderRampDataset() {
  return `<section aria-label="Sourced ramp onboarding dataset"><h2>Ramp onboarding evidence: 18 observations</h2><p>${esc(dataset.method)} Last checked: ${dataset.checked}. Company documentation establishes what the provider documents, not independent validation or production eligibility. "Not verified" means evidence remains unresolved, not that a feature is absent.</p>${['MoonPay', 'Transak', 'Banxa'].map(provider => `<h3>${provider}</h3><div class="research-table-wrap" tabindex="0" role="region" aria-label="${provider} onboarding evidence"><table class="research-table"><thead><tr><th scope="col">Buyer task</th><th scope="col">Documented observation and scope</th><th scope="col">Unresolved question</th><th scope="col">Primary source</th></tr></thead><tbody>${dataset.rows.filter(row => row.provider === provider).map(row => `<tr><th scope="row">${esc(row.dimension)}</th><td>${esc(row.observation)}<br><small>Scope: ${esc(row.scope)}</small></td><td>${esc(row.unknown)}</td><td><a href="${esc(row.source)}" target="_blank" rel="noopener noreferrer">${provider} documentation</a><br><small>Checked ${row.checked}</small></td></tr>`).join('')}</tbody></table></div>`).join('')}</section>`;
}

function lines(text, limit) {
  const result = []; let line = '';
  for (const word of text.split(/\s+/)) {
    if (line && (line + ' ' + word).length > limit) { result.push(line); line = word; }
    else line += (line ? ' ' : '') + word;
  }
  if (line) result.push(line);
  return result;
}
function textBlock(text, x, y, size, limit, color = '#18304c', weight = 400) {
  return `<text x="${x}" y="${y}" fill="${color}" font-family="Arial, sans-serif" font-size="${size}" font-weight="${weight}">${lines(text, limit).map((line, i) => `<tspan x="${x}" dy="${i ? size * 1.4 : 0}">${esc(line)}</tspan>`).join('')}</text>`;
}
export async function buildDatasetAssets() {
  const sharp = (await import('sharp')).default;
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const base = 'moonpay-transak-banxa-onboarding-dataset';
  const columns = ['provider', 'dimension', 'observation', 'scope', 'unknown', 'source', 'checked'];
  const quote = value => `"${String(value).replaceAll('"', '""')}"`;
  const csv = '\ufeff' + [columns.join(','), ...dataset.rows.map(row => columns.map(key => quote(row[key])).join(','))].join('\r\n') + '\r\n';
  for (const folder of ['assets/datasets', 'public/assets/datasets']) {
    fs.mkdirSync(path.join(root, folder), {recursive:true}); fs.writeFileSync(path.join(root, folder, `${base}.csv`), csv);
  }
  for (const mobile of [false, true]) {
    const width = mobile ? 900 : 1600;
    const height = mobile ? 5000 : 2250;
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="#ffffff"/><rect width="100%" height="14" fill="#ffe16b"/>`;
    svg += textBlock('FluidRWA | Documentation comparison', 48, 72, mobile ? 30 : 28, 65, '#2468ac', 700);
    svg += textBlock('Ramp onboarding',48,140,mobile ? 48 : 60,45,'#10233e',700);
    svg += textBlock('MoonPay / Transak / Banxa',48,205,mobile ? 36 : 40,45,'#10233e',700);
    svg += textBlock('Checked 7 October 2026. Not a ranking or a performance test.',48,267,mobile ? 25 : 28,mobile ? 55 : 95);
    const dimensions = [...new Set(dataset.rows.map(row => row.dimension))];
    if (!mobile) {
      const cw = 484;
      ['MoonPay','Transak','Banxa'].forEach((provider,p) => {
        const x = 48 + p * 500;
        svg += `<rect x="${x}" y="310" width="${cw}" height="66" fill="#2468ac"/>` + textBlock(provider,x+22,355,34,25,'#fff',700);
        dimensions.forEach((dimension,d) => {
          const row = dataset.rows.find(row => row.provider===provider && row.dimension===dimension); const y = 390 + d * 280;
          svg += `<rect x="${x}" y="${y}" width="${cw}" height="266" fill="${d % 2 ? '#f4f8fc' : '#edf4fb'}"/>`;
          svg += textBlock(dimension,x+22,y+40,25,31,'#2468ac',700);
          svg += textBlock(row.observation,x+22,y+83,25,32);
        });
      });
    } else {
      ['MoonPay','Transak','Banxa'].forEach((provider,p) => {
        const y = 350 + p * 1450;
        svg += `<rect x="48" y="${y}" width="804" height="70" fill="#2468ac"/>` + textBlock(provider,70,y+47,36,40,'#fff',700);
        dimensions.forEach((dimension,d) => {
          const row = dataset.rows.find(row => row.provider===provider && row.dimension===dimension); const cy = y + 84 + d * 224;
          svg += `<rect x="48" y="${cy}" width="804" height="210" fill="${d % 2 ? '#f4f8fc' : '#edf4fb'}"/>`;
          svg += textBlock(dimension,70,cy+36,29,49,'#2468ac',700);
          svg += textBlock(row.observation,70,cy+78,29,49);
        });
      });
    }
    const foot = mobile ? 4800 : 2130;
    svg += textBlock('Company evidence only. Availability and contractual responsibilities need verification.',48,foot,mobile ? 25 : 27,mobile ? 56 : 101);
    svg += textBlock('Read the sourced HTML table / download the CSV for scope, links and unresolved questions.',48,foot+82,mobile ? 25 : 27,mobile ? 56 : 101);
    svg += '</svg>';
    const buffer = await sharp(Buffer.from(svg)).png({compressionLevel:9}).toBuffer();
    for (const folder of ['assets/infographics','public/assets/infographics']) {
      fs.mkdirSync(path.join(root,folder),{recursive:true}); fs.writeFileSync(path.join(root,folder,`${base}${mobile ? '-mobile' : ''}.png`),buffer);
    }
  }
  let guide = '<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900"><rect width="1600" height="900" fill="#f4f8fc"/><rect width="1600" height="14" fill="#ffe16b"/>';
  guide += textBlock('FluidRWA | Buyer framework',60,80,30,80,'#2468ac',700);
  guide += textBlock('Choose an operating model, not just a logo.',60,165,46,65,'#10233e',700);
  const models = [
    ['Hosted checkout','Branding scope','Ask which screens, domains and disclosures can change.'],
    ['API-led integration','Workflow ownership','Ask which actions, callbacks and recovery paths your team implements.'],
    ['White-label arrangement','Contractual scope','Ask who operates onboarding, funds, settlement and support under your brand.']
  ];
  models.forEach(([title,label,question],i) => {
    const x = 60 + i * 500;
    guide += `<rect x="${x}" y="245" width="470" height="440" fill="#fff"/><rect x="${x}" y="245" width="470" height="10" fill="#2468ac"/>`;
    guide += textBlock(title,x+24,310,32,23,'#10233e',700);
    guide += textBlock(label,x+24,425,28,26,'#2468ac',700);
    guide += textBlock(question,x+24,485,30,25);
  });
  guide += textBlock('Procurement guidance, not vendor scores. Verify product scope and responsibilities in writing.',60,770,28,100);
  guide += textBlock('Reviewed by FluidRWA Research Team | 7 October 2026',60,835,27,100);
  guide += '</svg>';
  const guideBuffer = await sharp(Buffer.from(guide)).png({compressionLevel:9}).toBuffer();
  for (const folder of ['assets/infographics','public/assets/infographics']) fs.writeFileSync(path.join(root,folder,'white-label-payment-operating-models.png'),guideBuffer);
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await buildDatasetAssets();
