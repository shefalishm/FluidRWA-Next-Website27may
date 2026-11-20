import fs from "node:fs";
import { execFileSync } from "node:child_process";

const git = args => execFileSync("git", args, { encoding: "utf8", maxBuffer: 20_000_000 });
const rows = [];
const semantic = source => source.split("\n").filter(line => !/^(modifiedDate|editorialUpdatedLabel|reviewedDate|reviewedLabel):/.test(line)).join("\n").trim();
for (const name of fs.readdirSync("content/blog").filter(name => name.endsWith(".md"))) {
  const file = `content/blog/${name}`;
  const source = git(["show", `HEAD:${file}`]);
  if (!/^modifiedDate: "2026-11-19"$/m.test(source)) continue;
  const commit = git(["log", "-1", "--format=%H", "-G", '^modifiedDate: "2026-11-19"$', "--", file]).trim();
  if (!commit) { rows.push({ file, result: "date introduction not found in available history" }); continue; }
  try {
    const changed = git(["show", `${commit}:${file}`]);
    const previous = git(["show", `${commit}^:${file}`]);
    const body = text => text.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, "").trim();
    rows.push({ file, introducingCommit: commit, bodyChanged: body(changed) !== body(previous), meaningfulSourceDifference: semantic(changed) !== semantic(previous), result: semantic(changed) !== semantic(previous) ? "source content or non-date metadata changed" : "date-only change needs review" });
  } catch {
    rows.push({ file, introducingCommit: commit, result: "new file or parent unavailable; cannot infer a date-only change" });
  }
}
const report = { auditDate: "2026-11-20", scope: "Current November 19 modifiedDate fields checked against the commit introducing that value; this is not a legal or product verification-date refresh", rows };
fs.writeFileSync("data/citation-modification-date-audit-2026-11-20.json", JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify({ checked: rows.length, dateOnly: rows.filter(row => row.meaningfulSourceDifference === false), inconclusive: rows.filter(row => row.meaningfulSourceDifference === undefined) }, null, 2));
