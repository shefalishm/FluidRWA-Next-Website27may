import fs from 'node:fs';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import categories from './institutional-finance-categories.mjs';
const require = createRequire('/Users/shefalisharma/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json');
const { chromium } = require('playwright');
const base = process.env.PREVIEW_URL || 'http://localhost:3042';
const output = 'docs/finance-category-qa-2026-10-10';
fs.mkdirSync(output, { recursive: true });
const results = [];
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
try {
  for (const width of [1440, 390, 360]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    for (const category of categories) {
      const url = `${base}/vendors/${category.slug}?source=qa-test`;
      const response = await page.goto(url, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200);
      await page.locator('#vendor-directory').scrollIntoViewIfNeeded();
      const result = await page.evaluate(() => ({
        h1: document.querySelector('h1')?.textContent,
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
        canonical: document.querySelector('link[rel=canonical]')?.href,
        count: document.querySelectorAll('.bc-company-card').length,
        email: !!document.querySelector('a[href="mailto:contact@fluidrwa.com"]'),
        updated: document.body.textContent.includes('10 October 2026'),
        noindex: document.querySelector('meta[name=robots]')?.content.includes('noindex'),
        sources: [...document.querySelectorAll('.bc-visit')].map(a => a.href),
        intros: [...document.querySelectorAll('.bc-company-card [data-vendor-contact-trigger]')].map(a => a.dataset.vendorName),
        links: [...document.querySelectorAll('main a[href^="/"]')].map(a => a.href),
        graphs: [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap(s => JSON.parse(s.textContent)['@graph'] || [JSON.parse(s.textContent)])
      }));
      assert.equal(result.h1, category.title);
      assert.equal(result.canonical, `https://www.fluidrwa.com/vendors/${category.slug}`);
      assert.equal(result.count, category.vendors.length);
      assert.equal(result.sources.length, category.vendors.length);
      assert.equal(result.intros.length, category.vendors.length);
      await page.locator('.bc-company-card [data-vendor-contact-trigger]').first().click();
      await page.getByRole('dialog').waitFor();
      await page.keyboard.press('Escape');
      assert.ok(result.email && result.updated && !result.overflow && !result.noindex);
      const list = result.graphs.find(x => x['@type'] === 'ItemList');
      assert.equal(list.numberOfItems, category.vendors.length);
      assert.equal(result.graphs.find(x => x['@type'] === 'FAQPage').mainEntity.length, category.faqs.length);
      for (const target of new Set(result.links)) assert.ok((await page.request.get(target)).ok(), `Broken link ${target}`);
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 600) {
          window.scrollTo(0, y);
          await new Promise(resolve => setTimeout(resolve, 50));
        }
      });
      await page.locator('h1').scrollIntoViewIfNeeded();
      await page.screenshot({ path: `${output}/${category.slug}-${width}.png`, fullPage: true });
      results.push({ width, slug: category.slug, ...result, graphs: result.graphs.map(x => x['@type']) });
      console.log(`PASS ${width} ${category.slug}`);
    }
    await page.close();
  }
  const request = await browser.newContext();
  const sitemap = await (await request.request.get(`${base}/sitemap.xml`)).text();
  const ecosystem = await (await request.request.get(`${base}/web3vendorecosystem`)).text();
  for (const category of categories) {
    assert.ok(sitemap.includes(`https://www.fluidrwa.com/vendors/${category.slug}`));
    assert.ok(ecosystem.includes(`/vendors/${category.slug}`));
  }
  for (const [slug, category] of [
    ['talos-vs-wyden-vs-finery-markets-institutional-trading', categories[0]],
    ['taxbit-vs-ledgible-vs-lukka-enterprise-crypto-accounting-tax', categories[1]],
    ['bitwave-vs-cryptio-vs-tres-crypto-accounting', categories[1]]
  ]) {
    const html = await (await request.request.get(`${base}/blog/${slug}`)).text();
    assert.ok(html.includes(`/vendors/${category.slug}`), `Missing hub link ${slug}`);
  }
  await request.close();
} finally {
  await browser.close();
  fs.writeFileSync(`${output}/${base.includes('localhost') ? 'local' : 'production'}-checks.json`, JSON.stringify(results, null, 2));
}
