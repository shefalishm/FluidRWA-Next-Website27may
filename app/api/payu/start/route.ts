import crypto from "crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type PayUPlan = {
  id: string;
  usdAmount: number;
  label: string;
  productInfo: string;
};

const plans: Record<string, PayUPlan> = {
  "verified-monthly": {
    id: "verified-monthly",
    usdAmount: 39,
    label: "Verified Vetted Listing",
    productInfo: "FluidRWA Verified Vetted Listing - monthly review payment"
  },
  "verified-yearly": {
    id: "verified-yearly",
    usdAmount: 390,
    label: "Verified Vetted Listing",
    productInfo: "FluidRWA Verified Vetted Listing - annual review payment"
  },
  "spotlight-monthly": {
    id: "spotlight-monthly",
    usdAmount: 149,
    label: "Spotlight Vetted Listing",
    productInfo: "FluidRWA Spotlight Vetted Listing - monthly review payment"
  },
  "spotlight-yearly": {
    id: "spotlight-yearly",
    usdAmount: 1490,
    label: "Spotlight Vetted Listing",
    productInfo: "FluidRWA Spotlight Vetted Listing - annual review payment"
  },
  "flagship-monthly": {
    id: "flagship-monthly",
    usdAmount: 399,
    label: "Flagship Vetted Listing",
    productInfo: "FluidRWA Flagship Vetted Listing - monthly review payment"
  },
  "flagship-yearly": {
    id: "flagship-yearly",
    usdAmount: 3990,
    label: "Flagship Vetted Listing",
    productInfo: "FluidRWA Flagship Vetted Listing - annual review payment"
  }
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://www.fluidrwa.com").replace(/\/$/, "");
}

function configuredPaymentHandle() {
  return process.env.PAYU_PAYMENT_HANDLE_URL || "https://u.payu.in/rJ19kGC7dpFH";
}

function getUsdInrRate() {
  const configuredRate = Number(process.env.USD_INR_RATE || process.env.PAYU_USD_INR_RATE || "100");
  if (Number.isFinite(configuredRate) && configuredRate > 0) return configuredRate;
  return 100;
}

function toInrAmount(usdAmount: number, rate: number) {
  return Math.max(1, Math.round(usdAmount * rate)).toFixed(2);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const plan = plans[url.searchParams.get("plan") || "verified-monthly"] || plans["verified-monthly"];
  const rate = getUsdInrRate();
  const inrAmount = toInrAmount(plan.usdAmount, rate);

  const key = process.env.PAYU_MERCHANT_KEY;
  const salt = process.env.PAYU_MERCHANT_SALT;
  const baseUrl = process.env.PAYU_BASE_URL || "https://secure.payu.in/_payment";

  if (!key || !salt) {
    const fallback = new URL(configuredPaymentHandle());
    fallback.searchParams.set("plan", plan.id);
    fallback.searchParams.set("amount", inrAmount);
    fallback.searchParams.set("purpose", `${plan.productInfo} - USD ${plan.usdAmount} converted at ${rate.toFixed(2)} USD/INR`);
    fallback.searchParams.set("source", "fluidrwa-vendor-membership");
    return NextResponse.redirect(fallback);
  }

  const txnid = `FR${Date.now().toString(36)}${crypto.randomBytes(3).toString("hex")}`.slice(0, 25);
  const successUrl = process.env.PAYU_SUCCESS_URL || `${siteUrl()}/api/payu/return?result=success&plan=${encodeURIComponent(plan.id)}`;
  const failureUrl = process.env.PAYU_FAILURE_URL || `${siteUrl()}/api/payu/return?result=failure&plan=${encodeURIComponent(plan.id)}`;
  const firstName = "FluidRWA";
  const email = "contact@fluidrwa.com";
  const hashString = [
    key,
    txnid,
    inrAmount,
    plan.productInfo,
    firstName,
    email,
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    salt
  ].join("|");
  const hash = crypto.createHash("sha512").update(hashString).digest("hex");

  const fields: Record<string, string> = {
    key,
    txnid,
    amount: inrAmount,
    productinfo: plan.productInfo,
    firstname: firstName,
    email,
    phone: "9999999999",
    surl: successUrl,
    furl: failureUrl,
    hash
  };

  const inputs = Object.entries(fields)
    .map(([name, value]) => `<input type="hidden" name="${escapeHtml(name)}" value="${escapeHtml(value)}">`)
    .join("\n");

  return new Response(
    `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Redirecting to PayU | FluidRWA</title>
  <style>
    body{font-family:Inter,Arial,sans-serif;background:#fffdf3;color:#12213a;display:grid;min-height:100vh;place-items:center;margin:0}
    main{max-width:520px;padding:32px;text-align:center}
    h1{font-size:28px;line-height:1.1;margin:0 0 12px}
    p{color:#667085;line-height:1.55}
    button{border:0;border-radius:12px;background:#2f6fb4;color:#fff;padding:13px 18px;font-weight:800;cursor:pointer}
  </style>
</head>
<body>
  <main>
    <h1>Opening PayU checkout</h1>
    <p>You are being redirected to PayU for ${escapeHtml(plan.label)}. The USD price of $${escapeHtml(String(plan.usdAmount))} is being charged in INR at an estimated USD/INR rate of ${escapeHtml(rate.toFixed(2))}.</p>
    <form id="payu-form" method="post" action="${escapeHtml(baseUrl)}">
      ${inputs}
      <button type="submit">Continue to PayU</button>
    </form>
  </main>
  <script>document.getElementById('payu-form').submit();</script>
</body>
</html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}
