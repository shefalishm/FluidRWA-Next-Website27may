import { notFound } from "next/navigation";
import { IntelligenceExplorer } from "@/components/IntelligenceExplorer";
import { explorerViews, type ExplorerView } from "@/lib/network-intelligence";
export const dynamic = "force-static";
export const dynamicParams = false;
export function generateStaticParams() { return explorerViews.map(view => ({ view })); }
export async function generateMetadata({ params }: { params: Promise<{ view: string }> }) {
  const { view } = await params;
  const label = view === "fund-comparison" ? "Compare Tokenized Fund Operating Models" : view.charAt(0).toUpperCase() + view.slice(1);
  return { title: `${label} | FluidRWA Network Explorer`, description: view === "fund-comparison" ? "Compare documented custody, fund administration, transfer agency and digital records across 26 researched fund products. Sources, dates, provider coverage and CSV/PNG downloads." : view === "supply" ? "Daily, source-linked ERC-20 contract supply observations with exact blocks, calculation methods and downloadable history. Not circulating supply or market value." : `Sourced ${view} evidence, reporting dates and methodology for digital asset infrastructure research.`, alternates: { canonical: `https://www.fluidrwa.com/network-explorer/${view}` } };
}
export default async function Page({ params }: { params: Promise<{ view: string }> }) {
  const { view } = await params;
  if (!explorerViews.includes(view as typeof explorerViews[number])) notFound();
  return <IntelligenceExplorer view={view as ExplorerView} />;
}
