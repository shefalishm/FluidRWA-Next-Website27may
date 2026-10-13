import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
const snapshot=JSON.parse(fs.readFileSync('data/network-intelligence.json','utf8'));
const ramp=JSON.parse(fs.readFileSync('data/ramp-onboarding-dataset.json','utf8'));
const candidates=JSON.parse(fs.readFileSync('data/asset-registry-candidates.json','utf8'));
const urls=[...new Set([...snapshot.assets,...snapshot.regulations,...ramp.rows,...candidates].map(r=>r.source))];
const checks=[];
for(const url of urls){
 try{
  const r=await fetch(url,{signal:AbortSignal.timeout(20000),headers:{'User-Agent':'FluidRWA-SourceCheck/1.0 (+https://www.fluidrwa.com/network-explorer/methodology)'}});
  const text=await r.text();
  if(r.ok && text.length>=100){checks.push({url,status:r.status,ok:true,checkedAt:new Date().toISOString(),reviewRequired:false});continue;}
 }catch{}
 try{
  const r=await fetch(url,{method:'HEAD',signal:AbortSignal.timeout(20000),headers:{'User-Agent':'FluidRWA-SourceCheck/1.0 (+https://www.fluidrwa.com/network-explorer/methodology)'}});
  checks.push({url,status:r.status,ok:r.ok,method:'HEAD fallback',checkedAt:new Date().toISOString(),reviewRequired:!r.ok});
 }catch(e){
  try{
   const status=Number(execFileSync('curl',['-sS','-L','-o','/dev/null','-w','%{http_code}','--max-time','20',url],{encoding:'utf8'}).trim());
   checks.push({url,status,ok:status>=200&&status<400,method:'curl fallback',checkedAt:new Date().toISOString(),reviewRequired:status<200||status>=400});
  }catch{checks.push({url,ok:false,error:e.message,reviewRequired:true,checkedAt:new Date().toISOString()});}
 }
}
fs.mkdirSync('source-check-results',{recursive:true});
fs.writeFileSync('source-check-results/network-sources.json',JSON.stringify(checks,null,2));
console.log(JSON.stringify(checks,null,2));
console.log('Source reachability only. This does not reverify claims, reset observation dates or automatically publish changes.');
if(checks.some(c=>c.reviewRequired))process.exitCode=1;
