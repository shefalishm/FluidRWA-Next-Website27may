import { readFileSync, writeFileSync, existsSync, renameSync, openSync, closeSync, unlinkSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { pathToFileURL } from 'node:url';

export const CHAIN = 'ETH-SEPOLIA';
export const USDC = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238';
const STATE_FILE = 'lab-state.json';

export function credentials(env) {
  if (!env.CIRCLE_API_KEY?.startsWith('TEST_API_KEY:') || env.CIRCLE_API_KEY.includes('YOUR_')) {
    throw new Error('A Circle TEST_API_KEY is required; no API call made.');
  }
  if (!/^[a-f0-9]{64}$/i.test(env.CIRCLE_ENTITY_SECRET || '')) {
    throw new Error('A registered 64-hex-character entity secret is required.');
  }
  return { apiKey: env.CIRCLE_API_KEY, entitySecret: env.CIRCLE_ENTITY_SECRET };
}

export function validateWallets(wallets) {
  if (wallets?.length !== 2 || wallets.some(w => !w.id || w.blockchain !== CHAIN ||
      w.accountType !== 'EOA' || !/^0x[0-9a-f]{40}$/i.test(w.address))) {
    throw new Error('Expected exactly two ETH-SEPOLIA EOA wallets. Reconcile in Console.');
  }
  if (wallets[0].id === wallets[1].id || wallets[0].address.toLowerCase() === wallets[1].address.toLowerCase()) {
    throw new Error('Sender and recipient must be distinct.');
  }
  return wallets;
}

export async function runLab(command, client, state, save, options = {}) {
  const sleep = options.sleep || (ms => new Promise(resolve => setTimeout(resolve, ms)));
  const log = options.log || console.log;
  const maxPolls = options.maxPolls ?? 40;
  if (state.chain !== CHAIN) throw new Error('State chain mismatch; stop and reconcile.');
  if (command === 'create') {
    state.setKey ||= randomUUID();
    state.walletsKey ||= randomUUID();
    save(state);
    if (!state.walletSetId) {
      const response = await client.createWalletSet({ name: 'FluidRWA Sepolia lab', idempotencyKey: state.setKey });
      state.walletSetId = response.data?.walletSet?.id;
      if (!state.walletSetId) throw new Error('No wallet set ID returned. Reconcile before retrying.');
      save(state);
    }
    if (!state.wallets) {
      const response = await client.createWallets({ walletSetId: state.walletSetId,
        blockchains: [CHAIN], count: 2, accountType: 'EOA', idempotencyKey: state.walletsKey });
      state.wallets = validateWallets(response.data?.wallets).map(w => ({
        id: w.id, address: w.address, blockchain: w.blockchain, accountType: w.accountType
      }));
      save(state);
    }
    log(validateWallets(state.wallets));
    return;
  }
  const [a, b] = validateWallets(state.wallets);
  if (command === 'balances') {
    for (const [label, wallet] of [['A', a], ['B', b]]) {
      const response = await client.getWalletTokenBalance({ id: wallet.id });
      const rows = response.data?.tokenBalances;
      if (!Array.isArray(rows)) throw new Error('No balance array returned. Do not infer zero.');
      // Print only public balance fields, never the SDK response/request object.
      log({ wallet: label, address: wallet.address, balances: rows.map(row => ({
        amount: row.amount, symbol: row.token?.symbol, address: row.token?.tokenAddress,
        blockchain: row.token?.blockchain, native: row.token?.isNative
      })) });
    }
    return;
  }
  if (command === 'send') {
    const intended = { blockchain: CHAIN, walletAddress: a.address, tokenAddress: USDC,
      destinationAddress: b.address, amount: ['1'], fee: { type: 'level', config: { feeLevel: 'MEDIUM' } } };
    if (state.transfer && JSON.stringify(state.transfer.request) !== JSON.stringify(intended)) {
      throw new Error('Saved transfer differs from current wallets. Stop and reconcile.');
    }
    if (!state.transfer) {
      state.transfer = { key: randomUUID(), request: intended };
      save(state);
    }
    if (!state.transfer.id) {
      const response = await client.createTransaction({ ...state.transfer.request, idempotencyKey: state.transfer.key });
      if (!response.data?.id) throw new Error('No transaction ID. Preserve state and reconcile in Console.');
      state.transfer.id = response.data.id;
      save(state);
    }
    log({ transactionId: state.transfer.id, next: 'Run status; do not create another transfer.' });
    return;
  }
  if (command === 'status') {
    if (!state.transfer?.id) throw new Error('No transaction ID. Reconcile submission before sending again.');
    for (let poll = 0; poll < maxPolls; poll++) {
      const response = await client.getTransaction({ id: state.transfer.id });
      const tx = response.data?.transaction;
      if (!tx?.state) throw new Error('Missing transaction state; outcome unknown.');
      log({ id: state.transfer.id, state: tx.state, hash: tx.txHash });
      if (tx.state === 'COMPLETE') return;
      if (['FAILED', 'CANCELLED', 'DENIED'].includes(tx.state)) {
        throw new Error(`Terminal state ${tx.state}; reconcile before any new attempt.`);
      }
      await sleep(3000);
    }
    throw new Error('Polling timed out; outcome unknown. Run status later, not a new transfer.');
  }
  throw new Error('Use create, balances, send or status.');
}

async function main() {
  const command = process.argv[2];
  if (!['create', 'balances', 'send', 'status'].includes(command)) {
    throw new Error('Usage: node --env-file=.env circle-wallet-lab.mjs create|balances|send|status');
  }
  const auth = credentials(process.env);
  const { initiateDeveloperControlledWalletsClient } = await import('@circle-fin/developer-controlled-wallets');
  const client = initiateDeveloperControlledWalletsClient(auth);
  const lock = openSync(`${STATE_FILE}.lock`, 'wx', 0o600);
  try {
    const state = existsSync(STATE_FILE) ? JSON.parse(readFileSync(STATE_FILE, 'utf8')) : { chain: CHAIN };
    const save = value => {
      writeFileSync(`${STATE_FILE}.tmp`, JSON.stringify(value, null, 2) + '\n', { mode: 0o600 });
      renameSync(`${STATE_FILE}.tmp`, STATE_FILE);
    };
    await runLab(command, client, state, save);
  } finally {
    closeSync(lock);
    unlinkSync(`${STATE_FILE}.lock`);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(() => {
    // SDK errors can carry authorization headers. Never dump the error object.
    console.error('Lab stopped. Keep lab-state.json; check the command, test configuration and Console. No automatic new payment was attempted.');
    process.exitCode = 1;
  });
}
