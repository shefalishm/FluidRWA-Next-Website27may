import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require=createRequire('/Users/shefalisharma/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json');
const {chromium}=require('playwright');
const report=JSON.parse(fs.readFileSync('data/research/tokenized-fund-infrastructure-2026-10-v1.json','utf8'));
const base=process.env.PREVIEW_URL || 'http://localhost:3055';
const route='/network-explorer/research/tokenized-fund-infrastructure-october-2026';
const output=process.env.FUND_QA_OUTPUT || '/private/tmp/fluidrwa-fund-report-2026-10-21';
fs.mkdirSync(output,{recursive:true});
const stem=`tokenized-fund-infrastructure-${report.version}`;
const exhibitStem='tokenized-funds-october-2026-editorial-v1';
const browser=await chromium.launch({headless:true,channel:'chrome'});
try{
  for(const width of [1440,390,360]){
    const page=await browser.newPage({viewport:{width,height:900}});
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.route(/google-analytics\.com|googletagmanager\.com|analytics\.google\.com/,r=>r.abort());
    const response=await page.goto(`${base}${route}?analytics=off`,{waitUntil:'domcontentloaded',timeout:60000});
    assert.equal(response.status(),200);
    assert.equal(await page.locator('main h1').textContent(),'The firms behind tokenized funds');
    const reading=await page.locator('main').innerText();
    for(const phrase of ['Product-role cells','source-set coverage','Methodology and reproducibility','OCTOBER 2026 RESEARCH BASELINE'])assert.ok(!reading.includes(phrase),`Internal wording returned: ${phrase}`);
    assert.equal(await page.locator('#evidence').getAttribute('open'),null);
    assert.equal(await page.locator('#methodology').getAttribute('open'),null);
    await page.locator('main sup a').first().click();
    await page.locator('#source-buidl-launch').waitFor({state:'visible'});
    assert.equal(await page.locator('#sources').getAttribute('open'),'');
    await page.locator('#sources > summary').click();
    await page.locator('#evidence > summary').click();
    await page.getByLabel('Find a fund or provider').fill('Securitize');
    await page.getByText('3 of 20 products',{exact:true}).waitFor();
    await page.getByLabel('Find a fund or provider').fill('');
    await page.getByLabel('Product structure').selectOption('SICAV sub-fund');
    await page.getByText('4 of 20 products',{exact:true}).waitFor();
    await page.getByLabel('Product structure').selectOption('');
    await page.getByLabel('Find a fund or provider').fill('no-such-fund');
    await page.getByText('No products match these filters.',{exact:true}).waitFor();
    await page.getByLabel('Find a fund or provider').fill('');
    await page.getByText('20 of 20 products',{exact:true}).waitFor();
    assert.equal(await page.locator('tbody tr').count(),20);
    const details=page.locator(width>760?'tbody details': '[class*="mobileRows"] details').first();
    await details.locator('summary').click();
    assert.equal(await details.getAttribute('open'),'');
    await details.locator('summary').click();
    const main=page.locator('main');
    const [download]=await Promise.all([page.waitForEvent('download'),page.getByRole('link',{name:'Download data (CSV)',exact:true}).click()]);
    await download.saveAs(`${output}/evidence-${width}.csv`);
    assert.equal(fs.readFileSync(`${output}/evidence-${width}.csv`,'utf8').split('\r\n').filter(Boolean).length,81);
    for(const img of await main.locator('img').all())await img.scrollIntoViewIfNeeded();
    await page.waitForFunction(()=>[...document.querySelectorAll('main img')].every(i=>i.complete&&i.naturalWidth));
    const state=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,canonical:document.querySelector('link[rel="canonical"]')?.href,images:[...document.querySelectorAll('main img')].map(i=>({src:i.currentSrc,width:i.naturalWidth,alt:i.alt})),schema:[...document.querySelectorAll('main script[type="application/ld+json"]')].flatMap(s=>JSON.parse(s.textContent)['@graph'])}));
    assert.equal(state.overflow,false,`Overflow ${width}`);
    assert.equal(state.canonical,`https://www.fluidrwa.com${route}`);
    assert.equal(state.images.length,3);
    assert.ok(state.images.every(i=>i.alt.length>80 && i.width===(width>760?1400:780)));
    assert.ok(state.schema.some(s=>s['@type']==='Dataset'&&s.version===report.version));
    assert.ok(state.schema.some(s=>s['@type']==='Article'&&s.headline==='The firms behind tokenized funds'));
    assert.equal(state.schema.filter(s=>s['@type']==='ImageObject').length,3);
    assert.deepEqual(errors,[]);
    await page.screenshot({path:`${output}/full-${width}.png`,fullPage:true});
    await page.evaluate(()=>scrollTo(0,0));
    await page.screenshot({path:`${output}/top-${width}.png`});
    await page.locator('#evidence > summary').scrollIntoViewIfNeeded();
    await page.screenshot({path:`${output}/table-${width}.png`});
    await page.locator('#evidence > summary').click();
    await page.locator('#ownership').scrollIntoViewIfNeeded();
    await page.screenshot({path:`${output}/chapter-${width}.png`});
    console.log(`PASS ${width}px report, search, structure filter, empty state, source details, CSV, three responsive charts, schema, no overflow/errors`);
    await page.close();
  }
  const context=await browser.newContext();
  for(const ext of ['json','csv']){
    const response=await context.request.get(`${base}/assets/datasets/${stem}.${ext}`);
    assert.equal(response.status(),200);
    if(ext==='json')assert.deepEqual((await response.json()).funds,report.funds);
    else assert.equal((await response.text()).split('\r\n').filter(Boolean).length,81);
  }
  for(const chart of [1,2,3])for(const suffix of ['','-mobile']){
    const response=await context.request.get(`${base}/assets/infographics/${exhibitStem}-${chart}${suffix}.png`);
    assert.equal(response.status(),200);assert.ok(response.headers()['content-type'].includes('image/png'));assert.ok((await response.body()).length>10000);
  }
  const index=await context.request.get(`${base}/network-explorer/research?analytics=off`);
  assert.ok((await index.text()).includes(route));
  const sitemap=await context.request.get(`${base}/sitemap.xml`);
  assert.ok((await sitemap.text()).includes(`https://www.fluidrwa.com${route}`));
  await context.close();console.log('PASS all eight public downloads, report discovery and sitemap');
}finally{await browser.close();}
