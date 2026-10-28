import fs from 'node:fs';
import assert from 'node:assert/strict';

const slugs = ['moonpay-vs-transak-vs-banxa-fiat-on-ramp-providers', 'alchemy-vs-quicknode-vs-infura-rpc-node-providers', 'taxbit-vs-ledgible-vs-lukka-enterprise-crypto-accounting-tax'];
const october28 = ['top-tokenization-companies-2026', 'carta-vs-angellist-vs-juniper-square-fund-administration', 'alchemy-vs-quicknode-vs-chainstack-rpc-node-providers'];
for (const slug of [...slugs, ...october28]) {
  const html = fs.readFileSync(`blog/${slug}/index.html`, 'utf8');
  const article = html.slice(html.indexOf('<article class="post-main">'));
  assert.ok(article.startsWith('<article class="post-main"><div class="answer-box">'), `${slug}: answer first`);
  assert.ok(article.indexOf('<table') >= 0, `${slug}: accessible comparison table`);
  if (article.includes('<figure')) assert.ok(article.indexOf('<table') < article.indexOf('<figure'), `${slug}: useful HTML comparison before image`);
  assert.ok(article.includes('Should your company be considered?'));
  assert.ok(article.includes('mailto:contact@fluidrwa.com'));
  assert.ok(html.includes(`rel="canonical" href="https://www.fluidrwa.com/blog/${slug}"`));
  const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
  const schema = graph.find(item => item['@type'] === 'Article');
  const markdown = fs.readFileSync(`content/blog/${slug}.md`, 'utf8');
  const expectedModified = markdown.match(/^modifiedDate: "([^"]+)"/m)?.[1] || markdown.match(/^reviewedDate: "([^"]+)"/m)?.[1];
  assert.equal(schema.dateModified, expectedModified);
  if (october28.includes(slug)) assert.equal(schema.dateModified, '2026-10-28');
  assert.ok(schema.citation.length >= 3, `${slug}: linked references in schema`);
  for (const match of html.matchAll(/href="#([^"]+)"/g)) assert.ok(html.includes(`id="${match[1]}"`), `${slug}: broken jump ${match[1]}`);
}
const data = JSON.parse(fs.readFileSync('data/ramp-onboarding-dataset.json', 'utf8'));
assert.equal(data.rows.length, 18);
assert.equal(data.rows.filter(row => row.checked === '2026-10-23').length, 1, 'No silent bulk verification refresh');
assert.ok(data.rows.find(row => row.provider === 'Transak' && row.dimension === 'Integration model').observation.includes('API-supported'));
assert.ok(!fs.readFileSync('content/blog/taxbit-vs-ledgible-vs-lukka-enterprise-crypto-accounting-tax.md', 'utf8').includes('External source links are intentionally not included'));
console.log('PASS: six answer-first pages, table/image order, editorial CTA/email, unchanged canonicals, dated Article citations, jump links and row-specific dataset freshness.');
