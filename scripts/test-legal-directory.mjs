import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import { enhanceLegalCategory } from './lib/legal-category.mjs';
const require = createRequire(import.meta.url);
const { parse } = require('next/dist/compiled/node-html-parser');
const file = 'vendors/legal-regulatory/index.html';
const source = fs.readFileSync(file,'utf8');
assert.equal(enhanceLegalCategory(source), source, 'Generator must be idempotent');
const origin = process.argv[2];
let html = source;
if (origin) {
 const res = await fetch(new URL('/vendors/legal-regulatory-vendors',origin),{signal:AbortSignal.timeout(30000)});
 assert.equal(res.status,200); html = await res.text();
}
const root = parse(html);
const cards = root.querySelectorAll('.bc-company-card');
assert.equal(cards.length,30);
const names = cards.map(x=>x.querySelector('h3').text.trim());
assert.deepEqual(names,[...names].sort((a,b)=>a.localeCompare(b,'en')));
assert.equal(new Set(names).size,30);
assert.ok(names.includes('Skadden'));
assert.ok(names.includes('Ashurst Perkins Coie'));
assert.ok(!names.includes('Perkins Coie'));
assert.equal(root.querySelector('h1').text,'Crypto and Web3 Law Firms');
for(const id of ['perkins-coie','legal-mandates','legal-jurisdictions','legal-rfp','legal-handover']) assert.ok(root.querySelector(`#${id}`),id);
const main = root.querySelector('main');
for(const a of main.querySelectorAll('a')) {
 const href = a.getAttribute('href') || '';
 if(href.startsWith('#')) assert.ok(root.querySelector(href),`Missing anchor ${href}`);
 if(href.startsWith('http')) assert.ok(['www.sra.org.uk','register.fca.org.uk','www.esma.europa.eu'].includes(new URL(href).hostname),`Vendor backlink ${href}`);
}
assert.equal(cards.flatMap(x=>x.querySelectorAll('.bc-vetted-badge')).length,0);
assert.ok(!main.text.includes('\u2014'));
assert.ok(!/\$\s*\d/.test(main.text));
assert.ok(main.text.split(/\s+/).length>3000);
const graph = root.querySelectorAll('script[type="application/ld+json"]').flatMap(s=>{const d=JSON.parse(s.text);return d['@graph']||[d];});
const list=graph.find(x=>x['@type']==='ItemList');
assert.equal(list.numberOfItems,30);
assert.deepEqual(list.itemListElement.map(x=>x.name),names);
assert.equal(graph.find(x=>x['@type']==='FAQPage').mainEntity.length,8);
assert.equal(graph.find(x=>x['@type']==='CollectionPage').dateModified,'2026-11-24');
const article='content/blog/tokenization-law-firms-rwa-projects.md';
assert.equal(fs.readFileSync(article,'utf8'),execFileSync('git',['show',`3f73441:${article}`],{encoding:'utf8'}),'Published tokenization article must remain unchanged');
console.log(JSON.stringify({result:'pass',firms:30,faq:8,words:main.text.split(/\s+/).length,tokenizationArticle:'unchanged',vendorBacklinks:0}));
