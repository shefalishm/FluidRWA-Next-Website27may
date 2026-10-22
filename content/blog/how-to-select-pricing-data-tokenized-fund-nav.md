---
title: "How to Select Pricing Data for a Tokenized Fund's NAV"
seoTitle: "Pricing Data for Tokenized Fund NAV: A Buyer's Guide"
description: "Choose fund-pricing data by instrument, valuation time, methodology, revisions and usage rights. Learn why a token quote is not automatically fund NAV."
date: "2026-10-22"
reviewedDate: "2026-10-22"
reviewedLabel: "October 22, 2026"
reviewedBy: "FluidRWA Research Team"
category: "Fund Operations"
slug: "how-to-select-pricing-data-tokenized-fund-nav"
image: "/assets/blog-images/coin-metrics-vs-kaiko-vs-token-terminal-digital-asset-data.svg"
imageLocked: "true"
imageAlt: "Illustrative investment data and market-pricing infrastructure"
answer: "Select pricing data against the fund's approved valuation policy, instruments and valuation point. Distinguish underlying-asset prices, fund NAV per share and secondary token quotes. Require methodology, observation timestamps, correction history, licensing and a stale-data escalation process. Delivering a number onchain does not establish that it is the right valuation for the fund."
infographicImage: "/assets/infographics/how-to-select-pricing-data-tokenized-fund-nav-comparison.png"
infographicMobileImage: "/assets/infographics/how-to-select-pricing-data-tokenized-fund-nav-comparison-mobile.png"
infographicAlt: "Prices, NAV and Token Quotes: Underlying price, Fund NAV per share, Secondary token quote compared by meaning, check, do not assume."
infographicCaption: "FluidRWA planning checklist. Source-specific examples checked 22 October 2026; not executable instructions or a compliance assurance."
infographicKeywords: "prices, nav and token quotes"
considerationAfterTable: "true"
ctaTitle: "Build a focused vendor brief"
ctaText: "Share the workflow, systems and responsibilities you need to cover. Prefer email? contact@fluidrwa.com."
ctaLabel: "Submit requirements"
ctaUrl: "/submit-requirement?source=article&article=how-to-select-pricing-data-tokenized-fund-nav"
ctaSecondaryLabel: "Email FluidRWA"
ctaSecondaryUrl: "mailto:contact@fluidrwa.com"
faq1q: "Is a token's market price the fund's NAV?"
faq1a: "Not necessarily. A secondary-market quote and an administrator-calculated NAV per share are different measurements. The fund's terms determine how subscriptions and redemptions are priced."
faq2q: "Does an onchain oracle validate a fund valuation?"
faq2a: "Not by itself. It delivers data according to a particular feed arrangement. The calculation, inputs, approval, reporting period and meaning of the value still need to be established."
faq3q: "Can the last available value be shown when an update fails?"
faq3a: "It can be retained as a clearly dated historical observation. Whether it can be used for a dealing calculation depends on the fund's approved policy and escalation process; it should not be silently relabelled current."
---

## First decide which number you need

A tokenized Treasury fund may have an administrator-calculated NAV per share, a token balance on several networks and a secondary-market quote. These numbers answer different questions. Selecting a data vendor before defining the question is an easy way to buy the wrong feed.

For a buyer, the decision is not simply which API returns a price fastest. It is whether the data can support the fund's valuation process and be reproduced when a figure is challenged.

## Three measurements that should not be confused

| Measurement | Purpose | Evidence to request |
|---|---|---|
| Underlying-asset price | Input for valuing portfolio holdings | Instrument identity, market/source, methodology and observation time |
| Fund NAV per share | Value calculated for an applicable share class and valuation point | Approved calculation, assets, liabilities, share count and administrator release |
| Secondary token quote | Observed or indicative trading price | Venue, timestamp, size/liquidity context and product terms |
| Onchain feed value | Data delivered to a contract | Feed identity, units, decimals, update time and the meaning of the underlying observation |

Tokenization does not turn these into interchangeable measurements. A feed can be technically correct while supplying a number that is inappropriate for the intended calculation.

## 1. Give the vendor an instrument-level specification

List the holdings that need pricing: Treasury bills, listed securities, derivatives, stablecoins, private loans or fund interests. Include identifiers, currency, valuation point, required history and whether a source must be independently sourced or supplied by an appointed agent.

Do not accept a general asset-coverage statement as a guarantee for every holding. Ask which instruments require evaluated prices, manual input or another supplier. Request explicit gaps before assessing the price proposal.

The fund manager, administrator and relevant advisers should determine the applicable valuation policy. This guide concerns data procurement and controls, not accounting or investment advice.

## 2. Read the calculation methodology, not only the API schema

[Coin Metrics' prices methodology](https://docs.coinmetrics.io/coin-metrics-prices/methodologies/coin-metrics-prices-methodology.md) distinguishes Reference Rates from Principal Market Prices and describes inputs, calculation methods and exclusion rules. That illustrates why two products from the same provider can serve different valuation questions.

Ask each shortlisted provider how it chooses input venues, handles missing or unusual observations and corrects published values. Request an example with the underlying evidence available under your licence. A midpoint, last trade, evaluated price and time-window reference rate are different methods; do not combine them without a documented policy.

For provider-level context, see our [institutional digital-asset data comparison](/blog/coin-metrics-vs-kaiko-vs-token-terminal-digital-asset-data). This guide is about selecting the right valuation input rather than ranking those vendors again.

For the system consuming those inputs, see the [FundGuard, Geneva and SimCorp accounting comparison](/blog/fundguard-vs-geneva-vs-simcorp-investment-accounting).

## 3. Preserve the time the number describes

Keep the observation time, calculation period, publication time, retrieval time and time zone where available. A file retrieved this morning may contain a value calculated for yesterday's close. A refreshed webpage is not necessarily a refreshed valuation.

For onchain delivery, [Chainlink's Data Feeds API reference](https://docs.chain.link/data-feeds/api-reference) documents the answer, decimals and update timestamp returned by its interfaces. Those fields support technical checks; the timestamp of a feed update should not automatically be interpreted as the accounting valuation time of a fund.

Agree feed-specific freshness limits and escalation behavior. A daily fund NAV and an actively traded token price need not have the same update schedule.

## 4. Define what happens when the data is wrong or absent

Run a pilot containing a missing instrument, stale value, unusual movement, changed identifier, currency mismatch and vendor correction. Ask the administrator to reproduce which observations were used in the original calculation and which were used in any restatement.

Avoid a fallback that silently changes the method. Replacing an approved reference rate with a single exchange's last trade may make a calculation complete while changing its meaning. A fallback should have a defined approval route, status and record of the original failure.

Store the vendor's raw response or permitted evidence, the normalization applied and the version used. Keep manual overrides distinguishable from vendor values.

## 5. Check governance and usage rights

The [CSSF's June 2026 notice](https://www.cssf.lu/en/2026/06/iosco-publishes-final-report-on-valuing-collective-investment-schemes-cis/) reports that IOSCO published updated recommendations on valuing collective investment schemes on 1 June 2026. It describes an updated international framework, not automatic approval of any product or a substitute for local requirements.

Ask the fund's advisers how the relevant rules apply. In procurement, separately establish whether the contract allows internal calculations, historical storage, administrator access, redistribution to investors and publication through an API or oracle. Public visibility does not necessarily confer those rights.

Require correction notices, incident escalation and an exit export. Data that cannot be retained or reproduced under the licence may be a poor fit for a process that must explain historical calculations.

## A practical acceptance pack

Before production, request a coverage file, methodology version, sample history, timestamp definitions, correction example, failure demonstration and written usage rights. Have the administrator validate a small representative portfolio against the agreed policy.

For any illustrative NAV calculation, reconcile assets, liabilities and the applicable shares before dividing net assets by shares. Contract supply may exclude book-entry holdings or cover only one deployment. Summing several representations without checking their relationship can double count the same fund interests.

Our [Network Explorer](/network-explorer) keeps source dates and unknown values visible; it is not a dealing-price feed. For help defining a data-provider brief, contact [contact@fluidrwa.com](mailto:contact@fluidrwa.com).

Sources checked **22 October 2026**. Provider documentation describes its own products; the selection tests are FluidRWA recommendations. No fund's NAV, accounting compliance or data entitlement is assured by this guide.
