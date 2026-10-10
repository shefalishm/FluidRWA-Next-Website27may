export default [
  {
    slug: 'talos-vs-wyden-vs-finery-markets-institutional-trading',
    title: 'Institutional Trading Infrastructure',
    vendors: ['Talos', 'Wyden', 'Finery Markets'],
    rows: [
      ['Documented focus', 'OEMS and multi-venue execution', 'Institutional trading orchestration', 'ECN and white-label trading'],
      ['Workflow', 'Routing, RFQ and settlement tools', 'Trading and banking integration', 'OTC liquidity and client trading'],
      ['Confirm first', 'Modules, venues and eligibility', 'Integration and service ownership', 'Counterparties and settlement terms']
    ]
  },
  {
    slug: 'alloy-vs-unit21-vs-sardine-fintech-risk-compliance',
    title: 'Fintech Risk and Compliance',
    vendors: ['Alloy', 'Unit21', 'Sardine'],
    rows: [
      ['Documented focus', 'Identity and risk orchestration', 'AML monitoring and case operations', 'Fraud prevention and AML'],
      ['Workflow', 'Data sources and decision policies', 'Rules, alerts and investigations', 'Risk signals and monitoring'],
      ['Confirm first', 'Data coverage and decision ownership', 'Alert tuning and filing scope', 'Product scope and payment liability']
    ]
  },
  {
    slug: 'crypto-custody-providers-comparison-2026',
    title: 'Nine Custody and Wallet Providers',
    providerRows: true,
    vendors: ['Anchorage Digital', 'Coinbase Prime', 'BitGo', 'Gemini Custody', 'Fireblocks', 'Copper', 'Taurus', 'Fordefi', 'Utila'],
    rows: [
      ['Documented focus', 'Institutional custody', 'Custody and prime services', 'Custody and wallet services', 'Institutional custody', 'Wallet and asset infrastructure', 'Custody and settlement', 'Custody and tokenization', 'MPC wallet infrastructure', 'Wallet and stablecoin operations'],
      ['Confirm first', 'Entity and asset eligibility', 'Custody versus trading agreement', 'Custody entity and wallet controls', 'Assets and account structure', 'Technology versus legal custody', 'Venue and settlement dependencies', 'Product modules and deployment', 'Signing, recovery and DeFi controls', 'Policies and reconciliation']
    ]
  }
];
