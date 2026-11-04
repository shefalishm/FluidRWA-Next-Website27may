import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const inputDir = process.argv[2];
if (!inputDir) throw new Error('Pass the original image directory');
const assets = [
  ['crm', '2d199f5a-0fa2-4a04-81d5-a20e16021243', 'hubspot-vs-salesforce-vs-attio-crm-operations', 'Illustrative CRM analyst checking relationship pipelines and duplicate contact cards'],
  ['prospecting', 'a26676dc-4262-47dd-8729-0ec7626f65b3', 'clay-vs-apollo-vs-instantly-sales-prospecting', 'Illustrative researcher checking contact provenance and outreach exclusions'],
  ['design', '9b1bc718-c161-4888-a4a4-5fed11903fa5', 'canva-vs-figma-vs-midjourney-visual-production', 'Illustrative design desk with a component grid and printed campaign formats'],
  ['tradelens', '73977191-a350-4803-bcdf-656ef2810fa4'],
  ['simulation', 'c605827b-be3f-496b-983f-7d1226a8032d']
];
const registryPath = 'data/blog-card-previews.json';
const previews = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
function write(name, bytes, limit) {
  if (bytes.length > limit) throw new Error(`${name} exceeds ${limit} bytes`);
  const asset = `assets/blog-thumbnails/${name}.webp`;
  fs.writeFileSync(asset, bytes);
  fs.writeFileSync(`public/${asset}`, bytes);
}
for (const [topic, id, slug, alt] of assets) {
  const name = `${topic}-november4`;
  const full = await sharp(path.join(inputDir, `exec-${id}.png`)).resize(1200, 675, { fit: 'cover' }).webp({ quality: 77 }).toBuffer();
  write(name, full, 200000);
  if (slug) {
    write(`${name}-card`, await sharp(full).resize(640, 360).webp({ quality: 74 }).toBuffer(), 80000);
    previews[slug] = { src: `/assets/blog-thumbnails/${name}-card.webp`, alt: `FluidRWA: ${alt}` };
  }
}
fs.writeFileSync(registryPath, JSON.stringify(previews, null, 2) + '\n');
