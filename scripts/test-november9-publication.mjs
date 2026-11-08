import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import sharp from 'sharp';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(`${process.env.HOME}/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright`);
const base = process.argv[2] || 'http://localhost:3129';
const canonical = 'https://www.fluidrwa.com';
const pages = [
  ['blog/akash-vs-io-net-vs-aethir-decentralized-gpu-compute', 'Akash vs io.net vs Aethir vs Lium: GPU Compute Compared', 'Akash vs io.net vs Aethir vs Lium: GPU Compute Compared', 0],
  ['blog/taxbit-vs-ledgible-vs-lukka-enterprise-crypto-accounting-tax', 'TaxBit vs Ledgible vs Lukka: Tax Reporting & Cost Basis', 'TaxBit vs Ledgible vs Lukka: Accounting, Tax and Cost Basis', 0],
  ['vendors/growth-marketing-companies', 'Web3 Growth & Marketing Companies Directory | FluidRWA', 'Web3 Growth and Marketing Companies', 32],
  ['vendors/blockchain-development-companies', 'Blockchain Development Companies & Infrastructure Directory', 'Blockchain Development Companies and Infrastructure', 30]
];
const hash = data => crypto.createHash('sha256').update(data).digest('hex');
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const checked = new Set();
try {
  for (const width of [1440, 390, 360]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, serviceWorkers: 'block' });
    await context.route('**/*', route => new URL(route.request().url()).origin === base && ['GET', 'HEAD'].includes(route.request().method()) ? route.continue() : route.abort());
    const page = await context.newPage();
    for (const [path, title, heading, count] of pages) {
      const errors = [];
      const onError = error => errors.push(error.message);
      page.on('pageerror', onError);
      assert.equal((await page.goto(`${base}/${path}?analytics=off${count ? '&hq=US' : ''}`, { waitUntil: 'networkidle' })).status(), 200);
      assert.equal(await page.title(), title);
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.locator('h1').innerText(), heading);
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), `${canonical}/${path}`);
      for (const field of ['og:title', 'twitter:title']) assert.equal(await page.locator(`meta[${field.startsWith('og:') ? 'property' : 'name'}="${field}"]`).getAttribute('content'), title);
      const desc = await page.locator('meta[name="description"]').getAttribute('content');
      for (const selector of ['meta[property="og:description"]', 'meta[name="twitter:description"]']) assert.equal(await page.locator(selector).getAttribute('content'), desc);
      for (const selector of ['meta[property="og:image:alt"]', 'meta[name="twitter:image:alt"]']) assert.ok((await page.locator(selector).getAttribute('content')).length > 30);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${path} overflow ${width}`);
      assert.ok(await page.locator('main a[href^="mailto:contact@fluidrwa.com"]').count());
      assert.ok(await page.locator('main a[href^="/vendor-membership"]').count());
      assert.ok(await page.locator('main a[href^="/submit-requirement"]').count());
      assert.ok(!(await page.locator('main').innerText()).match(/SEO\/AEO note|release QA|publication gate/));
      const schemas = await page.locator('script[type="application/ld+json"]').evaluateAll(nodes => nodes.flatMap(n => {const d = JSON.parse(n.textContent); return d['@graph'] || [d];}));
      if (count) {
        const cards = page.locator('.bc-provider-card, .bc-company-card');
        assert.equal(await cards.count(), count);
        assert.equal(await page.locator('.bc-provider-card:visible, .bc-company-card:visible').count(), count, 'Removed HQ control must not leave a hidden URL filter');
        const order = await cards.evaluateAll(nodes => nodes.map(n => n.id));
        const sourceFile = path.includes('growth') ? 'vendors/growth-marketing/index.html' : 'vendors/blockchain-development/index.html';
        const original = [...fs.readFileSync(sourceFile, 'utf8').matchAll(/<article class="bc-(?:provider|company)-card[^>]*id="([^"]+)"/g)].map(m => m[1]);
        assert.deepEqual(order, path.includes('growth') ? [...original, 'guerrillabuzz', 'reblonde', 'coinzilla'] : original);
        const list = schemas.find(s => s['@type'] === 'ItemList' && s.itemListElement?.length === count);
        assert.ok(list);
        assert.deepEqual(list.itemListElement.map(s => new URL(s.url).hash.slice(1)), order);
        assert.equal(await page.locator('[data-vendor-budget]:visible, [data-vendor-location]:visible').count(), 0);
        assert.ok(!await page.getByText('License / regulatory status', { exact: true }).count());
        const query = page.locator('#bcSearch, [data-provider-query]');
        assert.equal(await query.count(), 1);
        assert.ok(await query.isVisible());
        await query.fill('zznomatchqq');
        assert.equal(await page.locator('.bc-provider-card:visible, .bc-company-card:visible').count(), 0);
        assert.match(await page.locator('.vendor-filter-status').innerText(), /^0 of /i);
        await page.getByRole('button', { name: 'Reset filters', exact: true }).click();
        assert.equal(await page.locator('.bc-provider-card:visible, .bc-company-card:visible').count(), count);
        await page.locator('[data-vendor-regulatory]').selectOption(path.includes('growth') ? 'community' : 'security');
        assert.ok(await page.locator('.bc-provider-card:visible, .bc-company-card:visible').count() > 0);
        assert.deepEqual(await cards.evaluateAll(nodes => nodes.map(n => n.id)), order);
        await page.getByRole('button', { name: 'Reset filters', exact: true }).click();
        const areas = page.locator('.bc-area-card[role="button"]');
        if (await areas.count()) {
          await areas.first().click();
          const visible = await page.locator('.bc-provider-card:visible, .bc-company-card:visible').count();
          assert.ok(visible > 0 && visible <= count);
          await page.getByRole('button', { name: 'Reset filters', exact: true }).click();
          assert.equal(await page.locator('.bc-provider-card:visible, .bc-company-card:visible').count(), count);
        }
        await cards.nth(0).locator('[data-shortlist-toggle]').click();
        await cards.nth(1).locator('[data-shortlist-toggle]').click();
        await page.getByRole('button', { name: 'Compare', exact: true }).click();
        assert.equal(await page.getByRole('dialog').locator('tbody tr').count(), 2);
        await page.keyboard.press('Escape');
        await page.getByRole('button', { name: 'Clear', exact: true }).click();
      } else {
        const article = schemas.find(s => s['@type'] === 'Article');
        assert.equal(article.headline, heading);
        assert.equal(article.dateModified, '2026-11-09');
        assert.equal(article.datePublished, path.includes('akash') ? '2026-08-17' : '2026-09-22');
        assert.equal(await page.locator('meta[property="og:type"]').getAttribute('content'), 'article');
        if (path.includes('akash')) {
          const lium = page.locator('.post-main a[href="https://lium.io/"]');
          assert.equal(await lium.count(), 1);
          assert.ok(!/nofollow/.test(await lium.getAttribute('rel') || ''));
          assert.ok((await page.locator('main').innerText()).includes('sales'));
        }
        const anchors = await page.locator('.post-main a[href^="#"], .toc a[href^="#"]').evaluateAll(nodes => nodes.map(n => n.hash.slice(1)));
        for (const id of anchors) assert.equal(await page.locator(`[id="${id}"]`).count(), 1, `Missing ${id}`);
        if (path.includes('taxbit')) {
          const rows = await page.locator('.post-main table').first().locator('tbody tr').allTextContents();
          assert.equal(rows.length, 3);
          assert.match(rows[0], /Accounting, basis and reporting/);
          const image = page.locator('.article-infographic img');
          assert.ok((await image.getAttribute('src')).includes('-comparison.png'));
          await image.scrollIntoViewIfNeeded();
          await page.waitForFunction(() => { const image = document.querySelector('.article-infographic img'); return image?.complete && image.naturalWidth > 0; });
          const current = await image.evaluate(n => n.currentSrc);
          assert.equal(current.includes('-mobile.png'), width < 621);
        }
      }
      const external = await page.locator('main a[href^="http"]').evaluateAll(nodes => nodes.map(n => [n.href, n.rel]));
      for (const [href, rel] of external) if (!href.startsWith(canonical) && href !== 'https://lium.io/') assert.match(rel, /nofollow/, href);
      assert.ok(!(await page.locator('main a[href^="/"]').evaluateAll(nodes => nodes.map(n => n.href))).some(href => /utm_/i.test(href)));
      if (width === 1440) {
        const urls = await page.locator('main a[href], img[src], script[src], link[rel="stylesheet"], meta[property="og:image"]').evaluateAll(nodes => nodes.map(n => n.href || n.src || n.content));
        for (const url of urls) {
          const dest = new URL(url, base);
          if (![base, canonical].includes(dest.origin) || dest.hash) continue;
          const target = base + dest.pathname + dest.search;
          if (checked.has(target)) continue;
          checked.add(target);
          const result = await context.request.get(target);
          assert.equal(result.status(), 200, target);
          if (dest.pathname.startsWith('/assets/') && fs.existsSync(`public${dest.pathname}`)) assert.equal(hash(await result.body()), hash(fs.readFileSync(`public${dest.pathname}`)));
        }
      }
      assert.deepEqual(errors, []);
      page.off('pageerror', onError);
      if (process.env.TEST_SCREENSHOT_DIR) {
        fs.mkdirSync(process.env.TEST_SCREENSHOT_DIR, { recursive: true });
        await page.locator('h1').scrollIntoViewIfNeeded();
        await page.screenshot({ path: `${process.env.TEST_SCREENSHOT_DIR}/${path.split('/').at(-1)}-${width}.png` });
      }
      console.log(`PASS ${width}px ${path}`);
    }
    await context.close();
  }
  for (const name of ['taxbit-vs-ledgible-vs-lukka-enterprise-crypto-accounting-tax-comparison.png', 'taxbit-vs-ledgible-vs-lukka-enterprise-crypto-accounting-tax-comparison-mobile.png']) {
    const bytes = fs.readFileSync(`public/assets/infographics/${name}`);
    assert.equal(hash(bytes), hash(fs.readFileSync(`assets/infographics/${name}`)));
    assert.equal((await sharp(bytes).metadata()).format, 'png');
  }
  if (base === canonical) for (const [path, , , count] of pages) {
    const context = await browser.newContext({ serviceWorkers: 'block', userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36' });
    await context.route('**/*', route => new URL(route.request().url()).origin === canonical && ['GET', 'HEAD'].includes(route.request().method()) ? route.continue() : route.abort());
    await context.addInitScript(() => Object.defineProperty(navigator, 'webdriver', { get: () => false }));
    const page = await context.newPage();
    await page.goto(`${base}/${path}`, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => window.dataLayer?.some(row => row[1] === 'page_view'));
    await page.evaluate(() => document.addEventListener('click', event => event.preventDefault()));
    await page.locator('main a[href^="/submit-requirement"]').filter({ visible: true }).first().click();
    await page.locator('main a[href^="/vendor-membership"]').filter({ visible: true }).first().click();
    await page.locator('main a[href^="mailto:contact@fluidrwa.com"]').filter({ visible: true }).first().click();
    if (count) {
      await page.locator('[data-shortlist-toggle]').first().click();
      await page.getByRole('button', { name: 'Compare', exact: true }).click();
      await page.getByRole('link', { name: 'Get shortlist guidance' }).click();
      await page.keyboard.press('Escape');
    }
    const events = await page.evaluate(() => window.dataLayer.filter(row => row[0] === 'event').map(row => ({ name: row[1], params: row[2] })));
    assert.equal(events.filter(e => e.name === 'page_view').length, 1);
    assert.ok(events.filter(e => e.name === 'enquiry_cta_click').length >= 2);
    assert.ok(events.some(e => e.name === 'contact_email_click'));
    if (count) for (const name of ['directory_shortlist_add', 'directory_shortlist_open', 'directory_shortlist_submit_intent']) assert.ok(events.some(e => e.name === name));
    assert.ok(!events.some(e => /generate_lead|submit_success|request_sent/.test(e.name)));
    assert.ok(!JSON.stringify(events).includes('shortlist='));
    await context.close();
    console.log(`PASS isolated buyer/vendor/email tracking ${path}`);
  }
  console.log(`PASS four pages, ${checked.size} internal destinations/assets; third-party traffic and non-read requests blocked; no lead submissions.`);
} finally { await browser.close(); }
