import { comparisonCsv, comparisonRows, comparisonCitation, fundComparisonReport as report } from "@/lib/fund-comparison";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const requested = params.has("funds") ? (params.get("funds") || "").split(",") : report.funds.map(fund => fund.id);
  const allowed = new Set(report.funds.map(fund => fund.id));
  if (!requested.length || requested.length > report.funds.length || new Set(requested).size !== requested.length || requested.some(id => !allowed.has(id))) {
    return Response.json({ error: `Use one to ${report.funds.length} distinct fund IDs from the research edition.` }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }
  const format = params.get("format") || "json";
  if (!["csv", "json"].includes(format)) return Response.json({ error: "Supported formats: csv, json." }, { status: 400 });
  const headers = { "Cache-Control": "public, max-age=3600", "X-Content-Type-Options": "nosniff" };
  if (format === "csv") return new Response(comparisonCsv(requested), { headers: { ...headers, "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="fluidrwa-fund-comparison-${report.version}.csv"` } });
  return Response.json({ edition: report.version, documentsChecked: report.checked, citation: comparisonCitation, selection: report.selection, unknownMeaning: report.unknownMeaning, rows: comparisonRows(requested), sources: report.sources }, { headers });
}
