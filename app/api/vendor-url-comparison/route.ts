import { NextResponse } from "next/server";

export const runtime = "nodejs";

type VendorUrlComparisonPayload = {
  urls?: string[];
  projectDescription?: string;
};

type VendorAnalysis = {
  url: string;
  name: string;
  score: number;
  fit: "Strong fit" | "Possible fit" | "Weak fit";
  summary: string;
  strengths: string[];
  watchouts: string[];
  relevantSignals: string[];
  missingSignals: string[];
  references: Array<{ label: string; url: string; evidence: string }>;
};

const MAX_URLS = 5;

const stopWords = new Set([
  "the", "and", "for", "with", "from", "that", "this", "into", "your", "you", "are", "our", "their", "they", "will", "need", "needs", "about",
  "have", "has", "can", "what", "which", "who", "when", "where", "how", "why", "rwa", "web3", "crypto", "blockchain", "project", "vendor",
  "vendors", "platform", "solution", "solutions", "service", "services", "company", "companies"
]);

const signalGroups = [
  { label: "Tokenization", terms: ["tokenization", "tokenized", "securities", "issuer", "issuance", "fund", "transfer", "asset", "rwa"] },
  { label: "Custody", terms: ["custody", "custodian", "mpc", "wallet", "wallets", "safekeeping", "treasury", "qualified"] },
  { label: "KYC / AML", terms: ["kyc", "kyb", "aml", "sanctions", "identity", "verification", "compliance", "onboarding"] },
  { label: "Stablecoin payments", terms: ["stablecoin", "payments", "payout", "settlement", "usdc", "virtual account", "fiat"] },
  { label: "Smart contracts", terms: ["smart contract", "solidity", "audit", "dapp", "protocol", "security", "defi"] },
  { label: "Data / Oracles", terms: ["oracle", "data", "proof of reserve", "price feeds", "market data", "nav"] },
  { label: "Infrastructure", terms: ["rpc", "node", "api", "indexing", "developer", "interoperability", "cross-chain"] },
  { label: "AI", terms: ["ai", "automation", "agent", "document", "intelligence", "workflow", "llm"] }
];

function normalizeUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const url = new URL(withProtocol);
    if (!["http:", "https:"].includes(url.protocol)) return null;
    return url.toString();
  } catch {
    return null;
  }
}

function stripHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeEntities(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, "/")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/\s+/g, " ")
    .trim();
}

function extractMeta(html: string, url: string) {
  const title = decodeEntities(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "");
  const description =
    html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["'][^>]*>/i)?.[1] ||
    html.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["'][^>]*>/i)?.[1] ||
    "";
  const siteName =
    html.match(/<meta[^>]+property=["']og:site_name["'][^>]+content=["']([^"']+)["'][^>]*>/i)?.[1] ||
    "";
  const host = new URL(url).hostname.replace(/^www\./, "");
  const name = decodeEntities(siteName || title.split(/[|–-]/)[0] || host);
  return {
    title: decodeEntities(title || host),
    description: decodeEntities(description),
    name: name.length > 42 ? host : name
  };
}

function keywords(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s/-]/g, " ")
    .split(/\s+/)
    .map((word) => word.trim())
    .filter((word) => word.length > 2 && !stopWords.has(word));
}

function findSignals(text: string) {
  const lower = text.toLowerCase();
  return signalGroups
    .filter((group) => group.terms.some((term) => lower.includes(term)))
    .map((group) => group.label);
}

function makeEvidence(text: string, terms: string[]) {
  const sentences = text.match(/[^.!?]+[.!?]?/g) || [text];
  const hit = sentences.find((sentence) => {
    const lower = sentence.toLowerCase();
    return terms.some((term) => lower.includes(term));
  });
  const clean = decodeEntities((hit || sentences[0] || text).replace(/\s+/g, " ").trim());
  return clean.length > 220 ? `${clean.slice(0, 217)}...` : clean;
}

async function fetchVendorPage(url: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8500);
  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent": "FluidRWA vendor comparison tool (+https://www.fluidrwa.com)"
      }
    });
    const contentType = response.headers.get("content-type") || "";
    if (!response.ok || !contentType.includes("text/html")) {
      return { ok: false as const, text: "", html: "", finalUrl: response.url || url, error: `Could not read website content (${response.status}).` };
    }
    const html = await response.text();
    return { ok: true as const, text: stripHtml(html).slice(0, 12000), html, finalUrl: response.url || url };
  } catch {
    return { ok: false as const, text: "", html: "", finalUrl: url, error: "Could not fetch this website. It may block automated reads." };
  } finally {
    clearTimeout(timeout);
  }
}

function scoreVendor(url: string, meta: { name: string; title: string; description: string }, pageText: string, projectDescription: string, error?: string): VendorAnalysis {
  const combined = `${meta.title} ${meta.description} ${pageText}`.trim();
  const projectTerms = [...new Set(keywords(projectDescription))].slice(0, 40);
  const vendorText = combined.toLowerCase();
  const matchedTerms = projectTerms.filter((term) => vendorText.includes(term));
  const relevantSignals = findSignals(combined);
  const projectSignals = findSignals(projectDescription);
  const signalMatches = relevantSignals.filter((signal) => projectSignals.includes(signal));
  const score = error
    ? 22
    : Math.min(96, Math.round(34 + matchedTerms.length * 4.2 + signalMatches.length * 9 + Math.min(relevantSignals.length, 5) * 3));
  const fit = score >= 72 ? "Strong fit" : score >= 48 ? "Possible fit" : "Weak fit";
  const missingSignals = projectSignals.filter((signal) => !relevantSignals.includes(signal)).slice(0, 4);
  const evidenceTerms = [...matchedTerms, ...projectSignals.flatMap((signal) => signalGroups.find((group) => group.label === signal)?.terms || [])].slice(0, 12);
  const evidence = error || makeEvidence(`${meta.description}. ${pageText}`, evidenceTerms.length ? evidenceTerms : ["platform", "solution", "service"]);
  const strengths = [
    matchedTerms.length ? `Matches project language around ${matchedTerms.slice(0, 5).join(", ")}.` : "Public website gives limited direct keyword match to the project brief.",
    relevantSignals.length ? `Shows signals for ${relevantSignals.slice(0, 4).join(", ")}.` : "Category fit is unclear from the readable website text.",
    meta.description ? "Has a clear public positioning statement available for comparison." : "Requires deeper manual review because the public description is thin."
  ];
  const watchouts = [
    missingSignals.length ? `Project signals not clearly visible: ${missingSignals.join(", ")}.` : "Still verify jurisdiction, pricing, implementation depth and references.",
    "Website copy is not proof of delivery; request case studies, architecture details and customer references.",
    "Confirm whether the vendor owns the workflow directly or relies on partners."
  ];

  return {
    url,
    name: meta.name || new URL(url).hostname.replace(/^www\./, ""),
    score,
    fit,
    summary: error
      ? "FluidRWA could not read enough public website content, so the score is intentionally conservative."
      : `${meta.description || meta.title || "The vendor has public website content available."}`,
    strengths,
    watchouts,
    relevantSignals,
    missingSignals,
    references: [
      {
        label: meta.title || meta.name || new URL(url).hostname,
        url,
        evidence
      }
    ]
  };
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as VendorUrlComparisonPayload;
    const projectDescription = typeof payload.projectDescription === "string" ? payload.projectDescription.trim() : "";
    const urls = (payload.urls || []).map((url) => normalizeUrl(String(url || ""))).filter(Boolean) as string[];
    const uniqueUrls = [...new Set(urls)].slice(0, MAX_URLS);

    if (!projectDescription || projectDescription.length < 30) {
      return NextResponse.json({ ok: false, message: "Please describe the project in a little more detail before scoring vendors." }, { status: 400 });
    }

    if (!uniqueUrls.length) {
      return NextResponse.json({ ok: false, message: "Please add at least one vendor website URL." }, { status: 400 });
    }

    const fetched = await Promise.all(uniqueUrls.map((url) => fetchVendorPage(url)));
    const vendors = fetched
      .map((result, index) => {
        const originalUrl = uniqueUrls[index];
        const meta = result.ok
          ? extractMeta(result.html, result.finalUrl)
          : { name: new URL(originalUrl).hostname.replace(/^www\./, ""), title: new URL(originalUrl).hostname, description: "" };
        return scoreVendor(result.finalUrl || originalUrl, meta, result.text, projectDescription, result.ok ? undefined : result.error);
      })
      .sort((a, b) => b.score - a.score);

    const projectSignals = findSignals(projectDescription);
    const recommendation = vendors[0]
      ? `${vendors[0].name} currently scores highest for the project brief, but the result should be validated with pricing, references, security evidence and jurisdiction checks.`
      : "Add vendor URLs to generate a comparison.";

    return NextResponse.json({
      ok: true,
      projectSignals,
      recommendation,
      vendors
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : "Could not generate the vendor comparison." },
      { status: 500 }
    );
  }
}
