import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createRequire} from 'node:module';
const {parse}=createRequire(import.meta.url)('next/dist/compiled/node-html-parser');
const slug='kyc-aml-providers-comparison-2026';
let html=fs.readFileSync(`blog/${slug}/index.html`,'utf8');
if(process.argv[2]){const res=await fetch(new URL('/blog/'+slug,process.argv[2]));assert.equal(res.status,200);html=await res.text();}
const root=parse(html),main=root.querySelector('main');
assert.equal(root.querySelectorAll('h1').length,1);
assert.equal(root.querySelector('link[rel="canonical"]').getAttribute('href'),'https://www.fluidrwa.com/blog/'+slug);
assert.equal(root.querySelector('h1').text,'KYC and AML Providers Compared for Crypto and Tokenization');
assert.ok(main.text.split(/\s+/).length>4500);
const schemas=root.querySelectorAll('script[type="application/ld+json"]').flatMap(n=>{const v=JSON.parse(n.text);return v['@graph']||[v];});
const faq=schemas.find(v=>v['@type']==='FAQPage');
assert.equal(faq.mainEntity.length,8);
assert.equal(main.querySelectorAll('.faq-list details').length,8);
for(const q of faq.mainEntity) assert.ok(main.text.includes(q.name));
const article=schemas.find(v=>v['@type']==='Article');
assert.equal(article.dateModified,'2026-11-26');
assert.equal(article.datePublished,'2026-08-15');
const artwork=main.querySelector(`img[src="/assets/blog-thumbnails/card-${slug}.webp"]`);
assert.ok(artwork);
assert.ok(artwork.getAttribute('alt').includes('FluidRWA'));
const providers=['Alloy','AU10TIX','Chainalysis','ComplyAdvantage','Crystal Intelligence','Elliptic','Entrust / Onfido','Jumio','Middesk','Notabene','Persona','Sardine','Scorechain','Sumsub','Sygna','TRM Labs','Trulioo','Unit21','Veriff','VerifyVASP'];
// The runtime's shared brand formatter adds this ownership annotation.
const displayedProviders=providers.map(name=>process.argv[2]&&name==='Entrust / Onfido'?'Entrust / Onfido (an Entrust company)':name);
assert.deepEqual(main.querySelectorAll('.post-main h3').map(n=>n.text.trim()),displayedProviders);
for(const phrase of ['Twelve acceptance exercises','IVMS101','injection','NFC','indirect','rejected','1,000','revocation','ownership','mandatory']) assert.ok(main.text.toLowerCase().includes(phrase.toLowerCase()),phrase);
assert.ok(!/\u2014|citation recovery|competitor research|\bpricing\b|\$\d|internal research notes|access-controlled login|research standard/i.test(main.text));
for(const a of main.querySelectorAll('a[href]')){const href=a.getAttribute('href');if(/^https?:/.test(href)) assert.ok(['www.fluidrwa.com','fluidrwa.com'].includes(new URL(href).hostname),href);}
assert.ok(!main.querySelector('.research-block'));
console.log('PASS: KYC/AML stack guide 4500+ words, 20 alphabetical profiles, 8 matching FAQs, twelve acceptance exercises, preserved publication date, compressed artwork, no vendor links/prices/internal notes.');
