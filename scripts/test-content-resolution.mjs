import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';

const compiled = ts.transpileModule(fs.readFileSync('lib/contentFs.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
}).outputText;
const content = JSON.parse(fs.readFileSync('lib/runtime-content.json', 'utf8'));
const exports = {};
vm.runInNewContext(compiled, { exports, process, require(name) {
  if (name === 'node:path') return { default: path };
  if (name === './runtime-content.json') return { default: content };
  throw new Error(name);
} });
const packaged = exports.default;
for (const name of Object.keys(content)) {
  assert.equal(packaged.readFileSync(path.join(process.cwd(), name), 'utf8'), content[name], name);
}
for (const name of ['vendors/vendors/crypto-custody-providers/index.html', 'blog/missing-article/index.html', 'fluidrwa/missing-profile/index.html', '../index.html']) {
  assert.equal(packaged.existsSync(path.resolve(name)), false, name);
  assert.throws(() => packaged.readFileSync(path.resolve(name), 'utf8'), /Missing packaged content/);
}
console.log(`PASS: exact resolution for ${Object.keys(content).length} packaged files; missing nested indexes and outside-root paths rejected.`);
