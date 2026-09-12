import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const out = path.join(root, "content", "blog");

const guides = [
  {
    slug: "coin-metrics-vs-kaiko-vs-token-terminal-digital-asset-data",
    title: "Coin Metrics vs Kaiko vs Token Terminal: Digital Asset Data Platforms Compared (2026)",
    description: "Compare Coin Metrics, Kaiko and Token Terminal for market data, onchain metrics, reference rates, protocol fundamentals, valuation and institutional research workflows.",
    category: "Digital Asset Data Infrastructure",
    vendors: ["Coin Metrics", "Kaiko", "Token Terminal"],
    answer: "Coin Metrics is the natural starting point for normalized network, market, index and reference data; Kaiko for institutional market data, pricing, indices, valuation and surveillance; and Token Terminal for standardized protocol and blockchain fundamentals. Most institutions should first decide whether they need a financial-market data feed, an onchain network dataset or an analyst-facing fundamentals product, because these products overlap less than their category labels suggest.",
    criteria: ["primary data need", "market and chain coverage", "methodology and lineage", "delivery and latency", "valuation and benchmark governance", "analyst workflow", "licensing and redistribution", "quality controls and incident handling"],
    rows: [
      ["Primary orientation", "Network, market, index and reference data", "Institutional market data, pricing, indices and analytics", "Standardized blockchain and protocol financial fundamentals"],
      ["Best starting point for", "Risk, research and data teams combining onchain and market datasets", "Trading, valuation, product issuance, surveillance and market operations", "Investors and analysts comparing protocol economics and operating performance"],
      ["Typical output", "APIs, feeds, reference rates, indexes and network metrics", "Real-time and historical feeds, order books, pricing, indices and analytics", "Dashboards, standardized metrics, financial statements and APIs"],
      ["Key strength to test", "Consistency between asset, market, network and reference identifiers", "Venue normalization, timestamp quality, pricing methodology and delivery resilience", "Definition and comparability of protocol revenue, fees, earnings and user metrics"],
      ["Main limitation to examine", "Whether every required venue, chain and derived metric is covered at the needed frequency", "Whether onchain fundamentals and protocol-specific accounting are deep enough for the use case", "Whether latency, raw-market depth and benchmark governance meet institutional production needs"],
      ["Proof required", "Schema, methodology, revisions, uptime history and sample reconciliation", "Venue matrix, outlier handling, benchmark documents, SLA and redistribution rights", "Metric definitions, protocol mappings, restatement policy and API history"]
    ],
    profiles: [
      ["Coin Metrics", "Coin Metrics documents Network Data Pro, Market Data Feed, indexes, reference rates, Atlas blockchain data and a security master that aligns assets and markets across downstream systems.", "Institutions that need a common data foundation spanning onchain activity, market behavior, reference data and portfolio or risk workflows.", "Confirm the exact chain, venue, instrument, history, granularity and delivery method. A broad product family does not mean every dataset has identical coverage or latency."],
      ["Kaiko", "Kaiko positions its platform around institutional digital asset market data, analytics, pricing, regulated indices, valuation workflows and market surveillance across centralized and decentralized markets.", "Trading, asset management, custody, treasury and product teams that need auditable pricing, granular market feeds or benchmark-grade infrastructure.", "Validate exchange selection, data gaps, correction policy, timestamp methodology, licensing and the impact of Kaiko's announced Amberdata acquisition on product packaging and migration."],
      ["Token Terminal", "Token Terminal standardizes financial and operational metrics for blockchains and decentralized applications, helping analysts compare protocol fees, revenue, users, token incentives and other fundamentals.", "Research and investment teams that want a familiar financial-analysis layer for crypto protocols rather than raw node or exchange data.", "Protocol accounting is judgment-heavy. Review metric definitions, contract mappings, exclusions, token incentive treatment, historical restatements and the ability to reproduce a number from source data."]
    ],
    scenarios: [
      ["Daily NAV or collateral valuation", "Kaiko or Coin Metrics", "Benchmark methodology, cut-off time, venue filters and auditability matter more than dashboard breadth."],
      ["Onchain network health and adoption research", "Coin Metrics", "Network-level metrics and consistent asset identifiers are central to the workflow."],
      ["Protocol equity-style research", "Token Terminal", "Standardized fees, revenue, users and token economics create a faster analyst workflow."],
      ["Trading and execution analytics", "Kaiko", "Granular order-book and market data should be tested at production latency and scale."],
      ["Enterprise data lake", "Run a field-level coverage test", "The best provider is the one whose identifiers, licenses and revision process fit every downstream system."]
    ],
    insights: [
      ["Do not buy one dataset for three different jobs", "Pricing, onchain state and protocol fundamentals have different source systems and quality risks. A single vendor can cover several layers, but buyers should score each required field separately rather than awarding credit for a broad category claim."],
      ["Methodology is part of the product", "Ask how venues, contracts and entities are selected; how forks, symbol collisions, wash trading and missing observations are handled; and whether historical values are restated. A number without lineage is difficult to use in audit, risk or regulated reporting."],
      ["The Kaiko and Amberdata combination changes procurement", "Kaiko announced its acquisition of Amberdata in 2026. Buyers considering either product should request a current roadmap, contracting entity, dataset migration plan, support model and confirmation of which capabilities remain separately available."]
    ],
    sources: [
      ["Coin Metrics product overview", "https://gitbook-docs.coinmetrics.io/product-overview"],
      ["Coin Metrics data guide", "https://docs.coinmetrics.io/getting-started"],
      ["Kaiko platform", "https://www.kaiko.com/"],
      ["Kaiko mark-to-market", "https://www.kaiko.com/resources/mark-to-market"],
      ["Token Terminal", "https://tokenterminal.com/"],
      ["Amberdata acquisition context", "https://www.amberdata.io/"]
    ]
  },
  {
    slug: "inx-vs-tzero-vs-texture-capital-digital-securities",
    title: "INX vs tZERO vs Texture Capital: Digital Securities Platforms Compared (2026)",
    description: "Compare INX, tZERO and Texture Capital for regulated digital securities issuance, broker-dealer services, ATS trading, investor onboarding, custody and secondary liquidity.",
    category: "Digital Securities Market Infrastructure",
    vendors: ["INX", "tZERO", "Texture Capital"],
    answer: "INX is a natural starting point for issuers seeking tokenization, investor onboarding and access to an integrated digital asset marketplace; tZERO for institutions seeking a broad US digital-securities stack spanning issuance, ATS trading, custody and settlement; and Texture Capital for private-market issuers that want a broker-dealer, transfer-agent-adjacent and white-label marketplace model. The decisive questions are the exact regulated entity, exemption, investor population, custody path and realistic route to liquidity.",
    criteria: ["regulated entity and permitted activity", "offering exemptions and investor eligibility", "issuance and token administration", "ATS and secondary trading model", "custody, clearing and settlement", "transfer agent and corporate actions", "distribution and liquidity plan", "blockchain and wallet support"],
    rows: [
      ["Primary orientation", "Integrated tokenization and digital asset investing platform", "End-to-end tokenized capital-markets infrastructure", "Private-capital issuance and controlled secondary marketplaces"],
      ["Regulated-market focus", "US broker-dealer and ATS services through disclosed entities", "US broker-dealer, ATS, custody and settlement capabilities through disclosed entities", "FINRA broker-dealer and SEC-registered ATS, with affiliated transfer-agent services"],
      ["Best fit", "Issuer seeking a guided token sale and marketplace path", "Institution or intermediary needing a broad infrastructure relationship", "Private issuer seeking branded fundraising and scheduled liquidity events"],
      ["Liquidity model to test", "Eligibility and activity for the specific security on the INX marketplace", "Security-specific order flow and connectivity across tZERO's regulated stack", "Controlled ATS events, eligible participants and issuer-specific market design"],
      ["Core diligence question", "Which entity owns each stage from offering through trading and custody?", "Which licenses and production services apply to this exact asset and investor type?", "How will the issuer recruit eligible buyers and create repeat participation?"],
      ["Do not assume", "A 24/7-capable venue guarantees continuous liquidity", "End-to-end capability means every module is mandatory or available in every structure", "Tokenization or an ATS listing makes a private security liquid"]
    ],
    profiles: [
      ["INX", "INX presents tokenization support covering compliance, onboarding, token minting, distribution and ongoing management, alongside a platform for crypto and tokenized securities. Its disclosures identify the regulated entities providing securities and digital asset services.", "Companies that want a visible investor-facing marketplace and a guided path from compliant issuance toward potential secondary trading.", "Confirm legal structure, offering exemption, investor geography, token rights, transfer-agent responsibilities, custody, market hours, fees, minimum liquidity support and the exact entity named in each agreement."],
      ["tZERO", "tZERO describes an integrated stack for tokenization, primary and secondary markets, custody, settlement, transfer-agent workflows and institutional connectivity, anchored by SEC- and FINRA-regulated entities.", "Financial institutions, broker-dealers and issuers that want regulated digital-securities infrastructure with multiple lifecycle components under a coordinated model.", "Map every product claim to the contracting entity and current approval. Validate asset eligibility, wallet and custody model, clearing, corporate actions, interoperability, market activity, service dependencies and exit portability."],
      ["Texture Capital", "Texture Capital focuses on private placements, tokenization and secondary trading through a registered broker-dealer and ATS. It also presents white-label marketplaces, investor onboarding and transfer-agent integration for issuers.", "Private companies, funds and alternative-asset sponsors that want controlled fundraising and issuer-branded secondary liquidity events.", "Review investor eligibility, Reg D, Reg S, Reg A or crowdfunding fit, matching model, event frequency, custody, stablecoin settlement, transfer restrictions and whether projected liquidity has committed participants."]
    ],
    scenarios: [
      ["Consumer-facing tokenized offering", "INX after exemption and distribution review", "A combined issuance and marketplace journey may be useful when investor experience is central."],
      ["Broker-dealer adding tokenized securities", "tZERO after entity-level diligence", "Custody, settlement and regulated infrastructure connectivity may be more important than issuer marketing."],
      ["Private company creating periodic liquidity windows", "Texture Capital", "Scheduled ATS events and branded investor workflows may fit a controlled private-market model."],
      ["Institutional fund interests", "Compare all three against the administrator and transfer agent", "Subscription, eligibility, capital calls, distributions and records can matter more than token minting."],
      ["Issuer expecting immediate liquidity", "None without a funded market plan", "A venue is infrastructure; buyers, sellers, research, market makers and transfer permissions create activity."]
    ],
    insights: [
      ["Regulated is not a complete sentence", "Identify the legal entity, registration, permitted activity, customer agreement and asset. A group may contain a broker-dealer, ATS, transfer agent, custodian or technology company, and each performs a different legally significant role."],
      ["Liquidity must be underwritten as a workstream", "Request security-level trading data where available, eligible investor counts, spread and depth expectations, market-making arrangements, lockups and communication plans. Tokenization improves transfer infrastructure but does not create buyers."],
      ["Model the full ownership record", "Document where the authoritative holder record lives, how wallet ownership maps to registered ownership, how lost keys are handled, who enforces restrictions, and how dividends, votes, splits and redemptions are processed."]
    ],
    sources: [
      ["INX platform", "https://www.inx.co/"],
      ["INX tokenization services", "https://tokenize.inx.co/"],
      ["tZERO trading platform", "https://www.tzero.com/trade"],
      ["tZERO corporate platform", "https://www.tzero.com/"],
      ["Texture Capital broker-dealer platform", "https://www.texture.capital/digital-broker-dealer"],
      ["Texture Capital blockchain integrations", "https://www.texture.capital/blockchains"]
    ]
  },
  {
    slug: "m0-vs-brale-vs-paxos-stablecoin-issuance-platforms",
    title: "M0 vs Brale vs Paxos: Stablecoin Issuance Platforms Compared (2026)",
    description: "Compare M0, Brale and Paxos for branded stablecoins, regulated issuance, reserves, minting, redemption, rewards, multi-chain deployment and distribution.",
    category: "Stablecoin Issuance Infrastructure",
    vendors: ["M0", "Brale", "Paxos"],
    answer: "M0 is the natural starting point for builders and qualified issuers that want modular, programmable stablecoin infrastructure with shared liquidity and configurable economics; Brale for teams seeking a managed, API-led path to launching and operating a branded stablecoin; and Paxos for large enterprises prioritizing an experienced regulated issuer behind a major white-label program. These are different operating models, so buyers must decide who will be the legal issuer and reserve manager before comparing APIs.",
    criteria: ["legal issuer model", "reserve ownership and custody", "minting and redemption", "programmability and rewards", "multi-chain deployment", "liquidity and conversion", "compliance responsibilities", "brand economics and exit"],
    rows: [
      ["Primary orientation", "Modular stablecoin platform for builders and issuing partners", "Managed stablecoin-as-a-service and operating platform", "Regulated white-label issuance for major enterprises"],
      ["Issuer model", "Builder can partner with an M0-powered issuer or a qualified institution can run Stablecoin Core", "Brale supports issuance and reserve operations under the agreed program structure", "Paxos acts through the relevant regulated issuing entity"],
      ["Best fit", "Product teams differentiating money behavior, rewards and interoperability", "Teams that want a branded asset without assembling issuance operations from scratch", "Large brands with material distribution and a complex regulated launch"],
      ["Technical focus", "Extensions, mint and burn, reward distribution and onchain orchestration", "Dashboard, API, team controls, issuance, redemption and treasury operations", "Issuer operations, reserves, attestations, redemption and partner distribution"],
      ["Core diligence question", "Which issuing partner and jurisdiction support the intended product?", "What legal claim, reserve account and redemption promise sits behind the token?", "Which Paxos entity, markets and program commitments apply?"],
      ["Do not assume", "Open infrastructure removes licensing or reserve obligations", "A fast deployment creates adoption or secondary liquidity", "Regulated issuance guarantees product-market fit or global availability"]
    ],
    profiles: [
      ["M0", "M0 documents a modular platform with Stablecoin Core for qualified issuers, Stablecoin Extensions for builders and optional onchain orchestration for conversion, liquidity and multi-chain movement.", "Fintechs and financial institutions that want configurable stablecoin behavior, partner choice, rewards distribution and an architecture designed for multiple branded assets.", "Confirm the issuing partner, currency, reserve rules, mint ratio, earners, governance, contract upgrades, conversion mechanics, supported chains, emergency controls and responsibilities that remain with the builder."],
      ["Brale", "Brale offers a regulated stablecoin issuance platform with APIs and a dashboard for creating and operating branded stablecoins, including minting, redemption, managed reserves and multi-chain deployment.", "Startups, ecosystems and established businesses that value a managed issuance path and developer-accessible operations for a custom digital dollar.", "Verify legal issuer and redemption terms, reserve custody and permitted investments, customer eligibility, chain contracts, audit or attestation scope, bank dependencies, fees, controls, support and wind-down mechanics."],
      ["Paxos", "Paxos provides regulated blockchain and stablecoin infrastructure and has issued white-label assets for major partners. Public materials emphasize reserve management, attestations, minting, redemption and regulatory structures.", "Large payment companies, banks and platforms that need an established regulated issuer and can support a substantial commercial, compliance and distribution program.", "Confirm the specific issuing entity, jurisdiction, reserve policy, token governance, partner economics, account eligibility, chain roadmap, redemption SLA, distribution commitments, data rights and termination plan."]
    ],
    scenarios: [
      ["Application-specific stablecoin with programmable rewards", "M0", "Extensions and configurable reward distribution are central to the product thesis."],
      ["Fast branded stablecoin pilot", "Brale", "A managed issuance and API model can reduce the initial operational build."],
      ["Global consumer brand launching a dollar token", "Paxos", "Issuer credibility, reserve operations and enterprise program experience may dominate."],
      ["Bank becoming the issuer", "M0 Stablecoin Core after licensing review", "The institution may want to keep reserve and issuer economics while licensing infrastructure."],
      ["Payments product that does not need a new token", "Use an established stablecoin", "A branded asset adds redemption, governance, liquidity and distribution obligations."]
    ],
    insights: [
      ["Choose the issuer before the software", "The token is a claim on an issuer and its reserves. Establish which entity owes redemption, where reserves sit, what holders receive in insolvency and which regulator or legal framework applies before evaluating developer experience."],
      ["Programmability creates governance obligations", "Rewards, allowlists, pausing, upgrades and cross-chain movement need owners, limits, approvals and audit logs. Product flexibility becomes operational risk when authority is unclear."],
      ["Distribution is usually harder than deployment", "Define who will hold the stablecoin, how they obtain and redeem it, where liquidity comes from, which wallets and venues support it, and why users prefer it to USDC, USDT or bank money."]
    ],
    sources: [
      ["M0 platform overview", "https://docs.m0.org/get-started/overview/"],
      ["M0 issuer overview", "https://docs.m0.org/issuers/overview"],
      ["M0 builder guide", "https://docs.m0.org/build/overview/"],
      ["Brale platform", "https://brale.xyz/"],
      ["Brale API documentation", "https://docs.brale.xyz/"],
      ["Paxos stablecoin issuance", "https://www.paxos.com/stablecoin-issuance"]
    ]
  },
  {
    slug: "merkle-science-vs-scorechain-vs-crystal-blockchain-analytics",
    title: "Merkle Science vs Scorechain vs Crystal: Blockchain Analytics Compared (2026)",
    description: "Compare Merkle Science, Scorechain and Crystal for wallet screening, transaction monitoring, cross-chain investigations, entity attribution, sanctions controls and crypto AML operations.",
    category: "Blockchain Analytics and Compliance",
    vendors: ["Merkle Science", "Scorechain", "Crystal"],
    answer: "Merkle Science is a natural starting point for teams prioritizing behavior-based predictive risk, cross-chain investigations and ecosystem monitoring; Scorechain for institutions seeking configurable European-oriented AML analytics, wallet screening and audit-ready risk reporting; and Crystal for teams that want investigation and transaction-monitoring workflows built around visual fund tracing and broad crypto intelligence. The winner must be selected with a labeled test set from the buyer's own wallets and typologies.",
    criteria: ["chain and asset coverage", "entity attribution", "direct and indirect exposure", "transaction monitoring", "investigation workflow", "risk-model explainability", "case evidence and reporting", "API, latency and data governance"],
    rows: [
      ["Primary orientation", "Predictive risk intelligence, compliance and cross-chain forensics", "Configurable blockchain AML, screening and investigation", "Blockchain intelligence, transaction monitoring and visual investigations"],
      ["Best fit", "Teams facing emerging typologies, bridges and proactive ecosystem risk", "EU and global compliance teams wanting transparent risk controls and reporting", "Investigators and compliance teams tracing flows and screening activity"],
      ["Workflow emphasis", "Compass monitoring, Tracker investigations and Onchain Pulse", "Wallet screening, KYT, investigation, KYA reports and VASP intelligence", "Address screening, transaction monitoring, entity intelligence and investigation graphs"],
      ["Core test", "Does behavior-based scoring find relevant risk without overwhelming analysts?", "Can analysts understand, tune and defend every material risk decision?", "Can investigators reproduce paths, evidence and attribution across required chains?"],
      ["False-positive question", "Which behavioral signals drive the score and how are they validated?", "How do configurable indicators affect consistency across analysts and entities?", "How are exposure thresholds, clustering and attribution confidence presented?"],
      ["Do not assume", "Predictive means accurate for the buyer's transaction population", "EU orientation replaces local legal and policy design", "A visual path proves identity, ownership or criminal intent"]
    ],
    profiles: [
      ["Merkle Science", "Merkle Science presents Compass for predictive transaction monitoring, Tracker for forensic investigations, a data platform and Onchain Pulse for ecosystem-level risk intelligence, with emphasis on cross-chain tracing and behavior-based signals.", "Exchanges, stablecoin issuers, banks and investigators that need proactive monitoring across fast-changing assets, bridges and illicit-finance patterns.", "Validate attribution confidence, bridge tracing, chain-specific coverage, sanctions latency, model explanations, alert reproducibility, analyst override controls, data retention and performance on the buyer's own typologies."],
      ["Scorechain", "Scorechain provides wallet screening, transaction monitoring, investigations, risk scoring, reports and VASP intelligence. Its materials emphasize configurable, explainable analytics and EU-hosted infrastructure.", "Banks, crypto businesses and regulated European teams that value transparent risk models, policy configuration and audit-ready reporting.", "Confirm coverage at the token and feature level, attribution depth, indirect-exposure settings, alert tuning, GDPR roles, EU hosting boundaries, investigation exports, Travel Rule integration and support for local reporting."],
      ["Crystal", "Crystal offers blockchain analytics for risk and compliance, including address screening, transaction monitoring, investigation tooling and fund-flow visualization for compliance and investigative users.", "Compliance, law-enforcement and investigation teams that need a visual workspace for tracing transactions and documenting wallet risk.", "Request a current network matrix, attribution methodology, data-source policy, clustering confidence, cross-chain and bridge treatment, screening latency, API limits, case exports and customer-controlled risk configuration."]
    ],
    scenarios: [
      ["Stablecoin issuer monitoring ecosystem abuse", "Merkle Science or Scorechain", "Token-level monitoring, sanctions response and aggregate ecosystem signals should be tested together."],
      ["European CASP preparing MiCA controls", "Scorechain", "EU-oriented deployment and explainable policy configuration may be useful, subject to legal validation."],
      ["Complex hack investigation across bridges", "Merkle Science or Crystal", "Trace continuity, attribution evidence and investigator ergonomics should drive the proof of concept."],
      ["Real-time deposit screening", "Run all three on the same labeled addresses", "Latency, decision consistency and false positives matter more than marketing coverage counts."],
      ["Law-enforcement evidence package", "Crystal or Merkle Science after export testing", "The team needs reproducible paths, timestamps, attribution basis and defensible case records."]
    ],
    insights: [
      ["Coverage counts hide functional gaps", "A vendor may parse a chain without supporting every token, bridge, mixer, attribution type or real-time monitoring feature. Require a feature-by-chain matrix tied to the exact workflow."],
      ["Test with a labeled decision set", "Include known low-risk customers, sanctioned exposure, scams, mixers, bridges, exchange hot wallets and ambiguous indirect exposure. Compare precision, recall, analyst time and decision stability when policies change."],
      ["Attribution is evidence, not certainty", "Ask whether a label is self-declared, sourced, heuristically clustered or inferred. Analysts should see confidence, provenance and last-updated time and should be able to challenge a label without losing the audit trail."]
    ],
    sources: [
      ["Merkle Science platform", "https://www.merklescience.com/"],
      ["Scorechain platform", "https://www.scorechain.com/"],
      ["Scorechain blockchain analytics overview", "https://www.scorechain.com/resources/crypto-glossary/blockchain-analytics"],
      ["Crystal Intelligence", "https://crystalintelligence.com/"],
      ["Crystal product access", "https://lite.crystalintelligence.com/"]
    ]
  },
  {
    slug: "canton-vs-polymesh-vs-provenance-institutional-rwa-blockchains",
    title: "Canton vs Polymesh vs Provenance: Institutional RWA Blockchains Compared (2026)",
    description: "Compare Canton Network, Polymesh and Provenance Blockchain for institutional tokenization, privacy, identity, compliance, settlement, financial assets and ecosystem connectivity.",
    category: "Institutional Blockchain Networks",
    vendors: ["Canton Network", "Polymesh", "Provenance Blockchain"],
    answer: "Canton is a natural starting point for multi-party institutional workflows where selective disclosure, privacy and atomic interoperability between applications are central; Polymesh for regulated assets that benefit from protocol-level identity, compliance, settlement and corporate-action primitives; and Provenance for public financial-services applications using purpose-built modules for assets, attributes, permissions and lifecycle workflows. The decision should follow the required market structure and privacy model, not headline transaction throughput.",
    criteria: ["network participation model", "privacy and data distribution", "identity and permissioning", "asset and compliance primitives", "settlement and interoperability", "developer environment", "governance and upgrades", "ecosystem, operations and exit"],
    rows: [
      ["Primary orientation", "Privacy-preserving institutional applications and synchronized finance", "Public permissioned network purpose-built for regulated assets", "Public proof-of-stake network purpose-built for financial services"],
      ["Privacy model", "Need-to-know distribution and sub-transaction privacy", "Verified identities with asset-level compliance and developing confidential-asset capabilities", "Protocol modules plus permissioned data and encrypted offchain object storage patterns"],
      ["Asset model", "Application contracts composed across independently operated applications", "Native protocol-level fungible and non-fungible assets", "Financial asset modules, metadata, attributes and smart contracts"],
      ["Best fit", "Institutions connecting confidential markets, collateral and settlement workflows", "Security-token issuance and transfer rules anchored at network level", "Lending, servicing, funds and financial products using a public financial-services chain"],
      ["Core diligence question", "Can every participant disclose only what policy and regulation require?", "Can identity and compliance rules represent every transfer and exception case?", "Which data is public, permissioned or offchain, and who operates each dependency?"],
      ["Do not assume", "Privacy removes integration, governance or regulatory work", "Purpose-built primitives replace legal, custody or transfer-agent services", "Existing asset activity guarantees fit for a new product or jurisdiction"]
    ],
    profiles: [
      ["Canton Network", "Canton documents a public layer-1 network designed for privacy-preserving transactions. Applications and validators distribute data on a need-to-know basis and can coordinate atomic multi-party workflows through the Global Synchronizer.", "Capital-markets, collateral, payments and trade-finance systems where counterparties require confidentiality but still need cross-application synchronization.", "Daml and Canton architecture differ from EVM systems. Validate validator operations, party identity, disclosure rules, application governance, synchronizer dependencies, wallet and custody support, interoperability, observability and disaster recovery."],
      ["Polymesh", "Polymesh is a public permissioned blockchain built for regulated assets, with verified onchain identity and protocol-level features for assets, compliance, settlement, portfolios, custody management and corporate actions.", "Issuers and market participants that want security-token rules and identity-aware transfer controls embedded into the base network.", "Confirm onboarding and CDD roles, jurisdictional rule mapping, confidential-asset maturity, key recovery, settlement assets, custody integration, POLYX economics, governance, node operations and portability of assets and records."],
      ["Provenance Blockchain", "Provenance is a public proof-of-stake blockchain designed for financial services. Its documentation describes modules for markers, sanctions, names, attributes, metadata and financial-asset workflows, plus smart contracts and permissioned data patterns.", "Financial institutions and fintechs building lending, servicing, funds, payments or marketplace applications that benefit from purpose-built public-chain modules.", "Map public and private data, account attributes, contract execution, validator dependencies, HASH economics, module governance, chain upgrades, integration with legacy records and the legal role of each application operator."]
    ],
    scenarios: [
      ["Confidential repo or collateral mobility", "Canton", "Selective disclosure and atomic coordination across institutional applications are core requirements."],
      ["Regulated security with network-enforced transfer rules", "Polymesh", "Identity and compliance primitives sit directly in the asset and settlement model."],
      ["Loan origination and servicing ecosystem", "Provenance", "Purpose-built financial modules and an existing lending-oriented ecosystem may be relevant."],
      ["Public DeFi distribution", "Test connectivity before choosing", "Institutional controls can reduce composability with public EVM liquidity and wallets."],
      ["Multi-chain issuance strategy", "Use a chain abstraction and record-authority plan", "No network choice removes the need to reconcile ownership, compliance and corporate actions across ledgers."]
    ],
    insights: [
      ["Privacy architectures are not interchangeable", "Compare exactly who receives transaction data, who can decrypt it, what validators observe, how regulators or auditors gain access and what metadata remains public. 'Private' can describe very different guarantees."],
      ["Native compliance still needs policy owners", "A protocol can enforce a rule only after an authorized party defines identity attributes, eligibility, exemptions and emergency actions. Legal interpretation, data quality and exception governance remain offchain responsibilities."],
      ["Ecosystem fit beats abstract chain performance", "Inventory custody, wallets, stablecoins, transfer agents, administrators, analytics, developer talent and counterparties. The fastest chain is a poor choice if the required institutions and controls cannot operate on it."]
    ],
    sources: [
      ["Canton Network overview", "https://docs.canton.network/overview/understand/what-is-canton"],
      ["Canton Network", "https://www.canton.network/"],
      ["Polymesh developer overview", "https://developers.polymesh.network/"],
      ["Polymesh key pillars", "https://polymesh.network/key-pillars-overview"],
      ["Provenance Blockchain", "https://provenance.io/"],
      ["Provenance financial-services architecture", "https://developer.provenance.io/docs/learn/purpose-built/"]
    ]
  }
];

function escFront(value) {
  return String(value).replaceAll('"', "'");
}

function article(g) {
  const faqs = [
    ["Which provider is best?", g.answer],
    ["Can these providers be used together?", "Sometimes. They may serve different layers, but buyers should define one authoritative system, one policy owner and one incident owner for every overlapping function."],
    ["What should be tested before signing?", "Test the hardest production workflow, prohibited actions, dependency failure, recovery, reporting and data export using realistic scale and permissions."],
    ["Is a product demo enough?", "No. A production decision also requires security, legal, operational, financial and contractual evidence."],
    ["How current is this comparison?", "It was reviewed on September 12, 2026 using linked primary vendor materials. Verify current availability and contractual scope directly with each provider."]
  ];
  const front = `---\ntitle: "${escFront(g.title)}"\ndescription: "${escFront(g.description)}"\ndate: "2026-09-12"\nreviewedDate: "2026-09-12"\nreviewedLabel: "September 12, 2026"\ncategory: "${escFront(g.category)}"\nslug: "${g.slug}"\nimage: "/assets/blog-images/${g.slug}.svg"\nimageAlt: "${escFront(g.title)} editorial comparison visual"\nanswer: "${escFront(g.answer)}"\nctaTitle: "Turn this comparison into a qualified shortlist"\nctaText: "Share your project requirements and FluidRWA can help identify providers that fit your operating model, controls and market."\nctaLabel: "Explore Vendor Ecosystem"\nctaUrl: "/web3vendorecosystem"\nctaSecondaryLabel: "Submit Requirements"\nctaSecondaryUrl: "/submit-requirement"\n${faqs.map((f, i) => `faq${i + 1}q: "${escFront(f[0])}"\nfaq${i + 1}a: "${escFront(f[1])}"`).join("\n")}\nsocialImage: "/assets/social/blog-${g.slug}.png"\nsocialTitle: "${g.vendors.join(" vs ")}"\n---\n`;

  return `${front}
## The short answer

${g.answer}

This is not a ranking. It is a buyer-fit comparison based on public product information. Capabilities, legal entities, integrations, coverage and commercial terms can change. Use the analysis to frame a shortlist, then verify every material requirement in a current proposal and contract.

## Side-by-side comparison

| Decision factor | ${g.vendors.join(" | ")} |
|---|---|---|---|
${g.rows.map((row) => `| ${row.join(" | ")} |`).join("\n")}

The most important cells should become written acceptance criteria. “Supported” may mean generally available, limited to selected configurations, delivered by a partner or dependent on a separate agreement.

## What to compare

${g.criteria.map((criterion, index) => `${index + 1}. **${criterion[0].toUpperCase()}${criterion.slice(1)}.** Ask for evidence that maps to the planned production workflow rather than a general capability statement.`).join("\n")}

## Vendor-by-vendor fit

${g.profiles.map(([name, what, fit, limit]) => `### ${name}\n\n${what}\n\n**Good fit:** ${fit}\n\n**What to verify:** ${limit}`).join("\n\n")}

## The deeper buyer questions

${g.insights.map(([heading, body]) => `### ${heading}\n\n${body}`).join("\n\n")}

## Best fit by scenario

| Buyer scenario | Likely starting point | Why |
|---|---|---|
${g.scenarios.map((row) => `| ${row.join(" | ")} |`).join("\n")}

These are hypotheses for building a shortlist, not universal recommendations. A bank, startup, asset manager and regulated market operator can reach different conclusions because their legal entities, users, controls and internal capabilities differ.

## Proof-of-concept checklist

1. Use a production-like workflow, not the vendor's easiest demo.
2. Include realistic users, permissions, data, volume and failure conditions.
3. Test at least one prohibited action and confirm it is blocked and logged.
4. Reconcile identifiers, timestamps, records and financial outputs across every system boundary.
5. Test dependency failure, retry behavior, recovery and manual fallback.
6. Export the records and configuration needed for audit and migration.
7. Record gaps as generally available, configurable, partner-delivered or roadmap-only.

## Commercial and contract questions

Request full pricing for implementation, platform access, usage, premium integrations, support, data, overages and exit assistance. Add internal engineering, security, legal, compliance, reconciliation and vendor-management cost. The lowest subscription can create the highest total cost when operations remain manual.

The contract should identify the precise service and legal entity, service levels, data rights, incident notification, audit support, subcontractors, liability, change control and termination assistance. Product pages are not contractual commitments.

## Final recommendation

${g.answer}

Score the providers against the exact workflow and give full credit only where the capability is documented, demonstrated and included in the proposed contract. Treat partner dependencies and roadmap promises separately. The strongest recommendation is the one that remains workable during failure, audit and eventual migration.

## Primary sources reviewed

${g.sources.map(([label, url]) => `- [${label}](${url})`).join("\n")}
`;
}

fs.mkdirSync(out, { recursive: true });
for (const guide of guides) {
  fs.writeFileSync(path.join(out, `${guide.slug}.md`), article(guide));
}

console.log(`Created ${guides.length} vendor comparison articles for September 12, 2026.`);
