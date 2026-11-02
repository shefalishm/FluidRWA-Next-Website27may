import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

export const slugs = [
  'cargox-vs-bolero-vs-enigio-electronic-trade-documents',
  'regen-vs-toucan-vs-open-forest-carbon-infrastructure',
  'openspace-vs-dronedeploy-vs-siteaware-construction-evidence'
];
const hashes = new Set();
for (const slug of slugs) {
  const source = fs.readFileSync(`content/blog/${slug}.md`, 'utf8');
  const html = fs.readFileSync(`blog/${slug}/index.html`, 'utf8');
  assert.ok(source.includes('reviewedDate: "2026-11-02"'));
  assert.ok(html.includes(`rel="canonical" href="https://www.fluidrwa.com/blog/${slug}"`));
  assert.match(html, /<table\b/);
  assert.match(html, /Should your company be considered/);
  assert.match(html, /mailto:contact@fluidrwa.com/);
  for (const a of html.matchAll(/<a\b[^>]*href="https?:\/\/[^>]+>/g)) {
    assert.match(a[0], /rel="[^"]*nofollow/, `${slug}: outbound policy ${a[0]}`);
  }
  for (const a of html.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(html.includes(`id="${a[1]}"`), `${slug}: broken anchor ${a[1]}`);
  }
  const image = source.match(/^image: "([^"]+)"/m)[1];
  const bytes = fs.readFileSync(`.${image}`);
  assert.deepEqual(bytes, fs.readFileSync(`public${image}`));
  const metadata = await sharp(bytes).metadata();
  assert.equal(metadata.format, 'webp');
  assert.equal(metadata.width, 1200);
  assert.equal(metadata.height, 675);
  assert.ok(bytes.length < 200000);
  assert.ok((await sharp(bytes).stats()).channels.some(channel => channel.stdev > 20));
  const hash = createHash('sha256').update(bytes).digest('hex');
  assert.ok(!hashes.has(hash), 'Images must be unique');
  hashes.add(hash);
}
const carbon = fs.readFileSync(`content/blog/${slugs[1]}.md`, 'utf8');
assert.match(carbon, /open-source transition FAQ/);
assert.match(carbon, /pending until finalized/);
const study = fs.readFileSync('lib/useCaseStudiesNovember2.ts', 'utf8');
assert.match(study, /cannot take physical delivery/);
assert.match(study, /separate.*trial/i);
assert.ok(!study.includes('Siemens'));
const gold = fs.readFileSync('assets/blog-thumbnails/hsbc-gold-november2.webp');
assert.deepEqual(gold, fs.readFileSync('public/assets/blog-thumbnails/hsbc-gold-november2.webp'));
assert.ok(gold.length < 200000);
assert.ok(!hashes.has(createHash('sha256').update(gold).digest('hex')));
console.log('PASS: November 2 batch canonicals, tables, source-link policy, anchors, unique compressed images and case-study boundaries.');
