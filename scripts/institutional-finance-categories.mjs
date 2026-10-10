export default [
  {
    slug: "institutional-digital-asset-trading-platforms",
    title: "Institutional Digital Asset Trading Platforms",
    eyebrow: "Execution and trading operations",
    description: "Compare institutional crypto trading software for order management, execution, liquidity connectivity and post-trade workflows. Shortlist by operating model.",
    dateModified: "2026-10-10",
    snapshot: ["3", "Execution", "Post-trade", "Buyer diligence"],
    scope: "Institutional digital asset trading platforms connect order management, execution and operational workflows. This directory covers software and trading infrastructure, not a ranking of exchanges, liquidity providers or DeFi derivatives protocols. A software integration does not establish counterparty approval, custody, credit access or regulatory eligibility.",
    checklist: [
      ["Execution and venue access", "Map order types, routing, RFQ and venue connections to the exact asset and trading strategy. Request the current supported-venue list and test rejects, duplicate orders, disconnects and recovery. Confirm who contracts with each counterparty."],
      ["Funding, credit and settlement", "Identify who owns funding, collateral, limits, custody and settlement at every hand-off. Verify which tools are included and which depend on separate providers or agreements. A trade confirmation is not final settlement."],
      ["Controls and evidence", "Require permissioning, approval controls, order histories, exports and integration responsibilities. Evaluate implementation, support, service levels and exit terms using realistic production workflows, not headline latency claims."]
    ],
    vendors: [
      ["Talos", "TA", "Order and execution management", "Institutions evaluating multi-venue order management and execution workflows.", "Talos documents a trading platform with liquidity aggregation, order routing, execution algorithms, RFQ and post-trade tools. Confirm the applicable modules, venue contracts and customer eligibility; software connectivity does not make Talos the custodian or liquidity counterparty.", ["OEMS", "Routing", "RFQ", "Post-trade"], "https://www.talos.com/our-solutions/trading"],
      ["Wyden", "WY", "Trading orchestration", "Banks and brokers connecting digital asset trading with custody and core banking operations.", "Wyden describes an institutional trading and operating layer spanning front-, middle- and back-office workflows, with exchange, OTC, custody and banking integrations. Confirm the chosen agency or principal model, supported connections and division of operational responsibility.", ["Trading orchestration", "Banking integration", "Custody connectivity", "Reporting"], "https://www.wyden.io/"],
      ["Finery Markets", "FM", "ECN and white-label infrastructure", "Teams evaluating electronic OTC trading and branded client-trading workflows.", "Finery Markets documents ECN and white-label trading infrastructure with order books, RFQ, quote streams and reporting. Confirm counterparty onboarding, credit, settlement terms and which features belong to the contracted product; the software does not remove counterparty risk.", ["ECN", "RFQ", "White-label", "OTC workflows"], "https://www.finerymarkets.com/white-label.html"]
    ],
    resources: [
      ["Talos vs Wyden vs Finery Markets: trading workflows compared", "/blog/talos-vs-wyden-vs-finery-markets-institutional-trading"],
      ["Crypto custody providers", "/vendors/crypto-custody-providers"],
      ["DeFi trading and margin infrastructure", "/vendors/defi-trading-margin-infrastructure"]
    ],
    faqs: [
      ["Is a trading platform the same as an exchange or custodian?", "No. Trading software may connect to venues, counterparties and custodians without providing those services itself. Confirm the contracting entities and responsibilities for execution, funding, credit and asset custody separately."],
      ["How should an institution compare these platforms?", "Start with the operating model, asset coverage and hardest workflow. Test venue connectivity, order controls, failure recovery, funding and post-trade exports. Validate eligibility and commercial scope directly with each provider."],
      ["Does this directory rank execution performance?", "No. The initial cohort comes from FluidRWA's existing institutional trading comparison. Descriptions summarize company documentation, not independent testing, performance scores or an exhaustive market ranking."]
    ]
  },
  {
    slug: "crypto-accounting-tax-software",
    title: "Crypto Accounting and Tax Software",
    eyebrow: "Digital asset finance operations",
    description: "Compare crypto accounting, reconciliation and tax-reporting software. Evaluate digital asset data, close workflows, controls and reporting responsibilities.",
    dateModified: "2026-10-10",
    snapshot: ["6", "Finance ops", "Reporting", "Buyer diligence"],
    scope: "Crypto accounting and tax software helps finance teams turn digital asset activity into financial records and reporting. Reconciliation, accounting policy, cost basis and information reporting are different buyer tasks; not every provider performs all of them. This directory separates documented focus from questions buyers must resolve with their finance and tax advisers.",
    checklist: [
      ["Data completeness and reconciliation", "Inventory wallets, exchanges, custodians, chains and internal records. Test historical imports, transfers, fees, missing transactions and duplicate records. Request exception queues and a trace from each reported balance back to source data."],
      ["Accounting and close controls", "Confirm classification rules, valuation inputs, accounting policies, entity boundaries and general-ledger mappings. Test approvals, adjustments, period locks and exports using your own transactions. Audit-ready marketing is not an auditor's opinion."],
      ["Tax and information reporting", "Specify jurisdictions, reporting entities, forms and taxpayer data requirements before selecting software. Confirm who interprets rules, approves filings, handles corrections and supplies tax advice. Bookkeeping support alone does not establish filing coverage."]
    ],
    vendors: [
      ["Taxbit", "TB", "Regulatory information reporting", "Digital asset businesses evaluating customer and transaction data workflows for tax information reporting.", "Taxbit's current official positioning centers on global regulatory information reporting, including onboarding, validation, determination and filing workflows. Confirm applicable jurisdictions, forms, data requirements and filing responsibilities; do not assume this is a general-ledger replacement.", ["Information reporting", "Tax data", "Validation", "Filing workflows"], "https://www.taxbit.com/"],
      ["Ledgible", "LE", "Tax and accounting workflows", "Institutions and professionals evaluating digital asset accounting, cost-basis and tax information workflows.", "Ledgible documents digital asset data, accounting, enterprise tax and information-reporting solutions. Confirm the specific product, supported data integrations, accounting exports and reporting scope rather than assuming every module is bundled.", ["Accounting", "Cost basis", "Tax information", "Data normalization"], "https://ledgible.io/"],
      ["Lukka", "LU", "Institutional data and reporting", "Finance teams evaluating normalized digital asset data, valuation and financial reporting inputs.", "Lukka describes enterprise digital asset data management, pricing and valuation services, financial reporting and tax/business reporting. Confirm product boundaries, valuation methodology, data lineage and the reports included in the selected agreement.", ["Data management", "Valuation", "Financial reporting", "Tax reporting"], "https://lukka.tech/"],
      ["Bitwave", "BW", "Enterprise back-office", "Finance teams connecting digital asset transactions to accounting and ERP workflows.", "Bitwave documents accounting automation, an enterprise subledger, reconciliation and reporting. Confirm ERP mappings, classification policies, cost-basis configuration and close controls against your own transaction history.", ["Subledger", "ERP integration", "Reconciliation", "Reporting"], "https://www.bitwave.io/"],
      ["Cryptio", "CR", "Accounting and reconciliation", "Institutions evaluating on-chain data transformation, internal controls and financial reporting workflows.", "Cryptio documents accounting and tax, reconciliation and internal-control solutions for digital asset operations. Confirm supported data sources, handling of exceptions and the evidence available for accounting, audit and reporting teams.", ["Accounting", "Reconciliation", "Internal controls", "Financial reporting"], "https://cryptio.co/"],
      ["TRES", "TR", "Financial data operations", "Teams evaluating digital asset data aggregation, reconciliation and accounting/reporting workflows.", "TRES documents FinOS accounting, reporting, audit and reconciliation workflows, and its website states that it has been acquired by Fireblocks. Confirm the current contracting entity, product availability, integration scope and support arrangements.", ["Financial data", "Reconciliation", "Accounting", "Reporting"], "https://tres.finance/"]
    ],
    resources: [
      ["TaxBit vs Ledgible vs Lukka: reporting and accounting comparison", "/blog/taxbit-vs-ledgible-vs-lukka-enterprise-crypto-accounting-tax"],
      ["Bitwave vs Cryptio vs TRES: crypto accounting comparison", "/blog/bitwave-vs-cryptio-vs-tres-crypto-accounting"],
      ["Fund administration and transfer agents", "/vendors/fund-administration-transfer-agents"]
    ],
    faqs: [
      ["Is crypto tax reporting the same as crypto accounting?", "No. Accounting covers records, classification, valuation and financial statements. Tax calculation and information reporting address separate obligations and data requirements. Define each workflow and responsible party before buying software."],
      ["What should a finance team test before procurement?", "Use a representative historical dataset to test completeness, duplicate detection, transfers, fees, reconciliation, adjustments and exports. Verify the accounting policy and reporting obligations with qualified advisers, then confirm the vendor's documented and contracted scope."],
      ["Why are these six providers included?", "They are the cohorts of FluidRWA's existing accounting and tax comparisons. Inclusion reflects documented category relevance, not an exhaustive market survey, ranking, independent audit or recommendation that every provider fits every jurisdiction."]
    ]
  }
];
