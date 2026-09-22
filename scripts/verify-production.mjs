const origin = process.env.FLUIDRWA_PRODUCTION_URL || "https://www.fluidrwa.com";
const expectedRevision = process.env.EXPECTED_COMMIT_SHA;
const routes = [
  "/",
  "/web3vendorecosystem",
  "/vendors/tokenization-platforms",
  "/vendors/smart-contract-development-companies",
  "/vendor-membership",
  "/contact",
  "/submit-requirement",
  "/tokenization-readiness-assessment-tool",
  "/blog/top-tokenization-companies-2026",
  "/fluidrwa/nowpayments",
  "/web3-events",
  "/privacy",
  "/terms",
  "/refund-cancellation",
  "/shipping-delivery"
];

const failures = [];

async function fetchWithRetry(url, attempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(30000) });
      if (response.status < 500 || attempt === attempts) return response;
    } catch (error) {
      lastError = error;
      if (attempt === attempts) throw error;
    }
    await new Promise((resolve) => setTimeout(resolve, attempt * 2000));
  }
  throw lastError;
}

for (const route of routes) {
  let response;
  let html;
  try {
    response = await fetchWithRetry(`${origin}${route}`);
    html = await response.text();
  } catch (error) {
    failures.push(`${route} could not be fetched: ${error instanceof Error ? error.message : String(error)}`);
    continue;
  }
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
