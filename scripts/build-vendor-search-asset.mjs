import fs from 'node:fs';
import assert from 'node:assert/strict';

const html = fs.readFileSync('vendor-ecosystem.html', 'utf8');
const embedded = html.match(/<script id="vendor-search-index-data" type="application\/json">([\s\S]*?)<\/script>/)?.[1];
assert.ok(embedded, 'Source vendor search index missing');
const decoded = embedded.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const rows = JSON.parse(decoded);
assert.ok(Array.isArray(rows) && rows.length > 800, 'Vendor search index is incomplete');
const output = JSON.stringify(rows).replace(/</g, '\\u003c');
const target = 'public/assets/datasets/vendor-search-index.json';
if (process.argv.includes('--check')) {
  assert.equal(fs.readFileSync(target, 'utf8'), output, 'Vendor search asset is stale; run node scripts/build-vendor-search-asset.mjs');
} else {
  fs.mkdirSync('public/assets/datasets', { recursive: true });
  fs.writeFileSync(target, output);
}
console.log(`Vendor search asset: ${rows.length} unchanged records, ${Buffer.byteLength(output)} bytes.`);
