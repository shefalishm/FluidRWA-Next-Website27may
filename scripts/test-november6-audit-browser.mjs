import assert from "node:assert/strict";
import { createRequire } from "node:module";
import fs from "node:fs";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || `${process.env.HOME}/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright`);
const canonical = "https://www.fluidrwa.com";
const base = process.env.TEST_BASE_URL || canonical;
const hsbc = "/use-cases/hsbc-gold-token-retail-ownership-case-study";
const retired = "/use-cases/hsbc-gold-token-retail-physical-gold-case-study";
const findings = "/network-explorer/research/tokenized-fund-infrastructure-october-2026#october-findings";
const rampEvidence = "/network-explorer/research/ramp-onboarding";
const tax = "/vendors/crypto-accounting-tax-software";
const fixture = "/downloads/crypto-reconciliation-test.csv";
const pages = [
  ["/blog/top-tokenization-companies-2026", /Issuer Fit/, "Buyer guidance revised", findings],
  ["/blog/clarity-act-timeline-guide", /Did the CLARITY Act Pass/, "has not become law"],
  ["/blog/talos-vs-wyden-vs-finery-markets-institutional-trading", /Talos/, "Share your trading requirements", "/vendors/institutional-digital-asset-trading-platforms"],
  ["/blog/crypto-custody-providers-comparison-2026", /Custody Providers/, "legal ownership register", findings],
  ["/blog/alloy-vs-unit21-vs-sardine-fintech-risk-compliance", /Alloy/, "Test who owns each decision", rampEvidence],
  ["/blog/best-fund-tokenization-platforms-asset-managers", /Fund Tokenization/, "responsibility matrix", findings],
  ["/use-cases/digital-asset-tax-reporting-cost-basis-operations", /cost.basis/i, "reconciliation", tax + "#reconciliation-test"],
  ["/vendors/stablecoin-infrastructure-providers", /Payments & Payouts/, "who holds funds"],
  ["/vendors/fiat-on-off-ramp-providers", /29 Compared/, "who performs KYC", rampEvidence],
  ["/blockchain-projects/polkadot", /6 Polkadot/, "not a ranking"],
  [tax, /Accounting and Tax/, "reconciliation acceptance test", fixture],
  [hsbc, /HSBC Gold Token/, "Key Facts Statement"],
];

const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const width of [1440, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    for (const [path, title, text, link] of pages) {
      assert.equal((await page.goto(base + path + "?analytics=off", { waitUntil: "domcontentloaded" })).status(), 200, path);
      assert.match(await page.title(), title, path);
      assert.ok(await page.locator('meta[name="description"]').getAttribute("content"), path);
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), canonical + path);
      assert.ok((await page.locator("main").innerText()).toLowerCase().includes(text.toLowerCase()), `${path}: missing "${text}"`);
      if (link) assert.ok(await page.locator(`main a[href="${link}"]`).count(), `${path} -> ${link}`);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `horizontal overflow: ${width} ${path}`);
      if (process.env.TEST_SCREENSHOT_DIR) {
        fs.mkdirSync(process.env.TEST_SCREENSHOT_DIR, { recursive: true });
        await page.screenshot({ path: `${process.env.TEST_SCREENSHOT_DIR}/${path.split("/").at(-1)}-${width}.png` });
      }
    }
    assert.equal(await page.evaluate(() => Boolean(window.fluidRwaTrackEvent)), false);
    await context.close();
  }
  const context = await browser.newContext();
  const get = path => context.request.get(base + path, { maxRedirects: 0 });
  const redirect = await get(retired);
  assert.equal(redirect.status(), 308);
  assert.equal(new URL(redirect.headers().location, base).pathname, hsbc);
  const tracked = await (await get(hsbc + "?utm_source=qa-test")).text();
  assert.ok(tracked.includes(`rel="canonical" href="${canonical}${hsbc}"`));
  const sitemap = await (await get("/sitemap.xml")).text();
  assert.ok(!sitemap.includes(retired));
  const discovery = "/blog/top-tokenization-companies-2026";
  for (const path of [discovery, "/es" + discovery, "/fluidrwa/spice-vc", findings.split("#")[0], rampEvidence, fixture]) {
    const response = await get(path);
    assert.equal(response.status(), 200, path);
    const html = await response.text();
    if (path === discovery || path.startsWith("/es/")) assert.match(html, /hreflang="es"/i);
    if (path.startsWith("/network-explorer/")) assert.match(html, /"@type":"Dataset"/);
    if (path === fixture) assert.match(html, /total-close,both,DEMO,4.99/);
  }
  if (base === canonical) {
    const isolated = await browser.newContext({
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      serviceWorkers: "block"
    });
    // Keep all third-party collection and all writes off the network.
    await isolated.route("**/*", route => {
      const request = route.request();
      return new URL(request.url()).origin === canonical && ["GET", "HEAD"].includes(request.method())
        ? route.continue() : route.abort();
    });
    await isolated.addInitScript(() => Object.defineProperty(navigator, "webdriver", { get: () => false }));
    const page = await isolated.newPage();
    await page.goto(base + discovery, { waitUntil: "domcontentloaded" });
    await page.waitForFunction(() => window.dataLayer?.some(row => row[1] === "page_view"));
    await page.evaluate(() => document.addEventListener("click", event => event.preventDefault()));
    await page.getByRole("link", { name: "Share Your Tokenization Requirements", exact: true }).click();
    const events = await page.evaluate(() => window.dataLayer.filter(row => row[0] === "event").map(row => row[1]));
    assert.equal(events.filter(event => event === "page_view").length, 1);
    assert.ok(events.includes("enquiry_cta_click"));
    assert.ok(!events.includes("generate_lead"));
    await isolated.close();
    console.log("PASS: live page view and buyer CTA event captured locally; no lead event, no collection or form request sent.");
  }
  console.log(`PASS: ${pages.length} routes at desktop and mobile; clean canonicals, links, HSBC redirect, Spanish alternates, SSR datasets and analytics opt-out.`);
} finally {
  await browser.close();
}
