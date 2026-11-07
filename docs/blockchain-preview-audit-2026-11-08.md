# Blockchain comparison preview audit: November 8, 2026

Live article and `/blog` inspected in Chrome before editing. The prior release did not change the H1, SEO title, description or bitmap assets. This follow-up corrects rendered preview inconsistencies without refreshing vendor-source dates or rewriting the article.

## Exact retained strings

- H1: `Chainalysis vs TRM Labs vs Elliptic vs Cognyte`
- HTML title, OG title, Twitter title: `Chainalysis vs TRM vs Elliptic vs Cognyte`
- Meta, OG, Twitter and card description: `Compare four crypto analytics platforms for wallet screening, transaction monitoring, sanctions, investigations and forensics.`
- Canonical and OG URL: `https://www.fluidrwa.com/blog/chainalysis-vs-trm-vs-elliptic-blockchain-analytics`
- OG/Twitter image: `https://www.fluidrwa.com/assets/social/blog-chainalysis-vs-trm-vs-elliptic-blockchain-analytics-editorial.jpg`
- Twitter card: `summary_large_image`
- Article source review/modified date remains November 7. November 8 is this preview audit date, not a new vendor fact-check.

## Narrow corrections

- Card H2/source Article headline: `Chainalysis vs TRM Labs vs Elliptic vs Cognyte: Crypto Analytics Compared` -> `Chainalysis vs TRM Labs vs Elliptic vs Cognyte`, matching the existing rendered H1.
- Card image alt: `FluidRWA Chainalysis vs TRM Labs vs Elliptic vs Cognyte: Crypto Analytics Compared: Editorial image for Chainalysis vs TRM Labs vs Elliptic vs Cognyte: Crypto Analytics Compared` -> `FluidRWA: Illustrative analyst reviewing network graphs across three monitors; not a vendor product screenshot.`
- Added that same descriptive string to the previously absent `og:image:alt` and `twitter:image:alt`.
- Rendered `og:type`: `website` -> `article`. The generated source already said article; the runtime metadata adapter was overriding it. Added optional per-page metadata fields; other routes keep their existing defaults.

## Retained bitmap files

Paths below are under `/assets/`. All four local files were decoded with sharp; the preview checker fetches their served bytes, checks dimensions/format and requires exact SHA-256 equality with the local files.

| Asset | Format | Pixels | Bytes |
|---|---|---|---:|
| blog-thumbnails/blog-chainalysis-vs-trm-vs-elliptic-blockchain-analytics-editorial.webp | WebP | 640 x 400 | 33,138 |
| social/blog-chainalysis-vs-trm-vs-elliptic-blockchain-analytics-editorial.jpg | JPEG | 1200 x 630 | 221,803 |
| infographics/chainalysis-vs-trm-vs-elliptic-blockchain-analytics-comparison.png | PNG | 1600 x 1050 | 61,721 |
| infographics/chainalysis-vs-trm-vs-elliptic-blockchain-analytics-comparison-mobile.png | PNG | 900 x 1497 | 53,482 |

The social/thumbnail bitmap shows an illustrative analyst and network graphs, with no embedded vendor headline to correct. The SVG frontmatter image is not the rendered `/blog` thumbnail or social preview. No new asset was generated.

Both PNGs were visually inspected: four named vendors, the same best-fit/core-workflow/test-first summaries as the HTML table, no Navigator product label. Elliptic's graphic wording is wallet screening/transaction risk; the linked HTML product rows specify Lens and Investigator and explain historical Navigator naming. No contradiction requires regenerating the graphic.

Local served preview checker passed exact H1/title/description/canonical/social type/alt/card heading/card alt, four image responses, dimensions, byte sizes and checksums. Local browser inspection confirmed the actual thumbnail loaded at 640 x 400 and the corrected card heading rendered without overflow. Publication and final live checks must complete before reporting this correction as published.
