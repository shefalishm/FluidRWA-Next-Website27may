import assert from 'node:assert/strict';
import { decodeBool, fixtureConfig, fixtureRpc, inspectTransfer, makeRpc, offline, transferInput, uint } from '../public/examples/transaction-simulation-lab.mjs';

const report = await offline();
assert.match(report.mode, /no EVM execution and no network request/);
assert.equal(report.intended.kind, 'returned-true');
assert.equal(report.excessive.kind, 'execution-reverted');
assert.equal(report.persistedBalanceUnchanged, true);
assert.equal(transferInput(fixtureConfig.recipient, 1n), '0xa9059cbb' + '0'.repeat(24) + '33'.repeat(20) + '0'.repeat(63) + '1');
assert.throws(() => uint(1n << 256n), /uint256/);
assert.throws(() => decodeBool('0x' + uint(2n)), /Noncanonical/);
assert.throws(() => decodeBool('0x'), /ABI uint256/);
const fixture = fixtureRpc({ excessive: 'false' });
assert.equal((await inspectTransfer(fixture.rpc, fixtureConfig)).excessive.kind, 'returned-false');
const transfers = fixture.calls.filter(call => call.method === 'eth_call' && call.params[0].input.startsWith('0xa9059cbb'));
assert.equal(transfers.length, 2);
assert.deepEqual(transfers[1].params, [{ from: fixtureConfig.from, to: fixtureConfig.token, value: '0x0', input: transferInput(fixtureConfig.recipient, 11n) }, '0x100']);
assert.match((await inspectTransfer(fixtureRpc({ excessive: 'true' }).rpc, fixtureConfig)).review, /stop and investigate/);
assert.match((await inspectTransfer(fixtureRpc({ positive: 'false' }).rpc, fixtureConfig)).review, /stop and investigate/);
const wrong = fixtureRpc({ chain: '0x1' });
await assert.rejects(inspectTransfer(wrong.rpc, fixtureConfig), /not Ethereum Sepolia/);
assert.deepEqual(wrong.calls.map(call => call.method), ['eth_chainId']);
await assert.rejects(inspectTransfer(fixtureRpc({ changedHash: true }).rpc, fixtureConfig), /Snapshot changed/);
await assert.rejects(inspectTransfer(fixtureRpc({ positive: 'empty' }).rpc, fixtureConfig), /ABI uint256/);
await assert.rejects(inspectTransfer(fixtureRpc({ excessive: 'error' }).rpc, fixtureConfig), /provider failure/);
await assert.rejects(inspectTransfer(fixtureRpc().rpc, { ...fixtureConfig, recipient: fixtureConfig.from }), /distinct/);
await assert.rejects(inspectTransfer(fixtureRpc().rpc, { ...fixtureConfig, amount: 11n }), /exceeds/);
const missing = fixtureRpc();
await assert.rejects(inspectTransfer((m, p) => m === 'eth_getCode' ? '0x' : missing.rpc(m, p), fixtureConfig), /No contract bytecode/);

const endpoint = 'https://example.invalid/secret-fixture';
const remote = fixtureRpc();
const mockFetch = async (url, options) => {
  assert.equal(url.href, endpoint);
  assert.equal(options.redirect, 'error');
  assert.equal(options.method, 'POST');
  const { jsonrpc, id, method, params } = JSON.parse(options.body);
  assert.equal(jsonrpc, '2.0');
  try { return Response.json({ jsonrpc, id, result: await remote.rpc(method, params) }); }
  catch (error) { return Response.json({ jsonrpc, id, error: { code: error.rpcCode, message: 'mock revert' } }); }
};
const rpc = makeRpc(endpoint, mockFetch);
assert.equal((await inspectTransfer(rpc, fixtureConfig)).excessive.kind, 'execution-reverted');
await assert.rejects(rpc('eth_sendRawTransaction', []), /not allowed/);
assert.throws(() => makeRpc('http://example.invalid'), /HTTPS/);
await assert.rejects(makeRpc(endpoint, async () => { throw new Error(endpoint); })('eth_chainId', []), error => /transport failed/.test(error.message) && !error.message.includes('secret-fixture'));
for (const status of [401, 403, 429, 500]) await assert.rejects(makeRpc(endpoint, async () => new Response('', { status }))('eth_chainId', []), new RegExp(`HTTP ${status}`));
await assert.rejects(makeRpc(endpoint, async () => new Response('not-json'))('eth_chainId', []), /invalid JSON/);
await assert.rejects(makeRpc(endpoint, async () => Response.json({ jsonrpc: '2.0', id: 2, result: '0xaa36a7' }))('eth_chainId', []), /envelope/);
await assert.rejects(makeRpc(endpoint, async () => Response.json({ jsonrpc: '2.0', id: 1, error: null }))('eth_chainId', []), /Invalid JSON-RPC error/);
console.log('PASS: offline transfer and overdraw, fixed ABI, guardrails, snapshot, refusal classes and mocked HTTPS envelopes. No network or EVM execution.');
