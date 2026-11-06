import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || '/Users/shefalisharma/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3056';
const canonical = 'https://www.fluidrwa.com';
const screenshotDir = process.env.TEST_SCREENSHOT_DIR || '/private/tmp/fluidrwa-november5';
const sample = '/examples/rpc-acceptance-lab.mjs';
const rows = [
  ['/blog', 'aave-v3-vs-compound-iii-vs-morpho-blue-lending-integration', 'Aave V3 vs Compound III vs Morpho Blue', 'lending'],
  ['/blog', 'coinbound-vs-lunar-strategy-vs-serotonin-web3-growth', 'Coinbound vs Lunar Strategy vs Serotonin', 'growth'],
  ['/blog', 'dock-vs-cheqd-vs-kilt-verifiable-credentials', 'Dock vs cheqd vs KILT', 'credentials'],
  ['/use-cases', 'vodafone-pairpoint-device-payments-case-study', 'Vodafone Pairpoint', 'pairpoint'],
  ['/learn', 'ethereum-rpc-endpoint-acceptance-test', 'Ethereum RPC Acceptance Test', 'rpc'],
];
const asset = topic => `/assets/blog-thumbnails/${topic}-november5.webp`;
fs.mkdirSync(screenshotDir, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
try {
  const api = await browser.newContext();
  const get = async path => {
    const response = await api.request.get(base + path);
    assert.equal(response.status(), 200, path);
    return response;
  };
  const indexes = new Map();
  for (const path of ['/blog', '/use-cases', '/learn', '/sitemap.xml', '/llms.txt']) indexes.set(path, await (await get(path)).text());
  const internal = new Set();
  for (const width of [1440, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, acceptDownloads: true });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const [hub, slug, title, topic] of rows) {
      const route = `${hub}/${slug}`;
      assert.ok(indexes.get(hub).includes(route), `Hub missing ${route}`);
      for (const path of ['/sitemap.xml', '/llms.txt']) assert.ok(indexes.get(path).includes(canonical + route), `${path}: ${route}`);
      assert.equal((await page.goto(base + route, { waitUntil: 'domcontentloaded' })).status(), 200, route);
      assert.ok((await page.title()).includes(title), route);
      const h1 = page.locator('h1');
      assert.equal(await h1.count(), 1, route);
      assert.ok((await h1.textContent()).includes(title), route);
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), canonical + route);
      assert.ok((await page.locator('meta[name="description"]').getAttribute('content')).length > 55, route);
      const image = asset(topic);
      assert.equal(new URL(await page.locator('meta[property="og:image"]').first().getAttribute('content'), base).pathname, image);
      const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap(raw => {
        const schema = JSON.parse(raw);
        return schema['@graph'] || [schema];
      });
      assert.ok(schemas.some(s => s['@type'] === 'Article' && s.dateModified === '2026-11-06' && (hub === '/use-cases' || s.datePublished === '2026-11-06')), route);
      assert.ok(schemas.some(s => s['@type'] === 'FAQPage'), route);
      const main = page.locator('main');
      const illustration = main.locator(`img[src="${image}"]`);
      await illustration.scrollIntoViewIfNeeded();
      assert.ok(await illustration.evaluate(async img => { await img.decode(); return img.naturalWidth > 0 && img.alt.length > 20; }), route);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${width}px overflow: ${route}`);
      for (const { href, rel } of await main.locator('a[href]').evaluateAll(links => links.map(a => ({ href: a.getAttribute('href'), rel: a.rel })))) {
        if (href.startsWith('#') && href.length > 1) assert.ok(await page.evaluate(id => Boolean(document.getElementById(id)), href.slice(1)), `${route}: ${href}`);
        if (href.startsWith('/') && !href.startsWith('//')) internal.add(href.split('#')[0]);
        if (/^https?:/.test(href) && new URL(href).origin !== canonical) assert.ok(rel.split(/\s+/).includes('nofollow'), href);
      }
      const faq = main.locator('details').first();
      await faq.locator('summary').click();
      assert.equal(await faq.getAttribute('open'), '');
      if (hub === '/blog') assert.ok(await main.locator('table').count(), route);
      if (hub === '/learn') {
        const [download] = await Promise.all([page.waitForEvent('download'), main.locator(`a[download][href="${sample}"]`).click()]);
        assert.equal(download.suggestedFilename(), 'rpc-acceptance-lab.mjs');
        assert.deepEqual(fs.readFileSync(await download.path()), fs.readFileSync(`public${sample}`));
      }
      await page.evaluate(() => scrollTo(0, 0));
      await page.screenshot({ path: `${screenshotDir}/${topic}-${width}.png` });
    }
    assert.deepEqual(errors, [], `Browser errors at ${width}px`);
    await context.close();
  }
  for (const href of internal) await get(href);
  const assets = [...rows.map(row => asset(row[3])), ...rows.slice(0, 3).map(row => asset(row[3]).replace('.webp', '-card.webp')), sample];
  for (const path of assets) assert.deepEqual(await (await get(path)).body(), fs.readFileSync(`public${path}`), path);
  console.log(`PASS ${base}: five articles at 1440px and 390px, metadata, discovery, nofollow, FAQ, download, ${internal.size} internal destinations and ${assets.length} exact assets.`);
} finally {
  await browser.close();
}
