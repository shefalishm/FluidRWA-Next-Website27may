import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import sharp from 'sharp';
import { createHash } from 'node:crypto';

export const slugs = ['zapier-vs-make-vs-n8n-operations-automation', 'intercom-vs-zendesk-vs-tidio-ai-customer-support', 'jasper-vs-copy-ai-vs-writer-marketing-content'];
export const routes = [...slugs.map(slug => `/blog/${slug}`), '/use-cases/bmw-partchain-component-traceability-case-study', '/learn/claude-api-tutorial-vendor-evidence-extraction'];
export const assetNames = ['automation', 'support', 'writing', 'bmw-parts', 'evidence-api'].map(name => `${name}-november3`);
export function loadData(file) {
  const context = { exports: {} };
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, context);
  return context.exports;
}
const hashes = new Set();
for (const name of assetNames) {
  const file = `assets/blog-thumbnails/${name}.webp`;
  const bytes = fs.readFileSync(file);
  assert.deepEqual(bytes, fs.readFileSync(`public/${file}`));
  const info = await sharp(bytes).metadata();
  assert.equal(info.width, 1200); assert.equal(info.height, 675); assert.equal(info.format, 'webp');
  assert.ok(bytes.length < 200000);
  const hash = createHash('sha256').update(bytes).digest('hex');
  assert.ok(!hashes.has(hash)); hashes.add(hash);
}
for (const slug of slugs) {
  const md = fs.readFileSync(`content/blog/${slug}.md`, 'utf8');
  const html = fs.readFileSync(`blog/${slug}/index.html`, 'utf8');
  assert.ok(md.split(/\s+/).length > 850, `${slug}: substantial text`);
  assert.match(md, /reviewedDate: "2026-11-03"/);
  assert.ok(html.includes(`rel="canonical" href="https://www.fluidrwa.com/blog/${slug}"`));
  assert.match(html, /<table\b/); assert.match(html, /Should your company be considered/);
  assert.match(html, /<img src="\/assets\/blog-thumbnails\/[^\"]+-november3.webp"/);
  assert.match(html, /mailto:contact@fluidrwa.com/);
  assert.match(html, /"@type":"Article"/);
  for (const link of html.matchAll(/<a\b[^>]*href="https?:\/\/[^>]+>/g)) assert.match(link[0], /rel="[^"]*nofollow/);
  for (const anchor of html.matchAll(/href="#([^"]+)"/g)) assert.ok(html.includes(`id="${anchor[1]}"`));
  assert.ok(fs.readFileSync('blog.html', 'utf8').includes(`/blog/${slug}`));
  assert.ok(fs.readFileSync('sitemap.xml', 'utf8').includes(`/blog/${slug}`));
}
const article = loadData('lib/learnNovember3.ts').november3Tutorials[0];
assert.ok(article.sections.reduce((n, section) => n + section.body.join(' ').split(/\s+/).length, 0) > 1500);
assert.ok(article.sections.some(section => section.id === 'troubleshooting'));
assert.ok(article.sections.some(section => section.id === 'step-7'));
assert.ok(article.sections.some(section => section.body.some(p => p.includes('No authenticated Claude request'))));
const study = loadData('lib/useCaseStudiesNovember3.ts').november3CaseStudies[0];
assert.equal(study.caseStudy.company, 'BMW Group');
assert.ok(study.caseStudy.limitations.some(line => line.includes('dated BMW')));
assert.ok(!fs.readFileSync('lib/useCaseGuides.ts', 'utf8').includes(study.slug));
const profiles = JSON.parse(fs.readFileSync('data/company-profiles.json', 'utf8'));
for (const slug of ['zapier-ai', 'make', 'n8n', 'intercom-fin', 'zendesk-ai', 'tidio-lyro', 'jasper', 'copy-ai', 'writer']) assert.ok(profiles[slug], `Previously catalogued: ${slug}`);
console.log('PASS: five unique compressed images, three substantial new comparisons, tables, CTAs, source link policy, anchors, structured metadata, indexes, tutorial depth, distinct BMW case and existing vendor catalogue.');
