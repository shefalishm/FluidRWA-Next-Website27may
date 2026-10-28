import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const origin = process.env.QA_ORIGIN || 'http://localhost:3042';
const output = process.env.QA_OUTPUT || '/tmp/fluidrwa-engagement-qa';
fs.mkdirSync(output, { recursive: true });
const slugs = ['top-tokenization-companies-2026', 'carta-vs-angellist-vs-juniper-square-fund-administration', 'alchemy-vs-quicknode-vs-chainstack-rpc-node-providers'];
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
try {
  for (const width of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width, height: width === 390 ? 844 : 1000 } });
    for (const slug of slugs) {
      const response = await page.goto(`${origin}/blog/${slug}?source=qa-test`, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200);
      await page.locator('article.post-main .answer-box').waitFor();
      const result = await page.evaluate(() => {
        const article = document.querySelector('article.post-main');
        return {
          first: article.firstElementChild.className,
          overflow: document.documentElement.scrollWidth > innerWidth + 1,
          tables: article.querySelectorAll('table').length,
          consideration: [...article.querySelectorAll('strong,h2')].filter(e => e.textContent === 'Should your company be considered?').length,
          canon: document.querySelector('link[rel="canonical"]').href,
          email: article.querySelectorAll('a[href^="mailto:contact@fluidrwa.com"]').length,
          deadJumps: [...document.querySelectorAll('a[href^="#"]')].map(a => a.hash.slice(1)).filter(id => id && !document.getElementById(id))
        };
      });
      assert.equal(result.first, 'answer-box');
      assert.equal(result.overflow, false, `${slug} overflows at ${width}`);
      assert.ok(result.tables > 0);
      assert.equal(result.consideration, 1);
      assert.ok(result.email > 0);
      assert.deepEqual(result.deadJumps, []);
      assert.equal(result.canon, `https://www.fluidrwa.com/blog/${slug}`);
      await page.screenshot({ path: `${output}/${slug}-${width}.png` });
      console.log(`PASS ${width}px ${slug}: answer first, table, one vendor CTA, email, jump links, canonical, no page overflow`);
    }
    await page.close();
  }
  const request = await browser.newContext();
  for (const route of ['/vendors/tokenization-platforms', '/vendors/fund-administration-transfer-agents', '/vendors/node-as-a-service-rpc-providers', '/submit-requirement', '/vendor-membership']) {
    const response = await request.request.get(`${origin}${route}?source=qa-test`);
    assert.equal(response.status(), 200, route);
  }
  console.log('PASS: all linked directory and enquiry routes return 200; no forms submitted.');
} finally { await browser.close(); }
