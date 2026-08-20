export type ChainProject = {
  name: string;
  category: string;
  description: string;
  status: string;
  region: string;
  website?: string;
  useCases?: string[];
  targetUsers?: string[];
  keySignals?: string[];
  verificationStatus?: "Source checked" | "Verified" | "Needs review" | "Historical";
  lastReviewed?: string;
  sourceUrls?: string[];
  listingTier?: "Verified profile" | "Featured profile" | "Partner profile";
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
    slug: "tron",
    name: "TRON",
    logoText: "T",
    logoSrc: "/assets/chain-logos/tron.svg",
    accent: "red",
    summary: "TRON is known for high-volume stablecoin transfers, low-fee payments, consumer wallets and DeFi applications built around TRC-20 assets.",
    standsOutFor: ["Stablecoin payments", "Low fees", "TRC-20 assets", "Consumer wallets"],
    projects: [
      { name: "JustLend DAO", category: "DeFi", description: "Lending and borrowing protocol for TRON ecosystem assets.", status: "Live", region: "Global" },
      { name: "SUN.io", category: "DeFi", description: "Decentralized exchange and liquidity platform for stablecoin swaps and TRON assets.", status: "Live", region: "Global" },
      { name: "SunPump", category: "Launchpad", description: "TRON-based memecoin launchpad and token issuance platform.", status: "Live", region: "Global" },
      { name: "SunX", category: "Trading", description: "TRON ecosystem trading application connected to token market activity.", status: "Live", region: "Global" },
      { name: "JustStable", category: "Stablecoins", description: "Decentralized stablecoin protocol associated with USDJ issuance and collateralized positions.", status: "Live", region: "Global" },
      { name: "TronLink", category: "Wallet", description: "Wallet and application access layer for TRON users and dApps.", status: "Live", region: "Global" },
      { name: "GasFree", category: "Payments", description: "Gasless stablecoin transfer infrastructure for TRON ecosystem payments.", status: "Live", region: "Global" },
      { name: "BTTC", category: "Interoperability", description: "BitTorrent Chain cross-chain protocol connecting TRON with other blockchain networks.", status: "Live", region: "Global" },
      { name: "BTFS", category: "Storage", description: "BitTorrent File System decentralized storage infrastructure.", status: "Live", region: "Global" },
      { name: "USDD", category: "Stablecoins", description: "TRON ecosystem decentralized stablecoin product.", status: "Live", region: "Global" },
      { name: "stUSDT", category: "Real World Assets", description: "Staked USDT and RWA yield product associated with the TRON ecosystem.", status: "Live", region: "Global" },
      { name: "Bank of AI", category: "AI", description: "AI-focused TRON ecosystem application listed in TRONSCAN ecosystem coverage.", status: "Live", region: "Global" },
      { name: "AINFT", category: "NFT Infrastructure", description: "AI and NFT application in the TRON ecosystem.", status: "Live", region: "Global" }
    ]
  },
  {
    slug: "sui",
    name: "Sui",
    logoText: "S",
    logoSrc: "/assets/chain-logos/sui.svg",
    accent: "blue",
    summary: "Sui is a Move-based Layer 1 known for object-centric execution, low-latency apps, gaming, DeFi and consumer-scale blockchain experiences.",
    standsOutFor: ["Move smart contracts", "Consumer apps", "Gaming", "Fast settlement"],
    projects: [
      { name: "Cetus", category: "DeFi", description: "Decentralized exchange and concentrated liquidity protocol in the Sui ecosystem.", status: "Live", region: "Global" },
      { name: "NAVI Protocol", category: "DeFi", description: "Lending and liquidity protocol for Sui assets.", status: "Live", region: "Global" },
      { name: "Scallop", category: "DeFi", description: "Sui-native money market and lending protocol.", status: "Live", region: "Global" },
      { name: "Aftermath Finance", category: "DeFi", description: "Sui DeFi platform for swaps, liquid staking and yield products.", status: "Live", region: "Global" },
      { name: "Bluefin", category: "Trading", description: "Decentralized derivatives and spot trading venue with Sui ecosystem activity.", status: "Live", region: "Global" },
      { name: "Suilend", category: "DeFi", description: "Lending protocol built for Sui users and liquidity markets.", status: "Live", region: "Global" },
      { name: "Walrus", category: "Storage", description: "Decentralized storage protocol associated with the Sui ecosystem.", status: "Live", region: "Global" }
    ]
  },
  {
    slug: "aptos",
    name: "Aptos",
    logoText: "A",
    logoSrc: "/assets/chain-logos/aptos.svg",
    accent: "black",
    summary: "Aptos is a Move-based Layer 1 focused on scalable applications, institutional-grade infrastructure, DeFi and consumer blockchain experiences.",
    standsOutFor: ["Move smart contracts", "Institutional infrastructure", "DeFi", "Consumer apps"],
    projects: [
      { name: "Thala", category: "DeFi", description: "Aptos-native DeFi platform for swaps, stablecoins and liquid staking.", status: "Live", region: "Global" },
      { name: "Aries Markets", category: "DeFi", description: "Lending, borrowing and margin trading protocol on Aptos.", status: "Live", region: "Global" },
      { name: "Amnis Finance", category: "Staking", description: "Liquid staking and yield infrastructure for Aptos.", status: "Live", region: "Global" },
      { name: "Merkle Trade", category: "Trading", description: "Perpetual futures trading protocol active in the Aptos ecosystem.", status: "Live", region: "Global" },
      { name: "Petra", category: "Wallet", description: "Wallet and application access layer for Aptos users.", status: "Live", region: "Global" },
      { name: "Aptos Names", category: "Identity", description: "Naming and identity infrastructure for Aptos addresses and applications.", status: "Live", region: "Global" }
    ]
  },
  {
    slug: "stellar",
    name: "Stellar",
    logoText: "S",
    logoSrc: "/assets/chain-logos/stellar.svg",
    accent: "black",
    summary: "Stellar is a payments and asset issuance network known for remittances, stablecoins, tokenized funds and financial inclusion infrastructure.",
    standsOutFor: ["Payments", "Stablecoins", "Asset issuance", "Financial inclusion"],
    projects: [
      { name: "MoneyGram Access", category: "Payments", description: "Cash-to-crypto and remittance access connected to Stellar rails.", status: "Live", region: "Global" },
      { name: "Franklin Templeton BENJI", category: "Real World Assets", description: "Tokenized money market fund infrastructure with Stellar ecosystem support.", status: "Live", region: "United States" },
      { name: "Circle USDC", category: "Stablecoins", description: "USDC stablecoin issuance and transfer support on Stellar.", status: "Live", region: "Global" },
      { name: "Lobstr", category: "Wallet", description: "Consumer wallet and asset management application for Stellar users.", status: "Live", region: "Global" },
      { name: "Soroswap", category: "DeFi", description: "Automated market maker and DeFi protocol for Stellar assets.", status: "Live", region: "Global" },
      { name: "Stellar DEX", category: "Exchange Infrastructure", description: "Native decentralized exchange functionality for Stellar-issued assets.", status: "Live", region: "Global" },
      { name: "Soroban", category: "Smart Contracts", description: "Smart contract platform for building applications on Stellar.", status: "Live", region: "Global" }
    ]
  },
  {
    slug: "near",
    name: "NEAR",
    logoText: "N",
    logoSrc: "/assets/chain-logos/near.svg",
    accent: "black",
    summary: "NEAR is a sharded Layer 1 focused on chain abstraction, AI-adjacent applications, consumer onboarding and multichain user experiences.",
    standsOutFor: ["Chain abstraction", "Consumer apps", "AI", "Multichain UX"],
    projects: [
      { name: "NEAR Intents", category: "Interoperability", description: "Intent-based infrastructure for cross-chain actions and abstracted user flows.", status: "Live", region: "Global" },
      { name: "Ref Finance", category: "DeFi", description: "Decentralized exchange and liquidity protocol in the NEAR ecosystem.", status: "Live", region: "Global" },
      { name: "Burrow", category: "DeFi", description: "Lending and borrowing protocol for NEAR assets.", status: "Live", region: "Global" },
      { name: "Meta Pool", category: "Staking", description: "Liquid staking protocol active across NEAR and adjacent ecosystems.", status: "Live", region: "Global" },
      { name: "Sweat Economy", category: "Consumer", description: "Move-to-earn consumer application with NEAR ecosystem roots.", status: "Live", region: "Global" },
      { name: "Aurora", category: "EVM", description: "EVM-compatible environment connected to the NEAR ecosystem.", status: "Live", region: "Global" },
      { name: "Bitte", category: "AI Agents", description: "AI agent and wallet interaction infrastructure connected to NEAR.", status: "Live", region: "Global" }
    ]
  },
  {
    slug: "ton",
    name: "TON",
    logoText: "T",
    logoSrc: "/assets/chain-logos/ton.svg",
    accent: "blue",
    summary: "TON is a consumer-focused blockchain ecosystem connected to Telegram distribution, payments, wallets, mini apps and high-volume retail onboarding.",
    standsOutFor: ["Telegram distribution", "Mini apps", "Payments", "Consumer onboarding"],
    projects: [
      { name: "Tonkeeper", category: "Wallet", description: "Wallet and app gateway for TON users.", status: "Live", region: "Global" },
      { name: "STON.fi", category: "DeFi", description: "Decentralized exchange and liquidity protocol in the TON ecosystem.", status: "Live", region: "Global" },
      { name: "DeDust", category: "DeFi", description: "TON-native decentralized exchange and liquidity venue.", status: "Live", region: "Global" },
      { name: "Notcoin", category: "Consumer", description: "Telegram-native consumer token and gaming application associated with TON adoption.", status: "Live", region: "Global" },
      { name: "Fragment", category: "Marketplace", description: "Marketplace for Telegram usernames and digital collectibles connected to TON.", status: "Live", region: "Global" },
      { name: "Tonstakers", category: "Staking", description: "Staking and validator participation product for TON holders.", status: "Live", region: "Global" },
      { name: "USDt on TON", category: "Stablecoins", description: "Tether USDt stablecoin support for payments and transfers on TON.", status: "Live", region: "Global" }
    ]
  },
  {
    slug: "plume",
    name: "Plume",
    logoText: "P",
    logoSrc: "/assets/chain-logos/plume.svg",
    accent: "purple",
    summary: "Plume is an RWA-focused blockchain ecosystem built for tokenized assets, compliant distribution and real-world asset finance applications.",
    standsOutFor: ["Real world assets", "RWAfi", "Tokenization", "Compliance"],
    projects: [
      { name: "Plume Network", category: "RWA Infrastructure", description: "Purpose-built blockchain infrastructure for real-world asset applications.", status: "Live", region: "Global" },
      { name: "Nest", category: "Real World Assets", description: "RWA yield and asset access product associated with the Plume ecosystem.", status: "Live", region: "Global" },
      { name: "Mineral Vault", category: "Real World Assets", description: "Tokenized exposure concept for mineral and commodity-linked assets in RWA ecosystems.", status: "Live", region: "Global" },
      { name: "Matrixdock", category: "Real World Assets", description: "Tokenized treasury and RWA issuer with multichain ecosystem relevance.", status: "Live", region: "Global" },
      { name: "Dinari", category: "Real World Assets", description: "Tokenized stock and financial asset infrastructure with RWA ecosystem relevance.", status: "Live", region: "Global" }
    ]
  },
  {
    slug: "mantra",
    name: "MANTRA",
    logoText: "M",
    logoSrc: "/assets/chain-logos/mantra.svg",
    accent: "red",
    summary: "MANTRA is a real-world asset focused blockchain ecosystem oriented around compliant tokenization, institutional finance and regulated digital assets.",
    standsOutFor: ["RWA tokenization", "Compliance", "Institutional assets", "Onchain finance"],
    projects: [
      { name: "MANTRA Chain", category: "RWA Infrastructure", description: "Purpose-built chain for compliant real-world asset tokenization.", status: "Live", region: "Global" },
      { name: "MANTRA Finance", category: "DeFi", description: "DeFi and tokenization platform associated with the MANTRA ecosystem.", status: "Live", region: "Global" },
      { name: "OM Staking", category: "Staking", description: "Staking and network participation infrastructure for MANTRA users.", status: "Live", region: "Global" },
      { name: "MAG", category: "Real World Assets", description: "MANTRA-aligned real-world asset initiative for tokenized asset access.", status: "Live", region: "Global" },
      { name: "Zand", category: "Institutional Participant", description: "Digital bank participant associated with MANTRA real-world asset initiatives.", status: "Live", region: "Middle East" }
    ]
  },
  {
    slug: "celo",
    name: "Celo",
    logoText: "C",
    logoSrc: "/assets/chain-logos/celo.svg",
    accent: "yellow",
    summary: "Celo is a mobile-first blockchain ecosystem focused on stablecoin payments, ReFi, emerging markets and real-world utility.",
    standsOutFor: ["Mobile payments", "Stablecoins", "ReFi", "Emerging markets"],
    projects: [
      { name: "Mento", category: "Stablecoins", description: "Stable asset protocol and currency infrastructure for Celo.", status: "Live", region: "Global" },
      { name: "Valora", category: "Wallet", description: "Mobile wallet and payments app with Celo ecosystem roots.", status: "Live", region: "Global" },
      { name: "Ubeswap", category: "DeFi", description: "Decentralized exchange and liquidity protocol on Celo.", status: "Live", region: "Global" },
      { name: "GoodDollar", category: "Financial Inclusion", description: "Universal basic income and financial inclusion project with Celo activity.", status: "Live", region: "Global" },
      { name: "Toucan Protocol", category: "Climate", description: "Climate and carbon market infrastructure connected to Celo and ReFi ecosystems.", status: "Live", region: "Global" },
      { name: "Regen Network", category: "Climate", description: "Regenerative finance and ecological asset infrastructure with Celo ecosystem relevance.", status: "Live", region: "Global" }
    ]
  },
  {
    slug: "mantle",
    name: "Mantle",
    logoText: "M",
    logoSrc: "/assets/chain-logos/mantle.svg",
    accent: "black",
    summary: "Mantle is an Ethereum Layer 2 ecosystem focused on modular scaling, DeFi, liquid staking and institutional-grade Ethereum applications.",
    standsOutFor: ["Ethereum L2", "Modular scaling", "DeFi", "Liquid staking"],
    projects: [
      { name: "Merchant Moe", category: "DeFi", description: "Decentralized exchange and liquidity hub for Mantle.", status: "Live", region: "Global" },
      { name: "Agni Finance", category: "DeFi", description: "Concentrated liquidity DEX built for Mantle ecosystem users.", status: "Live", region: "Global" },
      { name: "INIT Capital", category: "DeFi", description: "Liquidity hook money market and DeFi protocol active on Mantle.", status: "Live", region: "Global" },
      { name: "mETH Protocol", category: "Staking", description: "Liquid staking and ETH yield product associated with Mantle.", status: "Live", region: "Global" },
      { name: "Ondo Finance", category: "Real World Assets", description: "Tokenized treasury products with Mantle ecosystem availability.", status: "Live", region: "Global" },
      { name: "LayerBank", category: "DeFi", description: "Lending protocol with Mantle ecosystem activity.", status: "Live", region: "Global" }
    ]
  },
  {
    slug: "algorand",
    name: "Algorand",
    logoText: "A",
    logoSrc: "/assets/chain-logos/algorand.svg",
    accent: "black",
    summary: "Algorand is a low-fee Layer 1 known for payments, asset issuance, sustainability, tokenization and institutional blockchain use cases.",
    standsOutFor: ["Payments", "Asset issuance", "Sustainability", "Tokenization"],
    projects: [
      { name: "Folks Finance", category: "DeFi", description: "Lending, borrowing and liquid staking protocol in the Algorand ecosystem.", status: "Live", region: "Global" },
      { name: "Tinyman", category: "DeFi", description: "Decentralized exchange and liquidity protocol on Algorand.", status: "Live", region: "Global" },
      { name: "Pact", category: "DeFi", description: "Automated market maker and liquidity platform for Algorand assets.", status: "Live", region: "Global" },
      { name: "Pera Wallet", category: "Wallet", description: "Wallet and application access layer for Algorand users.", status: "Live", region: "Global" },
      { name: "Lofty", category: "Real World Assets", description: "Fractional real estate investment platform using Algorand infrastructure.", status: "Live", region: "United States" },
      { name: "TravelX", category: "Enterprise", description: "Blockchain-based travel and ticketing infrastructure associated with Algorand.", status: "Live", region: "Global" }
    ]
  },
  {
    slug: "cardano",
    name: "Cardano",
    logoText: "C",
    logoSrc: "/assets/chain-logos/cardano.svg",
    accent: "blue",
    summary: "Cardano is a proof-of-stake Layer 1 ecosystem known for formal methods, staking, DeFi, identity, governance and a large community.",
    standsOutFor: ["Proof of stake", "Governance", "DeFi", "Identity"],
    projects: [
      { name: "Minswap", category: "DeFi", description: "Decentralized exchange and liquidity protocol in the Cardano ecosystem.", status: "Live", region: "Global" },
      { name: "SundaeSwap", category: "DeFi", description: "Automated market maker and DEX on Cardano.", status: "Live", region: "Global" },
      { name: "Liqwid Finance", category: "DeFi", description: "Lending and borrowing protocol for Cardano assets.", status: "Live", region: "Global" },
      { name: "Indigo Protocol", category: "Synthetic Assets", description: "Synthetic asset protocol built on Cardano.", status: "Live", region: "Global" },
      { name: "NMKR", category: "NFT Infrastructure", description: "NFT and tokenization infrastructure for Cardano creators and issuers.", status: "Live", region: "Global" },
      { name: "World Mobile", category: "DePIN", description: "Decentralized connectivity network associated with the Cardano ecosystem.", status: "Live", region: "Global" }
    ]
  },
  {
    slug: "polkadot",
    name: "Polkadot",
    logoText: "P",
    logoSrc: "/assets/chain-logos/polkadot.svg",
    accent: "purple",
    summary: "Polkadot is a multichain ecosystem built around shared security, parachains, interoperability and specialized application chains.",
    standsOutFor: ["Interoperability", "Parachains", "Shared security", "Appchains"],
    projects: [
      { name: "Acala", category: "DeFi", description: "DeFi and liquidity hub in the Polkadot ecosystem.", status: "Live", region: "Global" },
      { name: "Moonbeam", category: "EVM", description: "EVM-compatible parachain for Ethereum-style applications in Polkadot.", status: "Live", region: "Global" },
      { name: "Astar", category: "Smart Contracts", description: "Smart contract platform and app ecosystem connected to Polkadot.", status: "Live", region: "Global" },
      { name: "Centrifuge", category: "Real World Assets", description: "RWA and credit protocol with Polkadot ecosystem roots.", status: "Live", region: "Global" },
      { name: "Bifrost", category: "Staking", description: "Liquid staking and cross-chain yield protocol.", status: "Live", region: "Global" },
      { name: "Hydration", category: "DeFi", description: "Liquidity protocol and DeFi hub in the Polkadot ecosystem.", status: "Live", region: "Global" }
    ]
  },
  {
    slug: "cosmos",
    name: "Cosmos",
    logoText: "C",
    logoSrc: "/assets/chain-logos/cosmos.svg",
    accent: "black",
    summary: "Cosmos is an appchain ecosystem known for IBC interoperability, sovereign chains, DeFi zones and modular blockchain infrastructure.",
    standsOutFor: ["IBC", "Appchains", "Sovereign chains", "Modular infrastructure"],
    projects: [
      { name: "Osmosis", category: "DeFi", description: "Interchain decentralized exchange and liquidity hub in Cosmos.", status: "Live", region: "Global" },
      { name: "Cosmos Hub", category: "Interoperability", description: "Core hub for interchain security, staking and IBC connectivity.", status: "Live", region: "Global" },
      { name: "Stride", category: "Staking", description: "Liquid staking protocol for Cosmos ecosystem assets.", status: "Live", region: "Global" },
      { name: "Neutron", category: "Smart Contracts", description: "Cosmos smart contract platform for interchain applications.", status: "Live", region: "Global" },
      { name: "dYdX Chain", category: "Trading", description: "Appchain for decentralized derivatives trading built with Cosmos technology.", status: "Live", region: "Global" },
      { name: "Akash Network", category: "DePIN", description: "Decentralized compute marketplace built in the Cosmos ecosystem.", status: "Live", region: "Global" }
    ]
  },
  {
    slug: "tezos",
    name: "Tezos",
    logoText: "T",
    logoSrc: "/assets/chain-logos/tezos.svg",
    accent: "blue",
    summary: "Tezos is a self-amending proof-of-stake blockchain ecosystem known for governance, NFTs, institutional pilots and smart contract applications.",
    standsOutFor: ["Governance", "NFTs", "Institutional pilots", "Smart contracts"],
    projects: [
      { name: "Objkt", category: "NFT Marketplace", description: "NFT marketplace and creator platform in the Tezos ecosystem.", status: "Live", region: "Global" },
      { name: "Plenty", category: "DeFi", description: "Decentralized exchange and DeFi protocol for Tezos assets.", status: "Live", region: "Global" },
      { name: "Youves", category: "DeFi", description: "Synthetic assets and stablecoin protocol on Tezos.", status: "Live", region: "Global" },
      { name: "Kukai", category: "Wallet", description: "Wallet and user access layer for Tezos applications.", status: "Live", region: "Global" },
      { name: "fxhash", category: "NFT Infrastructure", description: "Generative art and NFT platform with strong Tezos ecosystem activity.", status: "Live", region: "Global" },
      { name: "Tezos Domains", category: "Identity", description: "Naming and identity infrastructure for Tezos addresses.", status: "Live", region: "Global" }
    ]
  },
  {
    slug: "internet-computer",
    name: "Internet Computer",
    logoText: "ICP",
    logoSrc: "/assets/chain-logos/internet-computer.svg",
    accent: "purple",
    summary: "Internet Computer is a web-speed blockchain platform for onchain applications, identity, compute, AI-adjacent apps and fully onchain services.",
    standsOutFor: ["Onchain compute", "Identity", "Web apps", "AI apps"],
    projects: [
      { name: "Internet Identity", category: "Identity", description: "Passwordless identity system for Internet Computer applications.", status: "Live", region: "Global" },
      { name: "OpenChat", category: "Social", description: "Onchain messaging and community application built on Internet Computer.", status: "Live", region: "Global" },
      { name: "DSCVR", category: "Social", description: "Social platform and community network with Internet Computer roots.", status: "Live", region: "Global" },
      { name: "Sonic", category: "DeFi", description: "Decentralized exchange and DeFi protocol on Internet Computer.", status: "Live", region: "Global" },
      { name: "ICPSwap", category: "DeFi", description: "Swap, liquidity and token launch infrastructure for ICP assets.", status: "Live", region: "Global" },
      { name: "BOB", category: "Compute", description: "Proof-of-work and compute-oriented project in the Internet Computer ecosystem.", status: "Live", region: "Global" }
    ]
  },
  {
    slug: "sei",
    name: "Sei",
    logoText: "S",
    logoSrc: "/assets/chain-logos/sei.svg",
    accent: "red",
    summary: "Sei is a high-performance blockchain ecosystem focused on trading, DeFi, parallelized execution and EVM-compatible applications.",
    standsOutFor: ["Trading", "Parallel execution", "EVM apps", "DeFi"],
    projects: [
      { name: "Astroport", category: "DeFi", description: "Decentralized exchange and liquidity protocol deployed in the Sei ecosystem.", status: "Live", region: "Global" },
      { name: "Yei Finance", category: "DeFi", description: "Lending and borrowing protocol on Sei.", status: "Live", region: "Global" },
      { name: "Silo", category: "DeFi", description: "Liquid staking and DeFi infrastructure associated with Sei.", status: "Live", region: "Global" },
      { name: "Compass Wallet", category: "Wallet", description: "Wallet and app access layer for Sei users.", status: "Live", region: "Global" },
      { name: "Pallet Exchange", category: "NFT Marketplace", description: "NFT marketplace and collectibles platform in the Sei ecosystem.", status: "Live", region: "Global" },
      { name: "DragonSwap", category: "DeFi", description: "Decentralized exchange and liquidity protocol for Sei assets.", status: "Live", region: "Global" }
    ]
  },
  {
    slug: "injective",
    name: "Injective",
    logoText: "I",
    logoSrc: "/assets/chain-logos/injective.svg",
    accent: "blue",
    summary: "Injective is a finance-focused blockchain ecosystem for derivatives, exchanges, structured products, RWAs and institutional onchain markets.",
    standsOutFor: ["Derivatives", "DeFi", "Onchain finance", "RWAs"],
    projects: [
      { name: "Helix", category: "Trading", description: "Decentralized exchange and derivatives trading interface for Injective.", status: "Live", region: "Global" },
      { name: "Astroport", category: "DeFi", description: "Liquidity and decentralized exchange protocol with Injective deployment.", status: "Live", region: "Global" },
      { name: "DojoSwap", category: "DeFi", description: "Decentralized exchange and token launch ecosystem on Injective.", status: "Live", region: "Global" },
      { name: "Hydro Protocol", category: "DeFi", description: "Liquid staking and structured DeFi protocol in the Injective ecosystem.", status: "Live", region: "Global" },
      { name: "Talis Protocol", category: "NFT Marketplace", description: "NFT marketplace and creator platform connected to Injective.", status: "Live", region: "Global" },
      { name: "Mito", category: "DeFi", description: "Automated strategy and vault protocol for Injective users.", status: "Live", region: "Global" }
    ]
  },
  {
    slug: "gnosis-chain",
    name: "Gnosis Chain",
    logoText: "G",
    logoSrc: "/assets/chain-logos/gnosis-chain.svg",
    accent: "green",
    summary: "Gnosis Chain is an EVM network known for payments, DAOs, wallets, public goods and low-cost Ethereum-compatible applications.",
    standsOutFor: ["EVM apps", "DAOs", "Payments", "Public goods"],
    projects: [
      { name: "Gnosis Pay", category: "Payments", description: "Onchain payments and card infrastructure connected to Gnosis.", status: "Live", region: "Global" },
      { name: "Safe", category: "Wallet Infrastructure", description: "Smart account and multisig infrastructure with Gnosis ecosystem roots.", status: "Live", region: "Global" },
      { name: "CoW Swap", category: "DeFi", description: "Intent-based trading and MEV-aware swap protocol connected to Gnosis.", status: "Live", region: "Global" },
      { name: "HOPR", category: "Privacy", description: "Privacy and data transport protocol active in the Gnosis ecosystem.", status: "Live", region: "Global" },
      { name: "Circles", category: "Community Currency", description: "Community currency and social money application on Gnosis Chain.", status: "Live", region: "Global" },
      { name: "Balancer", category: "DeFi", description: "Liquidity protocol deployed across Ethereum-compatible networks including Gnosis.", status: "Live", region: "Global" }
    ]
  },
  {
    slug: "zksync",
    name: "zkSync",
    logoText: "ZK",
    logoSrc: "/assets/chain-logos/zksync.svg",
    accent: "black",
    summary: "zkSync is an Ethereum Layer 2 ecosystem using zero-knowledge proofs for scalable, lower-cost EVM-compatible applications.",
    standsOutFor: ["ZK rollup", "Ethereum scaling", "DeFi", "EVM apps"],
    projects: [
      { name: "SyncSwap", category: "DeFi", description: "Decentralized exchange and liquidity protocol on zkSync.", status: "Live", region: "Global" },
      { name: "Maverick Protocol", category: "DeFi", description: "Liquidity infrastructure and AMM with zkSync ecosystem activity.", status: "Live", region: "Global" },
      { name: "Mute", category: "DeFi", description: "DEX and liquidity protocol for zkSync users.", status: "Live", region: "Global" },
      { name: "Holdstation", category: "Wallet and Trading", description: "Smart wallet and trading application in the zkSync ecosystem.", status: "Live", region: "Global" },
      { name: "ReactorFusion", category: "DeFi", description: "Lending and borrowing protocol active on zkSync.", status: "Live", region: "Global" },
      { name: "Koi Finance", category: "DeFi", description: "Liquidity and yield platform for zkSync assets.", status: "Live", region: "Global" }
    ]
  },
  {
    slug: "starknet",
    name: "Starknet",
    logoText: "S",
    logoSrc: "/assets/chain-logos/starknet.svg",
    accent: "purple",
    summary: "Starknet is an Ethereum Layer 2 ecosystem using validity proofs and Cairo-based smart contracts for scalable applications.",
    standsOutFor: ["ZK scaling", "Cairo", "Ethereum L2", "DeFi"],
    projects: [
      { name: "Argent X", category: "Wallet", description: "Smart wallet and account abstraction gateway for Starknet users.", status: "Live", region: "Global" },
      { name: "Braavos", category: "Wallet", description: "Smart wallet and user access layer for Starknet applications.", status: "Live", region: "Global" },
      { name: "Ekubo", category: "DeFi", description: "Automated market maker and liquidity protocol on Starknet.", status: "Live", region: "Global" },
      { name: "JediSwap", category: "DeFi", description: "Community-driven decentralized exchange in the Starknet ecosystem.", status: "Live", region: "Global" },
      { name: "Nostra", category: "DeFi", description: "Lending, borrowing and stablecoin protocol on Starknet.", status: "Live", region: "Global" },
      { name: "AVNU", category: "DeFi Infrastructure", description: "DEX aggregator and trading infrastructure for Starknet.", status: "Live", region: "Global" }
    ]
  },
  {
    slug: "linea",
    name: "Linea",
    logoText: "L",
    logoSrc: "/assets/chain-logos/linea.svg",
    accent: "black",
    summary: "Linea is an Ethereum Layer 2 ecosystem built by Consensys, focused on EVM-compatible DeFi, wallets, tooling and scalable applications.",
    standsOutFor: ["Ethereum L2", "EVM", "Consensys ecosystem", "DeFi"],
    projects: [
      { name: "MetaMask", category: "Wallet", description: "Wallet and app gateway with deep Linea ecosystem integration.", status: "Live", region: "Global" },
      { name: "Lynex", category: "DeFi", description: "Decentralized exchange and liquidity hub on Linea.", status: "Live", region: "Global" },
      { name: "Nile Exchange", category: "DeFi", description: "Liquidity and DEX protocol in the Linea ecosystem.", status: "Live", region: "Global" },
      { name: "Mendi Finance", category: "DeFi", description: "Lending and borrowing protocol active on Linea.", status: "Live", region: "Global" },
      { name: "ZeroLend", category: "DeFi", description: "Lending market with Linea deployment.", status: "Live", region: "Global" },
      { name: "Velocore", category: "DeFi", description: "Decentralized exchange and liquidity protocol for Linea users.", status: "Live", region: "Global" }
    ]
  },
  {
    slug: "scroll",
    name: "Scroll",
    logoText: "S",
    logoSrc: "/assets/chain-logos/scroll.svg",
    accent: "yellow",
    summary: "Scroll is an Ethereum zkEVM Layer 2 ecosystem focused on Ethereum-equivalent scaling, DeFi, wallets and developer-friendly applications.",
    standsOutFor: ["zkEVM", "Ethereum scaling", "DeFi", "Developer tooling"],
    projects: [
      { name: "Ambient Finance", category: "DeFi", description: "Decentralized exchange and liquidity protocol deployed on Scroll.", status: "Live", region: "Global" },
      { name: "Pencil Protocol", category: "DeFi", description: "Launchpad and yield infrastructure in the Scroll ecosystem.", status: "Live", region: "Global" },
      { name: "Zebra", category: "DeFi", description: "DEX and liquidity protocol built for Scroll users.", status: "Live", region: "Global" },
      { name: "Aave", category: "DeFi", description: "Lending protocol with Scroll ecosystem deployment.", status: "Live", region: "Global" },
      { name: "LayerBank", category: "DeFi", description: "Lending and borrowing protocol active on Scroll.", status: "Live", region: "Global" },
      { name: "Scroll Canvas", category: "Identity", description: "Onchain identity and achievement experience for Scroll users.", status: "Live", region: "Global" }
    ]
  },
  {
    slug: "celestia",
    name: "Celestia",
    logoText: "C",
    logoSrc: "/assets/chain-logos/celestia.svg",
    accent: "purple",
    summary: "Celestia is a modular data availability network used by rollups, appchains and modular blockchain infrastructure teams.",
    standsOutFor: ["Data availability", "Modular blockchains", "Rollups", "Appchains"],
    projects: [
      { name: "Manta Pacific", category: "Layer 2", description: "Modular Ethereum Layer 2 using Celestia data availability.", status: "Live", region: "Global" },
      { name: "Eclipse", category: "Layer 2", description: "Modular rollup ecosystem using Celestia for data availability.", status: "Live", region: "Global" },
      { name: "Dymension", category: "Rollup Infrastructure", description: "RollApp infrastructure connected to modular data availability ecosystems.", status: "Live", region: "Global" },
      { name: "Fuel", category: "Rollup Infrastructure", description: "Modular execution layer and rollup technology ecosystem.", status: "Live", region: "Global" },
      { name: "Sovereign Labs", category: "Developer Infrastructure", description: "Rollup framework and modular blockchain infrastructure provider.", status: "Live", region: "Global" },
      { name: "Astria", category: "Sequencing", description: "Shared sequencing infrastructure for modular rollups.", status: "Live", region: "Global" }
    ]
  },
  {
    slug: "vechain",
    name: "VeChain",
    logoText: "V",
    logoSrc: "/assets/chain-logos/vechain.svg",
    accent: "blue",
    summary: "VeChain is an enterprise blockchain ecosystem focused on supply chains, sustainability, traceability, tokenization and business workflows.",
    standsOutFor: ["Supply chain", "Sustainability", "Traceability", "Enterprise"],
    projects: [
      { name: "VeBetterDAO", category: "Sustainability", description: "Sustainability and impact application ecosystem built around VeChain.", status: "Live", region: "Global" },
      { name: "VeWorld", category: "Wallet", description: "Wallet and application gateway for VeChain users.", status: "Live", region: "Global" },
      { name: "VORJ", category: "Developer Infrastructure", description: "No-code and low-code blockchain deployment tools for VeChain.", status: "Live", region: "Global" },
      { name: "Mugshot", category: "Consumer", description: "Consumer and sustainability application associated with VeBetterDAO.", status: "Live", region: "Global" },
      { name: "Vyvo Smart Chain", category: "Health and DePIN", description: "Health data and wearable ecosystem connected to VeChain initiatives.", status: "Live", region: "Global" },
      { name: "VeChain ToolChain", category: "Enterprise", description: "Enterprise blockchain tooling for traceability and business workflows.", status: "Live", region: "Global" }
    ]
  },
  {
    slug: "flow",
    name: "Flow",
    logoText: "F",
    logoSrc: "/assets/chain-logos/flow.svg",
    accent: "green",
    summary: "Flow is a consumer blockchain ecosystem known for NFTs, sports collectibles, gaming, entertainment and mainstream digital experiences.",
    standsOutFor: ["Consumer apps", "NFTs", "Sports collectibles", "Gaming"],
    projects: [
      { name: "NBA Top Shot", category: "Collectibles", description: "Sports collectible marketplace and mainstream NFT experience built on Flow.", status: "Live", region: "Global" },
      { name: "NFL ALL DAY", category: "Collectibles", description: "Official football collectible experience using Flow infrastructure.", status: "Live", region: "Global" },
      { name: "Dapper Wallet", category: "Wallet", description: "Consumer wallet and account system for Flow applications.", status: "Live", region: "Global" },
      { name: "Flowty", category: "NFT Marketplace", description: "NFT marketplace and lending platform for Flow assets.", status: "Live", region: "Global" },
      { name: "IncrementFi", category: "DeFi", description: "DeFi and liquidity protocol active in the Flow ecosystem.", status: "Live", region: "Global" },
      { name: "Blocto", category: "Wallet", description: "Wallet and onboarding layer with Flow ecosystem support.", status: "Live", region: "Global" }
    ]
  },
  {
    slug: "iotex",
    name: "IoTeX",
    logoText: "I",
    logoSrc: "/assets/chain-logos/iotex.svg",
    accent: "blue",
    summary: "IoTeX is a DePIN and machine economy blockchain ecosystem focused on connected devices, physical infrastructure and verifiable real-world data.",
    standsOutFor: ["DePIN", "Machine economy", "Devices", "Real-world data"],
    projects: [
      { name: "W3bstream", category: "DePIN Infrastructure", description: "Offchain compute and data infrastructure for DePIN applications.", status: "Live", region: "Global" },
      { name: "ioPay", category: "Wallet", description: "Wallet and application access layer for IoTeX users.", status: "Live", region: "Global" },
      { name: "Mimo", category: "DeFi", description: "Decentralized exchange and liquidity protocol in the IoTeX ecosystem.", status: "Live", region: "Global" },
      { name: "Pebble", category: "Device Infrastructure", description: "Trusted hardware and sensor device associated with IoTeX data use cases.", status: "Live", region: "Global" },
      { name: "DePINscan", category: "Analytics", description: "Analytics and discovery platform for DePIN networks.", status: "Live", region: "Global" },
      { name: "MachineFi", category: "DePIN", description: "Machine economy and device coordination ecosystem associated with IoTeX.", status: "Live", region: "Global" }
    ]
  },
  {
    slug: "peaq",
    name: "peaq",
    logoText: "P",
    logoSrc: "/assets/chain-logos/peaq.svg",
    accent: "green",
    summary: "peaq is a DePIN-focused blockchain ecosystem for machine networks, connected devices, mobility, energy and real-world infrastructure applications.",
    standsOutFor: ["DePIN", "Machine networks", "Mobility", "Energy"],
    projects: [
      { name: "Silencio", category: "DePIN", description: "Noise intelligence and community data network in the peaq ecosystem.", status: "Live", region: "Global" },
      { name: "MapMetrics", category: "DePIN", description: "Drive-to-earn mapping and mobility data network.", status: "Live", region: "Global" },
      { name: "ELOOP", category: "Mobility", description: "Car-sharing and tokenized mobility initiative connected to peaq.", status: "Live", region: "Europe" },
      { name: "Natix", category: "DePIN", description: "Camera and geospatial intelligence network associated with DePIN ecosystems.", status: "Live", region: "Global" },
      { name: "Wingbits", category: "DePIN", description: "Flight tracking and aviation data network with peaq ecosystem relevance.", status: "Live", region: "Global" },
      { name: "Krest", category: "Test Network", description: "Canary network and testing environment for peaq-oriented DePIN applications.", status: "Live", region: "Global" }
    ]
  },
  {
    slug: "berachain",
    name: "Berachain",
    logoText: "B",
    logoSrc: "/assets/chain-logos/berachain.svg",
    accent: "yellow",
    summary: "Berachain is an EVM-compatible blockchain ecosystem centered on proof of liquidity, DeFi-native applications and liquidity coordination.",
    standsOutFor: ["Proof of liquidity", "EVM apps", "DeFi", "Liquidity"],
    projects: [
      { name: "BEX", category: "DeFi", description: "Native exchange and liquidity venue for Berachain ecosystem assets.", status: "Live", region: "Global" },
      { name: "BEND", category: "DeFi", description: "Native lending and borrowing market associated with Berachain.", status: "Live", region: "Global" },
      { name: "BERPS", category: "Trading", description: "Perpetuals and derivatives product associated with Berachain.", status: "Live", region: "Global" },
      { name: "Infrared Finance", category: "Staking", description: "Liquid staking and proof-of-liquidity infrastructure for Berachain.", status: "Live", region: "Global" },
      { name: "Kodiak Finance", category: "DeFi", description: "Decentralized exchange and liquidity protocol in the Berachain ecosystem.", status: "Live", region: "Global" },
      { name: "Honey", category: "Stablecoins", description: "Native stablecoin and liquidity asset in the Berachain ecosystem.", status: "Live", region: "Global" }
    ]
  },
  {
    slug: "monad",
    name: "Monad",
    logoText: "M",
    logoSrc: "/assets/chain-logos/monad.svg",
    accent: "purple",
    summary: "Monad is an EVM-compatible high-performance blockchain ecosystem oriented around parallel execution, DeFi, consumer apps and developer migration.",
    standsOutFor: ["Parallel EVM", "Developer migration", "DeFi", "High performance"],
    projects: [
      { name: "Monad", category: "Layer 1", description: "High-performance EVM-compatible blockchain infrastructure.", status: "Live", region: "Global" },
      { name: "Pyth Network", category: "Oracle Infrastructure", description: "Oracle and market data infrastructure with Monad ecosystem relevance.", status: "Live", region: "Global" },
      { name: "LayerZero", category: "Interoperability", description: "Cross-chain messaging infrastructure supporting emerging EVM ecosystems.", status: "Live", region: "Global" },
      { name: "Wormhole", category: "Interoperability", description: "Cross-chain messaging and asset movement infrastructure for new ecosystems.", status: "Live", region: "Global" },
      { name: "Owlto Finance", category: "Bridge", description: "Bridge and transfer product supporting EVM ecosystem onboarding.", status: "Live", region: "Global" },
      { name: "Rabby Wallet", category: "Wallet", description: "EVM wallet and app access layer relevant for Monad users.", status: "Live", region: "Global" }
    ]
  },
  {
    slug: "kava",
    name: "Kava",
    logoText: "K",
    logoSrc: "/assets/chain-logos/kava.svg",
    accent: "black",
    summary: "Kava is a Cosmos and EVM-compatible blockchain ecosystem focused on DeFi, stablecoins, lending and cross-chain liquidity.",
    standsOutFor: ["Cosmos and EVM", "DeFi", "Stablecoins", "Cross-chain liquidity"],
    projects: [
      { name: "Kava Lend", category: "DeFi", description: "Lending and borrowing protocol associated with the Kava ecosystem.", status: "Live", region: "Global" },
      { name: "Kava Swap", category: "DeFi", description: "Swap and liquidity infrastructure for Kava assets.", status: "Live", region: "Global" },
      { name: "Curve Finance", category: "DeFi", description: "Stablecoin and liquidity protocol with Kava deployment.", status: "Live", region: "Global" },
      { name: "Tether USDt", category: "Stablecoins", description: "USDt stablecoin support in the Kava ecosystem.", status: "Live", region: "Global" },
      { name: "Fireblocks", category: "Custody Infrastructure", description: "Institutional custody and wallet infrastructure with Kava support.", status: "Live", region: "Global" },
      { name: "Cosmostation", category: "Wallet", description: "Wallet and staking interface supporting Kava and Cosmos ecosystems.", status: "Live", region: "Global" }
    ]
  },
  {
    slug: "xdc-network",
    name: "XDC Network",
    logoText: "X",
    logoSrc: "/assets/chain-logos/xdc-network.svg",
    accent: "blue",
    summary: "XDC Network is an enterprise and trade finance oriented blockchain ecosystem focused on tokenization, payments and institutional workflows.",
    standsOutFor: ["Trade finance", "Enterprise", "Tokenization", "Payments"],
    projects: [
      { name: "TradeFinex", category: "Trade Finance", description: "Trade finance and enterprise marketplace associated with XDC Network.", status: "Live", region: "Global" },
      { name: "XDC Trade Network", category: "Enterprise", description: "Enterprise and trade finance workflow infrastructure for XDC users.", status: "Live", region: "Global" },
      { name: "Fathom", category: "DeFi", description: "DeFi and stablecoin protocol in the XDC ecosystem.", status: "Live", region: "Global" },
      { name: "XSwap Protocol", category: "DeFi", description: "Decentralized exchange and liquidity protocol on XDC Network.", status: "Live", region: "Global" },
      { name: "Prime Numbers", category: "NFT and DeFi", description: "NFT, DeFi and ecosystem application suite on XDC.", status: "Live", region: "Global" },
      { name: "BlocksScan", category: "Explorer", description: "Explorer and analytics interface for XDC Network activity.", status: "Live", region: "Global" }
    ]
  },
  {
    slug: "chiliz",
    name: "Chiliz",
    logoText: "C",
    logoSrc: "/assets/chain-logos/chiliz.svg",
    accent: "red",
    summary: "Chiliz is a sports and entertainment blockchain ecosystem focused on fan tokens, clubs, loyalty, gaming and brand engagement.",
    standsOutFor: ["Sports", "Fan tokens", "Entertainment", "Loyalty"],
    projects: [
      { name: "Socios.com", category: "Fan Engagement", description: "Fan token and sports engagement platform powered by Chiliz.", status: "Live", region: "Global" },
      { name: "Chiliz Chain", category: "Sports Infrastructure", description: "Blockchain infrastructure for sports and entertainment applications.", status: "Live", region: "Global" },
      { name: "Paris Saint-Germain Fan Token", category: "Fan Tokens", description: "Club fan token and engagement product in the Chiliz ecosystem.", status: "Live", region: "Europe" },
      { name: "FC Barcelona Fan Token", category: "Fan Tokens", description: "Club fan token and engagement product in the Chiliz ecosystem.", status: "Live", region: "Europe" },
      { name: "Juventus Fan Token", category: "Fan Tokens", description: "Club fan token and engagement product in the Chiliz ecosystem.", status: "Live", region: "Europe" },
      { name: "Rarible Protocol", category: "NFT Infrastructure", description: "NFT infrastructure with sports and brand ecosystem relevance.", status: "Live", region: "Global" }
    ]
  },
  {
    slug: "ronin",
    name: "Ronin",
    logoText: "R",
    logoSrc: "/assets/chain-logos/ronin.svg",
    accent: "blue",
    summary: "Ronin is a gaming-focused blockchain ecosystem known for Axie Infinity, game economies, wallets and consumer onboarding.",
    standsOutFor: ["Gaming", "Consumer apps", "NFTs", "Wallets"],
    projects: [
      { name: "Axie Infinity", category: "Gaming", description: "Flagship play-and-own game ecosystem built on Ronin.", status: "Live", region: "Global" },
      { name: "Ronin Wallet", category: "Wallet", description: "Wallet and user access layer for Ronin games and assets.", status: "Live", region: "Global" },
      { name: "Katana", category: "DeFi", description: "Decentralized exchange and liquidity protocol for Ronin assets.", status: "Live", region: "Global" },
      { name: "Pixels", category: "Gaming", description: "Social farming and gaming application active on Ronin.", status: "Live", region: "Global" },
      { name: "Apeiron", category: "Gaming", description: "Strategy and god-game ecosystem connected to Ronin.", status: "Live", region: "Global" },
      { name: "Mavis Market", category: "NFT Marketplace", description: "NFT marketplace for Ronin gaming assets.", status: "Live", region: "Global" }
    ]
  },
  {
    slug: "moonbeam",
    name: "Moonbeam",
    logoText: "M",
    logoSrc: "/assets/chain-logos/moonbeam.svg",
    accent: "purple",
    summary: "Moonbeam is an EVM-compatible smart contract platform in the Polkadot ecosystem focused on cross-chain applications and developer migration.",
    standsOutFor: ["EVM", "Polkadot", "Cross-chain apps", "DeFi"],
    projects: [
      { name: "Moonwell", category: "DeFi", description: "Lending and borrowing protocol with Moonbeam ecosystem roots.", status: "Live", region: "Global" },
      { name: "StellaSwap", category: "DeFi", description: "Decentralized exchange and liquidity protocol on Moonbeam.", status: "Live", region: "Global" },
      { name: "Beamswap", category: "DeFi", description: "DEX and DeFi platform in the Moonbeam ecosystem.", status: "Live", region: "Global" },
      { name: "Solarbeam", category: "DeFi", description: "Automated market maker and liquidity protocol for Moonbeam assets.", status: "Live", region: "Global" },
      { name: "Axelar", category: "Interoperability", description: "Cross-chain messaging and interoperability infrastructure connected to Moonbeam.", status: "Live", region: "Global" },
      { name: "SubQuery", category: "Developer Infrastructure", description: "Data indexing and developer infrastructure with Polkadot and Moonbeam support.", status: "Live", region: "Global" }
    ]
  },
  {
    slug: "rootstock",
    name: "Rootstock",
    logoText: "R",
    logoSrc: "/assets/chain-logos/rootstock.svg",
    accent: "yellow",
    summary: "Rootstock is a Bitcoin sidechain ecosystem for EVM-compatible smart contracts, Bitcoin DeFi, payments and asset issuance.",
    standsOutFor: ["Bitcoin DeFi", "EVM smart contracts", "Payments", "Asset issuance"],
    projects: [
      { name: "Sovryn", category: "Bitcoin DeFi", description: "Bitcoin-native DeFi protocol using Rootstock infrastructure.", status: "Live", region: "Global" },
      { name: "Money on Chain", category: "Stablecoins", description: "Bitcoin-collateralized stablecoin and DeFi protocol on Rootstock.", status: "Live", region: "Global" },
      { name: "Tropykus", category: "DeFi", description: "Lending and savings protocol in the Rootstock ecosystem.", status: "Live", region: "Latin America" },
      { name: "RIF", category: "Infrastructure", description: "Infrastructure services for identity, payments and storage in the Rootstock ecosystem.", status: "Live", region: "Global" },
      { name: "Oku", category: "DeFi", description: "DEX interface and trading product with Rootstock support.", status: "Live", region: "Global" },
      { name: "Liquality", category: "Wallet", description: "Wallet and cross-chain asset management product with Bitcoin ecosystem support.", status: "Live", region: "Global" }
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
    { name: "MarginFi", category: "DeFi", description: "Lending and risk engine protocol in the Solana ecosystem.", status: "Live", region: "Global" },
    { name: "Meteora", category: "DeFi", description: "DLMM dynamic liquidity protocol formerly known as Mercurial.", status: "Live", region: "Global" },
    { name: "Save", category: "DeFi", description: "Lending and borrowing protocol formerly known as Solend.", status: "Live", region: "Global" },
    { name: "Lifinity", category: "DeFi", description: "Oracle-based proactive market maker.", status: "Live", region: "Global" },
    { name: "Jito", category: "Staking", description: "MEV infrastructure and liquid staking protocol for jitoSOL.", status: "Live", region: "Global" },
    { name: "Solflare", category: "Wallet", description: "Wallet with deep staking and validator user experience.", status: "Live", region: "Global" },
    { name: "Solana Pay", category: "Payments", description: "Open merchant-to-consumer payments protocol.", status: "Live", region: "Global" },
    { name: "pump.fun", category: "Launchpad", description: "Memecoin launchpad and token factory.", status: "Live", region: "Global" },
    { name: "LetsBONK", category: "Launchpad", description: "Bonding-curve token launchpad in the Bonk.fun ecosystem with Raydium.", status: "Live", region: "Global" },
    { name: "Ondo Finance", category: "Real World Assets", description: "Tokenized US Treasuries products including USDY and OUSG.", status: "Live", region: "Global" },
    { name: "Maple Finance", category: "Real World Assets", description: "Private credit and yield infrastructure including syrupUSDC.", status: "Live", region: "Global" },
    { name: "Etherfuse", category: "Real World Assets", description: "Tokenized government bonds and Stablebonds with a LatAm focus.", status: "Live", region: "Global" },
    { name: "Zeta Markets", category: "DeFi", description: "Derivatives and perpetuals DEX connected to Bullet L2.", status: "Live", region: "Global" },
    { name: "Step Finance", category: "Analytics", description: "Portfolio dashboard and Solana data platform.", status: "Live", region: "Global" },
    { name: "Phoenix", category: "DeFi", description: "Onchain central limit order book DEX built by Ellipsis Labs.", status: "Live", region: "Global" },
    { name: "Mango", category: "DeFi", description: "Margin trading and lending protocol in the Solana ecosystem.", status: "Live", region: "Global" },
    { name: "Perena", category: "DeFi", description: "Stablecoin AMM and stablecoin infrastructure for Solana.", status: "Live", region: "Global" },
    { name: "Switchboard", category: "Oracle Infrastructure", description: "Permissionless oracle and data network.", status: "Live", region: "Global" },
    { name: "TipLink", category: "Wallet", description: "Link-based wallet for non-crypto users and payments-adjacent onboarding.", status: "Live", region: "Global" },
    { name: "Sphere", category: "Payments", description: "Stablecoin cross-border payment rails through SpherePay and SphereNet.", status: "Live", region: "Global" },
    { name: "Coinflow", category: "Payments", description: "Fiat and crypto payment infrastructure.", status: "Live", region: "Global" },
    { name: "Decaf", category: "Payments", description: "Stablecoin commerce wallet and point-of-sale app with MoneyGram cash on and off ramp support.", status: "Live", region: "Global" },
    { name: "Helius", category: "Developer Infrastructure", description: "RPC, APIs and data streaming infrastructure for Solana developers.", status: "Live", region: "Global" },
    { name: "Triton One", category: "Developer Infrastructure", description: "Enterprise RPC and Yellowstone gRPC infrastructure.", status: "Live", region: "Global" },
    { name: "Syndica", category: "Developer Infrastructure", description: "RPC and node infrastructure for Solana applications.", status: "Live", region: "Global" },
    { name: "Anza", category: "Developer Infrastructure", description: "Core protocol team and Agave validator client spun out of Solana Labs.", status: "Live", region: "Global" },
    { name: "Squads", category: "Smart Accounts", description: "Multisig, smart accounts and treasury infrastructure.", status: "Live", region: "Global" },
    { name: "Believe", category: "Launchpad", description: "Token launches integrated into X.", status: "Live", region: "Global" },
    { name: "Moonshot", category: "Launchpad", description: "Mobile-first token trading and launch platform.", status: "Live", region: "Global" },
    { name: "Wormhole", category: "Interoperability", description: "Cross-chain messaging and bridging infrastructure powering Solana connectivity.", status: "Live", region: "Global" },
    { name: "deBridge", category: "Interoperability", description: "Cross-chain liquidity and messaging protocol.", status: "Live", region: "Global" },
    { name: "Mayan", category: "Interoperability", description: "Cross-chain swap protocol.", status: "Live", region: "Global" },
    { name: "Parcl", category: "Real World Assets", description: "Tokenized real estate price indices.", status: "Live", region: "Global" },
    { name: "BAXUS", category: "Real World Assets", description: "Tokenized whisky and collectibles marketplace.", status: "Live", region: "Global" },
    { name: "Backed", category: "Real World Assets", description: "Tokenized equities products including xStocks.", status: "Live", region: "Global" },
    { name: "Securitize", category: "Real World Assets", description: "Tokenization and compliance infrastructure for issuers including BUIDL and ACRED.", status: "Live", region: "Global" },
    { name: "Superstate", category: "Real World Assets", description: "Onchain equity issuance infrastructure including Opening Bell.", status: "Live", region: "Global" },
    { name: "io.net", category: "DePIN", description: "Decentralized GPU and compute network.", status: "Live", region: "Global" },
    { name: "Hivemapper", category: "DePIN", description: "Decentralized mapping network.", status: "Live", region: "Global" },
    { name: "Exchange Art", category: "NFT Marketplace", description: "Curated art NFT marketplace.", status: "Live", region: "Global" },
    { name: "DRiP", category: "NFT Infrastructure", description: "Digital collectibles distribution platform.", status: "Live", region: "Global" },
    { name: "Solayer", category: "Restaking", description: "Restaking, sUSD stablecoin and InfiniSVM infrastructure.", status: "Live", region: "Global" },
    { name: "Grass", category: "DePIN", description: "Decentralized data and bandwidth network for AI training data.", status: "Live", region: "Global" },
    { name: "Nosana", category: "DePIN", description: "Decentralized GPU compute network.", status: "Live", region: "Global" }
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
