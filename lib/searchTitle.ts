import titles from "@/data/search-titles.json";

const reviewedTitles: Record<string, string> = titles;

export function searchTitle(original: string, pathname: string) {
  const title = reviewedTitles[pathname] || original;
  const unbranded = title.replace(/\s*\|\s*FluidRWA(?: Learn| Research)?$/, "");
  return title.length < 70 ? title : unbranded;
}
