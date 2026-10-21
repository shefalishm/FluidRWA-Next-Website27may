# Network Explorer update - October 21, 2026

## Material evidence

| Record | New disclosure | Reporting date | Source |
| --- | --- | --- | --- |
| USDC | USD71.9 billion, rounded reported circulation | 2026-10-19 | https://www.circle.com/usdc |
| USTB | USD775,483,296 reported fund AUM | 2026-10-19 | https://superstate.com/assets/ustb |
| USCC | USD194,662,025 reported fund AUM | 2026-10-19 | https://superstate.com/assets/uscc |
| VBDC | USD9,500,967 reported fund AUM | 2026-10-19 | https://superstate.com/assets/vbdc |

All four observations checked October 21. CUSHY's source still reports August 31; its figure and older review date remain unchanged. The USCC network breakdown still does not reconcile with headline AUM, so allocations remain excluded. No regulatory or ramp review dates are refreshed.

Snapshot edition is 2026-10-21.1 with an explicit release `updated` date. The legacy `reviewed` date remains the fallback for unchanged records; USDC has its own October 21 `sourceReviewed` override, honored by runtime and exports. This avoids re-dating older asset observations or regulatory checks.

## Reproducible history

Preserve the three October 18 fund observations published in the October 20 release (commit 31a35ab), alongside the new October 19 observations. Each row carries the asset, reporting date, check date and exact source. Publish the same six rows as JSON and CSV with metric, currency and scope.

AUM percentage change is `(latest - previous) / previous * 100`, only for matching fund, metric and source. Do not describe it as yield, investment performance, net flows or a market-wide trend. No fabricated monthly/yearly baselines or filled dates. Current financial pages can replace past data; these earlier observations are retained from FluidRWA's recorded prior release, not claimed as newly fetched historical values.

## Release checks

Supply health check found USDC on Arbitrum without an October 21 observation while the other 21 contracts were current. Added the public Arbitrum One endpoint documented at https://docs.arbitrum.io/chain-info as a fallback for both monitored Arbitrum contracts. The recovery utility accepts a single existing contract ID; it retains same-block chain-ID, timestamp, decimals and positive-supply checks and INSERT OR IGNORE, so prior readings are not overwritten. This does not establish the original upstream failure's cause.

Recovery completed at Arbitrum block 516754467: raw supply 2628590928383524, decimals 6, block timestamp 1792541661, captured 2026-10-21T00:14:22.337Z. A live API recheck confirmed all 22 contracts have October 21 observations. Final preview checks passed across all ten Explorer routes at 1440, 390 and 360 pixels, including the AUM percentages, six-row history downloads, filters, API coverage and unchanged older review dates. Type checking and source validation passed.

Validate unique observations, reporting/check dates, source consistency, latest-profile agreement, generated exports, unchanged older records, overview calculations, downloads and responsive layouts. The existing 1,731-asset identification catalog and 35 documented roles are unchanged. Verify scheduled contract readings separately from issuer-reported financial observations.
