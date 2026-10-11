import fs from 'node:fs';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire('/Users/shefalisharma/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json');
const { chromium } = require('playwright');
const base = process.env.PREVIEW_URL || 'http://localhost:3043';
const slugs = ['hsbc-gold-token-retail-physical-gold-case-study', 'ubs-umint-tokenized-fund-subscription-redemption-case-study', 'broadridge-distributed-ledger-repo-case-study'];
const out = 'docs/use-case-qa-2026-10-11';
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
const results = [];
try {
  for (const width of [1440, 390, 360]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    for (const slug of slugs) {
      const response = await page.goto(`${base}/use-cases/${slug}?source=qa-test`, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200);
      await page.locator('.uc-hero-image img').evaluate(img => img.decode());
      const result = await page.evaluate(() => {
        const graphs = [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap(s => JSON.parse(s.textContent)['@graph'] || [JSON.parse(s.textContent)]);
        return { h1: document.querySelector('h1')?.textContent, canonical: document.querySelector('link[rel="canonical"]')?.href,
          overflow: document.documentElement.scrollWidth > innerWidth + 1,
          words: document.querySelector('.uc-case-study').textContent.trim().split(/\s+/).length,
          image: document.querySelector('.uc-hero-image img').naturalWidth,
          updated: document.querySelector('.uc-updated time')?.dateTime,
          email: !!document.querySelector('a[href="mailto:contact@fluidrwa.com"]'),
          external: [...document.querySelectorAll('.uc-case-study a[href^="http"]')].map(a => a.href),
          links: [...document.querySelectorAll('main a[href^="/"]')].map(a => new URL(a.getAttribute('href'), location.origin).href),
          anchors: [...document.querySelectorAll('main a[href^="#"]')].every(a => !!document.querySelector(a.getAttribute('href'))),
          article: graphs.find(x => x['@type'] === 'Article'), faq: graphs.find(x => x['@type'] === 'FAQPage')?.mainEntity.length,
          visibleFaq: document.querySelectorAll('.uc-faq details').length,
          noindex: document.querySelector('meta[name="robots"]')?.content.includes('noindex') };
      });
      assert.ok(!result.overflow && result.image > 0 && result.email && result.anchors && !result.noindex);
      assert.equal(result.updated, '2026-10-11');
      assert.equal(result.article.dateModified, result.updated);
      assert.equal(result.faq, result.visibleFaq);
      assert.ok(result.words > 750, `Insufficient detail: ${result.words}`);
      assert.equal(result.external.length, 0);
      assert.equal(result.canonical, `https://www.fluidrwa.com/use-cases/${slug}`);
      assert.ok(result.h1.includes(slug.startsWith('hsbc') ? 'HSBC' : slug.startsWith('ubs') ? 'UBS' : 'Broadridge'));
      for (const href of new Set(result.links)) assert.ok((await page.request.get(href)).ok(), href);
      await page.locator('.uc-faq details').first().click();
      assert.ok(await page.locator('.uc-faq details[open] p').first().isVisible());
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: `${out}/${slug}-${width}-hero.png` });
      await page.locator('#sources').scrollIntoViewIfNeeded();
      await page.screenshot({ path: `${out}/${slug}-${width}-sources.png` });
      results.push({ slug, width, ...result });
      console.log(`PASS ${width} ${slug} (${result.words} words)`);
    }
    await page.close();
  }
  const context = await browser.newContext();
  const index = await (await context.request.get(`${base}/use-cases`)).text();
  const sitemap = await (await context.request.get(`${base}/sitemap.xml`)).text();
  for (const slug of slugs) {
    assert.ok(index.includes(`/use-cases/${slug}`));
    assert.ok(sitemap.includes(`https://www.fluidrwa.com/use-cases/${slug}`));
  }
  const old = await (await context.request.get(`${base}/use-cases/siemens-digital-bond-central-bank-money-case-study`)).text();
  assert.ok(old.includes('September 26, 2026'));
  await context.close();
} finally {
  await browser.close();
  fs.writeFileSync(`${out}/${base.includes('localhost') ? 'local' : 'production'}-checks.json`, JSON.stringify(results, null, 2));
}
