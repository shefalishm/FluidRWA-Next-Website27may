import type { UseCase } from "./useCases";
import type { UseCaseGuide } from "./useCaseGuides";

const updatedAt = "2026-10-12";
const verifiedThrough = "October 12, 2026";
const tokenization = { label: "Tokenization Platforms", href: "/vendors/tokenization-platforms" };
const custody = { label: "Crypto Custody Providers", href: "/vendors/crypto-custody-providers" };
const payments = { label: "Fiat On/Off Ramp Providers", href: "/vendors/fiat-on-off-ramp-providers" };
function guide(slug: string, title: string, audience: string, answer: string, questions: string[], faqs: UseCaseGuide["faqs"]): UseCaseGuide {
  return { title, audience, answer, questions, faqs, group: "Financial services", workflow: [], controls: [], measures: [], pilot: [], notFit: "Product eligibility and operating terms must be checked for the proposed use.", reference: { label: "FluidRWA research record", href: `/use-cases/${slug}#sources`, note: "Public primary records; company statements are not independent performance assurance." } };
}

export const october12CaseStudies: (UseCase & { guide: UseCaseGuide })[] = [
  {
    slug: "franklin-templeton-benji-fund-share-recordkeeping-case-study",
    title: "Franklin Templeton Benji: Fund Share Recordkeeping", industry: "Documented Fund-Operations Case Study", updatedAt,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Illustrative financial district representing fund operations, not Franklin Templeton premises",
    visualLabel: "Live Registered Fund", visualKicker: "Franklin Templeton Benji",
    summary: "How a US-registered money-market fund uses public blockchains for share records while retaining transfer-agent authority, investor controls and fund obligations.",
    seoDescription: "Benji case study: FOBXX fund shares, transfer-agent records, permitted shareholder transfers, 2026 collateral utility and the limits of public-blockchain access.",
    problem: "Fund distribution and share servicing need consistent investor records, permitted transfers and correction procedures, even when shares are represented on a public blockchain.",
    stack: ["US-registered money-market fund", "Transfer-agent ownership record", "Permissioned wallet controls on public networks", "Benji app and institutional interface", "Share transfer and correction procedures", "Separate collateral and custody arrangements"],
    vendorCategories: [tokenization, custody, { label: "Fund Administration and Transfer Agents", href: "/vendors/fund-administration-transfer-agents" }],
    example: "A launched investment fund and documented shareholder-transfer capability, not an unrestricted bearer token.",
    guide: guide("franklin-templeton-benji-fund-share-recordkeeping-case-study", "Franklin Templeton Benji: fund shares and ownership records", "Fund managers, transfer agents and investor-platform teams",
      "Franklin Templeton's Franklin OnChain U.S. Government Money Fund launched in 2021. One fund share is represented by one BENJI token, with the transfer agent maintaining the official ownership record through a blockchain-integrated system. Shareholder-to-shareholder transfers were announced in April 2024. The case shows that public-chain records and permissioned fund administration can coexist; it does not mean the fund has removed its transfer agent or investment risks.",
      ["Who has authority to correct share records after an unauthorized transaction?", "How are approved wallets associated with the verified investor?", "What happens if a network becomes unsuitable or temporarily unavailable?", "Which product terms govern redemption separately from token transfer?", "How does collateral use change custody, margin and liquidation responsibilities?"],
      [{ q: "Is BENJI a stablecoin?", a: "No. A BENJI token represents a share of the Franklin OnChain U.S. Government Money Fund. The fund seeks a stable share value, but that objective is not a guarantee or a deposit-protection arrangement." }, { q: "Does using a public blockchain remove the transfer agent?", a: "No. The reviewed prospectus states that the transfer agent controls the blockchain-integrated recordkeeping system and can correct share records and restrict transfers." }, { q: "Can every wallet hold and transfer fund shares?", a: "No. The reviewed prospectus describes permissioned wallets and administrative controls. Shareholder transfers must not be presented as unrestricted permissionless trading." }]),
    caseStudy: {
      company: "Franklin Templeton", status: "Launched fund with documented share-transfer capability", verifiedThrough,
      background: [
        "Franklin Templeton's April 25, 2024 release records the fund's 2021 launch and explains the relationship between FOBXX shares, BENJI tokens and transfer-agent recordkeeping. The useful distinction is between the investment product, the technology platform and the digital share representation. Those names describe related but different components.",
        "A fund ownership record must support more than a balance display. Investors need accepted subscriptions, permitted transfers, income and redemption servicing, as well as an accountable response when a transaction is wrong. Changing the record's technology does not eliminate those obligations.",
        "The prospectus reviewed on October 12, 2026 describes a permissioned system on public networks. Personal identifying information is kept in a separate traditional database. This makes the case especially useful for understanding why a public ledger does not mean that every participant or every investor record is publicly accessible.",
        "This page focuses on recordkeeping and transfer authority. It complements FluidRWA's BUIDL treasury/collateral and uMINT subscription/redemption studies rather than repeating a generic list of tokenized funds. No current yield, AUM or investment recommendation is inferred from those comparisons."
      ],
      operatingModel: [
        { title: "1. Establish the investor and account", detail: "The Benji platform describes mobile and institutional interfaces for fund activity. FluidRWA recommends evaluating the link between the verified investor, approved account and wallet before assessing the token interface. A token address alone is not enough to define the legal owner or servicing entitlement." },
        { title: "2. Maintain an authoritative share record", detail: "The prospectus assigns record accuracy and administrative correction authority to the transfer agent. This is materially different from a bearer asset whose holder is defined only by possession of a private key. Buyers should ask how corrections are documented and reviewed, not assume that immutability prevents mistakes from being addressed." },
        { title: "3. Transfer within fund controls", detail: "The April 2024 announcement made shareholder-to-shareholder transfers available. The token representation does not waive investor eligibility or the permissioned-wallet model. A transfer feature should be assessed with its acceptance, record-update and exception procedures, not simply with a network transaction explorer." },
        { title: "4. Evaluate additional utility separately", detail: "In February 2026, Franklin Templeton announced a live Binance off-exchange collateral program for eligible clients using Benji-issued money-market fund shares, with Ceffu supporting custody infrastructure. This is a separate institutional arrangement, not a promise that every retail fund holder can use every venue or obtain credit." }
      ],
      milestones: [
        { date: "2021", title: "Fund launch", detail: "The issuer's later shareholder-transfer announcement identifies 2021 as the launch year." },
        { date: "April 25, 2024", title: "Peer-to-peer transfers announced", detail: "The issuer announced transfers between shareholders on supported public-blockchain infrastructure." },
        { date: "February 11, 2026", title: "Off-exchange collateral program", detail: "Franklin Templeton and Binance announced a live eligible-client arrangement involving Benji-issued fund shares and Ceffu custody infrastructure." },
        { date: "October 12, 2026", title: "Disclosure review", detail: "The current Benji platform description and the available 2026 SEC-filed prospectus were reviewed for ownership, permission and risk distinctions." }
      ],
      outcomes: [
        { value: "1 share", label: "Per BENJI token", context: "A documented representation relationship, not a promise of redemption timing or investment return." },
        { value: "Available", label: "Shareholder transfers announced", context: "The April 2024 announcement establishes a transfer capability. It is not an independently measured adoption count." },
        { value: "Not verified", label: "Net operating savings", context: "The reviewed records did not establish independently audited servicing-cost savings or a customer-specific efficiency benchmark." }
      ],
      updates: [
        "The reviewed prospectus retains explicit transfer-agent authority and blockchain-related risks. Those disclosures are more relevant to legal and operational design than a headline that describes the fund as onchain.",
        "The February 2026 Binance program extends utility through a distinct collateral arrangement. Its eligibility and custody relationships must be assessed separately from ordinary fund ownership.",
        "The current Benji page lists multiple networks and interfaces. Network availability is not a universal permission for all investors, and this research does not claim a complete inventory of every subsequent partnership."
      ],
      successFactors: [
        "FluidRWA interpretation: pairing the digital representation with a named transfer agent creates an accountable ownership and correction model rather than treating record errors as impossible.",
        "An established investment structure provides a concrete servicing task. Teams can test subscriptions, transfers and redemptions instead of measuring success only by how many tokens were minted.",
        "Separating identity records from public transaction records is a useful design principle, but it still requires privacy testing and control of the mapping database.",
        "New collateral utility can create another buyer workflow without changing the original fund mandate. Each arrangement should have its own responsibility matrix."
      ],
      limitations: [
        "Issuer documentation and an SEC-filed prospectus are evidence of disclosures, not an independent guarantee of safety, performance or regulatory suitability for every investor.",
        "The fund's target share price is not principal protection. The prospectus warns that investors can lose money and that the investment is not a bank deposit.",
        "No current AUM, guaranteed yield, unrestricted transferability or audited operational savings are claimed.",
        "Public-chain technology does not remove manager, custodian, administrator, transfer-agent or network dependencies."
      ],
      sourceRecords: [
        "Franklin Templeton: shareholder-transfer announcement, April 25, 2024. https://www.franklintempleton.com/press-releases/news-room/2024/franklin-templeton-announces-availability-of-peer-to-peer-transfers-for-franklin-onchain-u.s.-government-money-fund",
        "Franklin Templeton: current Benji platform description, reviewed October 12, 2026. https://digitalassets.franklintempleton.com/benji/",
        "SEC EDGAR: Franklin OnChain U.S. Government Money Fund 2026 prospectus, Fund Summary and Use of Blockchain sections, reviewed October 12, 2026. https://www.sec.gov/Archives/edgar/data/1786958/000165558926000970/c485bpos.htm",
        "Franklin Templeton: Binance institutional off-exchange collateral program, February 11, 2026. https://www.franklintempleton.com/press-releases/news-room/2026/franklin-templeton-and-binance-advance-strategic-collaboration-with-institutional-off-exchange-collateral-program"
      ]
    }
  },
  {
    slug: "shopify-stripe-usdc-merchant-checkout-case-study",
    title: "Shopify and Stripe: USDC Merchant Checkout", industry: "Documented Commerce Case Study", updatedAt,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Illustrative retail payment interaction, not Shopify's USDC checkout interface",
    visualLabel: "Documented Checkout Product", visualKicker: "Shopify USDC",
    summary: "How USDC checkout fits an existing commerce workflow, from the customer's wallet payment to merchant payout, refunds and order reconciliation.",
    seoDescription: "Shopify USDC checkout case study: Stripe and Coinbase launch, Base payments, local-currency payouts, refunds, eligibility and evidence limits.",
    problem: "A merchant needs payments to connect to orders, payouts and refunds without requiring the business to operate every part of cryptocurrency infrastructure.",
    stack: ["Shopify Payments and order records", "USDC customer wallet payment", "Supported network configuration", "Stripe payment integration", "Local-currency or eligible USDC payouts", "Refund and reconciliation workflows"],
    vendorCategories: [payments, custody, { label: "KYC and AML Providers", href: "/vendors/kyc-aml-providers" }],
    example: "A documented merchant payment method, distinct from card-network settlement or treasury remittances.",
    guide: guide("shopify-stripe-usdc-merchant-checkout-case-study", "Shopify USDC checkout: from wallet payment to merchant payout", "Merchants, commerce platforms and payment operations teams",
      "Shopify, Stripe and Coinbase announced USDC checkout in June 2025, initially on Base. Current Shopify help documentation explains activation, regional eligibility, payout choices and refunds. The case is useful because a stablecoin payment is connected to the merchant's existing order and payout workflow, rather than treated as a wallet transfer alone. Public product availability does not establish how many merchants actively use it or whether conversion rates improved.",
      ["Is the payment method and chosen payout arrangement enabled for our store's region?", "Which event marks a paid order, and how does it reconcile to the payout?", "How is a refund funded after proceeds have been paid out?", "What happens with an unsupported network, abandoned checkout or wallet problem?", "Who owns customer support when the order and payment status disagree?"],
      [{ q: "Must the merchant hold USDC after checkout?", a: "No. Shopify documents payouts in the chosen Shopify Payments currency. Direct USDC payout is an alternative only where available for the store." }, { q: "Can a USDC order be refunded?", a: "Yes. Shopify documents refund funding from the USDC balance when using that payout model, or conversion from the Shopify Payments balance when receiving payouts in the chosen currency." }, { q: "Does the rollout mean millions of merchants are using USDC?", a: "No. The Stripe announcement describes potential rollout reach. It is not an active-merchant count or a disclosed transaction-volume measurement." }]),
    caseStudy: {
      company: "Shopify, Stripe and Coinbase", status: "Launched payment method with current merchant documentation", verifiedThrough,
      background: [
        "On June 12, 2025, Shopify announced an early-access USDC payment method with Coinbase and Stripe. Stripe's same-day release described a planned rollout across 34 countries, with customers paying USDC on Base and merchants receiving local currency by default. Rollout scope is not a count of merchants who activated or used the method.",
        "A retail checkout differs from a business treasury transfer. It has an order amount, customer interaction, fulfillment decision and returns policy. The business needs an interpretable payment status and an exit path when goods are returned. Blockchain confirmation is only one component of that commercial lifecycle.",
        "The current Shopify help page describes activation, payout options and refund behavior. These operating instructions provide stronger evidence of an offered merchant workflow than broad market-size claims. They do not independently show improved checkout completion or lower total cost for a particular merchant.",
        "This case complements the existing Visa settlement and stablecoin-remittance guides. It focuses on the customer's purchase and the merchant's records, not the settlement obligations between payment-network institutions. The distinction prevents different types of stablecoin volume from being treated as interchangeable."
      ],
      operatingModel: [
        { title: "1. Enable an eligible payment method", detail: "Shopify documents activating USDC in Shopify Payments settings. A merchant must check its actual region and account configuration. Buyer diligence should use the current eligibility page rather than treating the original rollout list as a permanent guarantee of availability." },
        { title: "2. Connect wallet payment to an order", detail: "The launch announcements describe a customer paying USDC on Base through the checkout experience. FluidRWA recommends retaining the order identifier, payment identifier and required final status together. A wallet transfer should not be matched to an order solely by a similar amount or timestamp." },
        { title: "3. Select the payout model", detail: "Current Shopify documentation distinguishes payouts in the chosen Shopify Payments currency from direct USDC payouts where available. These models give the merchant different asset-handling responsibilities. A merchant should inspect the actual settings and payout evidence instead of assuming the same choice is offered everywhere." },
        { title: "4. Fund and reconcile a refund", detail: "Shopify documents a refund debit from the USDC balance for the USDC payout model, or conversion from the Shopify Payments balance for the chosen-currency model. The refund path therefore remains an operational task with a funding requirement, not a reversal of the original blockchain transaction." }
      ],
      milestones: [
        { date: "June 12, 2025", title: "Shopify early-access announcement", detail: "Shopify announced USDC on Base with Coinbase and Stripe, describing integration with existing commerce workflows." },
        { date: "June 12, 2025", title: "Stripe rollout announcement", detail: "Stripe described planned availability across 34 countries and local-currency settlement by default. The announcement's prospective reach is not presented as adoption." },
        { date: "October 12, 2026", title: "Current operating instructions reviewed", detail: "Shopify's USDC help page was checked for activation, payout choices, regional restrictions and refunds. This is a review date, not a new product launch." }
      ],
      outcomes: [
        { value: "Documented", label: "Order-to-payout workflow", context: "Merchant instructions cover activation and payouts. This is evidence of product operation, not a measured merchant conversion uplift." },
        { value: "2 models", label: "Payout arrangements described", context: "Chosen-currency and eligible USDC payout arrangements are documented; direct USDC payout is not available in every region." },
        { value: "Not disclosed", label: "Verified merchant adoption in this review", context: "No audited active-merchant count, sales volume or comparative savings was established from the reviewed primary records." }
      ],
      updates: [
        "The current help page is the reference for store eligibility and payout availability. It narrows assumptions that could otherwise be made from the original global rollout announcement.",
        "Refund funding depends on the selected payout model. Operators should test the actual refund journey before promoting the payment method to customers.",
        "Promotional cashback or credit arrangements can change and are not treated here as permanent product economics or evidence of profitable adoption."
      ],
      successFactors: [
        "FluidRWA interpretation: fitting a new rail into familiar order and payout workflows can reduce the amount of new operational knowledge a merchant needs. This is a design inference, not a measured onboarding result.",
        "Separating the customer's payment asset from the merchant's payout asset helps distinguish accepting a stablecoin from running a cryptocurrency treasury.",
        "A documented refund path is an essential part of usable commerce infrastructure. Teams should judge the full lifecycle rather than a successful checkout demonstration alone.",
        "Existing merchant distribution offers a practical route to availability, but product reach must still be measured separately from active usage."
      ],
      limitations: [
        "The evidence comes from the announcing companies and Shopify's operating documentation, not an independent audit of merchant outcomes.",
        "The rollout population, stablecoin market statistics and number of Shopify stores cannot be substituted for product-specific adoption.",
        "No guaranteed savings, universal regional access, unrestricted network support or improved conversion rate is claimed.",
        "Payment-provider, wallet, network, payout and refund dependencies remain. Availability is not assurance of suitability for every merchant."
      ],
      sourceRecords: [
        "Shopify: USDC launch announcement, June 12, 2025. https://www.shopify.com/news/stablecoins-on-shopify",
        "Stripe: Shopify stablecoin payment partnership, June 12, 2025. https://stripe.com/newsroom/news/shopify-stripe-stablecoin-payments",
        "Shopify Changelog: USDC on Base, June 12, 2025. https://changelog.shopify.com/posts/introducing-usdc-on-base-with-shopify-payments",
        "Shopify Help Center: current USDC activation, payouts and refunds, reviewed October 12, 2026. https://help.shopify.com/en/manual/payments/shopify-payments/local-payment-methods/usdc-payments"
      ]
    }
  },
  {
    slug: "dbs-ant-international-treasury-tokens-case-study",
    title: "DBS and Ant International: Treasury Tokens", industry: "Documented Corporate-Treasury Case Study", updatedAt,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Illustrative treasury operations team reviewing records, not DBS or Ant International staff",
    visualLabel: "Documented Client Use", visualKicker: "DBS Treasury Tokens",
    summary: "How a bank-controlled ledger connects to corporate treasury infrastructure, and what DBS publicly confirms about Ant International's intragroup liquidity use.",
    seoDescription: "DBS Treasury Tokens case study: Ant International's Whale integration, permissioned banking infrastructure, pilot-to-client use and evidence limits.",
    problem: "Corporate groups operating across markets need visibility and control of liquidity beyond conventional banking cutoffs, with clear legal-entity and account boundaries.",
    stack: ["DBS permissioned EVM-compatible blockchain", "Core bank payment engine", "Ant International Whale integration", "Corporate account and legal-entity controls", "Intragroup liquidity workflow", "Treasury records and reconciliation"],
    vendorCategories: [tokenization, payments, { label: "Blockchain Development Companies", href: "/vendors/blockchain-development-companies" }],
    example: "An August 2024 pilot followed by DBS disclosures of ongoing use; not an unrestricted public payment token.",
    guide: guide("dbs-ant-international-treasury-tokens-case-study", "DBS Treasury Tokens: Ant International's intragroup liquidity", "Corporate treasurers, transaction banks and payment architects",
      "DBS announced a Treasury Tokens pilot with Ant International in August 2024, connecting its permissioned ledger and payment engine with Ant's Whale treasury platform. The October 2024 Token Services release described ongoing intragroup transfers, and DBS's 2024 annual report identified Ant as an early user. The evidence supports a corporate banking workflow; it does not establish universal cross-bank availability or independently quantified savings.",
      ["Which bank account, legal entity and currency does each ledger balance represent?", "What is the legal effect of a ledger transfer relative to the bank's books?", "Which counterparties, markets and payment rails are actually supported?", "How do failures, holds and reversals appear in treasury records?", "What specific savings and reliability evidence can the bank provide for our configuration?"],
      [{ q: "Is Treasury Tokens an unrestricted stablecoin?", a: "The reviewed DBS material describes a permissioned institutional banking service connected to its payment engine. It should not be presented as an unrestricted public-chain payment token." }, { q: "Was Ant's involvement only an announcement?", a: "The August 2024 release describes a pilot. The October release states that it supports ongoing intragroup transfers, and DBS's 2024 annual report identifies Ant as an early user. These are bank-reported disclosures, not an independent client audit." }, { q: "Does 24/7 operation remove every currency cutoff?", a: "No universal claim is justified. DBS describes the supported intragroup workflow. Actual markets, accounts, liquidity, external payment rails and contractual conditions must be checked for a proposed deployment." }]),
    caseStudy: {
      company: "DBS Bank and Ant International", status: "Pilot followed by bank-reported ongoing client use", verifiedThrough,
      background: [
        "DBS announced the Treasury Tokens pilot on August 13, 2024. Its release describes a collaboration with Ant International for multi-currency treasury and liquidity management across group entities, using the bank's permissioned blockchain and an integration with Ant's Whale platform.",
        "The buyer problem is liquidity coordination. A corporate group may have money in the wrong account or entity when another part of the business needs it. Banking windows and fragmented records can make that harder to manage. A new technical transfer path is useful only if it preserves account authority, ownership and the evidence finance teams need.",
        "In October 2024, DBS introduced Token Services as a broader suite and described Treasury Tokens as supporting ongoing Ant intragroup transfers. Its 2024 annual report subsequently identified Ant as an early user. These records provide a progression beyond the pilot announcement without requiring FluidRWA to invent transaction counts or savings.",
        "This case focuses on bank-to-corporate treasury integration. It is distinct from the existing Kinexys repo and Shopify merchant-checkout cases: it concerns movement and visibility of group liquidity, not securities financing or a customer's purchase. The categories overlap technologically, but the operating obligations differ."
      ],
      operatingModel: [
        { title: "1. Define the corporate entity and account map", detail: "The disclosed use is intragroup treasury. FluidRWA recommends starting with legal entities, account owners, approved currencies and authority limits. A group dashboard should not obscure the fact that balances may belong to different entities with different obligations." },
        { title: "2. Connect bank and treasury infrastructure", detail: "DBS's pilot announcement describes an EVM-compatible permissioned ledger linked to its core payment engine and Ant's Whale platform. Permissioned access and bank control are intentional features. EVM compatibility does not make the service open to anonymous wallets or every public network." },
        { title: "3. Execute a supported liquidity instruction", detail: "The bank describes around-the-clock multi-currency intragroup settlement. For buyers, the key test is the exact supported instruction: source account, destination account, amount, currency and required approvals. A general 24/7 service description is not proof that every external rail has the same availability." },
        { title: "4. Reconcile the result and handle exceptions", detail: "FluidRWA recommends matching the treasury instruction to the bank's final state and the group's accounting records. Tests should include insufficient funds, a held destination and an ambiguous acknowledgement. These are proposed buyer tests, not publicly confirmed details of Ant's confidential control environment." }
      ],
      milestones: [
        { date: "August 13, 2024", title: "Ant pilot announced", detail: "DBS announced Treasury Tokens with Ant International and integration with the Whale treasury platform." },
        { date: "October 18, 2024", title: "Token Services introduced", detail: "DBS's broader suite announcement described ongoing Ant intragroup transfers supported by Treasury Tokens." },
        { date: "2024 annual report", title: "Client use recorded", detail: "The Institutional Banking section names Ant as an early user of multi-currency treasury and liquidity management." },
        { date: "2025 public bank profile", title: "Continued service description", detail: "DBS's public profile described the corporate intragroup use after the original pilot. No new client-level volume figure is asserted." },
        { date: "October 12, 2026", title: "Research cut-off", detail: "The launch records, annual report and subsequent bank description were rechecked. This review date does not imply a newly announced 2026 deployment." }
      ],
      outcomes: [
        { value: "Named client", label: "Ant International use disclosed", context: "DBS's annual report identifies an early user. This is stronger evidence than an unnamed hypothetical workflow, but remains bank-reported." },
        { value: "24/7", label: "Supported workflow described", context: "DBS describes around-the-clock intragroup treasury operation. This is not an independently tested uptime figure or universal rail availability." },
        { value: "Not verified", label: "Client-level savings and volumes", context: "The reviewed primary records did not establish audited Ant transaction volumes, capital released or a quantified cost reduction." }
      ],
      updates: [
        "The evidence reviewed supports progression from pilot to ongoing use, rather than only a future intention. The chronology is retained so the original pilot is not mislabeled as a broad commercial rollout.",
        "DBS Token Services includes other named solutions such as Conditional Payments and Programmable Rewards. Their features and results are not attributed to the Ant treasury use case.",
        "No verified 2026 Ant-specific volume or savings disclosure was established in this research. Buyers should ask for current deployment evidence rather than treat the review date as a new performance milestone."
      ],
      successFactors: [
        "FluidRWA interpretation: connecting the service to an existing treasury platform gives operations teams a defined workflow rather than a separate token dashboard.",
        "A bank-controlled environment can make account and permission responsibilities clearer, while concentrating dependency on that bank's access, service rules and recovery processes.",
        "A named corporate use case lets buyers ask specific integration questions. It does not remove the need to validate a different company's currencies, markets and legal entities.",
        "The progression from pilot to reported ongoing use is meaningful evidence, but mature procurement still needs support terms, exportability, recovery drills and client-specific acceptance criteria."
      ],
      limitations: [
        "The evidence is authored by DBS. FluidRWA has not independently audited Ant's operations, savings or service reliability.",
        "No automatic equivalence to a CBDC, unrestricted stablecoin or universally transferable deposit claim is asserted.",
        "The stated multi-currency treasury model must not be generalized to all external counterparties or banking markets.",
        "Technology does not remove bank credit exposure, treasury governance, currency risk or jurisdiction-specific constraints."
      ],
      sourceRecords: [
        "DBS: Treasury Tokens pilot with Ant International, August 13, 2024. https://www.dbs.com/newsroom/DBS_launches_blockchain_powered_Treasury_Tokens_pilot_with_Ant_International_for_247_treasury_and_liquidity_management",
        "DBS: Token Services launch and ongoing intragroup transfer description, October 18, 2024. https://www.dbs.com/newsroom/DBS_rolls_out_blockchain_powered_banking_for_institutions_with_DBS_Token_Services_marks_new_milestone_in_financial_services",
        "DBS Annual Report 2024: Institutional Banking, early-adopter disclosure. https://www.dbs.com/annualreports/2024/institutional-banking.html",
        "DBS: public 2025 bank profile discussing Token Services, reviewed October 12, 2026. https://www.dbs.com/about-us/who-we-are/awards-accolades/a-world-first/euromoney-worlds-best-bank-2025"
      ]
    }
  }
];
