import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import sharp from 'sharp';

const root = process.cwd();
const data = JSON.parse(fs.readFileSync(path.join(root, 'data/research/tokenized-fund-infrastructure-2026-10-v1.json'), 'utf8'));
const stem = `tokenized-fund-infrastructure-${data.version}`;
const sources = new Map(data.sources.map(s => [s.id, s]));
const roleIds = data.roles.map(r => r.id);
assert.equal(data.funds.length, 20);
assert.equal(new Set(data.funds.map(f => f.id)).size, data.funds.length);
assert.equal(sources.size, data.sources.length);
for (const source of data.sources) {
  assert.equal(new URL(source.url).protocol, 'https:');
  assert.equal(source.checked, data.checked);
  assert.ok(!source.published || source.published <= source.checked);
}
for (const fund of data.funds) {
  assert.ok(fund.sources.length && fund.note);
  assert.ok(fund.sources.every(id => sources.has(id)));
  assert.equal(new Set(fund.claims.map(c => c.role)).size, fund.claims.length);
  for (const claim of fund.claims) {
    assert.ok(roleIds.includes(claim.role) && fund.sources.includes(claim.source));
    assert.ok(claim.provider && claim.scope);
  }
}
const coverage = data.roles.map(role => ({ ...role, named: data.funds.filter(f => f.claims.some(c => c.role === role.id)).length, denominator: data.funds.length }));
const structures = [...new Set(data.funds.map(f => f.structure))].map(label => ({ label, count: data.funds.filter(f => f.structure === label).length }));
const stats = { version: data.version, checked: data.checked, products: data.funds.length, sources: data.sources.length, observations: data.funds.length * roleIds.length, namedObservations: data.funds.reduce((n, f) => n + f.claims.length, 0), coverage, structures, allFour: data.funds.filter(f => f.claims.length === roleIds.length).length };
const quote = value => `"${String(value ?? '').replaceAll('"', '""')}"`;
const columns = ['edition','checked','product_id','ticker','product','structure','family','role','evidence_status','provider','documented_scope','source_url','source_publication_date','source_locator','reviewed_sources','limits'];
const rows = data.funds.flatMap(fund => data.roles.map(role => {
  const claim = fund.claims.find(c => c.role === role.id);
  const source = claim && sources.get(claim.source);
  return [data.version, data.checked, fund.id, fund.ticker, fund.name, fund.structure, fund.family, role.label, claim ? 'Named in reviewed source' : 'Not verified', claim?.provider, claim?.scope, source?.url, source?.published, source?.locator, fund.sources.map(id => sources.get(id).url).join(' | '), `${fund.note} ${claim ? '' : data.unknownMeaning}`.trim()];
}));
assert.equal(rows.length, 80);
const outputs = new Map([
  [`data/research/${stem}-summary.json`, `${JSON.stringify(stats, null, 2)}\n`],
  [`public/assets/datasets/${stem}.json`, `${JSON.stringify({ ...data, statistics: stats }, null, 2)}\n`],
  [`public/assets/datasets/${stem}.csv`, `${[columns, ...rows].map(row => row.map(quote).join(',')).join('\r\n')}\r\n`]
]);
const esc = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const text = (x,y,s,size=25,color='#16304b',weight=400) => `<text x="${x}" y="${y}" font-family="Arial, sans-serif" font-size="${size}" fill="${color}" font-weight="${weight}">${esc(s)}</text>`;
function frame(width, height, title, subtitle, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="${width}" height="${height}" fill="#fff"/><rect width="${width}" height="12" fill="#f4d64e"/>${text(44,66,'FLUIDRWA / OCTOBER 2026 BASELINE',20,'#2467aa',700)}${text(44,123,title,width===780?30:40,'#16304b',700)}${text(44,166,subtitle,width===780?19:24,'#526274')}${body}<line x1="44" y1="${height-98}" x2="${width-44}" y2="${height-98}" stroke="#cfdce8"/>${text(44,height-62,'20-product purposive sample. Not market coverage or provider quality.',width===780?17:21)}${text(44,height-28,`fluidrwa.com/network-explorer/research | Checked 21 Oct 2026 | ${data.version}`,width===780?15:19,'#526274')}</svg>`;
}
for (const mobile of [false,true]) {
  const width = mobile?780:1400;
  const suffix = mobile?'-mobile':'';
  let body = '';
  coverage.forEach((role,i) => {
    const y = 238+i*144;
    body += text(44,y,role.label,mobile?25:29,'#16304b',700);
    body += `<rect x="44" y="${y+24}" width="${width-190}" height="32" fill="#eaf1f7"/><rect x="44" y="${y+24}" width="${(width-190)*role.named/20}" height="32" fill="#2467aa"/>`;
    body += text(width-123,y+49,`${role.named}/20`,26,'#16304b',700);
  });
  body += text(44,840,'Named roles in reviewed sources; unknown is not absent.',mobile?21:25,'#526274');
  outputs.set(`public/assets/infographics/${stem}-coverage${suffix}.png`,await sharp(Buffer.from(frame(width,1000,'Who is named for each responsibility?','Four role groups. Exact functions retained in the dataset.',body))).png().toBuffer());
  body = '';
  const labels = ['Custody','Admin','Transfer','Records'];
  const colStart = mobile?350:660;
  const colWidth = mobile?94:162;
  labels.forEach((label,i) => { body += text(colStart+i*colWidth,224,label,mobile?17:23,'#526274',700); });
  data.funds.forEach((fund,i) => {
    const y = 270+i*49;
    body += text(44,y,fund.ticker,24,'#16304b',700);
    if (!mobile) body += text(200,y,fund.family,21,'#526274');
    data.roles.forEach((role,j) => {
      const named=fund.claims.some(c=>c.role===role.id);
      const x=colStart+j*colWidth;
      body += `<rect x="${x}" y="${y-24}" width="${mobile?68:112}" height="33" rx="3" fill="${named?'#2467aa':'#eaf1f7'}"/>${text(x+9,y,named?'Named':'N/V',mobile?17:21,named?'#fff':'#526274')}`;
    });
  });
  body += text(44,1300,'N/V = Not verified in this edition’s reviewed sources.',mobile?20:24,'#526274');
  body += text(44,1338,'Launch evidence does not confirm a current appointment.',mobile?20:24,'#526274');
  outputs.set(`public/assets/infographics/${stem}-matrix${suffix}.png`,await sharp(Buffer.from(frame(width,1480,'The 20-product evidence map','Not a completeness ranking. See source dates and scope.',body))).png().toBuffer());
  body = '';
  structures.forEach((row,i) => {
    const y=245+i*160;
    body += text(44,y,row.label,mobile?27:31,'#16304b',700);
    body += `<rect x="44" y="${y+25}" width="${width-190}" height="34" fill="#eaf1f7"/><rect x="44" y="${y+25}" width="${(width-190)*row.count/20}" height="34" fill="${i===1?'#e0ba28':'#2467aa'}"/>${text(width-123,y+51,`${row.count}/20`,26,'#16304b',700)}`;
  });
  body += text(44,770,'Four Spiko rows share one SICAV. Feeders are separate',mobile?21:25,'#526274');
  body += text(44,807,'from underlying funds; deployments are never extra funds.',mobile?21:25,'#526274');
  outputs.set(`public/assets/infographics/${stem}-sample${suffix}.png`,await sharp(Buffer.from(frame(width,980,'What exactly did we count?','Products, not issuers, unique mandates or market size.',body))).png().toBuffer());
}
for (const [file,content] of outputs) {
  const full=path.join(root,file);
  if (process.argv.includes('--check')) assert.ok(fs.existsSync(full) && Buffer.from(fs.readFileSync(full)).equals(Buffer.from(content)),`Stale report output: ${file}`);
  else { fs.mkdirSync(path.dirname(full),{recursive:true}); fs.writeFileSync(full,content); }
}
console.log(JSON.stringify({ ...stats, outputs: outputs.size },null,2));
