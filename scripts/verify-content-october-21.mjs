import fs from 'node:fs';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire('/Users/shefalisharma/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json');
const { chromium } = require('playwright');
const base = process.env.PREVIEW_URL || 'http://localhost:3053';
const output = '/private/tmp/fluidrwa-content-2026-10-21';
fs.mkdirSync(output, { recursive: true });
const comparisons = ['rise-vs-franklin-vs-request-finance-crypto-payroll','coinflow-vs-crossmint-vs-wert-digital-asset-checkout','besu-vs-corda-vs-canton-private-ledger-architecture'];
const cases = ['eib-project-venus-digital-bond-settlement-case-study','unhcr-stellar-moneygram-usdc-cash-assistance-case-study'];
const routes = [...comparisons.map(slug => `/blog/${slug}`), ...cases.map(slug => `/use-cases/${slug}`)];
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
const results = [];
try {
  for (const width of [1440,390,360]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    for (const route of routes) {
      const errors = [];
      const onError = error => errors.push(error.message);
      page.on('pageerror', onError);
      const response = await page.goto(`${base}${route}?analytics=off`, { waitUntil: 'networkidle', timeout: 60000 });
      assert.equal(response.status(), 200, route);
      await page.locator('main img').evaluateAll(async images => { await Promise.all(images.map(image => image.decode())); });
      const state = await page.evaluate(() => {
        const graph = [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap(script => { const data = JSON.parse(script.textContent); return data['@graph'] || [data]; });
        const article = document.querySelector('.uc-case-study, .post-main');
        return { title: document.querySelector('h1')?.textContent, canonical: document.querySelector('link[rel="canonical"]')?.href,
          overflow: document.documentElement.scrollWidth > innerWidth + 1,
          brokenImages: [...document.querySelectorAll('main img')].filter(image => !image.naturalWidth || !image.alt.trim()).length,
          words: article.textContent.trim().split(/\s+/).length,
          email: !!document.querySelector('a[href^="mailto:contact@fluidrwa.com"]'),
          article: graph.find(item => item['@type'] === 'Article'), faq: graph.find(item => item['@type'] === 'FAQPage'),
          faqs: document.querySelectorAll('.uc-faq details, .faq-list details').length,
          sources: document.querySelector('#sources')?.textContent,
          externalCaseLinks: document.querySelectorAll('.uc-case-study a[href^="http"]').length,
          consideration: article.textContent.includes('Should your company be considered?'),
          links: [...document.querySelectorAll('main a[href^="/"]')].map(a => a.getAttribute('href').split('#')[0]),
          anchors: [...document.querySelectorAll('main a[href^="#"]')].every(a => document.getElementById(a.hash.slice(1))),
          noindex: document.querySelector('meta[name="robots"]')?.content.includes('noindex') };
      });
      assert.ok(state.title); assert.equal(state.canonical, `https://www.fluidrwa.com${route}`);
      assert.equal(state.overflow, false, `${width} overflow ${route}`); assert.equal(state.brokenImages, 0);
      assert.ok(state.email && state.anchors && !state.noindex); assert.deepEqual(errors, []);
      assert.equal(state.article.dateModified, '2026-10-21'); assert.equal(state.faq.mainEntity.length, state.faqs);
      assert.ok(state.words > 700, `${route}: ${state.words} words`);
      if (route.startsWith('/use-cases/')) { assert.equal(state.externalCaseLinks, 0); assert.ok(state.sources.includes('https://')); }
      else {
        assert.ok(state.consideration);
        const image = page.locator('picture img').first();
        assert.ok(await image.count());
        const png = await page.request.get(`${base}/assets/infographics/${route.split('/').at(-1)}-comparison${width < 600 ? '-mobile' : ''}.png`);
        assert.ok(png.ok()); assert.ok(png.headers()['content-type'].includes('image/png'));
      }
      const faq = page.locator('.uc-faq details, .faq-list details').first();
      await faq.click(); assert.ok(await faq.getAttribute('open') !== null);
      for (const link of new Set(state.links)) assert.ok((await page.request.get(base+link)).ok(), link);
      await page.evaluate(() => window.scrollTo(0,0));
      await page.screenshot({ path: `${output}/${route.split('/').at(-1)}-${width}.png` });
      results.push({route,width,...state}); console.log(`PASS ${width} ${route}: ${state.words} words`);
      page.off('pageerror', onError);
    }
    await page.close();
  }
  const context = await browser.newContext();
  const sitemap = await (await context.request.get(base+'/sitemap.xml')).text();
  const blog = await (await context.request.get(base+'/blog')).text();
  const useCases = await (await context.request.get(base+'/use-cases')).text();
  for (const route of routes) { assert.ok(sitemap.includes(`https://www.fluidrwa.com${route}`), `sitemap ${route}`); assert.ok((route.startsWith('/blog/') ? blog : useCases).includes(route), `index ${route}`); }
  await context.close();
} finally { await browser.close(); fs.writeFileSync(`${output}/checks-${base.includes('localhost') ? 'local' : 'live'}.json`, JSON.stringify(results,null,2)); }
console.log('All five articles passed content, layout, assets, metadata, schema, FAQ, links and index checks.');
