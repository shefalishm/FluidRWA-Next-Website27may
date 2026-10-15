# FluidRWA Network Explorer: product and source plan

Reviewed 2026-10-15. This is a product plan, not a claim that all listed feeds are already ingested or licensed for republication.

## Product job

Answer three linked questions in one place:

1. What is this tokenized asset, and what is actually measured?
2. Which named organizations perform which roles, on which documented scope and date?
3. Which legal and operating questions remain open for a buyer or researcher?

The public product should let readers move from a named asset to its issuer, deployments, documented service roles, source documents and dated measurements. A record with a missing source or value remains visible as a coverage gap, not a zero or an inferred role. The paid vendor directory must not influence research inclusion or findings.

## Competitive boundary

- RWA.xyz indexes asset state and reviews legal structure, contracts, providers and price/NAV feeds. It is not a safe assumption that FluidRWA is first to map providers. Source: https://docs.rwa.xyz/methodology/coverage
- Token Terminal describes a pipeline for 3,000+ tokenized assets across 50 chains, with standardized onchain metrics and time series. Rebuilding its financial metrics on free public RPCs is not the initial wedge. Source: https://tokenterminal.com/resources/engineering/2026-05-06-how-we-cover-the-entire-tokenized-asset-market
- The Tokenization Map claims 1,250+ relationships and offers graph, list and timeline views. The mere existence of a relationship graph is not a differentiator. Its claim has not been independently audited here. Source: https://www.tokenizationmap.com/overview

FluidRWA's proposed differentiation is a joined, reviewable **operating record**: financial observation, issuer/product/legal-vehicle identity, deployment, named provider responsibility, jurisdiction-specific source and buyer decision evidence in the same dated view. Distinctiveness must be re-audited as competitors evolve.

## Evidence and metric rules

Store `entity`, `asset`, `legal_vehicle`, `deployment`, `provider_role`, `jurisdiction_record`, `source_document`, `observation` and `change_event` as separate objects with stable IDs. Every public assertion needs a source URL, publisher, source date when known, review date, exact scope and evidence status. Keep observed, issuer-reported, vendor-submitted and FluidRWA-inferred states separate.

- Contract supply = `totalSupply()` read at a named block / `10^decimals`. It is not circulation, reserves or market cap.
- Dated percent change = `(latest - baseline) / baseline * 100`; publish only with a real observation at the chosen baseline date or an explicitly documented tolerance.
- Documented role count = distinct asset-provider-role assertions in a defined reviewed cohort. It is not provider market share or proof that all other roles are absent.
- Disclosure coverage = source-backed applicable fields / all applicable fields for a stated cohort and taxonomy version. It measures documentation completeness, not quality or legal approval.
- Demand themes from FluidRWA enquiries require privacy review, a minimum cohort threshold and clear collection dates. Never publish identifying buyer details or convert enquiries into market-wide estimates.

Do not sum heterogeneous issuer-reported NAV, stablecoin circulation and contract supply. Do not call issuer-listed token addresses measured assets. Preserve corrected and delisted historical rows with their original dates.

## Source acquisition matrix

| Source | What it can establish | Access now | Cadence / review | Restriction or unresolved issue |
| --- | --- | --- | --- | --- |
| Ethereum and Base RPC, issuer-confirmed ERC-20 contracts | Dated totalSupply, decimals, block | Public RPC proof of concept live for USDC and PYUSD | Daily capture; validate chain, block age, decimals and outliers | Public endpoints have no SLA; scale requires rate-aware provider account and fallback. No price or legal meaning follows from supply alone. |
| Ondo and Backed issuer token lists; Robinhood public assets API | Issuer-listed names, symbols and contracts | Pinned snapshots already in registry | Scheduled source-change check, human approval before replacing snapshot | Lists do not prove current trading, eligibility or valuation. Review source terms before broader redistribution. |
| Issuer factsheets and offering documents | Legal vehicle, fund NAV, dated roles, eligibility | Public when issuer publishes | Check publication schedule; human review | PDFs differ by product; issuer statements are first-party evidence, not independent validation. |
| SEC EDGAR submissions and XBRL APIs | Filings and company financial facts | Free, no API key; declared User-Agent and fair-access rules | Nightly or filing-event checks for matched issuers | Most asset-level NAV and service roles are not a standardized API field. Source: https://www.sec.gov/search-filings/edgar-application-programming-interfaces |
| ESMA MiCA register CSVs | EU authorized CASPs and other register classes | Public CSV downloads | Check weekly, retain source version and as-of date | Register status is entity- and activity-specific, not permission for every product. Source: https://www.esma.europa.eu/publications-and-data/databases-and-registers |
| FCA Financial Services Register API | UK firm lookup | Free developer registration and API key | Lookup on matched firms, not bulk crawling | FCA says API is for individual lookups, not bulk extracts; free service has no SLA. Source: https://www.fca.org.uk/register |
| Etherscan API V2 | Explorer cross-checks and selected chain reads | Free account/API key available for selected chains | Respect 3 calls/second and 100,000/day free limits as of review | Chain and endpoint coverage vary; no substitute for issuer identity checks. Source: https://docs.etherscan.io/rate-limits |
| Solana public RPC | Onchain token state | Public for development | Pilot only | Solana states public endpoints are not for production and may rate-limit/block. Source: https://solana.com/docs/rpc |
| Issuer and vendor submissions | Unpublished operating details, corrections, source documents | FluidRWA can invite submissions today | Review before public release; schedule reconfirmation | A company claim is labeled submitted until documentary or regulator evidence is checked. Paid placement cannot upgrade evidence status. |
| Third-party market-data products | Historical values and broader pricing | Not acquired | Licence assessment first | Public display/API availability does not grant competitive redistribution rights. Do not mirror their dataset. |

Cloudflare D1 already stores three onchain contract series. Workers Free D1 has per-database and daily row limits; the public API must paginate, cache and use indexes. Current official limits: https://developers.cloudflare.com/d1/platform/limits/ and https://developers.cloudflare.com/d1/platform/pricing/ .

## Product experience

Use one question per screen. The overview asks, "What powers tokenized assets?" Selecting an asset reveals only documented provider roles, each with its source and date. Under that, show measured supply, broader identified records and jurisdiction references as clearly distinct layers. Explain uncertainty next to the number or edge, not only in a remote methodology page. On mobile, replace a wide graph with a vertical asset-to-role-to-provider reading order.

The public API is versioned (`/api/network-explorer/v1`) and exposes filtered assets, relationships and coverage definitions. The existing onchain-supply endpoint remains a separate measured series. API responses are paginated and include review dates; downloadable CSV/JSON snapshots remain stable for citation. Do not require signup for basic evidence; saved watchlists and change alerts can justify accounts later.

## Release gates

### Current release

Six mapped assets, sixteen documented asset-provider roles, 1,727 identified registry records and two assets with daily supply measurements on three contracts. This is a limited research cohort, not a complete market map. The overview and API must state those boundaries visibly.

### Next cohort

Choose one asset class, ideally tokenized treasury and money-market funds. Build a reviewed product list with issuer/vehicle identity, official contracts, applicable service roles and dated fund documents. Expand only after per-asset QA. Publish a sample-selection note and a coverage denominator before any cross-provider statistic.

### Scale

Move approved static records into an append-only D1 evidence model, run bounded source fetchers, send changes to a review queue, and publish immutable daily/weekly snapshots through API and CSV. Add issuer claim/submission, a correction log, historical comparisons and alerts. Account growth follows repeat use; it is not the starting metric.

## Release quality gate

Every page and API should pass source link validation, no-missing-source checks, consistency between displayed and downloaded figures, desktop/mobile inspection, export tests and production-route smoke checks. Any ingestion outage should retain the last dated observation rather than silently publishing zero. A failing new data route must not break forms or the main website.
