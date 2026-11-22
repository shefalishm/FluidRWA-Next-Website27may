import assert from "node:assert/strict";
import fs from "node:fs";
import { execFileSync } from "node:child_process";

const read = file => fs.readFileSync(file, "utf8");
const label = "Apply to be a Vetted Vendor";
for (const file of ["components/Header.tsx", "components/Footer.tsx", "components/QuickIntakePopup.tsx", "components/FormScripts.tsx", "vendor-membership.html", "apply-as-vendor.html", "assets/site.js"]) {
  const source = read(file);
  assert.ok(source.includes(label), file + " missing application wording");
  assert.ok(!source.includes("Become a Vetted Listing"), file + " obsolete CTA");
}
for (const file of ["vendor-membership.html", "apply-as-vendor.html"]) {
  const source = read(file);
  const visible = source.replace(/<style>[\s\S]*?<\/style>/g, "").replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ");
  assert.ok(!/(?:[$£€]\s*\d|\b(?:USD|INR|HKD)\s*\d|\d\s*(?:USD|per month|per year))/i.test(visible), file + " public price");
  assert.ok(!/applying is free|paid vendor intake|paid vendor membership|private commercial proposal/i.test(visible), file + " obsolete positioning");
  assert.match(visible, /fee for the vetting review/);
  assert.match(visible, /(?:separate services with separate fees|have separate fees)/);
  assert.match(visible, /does not guarantee approval|do not guarantee approval/);
  assert.ok(!visible.includes("\u2014"));
}
assert.equal(read("assets/site.js"), read("public/assets/site.js"), "Browser and source form assets differ");
assert.match(read("lib/routes.ts"), /path: "apply", file: "vendor-membership.html"/);
assert.ok(read("components/Header.tsx").includes('href="/apply"'));
const schema = JSON.parse(read("vendor-membership.html").match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
assert.equal(schema["@graph"].find(item => item["@type"] === "Service").serviceType, "Vendor vetting review");
assert.ok(!JSON.stringify(schema).includes('"offers"'));
for (const file of ["components/PayPalMembershipCheckout.tsx", "assets/paypal-membership.js", "public/assets/paypal-membership.js", "app/api/payu/start/route.ts", "app/api/vendor-intro-request/route.ts"]) {
  assert.equal(read(file), execFileSync("git", ["show", `HEAD:${file}`], { encoding: "utf8" }), file + " changed outside copy scope");
}
console.log("PASS: vetted-vendor CTAs, fee separation without amounts, no purchase-to-badge promise, matching form assets, /apply route, scoped schema and unchanged payment/submission handling");
