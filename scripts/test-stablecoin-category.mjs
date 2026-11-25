import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createRequire} from 'node:module';
import {enhanceStablecoinCategory,stablecoinRecords,stablecoinFaq} from './lib/stablecoin-category.mjs';
const{parse}=createRequire(import.meta.url)('next/dist/compiled/node-html-parser');
const file='vendors/payments-stablecoins/index.html',source=fs.readFileSync(file,'utf8');
assert.equal(enhanceStablecoinCategory(source),source,'Generator idempotence');
const before=parse(execFileSync('git',['show',`ff45c6d:${file}`],{encoding:'utf8'}));
const src=parse(source);
for(const old of before.querySelectorAll('.bc-company-card'))assert(src.querySelector(`#${old.id}`),`Preserve anchor ${old.id}`);
const client=n=>{const c=parse(n.toString());c.querySelector('article').removeAttribute('data-stablecoin-role');c.querySelector('.bc-company-index').set_content('role');return c.toString();};
assert.equal(client(before.querySelector('#nowpayments')),client(src.querySelector('#nowpayments')),'Preserve client content');
let html=source;
if(process.argv[2]){const r=await fetch(new URL('/vendors/stablecoin-infrastructure-providers',process.argv[2]));assert.equal(r.status,200);html=await r.text();}
const root=parse(html),main=root.querySelector('main'),cards=main.querySelectorAll('.bc-company-card');
assert.equal(cards.length,35);assert.equal(new Set(cards.map(n=>n.id)).size,35);
const names=cards.map(n=>n.querySelector('h3').textContent.trim());assert.deepEqual(names,[...names].sort((a,b)=>a.localeCompare(b,'en')));
assert.equal(root.querySelectorAll('h1').length,1);assert.equal(root.querySelector('h1').textContent,'Stablecoin Infrastructure Providers');
assert(main.querySelector('#mountain-protocol-usdm').textContent.includes('minting was disabled'));
assert(main.querySelector('#first-digital-fdusd').textContent.includes('August 15, 2025'));
assert(main.querySelector('#conduit').textContent.includes('blockchain infrastructure'));
assert(main.querySelector('#conduit-payments').textContent.includes('payments business'));
assert.equal(main.querySelectorAll('.bc-vetted-badge').length,0,'Do not infer review status from listing');
assert(!main.textContent.includes('\u2014'));assert(!/\$\s*\d/.test(main.textContent));
assert(!/Google results|AI citation|competitor audit|citation recovery|our internal research/i.test(main.textContent));
const allowed=['occ.gov','www.esma.europa.eu','www.hkma.gov.hk'];
for(const a of main.querySelectorAll('a')){
 const href=a.getAttribute('href')||'';
 if(href.startsWith('https:'))assert(allowed.includes(new URL(href).hostname),`Vendor backlink ${href}`);
 if(href.startsWith('#'))assert(root.querySelector(href),`Missing anchor ${href}`);
}
const graph=root.querySelectorAll('script[type="application/ld+json"]').flatMap(s=>{const n=JSON.parse(s.textContent);return n['@graph']||[n];});
const list=graph.find(n=>n['@type']==='ItemList');assert.equal(list.numberOfItems,stablecoinRecords.length);assert.deepEqual(list.itemListElement.map(n=>n.name),names);
assert.equal(graph.find(n=>n['@type']==='CollectionPage').dateModified,'2026-11-25');
const faqs=graph.find(n=>n['@type']==='FAQPage').mainEntity;assert.equal(faqs.length,stablecoinFaq.length);
for(const q of faqs){assert(main.textContent.includes(q.name));assert(main.textContent.includes(q.acceptedAnswer.text));}
assert(main.textContent.split(/\s+/).length>5000);
for(const path of ['data/network-intelligence.json','data/ramp-onboarding-dataset.json'])assert.equal(fs.readFileSync(path,'utf8'),execFileSync('git',['show',`ff45c6d:${path}`],{encoding:'utf8'}));
assert.equal(fs.readFileSync('assets/site.js','utf8'),fs.readFileSync('public/assets/site.js','utf8'));
if(process.argv[2]){
 assert(root.querySelector('meta[property="og:image"]').getAttribute('content').endsWith('/stablecoin-infrastructure-providers-glass-v1.jpg'));
 const r=await fetch(new URL('/downloads/stablecoin-operating-brief.txt',process.argv[2]));assert.equal(r.status,200);assert((await r.text()).includes('FluidRWA Stablecoin Operating Brief'));
 assert(main.textContent.includes('Last updated: November 25, 2026'));
}
console.log(JSON.stringify({result:'pass',records:cards.length,preservedAnchors:30,additions:5,faq:faqs.length,words:main.textContent.split(/\s+/).length,vendorBacklinks:0,client:'preserved',historicalEvidence:'unchanged'}));
