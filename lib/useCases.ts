import { useCaseGuides } from "./useCaseGuides";

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
  caseStudy?: {
    company: string;
    status: string;
    verifiedThrough: string;
    background: string[];
    operatingModel: { title: string; detail: string }[];
    milestones: { date: string; title: string; detail: string }[];
    outcomes: { value: string; label: string; context: string }[];
    updates: string[];
    successFactors: string[];
    limitations: string[];
    sourceRecords: string[];
  };
};

const baseUseCases: UseCase[] = [
  {
    slug: "blackrock-buidl-tokenized-treasury-fund-case-study",
    title: "BlackRock BUIDL Tokenized Treasury Fund",
    industry: "Verified Institutional Case Study",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Institutional asset-management team reviewing treasury and fund operations",
    visualLabel: "Live Fund",
    visualKicker: "BlackRock BUIDL",
    summary: "How BlackRock combined a traditional short-term treasury portfolio with public-blockchain fund shares, regulated servicing and institutional collateral utility.",
    seoDescription: "Research BlackRock BUIDL as a verified tokenized-fund use case, including its structure, operating model, adoption, collateral integrations, risks and updates.",
    problem: "Institutional investors want onchain access to familiar yield-bearing assets, but a fund still needs eligibility controls, transfer agency, custody choices, income distribution, authoritative ownership records and redemption operations.",
    stack: ["Private institutional fund structure", "Public-blockchain share representation", "Regulated placement and transfer agency", "Qualified-investor onboarding", "Custody and wallet allowlisting", "Collateral and redemption integrations"],
    vendorCategories: [
      { label: "Tokenization Platforms", href: "/vendors/tokenization-platforms" },
      { label: "Crypto Custody Providers", href: "/vendors/crypto-custody-providers" },
      { label: "Fund Administration and Transfer Agents", href: "/vendors/fund-administration-transfer-agents" }
    ],
    example: "A live institutional product launched in March 2024 and subsequently expanded across networks and into collateral workflows. It is a fund security, not a stablecoin, and access remains controlled.",
    caseStudy: {
      company: "BlackRock",
      status: "Live institutional fund with expanding utility",
      verifiedThrough: "September 25, 2026",
      background: [
        "BlackRock launched the USD Institutional Digital Liquidity Fund, known as BUIDL, in March 2024. The original share class was issued on Ethereum through Securitize's regulated distribution and transfer-agent infrastructure.",
        "The fund seeks to maintain a value of one U.S. dollar per token and invests its assets in cash, U.S. Treasury bills and repurchase agreements. Income accrues daily and is distributed monthly as additional tokens.",
        "The token is the digital representation of a private fund share. Investor eligibility, wallet approval, transfer restrictions, custody and redemption procedures remain part of the operating model."
      ],
      operatingModel: [
        { title: "Product and portfolio", detail: "BlackRock manages the fund and the short-term treasury portfolio. The investment product remains legally and operationally distinct from the blockchain network carrying its shares." },
        { title: "Distribution and investor record", detail: "Securitize supports placement, onboarding and transfer-agent functions. Approved wallets and investors operate within product eligibility and transfer rules." },
        { title: "Token and custody", detail: "Fund interests are represented by tokens on supported public networks. Qualified investors may use supported custody arrangements and transfer only through permitted workflows." },
        { title: "Cash and utility", detail: "Subscription, redemption and income distribution connect the token record to traditional cash and fund operations. Later integrations allow eligible institutions to use BUIDL in collateral and treasury workflows." }
      ],
      milestones: [
        { date: "March 2024", title: "Fund launch", detail: "BUIDL launched as BlackRock's first tokenized fund, initially on Ethereum, with Securitize providing the tokenization and regulated servicing infrastructure." },
        { date: "January 2025", title: "Material early scale", detail: "Securitize reported approximately $642.2 million in BUIDL assets under management as of January 27, 2025." },
        { date: "April 2026", title: "Institutional collateral framework", detail: "BlackRock, OKX and Standard Chartered announced a framework allowing eligible clients to use BUIDL as yield-bearing collateral while assets remained in regulated off-exchange custody." },
        { date: "July-August 2026", title: "Broader network and collateral utility", detail: "Securitize reported additional network availability and described BUIDL's extension into institutional trading and collateral-management workflows." }
      ],
      outcomes: [
        { value: "$642.2M", label: "AUM reported in January 2025", context: "A dated Securitize figure, included for evidence of early product adoption rather than as a current balance." },
        { value: "24/7/365", label: "Permitted transfers", context: "Transfers are available between pre-approved participants and remain subject to the fund's operating requirements." },
        { value: "1", label: "Integrated product record", context: "The structure connects the token, approved investor record and fund servicing process rather than treating a wallet balance as a standalone claim." }
      ],
      updates: [
        "BlackRock's 2026 chairman's letter described its tokenized treasury fund as the largest tokenized fund in the world.",
        "In May 2026, Moody's assigned BUIDL an Aaa-mf money-market-fund assessment, according to Securitize's July 2026 disclosure; the assessment is an opinion and not a guarantee.",
        "By mid-2026, product development had shifted from proving issuance toward adding practical treasury, network and collateral utility."
      ],
      successFactors: [
        "A recognizable underlying asset strategy rather than a token-first proposition.",
        "Regulated investor onboarding, placement and transfer-agent responsibilities.",
        "Multiple custody and network integrations without removing product restrictions.",
        "Utility beyond holding, including controlled transfers, redemptions and collateral use."
      ],
      limitations: [
        "BUIDL is available only to eligible investors and is not a retail cash substitute.",
        "A blockchain token does not remove manager, custodian, administrator, transfer-agent or counterparty dependencies.",
        "Reported AUM and integrations can change; dated figures should not be read as current balances or investment recommendations."
      ],
      sourceRecords: [
        "BlackRock USD Institutional Digital Liquidity Fund — SEC Form D, filed March 18, 2024.",
        "Securitize — BlackRock-led strategic funding and BUIDL operating description, May 1, 2024.",
        "Securitize — Wormhole deployment and BUIDL AUM disclosure, January 28, 2025.",
        "BlackRock — 2026 Chairman's Letter.",
        "Securitize — OKX, BlackRock and Standard Chartered collateral framework, April 28, 2026.",
        "Securitize — Second Quarter 2026 Results, August 12, 2026."
      ]
    }
  },
  {
    slug: "jpmorgan-kinexys-intraday-repo-collateral-case-study",
    title: "J.P. Morgan Kinexys Intraday Repo and Collateral",
    industry: "Verified Institutional Case Study",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Institutional banking district representing repo and collateral markets",
    visualLabel: "Live Financing",
    visualKicker: "Kinexys",
    summary: "How J.P. Morgan uses programmed cash and tokenized collateral entitlements to support intraday repo, delivery-versus-payment and collateral mobility.",
    seoDescription: "Research J.P. Morgan Kinexys as a verified intraday repo and tokenized-collateral use case, including workflow, results, controls and 2026 updates.",
    problem: "Traditional intraday financing and collateral movement can involve sequential settlement, operating cutoffs, duplicated records and idle liquidity while participants wait for cash and collateral legs to complete.",
    stack: ["Permissioned blockchain platform", "Blockchain deposit accounts", "Tokenized collateral entitlements", "Smart-contract trade lifecycle", "Delivery-versus-payment settlement", "Custody and operational reconciliation"],
    vendorCategories: [
      { label: "Tokenization Platforms", href: "/vendors/tokenization-platforms" },
      { label: "Crypto Custody Providers", href: "/vendors/crypto-custody-providers" },
      { label: "Broker-Dealers and Market Infrastructure", href: "/vendors/broker-dealers" }
    ],
    example: "A live bank-led financing workflow supported by Kinexys Digital Assets. Related 2026 interoperability work is identified separately as a trial rather than presented as production volume.",
    caseStudy: {
      company: "JPMorgan Chase",
      status: "Live institutional financing network",
      verifiedThrough: "September 25, 2026",
      background: [
        "J.P. Morgan introduced its blockchain-based intraday repo application in 2020. The service brings cash and collateral entitlements into a shared programmed workflow so the parties can settle and mature repo trades within the day.",
        "The business now sits within Kinexys Digital Assets and Digital Financing. It targets institutional liquidity and collateral operations rather than public, anonymous lending.",
        "J.P. Morgan also developed the Tokenized Collateral Network to move ownership rights or security interests in traditional assets for collateral obligations."
      ],
      operatingModel: [
        { title: "Pre-trade preparation", detail: "The borrower segregates eligible collateral and the lender funds a blockchain deposit account. The application verifies collateral before the trade is proposed." },
        { title: "Trade agreement", detail: "The parties negotiate and cryptographically approve terms, including settlement time, maturity and interest treatment." },
        { title: "Atomic-style settlement", detail: "Cash and the collateral entitlement transfer near-simultaneously through delivery versus payment, with a shared record of transaction status." },
        { title: "Maturity and release", detail: "Cash plus interest is coordinated at maturity and the collateral entitlement returns to the borrower, with the workflow feeding existing records and reporting." }
      ],
      milestones: [
        { date: "November 2020", title: "Intraday repo launch", detail: "The first Kinexys Digital Assets application began supporting intraday repo transactions using tokenized cash and collateral." },
        { date: "October 2023", title: "Tokenized Collateral Network launch", detail: "A live transaction used tokenized money-market-fund shares as collateral for an over-the-counter derivatives obligation." },
        { date: "2024-2025", title: "Scaled network activity", detail: "J.P. Morgan reported growing transaction volumes across Kinexys. Network-wide statistics cover multiple Kinexys products and should not be read as repo-only volume." },
        { date: "May 2026", title: "Project Acacia interoperability trial", detail: "J.P. Morgan, Commonwealth Bank of Australia, ASX and HQLA⁽ˣ⁾ completed a controlled repo settlement trial using tokenized securities and two forms of digital money." }
      ],
      outcomes: [
        { value: "56%", label: "Provider-reported borrowing-rate decrease", context: "J.P. Morgan reported this result for one anonymized global financial institution compared with its traditional intraday credit funding solution." },
        { value: "Minutes", label: "Repo settlement window", context: "Digital Financing is designed to settle repo transactions in minutes with near-simultaneous cash and collateral movement." },
        { value: "$4T+", label: "Kinexys transaction volume by May 2026", context: "This is a Kinexys-wide company-reported figure, not a Digital Financing-only or repo-only result." }
      ],
      updates: [
        "J.P. Morgan's May 2026 Project Acacia announcement said Kinexys had processed more than $4 trillion since inception and averaged $7 billion daily across the broader network.",
        "Project Acacia demonstrated interoperability among Kinexys, CBA's Gravital platform, HQLA⁽ˣ⁾ and ASX in a controlled environment; it should not be described as a generally available Australian repo market.",
        "The latest product direction expands from intraday repo toward broader tokenized collateral, fund and cross-network settlement services."
      ],
      successFactors: [
        "A high-value institutional problem with measurable funding and settlement costs.",
        "Known counterparties and legally established repo and collateral relationships.",
        "Cash and collateral represented in one coordinated transaction lifecycle.",
        "Integration with custody and existing operational systems rather than a standalone ledger demo."
      ],
      limitations: [
        "Most publicly reported efficiency results come from J.P. Morgan's own product materials and should be independently tested by buyers.",
        "Kinexys-wide transaction volume includes multiple products and cannot be attributed entirely to repo or tokenized collateral.",
        "Permissioned network results do not automatically transfer to public-chain or anonymous-counterparty designs."
      ],
      sourceRecords: [
        "J.P. Morgan — Digital Financing product and case-study materials.",
        "J.P. Morgan — Blockchain asset tokenization with Kinexys and Tokenized Collateral Network overview.",
        "J.P. Morgan — The Evolution of Digital Assets, Securities Services.",
        "J.P. Morgan — Project Acacia trial announcement, May 18, 2026.",
        "J.P. Morgan — Kinexys platform statistics and product descriptions, reviewed September 2026."
      ]
    }
  },
  {
    slug: "siemens-digital-bond-central-bank-money-case-study",
    title: "Siemens Digital Bond and Central-Bank-Money Settlement",
    industry: "Verified Corporate Case Study",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Corporate treasury team reviewing a digital bond transaction",
    visualLabel: "Settled in Minutes",
    visualKicker: "Siemens Bond",
    summary: "How Siemens progressed from a €60 million public-blockchain bond to a €300 million issuance settled automatically in central bank money within minutes.",
    seoDescription: "Research Siemens' verified digital-bond use case, from its 2023 public-blockchain issuance to automated central-bank-money settlement in 2024.",
    problem: "Digital securities can shorten issuance and settlement workflows, but only if the legal register, investor access, security leg and payment leg remain synchronized with clear finality.",
    stack: ["German electronic-securities framework", "Digital bond register", "Permissioned DLT settlement network", "Central-bank-money trigger solution", "Institutional investor and banking roles", "Treasury reconciliation"],
    vendorCategories: [
      { label: "Tokenization Platforms", href: "/vendors/tokenization-platforms" },
      { label: "Legal and Regulatory Vendors", href: "/vendors/legal-regulatory-vendors" },
      { label: "Blockchain Development Companies", href: "/vendors/blockchain-development-companies" }
    ],
    example: "Two completed Siemens bond issuances under Germany's Electronic Securities Act, showing a progression from digital issuance with conventional payment to automated DLT settlement in central bank money.",
    caseStudy: {
      company: "Siemens AG",
      status: "Two completed digital bond issuances",
      verifiedThrough: "September 25, 2026",
      background: [
        "Germany's Electronic Securities Act created a legal route for issuing securities without a paper global certificate. Siemens used this framework for its first blockchain-based digital bond in February 2023.",
        "The first bond had a €60 million volume and one-year maturity. It used a public blockchain and was sold directly to investors, while the payment leg still moved through conventional bank accounts.",
        "In September 2024, Siemens issued a second one-year digital bond of €300 million. This transaction used SWIAT's permissioned blockchain and the Bundesbank Trigger Solution to settle in central bank money."
      ],
      operatingModel: [
        { title: "Legal issuance", detail: "The instrument was issued under the German electronic-securities framework, preserving a legally recognized registry and defined issuer obligations." },
        { title: "Digital register", detail: "DekaBank acted as bond registrar for the 2024 issuance while the security was recorded through the SWIAT network." },
        { title: "Institutional distribution", detail: "BayernLB, DekaBank, DZ BANK, Helaba and LBBW invested in the €300 million bond." },
        { title: "Payment settlement", detail: "Deutsche Bank coordinated the central-bank-money leg using the Bundesbank Trigger Solution, synchronizing payment with the digital security transaction." }
      ],
      milestones: [
        { date: "February 2023", title: "First digital bond", detail: "Siemens completed a €60 million, one-year bond on a public blockchain. Conventional bank payment contributed to a two-day completion period." },
        { date: "September 2024", title: "Second, larger issuance", detail: "Siemens completed a €300 million, one-year bond using a permissioned blockchain and central-bank-money settlement." },
        { date: "September 2024", title: "Automated settlement", detail: "Siemens reported that the second transaction was processed automatically within minutes and that settlement risk was almost fully eliminated for the participating parties." },
        { date: "June 2025", title: "Eurosystem assessment", detail: "The ECB cited the Siemens issuance among the high-profile transactions completed during its exploratory work on DLT settlement in wholesale central bank money." }
      ],
      outcomes: [
        { value: "€300M", label: "Second digital-bond volume", context: "Five times the size of Siemens' first €60 million blockchain bond." },
        { value: "Minutes", label: "Reported 2024 settlement time", context: "Compared with two days for the 2023 transaction, according to Siemens." },
        { value: "CeBM", label: "Central-bank-money settlement", context: "The Bundesbank Trigger Solution connected the payment leg to the DLT-based security transaction." }
      ],
      updates: [
        "The ECB's 2025 review treated the Siemens transaction as evidence of demand for central-bank-money settlement of DLT-based securities.",
        "The 2024 bond matured after one year; the reviewed public materials establish successful issuance and settlement but do not provide a public, transaction-level operating-cost comparison.",
        "No later Siemens digital-bond issuance was identified in the Siemens and ECB records reviewed through September 25, 2026."
      ],
      successFactors: [
        "A clear legal route under Germany's Electronic Securities Act.",
        "A bounded institutional transaction with named registrar, investors and settlement bank.",
        "Integration of the cash leg rather than measuring only the token transfer.",
        "A second issuance that applied lessons from the first and materially increased scale."
      ],
      limitations: [
        "The transaction involved a controlled participant set and does not prove secondary-market liquidity or universal interoperability.",
        "Siemens' statement that settlement risk was almost fully eliminated is an issuer assessment, not an independent quantified risk study.",
        "Minutes-level settlement depended on participating infrastructure and central-bank connectivity that may not be available to every issuer."
      ],
      sourceRecords: [
        "Siemens — First digital bond on blockchain, February 14, 2023.",
        "Siemens — Another digital bond successfully issued on blockchain, September 4, 2024.",
        "European Central Bank — Exploratory work on new technologies for wholesale central bank money settlement, June 2025.",
        "European Central Bank — Annex II, comprehensive overview of trials and experiments, June 2025."
      ]
    }
  },
  {
    slug: "visa-usdc-stablecoin-settlement-case-study",
    title: "Visa USDC Settlement for Issuers and Acquirers",
    industry: "Verified Institutional Case Study",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Payment operations team reviewing an institutional settlement workflow",
    visualLabel: "Live Settlement",
    visualKicker: "Visa USDC",
    summary: "How Visa introduced USDC as a settlement option for issuer and acquirer obligations while preserving the consumer card experience and existing network controls.",
    seoDescription: "Research Visa USDC settlement as a verified institutional use case, including the operating model, bank participants, treasury benefits, controls, results and updates.",
    problem: "Card issuers and acquirers operate across banking cutoffs, weekends and prefunding requirements. A stablecoin settlement option can extend availability, but it still needs approved participants, reserve and liquidity management, blockchain operations, reconciliation and network-level controls.",
    stack: ["VisaNet settlement obligations", "USDC settlement asset", "Supported blockchain network", "Issuer and acquirer treasury operations", "Banking and stablecoin liquidity", "Reconciliation and compliance controls"],
    vendorCategories: [
      { label: "Stablecoin Infrastructure Providers", href: "/vendors/stablecoin-infrastructure-providers" },
      { label: "Fiat On and Off Ramp Providers", href: "/vendors/fiat-on-off-ramp-providers" },
      { label: "Compliance Infrastructure Providers", href: "/vendors/compliance-infrastructure-providers" }
    ],
    example: "Visa began experimenting with USDC settlement in 2021, expanded the capability internationally and launched U.S. settlement with initial banking participants in December 2025. The change affects the institutional settlement leg, not what cardholders or merchants see at checkout.",
    caseStudy: {
      company: "Visa",
      status: "Live stablecoin settlement with expanding institutional access",
      verifiedThrough: "September 26, 2026",
      background: [
        "Visa's card network normally settles obligations between participating financial institutions through conventional banking rails. That model is reliable, but settlement calendars and banking hours can constrain liquidity timing for digital-asset businesses operating continuously.",
        "Visa first experimented with USDC settlement in 2021 and later enabled selected partners to fulfil settlement obligations using the fully reserved dollar stablecoin on supported blockchain networks.",
        "In December 2025, Visa announced U.S. USDC settlement with Cross River Bank and Lead Bank as initial participants. Consumers continued paying with cards and merchants continued receiving ordinary card-network settlement; the change was in the institutional treasury layer."
      ],
      operatingModel: [
        { title: "Calculate the network obligation", detail: "VisaNet continues to calculate what an issuer or acquirer owes through the network's existing transaction and settlement processes." },
        { title: "Fund approved USDC liquidity", detail: "The participating institution maintains or sources sufficient USDC and manages bank, stablecoin and blockchain liquidity for the applicable settlement window." },
        { title: "Transfer on a supported network", detail: "USDC is transferred over an approved blockchain to satisfy the institutional settlement obligation. The blockchain transfer does not replace Visa's participant approval, compliance or reconciliation requirements." },
        { title: "Reconcile treasury and network records", detail: "The participant reconciles the onchain transfer, Visa settlement data, stablecoin balances and internal treasury ledger, including failed or delayed transfers." }
      ],
      milestones: [
        { date: "2021", title: "Initial USDC settlement experiment", detail: "Visa began testing how a card-network participant could settle obligations in USDC rather than relying solely on fiat settlement rails." },
        { date: "2023-2025", title: "International expansion", detail: "Visa expanded stablecoin settlement pilots across multiple regions and added support for additional approved networks and stablecoins." },
        { date: "December 2025", title: "U.S. launch", detail: "Cross River Bank and Lead Bank began settling selected Visa obligations in USDC over Solana, with broader availability planned through 2026." },
        { date: "September 2026", title: "Higher reported scale", detail: "Visa reported that stablecoin settlement volume had surpassed a $20 billion annualized run rate, showing continued movement from pilot activity toward repeat institutional operations." }
      ],
      outcomes: [
        { value: "7 days", label: "Settlement availability", context: "Visa describes USDC settlement as supporting weekend and holiday activity beyond the conventional five-business-day window." },
        { value: "$3.5B+", label: "Annualized run rate reported in November 2025", context: "A dated Visa metric from before the U.S. launch; later Visa materials reported further growth." },
        { value: "2 banks", label: "Initial U.S. participants named", context: "Cross River Bank and Lead Bank were identified as the first U.S. banking participants in the December 2025 announcement." }
      ],
      updates: [
        "Visa planned broader U.S. availability through 2026 while continuing active stablecoin settlement programs in other regions.",
        "By September 2026, Visa stated that stablecoin settlement volume had passed a $20 billion annualized run rate.",
        "The operating model remains a choice within established card-network settlement, not a replacement for card acceptance, issuer controls or merchant acquiring."
      ],
      successFactors: [
        "The stablecoin is applied to a defined institutional settlement obligation rather than offered as a general-purpose token experiment.",
        "The consumer and merchant experience remains unchanged while treasury operations gain an additional settlement rail.",
        "Participation is limited to approved institutions, networks and settlement configurations.",
        "The workflow connects onchain transfers to existing Visa settlement data and operational accountability."
      ],
      limitations: [
        "Reported volume is network-level and does not disclose every participant, corridor or unit-economics assumption.",
        "Seven-day capability does not remove stablecoin liquidity, banking, blockchain, operational or regulatory dependencies.",
        "Availability depends on Visa approval, jurisdiction, supported networks and the participant's treasury readiness."
      ],
      sourceRecords: [
        "Visa — U.S. USDC settlement launch and initial bank participants, December 16, 2025.",
        "Visa — Annual Report chairman and CEO message describing stablecoin settlement activity and network strategy.",
        "Visa — Credit Coop: financing infrastructure for stablecoin-linked card issuers, updated September 8, 2026."
      ]
    }
  },
  {
    slug: "dtcc-tokenized-collateral-appchain-case-study",
    title: "DTCC Tokenized Collateral and Collateral AppChain",
    industry: "Verified Institutional Case Study",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Market infrastructure team monitoring collateral data and settlement controls",
    visualLabel: "Collateral Infrastructure",
    visualKicker: "DTCC AppChain",
    summary: "How DTCC used a live industry experiment to test multi-asset tokenized collateral, automated rules and cross-network mobility before moving toward production infrastructure.",
    seoDescription: "Research DTCC's Great Collateral Experiment and Collateral AppChain, including the operating model, results, production path, controls and limitations.",
    problem: "Collateral is fragmented across custodians, venues, jurisdictions and settlement systems. Institutions may know that sufficient assets exist but still be unable to mobilize them quickly enough to meet an obligation without manual instructions, buffers and intraday funding.",
    stack: ["Tokenized collateral representations", "Collateral AppChain", "Eligibility and policy rules", "Cross-network interoperability", "Custody and authoritative records", "Settlement and audit evidence"],
    vendorCategories: [
      { label: "Tokenization Platforms", href: "/vendors/tokenization-platforms" },
      { label: "Crypto Custody Providers", href: "/vendors/crypto-custody-providers" },
      { label: "Oracles and Proof of Reserve", href: "/vendors/oracles-data-proof-of-reserve" }
    ],
    example: "DTCC announced its digital collateral platform in April 2025, publicly demonstrated multi-asset workflows in the Great Collateral Experiment and described the Collateral AppChain in 2026 as the production infrastructure intended to carry those lessons forward.",
    caseStudy: {
      company: "DTCC",
      status: "Publicly demonstrated workflow moving toward production infrastructure",
      verifiedThrough: "September 26, 2026",
      background: [
        "Collateral protects financial markets, but eligible assets often remain locked inside separate books, custodians and market infrastructures. Moving them can take hours and require duplicated records and operational coordination.",
        "DTCC announced a digital collateral management platform in April 2025 and convened institutions for the Great Collateral Experiment. The demonstration tested whether tokenized securities, stablecoins, tokenized money-market funds, crypto assets and other instruments could operate inside a shared control framework.",
        "The experiment did not prove that every legal or operational barrier had disappeared. Its significance was the demonstration of rule-driven collateral movement and interoperability without requiring firms to abandon existing infrastructure."
      ],
      operatingModel: [
        { title: "Represent eligible assets", detail: "Assets or entitlements are represented digitally while custody, legal ownership and authoritative records remain mapped to the existing market structure." },
        { title: "Apply collateral rules", detail: "Eligibility, concentration, ownership and movement rules are evaluated before an asset can be mobilized for a particular obligation." },
        { title: "Move across a shared application layer", detail: "The Collateral AppChain is designed as a multi-asset deployment layer that can coordinate activity across different networks instead of requiring one universal blockchain." },
        { title: "Reconcile and preserve controls", detail: "Participants need consistent transaction state, audit evidence and reconciliation between the digital collateral record, custody system and existing books." }
      ],
      milestones: [
        { date: "April 2, 2025", title: "Platform announced", detail: "DTCC announced a digital collateral management platform and an industry demonstration focused on tokenized real-time collateral." },
        { date: "April 23, 2025", title: "Great Collateral Experiment", detail: "The live demonstration moved assets onchain, enforced rules automatically and tested interoperability across asset and participant types." },
        { date: "April 2026", title: "One-year results published", detail: "DTCC reported that demonstrated settlement compressed from hours into seconds and that the experiment changed the market discussion around practical collateral mobility." },
        { date: "May-June 2026", title: "Production path articulated", detail: "DTCC described the Collateral AppChain as production-oriented infrastructure for multi-asset and multichain collateral workflows and published the business case for continued development." }
      ],
      outcomes: [
        { value: "Seconds", label: "Demonstrated settlement time", context: "DTCC contrasted the experiment's rule-driven onchain settlement with processes that can otherwise take hours." },
        { value: "Multi-asset", label: "Collateral scope", context: "The model covered tokenized securities, stablecoins, tokenized money-market funds, crypto assets and other tokenized instruments." },
        { value: "Multichain", label: "Architecture objective", context: "The production design assumes several networks and treats interoperability as a core requirement rather than a later feature." }
      ],
      updates: [
        "DTCC described the Collateral AppChain as the route from experiment to production infrastructure in May 2026.",
        "The design emphasizes integration with existing market structures rather than requiring institutions to replace all custody and settlement systems.",
        "Production adoption still depends on legal treatment, participant onboarding, interoperability standards and regulator engagement."
      ],
      successFactors: [
        "The experiment included several asset types and market roles instead of testing a single isolated token.",
        "Rules and controls were demonstrated alongside asset movement.",
        "The architecture accepts a multichain future and attempts to reduce collateral silos through an application layer.",
        "DTCC connected experimentation to a stated production-infrastructure roadmap."
      ],
      limitations: [
        "A successful industry demonstration is not the same as market-wide production adoption or guaranteed capital savings.",
        "Tokenized collateral still depends on authoritative ownership, valuation, custody, enforceability and default procedures.",
        "Published materials do not provide every participant's implementation cost, legal conclusion or realized balance-sheet benefit."
      ],
      sourceRecords: [
        "DTCC — New platform for tokenized real-time collateral management, April 2, 2025.",
        "DTCC — One Year Later: How the Great Collateral Experiment Changed the Conversation, April 29, 2026.",
        "DTCC — The Collateral AppChain: From Experiment to Production Infrastructure, May 15, 2026.",
        "DTCC — Building the Business Case for Tokenized Collateral, June 8, 2026."
      ]
    }
  },
  {
    slug: "euroclear-digital-securities-eurosystem-collateral-case-study",
    title: "Euroclear Digital Securities and Eurosystem Collateral",
    industry: "Verified Institutional Case Study",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Capital-markets team reviewing a digital securities issuance and settlement process",
    visualLabel: "Digital Market Infrastructure",
    visualKicker: "Euroclear D-FMI",
    summary: "How Euroclear connects DLT-native issuance to regulated market infrastructure, conventional secondary-market access and the Eurosystem's 2026 collateral framework.",
    seoDescription: "Research Euroclear D-FMI and DLT securities as Eurosystem collateral, including issuance, settlement, eligibility, operating controls and limitations.",
    problem: "A digitally issued bond needs more than a token contract. Issuers and investors need legally recognized issuance, distribution, settlement, safekeeping, secondary-market access and, where relevant, eligibility within existing collateral frameworks.",
    stack: ["Euroclear D-FMI and Digital Securities Issuance", "Digital Native Notes", "CSDR-compliant settlement", "Euroclear Bank secondary-market connection", "TARGET2-Securities compatibility", "Eurosystem collateral eligibility rules"],
    vendorCategories: [
      { label: "Tokenization Platforms", href: "/vendors/tokenization-platforms" },
      { label: "Legal and Regulatory Vendors", href: "/vendors/legal-regulatory-vendors" },
      { label: "Fund Administration and Transfer Agents", href: "/vendors/fund-administration-transfer-agents" }
    ],
    example: "Euroclear's D-FMI supports issuance and primary settlement of digital native notes on DLT while connecting secondary activity to Euroclear Bank. From March 30, 2026, qualifying DLT-issued marketable assets at eligible CSDs could enter the Eurosystem collateral framework under existing requirements.",
    caseStudy: {
      company: "Euroclear",
      status: "Live digital issuance infrastructure within an expanded collateral framework",
      verifiedThrough: "September 26, 2026",
      background: [
        "Euroclear developed its Digital Financial Market Infrastructure to support fully dematerialized international securities issued using distributed ledger technology. Its first service, Digital Securities Issuance, supports issuance, distribution and primary settlement of Digital Native Notes.",
        "The model does not isolate the digital bond from the existing market. D-FMI connects to Euroclear Bank's traditional settlement platform so secondary-market investors can retain access to established trading and liquidity-management facilities.",
        "The ECB announced that, from March 30, 2026, marketable assets issued through DLT-based services at qualifying CSDs could be eligible as Eurosystem collateral if they satisfy the same eligibility and settlement requirements applied to other marketable assets."
      ],
      operatingModel: [
        { title: "Structure an eligible security", detail: "The issuer, agents and legal advisers structure a debt security that satisfies applicable securities law, documentation and investor requirements." },
        { title: "Issue and distribute on D-FMI", detail: "The Digital Securities Issuance service records the digital native note, distributes it to the investor structure and supports primary-market settlement." },
        { title: "Connect secondary operations", detail: "Euroclear links the digital issuance environment with its traditional settlement infrastructure for secondary trading and liquidity operations." },
        { title: "Mobilize qualifying collateral", detail: "Where the security satisfies Eurosystem criteria and is available through an eligible CSD settlement arrangement reachable via T2S, a counterparty can mobilize it under existing collateral-management practices." }
      ],
      milestones: [
        { date: "October 2023", title: "First Digital Native Note", detail: "Euroclear launched D-FMI with a World Bank digital bond, establishing a production issuance and settlement model for international debt securities." },
        { date: "2024-2025", title: "Additional issuer adoption", detail: "Euroclear reported further digital native note activity, including sovereign, supranational, financial-institution and emerging-market issuance structures." },
        { date: "January 27, 2026", title: "ECB eligibility decision", detail: "The ECB announced that qualifying DLT-based marketable assets issued through CSD services would enter the Eurosystem collateral framework." },
        { date: "March 30, 2026", title: "Collateral eligibility became operational", detail: "The Eurosystem began accepting qualifying DLT-issued marketable assets under the existing eligibility, settlement and collateral-management framework." }
      ],
      outcomes: [
        { value: "Same day", label: "Digital issuance workflow", context: "Euroclear states that pricing, new-security distribution and related settlement can occur on the same day within the D-FMI model." },
        { value: "€100M", label: "French-law DNN example", context: "Caisse des Dépôts issued a €100 million digital native note on D-FMI during the ECB wholesale-settlement trials." },
        { value: "March 30", label: "2026 eligibility start", context: "This is the date qualifying CSD-issued DLT assets became eligible for Eurosystem credit operations, subject to ordinary collateral criteria." }
      ],
      updates: [
        "The Eurosystem treats qualifying CSD-issued DLT assets under the existing collateral framework rather than creating automatic eligibility for every tokenized security.",
        "Assets must remain compatible with eligible securities settlement systems and reachable through TARGET2-Securities when mobilized.",
        "The ECB is separately exploring how assets issued and settled entirely on DLT networks could become eligible in later stages."
      ],
      successFactors: [
        "Digital issuance is connected to recognized CSD and secondary-market infrastructure.",
        "The service preserves legal, settlement and investor-access responsibilities instead of treating token creation as the complete product.",
        "Public-sector settlement trials and private infrastructure development progressed together.",
        "Collateral eligibility gives qualifying digital securities a practical role in institutional liquidity operations."
      ],
      limitations: [
        "Eurosystem eligibility is conditional; a DLT label does not make a security eligible by itself.",
        "The initial framework still relies on CSD-operated eligible settlement systems and T2S-compatible representation when collateral is mobilized.",
        "Issuer cost, secondary liquidity and investor demand remain security-specific and are not guaranteed by the infrastructure."
      ],
      sourceRecords: [
        "Euroclear — Digital Financial Market Infrastructure and Digital Securities Issuance service description.",
        "Euroclear — Digital assets eligible as Eurosystem collateral, April 14, 2026.",
        "European Central Bank — Acceptance of DLT-based assets as eligible Eurosystem collateral, January 27, 2026.",
        "European Central Bank — Financial Integration and Structure in the Euro Area, May 2026."
      ]
    }
  },
  {
    slug: "crypto-exchange-custody-wallet-governance-settlement",
    title: "Crypto Exchange Custody, Wallet Governance and Settlement",
    industry: "Exchanges and Digital Asset Markets",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=76",
    imageAlt: "Secure infrastructure representing exchange wallet and settlement operations",
    visualLabel: "Settlement Control",
    visualKicker: "Exchange Operations",
    summary: "Exchanges can separate customer custody, wallet policy, liquidity movement and settlement while preserving approval evidence and a reconciled asset record.",
    seoDescription: "Explore crypto exchange custody, wallet governance and settlement, including hot and cold wallets, approvals, reconciliation, liquidity and vendor requirements.",
    problem: "An exchange must keep customer entitlements aligned with wallets, omnibus accounts and trading records while moving assets quickly enough for deposits, withdrawals and settlement. Unclear ownership between custody, treasury and operations creates concentrated risk.",
    stack: ["Regulated custody or wallet infrastructure", "Hot, warm and cold wallet policy", "Transaction screening and approval", "Exchange ledger and reconciliation", "Liquidity and settlement connectivity", "Incident recovery and customer communication"],
    vendorCategories: [
      { label: "Crypto Custody Providers", href: "/vendors/crypto-custody-providers" },
      { label: "KYC and AML Providers", href: "/vendors/kyc-aml-providers" },
      { label: "Blockchain Analytics and Compliance", href: "/vendors/compliance-infrastructure-providers" },
      { label: "Node and RPC Providers", href: "/vendors/node-as-a-service-rpc-providers" }
    ],
    example: "Useful for centralized exchanges, broker platforms, OTC desks and digital asset marketplaces that operate customer wallets, treasury reserves and external settlement relationships.",
    sources: [
      { label: "NIST key-management guidance", href: "https://csrc.nist.gov/Projects/Key-Management/Key-Management-Guidelines" },
      { label: "FATF virtual assets guidance", href: "https://www.fatf-gafi.org/en/topics/virtual-assets.html" }
    ],
    faqs: [
      { q: "Should an exchange keep every asset in cold storage?", a: "Not necessarily. The wallet allocation should follow measured withdrawal demand, settlement needs and risk limits, with narrow hot-wallet exposure and controlled replenishment." },
      { q: "Does using a custodian remove exchange responsibility?", a: "No. The exchange still owns customer records, permissions, reconciliation, counterparty choices, incident procedures and applicable safeguarding obligations." },
      { q: "What is the most important control to test?", a: "Test a high-value withdrawal from request through screening, approval, signing, confirmation and ledger reconciliation, then repeat with a prohibited destination and an unavailable approver." }
    ]
  },
  {
    slug: "digital-asset-tax-reporting-cost-basis-operations",
    title: "Digital Asset Tax Reporting and Cost-Basis Operations",
    industry: "Tax, Accounting and Digital Assets",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=76",
    imageAlt: "Tax analysts reconciling digital asset transaction records",
    visualLabel: "Cost Basis",
    visualKicker: "Tax Operations",
    summary: "Institutions can normalize wallet, exchange and custody activity into reviewed tax lots, gains, income events and reportable customer records.",
    seoDescription: "Explore digital asset tax reporting and cost-basis operations, including transaction normalization, tax lots, transfers, reconciliation and vendor requirements.",
    problem: "Blockchain transactions do not arrive as tax-ready records. Transfers can appear as disposals, fees change quantities, assets move between providers and missing historical cost basis can distort gains and customer reporting.",
    stack: ["Custody and exchange data ingestion", "Transaction normalization and classification", "Wallet and account ownership mapping", "Tax-lot and cost-basis engine", "Exception review and evidence", "Forms, statements and accounting export"],
    vendorCategories: [
      { label: "Tax, Legal and Regulatory Vendors", href: "/vendors/legal-regulatory-vendors" },
      { label: "Crypto Custody Providers", href: "/vendors/crypto-custody-providers" },
      { label: "Fund Administration and Transfer Agents", href: "/vendors/fund-administration-transfer-agents" },
      { label: "Blockchain Analytics and Compliance", href: "/vendors/compliance-infrastructure-providers" }
    ],
    example: "Useful for exchanges, custodians, wealth platforms, funds and enterprises that need defensible tax lots, customer reporting, financial statements or regulator-ready transaction evidence.",
    sources: [
      { label: "IRS digital assets guidance", href: "https://www.irs.gov/businesses/small-businesses-self-employed/digital-assets" },
      { label: "OECD Crypto-Asset Reporting Framework", href: "https://www.oecd.org/tax/exchange-of-tax-information/crypto-asset-reporting-framework-and-amendments-to-the-common-reporting-standard.htm" }
    ],
    faqs: [
      { q: "Is onchain transaction history enough for tax reporting?", a: "No. Tax operations also need account ownership, acquisition cost, transfer matching, classification, fiat values, fees and jurisdiction-specific treatment." },
      { q: "What causes the most cost-basis errors?", a: "Missing acquisition history, unmatched transfers, inconsistent asset identifiers, unclassified rewards and corporate actions, and precision differences across source systems are common causes." },
      { q: "Should the vendor decide tax treatment?", a: "The vendor can calculate under configured methods, but qualified tax and legal owners should approve classifications, elections, reportability and exception policy." }
    ]
  },
  {
    slug: "cross-border-b2b-invoice-payments", title: "Cross-border B2B invoice payments", industry: "Business Payments",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=76", imageAlt: "Business finance dashboard and payment records", visualLabel: "Invoice settlement", visualKicker: "Payments",
    summary: "Connect supplier invoices, payment approvals, currency conversion and settlement evidence without losing the accounting trail.",
    problem: "Finance teams often match international payments manually because bank references, invoice IDs and received amounts do not line up.",
    example: "An illustrative pilot pays a small group of overseas suppliers in one corridor, matching each approved invoice to the amount actually received and recorded in the ledger.",
    stack: ["Invoice and ERP integration", "Beneficiary verification", "Payment routing and FX", "Settlement reconciliation"],
    vendorCategories: [{ label: "Stablecoin Infrastructure", href: "/vendors/stablecoin-infrastructure-providers" }, { label: "Fiat On and Off Ramps", href: "/vendors/fiat-on-off-ramp-providers" }, { label: "Compliance Infrastructure", href: "/vendors/compliance-infrastructure-providers" }]
  },
  {
    slug: "digital-identity-account-recovery", title: "Digital identity and account recovery", industry: "Identity and Security",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=76", imageAlt: "Identity and financial records being reviewed", visualLabel: "Recovery", visualKicker: "Identity",
    summary: "Design recovery for lost devices, compromised credentials and changed wallet access while preserving identity checks and user rights.",
    problem: "A secure onboarding flow is incomplete if support staff can bypass its controls during recovery or if legitimate users cannot regain access.",
    example: "An illustrative workflow allows an approved account holder to replace a lost authenticator through independently reviewed evidence, a waiting period and controlled credential revocation.",
    stack: ["Identity verification", "Credential status and revocation", "Recovery approval workflow", "Audit trails and access controls"],
    vendorCategories: [{ label: "Identity Solutions", href: "/vendors/identity-solution-providers" }, { label: "KYC AML Providers", href: "/vendors/kyc-aml-providers" }, { label: "Compliance Infrastructure", href: "/vendors/compliance-infrastructure-providers" }]
  },
  {
    slug: "ai-assisted-compliance-case-management", title: "AI-assisted compliance case management", industry: "Compliance Operations",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=76", imageAlt: "Analysts reviewing documents and operational evidence", visualLabel: "Case review", visualKicker: "AI",
    summary: "Help analysts assemble evidence, prioritize alerts and draft case notes while keeping final decisions and accountability with qualified reviewers.",
    problem: "Investigators spend time collecting scattered evidence, and automated summaries can hide missing facts or reproduce unsupported allegations.",
    example: "An illustrative pilot drafts evidence-linked notes for one alert queue, with analysts reviewing every statement before closing or escalating a case.",
    stack: ["Case management integration", "Permission-aware evidence retrieval", "AI evaluation and monitoring", "Human approval and audit logs"],
    vendorCategories: [{ label: "AI Infrastructure", href: "/vendors/ai-infrastructure-providers" }, { label: "Compliance Infrastructure", href: "/vendors/compliance-infrastructure-providers" }, { label: "KYC AML Providers", href: "/vendors/kyc-aml-providers" }]
  },
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
  },
  {
    slug: "cross-chain-swap-routing",
    title: "Cross-Chain Swap Routing for Multichain Apps",
    industry: "Interoperability and DeFi",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=76",
    imageAlt: "Network infrastructure representing multichain transaction routing",
    visualLabel: "Route Check",
    visualKicker: "Interoperability",
    summary: "Wallets, fintech apps and exchanges can route swaps across chains while controlling quotes, approvals, execution states and recovery paths.",
    seoDescription: "Explore cross-chain swap routing for multichain apps, including quote validation, transaction approvals, execution monitoring, recovery controls and vendor requirements.",
    problem: "A cross-chain swap is not one atomic action. Quotes can expire, approvals can be overbroad, liquidity can change and a route may complete on one chain while remaining unresolved on another.",
    stack: ["Cross-chain routing API", "Quote and slippage controls", "Wallet transaction orchestration", "Execution status and recovery", "Compliance and asset policy", "Reconciliation and support tooling"],
    vendorCategories: [
      { label: "DeFi Infrastructure", href: "/vendors/defi-infrastructure-providers" },
      { label: "Blockchain Development", href: "/vendors/blockchain-development-companies" },
      { label: "Blockchain APIs", href: "/vendors/node-as-a-service-rpc-providers" },
      { label: "Compliance Infrastructure", href: "/vendors/compliance-infrastructure-providers" }
    ],
    example: "Useful for multichain wallets, embedded swap experiences, treasury rebalancing, chain abstraction, marketplace settlement and applications that need one interface across multiple liquidity sources.",
    sources: [
      { label: "ERC-7683: Cross Chain Intents", href: "https://eips.ethereum.org/EIPS/eip-7683" },
      { label: "Ethereum Foundation Open Intents Framework update", href: "https://blog.ethereum.org/2025/08/29/protocol-update-003" }
    ],
    faqs: [
      { q: "Is a cross-chain swap atomic?", a: "Not necessarily. Buyers should map each approval, origin-chain action, solver or bridge step, destination delivery and refund path rather than treating the route as one guaranteed transaction." },
      { q: "What matters more than chain count?", a: "Reliable routes for the assets and transaction sizes you actually support, transparent fees, status visibility, recovery procedures and clear responsibility when execution fails matter more than a long network list." },
      { q: "Should an app use one router or several?", a: "A primary router may simplify operations, while a controlled fallback can improve resilience. Multiple routers also add policy, testing and reconciliation complexity, so the choice should follow measured route quality." }
    ]
  },
  {
    slug: "institutional-digital-asset-treasury",
    title: "Institutional Digital Asset Treasury Operations",
    industry: "Treasury and Digital Assets",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=76",
    imageAlt: "Treasury operations dashboard with financial controls and reporting",
    visualLabel: "Policy Control",
    visualKicker: "Treasury",
    summary: "Institutions can manage digital assets through policy-controlled custody, approvals, settlement, liquidity and reconciliation without weakening treasury governance.",
    seoDescription: "Explore institutional digital asset treasury operations, including custody, key management, approval policies, liquidity, reconciliation and vendor-selection requirements.",
    problem: "Digital assets introduce continuous markets, irreversible transfers, multiple custody models and fragmented records. Existing treasury controls must be translated into wallet permissions, transaction policies and evidence that finance teams can reconcile.",
    stack: ["Institutional custody or wallet infrastructure", "Role-based transaction policy", "Liquidity and settlement connectivity", "Blockchain monitoring and screening", "Treasury ledger integration", "Incident and recovery procedures"],
    vendorCategories: [
      { label: "Crypto Custody Providers", href: "/vendors/crypto-custody-providers" },
      { label: "Fund Administration and Transfer Agents", href: "/vendors/fund-administration-transfer-agents" },
      { label: "Stablecoin Infrastructure", href: "/vendors/stablecoin-infrastructure-providers" },
      { label: "Compliance Infrastructure", href: "/vendors/compliance-infrastructure-providers" }
    ],
    example: "Useful for corporate stablecoin balances, exchange and custodian accounts, tokenized cash products, collateral operations, market-making treasury and settlement wallets.",
    sources: [
      { label: "NIST key management guidance", href: "https://csrc.nist.gov/Projects/Key-Management/Key-Management-Guidelines" },
      { label: "NIST SP 800-130 cryptographic key management framework", href: "https://csrc.nist.gov/pubs/sp/800/130/final" }
    ],
    faqs: [
      { q: "Is digital asset treasury the same as investing in tokenized treasuries?", a: "No. This use case concerns the operating controls for assets held or moved by an institution. A tokenized treasury product is an investment instrument and introduces separate product, legal and valuation questions." },
      { q: "Does institutional custody remove treasury risk?", a: "No. Custody can reduce some key-management risks, but the institution still needs account governance, transaction approvals, counterparty limits, reconciliation and incident procedures." },
      { q: "Which model is better: custody or self-managed wallets?", a: "The answer depends on regulation, asset coverage, operating expertise, transaction frequency and recovery requirements. Many institutions use more than one model with explicit limits and transfer controls between them." }
    ]
  },
  {
    slug: "fiat-stablecoin-funding-redemption",
    title: "Fiat-to-Stablecoin Funding and Redemption",
    industry: "Tokenized Investment Platforms",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=76",
    imageAlt: "Investment platform payment and settlement workflow",
    visualLabel: "Funding Rail",
    visualKicker: "Settlement",
    summary: "Tokenized investment platforms can connect fiat funding, stablecoin settlement and redemption while preserving investor controls and accounting evidence.",
    seoDescription: "Explore fiat-to-stablecoin funding and redemption for tokenized investment platforms, including ramps, KYC hand-offs, settlement, reconciliation and vendor requirements.",
    problem: "Investor funding frequently crosses bank accounts, fiat ramps, stablecoin wallets, subscription systems and fund records. A blockchain transfer can succeed while the subscription, conversion or beneficiary delivery remains unresolved.",
    stack: ["Fiat collection or on-ramp", "Investor KYC and wallet association", "Stablecoin liquidity and settlement", "Subscription and redemption records", "Wallet and transaction screening", "Accounting reconciliation"],
    vendorCategories: [
      { label: "Fiat On and Off Ramps", href: "/vendors/fiat-on-off-ramp-providers" },
      { label: "Stablecoin Infrastructure", href: "/vendors/stablecoin-infrastructure-providers" },
      { label: "Tokenization Platforms", href: "/vendors/tokenization-platforms" },
      { label: "KYC and AML Providers", href: "/vendors/kyc-aml-providers" }
    ],
    example: "Useful for tokenized funds, private-market portals, treasury products and digital securities platforms that accept fiat or stablecoins for subscriptions and return value through redemptions.",
    sources: [
      { label: "BIS CPMI cross-border payments programme", href: "https://www.bis.org/committees/cpmi/cross-border-payments/overview" },
      { label: "FATF virtual assets guidance", href: "https://www.fatf-gafi.org/en/topics/virtual-assets.html" }
    ],
    faqs: [
      { q: "Does a stablecoin transfer complete an investment subscription?", a: "Not necessarily. The platform still needs confirmed investor approval, settled funding, allocation, authoritative ownership records and reconciliation." },
      { q: "Can the same provider handle funding and redemption?", a: "Some providers support both directions, but country, currency, asset and payment-method availability may differ. Test each required corridor separately." },
      { q: "Which vendors are usually required?", a: "The workflow may involve a tokenization platform, fiat ramp or payment provider, stablecoin infrastructure, custody or wallet provider, KYC and blockchain monitoring." }
    ]
  },
  {
    slug: "investor-wallet-onboarding-custody",
    title: "Investor Wallet Onboarding and Custody Orchestration",
    industry: "Digital Securities and Funds",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=76",
    imageAlt: "Secure wallet infrastructure and investor onboarding network",
    visualLabel: "Wallet Policy",
    visualKicker: "Custody",
    summary: "Issuers can connect investor identity, embedded wallets, custody, transfer eligibility and recovery without treating a wallet address as the investor record.",
    seoDescription: "Explore investor wallet onboarding and custody orchestration for tokenized assets, including embedded wallets, MPC, allowlisting, recovery and transfer controls.",
    problem: "Tokenized investment products must connect a verified investor to a wallet and keep that association current through transfers, device loss, credential compromise, organizational changes and provider migration.",
    stack: ["Investor identity and eligibility", "Embedded or institutional wallet API", "Custody and signing model", "Transfer allowlists and policy", "Recovery and account changes", "Registry and transaction reconciliation"],
    vendorCategories: [
      { label: "Crypto Custody Providers", href: "/vendors/crypto-custody-providers" },
      { label: "Identity Solutions", href: "/vendors/identity-solution-providers" },
      { label: "Tokenization Platforms", href: "/vendors/tokenization-platforms" },
      { label: "Compliance Infrastructure", href: "/vendors/compliance-infrastructure-providers" }
    ],
    example: "Useful for tokenized funds, digital securities, private-market platforms and issuer portals serving individuals, institutions and intermediaries through different wallet models.",
    sources: [
      { label: "NIST key management guidance", href: "https://csrc.nist.gov/Projects/Key-Management/Key-Management-Guidelines" },
      { label: "W3C Verifiable Credentials Data Model 2.0", href: "https://www.w3.org/TR/vc-data-model-2.0/" }
    ],
    faqs: [
      { q: "Does MPC mean the investor has self-custody?", a: "No. MPC describes signing technology. Custody depends on the full key, credential, policy, recovery, contractual and operational model." },
      { q: "Can a wallet address prove investor identity?", a: "No. The platform needs a controlled process that links a current approved identity and eligibility status to the address." },
      { q: "What is the hardest workflow to test?", a: "Recovery and provider exit are often the hardest. Test compromised credentials, lost devices, staff changes, disputed recovery and migration before launch." }
    ]
  },
  {
    slug: "tokenized-securities-transfer-controls",
    title: "Tokenized Securities Transfer Controls",
    industry: "Digital Securities",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=76",
    imageAlt: "Investment documents and controlled securities transfer workflow",
    visualLabel: "Transfer Policy",
    visualKicker: "Securities",
    summary: "Issuers can enforce investor eligibility, jurisdiction rules, lockups and approval requirements while keeping the legal ownership record aligned with token movement.",
    seoDescription: "Explore transfer controls for tokenized securities, including investor eligibility, allowlists, lockups, jurisdiction rules, secondary transfers and record reconciliation.",
    problem: "A technically valid token transfer may still violate securities restrictions, product terms or the current investor record. Controls must evaluate the transaction before settlement and preserve a defensible exception process.",
    stack: ["Investor identity and eligibility record", "Transfer rules and jurisdiction policy", "Token contract or policy engine", "Transfer-agent and registry workflow", "Wallet and sanctions screening", "Exception and correction procedures"],
    vendorCategories: [
      { label: "Tokenization Platforms", href: "/vendors/tokenization-platforms" },
      { label: "Fund Administration and Transfer Agents", href: "/vendors/fund-administration-transfer-agents" },
      { label: "KYC and AML Providers", href: "/vendors/kyc-aml-providers" },
      { label: "Compliance Infrastructure", href: "/vendors/compliance-infrastructure-providers" }
    ],
    example: "Useful for private funds, digital securities, employee or shareholder programs and other restricted instruments where ownership changes require current eligibility and an authoritative register.",
    sources: [
      { label: "SEC transfer-agent overview", href: "https://www.sec.gov/about/divisions-offices/division-trading-markets/transfer-agents" },
      { label: "SEC FAQs on crypto assets and distributed ledger technology", href: "https://www.sec.gov/rules-regulations/staff-guidance/trading-markets-frequently-asked-questions/frequently-asked-questions-relating-crypto-asset-activities-distributed-ledger-technology" }
    ],
    faqs: [
      { q: "Can the token contract enforce every securities restriction?", a: "Not necessarily. Some restrictions depend on current identity, jurisdiction, ownership concentration, product documents or offchain decisions. Define which system supplies each fact." },
      { q: "What if a prohibited transfer appears onchain?", a: "The operating model needs a legally reviewed response covering record status, investigation, correction authority, investor communication and any permitted administrative action." },
      { q: "Is an allowlist enough?", a: "No. The list must remain linked to current investor eligibility, product permissions and wallet ownership, with controlled changes and complete history." }
    ]
  },
  {
    slug: "digital-asset-key-recovery-business-continuity",
    title: "Digital-Asset Key Recovery and Business Continuity",
    industry: "Institutional Operations",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=900&q=76",
    imageAlt: "Secure institutional access and business continuity operations",
    visualLabel: "Recovery Plan",
    visualKicker: "Resilience",
    summary: "Institutions can recover from lost credentials, unavailable signers, provider outages and compromised access without creating an uncontrolled bypass around custody policy.",
    seoDescription: "Explore digital-asset key recovery and business continuity, including MPC, signer replacement, provider outages, disaster recovery and emergency governance.",
    problem: "Wallet security often focuses on normal signing while recovery relies on undocumented people, devices or vendor access. A crisis then forces teams to choose between asset availability and the controls meant to protect it.",
    stack: ["Custody or wallet key architecture", "Credential and signer lifecycle", "Protected recovery material", "Emergency authorization policy", "Provider and infrastructure continuity", "Incident evidence and reconciliation"],
    vendorCategories: [
      { label: "Crypto Custody Providers", href: "/vendors/crypto-custody-providers" },
      { label: "Security Audit Companies", href: "/vendors/security-audit-companies" },
      { label: "Identity Solutions", href: "/vendors/identity-solution-providers" },
      { label: "Compliance Infrastructure", href: "/vendors/compliance-infrastructure-providers" }
    ],
    example: "Useful for treasury wallets, custodial accounts, protocol foundations, token issuers and fund operations that must survive signer departure, device loss, regional outages or provider failure.",
    sources: [
      { label: "NIST key-management guidance", href: "https://csrc.nist.gov/Projects/Key-Management/Key-Management-Guidelines" },
      { label: "NIST contingency-planning guidance", href: "https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final" }
    ],
    faqs: [
      { q: "Does MPC solve key recovery?", a: "MPC changes key generation and signing, but credentials, policy changes, unavailable parties, backups and provider dependencies still require tested recovery procedures." },
      { q: "Should one executive hold emergency authority?", a: "Concentrated emergency authority creates misuse and continuity risk. Apply separation of duties, independent verification, narrow scope and complete post-event review." },
      { q: "How often should recovery be tested?", a: "Test on a risk-based schedule and after material personnel, provider, policy or architecture changes. A tabletop discussion alone does not prove that assets can be recovered safely." }
    ]
  }
];

export const useCases = baseUseCases.map((item) => ({ ...item, guide: useCaseGuides[item.slug] }));

export function getUseCase(slug: string) {
  return useCases.find((useCase) => useCase.slug === slug);
}
