import assert from "node:assert/strict";
import fs from "node:fs";
import ts from "typescript";

const source = fs.readFileSync(
  new URL("../lib/network-preview.ts", import.meta.url),
  "utf8",
);
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
const {
  entities,
  relationships,
  activeRelationships,
  layers,
  networkViews,
  selectNetwork,
  relatedEntities,
} = await import(
  `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`
);

assert.equal(new Set(entities.map((e) => e.id)).size, entities.length);
assert.equal(
  new Set(relationships.map((r) => r.relationship_id)).size,
  relationships.length,
);
assert(!entities.some((e) => /spec intelligence/i.test(e.name)));
for (const edge of relationships) {
  assert(entities.some((e) => e.id === edge.source_entity_id));
  assert(entities.some((e) => e.id === edge.target_entity_id));
  assert.equal(edge.verification_status, "sample");
  assert.equal(edge.evidence_url, null);
}
assert(!activeRelationships.some((r) => r.verification_status === "inferred"));
for (const entity of entities) {
  if (entity.image)
    assert(
      fs.existsSync(new URL(`../public${entity.image}`, import.meta.url)),
      entity.image,
    );
  if (entity.profile_url)
    assert(
      fs.existsSync(
        new URL(`..${entity.profile_url}/index.html`, import.meta.url),
      ),
      entity.profile_url,
    );
}
for (const view of networkViews) assert(selectNetwork(view.id, {}).total > 0);
for (const layer of layers.filter((l) => l.id !== "blockchains"))
  assert(relatedEntities(layer.id, "Company").length > 0);
assert.equal(
  selectNetwork("rwa-ecosystem", { category: "tokenization", region: "europe" })
    .total,
  3,
);
assert.deepEqual(
  selectNetwork("rwa-ecosystem", {}, "real estate UAE").companies.map(
    (e) => e.id,
  ),
  ["zoniqx"],
);
assert.deepEqual(
  selectNetwork(
    "rwa-ecosystem",
    {},
    "I am launching a tokenized real-estate fund in the UAE",
  ).companies.map((e) => e.id),
  ["zoniqx"],
);
assert.equal(
  selectNetwork("rwa-ecosystem", {}, "Ethereum tokenization").total,
  5,
);
assert.equal(selectNetwork("rwa-ecosystem", { status: "verified" }).total, 0);
assert.equal(selectNetwork("rwa-ecosystem", {}, "unknown company").total, 0);
console.log(
  `PASS: ${entities.length} entities, ${relationships.length} sample connections, logos, profile links, layers, combined filters and multi-term search.`,
);
