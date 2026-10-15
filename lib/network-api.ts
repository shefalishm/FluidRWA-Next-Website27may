import { assetRegistry, infrastructureRelationships, registryUpdated, registryValueStatus } from "@/lib/network-intelligence";

export const networkApiVersion = "1.0";

export function pagination(params: URLSearchParams) {
  const requestedLimit = Number(params.get("limit") || 50);
  const requestedOffset = Number(params.get("offset") || 0);
  return {
    limit: Number.isInteger(requestedLimit) ? Math.min(100, Math.max(1, requestedLimit)) : 50,
    offset: Number.isInteger(requestedOffset) ? Math.min(10000, Math.max(0, requestedOffset)) : 0
  };
}

export function filterRegistry(params: URLSearchParams) {
  const q = (params.get("q") || "").trim().toLowerCase().slice(0, 100);
  const issuer = (params.get("issuer") || "").trim().toLowerCase().slice(0, 100);
  const assetClass = (params.get("asset_class") || "").trim().toLowerCase().slice(0, 100);
  const cohort = (params.get("cohort") || "").trim().toLowerCase().slice(0, 100);
  return assetRegistry.filter(asset =>
    (!q || `${asset.name} ${asset.issuer} ${asset.assetClass} ${asset.structure}`.toLowerCase().includes(q)) &&
    (!issuer || asset.issuer.toLowerCase() === issuer) &&
    (!assetClass || asset.assetClass.toLowerCase() === assetClass) &&
    (!cohort || asset.cohort.toLowerCase() === cohort)
  );
}

export function filterRelationships(params: URLSearchParams) {
  const assetId = (params.get("asset_id") || "").trim().toLowerCase().slice(0, 100);
  const provider = (params.get("provider") || "").trim().toLowerCase().slice(0, 100);
  const role = (params.get("role") || "").trim().toLowerCase().slice(0, 100);
  return infrastructureRelationships.filter(edge =>
    (!assetId || edge.assetId.toLowerCase() === assetId) &&
    (!provider || edge.provider.toLowerCase() === provider) &&
    (!role || edge.role.toLowerCase() === role)
  );
}

function countBy<T>(rows: T[], key: (row: T) => string) {
  return Object.fromEntries([...new Set(rows.map(key))].sort().map(value => [value, rows.filter(row => key(row) === value).length]));
}

export function coverage() {
  const now = Date.now();
  return {
    version: networkApiVersion,
    updated: registryUpdated,
    scope: "FluidRWA source-linked registry, not a global asset census or market-value estimate",
    identifiedRecords: assetRegistry.length,
    researchProfiles: assetRegistry.filter(asset => asset.cohort === "Research profile").length,
    issuerListRecords: assetRegistry.filter(asset => asset.cohort !== "Research profile").length,
    datedValueRecords: assetRegistry.filter(asset => asset.reportedValueUsd !== null && asset.reportedAsOf).length,
    sourceListedContractRecords: assetRegistry.filter(asset => asset.contractEvidence).length,
    documentedRelationships: infrastructureRelationships.length,
    relationshipAssets: new Set(infrastructureRelationships.map(edge => edge.assetId)).size,
    relationshipProviders: new Set(infrastructureRelationships.map(edge => edge.provider)).size,
    byCohort: countBy(assetRegistry, asset => asset.cohort),
    byAssetClass: countBy(assetRegistry, asset => asset.assetClass),
    byValueStatus: countBy(assetRegistry, asset => registryValueStatus(asset, now)),
    definitions: {
      identifiedRecords: "Distinct issuer-list entries or research profiles. Products from different issuers may track the same underlying.",
      datedValueRecords: "Records with a reviewed issuer-reported USD figure and its original reporting date; not synchronized or additive.",
      sourceListedContractRecords: "Records with an issuer-listed contract link; not an independent contract or trading audit.",
      documentedRelationships: "Source-linked asset-to-provider role statements. Historical announcements retain their original scope."
    }
  };
}

export function apiResponse(body: unknown) {
  return Response.json(body, { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } });
}
