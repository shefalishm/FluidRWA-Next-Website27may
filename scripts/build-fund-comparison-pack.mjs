import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import sharp from 'sharp';
import assert from 'node:assert/strict';

const report = JSON.parse(fs.readFileSync('data/research/tokenized-fund-infrastructure-2026-10-v2.json', 'utf8'));
const api = {};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('lib/fund-comparison.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText, {
  exports: api, URLSearchParams, require(name) { if (name === '@/data/research/tokenized-fund-infrastructure-2026-10-v2.json') return report; throw new Error(name); }
});
const stem = api.comparisonEdition;
const selected = ['fobxx', 'spiko-ustbl', 'wtgxx'].map(id => report.funds.find(fund => fund.id === id));
const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
function text(x, y, value, size = 24, color = '#17304a', weight = 400) { return `<text x="${x}" y="${y}" font-family="Arial,sans-serif" font-size="${size}" fill="${color}" font-weight="${weight}">${esc(value)}</text>`; }
function wrap(value, max) {
  const rows = []; let line = '';
  for (const word of value.split(' ')) { if (line && (line + ' ' + word).length > max) { rows.push(line); line = word; } else line = line ? line + ' ' + word : word; }
  if (line) rows.push(line); return rows;
}
function lines(x, y, value, max, size = 24, color = '#17304a', weight = 400) { return wrap(value, max).map((row, index) => text(x, y + index * size * 1.4, row, size, color, weight)).join(''); }
function save(file, data) {
  if (process.argv.includes('--check')) assert.ok(fs.existsSync(file) && fs.readFileSync(file).equals(Buffer.from(data)), `Stale comparison asset: ${file}`);
  else fs.writeFileSync(file, data);
}
save(`public/assets/datasets/${stem}.csv`, api.comparisonCsv(report.funds.map(fund => fund.id)));
save(`public/assets/datasets/${stem}.json`, JSON.stringify({ ...report, comparisonPage: api.comparisonUrl, citationText: api.comparisonCitation }, null, 2) + '\n');
for (const mobile of [false, true]) {
  const width = mobile ? 780 : 1440, height = mobile ? 2590 : 1550;
  let body = `<rect width="${width}" height="${height}" fill="#fff"/><rect x="40" y="28" width="60" height="6" fill="#edcd42"/>`;
  body += text(40, 78, 'FLUIDRWA / FUND OPERATING MODELS', mobile ? 25 : 23, '#2467aa', 700);
  body += lines(40, 140, 'Who does what behind a tokenized fund?', mobile ? 28 : 60, mobile ? 39 : 42, '#17304a', 700);
  body += lines(40, mobile ? 270 : 215, 'A documented comparison of FOBXX, Spiko USTBL and WTGXX. Documents checked 21 October 2026.', mobile ? 48 : 105, mobile ? 25 : 24, '#536479');
  if (!mobile) {
    const left = 40, labelWidth = 260, colWidth = 350, start = 330;
    body += `<rect x="40" y="${start - 48}" width="1360" height="85" fill="#edf4fa"/>`;
    selected.forEach((fund, i) => { body += text(left + labelWidth + i * colWidth + 16, start, fund.ticker, 29, '#2467aa', 700); });
    report.roles.forEach((role, index) => {
      const y = 410 + index * 225;
      body += `<line x1="40" x2="1400" y1="${y - 25}" y2="${y - 25}" stroke="#d7e1ea"/>`;
      body += lines(40, y + 10, role.label, 19, 25, '#17304a', 700);
      selected.forEach((fund, i) => {
        const claim = fund.claims.find(claim => claim.role === role.id), x = left + labelWidth + i * colWidth + 16;
        body += lines(x, y + 10, claim?.provider || 'Not identified in reviewed sources', 25, 23, claim ? '#17304a' : '#64758a', claim ? 700 : 400);
        if (claim) body += lines(x, y + 115, claim.scope, 31, 20, '#536479');
      });
    });
  } else {
    selected.forEach((fund, i) => {
      const y = 410 + i * 620;
      body += `<line x1="40" x2="740" y1="${y - 35}" y2="${y - 35}" stroke="#d7e1ea"/>` + text(40, y, fund.ticker, 38, '#2467aa', 700);
      report.roles.forEach((role, j) => {
        const rowY = y + 65 + j * 123, claim = fund.claims.find(claim => claim.role === role.id);
        body += text(40, rowY, role.label, 24, '#536479', 700);
        body += lines(40, rowY + 39, claim?.provider || 'Not identified in reviewed sources', 43, 28, claim ? '#17304a' : '#64758a');
      });
    });
  }
  const footerY = mobile ? 2310 : 1350;
  body += `<line x1="40" x2="${width - 40}" y1="${footerY - 26}" y2="${footerY - 26}" stroke="#d7e1ea"/>`;
  body += lines(40, footerY + 8, 'Unknown does not mean absent. These are selected documented arrangements, not a market ranking or confirmation of current appointments. Spiko USTBL is a SICAV sub-fund; its appointments are shared.', mobile ? 49 : 114, mobile ? 24 : 22, '#536479');
  body += text(40, height - 58, `Source: FluidRWA Research / ${report.version}`, mobile ? 24 : 22, '#2467aa', 700);
  body += text(40, height - 23, 'fluidrwa.com/network-explorer/fund-comparison', mobile ? 23 : 22, '#2467aa');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${body}</svg>`;
  save(`public/assets/infographics/${stem}${mobile ? '-mobile' : ''}.png`, await sharp(Buffer.from(svg)).png().toBuffer());
}
console.log('Fund comparison pack: exact frozen research data, shared CSV builder, desktop/mobile PNG and sourced JSON.');
