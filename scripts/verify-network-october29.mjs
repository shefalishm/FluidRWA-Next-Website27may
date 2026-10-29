import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=process.env.QA_ORIGIN||'http://localhost:3042';
const out=process.env.QA_OUTPUT||'/tmp/fluidrwa-network-oct29'; fs.mkdirSync(out,{recursive:true});
const read=file=>JSON.parse(fs.readFileSync(file,'utf8'));
const registry=read('public/assets/datasets/network-asset-registry.json');
const history=read('data/fund-disclosure-history.json');
const archive=read('data/network-value-observations.json');
assert.equal(registry.assets.length,1749); assert.equal(registry.relationships.length,93);
assert.equal(registry.assets.filter(a=>a.reportedValueUsd!==null).length,21);
assert.equal(history.observations.length,11);
assert.equal(archive.observations.length,4);
assert.ok(archive.observations.some(o=>o.assetId==='usdc'&&o.value===72000000000&&o.reportedAsOf==='2026-10-22'));
assert.ok(archive.observations.some(o=>o.assetId==='wtgxx'&&o.value===1227400000&&o.metric==='Reported net assets'));
for(const [id,value] of [['usdc',71000000000],['wtgxx',761984900],['ustb',691867689],['uscc',190151335],['wisdomtree-spxux',19018360],['wisdomtree-crdyx',583830]]) {
  const a=registry.assets.find(a=>a.id===id); assert.equal(a.reportedValueUsd,value);assert.equal(a.sourceReviewed,'2026-10-29');
}
assert.equal(registry.assets.find(a=>a.id==='wtgxx').contractEvidence,'https://dataspanapi.wisdomtree.com/pdr/documents/WEBSITE_FUND_DETAILS/WDT/US/EN-US/WTGXX_2/');
for(const id of ['janus-jqqq','anemoy-hyb','anemoy-spxa','anemoy-acrdx','fundbridge-ultra','fundbridge-incom']) assert.equal(registry.assets.find(a=>a.id===id).reportedValueUsd,null);
assert.equal(registry.relationships.filter(r=>r.assetId==='janus-jqqq').length,3);
assert.equal(registry.relationships.filter(r=>r.assetId==='anemoy-hyb').length,2);
assert.equal(registry.assets.find(a=>a.id==='vbdc').sourceReviewed,'2026-10-22');
const browser=await chromium.launch({headless:true,channel:'chrome'});
try {
  const ctx=await browser.newContext();
  for(const width of [1440,390]) {
    const page=await ctx.newPage();
    await page.setViewportSize({width,height:1000});
    assert.equal(await page.evaluate(()=>innerWidth),width);
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    for(const view of ['','/assets','/registry','/supply','/fund-comparison','/methodology']) {
      const r=await page.goto(`${base}/network-explorer${view}?source=qa-test&q=readiness-probe`,{waitUntil:'domcontentloaded'});assert.equal(r.status(),200);
      if(view!=='/fund-comparison') {
        await page.waitForFunction(()=>document.querySelector('input[placeholder="Search assets, providers or regulatory records"]')?.value==='readiness-probe');
        await page.getByLabel('Search this view').fill('');
      }
      assert.ok(await page.locator('main h1').textContent());
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,`${width} ${view}`);
      assert.deepEqual(errors,[]);
      if(view==='') {
        const map=page.getByRole('region',{name:'Who makes a tokenized asset work?'});
        await map.getByLabel('Choose an asset').selectOption('janus-jqqq');
        assert.ok((await map.textContent()).includes('Nasdaq'));
        await map.getByLabel('Choose an asset').selectOption('anemoy-hyb');
        assert.ok((await map.textContent()).includes('New York Life Investment Management'));
        await map.getByLabel('Choose an asset').selectOption('fundbridge-ultra');
        assert.ok((await map.textContent()).includes('Standard Chartered Bank'));
        await map.getByLabel('Choose an asset').selectOption('anemoy-acrdx');
        assert.ok((await map.textContent()).includes('Chronicle'));
      }
      if(view==='/assets') {
        const table=page.getByRole('table',{name:'Issuer-reported fund AUM with reporting dates and evidence limitations'});
        assert.equal(await table.locator('tbody tr').count(),18);
        assert.ok((await table.textContent()).includes('27 Oct 2026'));
        const [download]=await Promise.all([page.waitForEvent('download'),page.getByRole('button',{name:'Download fund disclosures CSV'}).click()]);
        await download.saveAs(`${out}/funds-${width}.csv`);
        const text=fs.readFileSync(`${out}/funds-${width}.csv`,'utf8'); assert.ok(text.includes('691867689')&&text.includes('19018360'));
      }
      if(view==='/registry') {
        await page.getByLabel('Cohort').selectOption('WisdomTree digital funds');
        assert.equal(await page.locator('tbody').first().locator('tr').count(),14);
        await page.getByLabel('Cohort').selectOption('Research profile');
        await page.getByLabel('Search this view').fill('JQQQ');
        assert.equal(await page.locator('tbody').first().locator('tr').count(),1);
        assert.ok((await page.locator('tbody').first().textContent()).includes('Value not verified'));
      }
      if(view==='/supply') {
        assert.ok((await page.locator('main').textContent()).includes('2026-10-29'));
      }
      await page.evaluate(()=>scrollTo(0,0));
      await page.screenshot({path:`${out}/${view.slice(1)||'overview'}-${width}.png`,fullPage:true});console.log(`PASS ${width}px /network-explorer${view}`);
    }
    await page.close();
  }
  for(const [path,expected] of [['/assets/datasets/network-asset-registry.json',registry],['/assets/datasets/network-fund-disclosure-history.json',history],['/assets/datasets/network-value-observations.json',archive]]) {
    const r=await ctx.request.get(`${base}${path}?source=qa-test`);assert.equal(r.status(),200);assert.deepEqual(await r.json(),expected);
  }
  const coverage=await (await ctx.request.get(`${base}/api/network-explorer/v1/coverage?source=qa-test`)).json();
  assert.equal(coverage.identifiedRecords,1749);assert.equal(coverage.documentedRelationships,93);assert.equal(coverage.datedValueRecords,21);
  const result=await (await ctx.request.get(`${base}/api/network-explorer/v1/relationships?asset_id=janus-jqqq&source=qa-test`)).json();assert.equal(result.total,3);
  const sitemap=await (await ctx.request.get(`${base}/sitemap.xml?source=qa-test`)).text();
  for(const route of ['','/assets','/registry','/supply','/methodology']) {
    const entry=sitemap.split('<url>').find(row=>row.includes(`<loc>https://www.fluidrwa.com/network-explorer${route}</loc>`));
    assert.ok(entry?.includes('<lastmod>2026-10-29'),`Stale sitemap date: ${route}`);
  }
  console.log('PASS: registry, role map, AUM unit conversions, older observations, native-unit supply, downloads and public API.');
}finally{await browser.close();}
