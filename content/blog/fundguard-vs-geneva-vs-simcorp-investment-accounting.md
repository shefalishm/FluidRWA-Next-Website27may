---
title: "FundGuard vs SS&C Geneva vs SimCorp One: Investment Accounting"
seoTitle: "FundGuard vs Geneva vs SimCorp: Investment Accounting"
description: "Compare investment accounting software by books of record, reconciliation, NAV controls and migration evidence, including tokenized-fund requirements."
date: "2026-10-22"
reviewedDate: "2026-10-22"
reviewedLabel: "October 22, 2026"
reviewedBy: "FluidRWA Research Team"
category: "Fund Operations"
slug: "fundguard-vs-geneva-vs-simcorp-investment-accounting"
image: "/assets/blog-images/taxbit-vs-ledgible-vs-lukka-enterprise-crypto-accounting-tax.svg"
imageLocked: "true"
imageAlt: "Illustrative accounting and reporting infrastructure"
answer: "FundGuard documents a multi-book accounting engine; SS&C Geneva documents portfolio and investor accounting, reconciliation and shadow accounting; SimCorp One combines investment accounting, fund accounting and reporting. Compare them with the same fund-close test. Public product pages do not establish native support for your token contracts, custodian feeds or share-register arrangement."
infographicImage: "/assets/infographics/fundguard-vs-geneva-vs-simcorp-investment-accounting-comparison.png"
infographicMobileImage: "/assets/infographics/fundguard-vs-geneva-vs-simcorp-investment-accounting-comparison-mobile.png"
infographicAlt: "Investment Accounting Systems: FundGuard, SS&C Geneva, SimCorp One compared by documented scope, buyer pilot, confirm first."
infographicCaption: "Sources checked 22 October 2026. Documented descriptions and proposed buyer checks; not a ranking, benchmark or assurance."
infographicKeywords: "investment accounting systems"
considerationAfterTable: "true"
ctaTitle: "Build a focused vendor brief"
ctaText: "Share the workflow, systems and responsibilities you need to cover. Prefer email? contact@fluidrwa.com."
ctaLabel: "Submit requirements"
ctaUrl: "/submit-requirement?source=article&article=fundguard-vs-geneva-vs-simcorp-investment-accounting"
ctaSecondaryLabel: "Email FluidRWA"
ctaSecondaryUrl: "mailto:contact@fluidrwa.com"
faq1q: "Which is the best accounting system for a tokenized fund?"
faq1a: "There is no universal winner in this documentation review. Require a proof of concept using the fund's instruments, share classes, custody records and approved accounting policies. Token support must be demonstrated, not inferred from multi-asset marketing."
faq2q: "Does an accounting platform replace the transfer agent?"
faq2a: "Not automatically. Fund accounting, investor allocations and the legally authoritative ownership register are different responsibilities. Specify which organization and system owns each record."
faq3q: "Are prices or implementation times comparable publicly?"
faq3a: "The reviewed sources do not establish comparable customer-specific prices or implementation times. Request itemized proposals for the same scope, history, interfaces and support arrangement."
---

## Start with the close, not the dashboard

A tokenized fund can have a perfectly readable token balance and still have an unresolved accounting break. A subscription might be paid but not allocated, an expense might arrive after the valuation point, or a corrected trade might change yesterday's figures. The accounting system must explain those differences, not merely display another balance.

This article compares **investment accounting software**. It is not another crypto tax-tool ranking or a comparison of outsourced fund administrators. The buyer task is to produce, reconcile and reproduce the fund's books.

An accounting book of record (ABOR) supports the accounting view; an investment book of record (IBOR) supports investment-position views. Ask which books the proposed system will maintain and how differences between them are explained.

## Comparison: what each company documents

| Question | FundGuard | SS&C Geneva | SimCorp One |
|---|---|---|---|
| Public product scope | Investment accounting, fund accounting/ABOR and private-markets accounting | Portfolio and investor accounting, reporting and shadow accounting | Investment accounting, fund accounting and regulatory reporting |
| Control descriptions | Multiple books, historical views and continuous reconciliation | Reconciliation, exception workflows and data management | NAV/close monitoring, exception alerts and audit trails |
| Demonstration to request | A late correction across two accounting books | A position break traced to investor reporting | A failed close check resolved and reproduced |
| Do not assume | Native support for every token or feed | Every service or module is included | Managed services are included with technology |
| Pricing and exact deployment | Not verified for a common buyer configuration | Not verified for a common buyer configuration | Not verified for a common buyer configuration |

The pilot requests are FluidRWA's evaluation criteria, not features we have benchmarked. The three companies were selected because their official pages describe investment-accounting workflows; this is not a market ranking.

## FundGuard: examine the relationship between books

[FundGuard's product documentation](https://www.fundguard.com/product/) describes an accounting engine covering investment accounting, fund accounting and private markets. It also describes multiple books, bitemporal views and continuous reconciliation. Those descriptions are company evidence, not proof of a particular implementation's results.

For the demonstration, provide a transaction booked on Monday and corrected on Wednesday with a Monday effective date. Ask the team to show both what the business believes happened on Monday and what it knew before Wednesday's correction. Then ask which downstream reports must be reissued.

The useful result is not simply a revised balance. It is an understandable link between the original input, correction, approval and affected reports.

## SS&C Geneva: specify the product and service package

[SS&C Advent's Geneva page](https://www.advent.com/geneva/) describes portfolio and investor accounting, multi-currency reporting, shadow accounting and reconciliation. Its [Geneva Elements brief](https://www.advent.com/resources/all-resources/brief-geneva-elements/) describes a combination of software, cloud delivery and co-sourcing components.

Ask which components are in the proposal and who operates them. A package with a service team has a different responsibility split from software run entirely by your staff. Have the provider reproduce an investor statement from the portfolio, allocation and fee records used in the accounting run.

For a tokenized structure, add a custody export and the transfer agent's register. Ask the provider to identify missing interfaces explicitly. A portfolio-accounting product description is not evidence that a particular blockchain connector is included.

## SimCorp One: test the integrated operating model

[SimCorp's accounting page](https://www.simcorp.com/solutions/simcorp-one/accounting) describes integrated investment accounting, fund accounting and reporting. It distinguishes technology operated by the customer from Investment Accounting Services delivered as a managed solution.

Ask the provider to show the same close under the proposed operating model: who imports the data, clears exceptions, approves adjustments and releases outputs? Establish where responsibility remains with the fund manager or administrator.

Do not treat broad coverage statements as approval of your precise accounting policy or legal structure. Request a signed scope covering the relevant entities, instruments, books and reporting outputs.

## Run the same fund-close exercise for all three

Use synthetic or appropriately protected records. Include a subscription awaiting allocation, a redemption crossing the cutoff, an expense correction, an FX observation and an unmatched custody position. Give every provider the same opening balances and expected control totals.

Require these outputs:

- A reproducible trial balance and share-class calculation.
- An exception register distinguishing missing inputs from genuine financial differences.
- A record of adjustments, approvals and the reporting version released.
- An export usable without the provider's dashboard.
- A recovery demonstration after an input file or integration fails.

For tokenized funds, reconcile **token units, book-entry shares and investor entitlements separately**. Do not multiply contract supply by a price and label it total fund NAV without establishing which shares and liabilities the calculation covers.

## What should the proposal include?

Specify software, managed services, migration, interfaces, environments, data history, support, retention and exit exports separately. Ask who will own instrument mapping and who fixes a broken custodian feed after go-live. Set acceptance criteria before agreeing an implementation timetable.

Existing fund operations also matter. Our [fund-administrator comparison](/blog/apex-group-vs-iq-eq-vs-jtc-digital-asset-fund-administration) concerns service providers; our [crypto-accounting comparison](/blog/bitwave-vs-cryptio-vs-tres-crypto-accounting) concerns another accounting workflow. Neither should be treated as interchangeable with the systems reviewed here.

For the inputs to the valuation process, use the [fund NAV pricing-data checklist](/blog/how-to-select-pricing-data-tokenized-fund-nav).

## Sources and review scope

Official product pages and the Geneva Elements brief were checked **22 October 2026**. This is a public-documentation review, not a hands-on performance test. No implementation price, customer outcome or token-specific integration has been assumed. Send a fund-operations brief or a documented correction to [contact@fluidrwa.com](mailto:contact@fluidrwa.com).
