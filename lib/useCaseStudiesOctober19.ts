import type { UseCase } from "./useCases";
import type { UseCaseGuide } from "./useCaseGuides";

const updatedAt = "2026-10-19";
const verifiedThrough = "October 19, 2026";
const development = { label: "Blockchain Development Companies", href: "/vendors/blockchain-development-companies" };
const contracts = { label: "Smart Contract Development Companies", href: "/vendors/smart-contract-development-companies" };

function guide(slug: string, title: string, group: UseCaseGuide["group"], answer: string, audience: string, questions: string[], faqs: UseCaseGuide["faqs"]): UseCaseGuide {
  return {
    title, group, answer, audience, questions, faqs,
    workflow: [], controls: [], measures: [], pilot: [],
    notFit: "A public deployment record does not establish the economics or suitability of another implementation.",
    reference: { label: "FluidRWA research record", href: `/use-cases/${slug}#sources`, note: "Dated participant disclosures and public product documents, with research limits stated below." }
  };
}

export const october19CaseStudies: (UseCase & { guide: UseCaseGuide })[] = [
  {
    slug: "walmart-canada-dl-freight-invoice-reconciliation-case-study",
    title: "Walmart Canada DL Freight: Invoice Reconciliation",
    industry: "Documented Logistics Case Study", updatedAt,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Illustrative warehouse and freight operations, not a screenshot of Walmart Canada's DL Freight platform",
    visualLabel: "Shared Freight Records", visualKicker: "Walmart Canada DL Freight",
    summary: "How Walmart Canada and DLT Labs connected shipment events, agreed charges and carrier invoices, and what their dated dispute-reduction figures actually establish.",
    seoDescription: "Walmart Canada DL Freight case study: shared freight invoices, Hyperledger Fabric, 2020 dispute results, operating controls and implementation lessons.",
    problem: "A carrier and its customer can calculate different charges from the same shipment when rates, fuel adjustments, delivery events and exceptions sit in separate systems.",
    stack: ["Shipment and rate data", "DL Freight application", "Hyperledger Fabric permissioned ledger", "Carrier-system integration", "Shared invoice calculation", "Payment authorization and accounting"],
    vendorCategories: [development, contracts],
    example: "The September 2020 Walmart disclosure described national adoption. Its figures are historical observations, not a measurement of current 2026 performance.",
    guide: guide(
      "walmart-canada-dl-freight-invoice-reconciliation-case-study",
      "Walmart Canada DL Freight: how shared invoices reduced disputes",
      "Enterprise operations",
      "Walmart Canada adopted DL Freight to give the retailer and its carriers a shared basis for calculating freight invoices. Walmart's September 2020 announcement reported about 500,000 loads annually, around 2% discrepancies and a 97% reduction from previous dispute levels. The documented use case is coordination of shipment and billing records; the published figures do not establish current savings, current transaction volume or payment in cryptocurrency.",
      "Logistics, accounts payable, carrier management and enterprise integration teams",
      ["Which contract version and rate inputs produced this invoice?", "Who can correct a late or disputed shipment event?", "Which information can each carrier see?", "Does approval trigger a bank instruction, an accounting entry or both?", "How will we measure disputes without excluding difficult loads?"],
      [
        { q: "Did Walmart Canada pay freight carriers with cryptocurrency?", a: "The reviewed records describe blockchain-based invoice coordination and payment authorization. They do not establish payment using cryptocurrency. A shared invoice ledger and the asset used to pay an invoice are separate design choices." },
        { q: "What results did Walmart publicly report?", a: "Its September 2020 announcement described about 500,000 loads annually, around 2% discrepancies and a 97% reduction from prior dispute levels. These are participant-reported historical figures, not independently measured current results." },
        { q: "Was DL Freight a public blockchain?", a: "The implementation case study describes Hyperledger Fabric, permissioned participants and confidential relationships between Walmart and individual carriers." },
        { q: "Could a conventional shared database achieve similar results?", a: "The public records do not provide a controlled comparison that isolates the effect of blockchain. Teams should compare governance, data access, integration effort and cost against an appropriately designed conventional alternative." }
      ]
    ),
    caseStudy: {
      company: "Walmart Canada and DLT Labs", status: "Historical production deployment; current metrics not disclosed in reviewed records", verifiedThrough,
      background: [
        "Freight invoices combine agreed rates with events that happen during a journey. Waiting time, fuel adjustments and delivery changes can create different totals when a shipper and a carrier maintain separate records. The resulting dispute delays approval and forces both sides to reconstruct what happened.",
        "Walmart Canada's September 2020 release described DL Freight as its national standard for freight invoicing and payment management across carriers. That announcement is direct evidence of the retailer's reported implementation and outcomes at that time. It is not a current operating dashboard.",
        "The implementation account published by LF Decentralized Trust describes a Hyperledger Fabric system built with DLT Labs. It connects legacy carrier systems and supports confidential data sharing. Its distinctive design decision was to agree the invoice from a shared record, rather than compare separately generated bills after delivery.",
        "This case differs from food provenance: the unit being reconciled is a shipment and its payable charges. A successful implementation needs reliable commercial inputs and agreed correction procedures even when the underlying ledger preserves the history."
      ],
      operatingModel: [
        { title: "1. Agree the commercial inputs", detail: "The implementation account describes shared calculations and contractual governance. For a comparable project, FluidRWA recommends versioning rate cards, fuel formulas, effective dates and exception rules. An accurately executed calculation can still produce a disputed bill when the parties disagree about its inputs." },
        { title: "2. Connect shipment evidence", detail: "Shipment records from existing systems feed the common process. Define which party is authoritative for departure, delivery, waiting time and changes, and retain both the original event and any correction. These are proposed implementation controls; the public case does not disclose every field or interface in Walmart's production environment." },
        { title: "3. Calculate under controlled visibility", detail: "The published technical account describes permissioned Hyperledger Fabric channels protecting relationships between each carrier and Walmart. Procurement should test access using actual participant roles: a carrier, subcontractor, finance analyst and administrator should each see only the information their role requires." },
        { title: "4. Approve, pay and reconcile", detail: "The public account connects invoice calculation to payment authorization. The bank payment and accounting close still need identifiers that link back to the approved obligation. Test a duplicate event, corrected rate, rejected payment and partial credit before declaring an invoice-to-cash workflow complete." }
      ],
      milestones: [
        { date: "2019 implementation period", title: "Development and pilot described", detail: "The technical case study documents configuration, integration and a pilot before national deployment. This page does not assign an exact launch day from inconsistent retrospective descriptions." },
        { date: "September 2020", title: "National implementation publicly described", detail: "Walmart Canada reported adoption across carriers and published annual-load and discrepancy figures." },
        { date: "Published implementation account", title: "Architecture and operating results documented", detail: "LF Decentralized Trust's case study describes shared calculation, permissioned data access and historical invoice processing. Its metrics belong to that deployment period." },
        { date: "October 19, 2026", title: "Public-record review", detail: "FluidRWA checked the available retailer announcement and implementation account. No newer audited client-level operating result was established in these reviewed records." }
      ],
      outcomes: [
        { value: "~500,000", label: "Loads annually in the 2020 disclosure", context: "Walmart Canada's dated statement; not a current throughput figure." },
        { value: "~2%", label: "Discrepancies reported in 2020", context: "The retailer also reported a 97% reduction from previous dispute levels. The underlying denominator and audit workpapers are not published here." },
        { value: "Undisclosed", label: "Cash ROI", context: "The implementation case study treats the financial return as confidential. FluidRWA has not calculated or invented a savings percentage." }
      ],
      updates: [
        "The reviewed public record supports a historical production case, with both the retailer's announcement and a detailed implementation account available for inspection.",
        "The case study's approximately 1.5% discrepancy figure and Walmart's approximately 2% figure are separate published descriptions. They are not combined into a new benchmark or presented as contradictory current measurements.",
        "Present-day carrier coverage, software version, operating cost and service levels remain unverified in the reviewed material. A prospective buyer should request a recent reference call and current evidence."
      ],
      successFactors: [
        "FluidRWA interpretation: the business problem was narrow enough to measure with disputed invoices and approval time, instead of a general claim of digital transformation.",
        "A shared calculation can remove disagreements caused by duplicate records when all parties accept the governing inputs and rules.",
        "Integration with existing carrier systems makes participation possible without requiring every firm to replace its transport software.",
        "A useful next implementation would baseline dispute count, disputed value, exception age and support hours together, so a lower dispute rate cannot hide slower handling of difficult cases."
      ],
      limitations: [
        "The public results come from participants and an ecosystem implementation account; FluidRWA did not audit the deployment.",
        "The evidence does not isolate blockchain's contribution from better data, integration and process redesign.",
        "Historical discrepancy rates do not establish a current SLA or a result another customer will achieve.",
        "Keeping a record of a shipment event does not prove that a sensor, driver entry or commercial charge was correct."
      ],
      sourceRecords: [
        "Walmart Canada: Walmart Canada et DLT Labs recompensees pour l'innovation dans la chaine d'approvisionnement, September 2020; French-language corporate release. https://www.walmartcanada.ca/content/walmart-canada/fr_ca/news/2020/09/01/walmart-canada-and-dlt-labs-recognized-for-supply-chain-innovation.html",
        "LF Decentralized Trust: DLT Labs & Walmart Canada Transform Freight Invoice Management with Hyperledger Fabric; historical implementation case study, accessed October 19, 2026. https://www.lfdecentralizedtrust.org/case-studies/dltlabs-case-study"
      ]
    }
  },
  {
    slug: "de-beers-tracr-diamond-traceability-case-study",
    title: "De Beers Tracr: Diamond Traceability",
    industry: "Documented Physical-Asset Provenance Case Study", updatedAt,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Illustrative jewellery displaying physical gems, not an authenticated Tracr diamond record",
    visualLabel: "Physical Asset Provenance", visualKicker: "De Beers Tracr",
    summary: "How Tracr links a rough diamond's physical characteristics to a digital identity, follows manufacturing records and supports origin information through the supply chain.",
    seoDescription: "De Beers Tracr case study: physical diamond identity, scanning, blockchain provenance, data permissions, origin claims and evidence limits.",
    problem: "A durable digital record has limited value if a physical diamond cannot be reliably matched to the right record as it is cut, polished, transferred and sold.",
    stack: ["Physical scanning and measurement", "Digital diamond identity", "Participant-controlled provenance records", "Rough-to-polished matching", "Manufacturing and grading data", "Retail origin information"],
    vendorCategories: [development, contracts],
    example: "An operational provenance platform. A recorded diamond identity is not an investment token or proof of transferable ownership rights.",
    guide: guide(
      "de-beers-tracr-diamond-traceability-case-study",
      "De Beers Tracr: connecting a physical diamond to a digital record",
      "Enterprise operations",
      "Tracr is De Beers Group's blockchain-enabled diamond traceability platform. It registers rough diamonds at source and connects identifying information with later supply-chain records. The useful lesson is the physical-to-digital link: scans, participant controls and manufacturing evidence give meaning to the ledger. De Beers' current provenance page displays five million rough diamonds individually scanned; that page-level figure has no explicit reporting date and is not treated here as a current count of fully traced retail stones.",
      "Commodity producers, jewellery retailers, provenance teams and product-passport builders",
      ["What physical evidence links this item to its digital identity?", "How is a rough stone matched to polished output?", "Which origin claim can the record support?", "Who may correct an identity or manufacturing mismatch?", "What happens when one participant does not supply downstream data?"],
      [
        { q: "Does Tracr tokenize diamond ownership?", a: "The reviewed materials describe identity and traceability records for physical diamonds. They do not establish that a Tracr entry is a freely transferable investment token or the legal title to a diamond." },
        { q: "Does blockchain prove a diamond's origin by itself?", a: "No. Origin evidence depends on registration, physical identification, participant data and chain-of-custody controls. The ledger records evidence; its durability does not independently validate the original input." },
        { q: "How many diamonds does Tracr track?", a: "De Beers' current provenance page displays five million rough diamonds individually scanned. Its separate case-study page states over three million registered at source. Different wording, scope and unstated reporting dates prevent treating those figures as a clean growth series or count of completed retail journeys." },
        { q: "Can any business join?", a: "De Beers' case-study page says diamond businesses must meet participation criteria, including RJC membership. Current onboarding conditions should be confirmed with the platform." }
      ]
    ),
    caseStudy: {
      company: "De Beers Group / Tracr", status: "Operational physical-diamond traceability platform", verifiedThrough,
      background: [
        "A diamond's journey includes mining, sorting, rough sales, cutting, polishing, grading and retail. A record can remain unchanged while the object changes shape or moves between businesses. Traceability therefore needs a defensible way to associate each stage with the same originating material.",
        "De Beers announced Tracr's deployment at scale on May 5, 2022, following an R&D phase begun in 2018. That release described participant permission over data sharing and the ambition to carry provenance through the value chain. The stated ability to handle a million registrations weekly was a capacity claim, not an observed weekly processing figure.",
        "De Beers' 2022 sustainability report explains the physical linkage: scanning and measurement at source create identifying data that can accompany a stone into manufacturing. The later platform case study describes collaboration with Sarine to strengthen rough-to-polished verification through scanning information.",
        "The product question is whether a particular provenance statement has sufficient supporting evidence. A digital identity, a certificate, an ownership claim and a sustainability claim answer different questions; a buyer should not collapse them into one badge."
      ],
      operatingModel: [
        { title: "1. Register the physical asset", detail: "Source registration associates measured characteristics with a digital identity. FluidRWA recommends examining device calibration, operator permissions, duplicate detection and rejected scans. These are suggested diligence tests, not a claim that all implementation details are public." },
        { title: "2. Record changes through manufacturing", detail: "Tracr's published case study describes scanning information and matching through rough and polished stages. For another physical-asset program, define how a split, merge, repair or transformation changes identity. A ledger timestamp alone does not demonstrate that the correct object was presented." },
        { title: "3. Share evidence with permission", detail: "The scale-launch announcement describes participant control over sharing. Buyers should map a record's producer, permitted recipients and export path. Confidential commercial data and a consumer-facing origin statement can require different views of the same journey." },
        { title: "4. Present a claim with its scope", detail: "A retailer needs a statement that matches the evidence actually available for that stone. FluidRWA recommends separately recording country of origin, custody continuity, manufacturing verification and supporting document dates. Missing downstream records should remain visible instead of being filled by an assumption." }
      ],
      milestones: [
        { date: "2018", title: "R&D phase", detail: "The 2022 scale-launch release identifies 2018 as the start of Tracr's research and development phase." },
        { date: "May 5, 2022", title: "Scale deployment announced", detail: "De Beers announced deployment for its production, with data-sharing controls and capacity plans described in the release." },
        { date: "2022 sustainability report", title: "Physical-to-digital workflow documented", detail: "The report explains scanning, digital identity and the journey from source through manufacturing and retail." },
        { date: "October 19, 2026", title: "Current pages reviewed", detail: "FluidRWA reviewed De Beers' provenance page and Tracr case study. Their displayed counts use different labels and are retained with that distinction." }
      ],
      outcomes: [
        { value: "5 million", label: "Rough diamonds individually scanned", context: "Displayed on De Beers' provenance page at review. The page does not give an explicit reporting date for this counter." },
        { value: "Over 3 million", label: "Registered at source in a separate case study", context: "Different page and wording. This is not added to the scanned count or used to calculate growth." },
        { value: "Unverified", label: "Completed retail journeys or ROI", context: "The reviewed records do not provide a reconciled count of end-to-end retail journeys or an independently audited financial return." }
      ],
      updates: [
        "The current case-study page describes Sarine collaboration and physical scanning evidence supporting rough-to-polished matching.",
        "It also describes country-of-origin traceability for a defined category of registered stones as of 2025. That scoped statement is not extended to every diamond in every supply chain.",
        "The provenance page presents Tracr alongside broader sourcing and chain-of-custody programs. Those programs supply distinct kinds of evidence; participation in one is not treated as automatic validation of every other claim."
      ],
      successFactors: [
        "FluidRWA interpretation: starting with physical identification addresses a problem that a digital ledger alone cannot solve.",
        "Defined participation and controlled sharing can help businesses contribute data without exposing every commercial relationship.",
        "Manufacturing evidence matters because the asset changes physically during its journey.",
        "For a new deployment, publish coverage at each stage: registered at source, matched after processing and available at retail. This would let buyers distinguish catalog size from complete traceability."
      ],
      limitations: [
        "The public materials are De Beers' descriptions and counts, not an independent audit performed by FluidRWA.",
        "Scanned, registered and fully traced are different measures. No current market share or growth percentage is calculated here.",
        "An immutable record can preserve an incorrect input. Physical verification and authorized corrections remain necessary.",
        "Provenance does not by itself establish investment value, legal title, environmental impact or the absence of all supply-chain misconduct."
      ],
      sourceRecords: [
        "De Beers Group: Tracr scale-deployment announcement, May 5, 2022. https://www.debeersgroup.com/news-insights/business-market/2022/de-beers-group-introduces-worlds-first-blockchain-backed-diamond-source-platform-at-scale",
        "De Beers Group: Building Forever Sustainability Report 2022, page 42. https://www.debeersgroup.com/~/media/Files/D/debeers-v2/documents/results-and-presentations/historical-sustainability-reports/2022/building-forever-our-2022-sustainability-report.pdf",
        "De Beers Group: Tracr case study; current text includes 2025 scope statements, accessed October 19, 2026. https://www.debeersgroup.com/about-us/case-studies/2024/tracr",
        "De Beers Group: Provenance; scanned-diamond counter has no explicit reporting date, accessed October 19, 2026. https://www.debeersgroup.com/sustainability/provenance"
      ]
    }
  },
  {
    slug: "lufthansa-uptrip-digital-collectibles-loyalty-case-study",
    title: "Lufthansa Uptrip: Digital Collectibles and Loyalty",
    industry: "Documented Consumer Loyalty Case Study", updatedAt,
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Illustrative aircraft wing seen during travel, not a Lufthansa Uptrip product screenshot",
    visualLabel: "Loyalty and Collectibles", visualKicker: "Lufthansa Uptrip",
    summary: "How Uptrip turns eligible travel into collectible cards and rewards, where optional NFTs fit, and why a wallet token does not override a loyalty program's rules.",
    seoDescription: "Lufthansa Uptrip case study: boarding-pass cards, optional NFT minting, Original-card rules, reward redemption, privacy and buyer lessons.",
    problem: "A loyalty product must turn a verified customer action into an understandable reward while preventing duplicate claims and maintaining eligibility across app and wallet records.",
    stack: ["Travel action and identity checks", "Digital collectible cards", "Collection eligibility rules", "Optional personal crypto wallet", "NFT minting and app return", "Reward delivery and support"],
    vendorCategories: [development, contracts, { label: "Identity Solutions", href: "/vendors/identity-solution-providers" }],
    example: "A publicly documented consumer app associated with Lufthansa Innovation Hub and Miles & More. Its availability does not establish independently measured retention or commercial success.",
    guide: guide(
      "lufthansa-uptrip-digital-collectibles-loyalty-case-study",
      "Lufthansa Uptrip: how optional NFTs fit into airline loyalty",
      "Consumer applications",
      "Uptrip lets users collect cards from eligible travel actions, complete collections and claim specified rewards. Lufthansa's innovation material identifies Lufthansa Innovation Hub and Miles & More as the project participants. Current Uptrip terms make NFT minting optional through a connected personal wallet, and require a wallet-held card to return to the app for use in a collection. The core buyer lesson is to design reward eligibility and fulfilment before adding token portability.",
      "Airline, travel, loyalty, consumer-product and wallet-integration teams",
      ["Which action qualifies and how is it verified?", "Does a transferred card retain eligibility for this reward?", "What proves that a card has already been redeemed?", "Who handles a failed mint, missing card or unavailable reward?", "Which personal data must stay separate from public token metadata?"],
      [
        { q: "Is every Uptrip card automatically an NFT?", a: "No. Uptrip's help material says cards received in the app are not automatically NFTs. Users can connect a personal crypto wallet and transfer eligible cards to the blockchain." },
        { q: "Can a user buy all the cards needed for a reward?", a: "It depends on the collection. Current terms distinguish Original cards earned through a user's own qualifying action from Non-Original cards acquired through other channels. Collections can require a minimum number of Original cards." },
        { q: "Can a wallet-held card be used directly for a collection?", a: "Uptrip's terms say the card must be transferred back to the app before it can be used for a collection. Token possession and successful reward redemption are separate states." },
        { q: "Has the NFT feature been proved to increase loyalty?", a: "The primary records reviewed establish the app's design and public availability. They do not provide a controlled retention study, independently audited NFT revenue or a current verified active-user count." }
      ]
    ),
    caseStudy: {
      company: "Lufthansa Innovation Hub / Miles & More / Uptrip", status: "Publicly documented loyalty app with optional NFT functionality", verifiedThrough,
      background: [
        "Lufthansa's innovation project page records Uptrip's public launch in August 2023 and describes collectible cards and rewards as an addition to the existing Miles & More services. The customer proposition starts with an activity the traveller already understands: taking a flight and recording it in an app.",
        "The current Uptrip terms explain that a user can receive cards through qualifying actions such as scanning a boarding pass for a flight personally taken. The registration name must match the travel record. Collection requirements and available rewards are set within the program.",
        "The optional blockchain layer is narrower than a statement that every traveller receives an NFT. The help centre explains that app cards are not automatically NFTs. This distinction matters for customer experience: the program can present its reward journey before asking a user to manage a personal wallet.",
        "A credible evaluation should separately measure adoption of the app, completion of collections, use of the wallet feature and delivery of rewards. Public availability alone does not answer whether token functionality caused stronger engagement."
      ],
      operatingModel: [
        { title: "1. Establish the qualifying action", detail: "The terms connect card issuance to specified actions, including the user's own eligible flight. FluidRWA recommends testing duplicate boarding-pass submission, a changed customer name and a flight outside the supported scope. These are proposed product tests, not claims about internal fraud controls." },
        { title: "2. Apply collection eligibility", detail: "Uptrip's help centre distinguishes Original cards from Non-Original cards and explains minimum Original-card requirements. The lesson for another loyalty program is to define which rights travel with a transferred collectible and which remain tied to the person who earned it." },
        { title: "3. Offer wallet functionality as a separate step", detail: "Eligible cards may be minted using a connected personal wallet under the product terms. A buyer should specify support responsibility for a lost wallet, failed transaction and wrong account connection. These questions remain relevant even when the default journey happens inside an app." },
        { title: "4. Redeem and deliver the benefit", detail: "The terms require a wallet-held card to return to the app for collection use. FluidRWA recommends connecting eligibility, reservation, consumption and fulfilment records so a user cannot receive duplicate rewards or lose a benefit after a partial failure. The reviewed records do not disclose every internal fulfilment control." }
      ],
      milestones: [
        { date: "August 2023", title: "Public app launch recorded", detail: "Lufthansa's innovation page identifies an August 2023 press release and the program's launch with Miles & More." },
        { date: "August 29, 2023 version", title: "Original-card rules documented", detail: "Uptrip's help article identifies a version introducing collection requirements tied to cards earned from the user's own flights." },
        { date: "Current program documents", title: "Optional minting and app return specified", detail: "The available terms and help centre explain that cards need not be minted and describe returning a wallet-held card to the app for collection use." },
        { date: "October 19, 2026", title: "Program records reviewed", detail: "FluidRWA reviewed the project description, terms, privacy notice and card eligibility help. This date is a research cut-off, not a new product release." }
      ],
      outcomes: [
        { value: "Deployed app", label: "Public consumer workflow", context: "Lufthansa's project page and Uptrip's program documents describe the customer journey. This establishes a public product, not a quantified commercial result." },
        { value: "Optional", label: "NFT minting", context: "The help centre distinguishes cards held in the app from cards transferred to a blockchain through a personal wallet." },
        { value: "Not disclosed", label: "Verified retention uplift", context: "No controlled engagement comparison, current audited active-user count or verified NFT-derived revenue was established in the primary records reviewed." }
      ],
      updates: [
        "Current help material continues to distinguish Original and Non-Original cards; the distinction can affect reward eligibility after a transfer.",
        "The Joker Card help article describes a separately purchased substitute subject to limits and explicitly says it cannot be minted as an NFT or traded. That exception shows why a program needs card-type rules beyond a generic token interface.",
        "The privacy notice describes processing flight information for verification and wallet-linking data for optional NFT use. It does not establish that all passenger or booking details are placed on a public blockchain."
      ],
      successFactors: [
        "FluidRWA interpretation: a familiar travel action and named reward make the product easier to explain than a collectible with unspecified utility.",
        "Original-card requirements can connect reward qualification to a customer's own activity while allowing a separate transfer model.",
        "Optional minting lets product teams evaluate the benefit of portability without making wallet use the definition of participation.",
        "A new program should measure completion, fulfilled rewards, support contacts and repeat qualifying activity by cohort. It should test the contribution of token features rather than attributing every app outcome to blockchain."
      ],
      limitations: [
        "Public product documents support the described workflow; FluidRWA did not test live redemption or measure service reliability.",
        "No current user, trading-volume, profit or retention number is asserted.",
        "A card transferred to a wallet does not override eligibility rules, reward availability or the app's contractual terms.",
        "The program's current terms can change. A historical launch announcement is insufficient evidence for today's specific reward entitlement."
      ],
      sourceRecords: [
        "Lufthansa Group Innovation Runway: Uptrip project description and August 2023 launch reference, accessed October 19, 2026. https://innovation-runway.lufthansagroup.com/en/focus-areas-projects/customer-experience/uptrip.html",
        "Lufthansa Innovation Hub: Uptrip project description, accessed October 19, 2026. https://lh-innovationhub.de/en/projekt/uptrip/",
        "Uptrip: Terms and conditions, sections 5 and 5.1; accessed October 19, 2026. https://www.uptrip.app/terms",
        "Uptrip Help: What are Original and Non-Original cards? Version dated August 29, 2023; accessed October 19, 2026. https://support.uptrip.app/article/35/what-are-original-and-non-original-cards",
        "Uptrip Help: Was bedeutet es, dass meine Karten NFTs sind? Optional minting explanation; accessed October 19, 2026. https://support.uptrip.app/article/34/was-bedeutet-es-dass-meine-karten-nfts-sind",
        "Uptrip Help: What is the Uptrip Joker Card and how can I use it? Accessed October 19, 2026. https://support.uptrip.app/article/75/what-is-the-uptrip-joker-card-and-how-can-i-use-it",
        "Uptrip: Privacy policy, flight verification and external crypto-wallet linking; accessed October 19, 2026. https://www.uptrip.app/privacy"
      ]
    }
  }
];
