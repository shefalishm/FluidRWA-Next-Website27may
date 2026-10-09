import fs from 'node:fs';
import sharp from 'sharp';
import batch from './comparison-image-batch-october-8.mjs';

const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
for (const item of batch) {
  const cards = item.vendors.map((vendor, index) => {
    const x = 64 + index * 368;
    return `<rect x="${x}" y="258" width="336" height="200" rx="8" fill="${index === 1 ? '#edf6fc' : '#ffffff'}" stroke="#c9dce9"/><rect x="${x}" y="258" width="336" height="8" fill="${index === 1 ? '#f4d54e' : '#2664a9'}"/><text x="${x + 24}" y="319" font-size="${vendor.length > 14 ? 27 : 31}" font-weight="750">${escape(vendor)}</text><text x="${x + 24}" y="365" font-size="17" fill="#546b80">${escape(item.rows[0][0])}</text><text x="${x + 24}" y="405" font-size="19">${escape(item.rows[0][index + 1]).split(' ').reduce((lines, word) => { const last = lines.at(-1); if (last && (last + ' ' + word).length <= 26) lines[lines.length - 1] += ' ' + word; else lines.push(word); return lines; }, []).map((line, n) => `<tspan x="${x + 24}" dy="${n ? 25 : 0}">${line}</tspan>`).join('')}</text>`;
  }).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#f6fbfe"/><rect width="1200" height="12" fill="#ffdf45"/><g font-family="Arial,sans-serif" fill="#12213a"><text x="64" y="75" font-size="24" font-weight="750" fill="#2664a9">FLUIDRWA RESEARCH</text><text x="64" y="154" font-size="${item.title.length > 25 ? 42 : 48}" font-weight="750">${escape(item.title)}</text><text x="64" y="200" font-size="22" fill="#546b80">Three approaches. One buyer decision.</text>${cards}<text x="64" y="531" font-size="20" fill="#546b80">Documented capabilities, pilot priorities and procurement questions.</text><text x="64" y="588" font-size="19" fill="#2664a9">FluidRWA.com</text><text x="1136" y="588" text-anchor="end" font-size="18" fill="#546b80">Checked October 9, 2026</text></g></svg>`;
  const png = await sharp(Buffer.from(svg)).png({ palette: true, compressionLevel: 9 }).toBuffer();
  for (const directory of ['assets/social', 'public/assets/social']) fs.writeFileSync(`${directory}/blog-${item.slug}.png`, png);
}
console.log('Generated five clean article cover PNGs.');
