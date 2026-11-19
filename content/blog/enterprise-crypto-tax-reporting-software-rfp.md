---
title: "Enterprise Crypto Tax Reporting Software RFP: Cost Basis and Audit Exports"
description: "Use a worked dataset and a pass/fail scorecard to evaluate digital asset tax software for transfers, missing cost basis, corrections and audit exports."
date: "2026-11-16"
modifiedDate: "2026-11-19"
reviewedDate: "2026-11-16"
reviewedLabel: "November 16, 2026"
reviewedBy: "FluidRWA Research Team"
category: "Tax & Accounting"
slug: "enterprise-crypto-tax-reporting-software-rfp"
editorialUpdatedLabel: "November 19, 2026"
image: "/assets/blog-thumbnails/enterprise-crypto-tax-reporting-software-rfp.webp"
imageAlt: "FluidRWA illustration of transaction records, a reconciliation exception and an audit export"
readerFirst: "true"
answer: "Give every bidder the same synthetic transaction file. A credible system should link transfers between accounts, preserve acquisition history, expose missing basis, keep fees separately traceable and produce an export a reviewer can reproduce. A neat dashboard or a broker tax form alone does not establish that the underlying records are complete."
ctaTitle: "Comparing crypto tax and accounting vendors?"
ctaText: "Tell us which assets, systems and reporting deadlines your team needs to support, or email contact@fluidrwa.com."
ctaLabel: "Submit requirements"
ctaUrl: "/submit-requirement"
ctaSecondaryLabel: "Email FluidRWA"
ctaSecondaryUrl: "mailto:contact@fluidrwa.com"
faq1q: "What should every bidder receive?"
faq1a: "The same synthetic records, wallet ownership assumptions, review dates and required exports. Give all bidders the same time to resolve exceptions and record which steps needed manual work."
faq2q: "Does a transfer between my own wallets create a sale?"
faq2a: "The IRS generally treats a transfer between wallets or accounts you own as non-taxable, except to the extent of digital assets used or withheld to pay for the transfer. Confirm how your facts and fees should be treated with your tax adviser."
faq3q: "Is Form 1099-DA enough to establish cost basis?"
faq3a: "Do not assume a broker statement supplies every acquisition record. Compare broker information with exchange, wallet and prior-period evidence and have a reviewer resolve missing or inconsistent basis."
---

Ask each bidder to reconstruct one digital asset movement from source file to audit export. Include a withdrawal and matching deposit, a fee in a different asset, a disposal whose acquisition history is missing, and a late correction. These cases reveal more than a demo populated with clean records.

This RFP is for teams evaluating transaction evidence and tax software. Its U.S. references are specific to the cited IRS material. The synthetic fixture is not a tax return, accounting policy, or template for computing liability.

## Give every vendor the same data

[Download the eight-row synthetic fixture (CSV)](/assets/datasets/enterprise-crypto-tax-rfp-test-fixture.csv). The tokens, identifiers and transactions are fictional. The test covers two accounts known to belong to the same entity and a third account that has no verified ownership record. All timestamps are UTC. An asset quantity is separate from the USD field. The blank values are deliberate.

| Test group | Input to review | Evidence you should get back |
| --- | --- | --- |
| Acquisition | E01: Buy 10 units of asset A for USD 1,000 | Original timestamp, quantity, source and link to the acquisition record |
| Own-wallet transfer | E03 and E04: Move four A between accounts you control; E02 and E05 record the separate B fee history | One linked movement, no duplicate acquisition, and a separately visible fee record for review |
| Known disposal | E06: Sell one A from the receiving account for USD 140 | The original lot reference and the configured allocation rule; no assumption that all companies should use the same lot method |
| Missing acquisition | E07: Receive two A from an unverified account | Open exception with a clear owner; do not silently infer ownership or use zero basis as a known value |
| Late correction | E08: Source revises the disposal proceeds from USD 140 to USD 138 | Both versions, the correction reason and a demonstrable change in the revised export without a second sale |

An unmatched deposit is a research task. It could be an incomplete transfer record or a different event entirely. Ask the vendor to stop short of classification where the source file cannot support it.

## Worked answer key

Run the demo twice: first without E08, then with it. For this exercise only, assign the whole USD 1,000 in E01 to the 10 units acquired, carry that lot history across the internal transfer, and make no fee or other adjustments to asset A. The USD difference below is a check on the fixture arithmetic, not a tax result. Do not calculate a fee result for asset B from this file: E05 records the quantity paid but deliberately leaves its dollar value blank.

| Records | Expected output | What the reviewer should check |
| --- | --- | --- |
| E01, E03 and E04 | One four-unit internal movement, linked to the original A lot. Under the fixture assumptions, six A remain at Exchange-A and four are recorded at Wallet-A before any sale. | E04 is not a second purchase. The acquisition reference and date carry through the transfer. |
| E02 and E05 | A separate 0.02 B fee movement, with a link to the transfer and B's acquisition history. | The fee does not reduce the four A received or disappear into the A lot. Any dollar valuation the vendor supplies has its own source. |
| E06 | One A sold. The fixture assigns USD 100 of basis to that unit. Before the correction, USD 140 proceeds minus USD 100 gives a USD 40 unadjusted difference. | The result traces through E04 to E01. Three units from the known lot remain in Wallet-A. |
| E07 | Two A received and an open classification and basis exception. The receipt is visible without being treated as a second purchase or a confirmed internal transfer. | Quantity and basis status are separate: Wallet-A shows five A after receipt, but the two exception units do not inherit the known lot's basis. |
| E08 | Revised proceeds of USD 138 against the same disposal, leaving an unadjusted difference of USD 38. A reviewer can still recover the USD 140 version. | There is still one disposal, the change from the first run is minus USD 2, and the correction does not change holdings. |

Have someone who did not attend the demo reproduce the USD 2 change from the exports and find the unresolved E07 item. That is a better acceptance test than asking the salesperson to explain the dashboard again.

## Pass/fail scorecard for the live demo

| Gate | Pass when | Fail when |
| --- | --- | --- |
| Source lineage | A reviewer can click or join back to the input IDs and see the transformation applied | The system only returns a tax total |
| Transfer matching | Withdrawal and deposit are linked once, and the fee is visible separately | The receiving wallet records a second purchase or the fee disappears into the amount |
| Lot continuity | The known disposal traces back to the acquisition under a named policy | The software treats the receiving account's deposit timestamp as the purchase date |
| Missing evidence | The unknown source stays open and does not pass review as complete | A blank is silently filled or excluded with no trace |
| Corrections | A second run shows which result changed, retains the original, and can be reconciled to the prior export | A rerun overwrites history or duplicates the disposal |
| Reviewer access | A second person can reproduce the result from the export without needing administrator access | Critical evidence is only available in one user's dashboard |

## Make the reconciliation practical

Ask for two files, not just a PDF. One should be a transaction-level table with original source IDs, accounts, units, time, valuation provenance where relevant and the rules applied. The other should show open exceptions, assigned owners and changes since the previous close. Have a second reviewer reproduce the known disposal from the first export and identify the unresolved deposit from the second.

If a bidder cannot export an input-to-output link, ask whether the limitation is contractual, technical or specific to the connector. Record what would require an analyst to repair by hand. For production, request a sample from each connector class your team actually uses; a single chain or exchange demo is not evidence of every integration.

When comparing vendor pricing, include the work that remains outside the platform: source collection, unresolved wallet ownership, independent valuation, accounting export and review. Ask who carries the cost if a source changes its format or an old connector stops returning history.

## Questions to paste into the RFP

Ask bidders to mark each response as available in the proposed product, dependent on configuration, manual, or unavailable. A roadmap commitment should not count as a demonstrated capability.

| RFP question | Evidence to request |
| --- | --- |
| How far back can you import each of our sources, and how do you flag a gap rather than treating it as zero activity? | A dated coverage matrix by connector and a backfill that flags a missing date range. |
| What happens when the same records arrive by both API and CSV, or a connector changes its format? | An overlapping import and a rejected-row report showing why a record was kept, merged, or sent for review. |
| Who can change basis, valuation or classification? Can a second person approve the change? | A role matrix and a system-generated history with the old value, new value, reason and approver. |
| Can we reproduce a prior close after a source correction or a rule change? | Two exports with stable identifiers and a reconciliation explaining what changed. |
| What can we export if we leave, and what would need to be rebuilt? | Files and a field dictionary covering lots, source links, adjustments and exceptions, plus the written export terms. Have your team open the files without a vendor login. |

## How to choose between two vendors that pass the demo

Set the must-pass controls before opening proposals: traceable source records, visible unknowns, a reproducible correction and an export your own team can use. If a vendor fails one, mark it unresolved until it demonstrates a fix. A lower quote or more connectors should not offset missing audit evidence.

For vendors that pass, record which steps took manual work, who would do that work at close, and what happens when volume spikes. For example, suppose both vendors return USD 38 for E06 after the correction. Vendor A produces a versioned export without intervention. Vendor B gets there only after an analyst repairs a link, but records that repair and its approval. Both may pass the control; Vendor B leaves an operating cost and a deadline risk to price. If Vendor B cannot reproduce the first export at all, it fails the prior-close control rather than losing a few preference points.

| Record on the decision sheet | What to enter |
| --- | --- |
| Must-pass controls | Pass, fail, or unresolved, with a link to the observed evidence |
| Manual workload | Steps outside the product, time observed during the demo, and who would own them |
| Commercial assumptions | Included connectors and history, export terms, implementation effort and costs still unquoted |
| Decision and follow-up | Shortlist, hold, or reject; condition, owner and date for each unresolved item |

## Enterprise evaluation criteria: three gates before the score

A weighted score can hide a basic failure. A platform may look excellent on interface, coverage and price while being unable to recover the acquisition history behind one material disposal. Before assigning points, define three non-negotiable gates for your own dataset.

| Gate | Evidence the vendor must produce | What prevents acceptance |
| --- | --- | --- |
| Data completeness | Source inventory, opening positions, import periods and a reconciliation of gaps | A matching ending balance presented as proof that all acquisition history exists |
| Reproducible calculation | Raw event, lot, valuation input, approved method and correction trail for a sample disposal | A final gain number with no explainable route back to the source |
| Deliverable ownership | Named owner for each form, filing, delivery, ledger export and correction | An ambiguous promise that the platform "handles reporting" |

Only compare scored features after those gates are satisfied or the exception is explicitly accepted by the responsible finance and tax owners. The gates are procurement recommendations, not claims that a particular product has passed them.

### Compare a realistic first year, not the demo subscription

Ask every provider to price the same historical backfill, active sources, entities, users, transaction bands and finished outputs. Include onboarding, mapping, reviewer support, filing or delivery services, API charges and an export at termination. Put the assumptions beside the quoted price.

Then model one difficult month: a source disconnects, the transaction count increases and a closed-period classification is corrected. Ask what is charged, what work your team must perform and how long access to the prior output remains available. Do not multiply a personal tax plan's price by headcount to estimate enterprise cost.

For security, request the report covering the exact service and period, access roles, connector permissions, subprocessors and retention settings. Ask whether the vendor needs trading or withdrawal privileges; where the task is data ingestion, justify any permission beyond the agreed data access.

### The final deliverable is a decision record

Keep the brief, data dictionary, expected results, observed exceptions, proposal assumptions and approval together. Another reviewer should understand why the chosen product fits the entity and reporting period without attending the sales call.

For a current provider and product-scope discussion, read [TaxBit vs Ledgible vs Lukka](/blog/taxbit-vs-ledgible-vs-lukka-enterprise-crypto-accounting-tax). For the evidence retained after implementation, use the [digital asset tax audit checklist](/blog/digital-asset-tax-audit-evidence-checklist). Share the scoped requirement through the [project form](/submit-requirement?source=blog-shortlist&topic=enterprise-crypto-tax&article=enterprise-crypto-tax-reporting-software-rfp).

**Editorial addition: November 19, 2026.** This section adds an evaluation rubric and does not claim a new vendor benchmark or silently refresh prior source observations.

## Keep tax rules separate from software output

The [IRS digital asset FAQ](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-digital-asset-transactions) discusses transfers between accounts you own and the separate treatment of assets used to pay for those transfers in FAQ 81. The [2026 Form 1099-DA instructions](https://www.irs.gov/instructions/i1099da) describe broker reporting and distinguish circumstances where basis reporting applies. Use the form as an evidence source, not a universal substitute for original records. Have your tax adviser confirm classification and reporting obligations for your entity and period.

For the operating workflow before procurement, read [digital asset cost-basis operations](/use-cases/digital-asset-tax-reporting-cost-basis-operations). For a provider shortlist, see [TaxBit vs Ledgible vs Lukka](/blog/taxbit-vs-ledgible-vs-lukka-enterprise-crypto-accounting-tax).
