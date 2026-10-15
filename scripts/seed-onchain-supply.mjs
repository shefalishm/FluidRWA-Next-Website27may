import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { onchainSupplyContracts } from '../lib/onchainSupply.ts';

const sqlString = value => `'${String(value).replaceAll("'", "''")}'`;

async function rpc(url, method, params) {
  const response = await fetch(url, {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
    signal: AbortSignal.timeout(10000)
  });
  if (!response.ok) throw new Error(`${method} HTTP ${response.status}`);
  const payload = await response.json();
  if (payload.error || !payload.result) throw new Error(`${method}: ${payload.error?.message || 'missing result'}`);
  return payload.result;
}

const day = new Date().toISOString().slice(0, 10);
const rows = [];
for (const contract of onchainSupplyContracts) {
  const blockHex = await rpc(contract.rpc, 'eth_blockNumber', []);
  const [block, supplyHex, decimalsHex] = await Promise.all([
    rpc(contract.rpc, 'eth_getBlockByNumber', [blockHex, false]),
    rpc(contract.rpc, 'eth_call', [{ to: contract.address, data: '0x18160ddd' }, blockHex]),
    rpc(contract.rpc, 'eth_call', [{ to: contract.address, data: '0x313ce567' }, blockHex])
  ]);
  const timestamp = Number(BigInt(block.timestamp));
  const decimals = Number(BigInt(decimalsHex));
  const supply = BigInt(supplyHex).toString();
  if (decimals !== contract.decimals || timestamp < Date.now() / 1000 - 7200 || BigInt(supply) <= BigInt(0)) {
    throw new Error(`Invalid block, decimals or supply for ${contract.id}`);
  }
  rows.push(`INSERT OR IGNORE INTO onchain_supply_observations
    (asset_id, day, chain_id, contract_address, raw_supply, decimals, block_number, block_timestamp, observed_at)
    VALUES (${sqlString(contract.id)}, ${sqlString(day)}, ${contract.chainId}, ${sqlString(contract.address)},
    ${sqlString(supply)}, ${decimals}, ${Number(BigInt(blockHex))}, ${timestamp}, ${sqlString(new Date().toISOString())});`);
  console.log(`${contract.id}: block ${Number(BigInt(blockHex))}, ${supply} raw units`);
}

const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'fluidrwa-supply-'));
const file = path.join(directory, 'seed.sql');
fs.writeFileSync(file, rows.join('\n'));
execFileSync('npx', ['wrangler', 'd1', 'execute', 'fluidrwa-network-intelligence', '--remote', `--file=${file}`], { stdio: 'inherit' });
