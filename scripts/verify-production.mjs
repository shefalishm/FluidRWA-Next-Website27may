const origin = process.env.FLUIDRWA_PRODUCTION_URL || "https://www.fluidrwa.com";
const expectedRevision = process.env.EXPECTED_COMMIT_SHA;
const routes = [
  "/",
  "/web3vendorecosystem",
  "/vendors/tokenization-platforms",
  "/vendors/smart-contract-development-companies",
  "/vendor-membership",
  "/contact",
  "/privacy",
  "/terms",
  "/refund-cancellation",
  "/shipping-delivery"
];

const failures = [];

for (const route of routes) {
  const response = await fetch(`${origin}${route}`, { redirect: "follow" });
  const html = await response.text();
  const headerHtml = html.match(/<header\b[\s\S]*?<\/header>/i)?.[0] || "";
  if (!response.ok) failures.push(`${route} returned ${response.status}`);
  for (const label of ["Web3 Vendors", "AI Vendors", "Become a Vetted Listing", "Submit Requirements"]) {
    if (!headerHtml.includes(label)) failures.push(`${route} is missing canonical navigation label: ${label}`);
  }
  if (headerHtml.includes("Explore Vendor Ecosystem") || headerHtml.includes("Chain Ecosystem")) {
    failures.push(`${route} contains an obsolete navigation shell`);
  }
  if (expectedRevision && !html.includes(`data-fluidrwa-build="${expectedRevision}"`)) {
    failures.push(`${route} is not running the expected revision ${expectedRevision}`);
  }
}

if (failures.length) {
  console.error("FluidRWA production verification failed:\n");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`FluidRWA production verification passed for ${routes.length} critical routes.`);
