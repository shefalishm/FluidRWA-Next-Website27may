import assert from "node:assert/strict";
import fs from "node:fs";
import { execFileSync } from "node:child_process";

const release = JSON.parse(fs.readFileSync("data/citation-recovery-release-2026-11-20.json"));
const opportunities = JSON.parse(fs.readFileSync("data/citation-content-opportunities-2026-11-20.json"));
assert.equal(opportunities.rows.length, 60);
assert.equal(new Set(opportunities.rows.map(r => r.title)).size, 60);
assert.ok(opportunities.rows.every(r => /^https:\/\//.test(r.sourceUrl) && r.evidence.includes("not established")));
const body = s => s.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
const field = (s, key) => s.match(new RegExp(`^${key}: "([^"]*)"`, "m"))?.[1];
const wordCount = s => (s.match(/\b\w+(?:[-'][\w]+)*\b/g) || []).length;
const learnSources = fs.readdirSync("lib").filter(f => /^learn.*\.ts$/.test(f)).map(f => fs.readFileSync("lib/" + f, "utf8")).join("\n");
const results = [];
for (const slug of release.slugs) {
  const file = `content/blog/${slug}.md`;
  const old = execFileSync("git", ["show", `${release.baselineCommit}:${file}`], { encoding: "utf8" });
  const source = fs.readFileSync(file, "utf8");
  assert.equal(field(source, "date"), field(old, "date"));
  assert.equal(field(source, "reviewedDate"), field(old, "reviewedDate"));
  assert.equal(field(source, "modifiedDate"), release.date);
  assert.equal((source.match(/^---$/gm) || []).length, 2, slug + " frontmatter");
  const added = wordCount(body(source)) - wordCount(body(old));
  assert.ok(added >= 500, `${slug}: only ${added} added words`);
  const html = fs.readFileSync(`blog/${slug}/index.html`, "utf8");
  assert.equal((html.match(/<h1>/g) || []).length, 1);
  assert.ok(html.includes("Editorial update November 20, 2026"));
  assert.ok(html.includes('"dateModified":"2026-11-20"'));
  assert.ok(html.includes("FAQPage"));
  assert.ok(html.includes(`href="https://www.fluidrwa.com/blog/${slug}"`));
  assert.ok(!source.includes("\u2014"), slug + " contains em dash");
  for (const [, target] of body(source).matchAll(/\]\((\/(?:blog|learn)\/[^)#?]+)[^)]*\)/g)) {
    assert.ok(fs.existsSync(target.slice(1).replace(/\/$/, "") + "/index.html") || (target.startsWith("/learn/") && learnSources.includes(`slug: "${target.split("/").pop()}"`)), slug + " internal target " + target);
  }
  results.push({ slug, addedWords: added, totalSourceBodyWords: wordCount(body(source)) });
}
assert.equal(release.recoveryDemonstrated, false);
assert.ok(!fs.readFileSync("content/blog/caldera-vs-conduit-vs-altlayer-rollup-as-a-service.md", "utf8").includes("docs.altlayer.io/altlayer-documentation/rollup-as-a-service/what-is-rollup-as-a-service-raas"));
console.log(JSON.stringify(results, null, 2));
console.log("PASS: six substantive updates, preserved review dates, current modification dates, canonical URLs, FAQ schema, internal links, repaired source and 60 qualified opportunities.");
