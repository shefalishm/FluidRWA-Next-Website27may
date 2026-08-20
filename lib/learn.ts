export type LearnTopic = "Tokenization" | "Stablecoins" | "Smart Contracts" | "AI Infrastructure" | "Vendor Selection";

export type LearnSection = {
  id: string;
  title: string;
  body: string[];
};

export type LearnFaq = {
  question: string;
  answer: string;
};

export type LearnComparisonRow = {
  vendor: string;
  goodFit: string;
  strongestFor: string;
  watchFor: string;
};

export type LearnArticle = {
  slug: string;
  title: string;
  description: string;
  topic: LearnTopic;
  readTime: string;
  updatedAt: string;
  accent: "violet" | "blue" | "green" | "amber" | "slate";
  relatedHref: string;
  relatedLabel: string;
  references: { label: string; href: string }[];
  faqs: LearnFaq[];
  comparisonRows?: LearnComparisonRow[];
  sections: LearnSection[];
};

const relatedByTopic: Record<LearnTopic, { href: string; label: string; accent: LearnArticle["accent"] }> = {
  Tokenization: { href: "/vendors/tokenization-platforms", label: "Compare tokenization platforms", accent: "blue" },
  Stablecoins: { href: "/vendors/stablecoin-infrastructure-providers", label: "Explore stablecoin infrastructure providers", accent: "green" },
  "Smart Contracts": { href: "/vendors/smart-contract-development-companies", label: "Find smart contract development companies", accent: "amber" },
  "AI Infrastructure": { href: "/vendors/ai-infrastructure-providers", label: "Compare AI infrastructure providers", accent: "slate" },
  "Vendor Selection": { href: "/tokenization-readiness-assessment-tool", label: "Run the readiness assessment", accent: "violet" }
};

const researchContext: Record<LearnTopic, { source: string; insight: string; references: { label: string; href: string }[] }> = {
  Tokenization: {
    source: "BIS tokenisation and unified-ledger research",
    insight:
      "Tokenization is most useful when it reduces reconciliation, settlement and servicing friction across money, assets and intermediaries. The practical buyer question is not whether a token can be minted, but whether ownership, payments, permissions and lifecycle events can be coordinated reliably.",
    references: [
      { label: "BIS Annual Economic Report 2023: tokenisation and unified ledgers", href: "https://www.bis.org/publ/arpdf/ar2023e3.htm" },
      { label: "CPMI-IOSCO Principles for Financial Market Infrastructures", href: "https://www.bis.org/cpmi/publ/d101a.pdf" }
    ]
  },
  Stablecoins: {
    source: "U.S. Treasury and President's Working Group stablecoin risk analysis",
    insight:
      "Stablecoins can improve payment speed and availability, but arrangements introduce reserve, redemption, wallet, payment-chain, AML/CFT, market-integrity and operational risks. Buyers should evaluate the full arrangement, not only the token.",
    references: [
      { label: "U.S. Treasury: Report on Stablecoins", href: "https://home.treasury.gov/system/files/136/StableCoinReport_Nov1_508.pdf" },
      { label: "BIS Annual Economic Report 2023: tokenised deposits and stablecoins", href: "https://www.bis.org/publ/arpdf/ar2023e3.htm" }
    ]
  },
  "Smart Contracts": {
    source: "OWASP smart contract security guidance",
    insight:
      "Smart contract risk is not limited to code bugs. Access control, oracle assumptions, upgrade paths, business logic, denial-of-service exposure and monitoring all shape whether an RWA system can be operated safely after launch.",
    references: [
      { label: "OWASP Smart Contract Top 10", href: "https://owasp.org/www-project-smart-contract-top-10/" },
      { label: "NIST Cybersecurity Framework", href: "https://www.nist.gov/cyberframework" }
    ]
  },
  "AI Infrastructure": {
    source: "NIST AI Risk Management Framework",
    insight:
      "AI infrastructure decisions should be governed, mapped, measured and managed. Buyers need controls for data handling, observability, model behavior, cost, reliability, security and human oversight before deploying AI in sensitive workflows.",
    references: [
      { label: "NIST AI Risk Management Framework", href: "https://www.nist.gov/itl/ai-risk-management-framework" },
      { label: "NIST Generative AI Profile", href: "https://www.nist.gov/itl/ai-risk-management-framework" }
    ]
  },
  "Vendor Selection": {
    source: "IOSCO digital engagement and operational-risk principles",
    insight:
      "Vendor selection should test governance, disclosures, resilience, conflicts, user protection and operational controls. A strong shortlist explains why each provider fits the workflow and how risks will be monitored after procurement.",
    references: [
      { label: "CPMI-IOSCO Principles for Financial Market Infrastructures", href: "https://www.bis.org/cpmi/publ/d101a.pdf" },
      { label: "NIST Cybersecurity Framework supply-chain risk guidance", href: "https://www.nist.gov/cyberframework" }
    ]
  }
};

const topicChecklists: Record<LearnTopic, string[]> = {
  Tokenization: [
    "Which legal entity, asset record or contractual right is represented by the token?",
    "How are investor eligibility, transfer restrictions and lifecycle events enforced?",
    "Which system is the source of truth for ownership, reporting and redemptions?",
    "How are off-chain records reconciled with on-chain events?",
    "What happens if a provider, chain, wallet or administrator becomes unavailable?"
  ],
  Stablecoins: [
    "Who issues the stablecoin, what backs it and who has redemption rights?",
    "Which wallet, payment processor, exchange, bank and compliance providers touch the flow?",
    "How are sanctions screening, transaction monitoring and blocked wallets handled?",
    "Can finance teams reconcile payments, refunds, fees and conversions without manual cleanup?",
    "What support and incident process exists for stuck, failed or suspicious transactions?"
  ],
  "Smart Contracts": [
    "Which roles can mint, burn, pause, upgrade or change permissions?",
    "How are transfer rules, investor eligibility and exceptional cases implemented?",
    "What tests, audits, monitoring and deployment controls are included?",
    "Can administrators operate safely without engineering intervention for routine events?",
    "What is the rollback or emergency plan if a contract, oracle or integration fails?"
  ],
  "AI Infrastructure": [
    "What workload is being supported: training, fine-tuning, inference, retrieval or automation?",
    "Where does customer data go, how long is it retained and who can access it?",
    "How are latency, cost, quality, failures, drift and abuse monitored?",
    "Can the provider support private networking, regional constraints and enterprise logging?",
    "What is the migration plan if model, compute or vendor economics change?"
  ],
  "Vendor Selection": [
    "Which business outcome and operating workflow must the vendor support?",
    "What evidence proves the vendor has handled comparable assets, users or constraints?",
    "Which parts of implementation are productized, partner-led or custom work?",
    "How will pricing, support, data export, security and service levels be governed?",
    "What ongoing review process will detect drift, outages, roadmap changes or lock-in?"
  ]
};

const topicRiskControls: Record<LearnTopic, string[]> = {
  Tokenization: [
    "Legal mismatch between the token and the underlying rights can create investor confusion.",
    "Servicing gaps can make distributions, redemptions and reporting difficult after launch.",
    "Chain, wallet or administrator dependency should be documented before funds move."
  ],
  Stablecoins: [
    "Reserve and redemption terms may vary by issuer and customer type.",
    "Payment-chain outages can affect settlement even when the blockchain is live.",
    "AML/CFT obligations and wallet screening need clear ownership."
  ],
  "Smart Contracts": [
    "Access-control mistakes can create excessive administrative power or block necessary interventions.",
    "Upgradeability reduces some risks while introducing governance and key-management risk.",
    "Audit reports are point-in-time evidence, not a substitute for monitoring."
  ],
  "AI Infrastructure": [
    "Sensitive data can leak through logs, prompts, embeddings or support workflows.",
    "Model quality can degrade when data, users or prompts change.",
    "Compute shortages and usage spikes can turn a technical decision into a cost-control issue."
  ],
  "Vendor Selection": [
    "A polished demo can hide weak support, weak documentation or missing integrations.",
    "Vendor lock-in increases when data export and termination support are vague.",
    "Unclear responsibilities create gaps during incidents and regulatory reviews."
  ]
};

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function buildFaqs(topic: LearnTopic, title: string, description: string): LearnFaq[] {
  return [
    {
      question: `What is the short answer on ${title.replace(/\?$/, "").toLowerCase()}?`,
      answer: `${description} The practical takeaway is to evaluate the operating workflow, controls, vendors and evidence behind the concept before committing budget.`
    },
    {
      question: `Who should read this ${topic.toLowerCase()} guide?`,
      answer: `This guide is written for founders, product teams, compliance teams, finance leaders, investors and procurement teams comparing ${topic.toLowerCase()} infrastructure or service providers.`
    },
    {
      question: "What should buyers ask vendors first?",
      answer: topicChecklists[topic].slice(0, 3).join(" ")
    },
    {
      question: "What is the biggest implementation risk?",
      answer: topicRiskControls[topic][0]
    }
  ];
}

const topicUseCases: Record<LearnTopic, string[]> = {
  Tokenization: [
    "Tokenized treasury products for investors that want digital subscriptions, transfers and reporting.",
    "Tokenized real estate or private credit products where multiple investors need controlled ownership records.",
    "Trade finance or receivables workflows where document, asset and payment events need tighter coordination.",
    "Fund interests where onboarding, eligibility, transfers and reporting can be managed through a digital workflow."
  ],
  Stablecoins: [
    "Cross-border supplier payments where bank settlement is slow or expensive.",
    "Treasury movement between exchanges, wallets, custodians and operating entities.",
    "On-chain settlement for marketplaces, fintech products or RWA applications.",
    "Programmatic payouts where recipients need near-real-time value transfer."
  ],
  "Smart Contracts": [
    "Permissioned token transfers for regulated investors.",
    "Automated issuance, redemption, distribution or role-management workflows.",
    "Escrow or settlement logic where actions should execute only when conditions are satisfied.",
    "Audit-friendly event logs for product operations and compliance review."
  ],
  "AI Infrastructure": [
    "Document intelligence for diligence, contracts, fund reporting and operational knowledge bases.",
    "Retrieval systems that let teams query approved internal documents with citations.",
    "Risk monitoring, support triage, data extraction and workflow automation.",
    "Private AI deployments where customer or regulated data cannot be sent to generic tools."
  ],
  "Vendor Selection": [
    "Building a shortlist before an RFP or procurement process.",
    "Comparing specialist vendors across tokenization, compliance, custody, payments and reporting.",
    "Running vendor demos against real operating scenarios rather than generic product tours.",
    "Documenting evidence for investment committees, compliance teams or internal stakeholders."
  ]
};

function enrichSections(topic: LearnTopic, title: string, description: string, sections: [string, string[]][]): LearnSection[] {
  const context = researchContext[topic];
  const enriched: [string, string[]][] = [
    [
      "What it means",
      [
        `${title.replace(/\?$/, "")} is best understood as a practical operating concept, not just a technology label. ${description}`,
        `In simple terms, the question is: what real-world record, payment, permission, decision or workflow is being made easier to operate through digital infrastructure? A useful implementation should make the underlying process clearer, faster, easier to audit or easier to coordinate across parties.`
      ]
    ],
    [
      "Why it matters",
      [
        context.insight,
        `For a buyer, ${title.replace(/\?$/, "").toLowerCase()} matters only if it improves the real workflow: onboarding, approvals, ownership records, settlement, reconciliation, servicing, monitoring, support or reporting. If those workflows remain manual and unclear, the technology has not solved the business problem.`
      ]
    ],
    [
      "How it works in practice",
      [
        `A practical implementation usually has three layers. The first layer is the business or legal record: the asset, payment obligation, document, model, user permission or vendor responsibility that exists in the real world. The second layer is the technical system that records, automates or verifies parts of that workflow. The third layer is the operating process: who can approve, pause, reverse, report, support or audit what happened.`,
        `The mistake many teams make is evaluating only the second layer. A good ${topic.toLowerCase()} decision connects all three layers so the product can be operated after launch, not just demonstrated during a sales call.`
      ]
    ],
    [
      "Example",
      [
        `Imagine a company evaluating ${title.replace(/\?$/, "").toLowerCase()} for a new financial product. The team should first define the user journey, the source of truth, the regulated actions, the failure scenarios and the data that must be exported for finance or compliance.`,
        `Only then should it compare vendors. The right provider is the one that supports the actual workflow with clear controls, documentation, integrations and support. The wrong provider may look impressive in a demo but leave the buyer with manual workarounds.`
      ]
    ],
    [
      "Common use cases",
      [
        topicUseCases[topic].join(" "),
        `These use cases are different, but they share the same evaluation pattern: define the operating workflow first, then choose infrastructure that makes the workflow more reliable.`
      ]
    ],
    ...sections,
    [
      "Buyer evaluation checklist",
      [
        `Use these questions before shortlisting vendors: ${topicChecklists[topic].join(" ")}`,
        `A vendor that cannot answer these questions clearly may still be useful, but the gap should be visible in the implementation plan, contract, timeline and risk register.`
      ]
    ],
    [
      "Common risks and misconceptions",
      [
        topicRiskControls[topic].join(" "),
        `A common misconception is that adopting a new platform automatically fixes the underlying process. It does not. The control plan should name the owner, evidence, review cadence and escalation path for each risk. In regulated or enterprise workflows, this documentation is often as important as the technical integration.`
      ]
    ],
    [
      "How FluidRWA helps",
      [
        `FluidRWA is designed to help teams move from education to vendor discovery. After reading this guide, compare relevant providers, check adjacent categories and document why each vendor belongs on the shortlist.`,
        `The strongest procurement process connects concept research, category mapping, vendor evidence, implementation risk and post-launch operating ownership.`
      ]
    ]
  ];

  return enriched.map(([sectionTitle, body]) => ({
    id: slugify(sectionTitle),
    title: sectionTitle,
    body
  }));
}

function guide(
  topic: LearnTopic,
  slug: string,
  title: string,
  description: string,
  readTime: string,
  sections: [string, string[]][],
  options: Partial<Pick<LearnArticle, "references" | "faqs" | "comparisonRows">> = {}
): LearnArticle {
  const related = relatedByTopic[topic];
  return {
    slug,
    title,
    description,
    topic,
    readTime,
    updatedAt: "2026-07-10",
    accent: related.accent,
    relatedHref: related.href,
    relatedLabel: related.label,
    references: options.references ?? researchContext[topic].references,
    faqs: options.faqs ?? buildFaqs(topic, title, description),
    comparisonRows: options.comparisonRows,
    sections: enrichSections(topic, title, description, sections)
  };
}

export const learnArticles: LearnArticle[] = [
  guide("Tokenization", "tokenization-vendor-comparison", "Tokenization Vendor Comparison: Best Fit by Asset, Compliance and Custody", "Compare tokenization vendors by asset class, regulated securities fit, lifecycle management, custody-led infrastructure, distribution, interoperability and real estate workflows.", "11 min read", [
    ["How to read this comparison", ["This is not a ranking and it is not a claim that one vendor is universally best. Tokenization projects differ by asset type, jurisdiction, investor base, custody model, distribution strategy, servicing needs and internal technical maturity.", "Use the comparison as a shortlist tool. A vendor that is strong for regulated securities issuance may not be the best fit for real estate sponsor portals. A custody-led platform may be excellent for institutions that already rely on its wallet and policy stack, but less complete for transfer-agent-style servicing."]],
    ["The buyer framework", ["Evaluate tokenization vendors across six dimensions: asset fit, compliance model, investor onboarding, token lifecycle operations, distribution and secondary-market path, and integrations with custody, payment, reporting and administrator systems.", "The right vendor is the one that matches the operating workflow. For example, a tokenized fund needs subscriptions, eligibility checks, transfer controls, NAV or reporting support and redemption processes. A loyalty token or stablecoin-like instrument may care more about APIs, wallet security, mint/burn controls and chain support."]],
    ["Vendor-by-vendor fit summary", ["Securitize is most relevant when the project is a regulated securities or fund workflow that needs a mature capital-markets operating layer, transfer-agent style services, marketplace or ATS adjacency, and credibility with institutional managers.", "Tokeny is strongest where issuers want a compliance-first tokenization operating system built around ERC-3643, permissioned transfers, lifecycle management and distribution into an on-chain finance ecosystem.", "Fireblocks is strongest where tokenization is part of a broader institutional digital-asset operation: wallet security, MPC custody, policy controls, smart contract operations, mint/burn governance, APIs and connectivity.", "Zoniqx is most relevant when the project needs end-to-end issuance, distribution routing and ecosystem connectivity across protocols, jurisdictions and institutional channels.", "Ownera is not primarily an issuance platform; it is best understood as an application orchestration and interoperability layer for connecting tokenized asset applications, chains, partners and legacy systems.", "Taurus is strongest for banks and financial institutions that want custody, tokenization, digital asset servicing and infrastructure under an institutional operating model.", "DigiShares tends to fit real estate and private market sponsors that need investor portals, cap table or SPV workflows, fundraising tools and asset-management operations rather than only smart-contract deployment.", "Polymesh is different from the others: it is a purpose-built blockchain for regulated assets, so it is more infrastructure choice than full service tokenization vendor. It matters when identity, compliance and regulated-asset primitives at chain level are central to the strategy."]],
    ["Comparison by use case", ["For tokenized funds and securities, start with Securitize, Tokeny, Taurus and Zoniqx depending on jurisdiction, servicing needs and institutional requirements. For real estate syndications or sponsor-led private markets, compare DigiShares with tokenization platforms that offer stronger securities infrastructure.", "For custody-heavy institutional workflows, compare Fireblocks and Taurus against platform-led vendors. For distribution and interoperability, examine Ownera and Zoniqx alongside the issuer platform. For regulated-asset chain infrastructure, evaluate Polymesh as a network choice rather than a replacement for legal, onboarding and servicing providers."]],
    ["What to ask in demos", ["Ask each vendor to walk through the exact lifecycle: investor onboarding, subscription, token issuance, transfer restriction, distribution or yield reporting, redemption, exception handling, data export and support escalation.", "Do not accept a generic demo as proof. A serious comparison requires evidence: live products, jurisdiction coverage, security documentation, compliance model, administrator integrations, pricing, service levels and who owns each operational step."]],
    ["How to build a shortlist", ["Choose one primary issuance or operating platform, then identify the adjacent vendors required for legal structuring, custody, KYC/AML, blockchain analytics, payment rails, fund administration, reporting and distribution.", "A strong shortlist usually includes a platform-led option, a custody-led option and a specialist option. Comparing those three models reveals whether the project needs regulatory infrastructure, technical control, investor operations or distribution reach most."]]
  ], {
    comparisonRows: [
      { vendor: "Securitize", goodFit: "Regulated securities, funds and institutional capital-markets workflows", strongestFor: "Transfer-agent style operations, issuance, investor onboarding, regulated marketplace adjacency and institutional credibility", watchFor: "May be more than needed for simple non-security utility assets or teams that only need smart-contract tooling" },
      { vendor: "Tokeny", goodFit: "Compliance-first on-chain securities, funds, debt and private-market assets", strongestFor: "ERC-3643, permissioned transfers, lifecycle controls, no-code/API issuance and on-chain distribution", watchFor: "Buyers still need to validate jurisdiction-specific legal, custody, administrator and distribution requirements" },
      { vendor: "Fireblocks", goodFit: "Institutions that need tokenization inside a secure wallet, policy, custody and operations stack", strongestFor: "MPC wallet security, mint/burn governance, policy workflows, APIs, 35+ blockchain support and operational controls", watchFor: "It is infrastructure-heavy; buyers may still need separate issuance, legal, investor servicing or distribution partners" },
      { vendor: "Zoniqx", goodFit: "Issuers needing tokenization plus distribution routing and ecosystem connectivity", strongestFor: "Structuring-to-settlement workflow, z360/zConnect positioning, protocol connectivity, institutional distribution paths", watchFor: "Buyers should verify exact issuer responsibilities, supported jurisdictions and post-launch servicing ownership" },
      { vendor: "Ownera", goodFit: "Interoperability, application orchestration and multi-chain market connectivity", strongestFor: "FinP2P routing, connecting applications, chains, partners and legacy platforms across tokenized asset markets", watchFor: "Not a like-for-like issuance platform; works best as part of a broader tokenization stack" },
      { vendor: "Taurus", goodFit: "Banks and financial institutions needing digital asset custody, issuance and servicing infrastructure", strongestFor: "Institutional custody, tokenization infrastructure, regulated financial institution fit and bank-grade operations", watchFor: "May require heavier implementation and institutional readiness than sponsor-led or startup workflows" },
      { vendor: "DigiShares", goodFit: "Real estate tokenization, private market portals and sponsor-led fundraising workflows", strongestFor: "Investor portal, real estate/private market operations, cap table style workflows and sponsor usability", watchFor: "Compare carefully against regulated securities infrastructure if the product has complex compliance or secondary trading needs" },
      { vendor: "Polymesh", goodFit: "Projects choosing a regulated-asset-focused blockchain rather than a general-purpose chain", strongestFor: "Purpose-built network primitives for regulated assets, identity and compliance-aware asset infrastructure", watchFor: "It is chain infrastructure, not a full legal, onboarding, custody and investor-servicing solution by itself" }
    ],
    faqs: [
      { question: "Which tokenization vendor is best?", answer: "There is no universal best tokenization vendor. Securitize may fit regulated securities workflows, Tokeny may fit compliance-first ERC-3643 issuance, Fireblocks may fit custody-led institutional operations, DigiShares may fit real estate sponsors, and Ownera may fit interoperability. The best choice depends on asset type, jurisdiction, investor base, servicing needs and internal operating model." },
      { question: "How should buyers compare tokenization platforms?", answer: "Compare vendors by asset fit, legal and compliance workflow, investor onboarding, transfer restrictions, lifecycle servicing, custody model, payment and reporting integrations, distribution path, security documentation, pricing and support. Ask vendors to demo the exact lifecycle rather than a generic issuance screen." },
      { question: "Is a tokenization platform enough to launch a tokenized asset?", answer: "Usually no. Most projects also need legal structuring, KYC and AML, custody, payment rails, fund administration or transfer-agent operations, tax and investor reporting, wallet support and ongoing servicing." },
      { question: "What is the difference between issuance platforms and infrastructure providers?", answer: "Issuance platforms focus on creating and managing tokenized assets and investor workflows. Infrastructure providers may focus on custody, wallets, policy controls, chain connectivity or interoperability. Many real projects combine both." }
    ],
    references: [
      { label: "Securitize official website", href: "https://securitize.io/" },
      { label: "Tokeny official website", href: "https://tokeny.com/" },
      { label: "Fireblocks tokenization platform", href: "https://www.fireblocks.com/products/tokenization" },
      { label: "Zoniqx official website", href: "https://www.zoniqx.com/" },
      { label: "Ownera official website", href: "https://www.ownera.io/" },
      { label: "Taurus official website", href: "https://www.taurushq.com/" },
      { label: "DigiShares official website", href: "https://digishares.io/" },
      { label: "Polymesh official website", href: "https://polymesh.network/" },
      { label: "BIS Annual Economic Report 2023: tokenisation and unified ledgers", href: "https://www.bis.org/publ/arpdf/ar2023e3.htm" },
      { label: "CPMI-IOSCO Principles for Financial Market Infrastructures", href: "https://www.bis.org/cpmi/publ/d101a.pdf" }
    ]
  }),
  guide("Tokenization", "what-is-real-world-asset-tokenization", "What Is Real-World Asset Tokenization?", "Real-world asset tokenization is the process of representing rights, claims or records for an off-chain asset on digital infrastructure so ownership, transfers, servicing and reporting can be managed more efficiently.", "8 min read", [
    ["Plain-English definition", ["A real-world asset is something that exists outside a blockchain: real estate, treasury exposure, private credit, invoices, commodities, fund interests, carbon credits or other financial claims. Tokenization creates a digital representation of the rights attached to that asset.", "The token itself is not magic and it is not always the legal asset. In many structures, the token represents an interest in a fund, company, note, account, vault, receivable or contract. The legal documents define what the holder owns; the tokenized system helps record, transfer, restrict or service that interest."]],
    ["How an asset becomes tokenized", ["A typical workflow starts with legal structuring: what exactly is being offered, who can buy it, what rights they receive and which jurisdiction applies. Next comes asset verification and custody or administration: the underlying asset or claim has to be documented and controlled. Then the issuer defines investor onboarding, transfer rules, payment flows, reporting and redemption mechanics.", "Only after those decisions does the tokenization platform matter. The platform may mint tokens, manage investor records, enforce transfer restrictions, connect wallets, generate reports or integrate with custodians, KYC providers, payment rails and fund administrators."]],
    ["What the token actually does", ["A token can act as a programmable record of ownership or entitlement. It can also carry rules: who is allowed to hold it, whether it can be transferred, whether it is locked, which wallets are approved and what events should be recorded.", "For regulated assets, the token usually needs permissioning. That means transfers may only happen between eligible investors, after compliance checks, or with administrator approval. This is very different from a freely transferable meme token or public cryptocurrency."]],
    ["Detailed example", ["Consider a private credit fund that wants to offer digital subscriptions. The issuer creates legal documents for the fund interest, verifies investors through KYC and accreditation checks, accepts funds through bank or stablecoin rails, then issues tokens that represent each investor's interest.", "After launch, the platform must support transfers, statements, yield or distribution reporting, tax documents, redemption requests and investor support. If the platform can mint a token but cannot support servicing, the project is not operationally complete."]],
    ["Use cases", ["Common use cases include tokenized treasuries, real estate interests, private credit, fund interests, invoices, commodities, carbon credits and structured products.", "The value is usually strongest when the current workflow is fragmented: many intermediaries, slow settlement, manual reconciliation, limited transferability, poor investor reporting or expensive administration."]],
    ["Benefits", ["Tokenization can improve transparency, reduce reconciliation, enable more programmable transfer controls, support smaller investment units and make servicing more automated.", "It can also help issuers reach digital-native investors, but distribution is not guaranteed. A tokenized asset still needs demand, trust, compliance, documentation and support."]],
    ["Limitations", ["Tokenization does not automatically create liquidity. It does not remove securities laws, tax obligations, custody requirements or investor protection duties. It also does not make a weak asset better.", "The most important limitation is the link between the token and the real-world asset. If legal rights, asset control and servicing processes are weak, the tokenized wrapper will not fix them."]]
  ]),
  guide("Tokenization", "what-are-tokenized-treasuries", "What Are Tokenized Treasuries?", "A clear guide to treasury-backed tokenized products, yield distribution and implementation design.", "5 min read", [
    ["Treasuries vs stablecoins", ["Tokenized treasuries provide exposure to short-duration government securities or treasury-backed strategies.", "They are usually designed around yield-bearing exposure rather than payment utility."]],
    ["Yield distribution", ["Yield may appear through token value, periodic distributions, rebasing mechanics or off-chain reporting.", "Each design choice affects accounting, communication and vendor requirements."]],
    ["Vendor requirements", ["Treasury products commonly need legal structuring, identity checks, custody, fund administration, tokenization tooling and payment rails.", "The best stack makes subscriptions, transfers, reporting and redemptions operable after launch."]]
  ]),
  guide("Tokenization", "tokenization-platform-architecture", "How Tokenization Platforms Are Architected", "The core systems behind issuance, investor records, transfer controls and servicing.", "5 min read", [
    ["Core modules", ["Most platforms include issuance tools, investor registries, permissioning, token administration and reporting modules.", "The architecture should match the asset lifecycle instead of forcing every product into one template."]],
    ["On-chain and off-chain roles", ["On-chain contracts may manage transfers and ownership states while off-chain systems manage documents, identities and approvals.", "The split matters for compliance, support and auditability."]],
    ["Procurement checks", ["Ask which modules are native, which require partners and which require custom implementation.", "Strong providers should explain the whole operating model clearly."]]
  ]),
  guide("Tokenization", "asset-servicing-tokenized-products", "Asset Servicing For Tokenized Products", "How reporting, distributions, redemptions and investor updates work after issuance.", "4 min read", [
    ["Why servicing matters", ["Many tokenization projects fail after launch because servicing was treated as an afterthought.", "Investors still need statements, notices, distribution records and redemption workflows."]],
    ["Lifecycle events", ["Teams should map subscriptions, transfers, distributions, corporate actions and redemptions before choosing vendors.", "Each event may involve legal, finance, compliance and technical owners."]],
    ["Vendor questions", ["Ask providers how servicing events are configured, approved, exported and reconciled.", "Look for a system that finance teams can operate without engineering dependency."]]
  ]),
  guide("Tokenization", "tokenized-real-estate-basics", "Tokenized Real Estate Basics", "A practical introduction to structures, investor workflows and vendor requirements for real estate tokenization.", "5 min read", [
    ["Common structures", ["Real estate tokenization often represents interests in an entity, fund or revenue arrangement rather than the property itself.", "The legal structure determines investor rights and transfer rules."]],
    ["Operational workflow", ["Projects need onboarding, cap table or registry management, payment collection, income distribution and reporting.", "The token should fit the workflow already required by the asset."]],
    ["Provider fit", ["Compare vendors on legal compatibility, jurisdiction support, investor management and reporting depth.", "A polished token demo is not enough for a real estate product."]]
  ]),

  guide("Stablecoins", "what-are-stablecoins", "What Are Stablecoins?", "Stablecoins as payment, settlement and treasury infrastructure for fintech and Web3 teams.", "4 min read", [
    ["Stablecoins as infrastructure", ["Stablecoins are digital assets designed to track a reference currency, most commonly the U.S. dollar.", "In production, they support payments, settlement, treasury movement and on-chain financial products."]],
    ["Provider stack", ["Stablecoin workflows can involve issuers, wallets, custodians, compliance tools, exchanges, payment processors and banking partners.", "The right mix depends on geography, custody model and fiat requirements."]],
    ["Procurement questions", ["Ask vendors how they handle failed transactions, blocked wallets, refunds, reconciliation exports and urgent support.", "Finance and engineering teams should evaluate the stack together."]]
  ]),
  guide("Stablecoins", "stablecoin-payment-rails", "How Stablecoin Payment Rails Work", "A buyer-friendly guide to wallets, fiat ramps, settlement flows and reconciliation.", "5 min read", [
    ["Payment flow", ["A stablecoin payment workflow usually connects a payer, wallet, blockchain, compliance layer, receiver and treasury process.", "The user experience depends on how well those pieces are abstracted."]],
    ["Fiat entry and exit", ["Most businesses still need fiat on-ramps, off-ramps, bank accounts and accounting exports.", "The stablecoin provider should make fiat movement predictable and auditable."]],
    ["Operational controls", ["Look for approval rules, transaction limits, wallet screening, refund handling and reconciliation files.", "Controls matter as much as transaction speed."]]
  ]),
  guide("Stablecoins", "stablecoin-compliance-checklist", "Stablecoin Compliance Checklist", "The core screening, sanctions, monitoring and documentation questions teams should ask.", "4 min read", [
    ["Screening basics", ["Teams should understand wallet screening, sanctions checks, transaction monitoring and escalation workflows.", "Compliance cannot be bolted on after funds start moving."]],
    ["Documentation", ["Vendors should provide policies, logs, exportable records and support for internal reviews.", "Strong documentation helps legal, finance and compliance teams stay aligned."]],
    ["Risk ownership", ["Clarify which risks are handled by the issuer, wallet provider, payment processor and customer.", "Ambiguity creates operational gaps."]]
  ]),
  guide("Stablecoins", "stablecoin-treasury-operations", "Stablecoin Treasury Operations", "How companies manage balances, counterparties, conversions and reporting when stablecoins enter finance workflows.", "5 min read", [
    ["Treasury movement", ["Stablecoins can make funds move faster, but treasury teams still need policies for wallets, signers and approvals.", "The operating model should be written before balances become material."]],
    ["Reconciliation", ["Every transaction should connect to invoices, customer records, bank movements or internal accounting categories.", "Export quality is a key vendor selection factor."]],
    ["Liquidity and counterparties", ["Teams should evaluate conversion partners, liquidity depth, fees and settlement timing.", "The cheapest headline fee is not always the safest operating choice."]]
  ]),
  guide("Stablecoins", "stablecoin-vendor-selection", "How To Select Stablecoin Vendors", "A practical scorecard for issuers, wallets, payment processors and treasury tools.", "5 min read", [
    ["Start with the use case", ["Payroll, cross-border payments, treasury movement and product settlement have different requirements.", "Define volume, geography, users and custody model first."]],
    ["Score the stack", ["Compare vendors on compliance, fiat connectivity, developer experience, support, reconciliation and reliability.", "The best provider is the one that reduces operational burden."]],
    ["Run a pilot", ["Start with a limited transaction path and validate support, controls and reporting.", "A pilot reveals gaps that demos miss."]]
  ]),

  guide("Smart Contracts", "how-do-smart-contracts-work-in-rwa-products", "How Do Smart Contracts Work In RWA Products?", "How contracts support issuance, permissions, transfers and controls in tokenized asset workflows.", "6 min read", [
    ["The role of contracts", ["Smart contracts can manage token issuance, transfers, permissions, pause controls and upgrade paths.", "In RWA products, they connect legal requirements to product behavior."]],
    ["Permissions and compliance", ["Many RWA products require approved wallets, transfer restrictions, lockups or administrative controls.", "Eligibility decisions may be enforced on-chain, off-chain or through a hybrid design."]],
    ["Choosing a partner", ["Evaluate vendors by architecture, testing, audit preparation, deployment records and handoff quality.", "A strong team leaves the issuer with a system that can be operated safely."]]
  ]),
  guide("Smart Contracts", "smart-contract-audit-basics", "Smart Contract Audit Basics", "What audits cover, what they do not cover and how teams should prepare before launch.", "4 min read", [
    ["Audit scope", ["Audits review contract logic, access controls, edge cases and known vulnerability patterns.", "They do not replace product design, legal review or operational controls."]],
    ["Preparation", ["Teams should freeze scope, document assumptions, write tests and prepare deployment plans before audit.", "Messy preparation creates slower and weaker reviews."]],
    ["After the audit", ["Track findings, remediation, retesting and accepted risks.", "The final report should be tied to the code that is actually deployed."]]
  ]),
  guide("Smart Contracts", "permissioned-token-standards", "Permissioned Token Standards For RWA", "How restricted transfers, allowlists and role-based controls shape tokenized asset products.", "5 min read", [
    ["Why permissioning exists", ["Many tokenized assets cannot trade freely because investor eligibility and transfer rules apply.", "Permissioning helps encode those constraints into the product workflow."]],
    ["Design options", ["Teams may use allowlists, transfer agents, rule engines, claims or off-chain approval services.", "Each option changes flexibility, cost and operational complexity."]],
    ["Vendor evaluation", ["Ask vendors how rules are updated, audited and explained to operators.", "The system should make exceptions visible rather than hidden."]]
  ]),
  guide("Smart Contracts", "upgradeability-and-admin-controls", "Upgradeability And Admin Controls", "A guide to proxy patterns, pause controls, role management and governance tradeoffs.", "5 min read", [
    ["Why upgrades matter", ["Financial products may need fixes, compliance updates or feature changes after launch.", "Upgradeability can reduce risk but introduces administrative power."]],
    ["Admin design", ["Admin roles should be limited, documented, monitored and protected with strong signing policies.", "Emergency controls need clear approval processes."]],
    ["Buyer questions", ["Ask who can upgrade, pause, mint, burn or change rules.", "Then ask how those actions are logged and communicated."]]
  ]),
  guide("Smart Contracts", "smart-contract-development-rfp", "Smart Contract Development RFP Guide", "What to include when asking development firms to bid on an RWA product build.", "5 min read", [
    ["Define the product", ["Include asset type, user roles, transfer rules, lifecycle events and integration needs.", "The more specific the workflow, the more useful the proposals."]],
    ["Ask for evidence", ["Request architecture examples, audit experience, deployment history, testing approach and maintenance terms.", "Good teams can explain tradeoffs without hiding behind jargon."]],
    ["Compare deliverables", ["Look for documentation, test suites, deployment scripts, handoff support and monitoring plans.", "A lower build quote may cost more if operations are weak."]]
  ]),

  guide("AI Infrastructure", "how-to-evaluate-ai-infrastructure-providers", "How To Evaluate AI Infrastructure Providers", "A buyer-oriented guide to AI compute, deployment, security, observability and cost evaluation.", "5 min read", [
    ["Start with the workload", ["Training, fine-tuning, inference, retrieval and batch processing create different requirements.", "Document model size, latency, data sensitivity, regions and expected cost before comparing vendors."]],
    ["Security and controls", ["Enterprise teams need answers on retention, access logs, tenant isolation, deletion and private networking.", "These requirements may rule out otherwise attractive providers."]],
    ["Scorecard", ["Score vendors across workload fit, availability, deployment model, observability, reliability, support and migration risk.", "The best provider fits the operating model, not just the headline GPU price."]]
  ]),
  guide("AI Infrastructure", "ai-compute-procurement-guide", "AI Compute Procurement Guide", "How to compare GPU availability, pricing, contracts, regions and support quality.", "5 min read", [
    ["Capacity planning", ["Teams should estimate peak and baseline usage, model size, batch patterns and latency needs.", "Capacity commitments should match real demand rather than hype."]],
    ["Pricing structure", ["Compare reserved, on-demand and usage-based pricing alongside data transfer and storage costs.", "The cheapest GPU rate may not be the lowest total cost."]],
    ["Support and reliability", ["Ask about incident response, quotas, region availability and escalation paths.", "Compute procurement is an operating decision."]]
  ]),
  guide("AI Infrastructure", "ai-observability-basics", "AI Observability Basics", "What teams need to monitor models, prompts, latency, quality, costs and failures.", "4 min read", [
    ["What to track", ["AI systems need visibility into latency, errors, token usage, retrieval quality, drift and user outcomes.", "Traditional infrastructure monitoring is not enough."]],
    ["Operational workflows", ["Teams should define who reviews failures, who approves changes and how incidents are investigated.", "Observability is useful only when it supports decisions."]],
    ["Vendor questions", ["Ask whether logs can be exported, filtered, retained and connected to existing monitoring tools.", "Avoid tools that trap critical operating data."]]
  ]),
  guide("AI Infrastructure", "private-ai-deployment-models", "Private AI Deployment Models", "A guide to hosted, VPC, on-prem and hybrid deployment options for sensitive workflows.", "5 min read", [
    ["Deployment choices", ["Hosted APIs are fast to adopt, while VPC, dedicated and on-prem deployments offer more control.", "The right model depends on data sensitivity and operating maturity."]],
    ["Security tradeoffs", ["Private deployments can improve control but require stronger internal operations.", "Teams should weigh isolation, update cadence, monitoring and support."]],
    ["Vendor fit", ["Ask providers which controls are contractual, technical and operational.", "The answer should be clear enough for security review."]]
  ]),
  guide("AI Infrastructure", "ai-data-and-retrieval-stack", "AI Data And Retrieval Stack", "How document pipelines, vector databases, permissions and evaluation connect in AI products.", "5 min read", [
    ["Data pipeline", ["Retrieval systems need ingestion, parsing, chunking, embedding, indexing and permission checks.", "Bad data preparation creates bad AI behavior."]],
    ["Access control", ["Enterprise AI must respect document-level and user-level permissions.", "The retrieval layer should not expose information users cannot access."]],
    ["Evaluation", ["Teams should test answer quality, citations, freshness and failure cases.", "Evaluation should happen continuously, not only at launch."]]
  ]),

  guide("Vendor Selection", "how-to-build-a-rwa-vendor-shortlist", "How To Build An RWA Vendor Shortlist", "A practical framework for moving from research to a defensible vendor shortlist.", "5 min read", [
    ["Start with outcomes", ["Define the asset, user workflow, launch timeline, compliance needs and internal owners.", "Shortlists should be built around outcomes, not buzzwords."]],
    ["Map categories", ["Most projects need several categories: tokenization, legal, custody, compliance, contracts, payments and reporting.", "Identify which vendors own which part of the workflow."]],
    ["Compare evidence", ["Use case fit, references, integrations, documentation and support quality should outweigh vague claims.", "A good shortlist explains why each vendor belongs."]]
  ]),
  guide("Vendor Selection", "vendor-due-diligence-questions", "Vendor Due Diligence Questions", "Questions buyers should ask before trusting an RWA or Web3 infrastructure provider.", "4 min read", [
    ["Company and team", ["Ask about team experience, ownership, funding, runway and relevant production deployments.", "Vendor stability matters for long-running financial products."]],
    ["Security and compliance", ["Review audits, policies, access controls, incident history and data handling.", "The diligence process should match the risk level."]],
    ["Commercial fit", ["Clarify pricing, implementation effort, support terms, renewal structure and exit options.", "A good contract reduces surprises after launch."]]
  ]),
  guide("Vendor Selection", "rwa-implementation-timeline", "RWA Implementation Timeline", "How teams should sequence discovery, vendor selection, build, compliance review and launch.", "5 min read", [
    ["Discovery", ["Discovery should define the product, asset, users, jurisdictions, vendors and success criteria.", "Skipping discovery usually creates rework later."]],
    ["Build and review", ["Implementation includes legal review, technical build, integrations, testing and operational readiness.", "Each workstream needs an owner."]],
    ["Launch readiness", ["Before launch, verify support, incident response, monitoring, reporting and user communication.", "A launch checklist should include business operations, not only code."]]
  ]),
  guide("Vendor Selection", "vendor-demo-scorecard", "Vendor Demo Scorecard", "How to evaluate demos without being distracted by polished screens and incomplete workflows.", "4 min read", [
    ["Prepare scenarios", ["Bring real workflows to the demo: onboarding, transfer approval, redemption, reporting and exception handling.", "A generic product tour does not prove fit."]],
    ["Score what matters", ["Score workflow coverage, clarity, configuration depth, integrations, support and reporting.", "Record gaps immediately after each demo."]],
    ["Follow up", ["Ask for documentation, sample exports, reference calls and implementation plans.", "The best vendors can go deeper after the demo."]]
  ]),
  guide("Vendor Selection", "rwa-vendor-risk-management", "RWA Vendor Risk Management", "How to think about lock-in, outages, compliance gaps and operational dependency.", "5 min read", [
    ["Risk categories", ["RWA projects can face vendor lock-in, data portability issues, security events, compliance gaps and support failures.", "Each risk should have an owner and mitigation plan."]],
    ["Contract protections", ["Look for service levels, data export rights, incident duties, termination support and clear responsibilities.", "Contracts should support real operations."]],
    ["Ongoing review", ["Vendor risk does not end after procurement.", "Review performance, incidents, roadmap changes and category fit on a regular cadence."]]
  ])
];

export function getLearnArticle(slug: string) {
  return learnArticles.find((article) => article.slug === slug);
}

export function getLearnTopics() {
  return Array.from(new Set(learnArticles.map((article) => article.topic)));
}
