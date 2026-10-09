import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import batch from './comparison-image-batch-october-8.mjs';

const require = createRequire('/Users/shefalisharma/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json');
const { chromium } = require('playwright');
const base = process.env.PREVIEW_URL || 'http://localhost:3042';
const output = path.resolve('docs/content-qa-2026-10-09');
fs.mkdirSync(output, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
const results = [];
try {
  for (const width of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    for (const { slug } of batch) {
      const response = await page.goto(`${base}/blog/${slug}`, { waitUntil: 'networkidle' });
      const result = await page.evaluate(() => {
        const article = document.querySelector('article');
        const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')].map(el => JSON.parse(el.textContent));
        const images = [...document.querySelectorAll('article img')];
        const table = article?.querySelector('table');
        return {
          title: document.querySelector('h1')?.textContent,
          canonical: document.querySelector('link[rel="canonical"]')?.href,
          overflow: document.documentElement.scrollWidth > innerWidth + 1,
          brokenImages: images.filter(img => !img.complete || !img.naturalWidth).map(img => img.src),
          downloads: [...document.querySelectorAll('a[download]')].map(a => a.href),
          internalLinks: [...(article?.querySelectorAll('a') || [])].map(a => a.getAttribute('href')).filter(href => href?.startsWith('/')),
          consideration: table?.parentElement.nextElementSibling?.textContent?.includes('Should your company be considered?'),
          reviewed: document.body.textContent.includes('Reviewed by FluidRWA Research Team'),
          dated: document.body.textContent.includes('October 9, 2026'),
          email: !!article?.querySelector('a[href^="mailto:contact@fluidrwa.com"]'),
          schemas
        };
      });
      if (response.status() !== 200 || !result.title?.includes(' vs ') || result.overflow || result.brokenImages.length || !result.consideration || !result.reviewed || !result.dated || !result.email) throw new Error(`${width} ${slug}: ${JSON.stringify(result)}`);
      if (result.canonical !== `https://www.fluidrwa.com/blog/${slug}`) throw new Error(`Wrong canonical: ${slug}`);
      for (const url of result.downloads) {
        const file = await page.request.get(url);
        if (!file.ok() || !file.headers()['content-type']?.includes('image/png')) throw new Error(`Broken download ${url}`);
      }
      for (const href of new Set(result.internalLinks)) {
        const linked = await page.request.get(new URL(href, base).href);
        const html = await linked.text();
        if (!linked.ok() || /<h1[^>]*id="hero-title"/.test(html)) throw new Error(`Broken or homepage fallback link ${href}`);
      }
      const schemas = result.schemas.flatMap(schema => schema['@graph'] || [schema]);
      if (!schemas.some(schema => schema['@type'] === 'Article') || !schemas.some(schema => schema['@type'] === 'FAQPage')) throw new Error(`Missing schema ${slug}`);
      await page.screenshot({ path: `${output}/${slug}-${width}.png`, fullPage: true });
      results.push({ slug, width, ...result, schemas: schemas.map(schema => schema['@type']) });
      console.log(`PASS ${width} ${slug}`);
    }
    await page.close();
  }
} finally {
  await browser.close();
  fs.writeFileSync(`${output}/checks.json`, JSON.stringify(results, null, 2));
}
