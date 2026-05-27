import path from "node:path";
import fs from "node:fs";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.fluidrwa.com";

export const staticRoutes = [
  { path: "", file: "index.html", title: "FluidRWA | Web3 Vendor Discovery" },
  { path: "vendor-ecosystem", file: "vendor-ecosystem.html", title: "Vendor Ecosystem | FluidRWA" },
  { path: "solutions", file: "solutions.html", title: "Solutions | FluidRWA" },
  { path: "blog", file: "blog.html", title: "Insights | FluidRWA" },
  { path: "about", file: "team.html", title: "About FluidRWA" },
  { path: "team", file: "team.html", title: "Team | FluidRWA" },
  { path: "contact", file: "contact.html", title: "Contact FluidRWA" },
  { path: "submit-project", file: "submit-project.html", title: "Submit a Project | FluidRWA" },
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
  "legal-regulatory",
  "kyc-aml",
  "smart-contract-development",
  "ai-infrastructure",
  "custody-solutions",
  "fiat-on-off-ramps",
  "compliance-infrastructure",
  "defi-infrastructure",
  "payments-stablecoins",
  "security-audits",
  "growth-marketing",
  "identity-solutions",
  "blockchain-development"
] as const;

export function normalizePath(slug?: string[]) {
  return (slug || []).join("/").replace(/\/$/, "").replace(/\.html$/, "");
}

export function fileForRoute(routePath: string) {
  const direct = staticRoutes.find((route) => route.path === routePath);
  if (direct) return direct.file;
  if (routePath === "vendors") return "vendor-ecosystem.html";
  if (routePath.startsWith("vendors/")) return path.join(routePath, "index.html");
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
    "blog/tokenization",
    ...vendorSlugs.map((slug) => `vendors/${slug}`),
    ...blogPaths
  ];
}
