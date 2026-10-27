import { JsonLd } from "@/components/JsonLd";
import { HomeVendorReadiness } from "@/components/HomeVendorReadiness";
import { legacyJsonLd, legacyMainHtml, legacyMetadata } from "@/lib/legacy";
import { siteUrl } from "@/lib/routes";

export const metadata = {
  ...legacyMetadata("index.html", "/"),
  alternates: {
    canonical: siteUrl,
    languages: { en: siteUrl, es: `${siteUrl}/es`, "x-default": siteUrl }
  }
};

export default function HomePage() {
  const html = legacyMainHtml("index.html");
  return (
    <main className="next-page-shell">
      {legacyJsonLd("index.html").map((item, index) => (
        <JsonLd key={index} data={item} />
      ))}
      <div dangerouslySetInnerHTML={{ __html: html || "" }} />
      <div style={{ maxWidth: 1180, margin: "24px auto", padding: "0 24px" }}>
        <a href="/es" lang="es" hrefLang="es">FluidRWA en español</a>
      </div>
      <HomeVendorReadiness />
    </main>
  );
}
