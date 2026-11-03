import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { routes, assetNames } from './test-november3-content.mjs';
const require = createRequire(import.meta.url);
const { chromium } = require('/Users/shefalisharma/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3056';
const output = process.env.TEST_SCREENSHOT_DIR || '/private/tmp/fluidrwa-november3';
fs.mkdirSync(output, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
const links = new Set();
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
try {
  const requestContext = await browser.newContext();
  for (const [indexPath, route] of [['/blog', routes[0]], ['/blog', routes[1]], ['/blog', routes[2]], ['/use-cases', routes[3]], ['/learn', routes[4]]]) {
    const response = await requestContext.request.get(`${base}${indexPath}`);
    assert.ok(response.ok());
    assert.ok((await response.text()).includes(route), `Index: ${route}`);
  }
  const sitemap = await requestContext.request.get(`${base}/sitemap.xml`);
  const sitemapText = await sitemap.text();
  for (const route of routes) assert.ok(sitemapText.includes(`https://www.fluidrwa.com${route}`), `Sitemap: ${route}`);
  for (const width of [1440, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const [index, route] of routes.entries()) {
      const response = await page.goto(`${base}${route}`, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200, route);
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), `https://www.fluidrwa.com${route}`);
      assert.ok((await page.locator('meta[name="description"]').getAttribute('content')).length > 60);
      const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
      for (const schema of schemas) JSON.parse(schema);
      assert.ok(schemas.join('').includes('FAQPage'), route);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `Overflow: ${route} ${width}`);
      const main = page.locator('main');
      assert.ok(await main.locator('img[src*="november3.webp"]').count(), `Article illustration: ${route}`);
      for (const img of await main.locator('img').all()) {
        await img.scrollIntoViewIfNeeded(); await img.evaluate(el => el.decode());
        assert.ok(await img.evaluate(el => el.naturalWidth > 0 && el.alt.length > 20));
      }
      for (const link of await main.locator('a[href^="http"]').all()) {
        const href = await link.getAttribute('href');
        if (!href.startsWith('https://www.fluidrwa.com')) assert.match(await link.getAttribute('rel') || '', /nofollow/);
      }
      for (const href of await main.locator('a[href^="/"]').evaluateAll(nodes => nodes.map(node => node.getAttribute('href')))) links.add(href.split('#')[0]);
      const faq = main.locator('details').first();
      if (await faq.count()) { await faq.locator('summary').click(); assert.equal(await faq.getAttribute('open'), ''); }
      if (index < 3) {
        assert.ok(await main.locator('table').count());
        assert.ok(await main.locator('a[href="mailto:contact@fluidrwa.com"]').count());
      }
      if (index === 4) {
        const download = page.locator('a[download][href="/examples/claude-evidence-lab.mjs"]');
        const [artifact] = await Promise.all([page.waitForEvent('download'), download.click()]);
        assert.equal(artifact.suggestedFilename(), 'claude-evidence-lab.mjs');
      }
      await page.evaluate(() => scrollTo(0, 0));
      await page.screenshot({ path: `${output}/${index}-${width}.png`, fullPage: true });
    }
    assert.deepEqual(errors, [], `Browser errors at ${width}`);
    await context.close();
  }
  for (const path of links) {
    const response = await requestContext.request.get(`${base}${path}`);
    assert.ok(response.ok(), `Internal link: ${path} ${response.status()}`);
  }
  for (const name of [...assetNames, ...assetNames.slice(0, 3).map(name => `${name}-card`)]) {
    const path = `/assets/blog-thumbnails/${name}.webp`;
    const response = await requestContext.request.get(`${base}${path}`);
    assert.equal(response.status(), 200, path);
    assert.equal(hash(await response.body()), hash(fs.readFileSync(`public${path}`)), `Asset bytes: ${path}`);
  }
  const download = await requestContext.request.get(`${base}/examples/claude-evidence-lab.mjs`);
  assert.equal(hash(await download.body()), hash(fs.readFileSync('public/examples/claude-evidence-lab.mjs')));
  console.log(`PASS ${base}: five routes, ten desktop/mobile views, indexes, sitemap, metadata/schema, no overflow, loaded images, outbound policy, FAQ/download interaction, ${links.size} internal links and exact published image/lab bytes. Screenshots: ${output}`);
} finally { await browser.close(); }
