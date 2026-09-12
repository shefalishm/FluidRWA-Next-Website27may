import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const ecosystemPath = path.join(root, "vendor-ecosystem.html");
const profilesPath = path.join(root, "data/company-profiles.json");
const outputDirectory = path.join(root, "public/assets/vendor-logos");
const registryPath = path.join(root, "public/assets/vendor-logo-registry.json");

// Product and division names often resolve to unrelated companies in a name
// search. These reviewed domains keep the resulting brand marks trustworthy.
const domainOverrides = {
  "aster": "asterdex.com", "aevo": "aevo.xyz", "realt": "realt.co",
  "maple-finance": "maple.finance", "swarm-markets": "swarm.markets",
  "stegx": "stegx.finance", "stride": "stride.sc", "ramp-network": "ramp.network", "rain": "rain.com",
  "synaps": "synaps.io", "regula": "regulaforensics.com", "sift": "sift.com",
  "dock-io": "dock.io", "cobo": "cobo.com", "gelato-network": "gelato.network",
  "axelar": "axelar.network", "inx": "inx.co", "marketacross": "marketacross.com",
  "coinzilla": "coinzilla.com", "messari": "messari.io",
  "vertex-protocol": "vertexprotocol.com", "jupiter-perps": "jup.ag",
  "drift-protocol": "drift.trade", "mux-protocol": "mux.network",
  "iotex-w3bstream": "iotex.io", "polymath-polymesh": "polymesh.network",
  "openeden": "openeden.com", "plume-network": "plume.org",
  "mantra-chain": "mantra.finance", "figure-markets": "figuremarkets.com",
  "matrixdock": "matrixdock.com", "hashnote": "hashnote.com", "taurus": "taurushq.com",
  "libertum": "libertum.io", "stripe-crypto": "stripe.com", "paypal-crypto": "paypal.com",
  "ripple-payments": "ripple.com", "stellar-sdf": "stellar.org",
  "bridge-stripe": "bridge.xyz", "checkout-com-crypto": "checkout.com",
  "kado": "kado.money", "persona": "withpersona.com", "worldcoin-world-id": "world.org",
  "polygon-id": "privado.id", "coinbase-custody": "coinbase.com",
  "bny-digital-assets": "bny.com", "ledger-enterprise": "ledger.com",
  "ripple-custody": "ripple.com", "safe-gnosis": "safe.global", "casa": "keys.casa",
  "gemini-custody": "gemini.com", "sherlock": "sherlock.xyz",
  "layerzero": "layerzero.network", "polygon-labs": "polygon.technology",
  "starknet-starkware": "starknet.io", "sailo-technologies": "sailo.tech", "sdx-six": "sdx.com",
  "coinbase-prime": "coinbase.com", "kraken-institutional": "kraken.com",
  "gsr-markets": "gsr.io", "b2c2": "b2c2.com", "broadridge-dlt": "broadridge.com",
  "franklin-onchain": "franklintempleton.com", "okx-institutional": "okx.com",
  "cumberland-drw": "cumberland.io", "goodwin-procter": "goodwinlaw.com",
  "k-l-gates": "klgates.com", "blockwiz": "blockwiz.com", "brave-ads": "brave.com",
  "dune-analytics": "dune.com", "the-block-research": "theblock.co", "amazix": "amazix.com",
};

const normalize = (value = "") => value
  .toLowerCase()
  .replace(/&amp;/g, "and")
  .replace(/[^a-z0-9]+/g, "")
  .trim();

const slugify = (value = "") => value
  .toLowerCase()
  .replace(/&amp;/g, "and")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");

const domainFromUrl = (value = "") => {
  try {
    const hostname = new URL(value).hostname.replace(/^www\./, "");
    return hostname.endsWith("fluidrwa.com") ? "" : hostname;
  } catch {
    return "";
  }
};

const fetchWithTimeout = async (url, timeout = 12000) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    return await fetch(url, {
      headers: { "User-Agent": "FluidRWA vendor directory logo builder" },
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
};

const mapLimit = async (items, limit, worker) => {
  const results = new Array(items.length);
  let cursor = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await worker(items[index], index);
    }
  });
  await Promise.all(runners);
  return results;
};

const ecosystemHtml = await fs.readFile(ecosystemPath, "utf8");
const profiles = JSON.parse(await fs.readFile(profilesPath, "utf8"));
const previousRegistry = JSON.parse(await fs.readFile(registryPath, "utf8").catch(() => "{}"));
const vendorDirectories = await fs.readdir(path.join(root, "vendors"), { withFileTypes: true });
const directoryHtml = await Promise.all(vendorDirectories
  .filter((entry) => entry.isDirectory())
  .map(async (entry) => {
    try {
      return await fs.readFile(path.join(root, "vendors", entry.name, "index.html"), "utf8");
    } catch {
      return "";
    }
  }));

const extractCards = (html, classNames) => [...html.matchAll(new RegExp(`<article class="(?:${classNames})[^\"]*"[\\s\\S]*?<\\/article>`, "g"))]
  .map((match) => {
    const cardHtml = match[0];
    const id = cardHtml.match(/\sid="([^"]+)"/)?.[1] || "";
    const heading = cardHtml.match(/<h3[^>]*>(?:<a[^>]*>)?([\s\S]*?)(?:<\/a>)?<\/h3>/i)?.[1] || "";
    const name = heading.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").trim();
    return { id: id || slugify(name), name };
  })
  .filter((card) => card.id && card.name);

const rawCards = [
  ...extractCards(ecosystemHtml, "vendor-card"),
  ...directoryHtml.flatMap((html) => extractCards(html, "bc-company-card|bc-provider-card")),
];
const groupedCards = new Map();
rawCards.forEach((card) => {
  const key = normalize(card.name);
  const current = groupedCards.get(key) || { ...card, id: slugify(card.name), aliases: new Set() };
  current.aliases.add(card.id);
  groupedCards.set(key, current);
});
const cards = [...groupedCards.values()].map((card) => ({ ...card, aliases: [...card.aliases] }));

const profileByName = new Map(Object.values(profiles).map((profile) => [normalize(profile.name), profile]));
const existingAssets = await fs.readdir(path.join(root, "public/assets/company-logos"));
const existingBySlug = new Map(existingAssets.map((file) => [slugify(path.parse(file).name), file]));

await fs.mkdir(outputDirectory, { recursive: true });

const discovered = await mapLimit(cards, 4, async (card) => {
  const profile = profileByName.get(normalize(card.name));
  const previous = [card.id, normalize(card.name), ...card.aliases]
    .map((key) => previousRegistry[key])
    .find((entry) => entry?.domain && entry.source !== "monogram");
  const existingFile = card.aliases.map((alias) => existingBySlug.get(alias)).find(Boolean) || existingBySlug.get(slugify(card.name));
  if (profile?.logoPath && profile.logoPath.startsWith("/assets/")) {
    return { ...card, logo: profile.logoPath, domain: domainFromUrl(profile.sourceUrl), source: "existing" };
  }
  if (existingFile) {
    return { ...card, logo: `/assets/company-logos/${existingFile}`, domain: domainFromUrl(profile?.sourceUrl), source: "existing" };
  }

  const reviewedDomain = card.aliases.map((alias) => domainOverrides[alias]).find(Boolean) || domainOverrides[card.id];
  let domain = reviewedDomain || domainFromUrl(profile?.sourceUrl) || previous?.domain || "";
  let confidence = reviewedDomain ? "reviewed" : domainFromUrl(profile?.sourceUrl) ? "profile" : previous?.source || "";
  if (!domain) {
    try {
      const response = await fetchWithTimeout(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${encodeURIComponent(card.name)}`);
      const candidates = response.ok ? await response.json() : [];
      const candidate = candidates.find((candidate) => normalize(candidate.name) === normalize(card.name));
      domain = candidate?.domain || "";
      confidence = candidate ? "exact-name" : "";
    } catch {
      domain = "";
    }
  }

  if (!domain) return { ...card, logo: "", domain: "", source: "monogram" };
  const logoPath = path.join(outputDirectory, `${card.id}.png`);
  try {
    const existingLogo = await fs.stat(logoPath).catch(() => null);
    if (existingLogo?.size >= 120) {
      return { ...card, logo: `/assets/vendor-logos/${card.id}.png`, domain, source: confidence };
    }

    let bytes;
    for (let attempt = 0; attempt < 3; attempt += 1) {
      const response = await fetchWithTimeout(`https://www.google.com/s2/favicons?domain_url=https://${domain}&sz=128`, 18000);
      const candidate = Buffer.from(await response.arrayBuffer());
      if (response.ok && candidate.length >= 120) {
        bytes = candidate;
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 350 * (attempt + 1)));
    }
    if (!bytes) throw new Error("Logo response was empty");
    await fs.writeFile(logoPath, bytes);
    return { ...card, logo: `/assets/vendor-logos/${card.id}.png`, domain, source: confidence };
  } catch {
    return { ...card, logo: "", domain, source: "monogram" };
  }
});

const registry = Object.fromEntries(discovered.flatMap((entry) => {
  const value = { name: entry.name, logo: entry.logo, domain: entry.domain, source: entry.source };
  return [[entry.id, value], [normalize(entry.name), value], ...entry.aliases.map((alias) => [alias, value])];
}));

await fs.writeFile(registryPath, `${JSON.stringify(registry, null, 2)}\n`);
const totals = discovered.reduce((summary, entry) => {
  summary[entry.source] = (summary[entry.source] || 0) + 1;
  return summary;
}, {});
console.log(JSON.stringify({ vendors: discovered.length, ...totals }, null, 2));
