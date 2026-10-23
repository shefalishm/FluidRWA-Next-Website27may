import { Webhook } from "svix";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const events = new Set(["email.sent", "email.delivered", "email.delivery_delayed", "email.bounced", "email.complained", "email.failed"]);
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const headers = { "Cache-Control": "no-store" };
type Receipt = { messageId?: string; lastEvent?: string; eventAt?: string; eventId?: string; [key: string]: unknown };
type Row = { id: string; raw_payload: Record<string, unknown>; updated_at: string };

export async function POST(request: Request) {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret || !url || !key) return NextResponse.json({ ok: false }, { status: 503, headers });
  const limit = 65536;
  if (Number(request.headers.get("content-length")) > limit) return NextResponse.json({ ok: false }, { status: 413, headers });
  let payload: { type?: string; created_at?: string; data?: { email_id?: string } };
  const eventId = request.headers.get("svix-id") || "";
  try {
    // Verify the unmodified body before accepting any event or touching storage.
    const reader = request.body?.getReader();
    if (!reader) throw new Error("missing body");
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > limit) {
        await reader.cancel();
        return NextResponse.json({ ok: false }, { status: 413, headers });
      }
      chunks.push(value);
    }
    const raw = Buffer.concat(chunks).toString("utf8");
    new Webhook(secret).verify(raw, {
      "svix-id": eventId,
      "svix-timestamp": request.headers.get("svix-timestamp") || "",
      "svix-signature": request.headers.get("svix-signature") || ""
    });
    payload = JSON.parse(raw);
    if (!payload || typeof payload !== "object") throw new Error("invalid event");
  } catch {
    return NextResponse.json({ ok: false }, { status: 400, headers });
  }
  if (!events.has(payload.type || "")) return NextResponse.json({ ok: true, ignored: true }, { headers });
  const emailId = payload.data?.email_id || "";
  const eventTime = Date.parse(payload.created_at || "");
  if (!uuid.test(emailId) || !Number.isFinite(eventTime) || eventTime > Date.now() + 300000) {
    return NextResponse.json({ ok: false }, { status: 400, headers });
  }
  const databaseHeaders = { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" };
  const endpoint = `${url.replace(/\/$/, "")}/rest/v1/vendor_intro_requests`;
  try {
    const query = new URLSearchParams({ select: "id,raw_payload,updated_at", "raw_payload->FLUIDRWA_NOTIFICATION->>messageId": `eq.${emailId}`, limit: "2" });
    const read = await fetch(`${endpoint}?${query}`, { headers: databaseHeaders, cache: "no-store", signal: AbortSignal.timeout(10000) });
    if (!read.ok) throw new Error("read failed");
    const rows = await read.json() as Row[];
    if (!rows.length) {
      // A delivery callback can arrive before the intake handler stores its receipt.
      const pendingReceipt = Date.now() - eventTime < 600000;
      return NextResponse.json({ ok: !pendingReceipt, ignored: !pendingReceipt }, { status: pendingReceipt ? 503 : 200, headers });
    }
    if (rows.length !== 1) throw new Error("ambiguous receipt");
    const row = rows[0];
    const receipt = row.raw_payload.FLUIDRWA_NOTIFICATION as Receipt;
    const lastEvent = payload.type!.slice(6);
    const previousTime = Date.parse(receipt.eventAt || "");
    if (receipt.eventId === eventId || previousTime > eventTime ||
      (previousTime === eventTime && lastEvent === "sent") ||
      (receipt.lastEvent && receipt.lastEvent !== "sent" && lastEvent === "sent") ||
      (receipt.lastEvent === "delivered" && lastEvent === "delivery_delayed") ||
      (["bounced", "complained", "failed"].includes(receipt.lastEvent || "") && ["sent", "delivered", "delivery_delayed"].includes(lastEvent))) {
      return NextResponse.json({ ok: true, ignored: true }, { headers });
    }
    const updateQuery = new URLSearchParams({ id: `eq.${row.id}`, updated_at: `eq.${row.updated_at}`, select: "id" });
    const now = new Date().toISOString();
    const update = await fetch(`${endpoint}?${updateQuery}`, {
      method: "PATCH", headers: { ...databaseHeaders, Prefer: "return=representation" }, signal: AbortSignal.timeout(10000),
      body: JSON.stringify({ raw_payload: { ...row.raw_payload, FLUIDRWA_NOTIFICATION: { ...receipt, lastEvent, eventAt: new Date(eventTime).toISOString(), eventId, checkedAt: now, verificationSource: "signed_resend_webhook" } }, updated_at: now })
    });
    if (!update.ok || !(await update.json()).length) throw new Error("write conflict");
    return NextResponse.json({ ok: true }, { headers });
  } catch {
    // Non-2xx asks Resend to retry; never acknowledge an event that was not saved.
    return NextResponse.json({ ok: false }, { status: 503, headers });
  }
}
