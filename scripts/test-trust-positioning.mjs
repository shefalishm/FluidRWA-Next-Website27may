import assert from "node:assert/strict";
import fs from "node:fs";
import { execFileSync } from "node:child_process";

const read = file => fs.readFileSync(file, "utf8");
const about = read("team.html");
const privacy = read("privacy.html");
const terms = read("terms.html");
for (const file of ["team.html", "privacy.html", "terms.html"]) {
  const before = execFileSync("git", ["show", `HEAD:${file}`], { encoding: "utf8" });
  assert.deepEqual([...read(file).matchAll(/<style>([\s\S]*?)<\/style>/g)].map(m => m[1]), [...before.matchAll(/<style>([\s\S]*?)<\/style>/g)].map(m => m[1]), file + " styling changed");
  assert.equal((read(file).match(/<h1(?:\s[^>]*)?>/g) || []).length, 1, file + " H1 count");
  assert.ok(!read(file).includes("\u2014"), file + " em dash");
}
assert.ok(about.includes("Building trust in Web3 and AI"));
assert.ok(about.includes("Our mission") && about.includes("Our vision"));
assert.ok(about.includes("Appearing in the directory alone does not mean a company has been vetted"));
assert.ok(about.includes('href="/apply"'));
for (const portrait of ["assets/dimple-mirpuri.jpg", "assets/shefali-sharma.webp"]) assert.ok(about.includes(portrait));
const schema = JSON.parse(about.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
assert.equal(schema["@graph"].find(item => item["@type"] === "AboutPage").url, "https://www.fluidrwa.com/about");
assert.match(terms, /directory without having completed vetting/);
assert.match(terms, /completed and passed a FluidRWA review/);
assert.match(terms, /separate services with separate fees/);
assert.match(terms, /30 business days/);
assert.match(privacy, /stored privately in Cloudflare/);
assert.match(privacy, /We do not sell personal information/);
assert.match(privacy, /do not share a buyer's contact details or project brief with a vendor without the buyer's permission/);
assert.match(privacy, /Internal correspondence, billing records and material supplied only for a private review are not published/);
assert.ok(!/manage paid memberships|plan selection|Supabase/i.test(privacy));
for (const html of [about, privacy, terms]) assert.ok(!/[$£€]\s*\d/.test(html), "Unexpected published amount");
assert.match(read("index.html"), /Build trust into your next decision/);
assert.match(read("components/Footer.tsx"), /Building trust in Web3, RWA and AI/);
console.log("PASS: trust mission and vision, accurate listed/vetted distinction, unchanged styles and founder assets, consistent Terms, Cloudflare/privacy disclosures and no published prices or private vendor payments");
