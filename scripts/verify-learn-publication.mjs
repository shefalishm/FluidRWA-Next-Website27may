import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { createHash } from 'node:crypto';

const origin = process.argv[2] || 'http://127.0.0.1:3018';
const mod = { exports: {} };
vm.runInNewContext(ts.transpileModule(fs.readFileSync('lib/learn-researched-tutorials.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, mod);
const articles = mod.exports.researchedTutorials;
async function get(path) {
  const response = await fetch(`${origin}${path}`);
  assert.equal(response.status, 200, `${path}: HTTP ${response.status}`);
  return response.text();
}
const index = await get('/learn');
const sitemap = await get('/sitemap.xml');
const internal = new Set();
for (const article of articles) {
  const path = `/learn/${article.slug}`;
  const html = await get(path);
  assert.ok(index.includes(path), `${path}: index listing`);
  assert.ok(sitemap.includes(`https://www.fluidrwa.com${path}`), `${path}: sitemap`);
  assert.ok(html.includes(`rel="canonical" href="https://www.fluidrwa.com${path}"`), `${path}: canonical`);
  assert.ok(html.includes(article.description), `${path}: description`);
  assert.ok(html.includes('property="og:type" content="article"'), `${path}: Open Graph`);
  for (const section of article.sections) assert.ok(html.includes(`id="${section.id}"`), `${path}: ${section.id}`);
  for (const script of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) JSON.parse(script[1]);
  assert.ok(html.includes('"@type":"Article"') && html.includes('"@type":"FAQPage"'), `${path}: schema`);
  const desktop = await get(article.illustration.src);
  const mobile = await get(article.illustration.src.replace('.svg', '-mobile.svg'));
  assert.ok(desktop.includes('<svg') && mobile.includes('<svg'));
  for (const section of article.sections) for (const link of section.links || []) if (link.href.startsWith('/')) internal.add(link.href.split('#')[0]);
  internal.add(article.relatedHref);
  console.log(`PASS ${origin}${path}: article, metadata, index, sitemap, sections, schema and both illustrations`);
}
for (const path of internal) await get(path);
const download = await get('/learn-assets/circle-wallet-lab.mjs');
const hash = value => createHash('sha256').update(value).digest('hex');
assert.equal(hash(download), hash(fs.readFileSync('public/learn-assets/circle-wallet-lab.mjs')), 'Published lab must match tested source');
console.log(`PASS ${internal.size} internal destinations and exact downloadable lab checksum.`);
