import type { UseCase } from "./useCases";
import type { UseCaseGuide } from "./useCaseGuides";

type Study = UseCase & { guide: UseCaseGuide };
type Input = Omit<UseCase, "caseStudy" | "updatedAt" | "example"> & {
  reviewDate?: string;
  reviewLabel?: string;
  caseStudy: Omit<NonNullable<UseCase["caseStudy"]>, "verifiedThrough">;
  audience: string;
  questions: string[];
  faqs: UseCaseGuide["faqs"];
};

function study({ audience, questions, faqs, caseStudy, reviewDate = "2026-11-09", reviewLabel = "November 9, 2026", ...item }: Input): Study {
  return {
    ...item,
    updatedAt: reviewDate,
    example: item.summary,
    caseStudy: { ...caseStudy, verifiedThrough: reviewLabel },
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
    slug: "project-mariana-wholesale-cbdc-fx-case-study",
    title: "Project Mariana: How Central Banks Tested Wholesale CBDC for Foreign Exchange",
    industry: "Wholesale foreign exchange",
    reviewDate: "2026-11-15", reviewLabel: "November 15, 2026",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Illustrative urban financial district, not a location from the Project Mariana experiment",
    visualKicker: "Project Mariana", visualLabel: "Proof of concept",
    summary: "The BIS Innovation Hub and three central banks tested whether hypothetical wholesale CBDCs could be exchanged and settled through an automated market maker on a public blockchain.",
    problem: "A cross-border FX trade needs both currency legs to settle. Different systems can make it difficult to coordinate exchange, liquidity and operational controls.",
    stack: ["Hypothetical wholesale CBDCs", "Token standard", "Bridge", "Automated market maker"],
    vendorCategories: [development],
    audience: "Wholesale payments, FX and settlement teams",
    questions: ["Who is allowed to provide liquidity and trade?", "What happens if a trade cannot execute at the expected price?", "What evidence will finance use to match the two currency legs?"],
    faqs: [
      { q: "Were real central bank currencies traded?", a: "No. Project Mariana tested hypothetical wholesale CBDCs. It did not establish public access, commercial availability or an issuance decision." },
      { q: "Was the entire system a public market?", a: "No. The experiment used public-chain technology concepts, but the reported design does not establish that members of the public were authorized to trade or hold a real currency." },
    ],
    caseStudy: {
      company: "BIS Innovation Hub, Banque de France, Monetary Authority of Singapore and Swiss National Bank",
      status: "Completed technical experiment using hypothetical currencies",
      background: [
        "Banks exchanging currencies are exposed to settlement risk if one delivers its payment but the other does not. A payment-versus-payment design ties both legs together. It still needs a way to source liquidity, quote the trade and control who can participate.",
        "Mariana tested how those tasks could fit together when the money is represented as a wholesale token. It focused on euro, Singapore dollar and Swiss franc test instruments. The question was technical feasibility, not whether the participating central banks would issue these instruments.",
      ],
      operatingModel: [
        { title: "Represent the currencies consistently", detail: "The design used a common token standard for the hypothetical currencies so the exchange application could interact with them. A common interface helps software integration; it does not make their legal terms or account structures identical." },
        { title: "Move the test instruments to the FX network", detail: "A bridge connected the domestic test networks to the shared network. That creates a separate control point: a future implementation would need to specify how movements are authorized and how inconsistent records are investigated." },
        { title: "Quote and exchange using liquidity pools", detail: "The automated market maker pooled the three currencies and priced simulated spot trades. The project reported automatic execution and immediate settlement within the experiment. This says nothing about market depth or execution costs at production volume." },
        { title: "Reconcile the movement and account for exclusions", detail: "For a follow-on pilot, retain a record of both legs and their instructions. Test an unavailable currency pool and a trade that fails its pricing limit before judging whether the workflow is operationally useful." },
      ],
      milestones: [{ date: "September 28, 2023", title: "Pilot results published", detail: "The BIS and participating central banks released the proof-of-concept results." }],
      outcomes: [{ value: "3", label: "Hypothetical currencies used", context: "Test euro, Singapore dollar and Swiss franc instruments, not issued commercial products or real-value settlement totals." }],
      updates: ["The final report presents a technical experiment and cautions against interpreting it as intent to issue CBDC or as endorsement of a particular solution."],
      successFactors: ["Treat the FX quote, both cash legs and exceptions as separate records your operations team can reconcile.", "Validate participant permissions, pricing controls and bridge recovery before testing larger workloads."],
      limitations: ["The experiment did not establish issuance, commercial deployment, regulatory approval or market-wide liquidity.", "Its recorded behavior under test conditions is not evidence of production performance."],
      sourceRecords: ["BIS, Project Mariana overview: https://www.bis.org/project/mariana", "Banque de France, Project Mariana final report, September 2023: https://www.banque-france.fr/system/files/2023-09/20230928%20Mariana%20final%20report_0.pdf"],
    },
  }),
  study({
    slug: "paypal-ey-pyusd-sap-invoice-payment-case-study",
    title: "How PayPal Paid EY With PYUSD From Its ERP System",
    industry: "Accounts payable",
    reviewDate: "2026-11-15", reviewLabel: "November 15, 2026",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Illustrative finance team reviewing documents, not PayPal or EY staff",
    visualKicker: "PayPal and EY", visualLabel: "Company-reported supplier payment",
    summary: "SAP's Taulia describes PayPal paying EY from its core ERP using PYUSD, with Coinbase as the recipient's custodian. The example shows how a stablecoin payment can start in accounts payable rather than a standalone wallet.",
    problem: "When finance adds a new payment rail, it still needs to preserve invoice approval, identify the recipient and reconcile the completed payment.",
    stack: ["ERP payment instruction", "SAP Digital Currency Hub", "PYUSD", "Payee custody"],
    vendorCategories: [{ label: "Stablecoin infrastructure", href: "/vendors/stablecoin-infrastructure-providers" }],
    audience: "Accounts payable, treasury and finance systems teams",
    questions: ["Can an accountant match the external payment to the original payable?", "Who confirms the payee wallet and network?", "How is a failed or late payment handled without paying the invoice twice?"],
    faqs: [
      { q: "Did the supplier have to be paid from a manual wallet?", a: "Taulia describes the payment as originating from PayPal's core ERP through the SAP Digital Currency Hub." },
      { q: "Does this prove lower costs than a wire?", a: "No. The cited sources do not provide comparable transaction pricing, operating cost, failure rates or settlement-time measurements for this payment." },
    ],
    caseStudy: {
      company: "PayPal, EY, SAP and Coinbase",
      status: "Supplier payment reported by SAP's Taulia",
      background: [
        "The important starting point for a supplier payment is an approved liability. Changing the settlement rail does not remove the need to identify the supplier, verify approved payment details and close the invoice in the accounting system.",
        "Taulia identifies a real PayPal-to-EY payment using PYUSD, with Coinbase as the payee's custodian. SAP's product documentation separately describes the Digital Currency Hub as connecting an ERP payment process to a blockchain-based rail. The documented example establishes the parties and broad workflow; it does not expose the transaction's accounting records.",
      ],
      operatingModel: [
        { title: "Initiate payment from the finance system", detail: "The company case describes PayPal paying from its core ERP. In a similar deployment, preserve the approved invoice and payment-run identity through any external hand-off; do not create a second, manual authorization record that finance cannot follow." },
        { title: "Send the designated settlement asset", detail: "The reported payment asset was PYUSD. Buyers should verify how an approved instruction identifies the token, network and destination, and where the rules for funding and any fees are applied. Those settings are not established for the reported payment." },
        { title: "Receive to the payee's custodian", detail: "Taulia names Coinbase for the recipient custody role. Custody identifies one participant in the workflow; it does not establish how, or whether, EY converted or withdrew the funds." },
        { title: "Close the invoice against independent evidence", detail: "A pilot should match the approved payable, the rail's status and the recipient's receipt. Handle mismatches as exceptions before an operator retries a payment. This is a buyer control, not a claim about PayPal's internal implementation." },
      ],
      milestones: [{ date: "2025", title: "Taulia publishes the example", detail: "Taulia's payment guide identifies the parties, the ERP origin, the token and the payee custodian. This is the publication context, not an asserted payment date." }],
      outcomes: [{ value: "1", label: "Named supplier-payment example reviewed", context: "The public description is a documented example, not a count of payments across PayPal or EY." }],
      updates: ["SAP's product documentation describes newer payment and statement-reporting options separately. Do not infer that those features were used in the PayPal example."],
      successFactors: ["Start with one supplier and one currency and preserve the usual sign-off and supplier validation.", "Before expanding, replay a rejected instruction and a confirmed transfer with a missing ERP status update. Verify that neither triggers a duplicate payment."],
      limitations: ["The sources do not establish the invoice amount, chain transaction identifier, fees, volume, or independently measured savings.", "The case does not establish that the recipient redeemed PYUSD or that the same workflow is available to every buyer."],
      sourceRecords: ["SAP Taulia, Next-Gen Payments case example: https://taulia.com/wp-content/uploads/2025/06/replaced_Next-Gen-Payments_v3.pdf", "SAP Help Portal, Digital Currency Hub: https://help.sap.com/doc/d38a485b480f45849e0cf6ce8d80f65b/SHIP/en-US/732a7a3bd7c540b5a1b750f80ca29168.pdf", "SAP Help Portal, Digital Currency Hub release notes: https://help.sap.com/docs/SAP_DIGITAL_CURRENCY_HUB/4cf1ea7532b148bd82c3c7c75da21c0d?locale=en-US"],
    },
  }),
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
