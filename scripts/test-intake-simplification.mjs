import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

function load(file, globals = {}) {
  const context = { exports: {}, URL, URLSearchParams, ...globals };
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
  }).outputText, context);
  return context.exports;
}
const website = load('lib/intakeWebsite.ts');
for (const [entered, expected] of [
  ['www.company.com', 'https://www.company.com'], ['company.com', 'https://company.com'],
  [' company.com/product ', 'https://company.com/product'],
  ['https://company.com', 'https://company.com'], ['http://company.com', 'http://company.com'], ['', '']
]) {
  const input = { value: entered, setCustomValidity(value) { this.error = value; } };
  website.prepareIntakeWebsite(input);
  assert.equal(input.value, expected);
  assert.equal(input.error, '');
}
for (const value of ['not a website', 'javascript:alert(1)', 'https://', 'https://user:password@company.com']) {
  const input = { value, setCustomValidity(value) { this.error = value; } };
  website.prepareIntakeWebsite(input);
  assert.ok(input.error);
}

const storage = new Map();
const window = { location: { search: '?utm_source=linkedin&utm_medium=organic_social&email=private@example.com', pathname: '/blog/example' },
  sessionStorage: { getItem: key => storage.get(key), setItem: (key, value) => storage.set(key, value) } };
const attribution = load('lib/intakeAttribution.ts', { window });
attribution.captureIntakeAttribution();
window.location = { search: '?source=vendor-card', pathname: '/submit-requirement' };
const data = new Map();
attribution.appendIntakeAttribution(data);
assert.equal(data.get('ATTRIBUTION_UTM_SOURCE'), 'linkedin');
assert.equal(data.get('ATTRIBUTION_LANDING_PATH'), '/blog/example');
assert.equal(data.has('ATTRIBUTION_EMAIL'), false);
window.location.search = '?utm_source=newsletter&utm_medium=email';
assert.equal(attribution.captureIntakeAttribution().utm_source, 'newsletter');
window.location.search = '?utm_source=private@example.com';
assert.equal(attribution.captureIntakeAttribution().utm_source, undefined);
window.sessionStorage = { getItem() { throw Error('blocked'); }, setItem() { throw Error('blocked'); } };
window.location.search = '?utm_source=linkedin';
assert.equal(attribution.captureIntakeAttribution().utm_source, 'linkedin');

const quick = fs.readFileSync('components/QuickIntakePopup.tsx', 'utf8');
const start = quick.indexOf('  const handleSubmit = async');
const end = quick.indexOf('\n  if (hidden)', start);
const compiled = ts.transpile(quick.slice(start, end) + '\nexports.submit = handleSubmit;', { target: ts.ScriptTarget.ES2022 });
async function submitQuick(enteredWebsite) {
  const input = { value: enteredWebsite, setCustomValidity(value) { this.error = value; } };
  let posted, confirmed = false, invalid = false;
  const form = { querySelector: () => input, checkValidity: () => !input.error, reportValidity() { invalid = true; }, reset() {} };
  const context = { exports: {}, submitting: false, prepareIntakeWebsite: website.prepareIntakeWebsite, appendIntakeAttribution() {},
    mode: 'vendor', renderedAt: { current: Date.now() - 5000 }, Date, Error,
    window: { location: { href: 'http://localhost/vendor-test' } },
    setSubmitting() {}, setError() {}, setSubmitted(value) { confirmed = value; },
    FormData: class extends Map { constructor() { super([['website', input.value], ['firstName', 'QA'], ['companyName', 'QA only'], ['contactEmail', 'qa@fluidrwa.com'], ['category', 'Other'], ['projectDescription', 'Synthetic test']]); } },
    fetch: async (_url, init) => { posted = JSON.parse(init.body); return { ok: true, json: async () => ({ ok: true, requestId: 'test-only' }) }; }
  };
  vm.runInNewContext(compiled, context);
  await context.exports.submit({ preventDefault() {}, currentTarget: form });
  return { posted, confirmed, invalid };
}
for (const value of ['www.company.com', 'company.com', 'https://company.com']) {
  const result = await submitQuick(value);
  assert.ok(result.confirmed);
  assert.equal(result.posted.website, website.normalizeIntakeWebsite(value));
}
const invalid = await submitQuick('not a website');
assert.equal(invalid.posted, undefined);
assert.ok(invalid.invalid);
assert.match(quick, /noValidate onSubmit=\{handleSubmit\}/);
assert.match(quick, /required=\{mode === "vendor"\}/);
for (const file of ['vendor-membership.html', 'contact.html', 'apply-as-vendor.html']) {
  const html = fs.readFileSync(file, 'utf8');
  assert.match(html, /name="WEBSITE" type="text"/);
  assert.doesNotMatch(html, /name="(?:WEBSITE|PROOF_LINK|MEDIA_LINK)" type="url"/);
}
assert.doesNotMatch(fs.readFileSync('submit-project.html', 'utf8'), /name="REQUIREMENT_CATEGORY" required/);
console.log('PASS: plain-domain website entry, invalid-address recovery, real quick-submit handler, optional project category, campaign persistence without analytics and storage-denied fallback. No live leads created.');
