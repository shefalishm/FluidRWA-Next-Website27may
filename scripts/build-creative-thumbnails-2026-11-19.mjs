import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourceDir = process.argv[2];
if (!sourceDir) throw new Error("Pass the directory containing the approved generated PNG artwork.");
const batch = JSON.parse(fs.readFileSync(path.join(root, "data/creative-thumbnails-2026-11-19.json")));
const contact = [];
for (const [index, item] of batch.entries()) {
  const source = path.join(sourceDir, item.sourceFile);
  let webp;
  for (let quality = 78; quality >= 35; quality -= 5) {
    webp = await sharp(source).resize(1200, 675, { fit: "cover" }).webp({ quality, effort: 6 }).toBuffer();
    if (webp.length < 81920) break;
  }
  if (webp.length >= 81920) throw new Error("Thumbnail exceeds 80 KiB: " + item.slug);
  const social = await sharp(source).resize(1200, 630, { fit: "cover" }).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  for (const base of ["assets", "public/assets"]) {
    fs.mkdirSync(path.join(root, base, "blog-thumbnails"), { recursive: true });
    fs.mkdirSync(path.join(root, base, "social"), { recursive: true });
    fs.writeFileSync(path.join(root, base, "blog-thumbnails", item.slug + "-creative-20261119.webp"), webp);
    fs.writeFileSync(path.join(root, base, "social", item.slug + "-creative-20261119.jpg"), social);
  }
  contact.push({ input: await sharp(webp).resize(400, 225).png().toBuffer(), left: (index % 2) * 400, top: Math.floor(index / 2) * 225 });
  console.log(item.slug + ": thumbnail " + webp.length + " bytes, social " + social.length + " bytes");
}
await sharp({ create: { width: 800, height: 1125, channels: 3, background: "#ffffff" } }).composite(contact).png().toFile("/tmp/fluidrwa-creative-thumbnails-contact.png");
