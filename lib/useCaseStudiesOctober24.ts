import type { UseCase } from "./useCases";
import type { UseCaseGuide } from "./useCaseGuides";

const updatedAt = "2026-10-24";
const verifiedThrough = "October 24, 2026";

function guide(title: string, slug: string, answer: string, audience: string, questions: string[], faqs: UseCaseGuide["faqs"]): UseCaseGuide {
  return {
    title, answer, audience, questions, faqs,
    group: "Financial services", workflow: [], controls: [], measures: [], pilot: [],
    notFit: "A documented company implementation is not a universal performance benchmark or an offer of the same legal rights in another product.",
    reference: { label: "FluidRWA primary-source research record", href: `/use-cases/${slug}#sources`, note: "Historical participant and filing evidence, with dates and limits stated in the case." }
  };
}

export const october24CaseStudies: (UseCase & { guide: UseCaseGuide })[] = [
  {
    slug: "figure-heloc-origination-loan-ownership-case-study",
    title: "Figure HELOCs: From Loan Origination to Ownership Records",
    industry: "Documented Private-Credit Case Study", updatedAt,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Illustrative residential property, not a property securing a Figure loan",
    visualLabel: "Documented Lending Workflow", visualKicker: "Figure HELOC",
    summary: "How Figure connects digital home-equity lending, loan records and institutional distribution, and where its blockchain registry fits in the wider lending process.",
    seoDescription: "Figure HELOC case study: digital origination, off-chain documents, Provenance-based DART registry, institutional loan distribution and evidence-based buyer lessons.",
    problem: "A lender can originate a loan digitally yet still lose track of authoritative documents, lien status, transfer history and the party entitled to receive payments when a loan changes hands.",
    stack: ["Borrower application and underwriting", "Property, title and lien checks", "Electronic loan documents and protected file vault", "Loan and lien ownership registry", "Institutional loan marketplace", "Servicing, cash and exception reconciliation"],
    vendorCategories: [
      { label: "Tokenization Platforms", href: "/vendors/tokenization-platforms" },
      { label: "Institutional Digital Asset Trading", href: "/vendors/institutional-digital-asset-trading-platforms" },
      { label: "Physical Asset Verification", href: "/vendors/physical-asset-verification-oracles" }
    ],
    example: "Figure's 2025 securities filing describes its lending system and DART registry, and supplies dated 2024 HELOC-originations data. This page does not turn that historical figure into today's loan balance.",
    guide: guide(
      "Figure HELOCs: what the blockchain record actually changes",
      "figure-heloc-origination-loan-ownership-case-study",
      "Figure's public filing describes a digital HELOC origination system, documents held in a protected off-chain vault, and loan-related records or hashes on Provenance Blockchain. Its DART system tracks lien and eNote ownership changes. The blockchain is one part of a lending operation that still needs underwriting, legal documents, servicing and investor reconciliation.",
      "Consumer lenders, private-credit investors, loan platforms and tokenization teams",
      ["Which electronic record is legally authoritative for the note and lien?", "Where are borrower documents and personal data stored?", "Who corrects an erroneous registry event?", "How does an investor reconcile purchase, servicing and repayment data?", "Which numbers refer to originations rather than outstanding loans?"],
      [
        { q: "Does Figure put every borrower document on a public blockchain?", a: "No. Its 2025 filing describes electronic documents in a protected vault outside Provenance Blockchain and a hash associated with the loan's onchain record. Do not equate the record with publication of the underlying personal information." },
        { q: "Is the recorded loan token the same as legal ownership?", a: "The filing describes technology for loan and ownership tracking. The legal note, lien, transfers and servicing obligations must still be assessed under the transaction documents and applicable law." },
        { q: "What is the $5 billion figure?", a: "Figure's 2025 filing says it facilitated $5 billion in HELOC originations in 2024. It is a historical flow, not a current loan balance, guaranteed throughput or total for all later products." },
        { q: "Can another lender copy this workflow?", a: "The design questions are reusable, but underwriting policy, licensed activities, legal documents, registries and investor arrangements vary. A buyer needs its own legal and operating review." }
      ]
    ),
    caseStudy: {
      company: "Figure Technology Solutions", status: "Operating lending and loan-record infrastructure described in company filings", verifiedThrough,
      background: [
        "A home-equity line of credit is a consumer loan secured by residential property. Faster application software does not remove appraisal or valuation, income and title checks, legal lending duties, servicing or investor recordkeeping.",
        "Figure's 2025 securities filing describes a proprietary loan-origination system, data and documents stored in an electronic vault, and information associated with a loan record on Provenance Blockchain. It says sensitive borrower documents remain outside the public chain. Figure also describes DART, a lien and eNote registry intended to track ownership and changes.",
        "The disclosed architecture is useful because it separates the digital workflow from the physical collateral and the enforceable loan. Its scale disclosures are company-reported historical activity, not an independent audit of each loan or evidence of today's outstanding balance.",
        "FluidRWA's evaluation questions below are proposed controls for another buyer; they are not a claim that Figure's public filing reveals every production exception or legal opinion."
      ],
      operatingModel: [
        { title: "1. Originate and verify", detail: "The lender collects application, income, property and lien information under its credit and consumer-protection processes. Automated capture can shorten a workflow but does not replace underwriting accountability." },
        { title: "2. Preserve the loan documents", detail: "The filing describes a secure electronic vault outside the public chain, with a hash tied to the loan record. Buyers should define who controls originals, corrections, retention and recovery after a system outage." },
        { title: "3. Track ownership and lien state", detail: "DART is described as a registry for lien and eNote information. A prospective investor should reconcile a registry change to the signed sale, legal transfer and servicing instruction, rather than treating one database event as the entire transfer." },
        { title: "4. Distribute and service", detail: "Institutional loan buyers need eligibility, price, payment history, borrower-protection controls and ongoing servicing data. Test how a payment reversal or corrected loan attribute appears across investor records." }
      ],
      milestones: [
        { date: "2018", title: "HELOC product began", detail: "Figure's filing describes its home-equity product as launched in late 2018." },
        { date: "2024", title: "Dated origination activity", detail: "The company reported $5 billion of HELOCs facilitated during calendar 2024; this is originations activity, not current outstanding principal." },
        { date: "March 2025", title: "DART partner announcement", detail: "Figure described the lien and eNote registry and additional industry participation." },
        { date: "2025 securities filing", title: "Architecture disclosed", detail: "The filing describes the loan-origination system, off-chain document vault and onchain record association." }
      ],
      outcomes: [
        { value: "$5B", label: "Company-reported 2024 HELOC originations", context: "Historical flow disclosed in Figure's 2025 filing; not current AUM or verified market share." },
        { value: "Separate", label: "Documents and public-chain record", context: "The filing describes a protected document vault outside the blockchain and an associated onchain hash." },
        { value: "Not established", label: "Independent loss or cost advantage", context: "No controlled peer comparison or current portfolio credit result is inferred from the reviewed records." }
      ],
      updates: ["Figure's public filings provide a more precise record of the document and ledger separation than product marketing alone.", "Later company announcements discuss additional products and distribution arrangements; this case remains scoped to the HELOC and loan-record workflow, not every Figure offering.", "No October 2026 outstanding HELOC balance or current registry adoption rate has been independently verified for this page."],
      successFactors: ["Keep borrower information protected while making approved ownership evidence accessible to relevant parties.", "Reconcile each loan transfer across documents, registry events, investor positions and servicing instructions.", "Date every volume figure and distinguish originations from outstanding principal and from marketplace trading volume.", "Test corrections, rescissions and payment reversals before calling the shared record complete."],
      limitations: ["The architecture and volumes here are disclosed by Figure; FluidRWA has not audited the loan tape or measured default rates.", "A registry entry does not eliminate legal, title, servicing, underwriting or investor-suitability work.", "A home-equity portfolio is exposed to borrower and property risk regardless of the recordkeeping technology."],
      sourceRecords: [
        "Figure: 2025 securities filing, loan-origination, document-vault and Provenance record descriptions; reviewed October 24, 2026. https://investors.figure.com/static-files/5db20221-0091-47fb-9f6b-b170a67854b0",
        "Figure: DART Lien Registry partner announcement, March 5, 2025; reviewed October 24, 2026. https://investors.figure.com/news-releases/news-release-details/figures-dart-lien-registry-attracts-major-partners"
      ]
    }
  },
  {
    slug: "hamilton-lane-scope-tokenized-private-credit-case-study",
    title: "Hamilton Lane SCOPE: A Tokenized Private-Credit Fund",
    industry: "Documented Fund-Operations Case Study", updatedAt,
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Illustrative institutional investment discussion, not a photograph of Hamilton Lane's SCOPE fund operations",
    visualLabel: "Documented Fund Structure", visualKicker: "Hamilton Lane SCOPE",
    summary: "How an evergreen private-credit strategy reached eligible investors through a tokenized feeder, digital subscription and defined redemption procedures.",
    seoDescription: "Hamilton Lane SCOPE case study: tokenized feeder fund, eligible investors, subscriptions, redemption terms, transfer controls and dated primary sources.",
    problem: "A private-credit investor needs a legally defined fund claim, subscription and redemption terms, accounting and servicing. Issuing a token does not create liquidity or remove the manager's investment risk.",
    stack: ["Evergreen underlying credit fund", "Tokenized feeder fund and legal documents", "Qualified-investor onboarding", "Subscription and cash controls", "Digital share record and transfer agency", "NAV, redemption and distribution operations"],
    vendorCategories: [
      { label: "Tokenization Platforms", href: "/vendors/tokenization-platforms" },
      { label: "Fund Administration and Transfer Agents", href: "/vendors/fund-administration-transfer-agents" },
      { label: "Crypto Custody Providers", href: "/vendors/crypto-custody-providers" }
    ],
    example: "Hamilton Lane and Securitize announced the Polygon-based feeder in May 2023 and a TRON expansion in June 2026. Terms described at launch should not be assumed unchanged for every current investor or chain.",
    guide: guide(
      "Hamilton Lane SCOPE: where the tokenized fund share fits",
      "hamilton-lane-scope-tokenized-private-credit-case-study",
      "Hamilton Lane's SCOPE is an underlying private-credit fund. The documented tokenized access route is a feeder structure offered through Securitize for eligible investors. Digital subscription and tokenized shares did not eliminate fund documents, suitability checks, NAV-based redemption terms or portfolio credit risk.",
      "Asset managers, private-credit distributors, fund administrators and institutional investors",
      ["Which entity issues the investor's legal interest?", "How is the feeder's share register reconciled to the underlying fund?", "What does 'on-demand redemption' mean under the offering terms?", "Who can transfer and hold the tokenized share?", "Which terms belong to the 2023 launch versus later chain expansions?"],
      [
        { q: "Is SCOPE itself a cryptocurrency?", a: "No. SCOPE is a private-credit investment strategy. The reviewed announcements concern a feeder fund offering tokenized exposure; the legal interest and underlying assets are defined by fund documents." },
        { q: "Could anyone invest for $10,000?", a: "No. The launch announcement described a reduced minimum for qualified investors through a particular feeder. Eligibility and current terms require confirmation from the offering documents." },
        { q: "Does on-demand redemption guarantee instant cash?", a: "No. The 2023 announcement refers to redemption at the previous quarter's NAV, subject to product terms. Timing, restrictions and liquidity should be read from the applicable documents." },
        { q: "Was it only on Polygon?", a: "The original 2023 feeder announcement described Polygon. A separate 2026 announcement described a TRON launch. Do not treat one date's network description as the permanent product configuration." }
      ]
    ),
    caseStudy: {
      company: "Hamilton Lane / Securitize", status: "Documented tokenized feeder offering with later network expansion", verifiedThrough,
      background: [
        "Private-credit funds own lending exposures and operate through fund governance, valuation, investor records and redemption terms. A token can represent an interest in a feeder vehicle without turning those underlying loans into freely tradable crypto assets.",
        "Hamilton Lane's May 2023 announcement states that a feeder offered tokenized exposure to its Senior Credit Opportunities Fund (SCOPE) through Securitize. It described qualified-investor access, a $10,000 minimum and a fully digital subscription process. Those were launch terms for the stated route, not a promise that every investor or jurisdiction qualifies.",
        "The announcement described redemptions at the previous quarter's NAV through a defined process. That is not an assertion of continuous market liquidity, a guaranteed sale price or immediate settlement in every scenario.",
        "A June 2026 Securitize announcement described HLSCOPE launching on TRON. The case therefore separates launch architecture from later distribution changes rather than quietly presenting a 2023 network statement as current for all versions."
      ],
      operatingModel: [
        { title: "1. Preserve the fund relationship", detail: "An investor's claim is established by the feeder and underlying fund documents. The tokenized record must be reconciled to the legally recognized investor register, not treated as a standalone promise against each loan." },
        { title: "2. Confirm eligibility and subscription", detail: "The offering describes access for qualified investors. A comparable project should test identity, suitability, sanctions, funding receipt, allocation and failed-subscription states before minting a digital share." },
        { title: "3. Manage ownership and custody", detail: "The digital share sits within a controlled operating model. Buyers should identify the transfer agent, permissible holders, custody arrangements and correction authority for any registry mismatch." },
        { title: "4. Process NAV and redemptions", detail: "Redemption depends on the governing terms and an accepted NAV, not merely a token burn. Test a request placed near a valuation cutoff, a delayed calculation and a fund-level liquidity restriction." }
      ],
      milestones: [
        { date: "October 2022", title: "Underlying fund launched", detail: "Hamilton Lane's later announcement identifies the SCOPE strategy's earlier launch." },
        { date: "May 4, 2023", title: "Tokenized feeder announced", detail: "Hamilton Lane described qualified-investor access through Securitize and an initial Polygon-based share representation." },
        { date: "June 2, 2026", title: "Additional network announced", detail: "Securitize announced HLSCOPE on TRON; network expansion does not by itself establish new redemption rights or secondary-market liquidity." },
        { date: verifiedThrough, title: "Research cut-off", detail: "FluidRWA rechecked the issuer and platform announcements; current offering terms still require direct document review." }
      ],
      outcomes: [
        { value: "$10,000", label: "Launch-announcement minimum", context: "The 2023 feeder announcement's stated minimum for eligible investors; verify current offering terms." },
        { value: "Feeder", label: "Documented investor structure", context: "A tokenized feeder interest gives exposure to an underlying fund, not direct ownership of each loan." },
        { value: "Not established", label: "Guaranteed secondary liquidity", context: "The reviewed sources do not show an unconditional public market or instant exit." }
      ],
      updates: ["The later TRON announcement extends the documented network story beyond the original Polygon launch.", "No current AUM, redemption turnaround or investor count is inferred from the launch releases.", "A buyer should obtain today's offering documents and service-level details before relying on a historical minimum or redemption description."],
      successFactors: ["A conventional underlying investment strategy and defined feeder vehicle anchor the digital share.", "Investor eligibility and transfer controls remain part of product distribution.", "Subscription, NAV and redemption records can be evaluated separately from blockchain transaction success.", "The architecture can add networks without assuming the legal claim changes automatically."],
      limitations: ["Private-credit investments retain credit, liquidity and valuation risk.", "Participant announcements are evidence of product positioning, not independent assurance of outcomes.", "Historical minimums and redemption language may not describe every current share class, jurisdiction or investor."],
      sourceRecords: [
        "Hamilton Lane: SCOPE feeder announcement, May 4, 2023; reviewed October 24, 2026. https://www.hamiltonlane.com/en-us/news/scope-available-via-securitize",
        "Securitize: HLSCOPE TRON announcement, June 2, 2026; reviewed October 24, 2026. https://investors.securitize.io/news/news-details/2026/Securitize-Launches-Private-Credit-Fund-on-TRON-Blockchain/default.aspx"
      ]
    }
  }
];
