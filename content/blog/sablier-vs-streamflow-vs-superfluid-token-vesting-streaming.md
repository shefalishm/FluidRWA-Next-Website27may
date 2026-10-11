---
title: "Sablier vs Streamflow vs Superfluid: Vesting and Streaming"
description: "Compare token vesting and streaming with Sablier, Streamflow and Superfluid. Examine funding, claims, cancellation and operational controls before deployment."
date: "2026-10-11"
reviewedDate: "2026-10-11"
reviewedLabel: "October 11, 2026"
reviewedBy: "FluidRWA Research Team"
category: "Token Operations"
slug: "sablier-vs-streamflow-vs-superfluid-token-vesting-streaming"
image: "/assets/social/blog-sablier-vs-streamflow-vs-superfluid-token-vesting-streaming.png"
imageLocked: "true"
imageAlt: "Sablier, Streamflow and Superfluid token distribution comparison"
answer: "Sablier Lockup documents pre-funded token distribution; Streamflow documents configurable vesting and recipient operations; Superfluid documents Super Token money streams. Compare a fixed allocation schedule with an ongoing payment flow before choosing. Cancellation, transfer and funding behavior must be checked for the exact contract configuration."
infographicImage: "/assets/infographics/sablier-vs-streamflow-vs-superfluid-token-vesting-streaming-comparison.png"
infographicMobileImage: "/assets/infographics/sablier-vs-streamflow-vs-superfluid-token-vesting-streaming-comparison-mobile.png"
infographicAlt: "Sablier Lockup pre-funded schedules, Streamflow vesting operations, and Superfluid Super Token streams, compared by funding and recipient pilot checks."
infographicCaption: "Checked October 10, 2026. Product models, not security or investment rankings."
considerationAfterTable: "true"
ctaTitle: "Plan the distribution workflow"
ctaText: "Share your chain, token, schedule and approval requirements. Or email contact@fluidrwa.com."
ctaLabel: "Submit requirements"
ctaUrl: "/submit-requirement"
ctaSecondaryLabel: "Email FluidRWA"
ctaSecondaryUrl: "mailto:contact@fluidrwa.com"
faq1q: "Is token vesting the same as payment streaming?"
faq1a: "No. Vesting concerns entitlement under a schedule; streaming concerns how value accrues or moves over time. They can overlap, but funding and recipient rights need separate review."
faq2q: "Can every stream be cancelled?"
faq2a: "Do not assume so. Check the actual product, deployed contract and configuration, including who may cancel and what happens to accrued and unvested amounts."
faq3q: "Does a vesting contract replace legal terms?"
faq3a: "No. A token-release mechanism does not by itself establish employment, shareholder, tax or securities rights. Review those obligations separately."
---

## Start with entitlement, not a streaming animation

A treasury team needs to distinguish allocated tokens, vested entitlement, claimable value and tokens already received. A frontend showing a moving balance does not answer who owns the remaining allocation or who can change the arrangement.

This is a token-distribution comparison, not another [treasury-wallet comparison](/blog/safe-vs-squads-vs-fordefi-treasury-wallets) or fiat payroll guide. The three options are included because their documentation offers different distribution models, not because they form a ranked market.

## Comparison table: distribution models to examine

| Decision | Sablier | Streamflow | Superfluid |
|---|---|---|---|
| Evidence reviewed | Lockup token distribution | Vesting schedules and recipient operations | Super Token money streams |
| Starting model | Pre-funded scheduled allocation | Configured vesting contract | Time-based token flow |
| First pilot | Fund, accrue and withdraw | Create, claim and inspect permissions | Create, update and stop a test flow |
| Critical question | Who controls unvested tokens? | Which actions can each party take? | How is the flow funded and maintained? |

These are selected documented workflows, not exclusive feature sets. Unreviewed capabilities are **not verified**. The pilot column is editorial guidance, not a claim that every configuration allows every action.

## Sablier

Sablier's [Lockup overview](https://docs.sablier.com/concepts/lockup/overview) describes a creator depositing tokens into a contract with an amount, start, end and stream shape. It distinguishes Lockup from its indefinite-streaming Flow product.

**Buyer interpretation:** choose the relevant product before examining cancellation or transfer rights. Request the deployed contract addresses and configuration, then test withdrawal and unvested-balance treatment for your intended schedule.

## Streamflow

Streamflow's [vesting documentation](https://docs.streamflow.finance/en/collections/10032509-vesting) covers creating vesting contracts, claiming unlocked tokens and operations such as transfer, cancellation, bulk creation and top-ups.

**Buyer interpretation:** a help article for an action does not mean every existing contract permits it. Confirm the chain, token and creation settings. Document sender and recipient permissions and check bulk allocations against the approved register before signing.

## Superfluid

Superfluid's [protocol quickstart](https://docs.superfluid.org/docs/protocol/quickstart) introduces Super Tokens and second-by-second transfers. It provides an illustrative contract for creating, updating and deleting streams, not a production assurance for a customer's payroll deployment.

**Buyer interpretation:** review the token model, balance requirements and flow lifecycle. Separate the protocol mechanics from any application that schedules, monitors or stops a stream. A tutorial should not be adopted as an audited production implementation without further review.

## Design a small test before allocating real treasury assets

Write down a fixed test allocation, recipient, start time, end time and expected entitlement at several checkpoints. If the arrangement is ongoing rather than fixed, specify the flow rate and the process for changing or stopping it. Use non-production assets first.

Have a different team member compare the signed configuration with the approved schedule. Then inspect what the recipient sees before vesting starts, after partial accrual and after claiming. Test a wrong recipient, missed notification and unavailable frontend without sending real funds to an unintended address.

For any permitted cancellation, reconcile the recipient's accrued amount, sender's recoverable amount and transaction record. For transfers, determine whether rights change along with the position and whether that matches the legal agreement. Those are acceptance tests, not assumptions about each provider.

## Questions for the implementation brief

- Which contract version and chain will hold the allocation?
- Who can create, cancel, transfer or amend an arrangement?
- What amount must be funded initially and later?
- How will recipients claim and recover access to their wallets?
- Who reconciles allocations with treasury records?
- What monitoring and support remain if the frontend is unavailable?

No security winner, guaranteed recovery or legal suitability is established. Connect the resulting ledger to the [crypto accounting directory](/vendors/crypto-accounting-tax-software), or send your brief to [contact@fluidrwa.com](mailto:contact@fluidrwa.com).

## Verification and scope

Last checked: **October 10, 2026**. Reviewed by **FluidRWA Research Team**. Company documentation supports product descriptions; workflow tests are FluidRWA recommendations. This is not a contract audit or investment recommendation.
