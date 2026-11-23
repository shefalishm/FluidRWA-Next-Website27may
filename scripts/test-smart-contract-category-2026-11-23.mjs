import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import { enhanceSmartContractCategory } from "./lib/smart-contract-category.mjs";

const { parse } = createRequire(import.meta.url)("next/dist/compiled/node-html-parser");
const file = "vendors/smart-contract-development/index.html";
const html = fs.readFileSync(file, "utf8");
const root = parse(html);
assert.equal(enhanceSmartContractCategory(html), html, "The category generator must be repeatable");
const ids = root.querySelectorAll("[id]").map((node) => node.id);
assert.equal(ids.length, new Set(ids).size, "Duplicate anchors");
for (const anchor of root.querySelectorAll('a[href^="#"]')) {
  assert.ok(ids.includes(anchor.getAttribute("href").slice(1)), anchor.outerHTML);
}
const cards = root.querySelectorAll(".bc-company-card");
assert.ok(!root.querySelector("#smart-contract-shortlist .sc-lead"), "Introduction should use the same paragraph styling and width as the other body text");
assert.equal(root.querySelector("#smart-contract-shortlist .light-container > p").getAttribute("class"), undefined);
const allowedExternalHosts = new Set(["fluidrwa.com", "solana.com", "owasp.org", "docs.soliditylang.org", "eips.ethereum.org", "ethereum.org"]);
for (const anchor of root.querySelectorAll("main a[href]")) {
  const href = anchor.getAttribute("href");
  if (/^https?:\/\//i.test(href)) assert.ok(allowedExternalHosts.has(new URL(href).hostname.replace(/^www\./, "")), `External vendor hyperlink: ${href}`);
}
assert.equal(cards.length, 40);
assert.equal(root.querySelectorAll(".bc-vetted-badge").length, 1, "Do not assign new Vetted status");
assert.ok(!root.querySelector("#yul-assembly-specialists"));
assert.ok(!root.querySelector("main").textContent.includes("500B+"));
assert.ok(!/\u2014/.test(root.querySelector("main").textContent));
assert.ok(!/[$€£]\s*\d/.test(root.querySelector("main").textContent), "No public price amounts");
const graph = JSON.parse(root.querySelector('script[type="application/ld+json"]').textContent)["@graph"];
const list = graph.find((item) => item["@type"] === "ItemList");
assert.equal(list.numberOfItems, cards.length);
assert.deepEqual(list.itemListElement.map((row) => row.item.name), cards.map((card) => card.querySelector("h3").textContent));
const faq = graph.find((item) => item["@type"] === "FAQPage");
const visible = root.querySelectorAll("#smart-contract-faq details");
assert.equal(faq.mainEntity.length, 10);
faq.mainEntity.forEach((item, index) => {
  assert.equal(item.name, visible[index].querySelector("summary").textContent);
  assert.equal(item.acceptedAnswer.text, visible[index].querySelector("p").textContent);
});
for (const id of ["smart-contract-fit", "smart-contract-proof", "smart-contract-acceptance", "smart-contract-rwa", "smart-contract-brief", "smart-contract-delivery", "smart-contract-scorecard"]) {
  assert.ok(root.querySelector(`#${id}`), id);
}
assert.ok(root.querySelector("#code4rena").textContent.includes("winding down"));
assert.ok(root.querySelector("#spearbit").textContent.includes("Cantina"));
assert.ok(root.querySelector("#openzeppelin").textContent.includes("retired on July 1, 2026"));
assert.ok(root.querySelector("#zetachain").textContent.includes("scheduled December 9"));
const mainSections = root.querySelectorAll("main > section").map((node) => node.id);
assert.ok(mainSections.indexOf("smart-contract-shortlist") < mainSections.indexOf("smart-contract-directory"));
assert.ok(mainSections.indexOf("smart-contract-fit") < mainSections.indexOf("smart-contract-directory"));
const words = root.querySelector("main").textContent.trim().split(/\s+/).length;
assert.ok(words >= Math.ceil(5929 * 1.3), `Expected at least 30% net growth, found ${words}`);
console.log(`PASS: ${words} main-content words (${((words / 5929 - 1) * 100).toFixed(1)}% net growth), 40 matching entries, 10 matching FAQs, valid anchors, status corrections, preserved membership badge and repeatable generation.`);
