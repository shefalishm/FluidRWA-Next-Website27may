# Network Explorer asset registry, edition 2026-10-13.2

The public registry contains 12 selected assets in four research classes. It merges the three original dated issuer observations with nine additional assets identified from official issuer or platform documentation. Those nine have no value field until a dated comparable figure is reviewed. The coverage dashboard reports current, historical and unverified values within this selected registry. It is not a global market-share or market-size estimate.

## Data controls

- Each record has an official source URL and source-review date.
- The original observation date and metric name are preserved for the three value-bearing records.
- Stablecoin circulation is not added to fund net assets. A fund represented on multiple networks is counted once.
- Missing values remain null. Identified products are not treated as FluidRWA-vetted, investor-eligible or contract-mapped by default.
- Filtered CSV and a versioned JSON download are available on the registry page.
- The daily source check covers the registry links and checks reachability only. Semantic claims require a separate human review.

## Release checks

- Source-of-truth and TypeScript checks passed.
- Official source reachability passed, with a curl fallback for one site that rejects Node fetch.
- Nine routes passed desktop 1440px and mobile 390px/360px checks, including registry filters, CSV and JSON downloads, no viewport overflow, source links, canonical URLs and sitemap inclusion.
- Production deployment and live route verification must pass before this release is marked published.
