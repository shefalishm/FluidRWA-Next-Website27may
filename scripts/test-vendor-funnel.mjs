import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || '/Users/shefalisharma/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const baseUrl = process.env.TEST_BASE_URL || 'http://localhost:3035';
const artifactDir = '/private/tmp/fluidrwa-vendor-funnel';
fs.mkdirSync(artifactDir, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
try {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }, { width: 360, height: 800 }]) {
    const context = await browser.newContext({ viewport });
    await context.addInitScript(() => {
      window.qaEvents = [];
      window.fluidRwaTrackEvent = (name, params) => window.qaEvents.push({ name, params });
    });
    const page = await context.newPage();
    let attempts = 0;
    const payloads = [];
    await page.route('**/api/vendor-intro-request', async route => {
      attempts++;
      payloads.push(route.request().postDataJSON());
      await route.fulfill({ status: attempts === 1 ? 429 : 200, contentType: 'application/json', body: JSON.stringify(attempts === 1
        ? { ok: false, code: 'submission_too_fast', message: 'Please wait a moment and submit again. Your details are still in the form.' }
        : { ok: true, mode: 'supabase', requestId: 'local-test-only' }) });
    });
    await page.goto(`${baseUrl}/vendor-membership?source=company-profile`, { waitUntil: 'networkidle' });
    await page.getByLabel('Company name', { exact: false }).waitFor();
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Overflow at ${viewport.width}px`);
    assert.equal(await page.getByRole('link', { name: 'Email our team', exact: true }).getAttribute('href'), 'mailto:contact@fluidrwa.com?subject=Vendor%20listing%20application');
    await page.screenshot({ path: `${artifactDir}/vendor-${viewport.width}-viewport.png` });
    await page.screenshot({ path: `${artifactDir}/vendor-${viewport.width}.png`, fullPage: true });
    await page.locator('#vc').scrollIntoViewIfNeeded();
    await page.waitForFunction(() => window.qaEvents.some(e => e.name === 'vendor_application_view'));
    await page.locator('#vc').focus();
    assert.equal(await page.evaluate(() => window.qaEvents.filter(e => e.name === 'vendor_application_start').length), 0, 'Focus alone must not imply a started application');
    await page.locator('#vc').fill('LOCAL QA - DO NOT SAVE');
    await page.locator('#vw').fill('example.com');
    await page.locator('#vw').press('Tab');
    assert.equal(await page.locator('#vw').inputValue(), 'https://example.com');
    await page.locator('#vf').fill('Local');
    await page.locator('input[name="CONTACT_EMAIL"]').fill('qa@example.com');
    await page.locator('#vcat').selectOption({ label: 'Node-as-a-Service / RPC' });
    await page.locator('#vd').fill('Local test of application delivery and retry. No real submission.');
    await page.locator('input[name="CONSENT"]').check();
    await page.getByRole('button', { name: 'Submit Application', exact: true }).click();
    await page.waitForFunction(() => document.querySelector('[data-form-status]')?.textContent.includes('Please wait'));
    assert.equal(await page.getByRole('dialog').count(), 0);
    assert.equal(await page.locator('#vc').inputValue(), 'LOCAL QA - DO NOT SAVE');
    assert.equal(await page.evaluate(() => window.qaEvents.filter(e => e.name === 'vendor_application_submit').length), 0);
    await page.getByRole('button', { name: 'Submit Application', exact: true }).click();
    await page.getByRole('dialog').waitFor();
    assert.equal(payloads.length, 2);
    assert.equal(payloads[1].source, 'vendor-review-application');
    assert.equal(payloads[1].website, 'https://example.com');
    const events = await page.evaluate(() => window.qaEvents);
    assert.equal(events.filter(e => e.name === 'vendor_application_start').length, 1);
    assert.equal(events.filter(e => e.name === 'vendor_application_view').length, 1);
    assert.equal(events.filter(e => e.name === 'form_submit_attempt').length, 2);
    assert.equal(events.filter(e => e.name === 'form_submit_error').length, 1);
    assert.equal(events.filter(e => e.name === 'vendor_application_submit').length, 1);
    assert.ok(!JSON.stringify(events).includes('qa@example.com'), 'Entered email must never enter analytics');
    await context.close();
  }
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await context.addInitScript(() => {
    window.qaEvents = [];
    window.fluidRwaTrackEvent = (name, params) => window.qaEvents.push({ name, params });
  });
  const page = await context.newPage();
  let writes = 0;
  await page.route('**/api/vendor-intro-request', route => { writes++; return route.abort('failed'); });
  await page.goto(`${baseUrl}/vendor-membership`, { waitUntil: 'networkidle' });
  await page.locator('#vc').fill('LOCAL QA');
  await page.locator('#vw').fill('not-a-domain');
  await page.locator('#vf').fill('Local');
  await page.locator('input[name="CONTACT_EMAIL"]').fill('qa@example.com');
  await page.locator('#vcat').selectOption({ label: 'Other' });
  await page.locator('#vd').fill('Local test');
  await page.locator('input[name="CONSENT"]').check();
  await page.getByRole('button', { name: 'Submit Application', exact: true }).click();
  assert.equal(writes, 0, 'Invalid input must not be posted');
  assert.ok(await page.evaluate(() => window.qaEvents.some(e => e.name === 'form_validation_error' && e.params.field_name === 'WEBSITE')));
  await page.locator('#vw').fill('example.com');
  await page.getByRole('button', { name: 'Submit Application', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('[data-form-status]')?.classList.contains('is-error'));
  assert.equal(await page.locator('#vc').inputValue(), 'LOCAL QA');
  assert.equal(await page.getByRole('dialog').count(), 0);
  assert.equal(await page.getByRole('button', { name: 'Submit Application', exact: true }).isEnabled(), true);
  await page.evaluate(() => window.dispatchEvent(new Event('pagehide')));
  assert.ok(await page.evaluate(() => window.qaEvents.some(e => e.name === 'vendor_application_exit' && e.params.completed_fields === 7)));
  await context.close();

  const storage = { getItem: () => null };
  const sandbox = { window: { location: { search: '', pathname: '/vendor-membership', origin: 'https://www.fluidrwa.com' } }, URL, URLSearchParams, sessionStorage: storage, document: { addEventListener() {} } };
  vm.runInNewContext(fs.readFileSync('public/assets/measurement.js', 'utf8'), sandbox);
  const safe = sandbox.window.fluidRwaSanitizeAnalytics({ field_name: 'WEBSITE', error_reason: 'format', completed_fields: 4, contact_email: 'qa@example.com', project_description: 'private details' });
  assert.equal(safe.completed_fields, 4);
  assert.equal(safe.field_name, 'WEBSITE');
  assert.equal(safe.contact_email, undefined);
  assert.equal(safe.project_description, undefined);
  console.log(`PASS: desktop/mobile layout, domain normalization, one view/start, retry without false success, validation, network recovery and private analytics. Screenshots: ${artifactDir}. All form requests mocked; no live leads or emails created.`);
} finally {
  await browser.close();
}
