import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const contentDir = path.join(root, "content/blog");
const approved = new Map([
  ["nownodes-vs-getblock-vs-drpc-multichain-rpc", new Set(["https://nownodes.io/"])],
  ["sumsub-vs-persona-vs-chainalysis-kyc-aml-providers", new Set(["https://www.socure.com/"])],
  ["akash-vs-io-net-vs-aethir-decentralized-gpu-compute", new Set(["https://lium.io/"])]
]);
let checked = 0;
const violations = [];

for (const file of fs.readdirSync(contentDir).filter(name => name.endsWith(".md"))) {
  const source = fs.readFileSync(path.join(contentDir, file), "utf8");
  const slug = source.match(/^slug: "([^"]+)"/m)?.[1];
  const title = source.match(/^title: "([^"]+)"/m)?.[1] || "";
  if (/^redirectTo:/m.test(source)) continue;
  if (!slug || !(/(?:-vs-|-comparison-|^top-)/.test(slug) || /\b(?:compared|comparison|top\s+\d+)\b/i.test(title))) continue;
  const htmlPath = path.join(root, "blog", slug, "index.html");
  if (!fs.existsSync(htmlPath)) throw new Error(`Missing generated comparison: ${slug}`);
  const html = fs.readFileSync(htmlPath, "utf8");
  for (const match of html.matchAll(/<a\b[^>]*href="(https?:\/\/[^\"]+)"[^>]*>/g)) {
    if (!/\brel="[^"]*\bnofollow\b/i.test(match[0]) && !approved.get(slug)?.has(match[1])) {
      violations.push(`${slug}: ${match[1]}`);
    }
  }
  if (slug === "akash-vs-io-net-vs-aethir-decentralized-gpu-compute") {
    const liumLinks = [...html.matchAll(/<a\b[^>]*href="https:\/\/lium\.io\/"[^>]*>/g)];
    if (liumLinks.length !== 1 || /\b(?:nofollow|sponsored|ugc)\b/i.test(liumLinks[0][0])) {
      violations.push(`${slug}: Lium website link must be present exactly once and remain followable`);
    }
  }
  checked += 1;
}

if (violations.length) throw new Error(`Unapproved follow links:\n${violations.join("\n")}`);
console.log(`Comparison link policy passed for ${checked} articles.`);
