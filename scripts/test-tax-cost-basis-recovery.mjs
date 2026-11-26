import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const {parse}=createRequire(import.meta.url)('next/dist/compiled/node-html-parser');
const path='/use-cases/digital-asset-tax-reporting-cost-basis-operations';
const response=await fetch(new URL(path,process.argv[2]||'http://localhost:3036'));
assert.equal(response.status,200);
const root=parse(await response.text());
assert.equal(root.querySelectorAll('h1').length,1);
assert.equal(root.querySelector('link[rel="canonical"]').getAttribute('href'),'https://www.fluidrwa.com'+path);
const article=root.querySelector('article');
assert.ok(article.text.split(/\s+/).length>3000);
assert.equal(article.querySelectorAll('#acceptance-tests .uc-control-list > div').length,9);
assert.ok(article.text.includes('Last updated November 26, 2026'));
assert.ok(!/\u2014|citation recovery|competitor research|expanded the ten-question|What charges apply/i.test(article.text));
const schema=root.querySelectorAll('script[type="application/ld+json"]').flatMap(n=>{const v=JSON.parse(n.text);return v['@graph']||[v];});
const faq=schema.find(v=>v['@type']==='FAQPage');
assert.equal(faq.mainEntity.length,6);
assert.equal(article.querySelectorAll('details').length,6);
for(const q of faq.mainEntity) assert.ok(article.text.includes(q.name));
for(const a of article.querySelectorAll('a[href]')){
  const href=a.getAttribute('href');
  if(/^https?:/.test(href)) assert.ok(['www.irs.gov','www.oecd.org','www.fluidrwa.com'].includes(new URL(href).hostname),href);
}
console.log('PASS: tax guide 3000+ words, nine acceptance tests, six matching FAQs, canonical/date, no vendor backlinks or internal notes.');
