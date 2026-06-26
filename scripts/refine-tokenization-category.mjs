import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourcePath = path.join(root, "vendors/tokenization-platforms/index.html");
const source = fs.readFileSync(sourcePath, "utf8");

const platformIds = [
  "zoniqx",
  "securitize",
  "tokeny",
  "digishares",
  "taurus",
  "persistent-systems",
  "ment-tech",
  "investax",
  "brickken",
  "libertum",
  "mintworks"
];

const adjacentIds = [
  "addx",
  "archax",
  "backed-finance",
  "centrifuge",
  "figure-markets",
  "mantra-chain",
  "maple-finance",
  "ondo-finance",
  "plume-network",
  "polymath-polymesh",
  "realt",
  "stegx",
  "superstate"
];

const cardRegex = /<article class="bc-company-card reveal" id="([^"]+)"[\s\S]*?<\/article>/g;
const cards = new Map();
let match;
while ((match = cardRegex.exec(source))) {
  cards.set(match[1], match[0]);
}

function pickCards(ids) {
  return ids.map((id, index) => {
    const card = cards.get(id);
    if (!card) throw new Error(`Missing card: ${id}`);
    return card.replace(/<p class="bc-company-index">\d{2} \//, `<p class="bc-company-index">${String(index + 1).padStart(2, "0")} /`);
  }).join("\n");
}

function replaceProviderGrid(html, ids, label) {
  const gridStart = '<div class="bc-company-grid" data-bc-grid>';
  const start = html.indexOf(gridStart);
  const endMarker = '</div>\n      </div>\n    </section>\n    <section class="bc-section" aria-labelledby="guide-title">';
  const end = html.indexOf(endMarker, start);
  if (start === -1 || end === -1) throw new Error("Could not locate provider grid");
  return html.slice(0, start + gridStart.length) + pickCards(ids) + html.slice(end);
}

function updateJsonLd(html, ids, config) {
  return html.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/, (_, raw) => {
    const data = JSON.parse(raw);
    for (const node of data["@graph"]) {
      if (node["@type"] === "CollectionPage") {
        node["@id"] = `${config.url}#webpage`;
        node.url = config.url;
        node.name = config.title;
        node.description = config.schemaDescription;
        node.dateModified = "2026-06-19";
        node.mainEntity = { "@id": `${config.url}#providers` };
      }
      if (node["@type"] === "BreadcrumbList") {
        node["@id"] = `${config.url}#breadcrumb`;
        node.itemListElement[2].name = config.breadcrumb;
        node.itemListElement[2].item = config.url;
      }
      if (node["@type"] === "ItemList") {
        node["@id"] = `${config.url}#providers`;
        node.name = config.itemListName;
        const existing = new Map(node.itemListElement.map((item) => [item.url.split("#")[1], item]));
        node.itemListElement = ids.map((id, index) => {
          const item = existing.get(id);
          if (!item) throw new Error(`Missing schema item: ${id}`);
          item.position = index + 1;
          item.url = `${config.url}#${id}`;
          return item;
        });
        node.numberOfItems = ids.length;
      }
      if (node["@type"] === "FAQPage") {
        node["@id"] = `${config.url}#faq`;
        node.mainEntity = config.faq;
      }
    }
    return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
  });
}

function commonSeoReplacements(html, config) {
  return html
    .replace(/<title>[^<]+<\/title>/, `<title>${config.title}</title>`)
    .replace(/<meta name="description" content="[^"]+">/, `<meta name="description" content="${config.metaDescription}">`)
    .replace(/<meta property="og:title" content="[^"]+">/, `<meta property="og:title" content="${config.title}">`)
    .replace(/<meta property="og:description" content="[^"]+">/, `<meta property="og:description" content="${config.ogDescription}">`)
    .replace(/<meta property="og:url" content="[^"]+">/, `<meta property="og:url" content="${config.url}">`)
    .replace(/<link rel="canonical" href="[^"]+">/, `<link rel="canonical" href="${config.url}">`)
    .replace(/<h1 id="bc-title">[^<]+<\/h1>/, `<h1 id="bc-title">${config.h1}</h1>`)
    .replace(/<p class="eyebrow light-eyebrow">FluidRWA vendor category<\/p>/, `<p class="eyebrow light-eyebrow">${config.eyebrow}</p>`)
    .replace(/<p>Find specialized platforms for issuing, managing, distributing and servicing tokenized real-world assets across real estate, funds, treasuries, securities, private credit and commodities\.<\/p>/, `<p>${config.intro}</p>`);
}

const platformFaq = [
  {
    "@type": "Question",
    "name": "What should be listed as a tokenization platform?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "A tokenization platform should provide issuer-side infrastructure for creating, managing, servicing, transferring or administering tokenized real-world assets, securities, funds or investment products."
    }
  },
  {
    "@type": "Question",
    "name": "Why are RWA protocols and marketplaces separated from tokenization platforms?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Protocols, marketplaces, chains and tokenized product issuers can be important to tokenized markets, but they are not always the software platform an issuer uses to tokenize and manage an asset."
    }
  },
  {
    "@type": "Question",
    "name": "How should issuers compare tokenization platforms?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Issuers should compare supported asset classes, jurisdiction support, compliance model, investor onboarding, custody integrations, payments, reporting, transfer controls and lifecycle management."
    }
  }
];

const adjacentFaq = [
  {
    "@type": "Question",
    "name": "What belongs in RWA protocols, marketplaces and tokenized asset issuers?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "This category covers companies that support tokenized asset markets through venues, RWA chains, lending protocols, tokenized products, distribution marketplaces or investor-facing access layers."
    }
  },
  {
    "@type": "Question",
    "name": "Are these companies tokenization platforms?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Some may include tokenization capabilities, but their primary role is often marketplace access, protocol infrastructure, tokenized product issuance, chain infrastructure or investor distribution rather than issuer-side platform software."
    }
  },
  {
    "@type": "Question",
    "name": "When should a project use this page?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Use this page when comparing RWA market infrastructure beyond issuer-side tokenization platforms, including regulated venues, tokenized product issuers, RWA credit protocols and purpose-built RWA chains."
    }
  }
];

let platformPage = source;
platformPage = commonSeoReplacements(platformPage, {
  title: "RWA Tokenization Platforms for Issuers | FluidRWA",
  metaDescription: "Compare issuer-side RWA tokenization platforms for asset issuance, investor onboarding, compliance, lifecycle management and tokenized asset servicing.",
  ogDescription: "A stricter FluidRWA shortlist of issuer-side tokenization platforms built to create, manage and service tokenized assets.",
  url: "https://www.fluidrwa.com/vendors/tokenization-platforms",
  h1: "RWA Tokenization Platforms for Issuers",
  eyebrow: "Issuer-side tokenization platforms",
  intro: "Find platforms built to help issuers create, manage, service and distribute tokenized real-world assets, funds and securities."
});
platformPage = platformPage
  .replace(/<aside class="bc-snapshot"[\s\S]*?<\/aside>/, `<aside class="bc-snapshot" aria-label="Tokenization platform snapshot"><div><strong>11</strong><span>issuer-side platforms</span></div><div><strong>Full</strong><span>asset lifecycle support</span></div><div><strong>Multi-chain</strong><span>coverage</span></div></aside>`)
  .replace(/<h2 id="providers-title">Compare RWA tokenization providers<\/h2><p>Search by company, asset class, chain, platform type, jurisdiction or capability\. Each profile is written for quick institutional shortlisting and AI-search clarity\.<\/p>/, `<h2 id="providers-title">Compare RWA tokenization platforms</h2><p>This page is now limited to issuer-side platforms whose core product helps teams tokenize, manage and service assets.</p>`)
  .replace(/<p class="bc-count" id="bcCount">Showing 19 providers<\/p>/, `<p class="bc-count" id="bcCount">Showing 11 platforms</p><p class="bc-count"><a href="/vendors/rwa-protocols-marketplaces">Looking for RWA protocols, marketplaces, chains or tokenized asset issuers? View the adjacent category.</a></p>`)
  .replace(/count\.textContent = 'Showing ' \+ visible \+ \(visible === 1 \? ' provider' : ' providers'\);/, `count.textContent = 'Showing ' + visible + (visible === 1 ? ' platform' : ' platforms');`)
  .replace(/<h2 id="faq-title">RWA tokenization provider questions<\/h2>/, `<h2 id="faq-title">RWA tokenization platform questions</h2>`);
platformPage = replaceProviderGrid(platformPage, platformIds, "platforms");
platformPage = updateJsonLd(platformPage, platformIds, {
  url: "https://www.fluidrwa.com/vendors/tokenization-platforms",
  title: "RWA Tokenization Platforms for Issuers | FluidRWA",
  schemaDescription: "Compare issuer-side RWA tokenization platforms for creating, managing, servicing and administering tokenized real-world assets, funds and securities.",
  breadcrumb: "Tokenization Platforms",
  itemListName: "Issuer-side RWA Tokenization Platforms",
  faq: platformFaq
});

let adjacentPage = source;
adjacentPage = commonSeoReplacements(adjacentPage, {
  title: "RWA Protocols, Marketplaces & Tokenized Asset Issuers | FluidRWA",
  metaDescription: "Explore RWA protocols, marketplaces, regulated venues, tokenized product issuers and RWA chains that support tokenized asset markets.",
  ogDescription: "FluidRWA category for RWA protocols, marketplaces, chains, tokenized product issuers and adjacent market infrastructure.",
  url: "https://www.fluidrwa.com/vendors/rwa-protocols-marketplaces",
  h1: "RWA Protocols, Marketplaces & Tokenized Asset Issuers",
  eyebrow: "Adjacent RWA market infrastructure",
  intro: "Explore RWA protocols, marketplaces, regulated venues, tokenized product issuers and purpose-built chains that support tokenized asset markets."
});
adjacentPage = adjacentPage
  .replace(/vendors\/tokenization-platforms/g, "vendors/rwa-protocols-marketplaces")
  .replace(/<aside class="bc-snapshot"[\s\S]*?<\/aside>/, `<aside class="bc-snapshot" aria-label="RWA market infrastructure snapshot"><div><strong>13</strong><span>protocols, venues and issuers</span></div><div><strong>5</strong><span>market infrastructure types</span></div><div><strong>Global</strong><span>coverage</span></div></aside>`)
  .replace(/<h2 id="asset-title">What RWA tokenization platforms help launch<\/h2><p>Use these groups to understand whether a provider is best suited for real estate, treasury products, regulated securities, lending markets, funds or broader enterprise tokenization infrastructure\.<\/p>/, `<h2 id="asset-title">What this adjacent category covers</h2><p>Use this page for tokenized product issuers, RWA protocols, exchanges, marketplaces and blockchain infrastructure that support tokenized asset markets but are not primarily issuer-side platform software.</p>`)
  .replace(/<h2 id="providers-title">Compare RWA tokenization providers<\/h2><p>Search by company, asset class, chain, platform type, jurisdiction or capability\. Each profile is written for quick institutional shortlisting and AI-search clarity\.<\/p>/, `<h2 id="providers-title">Compare adjacent RWA market infrastructure</h2><p>Search by venue, protocol, product issuer, RWA chain, asset class, jurisdiction or capability.</p>`)
  .replace(/<p class="bc-count" id="bcCount">Showing 19 providers<\/p>/, `<p class="bc-count" id="bcCount">Showing 13 companies</p><p class="bc-count"><a href="/vendors/tokenization-platforms">Need issuer-side tokenization software? View Tokenization Platforms.</a></p>`)
  .replace(/<h2 id="guide-title">How to evaluate a tokenization platform<\/h2>[\s\S]*?<\/div><\/div>/, `<h2 id="guide-title">How to evaluate adjacent RWA infrastructure</h2><div class="bc-guide-list"><article><span>01</span><h3>Separate platform from venue</h3><p>A marketplace or exchange can help distribution and trading, while a tokenization platform helps issuers create and manage the asset itself.</p></article><article><span>02</span><h3>Check the role in the stack</h3><p>Identify whether the company is a chain, protocol, product issuer, marketplace, exchange, lending market or regulated access layer.</p></article><article><span>03</span><h3>Match the buyer need</h3><p>Issuers may need platform software first. Investors may need product issuers or marketplaces. Developers may need RWA chains or protocols.</p></article><article><span>04</span><h3>Verify regulatory fit</h3><p>Review licensing, jurisdiction, investor eligibility, custody, transfer restrictions and secondary market rules before using any venue or product.</p></article></div></div>`)
  .replace(/<h2 id="faq-title">RWA tokenization provider questions<\/h2>[\s\S]*?<\/div><\/div>/, `<h2 id="faq-title">RWA market infrastructure questions</h2><details><summary>Is this the same as a tokenization platform?</summary><p>No. This page covers adjacent infrastructure such as marketplaces, protocols, chains and tokenized product issuers. Issuer-side tokenization platforms are listed separately.</p></details><details><summary>Why does FluidRWA separate these companies?</summary><p>It makes buyer discovery cleaner. A project that needs software to tokenize an asset has a different need than an investor looking for a tokenized product or a developer choosing an RWA chain.</p></details><details><summary>Can a company appear in both categories?</summary><p>Yes, if its core product clearly supports both issuer-side tokenization and adjacent market infrastructure. FluidRWA categorizes by primary buyer use case.</p></details></div></div>`)
  .replace(/count\.textContent = 'Showing ' \+ visible \+ \(visible === 1 \? ' provider' : ' providers'\);/, `count.textContent = 'Showing ' + visible + (visible === 1 ? ' company' : ' companies');`);
adjacentPage = replaceProviderGrid(adjacentPage, adjacentIds, "adjacent");
adjacentPage = updateJsonLd(adjacentPage, adjacentIds, {
  url: "https://www.fluidrwa.com/vendors/rwa-protocols-marketplaces",
  title: "RWA Protocols, Marketplaces & Tokenized Asset Issuers | FluidRWA",
  schemaDescription: "Explore RWA protocols, marketplaces, regulated venues, tokenized product issuers and purpose-built chains that support tokenized asset markets.",
  breadcrumb: "RWA Protocols, Marketplaces & Issuers",
  itemListName: "RWA Protocols, Marketplaces and Tokenized Asset Issuers",
  faq: adjacentFaq
});

fs.writeFileSync(sourcePath, platformPage);
const adjacentDir = path.join(root, "vendors/rwa-protocols-marketplaces");
fs.mkdirSync(adjacentDir, { recursive: true });
fs.writeFileSync(path.join(adjacentDir, "index.html"), adjacentPage);
