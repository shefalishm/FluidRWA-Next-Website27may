import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { VentureCapitalFilters } from "@/components/VentureCapitalFilters";
import { FamilyOfficeTable } from "@/components/FamilyOfficeTable";
import { fileForRoute, normalizePath, allRoutePaths } from "@/lib/routes";
import { legacyJsonLd, legacyMainHtml, legacyMetadata } from "@/lib/legacy";

type RouteParams = {
  params: Promise<{ slug?: string[] }>;
};

export function generateStaticParams() {
  return allRoutePaths().map((route) => ({ slug: route.split("/") }));
}

export async function generateMetadata({ params }: RouteParams) {
  const { slug } = await params;
  const routePath = normalizePath(slug);
  const file = fileForRoute(routePath);
  if (!file) return {};
  return legacyMetadata(file, `/${routePath}`);
}

export default async function AppRoutePage({ params }: RouteParams) {
  const { slug } = await params;
  const routePath = normalizePath(slug);
  const file = fileForRoute(routePath);
  if (!file) notFound();
  const html = legacyMainHtml(file);
  if (!html) notFound();

  return (
    <main className="next-page-shell">
      {legacyJsonLd(file).map((item, index) => (
        <JsonLd key={index} data={item} />
      ))}
      <div dangerouslySetInnerHTML={{ __html: html }} />
      {routePath === "vendors/venture-capital" ? <VentureCapitalFilters /> : null}
      {routePath === "vendors/family-offices" ? <FamilyOfficeTable /> : null}
    </main>
  );
}
