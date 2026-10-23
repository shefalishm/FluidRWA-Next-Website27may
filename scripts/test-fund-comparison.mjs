import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const report = JSON.parse(fs.readFileSync('data/research/tokenized-fund-infrastructure-2026-10-v1.json', 'utf8'));
const api = {};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('lib/fund-comparison.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText, {
  exports: api, URLSearchParams, require(name) { if (name.includes('tokenized-fund-infrastructure')) return report; throw new Error(name); }
});
assert.equal(report.funds.length, 20);
assert.equal(api.comparisonRows(report.funds.map(fund => fund.id)).length, 80);
const selected = api.comparisonRows(['fobxx','spiko-ustbl','wtgxx']);
assert.equal(selected.length, 12);
assert.equal(selected.filter(row => row.source_url).length, 8);
assert.equal(selected.filter(row => !row.source_url).length, 4);
assert.ok(selected.every(row => row.documents_checked === '2026-10-21'));
assert.ok(selected.find(row => row.ticker === 'FOBXX' && row.role.includes('custody')).provider_as_documented.includes('Not identified'));
for (const row of selected.filter(row => row.source_url)) assert.ok(report.sources.some(source => source.url === row.source_url));
assert.equal(api.comparisonCsv(report.funds.map(fund => fund.id)), fs.readFileSync(`public/assets/datasets/${api.comparisonEdition}.csv`, 'utf8'));
const custody = api.providerFootprint('custody');
assert.equal(custody.find(row => row.provider.startsWith('BNY')).funds.length, 3);
assert.equal(custody.find(row => row.provider === 'CACEIS Bank').funds.length, 4);
assert.equal(custody.find(row => row.provider === 'CACEIS Bank').families.length, 1);
assert.notEqual(api.providerGroup('CACEIS Bank'), api.providerGroup('CACEIS Fund Administration'));
assert.notEqual(api.providerGroup('Superstate Services LLC'), api.providerGroup('Superstate Advisers LLC'));
assert.notEqual(api.providerGroup('NAV Fund Services'), api.providerGroup('NAV Consulting'));
const link = new URL(api.researchRequest(report.funds.slice(0, 3), 'Fund custody / depositary'), 'https://www.fluidrwa.com');
assert.equal(link.pathname, '/submit-requirement');
assert.equal(link.searchParams.get('source'), 'explorer-fund-comparison');
assert.ok(link.searchParams.get('shortlist').includes('FOBXX'));
assert.ok(link.searchParams.get('shortlist').includes('Fund custody'));
assert.equal(JSON.parse(fs.readFileSync(`public/assets/datasets/${api.comparisonEdition}.json`)).checked, report.checked);
const snapshot = JSON.parse(fs.readFileSync('data/onchain-supply-page-snapshot.json'));
assert.equal(snapshot.series.length, 22);
assert.ok(snapshot.series.every(series => series.observations.every(row => row.day === row.observed_at.slice(0, 10) && /^\d+$/.test(row.raw_supply))));
const route = {};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('app/api/network-explorer/v1/fund-comparison/route.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, {
  exports: route, URL, Response, require(name) { if (name === '@/lib/fund-comparison') return api; throw new Error(name); }
});
const csvResponse = route.GET(new Request('https://www.fluidrwa.com/api/network-explorer/v1/fund-comparison?funds=buidl,ustb,vbdc&format=csv'));
assert.equal(csvResponse.status, 200);
assert.ok(csvResponse.headers.get('content-disposition').startsWith('attachment;'));
assert.equal(await csvResponse.text(), api.comparisonCsv(['buidl', 'ustb', 'vbdc']));
assert.equal((await route.GET(new Request('https://www.fluidrwa.com/api/network-explorer/v1/fund-comparison')).json()).rows.length, 80);
for (const params of ['funds=buidl,buidl','funds=unknown','funds=','format=html']) assert.equal(route.GET(new Request(`https://www.fluidrwa.com/api/network-explorer/v1/fund-comparison?${params}`)).status, 400);
console.log('PASS: fixed 20-fund edition; 80 responsibility checks; unknowns and exact source dates retained; shared CSV; scoped provider counts; legal-entity boundaries; contextual enquiry; dated supply fallback.');
