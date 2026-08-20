import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const outputDir = path.join(root, "public", "assets", "social");
const logoPath = path.join(root, "public", "assets", "fluidrwa-logo.png");
const logoBase64 = fs.readFileSync(logoPath).toString("base64");
const logoHref = `data:image/png;base64,${logoBase64}`;

fs.mkdirSync(outputDir, { recursive: true });

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function vendorRow(y, rank, name, score, fit, color) {
  return `
    <g transform="translate(0 ${y})">
      <rect x="0" y="0" width="560" height="76" rx="20" fill="rgba(255,255,255,.86)" stroke="rgba(38,100,200,.15)" />
      <circle cx="38" cy="38" r="23" fill="${color}" />
      <text x="38" y="46" text-anchor="middle" font-size="19" font-family="Inter, Arial, sans-serif" font-weight="900" fill="#fff">${rank}</text>
      <text x="78" y="34" font-size="24" font-family="Inter, Arial, sans-serif" font-weight="900" fill="#081426">${esc(name)}</text>
      <text x="78" y="57" font-size="15" font-family="Inter, Arial, sans-serif" font-weight="760" fill="#66758e">${esc(fit)}</text>
      <rect x="456" y="18" width="76" height="40" rx="14" fill="#f1f7ff" />
      <text x="494" y="45" text-anchor="middle" font-size="25" font-family="Inter, Arial, sans-serif" font-weight="950" fill="#1d5fc8">${score}</text>
    </g>
  `;
}

function signalPill(x, y, text, color) {
  return `
    <g transform="translate(${x} ${y})">
      <rect x="0" y="0" width="210" height="44" rx="22" fill="rgba(255,255,255,.82)" stroke="${color}" stroke-opacity=".28" />
      <circle cx="24" cy="22" r="6" fill="${color}" />
      <text x="42" y="28" font-size="15" font-family="Inter, Arial, sans-serif" font-weight="850" fill="#22334d">${esc(text)}</text>
    </g>
  `;
}

function svg169({ includeLogo = true } = {}) {
  return `
  <svg width="1600" height="900" viewBox="0 0 1600 900" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1600" y2="900" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#fff6c9"/>
        <stop offset=".52" stop-color="#f8fcff"/>
        <stop offset="1" stop-color="#dff5ff"/>
      </linearGradient>
      <linearGradient id="blue" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="#7fe7ff"/>
        <stop offset="1" stop-color="#2664ff"/>
      </linearGradient>
      <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="#fff4a9"/>
        <stop offset="1" stop-color="#f4b13d"/>
      </linearGradient>
      <filter id="softShadow" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="0" dy="34" stdDeviation="36" flood-color="#10213a" flood-opacity=".18"/>
      </filter>
      <filter id="smallShadow" x="-20%" y="-20%" width="140%" height="150%">
        <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#10213a" flood-opacity=".12"/>
      </filter>
      <radialGradient id="orb" cx="50%" cy="50%" r="50%">
        <stop stop-color="#76d8ff" stop-opacity=".52"/>
        <stop offset="1" stop-color="#76d8ff" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1600" height="900" fill="url(#bg)"/>
    <circle cx="1400" cy="100" r="310" fill="url(#orb)"/>
    <circle cx="180" cy="790" r="280" fill="#fff1a6" opacity=".5"/>
    <path d="M1096 830C1190 680 1370 620 1580 690V900H1005C1018 873 1048 840 1096 830Z" fill="#ccf5e7" opacity=".48"/>

    ${includeLogo ? `<image href="${logoHref}" x="78" y="58" width="205" height="76" preserveAspectRatio="xMidYMid meet"/>` : ""}
    <text x="84" y="198" font-size="30" font-family="Inter, Arial, sans-serif" font-weight="950" letter-spacing="8" fill="#1d5fc8">NEW FLUIDRWA TOOL</text>
    <text x="84" y="304" font-size="82" font-family="Georgia, 'Times New Roman', serif" font-weight="800" fill="#071225">Compare vendors</text>
    <text x="84" y="394" font-size="82" font-family="Georgia, 'Times New Roman', serif" font-weight="800" fill="#071225">before shortlisting</text>
    <text x="88" y="462" font-size="30" font-family="Inter, Arial, sans-serif" font-weight="760" fill="#56657d">Paste up to 5 vendor URLs. Describe your project.</text>
    <text x="88" y="506" font-size="30" font-family="Inter, Arial, sans-serif" font-weight="760" fill="#56657d">Get scored fit, watch-outs and source references.</text>

    ${signalPill(86, 575, "Project-fit scoring", "#2664ff")}
    ${signalPill(314, 575, "Source references", "#00a982")}
    ${signalPill(542, 575, "Buyer watch-outs", "#e78000")}

    <g transform="translate(910 190) rotate(-4)" filter="url(#softShadow)">
      <rect x="0" y="0" width="620" height="520" rx="42" fill="rgba(255,255,255,.86)" stroke="rgba(38,100,200,.16)"/>
      <rect x="34" y="34" width="552" height="78" rx="26" fill="#f4f9ff" stroke="rgba(38,100,200,.12)"/>
      <text x="64" y="84" font-size="26" font-family="Inter, Arial, sans-serif" font-weight="950" fill="#081426">Vendor fit results</text>
      <text x="426" y="83" font-size="18" font-family="Inter, Arial, sans-serif" font-weight="850" fill="#1d5fc8">Live table</text>
      <g transform="translate(34 148)">
        ${vendorRow(0, "01", "Tokeny", "96", "Strong fit", "#2664ff")}
        ${vendorRow(94, "02", "Taurus", "91", "Strong fit", "#00a982")}
        ${vendorRow(188, "03", "Securitize", "63", "Possible fit", "#e78000")}
      </g>
      <rect x="34" y="444" width="552" height="44" rx="22" fill="url(#gold)" opacity=".9"/>
      <text x="310" y="473" text-anchor="middle" font-size="18" font-family="Inter, Arial, sans-serif" font-weight="950" fill="#081426">Compare Web3, RWA and AI vendors</text>
    </g>

    <g transform="translate(1030 112)" filter="url(#smallShadow)">
      <rect x="0" y="0" width="290" height="74" rx="24" fill="url(#blue)"/>
      <text x="145" y="46" text-anchor="middle" font-size="25" font-family="Inter, Arial, sans-serif" font-weight="950" fill="#fff">Up to 5 URLs</text>
    </g>

    <rect x="84" y="770" width="1432" height="68" rx="28" fill="rgba(8,20,38,.92)"/>
    <text x="128" y="814" font-size="28" font-family="Inter, Arial, sans-serif" font-weight="900" fill="#ffffff">Try it now</text>
    <text x="1332" y="814" text-anchor="end" font-size="28" font-family="Inter, Arial, sans-serif" font-weight="950" fill="#8ee8ff">fluidrwa.com/tools/vendor-comparison</text>
  </svg>`;
}

function svgSquare() {
  return `
  <svg width="1200" height="1200" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg2" x1="0" y1="0" x2="1200" y2="1200" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#fff6c9"/>
        <stop offset=".56" stop-color="#f8fcff"/>
        <stop offset="1" stop-color="#dff5ff"/>
      </linearGradient>
      <linearGradient id="blue2" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="#7fe7ff"/>
        <stop offset="1" stop-color="#2664ff"/>
      </linearGradient>
      <filter id="softShadow2" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="0" dy="34" stdDeviation="36" flood-color="#10213a" flood-opacity=".18"/>
      </filter>
    </defs>
    <rect width="1200" height="1200" fill="url(#bg2)"/>
    <circle cx="1050" cy="80" r="270" fill="#a7e9ff" opacity=".34"/>
    <circle cx="120" cy="1050" r="280" fill="#fff1a6" opacity=".48"/>
    <image href="${logoHref}" x="70" y="62" width="215" height="80" preserveAspectRatio="xMidYMid meet"/>
    <text x="76" y="228" font-size="28" font-family="Inter, Arial, sans-serif" font-weight="950" letter-spacing="7" fill="#1d5fc8">NEW FLUIDRWA TOOL</text>
    <text x="76" y="324" font-size="76" font-family="Georgia, 'Times New Roman', serif" font-weight="800" fill="#071225">Compare vendors</text>
    <text x="76" y="406" font-size="76" font-family="Georgia, 'Times New Roman', serif" font-weight="800" fill="#071225">before you shortlist</text>
    <text x="80" y="470" font-size="29" font-family="Inter, Arial, sans-serif" font-weight="760" fill="#56657d">Paste URLs. Add project context.</text>
    <text x="80" y="512" font-size="29" font-family="Inter, Arial, sans-serif" font-weight="760" fill="#56657d">Get scored vendor fit with references.</text>

    <g transform="translate(104 604)" filter="url(#softShadow2)">
      <rect x="0" y="0" width="992" height="378" rx="44" fill="rgba(255,255,255,.88)" stroke="rgba(38,100,200,.16)"/>
      <rect x="42" y="38" width="908" height="66" rx="24" fill="#f4f9ff" stroke="rgba(38,100,200,.12)"/>
      <text x="76" y="81" font-size="25" font-family="Inter, Arial, sans-serif" font-weight="950" fill="#081426">Project-fit comparison table</text>
      <g transform="translate(42 138)">
        ${vendorRow(0, "01", "Tokeny", "96", "Strong fit", "#2664ff")}
        ${vendorRow(88, "02", "Taurus", "91", "Strong fit", "#00a982")}
        ${vendorRow(176, "03", "Securitize", "63", "Possible fit", "#e78000")}
      </g>
      <g transform="translate(654 148)">
        <rect x="0" y="0" width="270" height="62" rx="20" fill="rgba(241,247,255,.95)" stroke="rgba(38,100,200,.13)"/>
        <text x="26" y="39" font-size="18" font-family="Inter, Arial, sans-serif" font-weight="900" fill="#1d5fc8">Source references</text>
        <rect x="0" y="82" width="270" height="62" rx="20" fill="rgba(241,247,255,.95)" stroke="rgba(38,100,200,.13)"/>
        <text x="26" y="121" font-size="18" font-family="Inter, Arial, sans-serif" font-weight="900" fill="#1d5fc8">Buyer watch-outs</text>
        <rect x="0" y="164" width="270" height="62" rx="20" fill="rgba(241,247,255,.95)" stroke="rgba(38,100,200,.13)"/>
        <text x="26" y="203" font-size="18" font-family="Inter, Arial, sans-serif" font-weight="900" fill="#1d5fc8">Intro-ready brief</text>
      </g>
    </g>
    <rect x="76" y="1072" width="1048" height="68" rx="28" fill="rgba(8,20,38,.92)"/>
    <text x="112" y="1116" font-size="25" font-family="Inter, Arial, sans-serif" font-weight="900" fill="#ffffff">Try it now</text>
    <text x="1082" y="1116" text-anchor="end" font-size="24" font-family="Inter, Arial, sans-serif" font-weight="950" fill="#8ee8ff">fluidrwa.com/tools/vendor-comparison</text>
  </svg>`;
}

const files = [
  ["fluidrwa-vendor-comparison-tool-announcement-16x9.png", svg169(), 1600],
  ["fluidrwa-vendor-comparison-tool-announcement-16x9-no-logo.png", svg169({ includeLogo: false }), 1600],
  ["fluidrwa-vendor-comparison-tool-announcement-square.png", svgSquare(), 1200]
];

for (const [fileName, svg, width] of files) {
  const out = path.join(outputDir, fileName);
  await sharp(Buffer.from(svg)).resize({ width }).png({ quality: 96 }).toFile(out);
  console.log(out);
}
