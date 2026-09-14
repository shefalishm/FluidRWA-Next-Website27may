import { notFound } from "next/navigation";
import { NetworkExplorer } from "@/components/NetworkExplorer";
import { networkViews } from "@/lib/network-preview";
export const metadata = {
  title: "FluidRWA Network Explorer | Preview",
  robots: { index: false, follow: false },
};
export function generateStaticParams() {
  return networkViews.map((v) => ({ view: v.id }));
}
export default async function Page({
  params,
}: {
  params: Promise<{
    view: string;
  }>;
}) {
  const { view } = await params;
  if (
    process.env.NODE_ENV === "production" &&
    process.env.ENABLE_NETWORK_PREVIEW !== "true"
  )
    notFound();
  if (!networkViews.some((v) => v.id === view)) notFound();
  return <NetworkExplorer initialView={view} />;
}
