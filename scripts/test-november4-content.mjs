import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import vm from 'node:vm';
import sharp from 'sharp';
import ts from 'typescript';

export const comparisons = [
  ['hubspot-vs-salesforce-vs-attio-crm-operations', 'HubSpot vs Salesforce vs Attio', 'crm', ['hubspot-ai', 'salesforce-einstein', 'attio']],
  ['clay-vs-apollo-vs-instantly-sales-prospecting', 'Clay vs Apollo vs Instantly', 'prospecting', ['clay', 'apollo', 'instantly']],
  ['canva-vs-figma-vs-midjourney-visual-production', 'Canva vs Figma vs Midjourney', 'design', ['canva-ai', 'figma-ai', 'midjourney']]
];
export const pages = [
  ...comparisons.map(([slug, title, asset]) => ['/blog', `/blog/${slug}`, title, asset]),
  ['/use-cases', '/use-cases/maersk-tradelens-shutdown-supply-chain-case-study', 'Maersk TradeLens: A Shipping Platform and Its Shutdown', 'tradelens'],
  ['/learn', '/learn/transaction-simulation-erc20-transfer-before-signing', 'Transaction Simulation: Inspect an ERC-20 Transfer Before Signing', 'simulation']
];
export const sample = '/examples/transaction-simulation-lab.mjs';
export const imagePath = (topic, card = false) => `/assets/blog-thumbnails/${topic}-november4${card ? '-card' : ''}.webp`;
export const hash = bytes => createHash('sha256').update(bytes).digest('hex');
function load(file) {
  const ctx = { exports: {} };
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, ctx);
  return ctx.exports;
}

const profiles = JSON.parse(fs.readFileSync('data/company-profiles.json', 'utf8'));
const blog = fs.readFileSync('blog.html', 'utf8');
const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
const llms = fs.readFileSync('llms.txt', 'utf8');
const sources = new Set();
for (const [slug, , topic, vendors] of comparisons) {
  const md = fs.readFileSync(`content/blog/${slug}.md`, 'utf8');
  const html = fs.readFileSync(`blog/${slug}/index.html`, 'utf8');
  assert.ok(md.split(/\s+/).length >= 1000, slug);
  assert.match(md, /reviewedDate: "2026-11-04"/);
  assert.ok(html.includes(`rel="canonical" href="https://www.fluidrwa.com/blog/${slug}"`));
  assert.ok(html.includes(`<img src="${imagePath(topic)}"`));
  assert.equal([...html.matchAll(/<table\b/g)].length, 2);
  assert.match(html, /Should your company be considered/);
  assert.match(html, /mailto:contact@fluidrwa.com/);
  assert.match(html, /Reviewed by FluidRWA Research Team/);
  for (const [tag] of html.matchAll(/<a\b[^>]*href="https?:\/\/[^>]+>/g)) assert.match(tag, /rel="[^"]*nofollow/);
  for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(html.includes(`id="${id}"`), id);
  for (const [, href] of md.matchAll(/\]\((https:\/\/[^)]+)\)/g)) sources.add(href);
  for (const vendor of vendors) assert.ok(profiles[vendor], `Pre-existing catalog: ${vendor}`);
  assert.ok(blog.includes(`/blog/${slug}`) && sitemap.includes(`/blog/${slug}`));
}
for (const [, route] of pages) assert.ok(llms.includes(`https://www.fluidrwa.com${route}`));
const study = load('lib/useCaseStudiesNovember4.ts').november4CaseStudies[0];
assert.match(study.caseStudy.status, /Discontinued/);
assert.match(study.caseStudy.background.join(' '), /PORTIC/);
assert.match(study.caseStudy.limitations.join(' '), /not established/);
for (const record of study.caseStudy.sourceRecords) sources.add(record.match(/https:\/\/\S+$/)[0]);
const tutorial = load('lib/learnNovember4.ts').november4Tutorials[0];
assert.equal(tutorial.topic, 'Smart Contracts');
assert.ok(tutorial.sections.reduce((n, section) => n + section.body.join(' ').split(/\s+/).length, 0) >= 1300);
assert.match(tutorial.sections[0].body.join(' '), /not exercised against a live endpoint/);
assert.ok(tutorial.sections.some(section => section.links?.some(link => link.href === sample)));
for (const { href } of tutorial.references) sources.add(href);

const hashes = new Set();
for (const [i, [, , , topic]] of pages.entries()) {
  for (const card of i < 3 ? [false, true] : [false]) {
    const asset = imagePath(topic, card);
    const file = fs.readFileSync(`.${asset}`);
    assert.deepEqual(file, fs.readFileSync(`public${asset}`));
    const { width, height, format } = await sharp(file).metadata();
    assert.deepEqual([width, height, format], card ? [640, 360, 'webp'] : [1200, 675, 'webp']);
    assert.ok(file.length < (card ? 80000 : 200000));
    assert.ok(!hashes.has(hash(file)));
    hashes.add(hash(file));
  }
}
console.log('PASS: content, existing catalog, reviewed dates, tables/CTAs, link policy, discovery files and eight unique WebP assets.');
if (process.argv.includes('--sources')) {
  for (const url of sources) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(12000), headers: { 'User-Agent': 'Mozilla/5.0 FluidRWA link verification' } });
      console.log(`${response.status} ${url}${response.redirected ? ` -> ${response.url}` : ''}`);
      await response.body?.cancel();
    } catch (error) { console.log(`UNAVAILABLE ${url} (${error.cause?.code || error.name})`); }
  }
}
