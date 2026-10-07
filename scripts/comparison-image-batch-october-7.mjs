// Summaries of the decision tables in the corresponding articles, not new rankings.
export default [
  {
    slug: 'moonpay-vs-transak-vs-banxa-fiat-on-ramp-providers',
    title: 'Fiat On/Off-Ramp Integration',
    vendors: ['MoonPay', 'Transak', 'Banxa'],
    rows: [
      ['Starting point', 'Partner widget or hosted ramp', 'Configurable widget', 'Hosted checkout'],
      ['UI control', 'Confirm embedded or headless product scope', 'Whitelabel APIs for KYC and orders', 'Confirm Native API market scope'],
      ['Test first', 'Partner product approval by market', 'KYC steps and webhook lifecycles', 'Support state and reconciliation']
    ]
  },
  {
    slug: 'nownodes-vs-getblock-vs-drpc-multichain-rpc',
    title: 'Multi-Chain RPC Infrastructure',
    vendors: ['NOWNodes', 'GetBlock', 'dRPC'],
    rows: [
      ['Core model', 'Shared and dedicated multi-chain access', 'Shared and dedicated node catalog', 'Distributed provider routing'],
      ['Evaluate for', 'Many networks plus dedicated options', 'Chain-specific interfaces and deployment', 'Routing resilience and provider control'],
      ['Test first', 'Methods and archive mode per chain', 'Performance for each required chain', 'Routing operations and recovery']
    ]
  },
  {
    slug: 'securitize-vs-tokeny-vs-zoniqx-enterprise-tokenization-software',
    title: 'Enterprise Tokenization Software',
    vendors: ['Securitize', 'Tokeny', 'Zoniqx'],
    rows: [
      ['Core model', 'Integrated securities and fund ecosystem', 'Permissioned token compliance infrastructure', 'Modular issuance and lifecycle infrastructure'],
      ['Evaluate for', 'Regulated US asset workflows', 'EVM identity and transfer controls', 'Configurable multi-chain workflows'],
      ['Test first', 'Entity roles and service agreements', 'Transfer rules and implementation ownership', 'Licensed roles and production-ready modules']
    ]
  },
  {
    slug: 'hummingbird-vs-unit21-vs-flagright-aml-case-management',
    title: 'AML Case Management',
    vendors: ['Hummingbird', 'Unit21', 'Flagright'],
    rows: [
      ['Core model', 'Investigations, cases and reporting', 'Fraud and AML monitoring plus cases', 'AI-assisted AML and fraud operations'],
      ['Evaluate for', 'Teams retaining separate source vendors', 'Configurable integrated risk workflows', 'Integrated AI-assisted investigations'],
      ['Test first', 'Connectors and workflow configuration', 'Rule governance and module scope', 'AI validation and human approval']
    ]
  },
  {
    slug: 'trulioo-vs-veriff-vs-ondato-kyc-kyb-verification',
    title: 'KYC and KYB Verification',
    vendors: ['Trulioo', 'Veriff', 'Ondato'],
    rows: [
      ['Core model', 'Global person and business verification', 'Document and biometric identity workflows', 'Integrated KYC, KYB and AML operations'],
      ['Evaluate for', 'Multi-market person and business checks', 'Individual digital onboarding journeys', 'Consolidated compliance operations'],
      ['Test first', 'Local data and registry coverage', 'Capture experience and review paths', 'Module depth and case workflows']
    ]
  },
  {
    slug: 'kaleido-vs-settlemint-vs-avacloud-enterprise-blockchain-platforms',
    title: 'Enterprise Blockchain Platforms',
    vendors: ['Kaleido', 'SettleMint', 'AvaCloud'],
    rows: [
      ['Evaluate for', 'Digital assets and consortium networks', 'Multi-protocol enterprise applications', 'Dedicated Avalanche L1 operations'],
      ['Core model', 'Modular infrastructure and middleware', 'Low-code tooling and integrations', 'Managed custom L1 infrastructure'],
      ['Test first', 'Required modules and integration ownership', 'Protocol and deployment requirements', 'L1 operations and governance design']
    ]
  },
  {
    slug: 'notabene-vs-sygna-vs-verifyvasp-travel-rule',
    title: 'Travel Rule Compliance',
    vendors: ['Notabene', 'Sygna', 'VerifyVASP'],
    rows: [
      ['Evaluate for', 'Enterprise Travel Rule operations', 'VASP messaging and data exchange', 'VASP verification and messaging'],
      ['Core focus', 'Orchestration and counterparty risk', 'Originator and beneficiary data sharing', 'Counterparty verification network'],
      ['Test first', 'Policy workflow and jurisdiction fit', 'Connectivity and market coverage', 'Network coverage and interoperability']
    ]
  },
  {
    slug: 'layerzero-vs-wormhole-vs-axelar-interoperability',
    title: 'Cross-Chain Interoperability',
    vendors: ['LayerZero', 'Wormhole', 'Axelar'],
    rows: [
      ['Evaluate for', 'Configurable cross-chain app security', 'Modular token, message and query tools', 'Interchain apps and token workflows'],
      ['Core workflow', 'App logic and OFT/ONFT patterns', 'Transfers, messaging and Queries', 'GMP and Interchain Token Service'],
      ['Test first', 'Verifier configuration and execution', 'Product module and transfer model', 'Chain support and recovery paths']
    ]
  },
  {
    slug: 'fireblocks-vs-fordefi-vs-utila-institutional-wallet-infrastructure',
    title: 'Institutional Wallet Infrastructure',
    vendors: ['Fireblocks', 'Fordefi', 'Utila'],
    rows: [
      ['Evaluate for', 'Broad enterprise digital-asset operations', 'DeFi-focused funds, traders and builders', 'Stablecoin, treasury and payouts'],
      ['Core emphasis', 'Governance and network connectivity', 'Simulation and DeFi transaction policies', 'Operational MPC wallet workflows'],
      ['Test first', 'Module scope and responsibility', 'Exact chain and protocol coverage', 'Custody roles and required controls']
    ]
  },
  {
    slug: 'circle-vs-paxos-vs-brale-stablecoin-issuance-infrastructure',
    title: 'Stablecoin Issuance Infrastructure',
    vendors: ['Circle', 'Paxos', 'Brale'],
    rows: [
      ['Core model', 'USDC/EURC and Circle asset infrastructure', 'Regulated white-label issuance', 'Custom branded stablecoin infrastructure'],
      ['Operating focus', 'Mint, redeem and transfer supported assets', 'Issuance, reserves and redemption', 'Configure and operate branded tokens'],
      ['Test first', 'Entity eligibility and chain support', 'Issuing entity and redemption agreement', 'Legal structure and reserve controls']
    ]
  }
];
