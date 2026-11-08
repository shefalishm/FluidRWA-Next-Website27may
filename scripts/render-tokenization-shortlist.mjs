import fs from 'node:fs';
import sharp from 'sharp';

for (const suffix of ['', '-mobile']) {
  const base = `assets/infographics/rwa-tokenization-platform-shortlist-map-2026${suffix}`;
  const svg = fs.readFileSync(`${base}.svg`);
  const png = await sharp(svg).png({ compressionLevel: 9, palette: true }).toBuffer();
  fs.writeFileSync(`${base}.png`, png);
  fs.writeFileSync(`public/${base}.png`, png);
  await sharp(svg).webp({ quality: 85 }).toFile(`${base}.webp`);
}
console.log('Rendered desktop/mobile shortlist PNGs and WebP mirrors from the maintained SVGs.');
