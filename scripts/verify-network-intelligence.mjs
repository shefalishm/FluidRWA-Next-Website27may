import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire('/Users/shefalisharma/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json');
const { chromium } = require('playwright');
const snapshot=JSON.parse(fs.readFileSync('data/network-intelligence.json','utf8'));
const registryCandidates=JSON.parse(fs.readFileSync('data/asset-registry-candidates.json','utf8'));
const issuerList=JSON.parse(fs.readFileSync('data/issuer-tokenlist-ondo.json','utf8'));
const xstocksList=JSON.parse(fs.readFileSync('data/issuer-tokenlist-xstocks.json','utf8'));
const robinhoodList=JSON.parse(fs.readFileSync('data/issuer-api-robinhood.json','utf8'));
const wisdomtreeList=JSON.parse(fs.readFileSync('data/issuer-funds-wisdomtree.json','utf8'));
const relationships=JSON.parse(fs.readFileSync('data/asset-infrastructure-relationships.json','utf8'));
const ramp=JSON.parse(fs.readFileSync('data/ramp-onboarding-dataset.json','utf8'));
assert.equal(snapshot.assets.length,3); assert.equal(snapshot.networks.length,8); assert.equal(ramp.rows.length,18);
assert.equal(registryCandidates.length,18);
assert.equal(issuerList.assets.length,450);assert.equal(xstocksList.assets.length,1052);assert.equal(robinhoodList.assets.length,194);assert.equal(wisdomtreeList.assets.length,14);
assert.equal(relationships.length,35);
assert.equal(new Set([...snapshot.assets,...registryCandidates,...issuerList.assets,...xstocksList.assets,...robinhoodList.assets,...wisdomtreeList.assets.map(row=>({id:`wisdomtree-${row.symbol.toLowerCase()}`}))].map(asset=>asset.id)).size,1731);
for(const asset of registryCandidates){assert.ok(asset.source.startsWith('https://'));if(asset.reportedValueUsd!==null){assert.ok(asset.reportedValueUsd>0);assert.match(asset.reportedAsOf,/^\d{4}-\d{2}-\d{2}$/);assert.ok(asset.reportedMetric);}}
assert.equal(snapshot.assets.find(asset=>asset.id==='usdc').value,72500000000);
assert.equal(snapshot.assets.find(asset=>asset.id==='wtgxx').value,1227400000);
for (const [id, value] of [['ustb',788515306],['uscc',196476220],['vbdc',9649779]]) {
 const asset=registryCandidates.find(asset=>asset.id===id);
 assert.equal(asset.reportedAsOf,'2026-10-18');
 assert.equal(asset.sourceReviewed,'2026-10-20');
 assert.equal(asset.reportedValueUsd,value);
}
assert.equal(registryCandidates.find(asset=>asset.id==='cushy').reportedAsOf,'2026-08-31');
assert.equal(registryCandidates.find(asset=>asset.id==='cushy').sourceReviewed,'2026-10-19');
assert.ok(registryCandidates.find(asset=>asset.id==='uscc').notes.includes('did not reconcile'));
assert.equal(new Set(ramp.rows.map(r=>`${r.provider}:${r.dimension}`)).size,18);
for(const r of [...snapshot.assets,...snapshot.regulations,...ramp.rows])assert.ok(r.source.startsWith('https://'));
const base=process.env.PREVIEW_URL || 'http://localhost:3046';
const output=process.env.NETWORK_QA_OUTPUT || '/private/tmp/fluidrwa-network-qa-2026-10-15'; fs.mkdirSync(output,{recursive:true});
const routes=['','/supply','/assets','/registry','/networks','/vendors','/jurisdictions','/research','/methodology','/research/ramp-onboarding'];
const browser=await chromium.launch({headless:true,channel:'chrome'});const results=[];
try {
 for(const width of [1440,390,360]){
  const page=await browser.newPage({viewport:{width,height:900}});
  await page.route('**/api/network-explorer/onchain-supply',route=>route.fulfill({json:{metric:'ERC-20 totalSupply in native token units',method:'Measured at a recorded block.',series:[{id:'usdc-ethereum',symbol:'USDC',assetClass:'Stablecoin',issuer:'Circle',network:'Ethereum',chainId:1,address:'0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',source:'https://www.circle.com/multi-chain-usdc/ethereum',explorer:'https://etherscan.io',observations:[{asset_id:'usdc-ethereum',day:'2026-10-08',chain_id:1,contract_address:'0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',raw_supply:'1000000000',decimals:6,block_number:1,block_timestamp:1,observed_at:'2026-10-08T00:05:00Z'},{asset_id:'usdc-ethereum',day:'2026-10-15',chain_id:1,contract_address:'0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',raw_supply:'1100000000',decimals:6,block_number:2,block_timestamp:2,observed_at:'2026-10-15T00:05:00Z'}]},{id:'ustb-ethereum',symbol:'USTB',assetClass:'Tokenized fund',issuer:'Invesco / Superstate',network:'Ethereum',chainId:1,address:'0x43415eB6ff9DB7E26A15b704e7A3eDCe97d31C4e',source:'https://superstate.com/assets/ustb',explorer:'https://etherscan.io',observations:[{asset_id:'ustb-ethereum',day:'2026-10-15',chain_id:1,contract_address:'0x43415eB6ff9DB7E26A15b704e7A3eDCe97d31C4e',raw_supply:'53407631357033',decimals:6,block_number:3,block_timestamp:3,observed_at:'2026-10-15T00:05:00Z'}]}]}}));
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  for(const route of routes){
   const interactive=route!=='/research/ramp-onboarding';
   const response=await page.goto(`${base}/network-explorer${route}?analytics=off${interactive?'&q=readiness-probe':''}`,{waitUntil:'domcontentloaded',timeout:60000});
   await page.waitForFunction(()=>document.querySelector('main h1') && [...document.querySelectorAll('main img')].every(i=>i.complete),undefined,{timeout:30000});
   if(interactive){
    const search = page.getByLabel('Search this view');
    await search.waitFor({state:'visible'});
    await page.waitForFunction(()=>document.querySelector('input[placeholder="Search assets, providers or regulatory records"]')?.value==='readiness-probe');
    await search.fill('readiness-probe');
    assert.equal(await search.inputValue(),'readiness-probe');
    await search.fill('');
   }
   assert.equal(response.status(),200,route);
   const state=await page.evaluate(()=>({title:document.querySelector('h1')?.textContent,overflow:document.documentElement.scrollWidth>innerWidth+1,broken:[...document.querySelectorAll('main img')].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),canonical:document.querySelector('link[rel="canonical"]')?.href,body:document.body.textContent}));
   assert.ok(state.title && !state.title.includes('Finding a'));assert.equal(state.overflow,false,`${width} overflow ${route}`);assert.deepEqual(state.broken,[]);
   assert.equal(state.canonical,`https://www.fluidrwa.com/network-explorer${route}`);
   if(route!=='/supply')assert.ok(state.body.includes(route==='/research/ramp-onboarding' ? '2026-10-13.1' : ['', '/registry', '/methodology'].includes(route) ? '20 Oct 2026' : '19 Oct 2026'));assert.ok(state.body.includes('contact@fluidrwa.com'));assert.deepEqual(errors,[]);
   if(route==='/supply'){
    await page.getByText('USDC on Ethereum').waitFor();
    assert.ok((await page.locator('main').textContent()).includes('+10.00%'));
    await page.getByRole('button',{name:/Tokenized fund/}).click();
    assert.ok((await page.locator('main').textContent()).includes('USTB on Ethereum'));
    assert.equal(await page.getByText('USDC on Ethereum').count(),0);
    assert.ok((await page.locator('main').textContent()).includes('53,407,631.36'));
    await page.getByRole('button',{name:/All assets/}).click();
    await page.getByRole('button',{name:'1Y'}).click();
    assert.ok((await page.locator('main').textContent()).includes('Not yet available'));
    const [file]=await Promise.all([page.waitForEvent('download'),page.getByRole('button',{name:'Download CSV'}).click()]);
    await file.saveAs(`${output}/supply-${width}.csv`);
   }
   if(route===''){
    const map=page.getByRole('region',{name:'Who makes a tokenized asset work?'});
    assert.ok((await map.textContent()).includes('35'));
    assert.ok((await page.locator('main').textContent()).includes('Fund disclosures'));
    const [fundFile]=await Promise.all([page.waitForEvent('download'),page.getByRole('button',{name:'Download fund disclosures CSV'}).click()]);
    const fundPath=`${output}/fund-disclosures-${width}.csv`;
    await fundFile.saveAs(fundPath);
    const fundCsv=fs.readFileSync(fundPath,'utf8');
    assert.ok(fundCsv.includes('788515306'));
    assert.ok(fundCsv.includes('196476220'));
    assert.ok(fundCsv.includes('2026-08-31'));
    await map.getByRole('button',{name:'USDC',exact:true}).click();
    assert.ok((await map.textContent()).includes('Reserve-fund portfolio custodian'));
    await map.getByRole('button',{name:'PYUSD',exact:true}).click();
    assert.ok((await map.textContent()).includes('PayPal-account distribution'));
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
   }
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
   if(route==='/registry'){
    assert.equal(await page.locator('tbody').first().locator('tr').count(),30);
    await page.getByLabel('Cohort').selectOption('Research profile');assert.equal(await page.locator('tbody').first().locator('tr').count(),21);
    await page.getByLabel('Cohort').selectOption('Ondo issuer list');assert.equal(await page.locator('tbody').first().locator('tr').count(),30);
    await page.getByRole('button',{name:'Show 30 more'}).click();assert.equal(await page.locator('tbody').first().locator('tr').count(),60);
    await page.getByLabel('Cohort').selectOption('xStocks issuer list');await page.waitForFunction(()=>document.querySelector('tbody')?.querySelectorAll('tr').length===30);assert.equal(await page.locator('tbody').first().locator('tr').count(),30);
    await page.getByLabel('Cohort').selectOption('Robinhood issuer API');assert.equal(await page.locator('tbody').first().locator('tr').count(),30);
    await page.getByLabel('Cohort').selectOption('WisdomTree digital funds');assert.equal(await page.locator('tbody').first().locator('tr').count(),14);
    await page.getByLabel('Cohort').selectOption('All cohorts');
    await page.getByLabel('Asset class').selectOption('Stablecoins');assert.equal(await page.locator('tbody').first().locator('tr').count(),7);
    await page.getByLabel('Value status').selectOption('Value not verified');assert.equal(await page.locator('tbody').first().locator('tr').count(),6);
    const [file]=await Promise.all([page.waitForEvent('download'),page.getByRole('button',{name:'Download registry CSV'}).click()]);assert.ok(file.suggestedFilename().endsWith('.csv'));await file.saveAs(`${output}/registry-filter-${width}.csv`);
    await page.getByLabel('Asset class').selectOption('All asset classes');await page.getByLabel('Value status').selectOption('All value states');
   }
   if(route==='/research/ramp-onboarding')assert.equal(await page.locator('tbody tr').count(),18);
   await page.screenshot({path:`${output}/${route.replaceAll('/','-')||'overview'}-${width}.png`,fullPage:true});results.push({route,width,...state,body:undefined});console.log(`PASS ${width} /network-explorer${route}`);
  }
  await page.close();
 }
 for(const [url,type]of [['/assets/datasets/network-intelligence.json','json'],['/assets/datasets/network-asset-registry.json','json'],['/assets/datasets/network-infrastructure-relationships.json','json'],['/assets/datasets/network-infrastructure-relationships.csv','csv'],['/assets/datasets/network-ramp-evidence.csv','csv'],['/assets/infographics/network-ramp-evidence.png','png']]){
  const r=await browser.newContext();const response=await r.request.get(base+url);assert.ok(response.ok());assert.ok(response.headers()['content-type'].includes(type));if(type==='json'){const body=await response.json();if(url.includes('asset-registry')){assert.equal(body.assets.length,1731);assert.deepEqual(body.assets.find(asset=>asset.id==='ustb').reportedValueUsd,788515306);}else if(url.includes('relationships'))assert.equal(body.relationships.length,35);else assert.deepEqual(body,snapshot);}await r.close();
 }
 const api=await browser.newContext();
 const coverage=await (await api.request.get(base+'/api/network-explorer/v1/coverage')).json();assert.equal(coverage.identifiedRecords,1731);assert.equal(coverage.documentedRelationships,35);assert.equal(coverage.relationshipAssets,11);assert.equal(coverage.datedValueRecords,7);
 const pyusd=await (await api.request.get(base+'/api/network-explorer/v1/relationships?asset_id=pyusd')).json();assert.equal(pyusd.total,3);assert.equal(pyusd.records.length,3);
 const assets=await (await api.request.get(base+'/api/network-explorer/v1/assets?q=PYUSD&limit=1')).json();assert.ok(assets.total>=1);assert.equal(assets.records.length,1);
 const pageTwo=await (await api.request.get(base+'/api/network-explorer/v1/relationships?limit=5&offset=5')).json();assert.equal(pageTwo.records.length,5);
 await api.close();
 const ctx=await browser.newContext();const map=await ctx.request.get(base+'/sitemap.xml');const sitemap=await map.text();assert.ok(sitemap.includes('/network-explorer/registry'));assert.ok(sitemap.includes('/network-explorer/supply'));await ctx.close();
}finally{await browser.close();fs.writeFileSync(`${output}/checks.json`,JSON.stringify(results,null,2));}
console.log('Network Explorer: data, routes, filters, empty states, dialog, CSV, images and sitemap passed.');
