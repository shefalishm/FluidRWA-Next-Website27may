import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const categories = JSON.parse(fs.readFileSync('data/vendor-social-previews.json','utf8'));
const master = 'assets/social/vendor-glass-master-v1.png';
const esc = s => s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const output = 'assets/social/vendor-categories';
const publicOutput = `public/${output}`;
fs.mkdirSync(output,{recursive:true});
fs.mkdirSync(publicOutput,{recursive:true});
const measurements = [];
for (const [slug,lines] of Object.entries(categories)) {
  const sizes = [];
  for (const [index,line] of lines.entries()) {
    let size = index === 2 ? 48 : 66;
    while (size > 38) {
      const measured = await sharp({text:{text:esc(line),font:`Arial Bold ${size}`,rgba:true}}).metadata();
      if (measured.width <= 580) break;
      size -= 1;
    }
    const measured = await sharp({text:{text:esc(line),font:`Arial Bold ${size}`,rgba:true}}).metadata();
    if (measured.width > 590) throw new Error(`Title too wide: ${slug}: ${line}`);
    sizes.push(size);
  }
  const baseline = lines.length === 3 ? 303 : 319;
  const text = lines.map((line,i)=>`<text x="74" y="${baseline+i*78}" font-size="${sizes[i]}" fill="${i===1?'#08649D':'#10243F'}">${esc(line)}</text>`).join('');
  const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><g font-family="Arial, Helvetica, sans-serif" font-weight="700">${text}<text x="74" y="531" font-size="21" font-weight="500" fill="#10243F">VENDOR DIRECTORY</text></g></svg>`;
  const file = `${slug}-glass-v1.jpg`;
  const bytes = await sharp(master).resize(1200,630,{fit:'fill'}).composite([{input:Buffer.from(overlay)}]).jpeg({quality:88,mozjpeg:true}).toBuffer();
  if(bytes.length > 220*1024) throw new Error(`Preview too large: ${slug}`);
  fs.writeFileSync(path.join(output,file),bytes);
  fs.writeFileSync(path.join(publicOutput,file),bytes);
  measurements.push({slug,title:lines.join(' '),fontSizes:sizes,bytes:bytes.length,width:1200,height:630});
}
fs.mkdirSync('reports',{recursive:true});
fs.writeFileSync('reports/vendor-social-previews-2026-11-24.json',JSON.stringify(measurements,null,2)+'\n');
console.log(`Built ${measurements.length} category and hub previews.`);
