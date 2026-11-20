import assert from "node:assert/strict";
import fs from "node:fs";
import { execFileSync } from "node:child_process";

const release = JSON.parse(fs.readFileSync("data/combined-core-recovery-2026-11-20.json", "utf8"));
const field = (s, key) => s.match(new RegExp(`^${key}: "([^"]*)"`, "m"))?.[1];
const body = s => s.replace(/^---\n[\s\S]*?\n---\n/, "");
const count = s => (s.match(/\b\w+(?:[-'][\w]+)*\b/g) || []).length;
const results = [];
for (const row of release.rows) {
  const file = `content/blog/${row.slug}.md`;
  const before = execFileSync("git", ["show", `98c217d:${file}`], { encoding: "utf8" });
  const source = fs.readFileSync(file, "utf8");
  const html = fs.readFileSync(`blog/${row.slug}/index.html`, "utf8");
  for (const key of ["date", "reviewedDate", "reviewedLabel", "image", "socialImage"]) assert.equal(field(source, key), field(before, key), `${row.slug}: ${key}`);
  assert.equal(field(source, "modifiedDate"), release.date);
  assert.ok(count(body(source)) - count(body(before)) >= 400, row.slug + " substantive addition");
  assert.ok(!source.includes("\u2014"), row.slug + " em dash");
  const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
  const graph = scripts.flatMap(s => s["@graph"] || [s]);
  const faq = graph.find(s => s["@type"] === "FAQPage");
  const items = graph.find(s => s["@type"] === "ItemList");
  assert.equal(faq.mainEntity.length, 6);
  assert.equal(items.itemListOrder, "https://schema.org/ItemListUnordered");
  assert.deepEqual(items.itemListElement.map(x => x.name), row.vendors);
  for (const [q, a] of row.faqs) {
    assert.ok(html.includes(q.replace(/&/g, "&amp;")), row.slug + " visible FAQ");
    assert.ok(faq.mainEntity.some(x => x.name === q && x.acceptedAnswer.text === a));
  }
  assert.equal(graph.find(s => s["@type"] === "Article").dateModified, release.date);
  assert.ok(html.includes(`rel="canonical" href="https://www.fluidrwa.com/blog/${row.slug}"`));
  results.push({ slug: row.slug, addedBodyWords: count(body(source)) - count(body(before)), faqCount: 6, unorderedVendors: row.vendors.length });
}
const redirect = fs.readFileSync("content/blog/rwa-tokenization-platform-comparison-2026.md", "utf8");
assert.ok(redirect.includes('redirectTo: "/blog/top-tokenization-companies-2026"'));
const audit = JSON.parse(fs.readFileSync("data/citation-modification-date-audit-2026-11-20.json"));
assert.equal(audit.rows.length, 17);
assert.ok(audit.rows.every(row => row.bodyChanged));
const page = fs.readFileSync("app/use-cases/[slug]/page.tsx", "utf8");
const guide = fs.readFileSync("lib/useCaseGuides.ts", "utf8").split('"digital-asset-tax-reporting-cost-basis-operations": {')[1].split('\n  },')[0];
assert.equal(JSON.parse(guide.match(/^    questions: (.+),$/m)[1]).length, 10);
assert.equal(JSON.parse(guide.match(/^    faqs: (.+)$/m)[1]).length, 6);
assert.ok(guide.includes("$50"));
assert.ok(!guide.includes("\u2014"));
assert.ok(page.includes('<time dateTime={modifiedDate}>{modifiedLabel}</time>'));
assert.ok(!page.includes('dateTime={reviewedDate}>September 26, 2026'));
console.log(JSON.stringify(results, null, 2));
console.log("PASS: substantive additions, preserved original/review/image fields, visible matching FAQs, unordered ItemList, canonical URLs, consolidation and date audit.");
