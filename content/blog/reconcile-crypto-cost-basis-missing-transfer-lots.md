---
title: "How to Reconcile Crypto Cost Basis When a Custody Transfer Loses Lot History"
description: "A worked operations tutorial for matching custody transfers, restoring lot lineage and logging missing basis without guessing."
date: "2026-11-16"
reviewedDate: "2026-11-16"
reviewedLabel: "November 16, 2026"
reviewedBy: "FluidRWA Research Team"
category: "Finance Operations"
slug: "reconcile-crypto-cost-basis-missing-transfer-lots"
image: "/assets/blog-thumbnails/reconcile-crypto-cost-basis-missing-transfer-lots-creative-20261120.webp"
imageAlt: "FluidRWA: How to Reconcile Crypto Cost Basis When a Custody Transfer Loses Lot History. A hand repairs the missing receipt link between two transfer cases."
answer: "Match movement and ownership first; restore original lot lineage separately. Record fees on their own line and leave unsupported basis unknown instead of setting it to zero or using the transfer-day price."
ctaTitle: "Keep researching"
ctaLabel: "Open the related resource"
ctaUrl: "/blog/enterprise-crypto-tax-reporting-software-rfp"
socialImage: "/assets/social/reconcile-crypto-cost-basis-missing-transfer-lots-creative-20261120.jpg"
faq1q: "What should I do first when a custody transfer loses lot history?"
faq1a: "Match movement and ownership first, then restore original lot lineage separately."
faq2q: "How should I treat unsupported basis?"
faq2a: "Leave it unknown instead of setting it to zero or using the transfer-day price. Record fees on their own line."
faq3q: "How do I test the reconciliation controls?"
faq3a: "Import the same file twice and confirm balances do not change. Remove the L2 evidence and confirm one transferred unit is flagged rather than given a zero cost. Change the recipient to an unverified wallet and confirm it is not auto-classified as internal."
imageLocked: "true"
socialImageLocked: "true"
---

## The exercise

This is a fictional reconciliation, not a tax calculation. Policy, lot-identification rules and fee treatment depend on the reporting entity, period and jurisdiction. The same entity controls source custody account A and destination wallet B, as evidenced by an approved ownership record.

| Input | Quantity and evidence |
| --- | --- |
| Lot L1 | Two units of fictional asset X, supported acquisition cost USD 80 per unit |
| Lot L2 | Two units of X, supported acquisition cost USD 120 per unit |
| Outbound | Three units of X sent from A; the approved instructions identify two from L1 and one from L2 |
| Inbound | Three units of X received in B; the wallet export has no acquisition dates or costs |
| Fee | 0.01 of separate asset G debited from A; no USD value entered in this exercise |

## Step 1: Match the movement

Match chain, token contract, transaction identifier, event index, quantity and timestamps. For a custody omnibus withdrawal, use the provider's withdrawal ID to join the statement to the relevant onchain event. Keep replayed exports from creating duplicate receipts. Verify the ownership registry as of the movement date; a matching quantity does not establish common ownership.

## Step 2: Restore the lots without inventing basis

Confirm the approved lot instructions against the custodian's available record and preserve the original acquisition dates. The evidence in this exercise moves two units of L1 and one unit of L2 to B.

| Account after transfer | Lot | Units | Supported cost basis |
| --- | --- | --- | --- |
| B | L1 | 2 | USD 160 |
| B | L2 | 1 | USD 120 |
| A | L2 | 1 | USD 120 |

Three units arrive at B carrying USD 280 in supported historical basis; one remains at A with USD 120. The combined USD 400 reconciles to the opening records before any separate fee treatment. Do not make the inbound event a new acquisition just because the destination system lacks basis fields.

## Step 3: Log exceptions and review the fee

| Exception | Evidence to request | Safe accounting workflow |
| --- | --- | --- |
| No lot instructions or acquisition record | Custodian export, trade confirmation, approved policy and timestamps | Preserve original fields; mark affected basis unknown and assign review |
| Ownership unclear | Effective-dated entity wallet registry and authorization | Do not automatically label it an internal transfer |
| Fee in asset G | Fee debit, timestamp and applicable valuation and accounting policy | Reconcile asset G separately; do not silently deduct from X or set USD value to zero |

Each ticket needs an owner, status, evidence reference, corrected record version and reviewer. If evidence arrives after close, retain both versions and rerun affected downstream reports.

## Step 4: Test the controls

Import the same file twice: balances must not change. Remove the L2 evidence: one transferred unit must be flagged, not assigned a zero cost. Change the recipient to an unverified wallet: the system must not auto-classify it as internal. Confirm read-only audit exports show the original records and the approved correction.

The [IRS digital asset FAQs](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-digital-asset-transactions) are a US reference, not a substitute for the entity's applicable policy. For a broader vendor demonstration, use the [enterprise tax reporting RFP and fixture](/blog/enterprise-crypto-tax-reporting-software-rfp).
