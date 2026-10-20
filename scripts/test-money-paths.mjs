import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const listeners = {};
const calls = [];
const window = { location: { pathname: '/blog/top-tokenization-companies-2026', origin: 'https://www.fluidrwa.com', href: 'https://www.fluidrwa.com/blog/top-tokenization-companies-2026', search: '' }, addEventListener: (name, fn) => { listeners[name] = fn; }, dispatchEvent: event => listeners[event.type]?.() };
const sandbox = { window, URL, URLSearchParams, Set, document: { addEventListener: (name, fn) => { listeners[name] = fn; } }, sessionStorage: { getItem: () => null }, Event: class { constructor(type) { this.type = type; } } };
vm.runInNewContext(fs.readFileSync('public/assets/measurement.js', 'utf8'), sandbox);
const click = href => listeners.click({ target: { closest: () => ({ getAttribute: () => href }) } });
click('mailto:contact@fluidrwa.com?subject=Tokenization');
window.fluidRwaTrackEvent = (name, params) => calls.push([name, params]);
listeners['fluidrwa:analytics-ready']();
assert.equal(calls.filter(([name]) => name === 'contact_email_click').length, 1);
click('/submit-requirement?source=article-buyer');
click('/vendor-membership?source=article-vendor');
click('https://another.invalid/submit-requirement');
assert.equal(calls.filter(([name]) => name === 'enquiry_cta_click').length, 2);
assert.deepEqual(calls.slice(-2).map(([, params]) => params.form_type), ['project', 'vendor']);
assert.equal(window.fluidRwaClaimLeadEvent('one'), true);
assert.equal(window.fluidRwaClaimLeadEvent('one'), false);

const inline = fs.readFileSync('components/GoogleAnalytics.tsx', 'utf8').match(/\{`\s*(window\.dataLayer[\s\S]*?)`\}/)[1];
window.dataLayer = [];
sandbox.dataLayer = window.dataLayer;
vm.runInNewContext(inline, sandbox);
window.fluidRwaTrackEvent('project_form_submit', { submission_id: 'saved-once', contact_email: 'private@company.com' });
window.fluidRwaTrackEvent('project_form_submit', { submission_id: 'saved-once' });
window.fluidRwaTrackEvent('vendor_intro_submit', { submission_id: 'saved-once' });
window.fluidRwaTrackEvent('form_submit_attempt', {});
const leads = window.dataLayer.filter(args => args[0] === 'event' && args[1] === 'generate_lead');
assert.equal(leads.length, 1);
assert.equal(JSON.stringify(window.dataLayer).includes('private@company.com'), false);

const compile = file => ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const abuse = {};
vm.runInNewContext(compile('lib/formAbuse.ts'), { exports: abuse, URL, Date });
const api = {};
const writes = [];
vm.runInNewContext(compile('app/api/vendor-intro-request/route.ts'), {
  exports: api, URL, URLSearchParams, Date, console,
  process: { env: { SUPABASE_URL: 'https://database.invalid', SUPABASE_SERVICE_ROLE_KEY: 'test' } },
  require(name) {
    if (name === 'next/server') return { NextResponse: { json: (body, options) => ({ body, status: options?.status || 200 }) } };
    if (name === '@/lib/formAbuse') return abuse;
    if (name === '@/lib/emailNotifications') return { notifyFormSubmission: async () => ({ ok: true, skipped: false, messageId: 'receipt-123' }) };
    throw new Error(name);
  },
  fetch: async (_url, options) => {
    if (options.method === 'HEAD') return { ok: true, headers: new Headers({ 'content-range': '*/0' }) };
    writes.push({ method: options.method, body: JSON.parse(options.body) });
    return { ok: true, json: async () => [{ id: 'saved-request' }] };
  }
});
const payload = { contactEmail: 'qa@fluidrwa.com', firstName: 'QA', companyName: 'QA only', projectDescription: 'Local mocked test', source: 'qa-test', rawPayload: { FORM_ELAPSED_MS: '2000', FLUIDRWA_NOTIFICATION: { status: 'forged' } } };
const request = body => new Request('https://www.fluidrwa.com/api/vendor-intro-request', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
const accepted = await api.POST(request(payload));
assert.equal(accepted.body.ok, true);
assert.equal(accepted.body.requestId, 'saved-request');
assert.equal(writes[0].method, 'POST');
assert.equal(writes[0].body.raw_payload.FLUIDRWA_NOTIFICATION, undefined);
assert.equal(writes[1].body.raw_payload.FLUIDRWA_NOTIFICATION.status, 'accepted');
assert.equal(writes[1].body.raw_payload.FLUIDRWA_NOTIFICATION.messageId, 'receipt-123');
const previousWrites = writes.length;
const fast = await api.POST(request({ ...payload, rawPayload: { FORM_ELAPSED_MS: '100' } }));
assert.equal(fast.status, 429);
const spam = await api.POST(request({ ...payload, rawPayload: { WEBSITE_URL: 'spam' } }));
assert.equal(spam.body.mode, 'filtered');
assert.equal(writes.length, previousWrites);
console.log('PASS: queued email/CTA intents, one lead per submission ID, analytics privacy, storage before notification receipt, protected receipt metadata, retryable fast submissions and spam exclusion. All network calls mocked.');
