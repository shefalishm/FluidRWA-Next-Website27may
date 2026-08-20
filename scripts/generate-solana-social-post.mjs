import fs from "node:fs";
import https from "node:https";
import path from "node:path";

const root = process.cwd();
const tmpDir = path.join(root, "tmp-solana-social");
const outDir = path.join(root, "outputs", "social");
fs.mkdirSync(tmpDir, { recursive: true });
fs.mkdirSync(outDir, { recursive: true });

const projects = [
  ["Jupiter", "DeFi liquidity aggregator", "jup.ag"],
  ["Raydium", "AMM and liquidity protocol", "raydium.io"],
  ["Helium", "Decentralized wireless network", "helium.com"],
  ["Pyth Network", "Oracle market data infrastructure", "pyth.network"],
  ["Render", "Decentralized GPU network", "rendernetwork.com"],
  ["Magic Eden", "NFT marketplace", "magiceden.io"],
  ["Tensor", "Solana NFT trading marketplace", "tensor.trade"],
  ["Drift", "Decentralized derivatives protocol", "drift.trade"],
  ["Kamino", "Lending and liquidity strategies", "kamino.finance"],
  ["Orca", "Solana decentralized exchange", "orca.so"],
  ["Marinade", "Liquid staking infrastructure", "marinade.finance"],
  ["Sanctum", "Liquid staking liquidity layer", "sanctum.so"],
  ["Metaplex", "NFT and digital asset protocol", "metaplex.com"],
  ["Phantom", "Consumer wallet and app gateway", "phantom.com"],
  ["Backpack", "Wallet, xNFT and exchange ecosystem", "backpack.app"],
  ["MarginFi", "Lending and risk engine", "marginfi.com"]
];

const fallbackColors = ["#14f195", "#9945ff", "#00c2ff", "#f7d65a", "#2d68af"];

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function get(url, destination) {
  return new Promise((resolve) => {
    const file = fs.createWriteStream(destination);
    https
      .get(url, (response) => {
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          file.close();
          fs.rmSync(destination, { force: true });
          get(response.headers.location, destination).then(resolve);
          return;
        }
        if (response.statusCode !== 200) {
          file.close();
          fs.rmSync(destination, { force: true });
          resolve(false);
          return;
        }
        response.pipe(file);
        file.on("finish", () => file.close(() => resolve(true)));
      })
      .on("error", () => {
        file.close();
        fs.rmSync(destination, { force: true });
        resolve(false);
      });
  });
}

async function downloadLogos() {
  for (const [name, , domain] of projects) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const file = path.join(tmpDir, `${slug}.png`);
    if (fs.existsSync(file) && fs.statSync(file).size > 600) continue;
    await get(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`, file);
  }
}

function logoFor(name, index) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const file = path.join(tmpDir, `${slug}.png`);
  if (fs.existsSync(file) && fs.statSync(file).size > 600) {
    const b64 = fs.readFileSync(file).toString("base64");
    return `<image href="data:image/png;base64,${b64}" x="0" y="0" width="70" height="70" preserveAspectRatio="xMidYMid meet"/>`;
  }
  const color = fallbackColors[index % fallbackColors.length];
  const initials = name
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return `<rect x="0" y="0" width="70" height="70" rx="18" fill="${color}" opacity="0.18"/><text x="35" y="45" text-anchor="middle" font-size="24" font-family="Inter, Arial, sans-serif" font-weight="900" fill="${color}">${initials}</text>`;
}

function card([name, description, domain], index) {
  const col = index % 4;
  const row = Math.floor(index / 4);
  const x = 110 + col * 430;
  const y = 348 + row * 142;
  const accent = fallbackColors[index % fallbackColors.length];
  return `
    <g transform="translate(${x}, ${y})">
      <rect x="0" y="0" width="390" height="112" rx="28" fill="url(#cardGlass)" stroke="rgba(45,104,175,.18)" filter="url(#softShadow)"/>
      <path d="M355 0 Q390 0 390 35 L390 112 L310 112 Q360 72 355 0" fill="${accent}" opacity=".10"/>
      <g transform="translate(24 21)">
        <rect x="-8" y="-8" width="86" height="86" rx="24" fill="#fff" opacity=".72" stroke="rgba(45,104,175,.10)"/>
        ${logoFor(name, index)}
      </g>
      <text x="126" y="39" font-size="25" font-family="Inter, Arial, sans-serif" font-weight="900" fill="#111a33">${escapeXml(name)}</text>
      <text x="126" y="67" font-size="14" font-family="Inter, Arial, sans-serif" font-weight="800" fill="#2d68af">${escapeXml(domain)}</text>
      <text x="126" y="93" font-size="16" font-family="Inter, Arial, sans-serif" font-weight="700" fill="#667085">${escapeXml(description)}</text>
    </g>
  `;
}

async function main() {
  await downloadLogos();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080">
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#fff6cf"/>
      <stop offset=".48" stop-color="#f8fbf2"/>
      <stop offset="1" stop-color="#e7fbff"/>
    </linearGradient>
    <linearGradient id="titleBlue" x1="0" x2="1">
      <stop offset="0" stop-color="#10213f"/>
      <stop offset="1" stop-color="#2d68af"/>
    </linearGradient>
    <linearGradient id="cardGlass" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".92"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity=".68"/>
    </linearGradient>
    <filter id="softShadow" x="-20%" y="-40%" width="140%" height="180%">
      <feDropShadow dx="0" dy="22" stdDeviation="22" flood-color="#203a69" flood-opacity=".12"/>
    </filter>
  </defs>
  <rect width="1920" height="1080" rx="32" fill="url(#bg)"/>
  <circle cx="396" cy="128" r="260" fill="#ffe979" opacity=".28"/>
  <circle cx="1416" cy="185" r="345" fill="#9feaf2" opacity=".20"/>
  <circle cx="1640" cy="880" r="245" fill="#14f195" opacity=".08"/>
  <path d="M1440 160 C1535 110 1628 130 1690 205 C1748 275 1742 370 1682 430 C1602 510 1460 482 1406 390 C1362 315 1364 202 1440 160Z" fill="#ffffff" opacity=".36"/>
  <g opacity=".46" stroke="#2d68af" stroke-width="2" fill="none" stroke-dasharray="8 13">
    <path d="M1415 234 C1510 204 1594 235 1662 314"/>
    <path d="M1504 438 C1582 390 1660 395 1730 447"/>
    <path d="M1493 275 C1516 332 1518 386 1495 441"/>
  </g>
  <g transform="translate(1490 118)" opacity=".82">
    ${["Issuer","KYC","Trading","Wallet","DeFi","NFT"].map((label, i) => {
      const positions = [[0,24],[130,18],[218,112],[96,174],[-56,145],[54,96]];
      const [x,y]=positions[i];
      const colors=["#2d68af","#f0c82c","#79ddeb","#9945ff","#14f195","#10213f"];
      return `<g transform="translate(${x} ${y})"><circle r="48" fill="#fff" stroke="${colors[i]}" stroke-width="4" opacity=".92"/><text y="5" text-anchor="middle" font-size="13" font-family="Inter, Arial, sans-serif" font-weight="900" fill="#344054">${label}</text></g>`;
    }).join("")}
  </g>
  <line x1="74" y1="68" x2="74" y2="260" stroke="#2d68af" stroke-width="7" stroke-linecap="round"/>
  <text x="112" y="98" font-size="19" letter-spacing="8" font-family="Inter, Arial, sans-serif" font-weight="900" fill="#2d68af">FLUIDRWA • SOLANA ECOSYSTEM</text>
  <text x="112" y="166" font-size="64" font-family="Georgia, 'Times New Roman', serif" font-weight="900" fill="#111a33">Solana Project</text>
  <text x="112" y="232" font-size="64" font-family="Georgia, 'Times New Roman', serif" font-weight="900" fill="url(#titleBlue)">Landscape</text>
  <text x="720" y="126" font-size="27" font-family="Inter, Arial, sans-serif" font-weight="850" fill="#344054">Projects building across DeFi, DePIN, NFTs, wallets,</text>
  <text x="720" y="166" font-size="27" font-family="Inter, Arial, sans-serif" font-weight="850" fill="#344054">staking, oracles and consumer infrastructure on Solana.</text>
  <rect x="720" y="202" width="726" height="44" rx="22" fill="#ffffff" opacity=".72" stroke="rgba(45,104,175,.14)"/>
  <text x="746" y="231" font-size="15" letter-spacing="5.5" font-family="Inter, Arial, sans-serif" font-weight="950" fill="#2d68af">16 CURRENT PROJECTS • SUBMIT YOUR SOLANA PROJECT</text>
  <line x1="0" y1="312" x2="1920" y2="312" stroke="#d7dec9"/>
  ${projects.map(card).join("")}
  <g transform="translate(110 958)">
    <rect x="0" y="0" width="1700" height="72" rx="28" fill="#10213f" opacity=".96"/>
    <text x="34" y="45" font-size="22" font-family="Inter, Arial, sans-serif" font-weight="900" fill="#fff">Built on Solana?</text>
    <text x="248" y="45" font-size="22" font-family="Inter, Arial, sans-serif" font-weight="700" fill="#c7d7ea">Submit your project to be considered for the FluidRWA Chain Ecosystem directory.</text>
    <rect x="1288" y="14" width="382" height="44" rx="22" fill="#ffea89"/>
    <text x="1479" y="43" text-anchor="middle" font-size="17" letter-spacing="1" font-family="Inter, Arial, sans-serif" font-weight="950" fill="#111a33">fluidrwa.com/ecosystem/solana</text>
  </g>
  <text x="110" y="1052" font-size="14" font-family="Inter, Arial, sans-serif" font-weight="700" fill="#667085">Selected projects shown for ecosystem discovery. Non-exhaustive.</text>
</svg>`;
  const svgPath = path.join(outDir, "fluidrwa-solana-projects-social.svg");
  fs.writeFileSync(svgPath, svg);
  console.log(svgPath);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
