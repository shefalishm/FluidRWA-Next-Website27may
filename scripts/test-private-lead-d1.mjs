import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import { DatabaseSync } from "node:sqlite";
import ts from "typescript";
import { Webhook } from "svix";

const compile = file => ts.transpileModule(fs.readFileSync(file,"utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
}).outputText;
const sqlite = new DatabaseSync(":memory:");
sqlite.exec(fs.readFileSync("migrations/private-leads/0001_form_submissions.sql","utf8"));
const db = { prepare: sql => ({ bind: (...params) => ({ all: async () => ({ results: sqlite.prepare(sql).all(...params) }) }) }) };
const adapter = {};
vm.runInNewContext(compile("lib/privateLeadD1.ts"), { exports: adapter, URL, Response, crypto, Date });
const origin = adapter.privateLeadOrigin;
const call = (url, init) => adapter.privateLeadD1(db, url, init);
const endpoint = origin + "/rest/v1/vendor_intro_requests";
const abuse = {};
vm.runInNewContext(compile("lib/formAbuse.ts"), { exports: abuse, URL, Date });
const api = {};
let emailAttempts = 0;
const messageId = "11111111-2222-4333-8444-555555555555";
vm.runInNewContext(compile("app/api/vendor-intro-request/route.ts"), {
  exports: api, URL, URLSearchParams, Date, console,
  require(name) {
    if (name === "next/server") return { NextResponse: Response };
    if (name === "@/lib/formAbuse") return abuse;
    if (name === "@/lib/formStore") return { formStoreConfig: () => ({ url: origin, key: "internal" }), formStoreFetch: call };
    if (name === "@/lib/emailNotifications") return { notifyFormSubmission: async ({ requestId }) => {
      emailAttempts++;
      const saved = await call(endpoint + "?id=eq." + requestId);
      assert.equal((await saved.json())[0].status, "qa_test", "Email is attempted only after durable storage.");
      return emailAttempts === 1 ? { ok: true, messageId } : { ok: false, skipped: false };
    } };
    throw Error(name);
  }
});
const sender = "qa@fluidrwa.com";
for (const path of ["/submit-requirement", "/vendor-membership"]) {
  const response = await api.POST(new Request("https://www.fluidrwa.com/api/vendor-intro-request", {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
      firstName: "QA", contactEmail: sender, companyName: "QA only",
      projectDescription: "Synthetic acceptance test", source: "qa-test",
      pageUrl: "https://www.fluidrwa.com" + path + "?source=qa-test",
      rawPayload: { FORM_ELAPSED_MS: "4000" }
    })
  }));
  assert.equal(response.status, 200);
  assert.ok((await response.json()).requestId);
}
const get = async (query) => (await call(endpoint + "?" + new URLSearchParams(query))).json();
const records = await get({ order: "created_at.desc,id.desc", limit: "2" });
const failed = records.find(row => row.raw_payload.FLUIDRWA_NOTIFICATION.status === "failed");
const accepted = records.find(row => row.raw_payload.FLUIDRWA_NOTIFICATION.status === "accepted");
assert.ok(failed && accepted);
assert.equal(failed.raw_payload.FLUIDRWA_NOTIFICATION.status, "failed");
assert.equal(accepted.raw_payload.FLUIDRWA_NOTIFICATION.status, "accepted");
assert.equal(failed.request_source, "vendor-review-application");
const receipt = await get({ select: "id,raw_payload,updated_at", "raw_payload->FLUIDRWA_NOTIFICATION->>messageId": "eq." + messageId, limit: "2" });
assert.equal(receipt.length, 1);
const conflict = await call(endpoint + "?id=eq." + accepted.id + "&updated_at=eq.stale&select=id", { method: "PATCH", body: JSON.stringify({ status: "paid" }) });
assert.deepEqual(await conflict.json(), []);
const patch = await call(endpoint + "?" + new URLSearchParams({ id: "eq." + accepted.id, updated_at: "eq." + receipt[0].updated_at, select: "id,status" }), { method: "PATCH", body: JSON.stringify({ status: "qualified" }) });
assert.equal((await patch.json())[0].status, "qualified");
const delivery = {};
const secret = "whsec_" + Buffer.from("synthetic signature testing only").toString("base64");
vm.runInNewContext(compile("app/api/email-delivery/route.ts"), {
  exports: delivery, Buffer, URLSearchParams, Date, AbortSignal, process: { env: { RESEND_WEBHOOK_SECRET: secret } },
  require(name) {
    if (name === "next/server") return { NextResponse: Response };
    if (name === "svix") return { Webhook };
    if (name === "@/lib/formStore") return { formStoreConfig: () => ({ url: origin, key: "internal" }), formStoreFetch: call };
    throw Error(name);
  }
});
const when = new Date();
const eventId = "msg_synthetic_cloudflare";
const event = JSON.stringify({ type: "email.delivered", created_at: when.toISOString(), data: { email_id: messageId } });
const callback = await delivery.POST(new Request("https://www.fluidrwa.com/api/email-delivery", {
  method: "POST", body: event, headers: { "svix-id": eventId, "svix-timestamp": String(Math.floor(when.getTime() / 1000)), "svix-signature": new Webhook(secret).sign(eventId, when, event) }
}));
assert.equal(callback.status, 200);
const [delivered] = await get({ id: "eq." + accepted.id });
assert.equal(delivered.status, "qualified");
assert.equal(delivered.raw_payload.FLUIDRWA_NOTIFICATION.lastEvent, "delivered");
const count = await call(endpoint + "?" + new URLSearchParams({ contact_email: "eq." + sender, created_at: "gte.2000-01-01T00:00:00.000Z", limit: "1" }), { method: "HEAD" });
assert.equal(count.headers.get("content-range"), "*/2");
assert.equal((await get({ select: "id,status", id: `in.(${accepted.id},${failed.id})` })).length, 2);
assert.equal((await call(endpoint + "?order=payload.asc")).status, 400);
assert.equal((await call(origin + "/rest/v1/accounts")).status, 400);
for (const name of ["tokenization_assessments", "tokenization_assessment_events", "family_office_stack_assessments", "family_office_stack_assessment_events", "freelancer_profiles", "freelancer_intro_requests", "freelancer_marketplace_waitlist"]) {
  const saved = await call(origin + "/rest/v1/" + name, { method: "POST", body: JSON.stringify({ marker: "synthetic" }) });
  assert.equal(saved.status, 201, name);
}
console.log("PASS: buyer and vendor route through SQLite storage; durable save before email, notification failure preservation, signed delivery receipt, optimistic update, counts, and all eight table writes. Email sending is mocked.");
