import assert from "node:assert/strict";
import fs from "node:fs";
import { execFileSync } from "node:child_process";

const release = JSON.parse(fs.readFileSync("data/alternatives-release-2026-11-20.json"));
const site = "https://www.fluidrwa.com";
const results = [];
const field = (s, key) => JSON.parse(s.match(new RegExp(`^${key}: (.+)$`, "m"))[1]);
for (const slug of release.slugs) {
  const source = fs.readFileSync(`content/blog/${slug}.md`, "utf8");
  const response = await fetch(`${site}/blog/${slug}`);
  assert.equal(response.status, 200, slug);
  const html = await response.text();
  const graphs = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(m => { const s = JSON.parse(m[1]); return s["@graph"] || [s]; });
  const article = graphs.find(s => s["@type"] === "Article");
  const faq = graphs.find(s => s["@type"] === "FAQPage");
  assert.equal(article.headline, field(source, "title"));
  assert.equal(article.datePublished, release.date);
  assert.equal(faq.mainEntity.length, 6);
  assert.ok(graphs.some(s => s["@type"] === "ItemList" && s.itemListOrder === "https://schema.org/ItemListUnordered"));
  assert.ok(html.includes(`href="${site}/blog/${slug}"`));
  assert.ok(!/name="robots"[^>]*content="[^"]*noindex/i.test(html));
  for (let n = 1; n <= 6; n++) assert.ok(faq.mainEntity.some(q => q.name === field(source, `faq${n}q`) && q.acceptedAnswer.text === field(source, `faq${n}a`)));
  const heading = source.replace(/^---\n[\s\S]*?\n---\n/, "").match(/^## (.+)$/m)[1];
  assert.ok(html.includes(heading.replaceAll("&", "&amp;")), slug + " visible body");
  for (const key of ["image", "socialImage"]) {
    const relative = field(source, key);
    const asset = await fetch(site + relative);
    assert.equal(asset.status, 200, relative);
    assert.deepEqual(Buffer.from(await asset.arrayBuffer()), fs.readFileSync(relative.slice(1)));
  }
  results.push({ slug, httpStatus: 200, articleAndFaqMatch: true, visibleBody: true, exactImageBytes: true });
}
for (const slug of release.incomingSlugs) {
  const source = fs.readFileSync(`content/blog/${slug}.md`, "utf8");
  const links = [...source.matchAll(/\]\(\/blog\/([^/)]+-alternatives-2026)\)/g)].map(m => m[1]);
  assert.ok(links.length);
  const response = await fetch(`${site}/blog/${slug}`);
  assert.equal(response.status, 200);
  const html = await response.text();
  for (const target of links) assert.ok(html.includes(`/blog/${target}`), slug + " incoming link " + target);
}
for (const path of ["/", "/blog", "/llms.txt", "/sitemap.xml"]) {
  const response = await fetch(site + path);
  assert.equal(response.status, 200, path);
  const text = await response.text();
  if (path !== "/") for (const slug of release.slugs) assert.ok(text.includes(`/blog/${slug}`), path + " discovery " + slug);
}
const report = { checkedAt: new Date().toISOString(), commit: execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim(), results, incomingLinksVerified: release.incomingSlugs.length, citationRecoveryDemonstrated: false };
fs.writeFileSync("/tmp/fluidrwa-alternatives-live-verification-2026-11-20.json", JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
