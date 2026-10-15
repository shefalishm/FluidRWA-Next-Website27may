import type { UseCase } from "./useCases";
import type { UseCaseGuide } from "./useCaseGuides";

const updatedAt = "2026-10-15";
const verifiedThrough = "October 15, 2026";
const tokenization = { label: "Tokenization Platforms", href: "/vendors/tokenization-platforms" };
const custody = { label: "Crypto Custody Providers", href: "/vendors/crypto-custody-providers" };

function guide(slug: string, title: string, answer: string, audience: string, questions: string[], faqs: UseCaseGuide["faqs"]): UseCaseGuide {
  return {
    title, answer, audience, questions, faqs, group: "Financial services",
    workflow: [], controls: [], measures: [], pilot: [],
    notFit: "The historic deployment does not establish eligibility, licensing or suitability for a proposed product.",
    reference: { label: "FluidRWA research record", href: `/use-cases/${slug}#sources`, note: "Public primary records; issuer statements are not independent operational assurance." }
  };
}

export const october15CaseStudies: (UseCase & { guide: UseCaseGuide })[] = [
  {
    slug: "hong-kong-multicurrency-digital-green-bonds-case-study",
    title: "Hong Kong's Multi-Currency Digital Green Bonds",
    industry: "Documented Sovereign Bond Case Study", updatedAt,
    image: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Illustrative Hong Kong skyline, not an image of the digital green bond platform",
    visualLabel: "Issued Sovereign Bonds", visualKicker: "Hong Kong Digital Green Bonds",
    summary: "How a 2024 four-currency sovereign digital bond issuance connected a blockchain platform to CMU, international clearing and green-bond disclosures.",
    seoDescription: "Hong Kong 2024 digital green bonds case study: four currencies, HK$6 billion equivalent, CMU clearing, HSBC Orion, investor record and evidence limits.",
    problem: "A sovereign bond program must connect issuance, legal holding, payment, international access and sustainability reporting without assuming that a blockchain record replaces established settlement institutions.",
    stack: ["Sovereign green bond program", "Four-currency issuance", "HSBC Orion digital-bond platform", "CMU clearing and settlement", "Euroclear and Clearstream access", "Green-bond disclosure records"],
    vendorCategories: [tokenization, custody, { label: "Institutional Trading Infrastructure", href: "/vendors/institutional-trading-infrastructure" }],
    example: "A completed 2024 sovereign issuance, not a projection of future digital-bond market size or unrestricted public-token trading.",
    guide: guide(
      "hong-kong-multicurrency-digital-green-bonds-case-study",
      "Hong Kong digital green bonds: how the market infrastructure connected",
      "Hong Kong's February 2024 digital green bonds were issued in HKD, RMB, USD and EUR for about HK$6 billion equivalent. The official announcement describes HSBC Orion, CMU settlement and links to international clearing systems. The useful lesson is not that a bond became permissionless: issuance and investor access still depended on defined institutional and legal channels.",
      "Debt capital markets, public issuers, clearing institutions and tokenization teams",
      ["Which ledger is authoritative for the bondholder record?", "How do direct and indirect holdings differ legally?", "Who moves cash and bonds at settlement?", "Which post-issuance data can be published in machine-readable form?", "What happens when a clearing link is unavailable?"],
      [
        { q: "Was the 2024 Hong Kong digital green bond only a pilot?", a: "No. The Hong Kong Monetary Authority announced a completed multi-currency issuance in February 2024. The public record does not, by itself, establish secondary-market liquidity or operating cost savings." },
        { q: "Does every investor hold a token directly?", a: "No. The holding and settlement chain can include CMU, Euroclear, Clearstream and custodians. Buyers must distinguish direct platform records from indirect investor interests." },
        { q: "How is this different from the 2023 Hong Kong tokenized bond?", a: "The 2024 transaction was a second government digital-green-bond issuance, with four currencies and broader institutional clearing connections. The 2023 transaction preceded it." }
      ]
    ),
    caseStudy: {
      company: "Government of the Hong Kong Special Administrative Region", status: "Completed sovereign digital green-bond issuance", verifiedThrough,
      background: [
        "The Hong Kong Monetary Authority announced the government's second digital green-bond issuance on February 7, 2024. It comprised HKD, RMB, USD and EUR tranches totalling about HK$6 billion equivalent. The 2024 issue followed the government's first tokenized green bond in 2023. These are specific completed transactions, not a live estimate of the whole tokenized-bond market.",
        "A bond still needs recognized debt obligations, investor records, payment arrangements and settlement access. Digitizing part of that lifecycle does not erase custody tiers or turn a sovereign security into a freely transferable retail token.",
        "The official release identifies HSBC Orion as the digital-assets platform and the Central Moneymarkets Unit (CMU) as the clearing and settlement system, with access through international central securities depositories. Green-bond disclosures remain part of the product rather than a blockchain substitute for reporting.",
        "This case focuses on cross-currency issuance and market-infrastructure access. It is distinct from corporate tokenization pilots and from the World Bank bond-i case below, which is useful for observing a documented issuance-to-redemption lifecycle."
      ],
      operatingModel: [
        { title: "1. Define the legal issue", detail: "The government issued debt securities under its green-bond program, with currency tranches and investor terms. Buyers should establish what the legal bond instrument says before treating a ledger entry as proof of a direct claim." },
        { title: "2. Record issuance on the digital platform", detail: "The HKMA identifies HSBC Orion as the platform supporting the digital-bond transaction. A buyer should map which platform events create or alter the authoritative record and who may correct an error." },
        { title: "3. Settle through connected institutions", detail: "CMU was part of clearing and settlement, with links to international central securities depositories. Direct platform participants and indirect investors may hold through different legal chains. A technology diagram alone cannot resolve that distinction." },
        { title: "4. Service the bond and green disclosures", detail: "The bond remains subject to debt servicing and green-bond information requirements. FluidRWA recommends testing coupon, redemption, investor reporting and exceptions as separate states rather than calling a successful issuance complete lifecycle proof." }
      ],
      milestones: [
        { date: "2023", title: "First government tokenized green bond", detail: "The government's earlier issuance established the program's first tokenized-bond transaction." },
        { date: "February 7, 2024", title: "Multi-currency issuance announced", detail: "HKMA announced four currency tranches with an aggregate size of about HK$6 billion equivalent." },
        { date: "2024 annual report", title: "Market-infrastructure record", detail: "HKMA's annual report discusses the digital-bond program and its international financial-centre context." },
        { date: updatedAt, title: "Research review", detail: "FluidRWA rechecked the official transaction announcement and annual report; this is not a new issuance date." }
      ],
      outcomes: [
        { value: "4", label: "Currency tranches", context: "HKD, RMB, USD and EUR in the February 2024 official release." },
        { value: "~HK$6B", label: "Issued equivalent", context: "Dated transaction size, not current outstanding value or market-wide assets." },
        { value: "Not verified", label: "Net cost or liquidity gain", context: "The reviewed public records do not establish independently audited issuer savings or a secondary-market liquidity uplift." }
      ],
      updates: [
        "The 2024 transaction followed a 2023 first issue, showing repeat sovereign issuance rather than a one-off prototype.",
        "The international clearing links matter because a digital security still needs a practical holding path for institutional investors.",
        "No current trading volume, holder count or price is inferred from the issuance announcement. Those would require separately dated records."
      ],
      successFactors: [
        "FluidRWA interpretation: named infrastructure roles made the transaction understandable to existing market participants. This is a design inference, not a measured adoption effect.",
        "Four currency tranches tested a broader issuance workflow than a single-currency demonstration.",
        "Green-bond disclosures and institutional access were considered alongside digital issuance, rather than left for a later phase."
      ],
      limitations: [
        "Government and HKMA records are primary evidence of their own transaction, not independent assurance of future performance.",
        "A completed primary issuance does not prove continuous secondary trading or universal investor access.",
        "Direct and indirect holdings must not be presented as equivalent legal interests without the relevant account and bond documents.",
        "No verified fee saving, faster settlement benchmark or environmental impact result is claimed here."
      ],
      sourceRecords: [
        "Hong Kong Monetary Authority: Government's multi-currency digital green bonds, February 7, 2024. https://www.hkma.gov.hk/eng/news-and-media/press-releases/2024/02/20240207-6",
        "Hong Kong Monetary Authority: 2024 Annual Report, International Financial Centre section. https://www.hkma.gov.hk/media/eng/publication-and-research/annual-report/2024/16_International_Financial_Centre.pdf"
      ]
    }
  },
  {
    slug: "world-bank-bondi-blockchain-bond-lifecycle-case-study",
    title: "World Bank Bond-i: Issuance to Redemption",
    industry: "Documented Bond Lifecycle Case Study", updatedAt,
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Illustrative finance workspace, not the World Bank bond-i ledger",
    visualLabel: "Completed Bond Lifecycle", visualKicker: "World Bank bond-i",
    summary: "What the World Bank's A$110 million 2018 bond-i showed about permissioned bond records, conventional cash settlement and documented redemption.",
    seoDescription: "World Bank bond-i case study: A$110 million 2018 issuance, Commonwealth Bank platform, off-chain cash, 2020 redemption and evidence limits.",
    problem: "Digital bond records need to survive issuance, servicing and redemption while investor access and cash settlement remain operationally and legally controlled.",
    stack: ["World Bank debt security", "Commonwealth Bank platform", "Permissioned blockchain record", "Authorized investors", "Off-chain cash settlement", "Coupon and redemption servicing"],
    vendorCategories: [tokenization, custody, { label: "Institutional Trading Infrastructure", href: "/vendors/institutional-trading-infrastructure" }],
    example: "A completed two-year bond lifecycle; it does not prove that every cash or securities step was onchain.",
    guide: guide(
      "world-bank-bondi-blockchain-bond-lifecycle-case-study",
      "World Bank bond-i: what the full lifecycle established",
      "The World Bank issued A$110 million of bond-i in August 2018 through a platform developed with Commonwealth Bank of Australia. Its retrospective materials describe issuance, servicing and redemption through 2020. The blockchain recorded part of the bond process, while the original presentation described cash settlement off-chain. This makes bond-i a useful lifecycle example, not proof of end-to-end onchain settlement.",
      "Debt issuers, arrangers, transfer agents and settlement teams",
      ["What is the official ownership register?", "Who can become an authorized platform participant?", "Where does cash settle?", "How are coupon and redemption events evidenced?", "Which manual steps remain outside the ledger?"],
      [
        { q: "Was bond-i fully settled onchain?", a: "No. The World Bank's 2018 presentation described a permissioned bond platform with cash settlement off-chain. Do not describe the historic issue as atomic onchain cash-versus-bond settlement." },
        { q: "Did the bond complete its lifecycle?", a: "World Bank retrospective material describes issuance, servicing and redemption over 2018-2020. This is stronger lifecycle evidence than an issuance-only announcement." },
        { q: "Does bond-i prove cost savings?", a: "No customer-specific audited savings figure is established by the reviewed primary records. The case demonstrates an operating model, not a quantified return on investment." }
      ]
    ),
    caseStudy: {
      company: "World Bank and Commonwealth Bank of Australia", status: "Completed 2018-2020 bond lifecycle", verifiedThrough,
      background: [
        "In August 2018 the World Bank issued bond-i, an Australian-dollar bond with a reported A$110 million issue amount. Commonwealth Bank of Australia developed the blockchain platform used for the transaction. The issue had a two-year term.",
        "The important research question is what moved to the ledger and what did not. The World Bank's contemporary presentation described a permissioned blockchain, authorized investors and a bond register, while cash settlement remained off-chain. The existence of a tokenized bond record therefore does not imply an atomic onchain cash leg.",
        "Later World Bank reflections describe issuance, servicing and redemption across 2018-2020. That makes this more informative than an issue-date press release: a bond is a continuing obligation with coupon and maturity events.",
        "This page treats the World Bank's own records as evidence of the reported transaction, not as an independent audit of efficiencies or a current product offering from either institution."
      ],
      operatingModel: [
        { title: "1. Admit participants", detail: "The original transaction used a permissioned environment and authorized investors. For any replication, document onboarding, account authority and the legal effect of a platform account before building the interface." },
        { title: "2. Issue and register the bond", detail: "The World Bank was the debt issuer and the platform recorded bond activity. A buyer should distinguish the security's contractual claim from its electronic representation and define who can correct the register." },
        { title: "3. Match the off-chain cash leg", detail: "The original presentation described cash settlement outside the blockchain. A team must reconcile funds receipt with the bond record and design for a mismatch or delayed cash movement." },
        { title: "4. Service and redeem", detail: "Coupon and maturity obligations persist after issuance. The World Bank's retrospective describes the bond's redemption in 2020. Use dated servicing records to judge the full operating model; do not infer that every exception was automated." }
      ],
      milestones: [
        { date: "August 2018", title: "A$110 million issue", detail: "The World Bank's primary materials describe the two-year bond-i launch." },
        { date: "August 28, 2018", title: "Settlement", detail: "The World Bank's original presentation gives the settlement date and permissioned-ledger arrangement." },
        { date: "August 28, 2020", title: "Maturity", detail: "The original transaction terms provide the two-year maturity date; the later World Bank retrospective describes redemption." },
        { date: updatedAt, title: "Research review", detail: "FluidRWA checked the issue presentation and World Bank retrospective. This is not a new transaction milestone." }
      ],
      outcomes: [
        { value: "A$110M", label: "Dated issue size", context: "The 2018 issue amount, not a live market balance." },
        { value: "2018-2020", label: "Documented lifecycle", context: "World Bank retrospective describes issuance, servicing and redemption." },
        { value: "Off-chain", label: "Cash settlement in original model", context: "The blockchain record did not make the cash leg fully onchain." }
      ],
      updates: [
        "World Bank retrospective material now allows a lifecycle view rather than only the launch narrative.",
        "The transaction remains historically instructive even though current tokenized-bond platforms and rules have evolved.",
        "No current issuance program, trading activity or market share is inferred from this 2018 issue."
      ],
      successFactors: [
        "FluidRWA interpretation: a bounded, authorized participant set made responsibilities and record access explicit.",
        "A two-year instrument created observable servicing and maturity events, allowing more than an issuance-only evaluation.",
        "Naming the off-chain cash leg prevents a misleading claim that bond-i demonstrated fully digital settlement."
      ],
      limitations: [
        "The World Bank's records are primary issuer evidence, not an independent cost or security assessment.",
        "The transaction was permissioned and historical; it should not be generalized to unrestricted public-chain securities.",
        "No audited processing-time or cost saving is claimed.",
        "A bond register and cash settlement can fail or disagree; the public material does not disclose every exception procedure."
      ],
      sourceRecords: [
        "World Bank Treasury: bond-i issue summary, reviewed October 15, 2026. https://documents.worldbank.org/en/about/unit/treasury/about",
        "World Bank: Blockchain and bond-i transaction presentation, November 2018. https://thedocs.worldbank.org/en/doc/421351543860110674-0340022018/original/WebinarBlockchainPresentation2018.11.29.pdf",
        "World Bank: Digitalization and bond market efficiencies, retrospective on issuance, servicing and redemption. https://documents.worldbank.org/en/about/unit/treasury/impact/digitalization-and-bond-market-efficiencies"
      ]
    }
  }
];
