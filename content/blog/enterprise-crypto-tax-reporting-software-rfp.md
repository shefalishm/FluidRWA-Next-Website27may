---
title: "Enterprise Crypto Tax Reporting Software RFP: Cost Basis and Audit Exports"
description: "Use a worked dataset and a pass/fail scorecard to evaluate digital asset tax software for transfers, missing cost basis, corrections and audit exports."
date: "2026-11-16"
reviewedDate: "2026-11-16"
reviewedLabel: "November 16, 2026"
reviewedBy: "FluidRWA Research Team"
category: "Tax & Accounting"
slug: "enterprise-crypto-tax-reporting-software-rfp"
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

## Keep tax rules separate from software output

The [IRS digital asset FAQ](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-digital-asset-transactions) discusses transfers between accounts you own and the separate treatment of assets used to pay for those transfers in FAQ 81. The [2026 Form 1099-DA instructions](https://www.irs.gov/instructions/i1099da) describe broker reporting and distinguish circumstances where basis reporting applies. Use the form as an evidence source, not a universal substitute for original records. Have your tax adviser confirm classification and reporting obligations for your entity and period.

For the operating workflow before procurement, read [digital asset cost-basis operations](/use-cases/digital-asset-tax-reporting-cost-basis-operations). For a provider shortlist, see [TaxBit vs Ledgible vs Lukka](/blog/taxbit-vs-ledgible-vs-lukka-enterprise-crypto-accounting-tax).
