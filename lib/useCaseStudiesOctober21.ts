import type { UseCase } from "./useCases";
import type { UseCaseGuide } from "./useCaseGuides";

const updatedAt = "2026-10-21";
const verifiedThrough = "October 21, 2026";
function guide(title: string, slug: string, answer: string, audience: string, questions: string[], faqs: UseCaseGuide["faqs"]): UseCaseGuide {
  return { title, answer, audience, questions, faqs, group: "Enterprise operations", workflow: [], controls: [], measures: [], pilot: [], notFit: "A documented implementation does not establish universal eligibility or independently measured commercial returns.", reference: { label: "FluidRWA primary-source research record", href: `/use-cases/${slug}#sources`, note: "Participant and official operating records; historical results retain their original scope and date." } };
}

export const october21CaseStudies: (UseCase & { guide: UseCaseGuide })[] = [
  {
    slug: "eib-project-venus-digital-bond-settlement-case-study",
    title: "EIB Project Venus: Digital Bond Settlement",
    industry: "Documented Capital-Markets Case Study", updatedAt,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Illustrative financial-office buildings, not a photograph of Project Venus or its trading platform",
    visualLabel: "Completed 2022 Issuance", visualKicker: "EIB Project Venus",
    summary: "How the European Investment Bank connected a digital bond and experimental central-bank-money settlement across separate ledgers, and which lessons buyers can reuse.",
    seoDescription: "EIB Project Venus case study: the EUR100 million 2022 digital bond, GS DAP, experimental wholesale CBDC, cross-ledger settlement and implementation lessons.",
    problem: "Putting a bond on a ledger does not by itself coordinate the payment leg, custodian records and underwriting obligations between separate institutions.",
    stack: ["Bond terms and investor records", "Goldman Sachs GS DAP securities platform", "Experimental central-bank-money cash ledger", "Institutional custody and account keeping", "Cross-ledger delivery-versus-payment coordination", "Operational reconciliation and exception controls"],
    vendorCategories: [{ label: "Tokenization Platforms", href: "/vendors/tokenization-platforms" }, { label: "Blockchain Development Companies", href: "/vendors/blockchain-development-companies" }, { label: "Smart Contract Development Companies", href: "/vendors/smart-contract-development-companies" }],
    example: "A completed EUR100 million issuance in November 2022 with a scheduled November 2024 maturity. It is not a current fund-AUM observation or an open retail CBDC service.",
    guide: guide(
      "EIB Project Venus: how a digital bond settled across two ledgers",
      "eib-project-venus-digital-bond-settlement-case-study",
      "Project Venus was a EUR100 million, two-year EIB digital bond priced and settled on November 29, 2022. The securities and experimental central-bank-money legs used separate ledgers. Official records document the completed issuance and same-day settlement; they do not prove that all future bonds settle identically or that the experimental money became a generally available service.",
      "Debt capital markets, bank treasury, securities operations and institutional platform teams",
      ["Which system is authoritative for each cash and securities obligation?", "Who can release or cancel a pending settlement?", "What happens when one ledger is available and the other is not?", "Which custody and accounting records prove the final outcome?", "What does the contract promise beyond a technical demonstration?"],
      [
        { q: "How large was Project Venus?", a: "The EIB reported a EUR100 million, two-year bond priced and settled on November 29, 2022, with a scheduled maturity of November 29, 2024. Those are historical transaction terms, not a current outstanding-value measurement." },
        { q: "Did investors need cryptocurrency to buy the bond?", a: "The EIB release says investors paid traditional currency. The underwriting settlement used a tokenized representation of central bank money in an experimental arrangement. These are different legs of the transaction." },
        { q: "Was the cash and bond on the same blockchain?", a: "The official technical report describes separate cash and securities DLTs, linked through a hashed-timelock-contract mechanism for coordinated delivery versus payment." },
        { q: "Does T+0 prove lower total issuance cost?", a: "No. Same-day settlement is a timing result. The reviewed records do not provide a controlled end-to-end cost comparison against an otherwise identical conventional bond." }
      ]
    ),
    caseStudy: {
      company: "European Investment Bank / Goldman Sachs / participating central banks",
      status: "Completed historical bond issuance with experimental wholesale-money settlement", verifiedThrough,
      background: [
        "Bond issuance coordinates a legal obligation, a securities record, an allocation process and cash. Digital issuance can change the recordkeeping and message flow, but it does not eliminate the need to identify who owes money, who owns a security and which institution can confirm completion.",
        "The EIB's November 2022 disclosure identifies Project Venus and records the transaction's size, date and contractual tenor. The central-bank technical report provides a separate account of the cash and securities interaction. Together they support a bounded implementation case rather than a forecast of an entire digital-bond market.",
        "The important architectural distinction is between the investor's purchase and the syndicate's settlement to the issuer. A simplified story that every investor paid in a central-bank token would erase that distinction. Buyers should preserve the transaction's actual parties and obligations when using the case as a reference.",
        "FluidRWA's analysis focuses on how to evaluate that coordination in another project. Recommendations about failure testing, evidence retention and operating ownership below are buyer guidance; they are not claims about confidential procedures inside the EIB or its counterparties."
      ],
      operatingModel: [
        { title: "1. Define the instrument and allocations", detail: "The issuer and syndicate first need an agreed security and allocation record. For a comparable procurement, FluidRWA recommends versioning the final terms, investor identifiers and authority to amend an allocation. A token identifier alone cannot describe every legal or commercial condition attached to a bond." },
        { title: "2. Separate investor payment from issuer settlement", detail: "Map the investor payment obligation independently from the underwriting cash leg. Require a named reconciliation owner for both. A product demonstration should show which account or ledger state counts as funded and who handles a bank transfer that arrives late or with an unusable reference." },
        { title: "3. Coordinate securities delivery and cash", detail: "The official report documents separate ledgers and an HTLC-based interoperability mechanism. The reusable buyer question is not whether to copy one mechanism blindly: it is what each party can prove if the coordinated transaction expires or only one system acknowledges progress. Test that scenario before accepting an atomic-settlement claim." },
        { title: "4. Reconcile institutional records", detail: "The public transaction involved custody and account-keeping roles as well as a platform operator. A new implementation should reconcile the completed ledger outcome to securities operations, treasury and accounting. Define evidence access after an outage, a provider change or the end of a pilot; do not leave those tasks outside the implementation budget." }
      ],
      milestones: [
        { date: "November 29, 2022", title: "Pricing and settlement recorded", detail: "The EIB's published terms record same-day pricing and settlement for the two-year bond." },
        { date: "2024 technical publication", title: "Cross-ledger design documented", detail: "The central-bank Project Venus report explains the cash and securities ledgers and the coordinated settlement mechanism." },
        { date: "November 29, 2024", title: "Scheduled maturity", detail: "This is the maturity date in the original terms, not a fresh confirmation of redemption processing. No current outstanding balance is inferred." },
        { date: verifiedThrough, title: "Research cut-off", detail: "FluidRWA reviewed the issuer disclosure and official technical report. This review date does not make a 2022 experiment a newly launched 2026 service." }
      ],
      outcomes: [
        { value: "EUR100 million", label: "Historical issue size", context: "EIB transaction terms dated November 2022; not market-wide AUM." },
        { value: "T+0", label: "Reported pricing-to-settlement timing", context: "The published transaction dates coincide. This is not an unconditional latency or cost guarantee." },
        { value: "Not established", label: "Comparable cost reduction", context: "No controlled issuance-cost or operating-savings benchmark is asserted." }
      ],
      updates: ["The original scheduled maturity has passed; the page retains the historical label rather than treating the issue amount as today's outstanding value.", "The official technical record adds detail beyond the launch announcement. It is useful design evidence, but it is not a standing offer of central-bank-token access.", "No subsequent client count, product adoption total or 2026 return on investment is inferred from the historical issuance."],
      successFactors: ["FluidRWA interpretation: a tightly specified instrument and known institutional parties gave the experiment a bounded set of obligations to coordinate.", "Separate cash and securities responsibilities make it possible to ask precise interoperability questions instead of treating tokenization as one undifferentiated process.", "A reusable project should publish its acceptance criteria: completed allocations, matched payments, exception ownership and the records available to each institution.", "Evaluate the conventional alternative using the same legal instrument and service scope. A fair comparison includes integration and support work, not only the chain transaction."],
      limitations: ["The two primary records describe a completed historical issuance, not open access to a live retail investment product.", "Experimental wholesale central-bank money should not be described as a generally available CBDC or commercial stablecoin.", "FluidRWA has not independently audited the transaction, verified maturity processing or measured current platform performance.", "Technical coordination does not on its own establish legal finality, investor eligibility or suitability for another jurisdiction."],
      sourceRecords: ["European Investment Bank: Project Venus issuance announcement and summary terms, November 2022; reviewed October 21, 2026. https://www.eib.org/en/press/all/2022-448-eib-innovates-further-with-project-venus-the-first-euro-denominated-digital-bond-on-a-private-blockchain", "Banque de France / Banque centrale du Luxembourg: Project Venus technical report, copyright 2024, executive summary and cash/securities flows; reviewed October 21, 2026. https://www.bcl.lu/fr/Recherche/publications/technicalpapers/Projet-VENUS.pdf"]
    }
  },
  {
    slug: "unhcr-stellar-moneygram-usdc-cash-assistance-case-study",
    title: "UNHCR, Stellar and MoneyGram: USDC Cash Assistance",
    industry: "Documented Humanitarian Payments Case Study", updatedAt,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Illustrative payment interaction, not a photograph of an aid recipient or UNHCR's distribution process",
    visualLabel: "Documented Aid Workflow", visualKicker: "UNHCR / Stellar / MoneyGram",
    summary: "How a documented Ukraine aid program connects eligibility, a digital wallet, USDC distribution and local cash access, without confusing blockchain delivery with completed assistance.",
    seoDescription: "UNHCR Stellar MoneyGram case study: Ukraine USDC aid distribution, wallet onboarding, cash withdrawal, primary evidence, privacy and implementation lessons.",
    problem: "Delivering digital value is not enough if a recipient cannot complete onboarding, recover access or obtain usable local money safely.",
    stack: ["Recipient eligibility and consent", "Wallet onboarding and account matching", "Stellar-based USDC distribution", "Bulk disbursement monitoring", "MoneyGram cash withdrawal", "Recipient support and program reconciliation"],
    vendorCategories: [{ label: "Fiat On/Off-Ramp Providers", href: "/vendors/fiat-on-off-ramp-providers" }, { label: "KYC and AML Providers", href: "/vendors/kyc-aml-providers" }, { label: "Blockchain Development Companies", href: "/vendors/blockchain-development-companies" }],
    example: "UNHCR announced the Ukraine pilot in December 2022. Public recipient instructions reviewed in October 2026 still describe a wallet and money-transfer path, alongside other payment methods. No current blockchain-specific beneficiary total is asserted.",
    guide: guide(
      "UNHCR and MoneyGram: how USDC aid reaches a cash withdrawal",
      "unhcr-stellar-moneygram-usdc-cash-assistance-case-study",
      "UNHCR's December 2022 Ukraine pilot used USDC on Stellar, a recipient wallet and MoneyGram cash access. The practical lesson is to measure the complete assistance journey, not only the chain transfer. Current UNHCR help instructions describe a Vibrant wallet and cash-out process; another participant page uses a different wallet name, so the reviewed public records do not establish a universal current wallet configuration.",
      "Aid organizations, mass-payout providers, fintechs and treasury teams designing last-mile payments",
      ["How is the intended recipient matched to the wallet?", "What happens when a phone number or identity record changes?", "Can the person actually reach a supported cash-out location?", "Which record proves receipt of usable money rather than a token transfer?", "Which personal details can be kept off a public ledger?"],
      [
        { q: "Was this a real aid-distribution program?", a: "UNHCR announced the Ukraine pilot on December 15, 2022 and its recipient help page describes a digital-wallet and money-transfer process. These are participant and operating records, not an independently audited effectiveness study." },
        { q: "Did recipients need a bank account?", a: "The documented wallet-to-MoneyGram route offers cash access rather than requiring a bank payout. Recipients still need to satisfy the program, wallet and cash-out requirements; a smartphone and identity checks remain relevant." },
        { q: "Is a successful blockchain payment the final outcome?", a: "Not necessarily. A recipient may still need to access the wallet and complete a supported withdrawal. Program teams should measure usable receipt and support outcomes separately from ledger confirmation." },
        { q: "How many people currently receive aid through this rail?", a: "No current rail-specific beneficiary count or transaction total was established in the records reviewed. Whole-program cash-assistance statistics must not be attributed to the blockchain route." }
      ]
    ),
    caseStudy: {
      company: "UNHCR / Stellar Development Foundation / MoneyGram",
      status: "Documented pilot and published recipient workflow; current rail-specific scale not established", verifiedThrough,
      background: ["Cash assistance gives recipients discretion over their own needs. A distribution system must combine program eligibility, a usable payment method and support for people facing practical barriers. The success criterion is access to assistance, not adoption of a particular token.", "The 2022 UNHCR launch record describes the Ukraine pilot's USDC, Stellar, wallet and cash-out components. Its geographic and outlet figures belong to that announcement. This case does not repeat them as current coverage or assume every listed outlet has cash available today.", "UNHCR's recipient help page provides more useful operational detail than a generic claim about instant global payments. It describes account matching and cash collection steps, while also listing non-blockchain payment methods. That is evidence of a multi-channel program rather than a claim that all UNHCR cash runs through a blockchain.", "For another organization, the architecture should start with recipient choice, access and protection. FluidRWA's control recommendations below are proposed evaluation criteria, not a description of undisclosed UNHCR security procedures or a recommendation to replace an existing assistance channel."],
      operatingModel: [
        { title: "1. Confirm eligibility and match the account", detail: "The UNHCR instructions connect program registration with wallet onboarding. A comparable project should reconcile the intended recipient and payment destination without publishing unnecessary identifying information. Test a changed number, an incorrect registration detail and a recipient who cannot complete the digital journey." },
        { title: "2. Distribute and monitor digital value", detail: "The participant records describe USDC transfers using Stellar infrastructure. Program monitoring should distinguish a scheduled payment, a confirmed transfer and a recipient-access problem. An onchain confirmation cannot by itself demonstrate that the correct person controls a usable account." },
        { title: "3. Provide a workable cash-out route", detail: "UNHCR's help instructions describe withdrawal references, identity presentation and checking outlet availability. For procurement, test the recipient's full journey under realistic connectivity, travel and service conditions. A provider's network map is not evidence that one recipient can complete a withdrawal at a particular time." },
        { title: "4. Resolve exceptions and reconcile assistance", detail: "Assign support ownership for an onboarding failure, inaccessible wallet and cash-out problem. Retain a program-level reference that links the obligation, digital transfer and final support outcome. Do not duplicate a payment merely because a person reports difficulty; investigate the prior state and safeguard their personal information." }
      ],
      milestones: [
        { date: "December 15, 2022", title: "Ukraine pilot announced", detail: "UNHCR published the pilot's digital distribution and cash-access model." },
        { date: "Participant implementation account", title: "Bulk disbursement infrastructure described", detail: "Stellar's case study describes the disbursement platform and monitoring layer. It is participant evidence, not independent assurance." },
        { date: "Public recipient help reviewed in 2026", title: "Practical withdrawal instructions available", detail: "UNHCR help describes a wallet-to-cash path as one of several assistance methods. An undated help page is not a new launch announcement." },
        { date: verifiedThrough, title: "Research cut-off and discrepancy recorded", detail: "Wallet naming differs between the participant case study and UNHCR recipient instructions. FluidRWA does not silently treat the names as an established migration or a single current configuration." }
      ],
      outcomes: [
        { value: "Documented", label: "USDC-to-cash assistance path", context: "The UNHCR announcement establishes the historical pilot and its intended operating model." },
        { value: "Multiple channels", label: "Recipient payment options", context: "The current help page also lists bank and money-transfer routes. Whole-program results cannot be assigned to one rail." },
        { value: "Not established", label: "Current rail-specific volume", context: "No contemporary audited beneficiary total, cost reduction or guaranteed cash-out time is asserted." }
      ],
      updates: ["UNHCR's reviewed help page names Vibrant, whereas Stellar's current case study names Vesseo. Deployment teams should confirm the actual contracted wallet rather than infer a rebrand or migration.", "Recipient instructions include contacting a cash-out location to check availability. This is why local delivery readiness must remain part of a supposedly digital payment project.", "No new 2026 deployment, geographic expansion or replacement of conventional assistance is claimed from the continued presence of public documentation."],
      successFactors: ["FluidRWA interpretation: linking a digital balance to a familiar cash-access channel gives the architecture a concrete recipient task.", "Programs can evaluate the digital rail alongside existing channels rather than make wallet adoption a condition of measuring success.", "A fair pilot measures eligible recipients paid, usable money received, unresolved support cases and total delivery cost, including cash-out and staff effort.", "Keep sensitive personal data and payment analytics under an explicit access and retention policy. Public transfer visibility should not become unnecessary disclosure of recipient identity or circumstances."],
      limitations: ["Public documentation establishes a described workflow, not universal service availability or an independently verified service-level agreement.", "Historical outlet counts and broad aid totals are not current blockchain-specific performance metrics.", "Wallet-provider names conflict in the reviewed participant records; current configuration remains subject to direct confirmation.", "FluidRWA did not enroll a recipient, test a withdrawal or audit program effectiveness. A stablecoin's design does not remove issuer, operational or local cash-access risk."],
      sourceRecords: ["UNHCR Ukraine: pilot launch announcement, December 15, 2022; reviewed October 21, 2026. https://www.unhcr.org/ua/en/news/unhcr-launches-pilot-cash-based-intervention-using-blockchain-technology-humanitarian-payments", "UNHCR Ukraine Help: Cash Assistance Payment method, digital wallet and money-transfer section; undated operating page reviewed October 21, 2026. https://help.unhcr.org/ukraine/cash-assistance-payment-method/", "Stellar Development Foundation: How UNHCR Distributes Cash Assistance Through Stellar Aid Assist; participant case study reviewed October 21, 2026. https://stellar.org/case-studies/unhcr"]
    }
  }
];
