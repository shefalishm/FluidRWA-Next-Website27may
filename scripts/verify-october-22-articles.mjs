import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import batch from './comparison-image-batch-october-22.mjs';
const require = createRequire('/Users/shefalisharma/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json');
const { chromium } = require('playwright');
const base = process.env.PREVIEW_URL || 'http://localhost:3055';
const output = process.env.CONTENT_QA_OUTPUT || '/private/tmp/fluidrwa-content-2026-10-22';
fs.mkdirSync(output, { recursive: true });
for (const item of batch) {
  const source = fs.readFileSync(`content/blog/${item.slug}.md`, 'utf8');
  assert.ok(source.replace(/^---\n[\s\S]*?\n---\n/, '').split(/\s+/).length >= 700);
  assert.ok(source.includes('reviewedDate: "2026-10-22"'));
  assert.ok(source.includes('Reviewed by') || source.includes('reviewedBy: "FluidRWA Research Team"'));
  const image = source.match(/^image: "([^"]+)"/m)[1];
  assert.ok(fs.existsSync('public' + image), image);
  const sources = [...source.matchAll(/\]\((https:\/\/[^)]+)\)/g)].map(m => m[1]);
  assert.ok(new Set(sources).size >= 2, item.slug);
}
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
const results = [];
const checkedLinks = new Set();
try {
  for (const width of [1440, 390, 360]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const item of batch) {
      const response = await page.goto(`${base}/blog/${item.slug}?analytics=off`, { waitUntil: 'domcontentloaded', timeout: 60000 });
      assert.equal(response.status(), 200);
      await page.locator('article').waitFor();
      await page.locator('article img').evaluateAll(images => images.forEach(image => image.loading = 'eager'));
      await page.waitForFunction(() => [...document.querySelectorAll('article img')].every(image => image.complete && image.naturalWidth > 0));
      const state = await page.evaluate(() => {
        const article = document.querySelector('article');
        const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap(node => {
          const value = JSON.parse(node.textContent);
          return value['@graph'] || [value];
        });
        return {
          title: document.querySelector('h1')?.textContent,
          canonical: document.querySelector('link[rel="canonical"]')?.href,
          overflow: document.documentElement.scrollWidth > innerWidth + 1,
          description: document.querySelector('meta[name="description"]')?.content,
          body: article.textContent,
          downloads: [...article.querySelectorAll('a[download]')].map(link => link.getAttribute('href')),
          internal: [...article.querySelectorAll('a[href^="/"]')].map(link => link.getAttribute('href')),
          imageAlt: [...article.querySelectorAll('img')].every(image => image.alt.length > 20),
          consideration: article.querySelectorAll('.comparison-consideration').length,
          schemas
        };
      });
      assert.ok(state.title && !state.title.includes('Finding a'));
      assert.equal(state.canonical, `https://www.fluidrwa.com/blog/${item.slug}`);
      assert.equal(state.overflow, false, item.slug + ' overflow ' + width);
      assert.ok(state.description.length <= 155);
      assert.ok(state.imageAlt);
      assert.ok(state.body.includes('contact@fluidrwa.com'));
      assert.ok(await page.getByText('Reviewed by FluidRWA Research Team', { exact: false }).count());
      assert.ok(await page.getByText('October 22, 2026', { exact: false }).count());
      if (item.kind === 'comparison') assert.equal(state.consideration, 1);
      const articleSchema = state.schemas.find(schema => schema['@type'] === 'Article');
      const faqSchema = state.schemas.find(schema => schema['@type'] === 'FAQPage');
      assert.equal(articleSchema.datePublished, '2026-10-22');
      assert.equal(articleSchema.dateModified, '2026-10-22');
      assert.ok(articleSchema.citation.length >= 2);
      assert.equal(faqSchema.mainEntity.length, 3);
      assert.ok(state.schemas.some(schema => schema['@type'] === 'ImageObject'));
      for (const href of new Set([...state.downloads, ...state.internal])) {
        if (checkedLinks.has(href)) continue;
        checkedLinks.add(href);
        const linked = await page.request.get(new URL(href, base).href);
        assert.ok(linked.ok(), href);
        if (href.endsWith('.png')) {
          assert.ok(linked.headers()['content-type'].includes('image/png'));
          const data = await linked.body();
          assert.equal(data.subarray(1, 4).toString(), 'PNG');
        } else {
          const body = await linked.text();
          assert.ok(!/<h1[^>]*id="hero-title"/.test(body), 'Homepage fallback ' + href);
        }
      }
      const faq = page.locator('.faq-list details').first();
      await faq.locator('summary').click();
      assert.ok(await faq.getAttribute('open') !== null);
      await faq.locator('summary').click();
      assert.deepEqual(errors, []);
      await page.screenshot({ path: `${output}/${item.slug}-${width}.png`, fullPage: true });
      await page.evaluate(() => scrollTo(0, 0));
      await page.screenshot({ path: `${output}/${item.slug}-top-${width}.png` });
      await page.locator('h1').screenshot({ path: `${output}/${item.slug}-headline-${width}.png` });
      results.push({ slug: item.slug, width, title: state.title, canonical: state.canonical, downloads: state.downloads, overflow: state.overflow });
      console.log(`PASS ${width} ${item.slug}`);
    }
    await page.close();
  }
  const context = await browser.newContext();
  const index = await (await context.request.get(base + '/blog?analytics=off')).text();
  const sitemap = await (await context.request.get(base + '/sitemap.xml')).text();
  const llms = await (await context.request.get(base + '/llms.txt')).text();
  for (const item of batch) {
    assert.ok(index.includes('/blog/' + item.slug));
    assert.ok(sitemap.includes('/blog/' + item.slug));
    assert.ok(llms.includes('/blog/' + item.slug));
  }
  await context.close();
} finally {
  await browser.close();
  fs.writeFileSync(output + '/checks.json', JSON.stringify(results, null, 2));
}
console.log('Five articles: metadata, source citations, FAQ, graphics, downloads, links, index and sitemap passed.');
