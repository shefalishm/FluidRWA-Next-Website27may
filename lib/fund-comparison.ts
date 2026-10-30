import report from "@/data/research/tokenized-fund-infrastructure-2026-10-v2.json";

export { report as fundComparisonReport };
export const comparisonEdition = "fund-operating-models-2026-10-v2";
export const comparisonUrl = "https://www.fluidrwa.com/network-explorer/fund-comparison";
export const comparisonCitation = `FluidRWA Research Team. Fund operating-model comparison, edition ${report.version}, 26-product purposive sample. Original sources checked 21 October 2026; added sources checked 23 October 2026. ${comparisonUrl}`;
export type Fund = typeof report.funds[number];
export type FundRole = typeof report.roles[number]["id"];

export function fundEvidenceStatistics() {
  const total = report.funds.length;
  return report.roles.map(role => {
    const named = report.funds.filter(fund => fund.claims.some(claim => claim.role === role.id)).length;
    return { role: role.id, label: role.label, named, total, unresolved: total - named, percent: Math.round(named * 1000 / total) / 10 };
  });
}

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
  return fundIds.map(id => report.funds.find(fund => fund.id === id)).filter((fund): fund is Fund => Boolean(fund)).flatMap(fund => report.roles.flatMap(role => {
    const claims = fund.claims.filter(claim => claim.role === role.id);
    return (claims.length ? claims : [null]).map(claim => {
      const source = claim ? report.sources.find(source => source.id === claim.source) : null;
      const lastFundCheck = fund.sources.map(id => report.sources.find(item => item.id === id)?.checked).filter(Boolean).sort().at(-1) || report.checked;
      return {
        edition: report.version, fund_id: fund.id, fund: fund.name, ticker: fund.ticker,
        structure: fund.structure, family: fund.family, role: role.label,
        provider_as_documented: claim?.provider || "Not identified in reviewed sources",
        scope: claim?.scope || report.unknownMeaning, fund_note: fund.note,
        source_url: source?.url || "", source_title: source?.title || "",
        source_published: source?.published || "", documents_checked: source?.checked || lastFundCheck
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
