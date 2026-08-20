import { NextResponse } from "next/server";
import { ingestMarketSignals } from "@/lib/marketSignals";

export const runtime = "nodejs";
export const maxDuration = 60;

function isAuthorized(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) return true;

  const auth = request.headers.get("authorization") || "";
  const secret = new URL(request.url).searchParams.get("secret") || "";
  return auth === `Bearer ${cronSecret}` || secret === cronSecret;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const result = await ingestMarketSignals();
  return NextResponse.json({
    ...result,
    importedAt: new Date().toISOString()
  });
}

export async function POST(request: Request) {
  return GET(request);
}
