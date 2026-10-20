import assert from 'node:assert/strict';
import * as crypto from 'node:crypto';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const source = fs.readFileSync('app/api/conversion-analytics/route.ts', 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const day = new Date().toISOString().slice(0, 10);
const created_at = `${day}T12:00:00.000Z`;
const spam = Array.from({ length: 1001 }, (_, index) => ({
  id: `spam-${index}`, created_at, contact_email: 'repeat@real.testmail', request_source: 'submit-requirement', page_url: 'https://www.fluidrwa.com/submit-requirement'
}));
const buyer = { id: 'buyer-1', created_at, contact_email: 'buyer@real.testmail', request_source: 'submit-requirement', page_url: 'https://www.fluidrwa.com/submit-requirement' };
const vendor = { id: 'vendor-1', created_at, contact_email: 'vendor@real.testmail', request_source: 'vendor-review-application', page_url: 'https://www.fluidrwa.com/vendor-membership' };
const rows = [...spam, buyer, vendor];
let detailQueries = 0;
const exports = {};
vm.runInNewContext(compiled, {
  exports, URL, URLSearchParams, Buffer, Date, Map, Set, console,
  process: { env: { ANALYTICS_DASHBOARD_KEY: 'test-secret', SUPABASE_URL: 'https://database.invalid', SUPABASE_SERVICE_ROLE_KEY: 'test-role' } },
  require(name) {
    if (name === 'node:crypto') return crypto;
    if (name === 'next/server') return { NextResponse: { json: (body, options) => ({ body, status: options?.status || 200 }) } };
    throw new Error(`Unexpected import ${name}`);
  },
  fetch: async (url) => {
    const query = new URL(url).searchParams;
    if (query.has('id')) {
      detailQueries++;
      assert.match(query.get('id'), /buyer-1/);
      assert.match(query.get('id'), /vendor-1/);
      return { ok: true, json: async () => [{ ...buyer, status: 'qualified', vendor_category: 'Custody', vendor_name: 'Example provider', raw_payload: { FLUIDRWA_NOTIFICATION: { status: 'accepted' } } }, { ...vendor, status: 'paid', raw_payload: {} }] };
    }
    const offset = Number(query.get('offset') || 0);
    return { ok: true, json: async () => rows.slice(offset, offset + 1000) };
  }
});

const result = await exports.GET({
  nextUrl: new URL('https://www.fluidrwa.com/api/conversion-analytics?days=7'),
  headers: new Headers({ Authorization: 'Bearer test-secret' })
});
assert.equal(result.status, 200);
assert.equal(result.body.summary.submissions, 1);
assert.equal(result.body.vendorApplications.submissions, 1);
assert.equal(result.body.quarantinedRows, 1001);
assert.equal(detailQueries, 1);
assert.equal(result.body.recent[0].originPath, '/submit-requirement');
assert.equal(result.body.pipeline.qualified, 1);
assert.equal(result.body.pipeline.paid, 1);
assert.equal(result.body.pipeline.notificationAccepted, 1);
assert.equal(result.body.pipeline.notificationUnknown, 1);
assert.equal(JSON.stringify(result.body).includes('buyer@real.testmail'), false);
const unauthorized = await exports.PATCH({ headers: new Headers(), nextUrl: new URL('https://www.fluidrwa.com/api/conversion-analytics') });
assert.equal(unauthorized.status, 401);
const invalid = await exports.PATCH({ headers: new Headers({ Authorization: 'Bearer test-secret' }), nextUrl: new URL('https://www.fluidrwa.com/api/conversion-analytics'), text: async () => JSON.stringify({ id: 'invalid', status: 'paid' }) });
assert.equal(invalid.status, 400);
console.log('PASS: paginated lead counts, suspected-spam quarantine and separate vendor applications. No network requests.');
