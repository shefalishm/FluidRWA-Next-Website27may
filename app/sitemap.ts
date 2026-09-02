import fs from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";
import { chainEcosystemUpdatedAt, getChainEcosystems } from "@/lib/chainEcosystem";
import { chainProjectsBasePath, sitemapRoutePaths, siteUrl } from "@/lib/routes";
import { learnArticles } from "@/lib/learn";
import { useCases } from "@/lib/useCases";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogRoot = path.join(process.cwd(), "content/blog");
  const blogRoutes = fs.existsSync(blogRoot)
    ? fs.readdirSync(blogRoot).filter((file) => file.endsWith(".md")).map((file) => {
        const raw = fs.readFileSync(path.join(blogRoot, file), "utf8");
        const slug = raw.match(/slug:\s*"([^"]+)"/)?.[1] || file.replace(/\.md$/, "");
        const reviewedDate = raw.match(/reviewedDate:\s*"([^"]+)"/)?.[1] || "2026-06-06";
        return { url: `${siteUrl}/blog/${slug}`, lastModified: reviewedDate, changeFrequency: "monthly" as const, priority: 0.72 };
      })
    : [];

  const routes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: "2026-05-27", changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}${chainProjectsBasePath}`, lastModified: chainEcosystemUpdatedAt, changeFrequency: "weekly", priority: 0.9 },
    ...getChainEcosystems().map((chain) => ({
      url: `${siteUrl}${chainProjectsBasePath}/${chain.slug}`,
      lastModified: chainEcosystemUpdatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.78
    })),
    { url: `${siteUrl}/tools`, lastModified: "2026-08-03", changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/tools/vendor-comparison`, lastModified: "2026-08-03", changeFrequency: "weekly", priority: 0.94 },
    { url: `${siteUrl}/news`, lastModified: "2026-07-23", changeFrequency: "hourly", priority: 0.86 },
    { url: `${siteUrl}/web3-events`, lastModified: "2026-09-02", changeFrequency: "weekly", priority: 0.87 },
    { url: `${siteUrl}/news/fluidrwa-surestack-partnership`, lastModified: "2026-07-23", changeFrequency: "monthly", priority: 0.76 },
    { url: `${siteUrl}/news/fluidrwa-minddeft-partnership`, lastModified: "2026-07-09", changeFrequency: "monthly", priority: 0.74 },
    { url: `${siteUrl}/learn`, lastModified: "2026-07-10", changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/apply-as-freelancer`, lastModified: "2026-07-16", changeFrequency: "weekly", priority: 0.88 },
    ...learnArticles.map((article) => ({
      url: `${siteUrl}/learn/${article.slug}`,
      lastModified: article.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.78
    })),
    { url: `${siteUrl}/jobs`, lastModified: "2026-07-07", changeFrequency: "daily", priority: 0.84 },
    { url: `${siteUrl}/tokenization-readiness-assessment-tool`, lastModified: "2026-06-18", changeFrequency: "weekly", priority: 0.96 },
    { url: `${siteUrl}/family-office-service-stack-builder`, lastModified: "2026-06-18", changeFrequency: "weekly", priority: 0.94 },
    { url: `${siteUrl}/use-cases`, lastModified: "2026-07-01", changeFrequency: "weekly", priority: 0.92 },
    ...useCases.map((useCase) => ({
      url: `${siteUrl}/use-cases/${useCase.slug}`,
      lastModified: "2026-07-01",
      changeFrequency: "monthly" as const,
      priority: 0.82
    })),
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
