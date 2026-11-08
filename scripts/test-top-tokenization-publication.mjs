import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import sharp from 'sharp';

const origin = process.argv[2];
const slug = 'top-tokenization-companies-2026';
const route = `/blog/${slug}`;
const heading = 'Top 10 RWA tokenization platforms for 2026';
const title = '10 RWA Tokenization Platforms Compared by Issuer Fit (2026)';
const cardTitle = 'Top 10 RWA Tokenization Platforms &amp; Companies for 2026';
const description = 'Compare 10 RWA tokenization platforms by issuance model, investor eligibility, custody and redemptions. See which questions to ask before shortlisting.';
const alt = 'Illustrative investment documents and a globe outside an office building; not a provider office or evidence of a regulated offering.';
const providers = ['Securitize', 'Tokeny', 'Zoniqx', 'Brickken', 'DigiShares', 'Polymath', 'ADDX', 'Taurus', 'InvestaX', 'KAIO (formerly Libre)'];
const graphic = '/assets/infographics/rwa-tokenization-platform-shortlist-map-2026';
const social = `/assets/social/blog-${slug}-editorial.jpg`;
const thumbnail = `/assets/blog-thumbnails/blog-${slug}-editorial.webp`;
const attr = (tag, name) => tag?.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
async function get(path) {
  const response = await fetch(new URL(path, origin), { signal: AbortSignal.timeout(30000) });
  assert.equal(response.status, 200, `${path}: ${response.status}`);
  return response;
}
const html = origin ? await (await get(route)).text() : fs.readFileSync(`blog/${slug}/index.html`, 'utf8');
const article = html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/)?.[1];
assert.ok(article);
assert.equal(html.match(/<title>(.*?)<\/title>/)?.[1], origin ? title : `${title} | FluidRWA`);
assert.equal(html.match(/<h1[^>]*>(.*?)<\/h1>/)?.[1], origin ? heading : cardTitle);
const metas = Object.fromEntries([...html.matchAll(/<meta\b[^>]*>/g)].map(([tag]) => [attr(tag, 'name') || attr(tag, 'property'), attr(tag, 'content')]));
assert.equal(metas.description, description);
assert.equal(metas['og:description'], description);
for (const key of ['og:image', 'twitter:image']) assert.equal(metas[key], `https://www.fluidrwa.com${social}`);
assert.equal(metas['twitter:card'], 'summary_large_image');
assert.equal(metas['og:type'], 'article');
if (origin) {
  for (const key of ['og:title', 'twitter:title']) assert.equal(metas[key], title);
  assert.equal(metas['twitter:description'], description);
  for (const key of ['og:image:alt', 'twitter:image:alt']) assert.equal(metas[key], alt);
}
assert.ok(html.includes(`href="https://www.fluidrwa.com${route}"`));
assert.equal([...article.matchAll(/<table\b/g)].length, 1);
assert.ok([...article.matchAll(/<th\b[^>]*>/g)].every(m => m[0].includes('scope="col"')));
const firstCells = [...article.matchAll(/<tr><td>([\s\S]*?)<\/td>/g)].map(m => m[1].replace(/<[^>]*>/g, ''));
assert.deepEqual(firstCells, providers);
const schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(m => { const d = JSON.parse(m[1]); return d['@graph'] || [d]; });
const schema = schemas.find(s => s['@type'] === 'Article');
assert.equal(schema.datePublished, '2026-07-11');
assert.equal(schema.dateModified, '2026-11-08');
for (const phrase of ['Buyer guidance revised November 6, 2026', 'September 30, 2026', 'reviewed November 8, 2026', 'does not act as the KYC agent', 'Circle International Bermuda Limited', 'ADDX Pte. Ltd.', 'IC SG Pte. Ltd.', 'Taurus-PROTECT', 'zConnect', 'comparison-consideration', 'mailto:contact@fluidrwa.com', '/blog/asset-tokenization-platform-comparison', '/blog/rwa-tokenization-platform-rfp-template', '/network-explorer/research/tokenized-fund-infrastructure-october-2026#october-findings']) assert.ok(article.includes(phrase), phrase);
assert.ok(!article.includes('graphic still uses the former name'));
assert.ok(!article.includes('utm_'));
const sources = new Set();
for (const [tag, url] of article.matchAll(/<a\b[^>]*href="(https?:[^\"]+)"[^>]*>/g)) {
  assert.match(tag, /rel="[^"]*nofollow/);
  assert.ok(schema.citation.includes(url), `Missing citation: ${url}`);
  sources.add(url);
}
assert.equal(sources.size, 15);
for (const suffix of ['', '-mobile']) {
  const svg = fs.readFileSync(`assets${graphic.slice(7)}${suffix}.svg`, 'utf8');
  for (const name of providers.map(p => p.startsWith('KAIO') ? 'KAIO' : p)) assert.ok(svg.includes(name));
  assert.ok(svg.includes('November 8, 2026'));
  assert.ok(!svg.includes('>Libre<'));
}
const cards = origin ? await (await get('/blog')).text() : fs.readFileSync('blog.html', 'utf8');
const card = [...cards.matchAll(/<a class="blog-card"[^>]*>[\s\S]*?<\/a>/g)].map(m => m[0]).find(c => attr(c, 'href') === route);
assert.ok(card);
assert.equal(card.match(/<h2>(.*?)<\/h2>/)?.[1], cardTitle);
assert.equal(card.match(/<p>(.*?)<\/p>/)?.[1], description);
const cardImage = card.match(/<img\b[^>]*>/)?.[0];
assert.equal(attr(cardImage, 'src'), thumbnail);
assert.equal(attr(cardImage, 'alt'), `FluidRWA: ${alt}`);
const assets = [];
for (const path of [thumbnail, social, `${graphic}.png`, `${graphic}-mobile.png`]) {
  const local = fs.readFileSync(`public${path}`);
  const bytes = origin ? Buffer.from(await (await get(path)).arrayBuffer()) : local;
  assert.equal(hash(bytes), hash(local), path);
  const meta = await sharp(bytes).metadata();
  if (path === thumbnail) { assert.equal(meta.format, 'webp'); assert.equal(meta.width, 640); assert.equal(meta.height, 400); assert.ok(bytes.length <= 81920); }
  if (path === social) { assert.equal(meta.format, 'jpeg'); assert.equal(meta.width, 1200); assert.equal(meta.height, 630); }
  if (path.endsWith('.png')) assert.equal(hash(local), hash(fs.readFileSync(path.slice(1))));
  assets.push({ path, format: meta.format, width: meta.width, height: meta.height, bytes: bytes.length, sha256: hash(bytes) });
}
let destinations = 0;
if (origin) {
  const internal = new Set([...html.matchAll(/(?:href|src)="(\/[^"#]*)"/g)].map(m => m[1].replaceAll('&amp;', '&')));
  internal.add(`${graphic}-mobile.png`);
  for (const path of internal) await (await get(path)).arrayBuffer();
  destinations = internal.size;
  for (const sibling of ['/blog/asset-tokenization-platform-comparison', '/vendors/tokenization-platforms']) {
    const response = await get(sibling);
    assert.equal(new URL(response.url).pathname.replace(/\/$/, ''), sibling);
    const siblingHtml = await response.text();
    assert.ok(siblingHtml.includes(`href="https://www.fluidrwa.com${sibling}"`));
    if (sibling.includes('/vendors/')) {
      const data = [...siblingHtml.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(m => { const d = JSON.parse(m[1]); return d['@graph'] || [d]; });
      const list = data.find(d => d['@id']?.endsWith('#providers'));
      assert.equal(list.itemListElement[9].item.name, 'Zoniqx');
    }
  }
}
console.log(JSON.stringify({ origin: origin || 'generated source', sources: sources.size, destinations, assets }, null, 2));
console.log('PASS protected shortlist strings/order, metadata, evidence, preview assets, downloads and independent buyer routes');
