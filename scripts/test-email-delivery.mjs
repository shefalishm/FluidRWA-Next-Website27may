import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { Webhook } from 'svix';

const secret = `whsec_${Buffer.from('local-test-secret-not-a-credential').toString('base64')}`;
const emailId = '01a16316-2eae-71c6-8c8a-d8c0a78cbd40';
const code = ts.transpileModule(fs.readFileSync('app/api/email-delivery/route.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
let row, failWrite = false, writes = 0, reads = 0;
const api = {};
vm.runInNewContext(code, {
  exports: api, Buffer, URLSearchParams, Date, AbortSignal,
  process: { env: { RESEND_WEBHOOK_SECRET: secret, SUPABASE_URL: 'https://database.invalid', SUPABASE_SERVICE_ROLE_KEY: 'local-test' } },
  require(name) {
    if (name === 'svix') return { Webhook };
    if (name === 'next/server') return { NextResponse: { json: (body, options = {}) => ({ body, status: options.status || 200 }) } };
    throw new Error(name);
  },
  fetch: async (url, options) => {
    if (options.method !== 'PATCH') {
      reads++;
      assert.equal(new URL(url).searchParams.get('raw_payload->FLUIDRWA_NOTIFICATION->>messageId'), `eq.${emailId}`);
      return { ok: true, json: async () => row ? [row] : [] };
    }
    writes++;
    assert.equal(new URL(url).searchParams.get('updated_at'), `eq.${row.updated_at}`);
    const update = JSON.parse(options.body);
    if (!failWrite) row = { ...row, ...update };
    return { ok: true, json: async () => failWrite ? [] : [{ id: row.id }] };
  }
});
const freshRow = () => ({ id: 'lead', updated_at: '2026-10-23T00:00:00Z', raw_payload: { KEEP: 'unchanged', FLUIDRWA_NOTIFICATION: { status: 'accepted', messageId: emailId } } });
const event = (type = 'email.delivered', age = 0) => ({ type, created_at: new Date(Date.now() - age).toISOString(), data: { email_id: emailId } });
const request = (body, { id = 'msg_test', bad = false, timestamp = new Date() } = {}) => {
  const raw = JSON.stringify(body);
  return new Request('https://www.fluidrwa.com/api/email-delivery', { method: 'POST', body: raw, headers: { 'svix-id': id, 'svix-timestamp': String(Math.floor(timestamp.getTime() / 1000)), 'svix-signature': bad ? 'v1,forged' : new Webhook(secret).sign(id, timestamp, raw) } });
};
row = freshRow();
assert.equal((await api.POST(request(event(), { bad: true }))).status, 400);
assert.equal((await api.POST(request(event(), { timestamp: new Date(Date.now() - 600000) }))).status, 400);
assert.equal(reads, 0, 'Untrusted callbacks must not query storage');
const delivered = event();
assert.equal((await api.POST(request(delivered))).status, 200);
assert.equal(row.raw_payload.KEEP, 'unchanged');
assert.equal(row.raw_payload.FLUIDRWA_NOTIFICATION.status, 'accepted');
assert.equal(row.raw_payload.FLUIDRWA_NOTIFICATION.lastEvent, 'delivered');
assert.equal(row.raw_payload.FLUIDRWA_NOTIFICATION.verificationSource, 'signed_resend_webhook');
assert.equal((await api.POST(request(delivered))).body.ignored, true);
assert.equal(writes, 1);
assert.equal((await api.POST(request(event('email.sent', 60000), { id: 'msg_old' }))).body.ignored, true);
assert.equal((await api.POST(request(event('email.delivery_delayed'), { id: 'msg_delay' }))).body.ignored, true);
assert.equal((await api.POST(request(event('email.bounced'), { id: 'msg_bounce' }))).status, 200);
assert.equal(row.raw_payload.FLUIDRWA_NOTIFICATION.lastEvent, 'bounced');
assert.equal((await api.POST(request(event(), { id: 'msg_regress' }))).body.ignored, true);
row = null;
assert.equal((await api.POST(request(event()))).status, 503, 'Retry a callback that races receipt storage');
assert.equal((await api.POST(request(event('email.delivered', 700000)))).body.ignored, true);
row = freshRow(); failWrite = true;
assert.equal((await api.POST(request(event()))).status, 503, 'Concurrent changes must retry without overwriting');
assert.equal((await api.POST(request(event('email.opened')))).body.ignored, true);
const large = new Request('https://www.fluidrwa.com/api/email-delivery', { method: 'POST', body: 'x'.repeat(65537) });
assert.equal((await api.POST(large)).status, 413);
console.log('PASS: signed delivery updates, expired/forged rejection, bounded bodies, exact receipt matching, duplicate/order protection, preserved payload, race/conflict retries. All database calls mocked.');
