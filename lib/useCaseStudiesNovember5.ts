import type { UseCase } from "./useCases";
import type { UseCaseGuide } from "./useCaseGuides";

const slug = "vodafone-pairpoint-device-payments-case-study";
const title = "Vodafone Pairpoint: Device Identity and Authorized Payments";
export const november5CaseStudies: (UseCase & { guide: UseCaseGuide })[] = [{
  slug, title, industry: "Device Identity and Machine Payments Case Study", updatedAt: "2026-11-06",
  image: "/assets/blog-thumbnails/pairpoint-november5.webp",
  imageAlt: "Illustrative unbranded electric delivery van at a charging station with a device identity review tablet, not a Vodafone deployment photograph",
  visualLabel: "Device Payments", visualKicker: "Vodafone Pairpoint",
  summary: "How Vodafone's Digital Asset Broker became Pairpoint, and why a device identity still needs a bounded payment authority and reconciliation process.",
  seoDescription: "Vodafone Pairpoint case study: Digital Asset Broker's 2022 origin, the November 2023 venture brand, machine identity, payment authorization and evidence limits.",
  problem: "A vehicle can identify itself to a service while still lacking permission to spend its owner's money.",
  stack: ["Device identity", "SIM-backed credentials", "Owner authorization", "Service acceptance", "Payment gateway", "Reconciliation and revocation"],
  vendorCategories: [{ label: "Identity solutions", href: "/vendors/identity-solutions" }, { label: "Payment infrastructure", href: "/vendors/stablecoin-infrastructure-providers" }],
  example: "A documented device-commerce initiative. The payment-gateway collaboration is not evidence of stablecoin settlement.",
  guide: {
    title, group: "Enterprise operations", audience: "Fleet, IoT, payments, identity and procurement teams",
    answer: "Vodafone's Digital Asset Broker entered the device-commerce market in 2022. Vodafone and Sumitomo introduced the Pairpoint brand on November 7, 2023. On October 10, 2024, Mastercard announced a collaboration to connect Pairpoint with Mastercard Gateway for authorized machine payments. These company records support the initiative and proposed operating model, but do not establish rollout coverage, transaction volumes or audited savings as of November 6, 2026.",
    workflow: [], controls: [], measures: [], pilot: [],
    notFit: "Do not treat a device identity as unlimited spending authority or assume that a blockchain-enabled identity layer makes the payment itself a stablecoin transfer.",
    questions: ["Who grants the vehicle authority to pay?", "Which merchants, services and limits does that authority cover?", "How does revocation reach a disconnected device?", "What proves service delivery before charging?", "Who reconciles an ambiguous gateway response?"],
    reference: { label: "Primary-source record", href: `/use-cases/${slug}#sources`, note: "Company announcements, with intentions distinguished from verified operating results." },
    faqs: [
      { q: "Is Pairpoint the same name as Digital Asset Broker?", a: "Vodafone and Sumitomo's November 7, 2023 release introduced Pairpoint as the brand for their venture previously known as Digital Asset Broker." },
      { q: "Does this prove stablecoin payments at charging stations?", a: "No. The reviewed collaboration describes Mastercard Gateway and authorized machine payments. Blockchain-enabled device identity does not establish a particular payment asset or settlement rail." },
      { q: "Are the announced rollouts confirmed complete?", a: "No. The reviewed gateway announcement uses future-tense availability language. This case does not convert that plan into a confirmed deployment footprint." }
    ]
  },
  caseStudy: {
    company: "Vodafone / Sumitomo / Pairpoint", status: "Documented venture and payment collaboration; rollout completion not established", verifiedThrough: "November 6, 2026",
    background: [
      "Vodafone's Economy of Things reporting dates Digital Asset Broker's market entry to 2022. The business idea is to let connected machines identify one another and transact under their owners' authority. This is a different operating problem from tracing a manufactured component or sharing shipping events: the device is being enabled to initiate a commercial action.",
      "On November 7, 2023, Vodafone and Sumitomo announced Pairpoint as the brand for their venture previously known as Digital Asset Broker. The release connects decentralized ledger technology with trusted devices and owner control, and names electric vehicles and charging stations as an initial application area. That supports the venture's intended direction, not a measured deployment count.",
      "On October 10, 2024, Mastercard announced a collaboration connecting Pairpoint with Mastercard Gateway. It described authorized vehicle payments at charging or fuel stations and pre-approved route-related charges, with planned UK availability followed by European expansion. Mastercard separately describes a launched platform for electric-vehicle charging commerce, but that description does not establish where the announced fleet gateway service operates or how much it processes.",
      "The gateway announcement describes standards-based identities stored in device SIMs. Identity, spending policy and payment execution are distinct layers. It would be incorrect to infer that a SIM identity proves a charge was authorized, that the service was delivered or that funds settled on a blockchain. The reviewed record does not establish stablecoin settlement.",
      "The analysis below uses a hypothetical fleet charging session to explain procurement boundaries. It is FluidRWA's recommended review method, not an observed Pairpoint customer transaction or a reverse-engineered account of private platform internals. No live machine payment, contract inspection or independently audited savings analysis was performed."
    ],
    operatingModel: [
      { title: "1. Bind a device to an accountable owner", detail: "For a proposed fleet integration, identify the vehicle, the organization granting authority and the identity credential presented to services. Document how ownership changes, stolen devices and SIM replacement affect that binding. Vodafone describes SIM-based identities; the exact enrollment, recovery and contractual responsibility for a buyer's configuration must be demonstrated separately." },
      { title: "2. Grant bounded spending authority", detail: "Specify allowed service types, approved counterparties, amount limits and validity periods. A known vehicle should not automatically be able to buy every available service. Ask which system evaluates the policy and how the decision is recorded. The important evidence is the owner's applicable instruction and the decision made for this request, not only a valid device identifier." },
      { title: "3. Separate service evidence from payment intent", detail: "A charging station accepting a request, a charging session starting and the final energy or price record are different events. Decide which evidence releases a payment and who handles a discrepancy. Retain the device reference, service reference and authorized amount without exposing unnecessary personal information. These are proposed controls, not claims about the private Pairpoint event schema." },
      { title: "4. Reconcile the gateway outcome", detail: "Link the permitted purchase to the gateway reference and the operator's accounting record. If the response is interrupted, resolve the existing attempt before creating another payment. A displayed success must have a defined meaning: accepted request, authorization, capture and settlement should not be collapsed into one status. Request provider-specific documentation rather than assuming a universal gateway lifecycle." },
      { title: "5. Revoke authority and prove the boundary", detail: "Remove a synthetic vehicle's permission during a controlled pilot. Repeat while the device is disconnected, after the policy cache ages and after a SIM replacement. Require an explicit decision about what may continue offline. A device-commerce system needs an owned exception path when identity, policy or payment evidence is unavailable; an autonomous retry is not automatically an acceptable response." }
    ],
    milestones: [
      { date: "2022", title: "Digital Asset Broker market entry", detail: "Vodafone's later corporate reporting dates its entry into the Economy of Things market to this year." },
      { date: "November 7, 2023", title: "Pairpoint brand announced", detail: "Vodafone and Sumitomo introduced the venture's new brand and described device-commerce applications." },
      { date: "October 10, 2024", title: "Mastercard collaboration announced", detail: "The official record describes a payment-gateway connection and intended UK/European availability. No completed rollout date is inferred." },
      { date: "November 6, 2026", title: "FluidRWA review", detail: "Reviewed official initiative and collaboration records; no current transaction total or independently measured economic result assigned." }
    ],
    outcomes: [
      { value: "Documented", label: "Venture identity", context: "The November 2023 release establishes the Pairpoint brand and Vodafone/Sumitomo relationship." },
      { value: "Announced", label: "Gateway collaboration", context: "A company-described service connection; rollout intentions are not treated as completed adoption." },
      { value: "Not established", label: "Audited operating gains", context: "No comparable fee, dispute, throughput or savings dataset was reviewed." }
    ],
    updates: ["Pairpoint is the named venture in the reviewed later records; Digital Asset Broker remains relevant to the historical origin.", "No numerical forecast of trading devices is adopted as observed adoption.", "The illustrative van and charging station are not photographs of a customer deployment."],
    successFactors: [
      "Begin with one service and a bounded set of authorized devices. An organization-wide machine-commerce rollout is too broad to reveal whether a particular charge can be explained and reconciled.",
      "Have fleet operations, identity administrators and finance agree which record proves each decision. A payment operator should not have to reconstruct spending permission from a device connectivity log.",
      "Compare normal service delivery with a declined request, an interrupted session and a revoked vehicle. Record exception age and manual review effort; do not invent improvement percentages.",
      "Test the export and supplier-change path. The buyer should retain enough permitted evidence to investigate an old charge after a device, gateway or platform relationship changes."
    ],
    limitations: [
      "Primary evidence is corporate reporting, not independent observation of device payments.",
      "Current deployment coverage, transaction volumes and rollout completion are not established.",
      "No stablecoin rail, legal effectiveness, payment guarantee or comparative security finding is inferred.",
      "The synthetic fleet workflow and acceptance checks are FluidRWA analysis, not a claim that Pairpoint implements each proposed control."
    ],
    sourceRecords: [
      "Vodafone: 3.3 billion devices will be trading with each other by 2030 according to new report. Used only for the stated 2022 DAB origin, not the forecast. https://www.vodafone.com/news/newsroom/technology/3-3-billion-devices-trading-2030-report",
      "Vodafone and Sumitomo, November 7, 2023: brand announcement and venture scope. https://www.vodafone.com/news/newsroom/technology/vodafone-sumitomo-announce-brand-economy-things-venture",
      "Mastercard, October 10, 2024: Pairpoint Gateway collaboration; rollout language retained as intention. https://newsroom.mastercard.com/news/europe/en/newsroom/press-releases/en/2024/vodafone-sumitomo-corporation-and-mastercard-team-up-to-advance-the-economy-of-things/",
      "Mastercard Gateway: in-car commerce and Pairpoint platform description. https://www.mastercard.com/gateway/customers/industries/in-car-commerce.html"
    ]
  }
}];
