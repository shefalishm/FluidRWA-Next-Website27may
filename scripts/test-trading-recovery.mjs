import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createRequire} from 'node:module';
const {parse}=createRequire(import.meta.url)('next/dist/compiled/node-html-parser');
const slug='talos-vs-wyden-vs-finery-markets-institutional-trading';
let html=fs.readFileSync(`blog/${slug}/index.html`,'utf8');
if(process.argv[2]){const res=await fetch(new URL('/blog/'+slug,process.argv[2]));assert.equal(res.status,200);html=await res.text();}
const root=parse(html),main=root.querySelector('main');
assert.equal(root.querySelectorAll('h1').length,1);
assert.equal(root.querySelector('link[rel="canonical"]').getAttribute('href'),'https://www.fluidrwa.com/blog/'+slug);
assert.ok(main.text.split(/\s+/).length>3000);
const schemas=root.querySelectorAll('script[type="application/ld+json"]').flatMap(n=>{const v=JSON.parse(n.text);return v['@graph']||[v];});
const faq=schemas.find(v=>v['@type']==='FAQPage');
assert.equal(faq.mainEntity.length,8);
for(const q of faq.mainEntity) assert.ok(main.text.includes(q.name));
assert.equal(schemas.find(v=>v['@type']==='Article').dateModified,'2026-11-26');
for(const phrase of ['Finery Markets BVI Limited','coming soon','Wyden Enterprise','September 3, 2024','partial fill','settlement']) assert.ok(main.text.toLowerCase().includes(phrase.toLowerCase()),phrase);
assert.ok(!/\u2014|citation recovery|competitor research|\bpricing\b|\$\d|internal research notes/i.test(main.text));
for(const a of main.querySelectorAll('a[href]')){const href=a.getAttribute('href');if(/^https?:/.test(href)) assert.ok(['www.fluidrwa.com','fluidrwa.com'].includes(new URL(href).hostname),href);}
assert.ok(!main.querySelector('.research-block'));
console.log('PASS: trading guide 3000+ words, eight matching FAQs, correct dates, product qualifications, no vendor backlinks, prices, em dashes or internal notes.');
