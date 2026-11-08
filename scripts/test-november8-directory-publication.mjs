import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import sharp from 'sharp';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || `${process.env.HOME}/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright`);
const base = process.argv[2] || 'http://localhost:3118';
const canonical = 'https://www.fluidrwa.com';
const pages = [
  ['/vendors/tokenization-platforms', 'RWA Tokenization Platform Directory: 11 Providers | FluidRWA', 'Browse 11 issuer-side tokenization platforms and service providers. Filter by project fit, compare asset and jurisdiction requirements, and build a shortlist.', 11],
  ['/vendors/crypto-custody-providers', '28 Institutional Crypto Custody Providers Compared', 'Compare 28 institutional crypto custodians by regulatory status, MPC or cold-storage controls, insurance, asset support and operating model.', 28],
  ['/blog/clarity-act-timeline-guide', 'Did the CLARITY Act Pass? Senate Status and What It Means for RWAs | FluidRWA', 'The House passed H.R. 3633, but a Senate vote to take it up failed. See what that means for tokenized funds, custody and exchanges under current law.', 0],
  ['/vendors/fiat-on-off-ramp-providers', 'Crypto On-Ramp and Off-Ramp Providers: 29 Compared', 'Compare fiat-to-crypto and crypto-to-fiat providers by country, payment method, KYC ownership and payout route. Verify the corridor before integrating.', 29],
  ['/vendors/stablecoin-infrastructure-providers', 'Stablecoin Infrastructure Providers for Payments & Payouts', 'Compare 30 providers for stablecoin payment acceptance, payouts, issuance, treasury and compliance. Check who holds funds and handles conversion and settlement.', 30]
];
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const checked = new Set();
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const socialBytes = fs.readFileSync('public/assets/social/tokenization-platforms.png');
assert.equal(hash(socialBytes), hash(fs.readFileSync('assets/social/tokenization-platforms.png')));
const social = await sharp(socialBytes).metadata();
assert.equal(social.width, 1200);
assert.equal(social.height, 630);
try {
  for (const width of [1440, 390, 360]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, serviceWorkers: 'block' });
    await context.route('**/*', route => {
      const request = route.request();
      return new URL(request.url()).origin === base && ['GET', 'HEAD'].includes(request.method()) ? route.continue() : route.abort();
    });
    const page = await context.newPage();
    for (const [path, title, description, count] of pages) {
      const errors = [];
      const onError = error => errors.push(error.message);
      page.on('pageerror', onError);
      const response = await page.goto(base + path + '?analytics=off', { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200, path);
      assert.equal(await page.title(), title, path);
      for (const selector of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']) assert.equal(await page.locator(selector).getAttribute('content'), description, `${path}: ${selector}`);
      for (const selector of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) assert.equal(await page.locator(selector).getAttribute('content'), title);
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), canonical + path);
      assert.equal(await page.locator('meta[property="og:url"]').getAttribute('content'), canonical + path);
      assert.equal(await page.locator('h1').count(), 1);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${width} ${path}: overflow`);
      const schemas = await page.locator('script[type="application/ld+json"]').evaluateAll(nodes => nodes.flatMap(node => { const data = JSON.parse(node.textContent); return data['@graph'] || [data]; }));
      const main = await page.locator('main').innerText();
      if (count) {
        const cards = page.locator('.bc-company-card');
        assert.equal(await cards.count(), count, path);
        const order = await cards.evaluateAll(nodes => nodes.map(node => node.id));
        const list = schemas.find(row => row['@type'] === 'ItemList' && row['@id']?.endsWith('#providers'));
        assert.equal(list.numberOfItems, count);
        assert.deepEqual(list.itemListElement.map(row => new URL(row.url).hash.slice(1)), order, `${path}: schema order`);
        assert.ok(!await page.getByText('License / regulatory status', { exact: true }).count());
        assert.ok(!await page.getByText('Typical engagement', { exact: true }).count());
        const query = page.locator('#bcSearch').or(page.locator('[data-provider-query]'));
        await query.fill('zzqnomatchzzq');
        assert.equal(await page.locator('.bc-company-card:visible').count(), 0);
        assert.match(await page.locator('.vendor-filter-status').innerText(), /^0 of /i);
        await page.getByRole('button', { name: 'Reset filters', exact: true }).click();
        assert.equal(await page.locator('.bc-company-card:visible').count(), count);
        const workflow = page.locator('[data-vendor-regulatory]');
        assert.match(await workflow.locator('..').textContent(), /Workflow mentioned/);
        await workflow.selectOption(path.includes('custody') ? 'custody' : path.includes('tokenization') ? 'onboarding' : 'payments');
        assert.ok(await page.locator('.bc-company-card:visible').count() > 0);
        assert.deepEqual(await cards.evaluateAll(nodes => nodes.map(node => node.id)), order, 'Filtering must not reorder vendors');
        await page.getByRole('button', { name: 'Reset filters', exact: true }).click();
        if (path.endsWith('tokenization-platforms')) {
          assert.equal(order[9], 'zoniqx');
          assert.equal(await page.locator('h1').innerText(), 'RWA Tokenization Platform Directory');
          assert.ok(!main.includes('30+ vetted'));
          for (const name of ['securitize', 'tokeny', 'zoniqx']) {
            const card = page.locator(`#${name}`);
            const schema = list.itemListElement.find(row => new URL(row.url).hash === `#${name}`).item;
            assert.equal(await card.locator('[itemprop="description"]').innerText(), schema.description);
            assert.match(await card.getByRole('link', { name: 'Official product scope', includeHidden: true }).getAttribute('rel'), /nofollow/);
          }
        }
        await cards.nth(0).locator('[data-shortlist-toggle]').click();
        await cards.nth(1).locator('[data-shortlist-toggle]').click();
        await page.getByRole('button', { name: 'Compare', exact: true }).click();
        assert.equal(await page.getByRole('dialog').count(), 1);
        assert.equal(await page.getByRole('dialog').locator('tbody tr').count(), 2);
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'Shortlist overflow');
        const href = await page.getByRole('link', { name: 'Get shortlist guidance' }).getAttribute('href');
        assert.equal(new URL(href, base).pathname, '/submit-requirement');
        assert.ok(new URL(href, base).searchParams.get('shortlist'));
        await page.keyboard.press('Escape');
        await page.getByRole('button', { name: 'Clear', exact: true }).click();
      } else {
        assert.ok(main.includes('has not become law as of November 6, 2026'));
        const article = schemas.find(row => row['@type'] === 'Article');
        assert.equal(article.datePublished, '2026-10-25');
        assert.equal(article.dateModified, '2026-11-06');
      }
      const alternates = await page.locator('link[hreflang]').evaluateAll(nodes => nodes.map(n => [n.hreflang, n.href]));
      if (count && path !== '/vendors/stablecoin-infrastructure-providers') assert.ok(alternates.some(([lang, href]) => lang === 'es' && href === canonical + '/es' + path), path);
      assert.ok(!(await page.locator('main a').evaluateAll(nodes => nodes.map(n => n.getAttribute('href')))).some(href => href?.startsWith('/') && /utm_/i.test(href)));
      if (width === 1440) {
        const assets = await page.locator('img, link[rel="stylesheet"], script[src], meta[property="og:image"], meta[name="twitter:image"]').evaluateAll(nodes => nodes.map(n => n.src || n.href || n.content).filter(Boolean));
        const links = await page.locator('main a[href]').evaluateAll(nodes => nodes.map(n => n.href));
        for (const url of [...assets, ...links]) {
          const destination = new URL(url, base);
          if (![base, canonical].includes(destination.origin)) continue;
          destination.protocol = new URL(base).protocol;
          destination.host = new URL(base).host;
          destination.hash = '';
          const target = destination.href;
          if (checked.has(target)) continue;
          checked.add(target);
          const result = await context.request.get(target);
          assert.equal(result.status(), 200, `${path} -> ${target}`);
          const localAsset = `public${destination.pathname}`;
          if (destination.pathname.startsWith('/assets/') && fs.existsSync(localAsset)) assert.equal(hash(await result.body()), hash(fs.readFileSync(localAsset)), `${target}: exact asset bytes`);
        }
      }
      await page.locator('h1').scrollIntoViewIfNeeded();
      if (process.env.TEST_SCREENSHOT_DIR) {
        fs.mkdirSync(process.env.TEST_SCREENSHOT_DIR, { recursive: true });
        await page.screenshot({ path: `${process.env.TEST_SCREENSHOT_DIR}/${path.split('/').at(-1)}-${width}.png` });
      }
      assert.deepEqual(errors, [], `${path}: page errors`);
      page.off('pageerror', onError);
      console.log(`PASS ${width}px ${path}`);
    }
    await context.close();
  }
  if (base === canonical) {
    for (const [path, , , count] of pages) {
      const context = await browser.newContext({ serviceWorkers: 'block', userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36' });
      await context.route('**/*', route => new URL(route.request().url()).origin === canonical && ['GET', 'HEAD'].includes(route.request().method()) ? route.continue() : route.abort());
      await context.addInitScript(() => Object.defineProperty(navigator, 'webdriver', { get: () => false }));
      const page = await context.newPage();
      await page.goto(base + path, { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => window.dataLayer?.some(row => row[1] === 'page_view'));
      await page.evaluate(() => document.addEventListener('click', event => event.preventDefault()));
      const buyer = page.locator('main a[href^="/submit-requirement"]').filter({ visible: true }).first();
      await buyer.click();
      if (count) {
        await page.locator('.bc-company-card').first().locator('[data-shortlist-toggle]').click();
        await page.getByRole('button', { name: 'Compare', exact: true }).click();
        await page.getByRole('link', { name: 'Get shortlist guidance' }).click();
        await page.keyboard.press('Escape');
      }
      const vendor = page.locator('a[href^="/vendor-membership"]').filter({ visible: true }).first();
      await vendor.click();
      const events = await page.evaluate(() => window.dataLayer.filter(row => row[0] === 'event').map(row => ({ name: row[1], params: row[2] })));
      assert.equal(events.filter(row => row.name === 'page_view').length, 1);
      assert.ok(events.filter(row => row.name === 'enquiry_cta_click').length >= 2, `${path}: buyer and vendor intent`);
      if (count) for (const name of ['directory_shortlist_add', 'directory_shortlist_open', 'directory_shortlist_submit_intent']) assert.ok(events.some(row => row.name === name), `${path}: ${name}`);
      assert.ok(!events.some(row => /generate_lead|submit_success|request_sent/.test(row.name)));
      assert.ok(!JSON.stringify(events).includes('shortlist='), 'No query strings in analytics');
      await context.close();
      console.log(`PASS isolated buyer/vendor tracking ${path}; no third-party collection or writes`);
    }
  }
  console.log(`PASS all five pages; ${checked.size} unique internal destinations/assets; no form submissions or analytics transmission.`);
} finally { await browser.close(); }
