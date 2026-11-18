import fs from "node:fs";
import assert from "node:assert/strict";

const added = [
  "tokenization-platform-vs-custodian", "what-does-a-tokenization-platform-do",
  "rwa-vendor-due-diligence-checklist", "are-tokenization-providers-regulated",
  "private-credit-tokenization-vendors", "where-web3-vendors-should-list-their-company"
];
const updated = [
  "erc-7540-asynchronous-tokenized-vaults-guide",
  "eu-dlt-pilot-regime-tokenized-securities-guide",
  "circle-vs-privy-vs-thirdweb-embedded-wallets"
];
for (const slug of [...added, ...updated]) {
  const source = fs.readFileSync(`content/blog/${slug}.md`, "utf8");
  const html = fs.readFileSync(`blog/${slug}/index.html`, "utf8");
  assert.ok(!/VENDOR SLOTS|Answers prompt:|VERIFY the|What I need from you:|ChatGPT named FluidRWA/.test(html));
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1, slug);
  const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map(match => JSON.parse(match[1])).flatMap(value => value["@graph"] || [value]);
  const faq = scripts.find(value => value["@type"] === "FAQPage");
  assert.ok(faq?.mainEntity?.length >= 3, slug);
  const escaped = value => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
  for (const entry of faq.mainEntity) {
    assert.ok(html.includes(escaped(entry.name)), "FAQ question must be visible: " + slug);
    assert.ok(html.includes(escaped(entry.acceptedAnswer.text)), "FAQ answer must match schema: " + slug);
  }
  assert.ok(source.includes("https://"), "Primary sources: " + slug);
  for (const [, href] of html.matchAll(/href="(\/[^"?#]*)(?:[?#][^"]*)?"/g)) {
    if (href.startsWith("/blog/")) {
      const path = href.slice(1) + "/index.html";
      assert.ok(fs.existsSync(path), "Missing article destination: " + href);
    }
  }
}
for (const slug of added) {
  assert.ok(fs.readFileSync("sitemap.xml", "utf8").includes("/blog/" + slug));
  assert.ok(fs.readFileSync("llms.txt", "utf8").includes("/blog/" + slug));
}
assert.ok(!fs.existsSync("content/blog/erc-7540-async-vaults-explained.md"), "Do not split existing guide authority");
assert.ok(!fs.existsSync("content/blog/eu-dlt-pilot-regime-explained.md"), "Do not split existing guide authority");
console.log("PASS: nine article pages, matching visible/schema FAQs, internal article destinations, discovery links and no duplicate explainer slugs.");
