# Dependency security update: 10 October 2026

## Scope

Update Next.js to its patched 16.3.8 release, sharp to 0.35.5, source-map-js to 1.2.2 and Wrangler to 4.149.0. Lockfile resolution includes undici 7.29.1. No content, route, form, database or design changes are included.

The earlier dependency audit reported one critical and five high package-level findings, including dependent packages. These counts do not establish exploitation or application-specific reachability. The post-install audit is checked again for this release; zero reported vulnerabilities is not a guarantee of complete security.

Advisory references:
- https://github.com/advisories/GHSA-vcvr-r3jv-pc5j
- https://github.com/advisories/GHSA-cjq9-62q9-8jv4
- https://github.com/advisories/GHSA-wq5f-xc86-pv6w
- https://github.com/advisories/GHSA-68fv-2mgg-jv7q
- https://github.com/advisories/GHSA-w293-vg96-wgc3

## Category-gap assessment

The reported citation totals (2,544 for institutional trading and 2,481 across tax/accounting pages) are prioritization signals from the earlier report, not proof of buyer traffic or enquiries.

Source inspection confirms no dedicated institutional trading or crypto tax/accounting category. The DeFi trading/margin category lists derivatives protocols, not institutional trading software. The broad compliance category already contains TaxBit, Lukka and Bitwave alongside unrelated screening and identity providers.

Recommended next content work, separate from this security release:

1. `/vendors/institutional-digital-asset-trading-platforms`: institutional trading software, execution orchestration, connectivity and post-trade responsibilities. Begin with the existing Talos/Wyden/Finery comparison cohort and separately verify each vendor's current scope. Do not merge exchanges, liquidity counterparties or DeFi derivatives indiscriminately.
2. `/vendors/crypto-accounting-tax-software`: reconciliation, accounting/subledgers, reporting, tax and audit workflows. Start from existing comparison cohorts (TaxBit/Ledgible/Lukka and Bitwave/Cryptio/TRES), verify each role, and distinguish tax from bookkeeping and reporting.

Link each hub from its relevant existing comparison articles and ecosystem/navigation, retain the current directory design and email/consideration paths, and measure category visits and genuine enquiries separately. Preserve existing comparison URLs and the compliance directory. Do not claim that citation counts establish sales demand or guaranteed conversions.

Build these buyer paths before increasing cold outreach in these categories. Both can use the existing listing application without new fields or a database migration. Neither hub is published by this dependency-only change.
