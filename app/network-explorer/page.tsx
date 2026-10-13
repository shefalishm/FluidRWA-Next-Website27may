import { IntelligenceExplorer } from "@/components/IntelligenceExplorer";
export const dynamic = "force-static";
export const metadata = {
  title: "Network Explorer | Digital Asset Intelligence | FluidRWA",
  description: "Explore sourced asset snapshots, ramp provider evidence, blockchain deployments and jurisdiction records. Compare scope, dates and primary sources.",
  alternates: { canonical: "https://www.fluidrwa.com/network-explorer" }
};
export default function Page() { return <IntelligenceExplorer view="overview" />; }
