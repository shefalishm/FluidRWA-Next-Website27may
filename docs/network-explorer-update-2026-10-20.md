# Network Explorer evidence update - 20 October 2026

Reviewed by FluidRWA Research Team. Free public sources only.

## Claim-to-source record

| Record | Observation | Reporting date | Primary source | Scope / decision |
| --- | --- | --- | --- | --- |
| USTB | Fund AUM USD 788,515,306 | 2026-10-18 | https://superstate.com/assets/ustb | Issuer-reported fund total, including book-entry shares; not on-chain circulation. Holdings table has a different date. |
| USCC | Fund AUM USD 196,476,220 | 2026-10-18 | https://superstate.com/assets/uscc | Crypto carry strategy, not Treasury-only. Includes book-entry shares. Network allocation rows do not reconcile with headline AUM; excluded rather than normalized. |
| VBDC | Fund AUM USD 9,649,779 | 2026-10-18 | https://superstate.com/assets/vbdc | Replaces USD 9,799,200 reported for 15 October. Listed BDC-equity exposure, not direct loan origination. No growth percentage calculated. |
| CUSHY | Fund AUM remains USD 27,408,160 | 2026-08-31 | https://superstate.com/assets/cushy | Source still carries August date. Existing observation and review date retained, marked historical by the 35-day freshness rule. |
| USDC | Circulation remains USD 72.5 billion | 2026-10-15 | https://www.circle.com/usdc | Unchanged. No refreshed reporting or review date applied to existing observation. |

## New documented relationships

USTB's service-provider table names The Bank of New York Mellon (custodian), PricewaterhouseCoopers LLP (auditor), NAV Fund Services (NAV calculation agent), Invesco Advisers, Inc. (investment manager), and Superstate Services LLC (transfer agent).

USCC's service-provider table additionally names Ernst & Young LLP (auditor) and Superstate Advisers LLC (sub-advisor).

These seven rows record public company disclosures checked on 20 October. The pages do not separately date the role appointments, so `sourceDate` remains null. A named auditor is not evidence of a completed audit, audited valuation or a particular opinion. Exact mandates require offering documents.

## Product changes

- Show dated fund disclosures on the overview, with source links, reporting dates, review dates and scope notes; allow CSV download.
- Show asset notes on mobile registry cards, matching desktop evidence limitations.
- Regenerate registry JSON and relationship CSV/JSON from the same source records.
- Preserve the three-asset bubble sample, issuer-list cohorts, older review dates, ramp evidence and regulatory records. Registry remains 1,731 identified assets, now with 35 sourced roles across 11 assets and seven dated value records. Identification is not market measurement.

## Recheck procedure

Re-read exact headline values, dates and named provider roles on the linked official pages before release. Validate source records, generated exports, API coverage, downloads and desktop/mobile layouts. Availability checks alone do not verify claims.
