import { JsonLd } from "@/components/JsonLd";
import { HomeVendorReadiness } from "@/components/HomeVendorReadiness";
import { legacyJsonLd, legacyMainHtml, legacyMetadata } from "@/lib/legacy";

export const metadata = legacyMetadata("index.html", "/");

export default function HomePage() {
  const html = legacyMainHtml("index.html");
  return (
    <main className="next-page-shell">
      {legacyJsonLd("index.html").map((item, index) => (
        <JsonLd key={index} data={item} />
      ))}
      <div dangerouslySetInnerHTML={{ __html: html || "" }} />
      <HomeVendorReadiness />
    </main>
  );
}
