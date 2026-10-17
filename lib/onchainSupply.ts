export const onchainSupplyContracts = [
  {
    id: "usdc-ethereum",
    symbol: "USDC",
    assetClass: "Stablecoin",
    issuer: "Circle",
    network: "Ethereum",
    chainId: 1,
    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    rpc: "https://ethereum-rpc.publicnode.com",
    fallbackRpc: "https://eth.drpc.org/",
    source: "https://docs-w3s-node-sdk.circle.com/variables/index.ETH.html",
    explorer: "https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    decimals: 6
  },
  {
    id: "usdc-base",
    symbol: "USDC",
    assetClass: "Stablecoin",
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
    assetClass: "Stablecoin",
    issuer: "Paxos / PayPal",
    network: "Ethereum",
    chainId: 1,
    address: "0x6c3ea9036406852006290770BEdFcAbA0e23A0e8",
    rpc: "https://ethereum-rpc.publicnode.com",
    fallbackRpc: "https://eth.drpc.org/",
    source: "https://www.paypal.com/sg/cshelp/article/what-is-paypal-usd-pyusd-help1005",
    explorer: "https://etherscan.io/token/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8",
    decimals: 6
  },
  {
    id: "usdc-arbitrum",
    symbol: "USDC",
    assetClass: "Stablecoin",
    issuer: "Circle",
    network: "Arbitrum",
    chainId: 42161,
    address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    rpc: "https://arbitrum-one-rpc.publicnode.com",
    source: "https://www.circle.com/blog/usdc-on-arbitrum-now-available",
    explorer: "https://arbiscan.io/token/0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    decimals: 6
  },
  {
    id: "usdt-ethereum",
    symbol: "USDT",
    assetClass: "Stablecoin",
    issuer: "Tether",
    network: "Ethereum",
    chainId: 1,
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    rpc: "https://ethereum-rpc.publicnode.com",
    fallbackRpc: "https://eth.drpc.org/",
    source: "https://tether.to/en/supported-protocols/",
    explorer: "https://etherscan.io/token/0xdAC17F958D2ee523a2206206994597C13D831ec7",
    decimals: 6
  },
  {
    id: "eurc-base",
    symbol: "EURC",
    assetClass: "Stablecoin",
    issuer: "Circle",
    network: "Base",
    chainId: 8453,
    address: "0x60a3e35cc302bfa44cb288bc5a4f316fdb1adb42",
    rpc: "https://base-rpc.publicnode.com",
    source: "https://www.circle.com/blog/eurc-is-coming-to-base",
    explorer: "https://basescan.org/token/0x60a3e35cc302bfa44cb288bc5a4f316fdb1adb42",
    decimals: 6
  },
  {
    id: "xaut-ethereum",
    symbol: "XAUt",
    assetClass: "Tokenized gold",
    issuer: "Tether",
    network: "Ethereum",
    chainId: 1,
    address: "0x68749665FF8D2d112Fa859AA293F07A622782F38",
    rpc: "https://ethereum-rpc.publicnode.com",
    fallbackRpc: "https://eth.drpc.org/",
    source: "https://tether.to/en/supported-protocols/",
    explorer: "https://etherscan.io/token/0x68749665FF8D2d112Fa859AA293F07A622782F38",
    decimals: 6
  },
  {
    id: "usdy-ethereum",
    symbol: "USDY",
    assetClass: "Tokenized note",
    issuer: "Ondo Finance",
    network: "Ethereum",
    chainId: 1,
    address: "0x96F6eF951840721AdBF46Ac996b59E0235CB985C",
    rpc: "https://ethereum-rpc.publicnode.com",
    fallbackRpc: "https://eth.drpc.org/",
    source: "https://ondo.finance/usdy",
    explorer: "https://etherscan.io/token/0x96F6eF951840721AdBF46Ac996b59E0235CB985C",
    decimals: 18
  },
  {
    id: "paxg-ethereum",
    symbol: "PAXG",
    assetClass: "Tokenized gold",
    issuer: "Paxos",
    network: "Ethereum",
    chainId: 1,
    address: "0x45804880De22913dAFE09f4980848ECE6EcbAf78",
    rpc: "https://ethereum-rpc.publicnode.com",
    fallbackRpc: "https://eth.drpc.org/",
    source: "https://paxos.com/wp-content/uploads/2019/09/PAX-Gold-Whitepaper.pdf",
    explorer: "https://etherscan.io/token/0x45804880De22913dAFE09f4980848ECE6EcbAf78",
    decimals: 18
  },
  {
    id: "ustb-ethereum",
    symbol: "USTB",
    assetClass: "Tokenized fund",
    issuer: "Invesco / Superstate",
    network: "Ethereum",
    chainId: 1,
    address: "0x43415eB6ff9DB7E26A15b704e7A3eDCe97d31C4e",
    rpc: "https://ethereum-rpc.publicnode.com",
    fallbackRpc: "https://eth.drpc.org/",
    source: "https://superstate.com/assets/ustb",
    explorer: "https://etherscan.io/token/0x43415eB6ff9DB7E26A15b704e7A3eDCe97d31C4e",
    decimals: 6
  },
  {
    id: "uscc-ethereum",
    symbol: "USCC",
    assetClass: "Tokenized fund",
    issuer: "Bitwise / Superstate",
    network: "Ethereum",
    chainId: 1,
    address: "0x14d60E7FDC0D71d8611742720E4C50E7a974020c",
    rpc: "https://ethereum-rpc.publicnode.com",
    fallbackRpc: "https://eth.drpc.org/",
    source: "https://superstate.com/assets/uscc",
    explorer: "https://etherscan.io/token/0x14d60E7FDC0D71d8611742720E4C50E7a974020c",
    decimals: 6
  },
  {
    id: "vbdc-ethereum",
    symbol: "VBDC",
    assetClass: "Tokenized fund",
    issuer: "Valinor / Superstate",
    network: "Ethereum",
    chainId: 1,
    address: "0xA4E0Ac02de99e23C76480dD75e55894fD74cDECF",
    rpc: "https://ethereum-rpc.publicnode.com",
    fallbackRpc: "https://eth.drpc.org/",
    source: "https://superstate.com/assets/vbdc",
    explorer: "https://etherscan.io/token/0xA4E0Ac02de99e23C76480dD75e55894fD74cDECF",
    decimals: 6
  },
  {
    id: "ustb-plume",
    symbol: "USTB",
    assetClass: "Tokenized fund",
    issuer: "Invesco / Superstate",
    network: "Plume",
    chainId: 98866,
    address: "0xE4fA682f94610cCd170680cc3B045d77D9E528a8",
    rpc: "https://rpc.plume.org",
    source: "https://superstate.com/assets/ustb",
    explorer: "https://explorer.plume.org/address/0xE4fA682f94610cCd170680cc3B045d77D9E528a8",
    decimals: 6
  },
  {
    id: "uscc-plume",
    symbol: "USCC",
    assetClass: "Tokenized fund",
    issuer: "Bitwise / Superstate",
    network: "Plume",
    chainId: 98866,
    address: "0x4c21B7577C8FE8b0B0669165ee7C8f67fa1454Cf",
    rpc: "https://rpc.plume.org",
    source: "https://superstate.com/assets/uscc",
    explorer: "https://explorer.plume.org/address/0x4c21B7577C8FE8b0B0669165ee7C8f67fa1454Cf",
    decimals: 6
  },
  {
    id: "usdy-arbitrum",
    symbol: "USDY",
    assetClass: "Tokenized note",
    issuer: "Ondo Finance",
    network: "Arbitrum",
    chainId: 42161,
    address: "0x35e050d3C0eC2d29D269a8EcEa763a183bDF9A9D",
    rpc: "https://arbitrum-one-rpc.publicnode.com",
    source: "https://ondo.finance/usdy",
    explorer: "https://arbiscan.io/token/0x35e050d3C0eC2d29D269a8EcEa763a183bDF9A9D",
    decimals: 18
  },
  {
    id: "rlusd-ethereum",
    symbol: "RLUSD",
    assetClass: "Stablecoin",
    issuer: "Ripple",
    network: "Ethereum",
    chainId: 1,
    address: "0x8292bb45bf1ee4d140127049757c2e0ff06317ed",
    rpc: "https://ethereum-rpc.publicnode.com",
    fallbackRpc: "https://eth.drpc.org/",
    source: "https://docs.ripple.com/products/stablecoin/overview/token-addresses",
    explorer: "https://etherscan.io/token/0x8292bb45bf1ee4d140127049757c2e0ff06317ed",
    decimals: 18
  },
  {
    id: "aaplon-ethereum",
    symbol: "AAPLon",
    assetClass: "Tokenized security",
    referenceAsset: "Apple",
    issuer: "Ondo Finance",
    network: "Ethereum",
    chainId: 1,
    address: "0x14c3abF95Cb9C93a8b82C1CdCB76D72Cb87b2d4c",
    rpc: "https://ethereum-rpc.publicnode.com",
    fallbackRpc: "https://eth.drpc.org/",
    source: "https://github.com/ondoprotocol/ondo-global-markets-token-list/blob/f5a82fca4b2a81aa8fc1ce65b8982f36d6cd40f4/tokenlist.json",
    explorer: "https://etherscan.io/token/0x14c3abF95Cb9C93a8b82C1CdCB76D72Cb87b2d4c",
    decimals: 18
  },
  {
    id: "nvdaon-ethereum",
    symbol: "NVDAon",
    assetClass: "Tokenized security",
    referenceAsset: "NVIDIA",
    issuer: "Ondo Finance",
    network: "Ethereum",
    chainId: 1,
    address: "0x2D1F7226Bd1F780AF6B9A49DCC0aE00E8Df4bDEE",
    rpc: "https://ethereum-rpc.publicnode.com",
    fallbackRpc: "https://eth.drpc.org/",
    source: "https://github.com/ondoprotocol/ondo-global-markets-token-list/blob/f5a82fca4b2a81aa8fc1ce65b8982f36d6cd40f4/tokenlist.json",
    explorer: "https://etherscan.io/token/0x2D1F7226Bd1F780AF6B9A49DCC0aE00E8Df4bDEE",
    decimals: 18
  },
  {
    id: "spyon-ethereum",
    symbol: "SPYon",
    assetClass: "Tokenized security",
    referenceAsset: "SPDR S&P 500 ETF",
    issuer: "Ondo Finance",
    network: "Ethereum",
    chainId: 1,
    address: "0xFeDC5f4a6c38211c1338aa411018DFAf26612c08",
    rpc: "https://ethereum-rpc.publicnode.com",
    fallbackRpc: "https://eth.drpc.org/",
    source: "https://github.com/ondoprotocol/ondo-global-markets-token-list/blob/f5a82fca4b2a81aa8fc1ce65b8982f36d6cd40f4/tokenlist.json",
    explorer: "https://etherscan.io/token/0xFeDC5f4a6c38211c1338aa411018DFAf26612c08",
    decimals: 18
  },
  {
    id: "aaplx-ethereum",
    symbol: "AAPLx",
    assetClass: "Tokenized security",
    referenceAsset: "Apple",
    issuer: "Backed Assets (JE) Limited",
    network: "Ethereum",
    chainId: 1,
    address: "0x9d275685dc284c8eb1c79f6aba7a63dc75ec890a",
    rpc: "https://ethereum-rpc.publicnode.com",
    fallbackRpc: "https://eth.drpc.org/",
    source: "https://github.com/backed-fi/cowswap-xstocks-tokenlist/blob/401edae9acf8e14152825864b974635e802ac948/tokenlist.json",
    explorer: "https://etherscan.io/token/0x9d275685dc284c8eb1c79f6aba7a63dc75ec890a",
    decimals: 18
  },
  {
    id: "nvdax-ethereum",
    symbol: "NVDAx",
    assetClass: "Tokenized security",
    referenceAsset: "NVIDIA",
    issuer: "Backed Assets (JE) Limited",
    network: "Ethereum",
    chainId: 1,
    address: "0xc845b2894dbddd03858fd2d643b4ef725fe0849d",
    rpc: "https://ethereum-rpc.publicnode.com",
    fallbackRpc: "https://eth.drpc.org/",
    source: "https://github.com/backed-fi/cowswap-xstocks-tokenlist/blob/401edae9acf8e14152825864b974635e802ac948/tokenlist.json",
    explorer: "https://etherscan.io/token/0xc845b2894dbddd03858fd2d643b4ef725fe0849d",
    decimals: 18
  },
  {
    id: "spyx-ethereum",
    symbol: "SPYx",
    assetClass: "Tokenized security",
    referenceAsset: "SPDR S&P 500 ETF",
    issuer: "Backed Assets (JE) Limited",
    network: "Ethereum",
    chainId: 1,
    address: "0x90a2a4c76b5d8c0bc892a69ea28aa775a8f2dd48",
    rpc: "https://ethereum-rpc.publicnode.com",
    fallbackRpc: "https://eth.drpc.org/",
    source: "https://github.com/backed-fi/cowswap-xstocks-tokenlist/blob/401edae9acf8e14152825864b974635e802ac948/tokenlist.json",
    explorer: "https://etherscan.io/token/0x90a2a4c76b5d8c0bc892a69ea28aa775a8f2dd48",
    decimals: 18
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

export function displayUnits(rawSupply: string, decimals: number, precision = 2): string {
  const factor = BigInt(10) ** BigInt(precision);
  const scale = BigInt(10) ** BigInt(decimals);
  const rounded = (BigInt(rawSupply) * factor + scale / BigInt(2)) / scale;
  const units = new Intl.NumberFormat("en-US").format(rounded / factor);
  return precision ? `${units}.${String(rounded % factor).padStart(precision, "0")}` : units;
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
