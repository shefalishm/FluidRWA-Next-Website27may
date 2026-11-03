import type { UseCase } from "./useCases";
import type { UseCaseGuide } from "./useCaseGuides";

const slug = "bmw-partchain-component-traceability-case-study";
const title = "BMW PartChain: Component Traceability Across Suppliers";
const answer = "BMW reported a successful 2019 PartChain front-light tracking pilot across two BMW plants and three Automotive Lighting locations. Its March 31, 2020 release announced planned expansion to about ten suppliers. The case illustrates cross-company data coordination; the reviewed evidence does not establish today's deployment footprint, audited savings or a completed mine-to-smelter rollout.";

export const november3CaseStudies: (UseCase & { guide: UseCaseGuide })[] = [{
  slug, title, industry: "Documented Automotive Traceability Case Study", updatedAt: "2026-11-03",
  image: "/assets/blog-thumbnails/bmw-parts-november3.webp",
  imageAlt: "Illustrative unbranded headlight inspection and component scanning, not a BMW facility photograph",
  visualLabel: "Parts and Their Records", visualKicker: "BMW PartChain",
  summary: "A historical component-tracking pilot and the controls needed when suppliers contribute to a shared traceability record.",
  seoDescription: "BMW PartChain case study: documented 2019 headlight pilot, March 2020 expansion plan, evidence limits and a practical supplier-traceability pilot.",
  problem: "Separate supplier systems make a component's history difficult to assemble. A shared record still depends on accurate identities and trustworthy source events.",
  stack: ["Component identifiers", "Supplier identity", "Event capture", "Shared record", "Exception review", "Reconciliation"],
  vendorCategories: [{ label: "Trade and Supply Chain Infrastructure", href: "/vendors/trade-finance-supply-chain-infrastructure" }],
  example: "Historical pilot evidence, with future expansion separated from completed deployment.",
  guide: {
    title, answer, group: "Enterprise operations", audience: "Manufacturing procurement, supplier-quality, logistics and architecture teams",
    workflow: [], controls: [], measures: [], pilot: [],
    notFit: "A shared ledger cannot replace physical inspection, supplier qualification or evidence of raw-material origin.",
    questions: ["Which physical part does each ID represent?", "Who can correct an event?", "What can each supplier see?", "How are receiving records reconciled?"],
    reference: { label: "Primary-source record", href: `/use-cases/${slug}#sources`, note: "Historical BMW disclosure, not an endorsement or independent audit." },
    faqs: [
      { q: "Is current production scale established?", a: "No. The reviewed release documents a historical pilot and expansion intention, not a current supplier count." },
      { q: "Did the pilot prove mine-to-smelter traceability?", a: "No. The release describes part tracking; raw-material tracing was a longer-term ambition." },
      { q: "Does a ledger authenticate the physical part?", a: "No. Physical-to-digital identity and event-capture controls need separate validation." }
    ]
  },
  caseStudy: {
    company: "BMW Group", status: "Historical pilot reported; later rollout completion not established", verifiedThrough: "November 3, 2026",
    background: [
      "BMW's March 31, 2020 release reports a 2019 front-light pilot involving Spartanburg, Dingolfing and three Automotive Lighting locations. It identifies separate supplier systems and manual coordination as the problem.",
      "The release describes cloud technology alongside blockchain. Expansion during 2020 was an intention; raw-material tracing was a longer-term objective. Neither is treated here as a completed rollout.",
      "The implementation analysis below is FluidRWA's proposed approach, not a reconstruction of BMW's internal procedures. The practical question is how to join the history of a physical component across organizations without assuming that every contributor uses the same software or has the same access rights."
    ],
    operatingModel: [
      { title: "1. Bind the record to a physical identifier", detail: "Choose one component family and document how serial or lot IDs are attached, read and checked. Name the issuer and the replacement-label process. A valid event attached to the wrong part is still a traceability failure. Inspect the physical-to-digital link rather than assuming the database establishes it." },
      { title: "2. Agree on event meaning", detail: "Define manufacture, shipment, receipt, inspection, rejection and correction events. Require source-system ID, contributing organization, event time and recording time. A delayed upload should not be mistaken for a late physical delivery. Keep the vocabulary small enough that both suppliers and receiving teams use it consistently." },
      { title: "3. Limit supplier visibility", detail: "Build a field-level access matrix before sharing production data. A plant may need component history without another supplier's prices or unrelated customer records. Test with separate supplier identities, including a revoked account. An administrator's successful demonstration says little about these boundaries." },
      { title: "4. Correct without hiding history", detail: "Rehearse an incorrect lot, duplicate scan and wrong destination. Define who proposes and approves corrections and how a user sees the superseded event. Reconcile the shared history with dispatch and receiving records before closing the exception. Preserve why the correction happened, not just its final value." },
      { title: "5. Design an outage path", detail: "Specify how receiving continues when a scanner, integration or shared service is unavailable. Queue stable event IDs and retain local evidence for later reconciliation. Test restoration with duplicate submissions. An absent shared event does not prove that a part was never shipped." }
    ],
    milestones: [
      { date: "2019", title: "Front-light pilot", detail: "BMW reported a successful component-tracking exercise." },
      { date: "March 31, 2020", title: "Disclosure and expansion intention", detail: "BMW published the pilot account and planned supplier expansion. Completion is not certified here." },
      { date: "November 3, 2026", title: "Evidence review", detail: "FluidRWA reviewed the original release. No current adoption total or controlled cost comparison was established." }
    ],
    outcomes: [
      { value: "Historical pilot", label: "Evidence status", context: "Company-reported, not an independent technology audit." },
      { value: "Unconfirmed", label: "Current footprint", context: "A dated expansion plan is not a current supplier count." },
      { value: "Not measured", label: "Savings in this review", context: "No comparable labor or dispute dataset was available in the reviewed source." }
    ],
    updates: ["Keep the pilot date, expansion intention and evidence-review date distinct.", "Component traceability, raw-material due diligence and a digital product passport are different scopes; none automatically proves the others."],
    successFactors: [
      "Proposed pilot: one component, two contributing organizations and a receiving team. Use synthetic or authorized sample records and define acceptance before starting.",
      "Include duplicate scans, wrong lots, an offline scanner, a missing event and a revoked supplier identity. Require an owner and an explanation for every unresolved mismatch.",
      "Measure time to reconstruct a history, missing-event rate, correction effort and discrepancies against the existing process. Do not measure only the time to write to the ledger.",
      "Request a human-readable export containing identifiers, provenance and correction history. Reconstruct a sample history from that export before assuming the buyer can leave the platform."
    ],
    limitations: [
      "The deployment account relies on a dated BMW disclosure, not independent observation.",
      "Company language about resistance to manipulation is not adopted as a guarantee. False inputs, compromised identities and physical substitution remain separate risks.",
      "No current availability, participation, unit cost or return on investment is inferred.",
      "The proposed controls and tests are FluidRWA analysis, not claims about BMW's implementation.",
      "A shared event history does not itself establish legal title, product safety, sourcing compliance or authenticity."
    ],
    sourceRecords: ["BMW Group: BMW Group uses Blockchain to drive supply chain transparency, March 31, 2020, pages 1-2; reviewed November 3, 2026. https://www.press.bmwgroup.com/global/article/attachment/T0307164EN/448609"]
  }
}];
