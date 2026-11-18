import fs from "node:fs";
import sharp from "sharp";

const previews = [
  ["tokenization-platform-vs-custodian", "Platform vs custodian", ["Issue and control", "Reconcile records", "Safeguard assets"]],
  ["what-does-a-tokenization-platform-do", "The issuance workflow", ["Issue", "Administer", "Export"]],
  ["rwa-vendor-due-diligence-checklist", "Evidence before appointment", ["Entity", "Controls", "Exit"]],
  ["are-tokenization-providers-regulated", "Check the permission", ["Entity", "Activity", "Jurisdiction"]],
  ["private-credit-tokenization-vendors", "Private credit infrastructure", ["Loan evidence", "Servicing", "Reporting"]],
  ["where-web3-vendors-should-list-their-company", "Company profile channels", ["Identity", "Ownership", "Evidence"]]
];
for (const [index, [slug, title, labels]] of previews.entries()) {
  const accent = ["#2563A6", "#167564", "#925122", "#7044A0", "#285C79", "#7E405D"][index];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <rect width="1200" height="630" fill="#F5F8FB"/>
    <rect x="0" y="0" width="1200" height="16" fill="${accent}"/>
    <text x="72" y="98" font-family="sans-serif" font-size="28" font-weight="700" fill="${accent}">FluidRWA</text>
    <text x="72" y="180" font-family="sans-serif" font-size="43" font-weight="700" fill="#15243C">${title}</text>
    ${labels.map((label, i) => `<rect x="${72 + i * 365}" y="280" width="326" height="190" rx="8" fill="white" stroke="#D7E2EC" stroke-width="2"/>
      <circle cx="${110 + i * 365}" cy="320" r="13" fill="${accent}"/>
      <text x="${100 + i * 365}" y="392" font-family="sans-serif" font-size="26" font-weight="700" fill="#15243C">${label}</text>
      ${i < 2 ? `<path d="M${410+i*365} 375h18m-8-8 8 8-8 8" fill="none" stroke="${accent}" stroke-width="3"/>` : ""}`).join("")}
    <text x="72" y="558" font-family="sans-serif" font-size="22" fill="#53657A">An operational evidence map, not a vendor ranking</text>
  </svg>`;
  for (const prefix of ["assets", "public/assets"]) {
    fs.mkdirSync(`${prefix}/blog-thumbnails`, { recursive: true });
    await sharp(Buffer.from(svg)).webp({ quality: 82 }).toFile(`${prefix}/blog-thumbnails/${slug}.webp`);
  }
}
console.log("Built six topic-specific editorial workflow previews.");
