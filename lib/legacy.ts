import fs from "./contentFs";
import path from "node:path";
import type { Metadata } from "next";
import { siteUrl } from "./routes";
import { legacyVendorFallbackHtml, legacyVendorFallbackJsonLd } from "./vendorFallbacks";

const root = process.cwd();
const defaultSocialImage = `${siteUrl}/assets/social/fluidrwa-preview.jpg`;
type SeoOverride = {
  title: string;
  description: string;
  heading?: string;
};

const seoOverrides: Record<string, SeoOverride> = {
  "blog/top-tokenization-companies-2026/index.html": {
    title: "10 RWA Tokenization Platforms Compared (2026)",
    description: "Compare 10 RWA tokenization platforms by issuer fit, compliance, custody, lifecycle support and institutional use case. Reviewed September 2026.",
    heading: "Choose the right RWA tokenization platform"
  },
  "blog/moonpay-vs-transak-vs-banxa-fiat-on-ramp-providers/index.html": {
    title: "MoonPay vs Transak vs Banxa (2026): Fees, API & Fit",
    description: "Compare MoonPay, Transak and Banxa by country coverage, payment methods, KYC, on/off-ramp APIs, checkout options and buyer fit.",
    heading: "MoonPay, Transak or Banxa?"
  },
  "blog/akash-vs-io-net-vs-aethir-decentralized-gpu-compute/index.html": {
    title: "Akash vs io.net vs Aethir (2026): GPU Compute Compared",
    description: "Compare Akash, io.net and Aethir for AI training, inference, GPU supply, containers, pricing considerations and enterprise workloads.",
    heading: "Akash, io.net or Aethir?"
  },
  "blog/chainalysis-vs-trm-vs-elliptic-blockchain-analytics/index.html": {
    title: "Chainalysis vs TRM Labs vs Elliptic (2026)",
    description: "Compare Chainalysis, TRM Labs and Elliptic for wallet screening, KYT, investigations, sanctions controls and compliance operations.",
    heading: "Chainalysis, TRM Labs or Elliptic?"
  },
  "blog/alchemy-vs-quicknode-vs-infura-rpc-node-providers/index.html": {
    title: "Alchemy vs QuickNode vs Infura (2026): RPC Compared",
    description: "Compare Alchemy, QuickNode and Infura by chain coverage, RPC and archive access, APIs, webhooks, reliability and developer fit.",
    heading: "Alchemy, QuickNode or Infura?"
  },
  "blog/anchorage-digital-vs-bitgo-vs-fireblocks-institutional-custody/index.html": {
    title: "Anchorage vs BitGo vs Fireblocks (2026): Custody Compared",
    description: "Compare regulated custody, MPC wallet controls, staking, settlement, recovery and operating responsibility for institutional buyers.",
    heading: "Anchorage, BitGo or Fireblocks?"
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
    title: "Asset Tokenization Platforms Compared: 2026 Buyer Guide",
    description: "Compare asset tokenization platforms by asset type, compliance, investor workflows, custody, distribution, reporting and lifecycle fit.",
    heading: "Compare asset tokenization platforms"
  },
  "vendors/tokenization-platforms/index.html": {
    title: "11 RWA Tokenization Platforms Compared (2026)",
    description: "Compare 11 RWA tokenization platforms by issuance, compliance, custody, transfer controls and lifecycle support. Built for issuer shortlisting."
  },
  "vendors/custody-solutions/index.html": {
    title: "28 Institutional Crypto Custody Providers (2026)",
    description: "Compare 28 custody and wallet providers by regulatory model, MPC controls, cold storage, staking, DeFi access and institutional fit."
  },
  "vendors/blockchain-development/index.html": {
    title: "30 Blockchain Development Companies Compared (2026)",
    description: "Compare 30 blockchain development companies by Web3 and RWA specialty, delivery model, security approach and project fit."
  },
  "vendors/fiat-on-off-ramps/index.html": {
    title: "29 Fiat On/Off-Ramp Providers Compared (2026)",
    description: "Compare 29 fiat ramp providers by country coverage, payment methods, KYC, APIs, settlement, stablecoin support and product fit."
  },
  "vendors/payments-stablecoins/index.html": {
    title: "30 Stablecoin Infrastructure Providers Compared (2026)",
    description: "Compare 30 stablecoin providers by issuance, payments, settlement, treasury, compliance, integrations and enterprise use case."
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
  const fullPath = path.join(root, file);
  if (!fullPath.startsWith(root) || !fs.existsSync(fullPath)) return null;
  return fs.readFileSync(fullPath, "utf8");
}

function shouldShowWeb3VettedBadges(file: string) {
  if (file === "vendor-ecosystem.html") return true;
  return file.startsWith("vendors/");
}

function addVettedBadgeToVendorCard(cardHtml: string) {
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
  const ogImage = file.startsWith("blog/") && parsedOgImage ? parsedOgImage : defaultSocialImage;
  const canonical = `${siteUrl}${canonicalPath === "/" ? "" : canonicalPath}`;
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
      images: [{ url: ogImage.startsWith("/") ? `${siteUrl}${ogImage}` : ogImage, width: 1200, height: 630 }],
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.startsWith("/") ? `${siteUrl}${ogImage}` : ogImage]
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
  const fallback = legacyVendorFallbackJsonLd(file, siteUrl);
  const withFallback = fallback ? [...parsed, fallback] : parsed;
  const normalized = JSON.parse(normalizeEditorialText(JSON.stringify(withFallback)));
  const override = seoOverrides[file];
  if (override) {
    for (const block of normalized) {
      const entries = block?.["@graph"] || [block];
      for (const entry of entries) {
        if (entry?.["@type"] === "Article") entry.headline = override.title;
        if (entry?.["@type"] === "CollectionPage") entry.name = override.title;
        if (entry?.["@type"] === "Article" || entry?.["@type"] === "CollectionPage") {
          entry.description = override.description;
          entry.dateModified = "2026-09-16";
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
          "@type": "Person",
          name: "Shefali Sharma",
          jobTitle: "Co-Founder and CMO, FluidRWA",
          url: `${siteUrl}/about`,
          image: `${siteUrl}/assets/shefali-sharma.webp`,
          sameAs: "https://www.linkedin.com/in/shefali-sharma-86403a67/"
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
    if (Array.isArray(items)) {
      const zoniqxIndex = items.findIndex((item: { item?: { name?: string } }) => item?.item?.name === "Zoniqx");
      if (zoniqxIndex >= 0 && items.length >= 9) {
        const [zoniqx] = items.splice(zoniqxIndex, 1);
        items.splice(8, 0, zoniqx);
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

  enhanced = enhanced.replace(
    /<p class="reviewed-line">Reviewed and updated by FluidRWA\s*·\s*([^<]+)<\/p>/i,
    '<p class="reviewed-line">Reviewed by <a href="/about">FluidRWA Research Team</a> · $1</p>'
  );
  if (override) {
    enhanced = enhanced.replace(
      /(<p class="reviewed-line">Reviewed by <a href="\/about">FluidRWA Research Team<\/a>\s*·\s*)[^<]+(<\/p>)/i,
      "$1September 16, 2026$2"
    );
  }

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
      const conciseChecklist = `<section class="procurement-checklist" aria-labelledby="validate-shortlist"><h2 id="validate-shortlist">How to validate the shortlist</h2><ol><li>Test the hardest production workflow with realistic volume, failure and recovery scenarios.</li><li>Confirm which features are generally available, partner-delivered or dependent on a separate contract.</li><li>Price implementation, usage, support, overages and exit work, not only the subscription.</li><li>Verify security scope, data handling, incident response, service levels and named delivery staff.</li><li>Require usable exports for configuration, records and logs before signing.</li></ol><p>Use these checks as procurement prompts, then validate regulatory and contractual conclusions with qualified advisers.</p></section>`;
      enhanced = `${enhanced.slice(0, genericStart)}${conciseChecklist}${enhanced.slice(faqStart)}`;
      for (const id of removedIds) {
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
  const fallbackDirectory = badgedBodyHtml.includes("bc-company-card") ? "" : legacyVendorFallbackHtml(file);
  let renderedHtml = fallbackDirectory ? `${badgedBodyHtml}\n${fallbackDirectory}` : badgedBodyHtml;
  renderedHtml = normalizeEditorialText(renderedHtml);
  renderedHtml = enhanceBlogDecisionPage(file, renderedHtml);
  renderedHtml = normalizeVendorCategoryCounts(renderedHtml);
  if (file === "vendors/tokenization-platforms/index.html") renderedHtml = moveZoniqxToNinth(renderedHtml);
  renderedHtml = renderedHtml.replace(/<p>(<a href="\/downloads\/fluidrwa-buyer-brief\.txt"[\s\S]*?)<\/p>/g,
    (_match, links: string) => `<div class="buyer-guide-actions">${links.replace(/ · /g, "")}</div>`);
  const buyerCategories: Record<string, string> = {
    "vendors/custody-solutions/index.html": "Custody and wallets",
    "vendors/tokenization-platforms/index.html": "Tokenization platform",
    "vendors/blockchain-development/index.html": "Blockchain development",
    "vendors/smart-contract-development/index.html": "Smart contract development",
    "vendors/fiat-on-off-ramps/index.html": "Payments and stablecoins",
    "blog/top-tokenization-companies-2026/index.html": "Tokenization platform"
  };
  const buyerCategory = buyerCategories[file];
  if (buyerCategory && !file.startsWith("vendors/")) {
    const briefHref = `/submit-requirement?category=${encodeURIComponent(buyerCategory)}&amp;source=buyer-guide`;
    const nextSteps = `<aside class="buyer-next-step" aria-label="Plan your next step"><div class="buyer-next-step-copy"><p class="buyer-next-step-kicker">Buyer support</p><h2>Find the right providers for your project</h2><p>Already defining your requirements? Share your project brief. Still exploring tokenization? Start with the free readiness assessment.</p></div><div class="buyer-next-step-actions"><a class="buyer-next-step-primary" href="${briefHref}">Submit project requirements</a><a class="buyer-next-step-secondary" href="/tokenization-readiness-assessment-tool">Check tokenization readiness</a></div></aside>`;
    renderedHtml = renderedHtml.replace(/<\/section>/i, `</section>${nextSteps}`);
  }
  if (file === "vendor-ecosystem.html") {
    const index = html.match(/<script id="vendor-search-index-data" type="application\/json">([\s\S]*?)<\/script>/)?.[1];
    if (index) {
      const parsed = JSON.parse(decodeHtmlEntities(index));
      const safeJson = JSON.stringify(parsed).replace(/</g, "\\u003c");
      renderedHtml += `<script id="vendor-search-index-data" type="application/json">${safeJson}</script>`;
    }
  }
  renderedHtml += relatedVendorDirectories(file);
  if (file.startsWith("vendors/") || file === "vendor-ecosystem.html") {
    renderedHtml += `<aside class="directory-disclosure" aria-label="Directory disclosure"><strong>How listings, logos and counts work</strong><p>FluidRWA organizes companies for discovery and comparison. Company names and logos are shown for identification only; inclusion does not imply endorsement. The 1,000+ vendor count includes Web3 and AI listings plus vendors tracked across blockchain-project ecosystems, and a company may appear in more than one relevant category. Vetted indicates that a listing has passed our baseline review. Vetted Plus is reserved for companies that complete FluidRWA's enhanced review process. No company currently holds Vetted Plus status. Buyers should complete their own diligence.</p></aside><p class="page-last-updated">Last updated: September 16, 2026</p>`;
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

function moveZoniqxToNinth(html: string) {
  const gridPattern = /(<div class="bc-company-grid"[^>]*>)([\s\S]*?)(<\/div>\s*<\/div>\s*<\/section>)/;
  return html.replace(gridPattern, (_match, open: string, content: string, close: string) => {
    const cards = content.match(/<article class="bc-company-card[\s\S]*?<\/article>/g) || [];
    const zoniqxIndex = cards.findIndex((card) => card.includes('id="zoniqx"'));
    if (zoniqxIndex < 0 || cards.length < 9) return `${open}${content}${close}`;
    const [zoniqx] = cards.splice(zoniqxIndex, 1);
    cards.splice(8, 0, zoniqx);
    return `${open}${cards.map((card, index) => card.replace(/<p class="bc-company-index">\d{2} \/ /, `<p class="bc-company-index">${String(index + 1).padStart(2, "0")} / `)).join("")}${close}`;
  });
}

function relatedVendorDirectories(file: string) {
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

  return `<nav class="related-vendor-directories" aria-label="Related vendor directories"><p class="eyebrow">Continue comparing</p><h2>Related vendor directories</h2><div>${links.map(([href, label]) => `<a href="${href}">${label}<span aria-hidden="true">→</span></a>`).join("")}</div></nav>`;
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
