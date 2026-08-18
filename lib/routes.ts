import path from "node:path";
import fs from "node:fs";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.fluidrwa.com";
export const chainProjectsBasePath = "/blockchain-projects";

export const staticRoutes = [
  { path: "", file: "index.html", title: "FluidRWA | Web3 Vendor Discovery" },
  { path: "vendor-ecosystem", file: "vendor-ecosystem.html", title: "Vendor Ecosystem | FluidRWA" },
  { path: "web3vendorecosystem", file: "vendor-ecosystem.html", title: "Web3 Vendor Ecosystem | FluidRWA" },
  { path: "solutions", file: "solutions.html", title: "Solutions | FluidRWA" },
  { path: "blog", file: "blog.html", title: "Insights | FluidRWA" },
  { path: "reports-research", file: "reports-research.html", title: "Digital Asset Reports and Research | FluidRWA" },
  { path: "ai-vendors", file: "ai-vendors/index.html", title: "AI Vendors for Web3 Teams | FluidRWA" },
  { path: "about", file: "team.html", title: "About FluidRWA" },
  { path: "team", file: "team.html", title: "Team | FluidRWA" },
  { path: "contact", file: "contact.html", title: "Contact FluidRWA" },
  { path: "submit-project", file: "submit-project.html", title: "Submit a Project | FluidRWA" },
  { path: "submit-requirement", file: "submit-project.html", title: "Submit Requirements | FluidRWA" },
  { path: "apply-as-vendor", file: "apply-as-vendor.html", title: "Apply as Vendor | FluidRWA" },
  { path: "vendor-membership", file: "vendor-membership.html", title: "FluidRWA Vendor Membership" },
  { path: "arcade", file: "arcade.html", title: "FluidRWA Arcade" },
  { path: "privacy", file: "privacy.html", title: "Privacy Policy | FluidRWA" },
  { path: "terms", file: "terms.html", title: "Terms & Conditions | FluidRWA" },
  { path: "refund-cancellation", file: "refund-cancellation.html", title: "Refund & Cancellation Policy | FluidRWA" },
  { path: "shipping-delivery", file: "shipping-delivery.html", title: "Delivery & Shipping Policy | FluidRWA" },
  { path: "tokenization", file: "tokenization.html", title: "Tokenization | FluidRWA" },
  { path: "compliance", file: "compliance.html", title: "Compliance | FluidRWA" },
  { path: "custody", file: "custody.html", title: "Custody | FluidRWA" },
  { path: "ai", file: "ai.html", title: "AI Infrastructure | FluidRWA" },
  { path: "providers", file: "providers.html", title: "Providers | FluidRWA" },
  { path: "industries/asset-managers", file: "industries/asset-managers.html", title: "Asset Managers | FluidRWA" },
  { path: "industries/financial-institutions", file: "industries/financial-institutions.html", title: "Financial Institutions | FluidRWA" },
  { path: "industries/real-estate-firms", file: "industries/real-estate-firms.html", title: "Real Estate Firms | FluidRWA" },
  { path: "industries/enterprises", file: "industries/enterprises.html", title: "Enterprises | FluidRWA" },
  { path: "industries/web3-startups", file: "industries/web3-startups.html", title: "Web3 Startups | FluidRWA" },
  { path: "industries/funds-investment-platforms", file: "industries/funds-investment-platforms.html", title: "Funds & Investment Platforms | FluidRWA" },
  { path: "industries/governments-regulatory-initiatives", file: "industries/governments-regulatory-initiatives.html", title: "Governments & Regulatory Initiatives | FluidRWA" },
  { path: "industries/service-providers-infrastructure-companies", file: "industries/service-providers-infrastructure-companies.html", title: "Service Providers & Infrastructure Companies | FluidRWA" },
  { path: "industries/healthcare-life-sciences", file: "industries/healthcare-life-sciences.html", title: "Healthcare & Life Sciences | FluidRWA" },
  { path: "industries/maritime-logistics", file: "industries/maritime-logistics.html", title: "Maritime & Logistics | FluidRWA" },
  { path: "industries/data-centers-compute-infrastructure", file: "industries/data-centers-compute-infrastructure.html", title: "Data Centers & Compute Infrastructure | FluidRWA" },
  { path: "industries/carbon-credits-climate-markets", file: "industries/carbon-credits-climate-markets.html", title: "Carbon Credits & Climate Markets | FluidRWA" }
] as const;

export const vendorSlugs = [
  "tokenization-platforms",
  "rwa-protocols-marketplaces",
  "legal-regulatory-vendors",
  "kyc-aml-providers",
  "smart-contract-development-companies",
  "ai-infrastructure-providers",
  "crypto-custody-providers",
  "fiat-on-off-ramp-providers",
  "compliance-infrastructure-providers",
  "defi-infrastructure-providers",
  "defi-trading-margin-infrastructure",
  "stablecoin-infrastructure-providers",
  "security-audit-companies",
  "growth-marketing-companies",
  "identity-solution-providers",
  "blockchain-development-companies",
  "node-as-a-service-rpc-providers",
  "institutional-staking-validator-infrastructure",
  "rollup-as-a-service-appchains",
  "venture-capital",
  "family-offices",
  "broker-dealers",
  "gaming-vendors",
  "fund-administration-transfer-agents",
  "oracles-data-proof-of-reserve",
  "insurance-risk-infrastructure",
  "trade-finance-supply-chain-infrastructure",
  "carbon-climate-mrv-infrastructure",
  "ai-agents-autonomous-systems",
  "ai-document-intelligence-knowledge-retrieval",
  "ai-risk-analytics-compliance-intelligence",
  "decentralized-ai-compute-gpu-infrastructure",
  "ai-data-model-marketplaces",
  "verifiable-ai-smart-contract-infrastructure",
  "ai-video-generation-tools",
  "ai-social-media-tools",
  "ai-voiceover-avatar-tools",
  "ai-marketing-content-tools",
  "ai-sales-outreach-tools",
  "ai-crm-revops-tools",
  "ai-research-market-intelligence-tools",
  "ai-customer-support-tools",
  "ai-design-creative-tools",
  "ai-automation-agent-tools",
  "ai-compliance-document-tools"
] as const;

const sitemapExcludedPaths = new Set([
  "homepage-flow-preview",
  "yellowpages-preview",
  "vendor-ecosystem",
  "submit-project",
  "team",
  "vendor-membership"
]);

const vendorFileMap: Record<string, string> = {
  "tokenization-platforms": "tokenization-platforms",
  "rwa-protocols-marketplaces": "rwa-protocols-marketplaces",
  "legal-regulatory-vendors": "legal-regulatory",
  "kyc-aml-providers": "kyc-aml",
  "smart-contract-development-companies": "smart-contract-development",
  "ai-infrastructure-providers": "ai-infrastructure",
  "crypto-custody-providers": "custody-solutions",
  "fiat-on-off-ramp-providers": "fiat-on-off-ramps",
  "compliance-infrastructure-providers": "compliance-infrastructure",
  "defi-infrastructure-providers": "defi-infrastructure",
  "defi-trading-margin-infrastructure": "defi-trading-margin-infrastructure",
  "defi-trading-platforms": "defi-trading-margin-infrastructure",
  "stablecoin-infrastructure-providers": "payments-stablecoins",
  "security-audit-companies": "security-audits",
  "growth-marketing-companies": "growth-marketing",
  "identity-solution-providers": "identity-solutions",
  "blockchain-development-companies": "blockchain-development",
  "node-as-a-service-rpc-providers": "node-as-a-service-rpc",
  "institutional-staking-validator-infrastructure": "institutional-staking-validator-infrastructure",
  "rollup-as-a-service-appchains": "rollup-as-a-service-appchains",
  "venture-capital": "venture-capital",
  "family-offices": "family-offices",
  "broker-dealers": "broker-dealers",
  "gaming-vendors": "gaming-vendors",
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
  "ai-video-generation-tools": "ai-video-generation-tools",
  "ai-social-media-tools": "ai-social-media-tools",
  "ai-voiceover-avatar-tools": "ai-voiceover-avatar-tools",
  "ai-marketing-content-tools": "ai-marketing-content-tools",
  "ai-sales-outreach-tools": "ai-sales-outreach-tools",
  "ai-crm-revops-tools": "ai-crm-revops-tools",
  "ai-research-market-intelligence-tools": "ai-research-market-intelligence-tools",
  "ai-customer-support-tools": "ai-customer-support-tools",
  "ai-design-creative-tools": "ai-design-creative-tools",
  "ai-automation-agent-tools": "ai-automation-agent-tools",
  "ai-compliance-document-tools": "ai-compliance-document-tools",
  "web3-gaming-vendors": "gaming-vendors"
};

export function normalizePath(slug?: string[]) {
  return (slug || []).join("/").replace(/\/$/, "").replace(/\.html$/, "");
}

export function fileForRoute(routePath: string) {
  const direct = staticRoutes.find((route) => route.path === routePath);
  if (direct) return direct.file;
  if (routePath === "vendors") return "vendor-ecosystem.html";
  if (routePath.startsWith("fluidrwa/")) return path.join(routePath, "index.html");
  if (routePath.startsWith("vendors/")) {
    const slug = routePath.replace(/^vendors\//, "");
    const fileSlug = vendorFileMap[slug] || slug;
    return path.join("vendors", fileSlug, "index.html");
  }
  if (routePath.startsWith("blog/")) return path.join(routePath, "index.html");
  return null;
}

export function allRoutePaths() {
  const blogDir = path.join(process.cwd(), "content/blog");
  const blogPaths = fs.existsSync(blogDir)
    ? fs.readdirSync(blogDir)
        .filter((file) => file.endsWith(".md"))
        .map((file) => {
          const raw = fs.readFileSync(path.join(blogDir, file), "utf8");
          const slug = raw.match(/slug:\s*"([^"]+)"/)?.[1] || file.replace(/\.md$/, "");
          return `blog/${slug}`;
        })
    : [];
  const companyRoot = path.join(process.cwd(), "fluidrwa");
  const companyPaths = fs.existsSync(companyRoot)
    ? fs.readdirSync(companyRoot)
        .filter((dir) => fs.existsSync(path.join(companyRoot, dir, "index.html")))
        .map((dir) => `fluidrwa/${dir}`)
    : [];
  return [
    ...staticRoutes.map((route) => route.path).filter(Boolean),
    "blog/tokenization",
    ...companyPaths,
    ...vendorSlugs.map((slug) => `vendors/${slug}`),
    ...blogPaths
  ];
}

export function sitemapRoutePaths() {
  return allRoutePaths().filter((route) => !sitemapExcludedPaths.has(route));
}
