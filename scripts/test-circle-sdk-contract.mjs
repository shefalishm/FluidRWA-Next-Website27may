import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { generateKeyPairSync } from 'node:crypto';
import { createRequire } from 'node:module';
import { runLab, CHAIN, USDC } from '../public/learn-assets/circle-wallet-lab.mjs';

// Supply the temporary SDK project's package.json; no repo dependency is needed.
const requireSdk = createRequire(process.argv[2]);
const { initiateDeveloperControlledWalletsClient } = requireSdk('@circle-fin/developer-controlled-wallets');
const { version } = requireSdk('@circle-fin/developer-controlled-wallets/package.json');
const { publicKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
const pem = publicKey.export({ type: 'spki', format: 'pem' });
const calls = [];
const wallets = [1, 2].map(n => ({ id: `mock-${n}`, address: `0x${String(n).repeat(40)}`, blockchain: CHAIN, accountType: 'EOA' }));
const server = createServer(async (req, res) => {
  let raw = '';
  for await (const chunk of req) raw += chunk;
  const body = raw ? JSON.parse(raw) : {};
  calls.push({ url: req.url, method: req.method, body });
  let data;
  if (req.url.endsWith('/publicKey')) data = { publicKey: pem };
  else if (req.url.endsWith('/walletSets')) data = { walletSet: { id: 'mock-set' } };
  else if (req.method === 'POST' && req.url.endsWith('/wallets')) data = { wallets };
  else if (req.method === 'POST' && req.url.endsWith('/transactions/transfer')) data = { id: 'mock-tx', state: 'INITIATED' };
  else if (req.url.endsWith('/transactions/mock-tx')) data = { transaction: { id: 'mock-tx', state: 'COMPLETE', txHash: 'mock-hash' } };
  else if (req.url.includes('/balances')) data = { tokenBalances: [{ amount: '1', token: { tokenAddress: USDC, blockchain: CHAIN, symbol: 'USDC', isNative: false } }] };
  else { res.writeHead(404); res.end('{}'); return; }
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ data }));
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
try {
  const client = initiateDeveloperControlledWalletsClient({ apiKey: 'TEST_API_KEY:mock:mock', entitySecret: 'a'.repeat(64), baseUrl: `http://127.0.0.1:${server.address().port}` });
  const state = { chain: CHAIN };
  const options = { log: () => {}, sleep: async () => {} };
  for (const command of ['create', 'balances', 'send', 'status']) await runLab(command, client, state, () => {}, options);
  const transfer = calls.find(c => c.url.endsWith('/transactions/transfer'));
  assert.ok(transfer, 'SDK made transfer request');
  assert.equal(transfer.body.destinationAddress, wallets[1].address);
  assert.equal(transfer.body.tokenAddress, USDC);
  assert.equal(transfer.body.blockchain, CHAIN);
  assert.deepEqual(transfer.body.amounts, ['1'], 'SDK maps amount to wire amounts');
  assert.equal(transfer.body.feeLevel, 'MEDIUM');
  assert.ok(transfer.body.entitySecretCiphertext && transfer.body.entitySecretCiphertext !== 'a'.repeat(64));
  assert.equal(state.transfer.id, 'mock-tx');
  console.log(`PASS: Circle SDK ${version} against localhost mock transport: wallet set, two EOAs, balances, transfer serialization/encryption and COMPLETE response. No Circle API called.`);
} finally {
  await new Promise(resolve => server.close(resolve));
}
