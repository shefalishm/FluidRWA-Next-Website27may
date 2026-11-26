import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createRequire} from 'node:module';
const {parse}=createRequire(import.meta.url)('next/dist/compiled/node-html-parser');
const slug='crypto-custody-providers-comparison-2026';
const source=fs.readFileSync(`content/blog/${slug}.md`,'utf8');
const html=process.argv[2] ? await (async()=>{
 const response=await fetch(new URL(`/blog/${slug}`,process.argv[2]));
 assert.equal(response.status,200);
 return response.text();
})() : fs.readFileSync(`blog/${slug}/index.html`,'utf8');
const root=parse(html);
assert.equal(root.querySelectorAll('h1').length,1);
assert.equal(root.querySelector('link[rel="canonical"]').getAttribute('href'),`https://www.fluidrwa.com/blog/${slug}`);
assert.ok(root.querySelector('meta[name="description"]').getAttribute('content').includes('16 custody'));
const schemas=root.querySelectorAll('script[type="application/ld+json"]').flatMap(node=>{
 const value=JSON.parse(node.text);return value['@graph']||[value];
});
const faq=schemas.find(item=>item['@type']==='FAQPage');
assert.equal(faq.mainEntity.length,8);
const items=schemas.find(item=>item['@type']==='ItemList');
assert.equal(items.itemListElement.length,16);
const names=items.itemListElement.map(item=>item.name);
assert.deepEqual(names,[...names].sort((a,b)=>a.localeCompare(b)));
for(const name of names) assert.ok(root.text.includes(name),name+' visible');
for(const question of faq.mainEntity) assert.ok(root.text.includes(question.name),'FAQ visible');
const main=root.querySelector('main');
assert.ok(!main.text.includes('\u2014'));
assert.ok(!/citation recovery|competitor research|AI search optimization|internal research notes/i.test(main.text));
assert.ok(!/\bpricing\b|\$\d|\d+\s*bps/i.test(main.text));
const allowed=['www.fluidrwa.com','fluidrwa.com','www.occ.gov','www.esma.europa.eu','www.fca.org.uk','www.amf-france.org'];
for(const link of main.querySelectorAll('a[href]')){
 const href=link.getAttribute('href');
 if(/^https?:/.test(href)) assert.ok(allowed.includes(new URL(href).hostname),'unexpected external link '+href);
}
assert.ok(main.querySelector('a[href="/downloads/institutional-custody-buyer-checklist.txt"]'));
assert.ok(source.includes('reviewedDate: "2026-10-10"'));
assert.ok(source.includes('modifiedDate: "2026-11-26"'));
assert.ok(!main.querySelector('.research-block'));
console.log('PASS: custody guide single H1/canonical, 16 alphabetical providers, 8 visible/schema FAQs, no vendor backlinks, prices, em dashes or internal research notes.');
