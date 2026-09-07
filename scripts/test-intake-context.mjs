import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const source = fs.readFileSync('app/api/vendor-intro-request/route.ts', 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
let saved, notified, writes = 0;
const exports = {};
vm.runInNewContext(compiled, {
  exports, URL, console,
  process: { env: { SUPABASE_URL: 'https://database.invalid', SUPABASE_SERVICE_ROLE_KEY: 'test-only' } },
  require(name) {
    if (name === 'next/server') return { NextResponse: { json: (body, options) => ({ body, status: options?.status || 200 }) } };
    if (name === '@/lib/emailNotifications') return { notifyFormSubmission: async payload => { notified = payload; return { ok: true, skipped: false }; } };
    throw new Error(`Unexpected import ${name}`);
  },
  fetch: async (_url, options) => { saved = JSON.parse(options.body); writes++; return { ok: true, json: async () => [{ ...saved, id: 'test-id' }] }; }
});
const base = { contactEmail: 'qa@example.com', firstName: 'Test', lastName: 'Only', companyName: 'Test', projectDescription: 'A test requirement' };
async function submit(payload) {
  return exports.POST(new Request('https://site.invalid/api/vendor-intro-request', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }));
}
assert.equal((await submit({ ...base, vendorCategory: 'Old link context', rawPayload: { REQUIREMENT_CATEGORY: 'Custody and wallets', PROJECT_STAGE: 'Planning', PROJECT_TIMELINE: '3-6 months', PROJECT_BUDGET: 'Undecided' } })).status, 200);
assert.equal(saved.vendor_category, 'Custody and wallets');
assert.match(notified.projectDescription, /PROJECT TIMELINE: 3-6 months/);
assert.match(notified.projectDescription, /PROJECT STAGE: Planning/);
assert.equal(saved.project_description, base.projectDescription);
await submit({ ...base, source: 'vendor-review-application', vendorCategory: 'Other', rawPayload: { CLIENT_PROOF: 'Sandbox evidence', VISIBILITY_GOAL: 'Directory', PROOF_LINK: 'https://example.com' } });
assert.equal(saved.request_source, 'vendor-review-application');
assert.equal(saved.vendor_category, 'Other');
assert.match(notified.projectDescription, /CLIENT PROOF: Sandbox evidence/);
assert.match(notified.projectDescription, /VISIBILITY GOAL: Directory/);
const before = writes;
assert.equal((await submit({})).status, 400);
assert.equal(writes, before);
assert.equal((await submit({ ...base, rawPayload: { WEBSITE_URL: 'spam' } })).body.mode, 'filtered');
assert.equal(writes, before);
for (const file of ['assets/site.js', 'public/assets/site.js', 'components/FormScripts.tsx']) {
  const text = fs.readFileSync(file, 'utf8');
  assert.match(text, /vendorCategory: formValue\(formData, "REQUIREMENT_CATEGORY"\)/);
  assert.match(text, /params.get\("source"\) === "qa-test"/);
}
assert.equal(fs.readFileSync('assets/site.js', 'utf8'), fs.readFileSync('public/assets/site.js', 'utf8'));
console.log('PASS: category precedence, buyer context, vendor evidence, validation, filtering and synchronized form handlers. No network requests made.');
