---
title: "UK CARF Reporting: A Practical Guide for Cryptoasset Service Providers"
description: "How UK cryptoasset service providers can prepare for HMRC reporting, from customer due diligence through transaction reconciliation."
date: "2026-11-10"
reviewedDate: "2026-11-10"
reviewedLabel: "November 10, 2026"
category: "Guides"
slug: "uk-carf-cryptoasset-reporting-hmrc-guide"
answer: "UK CARF reporting applies to in-scope cryptoasset service providers. It requires them to collect information on reportable users and transactions and report to HMRC. The first UK reporting period is calendar year 2026, with reports due by 31 May 2027. Start by identifying the reporting legal entity and the data it can actually retrieve."
image: "/assets/blog-images/uk-carf-cryptoasset-reporting-hmrc-guide.svg"
imageAlt: "UK CARF Reporting: A Practical Guide for Cryptoasset Service Providers editorial infrastructure visual"
socialImage: "/assets/social/blog-uk-carf-cryptoasset-reporting-hmrc-guide.png"
---

UK CARF reporting applies to in-scope cryptoasset service providers. It requires them to collect information on reportable users and transactions and report to HMRC. The first UK reporting period is calendar year 2026, with reports due by 31 May 2027. Start by identifying the reporting legal entity and the data it can actually retrieve.

## 1. Decide who is responsible

Map each product to the legal entity that provides the service, its UK connection and its role in customer transactions. Include white-label arrangements and products operated with partners. Ask counsel to document which entity is in scope. Do not assume a vendor handles reporting because it supplies identity checks or executes trades.

## 2. Separate identity checks from tax due diligence

An identity check and a tax-residency self-certification answer different questions. Decide which customers need self-certification, how the team checks whether it is reasonable, and how you handle conflicting information or a change in circumstances. For entities, document when controlling-person checks are relevant. Keep access to tax identifiers restricted.

## 3. Reconcile transactions before preparing the file

Build a mapping from event records to reportable categories and retain the valuation inputs. A useful dry run includes an exchange between two cryptoassets, a fiat purchase and an outbound transfer. Trace each record from the customer account through the ledger to the report. Check that a reversed or duplicate event does not inflate totals. Have a second reviewer reconcile the output to source records.

## 4. Run a reporting rehearsal

| Handoff | Evidence to retain |
| --- | --- |
| Compliance to data engineering | Approved scope and field definitions |
| Onboarding to operations | Self-certification status and exception history |
| Data engineering to reporting owner | Reconciliation totals and valuation method |
| Reporting owner to HMRC | Submission evidence and correction procedure |

CARF is not the Travel Rule, and filing a CARF report is not a substitute for other obligations. This guide is operational information, not tax advice; confirm the scope and current filing instructions against the official UK materials.

## Primary sources

- [HMRC: Check whether you need to report](https://www.gov.uk/guidance/check-if-youll-need-to-report-cryptoasset-data-to-hmrc)
- [UK reporting and due diligence regulations](https://www.legislation.gov.uk/uksi/2025/744/made)

## Plan around the deadline, not an assumed opening date

The first reporting period runs from 1 January through 31 December 2026, with reports due by 31 May 2027. On 2 November 2026, [HMRC updated its guidance](https://www.gov.uk/guidance/check-if-youll-need-to-report-cryptoasset-data-to-hmrc) to remove the 1 January 2027 filing-service opening date and the first-year 31 January registration deadline. Check the [HMRC guidance collection](https://www.gov.uk/government/collections/reporting-to-hmrc-if-you-provide-cryptoasset-services-in-the-uk) for current instructions. For a mock fiat purchase, retain the customer record, asset and quantity, transaction time, fiat consideration and event reference; then check the current schema for how that input rolls into the report. The mock record is not a filing template.
