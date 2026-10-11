# Five original vendor comparisons - 10 October 2026

## Intent and overlap review

Inventory checked: all existing `content/blog` filenames and the current comparison structure. None of the five cohorts already has a published comparison in this repository. Cannibalization cannot be ruled out by inventory alone; monitor query/page performance after indexing.

| New cohort | Distinct buyer task | Nearby existing content kept intact |
| --- | --- | --- |
| CoinGecko / CoinMarketCap / CoinPaprika | Application market-data APIs and asset mapping | Coin Metrics / Kaiko / Token Terminal institutional data; oracle providers |
| Sablier / Streamflow / Superfluid | Token distribution, vesting and streaming | Treasury wallet controls; stablecoin payment rails |
| Pinata / Filebase / Lighthouse | Managed IPFS uploads, retrieval and retention | Arweave / Filecoin / Storj network selection |
| Clerk / WorkOS / Auth0 | B2B login, organization context and offboarding | KYC/KYB verification; embedded wallet onboarding |
| Algolia / Meilisearch / Typesense | Searchable directory/catalog experience and filters | Pinecone / Weaviate / Qdrant vector-store selection |

No new live keyword-volume or analytics claim was made. Selection is based on documented product relevance and gaps in the existing inventory.

## Claim-to-source checklist

All primary sources opened before drafting and reopened after drafting on 10 October 2026. Product facts are company documentation, not independent validation. Tables/images use selected documented scope and editorial pilot questions, not rankings or complete feature sets.

| Company | Material observation retained | Exact source |
| --- | --- | --- |
| CoinGecko | Market/on-chain data; Demo and Pro references | https://docs.coingecko.com/ |
| CoinMarketCap | Quotes, listings, market pairs, historical endpoint families | https://coinmarketcap.com/api/ |
| CoinPaprika | Prices/volume/history; coin-ID ticker example with update timestamp | https://docs.coinpaprika.com/ |
| Sablier | Lockup pre-funded distribution; distinction from Flow | https://docs.sablier.com/concepts/lockup/overview |
| Streamflow | Vesting creation, claims and documented contract operations | https://docs.streamflow.finance/en/collections/10032509-vesting |
| Superfluid | Super Token money streams; illustrative quickstart | https://docs.superfluid.org/docs/protocol/quickstart |
| Pinata | Public upload, CID retrieval, secret JWT handling | https://docs.pinata.cloud/quickstart |
| Filebase | Separate IPFS tier and endpoints, pinning and gateways | https://filebase.com/docs/ipfs/overview |
| Lighthouse | IPFS/Filecoin, encryption options, storage while plan active | https://docs.lighthouse.storage/intro |
| Clerk | Membership/permissions, active organization, multi-tab caveat | https://clerk.com/docs/guides/organizations/overview |
| WorkOS | Enterprise SSO with SAML/OIDC, organization/connection callbacks | https://workos.com/docs/sso |
| Auth0 | B2B Organizations, memberships and organization-aware access | https://auth0.com/docs/manage-users/organizations |
| Algolia | Facets, refinement and contextual counts | https://www.algolia.com/doc/guides/managing-results/refine-results/faceting |
| Meilisearch | Full-text/semantic search and operating arrangements | https://www.meilisearch.com/docs/getting_started/overview |
| Typesense | Collections, syncing, filtering, relevance and production guides | https://typesense.org/docs/guide/ |

Unsupported pricing, market leadership, performance, security guarantees and contract-specific coverage omitted. Unknowns are labelled not verified, not interpreted as absence. Source links embedded beside the relevant provider description. Existing URLs and directories unchanged.

## Delivery checks

Five markdown sources and generated pages; blog index and sitemap entries; five covers plus ten desktop/mobile comparison PNGs. Each article includes a visible review date, research-team credit, accessible HTML table, descriptive alt text, image downloads, company-consideration CTA, requirement link and direct contact email.

Initial local QA detected stale packaged content returning the homepage at a new URL. Refreshed the runtime package using the existing build step before retrying. Production build always performs this packaging; live title/content checks are mandatory before reporting publication.

Local and live verification results are stored in `docs/content-qa-2026-10-10-new`. Publication status is recorded after successful release checks.
