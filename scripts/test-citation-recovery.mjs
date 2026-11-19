import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";

const release = JSON.parse(fs.readFileSync("data/citation-recovery-release-2026-11-19.json"));
const inventory = JSON.parse(fs.readFileSync("docs/citation-page-inventory-2026-11-19.json"));
const words = (body) => (body.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").match(/\b\w+(?:[-'][\w]+)*\b/g) || []).length;
const value = (source, field) => source.match(new RegExp("^" + field + ': "([^"]*)"', "m"))?.[1];
assert.equal(inventory.pages.length, 182);
assert.equal(inventory.pages.filter((page) => page.sourceType === "blog-markdown").length, 127);
assert.ok(inventory.pages.every((page) => page.citationDelta === null && page.routeFoundLocally));
assert.equal(release.updatedPaths.length, 18);
assert.equal(release.prompts.length, 14);
assert.ok(release.prompts.every((prompt) => prompt.postPublicationRetest === null));
const results = [];
for (const route of release.updatedPaths.filter((route) => route.startsWith("/blog/"))) {
  const slug = route.split("/").pop();
  const path = "content/blog/" + slug + ".md";
  const source = fs.readFileSync(path, "utf8");
  const previous = execFileSync("git", ["show", release.baselineCommit + ":" + path], { encoding: "utf8" });
  const body = source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
  const before = previous.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
  assert.equal(value(source, "date"), value(previous, "date"), slug + " publication date");
  assert.equal(value(source, "reviewedDate"), value(previous, "reviewedDate"), slug + " historical review date");
  assert.equal(value(source, "modifiedDate"), release.date);
  const added = words(body) - words(before);
  assert.ok(added >= 250, slug + " insufficient distinct addition: " + added);
  const correctedBefore = before.replace("/blog/tokenized-fund-infrastructure/", "/network-explorer/research/tokenized-fund-infrastructure-october-2026");
  for (const line of correctedBefore.split("\n").filter((line) => line.trim())) assert.ok(body.includes(line), slug + " removed existing body content");
  const html = fs.readFileSync("blog/" + slug + "/index.html", "utf8");
  assert.equal((html.match(/<h1>/g) || []).length, 1, slug);
  assert.ok(html.includes("Editorial update November 19, 2026"), slug + " missing visible update date");
  assert.ok(html.includes('"dateModified":"2026-11-19"'), slug);
  assert.ok(html.includes("FAQPage"), slug + " missing FAQ schema");
  assert.ok(html.includes('href="https://www.fluidrwa.com' + route + '"'), slug);
  for (const [, target] of body.matchAll(/\]\((\/blog\/[^)#?]+)[^)]*\)/g)) {
    assert.ok(fs.existsSync(target.slice(1).replace(/\/$/, "") + "/index.html"), slug + " missing related article " + target);
  }
  results.push({ slug, beforeWords: words(before), afterWords: words(body), added });
}
const cases = fs.readFileSync("lib/useCases.ts", "utf8");
assert.ok(cases.includes('slug: "digital-asset-tax-reporting-cost-basis-operations",\n    updatedAt: "2026-11-19"'));
console.log(JSON.stringify(results, null, 2));
console.log("PASS: 182-page inventory, 17 substantive blog updates, one use case, preserved historical dates and body, canonical URLs, visible editorial dates, FAQ schema and internal article links.");
