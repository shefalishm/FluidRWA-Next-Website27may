import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import { DatabaseSync } from "node:sqlite";
import ts from "typescript";

const compile = file => ts.transpileModule(fs.readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const fields = {};
vm.runInNewContext(compile("lib/investorInterest.ts"), { exports: fields });
const abuse = {};
vm.runInNewContext(compile("lib/formAbuse.ts"), { exports: abuse, URL, Date });
const adapter = {};
vm.runInNewContext(compile("lib/privateLeadD1.ts"), { exports: adapter, URL, Response, crypto, Date });
const sqlite = new DatabaseSync(":memory:");
sqlite.exec(fs.readFileSync("migrations/private-leads/0001_form_submissions.sql", "utf8"));
const db = { prepare: sql => ({ bind: (...params) => ({ all: async () => ({ results: sqlite.prepare(sql).all(...params) }) }) }) };
const endpoint = adapter.privateLeadOrigin + "/rest/v1/vendor_intro_requests";
const store = { d1LeadStoreEnabled: () => true, formStoreConfig: () => ({ url: adapter.privateLeadOrigin, key: "internal" }), formStoreFetch: (url, init) => adapter.privateLeadD1(db, url, init) };
let emailSuccess = true;
let emailCalls = 0;
const shared = {};
vm.runInNewContext(compile("app/api/vendor-intro-request/route.ts"), { exports: shared, URL, URLSearchParams, Date, console, require(name) {
  if (name === "next/server") return { NextResponse: Response };
  if (name === "@/lib/formAbuse") return abuse;
  if (name === "@/lib/formStore") return store;
  if (name === "@/lib/emailNotifications") return { notifyFormSubmission: async ({ requestId, projectDescription }) => {
    const records = await (await store.formStoreFetch(endpoint + "?id=eq." + requestId)).json();
    assert.equal(records.length, 1, "Saved before notification");
    assert.match(projectDescription, /Consent version: investor-interest-2026-11-21/);
    emailCalls++;
    return { ok: emailSuccess, skipped: false, messageId: emailSuccess ? "synthetic-receipt" : undefined };
  } };
  throw Error(name);
} });
const api = {};
vm.runInNewContext(compile("app/api/investor-interest/route.ts"), { exports: api, Request, Response, Headers, URL, Date, require(name) {
  if (name === "@/app/api/vendor-intro-request/route") return shared;
  if (name === "@/lib/formAbuse") return abuse;
  if (name === "@/lib/formStore") return store;
  if (name === "@/lib/investorInterest") return fields;
  throw Error(name);
} });
const valid = { firstName: "Synthetic", email: "QA@fluidrwa.com", investorType: "Family office", region: "Europe", assetClasses: ["Real estate"], consent: true, sourcePage: "https://www.fluidrwa.com/network-explorer?email=private" };
const post = (payload, headers = {}) => api.POST(new Request("https://www.fluidrwa.com/api/investor-interest", { method: "POST", headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify(payload) }));
for (const [field, value] of [["email", "bad"], ["consent", false], ["assetClasses", []], ["assetClasses", ["invented"]], ["investorType", "invented"], ["region", "invented"], ["firstName", ""], ["ticketSize", "invented"]]) {
  const response = await post({ ...valid, [field]: value });
  assert.equal(response.status, 400, field);
  assert.ok((await response.json()).errors[field]);
}
assert.equal((await post(valid, { Origin: "https://evil.invalid" })).status, 403);
assert.equal((await post({ ...valid, websiteUrl: "spam" })).status, 400);
assert.equal(emailCalls, 0);
assert.equal((await post(valid)).status, 200);
emailSuccess = false;
assert.equal((await post({ ...valid, email: "qa2@fluidrwa.com" })).status, 200);
const records = await (await store.formStoreFetch(endpoint)).json();
assert.equal(records.length, 2);
assert.equal(records[0].request_source, "investor-interest");
assert.ok(records.some(row => row.contact_email === "qa@fluidrwa.com"));
assert.equal(records[0].page_url, "https://www.fluidrwa.com/investors");
assert.equal(records[0].raw_payload.SOURCE_PAGE, "/network-explorer");
assert.ok(records.every(row => row.raw_payload.CONSENT === true));
assert.ok(records.some(row => row.raw_payload.FLUIDRWA_NOTIFICATION.status === "failed"), "Email failure recorded for reconciliation without losing interest");
store.d1LeadStoreEnabled = () => false;
assert.equal((await post(valid)).status, 503);
assert.equal(emailCalls, 2);
assert.equal(sqlite.prepare("SELECT COUNT(*) AS n FROM form_submissions").get().n, 2);
console.log("PASS: investor validation, consent, cross-site rejection, honeypot, Cloudflare-only storage, internal notification, failed-email receipt, source query removal, no Supabase fallback");
