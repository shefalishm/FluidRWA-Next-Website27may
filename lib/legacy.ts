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
  return ensureSailoVendorSchema(file, withFallback);
}

export function legacyMainHtml(file: string) {
  const html = readLegacy(file);
  if (!html) return null;
  const pageStyles = [...html.matchAll(/<style[^>]*>[\s\S]*?<\/style>/gi)].map((match) => match[0]).join("\n");
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1] || html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] || html;
  const bodyHtml = ensureSailoVendorPlacement(file, rewriteLinks(main)
    .replace(/<header[\s\S]*?<\/header>/gi, "")
    .replace(/<footer[\s\S]*?<\/footer>/gi, "")
    .replace(/<script\b(?![^>]*type=["']application\/ld\+json["'])[\s\S]*?<\/script>/gi, ""));
  const fallbackDirectory = bodyHtml.includes("bc-company-card") ? "" : legacyVendorFallbackHtml(file);
  const renderedHtml = fallbackDirectory ? `${bodyHtml}\n${fallbackDirectory}` : bodyHtml;
  return pageStyles ? `${pageStyles}\n${renderedHtml}` : renderedHtml;
}

const sailoSecurityCard = `<article class="bc-company-card reveal" id="sailo-technologies" itemscope itemtype="https://schema.org/Organization" data-search="sailo technologies blockchain security know your risk active proactive protection before incidents risk management money-back guarantee mica readiness dora readiness howden bullet blockchain security infrastructure risk management global"><div class="bc-company-top"><div class="bc-logo-mark" aria-hidden="true">ST</div><div><p class="bc-company-index">30 / Proactive Blockchain Risk Protection</p><h3 itemprop="name">Sailo Technologies</h3></div></div><p class="bc-best-fit"><strong>Best for:</strong> Web3, DeFi and digital asset teams seeking active risk protection designed to identify and reduce exposure before incidents occur</p><p itemprop="description">Sailo Technologies positions itself as a blockchain-security and risk-protection provider focused on Know Your Risk and active protection before an incident, with a company-reported money-back guarantee.</p><details class="bc-provider-details"><summary>Read provider intelligence</summary><p>Sailo says its approach is built around proactive risk protection rather than post-incident response. The company reports MiCA and DORA readiness and names HOWDEN and Bullet Blockchain as client or partner references. Teams should independently verify the scope of protection, guarantee terms, regulatory-readiness claims and partner relationships during diligence.</p></details><dl class="bc-company-meta"><div><dt>Services</dt><dd>Security Infrastructure &amp; Risk Management, Proactive Risk Protection</dd></div><div><dt>Coverage</dt><dd>Global</dd></div><div><dt>Compliance</dt><dd>MiCA &amp; DORA readiness (company-reported)</dd></div><div><dt>References</dt><dd>HOWDEN, Bullet Blockchain (company-reported)</dd></div></dl><div class="bc-company-tags"><span>Know Your Risk</span><span>Proactive Protection</span><span>Risk Management</span><span>MiCA Readiness</span><span>DORA Readiness</span><span>Money-Back Guarantee</span></div><a class="bc-company-link" href="https://sailo.tech/" target="_blank" rel="noopener noreferrer nofollow" itemprop="url">Visit Sailo Technologies</a></article>`;

const sailoEcosystemSection = `<section class="vendor-category-block" id="security" aria-labelledby="security-title" data-category-section="security"><div class="vendor-category-head"><div><p class="eyebrow light-eyebrow">1 vendor</p><h2 id="security-title">Security &amp; Audits</h2></div><p>Blockchain security, proactive risk protection, smart contract audits and incident-prevention partners</p></div><div class="vendor-grid" data-vendor-grid><article class="vendor-card reveal" id="sailo-technologies" itemscope itemtype="https://schema.org/Organization" data-category="security" data-search="sailo technologies blockchain security know your risk active proactive protection before incidents risk management money-back guarantee mica readiness dora readiness howden bullet blockchain security audits security and audits"><div class="vendor-card-top"><p>Security &amp; Audits</p><a href="https://sailo.tech/" target="_blank" rel="noopener noreferrer nofollow" itemprop="url" aria-label="Visit Sailo Technologies website">Visit</a></div><h3 itemprop="name">Sailo Technologies</h3><p class="vendor-description" itemprop="description">Blockchain-security and risk-protection provider focused on Know Your Risk and active protection before incidents, with a company-reported money-back guarantee.</p><div class="vendor-meta"><span><b>Compliance</b> <em>MiCA &amp; DORA readiness (company-reported)</em></span><span><b>References</b> <em>HOWDEN, Bullet Blockchain (company-reported)</em></span></div><div class="vendor-tags" aria-label="Sailo Technologies tags"><span>Know Your Risk</span><span>Proactive Protection</span><span>Risk Management</span></div></article></div></section>`;

function ensureSailoVendorPlacement(file: string, html: string) {
  if (html.includes("Sailo Technologies")) return html;

  if (file === "vendors/security-audits/index.html") {
    return html.replace(
      /(<\/article><\/div><\/div><\/section><section class="bc-section" aria-labelledby="faq-title">)/,
      `</article>${sailoSecurityCard}</div></div></section><section class="bc-section" aria-labelledby="faq-title">`
    );
  }

  if (file === "vendor-ecosystem.html") {
    return html
      .replace(/(<a href="#all" data-filter="all" class="is-active"><span>All vendors<\/span><strong>)256(<\/strong><\/a>)/, "$1257$3")
      .replace(/(<a href="#smartcontract" data-filter="smartcontract"><span>Smart Contract &amp; Dev<\/span><strong>)31(<\/strong><\/a>)/, '$130$3<a href="#security" data-filter="security"><span>Security &amp; Audits</span><strong>1</strong></a>')
      .replace(/(<p class="vendor-result-count" aria-live="polite"><strong data-vendor-count>)256(<\/strong> vendors shown<\/p>)/, "$1257$3")
      .replace(/(<p class="eyebrow light-eyebrow">)31 vendors(<\/p>\s*<h2 id="smartcontract-title">Smart Contract &amp; Dev<\/h2>)/, "$130 vendors$3")
      .replace(
        /(<\/section>\s*<section class="vendor-category-block" id="exchanges")/,
        `${sailoEcosystemSection}$1`
      );
  }

  return html;
}

function ensureSailoVendorSchema(file: string, items: unknown[]) {
  if (JSON.stringify(items).includes("Sailo Technologies")) return items;
  if (file !== "vendors/security-audits/index.html" && file !== "vendor-ecosystem.html") return items;

  return [
    ...items,
    {
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
    }
  ];
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
