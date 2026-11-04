import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';

const MAX = (1n << 256n) - 1n;
const WORD = /^0x[0-9a-fA-F]{64}$/;
const QUANTITY = /^0x(?:0|[1-9a-fA-F][0-9a-fA-F]*)$/;
const ALLOWED = new Set(['eth_chainId', 'eth_blockNumber', 'eth_getBlockByNumber', 'eth_getCode', 'eth_call']);
export function address(value) {
  // Input format only; the caller must independently verify the address.
  if (!/^0x[0-9a-f]{40}$/.test(value || '') || /^0x0{40}$/.test(value)) throw new Error('Use a nonzero lowercase 20-byte address');
  return value;
}
export function uint(value) {
  if (typeof value !== 'bigint' || value < 0n || value > MAX) throw new Error('Invalid uint256');
  return value.toString(16).padStart(64, '0');
}
export function transferInput(recipient, amount) {
  return `0xa9059cbb${address(recipient).slice(2).padStart(64, '0')}${uint(amount)}`;
}
export function decodeUint(value) {
  if (!WORD.test(value || '')) throw new Error('Expected one ABI uint256 word');
  return BigInt(value);
}
export function decodeBool(value) {
  const n = decodeUint(value);
  if (n !== 0n && n !== 1n) throw new Error('Noncanonical ABI boolean');
  return n === 1n;
}
export function makeRpc(endpoint, fetcher = fetch) {
  const url = new URL(endpoint);
  if (url.protocol !== 'https:' || url.username || url.password) throw new Error('Use an HTTPS RPC URL without userinfo');
  let id = 0;
  return async (method, params) => {
    if (!ALLOWED.has(method)) throw new Error('RPC method not allowed');
    const requestId = ++id;
    let response;
    try {
      response = await fetcher(url, { method: 'POST', redirect: 'error', signal: AbortSignal.timeout(20000), headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ jsonrpc: '2.0', id: requestId, method, params }) });
    } catch { throw new Error('RPC transport failed or timed out; endpoint omitted'); }
    if (!response.ok) throw new Error(`RPC HTTP ${response.status}; endpoint omitted`);
    let body;
    try { body = await response.json(); } catch { throw new Error('RPC returned invalid JSON'); }
    if (!body || body.jsonrpc !== '2.0' || body.id !== requestId || (Object.hasOwn(body, 'result') === Object.hasOwn(body, 'error'))) throw new Error('Invalid JSON-RPC envelope');
    if (Object.hasOwn(body, 'error')) {
      if (!Number.isInteger(body.error?.code)) throw new Error('Invalid JSON-RPC error');
      const error = new Error('RPC rejected request; remote text omitted');
      error.rpcCode = body.error.code;
      throw error;
    }
    return body.result;
  };
}
async function callResult(rpc, tx, block) {
  try { return { kind: decodeBool(await rpc('eth_call', [tx, block])) ? 'returned-true' : 'returned-false' }; }
  catch (error) {
    // Code 3 is used for execution reverts; all other failures stop the exercise.
    if (error.rpcCode === 3) return { kind: 'execution-reverted' };
    throw error;
  }
}
function blockHash(block, expectedNumber) {
  if (!block || block.number !== expectedNumber || !/^0x[0-9a-fA-F]{64}$/.test(block.hash || '')) throw new Error('Invalid or missing block');
  return block.hash;
}
export async function inspectTransfer(rpc, config) {
  const token = address(config.token), from = address(config.from), recipient = address(config.recipient);
  if (new Set([token, from, recipient]).size !== 3) throw new Error('Use distinct token, sender and recipient addresses');
  const amount = config.amount;
  if (typeof amount !== 'bigint' || amount <= 0n || amount > MAX) throw new Error('Use positive integer base units');
  if (await rpc('eth_chainId', []) !== '0xaa36a7') throw new Error('Stop: RPC is not Ethereum Sepolia (11155111)');
  const block = await rpc('eth_blockNumber', []);
  if (!QUANTITY.test(block || '')) throw new Error('Invalid block quantity');
  const beforeHash = blockHash(await rpc('eth_getBlockByNumber', [block, false]), block);
  const code = await rpc('eth_getCode', [token, block]);
  if (!/^0x(?:[0-9a-fA-F]{2})+$/.test(code || '')) throw new Error('No contract bytecode at selected address');
  const balanceInput = `0x70a08231${from.slice(2).padStart(64, '0')}`;
  const balance = decodeUint(await rpc('eth_call', [{ to: token, input: balanceInput }, block]));
  if (amount > balance) throw new Error('Positive case exceeds the selected sender balance');
  if (balance === MAX) throw new Error('Cannot construct balance-plus-one uint256');
  const build = amount => ({ from, to: token, value: '0x0', input: transferInput(recipient, amount) });
  const intended = await callResult(rpc, build(amount), block);
  const excessive = await callResult(rpc, build(balance + 1n), block);
  const afterBalance = decodeUint(await rpc('eth_call', [{ to: token, input: balanceInput }, block]));
  const afterHash = blockHash(await rpc('eth_getBlockByNumber', [block, false]), block);
  if (beforeHash !== afterHash || afterBalance !== balance || await rpc('eth_chainId', []) !== '0xaa36a7') throw new Error('Snapshot changed; discard report');
  return { network: 'Ethereum Sepolia', chainId: 11155111, block, blockHash: beforeHash, token, from, recipient, amountBaseUnits: amount.toString(), balanceBaseUnits: balance.toString(), intended, excessive, persistedBalanceUnchanged: true, review: intended.kind === 'returned-true' && excessive.kind !== 'returned-true' ? 'Expected return pattern only; not a safety verdict' : 'Unexpected pattern: stop and investigate', limitation: 'eth_call reports return/revert, not asset deltas, authenticity, signing policy or future execution' };
}

export function fixtureRpc({ positive = 'true', excessive = 'revert', chain = '0xaa36a7', changedHash = false } = {}) {
  const calls = []; let transfers = 0, hashes = 0;
  const rpc = async (method, params) => {
    assert.ok(ALLOWED.has(method)); calls.push({ method, params });
    if (method === 'eth_chainId') return chain;
    if (method === 'eth_blockNumber') return '0x100';
    if (method === 'eth_getBlockByNumber') return { number: '0x100', hash: '0x' + (changedHash && ++hashes > 1 ? '22' : '11').repeat(32) };
    if (method === 'eth_getCode') return '0x6000';
    assert.equal(params[1], '0x100');
    if (params[0].input.startsWith('0x70a08231')) return '0x' + uint(10n);
    assert.equal(params[0].value, '0x0');
    const outcome = ++transfers === 1 ? positive : excessive;
    if (outcome === 'revert') { const e = new Error('Fixture revert'); e.rpcCode = 3; throw e; }
    if (outcome === 'error') throw new Error('Fixture provider failure');
    if (outcome === 'empty') return '0x';
    return '0x' + uint(outcome === 'true' ? 1n : 0n);
  };
  return { rpc, calls };
}
export const fixtureConfig = { token: '0x' + '11'.repeat(20), from: '0x' + '22'.repeat(20), recipient: '0x' + '33'.repeat(20), amount: 1n };
export async function offline() {
  const { rpc, calls } = fixtureRpc();
  const report = await inspectTransfer(rpc, fixtureConfig);
  assert.equal(report.intended.kind, 'returned-true'); assert.equal(report.excessive.kind, 'execution-reverted');
  assert.ok(calls.every(call => ALLOWED.has(call.method)));
  return { mode: 'OFFLINE FIXTURE - no EVM execution and no network request', ...report };
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const args = process.argv.slice(2);
    if (args.length === 0 || (args.length === 1 && args[0] === '--offline')) console.log(JSON.stringify(await offline(), null, 2));
    else if (args.length === 1 && args[0] === '--live') {
      const { SEPOLIA_RPC_URL, LAB_TOKEN, LAB_FROM, LAB_RECIPIENT, LAB_AMOUNT_BASE_UNITS } = process.env;
      if (!SEPOLIA_RPC_URL || !/^[1-9][0-9]*$/.test(LAB_AMOUNT_BASE_UNITS || '') || LAB_AMOUNT_BASE_UNITS.length > 78) throw new Error('Set RPC URL, three reviewed test addresses and positive integer base units');
      console.log(JSON.stringify(await inspectTransfer(makeRpc(SEPOLIA_RPC_URL), { token: LAB_TOKEN, from: LAB_FROM, recipient: LAB_RECIPIENT, amount: BigInt(LAB_AMOUNT_BASE_UNITS) }), null, 2));
    } else throw new Error('Use --offline or --live only');
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
