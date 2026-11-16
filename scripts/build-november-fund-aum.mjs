import assert from "node:assert/strict";
import fs from "node:fs";

const read = path => JSON.parse(fs.readFileSync(path, "utf8"));
const edition = read("data/research/fund-aum-2026-11-v1.json");
const history = read("data/fund-disclosure-history.json");
const csvPath = "public/assets/datasets/fund-aum-2026-11-v1.csv";
const columns = ["edition", "fund_id", "ticker", "fund_name_at_later_review", "metric", "reported_as_of", "value_usd", "source_url", "checked_on"];
const rows = edition.rows.flatMap(row => {
  const archived = history.observations.find(item => item.assetId === row.id && item.reportedAsOf === edition.earlierAsOf);
  assert.deepEqual(archived, { assetId: row.id, reportedAsOf: edition.earlierAsOf, value: row.earlier, checked: edition.earlierChecked, source: row.source });
  assert.ok(Number.isSafeInteger(row.later) && row.later > 0);
  return [
    [edition.earlierAsOf, row.earlier, edition.earlierChecked],
    [edition.laterAsOf, row.later, edition.laterChecked]
  ].map(record => [edition.version, row.id, row.ticker, row.name, edition.metric, record[0], record[1], row.source, record[2]]);
});
assert.equal(new Set(edition.rows.map(row => row.id)).size, 3);
const csv = [columns, ...rows].map(row => row.map(cell => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n") + "\n";
if (process.argv.includes("--check")) assert.equal(fs.readFileSync(csvPath, "utf8"), csv);
else fs.writeFileSync(csvPath, csv);
console.log("November fund AUM edition: three preserved baseline rows and three dated new rows.");
