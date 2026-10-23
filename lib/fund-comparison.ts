import report from "@/data/research/tokenized-fund-infrastructure-2026-10-v1.json";

export { report as fundComparisonReport };
export const comparisonEdition = "fund-operating-models-2026-10-v1";
export const comparisonUrl = "https://www.fluidrwa.com/network-explorer/fund-comparison";
export const comparisonCitation = `FluidRWA Research Team. The firms behind tokenized funds: operating-model comparison. Dataset ${report.version}, documents checked 21 October 2026. ${comparisonUrl}`;
export type Fund = typeof report.funds[number];
export type FundRole = typeof report.roles[number]["id"];

// These are display groups, not a reconciliation of contracting legal entities.
export function providerGroup(name: string) {
  if (["BNY", "BNY Mellon", "Bank of New York Mellon", "The Bank of New York Mellon"].includes(name)) return "BNY (source names grouped)";
  if (["Anchorage", "Anchorage Digital"].includes(name)) return "Anchorage (source names grouped)";
  return name;
}

export function providerFootprint(role: string) {
  const groups = new Map<string, { provider: string; funds: Fund[]; sourceNames: string[]; families: string[] }>();
  for (const fund of report.funds) {
    for (const claim of fund.claims.filter(claim => claim.role === role)) {
      const provider = providerGroup(claim.provider);
      const group = groups.get(provider) || { provider, funds: [], sourceNames: [], families: [] };
      if (!group.funds.some(row => row.id === fund.id)) group.funds.push(fund);
      if (!group.sourceNames.includes(claim.provider)) group.sourceNames.push(claim.provider);
      if (!group.families.includes(fund.family)) group.families.push(fund.family);
      groups.set(provider, group);
    }
  }
  return [...groups.values()].sort((a, b) => a.provider.localeCompare(b.provider));
}

export function comparisonRows(fundIds: string[]) {
  return report.funds.filter(fund => fundIds.includes(fund.id)).flatMap(fund => report.roles.flatMap(role => {
    const claims = fund.claims.filter(claim => claim.role === role.id);
    return (claims.length ? claims : [null]).map(claim => {
      const source = claim ? report.sources.find(source => source.id === claim.source) : null;
      return {
        edition: report.version, fund_id: fund.id, fund: fund.name, ticker: fund.ticker,
        structure: fund.structure, family: fund.family, role: role.label,
        provider_as_documented: claim?.provider || "Not identified in reviewed sources",
        scope: claim?.scope || report.unknownMeaning, fund_note: fund.note,
        source_url: source?.url || "", source_title: source?.title || "",
        source_published: source?.published || "", documents_checked: source?.checked || report.checked
      };
    });
  }));
}

export function comparisonCsv(fundIds: string[]) {
  const rows = comparisonRows(fundIds);
  if (!rows.length) return "";
  const keys = Object.keys(rows[0]) as (keyof typeof rows[number])[];
  const cell = (value: string) => `"${(/^[=+@-]/.test(value) ? "'" + value : value).replaceAll('"', '""')}"`;
  return [keys.map(cell).join(","), ...rows.map(row => keys.map(key => cell(row[key])).join(","))].join("\n") + "\n";
}

export function researchRequest(funds: Fund[], role?: string) {
  const query = new URLSearchParams({ source: "explorer-fund-comparison", topic: funds.map(fund => fund.ticker).join(","), category: role || "Tokenized fund infrastructure", shortlist: `Fund operating-model examples (not provider recommendations): ${funds.map(fund => fund.ticker).join(", ")}. Responsibility: ${role || "Fund infrastructure"}` });
  return `/submit-requirement?${query}`;
}
