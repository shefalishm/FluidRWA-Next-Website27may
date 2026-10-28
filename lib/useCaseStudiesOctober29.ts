import type { UseCase } from "./useCases";
import type { UseCaseGuide } from "./useCaseGuides";

const updatedAt = "2026-10-29";
const verifiedThrough = "October 29, 2026";
function guide(title: string, slug: string, answer: string, audience: string, questions: string[], faqs: UseCaseGuide["faqs"], group: UseCaseGuide["group"]): UseCaseGuide {
  return { title, answer, audience, questions, faqs, group, workflow: [], controls: [], measures: [], pilot: [],
    notFit: "A documented implementation does not establish the same commercial terms, legal rights or results for another buyer.",
    reference: { label: "Primary-source research record", href: `/use-cases/${slug}#sources`, note: "Company evidence, dates and unanswered questions are identified below." } };
}

export const october29CaseStudies: (UseCase & { guide: UseCaseGuide })[] = [
  {
    slug: "lloyds-archax-tokenized-deposit-gilt-purchase-case-study",
    title: "Lloyds and Archax: Buying Tokenized Gilts with Bank Deposits",
    industry: "Documented Bank-Settlement Case Study", updatedAt,
    image: "/assets/blog-thumbnails/gilt-settlement-october29.webp",
    imageAlt: "Illustrative London financial district for FluidRWA's Lloyds and Archax settlement case study, not the transaction itself",
    visualLabel: "Deposit to Security", visualKicker: "Lloyds and Archax",
    summary: "How a tokenized bank deposit funded a gilt purchase on Canton, how the funds returned to a regular account, and what another institution would need to verify.",
    seoDescription: "Lloyds and Archax tokenized-deposit case study: Canton gilt purchase, participating entities, bank-account handoff, timeline and settlement controls.",
    problem: "A security can be recorded on a blockchain while its payment still moves through a separate bank process. Institutions need to connect the asset transfer, payment and final account balance without losing control of either record.",
    stack: ["Bank deposit and account relationship", "Tokenized deposit issuance", "Canton participation", "Tokenized gilt purchase", "Return to a regular bank account", "Cash and securities reconciliation"],
    vendorCategories: [{ label: "Tokenization Platforms", href: "/vendors/tokenization-platforms" }, { label: "Institutional Digital Asset Trading", href: "/vendors/institutional-digital-asset-trading-platforms" }],
    example: "Lloyds' January 2026 announcement describes a completed purchase, not a service open to every investor. Its July 2025 collateral transaction used a different network and was a separate workflow.",
    guide: guide("Lloyds and Archax: Buying Tokenized Gilts with Bank Deposits", "lloyds-archax-tokenized-deposit-gilt-purchase-case-study",
      "Lloyds reported issuing tokenized deposits on Canton. Lloyds Bank Corporate Markets used them to buy a tokenized gilt from Archax, which then moved the funds into its regular Lloyds account. This connects a bank claim, a securities purchase and conventional account reconciliation. Public evidence does not establish recurring volumes or general customer availability.",
      "Bank treasury, securities operations and institutional settlement teams",
      ["Which bank entity owes the deposit claim?", "What makes both sides of the purchase final?", "How is the account balance reconciled?", "Who resolves a partially completed transaction?"],
      [
        { q: "Was the payment a stablecoin?", a: "The announcement describes tokenized bank deposits. Do not rename them stablecoins or central-bank money; identify the issuing bank, claim and terms." },
        { q: "Was this the 2025 Hedera collateral case?", a: "No. July 2025 involved tokenized fund units and gilts as FX collateral on Hedera. January 2026 involved a purchase funded with tokenized deposits on Canton." },
        { q: "Does this prove instant, risk-free settlement?", a: "No. The public description supplies no controlled timing benchmark, failure log or complete legal-finality analysis. Operational and counterparty risks still require assessment." },
        { q: "Can any company access the arrangement?", a: "General eligibility, customer availability and prices are not established by the transaction announcement. Confirm them under the proposed banking arrangement." }
      ], "Financial services"),
    caseStudy: {
      company: "Lloyds Banking Group and Archax", status: "Completed transaction reported by participants; wider availability not established", verifiedThrough,
      background: [
        "A UK gilt is government debt. Buying a tokenized representation still requires a defined securities claim and a payment arrangement. Changing the recordkeeping technology does not remove those obligations.",
        "Lloyds' January 2026 account identifies Lloyds as issuing tokenized deposits, Lloyds Bank Corporate Markets as the buyer and Archax as the counterparty. It names Canton and describes the subsequent return of funds to a regular account. Lloyds also says it operated a validator node.",
        "The public record does not disclose the trade amount, a recurring volume series or a comparable cost study. This is evidence of a completed workflow, not a market-size figure or proof of an advantage at scale.",
        "The operating questions below are FluidRWA analysis for another institution. They do not reconstruct confidential contracts or assert that every suggested control was disclosed by the participants."
      ],
      operatingModel: [
        { title: "1. Identify the cash claim", detail: "A buyer should establish the issuing legal entity, account relationship, redemption procedure and applicable terms. Treasury, legal and operations need to agree which balance is authoritative. A familiar token name does not settle those questions." },
        { title: "2. Connect the security and payment", detail: "For a new deployment, request the actual settlement conditions: who authorizes each leg, how permissions are checked, when obligations discharge and what happens if one step cannot complete. A network confirmation and legal finality should not be assumed to be identical." },
        { title: "3. Reconcile the account handoff", detail: "The reported return to an ordinary account makes the case more useful than an isolated token transfer. Trace ledger movements, conversion or redemption records, account credits and reference identifiers until operations can explain the final balances." },
        { title: "4. Test recovery", detail: "Network participation creates access, signing, upgrade and continuity responsibilities. Test an unavailable counterparty, a rejected instruction and an uncertain transaction state. A normal-path demonstration does not establish the recovery process or service commitments." }
      ],
      milestones: [
        { date: "14 July 2025", title: "Earlier collateral transaction", detail: "Lloyds, Aberdeen and Archax announced tokenized fund units and gilts as FX collateral on Hedera. This was a different transaction and purpose." },
        { date: "January 2026", title: "Deposit-funded gilt purchase", detail: "The Lloyds web release displays 20 January 2026. This case uses the month for the transaction and does not infer an execution timestamp from that publication date." },
        { date: "25 September 2026", title: "Infrastructure account", detail: "CatalyX described its role providing Archax's Canton validator infrastructure. This is supplier evidence about that role, not an independent audit of the trade." },
        { date: "29 October 2026", title: "Evidence review", detail: "The named workflow is documented. Current recurring volume and general customer-access terms remain unverified." }
      ],
      outcomes: [
        { value: "Completed", label: "Deposit-funded purchase", context: "Participant-reported transaction; no amount is inferred." },
        { value: "Account handoff", label: "Return to conventional banking", context: "The bank describes Archax moving funds into its regular account." },
        { value: "Not disclosed", label: "Recurring volume and comparable cost", context: "No production benchmark or market total is established." }
      ],
      updates: ["The September supplier account adds a specific infrastructure role; that description remains attributed to CatalyX.", "The July 2025 Hedera collateral case and January 2026 Canton purchase must remain separate in any timeline or aggregate.", "Require a dated participant statement or transaction record before adding wider availability, repeat volume or operating improvements."],
      successFactors: ["Follow the money into the final account rather than stopping at an onchain receipt.", "Name each bank and counterparty role before allocating failure-handling duties.", "Measure unreconciled balances, exception time and manual interventions alongside settlement time.", "Test a rejected transfer and delayed account credit before using a successful demonstration as the basis of an operating plan."],
      limitations: ["The sources are participant and supplier descriptions, not independent transaction audits.", "Deposit protection, interest, legal finality and redemption depend on the actual product, holder, entity and terms. This page supplies no legal assurance.", "No reviewed benchmark proves lower total cost, reduced capital or eliminated counterparty risk.", "A tokenized gilt representation should not be called government digitally native issuance without separate instrument evidence."],
      sourceRecords: [
        "Lloyds Banking Group: deposit-funded gilt purchase, web publication 20 January 2026; reviewed 29 October 2026. https://www.lloydsbankinggroup.com/media/press-releases/2026/lloyds/lloyds-tokenisation.html",
        "Lloyds Banking Group: Aberdeen and Archax collateral transaction, 14 July 2025; reviewed 29 October 2026. https://www.lloydsbankinggroup.com/media/press-releases/2025/lloyds-banking-group-2025/digital-assets-breakthrough.html",
        "CatalyX: supplier account of Archax validator infrastructure, 25 September 2026; reviewed 29 October 2026. https://www.catalyx.solutions/use-cases/the-canton-infrastructure-behind-archax-tokenized-gilt-trade-with-lloyds"
      ]
    }
  },
  {
    slug: "breitling-digital-passport-watch-ownership-case-study",
    title: "Breitling Digital Passports: Ownership, Warranty and Resale",
    industry: "Documented Product-Passport Case Study", updatedAt,
    image: "/assets/blog-thumbnails/watch-passport-october29.webp",
    imageAlt: "Illustrative wristwatch for FluidRWA's Breitling passport case study, not a verified Breitling product photograph",
    visualLabel: "A Watch's Digital Record", visualKicker: "Breitling and Arianee",
    summary: "What an owner can do with Breitling's digital passport, how a transfer works and why the physical watch still needs its own checks.",
    seoDescription: "Breitling digital passport case study: registration, warranty information, transfer and resale, Arianee's reported deployment and implementation lessons.",
    problem: "A watch can outlast its receipt, warranty card and original owner relationship. A usable product record needs to move with the watch without confusing a digital certificate with a physical inspection.",
    stack: ["Watch identification", "Owner registration and recovery", "Digital certificate", "Documents and warranty information", "Recipient acceptance", "Physical inspection and service"],
    vendorCategories: [{ label: "Physical Asset Verification", href: "/vendors/physical-asset-verification-oracles" }, { label: "Tokenization Platforms", href: "/vendors/tokenization-platforms" }],
    example: "Breitling documents registration and transfer. Arianee reports deployment scale; neither record establishes a resale premium or makes a copied QR code proof of a genuine watch.",
    guide: guide("Breitling Digital Passports: Ownership, Warranty and Resale", "breitling-digital-passport-watch-ownership-case-study",
      "Breitling lets owners register supported watches and access a digital certificate, documents and warranty status. Its instructions include transferring the passport to a new owner who accepts it. Arianee describes the deployment. The practical value is a continuing product record; the certificate alone does not authenticate every physical watch presented with it.",
      "Luxury brands, after-sales teams, resale platforms and product-passport buyers",
      ["How is the record linked to the object?", "Can an owner recover access?", "Which service facts are authoritative?", "What happens if the passport moves without the watch?"],
      [
        { q: "Is this a financial investment token?", a: "The owner instructions describe a product certificate and services record, not fractional investment, returns or promised liquidity." },
        { q: "Does the passport prove a physical watch is genuine?", a: "It can support a check, but matching the record to the object still matters. A copied code or transferred credential alone does not establish authenticity or condition." },
        { q: "Does transferring the passport complete a sale?", a: "The passport transfer includes recipient acceptance. It should not be equated with payment, physical delivery, legal title or every resale obligation." },
        { q: "How many watches have passports?", a: "Arianee reports more than 500,000 certified watches. Its page reviewed on October 29, 2026 gives no clear measurement date. This is an attributed supplier figure, not an independently verified current count." }
      ], "Consumer applications"),
    caseStudy: {
      company: "Breitling and Arianee", status: "Owner-facing service with published registration and transfer instructions", verifiedThrough,
      background: [
        "An expensive watch can be sold, gifted, repaired and serviced over many years. Paper records get misplaced and customer accounts become disconnected from the person who owns the product. A useful passport needs to work through those changes.",
        "Breitling's guidance describes registration through an owner account, including a warranty-card QR route, and access to certificate, product documents and warranty information. Its transfer instructions require the recipient to accept. These are practical customer tasks rather than a speculative token launch.",
        "Arianee reports more than 500,000 certified watches in more than 40 markets. The reviewed page gives no clear measurement date. That indicates supplier-reported scale, not an audited October 2026 count, active-owner total or resale volume.",
        "The controls below are FluidRWA evaluation questions. Public owner instructions do not disclose every security, recovery or internal service integration."
      ],
      operatingModel: [
        { title: "1. Claim the record", detail: "Start with a supported product and a registration path. Another brand should test missing cards, duplicate claims, incorrect serial details and second-hand buyers. A simple first purchase is insufficient if legitimate later owners cannot register." },
        { title: "2. Retrieve useful information", detail: "Separate manufacturer specifications, service-partner entries and owner-supplied information. Condition and repair claims need different evidence from a model description. Show who supplied a fact and whether it has been corrected." },
        { title: "3. Transfer with acceptance", detail: "The documented recipient-acceptance step provides a concrete handoff. A resale design also needs cancellation, mistaken-recipient, disputed-payment and physical-delivery procedures. Those are buyer questions, not additional features claimed for Breitling." },
        { title: "4. Preserve access over time", detail: "Test changed email addresses, lost credentials and platform migration. Request record exports and define who supports recovery. A long-lived product should not depend on an undocumented account workaround." }
      ],
      milestones: [
        { date: "2020", title: "Early watch deployment", detail: "Arianee's company history identifies Breitling among early large-scale watch deployments. This is a supplier historical account." },
        { date: "Current owner instructions", title: "Registration and transfer", detail: "Breitling publishes customer procedures. A live help page is evidence of a described service, not its adoption rate." },
        { date: "Undated supplier case study", title: "Reported scale", detail: "Arianee reports 500,000-plus certified watches and 40-plus markets; the measurement period is not established." },
        { date: "29 October 2026", title: "Evidence review", detail: "No independent resale uplift, counterfeit-reduction result or active-owner cohort was verified." }
      ],
      outcomes: [
        { value: "Owner service", label: "Registration and transfer", context: "Documented in Breitling's customer guidance." },
        { value: "500K+", label: "Certified watches, according to Arianee", context: "Supplier figure with an unspecified measurement date; not independently audited by FluidRWA." },
        { value: "Not verified", label: "Resale or fraud-reduction result", context: "The reviewed records do not establish a price premium or a counterfeit-reduction percentage." }
      ],
      updates: ["Current brand guidance is the most direct evidence of what an owner can do.", "Breitling describes extra material-origin information for Origins-labelled watches. Do not apply it to every passport.", "This case makes no blanket claim of compliance with future product-passport rules; product, jurisdiction and implementation dates matter."],
      successFactors: ["Begin with an ordinary customer task: finding warranty details, retrieving documents or transferring the record.", "Make account access understandable to someone who has never used a crypto wallet.", "Keep physical inspection, payment and certificate transfer distinct, with an owner for each exception.", "Measure successful claims, completed transfers, recovery time and useful service interactions. Minted certificates alone do not establish adoption.", "Test gifting, second-hand purchase and lost-account scenarios before expanding the range."],
      limitations: ["Arianee has a commercial interest in the deployment; reported scale is not independent validation.", "A digital record alone cannot establish possession, condition or authenticity of a physical watch.", "Warranty and service eligibility follow the applicable terms; a certificate does not create unlimited rights.", "The reviewed pages do not establish resale improvements, public transaction volumes or every recovery control."],
      sourceRecords: [
        "Breitling: owner instructions, reviewed 29 October 2026; publication date unstated. https://www.breitling.com/us-en/service/digital-passport/",
        "Arianee: Breitling case study, reviewed 29 October 2026; scale measurement date unstated. https://www.arianee.com/en/case-studies/breitling",
        "Arianee: company history and early deployments, reviewed 29 October 2026. https://www.arianee.com/en/about"
      ]
    }
  }
];
