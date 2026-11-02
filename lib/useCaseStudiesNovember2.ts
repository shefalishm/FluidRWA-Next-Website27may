import type { UseCase } from "./useCases";
import type { UseCaseGuide } from "./useCaseGuides";

const slug = "hsbc-gold-token-retail-ownership-case-study";
const title = "HSBC Gold Token: Retail Ownership Within Bank Controls";
const answer = "HSBC brought tokenized gold to Hong Kong retail customers in March 2024 through its banking channels and Orion platform. The implementation lesson is the combination of a digital ownership record, physical custody and a familiar customer account. It is not evidence of unrestricted trading, physical redemption or lower operating costs.";

export const november2CaseStudies: (UseCase & { guide: UseCaseGuide })[] = [{
  slug, title, industry: "Documented Tokenized-Gold Case Study", updatedAt: "2026-11-02",
  image: "/assets/blog-thumbnails/hsbc-gold-november2.webp",
  imageAlt: "Illustrative gold bullion and digital records, not an HSBC vault or product screenshot",
  visualLabel: "Gold and Its Record", visualKicker: "HSBC Gold Token",
  summary: "How HSBC connected tokenized gold to retail banking, and why custody, exit rights and customer controls still matter.",
  seoDescription: "HSBC Gold Token case study: March 2024 retail launch, Orion, custody and redemption limits, documented milestones and buyer lessons.",
  problem: "A digital gold balance needs an enforceable asset relationship, custody and a practical exit. A token alone does not establish those arrangements.",
  stack: ["Product terms and eligibility", "Physical gold custody", "Orion digital record", "Banking-channel access", "Order authorization", "Asset reconciliation"],
  vendorCategories: [{ label: "Tokenization Platforms", href: "/vendors/tokenization-platforms" }, { label: "Crypto Custody Providers", href: "/vendors/crypto-custody-providers" }],
  example: "The retail launch is a documented deployment. A later quantum-security trial is a separate milestone, not evidence that every production transaction uses that protection.",
  guide: {
    title, answer, group: "Financial services", audience: "Bank product, precious-metals, custody and tokenization teams",
    workflow: [], controls: [], measures: [], pilot: [],
    notFit: "Do not infer open-market transferability or physical delivery from a digital ownership record.",
    questions: ["What does the record legally represent?", "Who reconciles the metal?", "Which exit routes are permitted?", "What happens during an outage?"],
    reference: { label: "Primary-source research record", href: `/use-cases/${slug}#sources`, note: "HSBC disclosures are distinguished from FluidRWA analysis." },
    faqs: [
      { q: "Was this only a pilot?", a: "HSBC announced a retail launch in March 2024. Its September 2024 quantum-security work was a separate trial." },
      { q: "Does tokenization guarantee liquidity?", a: "No. Exit routes, prices and counterparties depend on product terms, not the existence of a ledger record." },
      { q: "Is this a recommendation to buy gold?", a: "No. This is an operating-model case study, not investment advice or an endorsement." }
    ]
  },
  caseStudy: {
    company: "HSBC", status: "Retail product launched; separate security trial reported", verifiedThrough: "November 2, 2026",
    background: [
      "HSBC's 27 March 2024 release introduced a gold token for Hong Kong retail customers through online and mobile banking. It identifies Orion as the platform and describes this as the first retail investment use of the bank's private distributed ledger.",
      "The current product page describes fractional gold ownership, bank-vault custody and a distributed-ledger record. Customers cannot take physical delivery. It states that there is no market for trading the tokens; investors generally exit by selling back to the bank at its price, including its margin.",
      "This is a useful product-design distinction: a digital record need not be an unrestricted bearer instrument. The controls below are FluidRWA's proposed diligence, not a reconstruction of HSBC's internal processes."
    ],
    operatingModel: [
      { title: "1. Define the asset relationship", detail: "For a comparable implementation, agree what the customer owns, which documents govern the claim and how the digital balance relates to the metal. A token symbol cannot replace a product-rights analysis." },
      { title: "2. Connect custody and records", detail: "Require reconciliation between customer balances, the register and the custodian's inventory. Assign correction authority and investigate missing or duplicate entries before closing the books." },
      { title: "3. Design the customer journey", detail: "HSBC used established banking channels. Another bank should test onboarding, order confirmation, account recovery and interruptions between authorization and completion with its own users." },
      { title: "4. Make the exit explicit", detail: "Establish which routes discharge the investment, who quotes the price and what happens during an outage. Test cancellation, delayed completion and an unavailable counterparty, not only a successful purchase." }
    ],
    milestones: [
      { date: "27 March 2024", title: "Retail launch", detail: "HSBC announced Hong Kong retail distribution through online and mobile banking, supported by Orion." },
      { date: "19 September 2024", title: "Separate security trial", detail: "HSBC reported testing quantum-safe technology for tokenized gold transactions and post-quantum interoperability across distributed ledgers." },
      { date: "2 November 2026", title: "Evidence review", detail: "FluidRWA checked the launch, security announcement and product information. No independent adoption or cost series was established." }
    ],
    outcomes: [
      { value: "Launched", label: "Retail distribution", context: "Bank-reported deployment, not an audited adoption count." },
      { value: "Bank channels", label: "Customer access", context: "Online and mobile banking featured in the launch." },
      { value: "Not established", label: "Cost savings", context: "No controlled operating-cost comparison was found in the reviewed evidence." }
    ],
    updates: ["Product terms remain essential: physical custody does not imply a delivery right.", "The security trial remains distinct from production deployment and measured customer outcomes."],
    successFactors: ["Define rights and exit conditions before selecting a ledger.", "Reconcile physical assets, digital records and customer accounts.", "Test account recovery and transaction failures.", "Measure exceptions and total work alongside completed orders."],
    limitations: ["The evidence is HSBC's disclosures, not an independent custody or technology audit.", "No current customer total, assets-under-management figure or cost reduction is inferred.", "Access and rights depend on eligibility and applicable documents.", "Nothing here establishes unrestricted wallet transfer, guaranteed liquidity or principal protection."],
    sourceRecords: [
      "HSBC: Introducing the HSBC Gold Token to retail customers in Hong Kong, 27 March 2024; reviewed 2 November 2026. https://www.about.hsbc.com.hk/-/media/hong-kong/en/news-and-media/240412-introducing-hsbc-gold-token-en.pdf",
      "HSBC Hong Kong: HSBC Gold Token product information and risk disclosures, undated live page; reviewed 2 November 2026. https://www.hsbc.com.hk/investments/products/gold-token/",
      "HSBC: HSBC pilots quantum-safe technology for tokenised gold, 19 September 2024; reviewed 2 November 2026. https://www.hsbc.com/news-and-views/news/media-releases/2024/hsbc-pilots-quantum-safe-technology-for-tokenised-gold"
    ]
  }
}];
