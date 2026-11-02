import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { slugs } from './test-november2-content.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require('/Users/shefalisharma/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.TEST_BASE_URL || 'http://localhost:3055';
const output = process.env.TEST_SCREENSHOT_DIR || '/private/tmp/fluidrwa-november2';
fs.mkdirSync(output, { recursive: true });
const routes = ['/', ...slugs.map(slug => `/blog/${slug}`), '/use-cases/hsbc-gold-token-retail-ownership-case-study'];
const links = new Set();
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
try {
  for (const width of [1440, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const [index, route] of routes.entries()) {
      const response = await page.goto(`${base}${route}`, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200, route);
      assert.equal(await page.locator('h1').count(), 1, route);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `Overflow: ${route} ${width}`);
      if (route === '/') {
        await page.evaluate(async () => {
          for (let y = 0; y < document.body.scrollHeight; y += 650) {
            scrollTo(0, y);
            await new Promise(resolve => setTimeout(resolve, 60));
          }
          scrollTo(0, 0);
        });
        const trust = page.locator('.home-hero-trust');
        assert.equal(await trust.innerText(), 'you can trust');
        const style = await trust.evaluate(el => ({ display: getComputedStyle(el).display, color: getComputedStyle(el).color }));
        assert.equal(style.display, 'block');
        assert.notEqual(style.color, await page.locator('.home-hero-accent').evaluate(el => getComputedStyle(el).color));
      } else {
        const scope = page.locator('main');
        for (const href of await scope.locator('a[href^="/"]').evaluateAll(nodes => nodes.map(node => node.getAttribute('href')))) links.add(href);
        for (const img of await scope.locator('img').all()) {
          await img.scrollIntoViewIfNeeded();
          await img.evaluate(el => el.decode());
          assert.ok(await img.evaluate(el => el.naturalWidth > 0 && el.alt.length > 0), route);
        }
        const faq = scope.locator('details').first();
        if (await faq.count()) {
          await faq.locator('summary').click();
          assert.equal(await faq.getAttribute('open'), '');
        }
        await page.evaluate(() => scrollTo(0, 0));
      }
      await page.screenshot({ path: `${output}/${index}-${width}.png`, fullPage: true });
    }
    assert.deepEqual(errors, [], 'Browser errors');
    await context.close();
  }
  const request = await browser.newContext();
  for (const href of links) {
    const response = await request.request.get(`${base}${href}`);
    assert.ok(response.ok(), `Broken internal link ${href}: ${response.status()}`);
  }
  console.log(`PASS: 10 desktop/mobile views, images, FAQ interaction, homepage line break and ${links.size} internal links. Screenshots: ${output}`);
} finally {
  await browser.close();
}
