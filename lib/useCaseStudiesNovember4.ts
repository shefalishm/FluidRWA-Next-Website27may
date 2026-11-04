import type { UseCase } from "./useCases";
import type { UseCaseGuide } from "./useCaseGuides";

const slug = "maersk-tradelens-shutdown-supply-chain-case-study";
const title = "Maersk TradeLens: A Shipping Platform and Its Shutdown";
export const november4CaseStudies: (UseCase & { guide: UseCaseGuide })[] = [{
  slug, title, industry: "Historical Shipping Collaboration Case Study", updatedAt: "2026-11-04",
  image: "/assets/blog-thumbnails/tradelens-november4.webp",
  imageAlt: "Illustrative container port and archived logistics records beside an unplugged cable, not a Maersk facility photograph",
  visualLabel: "Platform Exit", visualKicker: "Maersk TradeLens",
  summary: "A documented blockchain-enabled shipping platform that was discontinued, and a practical lesson in participation, commercial viability and data exit.",
  seoDescription: "Maersk TradeLens case study: the 2018 platform, November 2022 discontinuation decision, evidence limits and procurement lessons for shared shipping records.",
  problem: "A shared shipping record requires continuing participation and a sustainable service, not only working software.",
  stack: ["Shared shipment events", "Participant identities", "Source-system integration", "Access governance", "Commercial operating model", "Data export and transition"],
  vendorCategories: [{ label: "Trade and supply-chain infrastructure", href: "/vendors/trade-finance-supply-chain-infrastructure" }],
  example: "Discontinued historical platform, not a current product recommendation.",
  guide: {
    title, group: "Enterprise operations", audience: "Logistics, supply-chain procurement, integration and data-governance teams",
    answer: "Maersk and IBM announced TradeLens in 2018 as a blockchain-enabled shipping collaboration platform. On November 29, 2022, Maersk announced its discontinuation, citing insufficient global industry collaboration and commercial viability. The original announcement targeted going offline by the end of Q1 2023. This is a historical closure case, not a live service recommendation or proof that blockchain technology alone caused the outcome.",
    workflow: [], controls: [], measures: [], pilot: [],
    notFit: "TradeLens is not a current procurement option. Do not start a new integration from historical onboarding material.",
    questions: ["Which participants must contribute for our route to be useful?", "What happens if a carrier or data contributor leaves?", "Can we reconstruct an event history from an export without the service?", "Who pays for ongoing integration and exception handling?", "Which system remains authoritative if the shared platform closes?"],
    reference: { label: "Primary-source record", href: `/use-cases/${slug}#sources`, note: "Historical company records, not a current offering." },
    faqs: [
      { q: "Can we buy TradeLens today?", a: "This page treats TradeLens as discontinued. It is not a current vendor recommendation or integration guide." },
      { q: "Did Maersk say the software failed?", a: "The November 2022 statement distinguished a technically viable platform from insufficient collaboration and commercial viability. It does not establish that a particular consensus mechanism caused the closure." },
      { q: "Is Q1 2023 a verified final shutdown date?", a: "The November 2022 release stated an intention to go offline by the end of Q1 2023. We do not turn that planned deadline into a separately verified final cutover record." }
    ]
  },
  caseStudy: {
    company: "A.P. Moller - Maersk and IBM", status: "Discontinued historical platform", verifiedThrough: "November 4, 2026",
    background: [
      "Maersk's November 29, 2022 announcement describes TradeLens as a shipping solution announced in 2018 and jointly developed by IBM and GTD Solution, a Maersk division. The proposal was a shared platform for industry collaboration. This is distinct from a single manufacturer's component-tracking pilot or the legal lifecycle of an electronic bill of lading.",
      "IBM's May 19, 2021 announcement reported that PORTIC, the Barcelona port community system, had started exchanging information with TradeLens. Its examples included actual vessel departure and arrival events. That is a documented historical integration and an example of the data being shared, not a measured reduction in delays or proof of universal carrier participation.",
      "The same announcement says the platform had been developed but had not achieved the global collaboration and commercial viability required to continue as an independent business. That is management's stated explanation. It is not an independently controlled comparison of blockchain against another database, nor a complete account of every participant's incentives.",
      "A later Maersk customer advisory says the offering would no longer be available and describes transition support. Maersk's 2022 annual-report technology discussion also records the decision and insufficient traction. These support the historical discontinuation status. We do not claim that the intended Q1 2023 deadline proves an exact final operational cutover date.",
      "The useful procurement lesson is that a network service has at least two tests: does its software support the workflow, and will the necessary organizations keep contributing and paying? The operating analysis below is FluidRWA's proposed evaluation method, not a reconstruction of TradeLens's internal implementation."
    ],
    operatingModel: [
      { title: "1. Specify the route before the network", detail: "Pick a defined shipment route and name the carrier, terminal, forwarder and consignee whose events are needed. Write down which missing contributor makes the record unusable. A broad network description does not establish coverage of the buyer's particular route. Ask for participation evidence for that route rather than an aggregate marketing count." },
      { title: "2. Preserve source and event meaning", detail: "For every proposed shared event, retain the contributor, shipment reference, event time, recording time and source-system identifier. A container being discharged and a document being released are different facts. Agree how late, duplicate and corrected events appear. These are recommended controls, not claims about the exact TradeLens schema." },
      { title: "3. Make the contribution incentive explicit", detail: "Identify the cost and benefit for each party that must publish events. Who funds integration, fixes rejected records and answers disputed milestones? Ask how a smaller participant is supported after onboarding. A technically reachable endpoint is not the same as a sustainable contribution agreement." },
      { title: "4. Keep authoritative records outside ambiguity", detail: "Decide which system establishes each operational fact and how discrepancies are reviewed. Shared visibility alone does not establish title, customs acceptance or a payment obligation. Have qualified specialists determine the applicable documentary and legal requirements rather than deriving them from the presence of a blockchain record." },
      { title: "5. Rehearse closure while the service works", detail: "Export an authorized sample history with identifiers, provenance, corrections and a schema dictionary. Reconstruct the shipment timeline in another tool. Then remove access to the service and repeat. Contractual exit assistance is useful, but a successful reconstruction is the practical evidence that the buyer can continue investigating old records." }
    ],
    milestones: [
      { date: "2018", title: "Platform announced", detail: "Maersk's later discontinuation release dates TradeLens's announcement to 2018." },
      { date: "May 19, 2021", title: "Barcelona integration reported", detail: "IBM said PORTIC had begun exchanging shipping information with TradeLens." },
      { date: "November 29, 2022", title: "Withdrawal announced", detail: "Maersk and IBM announced the decision to discontinue the offering." },
      { date: "End of Q1 2023, intended", title: "Planned offline deadline", detail: "A stated plan in the November release, not a separately verified final cutover timestamp." },
      { date: "November 4, 2026", title: "FluidRWA evidence review", detail: "Historical records reviewed; no revival, current operating scale or independently audited savings asserted." }
    ],
    outcomes: [
      { value: "Discontinued", label: "Service status", context: "Supported by Maersk's withdrawal announcement and customer advisory." },
      { value: "Company-stated", label: "Reason for closure", context: "Insufficient collaboration and commercial viability, not an independent causal audit." },
      { value: "Not established", label: "Comparable savings", context: "No controlled cost, dispute or reconciliation dataset was reviewed." }
    ],
    updates: ["Do not use archived TradeLens onboarding material to imply a currently purchasable service.", "The reviewed official materials support discontinuation. No new network-participation or throughput total is assigned as of the research cut-off.", "The illustrative port image is not evidence of an actual TradeLens terminal, customer or interface."],
    successFactors: [
      "Evaluate participation as a dependency: require evidence that the organizations supplying the needed events are both connected and contractually committed for the proposed workflow.",
      "Use a synthetic or authorized shipment history for a bounded rehearsal. Include a missing contributor, delayed event, conflicting timestamp and corrected reference. Have an operator resolve each exception without a platform engineer narrating the answer.",
      "Compare the shared-service process with the existing process using the same route and evidence requirements. Measure completeness, reconciliation effort, exception age and support work. No target or improvement percentage is invented here.",
      "Assign transition ownership before signing. Agree export formats, identity mapping, retained evidence, assistance and deletion responsibilities. Test those arrangements before the service is in distress.",
      "Separate a successful technology demonstration from a viable operating network. TradeLens's closure is a reason to examine the business and participation model, not evidence that every shared-ledger project will fail."
    ],
    limitations: [
      "Primary evidence is company reporting, not independent inspection of the system or its customer transitions.",
      "The exact final offline date, the final participant count and universal completion of customer migrations are not established here.",
      "The original plan and later discontinuation status are distinguished; no unobserved milestone is supplied to complete the timeline.",
      "No finding is made about a particular ledger's security, legal effectiveness or comparative performance.",
      "The proposed data controls and exit rehearsal are FluidRWA analysis, not claims that TradeLens did or did not implement them."
    ],
    sourceRecords: [
      "Maersk, November 29, 2022: A.P. Moller - Maersk and IBM to discontinue TradeLens. Reviewed November 4, 2026. https://www.maersk.com/news/articles/2022/11/29/maersk-and-ibm-to-discontinue-tradelens",
      "Maersk, December 1, 2022: Information on the closure of TradeLens. Reviewed November 4, 2026. https://www.maersk.com/news/articles/2022/12/01/information-on-the-closure-of-tradeLens",
      "Maersk Annual Report 2022, page 18 (PDF): discontinuation decision and insufficient traction. Reviewed November 4, 2026. https://investor.maersk.com/static-files/8e9851f1-bcd2-425b-a588-7a39f0c6e302",
      "IBM Spain, May 19, 2021: PORTIC Barcelona integration and reported start of information exchange. Reviewed November 4, 2026. https://es.newsroom.ibm.com/announcements?item=122664"
    ]
  }
}];
