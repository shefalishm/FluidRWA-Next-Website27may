import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || '/Users/shefalisharma/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const origin = process.env.TEST_BASE_URL || 'http://localhost:3035';
const directory = '/private/tmp/fluidrwa-email-alternatives';
fs.mkdirSync(directory, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  for (const width of [1440, 360]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    await page.route('**/api/**', route => {
      if (route.request().method() === 'POST') throw new Error('This read-only check must never submit data');
      return route.continue();
    });
    for (const route of ['/vendor-membership', '/contact', '/submit-requirement', '/apply-as-vendor', '/blog/taxbit-vs-ledgible-vs-lukka-enterprise-crypto-accounting-tax']) {
      await page.goto(`${origin}${route}?source=qa-test`, { waitUntil: 'networkidle' });
      const footerEmail = page.locator('footer a[href="mailto:contact@fluidrwa.com"]');
      assert.equal(await footerEmail.innerText(), 'contact@fluidrwa.com');
      if (!route.startsWith('/blog/')) {
        const formEmail = page.locator('.fluid-intake-form a[href^="mailto:contact@fluidrwa.com"]');
        assert.equal(await formEmail.count(), 1, `One form email alternative on ${route}`);
        assert.equal(await formEmail.innerText(), 'contact@fluidrwa.com');
      } else {
        const promptEmail = page.locator('.comparison-consideration a[href^="mailto:contact@fluidrwa.com"]');
        assert.ok(await promptEmail.count() > 0, 'Comparison prompt must include an email alternative');
        await page.getByRole('button', { name: 'Quick enquiry', exact: true }).click();
        const email = page.locator('.quick-intake-dialog a[href^="mailto:"]');
        assert.equal(await email.innerText(), 'contact@fluidrwa.com');
        assert.ok((await email.getAttribute('href')).includes('Project%20enquiry'));
        await page.getByRole('tab', { name: 'Vendor', exact: true }).click();
        assert.ok((await email.getAttribute('href')).includes('Vendor%20listing%20enquiry'));
        await page.screenshot({ path: `${directory}/quick-email-${width}.png` });
        await page.getByRole('button', { name: 'Close quick enquiry' }).click();
      }
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${route}: overflow at ${width}px`);
    }
    await context.close();
  }
  console.log('PASS: visible email alternatives in footer, intake forms, comparison prompts and both quick enquiry modes at desktop/mobile widths. No forms submitted.');
} finally {
  await browser.close();
}
