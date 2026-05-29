import path from "node:path";
import fs from "node:fs";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.fluidrwa.com";

export const staticRoutes = [
  { path: "", file: "index.html", title: "FluidRWA | Web3 Vendor Discovery" },
  { path: "web3vendorecosystem", file: "vendor-ecosystem.html", title: "Web3 Vendor Ecosystem | FluidRWA" },
  { path: "solutions", file: "solutions.html", title: "Solutions | FluidRWA" },
  { path: "blog", file: "blog.html", title: "Insights | FluidRWA" },
  { path: "about", file: "team.html", title: "About FluidRWA" },
  { path: "team", file: "team.html", title: "Team | FluidRWA" },
  { path: "contact", file: "contact.html", title: "Contact FluidRWA" },
  { path: "submit-requirement", file: "submit-project.html", title: "Submit Requirements | FluidRWA" },
  { path: "apply-as-vendor", file: "apply-as-vendor.html", title: "Apply as Vendor | FluidRWA" },
  { path: "arcade", file: "arcade.html", title: "FluidRWA Arcade" },
  { path: "privacy", file: "privacy.html", title: "Privacy Policy | FluidRWA" },
  { path: "terms", file: "terms.html", title: "Terms & Conditions | FluidRWA" },
  { path: "tokenization", file: "tokenization.html", title: "Tokenization | FluidRWA" },
  { path: "compliance", file: "compliance.html", title: "Compliance | FluidRWA" },
  { path: "custody", file: "custody.html", title: "Custody | FluidRWA" },
  { path: "ai", file: "ai.html", title: "AI Infrastructure | FluidRWA" },
  { path: "providers", file: "providers.html", title: "Providers | FluidRWA" }
] as const;

export const vendorSlugs = [
  "tokenization-platforms",
  "legal-regulatory-vendors",
  "kyc-aml-providers",
  "smart-contract-development-companies",
  "ai-infrastructure-providers",
  "crypto-custody-providers",
  "fiat-on-off-ramp-providers",
  "compliance-infrastructure-providers",
  "defi-infrastructure-providers",
  "stablecoin-infrastructure-providers",
  "security-audit-companies",
  "growth-marketing-companies",
  "identity-solution-providers",
  "blockchain-development-companies"
] as const;

export const vendorRouteAliases: Record<string, string> = {
  "tokenization-platforms": "tokenization-platforms",
  "legal-regulatory-vendors": "legal-regulatory",
  "kyc-aml-providers": "kyc-aml",
  "smart-contract-development-companies": "smart-contract-development",
  "ai-infrastructure-providers": "ai-infrastructure",
  "crypto-custody-providers": "custody-solutions",
  "fiat-on-off-ramp-providers": "fiat-on-off-ramps",
  "compliance-infrastructure-providers": "compliance-infrastructure",
  "defi-infrastructure-providers": "defi-infrastructure",
  "stablecoin-infrastructure-providers": "payments-stablecoins",
  "security-audit-companies": "security-audits",
  "growth-marketing-companies": "growth-marketing",
  "identity-solution-providers": "identity-solutions",
  "blockchain-development-companies": "blockchain-development"
};

export const legacyVendorRedirects: Record<string, string> = {
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
  "blockchain-development": "blockchain-development-companies"
};

export function normalizePath(slug?: string[]) {
  return (slug || []).join("/").replace(/\/$/, "").replace(/\.html$/, "");
}

export function fileForRoute(routePath: string) {
  const direct = staticRoutes.find((route) => route.path === routePath);
  if (direct) return direct.file;
  if (routePath === "vendors") return "vendor-ecosystem.html";
  if (routePath === "insights") return "blog.html";
  if (routePath.startsWith("vendors/")) {
    const slug = routePath.replace("vendors/", "");
    return path.join("vendors", vendorRouteAliases[slug] || slug, "index.html");
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
  return [
    ...staticRoutes.map((route) => route.path).filter(Boolean),
    "vendors",
    "insights",
    "blog/tokenization",
    ...vendorSlugs.map((slug) => `vendors/${slug}`),
    ...blogPaths
  ];
}
