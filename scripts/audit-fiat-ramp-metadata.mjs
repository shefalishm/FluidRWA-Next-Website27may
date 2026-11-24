import fs from 'node:fs';
import {createRequire} from 'node:module';
const{parse}=createRequire(import.meta.url)('next/dist/compiled/node-html-parser');
const urls=[
 'https://www.finextra.com/blogposting/33092/top-crypto-on-ramp-and-off-ramp-providers',
 'https://www.alchemy.com/dapps/best/fiat-onramps',
 'https://www.onramper.com/',
 'https://www.spark.money/tools/which-crypto-off-ramp-should-i-use',
 'https://utorg.com/learn/best-crypto-on-ramps-in-2026',
 'https://www.finextra.com/blogposting/32712/on--and-off-ramp-providers-for-crypto-platforms-the-best-of-the-bunch',
 'https://xchange-360.com/insights/best-crypto-off-ramp-providers-for-businesses-2026/',
 'https://www.merge.money/products/stablecoin-on-off-ramp',
 'https://www.quicknode.com/builders-guide/best/top-9-fiat-onramps',
 'https://blindpay.com/resources/more/best-stablecoin-offramp-latin-america-2026'
];
const records=[];
for(const[i,url]of urls.entries()){
 try{
 const r=await fetch(url,{signal:AbortSignal.timeout(20000)}),d=parse(await r.text());
 const schemas=d.querySelectorAll('script[type="application/ld+json"]').flatMap(s=>{try{return[...JSON.stringify(JSON.parse(s.text)).matchAll(/"@type":"([^"]+)"/g)].map(m=>m[1]);}catch{return['invalid JSON'];}});
 records.push({url,googlePosition:i<9?i+1:null,additionalLatamSource:i===9,status:r.status,finalUrl:r.url,title:d.querySelector('title')?.text,description:d.querySelector('meta[name="description"]')?.getAttribute('content'),canonical:d.querySelector('link[rel="canonical"]')?.getAttribute('href'),robots:d.querySelector('meta[name="robots"]')?.getAttribute('content')||null,h1:d.querySelectorAll('h1').map(x=>x.text.trim()),headingSample:d.querySelectorAll('h2').slice(0,8).map(x=>x.text.trim()),schemaTypes:[...new Set(schemas)],scope:'Response availability and metadata only; claim verification is separate.'});
 }catch(e){records.push({url,error:e.message,scope:'Direct fetch unavailable, not evidence of deindexing.'});}
 console.log(`${i+1}/${urls.length} metadata checks`);
}
fs.writeFileSync('reports/fiat-ramp-competitor-metadata-2026-11-24.json',JSON.stringify({observedOn:'2026-11-24',query:'best crypto off ramp providers',context:'Chrome personalized India results exposed nine organic results. Additional tenth source is a Latin America comparison, not an invented tenth Google result.',records},null,2)+'\n');
