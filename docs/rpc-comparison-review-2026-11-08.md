# Alchemy / QuickNode / Infura review: November 8, 2026

Canonical: https://www.fluidrwa.com/blog/alchemy-vs-quicknode-vs-infura-rpc-node-providers

Targeted refresh of the existing article. Retained its section structure, URL, title, provider cohort, buyer paths, email and consideration CTA. No redirect, merge, new comparison or authenticated provider run. Chainstack article/source unchanged. Two pre-existing untracked November 7 planning/review documents remain outside this release.

## Search evidence and overlap

Supplied baseline, October 8-November 4: Infura variant 3 clicks / 2,575 impressions / position 5.1; Chainstack variant 0 / 1,948 / 5.2. Do not replace this with a rolling observation.

Chrome had no existing GSC tab at this task's inventory. Opened the same property, sc-domain:fluidrwa.com, directly and found authenticated read access. Live November 8: Web (text), 28 days, chart October 9-November 5, last update 4 hours ago. Separate exact-page filters were visibly present. No query/country/device filter was applied. Read first ten displayed query rows per page, not a complete export; totals are rounded headline values.

| Page | Clicks | Impressions shown | CTR shown | Position | Query rows |
|---|---:|---:|---:|---:|---:|
| Infura variant | 3 | 2.54K | 0.1% | 5.2 | 304 |
| Chainstack variant | 0 | 2.02K | 0% | 5.1 | 125 |

Observed Infura-page rows, all 0 clicks: `quicknode vs alchemy` 225 impressions / 5.9; `quicknode vs infura` 100 / 4.7; `evaluate the rpc node provider infura` 75 / 3.4; `is alchemy overpriced compared to other rpc providers?` 60 / 9.4; `is infura still a good choice for ethereum rpc?` 40 / 2.6; `quicknode vs. alchemy` 39 / 6.0; `infura vs alchemy` 35 / 8.1; `alchemy vs quicknode` 27 / 6.8; `is quicknode a good rpc provider?` 27 / 8.1; `evmquery vs quicknode` 23 / 9.2.

Observed Chainstack-page rows, all 0 clicks: `alchemy vs quicknode vs chainstack` 233 / 2.9; `quicknode vs chainstack` 112 / 6.2; `is alchemy or quicknode better for enterprise blockchain workloads?` 101 / 4.8; `is quicknode reliable for production workloads?` 67 / 6.4; `evaluate the rpc node provider chainstack` 40 / 4.6; `is it alchemy vs quicknode vs chainstack` 39 / 1.3; `is chainstack a good rpc provider?` 39 / 4.7; `quicknode alternatives` 39 / 7.2; `quicknode vs alchemy` 36 / 9.4; `quicknode vs. chainstack` 30 / 6.6.

There is observed pairwise Alchemy/QuickNode overlap, plus different named-provider query intent. This small visible sample does not establish cannibalization, cause of low CTR, full query shares or traffic value. Keep both URLs. Editorial boundary: this article covers Alchemy/QuickNode/Infura endpoint compatibility, authentication, methods and acceptance; the existing Chainstack variant covers deployment model, dedicated resources and capacity accounting. Added a contextual link explaining the different next decision. Retained H1 `Alchemy vs QuickNode vs Infura: RPC Compared` and search title with its existing ` | FluidRWA` suffix. Replaced the meta description's editorial-process phrasing with concrete buyer tasks.

## Material primary-source checks

Read source content with web retrieval on November 8; this is claim-scope research, not merely successful HTTP responses. None establishes comparative latency, uptime, price or acceptance of a particular account. Undated pages have a retrieval date, not an invented publication date.

| Exact primary source | Claim supported / limitation |
|---|---|
| https://www.alchemy.com/docs/reference/node-supported-chains | Ethereum mainnet/Sepolia endpoints and additional EVM/non-EVM networks. Not every method entitlement. |
| https://www.alchemy.com/docs/reference/feature-support-by-chain | Method/product availability matrix; dynamic daily configuration. No exhaustive chain count copied. |
| https://www.alchemy.com/docs/reference/pricing-plans | Archive versus Debug/Trace plan distinctions. No prices, numeric quotas or blanket all-chain guarantee republished. |
| https://www.alchemy.com/docs/create-an-api-key | App API key, enabled chains/services and HTTP/WSS URLs. No account created. |
| https://www.alchemy.com/docs/reference/throughput | Account-scoped CU/s, HTTP/WS overload and retry guidance. |
| https://www.alchemy.com/docs/reference/compute-unit-costs | Method weights and subscription delivery accounting. No numeric prices or method weights republished. |
| https://www.alchemy.com/docs/reference/compute-units | Still contains per-app throughput wording; disclosed conflict with specialized throughput guide. |
| https://support.alchemy.com/articles/3788245542-is-alchemy-s-throughput-cu-s-limit-shared-across-all-apps-or-set-per-chain | Independently checked official support article corroborates shared account scope; not a separate performance test. |
| https://www.alchemy.com/docs | Chain/data/wallet product separation. |
| https://www.quicknode.com/docs/platform/supported-chains-node-types | Network-specific archive/pruning table, shown updated November 6. Not a blanket all-network history claim. |
| https://www.quicknode.com/docs/ethereum | Ethereum networks and standard/Trace/Debug/add-on reference separation; marketing speed claims not adopted. |
| https://www.quicknode.com/docs/ethereum/endpoint-security | URL token, x-token header, plan-scoped controls. No disabling authentication recommended. |
| https://www.quicknode.com/docs/ethereum/endpoints | HTTP/WSS transports, method credits, plan limits. No RPS promise adopted. |
| https://www.quicknode.com/docs/ethereum/error-references | 429 may reflect request/method/connection/add-on limits; bounded read retries and ambiguous transaction handling. |
| https://www.quicknode.com/docs/streams | Separate historical/real-time pipeline product; product page shown updated October 6. |
| https://www.quicknode.com/docs/webhooks | Separate filtered blockchain-event HTTP delivery service. No delivery guarantee inferred. |
| https://www.quicknode.com/api-credits/eth | Additional corroboration of weighted methods; numeric credits not republished. |
| https://docs.infura.io/get-started/endpoints/ | Exact network and transport list, shown updated November 4; Ethereum mainnet/Sepolia HTTPS/WSS. |
| https://docs.infura.io/get-started/infura/ | API-key integration, unsupported eth_sign/eth_sendTransaction-style account methods. No custody/signing service inferred. |
| https://docs.infura.io/concepts/archive-data/ | Explicit network list and historical-state methods; no generic 128-block cutoff repeated as universal architecture fact. |
| https://docs.infura.io/how-to/avoid-rate-limiting/ | Daily quota vs throughput, HTTP 402 vs 429; account-wide limit. No numeric quota or price republished. |
| https://docs.infura.io/concepts/websockets/ | Network-specific subscriptions, some public-beta scope and charges; no blanket WSS coverage inferred. Endpoint/WS lists differ in places, so article asks readers to confirm exact network/method. |
| https://docs.infura.io/ and https://docs.infura.io/reference/ethereum/ | Managed endpoint context and Ethereum method reference. MetaMask services root redirected to docs.infura.io in this check. |
| https://ethereum.org/developers/docs/nodes-and-clients/ | General node/client architecture only, not provider performance. |

The public article contains 20 exact claim-adjacent external references; corroborating/support pages above are separate research, not silently counted as article citations.

## Reader and asset checks

Expanded the sourced comparison and practical trial rather than replacing the whole article. Added exact network/method/history/auth/quota/retry/WS/failover acceptance questions. Linked the existing `/learn/ethereum-rpc-endpoint-acceptance-test` and explicitly distinguished authored offline fixture, mocked HTTP checks and optional authorized live reads. Ran its offline mode only: authored fixture, head 0x100, age 12, finalized 0xf0; this does not test a provider.

Refreshed both infographic PNGs from the same three summary rows as the accessible HTML table; no scores, speed rankings or pricing. Both visually inspected. Retained unique thumbnail (WebP, 640 x 400, 20,348 bytes) and social preview (JPEG, 1200 x 630, 287,897 bytes). New desktop infographic: PNG 1600 x 1050, 46,845 bytes; mobile: PNG 900 x 1969, 59,960 bytes. New descriptive thumbnail/social alts correctly describe their different illustrations. The old frontmatter SVG is not the actual card/social bitmap.

Preserved H1 and search title, canonical and OG/Twitter image URLs. Description now: `Compare Alchemy, QuickNode and Infura for RPC networks, archive reads, WebSockets, authentication and rate limits, with a workload acceptance checklist.` Corrected rendered OG type to article; added OG/Twitter image alt; kept schema headline aligned with H1 while retaining branded search title. No global metadata default changed.

Completed local checks: source verification; focused generated and served tests (20 primary citations, two accessible tables, 97 linked routes/assets including lab/download); all four bitmap files decoded and byte-matched to the served assets; browser article at 1440/390/360 and actual blog card at desktop/390; no page overflow, all section anchors resolve, mobile selects the correct mobile infographic. Existing consideration and email paths remain. Full Next production build passed, including TypeScript and 714 generated pages. Final production checks are a separate gate, not inferred from local checks.
