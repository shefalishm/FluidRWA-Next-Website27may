import snapshot from "@/data/network-intelligence.json";
import ramp from "@/data/ramp-onboarding-dataset.json";

export { snapshot, ramp };
export const explorerViews = ["assets", "networks", "vendors", "jurisdictions", "research", "methodology"] as const;
export type ExplorerView = "overview" | typeof explorerViews[number];
export type Asset = typeof snapshot.assets[number];
export function daysOld(date: string, now = Date.now()) {
  return Math.max(0, Math.floor((now - Date.parse(`${date}T00:00:00Z`)) / 86400000));
}
export function isHistorical(asset: Asset, now = Date.now()) {
  return daysOld(asset.asOf, now) > asset.freshnessDays;
}
export function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 2 }).format(value);
}
export function dated(value: string | null) {
  return value ? new Date(`${value}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }) : "Not supplied";
}
export const providers = [...new Set(ramp.rows.map(row => row.provider))];
export const jurisdictions = [...new Set(snapshot.regulations.map(row => row.jurisdiction))];
