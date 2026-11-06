import assert from 'node:assert/strict';
import { fixture, inspect, transport } from '../public/examples/rpc-acceptance-lab.mjs';

const now = 1800000000;
const rpc = fixture(now);
const expected = await inspect(rpc, now);
assert.deepEqual([expected.head, expected.ageSeconds, expected.finalized], ['0x100', '12', '0xf0']);
for (const [tag, patch, pattern] of [
  ['latest', { timestamp: '0x1' }, /freshness/],
  ['latest', { timestamp: '0x00' }, /quantity/],
  ['latest', { timestamp: '0x' + (now + 31).toString(16) }, /freshness/],
  ['finalized', { number: '0x101' }, /finalized/],
  ['finalized', { number: '0x100' }, /finalized/],
  ['0x100', { hash: '0x' + 'ee'.repeat(32) }, /Snapshot/],
]) {
  await assert.rejects(inspect(async (method, params) => {
    const result = await rpc(method, params);
    return params[0] === tag ? { ...result, ...patch } : result;
  }, now), pattern);
}
await assert.rejects(inspect(async () => '0x1', now), /Not Ethereum Sepolia/);
let chainChecks = 0;
await assert.rejects(inspect((method, params) => method === 'eth_chainId' && ++chainChecks === 2 ? '0x1' : rpc(method, params), now), /Chain changed/);

const requests = [];
const mock = transport('https://example.invalid/rpc', async (_, options) => {
  assert.equal(options.redirect, 'error');
  assert.equal(options.method, 'POST');
  const { jsonrpc, id, method, params } = JSON.parse(options.body);
  requests.push([id, method, params]);
  return Response.json({ jsonrpc, id, result: await rpc(method, params) });
});
assert.deepEqual(await inspect(mock, now), expected);
assert.deepEqual(requests, [
  [1, 'eth_chainId', []], [2, 'eth_getBlockByNumber', ['latest', false]],
  [3, 'eth_getBlockByNumber', ['finalized', false]], [4, 'eth_getBlockByNumber', ['0x100', false]],
  [5, 'eth_chainId', []],
]);
await assert.rejects(mock('eth_sendRawTransaction', []), /not allowed/);
assert.equal(requests.length, 5);
for (const url of ['http://example.invalid', 'https://x@example.invalid', 'https://example.invalid/#x']) assert.throws(() => transport(url), /authorized HTTPS/);
for (const [response, pattern] of [
  [new Response(null, { status: 429 }), /HTTP failure/],
  [Response.json(null), /response rejected/],
  [Response.json({ jsonrpc: '2.0', id: 9, result: '0xaa36a7' }), /response rejected/],
  [Response.json({ jsonrpc: '2.0', id: 1, error: { code: -32602 } }), /response rejected/],
]) await assert.rejects(transport('https://example.invalid', async () => response)('eth_chainId', []), pattern);
console.log('PASS offline fixture and mocked RPC checks; no live endpoint called.');
