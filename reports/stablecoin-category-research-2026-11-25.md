# Stablecoin category research and implementation

## Observation and limits

Query: `best stablecoin infrastructure providers`. Actual Google results were read in a dedicated Chrome tab on November 25, 2026. The signed-in interface was English/Switzerland and reported a Zurich location. Rankings and AI sources are a snapshot, not a universal or historical ranking. The in-app Google attempt encountered an unusual-traffic check; the subsequent Chrome session worked without bypassing it.

Google exposed nine organic results, including FluidRWA in fifth position. Ads were excluded. All eight external organic pages were opened and their main content read, using additional text chunks for long pages. Two additional AI-cited pages were also opened and read. Collapsed FAQ answers were not exhaustively expanded. A tenth organic result was not observed and is not invented here.

The AI Overview visibly cited the Fireblocks report, Due, Rhino.fi and BlindPay. Expanding related results exposed FluidRWA and Align source anchors as well. FluidRWA was therefore not absent from every AI source in this observation. This does not demonstrate historical citation recovery or prove that any particular page displaced FluidRWA.

## Actual first-page external pages read

1. https://www.finextra.com/blogposting/31466/top-stablecoin-payment-infrastructure-providers
   - Title: Top Stablecoin Payment Infrastructure Providers: By Gwen Adele. H1: Top Stablecoin Payment Infrastructure Providers. Description begins with the global payments landscape undergoing a structural shift; the displayed description was truncated.
   - Community contributor post dated April 20, 2026, not an independently edited Finextra endorsement. Mixes developers and operating/API providers. Covers stack layers, benefits, selection criteria and enterprise payments. Its Top 10 framing does not cleanly correspond to the first named list.
   - Response: explicit development-versus-operation boundaries, route ownership and production evidence. No vendor superlatives or universal speed/security claims inherited.
2. https://stablecoininsider.org/stablecoin-corporate-card-providers/
   - Title/H1: 8 Stablecoin Infrastructure Providers Powering Stablecoin-Backed Corporate Cards in 2026.
   - Description: The 8 providers behind stablecoin-backed corporate cards in 2026, mapped by layer: stablecoin rails, issuers, processors and program managers, with network partnerships and country coverage.
   - Eight providers, card-stack layers, geographic scope and a worked payment flow. Useful distinction between issuing and acceptance coverage, but numeric reach and programme availability require primary verification.
   - Response: authorisation, clearing, scheme settlement, liquidity, reversals, chargebacks and cardholder eligibility, not just funding.
3. https://www.upshift.finance/blog/stablecoin-infrastructure-companies
   - Title/H1: Stablecoin infrastructure companies: 13 compared for 2026. Description: 13 stablecoin infrastructure companies by layer: who issues, moves, holds and earns on stablecoins, with charters and 2026 deals.
   - Published October 3 and updated November 3, 2026. Thirteen main companies plus yield-related coverage; issue/move/hold/earn structure, orchestration, issuance deals and treasury strategies. Historical supply and charter observations are dated, not today's totals.
   - Response: separate payment cash, customer funds and investment strategies; do not adopt promotional returns or infer production status from deals.
4. https://www.cobo.com/post/2026-guide-to-the-most-reliable-stablecoin-payments-providers
   - Title: Best Stablecoin Payment Providers 2026: Compare Top Solutions for Enterprise. H1: 2026 Guide to the Most Reliable Stablecoin Payments Providers.
   - Description compares enterprise solutions including Cobo, Circle, Fireblocks, Stripe and Coinbase on security, speed, multi-chain support and APIs.
   - Dated January 9, 2026. Eleven providers, wallet architecture, APIs, treasury integration, security claims and FAQs.
   - Response: distinguish chain confirmation from bank credit; request scoped security evidence and exception/reconciliation records rather than inheriting incident-free or universal-speed claims.
5. https://blindpay.com/resources/more/best-stablecoin-card-payment-infrastructure-providers
   - Title: Best stablecoin card and payment providers in 2026 | BlindPay. H1: Best stablecoin card and payment infrastructure providers in 2026: how to choose, layer by layer.
   - Description: The best stablecoin card stack in 2026, by job: BlindPay for on-ramps, collections, and local payouts, plus what card issuers' own pages say.
   - Updated November 8, 2026. Separates card and money-movement loops, explains prefunding, quote locks, custody options, local rails and pilot criteria. Supplier-authored selection, not independent ranking evidence.
   - Response: original operating brief, event/ledger states, bank-return evidence, customer eligibility and export/exit tests. Did not copy its pilot text or numerical commercial terms.
6. https://alignlabs.dev/guides/stablecoin-payment-providers-compared
   - Title: Stablecoin Payment Infrastructure Compared | Align. H1: Stablecoin payment infrastructure: leading providers compared.
   - Description: BVNK, Bridge, Conduit, Zerohash, Circle, Mural and Align compared on who they serve, rails, licensing and what they require. With a decision table.
   - Updated November 6, 2026. Eight rows and three service models, virtual accounts, underlying partners and route questions.
   - Response: exact account/funds rights, customer-funds versus own-funds model, route direction and named downstream responsibilities. Legal conclusions and self-positioning not inherited.
7. https://4irelabs.com/articles/top-stablecoin-development-companies/
   - Title/H1: Top 7 Stablecoin Development Companies in 2026. Description compares seven companies on compliance depth, chains and white-label issuance.
   - Stage fit, custom versus white-label development, contract security, asset types and issuer dependencies. Developer/operator roles are mixed.
   - Response: developer statement of work, version-matched audits, administrator handover, reserve/issuer responsibilities and a separate regulatory operating model.
8. https://www.fireblocks.com/report/compare-enterprise-stablecoin-payments
   - Title: Compare Fireblocks, BVNK, Ripple, & Coinbase on Stablecoin Payments. H1: Fireblocks vs. BVNK, Ripple, and Coinbase: Enterprise Stablecoin Payments Comparison.
   - Description compares security, coverage and payouts. Explicit December 2025 report date, not a current independent product benchmark.
   - Response: use current own-product evidence, including Flow, without repeating older negative competitor assertions or mixed-period volume/country counts.

## Additional AI-cited pages read

- https://rhino.fi/blog/stablecoin-infrastructure-companies-compared
  Title: Stablecoin infrastructure companies compared (2026) | Rhino.fi. Description names Rhino.fi, Relay, Bridge, LI.FI, Fireblocks, Privy and BVNK across five types of infrastructure. Dated October 29, 2026. Covers custody, wallets, cross-chain transfer, deposits, inventory and integrations; some fiat and compliance items are roadmaps or work in progress. Response: native/wrapped/liquidity distinctions, source/message/destination evidence and partial-completion recovery. Did not turn planned features into live capabilities.
- https://www.opendue.com/blog/stablecoin-issuers-compared
  Title: Stablecoin Issuers Compared: 8 Leading Issuers in 2026. Description compares reserves, regulation, redemption, networks and payment suitability. Dated September 1, 2026. Eight issuers; asset, entity, liquidity and reserve disclosures. Financial observations refer to specific earlier periods. Response: explicit report type, observation/publication dates, perimeter, issuer rights versus intermediary access, and no current invented totals. Did not adopt its generalized legal comparisons.

## Primary evidence and dated corrections

Each directory record's exact primary or owned source is retained in `scripts/lib/stablecoin-category.mjs`, alongside the scoped public description and buyer questions. An accessible source establishes availability, not independent verification of every marketing assertion. Product descriptions are not guarantees of production access, financial solvency, licensing or route eligibility.

- FDUSD issuer transition: https://www.firstdigitallabs.com/news-and-insights/fdusd-transitions-to-bvi-based-issuance-structure ; publication August 15, 2025. FD121 (BVI) Limited is named as the new issuer; reserve custody is a separate role. Removed the old Hong Kong-regulated stablecoin assertion.
- USDM wind-down: https://docs.mountainprotocol.com/wind-down-documentation/usdm-wind-down-overview and https://docs.mountainprotocol.com/wind-down-legal/terms-and-conditions . Minting disabled; later wind-down arrangements differ from historic issuer redemption/backing. Kept as legacy, not a new issuance or ongoing rewards candidate. Page schedule is historical, not a refreshed financial observation.
- Coinbase Payments: https://docs.cdp.coinbase.com/api-reference/payment-acceptance/overview . Replaced the unsupported cbUSD/Base product conflation while preserving its existing directory anchor.
- Frax: https://docs.frax.com/frxusd . Scoped current frxUSD/access/savings distinctions; did not inherit promotional returns, largest claims or assume old FRAX descriptions cover current products.
- USDY: https://docs.ondo.finance/general-access-products/usdy/comparison-stablecoins . Used the secured-note distinction only; did not inherit the page's broad comparative legal claims about all stablecoins.
- Conduit blockchain infrastructure: https://www.conduit.xyz/ . Existing `conduit` anchor retained for the blockchain business. Separately added Conduit payments from https://conduitpay.com/ ; did not silently change one company into the other.
- Mastercard/BVNK: https://www.mastercard.com/global/en/news-and-trends/press/2026/august/mastercard-completes-acquisition-of-bvnk-to-advance-global-stabl.html ; August 3, 2026 acquisition announcement, not proof of each programme's live eligibility.
- Cobo: https://website.cobo.com/post/stablecoin-payment-solution-launch . Header shows December 11, 2025 while body is dated December 16, 2024. Used only the documented deployment-model description and asked for current production scope; did not claim a new launch or independently validated delivery performance.
- CCTP: https://www.circle.com/cross-chain-transfer-protocol . Current source distinguishes asset-dependent burn/mint and lock/mint modes. Did not characterize every present CCTP transfer as native USDC burn/mint.
- OCC: https://occ.gov/news-issuances/bulletins/2026/bulletin-2026-50.html ; October 21, 2026 bulletin, stated January 18, 2027 effective date. Linked as an official reference, not legal eligibility advice.
- ESMA: https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica ; displayed register update November 18, 2026. Preserved distinction between issuer, CASP and white-paper records. No individual authorization conclusion made from page availability.
- HKMA: https://www.hkma.gov.hk/eng/key-functions/international-financial-centre/stablecoin-issuers/ ; issuer-register and guidance entry point. No trust/custodian status substituted for issuer permission.

## Implementation boundary

Preserved all 30 original record anchors and NOWPayments client content, apart from removing the numeric position in its role label so an alphabetical list does not retain a misleading rank. Five additions: Cobo, Fireblocks, Ripple, zerohash and the separately identified Conduit payments business. Total 35 alphabetically ordered records, with explicit role filters and 12 matching visible/schema FAQs.

Added a buyer-role matrix, funds-flow stages, issuer/redemption analysis, custody and contract-control questions, card lifecycle coverage, jurisdiction checks, exception matrix, integration/reconciliation criteria, pilot measures, requirements questions and an original downloadable operating brief. No public competitor/AI-recovery narration, numerical prices, vendor-domain hyperlinks, new routes, provider ranking guarantees or commercial-status inference.

New entries do not inherit Vetted simply because they appear in the directory. Existing explicit review markings and client materials are not manufactured from payment. No Network Explorer dataset, historical observation, source verification date, form, D1 binding, Cloudflare route or approved glass category preview was changed.

These improvements do not prove a percentage increase in quality, number-one ranking or regained citations. Re-test the same query and route-specific buyer prompts over time, recording sources and dates separately from clicks and leads.
