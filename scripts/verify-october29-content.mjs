import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const origin = process.env.QA_ORIGIN || "http://localhost:3042";
const output = process.env.QA_OUTPUT || "/tmp/fluidrwa-october29";
fs.mkdirSync(output, { recursive: true });
const blogs = ["chainwire-vs-marketacross-vs-wachsman-crypto-pr", "galxe-vs-zealy-vs-layer3-web3-campaigns", "regula-vs-incode-vs-jumio-document-verification"];
const cases = ["lloyds-archax-tokenized-deposit-gilt-purchase-case-study", "breitling-digital-passport-watch-ownership-case-study"];
const routes = [...blogs.map(s=>`/blog/${s}`), ...cases.map(s=>`/use-cases/${s}`)];
const browser = await chromium.launch({headless:true, channel:"chrome"});
try {
  const context = await browser.newContext();
  for (const width of [1440,390,360]) {
    const page = await context.newPage();
    await page.setViewportSize({width,height:1000});
    for (const route of routes) {
      const response = await page.goto(`${origin}${route}?source=qa-test`, {waitUntil:"networkidle"});
      assert.equal(response.status(),200,route);
      await page.evaluate(async()=>{ for(let y=0;y<document.body.scrollHeight;y+=700){scrollTo(0,y);await new Promise(r=>setTimeout(r,40));} });
      await page.waitForFunction(()=>[...document.images].every(i=>i.complete));
      await page.evaluate(()=>scrollTo(0,0));
      const details = await page.evaluate(()=>({
        overflow:document.documentElement.scrollWidth>innerWidth+1,
        h1:document.querySelectorAll("h1").length,
        canon:document.querySelector('link[rel="canonical"]')?.href,
        brokenImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth||!i.alt.trim()).map(i=>i.src),
        outbound:[...document.querySelectorAll('article a[href^="http"]')].filter(a=>!new URL(a.href).hostname.endsWith("fluidrwa.com")).map(a=>({href:a.href,rel:a.rel})),
        email:document.querySelectorAll('a[href="mailto:contact@fluidrwa.com"]').length,
        text:document.querySelector("article")?.textContent,
        schemas:[...document.querySelectorAll('script[type="application/ld+json"]')].map(s=>JSON.parse(s.textContent)),
        tables:document.querySelectorAll("article table").length,
        cta:[...document.querySelectorAll("article strong,article h2")].filter(e=>e.textContent==="Should your company be considered?").length,
        deadJumps:[...document.querySelectorAll('a[href^="#"]')].map(a=>a.hash.slice(1)).filter(id=>id&&!document.getElementById(id))
      }));
      assert.equal(details.overflow,false,`${route} overflow ${width}`);
      assert.equal(details.h1,1);
      assert.equal(details.canon,`https://www.fluidrwa.com${route}`);
      assert.deepEqual(details.brokenImages,[],route);
      assert.ok(details.email>0);
      assert.ok(details.text.includes("October 29, 2026"));
      assert.deepEqual(details.deadJumps,[]);
      assert.ok(JSON.stringify(details.schemas).includes('"@type":"Article"'));
      assert.ok(JSON.stringify(details.schemas).includes('"@type":"FAQPage"'));
      if(route.startsWith("/blog")) {
        assert.ok(details.tables>0);
        assert.equal(details.cta,1);
        assert.ok(details.outbound.length>=3);
        assert.ok(details.outbound.every(a=>a.rel.split(/\s+/).includes("nofollow")));
      } else assert.equal(details.outbound.length,0);
      await page.screenshot({path:`${output}/${route.split('/').pop()}-${width}.png`,fullPage:true});
      console.log(`PASS ${width}px ${route}`);
    }
    await page.close();
  }
  for(const slug of blogs) for(const suffix of ["comparison.png","comparison-mobile.png"]) {
    const r = await context.request.get(`${origin}/assets/infographics/${slug}-${suffix}?source=qa-test`);
    assert.equal(r.status(),200);
    assert.ok(r.headers()["content-type"].includes("image/png"));
    assert.ok((await r.body()).length>1000);
  }
  const checks=["/vendors/growth-marketing-companies","/vendors/kyc-aml-providers","/vendors/tokenization-platforms","/vendors/institutional-digital-asset-trading-platforms","/vendors/physical-asset-verification-oracles","/submit-requirement","/vendor-membership"];
  for(const route of checks) assert.equal((await context.request.get(`${origin}${route}?source=qa-test`)).status(),200,route);
  for(const index of ["/blog","/use-cases","/sitemap.xml"]) {
    const r=await context.request.get(`${origin}${index}?source=qa-test`); assert.equal(r.status(),200);
    const text=await r.text();
    const expected=index==="/blog"?blogs:index==="/use-cases"?cases:[...blogs,...cases];
    for(const slug of expected) assert.ok(text.includes(slug),`${index} missing ${slug}`);
  }
  console.log("PASS: six PNG downloads, linked directories/forms, blog/use-case indexes and sitemap. No forms submitted.");
} finally {await browser.close();}
