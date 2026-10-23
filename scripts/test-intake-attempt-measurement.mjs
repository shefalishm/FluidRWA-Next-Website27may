import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

// Execute the real handler with isolated form/network dependencies; no live lead is created.
const source = fs.readFileSync('components/FormScripts.tsx', 'utf8');
const start = source.indexOf('      const handleSubmit = async');
const end = source.indexOf('\n      let started = false;', start);
assert.ok(start > 0 && end > start);
const handler = ts.transpile(source.slice(start, end) + '\nexports.submit = handleSubmit;', { target: ts.ScriptTarget.ES2022 });
async function exercise({ valid = true, disabled = false, ok = true, filtered = false } = {}) {
  const events = [];
  let requests = 0;
  let normalizations = 0;
  const button = { disabled, textContent: 'Submit' };
  const status = {};
  const sandbox = {
    exports: {}, Date, Error, TypeError, SyntaxError,
    button, status, submitted: false, formRenderedAt: Date.now() - 5000,
    params: new URLSearchParams(), sourceField: { value: 'submit-requirement' },
    vendor: null, category: null, source: null,
    form: { checkValidity: () => valid, querySelector: () => ({ focus() {} }), querySelectorAll: () => [{ name: 'WEBSITE' }] },
    normalizeWebsite: () => { normalizations++; },
    trackEvent: (name, details) => events.push({ name, details }),
    analyticsDetails: () => ({ form_type: 'project' }),
    getIsVendorForm: () => false,
    getFormMessages: () => ({ defaultButtonText: 'Submit', loadingText: 'Saving', successTitle: 'Saved', successCopy: 'Received' }),
    getAnalyticsEventName: () => 'project_form_submit',
    showConfirmation() {}, window: { location: { href: 'http://localhost/submit-requirement' } },
    FormData: class extends Map { constructor() { super(); } },
    formValue: (data, name) => String(data.get(name) || ''),
    fetch: async () => { requests++; return { ok, status: ok ? 200 : 429, json: async () => ({ ok, mode: filtered ? 'filtered' : 'supabase', requestId: 'isolated-test', code: 'rate_limit', message: 'Retry' }) }; }
  };
  vm.runInNewContext(handler, sandbox);
  await sandbox.exports.submit({ preventDefault() {}, stopImmediatePropagation() {} });
  return { events: events.map(e => e.name), requests, normalizations, button, status };
}
const invalid = await exercise({ valid: false });
assert.deepEqual(invalid.events, ['form_submit_attempt', 'form_validation_failed']);
assert.equal(invalid.requests, 0);
assert.equal(invalid.normalizations, 1);
assert.equal(invalid.button.disabled, false);
assert.deepEqual((await exercise({ disabled: true })).events, []);
const accepted = await exercise();
assert.deepEqual(accepted.events, ['form_submit_attempt', 'form_request_sent', 'project_form_submit']);
assert.equal(accepted.requests, 1);
assert.equal(accepted.button.disabled, true);
const failed = await exercise({ ok: false });
assert.deepEqual(failed.events, ['form_submit_attempt', 'form_request_sent', 'form_submit_error']);
assert.equal(failed.button.disabled, false);
assert.ok(!(await exercise({ filtered: true })).events.includes('project_form_submit'));
console.log('PASS: invalid attempts measured, no invalid POST, domain normalization before validation, disabled double-submit ignored, accepted-only conversion, error retry and filtered-spam exclusion.');
