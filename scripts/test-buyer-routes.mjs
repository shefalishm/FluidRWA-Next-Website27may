import fs from "node:fs";
import assert from "node:assert/strict";

const routes = ["vendors/crypto-custody-providers", "vendors/tokenization-platforms", "vendors/blockchain-development-companies", "vendors/smart-contract-development-companies", "vendors/fiat-on-off-ramp-providers", "blog/top-tokenization-companies-2026"];
for (const route of routes) {
  const html = fs.readFileSync(`.next/server/app/${route}.html`, "utf8");
  assert(html.includes('aria-label="Plan your next step"'), `${route}: buyer next steps missing`);
  assert(html.includes("source=buyer-guide"), `${route}: contextual brief missing`);
}
const ecosystem = fs.readFileSync(".next/server/app/web3vendorecosystem.html", "utf8");
const index = ecosystem.match(/<script id="vendor-search-index-data" type="application\/json">([\s\S]*?)<\/script>/);
assert(index, "Search index missing from generated page");
assert(JSON.parse(index[1]).length > 800, "Category search index unexpectedly incomplete");
const contact = fs.readFileSync(".next/server/app/contact.html", "utf8");
assert(contact.includes('value="contact-general"'));
assert(contact.includes("Send Inquiry"));
console.log("Six buyer CTA routes, category index and general contact checks passed.");
