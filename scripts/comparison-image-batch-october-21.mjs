export default [
  { slug: "rise-vs-franklin-vs-request-finance-crypto-payroll", title: "Crypto Payroll Operating Models", vendors: ["Rise", "Franklin", "Request Finance"], rows: [
    ["Documented scope", "Separate worker and payroll products", "Crypto and bankless payroll", "Salary requests and payments"],
    ["Payment evidence", "USD or USDC payroll funding", "Stablecoin-funded USD bank pay", "Crypto-funded fiat salaries"],
    ["Confirm first", "Worker model and service country", "Filing scope and signer controls", "Net-pay inputs and tax owner"]
  ] },
  { slug: "coinflow-vs-crossmint-vs-wert-digital-asset-checkout", title: "Digital-Asset Checkout", vendors: ["Coinflow", "Crossmint", "Wert"], rows: [
    ["Starting point", "Payment and settlement infrastructure", "Supported onchain-asset checkout", "Card-funded contract checkout"],
    ["Integration", "SDKs and payment-state events", "Hosted, embedded or headless", "Widget SDK and contract input"],
    ["Confirm first", "Asset delivery and dispute scope", "Asset and buyer-country limits", "Recipient and contract execution"]
  ] },
  { slug: "besu-vs-corda-vs-canton-private-ledger-architecture", title: "Private Ledger Architecture", vendors: ["Besu", "Corda", "Canton"], rows: [
    ["Execution model", "Ethereum / EVM foundation", "Documented UTXO ledger model", "Daml contracts on participants"],
    ["Coordination", "Configured validators", "Version-scoped notary services", "Participants and synchronizers"],
    ["Confirm first", "Access versus confidentiality", "Notary visibility and provenance", "Party visibility and connectivity"]
  ] }
];
