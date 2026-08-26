import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "app/layout.tsx",
  "components/Header.tsx",
  "components/Footer.tsx",
  "index.html",
  "vendor-membership.html",
  "vendor-ecosystem.html"
];

const failures = [];

for (const relativePath of requiredFiles) {
  if (!fs.existsSync(path.join(root, relativePath))) {
    failures.push(`Missing canonical file: ${relativePath}`);
  }
}

const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
if (packageJson.name !== "fluidrwa-may-25-full-website") {
  failures.push("This is not the canonical FluidRWA project.");
}

const header = fs.readFileSync(path.join(root, "components/Header.tsx"), "utf8");
for (const label of ["Web3 Vendors", "AI Vendors", "Become a Vetted Listing", "Submit Requirements"]) {
  if (!header.includes(label)) failures.push(`Canonical header is missing: ${label}`);
}

for (const obsoleteLabel of ["Explore Vendor Ecosystem", "Chain Ecosystem"]) {
  if (header.includes(obsoleteLabel)) failures.push(`Obsolete header label returned: ${obsoleteLabel}`);
}

const buildCommand = packageJson.scripts?.build || "";
if (/build-blog|generate-|enhance-organic/.test(buildCommand)) {
  failures.push("Production build must not regenerate or rewrite source pages.");
}

if (failures.length) {
  console.error("FluidRWA source-of-truth check failed:\n");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("FluidRWA source-of-truth check passed.");
