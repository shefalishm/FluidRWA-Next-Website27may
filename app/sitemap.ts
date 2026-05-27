import fs from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";
import { allRoutePaths, siteUrl } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogRoot = path.join(process.cwd(), "content/blog");
  const blogRoutes = fs.existsSync(blogRoot)
    ? fs.readdirSync(blogRoot).filter((file) => file.endsWith(".md")).map((file) => {
        const raw = fs.readFileSync(path.join(blogRoot, file), "utf8");
        const slug = raw.match(/slug:\s*"([^"]+)"/)?.[1] || file.replace(/\.md$/, "");
        const date = raw.match(/date:\s*"([^"]+)"/)?.[1] || "2026-05-27";
        return { url: `${siteUrl}/blog/${slug}`, lastModified: date, changeFrequency: "monthly" as const, priority: 0.72 };
      })
    : [];

  return [
    { url: siteUrl, lastModified: "2026-05-27", changeFrequency: "weekly", priority: 1 },
    ...allRoutePaths().map((route) => ({
      url: `${siteUrl}/${route}`,
      lastModified: "2026-05-27",
      changeFrequency: "weekly" as const,
      priority: route.startsWith("vendors/") ? 0.8 : 0.75
    })),
    ...blogRoutes
  ];
}
