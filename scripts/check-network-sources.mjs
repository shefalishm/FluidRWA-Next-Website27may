import fs from 'node:fs';
const snapshot=JSON.parse(fs.readFileSync('data/network-intelligence.json','utf8'));
const ramp=JSON.parse(fs.readFileSync('data/ramp-onboarding-dataset.json','utf8'));
const urls=[...new Set([...snapshot.assets,...snapshot.regulations,...ramp.rows].map(r=>r.source))];
const checks=[];
for(const url of urls){
 try{
  const r=await fetch(url,{signal:AbortSignal.timeout(20000),headers:{'User-Agent':'FluidRWA-SourceCheck/1.0 (+https://www.fluidrwa.com/network-explorer/methodology)'}});
  const text=await r.text();
  checks.push({url,status:r.status,ok:r.ok,checkedAt:new Date().toISOString(),reviewRequired:!r.ok||text.length<100});
 }catch(e){checks.push({url,ok:false,error:e.message,reviewRequired:true,checkedAt:new Date().toISOString()});}
}
fs.mkdirSync('source-check-results',{recursive:true});
fs.writeFileSync('source-check-results/network-sources.json',JSON.stringify(checks,null,2));
console.log(JSON.stringify(checks,null,2));
console.log('Source reachability only. This does not reverify claims, reset observation dates or automatically publish changes.');
if(checks.some(c=>c.reviewRequired))process.exitCode=1;
