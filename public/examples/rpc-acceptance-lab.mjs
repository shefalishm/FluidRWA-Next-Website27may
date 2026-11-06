import { pathToFileURL } from 'node:url';

const quantity = x => {
  if (typeof x !== 'string' || !/^0x(?:0|[1-9a-f][0-9a-f]*)$/.test(x)) throw new Error('Invalid RPC quantity');
  return BigInt(x);
};
const hash = x => typeof x === 'string' && /^0x[0-9a-f]{64}$/.test(x);
export async function inspect(rpc, now = Math.floor(Date.now() / 1000)) {
  if (await rpc('eth_chainId', []) !== '0xaa36a7') throw new Error('Not Ethereum Sepolia');
  const head = await rpc('eth_getBlockByNumber', ['latest', false]);
  if (!head || !hash(head.hash)) throw new Error('Missing head');
  const number = quantity(head.number);
  const age = BigInt(now) - quantity(head.timestamp);
  if (age < -30n || age > 300n) throw new Error('Head outside lab freshness window');
  const finalized = await rpc('eth_getBlockByNumber', ['finalized', false]);
  if (!finalized || !hash(finalized.hash)) throw new Error('Invalid finalized observation');
  const finalizedNumber = quantity(finalized.number);
  if (finalizedNumber > number || (finalizedNumber === number && finalized.hash !== head.hash)) throw new Error('Invalid finalized observation');
  const repeat = await rpc('eth_getBlockByNumber', [head.number, false]);
  if (!repeat || repeat.number !== head.number || repeat.hash !== head.hash || repeat.timestamp !== head.timestamp) throw new Error('Snapshot changed');
  if (await rpc('eth_chainId', []) !== '0xaa36a7') throw new Error('Chain changed');
  return { network: 'Ethereum Sepolia', head: head.number, headHash: head.hash, ageSeconds: age.toString(), finalized: finalized.number, finalizedHash: finalized.hash, result: 'Checks matched; not independent proof of chain truth' };
}
export function fixture(now = 1800000000) {
  const block = { number: '0x100', timestamp: '0x' + (now - 12).toString(16), hash: '0x' + 'ab'.repeat(32) };
  return async (method, params) => method === 'eth_chainId' ? '0xaa36a7' : params[0] === 'finalized' ? { ...block, number: '0xf0', hash: '0x' + 'cd'.repeat(32) } : { ...block };
}
export function transport(endpoint, fetcher = fetch) {
  const url = new URL(endpoint);
  if (url.protocol !== 'https:' || url.username || url.password || url.hash) throw new Error('Use an authorized HTTPS endpoint without userinfo or fragment');
  let id = 0;
  return async (method, params) => {
    if (!['eth_chainId', 'eth_getBlockByNumber'].includes(method)) throw new Error('Method not allowed');
    const requestId = ++id;
    const response = await fetcher(url, { method: 'POST', redirect: 'error', signal: AbortSignal.timeout(10000), headers: { 'content-type': 'application/json' }, body: JSON.stringify({ jsonrpc: '2.0', id: requestId, method, params }) });
    if (!response.ok) throw new Error('RPC HTTP failure');
    const body = await response.json();
    if (!body || body.jsonrpc !== '2.0' || body.id !== requestId || Object.hasOwn(body, 'error') || !Object.hasOwn(body, 'result')) throw new Error('RPC response rejected');
    return body.result;
  };
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const mode = process.argv[2] || '--offline';
    if (!['--offline', '--live'].includes(mode)) throw new Error('Use --offline or --live');
    const live = mode === '--live';
    const result = await inspect(live ? transport(process.env.SEPOLIA_RPC_URL) : fixture(), live ? undefined : 1800000000);
    console.log(JSON.stringify({ mode: live ? 'READ ONLY RPC' : 'AUTHORED OFFLINE FIXTURE', ...result }, null, 2));
  } catch { console.error('Lab stopped: input, freshness, consistency or provider check failed. Endpoint details omitted.'); process.exitCode = 1; }
}
