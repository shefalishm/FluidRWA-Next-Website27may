import snapshot from "@/data/network-intelligence.json";
import ramp from "@/data/ramp-onboarding-dataset.json";
import registryCandidates from "@/data/asset-registry-candidates.json";
import ondoTokenList from "@/data/issuer-tokenlist-ondo.json";
import xstocksTokenList from "@/data/issuer-tokenlist-xstocks.json";
import robinhoodAssets from "@/data/issuer-api-robinhood.json";
import wisdomtreeFunds from "@/data/issuer-funds-wisdomtree.json";
import infrastructureRelationships from "@/data/asset-infrastructure-relationships.json";

export { snapshot, ramp };
export { infrastructureRelationships };
export const issuerListSelections = [ondoTokenList.selection, xstocksTokenList.selection, robinhoodAssets.selection, wisdomtreeFunds.selection];
export const explorerViews = ["assets", "registry", "networks", "vendors", "jurisdictions", "research", "methodology"] as const;
export type ExplorerView = "overview" | typeof explorerViews[number];
export type Asset = typeof snapshot.assets[number];
export const assetRegistry = [
  ...snapshot.assets.map(asset => ({
    id: asset.id, name: asset.name, issuer: asset.issuer, assetClass: asset.category,
    structure: asset.id === "usdc" ? "USD-referenced stablecoin" : "Tokenized government money fund",
    source: asset.source, sourceLabel: asset.sourceLabel, sourceReviewed: snapshot.reviewed,
    notes: asset.notes, reportedValueUsd: asset.value as number | null,
    reportedMetric: asset.metric as string | null, reportedAsOf: asset.asOf as string | null,
    freshnessDays: asset.freshnessDays,
    contractEvidence: asset.id === "wtgxx" ? asset.source as string | null : null,
    cohort: "Research profile", sourcePublished: null as string | null
  })),
  ...registryCandidates.map(asset => ({ ...asset, cohort: "Research profile", sourcePublished: null as string | null })),
  ...ondoTokenList.assets,
  ...xstocksTokenList.assets,
  ...robinhoodAssets.assets,
  ...wisdomtreeFunds.assets.map(({ symbol }) => ({
    id: `wisdomtree-${symbol.toLowerCase()}`, name: `${symbol} - WisdomTree Digital Fund`, issuer: "WisdomTree",
    assetClass: "Blockchain-enabled funds", structure: "Digital fund; blockchain is a secondary ownership record",
    cohort: "WisdomTree digital funds", source: wisdomtreeFunds.source, sourceLabel: "WisdomTree Prime official fund roster",
    sourcePublished: null as string | null, sourceReviewed: wisdomtreeFunds.sourceReviewed,
    notes: "Issuer named this ticker among its digital funds. No contract, current NAV, fund size or investor eligibility is verified in this record.",
    reportedValueUsd: null as number | null, reportedMetric: null as string | null, reportedAsOf: null as string | null,
    freshnessDays: 35, contractEvidence: null as string | null
  }))
].sort((a,b) => a.name.localeCompare(b.name));
export const registryUpdated = [...assetRegistry.map(asset => asset.sourceReviewed), ...infrastructureRelationships.map(row => row.reviewed)].sort().at(-1) || snapshot.reviewed;
export type RegistryAsset = typeof assetRegistry[number];
export function registryValueStatus(asset: RegistryAsset, now: number) {
  if (asset.reportedValueUsd === null || !asset.reportedAsOf) return "Value not verified";
  return daysOld(asset.reportedAsOf, now) > asset.freshnessDays ? "Historical value" : "Current disclosure";
}
export function daysOld(date: string, now = Date.now()) {
  return Math.max(0, Math.floor((now - Date.parse(`${date}T00:00:00Z`)) / 86400000));
}
export function isHistorical(asset: Asset, now = Date.now()) {
  return daysOld(asset.asOf, now) > asset.freshnessDays;
}
export function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact", minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(value);
}
export function dated(value: string | null) {
  if (!value) return "Not supplied";
  const date = new Date(`${value}T00:00:00Z`);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${date.getUTCDate()} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}
export const providers = [...new Set(ramp.rows.map(row => row.provider))];
export const jurisdictions = [...new Set(snapshot.regulations.map(row => row.jurisdiction))];
