import { unstable_noStore as noStore } from "next/cache";

export type SignalCategory =
  | "RWA Tokenization"
  | "Stablecoins & Payments"
  | "Custody & Wallets"
  | "KYC, AML & Compliance"
  | "Smart Contracts & Security"
  | "Blockchain Ecosystems"
  | "DeFi & Market Infrastructure"
  | "AI Infrastructure"
  | "Regulation & Policy"
  | "Institutional Adoption";

export type NewsItem = {
  id?: string;
  sourceName: string;
  sourceUrl: string;
  title: string;
  canonicalUrl: string;
  summary: string;
  category: SignalCategory;
  publishedAt: string;
  imageUrl?: string;
  importedAt?: string;
};

export type JobItem = {
  id?: string;
  companyName: string;
  companyUrl: string;
  title: string;
  canonicalUrl: string;
  location: string;
  department: string;
  category: SignalCategory;
  sourceName: string;
  postedAt: string;
  expiresAt?: string | null;
  importedAt?: string;
};

type RssSource = {
  name: string;
  url: string;
  sourceUrl: string;
  defaultCategory: SignalCategory;
};

type GreenhouseSource = {
  provider: "greenhouse";
  companyName: string;
  companyUrl: string;
  boardUrl: string;
};

type GreenhouseJob = {
  title?: string;
  absolute_url?: string;
  updated_at?: string;
  location?: { name?: string };
  departments?: Array<{ name?: string }>;
};

const NEWS_LIMIT = 48;
const JOB_LIMIT = 60;

export const newsSources: RssSource[] = [
  {
    name: "CoinDesk",
    url: "https://www.coindesk.com/arc/outboundfeeds/rss",
    sourceUrl: "https://www.coindesk.com",
    defaultCategory: "Institutional Adoption"
  },
  {
    name: "Cointelegraph",
    url: "https://cointelegraph.com/rss",
    sourceUrl: "https://cointelegraph.com",
    defaultCategory: "Blockchain Ecosystems"
  },
  {
    name: "Decrypt",
    url: "https://decrypt.co/feed",
    sourceUrl: "https://decrypt.co",
    defaultCategory: "Blockchain Ecosystems"
  },
  {
    name: "Chainalysis",
    url: "https://www.chainalysis.com/blog/feed/",
    sourceUrl: "https://www.chainalysis.com/blog/",
    defaultCategory: "KYC, AML & Compliance"
  }
];

export const jobSources: GreenhouseSource[] = [
  {
    provider: "greenhouse",
    companyName: "Fireblocks",
    companyUrl: "https://www.fireblocks.com",
    boardUrl: "https://boards-api.greenhouse.io/v1/boards/fireblocks/jobs"
  },
  {
    provider: "greenhouse",
    companyName: "BitGo",
    companyUrl: "https://www.bitgo.com",
    boardUrl: "https://boards-api.greenhouse.io/v1/boards/bitgo/jobs"
  },
  {
    provider: "greenhouse",
    companyName: "OpenZeppelin",
    companyUrl: "https://www.openzeppelin.com",
    boardUrl: "https://boards-api.greenhouse.io/v1/boards/openzeppelin/jobs"
  }
];

const fluidRwaNewsItems: NewsItem[] = [
  {
    sourceName: "FluidRWA",
    sourceUrl: "https://www.fluidrwa.com/news",
    title: "FluidRWA welcomes SureStack as a new vetted risk management and security partner",
    canonicalUrl: "https://www.fluidrwa.com/news/fluidrwa-surestack-partnership",
    summary:
      "FluidRWA has welcomed SureStack Technology Group as a vetted risk management and security partner for digital asset issuers, funds and Web3 teams evaluating tokenization security intelligence.",
    category: "Smart Contracts & Security",
    publishedAt: "2026-07-23T00:00:00.000Z",
    imageUrl: "/assets/news/fluidrwa-surestack-partnership-cover.jpg"
  },
  {
    sourceName: "FluidRWA",
    sourceUrl: "https://www.fluidrwa.com/news",
    title: "FluidRWA welcomes Minddeft as a vetted development and smart contracts partner",
    canonicalUrl: "https://www.fluidrwa.com/news/fluidrwa-minddeft-partnership",
    summary:
      "FluidRWA has welcomed Minddeft Technologies as a vetted smart contract development and blockchain development partner for teams seeking tokenization and enterprise Web3 engineering support.",
    category: "Smart Contracts & Security",
    publishedAt: "2026-07-09T00:00:00.000Z",
    imageUrl: "/assets/news/fluidrwa-minddeft-partnership-cover.jpg"
  }
];

const fallbackNews: NewsItem[] = [
  {
    sourceName: "FluidRWA",
    sourceUrl: "https://www.fluidrwa.com",
    title: "RWA, Web3 and AI infrastructure signals will update here automatically",
    canonicalUrl: "https://www.fluidrwa.com/news",
    summary:
      "FluidRWA is setting up curated market-signal feeds across tokenization, compliance, custody, stablecoins, AI infrastructure and institutional adoption.",
    category: "Institutional Adoption",
    publishedAt: "2026-07-07T00:00:00.000Z"
  }
];

const fallbackJobs: JobItem[] = [
  {
    companyName: "FluidRWA",
    companyUrl: "https://www.fluidrwa.com/vendor-membership",
    title: "Companies can feature RWA, Web3 and AI infrastructure roles here",
    canonicalUrl: "https://www.fluidrwa.com/jobs",
    location: "Global / Remote",
    department: "Vendor growth",
    category: "Institutional Adoption",
    sourceName: "FluidRWA",
    postedAt: "2026-07-07T00:00:00.000Z"
  }
];

function byNewest<T extends { publishedAt?: string; postedAt?: string }>(items: T[]) {
  return [...items].sort((a, b) => {
    const left = Date.parse(a.publishedAt || a.postedAt || "");
    const right = Date.parse(b.publishedAt || b.postedAt || "");
    return (Number.isFinite(right) ? right : 0) - (Number.isFinite(left) ? left : 0);
  });
}

function dedupeByUrl<T extends { canonicalUrl: string }>(items: T[]) {
  return [...new Map(items.filter((item) => item.canonicalUrl).map((item) => [item.canonicalUrl, item])).values()];
}

function preserveFluidRwaAnnouncements(items: NewsItem[], limit: number) {
  const sortedItems = byNewest(dedupeByUrl(items));
  const announcements = sortedItems.filter(
    (item) => item.sourceName === "FluidRWA" && item.canonicalUrl.includes("/news/")
  );
  const announcementUrls = new Set(announcements.map((item) => item.canonicalUrl));
  const feedItems = sortedItems.filter((item) => !announcementUrls.has(item.canonicalUrl));
  return [...announcements, ...feedItems].slice(0, limit);
}

function supabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return {
    url: url.replace(/\/$/, ""),
    key
  };
}

function restHeaders(key: string) {
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json"
  };
}

function stripHtml(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeEntities(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'");
}

function excerpt(value: string, max = 260) {
  const clean = decodeEntities(stripHtml(value));
  return clean.length > max ? `${clean.slice(0, max).replace(/\s+\S*$/, "")}...` : clean;
}

function getTag(block: string, tag: string) {
  const match = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? decodeEntities(stripHtml(match[1])) : "";
}

function getLink(block: string) {
  const atom = block.match(/<link[^>]+href=["']([^"']+)["'][^>]*>/i)?.[1];
  if (atom) return decodeEntities(atom.trim());
  return getTag(block, "link");
}

function getAttribute(block: string, tagPattern: string, attribute: string) {
  const tag = block.match(new RegExp(`<${tagPattern}\\b[^>]*>`, "i"))?.[0] || "";
  const match = tag.match(new RegExp(`${attribute}=["']([^"']+)["']`, "i"));
  return match ? decodeEntities(match[1].trim()) : "";
}

function cleanImageUrl(value: string) {
  const clean = decodeEntities(value || "").trim();
  if (!/^https?:\/\//i.test(clean)) return "";
  if (/(\.gif)(\?|#|$)/i.test(clean)) return "";
  return clean;
}

function getRssImage(block: string) {
  const candidates = [
    getAttribute(block, "media:content", "url"),
    getAttribute(block, "media:thumbnail", "url"),
    getAttribute(block, "enclosure", "url"),
    getTag(block, "image"),
    block.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i)?.[1] || ""
  ];

  return candidates.map(cleanImageUrl).find(Boolean) || "";
}

function safeDate(value: string) {
  const time = value ? Date.parse(value) : NaN;
  return Number.isFinite(time) ? new Date(time).toISOString() : new Date().toISOString();
}

function categorize(text: string, fallback: SignalCategory): SignalCategory {
  const haystack = text.toLowerCase();
  const checks: Array<[SignalCategory, string[]]> = [
    ["AI Infrastructure", [" ai ", "artificial intelligence", "agent", "model", "gpu", "compute", "document intelligence"]],
    ["RWA Tokenization", ["tokenization", "tokenized", "rwa", "real-world asset", "fund token"]],
    ["Stablecoins & Payments", ["stablecoin", "usdc", "usdt", "payment", "settlement", "remittance"]],
    ["Custody & Wallets", ["custody", "custodian", "wallet", "mpc", "private key"]],
    ["KYC, AML & Compliance", ["kyc", "aml", "sanction", "compliance", "travel rule", "identity"]],
    ["Smart Contracts & Security", ["smart contract", "audit", "security", "exploit", "vulnerability"]],
    ["DeFi & Market Infrastructure", ["defi", "dex", "perpetual", "trading", "liquidity", "exchange"]],
    ["Regulation & Policy", ["sec", "cftc", "regulation", "policy", "regulator", "mifid", "mica"]],
    ["Blockchain Ecosystems", ["ethereum", "solana", "base", "polygon", "avalanche", "bitcoin", "blockchain"]]
  ];

  return checks.find(([, keywords]) => keywords.some((keyword) => haystack.includes(keyword)))?.[0] || fallback;
}

function toDbNews(item: NewsItem) {
  return {
    source_name: item.sourceName,
    source_url: item.sourceUrl,
    title: item.title,
    canonical_url: item.canonicalUrl,
    summary: item.summary,
    category: item.category,
    published_at: item.publishedAt,
    image_url: item.imageUrl || null,
    imported_at: item.importedAt || new Date().toISOString(),
    raw_payload: item
  };
}

function fromDbNews(row: Record<string, unknown>): NewsItem {
  const rawPayload = row.raw_payload as { imageUrl?: string } | undefined;

  return {
    id: String(row.id || ""),
    sourceName: String(row.source_name || ""),
    sourceUrl: String(row.source_url || ""),
    title: String(row.title || ""),
    canonicalUrl: String(row.canonical_url || ""),
    summary: String(row.summary || ""),
    category: String(row.category || "Institutional Adoption") as SignalCategory,
    publishedAt: String(row.published_at || row.imported_at || new Date().toISOString()),
    imageUrl: String(row.image_url || rawPayload?.imageUrl || "") || undefined,
    importedAt: row.imported_at ? String(row.imported_at) : undefined
  };
}

function toDbJob(item: JobItem) {
  return {
    company_name: item.companyName,
    company_url: item.companyUrl,
    title: item.title,
    canonical_url: item.canonicalUrl,
    location: item.location,
    department: item.department,
    category: item.category,
    source_name: item.sourceName,
    posted_at: item.postedAt,
    expires_at: item.expiresAt || null,
    imported_at: item.importedAt || new Date().toISOString(),
    raw_payload: item
  };
}

function fromDbJob(row: Record<string, unknown>): JobItem {
  return {
    id: String(row.id || ""),
    companyName: String(row.company_name || ""),
    companyUrl: String(row.company_url || ""),
    title: String(row.title || ""),
    canonicalUrl: String(row.canonical_url || ""),
    location: String(row.location || "Remote / Global"),
    department: String(row.department || "Infrastructure"),
    category: String(row.category || "Institutional Adoption") as SignalCategory,
    sourceName: String(row.source_name || ""),
    postedAt: String(row.posted_at || row.imported_at || new Date().toISOString()),
    expiresAt: row.expires_at ? String(row.expires_at) : null,
    importedAt: row.imported_at ? String(row.imported_at) : undefined
  };
}

async function supabaseSelect(table: string, query: string) {
  const config = supabaseConfig();
  if (!config) return null;

  const response = await fetch(`${config.url}/rest/v1/${table}?${query}`, {
    headers: restHeaders(config.key),
    next: { revalidate: 900 }
  });

  if (!response.ok) {
    const detail = await response.text();
    if (response.status === 404 || detail.includes("PGRST205") || detail.includes("Could not find the table")) {
      return null;
    }

    console.warn(`Supabase select failed for ${table}: ${detail}`);
    return null;
  }

  return (await response.json()) as Array<Record<string, unknown>>;
}

async function supabaseUpsert(table: string, rows: Array<Record<string, unknown>>) {
  const config = supabaseConfig();
  if (!config || rows.length === 0) return { ok: false, count: 0, error: "Supabase is not configured." };

  const response = await fetch(`${config.url}/rest/v1/${table}?on_conflict=canonical_url`, {
    method: "POST",
    headers: {
      ...restHeaders(config.key),
      Prefer: "resolution=merge-duplicates,return=minimal"
    },
    body: JSON.stringify(rows)
  });

  if (!response.ok) {
    return { ok: false, count: 0, error: await response.text() };
  }

  return { ok: true, count: rows.length, error: null };
}

export async function getNewsItems(limit = NEWS_LIMIT) {
  const rows = await supabaseSelect(
    "news_items",
    `select=*&status=eq.published&order=published_at.desc&limit=${encodeURIComponent(String(limit))}`
  );

  const storedItems = rows?.map(fromDbNews).filter((item) => item.title && item.canonicalUrl) || [];
  if (storedItems.length > 0) {
    return preserveFluidRwaAnnouncements([...fluidRwaNewsItems, ...storedItems], limit);
  }

  const liveResults = await Promise.allSettled(newsSources.map(fetchRssItems));
  const liveItems = dedupeByUrl(
    liveResults.flatMap((result) => (result.status === "fulfilled" ? result.value : []))
  );

  const sortedLiveItems = preserveFluidRwaAnnouncements([...fluidRwaNewsItems, ...liveItems], limit);
  return sortedLiveItems.length > 0 ? sortedLiveItems : preserveFluidRwaAnnouncements([...fluidRwaNewsItems, ...fallbackNews], limit);
}

export async function getJobItems(limit = JOB_LIMIT) {
  const now = encodeURIComponent(new Date().toISOString());
  const rows = await supabaseSelect(
    "job_items",
    `select=*&status=eq.published&or=(expires_at.is.null,expires_at.gt.${now})&order=posted_at.desc&limit=${encodeURIComponent(String(limit))}`
  );

  const storedItems = rows?.map(fromDbJob).filter((item) => item.title && item.canonicalUrl) || [];
  if (storedItems.length > 0) return storedItems;

  const liveResults = await Promise.allSettled(jobSources.map(fetchGreenhouseJobs));
  const liveItems = dedupeByUrl(
    liveResults.flatMap((result) => (result.status === "fulfilled" ? result.value : []))
  );

  const sortedLiveItems = byNewest(liveItems).slice(0, limit);
  return sortedLiveItems.length > 0 ? sortedLiveItems : fallbackJobs;
}

export async function fetchRssItems(source: RssSource) {
  const response = await fetch(source.url, {
    headers: {
      "User-Agent": "FluidRWA market signal crawler (+https://www.fluidrwa.com/news)"
    },
    next: { revalidate: 0 }
  });

  if (!response.ok) throw new Error(`${source.name} RSS failed with ${response.status}`);

  const xml = await response.text();
  const blocks = xml.match(/<item[\s\S]*?<\/item>/gi) || xml.match(/<entry[\s\S]*?<\/entry>/gi) || [];
  return blocks.slice(0, 15).map((block) => {
    const title = getTag(block, "title");
    const canonicalUrl = getLink(block);
    const summary = excerpt(getTag(block, "description") || getTag(block, "summary") || getTag(block, "content"));
    const publishedAt = safeDate(getTag(block, "pubDate") || getTag(block, "published") || getTag(block, "updated"));
    const category = categorize(`${title} ${summary}`, source.defaultCategory);
    const imageUrl = getRssImage(block);

    return {
      sourceName: source.name,
      sourceUrl: source.sourceUrl,
      title,
      canonicalUrl,
      summary,
      category,
      publishedAt,
      imageUrl: imageUrl || undefined
    } satisfies NewsItem;
  }).filter((item) => item.title && item.canonicalUrl);
}

export async function fetchGreenhouseJobs(source: GreenhouseSource) {
  const response = await fetch(source.boardUrl, {
    headers: {
      "User-Agent": "FluidRWA jobs index (+https://www.fluidrwa.com/jobs)"
    },
    next: { revalidate: 0 }
  });

  if (!response.ok) throw new Error(`${source.companyName} jobs failed with ${response.status}`);

  const data = (await response.json()) as { jobs?: GreenhouseJob[] };
  return (data.jobs || []).slice(0, 25).map((job) => {
    const department = job.departments?.map((item) => item.name).filter(Boolean).join(", ") || "Infrastructure";
    const title = job.title || "";
    const postedAt = safeDate(job.updated_at || "");
    const category = categorize(`${title} ${department}`, "Blockchain Ecosystems");
    const expiresAt = new Date(Date.parse(postedAt) + 45 * 24 * 60 * 60 * 1000).toISOString();

    return {
      companyName: source.companyName,
      companyUrl: source.companyUrl,
      title,
      canonicalUrl: job.absolute_url || source.companyUrl,
      location: job.location?.name || "Remote / Global",
      department,
      category,
      sourceName: "Greenhouse",
      postedAt,
      expiresAt
    } satisfies JobItem;
  }).filter((item) => item.title && item.canonicalUrl);
}

export async function ingestMarketSignals() {
  noStore();

  const newsResults = await Promise.allSettled(newsSources.map(fetchRssItems));
  const jobResults = await Promise.allSettled(jobSources.map(fetchGreenhouseJobs));

  const news = newsResults.flatMap((result) => (result.status === "fulfilled" ? result.value : []));
  const jobs = jobResults.flatMap((result) => (result.status === "fulfilled" ? result.value : []));

  const newsInsert = await supabaseUpsert("news_items", news.map(toDbNews));
  const jobInsert = await supabaseUpsert("job_items", jobs.map(toDbJob));

  return {
    ok: newsInsert.ok && jobInsert.ok,
    news: {
      fetched: news.length,
      stored: newsInsert.count,
      failedSources: newsResults.filter((result) => result.status === "rejected").length,
      storageError: newsInsert.error
    },
    jobs: {
      fetched: jobs.length,
      stored: jobInsert.count,
      failedSources: jobResults.filter((result) => result.status === "rejected").length,
      storageError: jobInsert.error
    }
  };
}

export function formatSignalDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}
