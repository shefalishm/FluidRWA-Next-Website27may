export type VendorComparisonCategoryId =
  | "tokenization"
  | "custody"
  | "kyc-aml"
  | "stablecoins"
  | "smart-contracts"
  | "blockchain-analytics"
  | "fiat-ramps"
  | "oracles"
  | "rpc"
  | "interoperability";

export type VendorComparisonVendor = {
  id: string;
  name: string;
  website: string;
  logoHint: string;
  bestFor: string;
  strengths: string[];
  watchouts: string[];
  pricingSignal: string;
  buyerQuestions: string[];
  useCases: string[];
  profileHref?: string;
};

export type VendorComparisonCategory = {
  id: VendorComparisonCategoryId;
  label: string;
  href: string;
  description: string;
  buyerIntent: string;
  vendors: VendorComparisonVendor[];
};

export const vendorComparisonCategories: VendorComparisonCategory[] = [
  {
    id: "tokenization",
    label: "Tokenization Platforms",
    href: "/vendors/tokenization-platforms",
    description: "Compare issuance, transfer-control, lifecycle and regulated digital securities infrastructure.",
    buyerIntent: "Best for issuers, asset managers and platforms preparing a tokenized fund, security, real estate, credit or RWA product.",
    vendors: [
      {
        id: "securitize",
        name: "Securitize",
        website: "https://securitize.io",
        logoHint: "S",
        bestFor: "Integrated regulated issuance and investor lifecycle workflows.",
        strengths: ["Digital securities operating stack", "Investor onboarding and lifecycle support", "Regulated market and transfer-agent ecosystem"],
        watchouts: ["Confirm which regulated affiliate is in scope", "May be more structured than teams wanting only token software", "Jurisdiction and asset eligibility need early review"],
        pricingSignal: "Enterprise / quote-based",
        buyerQuestions: ["Which entity provides each regulated service?", "Does the platform support this asset class?", "What secondary liquidity path is realistic?"],
        useCases: ["Tokenized funds", "Private securities", "Investor lifecycle operations"],
        profileHref: "/fluidrwa/securitize"
      },
      {
        id: "tokeny",
        name: "Tokeny",
        website: "https://tokeny.com",
        logoHint: "T",
        bestFor: "Permissioned token infrastructure and issuer-led compliant transfer controls.",
        strengths: ["ERC-3643 / T-REX focus", "Modular issuer control", "Strong permissioned-token architecture"],
        watchouts: ["Requires partner stack for some custody, distribution and regulated operations", "Implementation depends on issuer operating model", "Buyer must map legal rules into transfer logic"],
        pricingSignal: "Enterprise / quote-based",
        buyerQuestions: ["Who handles custody and investor onboarding?", "How portable is the token architecture?", "Which partners are required for launch?"],
        useCases: ["Permissioned securities", "Enterprise tokenization", "Issuer-controlled workflows"],
        profileHref: "/fluidrwa/tokeny"
      },
      {
        id: "taurus",
        name: "Taurus",
        website: "https://www.taurusgroup.ch",
        logoHint: "T",
        bestFor: "Banks and regulated institutions needing custody plus tokenization infrastructure.",
        strengths: ["Institutional custody and tokenization stack", "Bank-grade operating model", "Marketplace and digital asset infrastructure"],
        watchouts: ["Best fit may be larger institutions", "Confirm geography and deployment model", "May exceed needs of early-stage issuers"],
        pricingSignal: "Enterprise / quote-based",
        buyerQuestions: ["Do we need custody and issuance together?", "Which jurisdictions are supported?", "How does the marketplace component fit our plan?"],
        useCases: ["Bank tokenization programs", "Institutional custody", "Digital asset issuance"]
      }
    ]
  },
  {
    id: "custody",
    label: "Custody and Wallets",
    href: "/vendors/crypto-custody-providers",
    description: "Compare qualified custody, MPC wallet operations, treasury controls and settlement workflows.",
    buyerIntent: "Best for teams holding investor assets, reserve assets, operational wallets, admin keys or trading collateral.",
    vendors: [
      {
        id: "fireblocks",
        name: "Fireblocks",
        website: "https://www.fireblocks.com",
        logoHint: "F",
        bestFor: "MPC wallets, transfer policy, treasury and operational wallet workflows.",
        strengths: ["Policy-controlled operations", "MPC wallet infrastructure", "Broad network and workflow connectivity"],
        watchouts: ["Confirm whether separate regulated custody is needed", "Policy design requires careful implementation", "Cost and setup may be heavy for small teams"],
        pricingSignal: "Enterprise / quote-based",
        buyerQuestions: ["Who can approve transfers?", "Do we need legal custody or wallet infrastructure?", "Which chains and tokens are supported?"],
        useCases: ["Treasury operations", "Wallet governance", "Stablecoin and token workflows"],
        profileHref: "/fluidrwa/fireblocks"
      },
      {
        id: "bitgo",
        name: "BitGo",
        website: "https://www.bitgo.com",
        logoHint: "B",
        bestFor: "Regulated custody and institutional digital asset services.",
        strengths: ["Custody operating history", "Institutional asset support", "Trust-company and regulated service options"],
        watchouts: ["Confirm exact custody entity and jurisdiction", "Product fit varies by asset and region", "Operational integrations should be tested early"],
        pricingSignal: "Enterprise / quote-based",
        buyerQuestions: ["Is qualified custody required?", "Which entity signs the agreement?", "What reporting evidence is available?"],
        useCases: ["Qualified custody", "Funds and platforms", "Reserve safekeeping"],
        profileHref: "/fluidrwa/bitgo"
      },
      {
        id: "copper",
        name: "Copper",
        website: "https://copper.co",
        logoHint: "C",
        bestFor: "Institutional trading, collateral and off-exchange settlement workflows.",
        strengths: ["Settlement and trading workflow focus", "Institutional custody", "Collateral mobility"],
        watchouts: ["Best fit when trading or settlement matters", "Confirm venue coverage", "Legal model needs review for each market"],
        pricingSignal: "Enterprise / quote-based",
        buyerQuestions: ["Do we need off-exchange settlement?", "Which exchanges are supported?", "How is collateral represented and controlled?"],
        useCases: ["Trading collateral", "Exchange settlement", "Institutional custody"]
      }
    ]
  },
  {
    id: "kyc-aml",
    label: "KYC, AML and Identity",
    href: "/vendors/kyc-aml-providers",
    description: "Compare identity verification, KYB, sanctions screening, wallet risk and onboarding decisioning.",
    buyerIntent: "Best for products onboarding investors, issuers, businesses, wallets or users in regulated workflows.",
    vendors: [
      {
        id: "sumsub",
        name: "Sumsub",
        website: "https://sumsub.com",
        logoHint: "S",
        bestFor: "Broad KYC, KYB, fraud and crypto compliance workflows.",
        strengths: ["KYC and KYB coverage", "Crypto compliance modules", "Transaction monitoring and fraud tools"],
        watchouts: ["Confirm country depth and manual review process", "Wallet analytics needs may require specialist tooling", "Data retention terms matter"],
        pricingSignal: "Plan / quote-based",
        buyerQuestions: ["Which countries and document types are covered?", "Can we verify businesses and UBOs?", "How are reviews escalated?"],
        useCases: ["Investor onboarding", "KYB", "Crypto compliance"],
        profileHref: "/fluidrwa/sumsub"
      },
      {
        id: "persona",
        name: "Persona",
        website: "https://withpersona.com",
        logoHint: "P",
        bestFor: "Configurable identity workflows and onboarding orchestration.",
        strengths: ["Workflow flexibility", "Identity and KYB decisioning", "Strong onboarding customization"],
        watchouts: ["Wallet analytics may need another provider", "Configuration quality matters", "Coverage and pricing vary by flow"],
        pricingSignal: "Plan / quote-based",
        buyerQuestions: ["How complex is our onboarding journey?", "Do we need KYB or only KYC?", "What risk signals can be combined?"],
        useCases: ["Custom onboarding", "Business verification", "Risk decisioning"]
      },
      {
        id: "chainalysis",
        name: "Chainalysis",
        website: "https://www.chainalysis.com",
        logoHint: "C",
        bestFor: "Wallet screening, KYT, investigations and blockchain intelligence.",
        strengths: ["KYT and wallet risk", "Investigation tooling", "Regulator and institutional familiarity"],
        watchouts: ["Does not replace identity verification", "May be more than early teams need", "Alert design needs compliance staffing"],
        pricingSignal: "Enterprise / quote-based",
        buyerQuestions: ["Which chains and assets are monitored?", "Do we need pre-transaction screening?", "Who reviews alerts?"],
        useCases: ["Wallet screening", "Transaction monitoring", "Investigations"],
        profileHref: "/fluidrwa/chainalysis"
      }
    ]
  },
  {
    id: "stablecoins",
    label: "Stablecoin Infrastructure",
    href: "/vendors/stablecoin-infrastructure-providers",
    description: "Compare stablecoin issuance, orchestration, virtual accounts, payouts, treasury and settlement workflows.",
    buyerIntent: "Best for platforms using stablecoins for subscriptions, redemptions, payouts, merchant payments or treasury operations.",
    vendors: [
      {
        id: "circle",
        name: "Circle",
        website: "https://www.circle.com",
        logoHint: "C",
        bestFor: "USDC-native infrastructure, developer APIs, wallets and cross-chain USDC movement.",
        strengths: ["USDC ecosystem", "Developer APIs", "CCTP and programmable wallet tooling"],
        watchouts: ["Account access and product availability vary by region", "Best fit when USDC is central", "Mint/redeem model needs operational review"],
        pricingSignal: "Product-based / quote-based",
        buyerQuestions: ["Do we standardize on USDC?", "Which jurisdictions are supported?", "Do we need CCTP or programmable wallets?"],
        useCases: ["USDC settlement", "Programmable wallets", "Treasury movement"],
        profileHref: "/fluidrwa/circle"
      },
      {
        id: "bridge",
        name: "Bridge",
        website: "https://www.bridge.xyz",
        logoHint: "B",
        bestFor: "Embedded stablecoin orchestration and global money movement APIs.",
        strengths: ["Stablecoin orchestration", "API-led infrastructure", "Embedded financial workflows"],
        watchouts: ["Confirm product availability after ownership changes", "Coverage and onboarding should be checked early", "May require deeper integration planning"],
        pricingSignal: "Quote-based",
        buyerQuestions: ["Which corridors and currencies are supported?", "How does compliance handoff work?", "What implementation model is available?"],
        useCases: ["Global accounts", "Stablecoin orchestration", "Embedded payments"]
      },
      {
        id: "bvnk",
        name: "BVNK",
        website: "https://www.bvnk.com",
        logoHint: "B",
        bestFor: "Business stablecoin payments, virtual accounts, payouts and treasury workflows.",
        strengths: ["Business payment focus", "Fiat-stablecoin workflows", "Virtual accounts and treasury operations"],
        watchouts: ["Coverage varies by corridor", "Compliance and settlement terms need review", "Not just a developer wallet tool"],
        pricingSignal: "Quote-based",
        buyerQuestions: ["Which payment corridors matter?", "How are fiat and stablecoin balances reconciled?", "What onboarding is required?"],
        useCases: ["Business payouts", "Virtual accounts", "Stablecoin treasury"],
        profileHref: "/fluidrwa/bvnk"
      }
    ]
  },
  {
    id: "smart-contracts",
    label: "Smart Contract Development",
    href: "/vendors/smart-contract-development-companies",
    description: "Compare development, audit, contract libraries, implementation support and post-launch security workflows.",
    buyerIntent: "Best for teams building tokens, smart contracts, marketplaces, dApps, DeFi protocols or tokenized asset workflows.",
    vendors: [
      {
        id: "openzeppelin",
        name: "OpenZeppelin",
        website: "https://www.openzeppelin.com",
        logoHint: "OZ",
        bestFor: "Battle-tested smart contract libraries, security reviews and operational tooling.",
        strengths: ["Widely used contract standards", "Audit and security expertise", "Defender and operational tooling"],
        watchouts: ["Clarify whether the need is development, audit or operations", "Premium security expertise may be overkill for small scopes", "Availability and scope must be planned"],
        pricingSignal: "Open-source + quote-based services",
        buyerQuestions: ["Are we using standard contracts?", "Do we need audit or implementation?", "What happens after deployment?"],
        useCases: ["Contract standards", "Security review", "Operations tooling"],
        profileHref: "/fluidrwa/openzeppelin"
      },
      {
        id: "consensys-diligence",
        name: "Consensys Diligence",
        website: "https://consensys.io/diligence",
        logoHint: "CD",
        bestFor: "Independent smart contract audits, fuzzing and formal verification support.",
        strengths: ["Deep Ethereum security expertise", "Audit methodology", "Formal methods and testing tools"],
        watchouts: ["Primarily security review rather than full product build", "Timeline should be reserved early", "Remediation still needs engineering owner"],
        pricingSignal: "Quote-based",
        buyerQuestions: ["What is the audit scope?", "Will remediation be retested?", "Do we need formal verification?"],
        useCases: ["Independent audit", "Fuzzing", "Formal review"],
        profileHref: "/fluidrwa/consensys-diligence"
      },
      {
        id: "minddeft",
        name: "Minddeft",
        website: "https://minddeft.com",
        logoHint: "M",
        bestFor: "Custom blockchain and smart contract development for Web3 and tokenization teams.",
        strengths: ["Implementation partner", "Tokenization and dApp engineering", "Flexible development support"],
        watchouts: ["Independent audit should still be planned", "Scope and architecture ownership should be explicit", "References should match target chain and product type"],
        pricingSignal: "Project / quote-based",
        buyerQuestions: ["Do we need a builder before an auditor?", "Which chains are relevant?", "Who owns documentation and post-launch support?"],
        useCases: ["Custom smart contracts", "dApp development", "Tokenization implementation"],
        profileHref: "/fluidrwa/minddeft-technologies"
      }
    ]
  },
  {
    id: "blockchain-analytics",
    label: "Blockchain Analytics",
    href: "/vendors/compliance-infrastructure-providers",
    description: "Compare wallet screening, KYT, transaction monitoring, sanctions exposure and investigations.",
    buyerIntent: "Best for exchanges, stablecoin products, tokenization platforms, custodians and compliance teams monitoring onchain activity.",
    vendors: [
      {
        id: "chainalysis-analytics",
        name: "Chainalysis",
        website: "https://www.chainalysis.com",
        logoHint: "C",
        bestFor: "Mature KYT, investigations and regulator-facing blockchain intelligence.",
        strengths: ["KYT workflows", "Investigation depth", "Institutional familiarity"],
        watchouts: ["Identity verification needs separate tooling", "Can be heavy for small volumes", "Alert staffing matters"],
        pricingSignal: "Enterprise / quote-based",
        buyerQuestions: ["Which assets and chains are covered?", "Can we export case evidence?", "How are false positives managed?"],
        useCases: ["KYT", "Investigations", "Sanctions exposure"]
      },
      {
        id: "trm-labs",
        name: "TRM Labs",
        website: "https://www.trmlabs.com",
        logoHint: "TRM",
        bestFor: "Configurable transaction monitoring, threat intelligence and case management.",
        strengths: ["Configurable rules", "Threat intelligence", "Compliance and fraud workflows"],
        watchouts: ["Policy design needs internal ownership", "Data interpretation still requires compliance judgment", "Coverage should be tested against real wallets"],
        pricingSignal: "Enterprise / quote-based",
        buyerQuestions: ["Can rules match our risk policy?", "Which typologies matter?", "How does the API fit our workflow?"],
        useCases: ["Transaction monitoring", "Fraud triage", "Threat intelligence"],
        profileHref: "/fluidrwa/trm-labs"
      },
      {
        id: "elliptic",
        name: "Elliptic",
        website: "https://www.elliptic.co",
        logoHint: "E",
        bestFor: "Wallet screening, transaction monitoring and institutional crypto risk workflows.",
        strengths: ["Wallet risk context", "Monitoring and rescreening", "Institutional compliance fit"],
        watchouts: ["Confirm supported assets and workflows", "May need KYC/KYB alongside it", "Alert operations need staffing"],
        pricingSignal: "Enterprise / quote-based",
        buyerQuestions: ["Can it screen before transfer?", "Does it support automatic rescreening?", "What case evidence is retained?"],
        useCases: ["Wallet screening", "Transaction monitoring", "Risk scoring"],
        profileHref: "/fluidrwa/elliptic"
      }
    ]
  },
  {
    id: "fiat-ramps",
    label: "Fiat On/Off Ramps",
    href: "/vendors/fiat-on-off-ramp-providers",
    description: "Compare fiat-to-crypto checkout, off-ramp flows, payment methods, KYC and conversion.",
    buyerIntent: "Best for wallets, marketplaces, tokenization products and Web3 apps that need fiat funding or payouts.",
    vendors: [
      {
        id: "moonpay",
        name: "MoonPay",
        website: "https://www.moonpay.com",
        logoHint: "M",
        bestFor: "Polished consumer checkout and partner ramp products.",
        strengths: ["Consumer ramp UX", "Partner product portfolio", "Embedded and native checkout options"],
        watchouts: ["Availability varies by country", "Fees and limits need testing", "Product approval may be required"],
        pricingSignal: "Transaction fee / partner terms",
        buyerQuestions: ["Which countries convert best?", "Can checkout be embedded?", "Which payment methods are supported?"],
        useCases: ["Wallet funding", "Crypto purchases", "Consumer onboarding"]
      },
      {
        id: "transak",
        name: "Transak",
        website: "https://transak.com",
        logoHint: "T",
        bestFor: "Embedded on-ramp widgets and flexible fiat-to-crypto integrations.",
        strengths: ["Widget integration", "Local payment support", "KYC and onboarding flow"],
        watchouts: ["UX depends on country and verification step", "Confirm off-ramp coverage", "Checkout customization has limits"],
        pricingSignal: "Transaction fee / partner terms",
        buyerQuestions: ["Can we prefill wallet and user data?", "Which local methods matter?", "Can KYC happen smoothly?"],
        useCases: ["dApp onboarding", "Wallet funding", "Marketplace checkout"]
      },
      {
        id: "banxa",
        name: "Banxa",
        website: "https://www.banxa.com",
        logoHint: "B",
        bestFor: "Hosted checkout, buy/sell ramp workflows and transaction lifecycle tracking.",
        strengths: ["Hosted checkout", "Sandbox and webhook docs", "Buy and sell support"],
        watchouts: ["Coverage needs market-by-market review", "Conversion depends on payment method", "Operational handoff should be tested"],
        pricingSignal: "Transaction fee / partner terms",
        buyerQuestions: ["Do webhooks cover our lifecycle needs?", "Which assets and chains are supported?", "What happens on failed transactions?"],
        useCases: ["Hosted ramp checkout", "Off-ramp flow", "Exchange and wallet integration"],
        profileHref: "/fluidrwa/banxa"
      }
    ]
  },
  {
    id: "oracles",
    label: "Oracles and Data",
    href: "/vendors/oracles-data-proof-of-reserve",
    description: "Compare price feeds, proof of reserve, low-latency data and application-specific oracle models.",
    buyerIntent: "Best for products where external data controls pricing, reserves, collateral, NAV, minting, redemptions or risk checks.",
    vendors: [
      {
        id: "chainlink",
        name: "Chainlink",
        website: "https://chain.link",
        logoHint: "CL",
        bestFor: "Mature oracle infrastructure, price feeds, proof of reserve and broad ecosystem support.",
        strengths: ["Data feeds", "Proof of reserve", "Large ecosystem footprint"],
        watchouts: ["Feed availability and update logic must match product risk", "Costs vary by chain and feed", "Fallback design still matters"],
        pricingSignal: "Feed / network dependent",
        buyerQuestions: ["Does the exact feed exist?", "How fresh must the data be?", "What happens if the feed is stale?"],
        useCases: ["Price feeds", "Proof of reserve", "Collateral checks"]
      },
      {
        id: "pyth",
        name: "Pyth Network",
        website: "https://pyth.network",
        logoHint: "P",
        bestFor: "Low-latency market data from first-party publishers.",
        strengths: ["Fast market data", "First-party publishers", "Multi-chain verification"],
        watchouts: ["Confirm asset-feed availability", "Volatility behavior should be tested", "Best fit for price-sensitive apps"],
        pricingSignal: "Network / feed dependent",
        buyerQuestions: ["How low-latency does the product need to be?", "Which publisher sources matter?", "How is confidence data used?"],
        useCases: ["Trading", "Collateral valuation", "DeFi risk engines"]
      },
      {
        id: "redstone",
        name: "RedStone",
        website: "https://redstone.finance",
        logoHint: "R",
        bestFor: "Flexible oracle delivery models and efficient pull-based data workflows.",
        strengths: ["Pull model flexibility", "Modular feed design", "Efficient app-specific delivery"],
        watchouts: ["Security assumptions must be reviewed", "Integration model differs from traditional push feeds", "Audit and fallback design matter"],
        pricingSignal: "Feed / integration dependent",
        buyerQuestions: ["Does pull-based data fit our UX?", "How is signed data verified?", "What happens if data is unavailable?"],
        useCases: ["Custom feeds", "DeFi apps", "RWA data workflows"]
      }
    ]
  },
  {
    id: "rpc",
    label: "RPC and Nodes",
    href: "/vendors/node-as-a-service-rpc-providers",
    description: "Compare managed RPC, node access, webhooks, streams, archive data and blockchain APIs.",
    buyerIntent: "Best for production apps where balances, transfers, investor dashboards and monitoring depend on reliable chain access.",
    vendors: [
      {
        id: "alchemy",
        name: "Alchemy",
        website: "https://www.alchemy.com",
        logoHint: "A",
        bestFor: "Integrated developer APIs, smart wallets, webhooks and app infrastructure.",
        strengths: ["Developer platform", "Data APIs and webhooks", "Smart wallet tooling"],
        watchouts: ["May be broader than raw RPC needs", "Rate limits and cost should be modeled", "Chain coverage should match roadmap"],
        pricingSignal: "Free tier + usage / enterprise",
        buyerQuestions: ["Do we need smart wallets?", "Which APIs reduce engineering work?", "How does failover work?"],
        useCases: ["Investor dashboards", "Wallet UX", "Transaction monitoring"],
        profileHref: "/fluidrwa/alchemy"
      },
      {
        id: "quicknode",
        name: "QuickNode",
        website: "https://www.quicknode.com",
        logoHint: "Q",
        bestFor: "Multi-chain RPC, Streams, Webhooks and dedicated infrastructure options.",
        strengths: ["Multi-chain RPC", "Event streams", "Dedicated endpoint options"],
        watchouts: ["Test latency under real volume", "Product set can be broad", "Redundancy strategy still matters"],
        pricingSignal: "Free tier + usage / enterprise",
        buyerQuestions: ["Do we need event streams?", "Which chains need archive access?", "What is the SLA?"],
        useCases: ["RPC access", "Event monitoring", "Data pipelines"],
        profileHref: "/fluidrwa/quicknode"
      },
      {
        id: "infura",
        name: "Infura",
        website: "https://www.infura.io",
        logoHint: "I",
        bestFor: "Ethereum and Consensys-aligned managed API infrastructure.",
        strengths: ["Familiar Ethereum RPC", "Managed API access", "Consensys ecosystem fit"],
        watchouts: ["Multi-chain needs should be compared", "Rate and archive access need review", "Some products may need extra indexing"],
        pricingSignal: "Free tier + usage / enterprise",
        buyerQuestions: ["Are we Ethereum-first?", "Do we need archive methods?", "What API limits apply?"],
        useCases: ["Ethereum RPC", "IPFS", "Managed API access"]
      }
    ]
  },
  {
    id: "interoperability",
    label: "Cross-Chain Infrastructure",
    href: "/web3vendorecosystem",
    description: "Compare cross-chain messaging, token transfers, state queries, governance and multichain product workflows.",
    buyerIntent: "Best for teams moving assets, messages, data or product logic across multiple chains.",
    vendors: [
      {
        id: "layerzero",
        name: "LayerZero",
        website: "https://layerzero.network",
        logoHint: "LZ",
        bestFor: "Omnichain application logic and configurable cross-chain messaging.",
        strengths: ["OFT / omnichain patterns", "Configurable security", "Broad ecosystem support"],
        watchouts: ["Security configuration is a design decision", "Message failure handling needs planning", "Multi-chain complexity can grow quickly"],
        pricingSignal: "Network / integration dependent",
        buyerQuestions: ["Which DVNs secure messages?", "What happens if a message fails?", "Does the app need omnichain logic?"],
        useCases: ["Omnichain apps", "Cross-chain tokens", "Message passing"]
      },
      {
        id: "wormhole",
        name: "Wormhole",
        website: "https://wormhole.com",
        logoHint: "W",
        bestFor: "Modular cross-chain products for messaging, transfers, Connect, Queries and governance.",
        strengths: ["Multiple product modules", "Connect and token transfer tooling", "Cross-chain query and governance products"],
        watchouts: ["Choose the right module", "Wrapped/native token model matters", "Monitoring and recovery need review"],
        pricingSignal: "Network / integration dependent",
        buyerQuestions: ["Are we moving assets or messages?", "Do we need native or wrapped transfers?", "Which module fits the product?"],
        useCases: ["Token transfers", "Cross-chain queries", "Governance"]
      },
      {
        id: "axelar",
        name: "Axelar",
        website: "https://www.axelar.network",
        logoHint: "A",
        bestFor: "Interchain communication, general message passing and interchain token workflows.",
        strengths: ["General message passing", "Interchain Token Service", "Proof-of-stake network model"],
        watchouts: ["Supported chains and token model need validation", "Cross-chain failure handling should be designed", "Regulated assets need compliance controls around movement"],
        pricingSignal: "Network / integration dependent",
        buyerQuestions: ["Do we need GMP or interchain tokens?", "Which chains are in scope?", "How are token records reconciled?"],
        useCases: ["Interchain tokens", "Message passing", "Cross-chain app calls"]
      }
    ]
  }
];

export function getVendorComparisonCategory(id?: string) {
  return vendorComparisonCategories.find((category) => category.id === id) || vendorComparisonCategories[0];
}
