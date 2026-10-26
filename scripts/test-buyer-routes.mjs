import fs from "node:fs";
import assert from "node:assert/strict";

const categoryRoutes = ["vendors/crypto-custody-providers", "vendors/tokenization-platforms", "vendors/blockchain-development-companies", "vendors/smart-contract-development-companies", "vendors/fiat-on-off-ramp-providers"];
for (const route of [...categoryRoutes, "blog/top-tokenization-companies-2026"]) {
  const html = fs.readFileSync(`.next/server/app/${route}.html`, "utf8");
  assert(html.includes('/submit-requirement'), `${route}: buyer enquiry route missing`);
  assert(html.includes('mailto:contact@fluidrwa.com'), `${route}: email alternative missing`);
  assert(html.includes('source='), `${route}: enquiry attribution missing`);
}
const ecosystem = fs.readFileSync(".next/server/app/web3vendorecosystem.html", "utf8");
const index = ecosystem.match(/<script id="vendor-search-index-data" type="application\/json">([\s\S]*?)<\/script>/);
assert(index, "Search index missing from generated page");
assert(JSON.parse(index[1]).length > 800, "Category search index unexpectedly incomplete");
const contact = fs.readFileSync(".next/server/app/contact.html", "utf8");
assert(contact.includes('value="contact-general"'));
assert(contact.includes("Send Inquiry"));
for (const route of categoryRoutes) {
  const html = fs.readFileSync(`.next/server/app/${route}.html`, "utf8");
  assert(html.includes('/downloads/fluidrwa-buyer-brief.txt'), `${route}: worksheet missing`);
  assert(html.includes('class="buyer-evidence-table"'), `${route}: evidence table missing`);
  assert(html.includes('overflow-x:auto'), `${route}: table scroll missing`);
}
assert(fs.readFileSync('.next/server/app/submit-requirement.html', 'utf8').includes('mailto:contact@fluidrwa.com'), 'Project form email alternative missing');
assert(fs.readFileSync('public/downloads/fluidrwa-buyer-brief.txt', 'utf8').includes('6. SHORTLIST NOTES'));
console.log("Six buyer routes, category index, email alternatives and general contact checks passed.");
