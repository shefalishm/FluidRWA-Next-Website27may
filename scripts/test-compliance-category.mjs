import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createRequire} from 'node:module';
import {enhanceComplianceCategory,complianceRecords,complianceFaq,complianceUrl} from './lib/compliance-category.mjs';
const {parse}=createRequire(import.meta.url)('next/dist/compiled/node-html-parser');
const file='vendors/compliance-infrastructure/index.html',source=fs.readFileSync(file,'utf8');
assert.equal(enhanceComplianceCategory(source),source,'Idempotent generator');
const before=parse(execFileSync('git',['show',`c166c50:${file}`],{encoding:'utf8'}));
const src=parse(source);
for(const card of before.querySelectorAll('.bc-provider-card')){
 assert(src.querySelector(`#${card.id}`),`Preserve ${card.id}`);
 const profile=card.querySelector('.bc-profile-link')?.getAttribute('href');
 if(profile)assert.equal(src.querySelector(`#${card.id} .bc-profile-link`).getAttribute('href'),profile);
}
let html=source;
if(process.argv[2]){const r=await fetch(new URL(new URL(complianceUrl).pathname,process.argv[2]));assert.equal(r.status,200);html=await r.text();}
const root=parse(html),main=root.querySelector('main'),cards=main.querySelectorAll('.bc-provider-card,.bc-company-card');
assert.equal(cards.length,29);assert.equal(new Set(cards.map(n=>n.id)).size,29);
const names=cards.map(n=>n.querySelector('h3').textContent.trim());
assert.deepEqual(names,[...names].sort((a,b)=>a.localeCompare(b,'en')));
assert.equal(root.querySelectorAll('h1').length,1);
assert.equal(root.querySelector('link[rel="canonical"]').getAttribute('href'),complianceUrl);
assert(main.querySelector('#coinfirm').textContent.includes('May 21, 2024'));
assert(main.querySelector('#onfido').textContent.includes('Entrust'));
assert(main.querySelector('#elliptic-lens').textContent.includes('not a separate company'));
assert(main.querySelector('#chainalysis-vasp-directory').textContent.includes('not an additional independent company'));
assert.equal(main.querySelectorAll('.bc-vetted-badge').length,0,'Do not infer review status');
assert(!main.textContent.includes('\u2014'));
assert(!/AI citation|competitor audit|citation recovery|our internal research|gold.standard|satisfies regulators in every/i.test(main.textContent));
assert(!/\$\s*\d|EUR\s*\d/.test(main.textContent));
for(const a of main.querySelectorAll('a')){
 const href=a.getAttribute('href')||'';
 if(href.startsWith('https:'))assert(['www.fatf-gafi.org','www.eba.europa.eu','ofac.treasury.gov'].includes(new URL(href).hostname),`Vendor backlink ${href}`);
 if(href.startsWith('#'))assert(root.querySelector(href),`Missing ${href}`);
}
const graph=root.querySelectorAll('script[type="application/ld+json"]').flatMap(s=>{const n=JSON.parse(s.textContent);return n['@graph']||[n];});
const list=graph.find(n=>n['@type']==='ItemList');assert.equal(list.numberOfItems,complianceRecords.length);assert.deepEqual(list.itemListElement.map(n=>n.name),names);
assert.equal(graph.find(n=>n['@type']==='CollectionPage').dateModified,'2026-11-25');
const faqs=graph.find(n=>n['@type']==='FAQPage').mainEntity;assert.equal(faqs.length,complianceFaq.length);
for(const q of faqs){assert(main.textContent.includes(q.name));assert(main.textContent.includes(q.acceptedAnswer.text));}
assert(main.textContent.split(/\s+/).length>5000);
for(const path of ['data/network-intelligence.json','data/ramp-onboarding-dataset.json'])assert.equal(fs.readFileSync(path,'utf8'),execFileSync('git',['show',`c166c50:${path}`],{encoding:'utf8'}));
assert.equal(fs.readFileSync('assets/site.js','utf8'),fs.readFileSync('public/assets/site.js','utf8'));
if(process.argv[2]){
 assert(root.querySelector('meta[property="og:image"]').getAttribute('content').endsWith('/compliance-infrastructure-providers-glass-v1.jpg'));
 assert(main.textContent.includes('Last updated: November 25, 2026'));
 const r=await fetch(new URL('/downloads/crypto-compliance-buyer-checklist.txt',process.argv[2]));assert.equal(r.status,200);assert((await r.text()).includes('FluidRWA Crypto Compliance Buyer Checklist'));
}
console.log(JSON.stringify({result:'pass',records:cards.length,preservedAnchors:29,additions:0,faqs:faqs.length,words:main.textContent.split(/\s+/).length,vendorBacklinks:0,historicalDatasets:'unchanged'}));
