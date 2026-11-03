import fs from 'node:fs';
import sharp from 'sharp';
const base = '/Users/shefalisharma/.codex/generated_images/01a19fc5-89ec-7952-b106-3318869b58b4/';
const assets = [
  ['automation-november3', 'exec-7f9c6f01-cea2-499e-a2ae-f188fcf9fba6.png', 'zapier-vs-make-vs-n8n-operations-automation', 'FluidRWA workflow automation: routing and human approval at an operations desk'],
  ['support-november3', 'exec-01837d22-6ec6-4949-bf8c-f788559f538e.png', 'intercom-vs-zendesk-vs-tidio-ai-customer-support', 'FluidRWA AI customer support: human reviewers at a conversation queue'],
  ['writing-november3', 'exec-1624d6ae-d7f2-482c-9c0c-0efe9342152a.png', 'jasper-vs-copy-ai-vs-writer-marketing-content', 'FluidRWA marketing content: an editor checking drafts against sources'],
  ['bmw-parts-november3', 'exec-0a5b86fb-5e3e-49c5-b2ed-35321bd9abfc.png'],
  ['evidence-api-november3', 'exec-7e8a64d9-e403-457b-8381-fd700f8d280f.png']
];
const previews = JSON.parse(fs.readFileSync('data/blog-card-previews.json', 'utf8'));
for (const [name, input, slug, alt] of assets) {
  for (const prefix of ['assets/blog-thumbnails', 'public/assets/blog-thumbnails']) fs.mkdirSync(prefix, { recursive: true });
  const output = await sharp(base + input).resize(1200, 675, { fit: 'cover' }).webp({ quality: 78 }).toBuffer();
  if (output.length > 200000) throw new Error(`Asset too large: ${name}`);
  for (const prefix of ['assets/blog-thumbnails', 'public/assets/blog-thumbnails']) fs.writeFileSync(`${prefix}/${name}.webp`, output);
  if (slug) {
    const card = await sharp(output).resize(640, 360).webp({ quality: 76 }).toBuffer();
    for (const prefix of ['assets/blog-thumbnails', 'public/assets/blog-thumbnails']) fs.writeFileSync(`${prefix}/${name}-card.webp`, card);
    previews[slug] = { src: `/assets/blog-thumbnails/${name}-card.webp`, alt };
  }
  console.log(`${name}: ${output.length} bytes`);
}
fs.writeFileSync('data/blog-card-previews.json', JSON.stringify(previews, null, 2) + '\n');
