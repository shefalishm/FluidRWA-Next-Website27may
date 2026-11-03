import assert from 'node:assert/strict';
import { extract, validateRows, sources } from '../public/examples/claude-evidence-lab.mjs';
const valid = [
  { field: 'network', status: 'stated', value: 'Ethereum Sepolia only', source_id: 'A', excerpt: 'This pilot supports Ethereum Sepolia only.' },
  { field: 'duplicates', status: 'stated', value: 'Can be duplicated', source_id: 'A', excerpt: 'Event delivery can be duplicated.' },
  { field: 'support_hours', status: 'stated', value: 'Weekdays, 09:00-17:00 UTC', source_id: 'B', excerpt: 'Support is Monday-Friday, 09:00-17:00 UTC.' },
  { field: 'price', status: 'not_stated', value: null, source_id: null, excerpt: null }
];
assert.deepEqual(validateRows(valid), valid);
for (const mutate of [
  rows => rows.pop(),
  rows => { rows[1].field = 'network'; },
  rows => { rows[0].extra = true; },
  rows => { rows[0].excerpt = 'invented'; },
  rows => { rows[0].source_id = 'C'; },
  rows => { rows[3].value = 'free'; },
  rows => { rows[0].status = 'approved'; },
  rows => { rows[0] = null; }
]) {
  const rows = structuredClone(valid); mutate(rows); assert.throws(() => validateRows(rows));
}
let calls = 0;
const mock = async (url, request) => {
  calls++;
  assert.equal(url, 'https://api.anthropic.com/v1/messages');
  assert.equal(request.headers['anthropic-version'], '2026-10-21');
  const body = JSON.parse(request.body);
  assert.equal(body.model, 'mock-model');
  assert.ok(body.messages[0].content.includes(sources.A));
  assert.ok(!body.messages[0].content.includes('fake-secret'));
  return new Response(JSON.stringify({ stop_reason: 'end_turn', content: [{ type: 'text', text: JSON.stringify(valid) }], model: 'mock-model', usage: { input_tokens: 1, output_tokens: 1 } }), { headers: { 'request-id': 'mock-request' } });
};
const output = await extract({ apiKey: 'fake-secret', model: 'mock-model', fetchImpl: mock });
assert.equal(calls, 1);
assert.equal(output.review_status, 'pending_human_review');
assert.equal(output.request_id, 'mock-request');
assert.ok(!JSON.stringify(output).includes('fake-secret'));
await assert.rejects(extract({ apiKey: '', model: 'x', fetchImpl: mock }));
for (const [stop, content] of [
  ['max_tokens', [{ type: 'text', text: '[]' }]],
  ['refusal', []],
  ['end_turn', [{ type: 'text', text: 'not json' }]],
  ['end_turn', [{ type: 'tool_use', id: 'x' }]]
]) await assert.rejects(extract({ apiKey: 'fake', model: 'mock', fetchImpl: async () => new Response(JSON.stringify({ stop_reason: stop, content })) }));
for (const status of [401, 403, 429, 500]) await assert.rejects(extract({ apiKey: 'fake', model: 'mock', fetchImpl: async () => new Response('private error body', { status }) }), new RegExp(`HTTP ${status}`));
await assert.rejects(extract({ apiKey: 'fake', model: 'mock', fetchImpl: async () => { throw new Error('timeout'); } }), /timeout/);
// Exact membership alone cannot establish whether a quote supports a claim.
const semanticMismatch = structuredClone(valid);
semanticMismatch[0].value = 'Production mainnet';
assert.doesNotThrow(() => validateRows(semanticMismatch));
console.log('PASS: offline validation, mocked request/response, HTTP errors, refusal, truncation, timeout, secret exclusion and explicit semantic-check boundary. No live API call.');
