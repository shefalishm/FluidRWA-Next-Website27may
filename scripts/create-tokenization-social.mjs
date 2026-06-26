import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const out = [
  path.join(root, "assets/social/tokenization-platforms.png"),
  path.join(root, "public/assets/social/tokenization-platforms.png")
];

const logoRoots = [
  path.join(root, "../outputs/digital-asset-infrastructure-stack/assets/logos"),
  path.join(root, "../outputs/tokenization-platforms-social/assets/logos")
];

const providers = [
  ["Z", "Zoniqx", "Full-stack infrastructure", "zoniqx.png", "#ffffff"],
  ["S", "Securitize", "Regulated digital securities", "securitize.png", "#ffffff"],
  ["T", "Tokeny", "Compliance-first issuance", "tokeny.png", "#ffffff"],
  ["D", "DigiShares", "White-label marketplaces", "digishares.png", "#ffffff"],
  ["T", "Taurus", "Bank-grade infrastructure", "taurus-official.png", "#ffffff"],
  ["P", "Persistent Systems", "Enterprise implementation", "persistent-systems.png", "#ffffff"],
  ["M", "Ment Tech", "RWA platform engineering", "ment-tech-clean.png", "#0b0d10"],
  ["I", "InvestaX", "Licensed capital markets", "investax.png", "#ffffff"],
  ["B", "Brickken", "No-code issuer platform", "brickken.png", "#ffffff"]
];

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function logoData(fileName) {
  for (const logoRoot of logoRoots) {
    const file = path.join(logoRoot, fileName);
    if (fs.existsSync(file)) {
      return `data:image/png;base64,${fs.readFileSync(file).toString("base64")}`;
    }
  }
  return null;
}

function providerCard([initial, name, note, logo, logoBg], index) {
  const col = index % 3;
  const row = Math.floor(index / 3);
  const x = 74 + col * 354;
  const y = 288 + row * 88;
  const accent = index % 3 === 0 ? "#2f66ad" : index % 3 === 1 ? "#76d9e8" : "#f6d74e";
  const src = logoData(logo);
  const logoX = logo === "ment-tech-clean.png" ? 16 : 21;
  const logoY = logo === "ment-tech-clean.png" ? 14 : 19;
  const logoSize = logo === "ment-tech-clean.png" ? 50 : 40;
  return `
    <g transform="translate(${x} ${y})">
      <rect width="318" height="70" rx="22" fill="rgba(255,255,255,.88)" stroke="#d8e5ee" stroke-width="1.4"/>
      <rect x="16" y="14" width="50" height="50" rx="15" fill="${logoBg}" stroke="#e2ebf1" stroke-width="1.3"/>
      ${
        src
          ? `<image href="${src}" x="${logoX}" y="${logoY}" width="${logoSize}" height="${logoSize}" preserveAspectRatio="xMidYMid meet"/>`
          : `<rect x="18" y="17" width="44" height="44" rx="14" fill="${accent}" opacity=".18" stroke="${accent}" stroke-width="1.4"/>
      <text x="40" y="46" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="19" font-weight="800" fill="${accent}">${esc(initial)}</text>`
      }
      <text x="80" y="32" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="800" fill="#111c35">${esc(name)}</text>
      <text x="80" y="55" font-family="Arial, Helvetica, sans-serif" font-size="12.5" font-weight="700" fill="#6f7a8f">${esc(note)}</text>
    </g>`;
}

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fff4be"/>
      <stop offset=".47" stop-color="#fffdf2"/>
      <stop offset="1" stop-color="#e7fbff"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-30%" width="140%" height="160%">
      <feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#17335d" flood-opacity=".14"/>
    </filter>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="138" cy="78" r="190" fill="#ffe36e" opacity=".22"/>
  <circle cx="1056" cy="88" r="220" fill="#baf0f6" opacity=".36"/>
  <path d="M64 74 L64 184" stroke="#2f66ad" stroke-width="6" stroke-linecap="round"/>
  <text x="88" y="88" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="800" letter-spacing="5" fill="#2f66ad">FLUIDRWA • TOKENIZATION INTELLIGENCE</text>
  <text x="88" y="142" font-family="Georgia, 'Times New Roman', serif" font-size="52" font-weight="800" fill="#111c35">Tokenization Platforms</text>
  <text x="88" y="188" font-family="Georgia, 'Times New Roman', serif" font-size="40" font-weight="800" fill="#2f66ad">Landscape</text>
  <text x="88" y="230" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="800" fill="#33425c">Issuer-side platforms helping assets, funds and investment products move onchain.</text>
  <text x="88" y="262" font-family="Arial, Helvetica, sans-serif" font-size="13" font-weight="800" letter-spacing="3.6" fill="#2f66ad">9 SELECTED PROVIDERS • ISSUANCE • COMPLIANCE • LIFECYCLE</text>
  <g filter="url(#shadow)">
    ${providers.map(providerCard).join("")}
  </g>
  <line x1="56" y1="574" x2="1144" y2="574" stroke="#d8e5ee" stroke-width="1"/>
  <text x="86" y="606" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="800" fill="#111c35">Landscape created by FluidRWA</text>
  <text x="890" y="606" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="700" fill="#6f7a8f">fluidrwa.com • Selected providers</text>
</svg>`;

for (const file of out) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(file);
}

console.log("Created tokenization social image:", out.join(", "));
