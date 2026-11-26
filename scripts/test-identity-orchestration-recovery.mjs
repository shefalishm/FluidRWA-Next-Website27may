import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createRequire} from 'node:module';
const {parse}=createRequire(import.meta.url)('next/dist/compiled/node-html-parser');
const slug='persona-vs-alloy-vs-socure-identity-orchestration';
let html=fs.readFileSync(`blog/${slug}/index.html`,'utf8');
if(process.argv[2]){const res=await fetch(new URL('/blog/'+slug,process.argv[2]));assert.equal(res.status,200);html=await res.text();}
const root=parse(html),main=root.querySelector('main');
assert.equal(root.querySelectorAll('h1').length,1);
assert.equal(root.querySelector('link[rel="canonical"]').getAttribute('href'),'https://www.fluidrwa.com/blog/'+slug);
assert.ok(main.text.split(/\s+/).length>3500);
const schemas=root.querySelectorAll('script[type="application/ld+json"]').flatMap(n=>{const v=JSON.parse(n.text);return v['@graph']||[v];});
const faq=schemas.find(v=>v['@type']==='FAQPage');
assert.equal(faq.mainEntity.length,8);
assert.equal(main.querySelectorAll('.faq-list details').length,8);
for(const q of faq.mainEntity) assert.ok(main.text.includes(q.name));
const article=schemas.find(v=>v['@type']==='Article');
assert.equal(article.dateModified,'2026-11-26');
assert.equal(article.datePublished,'2026-08-19');
const artwork=main.querySelector(`img[src="/assets/blog-thumbnails/card-${slug}.webp"]`);
assert.ok(artwork);
assert.ok(artwork.getAttribute('alt').includes('FluidRWA'));
for(const phrase of ['Twelve acceptance tests','87.5%','unknown','RiskOS','out-of-order','ownership','rollback','Migration']) assert.ok(main.text.toLowerCase().includes(phrase.toLowerCase()),phrase);
assert.ok(!/\u2014|citation recovery|competitor research|\bpricing\b|\$\d|internal research notes/i.test(main.text));
let socureLinks=0;
for(const a of main.querySelectorAll('a[href]')){const href=a.getAttribute('href');if(/^https?:/.test(href)){const host=new URL(href).hostname;assert.ok(['www.fluidrwa.com','fluidrwa.com','www.socure.com'].includes(host),href);if(host==='www.socure.com'){assert.equal(href,'https://www.socure.com/solutions/riskos');socureLinks++;}}}
assert.equal(socureLinks,1,'Keep the user-requested Socure link, without other vendor backlinks');
assert.ok(!main.querySelector('.research-block'));
console.log('PASS: identity guide 3500+ words, 8 matching FAQs, twelve acceptance tests, original publication date, compressed artwork, Socure-only vendor link, no prices/internal notes.');
