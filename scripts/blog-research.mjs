const directory = (slug) => `/vendors/${slug}`;

const blogResearch = {
  "tokeny-vs-securitize": {
    label: "Tokeny vs Securitize decision snapshot",
    intro: "The most important distinction is operating model. Tokeny provides modular, standards-led tokenization infrastructure; Securitize combines tokenization technology with regulated affiliates and a more integrated operating stack.",
    headers: ["Decision factor", "Tokeny", "Securitize"],
    rows: [
      ["Core model", "Modular ERC-3643 software, APIs and partner integrations", "Integrated platform with regulated-service affiliates"],
      ["Compliance structure", "Issuer-appointed agents plus token-native controls", "Securitize iD plus affiliated regulated services"],
      ["Secondary market", "Partner venues and interoperable workflows", "Securitize Markets ATS plus ecosystem integrations"],
      ["Natural fit", "Issuers wanting modular control and partner choice", "Issuers wanting packaged regulated operations"]
    ],
    links: [
      ["Compare tokenization platforms", directory("tokenization-platforms")],
      ["Compare compliance infrastructure providers", directory("compliance-infrastructure-providers")],
      ["Submit requirements", "/submit-requirement"]
    ],
    sources: [
      ["Tokeny solutions overview", "https://docs.tokeny.com/docs/solutions-overview-1"],
      ["Tokeny secondary-market documentation", "https://docs.tokeny.com/docs/secondary-market"],
      ["Securitize Connect API documentation", "https://sec-connect-api-docs.securitize.io/"],
      ["FINRA BrokerCheck: Securitize Markets", "https://brokercheck.finra.org/firm/summary/283256"],
      ["ESMA authorized DLT market infrastructures", "https://www.esma.europa.eu/sites/default/files/2026-01/Authorised_DLT_Market_Infrastructures.pdf"]
    ]
  },
  "web3-adoption-across-industries": {
    label: "Web3 industry adoption snapshot",
    intro: "The strongest industry deployments use blockchain selectively for settlement, ownership, provenance, credentials or network incentives while existing systems continue to handle private and high-volume operations.",
    headers: ["Adoption tier", "Industries", "Most credible use cases"],
    rows: [
      ["Highest maturity", "Finance, gaming, telecom and supply chain", "Programmable settlement, digital ownership, DePIN connectivity and product provenance"],
      ["Established but developing", "Sports, retail, media, government, energy, real estate, automotive and education", "Fan access, product passports, credentials, market coordination and asset administration"],
      ["Emerging", "Agriculture, healthcare and advertising", "Traceability, consented data exchange and privacy-oriented attention models"]
    ],
    links: [
      ["Explore the complete Web3 vendor ecosystem", "/web3vendorecosystem"],
      ["Compare blockchain development companies", directory("blockchain-development-companies")],
      ["Compare compliance infrastructure providers", directory("compliance-infrastructure-providers")]
    ],
    sources: [
      ["J.P. Morgan Kinexys institutional blockchain infrastructure", "https://www.jpmorgan.com/kinexys"],
      ["DIMO connected-vehicle telemetry documentation", "https://www.dimo.org/docs/api-references/telemetry-api/introduction"],
      ["Energy Web technology documentation", "https://docs.energyweb.org/"],
      ["European Blockchain Services Infrastructure", "https://hub.ebsi.eu/blockchain"],
      ["Aura Blockchain Consortium digital product passports", "https://www.auraluxuryblockchain.com/"]
    ]
  },
  "web3-blockchain-compliance-guide": {
    label: "Compliance research snapshot",
    intro: "A compliance stack should be selected by regulated activity, customer geography and transaction flow. No single tool replaces legal classification, identity controls, wallet screening and operational governance.",
    headers: ["Control layer", "What buyers should verify", "Provider examples"],
    rows: [
      ["Identity and KYB", "Document coverage, beneficial ownership, manual review and data handling", "Sumsub, AU10TIX, Blockpass"],
      ["Blockchain analytics", "Wallet exposure, sanctions coverage, alert logic and case management", "Chainalysis, TRM Labs, Elliptic"],
      ["Travel Rule", "Counterparty discovery, secure messaging and jurisdiction rules", "Notabene and integrated compliance platforms"],
      ["Legal classification", "Asset, activity, licensing, marketing and cross-border obligations", "Specialist digital asset counsel"]
    ],
    links: [
      ["Compare compliance infrastructure", directory("compliance-infrastructure-providers")],
      ["Compare KYC and AML providers", directory("kyc-aml-providers")],
      ["Compare legal and regulatory vendors", directory("legal-regulatory-vendors")]
    ],
    sources: [
      ["EU Markets in Crypto-Assets Regulation (MiCA)", "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R1114"],
      ["FATF virtual-assets guidance and updates", "https://www.fatf-gafi.org/en/topics/virtual-assets.html"]
    ]
  },
  "ai-infrastructure-web3-digital-assets": {
    label: "AI vendor decision snapshot",
    intro: "AI is most valuable when it improves a measurable workflow and leaves an auditable human decision path. Buyers should separate foundation models, blockchain intelligence, compute and application-layer automation.",
    headers: ["AI layer", "Useful Web3 workflow", "Provider examples"],
    rows: [
      ["Foundation models", "Research, document review, support and internal copilots", "Anthropic Claude"],
      ["Blockchain intelligence", "Entity attribution, wallet analysis and risk triage", "Arkham Intelligence and analytics providers"],
      ["Compute networks", "Training, inference and decentralized compute", "Akash Network"],
      ["Application automation", "Compliance review, reporting and operational agents", "Specialist AI infrastructure vendors"]
    ],
    links: [["Compare AI infrastructure providers", directory("ai-infrastructure-providers")]],
    sources: [["NIST AI Risk Management Framework", "https://www.nist.gov/itl/ai-risk-management-framework"]]
  },
  "choose-custody-provider-tokenized-assets": {
    label: "Custody model comparison",
    intro: "The right custody model depends on who legally controls assets, who can authorize transactions, whether qualified custody is required and how the provider integrates with the operating stack.",
    headers: ["Custody model", "Best suited to", "Provider examples"],
    rows: [
      ["Qualified custody", "Regulated institutions and investment products requiring formal custody arrangements", "Anchorage Digital, BitGo"],
      ["MPC wallet infrastructure", "Policy-controlled treasury and high-frequency operational workflows", "Fireblocks"],
      ["Institutional settlement and collateral", "Trading, settlement and institutional asset mobility", "Copper"],
      ["Embedded or programmable wallets", "Products that need wallet creation inside user workflows", "Infrastructure providers with wallet APIs"]
    ],
    links: [["Compare crypto custody providers", directory("crypto-custody-providers")]],
    sources: [
      ["SEC custody of funds or securities guidance", "https://www.sec.gov/investment/custody-funds-or-securities-clients-investment-advisers"],
      ["Anchorage Digital official platform", "https://www.anchorage.com/"]
    ]
  },
  "fiat-on-ramp-vs-off-ramp-providers": {
    label: "Ramp provider comparison",
    intro: "Ramp selection is a conversion and coverage decision as much as a payments decision. Teams should test actual user journeys by country, payment method, asset and payout rail.",
    headers: ["Provider type", "Primary job", "Provider examples"],
    rows: [
      ["Global on-ramp", "Cards and bank-funded digital-asset purchases", "Banxa, Alchemy Pay"],
      ["Off-ramp and payout", "Convert stablecoins or crypto into local fiat rails", "Regional payout and ramp providers"],
      ["Embedded ramp API", "Keep users inside the product experience", "API-first ramp infrastructure"],
      ["Stablecoin settlement", "Business settlement without a consumer purchase flow", "Circle and stablecoin infrastructure providers"]
    ],
    links: [["Compare fiat on and off-ramp providers", directory("fiat-on-off-ramp-providers")]],
    sources: [["FATF virtual-assets guidance", "https://www.fatf-gafi.org/en/topics/virtual-assets.html"]]
  },
  "how-to-find-web3-vendors": {
    label: "Vendor discovery method comparison",
    intro: "The strongest shortlists begin with the workflow and evidence required, not a list of famous brands. Buyers should compare category fit, jurisdiction, integrations, references and operating responsibility.",
    headers: ["Discovery method", "Strength", "Limitation"],
    rows: [
      ["General web search", "Fast initial market scan", "Ranking visibility is not evidence of implementation fit"],
      ["Peer referrals", "Useful first-hand context", "Often narrow and difficult to compare consistently"],
      ["Consultancies", "Strategic guidance and implementation support", "Can be expensive or tied to preferred partners"],
      ["Category directory", "Structured comparison across specialist providers", "Still requires buyer diligence and validation"]
    ],
    links: [
      ["Explore the Web3 vendor ecosystem", "/web3vendorecosystem"],
      ["Submit requirements for a focused vendor path", "/submit-requirement"]
    ],
    sources: []
  },
  "kyc-aml-compliance-web3-platforms": {
    label: "KYC and AML stack comparison",
    intro: "Identity verification and blockchain analytics solve different parts of the compliance workflow. Many regulated products need both, connected through policy rules and case management.",
    headers: ["Capability", "What it answers", "Provider examples"],
    rows: [
      ["KYC and KYB", "Who is the person or business?", "Sumsub, AU10TIX, Blockpass"],
      ["Wallet screening", "What risk is associated with an address?", "Chainalysis, TRM Labs, Elliptic"],
      ["Ongoing monitoring", "Has customer or transaction risk changed?", "Compliance infrastructure platforms"],
      ["Identity credentials", "Can eligibility be proven with less repeated data sharing?", "Civic, SpruceID, Privado ID"]
    ],
    links: [
      ["Compare KYC and AML providers", directory("kyc-aml-providers")],
      ["Compare compliance infrastructure", directory("compliance-infrastructure-providers")]
    ],
    sources: [["FATF recommendations", "https://www.fatf-gafi.org/en/publications/Fatfrecommendations/Fatf-recommendations.html"]]
  },
  "best-kyc-aml-providers-web3-startups": {
    label: "Web3 KYC AML provider decision matrix",
    intro: "Web3 startups should shortlist KYC AML providers by workflow, not by brand alone. Identity verification, KYB, wallet screening, sanctions monitoring, Travel Rule operations and fraud risk are separate buyer needs.",
    headers: ["Workflow", "Primary buyer question", "Provider examples"],
    rows: [
      ["Identity verification", "Can we verify users across our target markets?", "Sumsub, Persona, Trulioo, Veriff, Jumio, AU10TIX, Blockpass"],
      ["Wallet screening", "Can we identify risky wallets, counterparties and onchain exposure?", "Chainalysis, TRM Labs, Elliptic"],
      ["KYB and business onboarding", "Can we verify businesses, UBOs and institutional counterparties?", "Persona, Sumsub, Trulioo and KYB-focused workflows"],
      ["Travel Rule", "Can we exchange required originator and beneficiary information where applicable?", "Notabene and integrated compliance providers"],
      ["Fraud and risk operations", "Can we detect synthetic identity, payment risk and suspicious behavior?", "Sardine, ComplyAdvantage and risk-focused platforms"]
    ],
    links: [
      ["Compare KYC and AML providers", directory("kyc-aml-providers")],
      ["Compare compliance infrastructure providers", directory("compliance-infrastructure-providers")],
      ["Compare legal and regulatory vendors", directory("legal-regulatory-vendors")],
      ["Submit requirements", "/submit-requirement"]
    ],
    sources: [
      ["FATF virtual assets guidance", "https://www.fatf-gafi.org/en/topics/virtual-assets.html"],
      ["OFAC sanctions list service", "https://ofac.treasury.gov/sanctions-list-service"],
      ["FinCEN statutes, regulations and guidance", "https://www.fincen.gov/resources/statutes-regulations"],
      ["European Commission crypto-assets policy", "https://finance.ec.europa.eu/digital-finance/crypto-assets_en"],
      ["Chainalysis KYT", "https://www.chainalysis.com/product/kyt/"],
      ["TRM Labs", "https://www.trmlabs.com/"],
      ["Elliptic", "https://www.elliptic.co/"]
    ]
  },
  "legal-regulatory-vendors-tokenized-assets": {
    label: "Legal-advisor selection matrix",
    intro: "Tokenized-asset counsel should understand both the underlying financial product and the technology workflow. General blockchain familiarity is not a substitute for relevant asset-class and jurisdiction experience.",
    headers: ["Legal need", "Evidence to request", "Typical advisor profile"],
    rows: [
      ["Offering and asset structure", "Comparable funds, securities or RWA mandates", "Capital-markets or funds counsel with digital-asset experience"],
      ["Licensing and regulatory perimeter", "Relevant regulator and jurisdiction work", "Fintech and digital-asset regulatory specialists"],
      ["Cross-border distribution", "Investor-jurisdiction and marketing analysis", "International firms or coordinated local counsel"],
      ["Technology and vendor contracts", "Custody, platform and data-contract experience", "Technology counsel familiar with regulated workflows"]
    ],
    links: [["Compare legal and regulatory vendors", directory("legal-regulatory-vendors")]],
    sources: [["EU Markets in Crypto-Assets Regulation", "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R1114"]]
  },
  "smart-contract-development-and-audits": {
    label: "Security-provider comparison",
    intro: "Development, pre-deployment audit and post-deployment monitoring are separate responsibilities. Buyers should avoid treating a one-time audit as a complete security program.",
    headers: ["Security layer", "Buyer evidence", "Provider examples"],
    rows: [
      ["Secure development", "Test coverage, threat model, deployment controls and documentation", "Specialist blockchain development teams"],
      ["Independent audit", "Scope, methodology, findings, remediation and re-test", "OpenZeppelin, CertiK, Trail of Bits"],
      ["Formal verification", "Explicit properties proved for critical logic", "Specialist verification teams"],
      ["Monitoring and response", "Runtime alerts, escalation and incident procedures", "Security monitoring providers"]
    ],
    links: [
      ["Compare smart-contract development companies", directory("smart-contract-development-companies")],
      ["Compare security audit companies", directory("security-audit-companies")]
    ],
    sources: [["OpenZeppelin security resources", "https://www.openzeppelin.com/security-audits"]]
  },
  "stablecoin-payments-settlement-infrastructure": {
    label: "Stablecoin infrastructure map",
    intro: "A stablecoin issuer, a payment orchestrator and a treasury platform are not interchangeable. Buyers should identify whether they need the asset, conversion, movement, reconciliation or compliance layer.",
    headers: ["Infrastructure layer", "Primary function", "Provider examples"],
    rows: [
      ["Issuer and reserve-backed asset", "Issue and redeem stable-value tokens", "Circle USDC, PayPal PYUSD, Tether USDT"],
      ["Payment orchestration", "Move value between users, wallets and merchants", "Stablecoin payment infrastructure providers"],
      ["Fiat conversion", "Connect bank money and local payment rails", "Ramp and banking-rail providers"],
      ["Treasury and reconciliation", "Control balances, reporting and settlement operations", "Enterprise treasury platforms"]
    ],
    links: [["Compare stablecoin infrastructure providers", directory("stablecoin-infrastructure-providers")]],
    sources: [
      ["Circle USDC official overview", "https://www.circle.com/usdc"],
      ["PayPal USD official overview", "https://www.paypal.com/us/digital-wallet/manage-money/crypto/pyusd"]
    ]
  },
  "web3-infrastructure-stack-tokenized-fund": {
    label: "Tokenized-fund stack",
    intro: "A tokenized fund is an operating system, not a token issuance event. Each layer needs a named owner, an integration path and evidence that it works for the target investor and jurisdiction.",
    headers: ["Stack layer", "Critical decision", "Provider category"],
    rows: [
      ["Legal and fund structure", "Vehicle, investor eligibility and distribution rules", "Legal and regulatory vendors"],
      ["Issuance and servicing", "Token controls, cap table, lifecycle and reporting", "Tokenization platforms"],
      ["Onboarding and transfer control", "KYC, KYB, eligibility and wallet allowlisting", "KYC and compliance providers"],
      ["Custody and cash movement", "Asset control, subscriptions, redemptions and distributions", "Custody and stablecoin infrastructure"]
    ],
    links: [
      ["Compare tokenization platforms", directory("tokenization-platforms")],
      ["Compare custody providers", directory("crypto-custody-providers")],
      ["Compare compliance providers", directory("compliance-infrastructure-providers")]
    ],
    sources: [["BlackRock BUIDL fund overview via Securitize", "https://securitize.io/blackrock/buidl"]]
  },
  "tokenized-real-estate-vendor-stack": {
    label: "Real-estate tokenization stack",
    intro: "The digital token should represent rights created by the legal structure. Before vendor selection, teams need clarity on the property vehicle, investor eligibility, distributions, servicing and transfer rules.",
    headers: ["Layer", "Decision to resolve", "Provider category"],
    rows: [
      ["Property and offering structure", "What does the investor legally own?", "Legal and regulatory vendors"],
      ["Issuance and investor records", "How are interests issued and serviced?", "Tokenization platforms"],
      ["Investor onboarding", "Who may invest and receive transfers?", "KYC and compliance providers"],
      ["Payments and distributions", "How do subscriptions, income and redemptions move?", "Fiat-ramp and stablecoin providers"]
    ],
    links: [
      ["Compare tokenization platforms", directory("tokenization-platforms")],
      ["Explore real-estate industry use cases", "/industries/real-estate-firms"]
    ],
    sources: [["SEC real-estate investment guidance", "https://www.investor.gov/introduction-investing/investing-basics/investment-products/real-estate-investment-trusts-reits"]]
  },
  "what-is-rwa-tokenization-infrastructure": {
    label: "RWA infrastructure layer map",
    intro: "RWA infrastructure is the coordinated legal, technology and operating stack that makes a digital representation enforceable, transferable and serviceable.",
    headers: ["Layer", "What it controls", "Provider examples"],
    rows: [
      ["Legal structure", "Underlying rights and investor claims", "Digital-asset legal advisors"],
      ["Tokenization platform", "Issuance, transfer logic and lifecycle servicing", "Zoniqx, ADDX, Archax and specialist platforms"],
      ["Identity and compliance", "Eligibility, wallet rules and monitoring", "KYC, AML and compliance infrastructure providers"],
      ["Custody and settlement", "Asset control, wallet policy and money movement", "Custody and stablecoin infrastructure providers"]
    ],
    links: [["Compare tokenization platforms", directory("tokenization-platforms")]],
    sources: [
      ["BlackRock BUIDL fund overview via Securitize", "https://securitize.io/blackrock/buidl"],
      ["Franklin Templeton Benji platform", "https://digitalassets.franklintempleton.com/benji/"]
    ]
  },
  "how-do-i-choose-the-right-tokenization-platform": {
    label: "Tokenization-platform selection matrix",
    intro: "Choose a platform for the complete asset lifecycle, not the minting demo. The shortlist should reflect asset class, jurisdiction, investor flow, servicing, integrations and continuity.",
    headers: ["Criterion", "Question to ask", "Evidence"],
    rows: [
      ["Asset-class fit", "Has the platform supported a comparable structure?", "Live examples and references"],
      ["Compliance controls", "Can transfer and eligibility rules be enforced?", "Rule configuration and audit trail"],
      ["Lifecycle servicing", "How are distributions, redemptions and reporting handled?", "Operational workflow demonstration"],
      ["Portability", "What happens if the provider changes or shuts down?", "Data export, contract control and transition plan"]
    ],
    links: [["Compare tokenization platforms", directory("tokenization-platforms")]],
    sources: [["Franklin Templeton Benji platform", "https://digitalassets.franklintempleton.com/benji/"]]
  },
  "what-blockchain-should-i-use-for-tokenization": {
    label: "Blockchain selection matrix",
    intro: "The best chain is the one supported by the full operating stack: custody, compliance, token standards, investor wallets, settlement and institutional counterparties.",
    headers: ["Evaluation factor", "Why it matters", "Examples to compare"],
    rows: [
      ["Institutional ecosystem", "Custodians, platforms and counterparties must support it", "Ethereum, Stellar, Avalanche and other supported networks"],
      ["Transaction economics", "Fees and finality affect servicing and transfers", "Test expected transaction patterns"],
      ["Compliance tooling", "Identity, allowlists and monitoring must integrate", "Chain and application-layer controls"],
      ["Continuity and interoperability", "Assets may need portability or multi-chain distribution", "Bridges, standards and migration controls"]
    ],
    links: [["Compare blockchain development companies", directory("blockchain-development-companies")]],
    sources: [["Franklin Templeton and Stellar mark five years of Benji", "https://www.franklintempleton.com/press-releases/news-room/2026/franklin-templeton-stellar-development-foundation-mark-five-years-of-benji-the-first-u.s.-registered-tokenized-money-market-fund"]]
  },
  "what-companies-are-actually-using-tokenization-today": {
    label: "Verified tokenization examples",
    intro: "Real adoption is visible where regulated products use blockchain for issuance, recordkeeping, transfer or settlement. The examples below are linked to first-party product information.",
    headers: ["Organization or product", "What is tokenized", "Why the example matters"],
    rows: [
      ["BlackRock BUIDL via Securitize", "Institutional digital liquidity fund interests", "Shows tokenized fund issuance and on-chain product operations"],
      ["Franklin Templeton Benji", "Shares in the Franklin OnChain U.S. Government Money Fund", "Uses public blockchain infrastructure in the official ownership-record workflow"],
      ["PayPal USD", "U.S. dollar-denominated stablecoin", "Connects a major payments platform with blockchain settlement"],
      ["Institutional tokenization platforms", "Funds, securities, private markets and RWAs", "Demonstrate that adoption requires a full vendor stack"]
    ],
    links: [["Compare tokenization platforms", directory("tokenization-platforms")]],
    sources: [
      ["BlackRock BUIDL fund overview via Securitize", "https://securitize.io/blackrock/buidl"],
      ["Franklin Templeton Benji platform", "https://digitalassets.franklintempleton.com/benji/"],
      ["PayPal USD official overview", "https://www.paypal.com/us/digital-wallet/manage-money/crypto/pyusd"]
    ]
  },
  "can-i-tokenize-intellectual-property-or-patents": {
    label: "IP tokenization feasibility map",
    intro: "Tokenizing intellectual property requires a precise answer to what the token represents: ownership, a license, royalty participation or another contractual right. The legal agreement remains the source of enforceable rights.",
    headers: ["Decision area", "Question to resolve", "Specialist support"],
    rows: [
      ["Rights represented", "Ownership, license, revenue participation or access?", "IP and digital-asset counsel"],
      ["Valuation and revenue", "How are royalties measured and distributed?", "Valuation, accounting and servicing providers"],
      ["Investor and transfer rules", "Who may acquire or transfer the interest?", "Compliance and tokenization platforms"],
      ["Records and enforcement", "How do blockchain records connect to legal registries?", "IP counsel and blockchain development teams"]
    ],
    links: [["Compare legal and regulatory vendors", directory("legal-regulatory-vendors")], ["Compare tokenization platforms", directory("tokenization-platforms")]],
    sources: [["WIPO intellectual property resources", "https://www.wipo.int/about-ip/en/"]]
  },
  "can-i-tokenize-real-estate-a-beginner-s-guide": {
    label: "Real-estate tokenization feasibility map",
    intro: "Real estate is usually tokenized through an entity or contractual structure connected to the property, rather than by placing the land title itself directly on a public blockchain.",
    headers: ["Layer", "Beginner question", "Provider category"],
    rows: [
      ["Ownership structure", "What does the token holder legally own?", "Legal and regulatory vendors"],
      ["Investor onboarding", "Who may invest and under what rules?", "KYC and compliance providers"],
      ["Token and records", "How are interests issued, transferred and serviced?", "Tokenization platforms"],
      ["Payments and distributions", "How do subscriptions, rent and exits move?", "Payment and stablecoin infrastructure"]
    ],
    links: [["Read the real-estate vendor-stack guide", "/blog/tokenized-real-estate-vendor-stack"], ["Explore real-estate use cases", "/industries/real-estate-firms"]],
    sources: [["SEC real-estate investment guidance", "https://www.investor.gov/introduction-investing/investing-basics/investment-products/real-estate-investment-trusts-reits"]]
  },
  "how-do-tax-implications-change-with-tokenized-assets": {
    label: "Tokenized-asset tax review framework",
    intro: "Tokenization usually changes the transaction and recordkeeping workflow, not the need to analyze the underlying asset and legal rights. Tax treatment remains jurisdiction- and structure-specific.",
    headers: ["Tax question", "Why it matters", "Evidence to retain"],
    rows: [
      ["Asset and entity treatment", "Tax follows the legal asset, vehicle and investor rights", "Legal documents and classification advice"],
      ["Income and distributions", "Interest, dividends, rent and royalties may be treated differently", "Distribution records and statements"],
      ["Transfers and disposals", "Secondary transfers can create taxable events", "Cost basis and transaction records"],
      ["Cross-border participation", "Withholding, reporting and investor residence matter", "Investor tax forms and jurisdiction analysis"]
    ],
    links: [["Compare legal and regulatory vendors", directory("legal-regulatory-vendors")]],
    sources: [["IRS digital assets guidance", "https://www.irs.gov/businesses/small-businesses-self-employed/digital-assets"]]
  },
  "what-regulations-apply-to-asset-tokenization": {
    label: "Tokenization regulatory-perimeter map",
    intro: "The applicable rules depend on what the token represents, how it is offered, who may buy it, where participants are located and which entities control custody, transfers and payments.",
    headers: ["Regulatory question", "What changes the answer", "Specialist support"],
    rows: [
      ["Is the interest a security or regulated investment?", "Asset rights, offering structure and investor expectations", "Securities and funds counsel"],
      ["Are payments or custody regulated?", "Control of assets, fiat movement and redemption", "Payments, custody and regulatory specialists"],
      ["What AML controls apply?", "Customer type, transaction flow and jurisdiction", "KYC, AML and compliance providers"],
      ["Can it be marketed cross-border?", "Investor location, exemptions and distribution model", "Coordinated local and international counsel"]
    ],
    links: [["Read the Web3 compliance guide", "/blog/web3-blockchain-compliance-guide"], ["Compare legal and regulatory vendors", directory("legal-regulatory-vendors")]],
    sources: [
      ["EU Markets in Crypto-Assets Regulation", "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R1114"],
      ["FATF virtual-assets guidance", "https://www.fatf-gafi.org/en/topics/virtual-assets.html"]
    ]
  }
};

const clusterSlugs = {
  cost: ["how-much-does-it-cost-to-tokenize-an-asset", "how-much-money-can-tokenization-save-my-business", "what-s-the-minimum-asset-size-worth-tokenizing", "what-are-hidden-costs-in-tokenization-services"],
  suitability: ["how-do-i-know-if-tokenization-is-right-for-my-assets", "what-are-the-real-benefits-of-tokenizing-assets", "what-problems-can-tokenization-actually-solve", "can-small-businesses-benefit-from-tokenization", "why-should-i-tokenize-instead-of-going-public", "can-tokenization-help-me-raise-capital-faster"],
  comparison: ["is-tokenization-better-than-traditional-methods", "how-does-tokenization-compare-to-equity-crowdfunding", "are-tokenized-assets-more-liquid-than-traditional-assets"],
  basics: ["what-is-asset-tokenization-and-how-does-it-work", "what-s-the-difference-between-tokenization-methods", "is-tokenization-really-the-future-of-investing"],
  investors: ["how-do-investors-buy-tokenized-assets", "how-many-investors-can-own-a-single-tokenized-asset", "how-do-smart-contracts-work-with-tokenized-assets", "what-happens-to-dividends-or-income-from-tokenized-assets", "can-foreign-investors-buy-tokenized-assets"],
  risk: ["is-tokenization-safe-what-are-the-risks", "how-secure-is-your-customer-data-in-tokenization", "what-happens-if-my-tokenization-platform-shuts-down", "can-i-reverse-a-tokenization-if-needed"],
  process: ["how-long-does-it-take-to-tokenize-an-asset", "what-s-the-fastest-way-to-get-started-with-tokenization", "what-documents-do-i-need-to-tokenize-assets", "how-often-should-i-review-my-tokenization-strategy", "what-support-will-i-get-from-a-tokenization-provider"]
};

const clusterResearch = {
  cost: {
    label: "Tokenization cost and ROI framework",
    intro: "Tokenization cost is driven by legal complexity and ongoing operations more than token minting. A credible business case separates one-time implementation costs from recurring servicing and compliance costs.",
    headers: ["Cost layer", "Typical drivers", "Evidence to request"],
    rows: [
      ["Legal and structuring", "Asset type, jurisdictions, investor class and offering model", "Scoped legal workplan and assumptions"],
      ["Technology implementation", "Platform configuration, integrations, contracts and testing", "Implementation scope and change-order rules"],
      ["Ongoing operations", "KYC, custody, reporting, distributions and support", "Annual run-rate and transaction pricing"],
      ["Business value", "Access, settlement, servicing or distribution improvement", "Measurable baseline and target outcome"]
    ],
    links: [["Compare tokenization platforms", directory("tokenization-platforms")], ["Submit requirements", "/submit-requirement"]],
    sources: [["SEC guide to fees and expenses", "https://www.investor.gov/introduction-investing/getting-started/understanding-fees"]]
  },
  suitability: {
    label: "Tokenization suitability scorecard",
    intro: "Tokenization is most useful when it improves a specific ownership, servicing, settlement or distribution workflow. It is not automatically the right answer for every asset or fundraising need.",
    headers: ["Decision factor", "Positive signal", "Warning signal"],
    rows: [
      ["Asset and rights", "Clear ownership and enforceable investor rights", "Unclear title or unresolved legal claims"],
      ["Investor workflow", "Repeated onboarding, servicing or transfer friction", "No defined investor demand"],
      ["Operating model", "Digital records and integrations improve execution", "Token adds complexity without a process benefit"],
      ["Economics", "Expected value exceeds implementation and run costs", "No measurable operational or market-access outcome"]
    ],
    links: [["Explore relevant vendor categories", "/web3vendorecosystem"], ["Submit requirements", "/submit-requirement"]],
    sources: [["SEC investor education resources", "https://www.investor.gov/"]]
  },
  comparison: {
    label: "Tokenization comparison framework",
    intro: "Tokenization should be compared against the current financing and operating model, not an idealized promise of liquidity. The key question is which workflow produces enforceable rights and better outcomes.",
    headers: ["Comparison dimension", "Traditional model", "Tokenized model"],
    rows: [
      ["Ownership record", "Centralized registrar, administrator or cap table", "Digital token plus legal and operating records"],
      ["Transfer process", "Intermediated and market-specific", "Programmable, but still subject to legal and eligibility controls"],
      ["Settlement", "Depends on banking and market infrastructure", "Can use blockchain rails and stablecoins where permitted"],
      ["Liquidity", "Depends on market depth and distribution", "Still depends on real buyers, venues and transfer permissions"]
    ],
    links: [["Compare tokenization platforms", directory("tokenization-platforms")]],
    sources: [["BIS work on tokenisation and the unified ledger", "https://www.bis.org/publ/arpdf/ar2023e3.htm"]]
  },
  basics: {
    label: "Asset-tokenization operating model",
    intro: "Asset tokenization creates a digital representation of rights, but the legal and operational system determines what those rights mean. A token without enforceable structure and servicing is incomplete.",
    headers: ["Component", "Role", "Critical question"],
    rows: [
      ["Underlying asset or claim", "Creates economic value", "What exactly does the holder own or receive?"],
      ["Legal wrapper", "Makes rights enforceable", "Which entity and jurisdiction govern the rights?"],
      ["Token and smart contracts", "Represent and automate approved actions", "What controls transfers and lifecycle events?"],
      ["Operating stack", "Handles identity, custody, payments and reporting", "Who owns each ongoing responsibility?"]
    ],
    links: [["Read the RWA infrastructure guide", "/blog/what-is-rwa-tokenization-infrastructure"], ["Compare tokenization platforms", directory("tokenization-platforms")]],
    sources: [["BIS work on tokenisation and the unified ledger", "https://www.bis.org/publ/arpdf/ar2023e3.htm"]]
  },
  investors: {
    label: "Tokenized-investor workflow",
    intro: "Investor access is governed by legal eligibility and product rules, even when the ownership record uses blockchain. Wallets, smart contracts and payments must fit that regulated workflow.",
    headers: ["Workflow stage", "What happens", "Infrastructure required"],
    rows: [
      ["Eligibility and onboarding", "Identity, accreditation or suitability is checked", "KYC, KYB and compliance providers"],
      ["Subscription and settlement", "Investor funds the purchase and receives the interest", "Payment rails, platform and custody"],
      ["Ownership and servicing", "Records, income, reporting and communications are maintained", "Tokenization and administration systems"],
      ["Transfer or exit", "Rules, counterparties and settlement are validated", "Compliance controls and approved distribution venues"]
    ],
    links: [["Compare KYC and AML providers", directory("kyc-aml-providers")], ["Compare custody providers", directory("crypto-custody-providers")]],
    sources: [["SEC investor education resources", "https://www.investor.gov/"]]
  },
  risk: {
    label: "Tokenization risk-control map",
    intro: "Tokenization changes the operating surface but does not remove legal, counterparty, security, liquidity or continuity risk. Buyers should assign an owner and control to every material failure scenario.",
    headers: ["Risk", "Failure example", "Control to verify"],
    rows: [
      ["Legal and ownership", "Token rights do not match enforceable asset rights", "Qualified counsel and consistent documentation"],
      ["Technology and security", "Contract flaw, key compromise or unauthorized action", "Audit, custody policy, monitoring and response"],
      ["Vendor continuity", "Platform or critical provider exits", "Data portability, contract control and transition plan"],
      ["Market and liquidity", "No buyers or restricted transfers", "Real distribution plan and accurate disclosures"]
    ],
    links: [["Compare security audit companies", directory("security-audit-companies")], ["Compare custody providers", directory("crypto-custody-providers")]],
    sources: [["NIST Cybersecurity Framework", "https://www.nist.gov/cyberframework"]]
  },
  process: {
    label: "Tokenization implementation pathway",
    intro: "A realistic timeline begins with structure and operating requirements before technology configuration. Teams save time by resolving dependencies in sequence instead of selecting vendors independently.",
    headers: ["Phase", "Primary output", "Common dependency"],
    rows: [
      ["Feasibility", "Asset, investor, jurisdiction and business-case decision", "Executive and legal alignment"],
      ["Architecture", "Legal structure, workflow and vendor map", "Clear responsibility for each layer"],
      ["Implementation", "Configured systems, contracts, integrations and controls", "Vendor coordination and test data"],
      ["Launch and operations", "Approved onboarding, servicing, reporting and incident plans", "Operational readiness and ongoing review"]
    ],
    links: [["Explore vendor categories", "/web3vendorecosystem"], ["Submit requirements", "/submit-requirement"]],
    sources: [["NIST Cybersecurity Framework", "https://www.nist.gov/cyberframework"]]
  }
};

export function getBlogResearch(slug) {
  if (blogResearch[slug]) return blogResearch[slug];
  const cluster = Object.entries(clusterSlugs).find(([, slugs]) => slugs.includes(slug))?.[0];
  return cluster ? clusterResearch[cluster] : null;
}
