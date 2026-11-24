import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createRequire} from 'node:module';
import {enhanceFiatRampCategory,rampRecords,rampFaq} from './lib/fiat-ramp-category.mjs';
const{parse}=createRequire(import.meta.url)('next/dist/compiled/node-html-parser');
const file='vendors/fiat-on-off-ramps/index.html';
const source=fs.readFileSync(file,'utf8');
assert.equal(enhanceFiatRampCategory(source),source,'Generator must be idempotent');
const before=parse(execFileSync('git',['show',`4c6f1f2:${file}`],{encoding:'utf8'}));
const src=parse(source);
for(const card of before.querySelectorAll('.bc-company-card')){
 assert.ok(src.querySelector(`#${card.id}`),`Preserve ${card.id}`);
 const href=card.querySelector('.bc-profile-link')?.getAttribute('href');
 if(href?.startsWith('/fluidrwa/'))assert.equal(src.querySelector(`#${card.id} .bc-profile-link`).getAttribute('href'),href);
}
let html=source;
if(process.argv[2]){const r=await fetch(new URL('/vendors/fiat-on-off-ramp-providers',process.argv[2]),{signal:AbortSignal.timeout(30000)});assert.equal(r.status,200);html=await r.text();}
const root=parse(html),main=root.querySelector('main'),cards=main.querySelectorAll('.bc-company-card');
assert.equal(cards.length,30);assert.equal(new Set(cards.map(x=>x.id)).size,30);
const names=cards.map(x=>x.querySelector('h3').text.trim());
assert.deepEqual(names,[...names].sort((a,b)=>a.localeCompare(b,'en')));
assert.ok(names.includes('Bitso Business'));
assert.ok(main.text.includes('Whitelabel'));assert.ok(main.text.includes('unsupported'));
assert.ok(main.text.includes('June 15, 2026'));assert.ok(main.text.includes('August 20, 2025'));
assert.equal(root.querySelectorAll('h1').length,1);
assert.equal(root.querySelector('h1').text,'Crypto On-Ramp and Off-Ramp Providers');
assert.equal(main.querySelectorAll('.bc-vetted-badge').length,0);
assert.ok(!main.text.includes('\u2014'));assert.ok(!/\$\s*\d/.test(main.text));
const allowed=['www.bcb.gov.br','www.banxico.org.mx'];
for(const a of main.querySelectorAll('a')){const href=a.getAttribute('href')||'';if(href.startsWith('https:'))assert.ok(allowed.includes(new URL(href).hostname),`Vendor backlink ${href}`);if(href.startsWith('#'))assert.ok(root.querySelector(href),`Missing ${href}`);}
const graph=root.querySelectorAll('script[type="application/ld+json"]').flatMap(s=>{const j=JSON.parse(s.text);return j['@graph']||[j];});
const list=graph.find(x=>x['@type']==='ItemList');assert.equal(list.numberOfItems,rampRecords.length);assert.deepEqual(list.itemListElement.map(x=>x.name),names);
assert.equal(graph.find(x=>x['@type']==='CollectionPage').dateModified,'2026-11-24');
const faq=graph.find(x=>x['@type']==='FAQPage');assert.equal(faq.mainEntity.length,rampFaq.length);
for(const q of faq.mainEntity){assert.ok(main.text.includes(q.name));assert.ok(main.text.includes(q.acceptedAnswer.text));}
assert.ok(main.text.split(/\s+/).length>3500);
assert.ok(fs.existsSync('public/downloads/fiat-ramp-corridor-brief.txt'));
const dataset='data/ramp-onboarding-dataset.json';assert.equal(fs.readFileSync(dataset,'utf8'),execFileSync('git',['show',`4c6f1f2:${dataset}`],{encoding:'utf8'}),'Do not silently refresh historical evidence');
if(process.argv[2]){
 assert.ok(root.querySelector('meta[property="og:image"]').getAttribute('content').endsWith('/fiat-on-off-ramp-providers-glass-v1.jpg'));
 const r=await fetch(new URL('/downloads/fiat-ramp-corridor-brief.txt',process.argv[2]));assert.equal(r.status,200);assert.ok((await r.text()).includes('FluidRWA Fiat Ramp Corridor Brief'));
}
console.log(JSON.stringify({result:'pass',records:30,existingAnchors:29,newRecords:1,faq:12,words:main.text.split(/\s+/).length,vendorBacklinks:0,historicalEvidence:'unchanged'}));
