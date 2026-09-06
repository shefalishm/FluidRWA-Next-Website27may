import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { siteUrl } from "./routes";
import { legacyVendorFallbackHtml, legacyVendorFallbackJsonLd } from "./vendorFallbacks";

const root = process.cwd();
const defaultSocialImage = `${siteUrl}/assets/social/fluidrwa-preview.jpg`;
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
  if (!file.startsWith("vendors/")) return false;
  const category = file.split("/")[1] || "";
  if (category.startsWith("ai-")) return false;
  return ![
    "decentralized-ai-compute-gpu-infrastructure",
    "verifiable-ai-smart-contract-infrastructure"
  ].includes(category);
}

function addVettedBadgeToVendorCard(cardHtml: string) {
  if (cardHtml.includes('class="bc-vetted-badge"') || cardHtml.includes('class="vendor-vetted-badge"')) {
    return cardHtml;
  }
  return cardHtml.replace(/(<h3\b[^>]*>[\s\S]*?<\/h3>)/i, '$1<span class="bc-vetted-badge">Vetted</span>');
}

function addWeb3VettedBadges(file: string, html: string) {
  if (!shouldShowWeb3VettedBadges(file)) return html;
  return html
    .replace(/<article class="bc-company-card[\s\S]*?<\/article>/g, addVettedBadgeToVendorCard)
    .replace(/<article class="vendor-card[\s\S]*?<\/article>/g, addVettedBadgeToVendorCard);
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
  const title = matchTag(html, /<title>([\s\S]*?)<\/title>/i) || "FluidRWA";
  const description =
    matchTag(html, /<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']\s*\/?>/i) ||
    matchTag(html, /<meta\s+property=["']og:description["']\s+content=["']([\s\S]*?)["']\s*\/?>/i) ||
    "FluidRWA helps teams discover Web3, RWA and digital asset infrastructure vendors.";
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
  return ensureSecurityVendorSchema(file, withFallback);
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
  const buyerCategories: Record<string, string> = {
    "vendors/custody-solutions/index.html": "Custody and wallets",
    "vendors/tokenization-platforms/index.html": "Tokenization platform",
    "vendors/blockchain-development/index.html": "Blockchain development",
    "vendors/smart-contract-development/index.html": "Smart contract development",
    "vendors/fiat-on-off-ramps/index.html": "Payments and stablecoins",
    "blog/top-tokenization-companies-2026/index.html": "Tokenization platform"
  };
  const buyerCategory = buyerCategories[file];
  if (buyerCategory) {
    const briefHref = `/submit-requirement?category=${encodeURIComponent(buyerCategory)}&amp;source=buyer-guide`;
    const nextSteps = `<aside aria-label="Plan your next step" style="max-width:1200px;margin:24px auto;padding:24px;box-sizing:border-box;border-top:1px solid #dce4eb;border-bottom:1px solid #dce4eb"><h2 style="font-size:24px;line-height:1.3;margin:0 0 12px">Find the right providers for your project</h2><p style="font-size:17px;line-height:1.6;margin:0 0 16px">Already defining your requirements? Share your project brief. Still exploring tokenization? Start with the free readiness assessment.</p><div style="display:flex;flex-wrap:wrap;gap:16px"><a href="${briefHref}">Submit project requirements</a><a href="/tokenization-readiness-assessment-tool">Check tokenization readiness</a></div></aside>`;
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
  return pageStyles ? `${pageStyles}\n${renderedHtml}` : renderedHtml;
}

const sureStackSecurityCard = `<article class="bc-company-card reveal vendor-card--vetted" id="surestack" itemscope itemtype="https://schema.org/Organization" data-search="surestack surestack technology group vetted risk management security partner ai powered web3 risk intelligence threat monitoring digital asset security tokenization security vulnerability detection atlas intelligence crypto risk security infrastructure risk management global"><div class="bc-company-top bc-company-top--vetted"><div class="bc-company-mark bc-company-mark--logo" aria-hidden="true"><img src="/assets/company-logos/surestack.png" alt="" loading="lazy" decoding="async"></div><div><p class="bc-company-index">01 / Vetted Risk Management &amp; Security Partner</p><h3 itemprop="name">SureStack</h3><span class="bc-vetted-badge">Vetted</span></div></div><p class="bc-best-fit"><strong>Best for:</strong> Digital asset issuers, tokenization teams, funds and Web3 operators that need AI-powered risk intelligence, threat monitoring and proactive security visibility before launch or while scaling.</p><p itemprop="description">SureStack Technology Group is an AI-powered Web3 risk intelligence platform focused on detecting vulnerabilities, monitoring risk signals and helping teams protect digital asset operations before threats hit the chain.</p><details class="bc-provider-details"><summary>Read provider intelligence</summary><p>SureStack strengthens the security and risk-management layer for teams building tokenized asset workflows, protocol infrastructure and digital asset operations. The company positions Atlas Intelligence around proactive threat reporting, vulnerability detection and operational risk protection. FluidRWA lists SureStack as a vetted risk management and security partner based on the submitted partnership and vendor information; buyers should still verify scope, coverage, response workflows and commercial terms during diligence.</p></details><dl class="bc-company-meta"><div><dt>HQ</dt><dd>Newark, Delaware, United States</dd></div><div><dt>Founded</dt><dd>Not disclosed</dd></div><div><dt>Services</dt><dd>Web3 Risk Intelligence, Threat Monitoring, Digital Asset Security, Tokenization Risk Management</dd></div><div><dt>Coverage</dt><dd>Global</dd></div></dl><div class="bc-company-tags"><span>Vetted Partner</span><span>Risk Intelligence</span><span>Threat Monitoring</span><span>Digital Asset Security</span><span>Tokenization Security</span><span>Atlas Intelligence</span></div><div class="bc-company-actions"><a class="btn btn-primary light-primary" href="https://surestack.tech/" target="_blank" rel="noopener noreferrer">Visit Website</a><a class="btn btn-soft" href="/submit-requirement?vendor=SureStack&amp;category=Security%20Audit%20Companies&amp;source=vendor-card">Request Intro</a></div></article>`;

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
      .replace(/(<a href="#all" data-filter="all" class="is-active"><span>All vendors<\/span><strong>)(?:256|257)(<\/strong><\/a>)/, "$11,000+$2")
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
      additionalType: "Vetted Risk Management & Security Partner",
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
    .replace(/href=["'](?:\.\.\/)*vendors\/([^"']+)\/index\.html(["'])/g, (_, slug, quote) => `href="/vendors/${preferredVendorLinks[slug] || slug}${quote}`)
    .replace(/href=["']vendors\/([^"']+)\/index\.html(["'])/g, (_, slug, quote) => `href="/vendors/${preferredVendorLinks[slug] || slug}${quote}`)
    .replace(/href=["']\/vendors\/([^"'#\/]+)\/?(["'#])/g, (_, slug, quote) => `href="/vendors/${preferredVendorLinks[slug] || slug}${quote}`)
    .replace(/href=["'](?:\.\.\/)*blog\/([^"']+)\/index\.html(["'])/g, 'href="/blog/$1$2')
    .replace(/src=["']assets\//g, 'src="/assets/')
    .replace(/href=["']assets\//g, 'href="/assets/');
}
