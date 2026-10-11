import type { UseCase } from "./useCases";
import type { UseCaseGuide } from "./useCaseGuides";

type ResearchedCase = UseCase & { guide: UseCaseGuide };
const updatedAt = "2026-10-11";
const verifiedThrough = "October 11, 2026";
const directories = [
  { label: "Tokenization Platforms", href: "/vendors/tokenization-platforms" },
  { label: "Crypto Custody Providers", href: "/vendors/crypto-custody-providers" },
  { label: "Blockchain Development Companies", href: "/vendors/blockchain-development-companies" }
];

function guide(slug: string, title: string, audience: string, answer: string, questions: string[], faqs: UseCaseGuide["faqs"]): UseCaseGuide {
  return { title, audience, answer, questions, faqs, group: "Financial services", workflow: [], controls: [], measures: [], pilot: [], notFit: "Availability and suitability depend on the product documents and operating arrangement.", reference: { label: "FluidRWA research record", href: `/use-cases/${slug}#sources`, note: "Primary company disclosures, not independent performance assurance. Research and buyer recommendations are distinguished." } };
}

export const octoberCaseStudies: ResearchedCase[] = [
  {
    slug: "hsbc-gold-token-retail-physical-gold-case-study",
    title: "HSBC Gold Token: Retail Physical-Gold Ownership",
    industry: "Documented Banking Case Study", updatedAt,
    image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Illustrative gold bullion photograph, not a photograph of HSBC's vault or token holdings",
    visualLabel: "Live Retail Product", visualKicker: "HSBC Gold Token",
    summary: "How HSBC brought fractional gold ownership into Hong Kong mobile banking, and why custody, eligibility and product terms matter more than the token alone.",
    seoDescription: "HSBC Gold Token case study: physical backing, retail onboarding, ownership records, transfer restrictions, 2026 documents and lessons for asset tokenization.",
    problem: "Physical gold is difficult to divide, store and trade in small quantities without a dependable ownership record and an accessible distribution channel.",
    stack: ["Physical gold and vault custody", "Distributed-ledger ownership record", "HSBC Orion tokenization infrastructure", "Existing investment-account onboarding", "Bank-controlled dealing and transfer workflows", "Product disclosures and account records"],
    vendorCategories: directories,
    example: "A launched Hong Kong retail product, not an unrestricted public-chain gold token.",
    guide: guide("hsbc-gold-token-retail-physical-gold-case-study", "HSBC Gold Token: physical gold in mobile banking", "Banks, commodity platforms and tokenization product teams",
      "HSBC launched its retail Gold Token in Hong Kong in March 2024. It records fractional ownership of physical gold on the bank's distributed ledger and puts the product inside existing banking channels. The case illustrates how tokenization can change distribution without removing vault custody, account eligibility, dealing rules or issuer dependencies. It is not a stablecoin, a protected deposit or a promise of physical delivery.",
      ["Which legal documents establish ownership and govern insolvency treatment?", "How are token records matched to gold, vault records and customer accounts?", "Who sets the dealing price and resolves failed or disputed transfers?", "Can customers exit if the bank suspends dealing, and under which conditions?", "Which product claims are supported by an independent audit rather than the issuer's description?"],
      [{ q: "Can HSBC Gold Token holders take delivery of gold?", a: "The current HSBC product page states that investors cannot take delivery of the underlying gold. Fractional ownership should not be confused with a physical-redemption service." }, { q: "Can it be moved to any blockchain wallet?", a: "The documented retail workflow uses HSBC's ledger and banking channels. HSBC describes an app-based gift/transfer process with recipient account requirements, not unrestricted withdrawal to external wallets." }, { q: "Does tokenization make this a safe deposit?", a: "No. HSBC describes investment risk and states that the product is not principal protected or equivalent to a time deposit. Gold-price exposure and product-specific risks remain." }]),
    caseStudy: {
      company: "HSBC", status: "Launched Hong Kong retail gold product", verifiedThrough,
      background: [
        "HSBC's March 27, 2024 launch announcement introduced Gold Token to Hong Kong retail customers after earlier institutional tokenized-gold work. The product used HSBC Orion and existing online and mobile banking distribution. This is evidence of a product launch, not evidence that every customer segment or jurisdiction can participate.",
        "The current product page identifies XGT as the code for a fractional ownership record corresponding to 0.001 troy ounce of physical gold. A customer acquires gold exposure through the bank rather than receiving a gold bar or managing a self-custody token wallet.",
        "The research question is therefore not simply whether gold can be put on a blockchain. It is whether the ownership record, physical backing and customer journey remain consistent through purchase, sale, transfer and exceptions. A ledger can divide the record economically, but operational and legal responsibilities still need named owners."
      ],
      operatingModel: [
        { title: "1. Establish customer eligibility", detail: "HSBC's product page requires an active Hong Kong investment account and a Hong Kong residential address registered with the bank. It lists exclusions for US persons. Account access is part of the product architecture, not a step bypassed by tokenization." },
        { title: "2. Keep the asset and record distinct", detail: "HSBC describes physical gold held in its vault and tokens recorded on its distributed ledger. Buyers evaluating a similar model should separately assess physical custody, record integrity and customer legal rights; a token balance alone does not answer all three questions." },
        { title: "3. Deal through the banking interface", detail: "The documented journey lets a customer select buy or sell, choose accounts, review the order and inspect transaction history. Product dealing remains through HSBC. The absence of a public wallet interface is a design characteristic, not a deficiency inferred by FluidRWA." },
        { title: "4. Apply transfer and exit conditions", detail: "The app supports transfers using a recipient mobile number and account requirements. HSBC's FAQ says underlying gold cannot be physically delivered to investors. Teams reproducing this model must explain the difference between a permitted account transfer, a sale and delivery of the commodity." }
      ],
      milestones: [
        { date: "March 27, 2024", title: "Retail launch announced", detail: "HSBC introduced the product for Hong Kong retail customers through its established banking channels." },
        { date: "September 19, 2024", title: "Separate quantum-safe experiment", detail: "HSBC announced a tokenized-gold technology trial with Quantinuum. That experiment is not evidence that the retail product's entire production environment has adopted the tested security mechanism." },
        { date: "February 4, 2026", title: "Product-document versions", detail: "The product page identifies this effective date for the Principal Brochure and Key Facts Statement reviewed for this case." },
        { date: "September 9, 2026", title: "Updated contractual documents", detail: "The same page lists revised Terms and Conditions and a Sale, Purchase and Gift Agreement effective on this date." }
      ],
      outcomes: [
        { value: "0.001 toz", label: "Documented unit of ownership", context: "HSBC's current product page describes this fractional unit. It is not an investment return or a measure of product adoption." },
        { value: "Live", label: "Retail distribution established", context: "The March 2024 launch and current product documentation establish an offered product, rather than only a sandbox experiment." },
        { value: "Not disclosed", label: "Audited adoption and savings", context: "This research did not establish current audited holdings, active-user counts or customer cost savings. No such figure is inferred from awards or marketing statements." }
      ],
      updates: [
        "As reviewed on October 11, 2026, the product page documents buying, selling and app-based gifting, with current contractual documents listed separately from the February product brochure.",
        "The 2024 quantum-safe trial remains a separate research milestone. It should not be described as a retail launch feature or a universal security guarantee.",
        "Current terms matter more than the original launch description when assessing eligibility, transfer acceptance and exit. This page does not supply investment advice or substitute for those terms."
      ],
      successFactors: [
        "FluidRWA's interpretation: distribution through a familiar account can lower interface friction without asking users to learn wallet management. This is a design lesson, not a measured conversion-rate claim.",
        "A small ownership unit makes the record divisible while the physical asset remains in custody. Product teams should test whether their target customers need fractional ownership or simply price exposure.",
        "The operating model gives custody, dealing and customer support identifiable organizational responsibility. That clarity should be compared with the concentration risk of relying on the same bank for several functions."
      ],
      limitations: [
        "Company documentation confirms the described product, not an independent audit of vault balances or operational performance.",
        "The Hong Kong retail structure must not be generalized to other countries or HSBC's separate institutional offering.",
        "No unrestricted external-wallet transfer, physical redemption, guaranteed liquidity, principal protection or guaranteed return is asserted.",
        "A successful launch is not proof of suitability for a particular investor or of universal regulatory treatment."
      ],
      sourceRecords: [
        "HSBC Hong Kong: Introducing the HSBC Gold Token to retail customers in Hong Kong, March 27, 2024. https://www.about.hsbc.com.hk/-/media/hong-kong/en/news-and-media/240412-introducing-hsbc-gold-token-en.pdf",
        "HSBC Hong Kong: Gold Token product page, eligibility, transfer workflow and FAQ; reviewed October 11, 2026. https://www.hsbc.com.hk/investments/products/gold-token/",
        "HSBC Hong Kong: Key Facts Statement, effective February 4, 2026. https://www.hsbc.com.hk/content/dam/hsbc/hk/docs/investments/gold-token/key-facts-statement-v2.pdf",
        "HSBC Hong Kong: Principal Brochure, effective February 4, 2026. https://www.hsbc.com.hk/content/dam/hsbc/hk/docs/investments/gold-token/principal-brochure-v2.pdf",
        "HSBC: quantum-safe technology trial for tokenised gold, September 19, 2024. https://www.hsbc.com/news-and-views/news/media-releases/2024/hsbc-pilots-quantum-safe-technology-for-tokenised-gold"
      ]
    }
  },
  {
    slug: "ubs-umint-tokenized-fund-subscription-redemption-case-study",
    title: "UBS uMINT: Tokenized Fund Subscription and Redemption",
    industry: "Documented Asset-Management Case Study", updatedAt,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Illustrative financial district representing institutional fund operations, not UBS premises",
    visualLabel: "Live Fund Workflow", visualKicker: "UBS uMINT",
    summary: "From an Ethereum money-market investment to a completed subscription and redemption workflow: what UBS, DigiFT and Chainlink publicly demonstrated.",
    seoDescription: "UBS uMINT case study: Ethereum fund launch, DigiFT distribution, Chainlink DTA subscription and redemption, operational responsibilities and evidence limits.",
    problem: "Issuing fund tokens does not by itself coordinate investor orders, custody, settlement and the offchain fund record.",
    stack: ["Money-market investment product", "Ethereum token representation", "Authorized fund distribution", "UBS Tokenize infrastructure", "Digital Transfer Agent workflow", "Custody and onchain/offchain record synchronization"],
    vendorCategories: [...directories.slice(0, 2), { label: "Fund Administration and Transfer Agents", href: "/vendors/fund-administration-transfer-agents" }],
    example: "A launched fund and a separately documented in-production subscription/redemption transaction.",
    guide: guide("ubs-umint-tokenized-fund-subscription-redemption-case-study", "UBS uMINT: subscription and redemption onchain", "Fund managers, distributors, transfer agents and custody teams",
      "UBS launched uMINT, an Ethereum-based money-market investment, on November 1, 2024. In November 2025, UBS reported a live subscription and redemption workflow with DigiFT using Chainlink's Digital Transfer Agent standard. The useful lesson is the progression from token issuance to coordinated fund operations. The public record establishes a completed workflow, but not a quantified reduction in fees, processing time or reconciliation failures.",
      ["Which record determines accepted orders and legally recognized fund holdings?", "How do cash receipt, dealing cutoffs and token issuance stay synchronized?", "Who can reject, cancel or correct an order after submission?", "What happens when custody or a data-synchronization step is unavailable?", "Which parts of the demonstrated workflow are available for our investor and jurisdiction?"],
      [{ q: "Is uMINT a stablecoin?", a: "No. UBS describes a tokenized money-market investment. Fund exposure, eligibility, valuation and dealing conditions are distinct from a payment token or bank deposit." }, { q: "Was the subscription and redemption only a pilot?", a: "UBS's November 4, 2025 announcement explicitly describes an in-production transaction. This should be distinguished from UBS's separate October 2023 tokenized VCC fund pilot." }, { q: "Does the case prove instant, unrestricted redemption?", a: "No. A completed tokenized workflow does not establish unrestricted availability, guaranteed timing or removal of product terms. Those conditions require current fund and distributor documentation." }]),
    caseStudy: {
      company: "UBS Asset Management / UBS Tokenize", status: "Launched fund with documented in-production workflow", verifiedThrough,
      background: [
        "UBS announced uMINT in Singapore on November 1, 2024, describing a money-market investment built on Ethereum and available through authorized distribution partners. Its launch followed UBS Asset Management's October 2023 live pilot of a tokenized Variable Capital Company fund under Singapore's Project Guardian initiative.",
        "The distinction matters: a pilot can explore legal and operational feasibility, while a launched product needs distribution and lifecycle servicing. uMINT gives this case a product anchor; it is not simply a technical demonstration without an underlying investment.",
        "Tokenized-fund discussions often stop at issuance. A more demanding question is how an order becomes an accepted subscription, how payment is associated with it and how redemption closes the investor obligation. These transitions are where a distributor, manager, custodian and recordkeeper must agree on status."
      ],
      operatingModel: [
        { title: "1. Separate the investment from its token", detail: "UBS describes access to cash-management investments underpinned by money-market instruments. Ethereum supplies the digital representation; it does not determine investment quality, eligible investors or redemption terms. Those remain product questions." },
        { title: "2. Route orders through distribution", detail: "In the November 2025 transaction, DigiFT acted as the onchain distributor for uMINT. UBS reported use of the Chainlink DTA standard to request and process a subscription and redemption order. Distributor access should not be interpreted as anonymous permissionless fund access." },
        { title: "3. Coordinate lifecycle state", detail: "The announcement describes an end-to-end workflow spanning order taking, execution, settlement and synchronization of onchain and offchain systems. It demonstrates coordination of multiple records rather than the elimination of every record outside Ethereum." },
        { title: "4. Maintain custody and exception ownership", detail: "The participants describe integration with institutional custody. FluidRWA recommends treating failed settlement, disputed allocation and stale investor permissions as explicit exceptions with accountable owners. Those recommendations are not claims that the announcement discloses every production control." }
      ],
      milestones: [
        { date: "October 2023", title: "Separate VCC fund pilot", detail: "UBS's later launch release records an earlier tokenized-fund pilot under Project Guardian. That pilot should not be relabeled as the uMINT commercial launch." },
        { date: "November 1, 2024", title: "uMINT launch", detail: "UBS Asset Management announced the Ethereum-based money-market investment and authorized-partner distribution." },
        { date: "November 4, 2025", title: "In-production lifecycle transaction", detail: "UBS announced completed subscription and redemption requests involving DigiFT and the Chainlink DTA standard." },
        { date: "October 11, 2026", title: "Public-record review", detail: "UBS Tokenize's current journey page retains the 2025 fund-workflow milestone. The research does not infer a new 2026 transaction or current fund size from that page." }
      ],
      outcomes: [
        { value: "Launched", label: "Investment product established", context: "The November 2024 UBS release confirms the product launch. It does not supply a current AUM figure for this study." },
        { value: "2 request types", label: "Subscription and redemption", context: "Both order types were documented in the November 2025 in-production workflow. This is not a count of investors or recurring transactions." },
        { value: "Not verified", label: "Quantified efficiency uplift", context: "No independently verified savings, median settlement time or failure-rate improvement was established from the reviewed sources." }
      ],
      updates: [
        "The current UBS Tokenize page includes the 2025 end-to-end fund workflow in its published journey. This research cut-off is not an assertion that the milestone occurred in 2026.",
        "UBS's 2025 annual report discusses developing uMINT through its in-house tokenization service. That strategic description is not a fund-level performance disclosure.",
        "Claims of being the first such transaction originate with the announcing participants. FluidRWA does not independently rank the workflow against all other tokenized funds."
      ],
      successFactors: [
        "FluidRWA's interpretation: a known investment product gives lifecycle automation a specific business purpose, rather than treating token minting as the outcome.",
        "A distributor participates in the demonstrated order flow. Teams should evaluate how distribution changes permissions, servicing obligations and investor support before selecting a token standard.",
        "Connecting onchain requests to offchain records is more operationally meaningful than assuming every system can move onto a single ledger at once.",
        "A completed redemption is useful evidence of a return path. Procurement should still test repeated operation, peak demand, payment failure and recovery."
      ],
      limitations: [
        "The main workflow evidence is a participant-authored announcement, not an independent audit or a stress test.",
        "The public record reviewed does not establish uMINT's current AUM, investor count, universal distribution availability or measured efficiency gains.",
        "A live transaction does not show that every investor can subscribe or redeem continuously, nor that every chain and custody arrangement is supported.",
        "Fund valuation, legal rights, dealing rules and investment risk cannot be inferred from Ethereum or DTA alone."
      ],
      sourceRecords: [
        "UBS Asset Management: first tokenized investment fund launch, November 1, 2024. https://www.ubs.com/global/en/media/display-page-ndp/en-20241101-first-tokenized-investment-fund.html",
        "UBS: in-production fund transaction using Chainlink DTA, November 4, 2025. https://www.ubs.com/global/en/media/display-page-ndp/en-20251104-chainlink.html",
        "UBS Tokenize: product scope and published 2025 journey, reviewed October 11, 2026. https://www.ubs.com/global/en/investment-bank/tokenize.html",
        "UBS Group: Annual Report 2025, strategic uMINT development discussion. https://www.ubs.com/content/dam/assets/cc/investor-relations/annual-report/2025/annual-report-ubs-group-2025.pdf"
      ]
    }
  },
  {
    slug: "broadridge-distributed-ledger-repo-case-study",
    title: "Broadridge DLR: Tokenized Repo at Institutional Scale",
    industry: "Documented Market-Infrastructure Case Study", updatedAt,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Illustrative operations team reviewing financial records, not Broadridge staff or a DLR interface",
    visualLabel: "Live Repo Infrastructure", visualKicker: "Broadridge DLR",
    summary: "How immobilized collateral, smart-contract workflows and existing custody connections became a production securities-financing platform, with dated September 2026 volume evidence.",
    seoDescription: "Broadridge DLR case study: collateral immobilization, repo lifecycle, Canton infrastructure, September 2026 activity, DLX expansion and evidence limits.",
    problem: "Repo participants need to coordinate cash, collateral rights and trade status across custody and post-trade systems without repeatedly moving the underlying security.",
    stack: ["Existing custody and securities accounts", "Immobilized collateral", "Daml smart-contract workflows", "Canton technology", "Cash and settlement connectivity", "Post-trade records and exception handling"],
    vendorCategories: [...directories.slice(0, 2), { label: "Institutional Digital Asset Trading Platforms", href: "/vendors/institutional-digital-asset-trading-platforms" }],
    example: "Production securities-financing infrastructure with dated provider-reported activity, distinct from a newly announced broader platform.",
    guide: guide("broadridge-distributed-ledger-repo-case-study", "Broadridge DLR: tokenized collateral for repo markets", "Repo desks, collateral managers, custody and post-trade teams",
      "Broadridge's Distributed Ledger Repo platform supports repo agreements and lifecycle processing using digital representations of collateral while underlying securities remain in existing custody arrangements. It went live in June 2021. Broadridge's October 8, 2026 release reports $7.5 trillion of September activity and $359 billion average daily activity. Those are provider-reported transaction volumes, not unique assets locked, fund AUM or proof of a particular customer's savings.",
      ["What enforceable right moves when the collateral representation changes hands?", "Which custody record confirms that the security is segregated and unavailable for conflicting use?", "How is cash finality synchronized with the collateral instruction?", "Which volume belongs to our trade type, counterparties and deployment?", "Can an operator recover from a failed maturity, stale custody event or disconnected payment system?"],
      [{ q: "Does $7.5 trillion mean that amount is locked onchain?", a: "No. Broadridge reported transaction activity over September 2026. Repeated financing and collateral use can contribute to turnover; monthly volume must not be relabeled as unique tokenized assets or AUM." }, { q: "Is DLR the same as DLX?", a: "No. DLR is the established repo capability. Broadridge announced DLX in September 2026 as a broader digital-asset infrastructure platform building on that foundation. DLR's volumes do not independently prove adoption of every DLX function." }, { q: "Does the platform eliminate custody and settlement risk?", a: "No. Shared workflows can coordinate instructions, but custody records, enforceable rights, payment finality, permissions and operational recovery remain necessary. This research does not assert risk elimination." }]),
    caseStudy: {
      company: "Broadridge Financial Solutions", status: "Production repo platform with reported monthly activity", verifiedThrough,
      background: [
        "Broadridge announced DLR's go-live on June 14, 2021 after earlier pilots. Its launch description set out a platform for agreeing, executing and settling repo transactions, including bilateral and intracompany activity. The underlying securities could remain immobilized while smart contracts handled changes in the represented ownership rights.",
        "Repo is a financing transaction involving a sale and an agreement to repurchase securities. The operational problem is not simply transferring a token: it is maintaining a consistent view of collateral availability, contractual obligations, cash movement and maturity. An efficient record must still correspond to enforceable rights and actual securities.",
        "This case is distinct from FluidRWA's Kinexys study. The focus here is a technology provider's integration with existing repo and custody infrastructure, its collateral-immobilization model and the interpretation of recurring platform activity. It is not a second generic explanation of intraday lending."
      ],
      operatingModel: [
        { title: "1. Anchor collateral to custody", detail: "DLR's launch description keeps securities immobilized rather than physically moving them for every transaction. Broadridge's published operating explanation describes links to central securities depositories and custodians. Legal and custody arrangements therefore remain prerequisites to the digital workflow." },
        { title: "2. Encode agreement and permissions", detail: "Smart contracts coordinate the repo lifecycle and represented collateral rights. The launch used Daml and VMware Blockchain; Broadridge's later explanation records migration to Canton in 2023. Historical technology descriptions should not be mistaken for the current stack." },
        { title: "3. Connect to cash and post-trade systems", detail: "Broadridge's operating explanation describes payment triggered through conventional rails in that configuration. Its current product page emphasizes integration with existing post-trade platforms. This case does not assume every current transaction uses an identical cash rail or settlement topology." },
        { title: "4. Reconcile maturity and exceptions", detail: "FluidRWA recommends testing how a trade matures, how collateral is released and how failed or disputed instructions are handled. A synchronized record reduces duplicated state only if it remains consistent with custody, payment and accounting evidence outside the platform." }
      ],
      milestones: [
        { date: "June 14, 2021", title: "Production launch", detail: "Broadridge announced go-live of the platform for bilateral repo trades using smart contracts." },
        { date: "2023", title: "Canton migration recorded", detail: "An updated operating explanation on Broadridge's site states that DLR migrated to Canton technology in 2023." },
        { date: "July 7, 2026", title: "June activity disclosure", detail: "Broadridge reported $7.5 trillion total June repo activity and $357 billion average daily activity." },
        { date: "September 9, 2026", title: "DLX launch announced", detail: "Broadridge introduced its broader digital-asset infrastructure platform. Announced scope is distinguished from DLR's demonstrated transaction activity." },
        { date: "October 8, 2026", title: "September activity disclosure", detail: "The latest dated release reviewed reports $7.5 trillion in September and $359 billion average daily repo activity." }
      ],
      outcomes: [
        { value: "$7.5T", label: "September 2026 transaction activity", context: "Reported by Broadridge on October 8, 2026. Turnover is not the amount of unique collateral held or new capital raised." },
        { value: "$359B", label: "September average daily activity", context: "A provider-reported daily average for the specified month, not a guarantee of future throughput or user-specific performance." },
        { value: "Since 2021", label: "Production history", context: "The launch is documented in June 2021. Longevity does not independently establish outage-free operation or quantify client savings." }
      ],
      updates: [
        "The October 8, 2026 release is the latest dated volume update reviewed for this case. DLR product-page headline figures are not substituted for that reporting period.",
        "Broadridge announced DLX on September 9, 2026, extending its proposed operating scope across a broader asset lifecycle. This case does not assign DLR's turnover to every DLX module.",
        "The July 2026 disclosure also described aggregated DLR market data reaching Bloomberg Terminal subscribers through Kaiko. Market-data distribution is a visibility development, not a new collateral-balance metric."
      ],
      successFactors: [
        "FluidRWA's interpretation: a specific financing workflow creates a clear reason to synchronize records. The design begins with a custody and cash problem rather than with a new token offered to the public.",
        "Integrating existing account structures can make adoption more practical than forcing every participant to replace custody and post-trade systems together.",
        "Collateral immobilization separates the asset's physical or custody location from the workflow governing its rights. That separation is useful only if exclusivity, control and release are legally and operationally reliable.",
        "Dated recurring activity is stronger evidence of use than a single demonstration. It still needs trade-type and participant breakdowns before a buyer can infer relevance to its own operations."
      ],
      limitations: [
        "Volume statistics are Broadridge disclosures, not an independent audit conducted by FluidRWA.",
        "Monthly turnover can include repeated use of the same collateral. It cannot be compared directly with a tokenized fund's assets under management.",
        "Current participant-level usage, bilateral versus intracompany mix, cost savings and outage statistics were not established from the reviewed releases.",
        "A broader platform launch does not establish completed adoption of every newly advertised asset class or function."
      ],
      sourceRecords: [
        "Broadridge: DLT repo platform go-live, June 14, 2021. https://www.broadridge.com/de/press-release/2021/broadridge-launches-dlt-repo-platform",
        "Broadridge: DLR operating explanation and Canton migration update; historical context, reviewed October 11, 2026. https://www.broadridge.com/insights/dlr-transacts-1-trillion-a-month",
        "Broadridge: current Distributed Ledger Repo product description, reviewed October 11, 2026. https://www.broadridge.com/capability/middle-and-back-office-solutions/post-trade-processing/distributed-ledger-repo-solutions",
        "Broadridge: June activity disclosure, July 7, 2026. https://www.broadridge.com/de/press-release/2026/broadridges-dlr-processes-over-7-trillion-in-june",
        "Broadridge: DLX launch, September 9, 2026. https://www.broadridge.com/press-release/2026/broadridge-launches-dlx",
        "Broadridge: September activity disclosure, October 8, 2026. https://www.broadridge.com/press-release/2026/broadridges-distributed-ledger-repo-processes-7-point-5-trillion-in-september"
      ]
    }
  }
];
