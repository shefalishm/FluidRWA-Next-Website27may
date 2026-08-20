import fs from "node:fs";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname);

const categories = [
  {
    slug: "fund-administration-transfer-agents",
    title: "Fund Administration and Transfer Agents",
    eyebrow: "Issuer operations",
    description: "Compare fund administrators, transfer agents, cap table platforms and investor servicing partners for tokenized funds, private markets and regulated digital securities.",
    snapshot: ["8", "Fund ops", "Transfer", "Investor records"],
    checklist: [
      ["Transfer agent recordkeeping", "For digital securities, tokenized shares, fund subscriptions and investor register integrity."],
      ["NAV and fund accounting", "For private credit, treasury, real estate and alternative investment products that need recurring reporting."],
      ["Investor servicing", "For onboarding, notices, capital calls, redemptions and compliance documents."]
    ],
    vendors: [
      ["Securitize", "SE", "Digital securities", "Tokenized securities issuers that need transfer agent, marketplace and compliant lifecycle infrastructure.", "Securitize is relevant where issuance, investor onboarding, transfer-agent workflows and secondary liquidity need to connect.", ["Transfer agent", "Digital securities", "ATS", "Tokenization"]],
      ["Tokeny", "TO", "ERC-3643", "Issuers using permissioned token standards and compliance controls for regulated assets.", "Tokeny fits teams building compliant token lifecycle workflows for private assets, funds and securities.", ["ERC-3643", "Compliance", "Lifecycle", "Apex Group"]],
      ["Vertalo", "VE", "Cap tables", "Private market teams that need digital transfer agency, cap table and token-holder management.", "Vertalo is useful when the main requirement is clean ownership data and digital asset administration.", ["Cap table", "Transfer agent", "Investor records", "Digital assets"]],
      ["Apex Group", "AP", "Fund services", "Asset managers needing fund administration, transfer agency, depositary and private markets services.", "Apex is a broad fund services partner relevant to tokenized and traditional private market structures.", ["Fund admin", "Transfer agency", "Depositary", "Private markets"]],
      ["Carta", "CA", "Equity records", "Private companies, funds and SPVs managing cap tables, equity plans and investor records.", "Carta is strongest where cap table data, private equity workflows and fund administration intersect.", ["Cap tables", "Fund admin", "Equity", "Private markets"]],
      ["SS&C", "SS", "Asset servicing", "Managers needing scaled fund administration, transfer agency and asset servicing technology.", "SS&C fits institutional operating models that require mature reporting and administration rails.", ["Fund admin", "Transfer agency", "Reporting", "Asset servicing"]],
      ["Alter Domus", "AD", "Alternative assets", "Private equity, private debt, real estate and infrastructure managers needing administration support.", "Alter Domus is relevant for alternative asset funds that require specialist operations and investor servicing.", ["Private assets", "Fund admin", "Investor services", "Debt"]],
      ["NAV Fund Administration Group", "NA", "Independent fund admin", "Fund managers looking for outsourced fund accounting, administration and investor reporting.", "NAV fits managers that want independent fund administration across alternative investment structures.", ["Fund accounting", "Reporting", "Investor services", "Alternatives"]]
    ]
  },
  {
    slug: "oracles-data-proof-of-reserve",
    title: "Oracles, Data and Proof-of-Reserve Providers",
    eyebrow: "Data infrastructure",
    description: "Compare oracle networks, market data feeds, proof-of-reserve infrastructure and RWA data providers for pricing, NAV, collateral verification and automated safeguards.",
    snapshot: ["8", "Data feeds", "PoR", "RWA data"],
    checklist: [
      ["Reserve verification", "For stablecoins, wrapped assets, commodities and tokenized funds that need transparent backing data."],
      ["NAV and pricing feeds", "For funds, credit, treasuries, commodities and DeFi integrations using external market data."],
      ["Operational safeguards", "For minting controls, circuit breakers, liquidation logic and reporting triggers."]
    ],
    vendors: [
      ["Chainlink", "CL", "Proof of Reserve", "Issuers needing proof-of-reserve, market data, NAV data and cross-chain infrastructure.", "Chainlink is relevant for tokenized assets that depend on secure external data and reserve verification.", ["Proof of Reserve", "Data Feeds", "SmartData", "CCIP"]],
      ["Pyth Network", "PY", "First-party market data", "Applications needing low-latency market data from exchanges, market makers and financial institutions.", "Pyth fits trading, DeFi and institutional applications that need live multi-asset price feeds.", ["Price feeds", "Market data", "Publishers", "Cross-chain"]],
      ["RedStone", "RS", "Modular oracle", "Teams that need oracle feeds across EVM and non-EVM ecosystems with flexible data delivery.", "RedStone is relevant where custom data feeds and modular oracle delivery are part of the product stack.", ["Oracle", "Data feeds", "DeFi", "Modular"]],
      ["API3", "A3", "First-party oracles", "Teams looking for first-party oracle feeds and dAPI-style data infrastructure.", "API3 fits applications that want API providers to deliver data directly to smart contracts.", ["dAPIs", "First-party", "Oracle", "Data"]],
      ["Chronicle", "CH", "Oracle protocol", "DeFi and RWA teams that need resilient oracle feeds with transparent data sources.", "Chronicle is relevant where oracle transparency and protocol-native data delivery matter.", ["Oracle", "Data feeds", "Transparency", "DeFi"]],
      ["Switchboard", "SW", "Solana data", "Solana and multi-chain teams needing oracle, randomness and data infrastructure.", "Switchboard is useful for Solana-heavy applications and teams needing flexible feed creation.", ["Solana", "Oracle", "Randomness", "Data"]],
      ["UMA", "UM", "Optimistic oracle", "Protocols needing dispute-based, human-verifiable or event-driven data resolution.", "UMA fits markets and protocols where an optimistic verification process is more appropriate than a continuous feed.", ["Optimistic oracle", "Disputes", "Markets", "Events"]],
      ["DIA", "DI", "Open data oracle", "Projects needing open-source market data, NFT data or custom oracle feeds.", "DIA is relevant for teams looking for transparent data sourcing and customizable feeds.", ["Open source", "Market data", "NFT data", "Custom feeds"]]
    ]
  },
  {
    slug: "defi-trading-margin-infrastructure",
    title: "DeFi Trading and Margin Infrastructure",
    eyebrow: "Perps and margin",
    description: "Compare decentralized perpetuals, margin trading, options, cross-margin order books and DeFi execution venues for crypto-native trading teams.",
    snapshot: ["10", "Perps", "Margin", "Global"],
    checklist: [
      ["Perpetuals and margin trading", "For teams evaluating onchain leverage, liquidation engines, risk controls, execution quality and market coverage."],
      ["Cross-margin and collateral design", "For protocols and traders comparing unified margin, multi-collateral support, portfolio margin and capital efficiency."],
      ["Distribution and trader acquisition", "For venues that may value category visibility, partner discovery, integrations and ecosystem credibility."]
    ],
    vendors: [
      ["Hyperliquid", "HY", "Onchain perps L1", "Traders and builders needing fully onchain perpetual futures, spot order books and high-throughput financial primitives.", "Hyperliquid is a performant L1 with HyperCore for onchain perpetual futures and spot order books, plus HyperEVM for smart contract builders using the same liquidity layer.", ["Perpetuals", "Spot order books", "HyperCore", "HyperEVM"]],
      ["dYdX", "DY", "Perpetuals app-chain", "Professional traders and API-driven teams needing self-custody perps, advanced order types, markets and trading programs.", "dYdX positions itself as a DeFi pro trading platform with 200+ markets, deep liquidity, API access, self-custody and trading infrastructure for teams.", ["Perpetuals", "Order book", "API", "Self-custody"]],
      ["Aster", "AS", "Private perps DEX", "Traders comparing privacy-focused perpetuals, encrypted orders, shielded position data and high-performance perps infrastructure.", "Aster is a privacy-focused perp DEX offering perpetual markets, spot trading, Shield Mode and private order/position handling on Aster Chain.", ["Perpetuals", "Shield Mode", "Privacy", "Spot"]],
      ["GMX", "GM", "Perpetual DEX", "Traders and liquidity providers seeking decentralized perpetual trading, multi-chain liquidity and Arbitrum/Avalanche market access.", "GMX is a decentralized spot and perpetual exchange known for onchain leverage trading and liquidity-pool based execution across major DeFi networks.", ["Perpetuals", "Arbitrum", "Avalanche", "Liquidity pools"]],
      ["Vertex Protocol", "VE", "Cross-margin venue", "Teams needing a combined trading venue for spot, perpetuals, money markets and portfolio-style margin workflows.", "Vertex Protocol is positioned around unified cross-margin trading, combining spot, perpetuals and money market functions in one DeFi venue.", ["Cross-margin", "Spot", "Perpetuals", "Money markets"]],
      ["Aevo", "AE", "Options and perps", "Traders and institutions comparing options, perpetual futures, OTC and structured strategy workflows from a single margin account.", "Aevo is a decentralized derivatives exchange on a custom OP Stack L2 with options, perpetual futures, OTC, automated strategies and cross-margin support.", ["Options", "Perpetuals", "OP Stack", "Cross-margin"]],
      ["Jupiter Perps", "JU", "Solana perps", "Solana-native traders who want perps access through the broader Jupiter trading and liquidity ecosystem.", "Jupiter Perps is the perpetual futures product within Jupiter's Solana trading ecosystem, focused on SOL, BTC, ETH and other liquid crypto markets.", ["Solana", "Perpetuals", "Jupiter", "DEX aggregator"]],
      ["Drift Protocol", "DR", "Solana margin DEX", "Solana traders and builders needing perps, spot margin, swaps, borrow/lend collateral and a cross-margined risk engine.", "Drift is an open-source Solana DEX with perpetual futures, spot trading, swaps, lend/borrow collateral and a cross-margined risk engine.", ["Solana", "Perpetuals", "Spot margin", "Borrow/lend"]],
      ["Kwenta", "KW", "Synthetix perps", "Traders using Optimism/Synthetix liquidity for decentralized perpetuals and synthetic asset exposure.", "Kwenta is a decentralized derivatives trading interface built around Synthetix liquidity and Optimism ecosystem perps markets.", ["Synthetix", "Optimism", "Perpetuals", "Derivatives"]],
      ["MUX Protocol", "MX", "Perp aggregator", "Traders comparing aggregated perpetual liquidity, multi-chain execution and leverage routing across venues.", "MUX Protocol is a decentralized leveraged trading and perp aggregator designed to route margin trades across multiple chains and liquidity sources.", ["Perp aggregator", "Multi-chain", "Leverage", "Routing"]]
    ]
  },
  {
    slug: "insurance-risk-infrastructure",
    title: "Insurance and Risk Infrastructure Providers",
    eyebrow: "Risk protection",
    description: "Compare crypto cover, cyber insurance, smart contract risk, custody failure protection and institutional risk advisory providers for digital asset operations.",
    snapshot: ["8", "Cover", "Cyber", "Risk"],
    checklist: [
      ["Smart contract cover", "For DeFi integrations, protocol treasury exposure and tokenized asset platform dependencies."],
      ["Custody and operational risk", "For funds, issuers and vendors using third-party wallets, custodians, administrators and infrastructure partners."],
      ["Enterprise insurance placement", "For regulated institutions that need broker-led digital asset, cyber and operational risk programs."]
    ],
    vendors: [
      ["Nexus Mutual", "NX", "Crypto cover", "Funds, protocols and institutions seeking crypto-native cover for smart contract, custody and slashing risks.", "Nexus Mutual is relevant when digital asset exposure needs transparent onchain cover options.", ["Smart contract", "Custody failure", "Slashing", "Depeg"]],
      ["Sherlock", "SH", "Audit and coverage", "Protocols that want security contests, audits and coverage around smart contract risk.", "Sherlock fits teams combining audit review with economic coverage mechanisms.", ["Audits", "Coverage", "Smart contracts", "Security"]],
      ["Etherisc", "ET", "Decentralized insurance", "Teams exploring decentralized or parametric insurance products and claims automation.", "Etherisc is relevant for insurance builders that want protocol infrastructure rather than traditional policies only.", ["Parametric", "Protocol", "Claims", "Insurance"]],
      ["Nayms", "NY", "Insurance marketplace", "Digital asset businesses looking at onchain insurance programs and capital markets for risk.", "Nayms fits specialist insurance workflows where risk capital and policy structures interact onchain.", ["Marketplace", "Risk capital", "Digital assets", "Insurance"]],
      ["Ensuro", "EN", "Decentralized risk capital", "Insurance programs using decentralized capital pools and automated underwriting logic.", "Ensuro is useful when insurance product design and capital deployment need to be programmable.", ["Risk capital", "Underwriting", "Protocol", "Insurance"]],
      ["OpenCover", "OC", "Cover access", "Users and teams comparing crypto cover options across protocols and platforms.", "OpenCover is relevant as a distribution and access layer for digital asset protection products.", ["Crypto cover", "Aggregation", "Distribution", "Risk"]],
      ["Howden", "HO", "Broker advisory", "Institutions needing broker support for digital asset, cyber and financial risk placement.", "Howden fits teams that need traditional insurance market access for emerging technology risks.", ["Broker", "Digital assets", "Cyber", "Risk advisory"]],
      ["Marsh", "MA", "Enterprise risk", "Large enterprises and institutions needing risk advisory, cyber coverage and insurance program design.", "Marsh is relevant for organizations that need enterprise-grade risk placement and governance.", ["Insurance broker", "Cyber", "Enterprise", "Risk"]]
    ]
  },
  {
    slug: "trade-finance-supply-chain-infrastructure",
    title: "Trade Finance and Supply Chain Infrastructure",
    eyebrow: "Real-world operations",
    description: "Compare platforms for electronic trade documents, bills of lading, supply chain finance, provenance, customs workflows and cross-border document infrastructure.",
    snapshot: ["8", "eBL", "Docs", "Trade"],
    checklist: [
      ["Electronic trade documents", "For bills of lading, letters of credit, certificates and title-transfer workflows."],
      ["Supply chain provenance", "For cargo, commodities and manufacturing workflows that need verifiable records and audit trails."],
      ["Trade finance automation", "For banks, exporters, importers and logistics teams digitizing document review and settlement."]
    ],
    vendors: [
      ["CargoX", "CX", "Electronic trade documents", "Governments, logistics teams and trade operators needing secure digital document transfer.", "CargoX is relevant for blockchain-based trade document creation, transfer and management.", ["eBL", "Trade docs", "Ethereum", "API"]],
      ["essDOCS", "ED", "Paperless trade", "Commodity, shipping and trade finance teams digitizing original documents and title workflows.", "essDOCS fits trade ecosystems moving from paper documents to electronic originals.", ["eDocs", "Shipping", "Trade finance", "Title"]],
      ["Bolero", "BO", "Digital trade documents", "Banks, carriers and corporates that need electronic bills of lading and trade document exchange.", "Bolero is relevant where legal electronic trade document networks are central to the workflow.", ["eBL", "Trade docs", "Banks", "Carriers"]],
      ["Komgo", "KG", "Trade finance", "Banks, commodity traders and corporates digitizing trade finance, KYC and document workflows.", "Komgo fits complex trade finance processes across commodities and institutional counterparties.", ["Trade finance", "Commodities", "KYC", "Documents"]],
      ["TradeWaltz", "TW", "Trade platform", "Exporters, importers, logistics teams and banks coordinating digital trade information.", "TradeWaltz is relevant for multi-party trade workflow coordination and document data exchange.", ["Trade data", "Logistics", "Banks", "Documents"]],
      ["Traydstream", "TS", "Document checking", "Banks and trade finance teams automating document scrutiny and compliance checks.", "Traydstream fits institutions that need automated review of trade documents and rules.", ["Document checking", "Trade finance", "Automation", "Compliance"]],
      ["Enigio", "EG", "Digital originals", "Organizations that need legally reliable digital original documents and transferable records.", "Enigio is relevant for creating and managing digital originals across trade and finance.", ["Digital originals", "Documents", "Transferable records", "Trade"]],
      ["MineHub", "MH", "Commodity trade", "Mining, metals and commodity trade teams coordinating contracts, logistics and finance.", "MineHub fits commodity supply chains that need shared workflow data and trade finance coordination.", ["Commodities", "Supply chain", "Trade finance", "Workflow"]]
    ]
  },
  {
    slug: "carbon-climate-mrv-infrastructure",
    title: "Carbon and Climate MRV Infrastructure",
    eyebrow: "Climate markets",
    description: "Compare carbon market infrastructure, MRV, registry, retirement, climate data and ecological asset platforms for climate finance and environmental markets.",
    snapshot: ["8", "MRV", "Carbon", "Climate"],
    checklist: [
      ["MRV and verification", "For climate projects that need measurable, reportable and verifiable environmental outcomes."],
      ["Credit lifecycle infrastructure", "For issuance, transfers, retirements, claims and registry coordination."],
      ["Climate market data", "For buyers, marketplaces and financial products that need transparent climate asset information."]
    ],
    vendors: [
      ["Regen Network", "RG", "Ecological assets", "Communities and developers coordinating, funding and verifying regenerative action.", "Regen Network is relevant for ecological asset infrastructure and collaborative verification systems.", ["Ecological assets", "MRV", "Regeneration", "Protocol"]],
      ["Toucan Protocol", "TC", "Carbon rails", "Teams building carbon credit marketplaces, retirement workflows and climate finance tools.", "Toucan fits climate products that need digital rails for carbon credits and retirement.", ["Carbon credits", "Retirement", "Climate finance", "Infrastructure"]],
      ["Open Forest Protocol", "OF", "Forest MRV", "Forest projects and climate finance platforms needing monitoring, reporting and verification records.", "Open Forest Protocol is relevant for forest-based carbon projects and MRV data workflows.", ["Forest MRV", "Carbon", "Data", "Verification"]],
      ["dClimate", "DC", "Climate data", "Applications needing decentralized climate, weather and environmental data.", "dClimate fits teams that need climate datasets for insurance, agriculture, risk or market products.", ["Climate data", "Weather", "Risk", "Data marketplace"]],
      ["Carbonmark", "CM", "Carbon marketplace", "Organizations comparing, buying and retiring carbon credits through digital market infrastructure.", "Carbonmark is relevant where discoverability and retirement workflows are part of the carbon stack.", ["Marketplace", "Retirement", "Carbon credits", "KlimaDAO"]],
      ["KlimaDAO", "KL", "Climate finance", "Climate finance communities and builders exploring digital carbon market liquidity and tooling.", "KlimaDAO fits ecosystems focused on carbon market liquidity, retirement and public climate tooling.", ["Climate finance", "Carbon", "DAO", "Liquidity"]],
      ["Verra", "VR", "Registry standard", "Projects and buyers working with established voluntary carbon market standards and registry records.", "Verra is relevant as a standard and registry layer for carbon credit integrity, even when not a Web3 vendor.", ["Registry", "Standards", "Carbon", "VCS"]],
      ["Gold Standard", "GS", "Climate standard", "Climate projects seeking recognized certification, impact claims and sustainable development alignment.", "Gold Standard is relevant as a certification and standard-setting layer for climate assets.", ["Certification", "Standards", "Climate", "Impact"]]
    ]
  }
];

function esc(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function page(category) {
  const canonical = `https://www.fluidrwa.com/vendors/${category.slug}`;
  const itemList = category.vendors.map((vendor, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `${canonical}#${vendor[0].toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`,
    item: {
      "@type": "Organization",
      name: vendor[0],
      description: vendor[4],
      knowsAbout: vendor[5],
      additionalType: category.title
    }
  }));
  const structured = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: `${category.title} | FluidRWA`,
        description: category.description,
        isPartOf: { "@type": "WebSite", name: "FluidRWA", url: "https://www.fluidrwa.com/" },
        inLanguage: "en",
        dateModified: "2026-07-01",
        mainEntity: { "@id": `${canonical}#providers` }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.fluidrwa.com/" },
          { "@type": "ListItem", position: 2, name: "Vendors", item: "https://www.fluidrwa.com/web3vendorecosystem" },
          { "@type": "ListItem", position: 3, name: category.title, item: canonical }
        ]
      },
      {
        "@type": "ItemList",
        "@id": `${canonical}#providers`,
        name: category.title,
        numberOfItems: category.vendors.length,
        itemListElement: itemList
      }
    ]
  };

  const checklist = category.checklist.map((item, index) => `<article class="bc-area-card reveal"><span>${String(index + 1).padStart(2, "0")}</span><h3>${esc(item[0])}</h3><p>${esc(item[1])}</p></article>`).join("");
  const cards = category.vendors.map((vendor, index) => {
    const id = vendor[0].toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    return `<article class="bc-company-card reveal" id="${id}"><div class="bc-company-top"><div class="bc-company-mark">${esc(vendor[1])}</div><div><p class="bc-company-index">${String(index + 1).padStart(2, "0")} / ${esc(vendor[2])}</p><h3>${esc(vendor[0])}</h3></div></div><p class="bc-best"><span>Best for</span>${esc(vendor[3])}</p><p class="bc-desc">${esc(vendor[4])}</p><div class="bc-tags">${vendor[5].map((tag) => `<span>${esc(tag)}</span>`).join("")}</div></article>`;
  }).join("\n      ");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(category.title)} | FluidRWA</title>
  <meta name="description" content="${esc(category.description)}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" href="../../assets/favicon.png" type="image/png">
  <link rel="stylesheet" href="../../assets/styles-yellow-blue.css?v=vendor-expanded-1">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="FluidRWA">
  <meta property="og:title" content="${esc(category.title)} | FluidRWA">
  <meta property="og:description" content="${esc(category.description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="https://www.fluidrwa.com/assets/social/vendor-ecosystem.png">
  <meta name="twitter:card" content="summary_large_image">
  <script type="application/ld+json">${JSON.stringify(structured)}</script>
</head>
<body class="home-page light-home solutions-page">
  <header class="site-header light-header" data-site-header><nav class="nav" aria-label="Main navigation"><a class="brand light-brand" href="../../index.html" aria-label="FluidRWA home"><img src="../../assets/fluidrwa-small-logo.png" alt="FluidRWA"></a><button class="mobile-toggle light-toggle" type="button" aria-label="Open navigation" aria-expanded="false" data-nav-toggle><span></span><span></span><span></span></button><div class="nav-links light-nav-links" data-nav-links><a href="../../index.html">Home</a><a href="../../solutions.html">Solutions</a><a href="../../blog.html">Insights</a><a href="../../blockchain-projects">Blockchain Projects</a><a href="../../tools">Tools</a><a href="../../contact.html">Contact</a><a class="nav-ecosystem-cta" href="../../web3vendorecosystem">Explore Vendor Ecosystem</a></div></nav></header>
  <main id="main">
    <section class="bc-hero"><div class="light-container bc-hero-inner"><div class="bc-hero-copy"><p class="eyebrow light-eyebrow">${esc(category.eyebrow)}</p><h1>${esc(category.title)}</h1><p>${esc(category.description)}</p><div class="hero-actions"><a class="btn btn-primary light-primary" href="#vendor-directory">Explore Providers</a><a class="btn btn-soft" href="../../submit-requirement">Submit Requirements</a></div></div><aside class="bc-snapshot" aria-label="${esc(category.title)} snapshot"><div><strong>${esc(category.snapshot[0])}</strong><span>providers</span></div><div><strong>${esc(category.snapshot[1])}</strong><span>focus</span></div><div><strong>${esc(category.snapshot[2])}</strong><span>workflows</span></div><div><strong>${esc(category.snapshot[3])}</strong><span>coverage</span></div></aside></div></section>
    <section class="bc-section"><div class="light-container"><div class="solutions-section-head"><p class="eyebrow light-eyebrow">Buyer checklist</p><h2>When to shortlist this category</h2><p>Use this page as a starting point for category discovery. Vendor fit is based on public product positioning, public documentation and category relevance, not a FluidRWA endorsement.</p></div><div class="bc-area-grid">${checklist}</div></div></section>
    <section class="bc-section" id="vendor-directory"><div class="light-container"><div class="bc-directory-head"><div><p class="eyebrow light-eyebrow">Directory</p><h2>Compare ${esc(category.title.toLowerCase())}</h2><p>Verified category fit based on public positioning and buyer relevance for RWA, Web3, AI and digital asset teams.</p></div></div><div class="bc-company-grid" id="bcGrid">
      ${cards}
    </div></div></section>
  </main>
  <footer class="light-footer"><div class="light-container footer-grid-lite footer-simple"><a class="footer-brand-link" href="../../index.html" aria-label="FluidRWA home"><img class="footer-logo-lite" src="../../assets/fluidrwa-small-logo.png" alt="FluidRWA"></a><nav class="footer-legal-links" aria-label="Footer navigation"><a href="../../contact.html">Contact Us</a><a href="../../privacy.html">Privacy Policy</a><a href="../../terms.html">Terms & Conditions</a></nav></div><div class="light-container footer-bottom-lite">© <span data-year></span> FluidRWA.</div></footer>
  <script src="../../assets/site.js?v=forms-1" defer></script>
</body>
</html>
`;
}

for (const category of categories) {
  const dir = path.join(root, "vendors", category.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), page(category));
}

console.log(`Generated ${categories.length} expanded vendor category pages.`);
