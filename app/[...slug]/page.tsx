import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { VentureCapitalFilters } from "@/components/VentureCapitalFilters";
import { FamilyOfficeTable } from "@/components/FamilyOfficeTable";
import { BrokerDealerTable } from "@/components/BrokerDealerTable";
import { SecurityAuditCompaniesPage } from "@/components/SecurityAuditCompaniesPage";
import { fileForRoute, normalizePath, allRoutePaths } from "@/lib/routes";
import { legacyJsonLd, legacyMainHtml, legacyMetadata } from "@/lib/legacy";
import { siteUrl } from "@/lib/routes";
import { spanishByEnglishPath, spanishUrl } from "@/lib/spanishPages";

type RouteParams = {
  params: Promise<{ slug?: string[] }>;
};

export const dynamicParams = true;

export function generateStaticParams() {
  return allRoutePaths().map((route) => ({ slug: route.split("/") }));
}

export async function generateMetadata({ params }: RouteParams) {
  const { slug } = await params;
  const routePath = normalizePath(slug);
  const file = fileForRoute(routePath);
  if (!file) return {};
  const metadata = legacyMetadata(file, `/${routePath}`);
  const englishPath = `/${routePath}`;
  if (spanishByEnglishPath.has(englishPath)) {
    metadata.alternates = {
      ...metadata.alternates,
      languages: {
        en: `${siteUrl}${englishPath}`,
        es: `${siteUrl}${spanishUrl(englishPath)}`,
        "x-default": `${siteUrl}${englishPath}`
      }
    };
  }
  return metadata;
}

export default async function AppRoutePage({ params }: RouteParams) {
  const { slug } = await params;
  const routePath = normalizePath(slug);
  if (routePath === "vendors/security-audit-companies") {
    return <SecurityAuditCompaniesPage />;
  }

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
      {spanishByEnglishPath.has(`/${routePath}`) ? (
        <div style={{ maxWidth: 1180, margin: "24px auto", padding: "0 24px" }}>
          <a href={spanishUrl(`/${routePath}`)} lang="es" hrefLang="es">Leer esta guía en español</a>
        </div>
      ) : null}
      {routePath === "vendors/venture-capital" ? <VentureCapitalFilters /> : null}
      {routePath === "vendors/family-offices" ? <FamilyOfficeTable /> : null}
      {routePath === "vendors/broker-dealers" ? <BrokerDealerTable /> : null}
    </main>
  );
}
