import fs from 'node:fs';
import assert from 'node:assert/strict';
import ts from 'typescript';

const file = fs.readFileSync('lib/legacy.ts', 'utf8');
const start = file.indexOf('function enhanceBlogDecisionPage(');
const end = file.indexOf('export function legacyMainHtml', start);
const code = ts.transpile(file.slice(start, end), { target: ts.ScriptTarget.ES2022 });
const enhance = new Function('seoOverrides', 'articleDirectoryLinks', 'articleSources', `${code}; return enhanceBlogDecisionPage;`)({}, {}, {});
let checked = 0;
for (const slug of fs.readdirSync('blog')) {
  const path = `blog/${slug}/index.html`;
  if (!fs.existsSync(path)) continue;
  const raw = fs.readFileSync(path, 'utf8');
  if (!raw.includes('Ask for evidence that maps directly to the planned production workflow')) continue;
  const result = enhance(path, raw);
  const sourceBlock = raw.match(/<h2 id="primary-sources">[\s\S]*?(?=<section class="faq-list")/)?.[0];
  if (sourceBlock) {
    for (const link of sourceBlock.matchAll(/href="(https:[^"]+)"/g)) assert.ok(result.includes(link[0]), `${slug}: lost ${link[1]}`);
    assert.ok(result.includes('id="primary-sources"'), `${slug}: lost source heading`);
  }
  assert.ok(!result.includes('id="architecture-before-procurement"'), `${slug}: generic section retained`);
  checked++;
}
assert.ok(checked >= 20, `Insufficient regression coverage: ${checked}`);
console.log(`PASS source-preservation regression: ${checked} legacy comparisons`);
