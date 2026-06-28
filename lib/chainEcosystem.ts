export type ChainProject = {
  name: string;
  category: string;
  description: string;
  status: string;
  region: string;
};

export type ChainEcosystem = {
  slug: string;
  name: string;
  logoText: string;
  logoSrc: string;
  accent: "blue" | "purple" | "green" | "yellow" | "red" | "black";
  summary: string;
  standsOutFor: string[];
  projects: ChainProject[];
};

export const chainEcosystemUpdatedAt = "2026-06-28T00:00:00.000Z";

export const chainEcosystems: ChainEcosystem[] = [
  {
    slug: "ethereum",
    name: "Ethereum",
    logoText: "◇",
    logoSrc: "/assets/chain-logos/ethereum.svg",
    accent: "blue",
    summary: "Ethereum is the largest smart contract ecosystem, with deep liquidity, mature developer tooling and broad institutional awareness.",
    standsOutFor: ["Smart contracts", "DeFi liquidity", "Tokenized assets", "Developer tooling"],
    projects: [
      { name: "Uniswap", category: "DeFi", description: "Decentralized exchange protocol and liquidity infrastructure.", status: "Live", region: "Global" },
      { name: "Aave", category: "DeFi", description: "Decentralized lending and borrowing protocol.", status: "Live", region: "Global" },
      { name: "Sky", category: "Stablecoins", description: "Decentralized stablecoin and collateral infrastructure formerly known as MakerDAO.", status: "Live", region: "Global" },
      { name: "Lido", category: "Staking", description: "Liquid staking infrastructure for Ethereum and related assets.", status: "Live", region: "Global" },
      { name: "EigenLayer", category: "Restaking", description: "Ethereum restaking and actively validated services ecosystem.", status: "Live", region: "Global" },
      { name: "ENS", category: "Identity", description: "Ethereum naming and identity infrastructure.", status: "Live", region: "Global" },
      { name: "Chainlink", category: "Oracle Infrastructure", description: "Oracle, data and interoperability infrastructure used across smart contract applications.", status: "Live", region: "Global" },
      { name: "OpenSea", category: "NFT Marketplace", description: "Marketplace infrastructure for NFTs and digital collectibles.", status: "Live", region: "Global" },
      { name: "Ondo Finance", category: "RWA", description: "Tokenized finance and real-world asset products with Ethereum ecosystem activity.", status: "Live", region: "Global" },
      { name: "Securitize", category: "Tokenization", description: "Digital securities and tokenization platform with Ethereum-compatible infrastructure.", status: "Live", region: "United States" }
    ]
  },
  {
    slug: "polygon",
    name: "Polygon",
    logoText: "⬡",
    logoSrc: "/assets/chain-logos/polygon.svg",
    accent: "purple",
    summary: "Polygon is known for Ethereum scaling, lower-cost transactions and a broad ecosystem across consumer, gaming, DeFi and enterprise use cases.",
    standsOutFor: ["Ethereum scaling", "Consumer apps", "Gaming", "Enterprise adoption"],
    projects: [
      { name: "Polymarket", category: "Prediction Markets", description: "Prediction market platform with significant Polygon ecosystem activity.", status: "Live", region: "Global" },
      { name: "Aavegotchi", category: "Gaming", description: "Onchain game and collectible ecosystem using Polygon infrastructure.", status: "Live", region: "Global" },
      { name: "Lens Protocol", category: "Social", description: "Web3 social graph and creator infrastructure originally built in the Polygon ecosystem.", status: "Live", region: "Global" },
      { name: "QuickSwap", category: "DeFi", description: "Decentralized exchange and liquidity protocol on Polygon.", status: "Live", region: "Global" },
      { name: "Courtyard", category: "Collectibles", description: "Tokenized physical collectibles marketplace using Polygon rails.", status: "Live", region: "Global" },
      { name: "Immutable", category: "Gaming Infrastructure", description: "Gaming infrastructure with Polygon-powered scaling products.", status: "Live", region: "Global" },
      { name: "DraftKings Reignmakers", category: "Gaming", description: "Sports collectible game that used Polygon-based NFT infrastructure.", status: "Live", region: "United States" },
      { name: "Starbucks Odyssey", category: "Loyalty", description: "Brand loyalty experience that used Polygon digital collectibles.", status: "Historical", region: "United States" }
    ]
  },
  {
    slug: "base",
    name: "Base",
    logoText: "B",
    logoSrc: "/assets/chain-logos/base.svg",
    accent: "blue",
    summary: "Base is Coinbase's Ethereum Layer 2, standing out for consumer onboarding, low fees and growing application distribution.",
    standsOutFor: ["Consumer onboarding", "Low-cost apps", "Coinbase distribution", "Social and DeFi"],
    projects: [
      { name: "Aerodrome", category: "DeFi", description: "Liquidity hub and decentralized exchange for Base.", status: "Live", region: "Global" },
      { name: "Zora", category: "Creator Infrastructure", description: "Creator and NFT protocol with Base ecosystem activity.", status: "Live", region: "Global" },
      { name: "Farcaster", category: "Social", description: "Decentralized social protocol with many Base-native experiences.", status: "Live", region: "Global" },
      { name: "Friend.tech", category: "SocialFi", description: "Social finance application originally built on Base.", status: "Historical", region: "Global" },
      { name: "Virtuals Protocol", category: "AI Agents", description: "AI agent and tokenized agent ecosystem with Base activity.", status: "Live", region: "Global" },
      { name: "Moonwell", category: "DeFi", description: "Lending and borrowing protocol active on Base.", status: "Live", region: "Global" },
      { name: "Seamless Protocol", category: "DeFi", description: "Base-native lending and liquidity protocol.", status: "Live", region: "Global" },
      { name: "Blackbird", category: "Consumer Loyalty", description: "Restaurant loyalty and rewards platform using Base infrastructure.", status: "Live", region: "United States" }
    ]
  },
  {
    slug: "solana",
    name: "Solana",
    logoText: "≋",
    logoSrc: "/assets/chain-logos/solana.svg",
    accent: "green",
    summary: "Solana is known for high throughput, low fees and strong activity across DeFi, payments, DePIN, NFTs and consumer applications.",
    standsOutFor: ["High throughput", "Low fees", "Payments", "DePIN and consumer apps"],
    projects: [
      { name: "Jupiter", category: "DeFi", description: "Liquidity aggregator and trading infrastructure in the Solana ecosystem.", status: "Live", region: "Global" },
      { name: "Raydium", category: "DeFi", description: "Automated market maker and liquidity protocol.", status: "Live", region: "Global" },
      { name: "Helium", category: "DePIN", description: "Decentralized wireless network that migrated to Solana.", status: "Live", region: "Global" },
      { name: "Pyth Network", category: "Oracle Infrastructure", description: "Market data oracle network with Solana roots and multi-chain reach.", status: "Live", region: "Global" },
      { name: "Render Network", category: "DePIN", description: "Decentralized GPU rendering network using Solana infrastructure.", status: "Live", region: "Global" },
      { name: "Magic Eden", category: "NFT Marketplace", description: "NFT marketplace with major Solana ecosystem presence.", status: "Live", region: "Global" },
      { name: "Tensor", category: "NFT Marketplace", description: "Solana NFT trading marketplace and professional trading interface.", status: "Live", region: "Global" },
      { name: "Drift", category: "DeFi", description: "Decentralized derivatives and trading protocol.", status: "Live", region: "Global" },
      { name: "Kamino", category: "DeFi", description: "Liquidity, lending and automated strategy protocol.", status: "Live", region: "Global" }
    ]
  },
  {
    slug: "avalanche",
    name: "Avalanche",
    logoText: "A",
    logoSrc: "/assets/chain-logos/avalanche.svg",
    accent: "red",
    summary: "Avalanche stands out for custom subnets, high-speed applications and enterprise or institution-specific blockchain environments.",
    standsOutFor: ["Subnets", "Enterprise networks", "DeFi", "Gaming"],
    projects: [
      { name: "Trader Joe", category: "DeFi", description: "Decentralized exchange and liquidity protocol.", status: "Live", region: "Global" },
      { name: "BENQI", category: "DeFi", description: "Lending, liquid staking and DeFi infrastructure on Avalanche.", status: "Live", region: "Global" },
      { name: "Core", category: "Wallet", description: "Avalanche wallet and portfolio experience.", status: "Live", region: "Global" },
      { name: "Dexalot", category: "Trading", description: "Central limit order book exchange built with Avalanche infrastructure.", status: "Live", region: "Global" },
      { name: "Gunzilla / GUNZ", category: "Gaming", description: "Gaming subnet and ecosystem connected to Avalanche.", status: "Live", region: "Global" },
      { name: "SK Planet UPTN", category: "Enterprise", description: "Enterprise-grade Avalanche subnet initiative.", status: "Live", region: "Asia" },
      { name: "Shrapnel", category: "Gaming", description: "Web3 game ecosystem using Avalanche infrastructure.", status: "Live", region: "Global" }
    ]
  },
  {
    slug: "hedera",
    name: "Hedera",
    logoText: "H",
    logoSrc: "/assets/chain-logos/hedera.svg",
    accent: "black",
    summary: "Hedera is known for enterprise governance, fast settlement, low fees and use cases across identity, sustainability, payments and tokenization.",
    standsOutFor: ["Enterprise governance", "Low fees", "Sustainability", "Token services"],
    projects: [
      { name: "DOVU", category: "Sustainability", description: "Carbon and sustainability infrastructure using Hedera.", status: "Live", region: "Global" },
      { name: "Neuron", category: "DePIN", description: "Decentralized aviation and sensor data infrastructure using Hedera.", status: "Live", region: "Global" },
      { name: "Karate Combat", category: "Sports", description: "Sports and fan engagement ecosystem with Hedera integration.", status: "Live", region: "Global" },
      { name: "ServiceNow", category: "Enterprise Workflow", description: "Enterprise workflow initiatives connected to Hedera trust infrastructure.", status: "Live", region: "Global" },
      { name: "HashPack", category: "Wallet", description: "Wallet and application access layer for Hedera users.", status: "Live", region: "Global" },
      { name: "SaucerSwap", category: "DeFi", description: "Decentralized exchange and liquidity protocol on Hedera.", status: "Live", region: "Global" },
      { name: "TOKO", category: "Tokenization", description: "Tokenization platform initiative associated with Hedera ecosystem use cases.", status: "Live", region: "Global" }
    ]
  },
  {
    slug: "xrp-ledger",
    name: "XRP Ledger",
    logoText: "X",
    logoSrc: "/assets/chain-logos/xrp-ledger.svg",
    accent: "black",
    summary: "XRP Ledger is known for fast settlement, payments, exchange infrastructure and token issuance features.",
    standsOutFor: ["Payments", "Settlement", "Exchange infrastructure", "Token issuance"],
    projects: [
      { name: "Ripple Payments", category: "Payments", description: "Enterprise payments and settlement network connected to XRP Ledger capabilities.", status: "Live", region: "Global" },
      { name: "Xaman", category: "Wallet", description: "Wallet and user access layer for XRP Ledger applications.", status: "Live", region: "Global" },
      { name: "Sologenic", category: "Tokenization", description: "Tokenization and trading ecosystem connected to XRP Ledger.", status: "Live", region: "Global" },
      { name: "GateHub", category: "Wallet and Exchange", description: "Wallet, trading and gateway infrastructure for XRP Ledger assets.", status: "Live", region: "Global" },
      { name: "XRPL Commons", category: "Ecosystem", description: "Ecosystem support, education and builder initiatives around XRP Ledger.", status: "Live", region: "Global" },
      { name: "Peersyst", category: "Development", description: "Blockchain development team building XRP Ledger and sidechain products.", status: "Live", region: "Global" }
    ]
  },
  {
    slug: "canton-network",
    name: "Canton Network",
    logoText: "C",
    logoSrc: "/assets/chain-logos/canton-network.svg",
    accent: "blue",
    summary: "Canton Network focuses on privacy-enabled institutional finance, synchronized ledgers and regulated financial market workflows.",
    standsOutFor: ["Institutional finance", "Privacy", "Synchronized ledgers", "Capital markets"],
    projects: [
      { name: "Digital Asset", category: "Infrastructure", description: "Core technology contributor behind Canton Network and Daml.", status: "Live", region: "Global" },
      { name: "Daml", category: "Smart Contract Platform", description: "Application development language and framework used for institutional workflows.", status: "Live", region: "Global" },
      { name: "Canton Coin", category: "Network Utility", description: "Utility asset connected to Canton Network participation.", status: "Live", region: "Global" },
      { name: "BNP Paribas", category: "Institutional Participant", description: "Financial institution associated with Canton Network ecosystem participation.", status: "Live", region: "Europe" },
      { name: "Cboe Global Markets", category: "Market Infrastructure", description: "Market infrastructure participant associated with Canton ecosystem initiatives.", status: "Live", region: "United States" },
      { name: "Goldman Sachs", category: "Institutional Participant", description: "Financial institution associated with institutional digital asset infrastructure initiatives.", status: "Live", region: "United States" }
    ]
  },
  {
    slug: "bitcoin",
    name: "Bitcoin",
    logoText: "₿",
    logoSrc: "/assets/chain-logos/bitcoin.svg",
    accent: "yellow",
    summary: "Bitcoin is the most established digital asset network, with growing application layers for payments, custody, settlement and Bitcoin-native finance.",
    standsOutFor: ["Store of value", "Payments", "Custody", "Bitcoin-native finance"],
    projects: [
      { name: "Lightning Network", category: "Payments", description: "Bitcoin payment network for faster and lower-cost transactions.", status: "Live", region: "Global" },
      { name: "Stacks", category: "Smart Contracts", description: "Bitcoin Layer 2 ecosystem for smart contracts and applications.", status: "Live", region: "Global" },
      { name: "Rootstock", category: "Smart Contracts", description: "Bitcoin sidechain for EVM-compatible smart contracts.", status: "Live", region: "Global" },
      { name: "Ordinals", category: "Digital Collectibles", description: "Bitcoin-native inscriptions and collectible ecosystem.", status: "Live", region: "Global" },
      { name: "Liquid Network", category: "Settlement", description: "Bitcoin sidechain for asset issuance and faster settlement.", status: "Live", region: "Global" },
      { name: "Strike", category: "Payments", description: "Bitcoin and Lightning payments application.", status: "Live", region: "Global" }
    ]
  },
  {
    slug: "arbitrum",
    name: "Arbitrum",
    logoText: "A",
    logoSrc: "/assets/chain-logos/arbitrum.svg",
    accent: "blue",
    summary: "Arbitrum is an Ethereum Layer 2 known for DeFi liquidity, low-cost execution and an active rollup ecosystem.",
    standsOutFor: ["Ethereum scaling", "DeFi", "Rollups", "Low-cost execution"],
    projects: [
      { name: "GMX", category: "DeFi", description: "Decentralized perpetuals and spot trading protocol.", status: "Live", region: "Global" },
      { name: "Camelot", category: "DeFi", description: "Arbitrum-native decentralized exchange and liquidity layer.", status: "Live", region: "Global" },
      { name: "Radiant Capital", category: "DeFi", description: "Omnichain lending market with Arbitrum activity.", status: "Live", region: "Global" },
      { name: "Treasure", category: "Gaming", description: "Gaming ecosystem and marketplace associated with Arbitrum.", status: "Live", region: "Global" },
      { name: "Dopex", category: "Options", description: "Decentralized options protocol with Arbitrum ecosystem roots.", status: "Live", region: "Global" },
      { name: "Pendle", category: "DeFi", description: "Yield trading protocol active on Arbitrum.", status: "Live", region: "Global" }
    ]
  },
  {
    slug: "optimism",
    name: "Optimism",
    logoText: "OP",
    logoSrc: "/assets/chain-logos/optimism.svg",
    accent: "red",
    summary: "Optimism is an Ethereum Layer 2 and Superchain ecosystem focused on scalable applications, governance and interoperable rollups.",
    standsOutFor: ["Superchain", "Ethereum scaling", "Governance", "Low-cost apps"],
    projects: [
      { name: "Velodrome", category: "DeFi", description: "Liquidity and decentralized exchange hub for Optimism.", status: "Live", region: "Global" },
      { name: "Synthetix", category: "DeFi", description: "Derivatives and synthetic asset infrastructure with Optimism activity.", status: "Live", region: "Global" },
      { name: "World Chain", category: "Identity and Consumer", description: "World ecosystem chain built as part of the Optimism Superchain.", status: "Live", region: "Global" },
      { name: "Base", category: "Layer 2", description: "Coinbase Layer 2 built using the OP Stack.", status: "Live", region: "Global" },
      { name: "Zora Network", category: "Creator Infrastructure", description: "Creator-focused network built with OP Stack technology.", status: "Live", region: "Global" },
      { name: "Mode", category: "Layer 2", description: "OP Stack Layer 2 focused on DeFi and onchain applications.", status: "Live", region: "Global" }
    ]
  },
  {
    slug: "bnb-chain",
    name: "BNB Chain",
    logoText: "◆",
    logoSrc: "/assets/chain-logos/bnb-chain.svg",
    accent: "yellow",
    summary: "BNB Chain is known for high retail activity, low fees, EVM compatibility and broad DeFi, gaming and consumer app coverage.",
    standsOutFor: ["Low fees", "Retail adoption", "EVM apps", "Gaming and DeFi"],
    projects: [
      { name: "PancakeSwap", category: "DeFi", description: "Decentralized exchange and liquidity protocol with BNB Chain roots.", status: "Live", region: "Global" },
      { name: "Venus Protocol", category: "DeFi", description: "Lending and synthetic stablecoin protocol.", status: "Live", region: "Global" },
      { name: "Trust Wallet", category: "Wallet", description: "Multi-chain wallet with strong BNB Chain ecosystem presence.", status: "Live", region: "Global" },
      { name: "Hooked Protocol", category: "Education and Social", description: "Learn-to-earn and social education ecosystem.", status: "Live", region: "Global" },
      { name: "SPACE ID", category: "Identity", description: "Web3 domain and identity infrastructure.", status: "Live", region: "Global" },
      { name: "BinaryX", category: "Gaming", description: "Gaming ecosystem with BNB Chain activity.", status: "Live", region: "Global" }
    ]
  }
];

const additionalProjectsByChain: Record<string, ChainProject[]> = {
  ethereum: [
    { name: "Compound", category: "DeFi", description: "Decentralized lending protocol for crypto asset money markets.", status: "Live", region: "Global" },
    { name: "Curve Finance", category: "DeFi", description: "Liquidity protocol known for stablecoin and pegged-asset swaps.", status: "Live", region: "Global" },
    { name: "Balancer", category: "DeFi", description: "Automated portfolio manager, liquidity protocol and decentralized exchange.", status: "Live", region: "Global" },
    { name: "Safe", category: "Wallet Infrastructure", description: "Smart account and multisig infrastructure used by DAOs, funds and onchain teams.", status: "Live", region: "Global" },
    { name: "Ethena", category: "Stablecoins", description: "Synthetic dollar and internet bond protocol built around Ethereum-aligned collateral and settlement.", status: "Live", region: "Global" },
    { name: "Pendle", category: "DeFi", description: "Yield trading protocol used by DeFi and institutional yield participants.", status: "Live", region: "Global" },
    { name: "Snapshot", category: "Governance", description: "Offchain governance voting system widely used by Ethereum ecosystem projects.", status: "Live", region: "Global" }
  ],
  polygon: [
    { name: "Aave", category: "DeFi", description: "Lending and borrowing protocol with long-running Polygon deployment.", status: "Live", region: "Global" },
    { name: "Uniswap", category: "DeFi", description: "Decentralized exchange protocol deployed across Polygon infrastructure.", status: "Live", region: "Global" },
    { name: "OpenSea", category: "NFT Marketplace", description: "NFT marketplace that supported Polygon for lower-cost digital collectible trading.", status: "Live", region: "Global" },
    { name: "Decentral Games", category: "Gaming", description: "Onchain gaming and entertainment ecosystem with Polygon usage.", status: "Live", region: "Global" },
    { name: "Planet IX", category: "Gaming", description: "Strategy and NFT game ecosystem with Polygon activity.", status: "Live", region: "Global" },
    { name: "The Sandbox", category: "Gaming", description: "Metaverse and user-generated gaming ecosystem with Polygon scaling integrations.", status: "Live", region: "Global" },
    { name: "Reddit Collectible Avatars", category: "Consumer Collectibles", description: "Mainstream digital collectible program that used Polygon infrastructure.", status: "Live", region: "United States" }
  ],
  base: [
    { name: "Morpho", category: "DeFi", description: "Lending protocol and vault infrastructure active on Base.", status: "Live", region: "Global" },
    { name: "Compound", category: "DeFi", description: "Money market protocol with Base deployment.", status: "Live", region: "Global" },
    { name: "Degen", category: "Social", description: "Social token and creator ecosystem associated with Base and Farcaster activity.", status: "Live", region: "Global" },
    { name: "Avantis", category: "DeFi", description: "Perpetuals and synthetic asset trading protocol on Base.", status: "Live", region: "Global" },
    { name: "Extra Finance", category: "DeFi", description: "Leveraged yield and lending protocol active on Base.", status: "Live", region: "Global" },
    { name: "Superform", category: "DeFi Infrastructure", description: "Cross-chain yield marketplace and vault access layer with Base support.", status: "Live", region: "Global" },
    { name: "Paragraph", category: "Creator Infrastructure", description: "Publishing and newsletter platform with onchain creator features connected to Base.", status: "Live", region: "Global" }
  ],
  solana: [
    { name: "Orca", category: "DeFi", description: "Solana decentralized exchange and concentrated liquidity protocol.", status: "Live", region: "Global" },
    { name: "Marinade", category: "Staking", description: "Liquid staking and validator delegation protocol for Solana.", status: "Live", region: "Global" },
    { name: "Sanctum", category: "Staking", description: "Liquid staking token infrastructure and liquidity layer for Solana.", status: "Live", region: "Global" },
    { name: "Metaplex", category: "NFT Infrastructure", description: "NFT and digital asset protocol used by Solana creators and applications.", status: "Live", region: "Global" },
    { name: "Phantom", category: "Wallet", description: "Consumer wallet and application gateway with strong Solana ecosystem adoption.", status: "Live", region: "Global" },
    { name: "Backpack", category: "Wallet and Exchange", description: "Wallet, xNFT and exchange ecosystem with Solana roots.", status: "Live", region: "Global" },
    { name: "MarginFi", category: "DeFi", description: "Lending and risk engine protocol in the Solana ecosystem.", status: "Live", region: "Global" }
  ],
  avalanche: [
    { name: "Pangolin", category: "DeFi", description: "Decentralized exchange originally built for Avalanche users and liquidity.", status: "Live", region: "Global" },
    { name: "DeltaPrime", category: "DeFi", description: "DeFi lending and leveraged strategy protocol active on Avalanche.", status: "Live", region: "Global" },
    { name: "GoGoPool", category: "Staking", description: "Liquid staking and subnet validator infrastructure for Avalanche.", status: "Live", region: "Global" },
    { name: "Beam", category: "Gaming", description: "Gaming subnet and ecosystem connected to Avalanche infrastructure.", status: "Live", region: "Global" },
    { name: "Aave", category: "DeFi", description: "Lending protocol with Avalanche deployment.", status: "Live", region: "Global" },
    { name: "Maple Finance", category: "RWA and Credit", description: "Institutional credit marketplace with Avalanche ecosystem activity.", status: "Live", region: "Global" },
    { name: "Republic Note", category: "RWA", description: "Digital asset and private market product initiative connected to Avalanche ecosystem coverage.", status: "Live", region: "United States" }
  ],
  hedera: [
    { name: "Blade Wallet", category: "Wallet", description: "Wallet and user access layer for Hedera applications.", status: "Live", region: "Global" },
    { name: "Calaxy", category: "Creator Economy", description: "Creator and fan engagement app built with Hedera ecosystem support.", status: "Live", region: "Global" },
    { name: "Dropp", category: "Payments", description: "Micropayments platform using Hedera network capabilities.", status: "Live", region: "United States" },
    { name: "Tune.FM", category: "Music", description: "Music streaming and artist rewards platform using Hedera technology.", status: "Live", region: "Global" },
    { name: "HeliSwap", category: "DeFi", description: "Decentralized exchange and liquidity protocol for Hedera assets.", status: "Live", region: "Global" },
    { name: "BankSocial", category: "Finance", description: "Credit-union and community finance ecosystem using Hedera infrastructure.", status: "Live", region: "United States" },
    { name: "Avery Dennison atma.io", category: "Supply Chain", description: "Connected product cloud initiative associated with Hedera supply-chain use cases.", status: "Live", region: "Global" }
  ],
  "xrp-ledger": [
    { name: "XRPL DEX", category: "Exchange Infrastructure", description: "Native decentralized exchange functionality for assets issued on XRP Ledger.", status: "Live", region: "Global" },
    { name: "Evernode", category: "Compute Infrastructure", description: "Smart contract and hosting network connected to the XRP Ledger ecosystem.", status: "Live", region: "Global" },
    { name: "XPMarket", category: "NFT Marketplace", description: "NFT marketplace and analytics platform for XRP Ledger assets.", status: "Live", region: "Global" },
    { name: "onXRP", category: "Consumer and NFT", description: "XRP Ledger ecosystem application and marketplace experience.", status: "Live", region: "Global" },
    { name: "Orchestra Finance", category: "DeFi", description: "DeFi protocol ecosystem built for XRP Ledger users.", status: "Live", region: "Global" },
    { name: "Bithomp", category: "Explorer", description: "XRP Ledger explorer and analytics interface.", status: "Live", region: "Global" },
    { name: "Futureverse", category: "Gaming and Metaverse", description: "Open metaverse and digital asset ecosystem with XRP Ledger connections.", status: "Live", region: "Global" }
  ],
  "canton-network": [
    { name: "Deloitte", category: "Institutional Participant", description: "Professional services participant connected to Canton ecosystem and Daml workflows.", status: "Live", region: "Global" },
    { name: "DRW Cumberland", category: "Liquidity", description: "Digital asset liquidity participant associated with Canton Network ecosystem activity.", status: "Live", region: "United States" },
    { name: "Tradeweb", category: "Market Infrastructure", description: "Electronic trading and market infrastructure participant associated with institutional blockchain workflows.", status: "Live", region: "Global" },
    { name: "Broadridge", category: "Market Infrastructure", description: "Financial market infrastructure and post-trade technology participant.", status: "Live", region: "Global" },
    { name: "QCP", category: "Institutional Digital Assets", description: "Digital asset trading and institutional markets participant connected to Canton ecosystem coverage.", status: "Live", region: "Asia" },
    { name: "Paxos", category: "Tokenization and Settlement", description: "Regulated digital asset infrastructure participant associated with institutional settlement use cases.", status: "Live", region: "United States" }
  ],
  bitcoin: [
    { name: "Fedimint", category: "Custody and Community Banking", description: "Federated custody and community finance protocol for Bitcoin users.", status: "Live", region: "Global" },
    { name: "Muun", category: "Wallet", description: "Bitcoin and Lightning wallet focused on consumer payments.", status: "Live", region: "Global" },
    { name: "River", category: "Financial Services", description: "Bitcoin brokerage and Lightning infrastructure provider.", status: "Live", region: "United States" },
    { name: "Bitrefill", category: "Payments", description: "Bitcoin and Lightning commerce platform for gift cards and mobile refills.", status: "Live", region: "Global" },
    { name: "Sovryn", category: "Bitcoin DeFi", description: "Bitcoin-native DeFi protocol using Rootstock infrastructure.", status: "Live", region: "Global" },
    { name: "RGB", category: "Asset Protocol", description: "Bitcoin and Lightning-compatible smart contract and asset issuance protocol.", status: "Live", region: "Global" }
  ],
  arbitrum: [
    { name: "Gains Network", category: "DeFi", description: "Decentralized leveraged trading protocol active on Arbitrum.", status: "Live", region: "Global" },
    { name: "Jones DAO", category: "DeFi", description: "Options, strategy and liquidity vault ecosystem with Arbitrum roots.", status: "Live", region: "Global" },
    { name: "PlutusDAO", category: "Governance and DeFi", description: "Governance aggregation and liquidity protocol in the Arbitrum ecosystem.", status: "Live", region: "Global" },
    { name: "Rage Trade", category: "DeFi", description: "Perpetuals and yield strategies protocol active in Arbitrum DeFi.", status: "Live", region: "Global" },
    { name: "Premia", category: "Options", description: "Decentralized options and derivatives protocol with Arbitrum activity.", status: "Live", region: "Global" },
    { name: "Hop Protocol", category: "Bridge", description: "Cross-chain bridge and transfer protocol with Arbitrum support.", status: "Live", region: "Global" }
  ],
  optimism: [
    { name: "Polynomial", category: "DeFi", description: "Derivatives and structured products protocol active in the Optimism ecosystem.", status: "Live", region: "Global" },
    { name: "Exactly Protocol", category: "DeFi", description: "Fixed and variable rate lending protocol on Optimism.", status: "Live", region: "Global" },
    { name: "Beethoven X", category: "DeFi", description: "Balancer-powered decentralized exchange with Optimism deployment.", status: "Live", region: "Global" },
    { name: "Lyra", category: "Options", description: "Options trading protocol with Optimism ecosystem roots.", status: "Live", region: "Global" },
    { name: "Gitcoin Grants Stack", category: "Public Goods", description: "Grants and public goods funding infrastructure deployed across Optimism ecosystem programs.", status: "Live", region: "Global" },
    { name: "Frax", category: "Stablecoins and DeFi", description: "Stablecoin and DeFi protocol with Optimism deployment.", status: "Live", region: "Global" }
  ],
  "bnb-chain": [
    { name: "Lista DAO", category: "DeFi", description: "Liquid staking and stablecoin protocol in the BNB Chain ecosystem.", status: "Live", region: "Global" },
    { name: "Alpaca Finance", category: "DeFi", description: "Leveraged yield farming and lending protocol with BNB Chain roots.", status: "Live", region: "Global" },
    { name: "Biswap", category: "DeFi", description: "Decentralized exchange and liquidity protocol for BNB Chain users.", status: "Live", region: "Global" },
    { name: "Mobox", category: "Gaming", description: "GameFi and NFT gaming ecosystem active on BNB Chain.", status: "Live", region: "Global" },
    { name: "Galxe", category: "Identity and Growth", description: "Web3 credential, loyalty and growth platform with BNB Chain ecosystem activity.", status: "Live", region: "Global" },
    { name: "ApeSwap", category: "DeFi", description: "Decentralized exchange and yield platform with BNB Chain activity.", status: "Live", region: "Global" }
  ]
};

export function getChainEcosystems(): ChainEcosystem[] {
  return chainEcosystems.map((chain) => ({
    ...chain,
    projects: [...chain.projects, ...(additionalProjectsByChain[chain.slug] ?? [])]
  }));
}

export function getChainEcosystem(slug: string): ChainEcosystem | undefined {
  return getChainEcosystems().find((chain) => chain.slug === slug);
}
