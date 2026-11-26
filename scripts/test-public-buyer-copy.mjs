import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createRequire} from 'node:module';
const {parse}=createRequire(import.meta.url)('next/dist/compiled/node-html-parser');
const blogs=["best-blockchain-development-companies-web3-rwa","top-tokenization-companies-2026","fireblocks-alternatives-2026","anchorage-digital-alternatives-2026","sumsub-alternatives-2026","talos-vs-wyden-vs-finery-markets-institutional-trading","moonpay-alternatives-2026","taxbit-vs-ledgible-vs-lukka-enterprise-crypto-accounting-tax","securitize-alternatives-2026","tokeny-alternatives-2026","best-fund-tokenization-platforms-asset-managers","enterprise-crypto-tax-reporting-software-rfp","crypto-custody-providers-comparison-2026"];
const directories=['growth-marketing','legal-regulatory','smart-contract-development'];
const forbidden=/reviewed (?:the )?current Google|after reviewing ten search-result|silently re-dated|silently refresh every vendor|historical directory record|predecessor anchors remain|earlier review dates are preserved|Editorial (?:change|addition|workflow addition)|Change note, November 20|older RWA platform-comparison URL remains/i;
const files=[...blogs.map(s=>'blog/'+s+'/index.html'),...directories.map(s=>'vendors/'+s+'/index.html')];
for(const file of files){
 const root=parse(fs.readFileSync(file,'utf8'));
 const main=root.querySelector('main')||root.querySelector('article');
 assert.ok(main,file+' main content');
 assert.ok(!forbidden.test(main.text),file+' internal process narration');
 assert.equal(root.querySelectorAll('h1').length,1,file+' single H1');
}
for(const slug of blogs){
 const file='content/blog/'+slug+'.md';
 const source=fs.readFileSync(file,'utf8');
 const before=execFileSync('git',['show','3ebd890:'+file],{encoding:'utf8'});
 if(slug==='crypto-custody-providers-comparison-2026'){
  const field=(text,key)=>text.match(new RegExp('^'+key+':.*$','m'))?.[0];
  for(const key of ['date','reviewedDate','reviewedLabel','infographicImage','infographicMobileImage','socialImage']) assert.equal(field(source,key),field(before,key),slug+' preserve historical dates and artwork');
  assert.equal(field(source,'modifiedDate'),'modifiedDate: "2026-11-26"');
  assert.ok(source.includes('readerFirst: "true"'));
  assert.ok(!/https?:\/\/(?:www\.)?(?:anchorage\.com|bitgo\.com|coinbase\.com|copper\.co|fidelitydigitalassets\.com|fireblocks\.com|fordefi\.com|gemini\.com|hextrust\.com|komainu\.com|paxos\.com|sygnum\.com|taurushq\.com|utila\.io|zodia-custody\.com)/i.test(source),slug+' no vendor-domain hyperlinks');
  assert.equal([...source.matchAll(/^faq\d+q:/gm)].length,8);
  assert.ok(!source.includes('\u2014'),slug+' no em dashes');
  continue;
 }
 const metadata=s=>s.match(/^---\n[\s\S]*?\n---/)[0];
 assert.equal(metadata(source),metadata(before),slug+' preserve metadata, evidence dates, FAQs and source references');
 const links=s=>[...s.matchAll(/\]\(([^)]+)\)/g)].map(m=>m[1]).sort();
 assert.deepEqual(links(source),links(before),slug+' preserve source and internal links');
}
assert.ok(!parse(fs.readFileSync('vendors/growth-marketing/index.html','utf8')).querySelector('#vendor-directory .bc-directory-head'));
console.log('PASS: 16 recent pages have reader-facing copy; historical snapshots preserved, including the explicitly updated custody guide.');
if(process.argv[2]){
 const paths=[...blogs.map(s=>'/blog/'+s),'/vendors/growth-marketing-companies','/vendors/legal-regulatory-vendors','/vendors/smart-contract-development-companies'];
 for(const path of paths){
  const response=await fetch(new URL(path,process.argv[2]),{signal:AbortSignal.timeout(30000)});
  assert.equal(response.status,200,path);
  const root=parse(await response.text());
  const main=root.querySelector('main');
  assert.ok(main,path+' main');
  assert.ok(!forbidden.test(main.text),path+' stale internal copy');
  assert.equal(root.querySelectorAll('h1').length,1,path+' H1');
 }
 console.log('PASS: all 16 live pages return 200 without the removed internal narration.');
}
