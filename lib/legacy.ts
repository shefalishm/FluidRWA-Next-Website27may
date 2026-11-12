import fs from "./contentFs";
import path from "node:path";
import type { Metadata } from "next";
import { fileForRoute, siteUrl } from "./routes";
import { legacyVendorFallbackHtml, legacyVendorFallbackJsonLd } from "./vendorFallbacks";

const root = process.cwd();
const defaultSocialImage = `${siteUrl}/assets/social/fluidrwa-preview.jpg`;
const serviceScopeCorrections: Record<string, { description: string; fit: string; tags: string[] }> = {
  Coinbound: { description: "Coinbound lists influencer marketing, PR, SEO, paid media, community management and advisory services. Confirm the channels, deliverables and approval responsibilities in the proposal.", fit: "Teams comparing agency-led creator, media and owned-channel campaigns", tags: ["Influencer marketing", "PR", "SEO", "Paid media", "Community"] },
  "Lunar Strategy": { description: "Lunar Strategy lists go-to-market strategy, social media, community, influencer and PR services. Confirm the delivery team, channel scope and reporting definitions for your campaign.", fit: "Teams comparing launch positioning and ongoing ecosystem campaigns", tags: ["GTM", "Social media", "Community", "Influencers", "PR"] },
  Serotonin: { description: "Serotonin describes go-to-market work across marketing, strategy, public relations, content, social and design. Ask which services and delivery staff are included in the engagement.", fit: "Teams evaluating positioning, communications and marketing execution", tags: ["Strategy", "PR", "Content", "Social", "Design"] },
  Alchemy: { description: "Alchemy provides blockchain APIs and developer infrastructure. Confirm the network, RPC methods, historical reads and account throughput needed by your application.", fit: "Engineering teams evaluating managed blockchain APIs", tags: ["RPC", "APIs", "Developer tools"] },
  QuickNode: { description: "QuickNode provides managed RPC and blockchain data products. Confirm network-specific archive coverage, method limits and any separately contracted event pipelines.", fit: "Engineering teams evaluating RPC and data delivery", tags: ["RPC", "Data", "WebSockets"] }
};
const tokenizationScopeCorrections: Record<string, { role: string; fit: string; description: string; boundary: string; tags: string[]; source: string }> = {
  Zoniqx: {
    role: "Full-Stack Tokenization Infrastructure",
    fit: "Issuers evaluating connected issuance, ownership records and lifecycle workflows",
    description: "Zoniqx describes z360 for issuance configuration, ownership records, transfer logic and lifecycle operations, and zConnect for discovery and distribution workflows.",
    boundary: "Confirm the selected modules, deployment networks, investor eligibility and distribution responsibilities for your offering. Product scope does not establish intermediary permissions or guaranteed liquidity.",
    tags: ["z360", "zConnect", "Lifecycle records", "Issuer infrastructure"],
    source: "https://www.zoniqx.com/solutions"
  },
  Securitize: {
    role: "Issuance and Shareholder Records",
    fit: "Fund and asset issuers evaluating issuance and shareholder-record workflows",
    description: "Securitize describes institutional tokenization with configured transfer restrictions and shareholder-register workflows. Confirm which contracting entity provides each issuance, administration and distribution service.",
    boundary: "A software workflow or group brand is not blanket regulatory approval. Request the service agreement, responsible entity and asset, investor and jurisdiction restrictions before shortlisting.",
    tags: ["Issuance", "Shareholder records", "Transfer restrictions", "Funds"],
    source: "https://securitize.io/institutional-tokenization"
  },
  Tokeny: {
    role: "Permissioned Token Software",
    fit: "Issuers evaluating ERC-3643 identity and permissioned-transfer workflows",
    description: "Tokeny provides software for permissioned tokens and investor onboarding workflows. Its documentation states that Tokeny does not act as the KYC agent; the issuer appoints the responsible identity provider.",
    boundary: "Confirm software deployment and servicing scope separately from identity verification, custody and other contracted services. Configuring transfer rules does not determine an offering's legal eligibility.",
    tags: ["ERC-3643", "Investor onboarding", "Identity integration", "Issuer software"],
    source: "https://docs.tokeny.com/docs/identity-providers"
  }
};
type SeoOverride = {
  title: string;
  description: string;
  heading?: string;
  canonicalPath?: string;
  socialImageAlt?: string;
  openGraphType?: "article" | "website";
  schemaHeadline?: string;
};

const seoOverrides: Record<string, SeoOverride> = {
  "blog/alchemy-vs-quicknode-vs-infura-rpc-node-providers/index.html": {
    title: "Alchemy vs QuickNode vs Infura: RPC Compared | FluidRWA",
    description: "Compare Alchemy, QuickNode and Infura for RPC networks, archive reads, WebSockets, authentication and rate limits, with a workload acceptance checklist.",
    heading: "Alchemy vs QuickNode vs Infura: RPC Compared",
    schemaHeadline: "Alchemy vs QuickNode vs Infura: RPC Compared",
    socialImageAlt: "FluidRWA: Illustrative server racks and blue network cables; not a provider facility photograph.",
    openGraphType: "article"
  },
  "blog/top-tokenization-companies-2026/index.html": {
    title: "10 RWA Tokenization Platforms Compared by Issuer Fit (2026)",
    description: "Compare 10 RWA tokenization platforms by issuance model, investor eligibility, custody and redemptions. See which questions to ask before shortlisting.",
    heading: "Top 10 RWA tokenization platforms for 2026",
    socialImageAlt: "Illustrative investment documents and a globe outside an office building; not a provider office or evidence of a regulated offering.",
    openGraphType: "article"
  },
  "blog/akash-vs-io-net-vs-aethir-decentralized-gpu-compute/index.html": {
    title: "Akash vs io.net vs Aethir vs Lium: GPU Compute Compared",
    description: "Compare Akash, io.net, Aethir and Lium by deployment model, GPU access, provider economics and operational responsibility.",
    heading: "Akash vs io.net vs Aethir vs Lium: GPU Compute Compared",
    schemaHeadline: "Akash vs io.net vs Aethir vs Lium: GPU Compute Compared",
    socialImageAlt: "Illustrative data-center GPU computing equipment; not a provider facility or performance benchmark.",
    openGraphType: "article"
  },
  "blog/taxbit-vs-ledgible-vs-lukka-enterprise-crypto-accounting-tax/index.html": {
    title: "TaxBit vs Ledgible vs Lukka: Tax Reporting & Cost Basis",
    description: "Compare TaxBit, Ledgible and Lukka for digital asset accounting, tax information reporting, cost basis, source reconciliation and integrations.",
    heading: "TaxBit vs Ledgible vs Lukka: Accounting, Tax and Cost Basis",
    schemaHeadline: "TaxBit vs Ledgible vs Lukka: Accounting, Tax and Cost Basis",
    socialImageAlt: "Illustrative financial accounting workstation; not a screenshot of TaxBit, Ledgible or Lukka.",
    openGraphType: "article"
  },
  "blog/chainalysis-vs-trm-vs-elliptic-blockchain-analytics/index.html": {
    title: "Chainalysis vs TRM vs Elliptic vs Cognyte",
    description: "Compare four crypto analytics platforms for wallet screening, transaction monitoring, sanctions, investigations and forensics.",
    heading: "Chainalysis vs TRM Labs vs Elliptic vs Cognyte",
    socialImageAlt: "FluidRWA: Illustrative analyst reviewing network graphs across three monitors; not a vendor product screenshot.",
    openGraphType: "article"
  },
  "blog/alchemy-vs-quicknode-vs-chainstack-rpc-node-providers/index.html": {
    title: "Chainstack vs Alchemy vs QuickNode: Managed RPC",
    description: "Compare managed RPC, dedicated nodes, archive access, request accounting and operational control across Chainstack, Alchemy and QuickNode.",
    heading: "Which managed RPC model fits your workload?"
  },
  "blog/rwa-tokenization-platform-comparison-2026/index.html": {
    title: "RWA Tokenization Platform Comparison (2026)",
    description: "Compare RWA tokenization platforms by issuance, compliance, custody, investor onboarding and lifecycle support in our consolidated buyer guide.",
    canonicalPath: "/blog/top-tokenization-companies-2026"
  },
  "blog/anchorage-digital-vs-bitgo-vs-fireblocks-institutional-custody/index.html": {
    title: "Anchorage vs BitGo vs Fireblocks: Custody",
    description: "Compare Anchorage, BitGo and Fireblocks for regulated custody, MPC wallets, policy controls, settlement, recovery, reporting and APIs.",
    heading: "Anchorage vs BitGo vs Fireblocks"
  },
  "blog/alchemy-vs-moralis-vs-thirdweb-web3-development-platforms/index.html": {
    title: "Alchemy vs Moralis vs thirdweb (2026): Which Fits?",
    description: "Compare Alchemy, Moralis and thirdweb for blockchain APIs, data, wallets, contracts, payments, portability and production fit.",
    heading: "Alchemy, Moralis or thirdweb?"
  },
  "blog/best-blockchain-development-companies-web3-rwa/index.html": {
    title: "10 Best Blockchain Development Companies (2026)",
    description: "Compare 10 blockchain development companies for Web3, RWA, DeFi and enterprise projects by specialty, delivery model and buyer fit.",
    heading: "10 blockchain development firms, compared"
  },
  "blog/crypto-custody-providers-comparison-2026/index.html": {
    title: "9 Crypto Custody Providers Compared (2026)",
    description: "Compare 9 crypto custody providers by qualified custody, MPC controls, wallet operations, DeFi access and tokenized asset support.",
    heading: "9 institutional custody providers, compared"
  },
  "blog/nowpayments-vs-coinbase-commerce-vs-bitpay-crypto-payment-gateways/index.html": {
    title: "NOWPayments vs Coinbase Commerce vs BitPay (2026)",
    description: "Compare three crypto payment gateways by supported assets, invoices, integrations, settlement options, merchant controls and buyer fit.",
    heading: "NOWPayments, Coinbase Commerce or BitPay?"
  },
  "blog/asset-tokenization-platform-comparison/index.html": {
    title: "Asset Tokenization Platform Comparison: Buyer Checklist | FluidRWA",
    description: "Evaluate asset tokenization platforms with a procurement matrix, documented controls, evidence requests and a pilot checklist for issuance and servicing.",
    heading: "Asset Tokenization Platform Comparison: Buyer Checklist",
    schemaHeadline: "Asset Tokenization Platform Comparison: Buyer Checklist",
    socialImageAlt: "Illustrative property documents, portfolio photographs and a tablet; not a platform screenshot or legal ownership record.",
    openGraphType: "article"
  },
  "vendors/tokenization-platforms/index.html": {
    title: "RWA Tokenization Platform Directory: 11 Providers | FluidRWA",
    description: "Browse 11 issuer-side tokenization platforms and service providers. Filter by project fit, compare asset and jurisdiction requirements, and build a shortlist.",
    heading: "RWA Tokenization Platform Directory",
    socialImageAlt: "FluidRWA tokenization directory: 11 issuer-side platforms and service providers in directory order, not a ranking."
  },
  "vendors/custody-solutions/index.html": {
    title: "28 Institutional Crypto Custody Providers Compared",
    description: "Compare 28 institutional crypto custodians by regulatory status, MPC or cold-storage controls, insurance, asset support and operating model."
  },
  "vendors/blockchain-development/index.html": {
    title: "Blockchain Development Companies & Infrastructure Directory",
    description: "Browse blockchain engineering, RPC, security, data and network providers. Separate build partners from infrastructure and explore country hiring guides.",
    heading: "Blockchain Development Companies and Infrastructure",
    socialImageAlt: "FluidRWA blockchain development and infrastructure directory; provider listing order is not a ranking."
  },
  "vendors/growth-marketing/index.html": {
    title: "Web3 Growth & Marketing Companies Directory | FluidRWA",
    description: "Browse Web3 marketing agencies, community tools and media partners by service. Compare strategy, PR, content, SEO, paid media and campaign responsibilities.",
    heading: "Web3 Growth and Marketing Companies",
    socialImageAlt: "FluidRWA vendor ecosystem directory, including growth and marketing services; not a performance ranking."
  },
  "vendors/fiat-on-off-ramps/index.html": {
    title: "Crypto On-Ramp and Off-Ramp Providers: 29 Compared",
    description: "Compare fiat-to-crypto and crypto-to-fiat providers by country, payment method, KYC ownership and payout route. Verify the corridor before integrating."
  },
  "vendors/payments-stablecoins/index.html": {
    title: "Stablecoin Infrastructure Providers for Payments & Payouts",
    description: "Compare 30 providers for stablecoin payment acceptance, payouts, issuance, treasury and compliance. Check who holds funds and handles conversion and settlement."
  }
};

const articleDirectoryLinks: Record<string, { href: string; label: string }> = {
  "blog/top-tokenization-companies-2026/index.html": { href: "/vendors/tokenization-platforms", label: "Compare all tokenization platforms" },
  "blog/moonpay-vs-transak-vs-banxa-fiat-on-ramp-providers/index.html": { href: "/vendors/fiat-on-off-ramp-providers", label: "Compare 29 fiat ramp providers" },
  "blog/anchorage-digital-vs-bitgo-vs-fireblocks-institutional-custody/index.html": { href: "/vendors/crypto-custody-providers", label: "Compare 28 custody providers" },
  "blog/crypto-custody-providers-comparison-2026/index.html": { href: "/vendors/crypto-custody-providers", label: "Compare 28 custody providers" },
  "blog/best-blockchain-development-companies-web3-rwa/index.html": { href: "/vendors/blockchain-development-companies", label: "Compare 30 development companies" },
  "blog/asset-tokenization-platform-comparison/index.html": { href: "/vendors/tokenization-platforms", label: "Compare tokenization platforms" },
  "blog/chainalysis-vs-trm-vs-elliptic-blockchain-analytics/index.html": { href: "/vendors/compliance-infrastructure-providers", label: "Compare compliance providers" },
  "blog/alchemy-vs-quicknode-vs-infura-rpc-node-providers/index.html": { href: "/vendors/node-as-a-service-rpc-providers", label: "Compare RPC providers" },
  "blog/alchemy-vs-moralis-vs-thirdweb-web3-development-platforms/index.html": { href: "/vendors/blockchain-development-companies", label: "Compare development companies" },
  "blog/nowpayments-vs-coinbase-commerce-vs-bitpay-crypto-payment-gateways/index.html": { href: "/vendors/stablecoin-infrastructure-providers", label: "Compare payment infrastructure" }
};

const articleSources: Record<string, Array<{ href: string; label: string }>> = {
  "blog/alchemy-vs-moralis-vs-thirdweb-web3-development-platforms/index.html": [
    { href: "https://www.alchemy.com/docs", label: "Alchemy" },
    { href: "https://docs.moralis.com/", label: "Moralis" },
    { href: "https://portal.thirdweb.com/", label: "thirdweb" }
  ],
  "blog/crypto-custody-providers-comparison-2026/index.html": [
    { href: "https://www.anchorage.com/", label: "Anchorage Digital" },
    { href: "https://www.bitgo.com/", label: "BitGo" },
    { href: "https://www.fireblocks.com/", label: "Fireblocks" }
  ],
  "blog/asset-tokenization-platform-comparison/index.html": [
    { href: "https://own.securitize.io/", label: "Securitize" },
    { href: "https://docs.tokeny.com/docs/t-rex-platform", label: "Tokeny" },
    { href: "https://developers.polymesh.network/compliance/", label: "Polymesh" }
  ],
  "blog/nowpayments-vs-coinbase-commerce-vs-bitpay-crypto-payment-gateways/index.html": [
    { href: "https://documenter.getpostman.com/view/7907941/2s93JusNJt", label: "NOWPayments" },
    { href: "https://docs.cdp.coinbase.com/commerce-onchain/docs/welcome", label: "Coinbase Commerce" },
    { href: "https://developer.bitpay.com/docs", label: "BitPay" }
  ]
};
const preferredVendorLinks: Record<string, string> = {
  "tokenization-platforms": "tokenization-platforms",
  "legal-regulatory": "legal-regulatory-vendors",
  "legal-regulatory-vendors": "legal-regulatory-vendors",
  "kyc-aml": "kyc-aml-providers",
  "kyc-aml-providers": "kyc-aml-providers",
  "smart-contract-development": "smart-contract-development-companies",
  "smart-contract-development-companies": "smart-contract-development-companies",
  "ai-infrastructure": "ai-infrastructure-providers",
  "ai-infrastructure-providers": "ai-infrastructure-providers",
  "custody-solutions": "crypto-custody-providers",
  "crypto-custody-providers": "crypto-custody-providers",
  "fiat-on-off-ramps": "fiat-on-off-ramp-providers",
  "fiat-on-off-ramp-providers": "fiat-on-off-ramp-providers",
  "compliance-infrastructure": "compliance-infrastructure-providers",
  "compliance-infrastructure-providers": "compliance-infrastructure-providers",
  "defi-infrastructure": "defi-infrastructure-providers",
  "defi-infrastructure-providers": "defi-infrastructure-providers",
  "defi-trading-margin-infrastructure": "defi-trading-margin-infrastructure",
  "defi-trading-platforms": "defi-trading-margin-infrastructure",
  "payments-stablecoins": "stablecoin-infrastructure-providers",
  "stablecoin-infrastructure-providers": "stablecoin-infrastructure-providers",
  "security-audits": "security-audit-companies",
  "security-audit-companies": "security-audit-companies",
  "growth-marketing": "growth-marketing-companies",
  "growth-marketing-companies": "growth-marketing-companies",
  "identity-solutions": "identity-solution-providers",
  "identity-solution-providers": "identity-solution-providers",
  "blockchain-development": "blockchain-development-companies",
  "blockchain-development-companies": "blockchain-development-companies"
};

function readLegacy(file: string) {
  const fullPath = path.join(/* turbopackIgnore: true */ root, file);
  if (!fullPath.startsWith(root) || !fs.existsSync(fullPath)) return null;
  return fs.readFileSync(fullPath, "utf8");
}

function shouldShowWeb3VettedBadges(file: string) {
  if (file === "vendor-ecosystem.html") return true;
  return file.startsWith("vendors/");
}

function addVettedBadgeToVendorCard(cardHtml: string) {
  if (cardHtml.includes('id="sherlock"')) return cardHtml;
  if (cardHtml.includes('class="bc-vetted-badge"') || cardHtml.includes('class="vendor-vetted-badge"')) {
    return cardHtml;
  }
  return cardHtml.replace(/(<h3\b[^>]*>[\s\S]*?<\/h3>)/i, '$1<span class="bc-vetted-badge">Vetted</span>');
}

function addWeb3VettedBadges(file: string, html: string) {
  if (!shouldShowWeb3VettedBadges(file)) return html;
  const badgedCards = html
    .replace(/<article class="bc-company-card[\s\S]*?<\/article>/g, addVettedBadgeToVendorCard)
    .replace(/<article class="vendor-card[\s\S]*?<\/article>/g, addVettedBadgeToVendorCard);

  if (!file.includes("ai-") || !badgedCards.includes('class="ai-vendor-table"')) {
    return badgedCards;
  }

  return badgedCards.replace(/<tr id="[^"]+">[\s\S]*?<\/tr>/g, (row) => {
    if (row.includes('class="bc-vetted-badge"')) return row;
    return row.replace(/(<a class="ai-category-name"[\s\S]*?<\/a>)/, '$1 <span class="bc-vetted-badge">Vetted</span>');
  });
}

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function matchTag(html: string, pattern: RegExp) {
  const value = html.match(pattern)?.[1]?.trim();
  return value ? decodeHtmlEntities(value) : value;
}

export function legacyMetadata(file: string, canonicalPath: string): Metadata {
  const html = readLegacy(file);
  if (!html) return {};
  const override = seoOverrides[file];
  const title = override?.title || normalizeEditorialText(matchTag(html, /<title>([\s\S]*?)<\/title>/i) || "FluidRWA");
  const description = override?.description || normalizeEditorialText(
    matchTag(html, /<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']\s*\/?>/i) ||
    matchTag(html, /<meta\s+property=["']og:description["']\s+content=["']([\s\S]*?)["']\s*\/?>/i) ||
    "FluidRWA helps teams discover Web3, RWA and digital asset infrastructure vendors."
  );
  const parsedOgImage = matchTag(html, /<meta\s+property=["']og:image["']\s+content=["']([\s\S]*?)["']\s*\/?>/i);
  const scopedSocial = ["vendors/growth-marketing/index.html", "vendors/blockchain-development/index.html"].includes(file);
  const ogImage = (file.startsWith("blog/") || scopedSocial) && parsedOgImage ? parsedOgImage : defaultSocialImage;
  const resolvedCanonicalPath = override?.canonicalPath || canonicalPath;
  const canonical = `${siteUrl}${resolvedCanonicalPath === "/" ? "" : resolvedCanonicalPath}`;
  const robotsValue = matchTag(html, /<meta\s+name=["']robots["']\s+content=["']([\s\S]*?)["']\s*\/?>/i)?.toLowerCase() || "";
  const shouldIndex = !robotsValue.includes("noindex");
  const shouldFollow = !robotsValue.includes("nofollow");
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "FluidRWA",
      images: [{ url: ogImage.startsWith("/") ? `${siteUrl}${ogImage}` : ogImage, width: 1200, height: 630, ...(override?.socialImageAlt ? { alt: override.socialImageAlt } : {}) }],
      type: override?.openGraphType || "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: override?.socialImageAlt
        ? [{ url: ogImage.startsWith("/") ? `${siteUrl}${ogImage}` : ogImage, alt: override.socialImageAlt }]
        : [ogImage.startsWith("/") ? `${siteUrl}${ogImage}` : ogImage]
    },
    robots: {
      index: shouldIndex,
      follow: shouldFollow,
      googleBot: {
        index: shouldIndex,
        follow: shouldFollow,
        "max-image-preview": shouldIndex ? "large" : "none",
        "max-snippet": shouldIndex ? -1 : 0
      }
    }
  };
}

export function legacyJsonLd(file: string) {
  const html = readLegacy(file);
  if (!html) return [];
  const blocks = [...html.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  const parsed = blocks.map((block) => {
    try {
      return JSON.parse(block[1]);
    } catch {
      return null;
    }
  }).filter(Boolean);
  const growth = file === "vendors/growth-marketing/index.html";
  const sourceNames = growth ? [...html.matchAll(/<h3 itemprop="name">([^<]*)<\/h3>/g)].map(m => m[1]) : [];
  const fallback = legacyVendorFallbackJsonLd(file, siteUrl, sourceNames);
  if (growth && fallback) {
    const list = parsed.flatMap(block => block?.["@graph"] || [block]).find(entry => entry["@type"] === "ItemList");
    const additions = fallback["@graph"].find(entry => entry["@type"] === "ItemList")?.itemListElement || [];
    if (list) {
      for (const item of additions) list.itemListElement.push({ ...item, position: list.itemListElement.length + 1 });
      list.numberOfItems = list.itemListElement.length;
    }
  }
  const withFallback = fallback && !growth ? [...parsed, fallback] : parsed;
  const normalized = JSON.parse(normalizeEditorialText(JSON.stringify(withFallback)));
  if (["vendors/growth-marketing/index.html", "vendors/blockchain-development/index.html"].includes(file)) {
    for (const block of normalized) for (const entry of block?.["@graph"] || [block]) {
      if (entry?.["@type"] === "CollectionPage") entry.dateModified = "2026-11-09";
      if (entry?.["@type"] === "ItemList") for (const row of entry.itemListElement || []) {
        if (!row.item) continue;
        delete row.item.address;
        const correction = serviceScopeCorrections[row.item.name];
        if (correction) { row.item.description = correction.description; row.item.knowsAbout = correction.tags; }
      }
    }
  }
  const override = seoOverrides[file];
  if (override) {
    for (const block of normalized) {
      const entries = block?.["@graph"] || [block];
      for (const entry of entries) {
        if (entry?.["@type"] === "Article") entry.headline = override.schemaHeadline || override.title;
        if (entry?.["@type"] === "CollectionPage") entry.name = override.title;
        if (entry?.["@type"] === "Article" || entry?.["@type"] === "CollectionPage") {
          entry.description = override.description;
          if (!entry.dateModified) entry.dateModified = "2026-09-22";
        }
      }
    }
  }
  if (file.startsWith("blog/")) {
    for (const block of normalized) {
      const entries = block?.["@graph"] || [block];
      for (const entry of entries) {
        if (entry?.["@type"] !== "Article") continue;
        entry.author = {
          "@type": "Organization",
          name: "FluidRWA Research Team",
          url: `${siteUrl}/about`
        };
        entry.reviewedBy = {
          "@type": "Organization",
          name: "FluidRWA Research Team",
          url: `${siteUrl}/about`
        };
        const sources = articleSources[file];
        if (sources?.length) {
          const existing = Array.isArray(entry.citation) ? entry.citation : [];
          entry.citation = [...new Set([...existing, ...sources.map((source) => source.href)])];
        }
      }
    }
  }
  if (file === "vendor-ecosystem.html") {
    const graph = normalized.flatMap((item: { "@graph"?: unknown[] }) => item?.["@graph"] || []);
    const vendorList = graph.find((item: { "@id"?: string }) => item?.["@id"]?.endsWith("#vendors"));
    if (vendorList) vendorList.numberOfItems = 1000;
  }
  if (file === "vendors/tokenization-platforms/index.html") {
    const graph = normalized.flatMap((item: { "@graph"?: unknown[] }) => item?.["@graph"] || []);
    const providerList = graph.find((item: { "@id"?: string }) => item?.["@id"]?.endsWith("#providers"));
    const items = providerList?.itemListElement;
    const collection = graph.find((item: { "@type"?: string }) => item?.["@type"] === "CollectionPage");
    if (collection) collection.dateModified = "2026-11-08";
    if (Array.isArray(items)) {
      for (const entry of items) {
        const correction = tokenizationScopeCorrections[entry.item?.name];
        if (!correction) continue;
        entry.item.description = correction.description;
        entry.item.knowsAbout = correction.tags;
        entry.item.additionalType = correction.role;
      }
      const zoniqxIndex = items.findIndex((item: { item?: { name?: string } }) => item?.item?.name === "Zoniqx");
      if (zoniqxIndex >= 0 && items.length >= 10) {
        const [zoniqx] = items.splice(zoniqxIndex, 1);
        items.splice(9, 0, zoniqx);
        items.forEach((item: { position?: number }, index: number) => { item.position = index + 1; });
      }
    }
  }
  return ensureSecurityVendorSchema(file, normalized);
}

function enhanceBlogDecisionPage(file: string, html: string) {
  if (!file.startsWith("blog/") || file === "blog/tokenization/index.html") return html;

  const override = seoOverrides[file];
  let enhanced = override?.heading
    ? html.replace(/<h1(\b[^>]*)>[\s\S]*?<\/h1>/i, `<h1$1>${override.heading}</h1>`)
    : html;

  if (file === "blog/top-tokenization-companies-2026/index.html" && !enhanced.includes('class="comparison-consideration"')) {
    const origin = "/blog/top-tokenization-companies-2026";
    const context = `article=top-tokenization-companies-2026&origin_path=${encodeURIComponent(origin)}`;
    const paths = `<section class="article-enquiry-paths" aria-label="Next steps for buyers and vendors"><div><h2>Choosing a tokenization platform?</h2><p>Share your asset, jurisdiction and requirements with FluidRWA.</p><a href="/submit-requirement?source=tokenization-article-buyer&category=Tokenization%20platform&${context}">Discuss your requirements</a></div><div><h2>Should your company be considered?</h2><p>Send your product information and evidence for editorial review.</p><a href="/vendor-membership?source=tokenization-article-vendor&${context}">Submit your company</a></div><p class="article-enquiry-email">Prefer email? <a href="mailto:contact@fluidrwa.com?subject=Tokenization%20platform%20enquiry">contact@fluidrwa.com</a></p></section>`;
    enhanced = enhanced.replace(/(<div class="answer-box">[\s\S]*?<\/div>)/i, `$1${paths}`);
  }

  enhanced = enhanced.replace(/(<aside class="comparison-consideration"[\s\S]*?)(<\/div>)/g,
    (match, content: string, closing: string) => content.includes("mailto:contact@fluidrwa.com") ? match
      : `${content}<p style="overflow-wrap:anywhere">Prefer email? <a style="display:inline;width:auto;min-height:0;padding:0;background:none;color:#2664a9!important;text-decoration:underline" href="mailto:contact@fluidrwa.com?subject=Company%20comparison%20enquiry">contact@fluidrwa.com</a></p>${closing}`);

  enhanced = enhanced.replace(
    /<p class="reviewed-line">Reviewed and updated by FluidRWA\s*·\s*([^<]+)<\/p>/i,
    '<p class="reviewed-line">Reviewed by <a href="/about">FluidRWA Research Team</a> · $1</p>'
  );
  const repeatedEvidenceLine = "Ask for evidence that maps directly to the planned production workflow, not a generic capability statement.";
  const repeatedEvidenceCount = enhanced.split(repeatedEvidenceLine).length - 1;
  if (repeatedEvidenceCount >= 3) {
    enhanced = enhanced
      .replaceAll(` ${repeatedEvidenceLine}`, "")
      .replace(/<p><strong>What to verify:<\/strong> Request a current architecture diagram,[\s\S]*?depends on another supplier\.<\/p>/g, "");

    const genericStart = enhanced.indexOf('<h2 id="architecture-before-procurement">');
    const faqStart = enhanced.indexOf('<section class="faq-list"', genericStart);
    if (genericStart >= 0 && faqStart > genericStart) {
      const removedSection = enhanced.slice(genericStart, faqStart);
      const removedIds = [...removedSection.matchAll(/<h2 id="([^"]+)"/g)].map((match) => match[1]);
      const sourcesStart = removedSection.search(/<h2 id="(?:primary-sources|sources-and-useful-references)[^"]*">/);
      const preservedSources = sourcesStart >= 0 ? removedSection.slice(sourcesStart) : "";
      const conciseChecklist = `<section class="procurement-checklist" aria-labelledby="validate-shortlist"><h2 id="validate-shortlist">How to validate the shortlist</h2><ol><li>Test the hardest production workflow with realistic volume, failure and recovery scenarios.</li><li>Confirm which features are generally available, partner-delivered or dependent on a separate contract.</li><li>Price implementation, usage, support, overages and exit work, not only the subscription.</li><li>Verify security scope, data handling, incident response, service levels and named delivery staff.</li><li>Require usable exports for configuration, records and logs before signing.</li></ol><p>Use these checks as procurement prompts, then validate regulatory and contractual conclusions with qualified advisers.</p></section>`;
      enhanced = `${enhanced.slice(0, genericStart)}${conciseChecklist}${preservedSources}${enhanced.slice(faqStart)}`;
      for (const id of removedIds) {
        if (preservedSources.includes(`id="${id}"`)) continue;
        enhanced = enhanced.replace(new RegExp(`<a href="#${id}">[\\s\\S]*?<\\/a>`, "g"), "");
      }
      enhanced = enhanced.replace(
        /(<a href="#best-fit-by-buyer-scenario">[\s\S]*?<\/a>)/,
        '$1<a href="#validate-shortlist">How to validate the shortlist</a>'
      );
    }
  }

  enhanced = enhanced.replace(
    /(<h2 id="vendor-profiles"[^>]*>[\s\S]*?)(?=<h2\b)/i,
    (profileSection) => profileSection.replace(/<h3(?![^>]*class=)([^>]*)>/g, '<h3 class="vendor-profile-name"$1>')
  );

  if (enhanced.includes('class="editorial-trust-strip"')) return enhanced;

  const directory = articleDirectoryLinks[file];
  const directoryLink = directory
    ? `<a class="editorial-directory-link" href="${directory.href}">${directory.label}</a>`
    : '<a class="editorial-directory-link" href="/web3vendorecosystem">Explore the vendor directory</a>';
  const sources = articleSources[file];
  const sourceSummary = sources?.length
    ? sources.map((source) => `<a href="${source.href}" target="_blank" rel="noopener noreferrer">${source.label}</a>`).join(" · ")
    : "Public vendor materials and buyer-fit analysis";
  const trustStrip = `<div class="editorial-trust-strip" aria-label="Editorial review details"><span><strong>Reviewed by</strong><a href="/about">FluidRWA Research Team</a></span><span><strong>${sources?.length ? "Sources reviewed" : "Research standard"}</strong><span class="editorial-source-links">${sourceSummary}</span></span>${directoryLink}</div>`;

  return enhanced.replace(
    /(<article class="post-main">)\s*(<img\b[^>]*>)\s*(<div class="answer-box">[\s\S]*?<\/div>)/i,
    `$1$3${trustStrip}$2`
  );
}

export function legacyMainHtml(file: string) {
  const html = readLegacy(file);
  if (!html) return null;
  const pageStyles = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)]
    .map((match) => {
      const css = match[1]
        .replace(/:root/g, ":scope")
        .replace(/(^|[,{]\s*)html(?=\s*[,>{])/gm, "$1:scope")
        .replace(/(^|[,{]\s*)body(?=\s*[,>{])/gm, "$1:scope");
      return `<style>@scope (.next-page-shell) {${css}}</style>`;
    })
    .join("\n");
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1] || html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] || html;
  const bodyHtml = ensureSecurityVendorPlacement(file, rewriteLinks(main)
    .replace(/<header[\s\S]*?<\/header>/gi, "")
    .replace(/<footer[\s\S]*?<\/footer>/gi, "")
    .replace(/<script\b(?![^>]*type=["']application\/ld\+json["'])[\s\S]*?<\/script>/gi, ""));
  const badgedBodyHtml = addWeb3VettedBadges(file, bodyHtml);
  const growthNames = file === "vendors/growth-marketing/index.html" ? [...html.matchAll(/<h3 itemprop="name">([^<]*)<\/h3>/g)].map(m => m[1]) : [];
  let fallbackDirectory = badgedBodyHtml.includes("bc-company-card") ? "" : legacyVendorFallbackHtml(file, growthNames);
  if (growthNames.length) fallbackDirectory = fallbackDirectory.replace('id="vendor-directory"', 'id="additional-marketing-providers"')
    .replace(/<label class="bc-search">[\s\S]*?<\/label>/, '')
    .replace(/<p class="bc-count">[\s\S]*?<\/p>/, '')
    .replace('Compare Growth &amp; Marketing Vendors', 'Additional marketing providers');
  let renderedHtml = fallbackDirectory ? `${badgedBodyHtml}\n${fallbackDirectory}` : badgedBodyHtml;
  renderedHtml = normalizeEditorialText(renderedHtml);
  renderedHtml = enhanceBlogDecisionPage(file, renderedHtml);
  if (["vendors/growth-marketing/index.html", "vendors/blockchain-development/index.html"].includes(file)) {
    const marketing = file.includes("growth-marketing");
    renderedHtml = renderedHtml
      .replace(/<dt>HQ<\/dt>/g, '<dt>Listed location</dt>')
      .replace(/<dt>Coverage<\/dt>/g, '<dt>Listed coverage</dt>')
      .replace('<strong>29</strong><span>companies</span>', '<strong>32</strong><span>companies</span>')
      .replace(/(<h1[^>]*>)[\s\S]*?(<\/h1>)/, `$1${seoOverrides[file].heading}$2`)
      .replace(/(<h1[^>]*>[\s\S]*?<\/h1>)\s*<p>[\s\S]*?<\/p>/, marketing
        ? '$1<p>Find a Web3 marketing partner for positioning, PR, content, SEO, community or paid acquisition. This directory also includes media and community tools: buying a placement or software subscription is different from hiring an agency to own a campaign.</p>'
        : '$1<p>Separate a team that builds your application from the infrastructure it uses. This directory includes RPC and data platforms, networks, interoperability and security providers alongside engineering services. Start with the work you need delivered, then confirm ownership of code, deployment and maintenance.</p>')
      .replace('29 companies with service type, best-fit use case, jurisdiction coverage, strengths and provider-level structured data.', '32 listings spanning agencies, media and community products. Confirm the service, delivery team and target audience before shortlisting.')
      .replace('<strong>Global</strong><span>Coverage</span>', '<strong>Project fit</strong><span>confirm availability</span>')
      .replace('<strong>SEO</strong><span>Indexed</span>', '<strong>Service scope</strong><span>agency, media or tool</span>');
    renderedHtml = renderedHtml.replace(/<article class="bc-(?:provider|company)-card\b[\s\S]*?<\/article>/g, card => {
      const name = card.match(/<h3[^>]*>([^<]+)<\/h3>/)?.[1];
      const correction = name && serviceScopeCorrections[name];
      if (!correction) return card;
      return card.replace(/(<p\b[^>]*itemprop="description"[^>]*>)[\s\S]*?<\/p>/, `$1${correction.description}</p>`)
        .replace(/(<p class="bc-best-fit"><strong>Best for:<\/strong>)[\s\S]*?<\/p>/, `$1 ${correction.fit}</p>`)
        .replace(/(<p class="bc-best"><span>Best for<\/span>)[\s\S]*?<\/p>/, `$1${correction.fit}</p>`)
        .replace(/<div class="bc-(?:provider-tags|tags)">[\s\S]*?<\/div>/, `<div class="bc-provider-tags">${correction.tags.map(tag => `<span>${tag}</span>`).join('')}</div>`);
    });
    const resources = marketing
      ? `<h2 id="service-buyer-guide">Choose the service before the agency</h2><p>Strategy and branding define the audience, positioning and message. Content and SEO produce owned assets over time. PR seeks earned coverage; a media placement is a separately agreed purchase. Community operations cover moderation and member support, while influencer and paid campaigns need disclosure, channel eligibility and approval responsibilities.</p><p>Ask for named deliverables, who owns ad accounts and creative rights, how spend is separated from fees, and how reporting distinguishes reach from qualified enquiries. Do not treat follower growth or a campaign case study as a forecast.</p><p><a href="https://coinbound.io/" rel="nofollow noopener noreferrer" target="_blank">Coinbound</a> lists influencer, PR, SEO, paid media and advisory services. <a href="https://www.lunarstrategy.com/" rel="nofollow noopener noreferrer" target="_blank">Lunar Strategy</a> lists GTM, social, community, influencer and PR services. Confirm the quoted scope rather than assuming either is influencer-only. These service menus were checked November 9, 2026; they do not establish campaign results.</p><div class="research-links"><strong>Compare approaches</strong><a href="/blog/coinbound-vs-lunar-strategy-vs-serotonin-web3-growth">Coinbound vs Lunar Strategy vs Serotonin</a><a href="/vendors/ai-marketing-content-tools">AI marketing and content tools</a></div>`
      : `<h2 id="service-buyer-guide">Build partner, infrastructure or security review?</h2><p>A custom development engagement should specify architecture, source-code ownership, tests, deployment and support. RPC and indexing products supply application inputs; networks define execution and settlement; interoperability adds cross-chain dependencies. Security review and bug bounties have their own scope and do not guarantee exploit prevention.</p><p>The <a href="https://ethereum.org/developers/docs/" target="_blank" rel="nofollow noopener noreferrer">Ethereum developer documentation</a> separates contracts, nodes, APIs, testing and security. Use that distinction in the brief: identify what your team operates and what the supplier must deliver. Documentation checked November 9, 2026; no provider performance ranking is implied.</p><div class="research-links"><strong>Country hiring guides</strong><a href="/blog/top-blockchain-development-companies-united-states-2026">United States</a><a href="/blog/top-blockchain-development-companies-united-kingdom-2026">United Kingdom</a><a href="/blog/top-blockchain-development-companies-india-2026">India</a><a href="/blog/top-blockchain-development-companies-germany-2026">Germany</a><a href="/blog/top-blockchain-development-companies-brazil-2026">Brazil</a></div><p>Country guides are hiring starting points, not proof of headquarters, licensing or availability. Confirm the contracting entity, delivery location, time-zone overlap and applicable data terms.</p>`;
    const guide = `<section class="bc-section" aria-labelledby="service-buyer-guide"><div class="light-container">${resources}<p>Listing order is not a performance ranking. Existing company profiles have their own evidence and review dates; this service guide does not reverify every listing or jurisdiction.</p><div class="research-links"><a href="/submit-requirement">Share your project requirements</a><a href="/vendor-membership">Submit your company for consideration</a><a href="mailto:contact@fluidrwa.com">contact@fluidrwa.com</a></div></div></section>`;
    renderedHtml += guide;
    renderedHtml = renderedHtml.replace(/<a\b([^>]*\bhref="(https?:\/\/[^\"]+)"[^>]*)>/gi, (match, attrs: string, href: string) => {
      if (/^https:\/\/(?:www\.)?fluidrwa\.com\//.test(href) || /\bnofollow\b/.test(attrs)) return match;
      return /\brel="/.test(attrs) ? `<a${attrs.replace(/rel="([^"]*)"/, 'rel="$1 nofollow"')}>` : `<a${attrs} rel="nofollow">`;
    });
  }
  if (["contact.html", "submit-project.html", "apply-as-vendor.html"].includes(file)) {
    renderedHtml = renderedHtml.replace(/(<form\b[^>]*class="[^"]*fluid-intake-form[^"]*"[^>]*>)/,
      '$1<p style="grid-column:1/-1;overflow-wrap:anywhere">Prefer email? <a href="mailto:contact@fluidrwa.com">contact@fluidrwa.com</a></p>');
  }
  renderedHtml = normalizeVendorCategoryCounts(renderedHtml);
  if (file === "vendors/fiat-on-off-ramps/index.html") {
    renderedHtml = renderedHtml.replace(/(<h1>[^<]+<\/h1>)<p>[^<]+<\/p>/, '$1<p>Need customers to buy crypto, cash out or both? Start with the country, payment method and direction of travel. Then confirm who performs KYC, who handles failed payouts and which asset and network pairs are supported. See the <a href="/network-explorer/research/ramp-onboarding">ramp onboarding evidence map</a> for documented examples.</p>');
  }
  if (file === "vendors/payments-stablecoins/index.html") {
    renderedHtml = renderedHtml.replace(/(<h1>[^<]+<\/h1>)<p>[^<]+<\/p>/, '$1<p>Start with the job: accept stablecoins, pay recipients, issue a token or manage treasury. Shortlist providers that support your corridor, then confirm who holds funds, who converts them and when the recipient can use the proceeds.</p>');
  }
  if (file === "vendors/tokenization-platforms/index.html") {
    renderedHtml = moveZoniqxToTenth(renderedHtml)
      .replace(/(<h1[^>]*>)[\s\S]*?(<\/h1>)/, `$1${seoOverrides[file].heading}$2`)
      .replace(/(<h1[^>]*>[\s\S]*?<\/h1>)\s*<p>[\s\S]*?<\/p>/, '$1<p>Browse 11 issuer-side tokenization platforms and service providers for funds, securities and real-world assets. Separate configurable issuance software from custom implementation services, then confirm asset eligibility, investor restrictions and the entities responsible for each jurisdiction.</p>')
      .replace('<strong>Full</strong><span>asset lifecycle support</span>', '<strong>Issuer-side</strong><span>software and services</span>')
      .replace('<strong>Multi-chain</strong><span>coverage</span>', '<strong>Project fit</strong><span>confirm network support</span>')
      .replace('This page is now limited to issuer-side platforms whose core product helps teams tokenize, manage and service assets.', 'Issuer software, white-label platforms and implementation services have different delivery models. HQ is not service availability or licensing. Asset and chain labels are discovery aids, not confirmation that your offering or investors are eligible.')
      .replace(/<article class="bc-company-card\b[\s\S]*?<\/article>/g, (card) => {
        const name = card.match(/<h3[^>]*>([^<]+)<\/h3>/)?.[1];
        const correction = name && tokenizationScopeCorrections[name];
        if (!correction) return card;
        return card.replace(/data-search="[^"]*"/, `data-search="${name} ${correction.role} ${correction.tags.join(' ')}"`)
          .replace(/(<p class="bc-best"><span>Best for<\/span>)[\s\S]*?<\/p>/, `$1${correction.fit}</p>`)
          .replace(/(<p class="bc-desc"[^>]*>)[\s\S]*?<\/p>/, `$1${correction.description}</p>`)
          .replace(/<div class="bc-tags">[\s\S]*?<\/div>/, `<div class="bc-tags">${correction.tags.map(tag => `<span>${tag}</span>`).join('')}</div>`)
          .replace(/(<summary>Provider intelligence<\/summary>)\s*<p>[\s\S]*?<\/p>/, `$1<p>${correction.boundary} <a href="${correction.source}" target="_blank" rel="nofollow noopener noreferrer">Official product scope</a></p>`);
      });
  }
  if (file === "vendors/custody-solutions/index.html") {
    const custodyAnswer = `<aside class="directory-answer" aria-label="How to compare institutional crypto custody providers"><strong>Short answer</strong><p>Institutional buyers should compare custody providers by legal and regulatory status, key-control model, insurance scope, asset and chain coverage, transaction policy controls, reporting and recovery. A qualified custodian, an MPC wallet platform and a bank custody service solve different problems, so the shortlist must match who holds assets, who can approve movement and which evidence auditors require.</p><p><a href="/blog/crypto-custody-insurance-coverage-due-diligence">Understand custody insurance exclusions</a> and <a href="/blog/wallet-apis-asset-tokenization-platforms">compare wallet API control models</a> before issuing an RFP.</p></aside>`;
    renderedHtml = renderedHtml.replace(/(<section class="bc-section" id="custody-directory">)/, `${custodyAnswer}$1`);
  }
  renderedHtml = renderedHtml.replace(/<p>(<a href="\/downloads\/fluidrwa-buyer-brief\.txt"[\s\S]*?)<\/p>/g,
    (_match, links: string) => `<div class="buyer-guide-actions">${links.replace(/ · /g, "")}</div>`);
  if (file === "vendor-ecosystem.html") {
    const index = html.match(/<script id="vendor-search-index-data" type="application\/json">([\s\S]*?)<\/script>/)?.[1];
    if (index) {
      const parsed = JSON.parse(decodeHtmlEntities(index));
      const safeJson = JSON.stringify(parsed).replace(/</g, "\\u003c");
      renderedHtml += `<script id="vendor-search-index-data" type="application/json">${safeJson}</script>`;
    }
  }
  const resources = relatedVendorDirectories(file);
  if (file === "vendors/tokenization-platforms/index.html" && renderedHtml.includes('<label class="bc-search">')) {
    renderedHtml = renderedHtml.replace('<label class="bc-search">', () => `${resources}<label class="bc-search">`);
  } else {
    renderedHtml += resources;
  }
  if (file.startsWith("vendors/") || file === "vendor-ecosystem.html") {
    renderedHtml += `<aside class="directory-disclosure" aria-label="Directory disclosure"><strong>How listings, logos and counts work</strong><p>FluidRWA organizes companies for discovery and comparison. Company names and logos are shown for identification only; inclusion does not imply endorsement. The 1,000+ vendor count includes Web3 and AI listings plus vendors tracked across blockchain-project ecosystems, and a company may appear in more than one relevant category. Vetted indicates that a listing has passed our baseline review. Vetted Plus is reserved for companies that complete FluidRWA's enhanced review process. No company currently holds Vetted Plus status. Buyers should complete their own diligence.</p></aside><p class="page-last-updated">Last updated: September 29, 2026</p>`;
  }
  if (["vendors/institutional-digital-asset-trading-platforms/index.html", "vendors/crypto-accounting-tax-software/index.html"].includes(file)) {
    renderedHtml = renderedHtml.replace("Last updated: September 29, 2026", "Last updated: October 10, 2026");
  }
  return pageStyles ? `${pageStyles}\n${renderedHtml}` : renderedHtml;
}

function normalizeEditorialText(value: string) {
  return value
    .replace(/Explore crawlable vendor profile pages/gi, "Explore vendor profile pages")
    .replace(/Allen &amp; Overy/g, "A&amp;O Shearman")
    .replace(/Allen & Overy/g, "A&O Shearman")
    .replace(/\bOnfido\b(?! \(an Entrust company\))/g, "Onfido (an Entrust company)")
    .replace(/\bHashnote\b(?! \(acquired by Circle\))/g, "Hashnote (acquired by Circle)")
    .replace(/>Contact ([^<]+)</g, ">Request intro<")
    .replace(/\/vendors\/defi-infrastructure-vendors/g, "/vendors/defi-infrastructure-providers")
    .replace(/\/vendors\/custody-wallets/g, "/vendors/crypto-custody-providers")
    .replace(/\/vendors\/blockchain-analytics-transaction-monitoring/g, "/vendors/compliance-infrastructure-providers")
    .replace(/https:\/\/www\.fluidrwa\.com\/vendor-ecosystem\.html/g, "https://www.fluidrwa.com/web3vendorecosystem")
    .replace(/https:\/\/www\.fluidrwa\.com\/team\.html/g, "https://www.fluidrwa.com/about");
}

function normalizeVendorCategoryCounts(html: string) {
  return html.replace(/<section class="vendor-category-block[\s\S]*?<\/section>/g, (section) => {
    const count = (section.match(/<article class="vendor-card/g) || []).length;
    if (!count) return section;
    return section.replace(/<p class="eyebrow light-eyebrow">\s*\d+\s+vendors?\s*<\/p>/i, `<p class="eyebrow light-eyebrow">${count} ${count === 1 ? "vendor" : "vendors"}</p>`);
  });
}

function moveZoniqxToTenth(html: string) {
  const gridPattern = /(<div class="bc-company-grid"[^>]*>)([\s\S]*?)(<\/div>\s*<\/div>\s*<\/section>)/;
  return html.replace(gridPattern, (_match, open: string, content: string, close: string) => {
    const cards = content.match(/<article class="bc-company-card[\s\S]*?<\/article>/g) || [];
    const zoniqxIndex = cards.findIndex((card) => card.includes('id="zoniqx"'));
    if (zoniqxIndex < 0 || cards.length < 10) return `${open}${content}${close}`;
    const [zoniqx] = cards.splice(zoniqxIndex, 1);
    cards.splice(9, 0, zoniqx);
    return `${open}${cards.map((card, index) => card.replace(/<p class="bc-company-index">\d{2} \/ /, `<p class="bc-company-index">${String(index + 1).padStart(2, "0")} / `)).join("")}${close}`;
  });
}

export function relatedVendorDirectories(file: string) {
  if (!file.startsWith("vendors/")) return "";

  const slug = file.toLowerCase();
  let links = [
    ["/vendors/tokenization-platforms", "RWA tokenization platforms"],
    ["/vendors/crypto-custody-providers", "Institutional crypto custodians"],
    ["/vendors/legal-regulatory-vendors", "Digital asset legal and regulatory vendors"]
  ];

  if (/custody|wallet/.test(slug)) {
    links = [
      ["/vendors/tokenization-platforms", "Enterprise-grade tokenization platforms"],
      ["/vendors/security-audit-companies", "Blockchain security audit companies"],
      ["/vendors/compliance-infrastructure-providers", "Compliance infrastructure providers"]
    ];
  } else if (/fiat|stablecoin|payment/.test(slug)) {
    links = [
      ["/vendors/stablecoin-infrastructure-providers", "Stablecoin infrastructure providers"],
      ["/vendors/fiat-on-off-ramp-providers", "Fiat on and off-ramp providers"],
      ["/vendors/crypto-custody-providers", "Institutional crypto custodians"]
    ];
  } else if (/security|audit|compliance|kyc|identity/.test(slug)) {
    links = [
      ["/vendors/security-audit-companies", "Blockchain security audit companies"],
      ["/vendors/kyc-aml-providers", "KYC and AML providers"],
      ["/vendors/compliance-infrastructure-providers", "Compliance infrastructure providers"]
    ];
  } else if (/blockchain-development|smart-contract|node-|raas|appchain|defi/.test(slug)) {
    links = [
      ["/vendors/blockchain-development-companies", "Blockchain development companies"],
      ["/vendors/smart-contract-development-companies", "Smart contract development companies"],
      ["/vendors/node-as-a-service-rpc-providers", "Node and RPC infrastructure providers"]
    ];
  } else if (/ai-/.test(slug)) {
    links = [
      ["/ai-vendors", "AI vendor ecosystem"],
      ["/vendors/ai-infrastructure-providers", "AI infrastructure providers"],
      ["/vendors/compliance-infrastructure-providers", "Compliance infrastructure providers"]
    ];
  }

  const oldNav = `<nav class="related-vendor-directories" aria-label="Related vendor directories"><p class="eyebrow">Continue comparing</p><h2>Related vendor directories</h2><div>${links.map(([href, label]) => `<a href="${href}">${label}<span aria-hidden="true">→</span></a>`).join("")}</div></nav>`;
  if (/^vendors\/(?:ai-|decentralized-ai-|verifiable-ai-)/.test(slug)) return oldNav;

  const category = slug.split("/")[1];
  const isTokenization = category === "tokenization-platforms";
  const guides: Record<string, [string, string]> = {
    "custody-solutions": ["/blog/crypto-custody-insurance-coverage-due-diligence", "Understand custody insurance exclusions"],
    "fiat-on-off-ramps": ["/blog/moonpay-vs-transak-vs-banxa-fiat-on-ramp-providers", "Compare ramp onboarding and integrations"],
    "payments-stablecoins": ["/blog/white-label-crypto-payment-gateway-buyer-guide", "Read the crypto payment gateway buyer guide"],
    "security-audits": ["/blog/smart-contract-audit-security-requirements", "Prepare your smart contract audit scope"],
    "crypto-accounting-tax-software": ["/blog/taxbit-vs-ledgible-vs-lukka-enterprise-crypto-accounting-tax", "Compare crypto tax and accounting tools"],
    "institutional-digital-asset-trading-platforms": ["/blog/talos-vs-wyden-vs-finery-markets-institutional-trading", "Compare institutional trading platforms"],
    "node-as-a-service-rpc": ["/blog/alchemy-vs-quicknode-vs-infura-rpc-node-providers", "Compare RPC providers"],
  };
  const guide = guides[category];
  const resourceLinks = isTokenization ? [
    ["/blog/top-tokenization-companies-2026", "Explore tokenization providers"],
    ["/blog/asset-tokenization-platform-comparison", "Use the procurement checklist"],
    ["/blog/rwa-tokenization-platform-rfp-template", "Get the tokenization RFP template"],
    ["/blog/tokenization-platforms-vs-tokenization-service-providers", "Compare software and implementation services"],
    ["/network-explorer/research/tokenized-fund-infrastructure-october-2026#october-findings", "See who supports tokenized funds"],
  ] : [
    ...(guide ? [guide] : []),
    ["/tools/vendor-comparison", "Compare vendors side by side"],
    ...links.filter(([href]) => fileForRoute(href.slice(1)) !== file),
  ];
  const intro = isTokenization
    ? "Start with your asset, where you plan to issue it, and where your investors are based. Then decide which integrations and ongoing servicing you need the provider to handle."
    : "Write down what the provider needs to deliver and what your team will handle. Ask each candidate for a written scope, a pricing breakdown and a reference for similar work.";

  return `<section class="vendor-buyer-resources" aria-labelledby="vendor-buyer-heading">
    <div class="vendor-buyer-layout">
      <div>
        <h2 id="vendor-buyer-heading">${isTokenization ? "Build your tokenization shortlist" : "Build your vendor shortlist"}</h2>
        <p>${intro}</p>
        <p class="vendor-buyer-note">${isTokenization ? "Confirm licensing, eligibility and service scope with each provider before you shortlist." : "Ready to share your brief? <a href='/submit-requirement'>Submit your project requirements</a>."}</p>
      </div>
      <ul aria-label="Shortlisting resources">${resourceLinks.map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join("")}</ul>
    </div>
    <div class="vendor-buyer-contact">
      <span>For providers: <a href="/vendor-membership?source=${isTokenization ? "tokenization-directory" : "web3-category-directory"}">Submit your company for review</a></span>
      <a href="mailto:contact@fluidrwa.com">contact@fluidrwa.com</a>
    </div>
  </section>`;
}

const sureStackSecurityCard = `<article class="bc-company-card reveal vendor-card--vetted" id="surestack" itemscope itemtype="https://schema.org/Organization" data-search="surestack surestack technology group vetted risk management security provider ai powered web3 risk intelligence threat monitoring digital asset security tokenization security vulnerability detection atlas intelligence crypto risk security infrastructure risk management global"><div class="bc-company-top bc-company-top--vetted"><div class="bc-company-mark bc-company-mark--logo" aria-hidden="true"><img src="/assets/company-logos/surestack.png" alt="" loading="lazy" decoding="async"></div><div><p class="bc-company-index">01 / Vetted Risk Management &amp; Security Provider</p><h3 itemprop="name">SureStack</h3><span class="bc-vetted-badge">Vetted</span></div></div><p class="bc-best-fit"><strong>Best for:</strong> Digital asset issuers, tokenization teams, funds and Web3 operators that need AI-powered risk intelligence, threat monitoring and proactive security visibility before launch or while scaling.</p><p itemprop="description">SureStack Technology Group is an AI-powered Web3 risk intelligence platform focused on detecting vulnerabilities, monitoring risk signals and helping teams protect digital asset operations before threats hit the chain.</p><details class="bc-provider-details"><summary>Read provider intelligence</summary><p>SureStack strengthens the security and risk-management layer for teams building tokenized asset workflows, protocol infrastructure and digital asset operations. The company positions Atlas Intelligence around proactive threat reporting, vulnerability detection and operational risk protection. FluidRWA lists SureStack as a vetted risk management and security provider based on submitted vendor information; buyers should still verify scope, coverage, response workflows and commercial terms during diligence.</p></details><dl class="bc-company-meta"><div><dt>HQ</dt><dd>Newark, Delaware, United States</dd></div><div><dt>Founded</dt><dd>Not disclosed</dd></div><div><dt>Services</dt><dd>Web3 Risk Intelligence, Threat Monitoring, Digital Asset Security, Tokenization Risk Management</dd></div><div><dt>Coverage</dt><dd>Global</dd></div></dl><div class="bc-company-tags"><span>Vetted</span><span>Risk Intelligence</span><span>Threat Monitoring</span><span>Digital Asset Security</span><span>Tokenization Security</span><span>Atlas Intelligence</span></div><div class="bc-company-actions"><a class="btn btn-primary light-primary" href="https://surestack.tech/" target="_blank" rel="noopener noreferrer">Visit Website</a><a class="btn btn-soft" href="/submit-requirement?vendor=SureStack&amp;category=Security%20Audit%20Companies&amp;source=vendor-card">Request Intro</a></div></article>`;

const sailoSecurityCard = `<article class="bc-company-card reveal" id="sailo-technologies" itemscope itemtype="https://schema.org/Organization" data-search="sailo technologies blockchain security know your risk active proactive protection before incidents risk management money-back guarantee mica readiness dora readiness howden bullet blockchain security infrastructure risk management global"><div class="bc-company-top"><div class="bc-logo-mark" aria-hidden="true">ST</div><div><p class="bc-company-index">30 / Proactive Blockchain Risk Protection</p><h3 itemprop="name">Sailo Technologies</h3></div></div><p class="bc-best-fit"><strong>Best for:</strong> Web3, DeFi and digital asset teams seeking active risk protection designed to identify and reduce exposure before incidents occur</p><p itemprop="description">Sailo Technologies positions itself as a blockchain-security and risk-protection provider focused on Know Your Risk and active protection before an incident, with a company-reported money-back guarantee.</p><details class="bc-provider-details"><summary>Read provider intelligence</summary><p>Sailo says its approach is built around proactive risk protection rather than post-incident response. The company reports MiCA and DORA readiness and names HOWDEN and Bullet Blockchain as client or partner references. Teams should independently verify the scope of protection, guarantee terms, regulatory-readiness claims and partner relationships during diligence.</p></details><dl class="bc-company-meta"><div><dt>Services</dt><dd>Security Infrastructure &amp; Risk Management, Proactive Risk Protection</dd></div><div><dt>Coverage</dt><dd>Global</dd></div><div><dt>Compliance</dt><dd>MiCA &amp; DORA readiness (company-reported)</dd></div><div><dt>References</dt><dd>HOWDEN, Bullet Blockchain (company-reported)</dd></div></dl><div class="bc-company-tags"><span>Know Your Risk</span><span>Proactive Protection</span><span>Risk Management</span><span>MiCA Readiness</span><span>DORA Readiness</span><span>Money-Back Guarantee</span></div></article>`;

const sailoEcosystemSection = `<section class="vendor-category-block" id="security" aria-labelledby="security-title" data-category-section="security"><div class="vendor-category-head"><div><p class="eyebrow light-eyebrow">1 vendor</p><h2 id="security-title">Security &amp; Audits</h2></div><p>Blockchain security, proactive risk protection, smart contract audits and incident-prevention partners</p></div><div class="vendor-grid" data-vendor-grid><article class="vendor-card reveal" id="sailo-technologies" itemscope itemtype="https://schema.org/Organization" data-category="security" data-search="sailo technologies blockchain security know your risk active proactive protection before incidents risk management money-back guarantee mica readiness dora readiness howden bullet blockchain security audits security and audits"><div class="vendor-card-top"><p>Security &amp; Audits</p></div><h3 itemprop="name">Sailo Technologies</h3><p class="vendor-description" itemprop="description">Blockchain-security and risk-protection provider focused on Know Your Risk and active protection before incidents, with a company-reported money-back guarantee.</p><div class="vendor-meta"><span><b>Compliance</b> <em>MiCA &amp; DORA readiness (company-reported)</em></span><span><b>References</b> <em>HOWDEN, Bullet Blockchain (company-reported)</em></span></div><div class="vendor-tags" aria-label="Sailo Technologies tags"><span>Know Your Risk</span><span>Proactive Protection</span><span>Risk Management</span></div></article></div></section>`;

function renumberSecurityCards(html: string) {
  let count = 1;
  return html.replace(/<p class="bc-company-index">(\d{2}) \//g, () => {
    count += 1;
    return `<p class="bc-company-index">${String(count).padStart(2, "0")} /`;
  });
}

function ensureSecurityVendorPlacement(file: string, html: string) {
  let nextHtml = html;

  if (file === "vendors/security-audits/index.html" && !nextHtml.includes('id="surestack"')) {
    nextHtml = renumberSecurityCards(nextHtml);
    nextHtml = nextHtml.replace(
      /(<div class="bc-company-grid"[^>]*>)/,
      `$1${sureStackSecurityCard}`
    );
  }

  if (nextHtml.includes("Sailo Technologies")) return nextHtml;

  if (file === "vendors/security-audits/index.html") {
    return nextHtml.replace(
      /(<\/article><\/div><\/div><\/section><section class="bc-section" aria-labelledby="faq-title">)/,
      `</article>${sailoSecurityCard}</div></div></section><section class="bc-section" aria-labelledby="faq-title">`
    );
  }

  if (file === "vendor-ecosystem.html") {
    return nextHtml
      .replace(/(<a href="#all" data-filter="all" class="is-active"><span>All vendors<\/span><strong>)(?:256|257|276)(<\/strong><\/a>)/, "$11,000+$2")
      .replace(/<p class="vendor-result-count" aria-live="polite">[\s\S]*?<\/p>/, "")
      .replace(
        /(<\/section>\s*<section class="vendor-category-block" id="exchanges")/,
        `${sailoEcosystemSection}$1`
      );
  }

  return nextHtml;
}

function ensureSecurityVendorSchema(file: string, items: unknown[]) {
  if (file !== "vendors/security-audits/index.html" && file !== "vendor-ecosystem.html") return items;

  const serializedItems = JSON.stringify(items);
  const additions = [];

  if (!serializedItems.includes("SureStack")) {
    additions.push({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "SureStack",
      url: "https://surestack.tech/",
      description:
        "AI-powered Web3 risk intelligence platform focused on vulnerability detection, threat monitoring and proactive digital asset security for tokenization and Web3 teams.",
      additionalType: "Vetted Risk Management & Security Provider",
      knowsAbout: [
        "Web3 Risk Intelligence",
        "Threat Monitoring",
        "Digital Asset Security",
        "Tokenization Security",
        "Atlas Intelligence",
        "Risk Management"
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Newark",
        addressRegion: "DE",
        addressCountry: "USA"
      }
    });
  }

  if (!serializedItems.includes("Sailo Technologies")) {
    additions.push({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Sailo Technologies",
      url: "https://sailo.tech/",
      description:
        "Blockchain-security and risk-protection provider focused on Know Your Risk and active protection before incidents, with a company-reported money-back guarantee.",
      additionalType: "Security & Audits",
      knowsAbout: [
        "Know Your Risk",
        "Proactive Risk Protection",
        "Blockchain Security",
        "Web3 Risk Management",
        "MiCA Readiness",
        "DORA Readiness"
      ],
      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: "Company-reported compliance readiness",
          value: "MiCA and DORA readiness"
        },
        {
          "@type": "PropertyValue",
          name: "Company-reported clients and partners",
          value: "HOWDEN and Bullet Blockchain"
        }
      ]
    });
  }

  return additions.length ? [...additions, ...items] : items;
}

function rewriteLinks(html: string) {
  return html
    .replaceAll('href="index.html"', 'href="/"')
    .replaceAll('href="/index.html"', 'href="/"')
    .replaceAll('href="blog.html"', 'href="/blog"')
    .replaceAll('href="/blog.html"', 'href="/blog"')
    .replaceAll('href="vendor-ecosystem.html"', 'href="/web3vendorecosystem"')
    .replaceAll('href="/vendor-ecosystem.html"', 'href="/web3vendorecosystem"')
    .replaceAll('href="/vendor-ecosystem"', 'href="/web3vendorecosystem"')
    .replaceAll('href="solutions.html"', 'href="/solutions"')
    .replaceAll('href="/solutions.html"', 'href="/solutions"')
    .replaceAll('href="team.html"', 'href="/about"')
    .replaceAll('href="/team.html"', 'href="/about"')
    .replaceAll('href="contact.html"', 'href="/contact"')
    .replaceAll('href="/contact.html"', 'href="/contact"')
    .replaceAll('href="about.html"', 'href="/about"')
    .replaceAll('href="/about.html"', 'href="/about"')
    .replaceAll('href="submit-project.html"', 'href="/submit-requirement"')
    .replaceAll('href="/submit-project.html"', 'href="/submit-requirement"')
    .replaceAll('href="/submit-project"', 'href="/submit-requirement"')
    .replace(/href=["'](?:\.\.\/)+submit-project\.html(["'])/g, 'href="/submit-requirement$1')
    .replaceAll('href="apply-as-vendor.html"', 'href="/apply-as-vendor"')
    .replaceAll('href="/apply-as-vendor.html"', 'href="/apply-as-vendor"')
    .replaceAll('href="arcade.html"', 'href="/arcade"')
    .replaceAll('href="/arcade.html"', 'href="/arcade"')
    .replaceAll('href="privacy.html"', 'href="/privacy"')
    .replaceAll('href="/privacy.html"', 'href="/privacy"')
    .replaceAll('href="terms.html"', 'href="/terms"')
    .replaceAll('href="/terms.html"', 'href="/terms"')
    .replaceAll('href="refund-cancellation.html"', 'href="/refund-cancellation"')
    .replaceAll('href="/refund-cancellation.html"', 'href="/refund-cancellation"')
    .replaceAll('href="shipping-delivery.html"', 'href="/shipping-delivery"')
    .replaceAll('href="/shipping-delivery.html"', 'href="/shipping-delivery"')
    .replaceAll('href="vendor-membership.html"', 'href="/vendor-membership"')
    .replaceAll('href="/vendor-membership.html"', 'href="/vendor-membership"')
    .replaceAll('href="vendor-membership.html#pricing"', 'href="/vendor-membership"')
    .replaceAll('href="/vendor-membership.html#pricing"', 'href="/vendor-membership"')
    .replace(/href=["'](?:\.\.\/)*vendors\/([^"']+)\/index\.html(["'])/g, (_, slug, quote) => `href="/vendors/${preferredVendorLinks[slug] || slug}${quote}`)
    .replace(/href=["']vendors\/([^"']+)\/index\.html(["'])/g, (_, slug, quote) => `href="/vendors/${preferredVendorLinks[slug] || slug}${quote}`)
    .replace(/href=["']\/vendors\/([^"'#\/]+)\/?(["'#])/g, (_, slug, quote) => `href="/vendors/${preferredVendorLinks[slug] || slug}${quote}`)
    .replace(/href=["'](?:\.\.\/)*blog\/([^"']+)\/index\.html(["'])/g, 'href="/blog/$1$2')
    .replace(/src=["']assets\//g, 'src="/assets/')
    .replace(/href=["']assets\//g, 'href="/assets/');
}
