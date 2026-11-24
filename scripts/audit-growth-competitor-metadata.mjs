import fs from 'node:fs';
import {createRequire} from 'node:module';
const{parse}=createRequire(import.meta.url)('next/dist/compiled/node-html-parser');
const urls=[
 'https://clutch.co/agencies/blockchain-marketing/web3',
 'https://themanifest.com/blockchain-marketing/web3/agencies',
 'https://surgence.io/blog/best-web3-marketing-agencies',
 'https://www.ment.tech/web3-marketing-agency/',
 'https://istanbulblockchainweek.com/top-10-web-3-0-marketing-services-provider-agencies/',
 'https://www.sagipl.com/web3-marketing.php',
 'https://rgray.io/blog/best-web3-marketing-agencies/',
 'https://www.linkedin.com/pulse/top-10-web3-marketing-agencies-2026-jesper-mount-dkt3e',
 'https://coinbound.io/web3-marketing-agency/',
 'https://marketerhire.com/blog/best-web3-marketing-agencies'
];
const records=[];
for(const [i,url]of urls.entries()){
 try{
  const r=await fetch(url,{signal:AbortSignal.timeout(20000)}),html=await r.text(),d=parse(html);
  const schemas=d.querySelectorAll('script[type="application/ld+json"]').map(s=>{try{const j=JSON.parse(s.text);return [...JSON.stringify(j).matchAll(/"@type":"([^"]+)"/g)].map(m=>m[1]);}catch{return ['unparsed'];}}).flat();
  records.push({url,googlePageOnePosition:i<9?i+1:null,additionalSource:i===9,status:r.status,finalUrl:r.url,title:d.querySelector('title')?.text,description:d.querySelector('meta[name="description"]')?.getAttribute('content'),canonical:d.querySelector('link[rel="canonical"]')?.getAttribute('href'),robots:d.querySelector('meta[name="robots"]')?.getAttribute('content')||null,h1:d.querySelectorAll('h1').map(n=>n.text.trim()),h2:d.querySelectorAll('h2').map(n=>n.text.trim()),schemaTypes:[...new Set(schemas)],caveat:r.ok?'Source response is available; this is not claim verification.':'Direct response blocked or unavailable; use the separate browser observation where recorded.'});
 }catch(e){records.push({url,googlePageOnePosition:i<9?i+1:null,error:e.message,caveat:'Unavailable through direct fetch. No inference of deindexing or claim accuracy.'});}
 console.log(`${i+1}/${urls.length} inspected`);
}
fs.writeFileSync('reports/growth-marketing-competitor-metadata-2026-11-24.json',JSON.stringify({observedOn:'2026-11-24',query:'best web3 marketing agencies',context:'Personalized Google results in India exposed nine organic results, not ten; MarketerHire is an additional web-search comparison source. No universal rank or citation-share claim.',records},null,2)+'\n');
