import { privateLeadD1, privateLeadOrigin, type LeadDatabase } from "./privateLeadD1";

export function d1LeadStoreEnabled() {
  return process.env.LEAD_STORE_DRIVER === "d1";
}

export function formStoreConfig() {
  if (d1LeadStoreEnabled()) return { url: privateLeadOrigin, key: "internal" };
  return { url: process.env.SUPABASE_URL, key: process.env.SUPABASE_SERVICE_ROLE_KEY };
}

export async function formStoreFetch(input: string, init?: RequestInit) {
  if (!d1LeadStoreEnabled()) return fetch(input, init);
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const context = await getCloudflareContext({ async: true });
    const env = context.env as { LEADS_DB?: LeadDatabase };
    if (env.LEADS_DB) return privateLeadD1(env.LEADS_DB, input, init);
  } catch {
    // A missing binding must never fall back to a different live database.
  }
  return Response.json({ error: "Private lead database is not configured" }, { status: 503 });
}
