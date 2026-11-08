import fs from "node:fs";
import sharp from "sharp";

const source = fs.readFileSync("vendors/tokenization-platforms/index.html", "utf8");
const providers = [...source.matchAll(/<article class="bc-company-card[\s\S]*?<h3[^>]*>([^<]+)<\/h3>/g)].map(match => match[1]);
const index = providers.indexOf("Zoniqx");
if (providers.length !== 11 || index < 0) throw new Error("Expected all 11 directory providers");
providers.splice(9, 0, ...providers.splice(index, 1));
const esc = value => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const rows = providers.map((name, i) => {
  const x = 64 + (i % 2) * 560;
  const y = 245 + Math.floor(i / 2) * 53;
  return `<g transform="translate(${x} ${y})"><text y="0" fill="#1765aa" font-size="19">${String(i + 1).padStart(2, "0")}</text><text x="48" y="0" font-size="25" font-weight="700">${esc(name)}</text><path d="M0 17H504" stroke="#d9e1e8"/></g>`;
}).join("");
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#f8fbfd"/>
<path d="M0 0H1200V12H0Z" fill="#1765aa"/>
<g font-family="Arial, Helvetica, sans-serif" fill="#162438">
<text x="64" y="68" font-size="20" font-weight="700" fill="#1765aa">FluidRWA</text>
<text x="64" y="127" font-size="48" font-weight="700">Tokenization Platform Directory</text>
<text x="64" y="172" font-size="24">11 issuer-side platforms and service providers</text>
${rows}
<text x="64" y="592" font-size="18" fill="#41536a">Directory order, not a ranking. Confirm asset, investor and jurisdiction eligibility.</text>
</g></svg>`;
const image = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
for (const file of ["assets/social/tokenization-platforms.png", "public/assets/social/tokenization-platforms.png"]) fs.writeFileSync(file, image);
console.log(`Created 1200x630 directory preview: ${providers.join(", ")}`);
