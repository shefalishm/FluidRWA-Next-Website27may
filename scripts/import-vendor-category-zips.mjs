import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const site = "https://www.fluidrwa.com";

const imports = [
  {
    zip: "/Users/shefalisharma/Desktop/compliance-infrastructure.zip",
    slug: "compliance-infrastructure",
    title: "Compliance Infrastructure Vendors",
    h1: "Compliance Infrastructure Vendors",
    eyebrow: "FluidRWA vendor category",
    description:
      "Compare compliance infrastructure providers across transaction monitoring, blockchain analytics, regulatory reporting, crypto tax, policy engines and Travel Rule compliance.",
    summary:
      "Transaction monitoring, blockchain analytics, regulatory reporting, crypto tax, policy engines, and Travel Rule compliance powering regulatory operations for digital assets.",
    directoryTitle: "Compare Compliance Infrastructure Providers",
    itemLabel: "providers",
    cta: "Submit Requirements"
  },
  {
    zip: "/Users/shefalisharma/Desktop/defi-infrastructure.zip",
    slug: "defi-infrastructure",
    title: "DeFi Infrastructure Vendors",
    h1: "DeFi Infrastructure Vendors",
    eyebrow: "FluidRWA vendor category",
    description:
      "Compare DeFi infrastructure providers across decentralized exchanges, lending protocols, oracle networks, bridges, yield infrastructure and onchain derivatives.",
    summary:
      "Protocol infrastructure, liquidity systems, and tooling supporting decentralized finance ecosystems. Explore DEXs, lending, oracles, bridges, yield, and derivatives.",
    directoryTitle: "Compare DeFi Infrastructure Providers",
    itemLabel: "protocols",
    cta: "Submit Requirements"
  },
  {
    zip: "/Users/shefalisharma/Desktop/growth-marketing.zip",
    slug: "growth-marketing",
    title: "Growth & Marketing Companies",
    h1: "Growth & Marketing Companies",
    eyebrow: "FluidRWA vendor category",
    description:
      "Compare Web3 growth and marketing companies across go-to-market strategy, branding, PR, community growth, content, SEO, paid media, events and ecosystem partnerships.",
    summary:
      "Agencies and ecosystem partners supporting go-to-market strategy, growth, branding, PR, community expansion, content, SEO, paid media and Web3 ecosystem visibility.",
    directoryTitle: "Compare Web3 Growth & Marketing Companies",
    itemLabel: "companies",
    cta: "Submit Requirements"
  }
];

function esc(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function slugify(value = "") {
  return String(value)
    .toLowerCase()
    .replaceAll("&", "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function readApp(zipPath) {
  return execFileSync("unzip", ["-p", zipPath, "src/App.jsx"], { encoding: "utf8", maxBuffer: 10 * 1024 * 1024 });
}

function extractConst(source, name) {
  const start = source.indexOf(`const ${name} = [`);
  if (start < 0) throw new Error(`Could not find ${name}`);
  const arrayStart = source.indexOf("[", start);
  let depth = 0;
  let inString = false;
  let quote = "";
  let escape = false;
  for (let i = arrayStart; i < source.length; i += 1) {
    const ch = source[i];
    if (inString) {
      if (escape) escape = false;
      else if (ch === "\\") escape = true;
      else if (ch === quote) inString = false;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      inString = true;
      quote = ch;
      continue;
    }
    if (ch === "[") depth += 1;
    if (ch === "]") {
      depth -= 1;
      if (depth === 0) return source.slice(arrayStart, i + 1);
    }
  }
  throw new Error(`Could not parse ${name}`);
}

function parseArray(source, name) {
  const text = extractConst(source, name);
  return Function(`"use strict"; return (${text});`)();
}

function page(config, serviceAreas, vendors) {
  const url = `${site}/vendors/${config.slug}`;
  const list = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: `${config.title} | FluidRWA`,
        description: config.description,
        isPartOf: { "@type": "WebSite", name: "FluidRWA", url: `${site}/` },
        inLanguage: "en",
        dateModified: "2026-05-27",
        mainEntity: { "@id": `${url}#providers` }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${site}/` },
          { "@type": "ListItem", position: 2, name: "Vendors", item: `${site}/vendor-ecosystem` },
          { "@type": "ListItem", position: 3, name: config.h1, item: url }
        ]
      },
      {
        "@type": "ItemList",
        "@id": `${url}#providers`,
        name: config.h1,
        numberOfItems: vendors.length,
        itemListElement: vendors.map((vendor, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${url}#${slugify(vendor.name)}`,
          item: {
            "@type": "Organization",
            name: vendor.name,
            url: vendor.url,
            description: vendor.desc,
            foundingDate: String(vendor.founded || ""),
            address: { "@type": "PostalAddress", addressCountry: vendor.hq || "Global" },
            knowsAbout: [...(vendor.tags || []), ...(vendor.serviceAreas || []), ...(vendor.jurisdictions || [])],
            additionalType: vendor.serviceType
          }
        }))
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: `What are ${config.h1.toLowerCase()}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: config.summary
            }
          },
          {
            "@type": "Question",
            name: `How many ${config.itemLabel} are listed?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `FluidRWA lists ${vendors.length} ${config.itemLabel} in this category with service areas, best-fit use cases, jurisdictions, descriptions and direct provider links.`
            }
          },
          {
            "@type": "Question",
            name: "Does FluidRWA endorse these providers?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "FluidRWA is a discovery layer. The directory helps teams shortlist relevant providers, but every organization should complete its own legal, compliance, commercial and technical diligence."
            }
          }
        ]
      }
    ]
  };

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(config.title)} | FluidRWA</title>
  <meta name="description" content="${esc(config.description)}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
  <link rel="canonical" href="${url}">
  <link rel="icon" href="../../assets/favicon.png" type="image/png">
  <link rel="stylesheet" href="../../assets/styles-yellow-blue.css?v=vendor-data-1">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="FluidRWA">
  <meta property="og:title" content="${esc(config.title)} | FluidRWA">
  <meta property="og:description" content="${esc(config.description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${site}/assets/social/vendor-ecosystem.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="${site}/assets/social/vendor-ecosystem.png">
  <script type="application/ld+json">${JSON.stringify(list)}</script>
</head>
<body class="home-page light-home solutions-page">
  <header class="site-header light-header" data-site-header>
    <nav class="nav" aria-label="Main navigation">
      <a class="brand light-brand" href="../../index.html" aria-label="FluidRWA home"><img src="../../assets/fluidrwa-small-logo.png" alt="FluidRWA"></a>
      <button class="mobile-toggle light-toggle" type="button" aria-label="Open navigation" aria-expanded="false" data-nav-toggle><span></span><span></span><span></span></button>
      <div class="nav-links light-nav-links" data-nav-links><a href="../../index.html">Home</a><a href="../../vendor-ecosystem.html">Vendors</a><a href="../../solutions.html">Solutions</a><a href="../../blog.html">Insights</a><a href="../../team.html">About</a><a href="../../contact.html">Contact</a><a class="nav-ecosystem-cta" href="../../vendor-ecosystem.html">Explore Vendor Ecosystem</a></div>
    </nav>
  </header>
  <main id="main">
    <section class="bc-hero">
      <div class="light-container bc-hero-inner">
        <div class="bc-hero-copy">
          <p class="eyebrow light-eyebrow">${esc(config.eyebrow)}</p>
          <h1>${esc(config.h1)}</h1>
          <p>${esc(config.summary)}</p>
          <div class="hero-actions"><a class="btn btn-primary light-primary" href="#vendor-directory">Explore Providers</a><a class="btn btn-soft" href="../../submit-project.html">${esc(config.cta)}</a></div>
        </div>
        <aside class="bc-snapshot" aria-label="${esc(config.h1)} snapshot">
          <div><strong>${vendors.length}</strong><span>${esc(config.itemLabel)}</span></div>
          <div><strong>${serviceAreas.length}</strong><span>Service areas</span></div>
          <div><strong>Global</strong><span>Coverage</span></div>
          <div><strong>SEO</strong><span>Indexed</span></div>
        </aside>
      </div>
    </section>
    <section class="bc-section">
      <div class="light-container">
        <div class="solutions-section-head"><p class="eyebrow light-eyebrow">Coverage</p><h2>Explore Service Areas</h2><p>Use these service areas to understand the category, provider fit, operational role and infrastructure coverage before shortlisting vendors.</p></div>
        <div class="bc-area-grid">${serviceAreas.map((area, index) => `<article class="bc-area-card reveal" id="${slugify(area.name)}"><span>${String(index + 1).padStart(2, "0")}</span><h3>${esc(area.name)}</h3><p>${esc(area.desc)}</p><strong>${esc(area.count)} ${esc(config.itemLabel)}</strong></article>`).join("")}</div>
      </div>
    </section>
    <section class="bc-section" id="vendor-directory">
      <div class="light-container">
        <div class="bc-directory-head"><div><p class="eyebrow light-eyebrow">Directory</p><h2>${esc(config.directoryTitle)}</h2><p>${vendors.length} ${esc(config.itemLabel)} with service type, best-fit use case, jurisdiction coverage, strengths and provider-level structured data.</p></div></div>
        <div class="bc-provider-grid">${vendors.map((vendor, index) => providerCard(vendor, index)).join("")}</div>
      </div>
    </section>
    <section class="bc-section">
      <div class="light-container">
        <div class="bc-faq-card">
          <p class="eyebrow light-eyebrow">Selection framework</p>
          <h2>How to Shortlist ${esc(config.h1)}</h2>
          <div class="bc-faq-grid">
            <article><h3>Start with the workflow</h3><p>Map the provider to the specific operational problem: onboarding, monitoring, settlement, risk, reporting, liquidity, data, or protocol infrastructure.</p></article>
            <article><h3>Check jurisdiction and fit</h3><p>Review headquarters, supported regions, regulatory posture, integrations, asset coverage and whether the provider fits your institutional requirements.</p></article>
            <article><h3>Run diligence</h3><p>FluidRWA helps discovery. Your team should still complete commercial, technical, security, legal and compliance diligence before selection.</p></article>
          </div>
        </div>
      </div>
    </section>
  </main>
  <script src="../../assets/site.js?v=vendor-data-1" defer></script>
</body>
</html>`;
}

function providerCard(vendor, index) {
  const id = slugify(vendor.name);
  const tags = [...(vendor.tags || []), ...(vendor.keyStats || [])].slice(0, 6);
  return `<article class="bc-provider-card reveal" id="${id}" itemscope itemtype="https://schema.org/Organization">
    <div class="bc-provider-top">
      <div class="bc-logo-mark" aria-hidden="true">${esc(vendor.name.slice(0, 2).toUpperCase())}</div>
      <div><p class="bc-company-index">${String(index + 1).padStart(2, "0")} / ${esc(vendor.serviceType || "Infrastructure Provider")}</p><h3 itemprop="name">${esc(vendor.name)}</h3></div>
    </div>
    <p class="bc-best-fit"><strong>Best for:</strong> ${esc(vendor.bestFor || "")}</p>
    <p itemprop="description">${esc(vendor.desc || vendor.longDesc || "")}</p>
    <dl class="bc-provider-facts">
      <div><dt>HQ</dt><dd>${esc(vendor.hq || "Global")}</dd></div>
      <div><dt>Founded</dt><dd>${esc(vendor.founded || "N/A")}</dd></div>
      <div><dt>Services</dt><dd>${esc((vendor.serviceAreas || []).join(", "))}</dd></div>
      <div><dt>Coverage</dt><dd>${esc((vendor.jurisdictions || []).join(", "))}</dd></div>
    </dl>
    <div class="bc-provider-tags">${tags.map((tag) => `<span>${esc(tag)}</span>`).join("")}</div>
    <a class="bc-provider-link" href="${esc(vendor.url)}" target="_blank" rel="noopener noreferrer nofollow" itemprop="url">Visit ${esc(vendor.name)}</a>
  </article>`;
}

for (const config of imports) {
  const source = readApp(config.zip);
  const serviceAreas = parseArray(source, "SERVICE_AREAS");
  const vendors = parseArray(source, "VENDORS");
  const outDir = path.join(root, "vendors", config.slug);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), page(config, serviceAreas, vendors));
  console.log(`Imported ${vendors.length} ${config.slug} vendors.`);
}
