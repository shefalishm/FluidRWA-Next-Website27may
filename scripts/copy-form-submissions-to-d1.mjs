import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { appendFileSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const tables = [
  "vendor_intro_requests", "tokenization_assessments", "tokenization_assessment_events",
  "family_office_stack_assessments", "family_office_stack_assessment_events",
  "freelancer_profiles", "freelancer_intro_requests", "freelancer_marketplace_waitlist"
];
const source = process.env.SUPABASE_URL?.replace(/\/$/, "");
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const database = process.argv[2];
assert.equal(database, "fluidrwa-private-leads", "Use the isolated private leads D1 database.");
assert.ok(source?.startsWith("https://") && key, "Missing Supabase source configuration.");
const cutoff = new Date().toISOString();
const work = mkdtempSync(join(tmpdir(), "fluidrwa-private-transfer-"));
const file = join(work, "import.sql");
const expected = new Map();
const quote = value => "'" + String(value).replaceAll("'", "''") + "'";
const digest = value => createHash("sha256").update(value).digest("hex");
const cliEnv = { ...process.env };
delete cliEnv.SUPABASE_URL;
delete cliEnv.SUPABASE_SERVICE_ROLE_KEY;
delete cliEnv.RESEND_API_KEY;

function d1(args) {
  try {
    const stdout = execFileSync("node_modules/.bin/wrangler", [
      "d1", "execute", database, "--remote", "--json", "--yes", ...args
    ], { env: cliEnv, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], maxBuffer: 12 * 1024 * 1024, timeout: 240000 });
    if (args[0] === "--file") return;
    return JSON.parse(stdout);
  } catch {
    throw new Error("Cloudflare D1 command failed. No data or SQL has been printed.");
  }
}

try {
  writeFileSync(file, `CREATE TABLE IF NOT EXISTS historical_submissions (
    source_table TEXT NOT NULL, source_id TEXT NOT NULL, created_at TEXT NOT NULL,
    payload TEXT NOT NULL CHECK (json_valid(payload)), sha256 TEXT NOT NULL,
    PRIMARY KEY (source_table, source_id)
  );\n`, { mode: 0o600 });
  for (const table of tables) {
    let last;
    const checks = [];
    for (;;) {
      const query = new URLSearchParams({ select: "*", created_at: `lte.${cutoff}`, order: "id.asc", limit: "300" });
      if (last) query.set("id", `gt.${last}`);
      const response = await fetch(`${source}/rest/v1/${table}?${query}`, {
        headers: { apikey: key, Authorization: `Bearer ${key}` }, signal: AbortSignal.timeout(20000)
      });
      if (!response.ok) throw new Error(`Source read failed for ${table} (HTTP ${response.status}).`);
      const rows = await response.json();
      if (!Array.isArray(rows)) throw new Error(`Invalid result for ${table}.`);
      if (!rows.length) break;
      for (const row of rows) {
        const id = String(row.id ?? "");
        if (!/^[\w.-]{1,128}$/.test(id) || typeof row.created_at !== "string") throw new Error(`Missing source identity or date in ${table}.`);
        const payload = JSON.stringify(row);
        const sha = digest(payload);
        checks.push(`${id}:${sha}`);
        const values = [table, id, row.created_at, payload, sha].map(quote).join(",");
        const statement = `INSERT INTO historical_submissions (source_table,source_id,created_at,payload,sha256) VALUES (${values}) ON CONFLICT(source_table,source_id) DO UPDATE SET created_at=excluded.created_at,payload=excluded.payload,sha256=excluded.sha256;\n`;
        if (Buffer.byteLength(statement) > 96000) throw new Error(`A row in ${table} exceeds the SQL import limit.`);
        appendFileSync(file, statement);
        last = id;
      }
    }
    expected.set(table, checks.sort());
  }

  if (!expected.get("vendor_intro_requests")?.length) throw new Error("No main intake rows found; refusing an empty import.");
  try {
    d1(["--file", file]);
  } catch {
    console.log("Import acknowledgment unavailable; checking the destination before drawing a conclusion.");
  }
  let total = 0;
  for (const table of tables) {
    const filter = `FROM historical_submissions WHERE source_table=${quote(table)}`;
    const records = d1(["--command", `SELECT COUNT(*) AS row_count ${filter}`]);
    const result = records[0]?.results?.[0];
    const checks = expected.get(table);
    assert.equal(result?.row_count, checks.length, `Row count mismatch in ${table}.`);
    for (let offset = 0; offset < checks.length; offset += 500) {
      const page = d1(["--command", `SELECT source_id, sha256 ${filter} ORDER BY source_id LIMIT 500 OFFSET ${offset}`]);
      const fingerprints = page[0].results.map(row => `${row.source_id}:${row.sha256}`);
      if (digest(fingerprints.join("|")) !== digest(checks.slice(offset, offset + 500).join("|"))) throw new Error(`Row fingerprint mismatch in ${table}.`);
    }
    total += checks.length;
    console.log(`${table}: ${checks.length} rows matched.`);
  }
  console.log(`Verified ${total} existing rows in private D1 (source cutoff: ${cutoff}). Production form routing unchanged.`);
} finally {
  rmSync(work, { recursive: true, force: true });
}
