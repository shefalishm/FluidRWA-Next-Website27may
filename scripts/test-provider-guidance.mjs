import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const file = "lib/vendorAnswerGuidance.ts";
const source = fs.readFileSync(file, "utf8");
const module = { exports: {} };
vm.runInNewContext(ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
}).outputText, module);
const render = module.exports.vendorAnswerGuidance;
const evidence = JSON.parse(fs.readFileSync("data/provider-guidance-checks-2026-11-18.json", "utf8"));
const records = new Map(evidence.records.map(row => [row.provider, row]));
const names = new Set();
for (const [key, count] of [["family-offices", 7], ["broker-dealers", 12]]) {
  const html = render("vendors/" + key + "/index.html");
  assert.ok(html.includes("The order is alphabetical, not a ranking."));
  const lists = [...html.matchAll(/<ul>([\s\S]*?)<\/ul>/g)];
  let actual = 0;
  for (const [, list] of lists) {
    const providers = [...list.matchAll(/<li><strong>([^<]+)<\/strong>: ([^<]+)<\/li>/g)];
    const order = providers.map(([, name]) => name);
    assert.deepEqual(order, [...order].sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" })));
    for (const [, name, line] of providers) {
      const row = records.get(name);
      assert.equal(row?.outcome, "pass", name);
      assert.equal(row.checkedDate, "2026-11-18");
      assert.ok(row.source.startsWith("https://"));
      assert.ok(!/\d|regulated|licen[cs]|charter|AUM|yield|vetted|paid|best|—/i.test(line), name);
      assert.ok(line.split(/\s+/).length <= 10, name);
      names.add(name);
      actual++;
    }
  }
  assert.equal(actual, count, key);
  assert.ok(!html.includes("Rockefeller"));
  for (const row of evidence.records.filter(row => row.outcome !== "pass")) {
    assert.ok(!html.includes("<strong>" + row.provider + "</strong>"), row.provider);
  }
}
assert.equal(names.size, evidence.records.filter(row => row.outcome === "pass").length);
assert.equal(evidence.records.length, 19);
console.log("PASS: 19 candidates recorded; 17 unique passing providers, 7 family-office entries and 12 broker-dealer entries; alphabetical groups, bounded descriptions and omitted failed/incomplete checks.");
