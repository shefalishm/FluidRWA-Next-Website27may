import assert from 'node:assert/strict';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const slug = 'best-kyc-aml-providers-web3-startups';
const source = fs.readFileSync(`content/blog/${slug}.md`, 'utf8');
const html = fs.readFileSync(`blog/${slug}/index.html`, 'utf8');
const providers = ['AU10TIX', 'Blockpass', 'Chainalysis', 'ComplyAdvantage', 'Elliptic', 'Entrust', 'Jumio', 'Notabene', 'Persona', 'Sardine', 'Sumsub', 'TRM Labs', 'Trulioo', 'Veriff'];
assert(source.includes('date: "2026-06-25"'), 'Original publication date must remain');
assert(source.includes('modifiedDate: "2026-11-25"'));
assert(!source.includes('\u2014'), 'No em dashes');
assert(!/(?:AI citation recovery|competitor audit|Google results|Search Console|unverified|silent date refresh)/i.test(source), 'Keep internal research out of public copy');
assert(!/[$\u00a3\u20ac]\s*\d/.test(source), 'No numeric prices');
const allowed = new Set(['www.fatf-gafi.org', 'ofac.treasury.gov', 'www.fincen.gov', 'finance.ec.europa.eu', 'pages.nist.gov', 'csrc.nist.gov', 'www.fca.org.uk']);
const body = html.match(/<article class="post-main">([\s\S]*?)<\/article>/)[1];
for (const [, href] of body.matchAll(/href="(https?:\/\/[^"#]+)"/g)) {
  const host = new URL(href.replace(/&amp;/g, '&')).hostname;
  assert(host === 'www.fluidrwa.com' || host === 'fluidrwa.com' || allowed.has(host), `Unexpected external hyperlink: ${href}`);
}
const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
const article = graph.find(item => item['@type'] === 'Article');
assert.equal(article.datePublished, '2026-06-25');
assert.equal(article.dateModified, '2026-11-25');
assert.equal(graph.find(item => item['@type'] === 'FAQPage').mainEntity.length, 8);
const items = graph.find(item => item['@type'] === 'ItemList');
assert.deepEqual(items.itemListElement.map(item => item.name), providers);
let previous = -1;
for (const name of providers) {
  const offset = source.indexOf(`| ${name} |`);
  assert(offset > previous, `${name} must occur alphabetically in the table`);
  previous = offset;
}
for (const phrase of ['Country Coverage:', 'Integration Blueprint:', 'Run a Pilot', 'Travel Rule:', 'Data Residency, Security and Exit:', 'buyer worksheet']) assert(html.includes(phrase));
assert.equal((html.match(/<h1>/g) || []).length, 1);
assert(html.includes('card-best-kyc-aml-providers-web3-startups.webp'));
assert(html.includes('FluidRWA: Best KYC AML Providers'));
assert(fs.existsSync('public/downloads/kyc-aml-buyer-worksheet.txt'));
for (const file of ['content/blog/best-kyc-providers-tokenization-projects-2026.md', 'blog/best-kyc-providers-tokenization-projects-2026/index.html']) {
  assert.equal(fs.readFileSync(file, 'utf8'), execFileSync('git', ['show', `758eff6:${file}`], {encoding:'utf8'}), `Preserve already-cited sibling: ${file}`);
}
console.log('PASS: KYC guide, 14 alphabetical providers, 8 FAQs, source dates, links, preview, worksheet and cited sibling preservation.');
