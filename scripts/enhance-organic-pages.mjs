import fs from "fs";
import path from "path";

const root = process.cwd();

function updateFile(relativePath, updater) {
  const filePath = path.join(root, relativePath);
  const original = fs.readFileSync(filePath, "utf8");
  const next = updater(original);
  if (next !== original) {
    fs.writeFileSync(filePath, next);
    console.log(`Enhanced ${relativePath}`);
  }
}

function replaceBetween(html, startMarker, endMarker, replacement) {
  const start = html.indexOf(startMarker);
  if (start === -1) return html;
  const end = html.indexOf(endMarker, start + startMarker.length);
  if (end === -1) return html;
  return `${html.slice(0, start)}${replacement}${html.slice(end)}`;
}

function setMeta(html, { title, description, url, ogTitle = title, ogDescription = description }) {
  return html
    .replace(/<title>[^<]+<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${description}">`)
    .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${url}">`)
    .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${ogTitle}">`)
    .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${ogDescription}">`)
    .replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${url}">`);
}

function addSectionBefore(html, marker, section) {
  if (html.includes(marker)) return html;
  return html.replace(/(\s*<section class="bc-section"[^>]*id="[^"]*(?:directory|company-directory|kyc-directory)[^"]*"[\s\S]*)/, `${section}$1`);
}

function addOrganicConversionPanel(html, key, { title, copy, primaryHref, primaryLabel, secondaryHref, secondaryLabel, thirdHref = "/tokenization-readiness-assessment-tool", thirdLabel = "Run readiness assessment" }) {
  const marker = `organic-${key}-conversion`;
  if (html.includes(marker)) return html;
  const panel = `
    <!-- ${marker} -->
    <section class="organic-conversion-panel" aria-label="${title}">
      <div class="light-container organic-conversion-inner">
        <div><p class="eyebrow light-eyebrow">Next step</p><h2>${title}</h2><p>${copy}</p></div>
        <div class="organic-conversion-actions"><a class="btn btn-primary light-primary" href="${primaryHref}">${primaryLabel}</a><a class="btn btn-soft" href="${secondaryHref}">${secondaryLabel}</a><a class="organic-conversion-link" href="${thirdHref}">${thirdLabel}</a></div>
      </div>
    </section>
`;
  return html.replace(/(\s*<section class="bc-section")/, `${panel}$1`);
}

function addHeroDecisionStrip(html, key, items) {
  const marker = `data-hero-decision="${key}"`;
  if (html.includes(marker)) return html;
  const strip = `<div class="bc-hero-decision" data-hero-decision="${key}"><span>${items.map((item) => `<strong>${item[0]}</strong> ${item[1]}`).join("</span><span>")}</span></div>`;
  return html.replace(/(<div class="hero-actions">)/, `${strip}$1`);
}

function moveDirectoryAfterHero(html, directoryId) {
  const directoryPattern = new RegExp(`\\s*<section class="bc-section" id="${directoryId}"[\\s\\S]*?<\\/section>`);
  const directoryMatch = html.match(directoryPattern);
  if (!directoryMatch) return html;

  const directorySection = directoryMatch[0];
  const withoutDirectory = html.replace(directorySection, "");
  const heroPattern = /(<section class="bc-hero"[\s\S]*?<\/section>)/;

  return withoutDirectory.replace(heroPattern, (heroSection) => `${heroSection}\n${directorySection}`);
}

function liftFirstDirectorySection(html) {
  const sectionPattern = /\s*<section class="bc-section" id="([^"]*(?:directory|providers|companies|firms)[^"]*)"[\s\S]*?<\/section>/i;
  const match = html.match(sectionPattern);
  if (!match) return html;
  return moveDirectoryAfterHero(html, match[1]);
}

function removeEmbeddedHeroFragments(html) {
  const heroPattern = /<section class="bc-hero"[\s\S]*?<\/section>/g;
  let seenHero = false;

  return html.replace(heroPattern, (heroSection) => {
    if (!seenHero) {
      seenHero = true;
      return heroSection;
    }
    return "$1";
  });
}

function liftDirectoriesAcrossVendorPages() {
  const vendorsRoot = path.join(root, "vendors");
  if (!fs.existsSync(vendorsRoot)) return;

  for (const entry of fs.readdirSync(vendorsRoot)) {
    const relativePath = path.join("vendors", entry, "index.html");
    const fullPath = path.join(root, relativePath);
    if (!fs.existsSync(fullPath)) continue;
    updateFile(relativePath, (html) => removeEmbeddedHeroFragments(liftFirstDirectorySection(html)));
  }
}

const smartSection = `
    <!-- organic-smart-contract-intent -->
    <section class="bc-section" aria-labelledby="smart-buyer-title">
      <div class="light-container">
        <div class="solutions-section-head"><p class="eyebrow light-eyebrow">Buyer guide</p><h2 id="smart-buyer-title">How to choose a smart contract development company</h2><p>Use this page to compare smart contract developers, auditors, security tooling and automation providers by what they actually do in a production Web3 or tokenization workflow.</p></div>
        <div class="bc-area-grid">
          <article class="bc-area-card reveal"><span>01</span><h3>Separate development from audit</h3><p>Hire builders for architecture and implementation, then use independent audit or competitive review before launch. One vendor can help coordinate, but review should not be treated as a formality.</p></article>
          <article class="bc-area-card reveal"><span>02</span><h3>Match chain and language expertise</h3><p>EVM, Solana, Cosmos and permissioned systems use different languages, tooling, threat models and deployment patterns. Ask for comparable work on the chain you plan to use.</p></article>
          <article class="bc-area-card reveal"><span>03</span><h3>Check tokenization fit</h3><p>RWA workflows need more than token deployment. Look for transfer restrictions, investor allowlists, custody integration, compliance hooks and lifecycle event design.</p></article>
          <article class="bc-area-card reveal"><span>04</span><h3>Verify security process</h3><p>Ask for test coverage, threat models, fuzzing, access-control design, upgrade strategy, deployment runbooks, monitoring and incident-response responsibilities.</p></article>
        </div>
        <div class="research-links" style="margin-top:24px"><strong>Related FluidRWA resources</strong><a href="/blog/what-are-smart-contracts/">Smart contract explainer</a><a href="/blog/top-smart-contract-development-companies-web3-tokenization/">Top smart contract development companies</a><a href="/vendors/security-audit-companies/">Security audit companies</a><a href="/tokenization-readiness-assessment-tool">Tokenization readiness assessment</a></div>
      </div>
    </section>
`;

const kycSection = `
    <!-- organic-kyc-aml-intent -->
    <section class="bc-section" aria-labelledby="kyc-buyer-guide-title">
      <div class="light-container">
        <div class="solutions-section-head"><p class="eyebrow light-eyebrow">Buyer guide</p><h2 id="kyc-buyer-guide-title">How to choose KYC AML providers for Web3 and tokenization</h2><p>KYC and AML tooling should be selected by regulated activity, user geography, entity type, wallet risk, transaction flow and the evidence your compliance team must keep.</p></div>
        <div class="bc-area-grid">
          <article class="bc-area-card reveal"><span>01</span><h3>Identity, KYB or wallet screening?</h3><p>Document KYC, business verification, sanctions screening and blockchain analytics are different layers. Many tokenization platforms need more than one provider or a clean orchestration layer.</p></article>
          <article class="bc-area-card reveal"><span>02</span><h3>Check jurisdiction coverage</h3><p>Confirm supported countries, document types, data residency, manual review coverage, PEP and sanctions sources, Travel Rule support and local regulatory expectations.</p></article>
          <article class="bc-area-card reveal"><span>03</span><h3>Design for conversion and review</h3><p>The best provider is not only accurate. It should reduce drop-off, handle edge cases, route exceptions, create audit logs and support compliance review without slowing every user.</p></article>
          <article class="bc-area-card reveal"><span>04</span><h3>Connect compliance to smart contracts</h3><p>For RWA and tokenized securities, verified status may need to feed wallet allowlists, transfer restrictions, redemption workflows and ongoing transaction monitoring.</p></article>
        </div>
        <div class="research-links" style="margin-top:24px"><strong>Related FluidRWA resources</strong><a href="/blog/best-kyc-providers-tokenization-projects-2026/">Best KYC providers for tokenization</a><a href="/blog/best-kyc-aml-providers-web3-startups/">KYC AML providers for Web3 startups</a><a href="/vendors/compliance-infrastructure-providers/">Compliance infrastructure providers</a><a href="/submit-requirement">Submit requirements</a></div>
      </div>
    </section>
`;

const blockchainSection = `
    <!-- organic-blockchain-development-intent -->
    <section class="bc-section" aria-labelledby="blockchain-buyer-title">
      <div class="light-container">
        <div class="solutions-section-head"><p class="eyebrow light-eyebrow">Buyer guide</p><h2 id="blockchain-buyer-title">How to choose a blockchain development company</h2><p>Blockchain development can mean smart contracts, wallet flows, APIs, nodes, indexers, security, account abstraction, cross-chain infrastructure or enterprise architecture. Define the layer before shortlisting providers.</p></div>
        <div class="bc-area-grid">
          <article class="bc-area-card reveal"><span>01</span><h3>Product build vs infrastructure</h3><p>Some providers build complete applications. Others provide APIs, RPC access, indexing, account abstraction or infrastructure. Match the company to the work package.</p></article>
          <article class="bc-area-card reveal"><span>02</span><h3>Smart contracts and security</h3><p>If the project controls assets, separate engineering from independent audit, monitoring and incident response. Security should be planned before mainnet deployment.</p></article>
          <article class="bc-area-card reveal"><span>03</span><h3>Chain and integration fit</h3><p>Check EVM, Solana, L2, appchain or enterprise-ledger experience, plus wallet, custody, KYC, payment and data integrations for the target use case.</p></article>
          <article class="bc-area-card reveal"><span>04</span><h3>RWA operating model</h3><p>Tokenization projects need legal, compliance, custody and lifecycle workflows around the blockchain layer. A good developer should understand where code ends and operations begin.</p></article>
        </div>
        <div class="research-links" style="margin-top:24px"><strong>Related FluidRWA resources</strong><a href="/blog/top-smart-contract-development-companies-web3-tokenization/">Smart contract company comparison</a><a href="/vendors/smart-contract-development-companies/">Smart contract development companies</a><a href="/vendors/tokenization-platforms/">Tokenization platforms</a><a href="/blog/blockchain-faqs-guide-100-questions/">Blockchain FAQ guide</a></div>
      </div>
    </section>
`;

const tokenizationPlatformSection = `
    <!-- organic-tokenization-platform-intent -->
    <section class="bc-section" aria-labelledby="tokenization-platform-buyer-title">
      <div class="light-container">
        <div class="solutions-section-head"><p class="eyebrow light-eyebrow">Buyer guide</p><h2 id="tokenization-platform-buyer-title">How to compare RWA tokenization platforms</h2><p>Use this page to shortlist issuer-side platforms by asset class, jurisdiction, compliance workflow, custody model, investor onboarding and lifecycle servicing. Tokenization platform selection should start with operating requirements, not a generic vendor demo.</p></div>
        <div class="bc-area-grid">
          <article class="bc-area-card reveal"><span>01</span><h3>Regulated securities and funds</h3><p>Prioritize transfer controls, investor eligibility, fund administration, reporting, redemption workflows, legal evidence and marketplace or transfer-agent support.</p><strong>Best-fit search intent</strong></article>
          <article class="bc-area-card reveal"><span>02</span><h3>Real estate and private markets</h3><p>Look for sponsor portals, SPV workflows, investor documents, cap table management, distributions, investor communications and secondary transfer restrictions.</p><strong>Workflow fit</strong></article>
          <article class="bc-area-card reveal"><span>03</span><h3>Enterprise tokenization infrastructure</h3><p>Compare API depth, chain support, white-label options, permissions, audit trails, custody integrations, payment rails and integration effort.</p><strong>Technical fit</strong></article>
          <article class="bc-area-card reveal"><span>04</span><h3>Readiness before RFP</h3><p>Before requesting proposals, define the asset, target investors, jurisdiction, custody model, distribution plan, required vendors and who owns post-launch servicing.</p><strong>Lead-ready next step</strong></article>
        </div>
        <div class="research-links" style="margin-top:24px"><strong>Related FluidRWA resources</strong><a href="/tokenization-readiness-assessment-tool">Run tokenization readiness assessment</a><a href="/blog/top-tokenization-companies-2026/">Top tokenization companies</a><a href="/learn/tokenization-vendor-comparison">Tokenization vendor comparison</a><a href="/vendors/crypto-custody-providers/">Crypto custody providers</a><a href="/vendors/kyc-aml-providers/">KYC AML providers</a></div>
      </div>
    </section>
`;

const custodySection = `
    <!-- organic-custody-intent -->
    <section class="bc-section" aria-labelledby="custody-buyer-title">
      <div class="light-container">
        <div class="solutions-section-head"><p class="eyebrow light-eyebrow">Buyer guide</p><h2 id="custody-buyer-title">How to choose crypto custody providers for institutional and tokenized assets</h2><p>Custody decisions affect security, investor confidence, transfer authorization, compliance evidence, redemption workflows and whether institutions can approve a digital asset product.</p></div>
        <div class="bc-area-grid">
          <article class="bc-area-card reveal"><span>01</span><h3>Qualified custody or wallet infrastructure?</h3><p>Asset managers and regulated funds may need qualified custody. Web3 operators may need MPC wallets, policy engines, smart wallets or embedded wallet infrastructure.</p></article>
          <article class="bc-area-card reveal"><span>02</span><h3>Operational controls</h3><p>Compare approval policies, segregation, insurance, SOC reports, audit trails, transaction simulation, whitelists, admin-key controls and incident response.</p></article>
          <article class="bc-area-card reveal"><span>03</span><h3>Trading, DeFi and staking access</h3><p>Some custodians focus on cold storage. Others support off-exchange settlement, staking, governance, DeFi access or institutional treasury operations.</p></article>
          <article class="bc-area-card reveal"><span>04</span><h3>Tokenization fit</h3><p>Tokenized assets need custody that works with transfer restrictions, investor allowlists, redemption flows, broker-dealers, administrators and reporting systems.</p></article>
        </div>
        <div class="research-links" style="margin-top:24px"><strong>Related FluidRWA resources</strong><a href="/vendors/tokenization-platforms/">Tokenization platforms</a><a href="/blog/top-tokenization-companies-2026/">Top tokenization companies</a><a href="/vendors/compliance-infrastructure-providers/">Compliance infrastructure</a><a href="/submit-requirement">Submit custody requirements</a></div>
      </div>
    </section>
`;

const legalSection = `
    <!-- organic-legal-regulatory-intent -->
    <section class="bc-section" aria-labelledby="legal-buyer-title">
      <div class="light-container">
        <div class="solutions-section-head"><p class="eyebrow light-eyebrow">Buyer guide</p><h2 id="legal-buyer-title">How to choose legal and regulatory advisors for tokenization</h2><p>Legal vendor selection should follow the matter: securities issuance, fund structuring, MiCA, stablecoins, payments, DeFi, cross-border distribution, broker-dealer issues or offshore fund domicile.</p></div>
        <div class="bc-area-grid">
          <article class="bc-area-card reveal"><span>01</span><h3>Match jurisdiction to investor base</h3><p>A US securities product, EU MiCA question, Singapore fund structure and Cayman vehicle need different counsel and local regulatory experience.</p></article>
          <article class="bc-area-card reveal"><span>02</span><h3>Separate structuring from licensing</h3><p>Some firms are stronger at offering documents and fund formation. Others are stronger at licensing, enforcement, exchange regulation, payments or stablecoin policy.</p></article>
          <article class="bc-area-card reveal"><span>03</span><h3>Connect legal advice to operations</h3><p>Legal conclusions must map into KYC, transfer restrictions, custody, disclosures, redemption rights, reporting, marketing rules and secondary trading limits.</p></article>
          <article class="bc-area-card reveal"><span>04</span><h3>Use counsel before platform lock-in</h3><p>Do not choose a tokenization platform before confirming asset rights, investor eligibility, jurisdiction, wrapper structure and required regulated intermediaries.</p></article>
        </div>
        <div class="research-links" style="margin-top:24px"><strong>Related FluidRWA resources</strong><a href="/tokenization-readiness-assessment-tool">Tokenization readiness assessment</a><a href="/vendors/tokenization-platforms/">Tokenization platforms</a><a href="/vendors/kyc-aml-providers/">KYC AML providers</a><a href="/blog/web3-blockchain-compliance-guide/">Web3 compliance guide</a></div>
      </div>
    </section>
`;

const smartDeepSection = `
    <!-- organic-smart-contract-depth -->
    <section class="bc-section" aria-labelledby="smart-depth-title">
      <div class="light-container">
        <div class="solutions-section-head"><p class="eyebrow light-eyebrow">Comparison depth</p><h2 id="smart-depth-title">Smart contract vendor comparison: best fit, gaps and evidence to request</h2><p>For Web3 and RWA projects, the right smart contract partner depends on value at risk, chain choice, security model, regulatory controls and whether the work is custom engineering, audit, monitoring or automation.</p></div>
        <div class="bc-guide-list">
          <article><span>Build agency</span><h3>Good for custom product architecture</h3><p>Use when you need protocol design, token contracts, investor portals, wallet flows, backend integration and launch support. Not enough by itself for high-value contracts unless independent security review is included.</p></article>
          <article><span>Audit firm</span><h3>Good for independent assurance</h3><p>Use when code is mostly complete and assets, treasury, redemptions or permissions are at risk. Ask for methodology, issue severity definitions, retest scope and whether fixes are reviewed before launch.</p></article>
          <article><span>Security tooling</span><h3>Good for continuous monitoring</h3><p>Use after deployment for simulations, anomaly alerts, admin-key monitoring, exploit detection and incident response. It does not replace architecture review or manual audit.</p></article>
          <article><span>Automation layer</span><h3>Good for lifecycle execution</h3><p>Relevant for recurring distributions, scheduled compliance checks, proof updates, redemptions and rebalancing. Confirm fallback behavior, permissions and what happens if the automation network is unavailable.</p></article>
        </div>
        <div class="bc-guide-list" style="margin-top:18px">
          <article><span>Ask this</span><h3>What should buyers ask before hiring?</h3><p>Which chains and languages have you deployed in production? Who writes tests? Who holds admin keys? How are upgrades approved? What is the incident response plan? What must be audited by an independent team?</p></article>
          <article><span>Evidence</span><h3>What proof should buyers request?</h3><p>Relevant deployments, audit reports where public, test coverage, threat model, staging process, deployment checklist, post-launch monitoring plan and named responsibilities for bug fixes.</p></article>
          <article><span>RWA fit</span><h3>What matters for tokenization?</h3><p>Transfer restrictions, permissioned tokens, investor allowlists, cap table events, distributions, redemption rights, custody integrations and compliance states must be designed before contracts are frozen.</p></article>
          <article><span>Risk note</span><h3>Where projects usually fail</h3><p>Teams often overfocus on token deployment and underfocus on governance, custody, emergency controls, lifecycle events and whether legal obligations are actually reflected in contract logic.</p></article>
        </div>
        <div class="research-links" style="margin-top:24px"><strong>Authoritative references</strong><a href="https://ethereum.org/en/developers/docs/smart-contracts/security/" target="_blank" rel="noopener noreferrer">Ethereum smart contract security guidance</a><a href="https://owasp.org/www-project-smart-contract-top-10/" target="_blank" rel="noopener noreferrer">OWASP Smart Contract Top 10</a><a href="https://www.sec.gov/newsroom/speeches-statements/peirce-tm-faq-051525" target="_blank" rel="noopener noreferrer">SEC DLT and transfer agent FAQ context</a></div>
      </div>
    </section>
`;

const kycDeepSection = `
    <!-- organic-kyc-aml-depth -->
    <section class="bc-section" aria-labelledby="kyc-depth-title">
      <div class="light-container">
        <div class="solutions-section-head"><p class="eyebrow light-eyebrow">Comparison depth</p><h2 id="kyc-depth-title">KYC AML provider comparison: what each layer is good for</h2><p>Searchers often compare KYC providers as if they are interchangeable. In practice, identity verification, KYB, sanctions screening, wallet analytics, Travel Rule messaging and ongoing monitoring solve different compliance jobs.</p></div>
        <div class="bc-guide-list">
          <article><span>Identity KYC</span><h3>Good for individual onboarding</h3><p>Best for document verification, liveness, fraud checks and proof that a person is who they claim to be. Not sufficient alone for business onboarding, wallet risk or ongoing transaction monitoring.</p></article>
          <article><span>KYB</span><h3>Good for entity and issuer workflows</h3><p>Needed when onboarding companies, funds, SPVs, institutions, DAOs with wrappers or counterparties. Ask about UBO checks, registry coverage, adverse media and manual review operations.</p></article>
          <article><span>Wallet risk</span><h3>Good for source-of-funds screening</h3><p>Blockchain analytics can flag exposure to sanctioned addresses, mixers, scams, darknet markets or risky counterparties. It does not verify the real-world identity behind a wallet by itself.</p></article>
          <article><span>Travel Rule</span><h3>Good for VASP-to-VASP transfers</h3><p>Relevant where regulation requires originator and beneficiary information exchange. Confirm supported corridors, counterparties, data handling, rejected transfer workflow and audit records.</p></article>
        </div>
        <div class="bc-guide-list" style="margin-top:18px">
          <article><span>Conversion</span><h3>What is not obvious from demos?</h3><p>False positives, unsupported documents, mobile UX, retries, manual review turnaround and data localization often matter as much as headline accuracy rates.</p></article>
          <article><span>Controls</span><h3>What should compliance teams request?</h3><p>Screening sources, PEP/sanctions refresh cadence, case management workflow, audit logs, data retention terms, API reliability, jurisdiction coverage and escalation responsibilities.</p></article>
          <article><span>Tokenization</span><h3>What changes for tokenized assets?</h3><p>KYC status may need to trigger wallet allowlists, investor eligibility, transfer restrictions, redemption permissions, distribution eligibility and ongoing reviews.</p></article>
          <article><span>Procurement</span><h3>When should buyers use more than one vendor?</h3><p>Use multiple layers when one provider is strong at identity but weak at wallet risk, or strong at blockchain analytics but weak at KYB and investor onboarding.</p></article>
        </div>
        <div class="research-links" style="margin-top:24px"><strong>Authoritative references</strong><a href="https://www.nist.gov/identity-access-management/projects/nist-special-publication-800-63-digital-identity-guidelines" target="_blank" rel="noopener noreferrer">NIST Digital Identity Guidelines</a><a href="https://www.fatf-gafi.org/en/publications/Fatfrecommendations/targeted-update-virtual-assets-vasps-2024.html" target="_blank" rel="noopener noreferrer">FATF virtual assets and VASP update</a><a href="https://www.fatf-gafi.org/en/publications/Fatfrecommendations/Regulation-virtual-assets-interpretive-note.html" target="_blank" rel="noopener noreferrer">FATF Recommendation 15 interpretive note</a></div>
      </div>
    </section>
`;

const blockchainDeepSection = `
    <!-- organic-blockchain-development-depth -->
    <section class="bc-section" aria-labelledby="blockchain-depth-title">
      <div class="light-container">
        <div class="solutions-section-head"><p class="eyebrow light-eyebrow">Comparison depth</p><h2 id="blockchain-depth-title">Blockchain development company comparison: infrastructure vs implementation</h2><p>The phrase blockchain development company covers very different vendor types. Some build applications, some provide node infrastructure, some are L1/L2 ecosystems, and others specialize in data, interoperability, security or account abstraction.</p></div>
        <div class="bc-guide-list">
          <article><span>App builders</span><h3>Good for shipping a product</h3><p>Use for wallets, portals, dashboards, token flows, backend services and custom integrations. Not enough when the main requirement is regulated custody, legal structure or exchange-grade infrastructure.</p></article>
          <article><span>Developer infra</span><h3>Good for APIs, RPC and data</h3><p>Use when the team needs reliable node access, indexing, simulation, alerts and SDKs. This reduces engineering burden but does not design your business workflow.</p></article>
          <article><span>L1/L2 and appchains</span><h3>Good for network architecture</h3><p>Relevant when throughput, settlement model, validator set, permissioning, fees or ecosystem distribution matter. The tradeoff is more governance, integration and operational complexity.</p></article>
          <article><span>Interoperability</span><h3>Good for multi-chain products</h3><p>Use for cross-chain messages, asset transfers or data movement. Ask about security assumptions, supported chains, failure handling and whether bridge risk is acceptable for the asset.</p></article>
        </div>
        <div class="bc-guide-list" style="margin-top:18px">
          <article><span>Buyer fit</span><h3>What should Web3 teams define first?</h3><p>Whether they need a build partner, infrastructure provider, base chain, security firm, data layer or automation tool. Mixing these categories creates bad shortlists.</p></article>
          <article><span>RWA fit</span><h3>What matters for real-world assets?</h3><p>Finality, auditability, permissioning, data availability, identity integrations, custody, legal wrappers and lifecycle events matter more than generic transaction speed claims.</p></article>
          <article><span>Evidence</span><h3>What should buyers request?</h3><p>Production references, supported chains, uptime commitments, rate limits, security posture, incident history, documentation quality, integration timelines and who owns maintenance after launch.</p></article>
          <article><span>Buyer clarity</span><h3>How does this page help teams compare?</h3><p>It separates blockchain development agencies from infrastructure vendors so buyers can quickly understand which type of provider fits their project.</p></article>
        </div>
        <div class="research-links" style="margin-top:24px"><strong>Authoritative references</strong><a href="https://www.bis.org/publ/arpdf/ar2023e3.htm" target="_blank" rel="noopener noreferrer">BIS tokenisation and unified ledger report</a><a href="https://www.iosco.org/library/pubdocs/pdf/IOSCOPD747.pdf" target="_blank" rel="noopener noreferrer">IOSCO crypto and digital asset recommendations</a><a href="https://ethereum.org/en/developers/docs/" target="_blank" rel="noopener noreferrer">Ethereum developer documentation</a></div>
      </div>
    </section>
`;

const blockchainSpokeLinksSection = `
    <!-- organic-blockchain-spoke-links -->
    <section class="bc-section" aria-labelledby="blockchain-spoke-links-title">
      <div class="light-container">
        <div class="solutions-section-head"><p class="eyebrow light-eyebrow">Buyer resources</p><h2 id="blockchain-spoke-links-title">Blockchain development hiring guides</h2><p>Use these FluidRWA guides before shortlisting agencies, comparing quotes or deciding whether you need a full-stack team or a specialist provider.</p></div>
        <div class="research-links" style="margin-top:24px"><strong>Related guides</strong><a href="/blog/best-blockchain-development-companies-web3-rwa/">Best blockchain development companies</a><a href="/blog/how-to-choose-a-blockchain-development-agency/">How to choose a blockchain development agency</a><a href="/blog/blockchain-development-cost-engagement-models/">Blockchain development cost and engagement models</a><a href="/blog/full-stack-blockchain-development-services/">Full-stack blockchain development services</a></div>
      </div>
    </section>
`;

const smartContractSpokeLinksSection = `
    <!-- organic-smart-contract-spoke-links -->
    <section class="bc-section" aria-labelledby="smart-contract-spoke-links-title">
      <div class="light-container">
        <div class="solutions-section-head"><p class="eyebrow light-eyebrow">Buyer resources</p><h2 id="smart-contract-spoke-links-title">Smart contract hiring and security guides</h2><p>Use these FluidRWA guides to vet developers, plan audit requirements and understand realistic smart contract development costs before you commit.</p></div>
        <div class="research-links" style="margin-top:24px"><strong>Related guides</strong><a href="/blog/top-smart-contract-development-companies-web3-tokenization/">Top smart contract development companies</a><a href="/blog/how-to-vet-a-smart-contract-development-company/">How to vet a smart contract development company</a><a href="/blog/smart-contract-audit-security-requirements/">Smart contract audit and security requirements</a><a href="/blog/smart-contract-development-cost-guide/">Smart contract development cost guide</a></div>
      </div>
    </section>
`;

const tokenizationPlatformDeepSection = `
    <!-- organic-tokenization-platform-depth -->
    <section class="bc-section" aria-labelledby="tokenization-platform-depth-title">
      <div class="light-container">
        <div class="solutions-section-head"><p class="eyebrow light-eyebrow">Comparison depth</p><h2 id="tokenization-platform-depth-title">Tokenization platform comparison: which platform is good for what?</h2><p>There is no single best tokenization platform. The strongest fit depends on whether the project is a fund, private credit product, real estate vehicle, treasury product, carbon asset, institutional security or enterprise infrastructure build.</p></div>
        <div class="bc-guide-list">
          <article><span>Securities</span><h3>Best when compliance is the product</h3><p>Look for investor eligibility, transfer restrictions, broker-dealer or ATS connections, reporting, disclosure workflows and legal evidence. Avoid generic token tools for regulated offerings.</p></article>
          <article><span>Funds</span><h3>Best when lifecycle servicing matters</h3><p>Prioritize subscriptions, redemptions, capital calls, NAV, distributions, transfer-agent coordination, admin integrations and investor communications.</p></article>
          <article><span>Real estate</span><h3>Best when the sponsor workflow is complex</h3><p>Check SPV setup, document handling, KYC, payment collection, investor relations, waterfall logic and secondary transfer limits.</p></article>
          <article><span>Enterprise API</span><h3>Best when a platform is embedded into your stack</h3><p>Look for developer documentation, API depth, permissions, audit logs, custody integrations, deployment model, SLA and the ability to white-label workflows.</p></article>
        </div>
        <div class="bc-guide-list" style="margin-top:18px">
          <article><span>Not enough</span><h3>What tokenization platforms do not solve alone</h3><p>They do not replace legal structuring, tax review, custody decisions, broker-dealer obligations, investor demand, valuation, market making or distribution strategy.</p></article>
          <article><span>RFP checklist</span><h3>What to ask before a demo</h3><p>Supported asset classes, jurisdictions, custody options, investor onboarding flow, admin roles, transfer controls, payment rails, reporting exports, pricing model and launch timeline.</p></article>
          <article><span>Readiness</span><h3>When should a team wait?</h3><p>Wait if asset rights, target investors, legal wrapper, redemption terms, custody model or distribution path are still unclear. A platform cannot fix an undefined product.</p></article>
          <article><span>FluidRWA use</span><h3>How buyers should use this page</h3><p>Start with the platform category, then compare adjacent vendors such as KYC, custody, legal, smart contract audit and payments to form the full operating stack.</p></article>
        </div>
        <div class="research-links" style="margin-top:24px"><strong>Authoritative references</strong><a href="https://www.sec.gov/newsroom/speeches-statements/peirce-tm-faq-051525" target="_blank" rel="noopener noreferrer">SEC DLT and tokenized securities context</a><a href="https://www.bis.org/publ/arpdf/ar2023e3.htm" target="_blank" rel="noopener noreferrer">BIS tokenisation and unified ledger report</a><a href="https://www.iosco.org/library/pubdocs/pdf/IOSCOPD747.pdf" target="_blank" rel="noopener noreferrer">IOSCO crypto and digital asset recommendations</a></div>
      </div>
    </section>
`;

const custodyDeepSection = `
    <!-- organic-custody-depth -->
    <section class="bc-section" aria-labelledby="custody-depth-title">
      <div class="light-container">
        <div class="solutions-section-head"><p class="eyebrow light-eyebrow">Comparison depth</p><h2 id="custody-depth-title">Crypto custody provider comparison: qualified custody, MPC and tokenized asset workflows</h2><p>Institutional custody is not only where private keys sit. Buyers should compare legal status, control model, asset support, policy controls, reporting, integrations and whether the provider can support the full tokenized asset lifecycle.</p></div>
        <div class="bc-guide-list">
          <article><span>Qualified custody</span><h3>Good for regulated investors</h3><p>Relevant for asset managers, broker-dealers, advisers and funds where custody rules or institutional due diligence require a regulated custodian or trust-company model.</p></article>
          <article><span>MPC wallets</span><h3>Good for operational control</h3><p>Useful for treasury, exchanges, fintechs and Web3 teams that need policy-based approvals, role controls and scalable transaction signing. Legal custody status still needs review.</p></article>
          <article><span>Self-custody infra</span><h3>Good for product embedding</h3><p>Useful for apps that need embedded wallets or smart accounts. It can improve UX, but buyers must define recovery, user consent, compliance and liability boundaries.</p></article>
          <article><span>Off-exchange settlement</span><h3>Good for trading workflows</h3><p>Useful when institutions want settlement, collateral movement or trading access without continuously moving assets onto exchanges. Confirm counterparty coverage and settlement finality.</p></article>
        </div>
        <div class="bc-guide-list" style="margin-top:18px">
          <article><span>Controls</span><h3>What should buyers request?</h3><p>Regulatory status, SOC reports, insurance scope, segregation model, supported assets, disaster recovery, whitelisting, admin roles, audit trails, reporting exports and incident procedures.</p></article>
          <article><span>Tokenization</span><h3>What changes for tokenized assets?</h3><p>Custody must coordinate with transfer restrictions, investor allowlists, redemptions, broker-dealer workflows, administrators and ownership records.</p></article>
          <article><span>Not enough</span><h3>Where custody providers may not be sufficient</h3><p>Custody does not create liquidity, legal validity, tax treatment, investor eligibility or compliant distribution by itself. It is one part of the operating stack.</p></article>
          <article><span>Procurement</span><h3>How should institutions shortlist?</h3><p>Start with regulated-status requirements, then test asset support, transaction policies, integrations, reporting, fee model and whether the provider supports your operating jurisdiction.</p></article>
        </div>
        <div class="research-links" style="margin-top:24px"><strong>Authoritative references</strong><a href="https://www.sec.gov/newsroom/press-releases/2020-340" target="_blank" rel="noopener noreferrer">SEC statement on digital asset securities custody</a><a href="https://www.sec.gov/newsroom/speeches-statements/peirce-tm-faq-051525" target="_blank" rel="noopener noreferrer">SEC DLT and custody FAQ context</a><a href="https://www.iosco.org/library/pubdocs/pdf/IOSCOPD747.pdf" target="_blank" rel="noopener noreferrer">IOSCO crypto and digital asset recommendations</a></div>
      </div>
    </section>
`;

updateFile("vendors/smart-contract-development/index.html", (html) => {
  html = setMeta(html, {
    title: "Smart Contract Development Companies for Web3 and RWA | FluidRWA",
    description: "Find and compare vetted smart contract development companies for Web3, DeFi and tokenization. Review teams, specialties and engagement models before you commit.",
    url: "https://www.fluidrwa.com/vendors/smart-contract-development-companies",
    ogDescription: "Compare smart contract development companies, audit firms and Web3 security providers by workflow, chain and tokenization fit."
  });
  html = html.replace(/<h1 id="bc-title">[^<]+<\/h1>/, `<h1 id="bc-title">Smart Contract Development Companies for Web3 and RWA</h1>`);
  html = html.replace(/<p>Find teams and tools for designing, testing, auditing, monitoring and automating secure smart contracts across Web3, DeFi, RWA and digital asset infrastructure\.<\/p>/, `<p>Compare development teams, audit firms, security platforms and automation providers for smart contracts, tokenized assets, DeFi protocols and blockchain applications.</p>`);
  html = addHeroDecisionStrip(html, "smart-contract", [
    ["Best for:", "contract design, audits, security tooling and post-launch monitoring."],
    ["Avoid if:", "you need a full tokenization platform rather than custom onchain logic."],
    ["Confirm:", "chain expertise, test coverage, admin controls and independent audit scope."]
  ]);
  html = html.replace(/href="\.\.\/\.\.\/contact\.html">Submit Requirements<\/a>/, `href="/submit-requirement?category=Smart%20Contract%20Development%20Companies&source=organic-category-page">Submit Requirements</a>`);
  html = addOrganicConversionPanel(html, "smart-contract", {
    title: "Need a smart contract development shortlist?",
    copy: "Tell FluidRWA what you are building, target chain, security stage and tokenization requirements. We will route the brief toward relevant development, audit and monitoring partners.",
    primaryHref: "#smart-contract-directory",
    primaryLabel: "Compare providers",
    secondaryHref: "/submit-requirement?category=Smart%20Contract%20Development%20Companies&source=organic-category-page",
    secondaryLabel: "Submit project brief"
  });
  html = addSectionBefore(html, "organic-smart-contract-intent", smartSection);
  html = addSectionBefore(html, "organic-smart-contract-depth", smartDeepSection);
  html = addSectionBefore(html, "organic-smart-contract-spoke-links", smartContractSpokeLinksSection);
  return moveDirectoryAfterHero(html, "smart-contract-directory");
});

updateFile("vendors/kyc-aml/index.html", (html) => {
  html = setMeta(html, {
    title: "KYC AML Providers for Web3 and Tokenization | FluidRWA",
    description: "Compare KYC and AML providers for Web3, tokenization and digital assets. Review wallet screening, identity checks, coverage and how to pick a vendor.",
    url: "https://www.fluidrwa.com/vendors/kyc-aml-providers",
    ogDescription: "Compare KYC AML providers for Web3, tokenized assets, VASPs and fintech across identity, KYB, wallet screening and Travel Rule workflows."
  });
  html = html.replace(/<h1 id="bc-title">[^<]+<\/h1>/, `<h1 id="bc-title">KYC AML Providers for Web3, Tokenization and Digital Assets</h1>`);
  html = html.replace(/<p>Find identity verification, AML screening, sanctions monitoring, blockchain analytics, KYB, Travel Rule and on-chain identity providers for tokenized finance and digital asset workflows\.<\/p>/, `<p>Compare identity verification, KYB, AML screening, sanctions monitoring, blockchain analytics, wallet screening, Travel Rule and on-chain identity providers for tokenized finance.</p>`);
  html = html.replace(/href="\.\.\/\.\.\/contact\.html">Submit Requirements<\/a>/, `href="/submit-requirement?category=KYC%20AML%20Providers&source=organic-category-page">Submit Requirements</a>`);
  html = addOrganicConversionPanel(html, "kyc-aml", {
    title: "Need help choosing KYC, KYB or wallet screening?",
    copy: "Share your user geography, entity type, wallet flow and compliance requirement so FluidRWA can help narrow the right verification and monitoring stack.",
    primaryHref: "#kyc-directory",
    primaryLabel: "Compare providers",
    secondaryHref: "/submit-requirement?category=KYC%20AML%20Providers&source=organic-category-page",
    secondaryLabel: "Submit compliance brief"
  });
  html = addSectionBefore(html, "organic-kyc-aml-intent", kycSection);
  html = addSectionBefore(html, "organic-kyc-aml-depth", kycDeepSection);
  return moveDirectoryAfterHero(html, "kyc-directory");
});

updateFile("vendors/blockchain-development/index.html", (html) => {
  html = html.replace(
    `<article><span>SEO/AEO note</span><h3>How this page helps searchers</h3><p>It separates blockchain development agencies from infrastructure vendors so buyers can quickly understand which type of provider fits their project.</p></article>`,
    `<article><span>Buyer clarity</span><h3>How does this page help teams compare?</h3><p>It separates blockchain development agencies from infrastructure vendors so buyers can quickly understand which type of provider fits their project.</p></article>`
  );
  html = setMeta(html, {
    title: "Top Blockchain Development Companies 2026 | Compare 50+ Vendors",
    description: "Compare vetted blockchain development companies by specialty, pricing model, and delivery track record. Vendor profiles, real client fit, no sales calls required.",
    url: "https://www.fluidrwa.com/vendors/blockchain-development-companies",
    ogTitle: "Top Blockchain Development Companies 2026 | Compare 50+ Vendors",
    ogDescription: "Compare vetted blockchain development companies by specialty, pricing model, and delivery track record. Vendor profiles, real client fit, no sales calls required."
  });
  html = html
    .replaceAll("https://www.fluidrwa.com/vendors/blockchain-development#webpage", "https://www.fluidrwa.com/vendors/blockchain-development-companies#webpage")
    .replaceAll("https://www.fluidrwa.com/vendors/blockchain-development#breadcrumb", "https://www.fluidrwa.com/vendors/blockchain-development-companies#breadcrumb")
    .replaceAll("https://www.fluidrwa.com/vendors/blockchain-development#companies", "https://www.fluidrwa.com/vendors/blockchain-development-companies#companies")
    .replaceAll("https://www.fluidrwa.com/vendors/blockchain-development#faq", "https://www.fluidrwa.com/vendors/blockchain-development-companies#faq")
    .replaceAll("https://www.fluidrwa.com/vendors/blockchain-development#", "https://www.fluidrwa.com/vendors/blockchain-development-companies#")
    .replaceAll("https://www.fluidrwa.com/vendors/blockchain-development\"", "https://www.fluidrwa.com/vendors/blockchain-development-companies\"")
    .replaceAll("https://www.fluidrwa.com/vendors/blockchain-development/", "https://www.fluidrwa.com/vendors/blockchain-development-companies/");
  html = html.replace(/<h1 id="bc-title">[^<]+<\/h1>/, `<h1 id="bc-title">Best Blockchain Development Companies for Web3 and RWA</h1>`);
  html = html.replace(/<p>Compare 30 blockchain development companies across smart contract auditing, Web3 APIs, developer tools, oracles, L1\/L2 networks, cross-chain protocols, bug bounties, account abstraction and automation\.<\/p>/, `<p>Compare blockchain development companies across smart contracts, Web3 APIs, developer tools, oracles, L1/L2 networks, cross-chain infrastructure, account abstraction, security and tokenization workflows.</p>`);
  html = addHeroDecisionStrip(html, "blockchain-development", [
    ["Best for:", "full-stack Web3 apps, blockchain integrations and infrastructure builds."],
    ["Avoid if:", "you only need one audited contract or a pure custody provider."],
    ["Confirm:", "similar production work, security process, handover and support model."]
  ]);
  html = html.replace(/href="\.\.\/\.\.\/contact\.html">Submit Requirements<\/a>/, `href="/submit-requirement?category=Blockchain%20Development%20Companies&source=organic-category-page">Submit Requirements</a>`);
  html = addOrganicConversionPanel(html, "blockchain-development", {
    title: "Need a blockchain development shortlist?",
    copy: "Tell FluidRWA whether you need an app builder, smart contract team, RPC/API provider, L1/L2 partner or cross-chain infrastructure so the shortlist starts in the right category.",
    primaryHref: "#company-directory",
    primaryLabel: "Compare companies",
    secondaryHref: "/submit-requirement?category=Blockchain%20Development%20Companies&source=organic-category-page",
    secondaryLabel: "Submit build brief"
  });
  html = addSectionBefore(html, "organic-blockchain-development-intent", blockchainSection);
  html = addSectionBefore(html, "organic-blockchain-development-depth", blockchainDeepSection);
  html = addSectionBefore(html, "organic-blockchain-spoke-links", blockchainSpokeLinksSection);
  return moveDirectoryAfterHero(html, "company-directory");
});

updateFile("vendors/tokenization-platforms/index.html", (html) => {
  html = setMeta(html, {
    title: "Best Tokenization Platforms 2026 | RWA & Asset Tokenization",
    description: "Find the right RWA tokenization platform for your asset class. Compare issuance, custody, and compliance features across 30+ vetted providers.",
    url: "https://www.fluidrwa.com/vendors/tokenization-platforms",
    ogDescription: "Find the right RWA tokenization platform for your asset class. Compare issuance, custody, and compliance features across 30+ vetted providers."
  });
  html = html.replace(/<h1 id="bc-title">[^<]+<\/h1>/, `<h1 id="bc-title">RWA Tokenization Platforms for Issuers, Funds and Asset Owners</h1>`);
  html = html.replace(/<p>Find platforms built to help issuers create, manage, service and distribute tokenized real-world assets, funds and securities\.<\/p>/, `<p>Compare issuer-side tokenization platforms for real-world assets, funds, securities and private markets by compliance, custody, investor onboarding, transfer controls and lifecycle servicing.</p>`);
  html = addHeroDecisionStrip(html, "tokenization-platform", [
    ["Best for:", "issuers comparing asset issuance, compliance and lifecycle workflows."],
    ["Avoid if:", "you only need a tokenized product to invest in, not issuer software."],
    ["Confirm:", "asset class fit, jurisdiction support, custody and transfer controls."]
  ]);
  html = html.replace(/href="\.\.\/\.\.\/contact\.html">Submit Requirements<\/a>/, `href="/submit-requirement?category=Tokenization%20Platforms&source=organic-category-page">Submit Requirements</a>`);
  html = addOrganicConversionPanel(html, "tokenization-platform", {
    title: "Need a tokenization platform shortlist?",
    copy: "Share asset class, jurisdiction, target investors, custody model and launch stage so FluidRWA can help identify platform and adjacent vendor requirements.",
    primaryHref: "#tokenization-directory",
    primaryLabel: "Compare platforms",
    secondaryHref: "/submit-requirement?category=Tokenization%20Platforms&source=organic-category-page",
    secondaryLabel: "Submit issuer brief"
  });
  html = addSectionBefore(html, "organic-tokenization-platform-intent", tokenizationPlatformSection);
  html = addSectionBefore(html, "organic-tokenization-platform-depth", tokenizationPlatformDeepSection);
  return moveDirectoryAfterHero(html, "tokenization-directory");
});

updateFile("vendors/custody-solutions/index.html", (html) => {
  html = setMeta(html, {
    title: "Crypto Custody Providers Compared | Institutional-Grade Vendors",
    description: "MPC, HSM, and cold storage custody providers for institutional digital assets. Compare security models, compliance coverage, and pricing side by side.",
    url: "https://www.fluidrwa.com/vendors/crypto-custody-providers",
    ogTitle: "Crypto Custody Providers Compared | Institutional-Grade Vendors",
    ogDescription: "MPC, HSM, and cold storage custody providers for institutional digital assets. Compare security models, compliance coverage, and pricing side by side."
  });
  html = html
    .replaceAll("https://www.fluidrwa.com/vendors/custody-solutions#webpage", "https://www.fluidrwa.com/vendors/crypto-custody-providers#webpage")
    .replaceAll("https://www.fluidrwa.com/vendors/custody-solutions#breadcrumb", "https://www.fluidrwa.com/vendors/crypto-custody-providers#breadcrumb")
    .replaceAll("https://www.fluidrwa.com/vendors/custody-solutions#providers", "https://www.fluidrwa.com/vendors/crypto-custody-providers#providers")
    .replaceAll("https://www.fluidrwa.com/vendors/custody-solutions#faq", "https://www.fluidrwa.com/vendors/crypto-custody-providers#faq")
    .replaceAll("https://www.fluidrwa.com/vendors/custody-solutions#", "https://www.fluidrwa.com/vendors/crypto-custody-providers#")
    .replaceAll("https://www.fluidrwa.com/vendors/custody-solutions\"", "https://www.fluidrwa.com/vendors/crypto-custody-providers\"")
    .replaceAll("https://www.fluidrwa.com/vendors/custody-solutions/", "https://www.fluidrwa.com/vendors/crypto-custody-providers/");
  html = html.replace(/<h1>Crypto Custody Providers & Wallet Infrastructure<\/h1>/, `<h1>Crypto Custody Providers for Institutions and Tokenized Assets</h1>`);
  html = html.replace(/<p>Find institutional custodians, MPC wallet providers, qualified custodians, bank-backed storage, self-custody infrastructure, HSM providers, staking custody and DeFi access platforms\.<\/p>/, `<p>Compare qualified custodians, MPC wallet providers, bank-backed custody, self-custody infrastructure, HSM providers, staking custody and DeFi access platforms for institutional and tokenized asset workflows.</p>`);
  html = addHeroDecisionStrip(html, "custody", [
    ["Best for:", "qualified custody, MPC wallets, treasury controls and asset operations."],
    ["Avoid if:", "you expect custody alone to solve legal issuance or investor distribution."],
    ["Confirm:", "regulatory status, policy controls, integrations, assets and reporting."]
  ]);
  html = html.replace(/href="\.\.\/\.\.\/contact\.html">Submit Requirements<\/a>/, `href="/submit-requirement?category=Crypto%20Custody%20Providers&source=organic-category-page">Submit Requirements</a>`);
  html = addOrganicConversionPanel(html, "custody", {
    title: "Need a custody or wallet infrastructure shortlist?",
    copy: "Tell FluidRWA whether you need qualified custody, MPC wallets, embedded wallets, staking, DeFi access or off-exchange settlement for a tokenized asset workflow.",
    primaryHref: "#custody-directory",
    primaryLabel: "Compare providers",
    secondaryHref: "/submit-requirement?category=Crypto%20Custody%20Providers&source=organic-category-page",
    secondaryLabel: "Submit custody brief"
  });
  html = addSectionBefore(html, "organic-custody-intent", custodySection);
  html = addSectionBefore(html, "organic-custody-depth", custodyDeepSection);
  return moveDirectoryAfterHero(html, "custody-directory");
});

updateFile("vendors/legal-regulatory/index.html", (html) => {
  html = setMeta(html, {
    title: "Legal and Regulatory Advisors for Tokenization and Digital Assets | FluidRWA",
    description: "Compare legal and regulatory advisors for tokenization, digital assets, MiCA, securities, funds, stablecoins, DeFi, payments and cross-border structures.",
    url: "https://www.fluidrwa.com/vendors/legal-regulatory-vendors",
    ogTitle: "Legal and Regulatory Advisors for Tokenization and Digital Assets | FluidRWA",
    ogDescription: "Compare legal and regulatory advisors for tokenization, digital assets, MiCA, securities, funds, stablecoins, DeFi and cross-border structures."
  });
  html = html
    .replaceAll("https://www.fluidrwa.com/vendors/legal-regulatory#webpage", "https://www.fluidrwa.com/vendors/legal-regulatory-vendors#webpage")
    .replaceAll("https://www.fluidrwa.com/vendors/legal-regulatory#breadcrumb", "https://www.fluidrwa.com/vendors/legal-regulatory-vendors#breadcrumb")
    .replaceAll("https://www.fluidrwa.com/vendors/legal-regulatory#firms", "https://www.fluidrwa.com/vendors/legal-regulatory-vendors#firms")
    .replaceAll("https://www.fluidrwa.com/vendors/legal-regulatory#faq", "https://www.fluidrwa.com/vendors/legal-regulatory-vendors#faq")
    .replaceAll("https://www.fluidrwa.com/vendors/legal-regulatory#", "https://www.fluidrwa.com/vendors/legal-regulatory-vendors#")
    .replaceAll("https://www.fluidrwa.com/vendors/legal-regulatory\"", "https://www.fluidrwa.com/vendors/legal-regulatory-vendors\"")
    .replaceAll("https://www.fluidrwa.com/vendors/legal-regulatory/", "https://www.fluidrwa.com/vendors/legal-regulatory-vendors/");
  html = html.replace(/<h1>Legal & Regulatory Advisory Firms<\/h1>/, `<h1>Legal and Regulatory Advisors for Tokenization and Digital Assets</h1>`);
  html = html.replace(/<p>Find specialized law firms and regulatory advisors for digital assets, RWA tokenization, securities compliance, MiCA, DeFi, DAOs, fund structuring, stablecoins, payments and cross-border operations\.<\/p>/, `<p>Compare law firms and regulatory advisors for asset tokenization, securities compliance, MiCA, DeFi, DAOs, fund structuring, stablecoins, payments, licensing and cross-border digital asset operations.</p>`);
  return addSectionBefore(html, "organic-legal-regulatory-intent", legalSection);
});

liftDirectoriesAcrossVendorPages();
