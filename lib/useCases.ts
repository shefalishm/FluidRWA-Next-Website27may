export type UseCase = {
  slug: string;
  title: string;
  industry: string;
  image: string;
  imageAlt: string;
  visualLabel: string;
  visualKicker: string;
  summary: string;
  seoDescription?: string;
  problem: string;
  stack: string[];
  vendorCategories: { label: string; href: string }[];
  example: string;
  sections?: { heading: string; body: string; bullets?: string[] }[];
  implementationSteps?: string[];
  buyerQuestions?: string[];
  sources?: { label: string; href: string }[];
  faqs?: { q: string; a: string }[];
};

export const useCases: UseCase[] = [
  {
    slug: "healthcare-credentials-consent",
    title: "Healthcare Credentials and Patient Consent",
    industry: "Healthcare and Life Sciences",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=76",
    imageAlt: "Healthcare team using digital systems",
    visualLabel: "Health ID",
    visualKicker: "Consent",
    summary: "Hospitals, research networks and digital health platforms need verifiable credentials, patient consent records and audit trails without exposing sensitive data.",
    problem: "Healthcare teams must prove identity, permissions and data provenance while staying privacy-first.",
    stack: ["Decentralized identity", "Consent management", "Compliance logs", "Secure document workflows"],
    vendorCategories: [
      { label: "Identity Solutions", href: "/vendors/identity-solution-providers" },
      { label: "Compliance Infrastructure", href: "/vendors/compliance-infrastructure-providers" },
      { label: "AI Infrastructure", href: "/vendors/ai-infrastructure-providers" }
    ],
    example: "Useful for clinical trial consent, clinician credentials, patient data access approvals and healthcare document verification."
  },
  {
    slug: "maritime-trade-documents",
    title: "Trade Finance Documents and Cargo Provenance",
    industry: "Trade Finance and Logistics",
    image: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=900&q=76",
    imageAlt: "Container shipping and port logistics",
    visualLabel: "Bill of Lading",
    visualKicker: "Trade",
    summary: "Banks, logistics providers and exporters can coordinate bills of lading, cargo milestones, document approvals and settlement evidence.",
    problem: "Trade documents move across carriers, banks, insurers and customs teams, creating delays and fraud risk.",
    stack: ["Digital document registry", "Identity and permissions", "Workflow automation", "Trade finance settlement rails"],
    vendorCategories: [
      { label: "Legal and Regulatory", href: "/vendors/legal-regulatory-vendors" },
      { label: "Identity Solutions", href: "/vendors/identity-solution-providers" },
      { label: "Stablecoin Infrastructure", href: "/vendors/stablecoin-infrastructure-providers" }
    ],
    example: "Useful for electronic bills of lading, letters of credit support, shipment provenance, customs documentation and trade settlement coordination."
  },
  {
    slug: "carbon-credit-mrv",
    title: "Carbon Credit MRV and Retirement Tracking",
    industry: "Carbon Credits and Climate Markets",
    image: "https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=900&q=76",
    imageAlt: "Sustainable agriculture and climate market landscape",
    visualLabel: "MRV",
    visualKicker: "Climate",
    summary: "Project developers, registries and buyers need measurable, reportable and verifiable records for credit issuance, transfer and retirement.",
    problem: "Buyers need confidence that credits are real, traceable, not double-counted and connected to project evidence.",
    stack: ["MRV data layer", "Registry integrations", "Credit lifecycle tracking", "Buyer reporting"],
    vendorCategories: [
      { label: "Tokenization Platforms", href: "/vendors/tokenization-platforms" },
      { label: "Compliance Infrastructure", href: "/vendors/compliance-infrastructure-providers" },
      { label: "AI Infrastructure", href: "/vendors/ai-infrastructure-providers" }
    ],
    example: "Useful for renewable energy credits, nature-based credits, retirement certificates and buyer reporting dashboards."
  },
  {
    slug: "gaming-asset-ownership",
    title: "Loyalty, Tickets and Fan Memberships",
    industry: "Consumer Brands and Entertainment",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=76",
    imageAlt: "Entertainment and digital membership experience",
    visualLabel: "Member Pass",
    visualKicker: "Loyalty",
    summary: "Brands, sports teams and entertainment companies can build digital memberships, ticket perks, loyalty rewards and creator commerce.",
    problem: "Consumer programs need easy onboarding, fraud controls, resale rules and clear ownership without making users feel they are using crypto.",
    stack: ["Wallet-light onboarding", "Membership contracts", "Marketplace rules", "Fraud controls"],
    vendorCategories: [
      { label: "Gaming Vendors", href: "/vendors/gaming-vendors" },
      { label: "Smart Contract Development", href: "/vendors/smart-contract-development-companies" },
      { label: "Fiat On and Off Ramps", href: "/vendors/fiat-on-off-ramp-providers" }
    ],
    example: "Useful for loyalty passes, fan memberships, ticketing perks, creator rewards and marketplace-enabled digital collectibles."
  },
  {
    slug: "insurance-claims-parametric-risk",
    title: "Insurance Claims and Parametric Risk",
    industry: "Insurance and Risk",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=76",
    imageAlt: "Insurance documents and risk review",
    visualLabel: "Claim Event",
    visualKicker: "Risk",
    summary: "Insurers, brokers and risk platforms can connect policy documents, event data, claims evidence and payout workflows.",
    problem: "Claims often depend on fragmented evidence, slow manual review and difficult payout reconciliation.",
    stack: ["Policy document intelligence", "Event data feeds", "Claims workflow", "Payment settlement"],
    vendorCategories: [
      { label: "AI Infrastructure", href: "/vendors/ai-infrastructure-providers" },
      { label: "Legal and Regulatory", href: "/vendors/legal-regulatory-vendors" },
      { label: "Stablecoin Infrastructure", href: "/vendors/stablecoin-infrastructure-providers" }
    ],
    example: "Useful for parametric insurance, shipment insurance, crop risk, catastrophe triggers, claims triage and faster approved payouts."
  },
  {
    slug: "supply-chain-provenance",
    title: "Product Passports and Supply Chain Provenance",
    industry: "Manufacturing and Consumer Goods",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=76",
    imageAlt: "Warehouse supply chain operations",
    visualLabel: "Origin Proof",
    visualKicker: "Supply",
    summary: "Manufacturers, luxury brands and regulated goods companies can prove product origin, custody chain, certifications and recall history.",
    problem: "Counterfeits, fragmented suppliers and weak audit trails make product trust hard to prove.",
    stack: ["Digital product passports", "Supplier credentials", "IoT or scan events", "Compliance reporting"],
    vendorCategories: [
      { label: "Identity Solutions", href: "/vendors/identity-solution-providers" },
      { label: "Blockchain Development", href: "/vendors/blockchain-development-companies" },
      { label: "Compliance Infrastructure", href: "/vendors/compliance-infrastructure-providers" }
    ],
    example: "Useful for luxury goods, pharmaceuticals, food traceability, batteries, certificates of origin and recall workflows."
  },
  {
    slug: "real-estate-fund-administration",
    title: "Tokenized Real Estate Fund Administration",
    industry: "Real Estate",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=76",
    imageAlt: "Commercial real estate buildings",
    visualLabel: "Fund Units",
    visualKicker: "Real Estate",
    summary: "Real estate managers can modernize investor onboarding, cap tables, transfer rules, reporting and distributions for property funds and SPVs.",
    problem: "Private real estate products still rely on manual subscription, transfer, reporting and investor communication workflows.",
    stack: ["Investor onboarding", "Transfer restrictions", "Fund administration", "Distribution payments"],
    vendorCategories: [
      { label: "Tokenization Platforms", href: "/vendors/tokenization-platforms" },
      { label: "KYC AML Providers", href: "/vendors/kyc-aml-providers" },
      { label: "Legal and Regulatory", href: "/vendors/legal-regulatory-vendors" }
    ],
    example: "Useful for real estate funds, SPVs, private REIT-like products, income distribution workflows, secondary transfer controls and investor reporting."
  },
  {
    slug: "stablecoin-payouts-remittances",
    title: "Stablecoin Payouts and Treasury Settlement",
    industry: "Payments and Fintech",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=76",
    imageAlt: "Digital payments and fintech checkout",
    visualLabel: "Stable Payout",
    visualKicker: "Payments",
    summary: "Fintechs, marketplaces and global businesses can use stablecoins for faster payouts, treasury movement and international settlement.",
    problem: "Cross-border payouts can be slow, expensive and hard to reconcile across banking partners.",
    stack: ["Stablecoin issuance or acceptance", "On/off ramps", "Compliance screening", "Treasury reconciliation"],
    vendorCategories: [
      { label: "Stablecoin Infrastructure", href: "/vendors/stablecoin-infrastructure-providers" },
      { label: "Fiat On and Off Ramps", href: "/vendors/fiat-on-off-ramp-providers" },
      { label: "Compliance Infrastructure", href: "/vendors/compliance-infrastructure-providers" }
    ],
    example: "Useful for creator payouts, contractor payments, marketplace settlement, remittances, vendor payments and treasury operations."
  },
  {
    slug: "private-credit-servicing",
    title: "Private Credit Servicing and Distribution",
    industry: "Private Credit",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=76",
    imageAlt: "Investment analytics dashboard",
    visualLabel: "Credit Flow",
    visualKicker: "Servicing",
    summary: "Private credit managers can streamline investor onboarding, reporting, servicing events and controlled distribution.",
    problem: "Private credit products need investor eligibility, servicing transparency and distribution workflows that scale.",
    stack: ["Tokenized fund access", "Investor KYC", "Servicing workflows", "Reporting and data rooms"],
    vendorCategories: [
      { label: "Tokenization Platforms", href: "/vendors/tokenization-platforms" },
      { label: "KYC AML Providers", href: "/vendors/kyc-aml-providers" },
      { label: "Crypto Custody Providers", href: "/vendors/crypto-custody-providers" }
    ],
    example: "Useful for private credit funds, feeder structures, interval-style access, investor portals and alternative asset platforms."
  },
  {
    slug: "ai-document-intelligence",
    title: "AI Document Intelligence for Regulated Finance",
    industry: "Enterprise AI",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=76",
    imageAlt: "Financial documents and analytics workspace",
    visualLabel: "Doc Parser",
    visualKicker: "AI Review",
    summary: "Regulated teams can parse offering documents, policies, KYC files and reports into structured workflows.",
    problem: "Financial documents are long, inconsistent and difficult to route into compliance, review and sales workflows.",
    stack: ["Document parsers", "Human review queues", "Regulated AI agents", "Audit-ready outputs"],
    vendorCategories: [
      { label: "AI Infrastructure", href: "/vendors/ai-infrastructure-providers" },
      { label: "Legal and Regulatory", href: "/vendors/legal-regulatory-vendors" },
      { label: "Compliance Infrastructure", href: "/vendors/compliance-infrastructure-providers" }
    ],
    example: "Useful for fund document extraction, subscription review, policy checks, diligence packs and compliance summaries."
  },
  {
    slug: "identity-kyc-onboarding",
    title: "Reusable Identity, KYC and Investor Onboarding",
    industry: "Compliance and Identity",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=76",
    imageAlt: "Financial document review desk",
    visualLabel: "KYC Pass",
    visualKicker: "Identity",
    summary: "Platforms can reduce repeated onboarding by using reusable identity, screening, wallet risk and investor eligibility checks.",
    problem: "Users repeatedly submit documents while platforms still need sanctions checks, risk scoring and eligibility controls.",
    stack: ["Identity verification", "KYC and AML screening", "Wallet risk scoring", "Transfer eligibility"],
    vendorCategories: [
      { label: "KYC AML Providers", href: "/vendors/kyc-aml-providers" },
      { label: "Identity Solutions", href: "/vendors/identity-solution-providers" },
      { label: "Compliance Infrastructure", href: "/vendors/compliance-infrastructure-providers" }
    ],
    example: "Useful for investor onboarding, marketplace access, gated token transfers, broker workflows and compliance operations."
  },
  {
    slug: "tokenized-treasury-products",
    title: "Tokenized Treasury and Money Market Products",
    industry: "Asset Management",
    image: "https://images.unsplash.com/photo-1560472355-536de3962603?auto=format&fit=crop&w=900&q=76",
    imageAlt: "Asset management team reviewing investment strategy",
    visualLabel: "T-Bill Access",
    visualKicker: "Treasury",
    summary: "Asset managers can offer digitally accessible treasury or money market exposure with controlled onboarding and custody.",
    problem: "Institutional cash products need compliant access, fund administration, custody integrations and reporting.",
    stack: ["Tokenization platform", "Qualified custody", "Fund administration", "Investor reporting"],
    vendorCategories: [
      { label: "Tokenization Platforms", href: "/vendors/tokenization-platforms" },
      { label: "Crypto Custody Providers", href: "/vendors/crypto-custody-providers" },
      { label: "Legal and Regulatory", href: "/vendors/legal-regulatory-vendors" }
    ],
    example: "Useful for treasury funds, money market funds, onchain cash products and institutional liquidity products."
  },
  {
    slug: "tokenized-collateral-liquidity",
    title: "Tokenized Collateral and Intraday Liquidity",
    industry: "Capital Markets Infrastructure",
    image: "https://images.unsplash.com/photo-1565372918679-380c0f4618a9?auto=format&fit=crop&w=900&q=76",
    imageAlt: "Capital markets operations team reviewing liquidity and collateral workflows",
    visualLabel: "Collateral Rail",
    visualKicker: "Liquidity",
    summary: "Banks, broker-dealers, asset managers and market infrastructures can use tokenized collateral workflows to improve collateral mobility, margin operations and delivery-versus-payment settlement.",
    seoDescription: "Explore tokenized collateral and intraday liquidity use cases for banks, broker-dealers, asset managers and market infrastructure teams, including collateral mobility, DvP, repo, margin and vendor stack requirements.",
    problem: "Collateral often sits across disconnected custodians, settlement systems, ledgers and time zones. Moving it can require manual reconciliation, delayed eligibility checks and sequential settlement steps that reduce liquidity efficiency.",
    stack: ["Tokenized collateral records", "Qualified custody", "Collateral eligibility rules", "Oracles and pricing data", "DvP and settlement workflow", "Compliance monitoring"],
    vendorCategories: [
      { label: "Tokenization Platforms", href: "/vendors/tokenization-platforms" },
      { label: "Crypto Custody Providers", href: "/vendors/crypto-custody-providers" },
      { label: "Oracles and Proof of Reserve", href: "/vendors/oracles-data-proof-of-reserve" },
      { label: "Compliance Infrastructure", href: "/vendors/compliance-infrastructure-providers" }
    ],
    example: "Useful for intraday liquidity, collateral mobility, repo workflows, margin calls, tokenized treasury collateral, delivery-versus-payment settlement and institutional collateral optimization.",
    sections: [
      {
        heading: "What the use case means",
        body: "Tokenized collateral uses programmable asset records to represent eligible collateral, confirm ownership, apply transfer restrictions and coordinate settlement instructions. The goal is not simply to create a token. The goal is to make collateral easier to locate, verify, pledge, move, substitute and release across counterparties."
      },
      {
        heading: "Why institutions care",
        body: "Collateral operations can be slowed by siloed systems, cut-off times, settlement windows and fragmented data. Tokenized platforms can combine collateral records, payment instructions, pricing data and compliance rules so that margining, repo, pledging and settlement actions become more automated and auditable.",
        bullets: ["Faster collateral movement", "Reduced reconciliation breaks", "Programmable eligibility checks", "Improved DvP and PvP workflows", "Better audit trails for collateral status"]
      },
      {
        heading: "Where tokenization helps most",
        body: "The strongest near-term fit is controlled institutional environments where participants are known, assets are eligible, custodians are integrated and legal agreements define how token records map to real-world rights."
      },
      {
        heading: "Risks and controls",
        body: "Teams still need clear legal treatment, bankruptcy remoteness analysis, custody controls, oracle resilience, settlement-finality design, cybersecurity review and regulator-ready operating procedures. Tokenized collateral should not be treated as a shortcut around existing collateral, securities or banking rules."
      }
    ],
    implementationSteps: [
      "Define the collateral asset, legal owner, custodian and permissible counterparties.",
      "Map eligibility rules for asset type, haircut, jurisdiction, tenor, concentration and counterparty limits.",
      "Connect custody, tokenization platform, pricing data, compliance checks and settlement workflow.",
      "Test pledge, release, substitution, margin call, default and unwind scenarios.",
      "Document audit evidence, operational controls and exception handling before scaling."
    ],
    buyerQuestions: [
      "Does the platform support permissioned collateral transfers and institutional custody integrations?",
      "Can pricing, haircut and eligibility data be updated in a controlled way?",
      "How are DvP, settlement finality and failed-settlement events handled?",
      "Can compliance, sanctions and counterparty rules be enforced before transfer?",
      "What audit logs, reports and reconciliation exports are available?"
    ],
    sources: [
      { label: "BIS: The next-generation monetary and financial system", href: "https://www.bis.org/publ/arpdf/ar2025e3.htm" },
      { label: "FSB: Financial stability implications of tokenisation", href: "https://www.fsb.org/2024/10/the-financial-stability-implications-of-tokenisation/" },
      { label: "MAS: Project Guardian", href: "https://www.mas.gov.sg/schemes-and-initiatives/project-guardian" }
    ],
    faqs: [
      { q: "What is tokenized collateral?", a: "Tokenized collateral is a programmable digital record of an eligible collateral asset that can support pledging, transfer, substitution, settlement and audit workflows. The token should map to a clear legal claim and controlled custody arrangement." },
      { q: "Is tokenized collateral only for DeFi?", a: "No. The strongest institutional use cases are often permissioned workflows involving banks, custodians, broker-dealers, asset managers and financial market infrastructures." },
      { q: "What vendors are needed for tokenized collateral?", a: "Most projects need a tokenization platform, qualified custody, pricing or oracle data, compliance infrastructure, legal support, settlement workflow tooling and operational reporting." },
      { q: "What is the main risk?", a: "The main risk is assuming a token alone creates legal certainty or liquidity. Collateral workflows still need enforceable legal rights, custody controls, data reliability, settlement-finality design and operational governance." }
    ]
  },
  {
    slug: "digital-fund-administration-transfer-agent",
    title: "Digital Fund Administration and Transfer Agent Workflows",
    industry: "Asset Management Operations",
    image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=900&q=76",
    imageAlt: "Fund operations team reviewing investor records and reporting workflows",
    visualLabel: "Investor Record",
    visualKicker: "Fund Ops",
    summary: "Fund managers can modernize subscription, investor registry, transfer restrictions, NAV data, distribution records and reporting workflows for tokenized funds and private-market vehicles.",
    seoDescription: "Learn how digital fund administration and transfer agent workflows support tokenized funds, investor records, subscriptions, NAV reporting, transfer restrictions, distributions and compliance operations.",
    problem: "Private fund operations often rely on fragmented subscription documents, spreadsheets, manual investor communications, delayed NAV workflows and separate transfer-agent records that do not connect cleanly to tokenized ownership.",
    stack: ["Investor onboarding", "Digital transfer agent records", "Fund administration", "NAV and reporting data", "Distribution workflows", "Compliance case management"],
    vendorCategories: [
      { label: "Fund Administration and Transfer Agents", href: "/vendors/fund-administration-transfer-agents" },
      { label: "Tokenization Platforms", href: "/vendors/tokenization-platforms" },
      { label: "KYC AML Providers", href: "/vendors/kyc-aml-providers" },
      { label: "Legal and Regulatory", href: "/vendors/legal-regulatory-vendors" }
    ],
    example: "Useful for tokenized funds, feeder funds, private credit vehicles, real estate funds, interval-style products, investor portals, distribution tracking and secondary transfer approvals.",
    sections: [
      {
        heading: "What the use case means",
        body: "Digital fund administration connects investor onboarding, fund records, token ownership, transfer restrictions, NAV data, capital activity and investor reporting. For tokenized funds, the transfer-agent or registry function becomes especially important because the token record must line up with the official investor record."
      },
      {
        heading: "Why this matters for tokenized funds",
        body: "A tokenized fund is not only a smart contract. It is still a regulated investment product with subscriptions, redemptions, investor eligibility, tax documents, transfer records, distributions and reporting obligations. The operational system has to connect the digital asset layer to real fund administration."
      },
      {
        heading: "High-value workflows",
        body: "The highest-value workflows are usually investor onboarding, digital subscription review, official holder record maintenance, transfer approvals, NAV publication, corporate actions, distribution calculations and investor reporting.",
        bullets: ["Subscription and KYC routing", "Investor registry updates", "Transfer restriction enforcement", "NAV and statement delivery", "Distribution and redemption records"]
      },
      {
        heading: "Risks and controls",
        body: "Teams should avoid treating token balances as the only source of truth unless legal documents, fund administrator processes and transfer-agent responsibilities explicitly support that model. Record reconciliation, investor communications and audit evidence remain essential."
      }
    ],
    implementationSteps: [
      "Define the official investor record and how it relates to token balances.",
      "Map subscription, KYC, KYB, accreditation and transfer approval workflows.",
      "Connect fund administration data such as NAV, capital activity, statements and distributions.",
      "Design exception handling for lost wallets, failed transfers, redemptions and investor status changes.",
      "Test reporting, audit exports and investor communications before launch."
    ],
    buyerQuestions: [
      "Who is the official transfer agent or recordkeeper?",
      "Can the system reconcile token balances with the investor register?",
      "How are subscriptions, redemptions, transfers and distributions approved?",
      "Can investor documents, tax forms and statements be generated or exported?",
      "Does the workflow support institutional, accredited and entity investors?"
    ],
    sources: [
      { label: "BIS: Tokenisation and unified ledgers", href: "https://www.bis.org/publ/arpdf/ar2025e3.htm" },
      { label: "Swift, UBS Asset Management and Chainlink tokenized fund pilot", href: "https://www.swift.com/news-events/press-releases/swift-ubs-asset-management-and-chainlink-successfully-complete-innovative-pilot-bridge-tokenized-assets-existing-payment-systems" },
      { label: "SEC transfer agent information", href: "https://www.sec.gov/divisions/marketreg/mrtransfer.shtml" }
    ],
    faqs: [
      { q: "Why do tokenized funds need transfer-agent workflows?", a: "Tokenized funds still need accurate investor records, ownership changes, transfer restrictions, statements, distributions and audit evidence. A token can represent fund interests, but the fund still needs an authoritative operating record." },
      { q: "Can a tokenization platform replace a fund administrator?", a: "Usually no. Some platforms include fund workflows, but regulated fund administration, transfer-agent responsibilities, accounting and investor reporting may require specialist providers." },
      { q: "What is the biggest implementation challenge?", a: "The biggest challenge is reconciling legal records, fund administration data and token balances so the system remains accurate during subscriptions, redemptions, transfers and investor changes." },
      { q: "Which vendors should buyers compare?", a: "Buyers should compare fund administrators, transfer agents, tokenization platforms, KYC/KYB providers, custody providers, legal advisors and reporting tools." }
    ]
  },
  {
    slug: "proof-of-reserve-tokenized-assets",
    title: "Proof of Reserve and Asset Verification for Tokenized Assets",
    industry: "Data, Oracles and Risk",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=900&q=76",
    imageAlt: "Digital asset data infrastructure and verification dashboard",
    visualLabel: "Reserve Check",
    visualKicker: "Verification",
    summary: "Issuers, custodians and protocols can use proof-of-reserve, asset data feeds and oracle infrastructure to verify reserves, backing, pricing and lifecycle events for tokenized assets.",
    seoDescription: "Explore proof-of-reserve and asset verification use cases for tokenized assets, including reserve monitoring, oracle data, collateral checks, automated safeguards and vendor stack requirements.",
    problem: "Tokenized assets depend on offchain facts: reserves, custody balances, NAVs, asset prices, insurance coverage, legal records and issuer attestations. If those facts are stale, opaque or unreliable, buyers cannot trust the token.",
    stack: ["Proof of reserve feeds", "Custody attestations", "NAV and price data", "Oracle infrastructure", "Risk controls", "Issuer reporting"],
    vendorCategories: [
      { label: "Oracles and Proof of Reserve", href: "/vendors/oracles-data-proof-of-reserve" },
      { label: "Crypto Custody Providers", href: "/vendors/crypto-custody-providers" },
      { label: "Compliance Infrastructure", href: "/vendors/compliance-infrastructure-providers" },
      { label: "Tokenization Platforms", href: "/vendors/tokenization-platforms" }
    ],
    example: "Useful for stablecoins, tokenized treasuries, wrapped assets, tokenized commodities, fund NAV publication, collateral monitoring, redemption controls and issuer transparency dashboards.",
    sections: [
      {
        heading: "What the use case means",
        body: "Proof of reserve and asset verification connect real-world evidence to tokenized assets. The workflow can publish reserve balances, custody attestations, NAVs, collateral ratios or asset metadata so investors, protocols and counterparties can understand whether a token remains properly backed."
      },
      {
        heading: "Why this matters",
        body: "A tokenized asset is only as credible as its backing and data pipeline. For stablecoins, wrapped assets, commodities and tokenized funds, buyers need more than a marketing promise. They need evidence that reserves exist, that data is updated, and that system safeguards activate when backing changes."
      },
      {
        heading: "Where verification is useful",
        body: "Verification is especially valuable when token supply can change, assets are redeemable, collateral ratios matter, smart contracts depend on external prices, or DeFi protocols accept the asset as collateral.",
        bullets: ["Stablecoin reserve visibility", "Tokenized commodity backing", "Wrapped asset collateral checks", "Fund NAV publication", "Circuit breakers for undercollateralization"]
      },
      {
        heading: "Risks and controls",
        body: "Proof of reserve is not a full audit by itself. Buyers should understand the source of data, update frequency, liabilities, custody arrangements, legal claim, oracle decentralization, failure modes and whether controls cover both assets and obligations."
      }
    ],
    implementationSteps: [
      "Define what needs to be verified: cash, treasuries, wallets, commodities, NAV, collateral ratio or custody account.",
      "Identify authoritative data sources and who controls access to them.",
      "Connect data feeds or attestations to public dashboards, smart contracts or risk systems.",
      "Set thresholds for warnings, mint pauses, redemption controls or collateral actions.",
      "Publish methodology, update frequency and limitations so users understand what is and is not verified."
    ],
    buyerQuestions: [
      "Does the verification cover assets only, or both assets and liabilities?",
      "How often is reserve data updated?",
      "Who supplies the data and how is it authenticated?",
      "Can smart contracts automatically respond to reserve shortfalls?",
      "What happens if the oracle, custodian API or data provider fails?"
    ],
    sources: [
      { label: "Chainlink Proof of Reserve", href: "https://chain.link/proof-of-reserve" },
      { label: "FSB: Financial stability implications of tokenisation", href: "https://www.fsb.org/2024/10/the-financial-stability-implications-of-tokenisation/" },
      { label: "BIS: Tokenisation and monetary system design", href: "https://www.bis.org/publ/arpdf/ar2025e3.htm" }
    ],
    faqs: [
      { q: "What is proof of reserve for tokenized assets?", a: "Proof of reserve is a data and verification workflow that shows whether the reserves or collateral backing a tokenized asset exist and meet defined thresholds. It can use custody data, attestations, wallet balances, APIs and oracle feeds." },
      { q: "Is proof of reserve the same as an audit?", a: "No. Proof of reserve can improve transparency, but it does not automatically prove liabilities, legal ownership, redemption rights or full financial condition. It should complement audits, custody controls and legal disclosures." },
      { q: "Which tokenized assets need proof of reserve?", a: "Stablecoins, wrapped assets, tokenized commodities, treasury-backed tokens, tokenized funds and collateral assets can all benefit from reserve or asset verification." },
      { q: "What vendors are needed?", a: "Most projects need oracle or proof-of-reserve providers, custodians, tokenization platforms, compliance infrastructure, auditors or attestation providers and reporting dashboards." }
    ]
  }
];

export function getUseCase(slug: string) {
  return useCases.find((useCase) => useCase.slug === slug);
}
