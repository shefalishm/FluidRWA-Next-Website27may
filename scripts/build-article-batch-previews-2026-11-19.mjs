import fs from "node:fs";
import sharp from "sharp";

const batch = JSON.parse(fs.readFileSync("data/article-batch-2026-11-19.json", "utf8"));
const escape = value => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;");
for (const article of batch) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="#F7F9FC"/>
    <path d="M0 0h1200v10H0z" fill="${article.accent}"/>
    <text x="64" y="72" font-family="Arial,sans-serif" font-size="27" font-weight="700" fill="#16243B">FluidRWA</text>
    <text x="64" y="120" font-family="Arial,sans-serif" font-size="18" font-weight="700" fill="${article.accent}">${escape(article.label)}</text>
    ${article.title.map((line, index) => `<text x="64" y="${199 + index * 64}" font-family="Arial,sans-serif" font-size="51" font-weight="700" fill="#16243B">${escape(line)}</text>`).join("")}
    <path d="M110 385H1090" stroke="#C8D3DF" stroke-width="3"/>
    ${article.steps.map((step, index) => {
      const x = 64 + index * 365;
      return `<rect x="${x}" y="334" width="340" height="134" rx="8" fill="#FFFFFF" stroke="#D8E1EB" stroke-width="2"/>
        <circle cx="${x + 35}" cy="372" r="15" fill="${article.accent}"/>
        <text x="${x + 35}" y="378" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" font-weight="700" fill="#FFFFFF">${index + 1}</text>
        <text x="${x + 24}" y="433" font-family="Arial,sans-serif" font-size="27" font-weight="700" fill="#16243B">${escape(step)}</text>`;
    }).join("")}
    <text x="64" y="548" font-family="Arial,sans-serif" font-size="23" fill="#526379">${escape(article.caption)}</text>
    <text x="64" y="591" font-family="Arial,sans-serif" font-size="17" fill="${article.accent}">fluidrwa.com / insights</text>
  </svg>`;
  const webp = await sharp(Buffer.from(svg)).webp({quality: 84}).toBuffer();
  const jpg = await sharp(Buffer.from(svg)).jpeg({quality: 90}).toBuffer();
  for (const root of ["assets", "public/assets"]) {
    fs.mkdirSync(`${root}/blog-thumbnails`, {recursive: true});
    fs.mkdirSync(`${root}/social`, {recursive: true});
    fs.writeFileSync(`${root}/blog-thumbnails/${article.slug}.webp`, webp);
    fs.writeFileSync(`${root}/social/${article.slug}.jpg`, jpg);
  }
}
console.log(`Built ${batch.length} workflow previews and social images.`);
