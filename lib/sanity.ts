import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-05-27",
  useCdn: true
});

export type SanityInsight = {
  title: string;
  slug: string;
  description?: string;
  category?: string;
  image?: string;
};

export async function getSanityInsights() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return [];
  return sanityClient.fetch<SanityInsight[]>(
    `*[_type == "post"] | order(publishedAt desc) {
      title,
      "slug": slug.current,
      description,
      category,
      "image": mainImage.asset->url
    }`
  );
}
