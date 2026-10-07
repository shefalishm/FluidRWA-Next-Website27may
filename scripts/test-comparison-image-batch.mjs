import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import sharp from 'sharp';
import batch from './comparison-image-batch-october-7.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require('/Users/shefalisharma/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.TEST_BASE_URL || 'http://localhost:3036';
const output = '/private/tmp/fluidrwa-comparison-images-october-7';
fs.mkdirSync(output, { recursive: true });
let bytes = 0;
for (const item of batch) {
  const html = fs.readFileSync(`blog/${item.slug}/index.html`, 'utf8');
  assert.ok(html.includes(`https://www.fluidrwa.com/blog/${item.slug}`));
  assert.ok(/alt="[^"]+comparison table covering/.test(html), `Missing descriptive alt text: ${item.slug}`);
  assert.match(html, /Download infographic \(PNG\)/);
  assert.match(html, /Should your company be considered/);
  assert.ok(/<table\b/.test(html), `Missing accessible table: ${item.slug}`);
  const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/)[1])['@graph'];
  const image = graph.find(node => node['@type'] === 'ImageObject');
  assert.ok(image && image.keywords.includes(item.title));
  for (const suffix of ['comparison', 'comparison-mobile']) {
    const file = `assets/infographics/${item.slug}-${suffix}.png`;
    const data = fs.readFileSync(file);
    assert.equal(Buffer.compare(data, fs.readFileSync(`public/${file}`)), 0);
    const meta = await sharp(data).metadata();
    assert.equal(meta.width, suffix === 'comparison' ? 1600 : 900);
    assert.equal(meta.height, suffix === 'comparison' ? 1050 : 1969);
    assert.ok(data.length < 250000, `${file} is oversized`);
    assert.ok((await sharp(data).stats()).channels.some(channel => channel.stdev > 20), 'Blank image');
    bytes += data.length;
  }
}
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
try {
  for (const width of [1440, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    for (const item of batch) {
      await page.goto(`${base}/blog/${item.slug}`, { waitUntil: 'domcontentloaded' });
      const figure = page.locator('.article-infographic');
      await figure.scrollIntoViewIfNeeded();
      await page.waitForFunction(() => {
        const image = document.querySelector('.article-infographic img');
        return image?.complete && image.naturalWidth > 0;
      });
      const metrics = await page.locator('.article-infographic img').evaluate(image => ({
        alt: image.alt, source: image.currentSrc, width: image.naturalWidth, height: image.naturalHeight,
        overflow: document.documentElement.scrollWidth > innerWidth
      }));
      assert.equal(metrics.overflow, false, `Page overflow: ${item.slug} ${width}`);
      assert.equal(metrics.width, width === 1440 ? 1600 : 900);
      assert.equal(metrics.height, width === 1440 ? 1050 : 1969);
      for (const vendor of item.vendors) assert.ok(metrics.alt.includes(vendor));
      await figure.screenshot({ path: `${output}/${item.slug}-${width}.png` });
      const href = await page.locator('.article-infographic-download').getAttribute('href');
      const response = await context.request.get(`${base}${href}`);
      assert.equal(response.status(), 200);
      assert.match(response.headers()['content-type'], /image\/png/);
    }
    await context.close();
  }
  console.log(`PASS: 10 articles, 20 responsive views, alt text, image schema, downloadable PNGs, dimensions, nonblank pixels and no page overflow. Total image bytes: ${bytes}. Screenshots: ${output}`);
} finally {
  await browser.close();
}
