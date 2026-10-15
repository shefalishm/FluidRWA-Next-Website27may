import { IntelligenceExplorer } from "@/components/IntelligenceExplorer";
export const dynamic = "force-static";
export const metadata = {
  title: "Network Explorer: Who Powers Tokenized Assets? | FluidRWA",
  description: "Trace documented links between tokenized assets, issuers, platforms, custodians and other providers. Explore dated evidence, coverage gaps and public data.",
  alternates: { canonical: "https://www.fluidrwa.com/network-explorer" }
};
export default function Page() { return <IntelligenceExplorer view="overview" />; }
