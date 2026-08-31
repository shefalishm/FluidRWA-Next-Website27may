import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const outPath = path.join(root, "assets/social/fluidrwa-fiat-on-off-ramp-vendor-map.png");
const W = 1920;
const H = 1080;

const groups = [
  {
    title: "Embedded & Consumer Ramps",
    note: "Wallet funding, checkout and cash-out experiences",
    color: "#1769d4",
    vendors: [
      ["MoonPay", "moonpay.com", "moonpay"],
      ["Transak", "transak.com", "transak"],
      ["Ramp Network", "ramp.network", "ramp-network"],
      ["Banxa", "banxa.com", "banxa"],
      ["Coinbase Pay", "coinbase.com", "coinbase"],
      ["Mercuryo", "mercuryo.io", "mercuryo"],
    ],
  },
  {
    title: "Stablecoin & Business Rails",
    note: "Treasury, payouts, collections and embedded infrastructure",
    color: "#079b77",
    vendors: [
      ["Bridge", "bridge.xyz", "bridge"],
      ["BVNK", "bvnk.com", "bvnk"],
      ["Zero Hash", "zerohash.com", "zerohash"],
      ["TransFi", "transfi.com", "transfi"],
      ["Alchemy Pay", "alchemypay.org", "alchemy-pay"],
      ["Unlimit", "unlimit.com", "unlimit"],
    ],
  },
  {
    title: "Aggregation & Connectivity",
    note: "Multi-provider access, account connectivity and institutional rails",
    color: "#7155d9",
    vendors: [
      ["Onramper", "onramper.com", "onramper"],
      ["Mesh", "meshpay.com", "mesh"],
      ["Sardine", "sardine.ai", "sardine"],
      ["Fireblocks", "fireblocks.com", "fireblocks"],
      ["Circle", "circle.com", "circle"],
      ["Paxos", "paxos.com", "paxos"],
    ],
  },
];

const escapeXml = (value) => String(value)
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

async function favicon(domain, name, slug) {
  try {
    const buffer = await fs.readFile(path.join(root, `assets/vendor-map-logos/fiat-ramps/${slug}.png`));
    const png = await sharp(buffer)
      .resize(86, 86, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toBuffer();
    return `data:image/png;base64,${png.toString("base64")}`;
  } catch {
    const initials = name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
    const fallback = `<svg xmlns="http://www.w3.org/2000/svg" width="86" height="86"><rect width="86" height="86" rx="20" fill="#edf5ff"/><text x="43" y="54" text-anchor="middle" font-family="Arial" font-size="27" font-weight="800" fill="#1769d4">${escapeXml(initials)}</text></svg>`;
    return `data:image/svg+xml;base64,${Buffer.from(fallback).toString("base64")}`;
  }
}

const prepared = [];
for (const group of groups) {
  const vendors = [];
  for (const [name, domain, slug] of group.vendors) {
    vendors.push({ name, domain, logo: await favicon(domain, name, slug) });
  }
  prepared.push({ ...group, vendors });
}

const groupX = [72, 662, 1252];
const groupY = 260;
const groupW = 548;
const groupH = 664;
const cardW = 500;
const cardH = 76;

let body = "";
prepared.forEach((group, groupIndex) => {
  const x = groupX[groupIndex];
  body += `
    <g filter="url(#shadow)">
      <rect x="${x}" y="${groupY}" width="${groupW}" height="${groupH}" rx="30" fill="rgba(255,255,255,.82)" stroke="#d8e7f5"/>
    </g>
    <rect x="${x + 22}" y="${groupY + 22}" width="${groupW - 44}" height="112" rx="23" fill="${group.color}" opacity=".11"/>
    <circle cx="${x + 60}" cy="${groupY + 60}" r="23" fill="${group.color}"/>
    <text x="${x + 60}" y="${groupY + 68}" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-size="18" font-weight="900" fill="white">${String(groupIndex + 1).padStart(2, "0")}</text>
    <text x="${x + 98}" y="${groupY + 59}" font-family="Inter,Arial,sans-serif" font-size="27" font-weight="900" fill="#07152c">${escapeXml(group.title)}</text>
    <text x="${x + 98}" y="${groupY + 89}" font-family="Inter,Arial,sans-serif" font-size="14" font-weight="700" fill="#62738a">${escapeXml(group.note)}</text>
  `;
  group.vendors.forEach((vendor, index) => {
    const cy = groupY + 154 + index * 80;
    body += `
      <rect x="${x + 24}" y="${cy}" width="${cardW}" height="${cardH}" rx="18" fill="#ffffff" stroke="#dbe8f4"/>
      <rect x="${x + 38}" y="${cy + 10}" width="56" height="56" rx="14" fill="#f7fbff" stroke="#deebf7"/>
      <image href="${vendor.logo}" x="${x + 45}" y="${cy + 17}" width="42" height="42" preserveAspectRatio="xMidYMid meet"/>
      <text x="${x + 112}" y="${cy + 33}" font-family="Inter,Arial,sans-serif" font-size="23" font-weight="900" fill="#07152c">${escapeXml(vendor.name)}</text>
      <text x="${x + 112}" y="${cy + 57}" font-family="Inter,Arial,sans-serif" font-size="15" font-weight="700" fill="#718198">${escapeXml(vendor.domain)}</text>
    `;
  });
});

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="background" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#fff4b5"/>
      <stop offset=".48" stop-color="#fbfdff"/>
      <stop offset="1" stop-color="#ccecff"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="150%">
      <feDropShadow dx="0" dy="15" stdDeviation="16" flood-color="#0b2546" flood-opacity=".12"/>
    </filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#background)"/>
  <circle cx="25" cy="35" r="260" fill="#ffe474" opacity=".30"/>
  <circle cx="1870" cy="55" r="320" fill="#9ed9ff" opacity=".26"/>
  <text x="76" y="75" font-family="Inter,Arial,sans-serif" font-size="23" font-weight="900" letter-spacing="7" fill="#1769d4">FLUIDRWA VENDOR MAP</text>
  <text x="76" y="151" font-family="Georgia,serif" font-size="72" font-weight="900" fill="#07152c">Fiat On-Ramp &amp; Off-Ramp Infrastructure</text>
  <text x="78" y="205" font-family="Inter,Arial,sans-serif" font-size="25" font-weight="650" fill="#586a81">A buyer-side overview of the providers connecting bank money, stablecoins, wallets and digital assets.</text>
  ${body}
  <rect x="72" y="958" width="1728" height="66" rx="24" fill="rgba(255,226,95,.76)" stroke="rgba(207,157,0,.35)"/>
  <text x="104" y="999" font-family="Inter,Arial,sans-serif" font-size="20" font-weight="800" fill="#07152c">Examples for market education and vendor discovery. Capabilities vary by geography, asset, payment method and regulatory status.</text>
  <text x="1612" y="999" font-family="Inter,Arial,sans-serif" font-size="24" font-weight="950" fill="#1769d4">fluidrwa.com</text>
</svg>`;

await fs.mkdir(path.dirname(outPath), { recursive: true });
await sharp(Buffer.from(svg)).png().toFile(outPath);
console.log(outPath);
