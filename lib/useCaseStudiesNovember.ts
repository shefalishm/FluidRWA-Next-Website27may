import type { UseCase } from "./useCases";
import type { UseCaseGuide } from "./useCaseGuides";

type Study = UseCase & { guide: UseCaseGuide };
type Input = Omit<UseCase, "caseStudy" | "updatedAt" | "example"> & {
  caseStudy: Omit<NonNullable<UseCase["caseStudy"]>, "verifiedThrough">;
  audience: string;
  questions: string[];
  faqs: UseCaseGuide["faqs"];
};

function study({ audience, questions, faqs, caseStudy, ...item }: Input): Study {
  return {
    ...item,
    updatedAt: "2026-11-09",
    example: item.summary,
    caseStudy: { ...caseStudy, verifiedThrough: "November 9, 2026" },
    guide: {
      title: item.title, answer: item.summary, audience, questions, faqs,
      group: "Financial services",
      workflow: [], controls: [], measures: [], pilot: [],
      notFit: caseStudy.limitations[0],
      reference: { label: "Research record", href: `/use-cases/${item.slug}#sources`, note: "Dated public records." },
    },
  };
}

const tokenization = { label: "Tokenization platforms", href: "/vendors/tokenization-platforms" };
const development = { label: "Blockchain development companies", href: "/vendors/blockchain-development-companies" };

export const novemberCaseStudies = [
  study({
    slug: "walmart-canada-blockchain-freight-invoice-reconciliation",
    title: "How Walmart Canada Used Blockchain to Reconcile Freight Invoices",
    industry: "Retail and logistics",
    image: "https://images.unsplash.com/photo-1501700493788-fa1a4fc9fe62?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Illustrative freight transport scene",
    visualKicker: "Walmart Canada", visualLabel: "Production launch documented",
    summary: "Walmart Canada and DLT Labs launched a shared freight and invoicing network in 2019 so the retailer and its carriers could reconcile charges using the same shipment records.",
    problem: "A delivered load can still produce a disputed invoice when the carrier and retailer calculate charges from different records.",
    stack: ["Shipment and rate records", "Permissioned shared ledger", "Invoice reconciliation", "Exception review"],
    vendorCategories: [development],
    audience: "Logistics and accounts-payable teams",
    questions: ["Which record decides a disputed charge, and who can correct it?", "Can we replay a duplicate invoice, a disputed surcharge and a missing delivery event in the pilot?", "Can each carrier see its own evidence without seeing a competitor's rates?"],
    faqs: [
      { q: "Did the network pay carriers in cryptocurrency?", a: "The case documents a shared freight and invoicing workflow. It does not establish that carriers were paid in cryptocurrency." },
      { q: "Does a shared ledger eliminate disputes?", a: "No. A shared history makes differences easier to trace, but the parties still need to resolve incorrect inputs and disagreements about contract terms." },
    ],
    caseStudy: {
      company: "Walmart Canada and DLT Labs",
      status: "Production launch documented in 2019",
      background: [
        "Freight charges can depend on more than the trip itself. Fuel surcharges, waiting time and other adjustments can change the amount owed. If the parties capture those events differently, the finance team has to reconcile them before approving payment.",
        "Walmart Canada and DLT Labs focused on the records used to calculate and reconcile the invoice. Their production launch announcement identified Bison Transport as a participant and described a network spanning Walmart Canada's third-party carrier relationships.",
      ],
      operatingModel: [
        { title: "Capture the shipment and its charges", detail: "The workflow brings shipment events and contracted rate information together so that both parties can trace how the invoice was calculated." },
        { title: "Reconcile against a common record", detail: "The Hyperledger Fabric implementation provides a permissioned shared record. For a buyer, the key integration is how shipment IDs and charge lines match records in the carrier and retailer systems." },
        { title: "Resolve the exceptions", detail: "An incorrect delivery timestamp is still incorrect on a shared ledger. A production design needs a named owner for disputes and an authorized correction process that preserves the original entry." },
      ],
      milestones: [{ date: "November 2019", title: "Production network announced", detail: "Walmart Canada and DLT Labs announced the freight and payment workflow, with Bison Transport named in the announcement." }],
      outcomes: [{ value: "70", label: "Third-party trucking companies in the announced network scope", context: "The launch announcement's scope is not a current active-carrier count or a measure of savings." }],
      updates: ["The Hyperledger Fabric case study describes the implementation. The cited records do not establish current carrier participation or current dispute rates."],
      successFactors: ["Measure disputed invoice lines and time to approval before changing the workflow. Compare like-for-like carrier lanes in the pilot.", "Give carriers and accounts payable access to the evidence they need before automating approvals."],
      limitations: ["The sources do not establish independently audited savings or current network participation.", "A shared database may be enough where one organization owns the entire workflow and all parties already trust its records."],
      sourceRecords: [
        "Walmart Canada and DLT Labs, joint production launch announcement, November 2019: https://www.newswire.ca/news-releases/walmart-canada-and-dlt-labs-tm-launch-world-s-largest-full-production-blockchain-solution-for-industrial-application-857165201.html",
        "LF Decentralized Trust, DLT Labs and Walmart Canada implementation case study: https://www.lfdecentralizedtrust.org/case-studies/dltlabs-case-study",
      ],
    },
  }),
  study({
    slug: "eib-ethereum-digital-bond-case-study",
    title: "How the European Investment Bank Issued a EUR 100 Million Digital Bond on Ethereum",
    industry: "Debt capital markets",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Illustrative financial district, not European Investment Bank premises",
    visualKicker: "European Investment Bank", visualLabel: "Completed issuance",
    summary: "The European Investment Bank issued a EUR 100 million digital bond in April 2021 on Ethereum. The bond record and the cash used for settlement were separate parts of the transaction.",
    problem: "An issuer can put a bond record onchain, but it still needs a workable way to deliver securities, receive cash and service the debt.",
    stack: ["Digital bond issuance", "Public Ethereum", "Bank-led distribution", "Experimental central bank money for settlement"],
    vendorCategories: [tokenization, { label: "Fund administration and transfer agents", href: "/vendors/fund-administration-transfer-agents" }],
    audience: "Debt capital markets and issuance teams",
    questions: ["Which record is authoritative if the chain and the servicing system disagree?", "What cash instrument settles the issuance and who can hold it?", "Who handles failed settlement, investor records and redemption?"],
    faqs: [
      { q: "Was the bond denominated in ether?", a: "No. It was denominated in euros. Ethereum was used for the digital bond record." },
      { q: "Did the EIB use the same infrastructure for its next euro digital bond?", a: "No. The EIB's financial report describes its second euro digital bond in 2022 as its first on private blockchain infrastructure." },
    ],
    caseStudy: {
      company: "European Investment Bank",
      status: "Completed transaction; further issuances documented",
      background: [
        "A bond gives its holders a claim on the issuer. Recording it on Ethereum does not turn the debt into ether or make it available to anyone with a wallet.",
        "The EIB worked with Goldman Sachs, Santander and Societe Generale on the issuance. The Banque de France was involved in the experimental digital cash settlement. Keeping those roles separate helps explain what the transaction actually tested.",
      ],
      operatingModel: [
        { title: "Issue the security", detail: "The EIB issued a euro-denominated bond using Ethereum for the digital securities record. The banks arranged the transaction." },
        { title: "Settle the proceeds", detail: "The EIB describes settlement of the issue proceeds from the joint lead managers using a representation of central bank money. That describes a specific cash leg, not a claim that all secondary trades settled this way." },
        { title: "Plan for the life of the bond", detail: "An issuer evaluating a similar arrangement should document how servicing and redemption work, including who can intervene if the cash and securities records do not match." },
      ],
      milestones: [
        { date: "April 2021", title: "First EIB digital bond on a public blockchain", detail: "The EIB launched the EUR 100 million issuance with a two-year term." },
        { date: "2022", title: "Second euro digital bond used private infrastructure", detail: "The EIB's 2024 financial report identifies the second euro digital issuance as its first using private blockchain technology." },
      ],
      outcomes: [{ value: "EUR 100M", label: "Principal amount of the first issuance", context: "This is the amount of the April 2021 bond, not a measure of outstanding digital debt today." }],
      updates: ["The EIB's 2024 financial report records a sequence of digital issuance projects beyond the initial public-chain transaction. It does not establish that one ledger model replaced the other."],
      successFactors: ["Specify the securities and cash legs separately before comparing infrastructure.", "Have the issuer and servicing parties walk through the same failure scenario, including what evidence confirms that both legs have settled."],
      limitations: ["A completed issuance does not demonstrate cheaper execution, deeper secondary liquidity or suitability for another issuer.", "The experimental central bank money used in this transaction is not proof of general access to that settlement arrangement."],
      sourceRecords: [
        "European Investment Bank, first digital bond announcement, April 2021: https://www.eib.org/en/press/all/2021-141-european-investment-bank-eib-issues-its-first-ever-digital-bond-on-a-public-blockchain",
        "European Investment Bank, Financial Report 2024, discussion of digital bond activity: https://www.eib.org/attachments/lucalli/20240237_070525_financial_report_2024_en.pdf",
      ],
    },
  }),
  study({
    slug: "siemens-kinexys-programmable-treasury-cash-sweeps",
    title: "How Siemens Automated Treasury Cash Sweeps With J.P. Morgan Kinexys",
    industry: "Corporate treasury",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Illustrative treasury team reviewing financial records",
    visualKicker: "Siemens Treasury", visualLabel: "Bank-documented workflow",
    summary: "Siemens and J.P. Morgan tested programmable payments for treasury. Later bank materials describe Siemens using rules to automate cash allocation, intercompany funding and liquidity concentration.",
    problem: "A group can have cash available overall but still leave an operating account short at the moment it needs to make a payment.",
    stack: ["Bank payment accounts", "Balance and payment data", "Rules-based transfers", "Treasury reconciliation"],
    vendorCategories: [development, { label: "Stablecoin infrastructure providers", href: "/vendors/stablecoin-infrastructure-providers" }],
    audience: "Corporate treasury and payments teams",
    questions: ["What happens when an account needs funding but the source account is also below target?", "Who can pause or change a rule, and can we retrieve the history of those changes?", "How will the treasury system reconcile both sides of a sweep and escalate a missing confirmation?"],
    faqs: [
      { q: "What is a cash sweep?", a: "A cash sweep moves money between accounts under a defined rule, for example to concentrate surplus balances or fund an account that has fallen below its target." },
      { q: "Is this the same as a public stablecoin payout?", a: "No. The cited case concerns programmable payments in a bank environment and movements between treasury accounts." },
    ],
    caseStudy: {
      company: "Siemens and J.P. Morgan",
      status: "Proof of concept followed by bank-documented treasury workflows",
      background: [
        "A treasury team can schedule transfers, but the schedule does not know when an outgoing payment arrives early or an expected receipt is late. A balance rule can make the funding decision when the account actually needs it.",
        "The first public account described a proof of concept. Later J.P. Morgan material describes a broader Siemens treasury workflow. The two records support different conclusions: one documents a test; the other describes reported operational use.",
      ],
      operatingModel: [
        { title: "Set the balance rule", detail: "Treasury defines what the account should hold and which accounts may supply funds. The bank-side workflow can execute preconfigured transfers when the relevant condition is met." },
        { title: "Move funds and capture the result", detail: "J.P. Morgan describes API access to account or payment information. An implementation should match the sending and receiving records before treating a sweep as reconciled." },
        { title: "Keep a manual path for exceptions", detail: "For a procurement test, try stale balances, a duplicate trigger and an unavailable funding account. Ask who sees the exception, who can stop retries and what the audit record contains." },
      ],
      milestones: [
        { date: "2021", title: "Proof of concept reported", detail: "J.P. Morgan described a programmable treasury payment test with Siemens." },
        { date: "2024", title: "Treasury example documented in joint research", detail: "J.P. Morgan and MIT DCI discussed programmable payments and maintaining target balances in a bank environment." },
      ],
      outcomes: [{ value: "Target balance", label: "Treasury objective documented in the case", context: "The published materials describe the workflow, not an independently audited savings figure." }],
      updates: ["J.P. Morgan's Siemens treasury case describes cross-border sweeping and EUR/USD foreign exchange in the broader treasury setup. Scope should be checked by entity, currency and account."],
      successFactors: ["Start with one account and a clear funding rule. Track manual interventions and unexplained balance movements before expanding.", "Keep rule approval separate from rule execution, and make it possible to pause automation without losing the audit history."],
      limitations: ["The materials do not quantify Siemens-wide savings or disclose a complete list of production accounts.", "The reported capabilities do not establish that every bank, currency or legal entity can participate."],
      sourceRecords: [
        "J.P. Morgan, programmable payments proof of concept with Siemens: https://www.jpmorgan.com/insights/payments/blockchain-digital-assets/programmable-payments-automation-becomes-reality",
        "J.P. Morgan and MIT Digital Currency Initiative, Application of Programmability to Commercial Banking and Payments, 2024: https://www.jpmorgan.com/kinexys/documents/Application-of-Programmability-to-Commercial-Banking-and-Payments.pdf",
        "J.P. Morgan, Siemens Treasury's Digital Transformation: https://cws-main-ndc.jpmorgan.com/insights/payments/blockchain-digital-assets/siemens-treasury-transformation",
      ],
    },
  }),
];
