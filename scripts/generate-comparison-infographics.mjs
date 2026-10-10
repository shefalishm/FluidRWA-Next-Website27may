import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import octoberBatch from "./comparison-image-batch-october-7.mjs";
import october8Batch from "./comparison-image-batch-october-8.mjs";
import october10Batch from "./comparison-image-batch-october-10.mjs";

const root = process.cwd();
const outputDirs = [path.join(root, "assets/infographics"), path.join(root, "public/assets/infographics")];
outputDirs.forEach((dir) => fs.mkdirSync(dir, { recursive: true }));

const comparisons = [
  ...october10Batch,
  ...october8Batch,
  ...octoberBatch,
  {
    slug: "openpayd-vs-fiat-republic-vs-banking-circle-fiat-rails",
    title: "Institutional Fiat Rails",
    vendors: ["OpenPayd", "Fiat Republic", "Banking Circle"],
    rows: [
      ["Best fit", "Modular accounts, FX and stablecoin flows", "Crypto-platform deposits and withdrawals", "Bank-led institutional settlement"],
      ["Core model", "Accounts and payments API", "Member and end-user virtual accounts", "Banking and multi-rail services"],
      ["Test first", "Entity and service ownership", "Deposit and payout reconciliation", "Eligibility and rail availability"]
    ]
  },
  {
    slug: "middesk-vs-kyckr-vs-kompany-kyb-apis",
    title: "Business Verification APIs",
    vendors: ["Middesk", "Kyckr", "kompany"],
    rows: [
      ["Best fit", "Automated business onboarding", "Official registry and UBO evidence", "Cross-border entity data"],
      ["Core model", "Identity, risk and monitoring API", "Registry and ownership API", "Company records and documents API"],
      ["Test first", "Match and change alerts", "Source and ownership chain", "Country and document coverage"]
    ]
  },
  {
    slug: "hacken-vs-certik-vs-the-network-firm-proof-of-reserves",
    title: "Proof of Reserves Services",
    vendors: ["Hacken", "CertiK", "The Network Firm"],
    rows: [
      ["Best fit", "Scoped reserve verification", "Dated or continuous PoR", "On-chain reserve reporting"],
      ["Core output", "Coverage verification", "Report and optional live dashboard", "Data feeds and reserve reporting"],
      ["Test first", "Asset and liability scope", "Assurance and update cadence", "Off-chain data provenance"]
    ]
  },
  {
    slug: "ottersec-vs-neodyme-vs-sec3-solana-audits",
    title: "Solana Program Auditors",
    vendors: ["OtterSec", "Neodyme", "Sec3"],
    rows: [
      ["Best fit", "Comparable Solana audit history", "Deep Solana research and reviews", "Solana security assessment"],
      ["Core evidence", "Published project reports", "Research and Token-2022 report", "Audit and analysis materials"],
      ["Test first", "Named reviewers and re-test", "Protocol assumptions and scope", "Manual and automated review mix"]
    ]
  },
  {
    slug: "vnx-vs-meld-gold-vs-kinesis-tokenized-gold",
    title: "Tokenized Gold Models",
    vendors: ["VNX", "Meld Gold", "Kinesis"],
    rows: [
      ["Best fit", "White-label metal tokenization", "Bullion ecosystem integration", "KAU and KAG business use"],
      ["Core model", "Partner-branded token lifecycle", "Gold and silver token network", "Existing metal-backed currencies"],
      ["Test first", "Title, custody and mint controls", "Conversion and partner terms", "Redemption and audit terms"]
    ]
  },
  {
    slug: "chainalysis-vs-trm-vs-elliptic-blockchain-analytics",
    title: "Crypto Analytics and Compliance",
    vendors: ["Chainalysis", "TRM Labs", "Elliptic", "Cognyte"],
    rows: [
      ["Best fit", "Mature compliance and investigations", "Configurable monitoring and threat intelligence", "Screening, monitoring and rescreening", "Public-sector investigative intelligence"],
      ["Core workflow", "KYT, investigations and risk operations", "Monitoring, cases and investigations", "Wallet screening and transaction risk", "Tracing and wider intelligence fusion"],
      ["Test first", "Alert quality, APIs and case evidence", "Rule tuning and false positives", "Attribution, categories and reporting", "Evidence handling and analyst workflow"]
    ]
  },
  {
    slug: "alchemy-vs-quicknode-vs-infura-rpc-node-providers",
    title: "RPC and Node Infrastructure",
    vendors: ["Alchemy", "QuickNode", "Infura"],
    rows: [
      ["Best fit", "Apps needing integrated developer APIs", "Multi-chain apps and event pipelines", "Ethereum and EVM managed access"],
      ["Core workflow", "RPC, data APIs, smart wallets and webhooks", "RPC, Streams, Webhooks and dedicated nodes", "Managed APIs and Ethereum workflows"],
      ["Test first", "Rate limits, simulation and wallet flows", "Latency, failover and archive access", "Reliability, methods and usage limits"]
    ]
  },
  {
    slug: "taxbit-vs-ledgible-vs-lukka-enterprise-crypto-accounting-tax",
    title: "Enterprise Crypto Accounting and Tax",
    vendors: ["TaxBit", "Ledgible", "Lukka"],
    rows: [
      ["Best fit", "Platforms with tax reporting obligations", "Finance teams and accounting firms", "Institutions needing governed asset data"],
      ["Core workflow", "Accounting and information reporting", "Cost basis, books and tax workpapers", "Data lineage, valuation and reporting"],
      ["Test first", "Forms, entities and correction workflow", "Close controls and exception handling", "Coverage, pricing sources and reconciliation"]
    ]
  },
  {
    slug: "blockaid-vs-blowfish-vs-hypernative-web3-security",
    title: "Scam Detection and Web3 Security",
    vendors: ["Blockaid", "Blowfish", "Hypernative"],
    rows: [
      ["Best fit", "Broad application and wallet protection", "Pre-signing wallet warnings", "Protocol and treasury monitoring"],
      ["Control point", "During application interaction", "Immediately before signature", "Before signing and after deployment"],
      ["Test first", "Precision, latency and chain coverage", "Warning clarity and decoded outcomes", "Policy behavior and response governance"]
    ]
  }
];

function esc(value = "") {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function wrap(value, maxChars) {
  const words = String(value).split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length <= maxChars) line = next;
    else {
      if (line) lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function text(value, x, y, width, options = {}) {
  const size = options.size || 22;
  const weight = options.weight || 650;
  const color = options.color || "#12213a";
  const lineHeight = options.lineHeight || Math.round(size * 1.32);
  const maxChars = Math.max(9, Math.floor(width / (size * 0.57)));
  const lines = wrap(value, maxChars).slice(0, options.maxLines || 4);
  return `<text x="${x}" y="${y}" fill="${color}" font-family="Inter,Arial,sans-serif" font-size="${size}" font-weight="${weight}">${lines.map((line, index) => `<tspan x="${x}" dy="${index ? lineHeight : 0}">${esc(line)}</tspan>`).join("")}</text>`;
}

function desktopSvg(item) {
  if (item.providerRows) return providerTableSvg(item);
  const width = 1600;
  const height = 1050;
  const left = 80;
  const top = 280;
  const labelWidth = 190;
  const columnWidth = (width - left * 2 - labelWidth) / item.vendors.length;
  const headerHeight = 118;
  const rowHeight = 178;
  const tableWidth = width - left * 2;
  const vendorHeaders = item.vendors.map((vendor, index) => {
    const x = left + labelWidth + index * columnWidth;
    return `<rect x="${x}" y="${top}" width="${columnWidth}" height="${headerHeight}" fill="${index % 2 ? "#eaf6fd" : "#f4f9fd"}"/>${text(vendor, x + 22, top + 48, columnWidth - 44, { size: 25, weight: 850, maxLines: 2 })}`;
  }).join("");
  const rows = item.rows.map((row, rowIndex) => {
    const y = top + headerHeight + rowIndex * rowHeight;
    const cells = row.slice(1).map((cell, index) => {
      const x = left + labelWidth + index * columnWidth;
      return `<rect x="${x}" y="${y}" width="${columnWidth}" height="${rowHeight}" fill="${rowIndex % 2 ? "#fbfdff" : "#ffffff"}"/>${text(cell, x + 22, y + 45, columnWidth - 44, { size: item.vendors.length === 4 ? 19 : 21, weight: 650, maxLines: 5 })}`;
    }).join("");
    return `<rect x="${left}" y="${y}" width="${labelWidth}" height="${rowHeight}" fill="#12213a"/>${text(row[0], left + 22, y + 49, labelWidth - 44, { size: 21, weight: 850, color: "#ffffff", maxLines: 3 })}${cells}`;
  }).join("");
  const separators = Array.from({ length: item.vendors.length + 1 }, (_, index) => left + labelWidth + index * columnWidth).map((x) => `<line x1="${x}" y1="${top}" x2="${x}" y2="${top + headerHeight + item.rows.length * rowHeight}" stroke="#d6e4ef"/>`).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(item.title)} vendor comparison table"><rect width="1600" height="1050" fill="#f6fbfe"/><rect x="0" y="0" width="1600" height="16" fill="#ffdf45"/><text x="80" y="80" fill="#2664a9" font-family="Inter,Arial,sans-serif" font-size="24" font-weight="850" letter-spacing="3">FLUIDRWA RESEARCH</text>${text(item.title, 80, 145, 1260, { size: 48, weight: 900, maxLines: 2, lineHeight: 56 })}<text x="1520" y="84" text-anchor="end" fill="#61758b" font-family="Inter,Arial,sans-serif" font-size="20">2026 comparison matrix</text><rect x="${left}" y="${top}" width="${tableWidth}" height="${headerHeight + item.rows.length * rowHeight}" rx="8" fill="#fff" stroke="#cbdce9"/><rect x="${left}" y="${top}" width="${labelWidth}" height="${headerHeight}" fill="#ffdf45"/>${text("Decision factor", left + 22, top + 48, labelWidth - 44, { size: 22, weight: 900, maxLines: 2 })}${vendorHeaders}${rows}${separators}<text x="80" y="985" fill="#61758b" font-family="Inter,Arial,sans-serif" font-size="18">Editorial starting points, not a universal ranking. Verify current product scope directly with each provider.</text><text x="80" y="1018" fill="#2664a9" font-family="Inter,Arial,sans-serif" font-size="19" font-weight="800">FluidRWA.com</text></svg>`;
}

function providerTableSvg(item) {
  const height = 400 + item.vendors.length * 126;
  const widths = [350, 510, 580];
  const positions = [80, 430, 940];
  const heading = ['Provider', ...item.rows.map(row => row[0])];
  const header = heading.map((label, index) => `<rect x="${positions[index]}" y="230" width="${widths[index]}" height="90" fill="#ffdf45"/>${text(label, positions[index]+20, 282, widths[index]-40, {size:26,weight:850})}`).join('');
  const rows = item.vendors.map((vendor, index) => {
    const y = 320 + index * 126;
    return [vendor, ...item.rows.map(row => row[index+1])].map((cell, column) => `<rect x="${positions[column]}" y="${y}" width="${widths[column]}" height="126" fill="${index%2?'#eaf6fd':'#ffffff'}" stroke="#d6e4ef"/>${text(cell,positions[column]+20,y+44,widths[column]-40,{size:column?25:27,weight:column?650:850,maxLines:3})}`).join('');
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="${height}"><rect width="1600" height="${height}" fill="#f6fbfe"/><rect width="1600" height="16" fill="#ffdf45"/>${text('FLUIDRWA RESEARCH',80,80,1400,{size:24,weight:850,color:'#2664a9'})}${text(item.title,80,150,1400,{size:44,weight:900})}${header}${rows}${text('Public company documentation. Not a ranking or assurance of eligibility.',80,height-35,1440,{size:20,color:'#61758b'})}</svg>`;
}

function mobileSvg(item) {
  const width = 900;
  const cardHeight = 510;
  const top = 255;
  const gap = 18;
  const height = top + item.vendors.length * (cardHeight + gap) + 130;
  const labels = item.rows.map((row) => row[0]);
  const cards = item.vendors.map((vendor, vendorIndex) => {
    const y = top + vendorIndex * (cardHeight + gap);
    const detail = item.rows.map((row, rowIndex) => {
      const dy = y + 110 + rowIndex * 136;
      return `<text x="74" y="${dy}" fill="#2664a9" font-family="Inter,Arial,sans-serif" font-size="28" font-weight="850">${esc(labels[rowIndex])}</text>${text(row[vendorIndex + 1], 74, dy + 42, 750, { size: 34, weight: 650, maxLines: 3, lineHeight: 36 })}`;
    }).join("");
    return `<rect x="50" y="${y}" width="800" height="${cardHeight}" rx="8" fill="#fff" stroke="#cbdce9"/><rect x="50" y="${y}" width="800" height="72" rx="8" fill="${vendorIndex % 2 ? "#eaf6fd" : "#fff5bd"}"/><text x="74" y="${y + 49}" fill="#12213a" font-family="Inter,Arial,sans-serif" font-size="36" font-weight="900">${esc(vendor)}</text>${detail}`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(item.title)} mobile vendor comparison table"><rect width="${width}" height="${height}" fill="#f6fbfe"/><rect width="${width}" height="14" fill="#ffdf45"/><text x="50" y="70" fill="#2664a9" font-family="Inter,Arial,sans-serif" font-size="21" font-weight="850" letter-spacing="2">FLUIDRWA RESEARCH</text>${text(item.title, 50, 128, 800, { size: 38, weight: 900, maxLines: 2, lineHeight: 44 })}${cards}<text x="50" y="${height - 72}" fill="#61758b" font-family="Inter,Arial,sans-serif" font-size="16">Editorial starting points, not a universal ranking.</text><text x="50" y="${height - 38}" fill="#2664a9" font-family="Inter,Arial,sans-serif" font-size="18" font-weight="800">FluidRWA.com</text></svg>`;
}

const requestedSlugs = new Set(process.argv.slice(2));
let generated = 0;
for (const item of comparisons) {
  if (requestedSlugs.size && !requestedSlugs.has(item.slug)) continue;
  for (const [name, svg] of [[`${item.slug}-comparison.png`, desktopSvg(item)], [`${item.slug}-comparison-mobile.png`, mobileSvg(item)]]) {
    const output = await sharp(Buffer.from(svg)).png({ compressionLevel: 9, palette: true }).toBuffer();
    for (const dir of outputDirs) fs.writeFileSync(path.join(dir, name), output);
    generated += 1;
  }
}

console.log(`Generated ${generated} comparison infographic images.`);
