import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const vendorsDir = path.join(root, "vendors");
const fluidrwaDir = path.join(root, "fluidrwa");
const publicLogoDir = path.join(root, "public/assets/company-logos");
const legacyLogoDir = path.join(root, "assets/company-logos");
const cachePath = path.join(root, "data/company-profiles.json");
const siteUrl = "https://www.fluidrwa.com";
const shouldFetch = process.env.FLUIDRWA_FETCH_COMPANY_META === "1";

const categorySlugMap = {
  "tokenization-platforms": "tokenization-platforms",
  "legal-regulatory": "legal-regulatory-vendors",
  "kyc-aml": "kyc-aml-providers",
  "smart-contract-development": "smart-contract-development-companies",
  "ai-infrastructure": "ai-infrastructure-providers",
  "custody-solutions": "crypto-custody-providers",
  "fiat-on-off-ramps": "fiat-on-off-ramp-providers",
  "compliance-infrastructure": "compliance-infrastructure-providers",
  "defi-infrastructure": "defi-infrastructure-providers",
  "payments-stablecoins": "stablecoin-infrastructure-providers",
  "security-audits": "security-audit-companies",
  "growth-marketing": "growth-marketing-companies",
  "identity-solutions": "identity-solution-providers",
  "blockchain-development": "blockchain-development-companies",
  "fund-administration-transfer-agents": "fund-administration-transfer-agents",
  "oracles-data-proof-of-reserve": "oracles-data-proof-of-reserve",
  "insurance-risk-infrastructure": "insurance-risk-infrastructure",
  "trade-finance-supply-chain-infrastructure": "trade-finance-supply-chain-infrastructure",
  "carbon-climate-mrv-infrastructure": "carbon-climate-mrv-infrastructure",
  "ai-agents-autonomous-systems": "ai-agents-autonomous-systems",
  "ai-document-intelligence-knowledge-retrieval": "ai-document-intelligence-knowledge-retrieval",
  "ai-risk-analytics-compliance-intelligence": "ai-risk-analytics-compliance-intelligence",
  "decentralized-ai-compute-gpu-infrastructure": "decentralized-ai-compute-gpu-infrastructure",
  "ai-data-model-marketplaces": "ai-data-model-marketplaces",
  "verifiable-ai-smart-contract-infrastructure": "verifiable-ai-smart-contract-infrastructure"
};

const priorityCompanySlugs = new Set(["zoniqx", "minddeft-technologies", "surestack"]);

const manualCompanyProfiles = [
  {
    position: 1,
    categoryDir: "security-audits",
    categoryRoute: "security-audit-companies",
    categoryTitle: "Security & Audit Vendors",
    anchor: "surestack",
    name: "SureStack",
    slug: "surestack",
    url: "https://surestack.tech/",
    description:
      "SureStack is an AI-powered Web3 risk intelligence platform focused on vulnerability detection, threat monitoring and digital asset risk protection before threats hit the chain.",
    foundingDate: "2024",
    address: { "@type": "PostalAddress", addressCountry: "Canada" },
    knowsAbout: [
      "Web3 Risk Intelligence",
      "Security Monitoring",
      "Threat Detection",
      "Digital Asset Protection",
      "Tokenization Security",
      "Risk Management"
    ],
    additionalType: "Vetted Risk Management & Security Partner",
    logoPath: "/assets/company-logos/surestack.png",
    logoSource: "/assets/company-logos/surestack.png"
  }
];

const fallbackCategoryVendors = {
  "identity-solutions": [
    {
      position: 1,
      name: "SpruceID",
      url: "https://www.spruceid.com",
      description: "SpruceID provides decentralized identity infrastructure, verifiable credentials and digital credential wallet tooling for organizations building user-controlled identity systems.",
      foundingDate: "2020",
      address: { "@type": "PostalAddress", addressCountry: "USA" },
      knowsAbout: ["Decentralized Identity", "Verifiable Credentials", "Digital Credentials", "Wallets", "DID", "Enterprise Identity"],
      additionalType: "Decentralized Identity Infrastructure"
    },
    {
      position: 2,
      name: "Privado ID",
      url: "https://www.privado.id",
      description: "Privado ID provides privacy-preserving digital identity infrastructure using verifiable credentials and zero-knowledge proofs for Web3 and enterprise use cases.",
      foundingDate: "2024",
      address: { "@type": "PostalAddress", addressCountry: "Global" },
      knowsAbout: ["Privacy-Preserving Identity", "Verifiable Credentials", "Zero-Knowledge Proofs", "Web3 Identity", "Compliance"],
      additionalType: "Privacy-Preserving Identity Infrastructure"
    },
    {
      position: 3,
      name: "Civic",
      url: "https://www.civic.com",
      description: "Civic provides identity verification, reusable KYC and access management tools for crypto, Web3 and digital platforms.",
      foundingDate: "2015",
      address: { "@type": "PostalAddress", addressCountry: "USA" },
      knowsAbout: ["Reusable KYC", "Identity Verification", "Access Management", "Web3 Identity", "Compliance"],
      additionalType: "Web3 Identity Verification"
    }
  ]
};

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function esc(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function stripTags(value = "") {
  return String(value).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function decodeEntities(value = "") {
  return String(value)
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&#([0-9]+);/g, (_, code) => String.fromCodePoint(parseInt(code, 10)))
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function absoluteUrl(value, base) {
  if (!value) return "";
  try {
    return new URL(value, base).toString();
  } catch {
    return "";
  }
}

function readJsonCache() {
  if (!fs.existsSync(cachePath)) return {};
  try {
    return JSON.parse(fs.readFileSync(cachePath, "utf8"));
  } catch {
    return {};
  }
}

function writeJsonCache(cache) {
  fs.mkdirSync(path.dirname(cachePath), { recursive: true });
  fs.writeFileSync(cachePath, `${JSON.stringify(cache, null, 2)}\n`);
}

function extractJsonLd(html) {
  const blocks = [...html.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  for (const block of blocks) {
    try {
      const parsed = JSON.parse(block[1]);
      const graph = parsed["@graph"] || (Array.isArray(parsed) ? parsed : [parsed]);
      const itemList = graph.find((item) => item?.["@type"] === "ItemList");
      if (itemList?.itemListElement?.length) return { parsed, itemList };
    } catch {
      // Keep scanning; some legacy pages can include older malformed blocks.
    }
  }
  return null;
}

function collectCompanies() {
  const selected = new Map();
  const categories = [];
  for (const categoryDir of fs.readdirSync(vendorsDir).sort()) {
    const htmlPath = path.join(vendorsDir, categoryDir, "index.html");
    if (!fs.existsSync(htmlPath)) continue;
    const html = fs.readFileSync(htmlPath, "utf8");
    const extracted = extractJsonLd(html);
    const title = extracted?.parsed["@graph"]?.find((item) => item?.["@type"] === "CollectionPage")?.name || "Identity Solutions Vendors | FluidRWA";
    const rawVendors = extracted?.itemList?.itemListElement || fallbackCategoryVendors[categoryDir]?.map((item) => ({ position: item.position, item })) || [];
    if (!rawVendors.length) continue;
    const vendors = rawVendors
      .map((entry) => ({
        position: entry.position,
        categoryDir,
        categoryRoute: categorySlugMap[categoryDir] || categoryDir,
        categoryTitle: String(title).replace(/\s*\|\s*FluidRWA$/, ""),
        anchor: slugify(entry.item?.name),
        ...entry.item
      }))
      .filter((item) => item.name && item.url);
    categories.push({ categoryDir, vendors });
    for (const company of vendors.slice(0, 3)) {
      const slug = slugify(company.name);
      if (!selected.has(slug)) selected.set(slug, { ...company, slug, categories: [company.categoryTitle] });
    }
  }

  for (const category of categories) {
    for (const company of category.vendors) {
      const slug = slugify(company.name);
      if (!priorityCompanySlugs.has(slug)) continue;
      if (selected.has(slug)) {
        const current = selected.get(slug);
        current.categories = [...new Set([...current.categories, company.categoryTitle])];
      } else {
        selected.set(slug, { ...company, slug, categories: [company.categoryTitle] });
      }
    }
  }

  for (const company of manualCompanyProfiles) {
    const targetCategory = categories.find((item) => item.categoryDir === company.categoryDir);
    if (targetCategory && !targetCategory.vendors.some((item) => slugify(item.name) === company.slug)) {
      targetCategory.vendors.unshift(company);
    }
    if (selected.has(company.slug)) {
      const current = selected.get(company.slug);
      selected.set(company.slug, {
        ...current,
        ...company,
        categories: [...new Set([...(current.categories || []), company.categoryTitle])]
      });
    } else {
      selected.set(company.slug, { ...company, categories: [company.categoryTitle] });
    }
  }

  return { companies: [...selected.values()], categories };
}

async function fetchText(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 9000);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "user-agent": "FluidRWA vendor research bot (+https://www.fluidrwa.com)",
        accept: "text/html,application/xhtml+xml"
      }
    });
    if (!res.ok) return "";
    return await res.text();
  } catch {
    return "";
  } finally {
    clearTimeout(timer);
  }
}

function metaContent(html, attr, value) {
  const re = new RegExp(`<meta[^>]+${attr}=["']${value}["'][^>]+content=["']([^"']+)["'][^>]*>`, "i");
  const alt = new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+${attr}=["']${value}["'][^>]*>`, "i");
  return stripTags(html.match(re)?.[1] || html.match(alt)?.[1] || "");
}

function linkHref(html, rel) {
  const tags = [...html.matchAll(/<link[^>]+>/gi)].map((m) => m[0]);
  const found = tags.find((tag) => new RegExp(`rel=["'][^"']*${rel}[^"']*["']`, "i").test(tag));
  return found?.match(/href=["']([^"']+)["']/i)?.[1] || "";
}

function jsonLdLogo(html) {
  const blocks = [...html.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  for (const block of blocks) {
    try {
      const parsed = JSON.parse(block[1]);
      const nodes = parsed["@graph"] || (Array.isArray(parsed) ? parsed : [parsed]);
      for (const node of nodes) {
        const logo = node?.logo?.url || node?.logo;
        if (typeof logo === "string") return logo;
      }
    } catch {
      // Ignore malformed third-party JSON-LD.
    }
  }
  return "";
}

async function downloadLogo(companySlug, logoUrl) {
  if (!logoUrl) return "";
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 9000);
  try {
    const res = await fetch(logoUrl, {
      signal: controller.signal,
      headers: { "user-agent": "FluidRWA vendor research bot (+https://www.fluidrwa.com)" }
    });
    if (!res.ok) return "";
    const contentType = res.headers.get("content-type") || "";
    const buffer = Buffer.from(await res.arrayBuffer());
    if (buffer.byteLength < 64 || buffer.byteLength > 2_000_000) return "";
    const ext =
      contentType.includes("svg") ? "svg" :
      contentType.includes("png") ? "png" :
      contentType.includes("webp") ? "webp" :
      contentType.includes("jpeg") || contentType.includes("jpg") ? "jpg" :
      path.extname(new URL(logoUrl).pathname).replace(".", "").slice(0, 5) || "png";
    const filename = `${companySlug}.${ext}`;
    fs.mkdirSync(publicLogoDir, { recursive: true });
    fs.mkdirSync(legacyLogoDir, { recursive: true });
    fs.writeFileSync(path.join(publicLogoDir, filename), buffer);
    fs.writeFileSync(path.join(legacyLogoDir, filename), buffer);
    return `/assets/company-logos/${filename}`;
  } catch {
    return "";
  } finally {
    clearTimeout(timer);
  }
}

async function researchCompany(company, cache) {
  const cached = cache[company.slug] || {};
  if (!shouldFetch && cached.sourceUrl) return cached;

  const html = shouldFetch ? await fetchText(company.url) : "";
  const base = company.url;
  const title = stripTags(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || cached.officialTitle || "");
  const officialDescription =
    metaContent(html, "name", "description") ||
    metaContent(html, "property", "og:description") ||
    cached.officialDescription ||
    company.description;
  const siteName = metaContent(html, "property", "og:site_name") || cached.siteName || company.name;
  const logoCandidate =
    absoluteUrl(jsonLdLogo(html), base) ||
    absoluteUrl(linkHref(html, "apple-touch-icon"), base) ||
    absoluteUrl(linkHref(html, "icon"), base) ||
    absoluteUrl(metaContent(html, "property", "og:image"), base) ||
    cached.logoSource ||
    company.logoSource ||
    "";
  const logoPath = shouldFetch
    ? (await downloadLogo(company.slug, logoCandidate)) || cached.logoPath || company.logoPath || ""
    : cached.logoPath || company.logoPath || "";

  const next = {
    name: company.name,
    slug: company.slug,
    sourceUrl: company.url,
    officialTitle: title || cached.officialTitle || company.name,
    siteName,
    officialDescription,
    logoSource: logoCandidate,
    logoPath,
    researchedAt: new Date().toISOString().slice(0, 10)
  };
  cache[company.slug] = next;
  return next;
}

function sentence(value, fallback) {
  const text = decodeEntities(stripTags(value || fallback || ""));
  const first = text.split(/(?<=[.!?])\s+/)[0];
  return first || fallback || "";
}

function getAlternatives(company, categories, companyProfiles) {
  const category = categories.find((item) => item.categoryDir === company.categoryDir);
  const alternatives = (category?.vendors || [])
    .filter((item) => slugify(item.name) !== company.slug)
    .slice(0, 5)
    .map((item) => {
      const slug = slugify(item.name);
      return {
        name: item.name,
        slug,
        href: companyProfiles.has(slug) ? `/fluidrwa/${slug}` : `/vendors/${categorySlugMap[item.categoryDir] || item.categoryDir}#${slug}`,
        description: sentence(item.description, item.additionalType)
      };
    });
  return alternatives;
}

function pageHtml(company, profile, alternatives) {
  const canonical = `${siteUrl}/fluidrwa/${company.slug}`;
  const categoryPath = `/vendors/${company.categoryRoute}`;
  const logo = profile.logoPath || "/assets/fluidrwa-favicon.png";
  const officialDescription = company.slug === "minddeft-technologies"
    ? decodeEntities(stripTags(profile.officialDescription || company.description))
    : sentence(profile.officialDescription, company.description);
  const sourceSummary = officialDescription;
  const category = company.categoryTitle;
  const introHref = `/submit-requirement?vendor=${encodeURIComponent(company.name)}&category=${encodeURIComponent(category)}&source=company-profile`;
  const knowsAbout = Array.isArray(company.knowsAbout) ? company.knowsAbout.slice(0, 10) : [];
  const offers = [
    { title: "Primary Category", text: `${company.name} is listed by FluidRWA under ${category}.` },
    { title: "What They Offer", text: sourceSummary },
    { title: "Best-Fit Use Case", text: company.additionalType ? `${company.additionalType} for teams evaluating ${knowsAbout.slice(0, 4).join(", ") || category}.` : company.description },
    { title: "Due Diligence Notes", text: "Use FluidRWA to shortlist providers, then verify commercial terms, jurisdictions, integrations and compliance responsibilities directly with the company." }
  ];
  const faqs = [
    {
      q: `What does ${company.name} do?`,
      a: `${sourceSummary} FluidRWA also classifies the company under ${category} for buyer discovery.`
    },
    {
      q: `Which FluidRWA category includes ${company.name}?`,
      a: `${company.name} is included in the ${category} directory on FluidRWA.`
    },
    {
      q: `Who should consider ${company.name}?`,
      a: `Teams should consider ${company.name} when they need ${company.additionalType || category} capabilities and want to compare it against relevant providers in the same category.`
    },
    {
      q: `What are alternatives to ${company.name}?`,
      a: `Relevant alternatives include ${alternatives.slice(0, 4).map((item) => item.name).join(", ") || "other providers in the same FluidRWA category"}.`
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: `${company.name} Vendor Profile | FluidRWA`,
        description: `FluidRWA profile for ${company.name}: what the company offers, category fit, alternatives and FAQs for digital asset and Web3 vendor discovery.`,
        isPartOf: { "@type": "WebSite", name: "FluidRWA", url: `${siteUrl}/` },
        about: { "@id": `${canonical}#organization` },
        inLanguage: "en"
      },
      {
        "@type": "Organization",
        "@id": `${canonical}#organization`,
        name: company.name,
        url: profile.sourceUrl,
        logo: logo.startsWith("http") ? logo : `${siteUrl}${logo}`,
        description: officialDescription,
        knowsAbout
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Vendor Ecosystem", item: `${siteUrl}/web3vendorecosystem` },
          { "@type": "ListItem", position: 3, name: category, item: `${siteUrl}${categoryPath}` },
          { "@type": "ListItem", position: 4, name: company.name, item: canonical }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${canonical}#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a }
        }))
      }
    ]
  };

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(company.name)} Vendor Profile | FluidRWA</title>
  <meta name="description" content="${esc(`${company.name} profile on FluidRWA: what they offer, official website summary, category fit, alternatives and FAQs for Web3 vendor discovery.`)}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="profile">
  <meta property="og:site_name" content="FluidRWA">
  <meta property="og:title" content="${esc(company.name)} Vendor Profile | FluidRWA">
  <meta property="og:description" content="${esc(officialDescription)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${siteUrl}/assets/social/fluidrwa-preview.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body class="home-page light-home company-profile-page">
  <main id="main">
    <style>
      .company-page{background:#fbf7e8;color:#10192e;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;min-height:100vh}
      .company-container{width:min(1120px,calc(100% - 40px));margin:0 auto}
      .company-hero{padding:92px 0 58px;background:radial-gradient(circle at 78% 8%,rgba(112,218,236,.35),transparent 32%),linear-gradient(135deg,#fff8cf 0%,#f6fbff 100%);border-bottom:1px solid rgba(20,42,75,.1)}
      .company-kicker{color:#2e67ad;font-weight:900;text-transform:uppercase;letter-spacing:.18em;font-size:.78rem;margin:0 0 16px}
      .company-hero-grid{display:grid;grid-template-columns:1.1fr .72fr;gap:44px;align-items:center}
      .company-logo-card{background:rgba(255,255,255,.7);border:1px solid rgba(43,77,110,.16);border-radius:28px;padding:34px;box-shadow:0 24px 70px rgba(42,55,73,.12);backdrop-filter:blur(18px)}
      .company-logo-card img{display:block;max-width:190px;max-height:84px;object-fit:contain;margin-bottom:22px}
      .company-hero h1{font-family:Georgia,"Times New Roman",serif;font-size:clamp(2.65rem,6vw,5.7rem);line-height:.93;letter-spacing:-.025em;margin:0 0 24px}
      .company-lede{font-size:clamp(1.05rem,2vw,1.34rem);line-height:1.72;color:#4d5a70;max-width:760px;margin:0}
      .company-actions{display:flex;gap:14px;flex-wrap:wrap;margin-top:28px}
      .company-btn{display:inline-flex;align-items:center;justify-content:center;border-radius:16px;padding:14px 20px;font-weight:900;text-decoration:none}
      .company-btn.primary{background:#2e67ad;color:white}
      .company-btn.soft{background:#ffe57a;color:#10192e;border:1px solid rgba(16,25,46,.12)}
      .company-source{font-size:.9rem;color:#637188;line-height:1.55;margin-top:18px}
      .company-section{padding:64px 0}
      .company-section h2{font-family:Georgia,"Times New Roman",serif;font-size:clamp(2rem,4vw,3.55rem);line-height:1.02;margin:0 0 18px}
      .company-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:28px}
      .company-card,.company-alt,.company-faq{background:rgba(255,255,255,.72);border:1px solid rgba(43,77,110,.13);border-radius:22px;padding:24px;box-shadow:0 20px 50px rgba(42,55,73,.08)}
      .company-card h3,.company-alt h3{margin:0 0 10px;font-size:1.08rem}
      .company-card p,.company-alt p,.company-faq p{margin:0;color:#5b677a;line-height:1.65}
      .company-tags{display:flex;flex-wrap:wrap;gap:10px;margin-top:22px}
      .company-tags span{border-radius:999px;background:#fff2a6;border:1px solid rgba(16,25,46,.08);color:#244e86;font-weight:850;padding:9px 12px;font-size:.86rem}
      .company-alt-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:28px}
      .company-alt a{color:#2e67ad;font-weight:900;text-decoration:none}
      .company-faq-list{display:grid;gap:14px;margin-top:26px}
      .company-faq h3{margin:0 0 8px;font-size:1.05rem}
      @media (max-width:900px){.company-hero-grid,.company-grid,.company-alt-grid{grid-template-columns:1fr}.company-hero{padding:56px 0 38px}.company-container{width:min(100% - 28px,1120px)}.company-logo-card{padding:24px}.company-actions{flex-direction:column}.company-btn{width:100%}}
    </style>
    <article class="company-page">
      <section class="company-hero">
        <div class="company-container company-hero-grid">
          <div>
            <p class="company-kicker">FluidRWA company profile</p>
            <h1>${esc(company.name)} Vendor Profile</h1>
            <p class="company-lede">FluidRWA profile for ${esc(company.name)}, including what the company says it offers, where it fits in the digital asset infrastructure ecosystem, similar providers and buyer FAQs.</p>
            <div class="company-actions">
              <a class="company-btn primary" href="${esc(introHref)}">Contact ${esc(company.name)}</a>
              <a class="company-btn soft" href="/submit-requirement">Submit Requirements</a>
              <a class="company-btn soft" href="${categoryPath}">View Category</a>
            </div>
          </div>
          <aside class="company-logo-card">
            <img src="${esc(logo)}" alt="${esc(company.name)} logo" loading="eager">
            <p class="company-kicker">${esc(category)}</p>
            <p class="company-source">Official source used: ${esc(profile.siteName || profile.sourceUrl)}. FluidRWA summarizes public vendor information for discovery and comparison.</p>
          </aside>
        </div>
      </section>
      <section class="company-section">
        <div class="company-container">
          <p class="company-kicker">What they offer</p>
          <h2>What ${esc(company.name)} says it does</h2>
          <p class="company-lede">${esc(sourceSummary)}</p>
          <div class="company-grid">${offers.map((item) => `<article class="company-card"><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p></article>`).join("")}</div>
          <div class="company-tags">${knowsAbout.map((tag) => `<span>${esc(tag)}</span>`).join("")}</div>
        </div>
      </section>
      <section class="company-section" id="alternatives">
        <div class="company-container">
          <p class="company-kicker">Alternatives</p>
          <h2>Alternatives to ${esc(company.name)}</h2>
          <p class="company-lede">Use these alternatives as a starting point when comparing vendors in the same FluidRWA category.</p>
          <div class="company-alt-grid">${alternatives.slice(0, 6).map((alt) => `<article class="company-alt"><h3>${esc(alt.name)}</h3><p>${esc(alt.description)}</p><p><a href="${esc(alt.href)}">Compare ${esc(alt.name)}</a></p></article>`).join("")}</div>
        </div>
      </section>
      <section class="company-section">
        <div class="company-container">
          <p class="company-kicker">FAQs</p>
          <h2>${esc(company.name)} FAQs</h2>
          <div class="company-faq-list">${faqs.map((faq) => `<article class="company-faq"><h3>${esc(faq.q)}</h3><p>${esc(faq.a)}</p></article>`).join("")}</div>
        </div>
      </section>
    </article>
  </main>
</body>
</html>`;
}

function patchCategoryCards(companies) {
  for (const company of companies) {
    const htmlPath = path.join(vendorsDir, company.categoryDir, "index.html");
    if (!fs.existsSync(htmlPath)) continue;
    let html = fs.readFileSync(htmlPath, "utf8");
    if (html.includes(`/fluidrwa/${company.slug}`)) continue;
    const articleRe = new RegExp(`(<article[^>]+id=["']${company.anchor || company.slug}["'][\\s\\S]*?)(<a class=["'](?:bc-visit|bc-provider-link)["'][^>]+>)`, "i");
    html = html.replace(articleRe, `$1<a class="bc-profile-link" href="/fluidrwa/${company.slug}">View Company Profile</a>$2`);
    fs.writeFileSync(htmlPath, html);
  }
}

function buildVendorSearchIndex(categories, companyProfiles) {
  const seen = new Set();
  const index = [];

  for (const category of categories) {
    for (const vendor of category.vendors) {
      const slug = slugify(vendor.name);
      const key = `${category.categoryDir}:${slug}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const profile = companyProfiles.get(slug);
      index.push({
        name: vendor.name,
        category: vendor.categoryTitle,
        href: profile ? `/fluidrwa/${slug}` : `/vendors/${categorySlugMap[vendor.categoryDir] || vendor.categoryDir}#${vendor.anchor || slug}`,
        description: sentence(vendor.description, vendor.additionalType),
        keywords: [
          vendor.name,
          vendor.additionalType,
          vendor.description,
          vendor.categoryTitle,
          vendor.categoryDir,
          vendor.url,
          ...(Array.isArray(vendor.knowsAbout) ? vendor.knowsAbout : [])
        ].filter(Boolean).join(" ")
      });
    }
  }

  return index.sort((a, b) => a.name.localeCompare(b.name));
}

function patchVendorEcosystemProfileIndex(companies, categories, companyProfiles) {
  const ecosystemPath = path.join(root, "vendor-ecosystem.html");
  if (!fs.existsSync(ecosystemPath)) return;
  let html = fs.readFileSync(ecosystemPath, "utf8");
  const start = "<!-- FLUIDRWA_COMPANY_PROFILE_INDEX_START -->";
  const end = "<!-- FLUIDRWA_COMPANY_PROFILE_INDEX_END -->";
  const grouped = new Map();
  for (const company of companies) {
    if (!grouped.has(company.categoryTitle)) grouped.set(company.categoryTitle, []);
    grouped.get(company.categoryTitle).push(company);
  }
  const searchIndex = buildVendorSearchIndex(categories, companyProfiles);
  const indexHtml = `${start}
    <script id="vendor-search-index-data" type="application/json">${esc(JSON.stringify(searchIndex))}</script>
    <section class="vendor-profile-index" aria-labelledby="company-profile-index-title">
      <div class="light-container">
        <div class="solutions-section-head">
          <p class="eyebrow light-eyebrow">Company profiles</p>
          <h2 id="company-profile-index-title">Explore crawlable vendor profile pages</h2>
          <p>Use these profile pages to compare official website summaries, category fit, alternatives and FAQs for selected companies across the FluidRWA ecosystem.</p>
        </div>
        <div class="vendor-profile-index-grid">
          ${[...grouped.entries()].map(([category, items]) => `<article class="vendor-profile-index-card">
            <h3>${esc(category)}</h3>
            <div>${items.map((item) => `<a href="/fluidrwa/${item.slug}">${esc(item.name)}</a>`).join("")}</div>
          </article>`).join("")}
        </div>
      </div>
    </section>
${end}`;
  if (html.includes(start) && html.includes(end)) {
    html = html.replace(new RegExp(`${start}[\\s\\S]*?${end}`), indexHtml);
  } else {
    html = html.replace("</main>", `${indexHtml}\n  </main>`);
  }
  fs.writeFileSync(ecosystemPath, html);
}

async function main() {
  fs.mkdirSync(fluidrwaDir, { recursive: true });
  const cache = readJsonCache();
  const { companies, categories } = collectCompanies();
  const companyProfiles = new Map(companies.map((company) => [company.slug, company]));

  for (const company of companies) {
    const profile = await researchCompany(company, cache);
    const alternatives = getAlternatives(company, categories, companyProfiles);
    const outputDir = path.join(fluidrwaDir, company.slug);
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(path.join(outputDir, "index.html"), pageHtml(company, profile, alternatives));
  }

  patchCategoryCards(companies);
  patchVendorEcosystemProfileIndex(companies, categories, companyProfiles);
  writeJsonCache(cache);
  console.log(`Generated ${companies.length} FluidRWA company profile pages.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
