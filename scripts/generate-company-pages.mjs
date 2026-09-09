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
  "verifiable-ai-smart-contract-infrastructure": "verifiable-ai-smart-contract-infrastructure",
  "node-as-a-service-rpc": "node-as-a-service-rpc-providers"
};

const priorityCompanySlugs = new Set(["zoniqx", "minddeft-technologies", "surestack", "chainstack", "nowpayments"]);

const manualCompanyProfiles = [
  {
    position: 1,
    categoryDir: "payments-stablecoins",
    categoryRoute: "stablecoin-infrastructure-providers",
    categoryTitle: "Stablecoin Infrastructure Providers",
    anchor: "nowpayments",
    name: "NOWPayments",
    slug: "nowpayments",
    url: "https://nowpayments.io/",
    description:
      "NOWPayments is a crypto business ecosystem for accepting digital asset payments, automating mass payouts, converting assets and managing stablecoin treasury operations through unified infrastructure.",
    fullDescription:
      "NOWPayments is a crypto business ecosystem for companies that need to accept digital asset payments, automate mass payouts, manage stablecoin treasury operations and scale globally through unified infrastructure. The platform supports 350+ cryptocurrencies and 30+ stablecoins alongside flexible settlement options and enterprise-grade APIs. It brings payments, payouts, conversions, custody balances, wallets and treasury workflows together within one ecosystem. NOWPayments also provides payment tools, plugins, email-based payouts, enterprise automation and 24/7 operational support.",
    foundingDate: "2019",
    address: { "@type": "PostalAddress", addressCountry: "Global" },
    knowsAbout: [
      "Crypto Payments",
      "Stablecoin Payments",
      "Payment API",
      "Mass Payouts",
      "Treasury Management",
      "Asset Conversion",
      "Payment Plugins"
    ],
    additionalType: "Crypto Payment Gateway and Stablecoin Payment Infrastructure",
    logoPath: "/assets/company-logos/nowpayments.png",
    logoSource: "/assets/company-logos/nowpayments.png",
    benefits: [
      ["Complete crypto business ecosystem", "Accept payments, manage funds, convert assets and send payouts from one platform."],
      ["350+ cryptocurrencies and 30+ stablecoins", "Reach customers and partners across leading digital assets and blockchain networks."],
      ["Flexible settlement", "Accept one asset and automatically convert or settle in another supported asset."],
      ["Cost-efficient mass payouts", "Send payouts through API, CSV or dashboard with a stated 0% NOWPayments service fee."],
      ["Email-based payouts", "Send ChangeNOW PRO payouts using an email address without requiring a wallet address from the recipient."],
      ["Fast integration and 24/7 support", "Launch through APIs or ready-made payment tools with ongoing operational assistance."]
    ],
    productLinks: [
      ["Main website", "https://nowpayments.io/"],
      ["Stablecoin payments", "https://nowpayments.io/currencies/stablecoin-payments"],
      ["Supported cryptocurrencies", "https://nowpayments.io/supported-coins"],
      ["Payment API", "https://nowpayments.io/api"],
      ["Mass payouts", "https://nowpayments.io/mass-payments"],
      ["Mass Payouts API", "https://nowpayments.io/api/mass-payments"]
    ],
    externalProfiles: [
      ["G2 profile and reviews", "https://www.g2.com/products/nowpayments/reviews"],
      ["Trustpilot reviews", "https://www.trustpilot.com/review/nowpayments.io"],
      ["Forbes cryptocurrency payment gateway guide", "https://www.forbes.com/advisor/business/software/best-cryptocurrency-payment-gateway/"]
    ],
    alternatives: [
      ["Circle (USDC)", "/vendors/stablecoin-infrastructure-providers#circle-usdc", "Regulated stablecoin issuance and programmable USDC infrastructure."],
      ["Bridge (Stripe)", "/vendors/stablecoin-infrastructure-providers#bridge-stripe", "Stablecoin orchestration for fiat conversion, transfers and settlement."],
      ["BVNK", "/vendors/stablecoin-infrastructure-providers#bvnk", "Business stablecoin payments, cross-border settlement and treasury infrastructure."],
      ["Coinflow", "/vendors/stablecoin-infrastructure-providers#coinflow", "Payment acceptance, settlement and payout infrastructure for digital assets."],
      ["Zero Hash", "/vendors/stablecoin-infrastructure-providers#zero-hash", "Embedded crypto and stablecoin infrastructure for fintech and enterprise products."]
    ],
    partnershipEmail: "partners@nowpayments.io"
  },
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
    const rawTitle = extracted?.parsed["@graph"]?.find((item) => item?.["@type"] === "CollectionPage")?.name || "Identity Solutions Vendors | FluidRWA";
    const title = categoryDir === "node-as-a-service-rpc"
      ? "Node-as-a-Service and RPC Providers | FluidRWA"
      : rawTitle;
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
  if (company.alternatives?.length) {
    return company.alternatives.map(([name, href, description]) => ({ name, href, description }));
  }
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
  const officialDescription = company.fullDescription
    ? decodeEntities(stripTags(company.fullDescription))
    : company.slug === "minddeft-technologies"
      ? decodeEntities(stripTags(profile.officialDescription || company.description))
      : sentence(profile.officialDescription, company.description);
  const sourceSummary = officialDescription;
  const category = company.categoryTitle;
  const introHref = `/submit-requirement?vendor=${encodeURIComponent(company.name)}&category=${encodeURIComponent(category)}&source=company-profile`;
  const knowsAbout = Array.isArray(company.knowsAbout) ? company.knowsAbout.slice(0, 10) : [];
  const isWeb3Profile = !company.categoryDir.startsWith("ai-");
  const coverage = typeof company.address === "object" && company.address?.addressCountry
    ? company.address.addressCountry
    : "Verify with provider";
  const offers = company.benefits?.length ? company.benefits.map(([title, text]) => ({ title, text })) : [
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
      .company-page{background:#f8fafc;color:#10192e;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;min-height:100vh}
      .company-container{width:min(1160px,calc(100% - 40px));margin:0 auto}
      .company-hero{padding:104px 0 64px;background:linear-gradient(135deg,#fff9dc 0%,#f7fbff 52%,#eaf7fb 100%);border-bottom:1px solid #dce6ef}
      .company-breadcrumb{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 34px;color:#607086;font-size:.8rem;font-weight:750}
      .company-breadcrumb a{color:#2e67ad;text-decoration:none}.company-breadcrumb span{color:#8a96a7}
      .company-kicker{color:#2e67ad;font-weight:900;text-transform:uppercase;letter-spacing:.12em;font-size:.74rem;margin:0 0 14px}
      .company-status{display:inline-flex;align-items:center;gap:8px;width:fit-content;margin:0 0 18px;padding:7px 10px;border:1px solid #bed5e9;border-radius:999px;background:#f1f8ff;color:#155fa7;font-size:.7rem;font-weight:900;text-transform:uppercase;letter-spacing:.06em}
      .company-status::before{content:"";width:7px;height:7px;border-radius:50%;background:#2e67ad;box-shadow:0 0 0 3px rgba(46,103,173,.12)}
      .company-hero-grid{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(320px,.68fr);gap:64px;align-items:center}
      .company-logo-card{background:rgba(255,255,255,.92);border:1px solid #d6e1eb;border-radius:8px;padding:32px;box-shadow:0 20px 54px rgba(18,33,58,.1)}
      .company-logo-wrap{display:grid;place-items:center;min-height:112px;padding:18px;border-bottom:1px solid #e2e9f0}
      .company-logo-card img{display:block;max-width:250px;max-height:82px;object-fit:contain;margin:0}
      .company-hero h1{max-width:840px;font-family:Georgia,"Times New Roman",serif;font-size:clamp(2.7rem,5.2vw,4.8rem);line-height:1;letter-spacing:0;margin:0 0 22px;overflow-wrap:anywhere}
      .company-title-tail{display:block;color:#2e67ad;font-size:.72em;margin-top:6px}
      .company-lede{font-size:clamp(1.02rem,1.7vw,1.24rem);line-height:1.68;color:#4d5a70;max-width:780px;margin:0}
      .company-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}
      .company-btn{display:inline-flex;align-items:center;justify-content:center;min-height:50px;border-radius:8px;padding:13px 19px;font-weight:850;line-height:1.3;text-align:center;text-decoration:none}
      .company-btn.primary{background:#2e67ad;color:#fff;box-shadow:0 12px 24px rgba(46,103,173,.16)}
      .company-btn.soft{background:#fff;color:#1e5f9f;border:1px solid #bfd4e8}
      .company-facts{display:grid;gap:0;margin:22px 0 0}.company-facts div{display:grid;grid-template-columns:92px 1fr;gap:14px;padding:14px 0;border-bottom:1px solid #e2e9f0}.company-facts div:last-child{border-bottom:0;padding-bottom:0}.company-facts dt{color:#67768a;font-size:.7rem;font-weight:900;text-transform:uppercase;letter-spacing:.08em}.company-facts dd{margin:0;color:#142640;font-weight:750;line-height:1.45;overflow-wrap:anywhere}
      .company-source{font-size:.82rem;color:#637188;line-height:1.55;margin:18px 0 0}
      .company-section{padding:72px 0;border-bottom:1px solid #e3e9ef}.company-section:nth-of-type(odd){background:#fff}
      .company-section-head{display:grid;grid-template-columns:minmax(240px,.65fr) minmax(0,1fr);gap:56px;align-items:end;margin-bottom:30px}
      .company-section h2{max-width:850px;font-family:Georgia,"Times New Roman",serif;font-size:clamp(2rem,3.7vw,3.2rem);line-height:1.08;letter-spacing:0;margin:0}
      .company-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:28px}
      .company-card,.company-alt,.company-faq{background:#fff;border:1px solid #dbe4ec;border-radius:8px;padding:24px;box-shadow:0 12px 32px rgba(18,33,58,.055)}
      .company-card{position:relative;padding-top:50px}.company-card::before{content:"Capability";position:absolute;top:20px;left:24px;color:#2e67ad;font-size:.65rem;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
      .company-card h3,.company-alt h3{margin:0 0 10px;font-size:1.08rem;line-height:1.28}
      .company-card p,.company-alt p,.company-faq p{margin:0;color:#5b677a;line-height:1.65}
      .company-tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:22px}
      .company-tags span{border-radius:999px;background:#f3f8fd;border:1px solid #d4e2ee;color:#244e86;font-weight:800;padding:8px 11px;font-size:.78rem}
      .company-evaluation{padding:54px 0;background:#102641;color:#fff}.company-evaluation-grid{display:grid;grid-template-columns:minmax(250px,.72fr) minmax(0,1fr);gap:56px;align-items:start}.company-evaluation h2{margin:0;font-family:Georgia,"Times New Roman",serif;font-size:clamp(2rem,3.4vw,3rem);line-height:1.08}.company-evaluation-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.18)}.company-evaluation-list div{padding:22px;background:#102641}.company-evaluation-list strong{display:block;margin-bottom:9px;color:#8dd8ef;font-size:.72rem;text-transform:uppercase;letter-spacing:.08em}.company-evaluation-list span{color:#e2ebf4;font-size:.92rem;line-height:1.55}
      .company-alt-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:28px}
      .company-alt{display:flex;min-height:180px;flex-direction:column}.company-alt a{display:inline-flex;margin-top:auto;padding-top:18px;color:#2e67ad;font-weight:850;text-decoration:none}
      .company-faq-list{display:grid;gap:10px;max-width:940px;margin-top:26px}
      .company-faq{padding:0;overflow:hidden}.company-faq summary{padding:20px 56px 20px 22px;color:#142640;font-weight:850;line-height:1.4;cursor:pointer;list-style:none;position:relative}.company-faq summary::-webkit-details-marker{display:none}.company-faq summary::after{content:"+";position:absolute;top:50%;right:22px;transform:translateY(-50%);color:#2e67ad;font-size:1.35rem}.company-faq[open] summary::after{content:"-"}.company-faq p{padding:0 22px 22px}
      .company-link-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:24px}
      .company-resource{display:flex;align-items:center;justify-content:space-between;gap:14px;background:#fff;border:1px solid #dbe4ec;border-radius:8px;padding:17px 18px;color:#2e67ad;font-weight:850;text-decoration:none;box-shadow:0 10px 26px rgba(18,33,58,.05)}
      .company-resource::after{content:"Open";color:#6d7b8d;font-size:.68rem;text-transform:uppercase;letter-spacing:.06em}
      .company-contact{margin-top:22px;padding:18px 20px;border-radius:8px;background:#12213a;color:#fff}.company-contact a{color:#9edcf0;font-weight:850}
      .company-conversion{padding:52px 0;background:#edf6fc;border-bottom:1px solid #d8e5ef}.company-conversion-inner{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:32px;align-items:center}.company-conversion h2{margin:0 0 8px;font-family:Georgia,"Times New Roman",serif;font-size:clamp(1.8rem,3vw,2.6rem);line-height:1.12}.company-conversion p{margin:0;color:#56677d;line-height:1.6}.company-conversion .company-actions{margin-top:0}
      @media (max-width:960px){.company-hero-grid,.company-section-head,.company-evaluation-grid,.company-conversion-inner{grid-template-columns:1fr}.company-grid,.company-alt-grid,.company-link-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.company-evaluation-list{grid-template-columns:1fr}.company-hero{padding:72px 0 50px}.company-conversion .company-actions{margin-top:4px}}
      @media (max-width:640px){.company-container{width:min(100% - 28px,1160px)}.company-hero{padding:58px 0 38px}.company-breadcrumb{margin-bottom:26px}.company-hero-grid{gap:30px}.company-hero h1{font-size:clamp(2.3rem,12vw,3.15rem)}.company-logo-card{padding:22px}.company-actions{display:grid;grid-template-columns:1fr}.company-btn{width:100%}.company-section{padding:48px 0}.company-section-head{gap:14px;margin-bottom:24px}.company-grid,.company-alt-grid,.company-link-grid{grid-template-columns:1fr}.company-evaluation{padding:44px 0}.company-facts div{grid-template-columns:1fr;gap:4px}.company-alt{min-height:0}.company-conversion{padding:42px 0}}
    </style>
    <article class="company-page">
      <section class="company-hero">
        <div class="company-container">
          <nav class="company-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="${categoryPath}">${esc(category)}</a><span>/</span><span aria-current="page">${esc(company.name)}</span></nav>
        </div>
        <div class="company-container company-hero-grid">
          <div>
            <p class="company-kicker">FluidRWA vendor intelligence</p>
            ${isWeb3Profile ? '<span class="company-status">Vetted directory listing</span>' : '<span class="company-status">Directory profile</span>'}
            <h1>${esc(company.name)}<span class="company-title-tail">Vendor Profile</span></h1>
            <p class="company-lede">FluidRWA profile for ${esc(company.name)}, including what the company says it offers, where it fits in the digital asset infrastructure ecosystem, similar providers and buyer FAQs.</p>
            <div class="company-actions">
              <a class="company-btn primary" href="${esc(introHref)}">Contact ${esc(company.name)}</a>
              <a class="company-btn soft" href="/submit-requirement">Submit Requirements</a>
              <a class="company-btn soft" href="${categoryPath}">View Category</a>
            </div>
          </div>
          <aside class="company-logo-card">
            <div class="company-logo-wrap"><img src="${esc(logo)}" alt="${esc(company.name)} logo" loading="eager"></div>
            <dl class="company-facts"><div><dt>Category</dt><dd>${esc(category)}</dd></div><div><dt>Coverage</dt><dd>${esc(coverage)}</dd></div><div><dt>Profile type</dt><dd>${isWeb3Profile ? "Vetted directory listing" : "FluidRWA directory research"}</dd></div></dl>
            <p class="company-source">Official source used: ${esc(profile.siteName || profile.sourceUrl)}. FluidRWA summarizes public vendor information for discovery and comparison.</p>
          </aside>
        </div>
      </section>
      <section class="company-section">
        <div class="company-container">
          <div class="company-section-head"><div><p class="company-kicker">Capability brief</p><h2>What ${esc(company.name)} says it does</h2></div><p class="company-lede">${esc(sourceSummary)}</p></div>
          <div class="company-grid">${offers.map((item) => `<article class="company-card"><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p></article>`).join("")}</div>
          <div class="company-tags">${knowsAbout.map((tag) => `<span>${esc(tag)}</span>`).join("")}</div>
        </div>
      </section>
      <section class="company-evaluation" aria-labelledby="evaluation-title"><div class="company-container company-evaluation-grid"><div><p class="company-kicker">Buyer diligence</p><h2 id="evaluation-title">What to validate before selection</h2></div><div class="company-evaluation-list"><div><strong>01 / Regulatory fit</strong><span>Confirm jurisdictions, licensing boundaries and where your organization retains responsibility.</span></div><div><strong>02 / Technical fit</strong><span>Test required chains, APIs, data flows, security controls and integration ownership.</span></div><div><strong>03 / Commercial fit</strong><span>Validate implementation scope, support model, production pricing and exit terms.</span></div></div></div></section>
      <section class="company-section" id="alternatives">
        <div class="company-container">
          <div class="company-section-head"><div><p class="company-kicker">Shortlist context</p><h2>Alternatives to ${esc(company.name)}</h2></div><p class="company-lede">Use these alternatives as a starting point when comparing vendors in the same FluidRWA category.</p></div>
          <div class="company-alt-grid">${alternatives.slice(0, 6).map((alt) => `<article class="company-alt"><h3>${esc(alt.name)}</h3><p>${esc(alt.description)}</p><p><a href="${esc(alt.href)}">Compare ${esc(alt.name)}</a></p></article>`).join("")}</div>
        </div>
      </section>
      ${company.productLinks?.length ? `<section class="company-section"><div class="company-container"><div class="company-section-head"><div><p class="company-kicker">Official product resources</p><h2>Explore ${esc(company.name)} products</h2></div><p class="company-lede">Use these official sources to verify current product coverage, supported assets and integration options.</p></div><div class="company-link-grid">${company.productLinks.map(([label, href]) => `<a class="company-resource" href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`).join("")}</div></div></section>` : ""}
      ${company.externalProfiles?.length ? `<section class="company-section"><div class="company-container"><div class="company-section-head"><div><p class="company-kicker">Evidence context</p><h2>Reviews and recognition</h2></div><p class="company-lede">Independent sources add context, but buyers should verify current pricing, terms, geographic availability and compliance responsibilities directly.</p></div><div class="company-link-grid">${company.externalProfiles.map(([label, href]) => `<a class="company-resource" href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`).join("")}</div>${company.partnershipEmail ? `<p class="company-contact">Partnership contact: <a href="mailto:${esc(company.partnershipEmail)}">${esc(company.partnershipEmail)}</a></p>` : ""}</div></section>` : ""}
      <section class="company-conversion"><div class="company-container company-conversion-inner"><div><p class="company-kicker">Build a defensible shortlist</p><h2>Compare the provider against your actual requirements</h2><p>Share your scope, jurisdiction, timeline and technical constraints so the next step starts with useful context.</p></div><div class="company-actions"><a class="company-btn primary" href="${esc(introHref)}">Request an introduction</a><a class="company-btn soft" href="/submit-requirement">Submit project brief</a></div></div></section>
      <section class="company-section">
        <div class="company-container">
          <p class="company-kicker">FAQs</p>
          <h2>${esc(company.name)} FAQs</h2>
          <div class="company-faq-list">${faqs.map((faq) => `<details class="company-faq"><summary>${esc(faq.q)}</summary><p>${esc(faq.a)}</p></details>`).join("")}</div>
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
    const headEnd = html.indexOf("</head>");
    const head = headEnd >= 0 ? html.slice(0, headEnd + 7) : "";
    let body = headEnd >= 0 ? html.slice(headEnd + 7) : html;
    if (company.slug === "nowpayments") {
      body = body.replace(
        '<a class="bc-visit" href="https://nowpayments.io/" target="_blank" rel="noopener noreferrer">Visit Website</a>',
        ""
      );
      html = `${head}${body}`;
      fs.writeFileSync(htmlPath, html);
    }
    if (body.includes(`/fluidrwa/${company.slug}`)) continue;
    const articleRe = new RegExp(`(<article[^>]+id=["']${company.anchor || company.slug}["'][\\s\\S]*?)(<a class=["'](?:bc-visit|bc-provider-link)["'][^>]+>)`, "i");
    body = body.replace(articleRe, `$1<a class="bc-profile-link" href="/fluidrwa/${company.slug}">View Company Profile</a>$2`);
    html = `${head}${body}`;
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
