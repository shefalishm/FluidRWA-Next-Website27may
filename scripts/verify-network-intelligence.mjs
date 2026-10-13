import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire('/Users/shefalisharma/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json');
const { chromium } = require('playwright');
const snapshot=JSON.parse(fs.readFileSync('data/network-intelligence.json','utf8'));
const ramp=JSON.parse(fs.readFileSync('data/ramp-onboarding-dataset.json','utf8'));
assert.equal(snapshot.assets.length,3); assert.equal(snapshot.networks.length,8); assert.equal(ramp.rows.length,18);
assert.equal(new Set(ramp.rows.map(r=>`${r.provider}:${r.dimension}`)).size,18);
for(const r of [...snapshot.assets,...snapshot.regulations,...ramp.rows])assert.ok(r.source.startsWith('https://'));
const base=process.env.PREVIEW_URL || 'http://localhost:3046';
const output='docs/network-intelligence-qa-2026-10-13'; fs.mkdirSync(output,{recursive:true});
const routes=['','/assets','/networks','/vendors','/jurisdictions','/research','/methodology','/research/ramp-onboarding'];
const browser=await chromium.launch({headless:true,channel:'chrome'});const results=[];
try {
 for(const width of [1440,390,360]){
  const page=await browser.newPage({viewport:{width,height:900}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  for(const route of routes){
   const response=await page.goto(`${base}/network-explorer${route}?analytics=off`,{waitUntil:'domcontentloaded',timeout:60000});
   await page.waitForFunction(()=>document.querySelector('main h1') && [...document.querySelectorAll('main img')].every(i=>i.complete),undefined,{timeout:30000});
   assert.equal(response.status(),200,route);
   const state=await page.evaluate(()=>({title:document.querySelector('h1')?.textContent,overflow:document.documentElement.scrollWidth>innerWidth+1,broken:[...document.querySelectorAll('main img')].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),canonical:document.querySelector('link[rel="canonical"]')?.href,body:document.body.textContent}));
   assert.ok(state.title && !state.title.includes('Finding a'));assert.equal(state.overflow,false,`${width} overflow ${route}`);assert.deepEqual(state.broken,[]);
   assert.equal(state.canonical,`https://www.fluidrwa.com/network-explorer${route}`);
   assert.ok(state.body.includes('13 Oct 2026'));assert.ok(state.body.includes('contact@fluidrwa.com'));assert.deepEqual(errors,[]);
   if(route==='/vendors'){
    await page.getByLabel(/^Provider/).selectOption('Transak'); assert.equal(await page.locator('tbody tr').count(),6);
    await page.getByLabel('Buyer dimension').selectOption('KYC hand-offs');assert.equal(await page.locator('tbody tr').count(),1);
    await page.getByLabel('Search this view').fill('not-a-provider'); assert.equal(await page.locator('tbody tr').count(),0);await page.getByLabel('Clear search').click();
    const [file]=await Promise.all([page.waitForEvent('download'),page.getByRole('button',{name:'Download provider CSV'}).click()]);assert.ok(file.suggestedFilename().endsWith('.csv'));await file.saveAs(`${output}/provider-filter-${width}.csv`);
   }
   if(route==='/jurisdictions'){await page.getByLabel(/^Jurisdiction/).selectOption('Singapore');assert.equal(await page.locator('main article').count(),2);await page.getByLabel(/^Jurisdiction/).selectOption('All jurisdictions');}
   if(route==='/assets'){
    await page.getByRole('button',{name:'FOBXX',exact:true}).last().click();await page.getByRole('dialog').waitFor({state:'visible'});await page.keyboard.press('Escape');assert.equal(await page.getByRole('dialog').isVisible(),false);
    await page.getByLabel('Asset class').selectOption('Stablecoins');assert.equal(await page.locator('tbody tr').count(),1);assert.ok((await page.locator('tbody').textContent()).includes('USDC'));
   }
   if(route==='/research/ramp-onboarding')assert.equal(await page.locator('tbody tr').count(),18);
   await page.screenshot({path:`${output}/${route.replaceAll('/','-')||'overview'}-${width}.png`,fullPage:true});results.push({route,width,...state,body:undefined});console.log(`PASS ${width} /network-explorer${route}`);
  }
  await page.close();
 }
 for(const [url,type]of [['/assets/datasets/network-intelligence.json','json'],['/assets/datasets/network-ramp-evidence.csv','csv'],['/assets/infographics/network-ramp-evidence.png','png']]){
  const r=await browser.newContext();const response=await r.request.get(base+url);assert.ok(response.ok());assert.ok(response.headers()['content-type'].includes(type));if(type==='json')assert.deepEqual(await response.json(),snapshot);await r.close();
 }
 const ctx=await browser.newContext();const map=await ctx.request.get(base+'/sitemap.xml');assert.ok((await map.text()).includes('/network-explorer/research/ramp-onboarding'));await ctx.close();
}finally{await browser.close();fs.writeFileSync(`${output}/checks.json`,JSON.stringify(results,null,2));}
console.log('Network Explorer: data, routes, filters, empty states, dialog, CSV, images and sitemap passed.');
