import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import sharp from 'sharp';

const origin = process.argv[2] || 'https://www.fluidrwa.com';
const slug = 'chainalysis-vs-trm-vs-elliptic-blockchain-analytics';
const route = `/blog/${slug}`;
const canonical = `https://www.fluidrwa.com${route}`;
const title = 'Chainalysis vs TRM vs Elliptic vs Cognyte';
const heading = 'Chainalysis vs TRM Labs vs Elliptic vs Cognyte';
const description = 'Compare four crypto analytics platforms for wallet screening, transaction monitoring, sanctions, investigations and forensics.';
const alt = 'FluidRWA: Illustrative analyst reviewing network graphs across three monitors; not a vendor product screenshot.';
const social = `/assets/social/blog-${slug}-editorial.jpg`;
const thumbnail = `/assets/blog-thumbnails/blog-${slug}-editorial.webp`;
async function get(path) {
  const response = await fetch(`${origin}${path}`, { signal: AbortSignal.timeout(30000) });
  assert.equal(response.status, 200, path);
  return response;
}
function attribute(tag, name) { return tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1]; }
const article = await (await get(route)).text();
const metas = Object.fromEntries([...article.matchAll(/<meta\b[^>]*>/g)].map(([tag]) => [attribute(tag, 'name') || attribute(tag, 'property'), attribute(tag, 'content')]));
assert.equal(article.match(/<title>(.*?)<\/title>/)?.[1], title);
assert.equal(article.match(/<h1[^>]*>(.*?)<\/h1>/)?.[1], heading);
assert.equal(metas.description, description);
const canonicalTag = [...article.matchAll(/<link\b[^>]*>/g)].map(m=>m[0]).find(tag=>attribute(tag,'rel')==='canonical');
assert.equal(attribute(canonicalTag, 'href'), canonical);
for (const key of ['og:title', 'twitter:title']) assert.equal(metas[key], title);
for (const key of ['og:description', 'twitter:description']) assert.equal(metas[key], description);
for (const key of ['og:image', 'twitter:image']) assert.equal(metas[key], `https://www.fluidrwa.com${social}`);
for (const key of ['og:image:alt', 'twitter:image:alt']) assert.equal(metas[key], alt);
assert.equal(metas['og:type'], 'article');
assert.equal(metas['twitter:card'], 'summary_large_image');
const blog = await (await get('/blog')).text();
const card = [...blog.matchAll(/<a class="blog-card"[^>]*>[\s\S]*?<\/a>/g)].map(m=>m[0]).find(tag=>attribute(tag,'href')===route);
assert.ok(card, 'Blog card missing');
assert.equal(card.match(/<h2[^>]*>(.*?)<\/h2>/)?.[1], heading);
assert.equal(card.match(/<p[^>]*>(.*?)<\/p>/)?.[1], description);
const cardImage = card.match(/<img\b[^>]*>/)?.[0];
assert.equal(attribute(cardImage,'src'), thumbnail);
assert.equal(attribute(cardImage,'alt'), alt);
const assets = [];
for (const path of [thumbnail, social, `/assets/infographics/${slug}-comparison.png`, `/assets/infographics/${slug}-comparison-mobile.png`]) {
  const response = await get(path);
  const bytes = Buffer.from(await response.arrayBuffer());
  const metadata = await sharp(bytes).metadata();
  const local = fs.readFileSync(`public${path}`);
  const hash = data=>crypto.createHash('sha256').update(data).digest('hex');
  assert.equal(hash(bytes), hash(local), `Live/local bytes differ: ${path}`);
  if (path===thumbnail) { assert.equal(metadata.format,'webp'); assert.ok(bytes.length<=80*1024); }
  if (path===social) { assert.equal(metadata.width,1200); assert.equal(metadata.height,630); }
  assets.push({path,contentType:response.headers.get('content-type'),format:metadata.format,width:metadata.width,height:metadata.height,bytes:bytes.length,sha256:hash(bytes)});
}
console.log(JSON.stringify({origin,heading,title,description,canonical,alt,assets},null,2));
console.log('PASS rendered article/card metadata and exact live bitmap bytes');
