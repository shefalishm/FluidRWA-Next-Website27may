import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { pages, imagePath, sample, hash } from './test-november4-content.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || '/Users/shefalisharma/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3056';
const screenshots = process.env.TEST_SCREENSHOT_DIR || '/private/tmp/fluidrwa-november4';
fs.mkdirSync(screenshots, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
const internal = new Set();
try {
  const requests = await browser.newContext();
  const get = async path => {
    const response = await requests.request.get(`${base}${path}`);
    assert.equal(response.status(), 200, path);
    return response;
  };
  const index = new Map();
  for (const path of ['/blog', '/use-cases', '/learn', '/sitemap.xml', '/llms.txt']) index.set(path, await (await get(path)).text());
  for (const [hub, route] of pages) {
    assert.ok(index.get(hub).includes(route), `Hub missing ${route}`);
    for (const path of ['/sitemap.xml', '/llms.txt']) assert.ok(index.get(path).includes(`https://www.fluidrwa.com${route}`), `${path}: ${route}`);
  }
  for (const width of [1440, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, acceptDownloads: true });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const [i, [, route, title, topic]] of pages.entries()) {
      const response = await page.goto(`${base}${route}`, { waitUntil: 'domcontentloaded' });
      assert.equal(response.status(), 200, route);
      assert.ok((await page.title()).includes(title), `Wrong title: ${route}`);
      assert.equal(await page.locator('h1').count(), 1, route);
      assert.ok((await page.locator('h1').textContent()).includes(title), route);
      assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'), `https://www.fluidrwa.com${route}`);
      assert.ok((await page.locator('meta[name=description]').getAttribute('content')).length >= 60);
      const metaImage = await page.locator('meta[property="og:image"]').first().getAttribute('content');
      assert.equal(new URL(metaImage, base).pathname, imagePath(topic));
      const schema = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap(raw => {
        const parsed = JSON.parse(raw);
        return parsed['@graph'] || [parsed];
      });
      assert.ok(schema.some(node => node['@type'] === 'Article' && node.dateModified === '2026-11-04'), route);
      assert.ok(schema.some(node => node['@type'] === 'FAQPage'), route);
      const main = page.locator('main');
      const body = await main.textContent();
      assert.match(body, /Reviewed by\s*FluidRWA Research Team/);
      assert.match(body, /Nov(?:ember)? 4, 2026/);
      await page.evaluate(() => document.fonts.ready);
      for (const img of await main.locator('img').all()) {
        await img.scrollIntoViewIfNeeded();
        assert.ok(await img.evaluate(async el => { await el.decode(); return el.naturalWidth > 0 && el.alt.length > 20; }));
      }
      assert.equal(await main.locator(`img[src="${imagePath(topic)}"]`).count(), 1, route);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `Overflow at ${width}: ${route}`);
      const anchors = await main.locator('a[href]').evaluateAll(nodes => nodes.map(a => ({ href: a.getAttribute('href'), rel: a.rel })));
      for (const { href, rel } of anchors) {
        if (href.startsWith('#') && href.length > 1) assert.equal(await page.evaluate(id => Boolean(document.getElementById(id)), href.slice(1)), true, href);
        if (href.startsWith('/') && !href.startsWith('//')) internal.add(href.split('#')[0]);
        if (/^https?:/.test(href) && new URL(href).origin !== 'https://www.fluidrwa.com') assert.ok(rel.split(/\s+/).includes('nofollow'), href);
      }
      const faq = main.locator('details').first();
      await faq.locator('summary').click();
      assert.equal(await faq.getAttribute('open'), '');
      if (i < 3) {
        assert.equal(await main.locator('table').count(), 2);
        assert.ok(await main.getByText('Should your company be considered?').isVisible());
        assert.ok(await main.locator('a[href="mailto:contact@fluidrwa.com"]').count());
      }
      if (i === 4) {
        const [download] = await Promise.all([page.waitForEvent('download'), main.locator(`a[download][href="${sample}"]`).click()]);
        assert.equal(download.suggestedFilename(), 'transaction-simulation-lab.mjs');
        assert.equal(hash(fs.readFileSync(await download.path())), hash(fs.readFileSync(`public${sample}`)));
      }
      await page.evaluate(() => scrollTo(0, 0));
      await page.screenshot({ path: `${screenshots}/${i}-${width}.png`, fullPage: true });
    }
    assert.deepEqual(errors, [], `Browser errors at ${width}px`);
    await context.close();
  }
  for (const href of internal) await get(href);
  const assets = [...pages.map(row => imagePath(row[3])), ...pages.slice(0, 3).map(row => imagePath(row[3], true)), sample];
  for (const asset of assets) assert.equal(hash(await (await get(asset)).body()), hash(fs.readFileSync(`public${asset}`)), asset);
  console.log(`PASS ${base}: five titled routes at 1440px and 390px, metadata, outbound policy, FAQ/download, hubs, sitemap, ${internal.size} internal destinations and ${assets.length} exact asset responses. ${screenshots}`);
} finally {
  await browser.close();
}
