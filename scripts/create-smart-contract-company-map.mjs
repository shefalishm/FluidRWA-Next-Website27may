import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const outPath = path.join(root, "assets/social/fluidrwa-smart-contract-development-company-map.png");

const W = 1920;
const H = 1080;

const groups = [
  {
    title: "Build & Implementation",
    color: "#1769d4",
    vendors: [
      ["Minddeft", "minddeft.com", "assets/company-logos/minddeft-technologies.webp"],
      ["OpenZeppelin", "openzeppelin.com", "assets/company-logos/openzeppelin.png"],
      ["Consensys Diligence", "consensys.io"],
      ["Thirdweb", "thirdweb.com"],
      ["Foundry", "getfoundry.sh"],
      ["Hardhat", "hardhat.org"],
      ["Remix IDE", "remix.ethereum.org"],
      ["Cookbook.dev", "cookbook.dev"],
      ["TokenFi", "tokenfi.com"],
      ["Zetachain", "zetachain.com"],
      ["Zodiac", "zodiac.wiki"],
      ["Opyn", "opyn.co", "https://cdn.prod.website-files.com/66671c97ca270ea78e0b24b7/66671cd1630e74de0b7ca89c_ico.png"],
    ],
  },
  {
    title: "Audit, Security & Bug Bounties",
    color: "#0b9c7a",
    vendors: [
      ["Ackee Blockchain", "ackeeblockchain.com", "assets/company-logos/ackee-blockchain.png"],
      ["CertiK", "certik.com", "assets/company-logos/certik.png"],
      ["Code4rena", "code4rena.com"],
      ["Cyfrin", "cyfrin.io"],
      ["Halborn", "halborn.com"],
      ["Hexens", "hexens.io"],
      ["Sherlock", "sherlock.xyz"],
      ["Spearbit", "spearbit.com"],
      ["Trail of Bits", "trailofbits.com", "assets/company-logos/trail-of-bits.png"],
      ["Immunefi", "immunefi.com"],
      ["Runtime Verification", "runtimeverification.com"],
    ],
  },
  {
    title: "Ops, Oracles & Automation",
    color: "#e1a400",
    vendors: [
      ["Blocknative", "blocknative.com", "assets/company-logos/blocknative.png"],
      ["Chainlink", "chain.link"],
      ["Gelato", "gelato.network"],
      ["Pyth Network", "pyth.network"],
      ["Tenderly", "tenderly.co"],
      ["UMA Protocol", "uma.xyz"],
    ],
  },
];

const escapeXml = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

async function imageToDataUri(fileOrDomain, fallbackText) {
  let buf;
  try {
    if (fileOrDomain && fileOrDomain.startsWith("https://")) {
      const res = await fetch(fileOrDomain);
      if (!res.ok) throw new Error(`image ${res.status}`);
      buf = Buffer.from(await res.arrayBuffer());
    } else if (fileOrDomain && fileOrDomain.includes("/")) {
      buf = await fs.readFile(path.join(root, fileOrDomain));
    } else if (fileOrDomain) {
      const url = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(fileOrDomain)}&sz=128`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`favicon ${res.status}`);
      buf = Buffer.from(await res.arrayBuffer());
    }
    if (buf) {
      const png = await sharp(buf).resize(72, 72, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } }).png().toBuffer();
      return `data:image/png;base64,${png.toString("base64")}`;
    }
  } catch {
    // Fall through to generated initials.
  }
  const initials = fallbackText
    .split(/\s|\./)
    .filter(Boolean)
    .slice(0, 2)
    .map((x) => x[0]?.toUpperCase())
    .join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72"><rect width="72" height="72" rx="18" fill="#eef6ff"/><text x="36" y="45" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="800" fill="#1769d4">${escapeXml(initials)}</text></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

function vendorCard({ name, domain, logo }, x, y, w, h) {
  const domainLine = domain || "specialist skill";
  const words = name.split(" ");
  const shouldWrap = name.length > 18 && words.length > 1;
  const firstLine = shouldWrap ? words.slice(0, -1).join(" ") : name;
  const secondLine = shouldWrap ? words.at(-1) : "";
  return `
    <g>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="rgba(255,255,255,.92)" stroke="#d9e8f8"/>
      <image href="${logo}" x="${x + 16}" y="${y + 14}" width="52" height="52" preserveAspectRatio="xMidYMid meet"/>
      <text x="${x + 82}" y="${y + (shouldWrap ? 29 : 34)}" font-family="Inter, Arial, sans-serif" font-size="${shouldWrap ? 19 : 21}" font-weight="850" fill="#07152c">${escapeXml(firstLine)}</text>
      ${shouldWrap ? `<text x="${x + 82}" y="${y + 52}" font-family="Inter, Arial, sans-serif" font-size="19" font-weight="850" fill="#07152c">${escapeXml(secondLine)}</text>` : ""}
      <text x="${x + 82}" y="${y + 66}" font-family="Inter, Arial, sans-serif" font-size="14" font-weight="700" fill="#6b7a90">${escapeXml(domainLine)}</text>
    </g>
  `;
}

const preparedGroups = [];
for (const group of groups) {
  const vendors = [];
  for (const [name, domain, localLogo] of group.vendors) {
    vendors.push({
      name,
      domain,
      logo: await imageToDataUri(localLogo || domain, name),
    });
  }
  preparedGroups.push({ ...group, vendors });
}

const left = 80;
const top = 238;
const colGap = 28;
const groupW = 560;
const sectionH = 734;
const cardW = 250;
const cardH = 78;
const cardGap = 12;

let groupSvg = "";
preparedGroups.forEach((group, gi) => {
  const x = left + gi * (groupW + colGap);
  groupSvg += `
    <g>
      <rect x="${x}" y="${top}" width="${groupW}" height="${sectionH}" rx="32" fill="rgba(255,255,255,.7)" stroke="#d7e6f6"/>
      <rect x="${x + 22}" y="${top + 22}" width="${groupW - 44}" height="78" rx="24" fill="${group.color}" opacity=".12"/>
      <circle cx="${x + 62}" cy="${top + 61}" r="24" fill="${group.color}"/>
      <text x="${x + 62}" y="${top + 70}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="900" fill="white">${String(gi + 1).padStart(2, "0")}</text>
      <text x="${x + 104}" y="${top + 54}" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="900" fill="#07152c">${escapeXml(group.title)}</text>
      <text x="${x + 104}" y="${top + 82}" font-family="Inter, Arial, sans-serif" font-size="15" font-weight="800" letter-spacing="3" fill="#7b8ba0">SELECTED PROVIDERS</text>
  `;
  group.vendors.forEach((vendor, i) => {
    const cx = x + 22 + (i % 2) * (cardW + cardGap);
    const cy = top + 118 + Math.floor(i / 2) * (cardH + cardGap);
    groupSvg += vendorCard(vendor, cx, cy, cardW, cardH);
  });
  groupSvg += `</g>`;
});

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#fff5bf"/>
      <stop offset=".48" stop-color="#f8fbff"/>
      <stop offset="1" stop-color="#ccefff"/>
    </linearGradient>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="#0c2344" flood-opacity=".12"/>
    </filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <circle cx="88" cy="82" r="270" fill="#ffe873" opacity=".35"/>
  <circle cx="1790" cy="122" r="310" fill="#a7dfff" opacity=".35"/>
  <circle cx="1420" cy="1050" r="260" fill="#bdf1df" opacity=".28"/>
  <g filter="url(#softShadow)">
    <rect x="54" y="42" width="1812" height="986" rx="42" fill="rgba(255,255,255,.38)" stroke="rgba(23,105,212,.16)"/>
  </g>
  <text x="88" y="104" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="900" letter-spacing="9" fill="#1769d4">FLUIDRWA MARKET MAP</text>
  <text x="88" y="176" font-family="Georgia, serif" font-size="76" font-weight="900" fill="#07152c">Smart Contract Development Companies</text>
  <text x="90" y="215" font-family="Inter, Arial, sans-serif" font-size="27" font-weight="650" fill="#5b6b82">A buyer-side view of the build, audit, monitoring and automation vendors behind serious onchain products.</text>
  ${groupSvg}
  <g>
    <rect x="80" y="1000" width="1760" height="48" rx="24" fill="rgba(255,232,115,.8)" stroke="rgba(225,164,0,.35)"/>
    <text x="112" y="1031" font-family="Inter, Arial, sans-serif" font-size="21" font-weight="800" fill="#07152c">Category map for market education and vendor discovery. Not a ranking, endorsement or security guarantee.</text>
    <text x="1640" y="1031" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="950" fill="#1769d4">fluidrwa.com</text>
  </g>
</svg>`;

await fs.mkdir(path.dirname(outPath), { recursive: true });
await sharp(Buffer.from(svg)).png().toFile(outPath);
console.log(outPath);
