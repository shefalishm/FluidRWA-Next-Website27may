import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync('assets/site.js', 'utf8');
const parseStart = source.indexOf('  const parseCategorySearchIndex =');
const parseEnd = source.indexOf('  const categorySearchIndex =', parseStart);
const loadStart = source.indexOf('  if (searchIndexSource) {');
const loadEnd = source.indexOf('\n  if (initialQuery)', loadStart);
assert.ok(parseStart >= 0 && parseEnd > parseStart && loadStart >= 0 && loadEnd > loadStart);
async function exercise({ offline = false, rows = [{ name: '10T Holdings', href: '/vendors/venture-capital#10t-holdings', category: 'Venture Capital' }] } = {}) {
  const context = { searchIndexSource: '/assets/datasets/vendor-search-index.json', searchIndexLoading: true, searchIndexFailed: false,
    categorySearchIndex: [], normalizeVendorText: text => text.toLowerCase(), updates: 0,
    updateVendorDirectory() { context.updates++; },
    fetch: async () => { if (offline) throw Error('offline'); return { ok: true, json: async () => rows }; }
  };
  vm.runInNewContext(source.slice(parseStart, parseEnd) + source.slice(loadStart, loadEnd), context);
  await new Promise(resolve => setImmediate(resolve));
  return context;
}
const loaded = await exercise();
assert.equal(loaded.categorySearchIndex[0].name, '10T Holdings');
assert.equal(loaded.categorySearchIndex[0].href, '/vendors/venture-capital#10t-holdings');
assert.equal(loaded.searchIndexLoading, false);
assert.equal(loaded.searchIndexFailed, false);
assert.equal(loaded.updates, 1);
for (const options of [{ offline: true }, { rows: [] }, { rows: {} }]) {
  const failed = await exercise(options);
  assert.equal(failed.searchIndexLoading, false);
  assert.equal(failed.searchIndexFailed, true);
  assert.equal(failed.updates, 1);
}
console.log('PASS: external search hydrates original rows, refreshes current query, and exits loading with a visible fallback on failed or invalid responses.');
