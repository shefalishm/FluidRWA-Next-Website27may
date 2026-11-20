import fs from "node:fs";

const release = JSON.parse(fs.readFileSync("data/combined-core-recovery-2026-11-20.json", "utf8"));
for (const row of release.rows) {
  const file = `content/blog/${row.slug}.md`;
  let source = fs.readFileSync(file, "utf8");
  const [empty, frontmatter, ...parts] = source.split(/^---\s*$/m);
  if (empty.trim() || !frontmatter || !parts.length) throw new Error(`Invalid frontmatter: ${file}`);
  let fields = frontmatter.trim().split("\n").filter(line => !/^faq\d+[qa]:/.test(line));
  fields = fields.filter(line => !/^(modifiedDate|editorialUpdatedLabel|comparisonItems):/.test(line));
  fields.push(`modifiedDate: "${release.date}"`, 'editorialUpdatedLabel: "November 20, 2026"', `comparisonItems: "${row.vendors.join("|")}"`);
  row.faqs.forEach(([q, a], i) => fields.push(`faq${i + 1}q: ${JSON.stringify(q)}`, `faq${i + 1}a: ${JSON.stringify(a)}`));
  let body = parts.join("---").trim();
  body = body.replace("A capability not established here is **not verified**, not necessarily absent. ", "");
  if (row.slug === "best-fund-tokenization-platforms-asset-managers") body = body.replace(/(?<!formerly )\bLibre\b/g, "KAIO (formerly Libre)").replace("https://www.librecapital.com/", "https://kaio.xyz/");
  if (!body.includes(row.block.split("\n")[0])) body += `\n\n${row.block}`;
  fs.writeFileSync(file, `---\n${fields.join("\n")}\n---\n\n${body}\n`);
}
console.log(`Applied ${release.rows.length} combined core updates.`);
