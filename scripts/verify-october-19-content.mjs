import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
const require = createRequire("/Users/shefalisharma/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json");
const { chromium } = require("playwright");
const base = process.env.PREVIEW_URL || "http://localhost:3051";
const routes = [
  ["/blog/plaid-vs-truelayer-vs-tink-bank-account-verification", "Plaid", "comparison"],
  ["/blog/fnality-vs-partior-vs-kinexys-institutional-payment-networks", "Fnality", "comparison"],
  ["/use-cases/walmart-canada-dl-freight-invoice-reconciliation-case-study", "Walmart", "case"],
  ["/use-cases/de-beers-tracr-diamond-traceability-case-study", "De Beers", "case"],
  ["/use-cases/lufthansa-uptrip-digital-collectibles-loyalty-case-study", "Lufthansa", "case"]
];
const output = process.env.QA_OUTPUT_DIR || "docs/content-qa-2026-10-19";
fs.mkdirSync(output, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: "chrome" });
const results = [];
const checkedLinks = new Set();
try {
  for (const width of [1440, 390, 360]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    for (const [route, name, type] of routes) {
      const response = await page.goto(`${base}${route}?source=qa-test`, { waitUntil: "networkidle" });
      assert.equal(response.status(), 200, route);
      await page.locator("article").waitFor();
      if (type === "comparison") await page.locator(".article-infographic").scrollIntoViewIfNeeded();
      await page.locator("main img").evaluateAll(async images => {
        await Promise.all(images.map(img => img.decode().catch(() => {})));
      });
      const result = await page.evaluate(() => {
        const article = document.querySelector("article");
        const graphs = [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap(el => {
          const data = JSON.parse(el.textContent);
          return data["@graph"] || [data];
        });
        const firstTable = article.querySelector("table");
        return {
          h1: document.querySelector("h1")?.textContent,
          canonical: document.querySelector('link[rel="canonical"]')?.href,
          overflow: document.documentElement.scrollWidth > innerWidth + 1,
          words: article.textContent.trim().split(/\s+/).length,
          brokenImages: [...document.querySelectorAll("main img")].filter(img => !img.naturalWidth || !img.alt).map(img => img.src),
          reviewed: document.body.textContent.includes("Reviewed by FluidRWA Research Team"),
          date: document.body.textContent.includes("October 19, 2026"),
          noindex: document.querySelector('meta[name="robots"]')?.content.includes("noindex"),
          email: !!article.querySelector('a[href^="mailto:contact@fluidrwa.com"]'),
          internal: [...document.querySelectorAll('main a[href^="/"]')].map(a => a.getAttribute("href")),
          anchors: [...document.querySelectorAll('main a[href^="#"]')].filter(a => !document.getElementById(a.getAttribute("href").slice(1))).map(a => a.getAttribute("href")),
          downloads: [...document.querySelectorAll("a[download]")].map(a => a.href),
          consideration: firstTable?.parentElement.nextElementSibling?.textContent.includes("Should your company be considered?"),
          articleSchema: graphs.find(data => data["@type"] === "Article"),
          imageSchema: graphs.some(data => data["@type"] === "ImageObject"),
          schemaFaqs: graphs.find(data => data["@type"] === "FAQPage")?.mainEntity.length,
          visibleFaqs: document.querySelectorAll("article details").length,
          externalCaseLinks: [...article.querySelectorAll('a[href^="http"]')].map(a => a.href)
        };
      });
      assert.ok(result.h1.includes(name), `Wrong content at ${route}`);
      assert.equal(result.canonical, `https://www.fluidrwa.com${route}`);
      assert.ok(!result.overflow && !result.noindex && result.reviewed && result.date && result.email, `${route}: ${JSON.stringify(result)}`);
      assert.deepEqual(result.brokenImages, []);
      assert.deepEqual(result.anchors, []);
      assert.ok(result.words > 800, `Detail missing: ${route} has ${result.words} words`);
      assert.equal(result.articleSchema.dateModified, "2026-10-19");
      assert.equal(result.schemaFaqs, result.visibleFaqs);
      if (type === "comparison") {
        assert.ok(result.consideration && result.imageSchema);
        assert.equal(result.downloads.length, 2);
        for (const url of result.downloads) {
          const file = await page.request.get(url);
          assert.ok(file.ok() && file.headers()["content-type"]?.includes("image/png"), `Download ${url}`);
        }
      } else assert.deepEqual(result.externalCaseLinks, []);
      for (const href of new Set(result.internal)) {
        if (checkedLinks.has(href)) continue;
        const linked = await page.request.get(new URL(href, base).href);
        const html = await linked.text();
        assert.ok(linked.ok() && !html.includes('id="hero-title"'), `Broken or home fallback: ${href}`);
        checkedLinks.add(href);
      }
      await page.locator("article details").first().click();
      assert.ok(await page.locator("article details[open] p").first().isVisible());
      await page.evaluate(() => window.scrollTo(0, 0));
      const slug = route.split("/").pop();
      await page.screenshot({ path: `${output}/${slug}-${width}-hero.png` });
      if (type === "comparison") {
        await page.locator(".article-infographic").scrollIntoViewIfNeeded();
        await page.screenshot({ path: `${output}/${slug}-${width}-comparison.png` });
      }
      results.push({ route, width, ...result, articleSchema: result.articleSchema["@type"] });
      console.log(`PASS ${width} ${route}: ${result.words} words`);
    }
    await page.close();
  }
  const context = await browser.newContext();
  const sitemap = await (await context.request.get(`${base}/sitemap.xml`)).text();
  const blog = await (await context.request.get(`${base}/blog`)).text();
  const cases = await (await context.request.get(`${base}/use-cases`)).text();
  for (const [route, , type] of routes) {
    assert.ok(sitemap.includes(`https://www.fluidrwa.com${route}`), `Missing sitemap: ${route}`);
    assert.ok((type === "comparison" ? blog : cases).includes(route), `Missing index: ${route}`);
  }
  await context.close();
} finally {
  await browser.close();
  fs.writeFileSync(`${output}/${base.includes("localhost") ? "local" : "production"}-checks.json`, JSON.stringify(results, null, 2));
}
