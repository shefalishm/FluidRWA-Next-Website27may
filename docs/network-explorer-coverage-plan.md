# Network Explorer coverage plan

## 15 October 2026 release

- 17 researched issuer/platform product profiles, including three dated USD value observations.
- 450 distinct Ondo Ethereum tokenized securities from the issuer's complete qualifying token-list cohort dated 17 September 2026, pinned to a Git revision.
- 1,052 distinct Backed xStocks Ethereum tokenized securities from the issuer's qualifying token-list cohort dated 24 September 2026, pinned to a Git revision.
- 194 Robinhood Stock Tokens with a Robinhood Chain deployment, observed in the issuer's public assets API on 15 October 2026. The API status is not an independent trading or reserve check.
- 14 additional WisdomTree Digital Funds from the issuer's published roster. WisdomTree says blockchain is a secondary ownership record for these funds; these rows do not meet a primary-onchain-only inclusion rule and have no verified contract here.
- 10 named asset-to-service-provider roles from product, launch, or regulatory documents. Each role retains the document date, review date and scope.
- 1,727 asset identities in all, 1,110 more than the previous edition. Cross-chain deployments of one product are deduplicated, but distinct products from different issuers may track the same underlying.
- No market-wide asset value is calculated. Unverified values remain null, not zero. Issuer-listed contracts are not independently audited for current trading or investor eligibility.

## Data contract

An asset identity needs a product name, issuer, class, structure, HTTPS primary source and review date. An onchain deployment additionally needs chain ID and issuer-listed contract address. A financial observation additionally needs a defined metric, unit, reporting date, source and freshness rule. A provider relationship needs an asset ID, named provider, exact role, source, review date and limits of the evidence.

The build rejects duplicate asset IDs, duplicate issuer-list contracts, unsupported issuer-list values, malformed evidence dates, unresolved relationship IDs and missing source links. A reachable URL alone is not proof that a claim remains true.

## Intake to publication

1. Discover candidates from issuer product pages and official token lists. Keep the raw source revision and observation date. Do not copy an aggregator's market value into the registry as an issuer fact.
2. Normalize one product to one asset ID. Chain deployments are child records, not extra asset counts. Compare symbol, issuer and legal vehicle before merging similarly named products.
3. Put submitted claims into a private review queue. Require the supporting document for each value or service role. Record what remains unknown.
4. Review material claims against the source, run schema and link checks, then approve a dated snapshot. No scheduled job should publish price, supply, licence or relationship changes automatically.
5. Publish source-linked JSON/CSV, the methodology, and a visible update date. Preserve prior editions so readers can distinguish changes from corrections.

## Next-week expansion

- Extend the researched non-stock cohort product by product, starting with Treasury funds, private credit, commodities and non-USD stablecoins. Prioritize issuers with fund factsheets, formal offering documents or official product/contract registries.
- Add more issuer token-list cohorts only after checking their source terms and deduplicating cross-chain deployments. Count issuer-list identities separately from reviewed fund profiles.
- Ask issuers for legal vehicle, primary product link, contract list, fund metric with as-of date, and named service-provider documents. Submission is free; review and any FluidRWA vetting are separate decisions.
- Trial one automated feed in a staging table before adding live charts. Log fetch time, source revision, parsing errors and anomalous changes. Require human approval for any public financial or regulatory figure.
- Add a public correction history and stable per-asset pages only after the underlying source record and update cadence are reliable.

## Public-source intake roadmap

- Use issuer-run product registries and APIs first: current Ondo, Backed, Robinhood and WisdomTree cohorts; next candidates include documented fund rosters from Superstate, Securitize, Franklin Templeton and other issuers. Each new source needs a pinned or saved snapshot and a source-specific parser.
- Use chain explorers or direct RPC reads to verify deployment, supply and transfers only after contract identity and chain are confirmed. A contract address in an issuer list is not itself an activity metric.
- Use issuer factsheets, SEC EDGAR filings and formal fund documents for NAV or fund size. Retain the metric, date and legal vehicle; do not infer current value from an old announcement.
- Use ESMA, MAS, HKMA and other regulator registers for legal-entity context, not as proof that a particular token or vendor service is authorized everywhere.
- Use public aggregators such as DefiLlama or RWA.xyz to discover candidate products and reconcile differences, not to copy their proprietary coverage, classifications or values into FluidRWA as original measurements. Respect API and reuse terms.
- Invite issuers to submit dated product and service-provider evidence; review it before publishing. A large securities catalogue must not be mistaken for broad coverage of credit, real estate, commodities and funds.

The goal is broad *and interpretable* coverage. A large token-list cohort is useful for discovery, but it does not substitute for current valuation, chain activity, issuer diligence or the asset-to-provider map.
