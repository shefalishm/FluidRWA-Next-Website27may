import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3064';
const read = path => fs.readFileSync(path, 'utf8');
const figures = { wtgxx: 668412990, usdc: 69800000000, ustb: 635618049, uscc: 177579856, vbdc: 10030430 };
const checked = '2026-11-04';
const asOf = '2026-11-02';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const screenshots = process.env.TEST_SCREENSHOT_DIR || '/private/tmp/fluidrwa-network-november4';
fs.mkdirSync(screenshots, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
try {
  const get = async path => {
    const response = await fetch(`${base}${path}`, { signal: AbortSignal.timeout(30000) });
    assert.equal(response.status, 200, path);
    return response;
  };
  for (const [id, value] of Object.entries(figures)) {
    const api = await (await get(`/api/network-explorer/v1/assets?q=${id}`)).json();
    const record = api.records.find(row => row.id === id);
    assert.equal(record.reportedValueUsd, value, id);
    assert.equal(record.reportedAsOf, asOf, id);
    assert.equal(record.sourceReviewed, checked, id);
  }
  const coverage = await (await get('/api/network-explorer/v1/coverage')).json();
  const registry = JSON.parse(read('public/assets/datasets/network-asset-registry.json'));
  const additions = JSON.parse(read('data/issuer-additions-november4.json')).assets;
  const prior = JSON.parse(execFileSync('git', ['show', '50de1ea:public/assets/datasets/network-asset-registry.json'], { encoding: 'utf8', maxBuffer: 4_000_000 }));
  const newIds = new Set(additions.map(row => row.id));
  assert.deepEqual(registry.assets.filter(row => !newIds.has(row.id)), prior.assets);
  assert.equal(coverage.identifiedRecords, prior.assets.length + additions.length);
  assert.equal(coverage.datedValueRecords, prior.assets.filter(row => row.reportedValueUsd !== null && row.reportedAsOf).length);
  for (const cohort of new Set(additions.map(row => row.cohort))) {
    const api = await (await get(`/api/network-explorer/v1/assets?limit=100&cohort=${encodeURIComponent(cohort)}`)).json();
    const expected = additions.filter(row => row.cohort === cohort).sort((a, b) => a.name.localeCompare(b.name));
    assert.equal(api.total, expected.length);
    assert.equal(coverage.byCohort[cohort], expected.length);
    assert.deepEqual(api.records, expected);
  }
  assert.equal(coverage.documentedRelationships, 94);
  assert.equal(coverage.sourceListedChainAssetRecords, 42);
  const sitemap = await (await get('/sitemap.xml')).text();
  assert.match(sitemap, /network-explorer\/registry<\/loc>\s*<lastmod>2026-11-04/);
  assert.match(sitemap, /research\/tokenized-fund-infrastructure-october-2026<\/loc>\s*<lastmod>2026-10-21/);
  const { records } = await (await get('/api/network-explorer/v1/relationships?asset_id=wtgxx')).json();
  assert.match(records.find(row => row.id === 'wtgxx-bitgo-shareholder-servicing').scope, /launch.*not verified/);
  for (const filename of fs.readdirSync('public/assets/datasets').filter(name => /^network-(asset-registry|fund-disclosure-history|infrastructure-relationships|intelligence|value-observations)\./.test(name))) {
    const path = `assets/datasets/${filename}`;
    const local = read(`public/${path}`);
    assert.equal(local, read(path), filename);
    assert.equal(await (await get(`/${path}`)).text(), local, filename);
  }
  for (const [file, key] of [['fund-disclosure-history', 'observations'], ['network-value-observations', 'observations']]) {
    const path = `data/${file}.json`;
    const prior = JSON.parse(execFileSync('git', ['show', `db5ed7c:${path}`], { encoding: 'utf8' }));
    assert.deepEqual(JSON.parse(read(path))[key].slice(0, prior[key].length), prior[key]);
  }
  for (const route of ['/supply', '/registry', '/fund-comparison', '/methodology', '/vendors', '/jurisdictions', '/research/tokenized-fund-infrastructure-october-2026']) {
    await get(`/network-explorer${route}`);
  }
  for (const width of [1440, 390, 360]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const [view, suffix] of [['overview', ''], ['assets', '/assets']]) {
      const response = await page.goto(`${base}/network-explorer${suffix}`, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200);
      const main = page.locator('main');
      assert.match(await main.textContent(), /Data updated.*(?:4 Nov|Nov 4)/);
      if (!suffix) {
        await page.getByLabel('Choose an asset').selectOption('wtgxx');
        await main.getByText('BitGo Bank & Trust, N.A.', { exact: true }).waitFor();
      } else {
        await main.getByRole('heading', { name: 'Fund disclosures' }).waitFor();
        await main.getByText('Earlier headline observations', { exact: true }).waitFor();
      }
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${view} overflow at ${width}px`);
      await page.screenshot({ path: `${screenshots}/${view}-${width}.png`, fullPage: true });
    }
    assert.deepEqual(errors, []);
    await page.goto(`${base}/network-explorer/registry`, { waitUntil: 'networkidle' });
    await page.getByLabel('Cohort').selectOption('Lofty property listings');
    await page.getByText(`42 of ${registry.assets.length} records`, { exact: true }).waitFor();
    await page.getByRole('link', { name: 'Algorand asset record' }).first().waitFor();
    if (width === 1440) {
      const pending = page.waitForEvent('download');
      await page.getByRole('button', { name: 'Download registry CSV' }).click();
      const csv = read(await (await pending).path());
      assert.equal(csv.split('\r\n').length, 43);
      assert.match(csv, /"networkAssetId"/);
    }
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `registry overflow at ${width}px`);
    await page.screenshot({ path: `${screenshots}/registry-${width}.png`, fullPage: true });
    assert.deepEqual(errors, []);
    await page.close();
  }
  console.log(`Verified ${base}: dated API figures, download parity, retained history, Explorer routes and 1440/390/360px views.`);
} finally {
  await browser.close();
}
