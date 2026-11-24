import assert from 'node:assert/strict';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { enhanceGrowthMarketingCategory, growthFaq } from './lib/growth-marketing-category.mjs';
const {parse}=createRequire(import.meta.url)('next/dist/compiled/node-html-parser');
const file='vendors/growth-marketing/index.html';
const source=fs.readFileSync(file,'utf8');
assert.equal(enhanceGrowthMarketingCategory(source),source,'Generator is idempotent');
const before=parse(execFileSync('git',['show',`e30b629:${file}`],{encoding:'utf8'}));
assert.equal(parse(source).querySelector('#brands-essential').toString(),before.querySelector('#brands-essential').toString(),'Preserve client listing exactly');
let html=source;
if(process.argv[2]){const r=await fetch(new URL('/vendors/growth-marketing-companies',process.argv[2]),{signal:AbortSignal.timeout(30000)});assert.equal(r.status,200);html=await r.text();}
const root=parse(html),main=root.querySelector('main');
const cards=main.querySelectorAll('.bc-company-card,.bc-provider-card');
assert.equal(cards.length,32);
assert.equal(new Set(cards.map(c=>c.id)).size,32);
for(const grid of main.querySelectorAll('.bc-company-grid')){const names=grid.querySelectorAll('h3').map(h=>h.text.trim());assert.deepEqual(names,[...names].sort((a,b)=>a.localeCompare(b,'en')));}
assert.equal(root.querySelector('h1').text,'Web3 Marketing Agencies');
const allowed=['support.google.com','about.ads.microsoft.com','www.ftc.gov','www.fca.org.uk'];
for(const a of main.querySelectorAll('a')){const href=a.getAttribute('href')||'';if(href.startsWith('https:'))assert.ok(allowed.includes(new URL(href).hostname),`Unexpected outbound link ${href}`);if(href.startsWith('#'))assert.ok(root.querySelector(href),`Anchor ${href}`);}
assert.ok(!main.text.includes('\u2014'));
assert.ok(!/\$\s*\d/.test(main.text));
assert.equal(main.querySelectorAll('.bc-company-card .bc-vetted-badge').length,0);
assert.ok(main.text.split(/\s+/).length>3500);
const graph=root.querySelectorAll('script[type="application/ld+json"]').flatMap(s=>{const j=JSON.parse(s.text);return j['@graph']||[j];});
const list=graph.find(j=>j['@type']==='ItemList');
assert.equal(list.numberOfItems,32);
assert.deepEqual(list.itemListElement.map(x=>x.name),cards.map(c=>c.querySelector('h3').text.trim()));
const faq=graph.find(j=>j['@type']==='FAQPage');assert.equal(faq.mainEntity.length,growthFaq.length);
for(const q of faq.mainEntity){assert.ok(main.text.includes(q.name));assert.ok(main.text.includes(q.acceptedAnswer.text));}
assert.equal(graph.find(j=>j['@type']==='CollectionPage').dateModified,'2026-11-24');
if(process.argv[2])assert.ok(root.querySelector('meta[property="og:image"]').getAttribute('content').endsWith('/growth-marketing-companies-glass-v1.jpg'));
console.log(JSON.stringify({result:'pass',listings:32,faq:growthFaq.length,words:main.text.split(/\s+/).length,vendorBacklinks:0,client:'preserved'}));
