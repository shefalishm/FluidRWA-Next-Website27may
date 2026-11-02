import assert from 'node:assert/strict';
import { credentials, validateWallets, runLab, CHAIN, USDC } from '../public/learn-assets/circle-wallet-lab.mjs';

assert.throws(() => credentials({}), /TEST_API_KEY/);
assert.throws(() => credentials({ CIRCLE_API_KEY: 'LIVE_API_KEY:mock:mock' }), /TEST_API_KEY/);
assert.throws(() => credentials({ CIRCLE_API_KEY: 'TEST_API_KEY:mock:mock', CIRCLE_ENTITY_SECRET: 'bad' }), /64-hex/);
const wallets = [1, 2].map(n => ({ id: `mock-wallet-${n}`, address: `0x${String(n).repeat(40)}`, blockchain: CHAIN, accountType: 'EOA' }));
assert.throws(() => validateWallets([wallets[0], wallets[0]]), /distinct/);
assert.throws(() => validateWallets(wallets.map(w => ({ ...w, blockchain: 'ETH' }))), /ETH-SEPOLIA/);
const state = { chain: CHAIN };
const saved = [];
const log = [];
let sets = 0, creates = 0, sends = 0, polls = 0;
const client = {
  async createWalletSet(input) { sets++; assert.ok(input.idempotencyKey); return { data: { walletSet: { id: 'mock-set' } } }; },
  async createWallets(input) { creates++; assert.equal(input.count, 2); assert.equal(input.blockchains[0], CHAIN); return { data: { wallets } }; },
  async createTransaction(input) { sends++; assert.equal(input.tokenAddress, USDC); assert.deepEqual(input.amount, ['1']); assert.equal(input.blockchain, CHAIN); return { data: { id: 'mock-tx' } }; },
  async getTransaction() { polls++; return { data: { transaction: { state: polls === 1 ? 'SENT' : 'COMPLETE', txHash: 'mock-hash' } } }; },
  async getWalletTokenBalance() { return { data: { tokenBalances: [] } }; }
};
const save = value => saved.push(structuredClone(value));
const options = { log: value => log.push(value), sleep: async () => {} };
await runLab('create', client, state, save, options);
await runLab('create', client, state, save, options);
assert.equal(sets, 1); assert.equal(creates, 1);
await runLab('send', client, state, save, options);
await runLab('send', client, state, save, options);
assert.equal(sends, 1);
assert.ok(saved.some(s => s.transfer?.key && !s.transfer.id), 'intent saved before submission');
await runLab('status', client, state, save, options);
assert.equal(polls, 2);
await runLab('balances', client, state, save, options);
for (const terminal of ['FAILED', 'CANCELLED', 'DENIED']) {
  await assert.rejects(runLab('status', { getTransaction: async () => ({ data: { transaction: { state: terminal } } }) }, state, save, options), /Terminal state/);
}
await assert.rejects(runLab('status', { getTransaction: async () => ({ data: { transaction: { state: 'SENT' } } }) }, state, save, { ...options, maxPolls: 2 }), /outcome unknown/);
await assert.rejects(runLab('balances', { getWalletTokenBalance: async () => ({}) }, state, save, options), /Do not infer zero/);
const uncertain = { chain: CHAIN, wallets };
let firstKey;
const retryClient = { async createTransaction(input) {
  if (!firstKey) { firstKey = input.idempotencyKey; throw new Error('mock response lost'); }
  assert.equal(input.idempotencyKey, firstKey);
  return { data: { id: 'mock-recovered-tx' } };
} };
await assert.rejects(runLab('send', retryClient, uncertain, save, options), /response lost/);
await runLab('send', retryClient, uncertain, save, options);
assert.equal(uncertain.transfer.id, 'mock-recovered-tx');
uncertain.wallets = [...wallets].reverse();
await assert.rejects(runLab('send', retryClient, uncertain, save, options), /differs/);
console.log('PASS: local Circle guards, mock creation, saved intent, lost-response key reuse, duplicate send protection, balances, terminal states and bounded polling. No network calls or assets used.');
