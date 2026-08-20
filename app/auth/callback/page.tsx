import type { Metadata } from "next";
import { AuthCallbackClient } from "@/components/AuthCallbackClient";

export const metadata: Metadata = {
  title: "FluidRWA Sign In",
  robots: {
    index: false,
    follow: false
  }
};

function safeNextPath(value?: string | string[]) {
  const next = Array.isArray(value) ? value[0] : value;
  if (!next || !next.startsWith("/") || next.startsWith("//")) return "/";
  return next;
}

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function AuthCallbackPage({ searchParams }: PageProps) {
  const params = await searchParams;
  return <AuthCallbackClient nextPath={safeNextPath(params.next)} error={typeof params.error === "string" ? params.error : undefined} />;
}
