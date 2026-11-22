import assert from "node:assert/strict";
import fs from "node:fs";
import { execFileSync } from "node:child_process";

const files = ["refund-cancellation.html", "shipping-delivery.html", "terms.html"];
for (const file of files) {
  const html = fs.readFileSync(file, "utf8");
  const before = execFileSync("git", ["show", `HEAD:${file}`], { encoding: "utf8" });
  assert.equal(html.match(/<style>([\s\S]*?)<\/style>/)?.[1], before.match(/<style>([\s\S]*?)<\/style>/)?.[1], file + " styling changed");
  assert.ok(html.includes('href="/apply"'));
  assert.match(html, /fee for the (?:FluidRWA )?vetting review/);
  assert.match(html, /separate (?:services with separate )?fees/);
  assert.ok(!/3 calendar days|3 to 10 business days|View Pricing|Verified, Spotlight|Flagship membership|conversion rate used at checkout/i.test(html), file + " retired policy remains");
  assert.ok(!html.includes("\u2014"));
}
const refund = fs.readFileSync(files[0], "utf8");
assert.match(refund, /retain US\$85 from the vetting fee paid/);
assert.match(refund, /remaining balance of that vetting fee will be refunded within 30 business days/);
assert.match(refund, /original payment method/);
assert.match(refund, /applicable law/);
for (const file of files.slice(1)) {
  const html = fs.readFileSync(file, "utf8");
  assert.match(html, /refund-cancellation/);
  assert.ok(!/[$£€]\s*\d/.test(html), file + " duplicated published amount");
}
console.log("PASS: separate vetting/visibility fees, failed-vetting refund exception, US$85 retained only on refund policy, 30-business-day deadline, consistent Terms, no old plans or timelines, unchanged styling");
