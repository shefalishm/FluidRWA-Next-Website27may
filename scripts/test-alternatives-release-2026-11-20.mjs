import assert from "node:assert/strict";
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import sharp from "sharp";

const rows = JSON.parse(fs.readFileSync("data/creative-alternatives-2026-11-20.json", "utf8"));
const field = (source, key) => JSON.parse(source.match(new RegExp(`^${key}: (.+)$`, "m"))[1]);
const words = source => (source.match(/\b\w+(?:[-'][\w]+)*\b/g) || []).length;
const routes = fs.readFileSync("lib/routes.ts", "utf8");
const vendorMap = Object.fromEntries([...routes.split("const vendorFileMap")[1].split("};")[0].matchAll(/"([^"]+)": "([^"]+)"/g)].map(match => [match[1], match[2]]));
const beforeLlms = execFileSync("git", ["show", "c725feb:llms.txt"], { encoding: "utf8" });
const llms = fs.readFileSync("llms.txt", "utf8");
assert.equal(llms.split("## Blog insights")[0], beforeLlms.split("## Blog insights")[0], "Core pages order changed");
const results = [];
for (const row of rows) {
  const source = fs.readFileSync(`content/blog/${row.slug}.md`, "utf8");
  const body = source.replace(/^---\n[\s\S]*?\n---\n/, "");
  const bodyWords = words(body);
  assert.ok(bodyWords >= 3000, `${row.slug}: only ${bodyWords} body words`);
  assert.equal(field(source, "slug"), row.slug);
  for (const key of ["date", "modifiedDate", "reviewedDate"]) assert.equal(field(source, key), "2026-11-20");
  assert.ok(!source.includes("\u2014"), row.slug + " em dash");
  assert.ok(!/^# /m.test(body), row.slug + " duplicate H1");
  assert.ok(!/\b(?:guaranteed returns|100% approval|not verified|unverified)\b/i.test(body), row.slug + " prohibited filler or guarantee");
  const external = [...body.matchAll(/\]\((https:\/\/[^)]+)\)/g)].map(match => match[1]);
  const references = [...external, ...field(source, "sourceReferences").split("|")];
  assert.ok(new Set(references.map(url => new URL(url).hostname)).size >= 3, row.slug + " source breadth");
  assert.ok(external.every(url => /(^|\.)sec\.gov$/.test(new URL(url).hostname)), row.slug + " vendor hyperlink remains");
  const internal = [...body.matchAll(/\]\((\/(?:blog|fluidrwa|vendors)\/[^)]+)\)/g)].map(match => match[1]);
  assert.ok(new Set(internal.filter(url => url.startsWith("/blog/"))).size >= 3, row.slug + " related comparisons");
  for (const target of internal) {
    const url = new URL(target, "https://www.fluidrwa.com");
    const pathname = url.pathname.replace(/^\//, "").replace(/\/$/, "");
    let file = pathname + "/index.html";
    if (pathname.startsWith("vendors/")) file = `vendors/${vendorMap[pathname.split("/")[1]] || pathname.split("/")[1]}/index.html`;
    assert.ok(fs.existsSync(file), row.slug + " missing internal target: " + target);
    if (url.hash) assert.ok(fs.readFileSync(file, "utf8").includes(`id="${url.hash.slice(1)}"`), row.slug + " missing anchor: " + target);
  }
  const html = fs.readFileSync(`blog/${row.slug}/index.html`, "utf8");
  assert.equal((html.match(/<h1>/g) || []).length, 1);
  const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])["@graph"];
  const article = graph.find(item => item["@type"] === "Article");
  const faq = graph.find(item => item["@type"] === "FAQPage");
  const items = graph.find(item => item["@type"] === "ItemList");
  assert.equal(article.datePublished, "2026-11-20");
  assert.equal(article.dateModified, "2026-11-20");
  assert.ok(article.citation.length >= 3);
  for (const url of field(source, "sourceReferences").split("|")) {
    assert.ok(article.citation.includes(url), row.slug + " missing source attribution");
    assert.ok(!html.includes(`href="${url}"`), row.slug + " clickable vendor link remains");
  }
  assert.equal(faq.mainEntity.length, 6);
  for (let i = 1; i <= 6; i++) {
    const q = field(source, `faq${i}q`);
    const a = field(source, `faq${i}a`);
    assert.ok(faq.mainEntity.some(item => item.name === q && item.acceptedAnswer.text === a), row.slug + " FAQ mismatch");
    assert.ok(html.includes(q.replaceAll("&", "&amp;").replaceAll('"', "&quot;")), row.slug + " missing visible FAQ");
  }
  const names = field(source, "comparisonItems").split("|");
  assert.deepEqual(names, [...names].sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" })), row.slug + " alternatives not alphabetical");
  assert.deepEqual(items.itemListElement.map(item => item.name), names);
  assert.equal(items.itemListOrder, "https://schema.org/ItemListUnordered");
  const imagePath = field(source, "image").slice(1);
  const image = await sharp(imagePath).metadata();
  assert.equal(image.width, 1200);
  assert.equal(image.height, 675);
  assert.ok(fs.statSync(imagePath).size < 81920);
  assert.ok(field(source, "imageAlt").includes(field(source, "title")));
  assert.ok(field(source, "imageAlt").includes("FluidRWA"));
  assert.ok(llms.includes(`/blog/${row.slug}`));
  const sitemap = fs.readFileSync("sitemap.xml", "utf8");
  assert.ok(sitemap.includes(`<loc>https://www.fluidrwa.com/blog/${row.slug}</loc><lastmod>2026-11-20</lastmod>`));
  results.push({ slug: row.slug, bodyWords, sources: new Set(external).size, relatedArticles: new Set(internal.filter(url => url.startsWith("/blog/"))).size, faqCount: 6, thumbnailBytes: fs.statSync(imagePath).size });
}
console.log(JSON.stringify(results, null, 2));
console.log("PASS: six long-form alternatives guides, internal targets, alphabetical alternatives, exact FAQ/schema parity, dates, compressed artwork, llms.txt Core pages preserved and sitemap entries.");
