import assert from 'node:assert/strict';
import { fetchProductionPage, revisionFromHtml } from './lib/production-revision-check.mjs';
const html = revision => `<body data-fluidrwa-build="${revision}"></body>`;
async function check(sequence, options = {}) {
  let calls=0, waits=0;
  const result=await fetchProductionPage('https://www.fluidrwa.com/test',{
    expectedRevision:'new', attempts:3,
    fetchResponse:async()=>{
      const item=sequence[Math.min(calls++,sequence.length-1)];
      return {ok:item.ok!==false,status:item.status||200,text:async()=>item.html};
    },
    sleep:async()=>{waits++;},...options
  });
  return {result,calls,waits};
}
assert.equal(revisionFromHtml(html('new')),'new');
assert.equal(revisionFromHtml('<body>'),null);
let c=await check([{html:html('old')},{html:html('old')},{html:html('new')}]);
assert.equal(c.result.revision,'new');assert.equal(c.calls,3);assert.equal(c.waits,2);
c=await check([{html:html('old')}]);
assert.equal(c.result.revision,'old');assert.equal(c.calls,3);assert.equal(c.waits,2);
c=await check([{html:'<body>missing</body>'}]);
assert.equal(c.result.revision,null);assert.equal(c.calls,3);
c=await check([{html:html('old'),ok:false,status:404}]);
assert.equal(c.result.response.status,404);assert.equal(c.calls,1);assert.equal(c.waits,0);
c=await check([{html:html('new')}]);assert.equal(c.calls,1);assert.equal(c.waits,0);
c=await check([{html:html('old')}],{expectedRevision:undefined});assert.equal(c.calls,1);
await assert.rejects(()=>fetchProductionPage('https://www.fluidrwa.com/test',{
 fetchResponse:async()=>{throw new Error('network failure');},expectedRevision:'new',sleep:async()=>{}
}),/network failure/);
console.log('PASS: rollout wait is bounded; stale and missing markers remain failures; HTTP and network failures are not hidden.');
