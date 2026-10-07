import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import sharp from 'sharp';
import { dataset } from './ramp-onboarding-dataset.mjs';

const base = process.env.TEST_BASE_URL || 'http://localhost:3036';
const slugs = ['moonpay-vs-transak-vs-banxa-fiat-on-ramp-providers','white-label-crypto-payment-gateway-buyer-guide'];
const output = '/private/tmp/fluidrwa-payment-buyer-qa';
fs.mkdirSync(output,{recursive:true});
assert.equal(dataset.rows.length,18);
for (const provider of ['MoonPay','Transak','Banxa']) assert.equal(dataset.rows.filter(row=>row.provider===provider).length,6);
const csv = fs.readFileSync('assets/datasets/moonpay-transak-banxa-onboarding-dataset.csv','utf8');
for (const row of dataset.rows) {
  assert.equal(row.checked,'2026-10-07');
  for (const field of Object.values(row)) assert.ok(csv.includes(String(field).replaceAll('"','""')));
  assert.match(row.source,/^https:\/\//);
  assert.ok(row.scope && row.unknown);
}
for (const slug of slugs) {
  const html = fs.readFileSync(`blog/${slug}/index.html`,'utf8');
  assert.ok(html.includes(`<link rel="canonical" href="https://www.fluidrwa.com/blog/${slug}">`));
  assert.ok(html.includes('Reviewed by FluidRWA Research Team'));
  assert.ok(html.includes('Last updated and documentation checked: October 7, 2026'));
  const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/)[1])['@graph'];
  assert.equal(graph.find(node=>node['@type']==='Article').dateModified,'2026-10-07');
  assert.ok(graph.find(node=>node['@type']==='ImageObject'));
  for (const q of graph.find(node=>node['@type']==='FAQPage').mainEntity) {
    assert.ok(html.includes(q.name)); assert.ok(html.includes(q.acceptedAnswer.text));
  }
  assert.match(html,/mailto:contact@fluidrwa.com/);
}
assert.ok(fs.readFileSync('blog.html','utf8').includes(slugs[1]));
assert.ok(fs.readFileSync('sitemap.xml','utf8').includes(`https://www.fluidrwa.com/blog/${slugs[1]}`));
const require = createRequire(import.meta.url);
const { chromium } = require('/Users/shefalisharma/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const browser = await chromium.launch({headless:true,channel:'chrome'});
try {
  for (const width of [1440,390,360]) {
    const context = await browser.newContext({viewport:{width,height:900}});
    const page = await context.newPage();
    for (const slug of slugs) {
      const response = await page.goto(`${base}/blog/${slug}`,{waitUntil:'networkidle'});
      assert.equal(response.status(),200);
      assert.match(await page.locator('h1').innerText(),slug===slugs[0] ? /MoonPay/ : /White-Label/);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`Overflow ${slug} ${width}`);
      for (const img of await page.locator('.post-main img').all()) {
        await img.scrollIntoViewIfNeeded();
        await page.waitForFunction(img=>img.complete && img.naturalWidth>0,await img.elementHandle());
        assert.ok(await img.getAttribute('alt'));
      }
      const tables = page.locator('.post-main table');
      assert.ok(await tables.count()>0);
      await page.screenshot({path:`${output}/${slug}-${width}-full.png`,fullPage:true});
      if (slug===slugs[0]) {
        assert.equal(await page.locator('section[aria-label="Sourced ramp onboarding dataset"] tbody tr').count(),18);
        assert.match(await page.locator('.comparison-consideration').innerText(),/Should your company be considered/);
        for (const anchor of await page.locator('.article-infographic a[download]').all()) {
          const href = await anchor.getAttribute('href');
          const file = await context.request.get(base+href);
          assert.equal(file.status(),200);
          if (href.endsWith('.csv')) assert.ok((await file.text()).includes('Not verified'));
          else assert.ok((await sharp(await file.body()).stats()).channels.some(c=>c.stdev>20));
        }
        await page.locator('.article-infographic').screenshot({path:`${output}/dataset-${width}.png`});
      }
      for (const anchor of await page.locator('.post-main a[href^="/"]').all()) {
        const href = await anchor.getAttribute('href');
        const linked = await context.request.get(base+href);
        assert.equal(linked.status(),200,`Broken internal path: ${href}`);
      }
    }
    await context.close();
  }
  console.log(`PASS: 18 sourced rows, CSV fidelity, 6 responsive page views, working downloads/internal CTAs, no overflow, schema/FAQ/canonical/index/sitemap. Screenshots: ${output}`);
} finally { await browser.close(); }
