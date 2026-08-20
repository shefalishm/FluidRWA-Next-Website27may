import { NextRequest, NextResponse } from "next/server";
const providerMap = {
  google: "google",
  linkedin: "linkedin_oidc"
} as const;

function safeNextPath(value: string | null) {
  if (!value || !value.startsWith("/")) return "/";
  if (value.startsWith("//")) return "/";
  return value;
}

export function GET(request: NextRequest) {
  const providerParam = request.nextUrl.searchParams.get("provider");
  const provider = providerParam === "google" || providerParam === "linkedin" ? providerMap[providerParam] : null;
  const nextPath = safeNextPath(request.nextUrl.searchParams.get("next"));
  const origin = request.nextUrl.origin;

  if (!provider) {
    return NextResponse.redirect(new URL(`/auth/callback?error=unsupported_provider&next=${encodeURIComponent(nextPath)}`, origin));
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!supabaseUrl) {
    return NextResponse.redirect(new URL(`/auth/callback?error=missing_supabase_url&next=${encodeURIComponent(nextPath)}`, origin));
  }

  const callbackUrl = new URL("/auth/callback", origin);
  callbackUrl.searchParams.set("next", nextPath);

  const oauthUrl = new URL("/auth/v1/authorize", supabaseUrl);
  oauthUrl.searchParams.set("provider", provider);
  oauthUrl.searchParams.set("redirect_to", callbackUrl.toString());

  return NextResponse.redirect(oauthUrl);
}
