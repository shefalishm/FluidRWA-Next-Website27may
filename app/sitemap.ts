import fs from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";
import { sitemapRoutePaths, siteUrl } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogRoot = path.join(process.cwd(), "content/blog");
  const blogRoutes = fs.existsSync(blogRoot)
    ? fs.readdirSync(blogRoot).filter((file) => file.endsWith(".md")).map((file) => {
        const raw = fs.readFileSync(path.join(blogRoot, file), "utf8");
        const slug = raw.match(/slug:\s*"([^"]+)"/)?.[1] || file.replace(/\.md$/, "");
        return { url: `${siteUrl}/blog/${slug}`, lastModified: "2026-06-06", changeFrequency: "monthly" as const, priority: 0.72 };
      })
    : [];

  const routes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: "2026-05-27", changeFrequency: "weekly", priority: 1 },
    ...sitemapRoutePaths().map((route) => ({
      url: `${siteUrl}/${route}`,
      lastModified: "2026-05-27",
      changeFrequency: "weekly" as const,
      priority: route.startsWith("vendors/") ? 0.8 : 0.75
    })),
    ...blogRoutes
  ];

  return [...new Map(routes.map((route) => [route.url, route])).values()];
}
