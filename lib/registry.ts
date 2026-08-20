import fs from "node:fs";
import path from "node:path";

export type VendorVerificationTier = "premium-vetted" | "vetted" | "free";

export interface OpenRegistryVendor {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  logoUrl: string;
  website: string;
  categories: string[];
  specificCategories: string[];
  chains: string[];
  verificationTier: VendorVerificationTier;
  capitalLiquidity: boolean;
  updatedAt: string;
}

export const registryDataset = {
  name: "FluidRWA Open Web3 Vendor Registry",
  version: "2026.06.28",
  updatedAt: "2026-06-28T00:00:00.000Z",
  license: "Free public reference dataset. Attribution requested.",
  description:
    "An open, crawlable reference registry of Web3, RWA, tokenization, compliance, custody, payments, security, AI, growth and blockchain infrastructure vendors."
};

type CompanyProfile = {
  name?: string;
  slug?: string;
  sourceUrl?: string;
  officialTitle?: string;
  siteName?: string;
  officialDescription?: string;
  logoSource?: string;
  logoPath?: string;
  researchedAt?: string;
};

type ExtractedRegistryItem = {
  name: string;
  url?: string;
  description?: string;
  additionalType?: string;
  knowsAbout?: string[];
};

const categoryDirectoryNames: Record<string, string> = {
  "tokenization-platforms": "Tokenization Platforms",
  "rwa-protocols-marketplaces": "RWA Protocols & Marketplaces",
  "legal-regulatory-vendors": "Legal & Regulatory",
  "kyc-aml-providers": "KYC / AML Providers",
  "smart-contract-development-companies": "Smart Contract Development",
  "ai-infrastructure-providers": "AI Infrastructure",
  "crypto-custody-providers": "Custody Solutions",
  "fiat-on-off-ramp-providers": "Fiat On & Off Ramps",
  "compliance-infrastructure-providers": "Compliance Infrastructure",
  "defi-infrastructure-providers": "DeFi Infrastructure",
  "stablecoin-infrastructure-providers": "Payments & Stablecoins",
  "security-audit-companies": "Security & Audits",
  "growth-marketing-companies": "Growth & Marketing",
  "identity-solution-providers": "Identity Solutions",
  "blockchain-development-companies": "Blockchain Development",
  "node-as-a-service-rpc": "Node-as-a-Service / RPC Providers",
  "institutional-staking-validator-infrastructure": "Institutional Staking & Validator Infrastructure",
  "rollup-as-a-service-appchains": "RaaS & Appchains",
  "venture-capital": "Venture Capital",
  "family-offices": "Family Offices",
  "broker-dealers": "Broker Dealers",
  "gaming-vendors": "Gaming Vendors"
};

const parentTaxonomy: Record<string, string> = {
  "Tokenization Platforms": "Tokenization & Capital Markets",
  "RWA Protocols & Marketplaces": "Tokenization & Capital Markets",
  "Venture Capital": "Tokenization & Capital Markets",
  "Family Offices": "Tokenization & Capital Markets",
  "Broker Dealers": "Tokenization & Capital Markets",
  "Legal & Regulatory": "Legal, Compliance & Identity",
  "KYC / AML Providers": "Legal, Compliance & Identity",
  "Compliance Infrastructure": "Legal, Compliance & Identity",
  "Identity Solutions": "Legal, Compliance & Identity",
  "Custody Solutions": "Custody, Wallets & Payments",
  "Fiat On & Off Ramps": "Custody, Wallets & Payments",
  "Payments & Stablecoins": "Custody, Wallets & Payments",
  "Smart Contract Development": "Security & Smart Contracts",
  "Security & Audits": "Security & Smart Contracts",
  "Blockchain Development": "Blockchain & DeFi Infrastructure",
  "DeFi Infrastructure": "Blockchain & DeFi Infrastructure",
  "Node-as-a-Service / RPC Providers": "Blockchain & DeFi Infrastructure",
  "Institutional Staking & Validator Infrastructure": "Blockchain & DeFi Infrastructure",
  "RaaS & Appchains": "Blockchain & DeFi Infrastructure",
  "Gaming Vendors": "Blockchain & DeFi Infrastructure",
  "AI Infrastructure": "AI & Data Infrastructure",
  "Growth & Marketing": "Growth, Distribution & Market Access"
};

const ecosystemCategoryMap: Record<string, string> = {
  "Tokenization Providers": "Tokenization Platforms",
  "Payment Rails & On-Ramps": "Fiat On & Off Ramps",
  "KYC, AML & Identity": "KYC / AML Providers",
  "Custody & Wallets": "Custody Solutions",
  "Smart Contract & Dev": "Smart Contract Development",
  "Smart Contract Security": "Security & Audits",
  "Security & Audits": "Security & Audits",
  "Exchanges & Distribution": "RWA Protocols & Marketplaces",
  "Legal & Regulatory": "Legal & Regulatory",
  "Marketing & PR": "Growth & Marketing",
  "Growth & Marketing": "Growth & Marketing",
  "Blockchain Infrastructure": "Blockchain Development",
  "DeFi Infrastructure": "DeFi Infrastructure",
  "Node-as-a-Service / RPC Providers": "Node-as-a-Service / RPC Providers",
  "Institutional Staking & Validator Infrastructure": "Institutional Staking & Validator Infrastructure",
  "RaaS & Appchains": "RaaS & Appchains",
  "AI Infrastructure": "AI Infrastructure",
  "Compliance Infrastructure": "Compliance Infrastructure",
  "Stablecoin & Payments Infrastructure": "Payments & Stablecoins",
  "Payments & Stablecoins": "Payments & Stablecoins",
  "Identity Solutions": "Identity Solutions"
};

const premiumVetted = new Set(["brands-essential"]);
const vettedVendors = new Set([
  "minddeft-technologies",
  "zoniqx",
  "tokeny",
  "securitize",
  "fireblocks",
  "chainalysis",
  "elliptic",
  "trm-labs",
  "circle-usdc",
  "bitgo",
  "anchorage-digital",
  "coinbase"
]);

const vendorSpecificCategoryOverrides: Record<string, string[]> = {
  "minddeft-technologies": ["Smart Contract Development"]
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function clean(value?: string): string {
  return (value || "").replace(/\s+/g, " ").trim();
}

function readCompanyProfiles(): Record<string, CompanyProfile> {
  const filePath = path.join(process.cwd(), "data/company-profiles.json");
  if (!fs.existsSync(filePath)) return {};
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as Record<string, CompanyProfile>;
}

function extractItemList(html: string, preferredId?: string): ExtractedRegistryItem[] {
  const scripts = html.match(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [];
  for (const script of scripts) {
    const jsonText = script.replace(/^<script[^>]*>/i, "").replace(/<\/script>$/i, "");
    try {
      const parsed = JSON.parse(jsonText);
      const rootBlocks = Array.isArray(parsed) ? parsed : [parsed];
      const graphBlocks = rootBlocks.flatMap((block) => (Array.isArray(block?.["@graph"]) ? block["@graph"] : []));
      const blocks = [...rootBlocks, ...graphBlocks];
      const itemLists = blocks.filter((block) => block?.["@type"] === "ItemList" && Array.isArray(block.itemListElement));
      const itemList =
        itemLists.find((block) => preferredId && String(block?.["@id"] || "").includes(preferredId)) ||
        itemLists.find((block) => String(block?.["@id"] || "").includes("#vendors")) ||
        itemLists[0];
      if (!itemList) continue;
      return itemList.itemListElement
        .map((entry: { item?: { name?: string; url?: string; description?: string; additionalType?: string; knowsAbout?: string[] } }) => ({
          name: clean(entry.item?.name),
          url: clean(entry.item?.url),
          description: clean(entry.item?.description),
          additionalType: clean(entry.item?.additionalType),
          knowsAbout: Array.isArray(entry.item?.knowsAbout) ? entry.item?.knowsAbout.map(clean).filter(Boolean) : []
        }))
        .filter((item: ExtractedRegistryItem) => item.name);
    } catch {
      continue;
    }
  }
  return [];
}

function normalizeEcosystemCategory(value?: string): string | undefined {
  const category = clean(value);
  return ecosystemCategoryMap[category] || categoryDirectoryNames[category] || category || undefined;
}

function inferChains(text: string, categories: string[]): string[] {
  const haystack = `${text} ${categories.join(" ")}`.toLowerCase();
  const chains: string[] = [];
  const add = (chain: string, patterns: string[]) => {
    if (patterns.some((pattern) => haystack.includes(pattern))) chains.push(chain);
  };

  add("ethereum", ["ethereum", "erc-", "evm", "smart contract", "security audit", "tokenization"]);
  add("polygon", ["polygon"]);
  add("base", ["base"]);
  add("solana", ["solana"]);
  add("avalanche", ["avalanche"]);
  add("hedera", ["hedera"]);
  add("xrp ledger", ["xrp ledger", "xrpl"]);
  add("canton network", ["canton"]);
  add("bitcoin", ["bitcoin"]);

  return [...new Set(chains)];
}

function toVerificationTier(slug: string): VendorVerificationTier {
  if (premiumVetted.has(slug)) return "premium-vetted";
  if (vettedVendors.has(slug)) return "vetted";
  return "free";
}

function isCapitalLiquidityCategory(categories: string[]): boolean {
  return categories.some((category) =>
    [
      "Tokenization Platforms",
      "RWA Protocols & Marketplaces",
      "Venture Capital",
      "Family Offices",
      "Broker Dealers",
      "DeFi Infrastructure",
      "Payments & Stablecoins",
      "Fiat On & Off Ramps"
    ].includes(category)
  );
}

let registryCache: OpenRegistryVendor[] | null = null;

function upsertRegistryVendor(
  vendors: Map<string, OpenRegistryVendor>,
  profiles: Record<string, CompanyProfile>,
  byName: Map<string, CompanyProfile>,
  item: ExtractedRegistryItem,
  categoryName: string
) {
  const profile = profiles[slugify(item.name)] || byName.get(item.name.toLowerCase()) || {};
  const slug = profile.slug || slugify(profile.name || item.name);
  const categoryOverrides = vendorSpecificCategoryOverrides[slug];
  const resolvedCategoryName = categoryOverrides?.[0] || categoryName;
  const parentCategory = parentTaxonomy[resolvedCategoryName] || "Web3 Infrastructure";
  const officialDescription = clean(profile.officialDescription);
  const shortDescription = clean(
    item.description || officialDescription || profile.officialTitle || `${item.name} is listed in the FluidRWA open Web3 vendor registry.`
  );
  const longDescription =
    officialDescription ||
    `${item.name} appears in FluidRWA's ${resolvedCategoryName} coverage. Buyers can use this open registry record to understand category fit, compare provider type and navigate related Web3 vendor ecosystems.`;
  const existing = vendors.get(slug);
  const specificCategories = categoryOverrides || [...new Set([...(existing?.specificCategories || []), resolvedCategoryName])];
  const categories = [...new Set([...(existing?.categories || []), parentCategory])];
  const textForChains = `${item.name} ${shortDescription} ${longDescription} ${(item.knowsAbout || []).join(" ")}`;

  vendors.set(slug, {
    slug,
    name: clean(profile.name || item.name),
    description: existing?.description || shortDescription,
    longDescription: existing?.longDescription || longDescription,
    logoUrl: clean(profile.logoPath || profile.logoSource || "/assets/fluidrwa-favicon.png"),
    website: clean(profile.sourceUrl || item.url || existing?.website || ""),
    categories,
    specificCategories,
    chains: [...new Set([...(existing?.chains || []), ...inferChains(textForChains, specificCategories)])],
    verificationTier: toVerificationTier(slug),
    capitalLiquidity: existing?.capitalLiquidity || isCapitalLiquidityCategory(specificCategories),
    updatedAt: profile.researchedAt || existing?.updatedAt || registryDataset.updatedAt
  });
}

export function getRegistryVendors(): OpenRegistryVendor[] {
  if (registryCache) return registryCache;

  const profiles = readCompanyProfiles();
  const byName = new Map<string, CompanyProfile>();
  Object.values(profiles).forEach((profile) => {
    if (profile.name) byName.set(profile.name.toLowerCase(), profile);
  });

  const vendors = new Map<string, OpenRegistryVendor>();
  const ecosystemHtmlPath = path.join(process.cwd(), "vendor-ecosystem.html");

  if (fs.existsSync(ecosystemHtmlPath)) {
    const ecosystemItems = extractItemList(fs.readFileSync(ecosystemHtmlPath, "utf8"), "#vendors");
    for (const item of ecosystemItems) {
      const categoryName = normalizeEcosystemCategory(item.additionalType) || "Web3 Infrastructure";
      upsertRegistryVendor(vendors, profiles, byName, item, categoryName);
    }
  }

  const vendorRoot = path.join(process.cwd(), "vendors");

  if (fs.existsSync(vendorRoot)) {
    for (const directory of fs.readdirSync(vendorRoot)) {
      const categoryName = categoryDirectoryNames[directory];
      if (!categoryName) continue;
      const htmlPath = path.join(vendorRoot, directory, "index.html");
      if (!fs.existsSync(htmlPath)) continue;

      const items = extractItemList(fs.readFileSync(htmlPath, "utf8"));

      for (const item of items) {
        upsertRegistryVendor(vendors, profiles, byName, item, categoryName);
      }
    }
  }

  for (const [key, profile] of Object.entries(profiles)) {
    const slug = profile.slug || key;
    if (vendors.has(slug) || !profile.name) continue;
    const description = clean(profile.officialDescription || profile.officialTitle || `${profile.name} is tracked in the FluidRWA open registry.`);
    vendors.set(slug, {
      slug,
      name: profile.name,
      description,
      longDescription: description,
      logoUrl: clean(profile.logoPath || profile.logoSource || "/assets/fluidrwa-favicon.png"),
      website: clean(profile.sourceUrl || ""),
      categories: ["Web3 Infrastructure"],
      specificCategories: [],
      chains: inferChains(`${profile.name} ${description}`, []),
      verificationTier: toVerificationTier(slug),
      capitalLiquidity: false,
      updatedAt: profile.researchedAt || registryDataset.updatedAt
    });
  }

  const tierRank: Record<VendorVerificationTier, number> = {
    "premium-vetted": 0,
    vetted: 1,
    free: 2
  };

  registryCache = [...vendors.values()].sort((a, b) => {
    const tierDelta = tierRank[a.verificationTier] - tierRank[b.verificationTier];
    if (tierDelta !== 0) return tierDelta;
    return a.name.localeCompare(b.name);
  });
  return registryCache;
}

export function getRegistryVendorBySlug(slug: string): OpenRegistryVendor | undefined {
  return getRegistryVendors().find((vendor) => vendor.slug === slug);
}

export function getRegistryCategories(): string[] {
  return [...new Set(getRegistryVendors().flatMap((vendor) => vendor.categories))].sort();
}

export function getRegistrySpecificCategories(): string[] {
  return [...new Set(getRegistryVendors().flatMap((vendor) => vendor.specificCategories))].sort();
}

export function getRegistryChains(): string[] {
  return [...new Set(getRegistryVendors().flatMap((vendor) => vendor.chains))].sort();
}

export function filterRegistryVendors(filters: { category?: string; chain?: string; tier?: string; q?: string }): OpenRegistryVendor[] {
  const q = clean(filters.q).toLowerCase();
  return getRegistryVendors().filter((vendor) => {
    const categoryMatch =
      !filters.category ||
      vendor.categories.some((category) => category.toLowerCase() === filters.category?.toLowerCase()) ||
      vendor.specificCategories.some((category) => category.toLowerCase() === filters.category?.toLowerCase());
    const chainMatch = !filters.chain || vendor.chains.some((chain) => chain.toLowerCase() === filters.chain?.toLowerCase());
    const tierMatch = !filters.tier || vendor.verificationTier === filters.tier;
    const qMatch =
      !q ||
      `${vendor.name} ${vendor.description} ${vendor.longDescription} ${vendor.categories.join(" ")} ${vendor.specificCategories.join(" ")} ${vendor.chains.join(" ")}`
        .toLowerCase()
        .includes(q);
    return categoryMatch && chainMatch && tierMatch && qMatch;
  });
}

export function registryToCsv(vendors = getRegistryVendors()): string {
  const headers: Array<keyof OpenRegistryVendor | "datasetVersion"> = [
    "datasetVersion",
    "slug",
    "name",
    "description",
    "website",
    "categories",
    "specificCategories",
    "chains",
    "verificationTier",
    "capitalLiquidity",
    "updatedAt"
  ];
  const escape = (value: unknown) => {
    const normalized = Array.isArray(value) ? value.join("; ") : String(value ?? "");
    return `"${normalized.replace(/"/g, '""')}"`;
  };
  const rows = vendors.map((vendor) =>
    headers
      .map((header) => (header === "datasetVersion" ? escape(registryDataset.version) : escape(vendor[header])))
      .join(",")
  );
  return [headers.join(","), ...rows].join("\n");
}
