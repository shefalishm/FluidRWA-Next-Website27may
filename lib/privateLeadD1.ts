type Value = string | number | null;
export type LeadDatabase = {
  prepare(sql: string): { bind(...values: Value[]): { all<T>(): Promise<{ results: T[] }> } };
};

const tables = new Set([
  "vendor_intro_requests", "tokenization_assessments", "tokenization_assessment_events",
  "family_office_stack_assessments", "family_office_stack_assessment_events",
  "freelancer_profiles", "freelancer_intro_requests", "freelancer_marketplace_waitlist"
]);
const filters: Record<string, string> = {
  id: "id",
  created_at: "created_at",
  updated_at: "json_extract(payload,'$.updated_at')",
  contact_email: "json_extract(payload,'$.contact_email')",
  "raw_payload->FLUIDRWA_NOTIFICATION->>messageId": "json_extract(payload,'$.raw_payload.FLUIDRWA_NOTIFICATION.messageId')"
};
const readKeys = new Set([...Object.keys(filters), "status", "company_name", "vendor_name",
  "vendor_category", "request_source", "page_url", "lead_source", "raw_payload"]);
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export const privateLeadOrigin = "https://private-leads.invalid";

function respond(body: unknown, status = 200, headers?: HeadersInit) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

export async function privateLeadD1(db: LeadDatabase, input: string, init?: RequestInit) {
  const url = new URL(input);
  const table = url.pathname.split("/").at(-1) || "";
  if (url.origin !== privateLeadOrigin || url.pathname !== `/rest/v1/${table}` || !tables.has(table)) return respond({ error: "Unsupported table" }, 400);
  const method = init?.method || "GET";
  const params = url.searchParams;
  const selected = params.get("select")?.split(",") ?? [];
  if (selected.some(key => !readKeys.has(key))) return respond({ error: "Unsupported projection" }, 400);
  const project = (payload: string) => {
    const full = JSON.parse(payload) as Record<string, unknown>;
    return selected.length ? Object.fromEntries(selected.map(key => [key, full[key]])) : full;
  };
  try {
    if (method === "POST") {
      if (typeof init?.body !== "string" || params.size) return respond({ error: "Invalid insert" }, 400);
      const payload = JSON.parse(init.body) as Record<string, unknown>;
      if (!payload || typeof payload !== "object" || Array.isArray(payload)) return respond({ error: "Invalid record" }, 400);
      const id = crypto.randomUUID();
      const now = new Date().toISOString();
      const record = { ...payload, id, created_at: now, updated_at: now };
      await db.prepare("INSERT INTO form_submissions (source_table,id,created_at,payload) VALUES (?,?,?,?) RETURNING id")
        .bind(table, id, now, JSON.stringify(record)).all();
      return respond([record], 201);
    }

    if (table !== "vendor_intro_requests" || !["GET", "HEAD", "PATCH"].includes(method)) return respond({ error: "Unsupported operation" }, 400);
    const clauses = ["source_table = ?"];
    const values: Value[] = [table];
    for (const [key, raw] of params) {
      if (["select", "order", "limit", "offset"].includes(key)) continue;
      const column = Object.hasOwn(filters, key) ? filters[key] : undefined;
      if (!column) return respond({ error: "Unsupported filter" }, 400);
      if (raw.startsWith("eq.") && key !== "created_at") {
        clauses.push(`${column} = ?`);
        values.push(raw.slice(3));
      } else if (raw.startsWith("gte.") && key === "created_at") {
        clauses.push("julianday(created_at) >= julianday(?)");
        values.push(raw.slice(4));
      } else if (raw.startsWith("in.(") && raw.endsWith(")") && key === "id") {
        const ids = raw.slice(4, -1).split(",");
        if (ids.length > 90 || ids.some(id => !uuid.test(id))) return respond({ error: "Invalid ID list" }, 400);
        clauses.push(`id IN (${ids.map(() => "?").join(",")})`);
        values.push(...ids);
      } else return respond({ error: "Unsupported filter operator" }, 400);
    }
    const where = clauses.join(" AND ");
    if (method === "HEAD") {
      const { results } = await db.prepare(`SELECT COUNT(*) AS count FROM form_submissions WHERE ${where}`)
        .bind(...values).all<{ count: number }>();
      return new Response(null, { headers: { "Content-Range": `*/${results[0].count}`, "Cache-Control": "no-store" } });
    }
    if (method === "PATCH") {
      const id = params.get("id");
      if (!id?.startsWith("eq.") || !uuid.test(id.slice(3)) || typeof init?.body !== "string") return respond({ error: "An exact record ID is required" }, 400);
      const patch = JSON.parse(init.body) as Record<string, unknown>;
      if (!patch || typeof patch !== "object" || Array.isArray(patch)) return respond({ error: "Invalid update" }, 400);
      const keys = Object.keys(patch);
      if (!keys.length || keys.some(key => !["status", "raw_payload", "updated_at"].includes(key))) return respond({ error: "Unsupported update" }, 400);
      if (!keys.includes("updated_at")) {
        keys.push("updated_at");
        patch.updated_at = new Date().toISOString();
      }
      const assignments = keys.map(key => `'$.${key}', json(?)`);
      const { results } = await db.prepare(`UPDATE form_submissions SET payload=json_set(payload,${assignments.join(",")}) WHERE ${where} RETURNING payload`)
        .bind(...keys.map(key => JSON.stringify(patch[key])), ...values).all<{ payload: string }>();
      return respond(results.map(row => project(row.payload)));
    }
    const order = params.get("order");
    if (order && order !== "created_at.desc,id.desc") return respond({ error: "Unsupported order" }, 400);
    const limit = Number(params.get("limit") || "1000");
    const offset = Number(params.get("offset") || 0);
    if (!Number.isSafeInteger(limit) || limit < 1 || limit > 1000 || !Number.isSafeInteger(offset) || offset < 0) return respond({ error: "Invalid pagination" }, 400);
    const sorted = order ? " ORDER BY julianday(created_at) DESC,id DESC" : "";
    const { results } = await db.prepare(`SELECT payload FROM form_submissions WHERE ${where}${sorted} LIMIT ? OFFSET ?`)
      .bind(...values, limit, offset).all<{ payload: string }>();
    return respond(results.map(row => project(row.payload)));
  } catch {
    return respond({ error: "Private lead storage unavailable" }, 503);
  }
}
