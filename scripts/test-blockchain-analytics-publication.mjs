import fs from 'node:fs';
import assert from 'node:assert/strict';

const slug = 'chainalysis-vs-trm-vs-elliptic-blockchain-analytics';
const origin = process.argv[2];
const route = `/blog/${slug}`;
const canonical = `https://www.fluidrwa.com${route}`;
const response = origin ? await fetch(`${origin}${route}`) : null;
if (response) assert.equal(response.status, 200);
const html = response ? await response.text() : fs.readFileSync(`blog/${slug}/index.html`, 'utf8');
assert.ok(html.includes(`<link rel="canonical" href="${canonical}"`));
assert.match(html, /<title>Chainalysis vs TRM vs Elliptic vs Cognyte(?: \| FluidRWA)?<\/title>/);
assert.ok(html.includes('November 7, 2026'));
const schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
  .flatMap(match => { const data = JSON.parse(match[1]); return data['@graph'] || [data]; });
const article = schemas.find(item => item['@type'] === 'Article');
assert.equal(article.datePublished, '2026-08-03');
assert.equal(article.dateModified, '2026-11-07');
for (const name of ['Address Screening', 'KYT', 'Reactor', 'Wallet Screening', 'Transaction Monitoring', 'Forensics', 'Lens', 'Navigator', 'Investigator', 'BLINK']) assert.ok(html.includes(name), name);
assert.ok(html.includes('Acceptance checks before requesting a quote'));
assert.ok(html.includes('not results from a FluidRWA product trial'));
assert.ok(html.includes('contact@fluidrwa.com'));
assert.ok(html.includes('comparison-consideration'));
assert.ok(!html.includes('Blockchain analytics provider comparison snapshot'));
assert.equal([...html.matchAll(/<table\b/g)].length, 3);
assert.ok([...html.matchAll(/<th\b[^>]*>/g)].every(match => match[0].includes('scope="col"')));
const articleHtml = html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/)?.[1];
assert.ok(articleHtml);
const links = [...articleHtml.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/g)];
const official = new Set();
for (const link of links) {
  if (/^https:/.test(link[1])) {
    assert.match(link[0], /rel="[^"]*nofollow/);
    official.add(link[1]);
  }
  assert.ok(!link[1].includes('utm_'), 'No internal UTMs added');
}
assert.equal(official.size, 11);
for (const url of official) assert.ok(article.citation.includes(url), `Missing schema citation: ${url}`);
if (origin) {
  const internal = new Set([...html.matchAll(/(?:href|src)="(\/[^"#]*)"/g)].map(match => match[1].replaceAll('&amp;', '&')));
  for (const target of internal) {
    const result = await fetch(new URL(target, origin));
    assert.equal(result.status, 200, `${target}: ${result.status}`);
    await result.arrayBuffer();
  }
  console.log(`PASS served metadata, schema, 3 accessible tables, 11 official citations and ${internal.size} internal links/assets at ${origin}`);
} else console.log('PASS generated article metadata, schema, tables, citations and link policy');
