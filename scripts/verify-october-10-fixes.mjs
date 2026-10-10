import fs from 'node:fs';
import { createRequire } from 'node:module';
import batch from './comparison-image-batch-october-10.mjs';
const require = createRequire('/Users/shefalisharma/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json');
const { chromium } = require('playwright');
const base = process.env.PREVIEW_URL || 'http://localhost:3042';
const output = 'docs/seo-fixes-2026-10-10';
fs.mkdirSync(output,{recursive:true});
const slugs = [...batch.map(item=>item.slug),'top-tokenization-companies-2026','how-does-tokenization-compare-to-equity-crowdfunding','how-many-investors-can-own-a-single-tokenized-asset','what-companies-are-actually-using-tokenization-today'];
const results = [];
const browser = await chromium.launch({headless:true,channel:'chrome'});
try {
 for(const width of [1440,390]) {
  const page = await browser.newPage({viewport:{width,height:900}});
  for(const slug of slugs) {
   const response=await page.goto(`${base}/blog/${slug}?source=qa-test`,{waitUntil:'networkidle'});
   await page.locator('.post-cta').scrollIntoViewIfNeeded();
   if(batch.some(item=>item.slug===slug)) {
    await page.locator('.article-infographic').scrollIntoViewIfNeeded();
    await page.locator('.article-infographic img').evaluate(img=>img.decode());
    await page.locator('.article-infographic').screenshot({path:`${output}/${slug}-${width}-chart.png`});
   }
   const result=await page.evaluate(()=>{
    const article=document.querySelector('article');
    return {heading:document.querySelector('h1')?.textContent,canonical:document.querySelector('link[rel=canonical]')?.href,
     overflow:document.documentElement.scrollWidth>innerWidth+1,
     brokenImages:[...article.querySelectorAll('img')].filter(img=>!img.complete||!img.naturalWidth).map(img=>img.src),
     chart:!!article.querySelector('.article-infographic'),
     consideration:article.querySelector('table')?.parentElement.nextElementSibling?.textContent?.includes('Should your company be considered?'),
     email:!!article.querySelector('a[href^="mailto:contact@fluidrwa.com"]'),
     downloads:[...article.querySelectorAll('a[download]')].map(a=>a.href),
     externalSources:[...article.querySelectorAll('a[href^="https://"]')].map(a=>a.href),
     updated:article.parentElement.parentElement.textContent.includes('October 10, 2026'),
     top25:article.textContent.includes('Top 25 Tokenization Companies'),
     description:document.querySelector('meta[name=description]')?.content,
     schemas:[...document.querySelectorAll('script[type="application/ld+json"]')].flatMap(s=>JSON.parse(s.textContent)['@graph']||[JSON.parse(s.textContent)])
    };
   });
   if(response.status()!==200||!result.heading||result.overflow||result.brokenImages.length||result.canonical!==`https://www.fluidrwa.com/blog/${slug}`)throw Error(`${width} ${slug}: route/layout failure ${JSON.stringify(result)}`);
   if(batch.some(item=>item.slug===slug)) {
    if(!result.chart||!result.consideration||!result.email||!result.updated||result.downloads.length<2)throw Error(`${slug}: missing chart/CTA/date`);
    if(!result.schemas.some(s=>s['@type']==='ImageObject')||!result.schemas.some(s=>s['@type']==='FAQPage'))throw Error(`${slug}: missing schema`);
    for(const url of result.downloads){const file=await page.request.get(url);if(!file.ok()||!file.headers()['content-type']?.includes('image/png'))throw Error(`Broken PNG ${url}`);}
   }
   if(slug.startsWith('talos')&&!result.externalSources.some(url=>url.includes('talos.com')))throw Error('Talos sources lost');
   if(slug.startsWith('top-tokenization')&&result.top25)throw Error('Top 25 conflict persists');
   if(slug.startsWith('how-')&&result.description.length<80)throw Error('Placeholder description persists');
   await page.locator('h1').scrollIntoViewIfNeeded();
   await page.screenshot({path:`${output}/${slug}-${width}.png`,fullPage:true});
   results.push({slug,width,...result,schemas:result.schemas.map(s=>s['@type'])});console.log(`PASS ${width} ${slug}`);
  }
  await page.close();
 }
}finally{await browser.close();fs.writeFileSync(`${output}/${base.includes('localhost')?'local':'production'}-checks.json`,JSON.stringify(results,null,2));}
