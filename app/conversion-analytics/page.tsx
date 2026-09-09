import type { Metadata } from "next";
import { ConversionAnalyticsDashboard } from "@/components/ConversionAnalyticsDashboard";

export const metadata: Metadata = {
  title: "Conversion Analytics | FluidRWA",
  description: "Private FluidRWA buyer conversion attribution dashboard.",
  robots: { index: false, follow: false }
};

export default function ConversionAnalyticsPage() {
  return <ConversionAnalyticsDashboard />;
}
