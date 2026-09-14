export type EntityType =
  | "Company"
  | "Category"
  | "Subcategory"
  | "Blockchain"
  | "Asset Class"
  | "Region"
  | "Product"
  | "Project"
  | "Protocol";
export type Entity = {
  id: string;
  name: string;
  slug: string;
  entity_type: EntityType;
  short_description: string;
  website: string | null;
  profile_url: string | null;
  image: string | null;
  verification_status: "sample" | "verified" | "reported";
  created_at: string;
  updated_at: string;
  active: boolean;
  institution_type?: string;
};
export type Relationship = {
  relationship_id: string;
  source_entity_id: string;
  target_entity_id: string;
  relationship_type: string;
  evidence_url: string | null;
  source_type: string;
  verification_status: "sample" | "verified" | "reported" | "inferred";
  confidence: number | null;
  date_verified: string | null;
  updated_at: string;
  active: boolean;
};
export const relationshipTypes = {
  belongs_to_category: "Belongs to category",
  operates_on: "Operates on",
  supports_asset_class: "Supports asset class",
  available_in: "Available in",
  provides: "Provides",
  integrates_with: "Integrates with",
  supports: "Supports",
  issues_on: "Issues on",
  custodies: "Custodies",
  uses: "Uses",
  serves: "Serves",
  partners_with: "Partners with",
};
const stamp = "2026-09-10";
const images: Record<string, string> = {
  securitize: "network-logos/securitize.png",
  tokeny: "network-logos/tokeny.png",
  zoniqx: "company-logos/zoniqx.png",
  digishares: "network-logos/digishares.png",
  blocksquare: "network-logos/blocksquare.png",
  circle: "company-logos/circle-usdc.avif",
  paxos: "network-logos/paxos.png",
  bvnk: "network-logos/bvnk.png",
  fireblocks: "network-logos/fireblocks.png",
  bitgo: "company-logos/bitgo.png",
  anchorage: "company-logos/anchorage-digital.svg",
  sumsub: "network-logos/sumsub.png",
  chainalysis: "company-logos/chainalysis.png",
  trm: "company-logos/trm-labs.png",
  ethereum: "chain-logos/ethereum.svg",
  polygon: "chain-logos/polygon.svg",
  solana: "chain-logos/solana.svg",
  avalanche: "chain-logos/avalanche.svg",
  ondo: "network-logos/ondo.png",
  chainlink: "network-logos/chainlink.png",
  mattereum: "network-logos/mattereum.png",
  archax: "company-logos/archax.svg",
  aave: "network-logos/aave.png",
};
const entity = (
  id: string,
  name: string,
  entity_type: EntityType,
  short_description: string,
  profile_url: string | null = null,
): Entity => ({
  id,
  name,
  slug: id,
  entity_type,
  short_description,
  profile_url,
  website: null,
  image: images[id] ? `/assets/${images[id]}` : null,
  verification_status: "sample",
  created_at: stamp,
  updated_at: stamp,
  active: true,
});
// Preview fixtures are isolated from the production vendor directory. Links are illustrative, not claims.
export const entities: Entity[] = [
  entity(
    "securitize",
    "Securitize",
    "Company",
    "Digital securities and tokenization infrastructure.",
    "/fluidrwa/securitize",
  ),
  entity(
    "tokeny",
    "Tokeny",
    "Company",
    "Infrastructure for compliant tokenized assets.",
    "/fluidrwa/tokeny",
  ),
  entity(
    "zoniqx",
    "Zoniqx",
    "Company",
    "Tokenization infrastructure and asset lifecycle tools.",
    "/fluidrwa/zoniqx",
  ),
  entity(
    "digishares",
    "DigiShares",
    "Company",
    "White-label real estate tokenization software.",
  ),
  entity(
    "blocksquare",
    "Blocksquare",
    "Company",
    "Real estate tokenization infrastructure.",
  ),
  entity(
    "circle",
    "Circle",
    "Company",
    "Stablecoin and digital money infrastructure.",
  ),
  entity(
    "paxos",
    "Paxos",
    "Company",
    "Regulated digital asset infrastructure.",
  ),
  entity("bvnk", "BVNK", "Company", "Stablecoin payment infrastructure."),
  entity(
    "fireblocks",
    "Fireblocks",
    "Company",
    "Digital asset operations and wallet infrastructure.",
  ),
  entity(
    "bitgo",
    "BitGo",
    "Company",
    "Digital asset custody and wallet services.",
    "/fluidrwa/bitgo",
  ),
  entity(
    "anchorage",
    "Anchorage Digital",
    "Company",
    "Institutional digital asset custody.",
  ),
  entity(
    "sumsub",
    "Sumsub",
    "Company",
    "Identity verification and compliance tools.",
  ),
  entity(
    "chainalysis",
    "Chainalysis",
    "Company",
    "Blockchain analytics and compliance intelligence.",
  ),
  entity(
    "trm",
    "TRM Labs",
    "Company",
    "Blockchain risk and financial crime intelligence.",
  ),
  entity(
    "tokenization",
    "Tokenization",
    "Category",
    "Issuance and lifecycle infrastructure.",
  ),
  entity(
    "stablecoins",
    "Stablecoins",
    "Category",
    "Digital money and payment infrastructure.",
  ),
  entity(
    "custody",
    "Custody",
    "Category",
    "Safekeeping and wallet operations.",
  ),
  entity(
    "compliance",
    "Compliance",
    "Category",
    "Identity, screening and monitoring.",
  ),
  entity("ethereum", "Ethereum", "Blockchain", "Smart contract network."),
  entity(
    "polygon",
    "Polygon",
    "Blockchain",
    "Blockchain infrastructure ecosystem.",
  ),
  entity("solana", "Solana", "Blockchain", "Smart contract network."),
  entity(
    "avalanche",
    "Avalanche",
    "Blockchain",
    "Smart contract and custom chain ecosystem.",
  ),
  entity(
    "real-estate",
    "Real estate",
    "Asset Class",
    "Property and real estate interests.",
  ),
  entity(
    "private-credit",
    "Private credit",
    "Asset Class",
    "Private lending and credit assets.",
  ),
  entity(
    "treasuries",
    "Treasuries",
    "Asset Class",
    "Government debt instruments.",
  ),
  entity("gold", "Gold", "Asset Class", "Precious metal assets."),
  entity("europe", "Europe", "Region", "European markets."),
  entity("north-america", "North America", "Region", "North American markets."),
  entity("asia-pacific", "Asia Pacific", "Region", "Asia Pacific markets."),
  entity("uae", "UAE", "Region", "United Arab Emirates."),
  entity(
    "ondo",
    "Ondo Finance",
    "Company",
    "Tokenized financial products and on-chain asset infrastructure.",
  ),
  entity(
    "chainlink",
    "Chainlink",
    "Company",
    "Oracle data and interoperability infrastructure.",
  ),
  entity(
    "mattereum",
    "Mattereum",
    "Company",
    "Physical asset passports and associated verification records.",
  ),
  entity(
    "archax",
    "Archax",
    "Company",
    "Digital asset exchange and distribution infrastructure.",
    "/fluidrwa/archax",
  ),
  entity(
    "aave",
    "Aave",
    "Company",
    "Decentralized lending and liquidity infrastructure.",
  ),
  entity(
    "issuers",
    "Asset issuers",
    "Category",
    "Financial products connecting underlying assets to on-chain markets.",
  ),
  entity(
    "oracles",
    "Data & oracles",
    "Category",
    "Asset evidence, external data and connectivity.",
  ),
  entity(
    "distribution",
    "Distribution",
    "Category",
    "Access, exchange and secondary-market infrastructure.",
  ),
  entity(
    "defi",
    "DeFi & liquidity",
    "Category",
    "Lending, borrowing and on-chain liquidity.",
  ),
];
const fixtures: [string, string, string[], string[], string[]][] = [
  ["ondo", "issuers", ["ethereum"], ["treasuries"], ["north-america"]],
  ["chainlink", "oracles", ["ethereum", "polygon"], [], []],
  ["mattereum", "oracles", ["ethereum"], ["real-estate", "gold"], ["europe"]],
  [
    "archax",
    "distribution",
    ["ethereum"],
    ["treasuries", "private-credit"],
    ["europe"],
  ],
  ["aave", "defi", ["ethereum", "polygon"], [], []],
  [
    "securitize",
    "tokenization",
    ["ethereum", "avalanche"],
    ["treasuries", "private-credit"],
    ["north-america"],
  ],
  [
    "tokeny",
    "tokenization",
    ["ethereum", "polygon"],
    ["real-estate", "private-credit"],
    ["europe"],
  ],
  [
    "zoniqx",
    "tokenization",
    ["ethereum", "polygon"],
    ["real-estate", "gold"],
    ["north-america", "uae"],
  ],
  ["digishares", "tokenization", ["ethereum"], ["real-estate"], ["europe"]],
  ["blocksquare", "tokenization", ["ethereum"], ["real-estate"], ["europe"]],
  [
    "circle",
    "stablecoins",
    ["ethereum", "solana"],
    ["treasuries"],
    ["north-america", "europe"],
  ],
  ["paxos", "stablecoins", ["ethereum"], ["gold"], ["north-america"]],
  ["bvnk", "stablecoins", ["ethereum", "polygon"], [], ["europe"]],
  [
    "fireblocks",
    "custody",
    ["ethereum", "solana", "polygon"],
    ["real-estate", "treasuries"],
    ["europe", "north-america"],
  ],
  ["bitgo", "custody", ["ethereum", "solana"], ["gold"], ["north-america"]],
  [
    "anchorage",
    "custody",
    ["ethereum", "solana"],
    ["private-credit"],
    ["north-america"],
  ],
  ["sumsub", "compliance", [], [], ["europe", "asia-pacific"]],
  [
    "chainalysis",
    "compliance",
    ["ethereum", "solana"],
    [],
    ["north-america", "europe"],
  ],
  [
    "trm",
    "compliance",
    ["ethereum", "polygon"],
    [],
    ["north-america", "asia-pacific"],
  ],
];
export const relationships: Relationship[] = fixtures.flatMap(
  ([source, category, chains, assets, regions]) =>
    [
      ["belongs_to_category", category],
      ...chains.map((id) => ["operates_on", id]),
      ...assets.map((id) => ["supports_asset_class", id]),
      ...regions.map((id) => ["available_in", id]),
    ].map(([type, target]) => ({
      relationship_id: `${source}:${type}:${target}`,
      source_entity_id: source,
      target_entity_id: target,
      relationship_type: type,
      evidence_url: null,
      source_type: "illustrative fixture",
      verification_status: "sample" as const,
      confidence: null,
      date_verified: null,
      updated_at: stamp,
      active: true,
    })),
);
export const networkViews = [
  { id: "rwa-ecosystem", name: "Global RWA Ecosystem", filter: "" },
  {
    id: "blockchains",
    name: "Blockchains",
    filter: "",
  },
  {
    id: "tokenization-platforms",
    name: "Tokenization Platforms",
    filter: "tokenization",
  },
  {
    id: "stablecoin-infrastructure",
    name: "Stablecoin Infrastructure",
    filter: "stablecoins",
  },
  {
    id: "digital-asset-custody",
    name: "Digital Asset Custody",
    filter: "custody",
  },
  {
    id: "kyc-aml-compliance",
    name: "KYC / AML & Compliance",
    filter: "compliance",
  },
  {
    id: "real-estate-tokenization",
    name: "Real Estate Tokenization",
    filter: "real-estate",
  },
];
export const facets = [
  { key: "category", type: "Category" },
  { key: "chain", type: "Blockchain" },
  { key: "asset", type: "Asset Class" },
  { key: "region", type: "Region" },
] as const;
export const layers = [
  {
    id: "issuers",
    name: "Asset issuers",
    description: "Origination & financial products",
    color: "#9a6551",
  },
  {
    id: "tokenization",
    name: "Tokenization",
    description: "Issuance & asset lifecycle",
    color: "#486e96",
  },
  {
    id: "compliance",
    name: "Compliance / KYC",
    description: "Identity & transaction intelligence",
    color: "#857137",
  },
  {
    id: "blockchains",
    name: "Blockchain infrastructure",
    description: "Settlement & execution networks",
    color: "#796593",
  },
  {
    id: "custody",
    name: "Custody",
    description: "Safekeeping & wallet operations",
    color: "#397c70",
  },
  {
    id: "oracles",
    name: "Data & oracles",
    description: "Off-chain evidence & connectivity",
    color: "#697f48",
  },
  {
    id: "distribution",
    name: "Distribution",
    description: "Market access & exchange",
    color: "#87657c",
  },
  {
    id: "stablecoins",
    name: "Stablecoins / payments",
    description: "Digital money & settlement",
    color: "#427e93",
  },
  {
    id: "defi",
    name: "DeFi / liquidity",
    description: "Lending & on-chain markets",
    color: "#737b89",
  },
];
export const activeRelationships = relationships.filter(
  (r) => r.active && r.verification_status !== "inferred",
);
export function relatedEntities(id: string, type?: EntityType): Entity[] {
  const ids = new Set(
    activeRelationships.flatMap((r) =>
      r.source_entity_id === id
        ? [r.target_entity_id]
        : r.target_entity_id === id
          ? [r.source_entity_id]
          : [],
    ),
  );
  return entities.filter(
    (e) => e.active && ids.has(e.id) && (!type || e.entity_type === type),
  );
}
export function matchesSearch(e: Entity, query: string) {
  const haystack = [
    e.name,
    e.short_description,
    ...relatedEntities(e.id).map((n) => n.name),
  ]
    .join(" ")
    .toLowerCase();
  const ignored = new Set([
    "i",
    "am",
    "a",
    "an",
    "the",
    "to",
    "in",
    "my",
    "me",
    "show",
    "want",
    "need",
    "needs",
    "for",
    "with",
    "who",
    "what",
    "launching",
    "fund",
    "project",
    "ecosystem",
    "around",
  ]);
  const aliases: Record<string, string> = {
    tokenize: "tokenization",
    tokenized: "tokenization",
    tokenise: "tokenization",
    tokenised: "tokenization",
    kyc: "compliance",
    aml: "compliance",
  };
  return query
    .toLowerCase()
    .trim()
    .replace(/[-/]/g, " ")
    .split(/\s+/)
    .map((word) => word.replace(/[^a-z0-9]/g, ""))
    .filter((word) => word && !ignored.has(word))
    .map((word) => aliases[word] || word)
    .every((word) => haystack.includes(word));
}
export function selectNetwork(
  viewId: string,
  filters: Record<string, string>,
  search = "",
) {
  const view = networkViews.find((v) => v.id === viewId) || networkViews[0];
  const edges = relationships.filter(
    (e) => e.active && e.verification_status !== "inferred",
  );
  const required = [view.filter, ...facets.map((f) => filters[f.key])].filter(
    Boolean,
  );
  const companies = entities.filter(
    (e) =>
      e.active &&
      e.entity_type === "Company" &&
      (!filters.status || e.verification_status === filters.status) &&
      required.every((id) =>
        edges.some(
          (r) => r.source_entity_id === e.id && r.target_entity_id === id,
        ),
      ) &&
      matchesSearch(e, search),
  );
  const ids = new Set(companies.slice(0, 100).map((e) => e.id));
  const selectedEdges = edges.filter((e) => ids.has(e.source_entity_id));
  selectedEdges.forEach((e) => ids.add(e.target_entity_id));
  return {
    nodes: entities.filter((e) => ids.has(e.id)),
    edges: selectedEdges,
    companies,
    total: companies.length,
  };
}
