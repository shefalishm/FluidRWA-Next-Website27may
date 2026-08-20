export type VendorToolKey =
  | "vendor-stack"
  | "shortlist-builder"
  | "compliance-stack"
  | "custody-model"
  | "smart-contract-matcher"
  | "payments-stablecoin"
  | "ai-vendor-finder"
  | "rfp-generator";

export type VendorCategoryId =
  | "tokenization"
  | "fund-admin"
  | "transfer-agent"
  | "broker-dealer"
  | "custody"
  | "kyc-aml"
  | "legal"
  | "smart-contract"
  | "security"
  | "payments"
  | "stablecoins"
  | "oracles"
  | "rpc"
  | "defi-trading"
  | "raas"
  | "staking"
  | "ai-document"
  | "ai-risk"
  | "ai-agents"
  | "ai-compute"
  | "ai-data"
  | "trade-finance"
  | "climate-mrv"
  | "insurance-risk"
  | "marketing-growth";

export type VendorQuestionOption = {
  value: string;
  label: string;
  categories: VendorCategoryId[];
  reason: string;
};

export type VendorQuestion = {
  id: string;
  label: string;
  helper: string;
  type: "single" | "multi";
  options: VendorQuestionOption[];
};

export type VendorToolConfig = {
  key: VendorToolKey;
  title: string;
  shortTitle: string;
  eyebrow: string;
  description: string;
  intent: string;
  baseCategories: VendorCategoryId[];
  questions: VendorQuestion[];
};

export type VendorCategory = {
  id: VendorCategoryId;
  label: string;
  href: string;
  buyerUse: string;
  verify: string[];
  examples: string[];
};

export type VendorToolAnswers = Record<string, string | string[]>;

export type VendorRecommendation = VendorCategory & {
  score: number;
  confidence: "High" | "Medium" | "Exploratory";
  reasons: string[];
};

export const vendorCategories: Record<VendorCategoryId, VendorCategory> = {
  tokenization: {
    id: "tokenization",
    label: "Tokenization Platforms",
    href: "/vendors/tokenization-platforms",
    buyerUse: "Issuer-side infrastructure for creating and managing tokenized assets.",
    verify: ["Asset class fit", "Jurisdiction support", "Lifecycle and transfer controls"],
    examples: ["Zoniqx", "Securitize", "Tokeny"]
  },
  "fund-admin": {
    id: "fund-admin",
    label: "Fund Administration",
    href: "/vendors/fund-administration-transfer-agents",
    buyerUse: "NAV, investor servicing, reporting and fund operations support.",
    verify: ["Fund structure support", "Investor reporting", "Admin and platform integrations"],
    examples: ["Apex Group", "Carta", "Securitize"]
  },
  "transfer-agent": {
    id: "transfer-agent",
    label: "Transfer Agents",
    href: "/vendors/fund-administration-transfer-agents",
    buyerUse: "Recordkeeping, investor registry and regulated transfer workflows.",
    verify: ["Registered transfer-agent status", "Cap table workflow", "Secondary-transfer process"],
    examples: ["Securitize", "Tokeny", "Vertalo"]
  },
  "broker-dealer": {
    id: "broker-dealer",
    label: "Broker Dealers",
    href: "/vendors/broker-dealers",
    buyerUse: "Regulated distribution, placement and trading access for securities workflows.",
    verify: ["Licensing", "Product eligibility", "Investor and jurisdiction coverage"],
    examples: ["Securitize Markets", "INX Securities", "tZERO Securities"]
  },
  custody: {
    id: "custody",
    label: "Custody and Wallets",
    href: "/vendors/crypto-custody-providers",
    buyerUse: "Asset safekeeping, MPC wallets, qualified custody and policy controls.",
    verify: ["Qualified custody needs", "Insurance and controls", "Supported assets and chains"],
    examples: ["Anchorage Digital", "BitGo", "Fireblocks"]
  },
  "kyc-aml": {
    id: "kyc-aml",
    label: "KYC, AML and Identity",
    href: "/vendors/kyc-aml-providers",
    buyerUse: "Identity verification, AML screening, sanctions checks and Travel Rule workflows.",
    verify: ["Jurisdiction coverage", "Wallet screening", "Ongoing monitoring and audit logs"],
    examples: ["Chainalysis", "TRM Labs", "Alloy"]
  },
  legal: {
    id: "legal",
    label: "Legal and Regulatory",
    href: "/vendors/legal-regulatory-vendors",
    buyerUse: "Structuring, securities analysis, regulatory advice and offering documentation.",
    verify: ["Relevant jurisdiction", "Digital asset experience", "Securities and fund expertise"],
    examples: ["Allen & Overy", "Baker McKenzie", "Clifford Chance"]
  },
  "smart-contract": {
    id: "smart-contract",
    label: "Smart Contract Development",
    href: "/vendors/smart-contract-development-companies",
    buyerUse: "Protocol, token, wallet, marketplace and on-chain workflow development.",
    verify: ["Relevant chain experience", "Testing process", "Post-launch support"],
    examples: ["Minddeft Technologies", "Ackee Blockchain", "OpenZeppelin"]
  },
  security: {
    id: "security",
    label: "Security and Audits",
    href: "/vendors/security-audit-companies",
    buyerUse: "Smart contract audits, monitoring, bug bounties and incident-prevention workflows.",
    verify: ["Audit scope", "Reviewer seniority", "Remediation and monitoring support"],
    examples: ["Trail of Bits", "OpenZeppelin", "CertiK"]
  },
  payments: {
    id: "payments",
    label: "Payment Rails and On/Off-Ramps",
    href: "/vendors/stablecoin-infrastructure-providers",
    buyerUse: "Fiat entry, off-ramp, payment processing and settlement workflows.",
    verify: ["Supported countries", "Settlement currencies", "KYC and payment licenses"],
    examples: ["Alchemy Pay", "Banxa", "BitPay"]
  },
  stablecoins: {
    id: "stablecoins",
    label: "Stablecoin Infrastructure",
    href: "/vendors/stablecoin-infrastructure-providers",
    buyerUse: "USDC, USDT or other stablecoin settlement, treasury and payout rails.",
    verify: ["Issuer risk", "Chain support", "Redemption and treasury controls"],
    examples: ["Circle", "Paxos", "Tether"]
  },
  oracles: {
    id: "oracles",
    label: "Oracles, Data and Proof-of-Reserve",
    href: "/vendors/oracles-data-proof-of-reserve",
    buyerUse: "NAV feeds, reserve proofs, market data and external-data connectivity.",
    verify: ["Data source quality", "Update frequency", "Fallback and outage handling"],
    examples: ["Chainlink", "Pyth Network", "RedStone"]
  },
  rpc: {
    id: "rpc",
    label: "Node-as-a-Service and RPC",
    href: "/vendors/node-as-a-service-rpc",
    buyerUse: "Managed RPC, archive nodes, APIs and production blockchain connectivity.",
    verify: ["Supported chains", "Latency and SLA", "Archive and indexing needs"],
    examples: ["Alchemy", "QuickNode", "Ankr"]
  },
  "defi-trading": {
    id: "defi-trading",
    label: "DeFi Trading and Margin",
    href: "/vendors/defi-trading-margin-infrastructure",
    buyerUse: "Perpetuals, margin trading, liquidity, execution and trading infrastructure.",
    verify: ["Liquidity model", "Risk engine", "Supported collateral and chains"],
    examples: ["Hyperliquid", "dYdX", "GMX"]
  },
  raas: {
    id: "raas",
    label: "RaaS and Appchains",
    href: "/vendors/rollup-as-a-service-appchains",
    buyerUse: "Rollup, appchain, sequencer and custom-chain deployment support.",
    verify: ["Stack choice", "Sequencer operations", "Bridge and ecosystem integrations"],
    examples: ["Conduit", "Caldera", "Gelato"]
  },
  staking: {
    id: "staking",
    label: "Staking and Validator Infrastructure",
    href: "/vendors/institutional-staking-validator-infrastructure",
    buyerUse: "Validator operations, staking APIs, slashing protection and reporting.",
    verify: ["Validator performance", "Custody workflow", "Slashing and governance controls"],
    examples: ["Blockdaemon", "Figment", "Kiln"]
  },
  "ai-document": {
    id: "ai-document",
    label: "AI Document Intelligence",
    href: "/vendors/ai-document-intelligence-knowledge-retrieval",
    buyerUse: "Document extraction, knowledge retrieval, citations and regulated workflow review.",
    verify: ["Source citations", "Data privacy", "Document types and accuracy testing"],
    examples: ["OpenAI", "Anthropic Claude", "Hebbia"]
  },
  "ai-risk": {
    id: "ai-risk",
    label: "AI Risk and Compliance Intelligence",
    href: "/vendors/ai-risk-analytics-compliance-intelligence",
    buyerUse: "Risk monitoring, entity intelligence, compliance alerts and investigation support.",
    verify: ["Entity coverage", "Alert quality", "Human review and audit logs"],
    examples: ["Chainalysis", "Elliptic", "TRM Labs"]
  },
  "ai-agents": {
    id: "ai-agents",
    label: "AI Agents and Automation",
    href: "/vendors/ai-agents-autonomous-systems",
    buyerUse: "Agentic workflows for research, operations, treasury, support and governance.",
    verify: ["Permission model", "Human approvals", "Auditability and fallback workflow"],
    examples: ["Fetch.ai", "Olas", "Virtuals Protocol"]
  },
  "ai-compute": {
    id: "ai-compute",
    label: "AI Compute and GPU Infrastructure",
    href: "/vendors/decentralized-ai-compute-gpu-infrastructure",
    buyerUse: "GPU, inference, training and decentralized compute capacity.",
    verify: ["Workload fit", "Reliability", "Data handling and cost controls"],
    examples: ["Akash Network", "Render Network", "io.net"]
  },
  "ai-data": {
    id: "ai-data",
    label: "AI Data and Model Marketplaces",
    href: "/vendors/ai-data-model-marketplaces",
    buyerUse: "Data rights, model access, attribution and AI data monetization workflows.",
    verify: ["Rights and licensing", "Data provenance", "Privacy and attribution model"],
    examples: ["Ocean Protocol", "Story Protocol", "Vana"]
  },
  "trade-finance": {
    id: "trade-finance",
    label: "Trade Finance and Supply Chain",
    href: "/vendors/trade-finance-supply-chain-infrastructure",
    buyerUse: "Electronic trade documents, provenance, customs and supply-chain finance workflows.",
    verify: ["Document standards", "Counterparty adoption", "Bank and logistics integrations"],
    examples: ["CargoX", "essDOCS", "Komgo"]
  },
  "climate-mrv": {
    id: "climate-mrv",
    label: "Carbon and Climate MRV",
    href: "/vendors/carbon-climate-mrv-infrastructure",
    buyerUse: "Climate data, MRV, carbon credit registry and retirement infrastructure.",
    verify: ["Methodology support", "Registry integrations", "Verification and audit trail"],
    examples: ["Regen Network", "Toucan Protocol", "Carbonmark"]
  },
  "insurance-risk": {
    id: "insurance-risk",
    label: "Insurance and Risk Infrastructure",
    href: "/vendors/insurance-risk-infrastructure",
    buyerUse: "Smart contract cover, cyber risk, custody insurance and operational protection.",
    verify: ["Coverage exclusions", "Claims process", "Underwriting and counterparty strength"],
    examples: ["Nexus Mutual", "Sherlock", "Nayms"]
  },
  "marketing-growth": {
    id: "marketing-growth",
    label: "Growth and Marketing",
    href: "/vendors/growth-marketing",
    buyerUse: "Positioning, go-to-market, community, content, PR and paid acquisition.",
    verify: ["Buyer segment fit", "Proof points", "Distribution channel expertise"],
    examples: ["Brands Essential", "Lunar Strategy", "Coinbound"]
  }
};

const commonRegionOptions: VendorQuestionOption[] = [
  { value: "us", label: "United States", categories: ["legal", "kyc-aml", "custody", "broker-dealer"], reason: "US workflows usually require tighter securities, custody, KYC and distribution review." },
  { value: "eu", label: "European Union / UK", categories: ["legal", "kyc-aml", "custody"], reason: "EU/UK workflows often require MiCA, AML, custody and financial promotion review." },
  { value: "uae", label: "UAE / Middle East", categories: ["legal", "kyc-aml", "custody", "payments"], reason: "UAE and regional launches need local legal, onboarding, payment and custody checks." },
  { value: "global", label: "Global / multi-market", categories: ["legal", "kyc-aml", "custody", "payments"], reason: "Multi-market launches need cross-border legal, onboarding, custody and settlement coverage." }
];

const stageOptions: VendorQuestionOption[] = [
  { value: "idea", label: "Idea / early research", categories: ["legal", "marketing-growth"], reason: "Early projects need category validation, positioning and regulatory assumptions before vendor spend." },
  { value: "pilot", label: "Pilot or MVP", categories: ["smart-contract", "kyc-aml", "custody", "security"], reason: "Pilots need build partners, onboarding controls, custody decisions and security review." },
  { value: "launch", label: "Preparing for launch", categories: ["security", "legal", "payments", "fund-admin"], reason: "Launch-stage projects need audit, documentation, operational and settlement readiness." },
  { value: "scale", label: "Scaling production", categories: ["rpc", "oracles", "insurance-risk", "ai-risk"], reason: "Production systems need reliability, monitoring, data quality and operational risk controls." }
];

const aiStageOptions: VendorQuestionOption[] = [
  { value: "idea", label: "Idea / early research", categories: ["ai-document", "ai-agents", "legal"], reason: "Early AI work should validate use case, permissions and data constraints before vendor spend." },
  { value: "pilot", label: "Pilot or MVP", categories: ["ai-document", "ai-risk", "security"], reason: "AI pilots need accuracy testing, risk controls and security review before rollout." },
  { value: "launch", label: "Preparing for launch", categories: ["ai-risk", "security", "legal"], reason: "Launch-stage AI workflows need monitoring, human review and governance controls." },
  { value: "scale", label: "Scaling production", categories: ["ai-compute", "ai-risk", "ai-agents"], reason: "Production AI workflows need compute reliability, monitoring and permissioned automation." }
];

export const vendorToolConfigs: VendorToolConfig[] = [
  {
    key: "vendor-stack",
    title: "Find My Vendor Stack",
    shortTitle: "Vendor Stack",
    eyebrow: "General vendor path",
    description: "Turn a buyer problem into the vendor categories FluidRWA would shortlist first.",
    intent: "Best for teams that know what they are building but do not know which vendor categories they need.",
    baseCategories: ["legal", "kyc-aml"],
    questions: [
      {
        id: "workload",
        label: "What are you trying to build or fix?",
        helper: "Choose every workflow that applies.",
        type: "multi",
        options: [
          { value: "issuer", label: "Launch a fund, asset product or issuer workflow", categories: ["tokenization", "fund-admin", "transfer-agent", "custody"], reason: "Issuer workflows usually need platform, admin, investor-record and custody coverage." },
          { value: "compliance", label: "Improve onboarding, AML or wallet screening", categories: ["kyc-aml", "ai-risk", "legal"], reason: "Compliance-led needs usually combine verification, monitoring and legal review." },
          { value: "build", label: "Build smart contracts, dApp or protocol logic", categories: ["smart-contract", "security", "oracles", "rpc"], reason: "Technical builds need development, audit, data and infrastructure support." },
          { value: "payments", label: "Accept payments, stablecoins or fiat rails", categories: ["payments", "stablecoins", "kyc-aml"], reason: "Payment workflows need settlement, on/off-ramp and compliance rails." },
          { value: "ai", label: "Use AI for documents, risk or workflow automation", categories: ["ai-document", "ai-risk", "ai-agents"], reason: "AI workflows split into document intelligence, risk intelligence and agentic automation." }
        ]
      },
      { id: "region", label: "Primary market", helper: "Where will the first serious users or investors be?", type: "single", options: commonRegionOptions },
      { id: "stage", label: "Project stage", helper: "This changes whether you need strategy, build, launch or monitoring vendors.", type: "single", options: stageOptions }
    ]
  },
  {
    key: "shortlist-builder",
    title: "Vendor Shortlist Builder",
    shortTitle: "Shortlist Builder",
    eyebrow: "Procurement shortcut",
    description: "Create a tighter category shortlist before asking vendors for calls.",
    intent: "Best for buyers who need a clean shortlist, not another generic directory.",
    baseCategories: ["legal"],
    questions: [
      {
        id: "priority",
        label: "What matters most in the shortlist?",
        helper: "Pick the strongest buying criterion.",
        type: "single",
        options: [
          { value: "credibility", label: "Institutional credibility", categories: ["custody", "legal", "fund-admin", "broker-dealer"], reason: "Credibility-driven projects need regulated, institution-facing providers first." },
          { value: "speed", label: "Speed to launch", categories: ["smart-contract", "tokenization", "payments"], reason: "Speed-led projects need implementation partners and ready infrastructure." },
          { value: "risk", label: "Risk reduction", categories: ["security", "kyc-aml", "insurance-risk"], reason: "Risk-led shortlists should prioritize audit, monitoring, compliance and coverage." },
          { value: "distribution", label: "Distribution and growth", categories: ["broker-dealer", "marketing-growth", "payments"], reason: "Distribution-led needs require routes to investors, users or payment volume." }
        ]
      },
      {
        id: "buyer",
        label: "Who is the buyer?",
        helper: "Different buyers need different evidence.",
        type: "single",
        options: [
          { value: "issuer", label: "Asset issuer or fund", categories: ["tokenization", "fund-admin", "custody", "legal"], reason: "Issuers need lifecycle, admin, custody and legal support." },
          { value: "protocol", label: "Protocol or dApp team", categories: ["smart-contract", "security", "rpc", "oracles"], reason: "Protocol teams need engineering, infrastructure and data-path assurance." },
          { value: "enterprise", label: "Enterprise or financial institution", categories: ["custody", "kyc-aml", "legal", "ai-document"], reason: "Enterprises need controls, onboarding, legal and document workflows." },
          { value: "community", label: "Community or ecosystem team", categories: ["marketing-growth", "ai-agents", "payments"], reason: "Community teams need growth, engagement automation and payout workflows." }
        ]
      },
      { id: "region", label: "Primary market", helper: "Use this to flag licensing and jurisdiction checks.", type: "single", options: commonRegionOptions }
    ]
  },
  {
    key: "compliance-stack",
    title: "Compliance Stack Finder",
    shortTitle: "Compliance Stack",
    eyebrow: "KYC and AML path",
    description: "Map onboarding, monitoring, wallet screening and legal controls into vendor categories.",
    intent: "Best for teams searching for KYC AML providers, Travel Rule providers or wallet-screening tools.",
    baseCategories: ["kyc-aml", "legal"],
    questions: [
      {
        id: "complianceNeed",
        label: "Which compliance job is the blocker?",
        helper: "Select all that apply.",
        type: "multi",
        options: [
          { value: "identity", label: "Identity verification / KYC", categories: ["kyc-aml"], reason: "Identity verification is a core KYC/AML vendor requirement." },
          { value: "wallet", label: "Wallet screening and sanctions risk", categories: ["kyc-aml", "ai-risk"], reason: "Wallet screening often needs blockchain analytics plus risk intelligence." },
          { value: "travel-rule", label: "Travel Rule or transaction monitoring", categories: ["kyc-aml", "legal"], reason: "Travel Rule workflows need technical provider coverage and legal interpretation." },
          { value: "documents", label: "Review investor or entity documents", categories: ["ai-document", "kyc-aml"], reason: "Document-heavy onboarding benefits from extraction, citation and verification tooling." }
        ]
      },
      { id: "region", label: "Regulatory region", helper: "Jurisdiction changes vendor fit materially.", type: "single", options: commonRegionOptions },
      {
        id: "volume",
        label: "Expected onboarding volume",
        helper: "This affects whether a lightweight or enterprise provider fits.",
        type: "single",
        options: [
          { value: "low", label: "Under 500 users/investors", categories: ["kyc-aml", "legal"], reason: "Lower volume may prioritize flexible onboarding and legal fit." },
          { value: "mid", label: "500 to 25,000 users/investors", categories: ["kyc-aml", "ai-risk"], reason: "Mid-market volume needs automation, screening and alert triage." },
          { value: "high", label: "25,000+ users/investors", categories: ["kyc-aml", "ai-risk", "rpc"], reason: "High volume needs automated monitoring, data reliability and operational controls." }
        ]
      }
    ]
  },
  {
    key: "custody-model",
    title: "Custody Model Finder",
    shortTitle: "Custody Model",
    eyebrow: "Wallet and custody path",
    description: "Clarify whether a buyer likely needs qualified custody, MPC wallets, wallet-as-a-service or self-custody tooling.",
    intent: "Best for buyers comparing custody providers, wallet vendors and institutional controls.",
    baseCategories: ["custody", "legal"],
    questions: [
      {
        id: "assetControl",
        label: "Who should control assets?",
        helper: "This is the main custody-model fork.",
        type: "single",
        options: [
          { value: "qualified", label: "A qualified or regulated custodian", categories: ["custody", "legal", "insurance-risk"], reason: "Regulated custody usually requires legal review and insurance/control checks." },
          { value: "mpc", label: "Company-controlled MPC or treasury wallet", categories: ["custody", "security"], reason: "MPC treasury workflows need policy controls and security review." },
          { value: "embedded", label: "Embedded wallets for users", categories: ["custody", "kyc-aml", "payments"], reason: "Embedded wallets need onboarding, recovery and payment-flow coverage." },
          { value: "self", label: "Users self-custody assets", categories: ["custody", "security", "ai-document"], reason: "Self-custody still needs UX, risk education and recovery support." }
        ]
      },
      {
        id: "controlNeed",
        label: "Which control matters most?",
        helper: "Controls should guide vendor selection.",
        type: "single",
        options: [
          { value: "policy", label: "Approvals and role-based policies", categories: ["custody", "security"], reason: "Approval workflows are a wallet-policy and security requirement." },
          { value: "reporting", label: "Audit logs and reporting", categories: ["custody", "fund-admin"], reason: "Reporting needs custody data plus admin/investor operations." },
          { value: "insurance", label: "Insurance or risk transfer", categories: ["insurance-risk", "custody"], reason: "Insurance requirements should be evaluated alongside custody model." }
        ]
      },
      { id: "region", label: "Operating region", helper: "Custody language and licensing vary by market.", type: "single", options: commonRegionOptions }
    ]
  },
  {
    key: "smart-contract-matcher",
    title: "Smart Contract Vendor Matcher",
    shortTitle: "Smart Contracts",
    eyebrow: "Build and audit path",
    description: "Separate development, audit, monitoring, data and infrastructure requirements.",
    intent: "Best for buyers searching for smart contract development companies or audit firms.",
    baseCategories: ["smart-contract", "security"],
    questions: [
      {
        id: "contractNeed",
        label: "What do you need help with?",
        helper: "Select every technical requirement that applies.",
        type: "multi",
        options: [
          { value: "new-build", label: "Build new smart contracts", categories: ["smart-contract", "security"], reason: "New contract work needs development plus audit planning." },
          { value: "audit", label: "Audit or formal review", categories: ["security"], reason: "Audit needs specialized security vendors rather than only developers." },
          { value: "monitoring", label: "Monitoring after launch", categories: ["security", "oracles"], reason: "Post-launch monitoring needs runtime security and data/event visibility." },
          { value: "integration", label: "Integrate wallets, oracles or APIs", categories: ["oracles", "rpc", "custody"], reason: "Integration-heavy projects need data, RPC and wallet infrastructure." }
        ]
      },
      {
        id: "chainType",
        label: "What kind of chain environment?",
        helper: "This changes the vendor skill set.",
        type: "single",
        options: [
          { value: "evm", label: "EVM chains", categories: ["smart-contract", "security", "rpc"], reason: "EVM work benefits from broad developer, audit and RPC tooling." },
          { value: "solana", label: "Solana or high-performance chain", categories: ["smart-contract", "security", "rpc"], reason: "Non-EVM chains require chain-specific engineering and audit expertise." },
          { value: "custom", label: "Custom chain, rollup or appchain", categories: ["raas", "rpc", "security"], reason: "Custom chain work needs RaaS, infrastructure and security review." }
        ]
      },
      { id: "stage", label: "Stage", helper: "Affects audit urgency and launch controls.", type: "single", options: stageOptions }
    ]
  },
  {
    key: "payments-stablecoin",
    title: "Payments and Stablecoin Vendor Finder",
    shortTitle: "Payments",
    eyebrow: "Settlement path",
    description: "Map fiat on-ramp, off-ramp, stablecoin, payout and compliance requirements.",
    intent: "Best for buyers searching for stablecoin providers, payment rails or on/off-ramp infrastructure.",
    baseCategories: ["payments", "kyc-aml"],
    questions: [
      {
        id: "paymentUse",
        label: "What payment workflow do you need?",
        helper: "Choose every workflow that applies.",
        type: "multi",
        options: [
          { value: "onramp", label: "Users buy crypto or stablecoins with fiat", categories: ["payments", "kyc-aml"], reason: "Fiat on-ramp flows require payment rails and compliance onboarding." },
          { value: "offramp", label: "Users cash out to bank accounts", categories: ["payments", "stablecoins", "kyc-aml"], reason: "Off-ramp flows need settlement, identity and banking coverage." },
          { value: "payouts", label: "Cross-border payouts or payroll", categories: ["stablecoins", "payments", "legal"], reason: "Payout workflows need stablecoin rails and legal/payment review." },
          { value: "treasury", label: "Treasury or yield-bearing settlement", categories: ["stablecoins", "custody", "oracles"], reason: "Treasury workflows need custody, pricing/reserve visibility and stablecoin selection." }
        ]
      },
      { id: "region", label: "Primary payment corridor", helper: "Corridor coverage is often the deciding factor.", type: "single", options: commonRegionOptions },
      {
        id: "customerType",
        label: "Who is paying or receiving?",
        helper: "Consumer and institutional flows need different controls.",
        type: "single",
        options: [
          { value: "consumer", label: "Consumers or retail users", categories: ["payments", "kyc-aml"], reason: "Consumer flows need UX, KYC and broad payment-method coverage." },
          { value: "business", label: "Businesses or vendors", categories: ["payments", "stablecoins", "legal"], reason: "Business flows need settlement, invoicing and legal/payment terms." },
          { value: "institution", label: "Funds or institutions", categories: ["custody", "stablecoins", "legal"], reason: "Institutional settlement usually needs custody and legal controls." }
        ]
      }
    ]
  },
  {
    key: "ai-vendor-finder",
    title: "AI Vendor Finder",
    shortTitle: "AI Vendor Finder",
    eyebrow: "AI infrastructure path",
    description: "Route AI use cases into document intelligence, risk intelligence, agents, compute or data infrastructure.",
    intent: "Best for teams looking for AI vendors without knowing which AI infrastructure category fits.",
    baseCategories: [],
    questions: [
      {
        id: "aiUse",
        label: "What should AI help with?",
        helper: "Choose every use case that applies.",
        type: "multi",
        options: [
          { value: "documents", label: "Review contracts, investor docs or policies", categories: ["ai-document", "legal", "kyc-aml"], reason: "Document workflows need extraction, citations and compliance/legal review." },
          { value: "risk", label: "Monitor risk, wallets, transactions or entities", categories: ["ai-risk", "kyc-aml"], reason: "Risk workflows need entity intelligence, monitoring and alert quality." },
          { value: "automation", label: "Automate research, support or operations", categories: ["ai-agents", "ai-document"], reason: "Automation needs agent permissions plus document/context retrieval." },
          { value: "compute", label: "Run models, inference or GPU workloads", categories: ["ai-compute", "ai-data"], reason: "Compute-heavy workflows need infrastructure, cost and data controls." }
        ]
      },
      {
        id: "sensitivity",
        label: "How sensitive is the data?",
        helper: "This changes vendor risk and procurement requirements.",
        type: "single",
        options: [
          { value: "public", label: "Mostly public data", categories: ["ai-agents", "ai-document"], reason: "Public-data workflows can prioritize speed and retrieval quality." },
          { value: "confidential", label: "Confidential business documents", categories: ["ai-document", "legal", "security"], reason: "Confidential workflows need privacy, legal and security review." },
          { value: "regulated", label: "Regulated financial or identity data", categories: ["ai-risk", "ai-document", "kyc-aml", "legal"], reason: "Regulated data needs auditability, controls, citations and compliance alignment." }
        ]
      },
      { id: "stage", label: "Deployment stage", helper: "Use this to separate experiments from production workflows.", type: "single", options: aiStageOptions }
    ]
  },
  {
    key: "rfp-generator",
    title: "RFP Generator",
    shortTitle: "RFP Generator",
    eyebrow: "Vendor brief builder",
    description: "Generate the vendor categories and briefing points a buyer should include before asking for proposals.",
    intent: "Best for buyers ready to send a serious brief to vendors.",
    baseCategories: ["legal"],
    questions: [
      {
        id: "rfpCategory",
        label: "Which vendor category is the RFP about?",
        helper: "Pick the primary vendor group.",
        type: "single",
        options: [
          { value: "custody", label: "Custody or wallets", categories: ["custody", "security", "insurance-risk"], reason: "Custody RFPs should request controls, insurance and security details." },
          { value: "compliance", label: "KYC, AML or compliance", categories: ["kyc-aml", "ai-risk", "legal"], reason: "Compliance RFPs should request coverage, monitoring and audit-log details." },
          { value: "smart-contract", label: "Smart contract development or audit", categories: ["smart-contract", "security", "rpc"], reason: "Technical RFPs should define scope, test coverage, chain support and audit process." },
          { value: "payments", label: "Payments or stablecoins", categories: ["payments", "stablecoins", "kyc-aml"], reason: "Payment RFPs should define corridors, settlement, KYC and supported rails." },
          { value: "ai", label: "AI infrastructure or automation", categories: ["ai-document", "ai-risk", "ai-agents"], reason: "AI RFPs should define data handling, citations, permissions and human review." }
        ]
      },
      {
        id: "mustHave",
        label: "What must the vendor prove?",
        helper: "Select all that apply.",
        type: "multi",
        options: [
          { value: "regulated", label: "Licensing, legal fit or regulated-market experience", categories: ["legal", "kyc-aml", "custody"], reason: "Regulated proof points require legal, compliance and custody verification." },
          { value: "technical", label: "Technical integration and API depth", categories: ["smart-contract", "rpc", "oracles"], reason: "Technical proof points require integration, uptime and data-flow evidence." },
          { value: "security", label: "Security, audit and operational controls", categories: ["security", "insurance-risk", "custody"], reason: "Security proof points require audit, controls and risk-transfer review." },
          { value: "case-studies", label: "References, examples or category credibility", categories: ["marketing-growth", "fund-admin", "broker-dealer"], reason: "Credibility proof points require references, distribution and operational track record." }
        ]
      },
      { id: "region", label: "Primary market", helper: "RFPs should include jurisdiction and user geography.", type: "single", options: commonRegionOptions }
    ]
  }
];

function valuesForQuestion(answer: string | string[] | undefined): string[] {
  if (!answer) return [];
  return Array.isArray(answer) ? answer : [answer];
}

export function getVendorToolConfig(key: VendorToolKey) {
  return vendorToolConfigs.find((tool) => tool.key === key) || vendorToolConfigs[0];
}

export function scoreVendorTool(tool: VendorToolConfig, answers: VendorToolAnswers): VendorRecommendation[] {
  const scored = new Map<VendorCategoryId, { score: number; reasons: string[] }>();

  const add = (categoryId: VendorCategoryId, score: number, reason: string) => {
    const current = scored.get(categoryId) || { score: 0, reasons: [] };
    current.score += score;
    if (!current.reasons.includes(reason)) current.reasons.push(reason);
    scored.set(categoryId, current);
  };

  tool.baseCategories.forEach((categoryId) => {
    add(categoryId, 2, `Core category for ${tool.shortTitle}.`);
  });

  tool.questions.forEach((question) => {
    const selectedValues = valuesForQuestion(answers[question.id]);
    question.options
      .filter((option) => selectedValues.includes(option.value))
      .forEach((option) => {
        option.categories.forEach((categoryId) => add(categoryId, 3, option.reason));
      });
  });

  return [...scored.entries()]
    .map(([id, value]) => {
      const category = vendorCategories[id];
      const confidence: VendorRecommendation["confidence"] = value.score >= 7 ? "High" : value.score >= 4 ? "Medium" : "Exploratory";
      return { ...category, score: value.score, confidence, reasons: value.reasons.slice(0, 4) };
    })
    .sort((a, b) => b.score - a.score || a.label.localeCompare(b.label))
    .slice(0, 8);
}

export function formatVendorBrief(tool: VendorToolConfig, answers: VendorToolAnswers, recommendations: VendorRecommendation[]) {
  const answerLines = tool.questions.map((question) => {
    const selected = valuesForQuestion(answers[question.id]);
    const labels = question.options.filter((option) => selected.includes(option.value)).map((option) => option.label);
    return `${question.label}: ${labels.join(", ") || "Not answered"}`;
  });

  const categoryLines = recommendations.map((item, index) => {
    return `${index + 1}. ${item.label} (${item.confidence} confidence) - ${item.buyerUse}`;
  });

  return [
    `FluidRWA vendor tool: ${tool.title}`,
    "",
    "Buyer inputs:",
    ...answerLines.map((line) => `- ${line}`),
    "",
    "Recommended vendor categories:",
    ...categoryLines,
    "",
    "Recommended verification questions:",
    ...recommendations.slice(0, 5).flatMap((item) => item.verify.map((verify) => `- ${item.label}: ${verify}`))
  ].join("\n");
}
