import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const compile = file => ts.transpileModule(fs.readFileSync(file, 'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const tutorialModule = {exports:{}};
vm.runInNewContext(compile('lib/learn-tutorials.ts'), tutorialModule);
const tutorials = tutorialModule.exports.tutorials;
assert.ok(tutorials.length >= 10);
for (const level of ['Beginner','Advanced']) assert.ok(tutorials.filter(row => row.level === level).length >= 5);
for (const item of tutorials) {
  assert.ok(item.sections.filter(section => /^step-\d+$/.test(section.id)).length >= 5);
  assert.ok(item.references.length >= 2 && item.references.every(ref => ref.href.startsWith('https://')));
  assert.ok(item.faqs.length >= 2 && /^\d{4}-\d{2}-\d{2}$/.test(item.updatedAt));
}
const learnModule = {exports:{}, require(name){if(name === './learn-tutorials')return tutorialModule.exports;throw new Error(name)}};
vm.runInNewContext(compile('lib/learn.ts'), learnModule);
const all = learnModule.exports.learnArticles;
assert.equal(new Set(all.map(row => row.slug)).size, all.length, 'Learn slugs must be unique');
console.log('Learn tutorials: levels, numbered steps, sources and unique slugs verified.');
