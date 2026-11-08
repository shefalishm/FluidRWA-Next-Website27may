import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import sharp from 'sharp';

const slug = 'asset-tokenization-platform-comparison';
const route = `/blog/${slug}`;
const origin = process.argv[2];
const canonical = `https://www.fluidrwa.com${route}`;
const heading = 'Asset Tokenization Platform Comparison: Buyer Checklist';
const description = 'Evaluate asset tokenization platforms with a procurement matrix, documented controls, evidence requests and a pilot checklist for issuance and servicing.';
const thumbnail = `/assets/blog-thumbnails/blog-${slug}-editorial.webp`;
const social = `/assets/social/blog-${slug}-editorial.jpg`;
const alt = 'Illustrative property documents, portfolio photographs and a tablet; not a platform screenshot or legal ownership record.';
const summary = [
  ['Scope', 'Named entities and service roles', 'Issuer tools and partner handoffs', 'Identity and asset rules'],
  ['Evidence', 'Offering and service agreements', 'API, deployment and export scope', 'Runtime and rule configuration'],
  ['Pilot', 'Subscription through redemption', 'Integration failures and recovery', 'Rejected and privileged transfers']
];
const attr = (tag, name) => tag?.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
const hash = data => crypto.createHash('sha256').update(data).digest('hex');
async function get(path) {
  const response = await fetch(new URL(path, origin), { signal: AbortSignal.timeout(30000) });
  assert.equal(response.status, 200, `${path}: ${response.status}`);
  return response;
}
const html = origin ? await (await get(route)).text() : fs.readFileSync(`blog/${slug}/index.html`, 'utf8');
const metas = Object.fromEntries([...html.matchAll(/<meta\b[^>]*>/g)].map(([tag]) => [attr(tag, 'name') || attr(tag, 'property'), attr(tag, 'content')]));
const canonicalTag = [...html.matchAll(/<link\b[^>]*>/g)].map(m => m[0]).find(tag => attr(tag, 'rel') === 'canonical');
assert.equal(attr(canonicalTag, 'href'), canonical);
assert.equal(html.match(/<h1[^>]*>(.*?)<\/h1>/)?.[1], heading);
assert.equal(html.match(/<title>(.*?)<\/title>/)?.[1], `${heading} | FluidRWA`);
for (const key of ['description', 'og:description']) assert.equal(metas[key], description);
for (const key of ['og:image', 'twitter:image']) assert.equal(metas[key], `https://www.fluidrwa.com${social}`);
assert.equal(metas['twitter:card'], 'summary_large_image');
assert.equal(metas['og:type'], 'article');
if (origin) {
  for (const key of ['og:title', 'twitter:title']) assert.equal(metas[key], `${heading} | FluidRWA`);
  assert.equal(metas['twitter:description'], description);
  for (const key of ['og:image:alt', 'twitter:image:alt']) assert.equal(metas[key], alt);
}
const article = html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/)?.[1];
assert.ok(article);
assert.equal([...article.matchAll(/<table\b/g)].length, 3);
assert.ok([...article.matchAll(/<th\b[^>]*>/g)].every(m => m[0].includes('scope="col"')));
const rows = [...article.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map(m => [...m[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/g)].map(c => c[1].replace(/<[^>]*>/g, '')));
assert.deepEqual(rows.slice(1, 4), summary);
const generator = fs.readFileSync('scripts/generate-comparison-infographics.mjs', 'utf8');
for (const row of summary) for (const value of row) assert.ok(generator.includes(JSON.stringify(value)));
for (const phrase of ['November 8, 2026', 'not SEC approval', 'does not act as the KYC agent', 'bypass the compliance rules', 'No provider account or production deployment was tested', 'comparison-consideration', 'mailto:contact@fluidrwa.com', '/blog/rwa-tokenization-platform-rfp-template', '/blog/top-tokenization-companies-2026', '/network-explorer/research/tokenized-fund-infrastructure-october-2026#october-findings']) assert.ok(article.includes(phrase), phrase);
assert.ok(!article.includes(`/assets/blog-images/${slug}.svg`));
assert.ok(!/utm_/i.test(article));
const schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(m => { const d = JSON.parse(m[1]); return d['@graph'] || [d]; });
const schema = schemas.find(s => s['@type'] === 'Article');
assert.equal(schema.datePublished, '2026-07-24');
assert.equal(schema.dateModified, '2026-11-08');
assert.equal(schema.headline, heading);
const sources = new Set();
for (const [tag, url] of article.matchAll(/<a\b[^>]*href="(https?:[^\"]+)"[^>]*>/g)) {
  assert.match(tag, /rel="[^"]*nofollow/);
  assert.ok(['own.securitize.io', 'securitize.io', 'www.sec.gov', 'docs.tokeny.com', 'tokeny.com', 'ercs.ethereum.org', 'developers.polymesh.network'].includes(new URL(url).hostname), url);
  assert.ok(schema.citation.includes(url), `Missing citation: ${url}`);
  sources.add(url);
}
assert.equal(sources.size, 12);
const cards = origin ? await (await get('/blog')).text() : fs.readFileSync('blog.html', 'utf8');
const card = [...cards.matchAll(/<a class="blog-card"[^>]*>[\s\S]*?<\/a>/g)].map(m => m[0]).find(c => attr(c, 'href') === route);
assert.ok(card);
assert.equal(card.match(/<h2>(.*?)<\/h2>/)?.[1], heading);
assert.equal(card.match(/<p>(.*?)<\/p>/)?.[1], description);
const cardImage = card.match(/<img\b[^>]*>/)?.[0];
assert.equal(attr(cardImage, 'src'), thumbnail);
assert.equal(attr(cardImage, 'alt'), `FluidRWA: ${alt}`);
const assets = [];
for (const path of [thumbnail, social, `/assets/infographics/${slug}-comparison.png`, `/assets/infographics/${slug}-comparison-mobile.png`]) {
  const local = fs.readFileSync(`public${path}`);
  const bytes = origin ? Buffer.from(await (await get(path)).arrayBuffer()) : local;
  assert.equal(hash(bytes), hash(local), path);
  const meta = await sharp(bytes).metadata();
  if (path === thumbnail) { assert.equal(meta.format, 'webp'); assert.equal(meta.width, 640); assert.equal(meta.height, 400); assert.ok(bytes.length <= 81920); }
  if (path === social) { assert.equal(meta.format, 'jpeg'); assert.equal(meta.width, 1200); assert.equal(meta.height, 630); }
  if (path.endsWith('.png')) { assert.equal(meta.format, 'png'); assert.equal(hash(local), hash(fs.readFileSync(path.slice(1)))); }
  assets.push({ path, format: meta.format, width: meta.width, height: meta.height, bytes: bytes.length, sha256: hash(bytes) });
}
let destinations = 0;
if (origin) {
  const internal = new Set([...html.matchAll(/(?:href|src)="(\/[^"#]*)"/g)].map(m => m[1].replaceAll('&amp;', '&')));
  internal.add(`/assets/infographics/${slug}-comparison-mobile.png`);
  for (const path of internal) await (await get(path)).arrayBuffer();
  destinations = internal.size;
  for (const sibling of ['/blog/top-tokenization-companies-2026', '/blog/rwa-tokenization-platform-rfp-template', '/vendors/tokenization-platforms']) {
    const response = await get(sibling);
    assert.equal(new URL(response.url).pathname.replace(/\/$/, ''), sibling);
    assert.ok((await response.text()).includes(`href="https://www.fluidrwa.com${sibling}"`));
  }
}
console.log(JSON.stringify({ origin: origin || 'generated source', sources: sources.size, destinations, assets }, null, 2));
console.log('PASS tokenization procurement content, metadata, tables, previews, PNG downloads and internal destinations');
