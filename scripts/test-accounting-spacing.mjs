import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire(import.meta.url);
const { chromium } = require(`${process.env.HOME}/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright`);
const base = process.env.TEST_BASE_URL || 'http://localhost:3017';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  for (const width of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(`${base}/vendors/crypto-accounting-tax-software?analytics=off`);
    const section = page.locator('#accounting-buyer-resources');
    await section.scrollIntoViewIfNeeded();
    assert.equal(await section.locator('details').count(), 3);
    assert.equal(await section.locator('time').getAttribute('datetime'), '2026-10-10');
    const summary = section.locator('summary').first();
    await summary.focus();
    const focus = await summary.evaluate(el => {
      const s = getComputedStyle(el);
      return { style: s.outlineStyle, width: parseFloat(s.outlineWidth) };
    });
    assert.notEqual(focus.style, 'none');
    assert.ok(focus.width >= 2);
    await page.keyboard.press('Enter');
    assert.ok(await section.locator('details').first().getAttribute('open') !== null);
    const metrics = await section.evaluate(el => {
      const headings = [...el.querySelectorAll('h2')];
      const last = el.querySelector('details:last-of-type').getBoundingClientRect();
      return {
        gap: headings.at(-1).getBoundingClientRect().top - last.bottom,
        reviewerMargin: parseFloat(getComputedStyle(el.querySelector('.light-container > p:last-child')).marginTop),
        overflow: document.documentElement.scrollWidth > innerWidth + 1
      };
    });
    assert.ok(metrics.gap >= 32, JSON.stringify(metrics));
    assert.ok(metrics.reviewerMargin >= 28);
    assert.equal(metrics.overflow, false);
    assert.ok(await page.locator('#reconciliation-test a[download]').count());
    fs.mkdirSync('/private/tmp/fluidrwa-spacing-qa', { recursive: true });
    await section.screenshot({ path: `/private/tmp/fluidrwa-spacing-qa/accounting-${width}.png` });
    console.log(`PASS ${base} ${width}px: FAQ expansion, keyboard focus, CTA/reviewer spacing, date and reconciliation link`);
    await page.close();
  }
} finally { await browser.close(); }
