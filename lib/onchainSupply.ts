export const onchainSupplyContracts = [
  {
    id: "usdc-ethereum",
    symbol: "USDC",
    issuer: "Circle",
    network: "Ethereum",
    chainId: 1,
    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    rpc: "https://ethereum-rpc.publicnode.com",
    source: "https://docs-w3s-node-sdk.circle.com/variables/index.ETH.html",
    explorer: "https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    decimals: 6
  },
  {
    id: "usdc-base",
    symbol: "USDC",
    issuer: "Circle",
    network: "Base",
    chainId: 8453,
    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    rpc: "https://base-rpc.publicnode.com",
    source: "https://www.circle.com/blog/usdc-now-available-natively-on-base",
    explorer: "https://basescan.org/token/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    decimals: 6
  },
  {
    id: "pyusd-ethereum",
    symbol: "PYUSD",
    issuer: "Paxos / PayPal",
    network: "Ethereum",
    chainId: 1,
    address: "0x6c3ea9036406852006290770BEdFcAbA0e23A0e8",
    rpc: "https://ethereum-rpc.publicnode.com",
    source: "https://www.paypal.com/sg/cshelp/article/what-is-paypal-usd-pyusd-help1005",
    explorer: "https://etherscan.io/token/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8",
    decimals: 6
  }
] as const;

export type OnchainSupplyObservation = {
  asset_id: string;
  day: string;
  chain_id: number;
  contract_address: string;
  raw_supply: string;
  decimals: number;
  block_number: number;
  block_timestamp: number;
  observed_at: string;
};

export function wholeUnits(rawSupply: string, decimals: number): bigint {
  return BigInt(rawSupply) / BigInt(10) ** BigInt(decimals);
}

export function changePercent(current: string, previous: string): number | null {
  const before = BigInt(previous);
  if (before === BigInt(0)) return null;
  const basisPoints = ((BigInt(current) - before) * BigInt(10000)) / before;
  return Number(basisPoints) / 100;
}

export function comparisonForDays(observations: OnchainSupplyObservation[], days: number): number | null {
  if (observations.length < 2) return null;
  const current = observations.at(-1)!;
  const target = Date.parse(`${current.day}T00:00:00Z`) - days * 86400000;
  const prior = [...observations].reverse().find(row => {
    const timestamp = Date.parse(`${row.day}T00:00:00Z`);
    return timestamp <= target && timestamp >= target - 86400000;
  });
  return prior ? changePercent(current.raw_supply, prior.raw_supply) : null;
}
