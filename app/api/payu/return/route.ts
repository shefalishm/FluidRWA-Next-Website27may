import { NextResponse } from "next/server";

export const runtime = "nodejs";

function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://www.fluidrwa.com").replace(/\/$/, "");
}

async function redirectToVendorForm(request: Request, method: "GET" | "POST") {
  const url = new URL(request.url);
  const params = method === "POST" ? await request.formData() : url.searchParams;
  const get = (name: string) => String(params.get(name) || "").trim();
  const status = get("status") || url.searchParams.get("result") || "returned";
  const txnid = get("txnid") || get("txnId");
  const mihpayid = get("mihpayid") || get("payuMoneyId") || get("payment_id") || get("paymentId");
  const plan = get("udf1") || url.searchParams.get("plan") || "verified-monthly";
  const amount = get("amount");
  const currency = get("currency") || "INR";

  const destination = new URL(`${siteUrl()}/apply-as-vendor`);
  destination.searchParams.set("payment", "payu");
  destination.searchParams.set("membership", "paid-vetted-vendor");
  destination.searchParams.set("plan", plan);
  destination.searchParams.set("status", status);
  if (txnid) destination.searchParams.set("txnid", txnid);
  if (mihpayid) destination.searchParams.set("payu_id", mihpayid);
  if (amount) destination.searchParams.set("amount", amount);
  if (currency) destination.searchParams.set("currency", currency);

  return NextResponse.redirect(destination);
}

export async function GET(request: Request) {
  return redirectToVendorForm(request, "GET");
}

export async function POST(request: Request) {
  return redirectToVendorForm(request, "POST");
}
