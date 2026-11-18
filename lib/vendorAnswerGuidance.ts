type Guidance = {
  heading: string;
  answer: string;
  checks: string[];
  guide: string;
  providersHeading?: string;
  providerGroups?: { heading: string; providers: { name: string; line: string }[] }[];
};

const guidance: Record<string, Guidance> = {
  "tokenization-platforms": {
    heading: "How to choose a tokenization platform",
    answer: "Match the platform to your asset, investor restrictions and operating model. Compare software separately from legal structuring, custody and distribution, and ask who performs each service.",
    checks: ["Demonstrated support for your asset and issuance workflow", "Holder eligibility and register reconciliation", "Contract control, exports and exit responsibilities"],
    guide: "what-does-a-tokenization-platform-do"
  },
  "custody-solutions": {
    heading: "Three questions for a custody shortlist",
    answer: "Identify the contracting entity, the assets or keys it safeguards and who can authorize a movement. Underlying-asset custody, cash accounts and token-key custody are separate questions.",
    checks: ["Permission and service scope of the named entity", "Segregation, signing controls and recovery", "Insurance exclusions, reconciliation and exit records"],
    guide: "tokenization-platform-vs-custodian"
  },
  "kyc-aml": {
    heading: "Identity checks are only one part of investor eligibility",
    answer: "For tokenized securities, establish identity and beneficial ownership, then apply the offering's investor and jurisdiction restrictions. Confirm how changed eligibility reaches the token's transfer rules.",
    checks: ["Identity, sanctions and beneficial-ownership scope", "Responsibility for investor-class and jurisdiction decisions", "Rechecks, exceptions and auditable data retention"],
    guide: "rwa-vendor-due-diligence-checklist"
  },
  "payments-stablecoins": {
    heading: "Compare the stablecoin service you actually need",
    answer: "Issuing a stablecoin, accepting a payment and paying a supplier are different purchases. Establish the currencies, networks, responsible entities and settlement obligations before comparing providers.",
    checks: ["Issuance versus payment or orchestration scope", "Reserve and redemption evidence where relevant", "Supported corridors, failure handling and reconciliation"],
    guide: "rwa-vendor-due-diligence-checklist"
  },
  "oracles-data-proof-of-reserve": {
    heading: "Oracle data and proof of reserve answer different questions",
    answer: "A price feed supplies a data input; reserve evidence concerns specified backing at a stated time and scope. Neither alone establishes legal ownership, total liabilities or recoverability.",
    checks: ["Data provenance and observation date", "Assets and liabilities inside and outside the report", "Staleness detection and fallback behavior"],
    guide: "proof-of-reserve-vendor-due-diligence"
  },
  "fund-administration-transfer-agents": {
    heading: "Separate fund administration from the ownership register",
    answer: "Fund administration can include accounting, valuations and investor reporting, while transfer agency concerns the holder register and related processes. Confirm the exact mandate instead of treating either title as whole-stack coverage.",
    checks: ["NAV inputs and reconciliation responsibility", "Legally authoritative register and transfer workflow", "Corporate actions, exceptions and portable records"],
    guide: "tokenization-platform-vs-custodian"
  },
  "legal-regulatory": {
    heading: "Choose counsel by the offering and jurisdictions",
    answer: "Start with the legal claim, issuer location, investor countries and distribution model. A blockchain specialty does not by itself establish experience with your asset class or applicable offering rules.",
    checks: ["Relevant jurisdiction and asset-class experience", "Written service scope and local counsel dependencies", "Responsibility for entity, permission and offering analysis"],
    guide: "are-tokenization-providers-regulated"
  },
  "family-offices": {
    heading: "What a family office should ask infrastructure providers",
    answer: "A family office evaluating tokenization needs clear private-offering controls, investor classes, reporting and an exit path. The offices listed below are not interchangeable with the platforms and custodians an office may appoint.",
    checks: ["Investor-class handling and private-offering restrictions", "Custody integration and consolidated reporting", "Register exports, contract control and migration terms"],
    guide: "what-does-a-tokenization-platform-do",
    providersHeading: "Infrastructure providers family offices ask about",
    providerGroups: [
      { heading: "Custody", providers: [
        { name: "Anchorage Digital", line: "Digital asset custody for institutional portfolios." },
        { name: "Fidelity Digital Assets", line: "Digital asset custody for institutional client portfolios." },
        { name: "Sygnum Bank", line: "Custody, tokenization and trading workflows for asset owners." },
        { name: "Zodia Custody", line: "Institutional custody through its Abu Dhabi operating entity." }
      ] },
      { heading: "Tokenized fund access", providers: [
        { name: "Ondo Finance", line: "Onchain access to tokenized US Treasury exposure." }
      ] },
      { heading: "Private market venues", providers: [
        { name: "ADDX", line: "Access to tokenized private market assets in Asia-Pacific." },
        { name: "Archax", line: "Venue services for tokenized securities in the UK." }
      ] }
    ]
  },
  "broker-dealers": {
    heading: "Fit the technology to the broker-dealer's registered role",
    answer: "Identify the issuer, intermediary, transfer agent, custodian and venue before selecting a digital-securities provider. A shared brand or technology integration does not establish that each entity has the permissions required for your transaction.",
    checks: ["Named entities, permitted activities and restrictions", "Books and records, supervision and approval evidence", "Transfer-agent and custody integration responsibilities"],
    guide: "are-tokenization-providers-regulated",
    providersHeading: "Digital-securities and private-placement providers",
    providerGroups: [
      { heading: "US digital-securities providers", providers: [
        { name: "INX Securities", line: "Electronic trading and private placement workflows." },
        { name: "Oasis Pro Markets", line: "Digital securities trading and private placement workflows." },
        { name: "Prometheum", line: "Digital asset clearing, settlement and custody workflows." },
        { name: "Securitize Markets", line: "Digital securities placement and secondary trading workflows." },
        { name: "Texture Capital", line: "Digital securities issuance and secondary trading workflows." },
        { name: "tZERO Securities", line: "Securities trading, placement and settlement workflows." }
      ] },
      { heading: "Private-placement and capital-raising firms", providers: [
        { name: "Dalmore Group", line: "Private placement and capital raising workflows." },
        { name: "Entoro Securities", line: "Private placement and corporate finance workflows." },
        { name: "North Capital Private Securities", line: "Private fund placement and distribution workflows." },
        { name: "WealthForge Securities", line: "Alternative investment placement and distribution workflows." }
      ] },
      { heading: "Outside the US", providers: [
        { name: "ADDX", line: "Private market access and transaction workflows in Singapore." },
        { name: "Archax", line: "Securities venue and transaction workflows in the UK." }
      ] }
    ]
  },
  "security-audit-companies": {
    heading: "What an RWA security audit can establish",
    answer: "A contract audit examines specified code and assumptions, not property title, the accuracy of every offchain input or an offering's legal validity. Match the report to the deployed version and investigate unresolved findings separately.",
    checks: ["Code commit, deployment and report scope", "Remediation and upgrade or administrator powers", "Monitoring, incident ownership and offchain dependencies"],
    guide: "rwa-vendor-due-diligence-checklist"
  }
};

export function vendorAnswerGuidance(file: string) {
  const key = file.split("/")[1];
  const entry = file.startsWith("vendors/") ? guidance[key] : undefined;
  if (!entry) return "";
  return `<style>
    .vendor-evidence-guidance{max-width:960px;margin:0 auto;padding:32px 24px;border-bottom:1px solid #d7e2ec;color:#15243c}
    .vendor-evidence-guidance h2{font-size:24px;line-height:1.3;text-align:center;margin:0 0 16px}
    .vendor-evidence-guidance p{font-size:16px;line-height:1.65;margin:12px 0}
    .vendor-evidence-guidance ul{padding-left:22px;font-size:16px;line-height:1.7}
    .vendor-evidence-guidance a{color:#205f9f;overflow-wrap:anywhere}
    .vendor-evidence-guidance small{font-size:13px;color:#53657a}
  </style><section class="light-container vendor-evidence-guidance" aria-labelledby="vendor-evidence-title">
    <h2 id="vendor-evidence-title">${entry.heading}</h2>
    <p>${entry.answer}</p>
    <ul>${entry.checks.map(check => `<li>${check}</li>`).join("")}</ul>
    ${entry.providerGroups ? `<h3>${entry.providersHeading}</h3>
    <p>These providers are drawn from companies listed on FluidRWA. The order is alphabetical, not a ranking. Check each firm's licences and status with the relevant regulator before you engage.</p>
    ${entry.providerGroups.map(group => `<p><strong>${group.heading}</strong></p>
    <ul>${group.providers.map(provider => `<li><strong>${provider.name}</strong>: ${provider.line}</li>`).join("")}</ul>`).join("")}` : ""}
    <p><a href="/blog/${entry.guide}">Read the evidence guide</a> · <a href="/blog/rwa-vendor-due-diligence-checklist">How to assess directory candidates</a></p>
    <p><small>Selection guidance reviewed November 18, 2026.</small></p>
  </section>`;
}
