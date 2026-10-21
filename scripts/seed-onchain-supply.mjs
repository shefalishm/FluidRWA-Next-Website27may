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
const requestedId = process.argv[2];
const selectedContracts = requestedId ? onchainSupplyContracts.filter(contract => contract.id === requestedId) : onchainSupplyContracts;
if (!selectedContracts.length) throw new Error(`Unknown contract ID: ${requestedId}`);
for (const contract of selectedContracts) {
  const endpoints = [contract.rpc, contract.fallbackRpc].filter(Boolean);
  let reading;
  for (const endpoint of endpoints) {
    try {
      const chainId = await rpc(endpoint, 'eth_chainId', []);
      if (Number(BigInt(chainId)) !== contract.chainId) throw new Error('chain ID mismatch');
      const blockHex = await rpc(endpoint, 'eth_blockNumber', []);
      const block = await rpc(endpoint, 'eth_getBlockByNumber', [blockHex, false]);
      const timestamp = Number(BigInt(block.timestamp));
      if (Math.abs(Date.now() / 1000 - timestamp) > 7200) throw new Error('stale block');
      const supplyHex = await rpc(endpoint, 'eth_call', [{ to: contract.address, data: '0x18160ddd' }, blockHex]);
      const decimalsHex = await rpc(endpoint, 'eth_call', [{ to: contract.address, data: '0x313ce567' }, blockHex]);
      const decimals = Number(BigInt(decimalsHex));
      const supply = BigInt(supplyHex).toString();
      if (decimals !== contract.decimals || BigInt(supply) <= BigInt(0)) throw new Error('decimals or supply mismatch');
      reading = { blockHex, timestamp, decimals, supply };
      break;
    } catch (error) {
      console.warn(`${contract.id}: ${new URL(endpoint).hostname} failed: ${error.message}`);
    }
  }
  if (!reading) throw new Error(`No verified reading for ${contract.id}`);
  const { blockHex, timestamp, decimals, supply } = reading;
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
