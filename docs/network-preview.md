# Network Explorer Preview

Local entry: `/network-preview/rwa-ecosystem`.

The product objective is to turn fragmented RWA and Web3 market information
into an explorable intelligence graph. A visitor can begin with a company,
category, blockchain, asset class, geography or plain-language need, then see
where that starting point fits and which providers merit further research. The
map is one interface for the intelligence model, not the product definition.

This is an isolated prototype, not a verified vendor dataset. All 39 entities
and 92 relationships are explicitly sample records. No SPEC INTELLIGENCE record
is included. Production rendering is disabled unless `ENABLE_NETWORK_PREVIEW=true`
is deliberately set at build time. There are no public navigation or sitemap links.

## Shared Model

`lib/network-preview.ts` owns entities, relationship types, relationships, six
view configurations, infrastructure layers, and the combined-filter selector. All views use the same
records. Evidence, confidence, dates, active flags and verification status are
part of the model; missing evidence stays null. Inferred edges are excluded.

`components/NetworkExplorer.tsx` defaults to a spatial capital-flow landscape.
`components/NetworkLandscape.tsx` uses React Flow with glass company-logo nodes,
pan/zoom, category recomposition and company-focused relationship maps. Custody
and data/oracles are separate layers. Workflow paths are conceptual, while
company edges retain their sample evidence status and expose a connection-detail
panel. Explore, Shortlist, Compare and Markets share the same data. Mobile uses
a vertical arrangement and a layer selector; desktop uses a left-to-right,
returning capital-flow layout. A project-context bar combines category, chain,
asset and region requirements, and search ignores common intent-language words.
Shortlists remain a research output rather than the definition of the product.
Grouped search supports multiple terms across company and neighboring entity data.
Comparison supports two to five selected companies. Geography displays sample
regional associations, not headquarters or licensing claims. URLs encode filters,
search, focused company, profile selection, comparison selection and mode.

Public favicons in `public/assets/network-logos` were retrieved from Google's
favicon service for each company's domain. Existing local company/chain logos
are reused where available. Missing products/integrations remain undocumented.

Run `node scripts/test-network-preview.mjs` for data and asset checks.

Analytics are local `fluidrwa:network-preview` custom events only. They are an
integration point, not connected to production analytics. No Supabase writes or
production vendor migrations are performed by the preview.

## Before Release

Replace fixtures with independently evidenced records, review each relationship,
connect approved analytics, and implement the authenticated admin ingestion and
review workflow. Paid placement must remain separate from factual relationships.
Country-level geography, saved accounts and authenticated admin workflows are
not implemented in this local prototype.
