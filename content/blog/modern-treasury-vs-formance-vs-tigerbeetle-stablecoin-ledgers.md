---
title: "Modern Treasury vs Formance vs TigerBeetle: Ledgers for Stablecoin Payments"
seoTitle: "Modern Treasury vs Formance vs TigerBeetle: Stablecoin Ledgers"
description: "Compare three double-entry ledger approaches for stablecoin payments: pending balances, retries, reversals and reconciliation across chain and bank records."
date: "2026-11-14"
reviewedDate: "2026-11-14"
reviewedLabel: "November 14, 2026"
reviewedBy: "FluidRWA Research Team"
category: "Payments"
slug: "modern-treasury-vs-formance-vs-tigerbeetle-stablecoin-ledgers"
image: "/assets/blog-thumbnails/modern-treasury-vs-formance-vs-tigerbeetle-stablecoin-ledgers.webp"
imageAlt: "FluidRWA illustration of paired ledger postings and a separate reconciliation checkpoint."
answer: "Modern Treasury exposes pending and posted ledger transactions. Formance lets you express posting rules and model reservations through accounts and postings. TigerBeetle provides pending transfers that can be posted or voided. Choose by testing your own payout exceptions and reconciliation process; none of the ledger entries is proof that external funds settled."
readerFirst: "true"
considerationAfterTable: "true"
ctaTitle: "Planning your payments stack?"
ctaText: "Share where funds move and where balances need to be recorded. You can also email contact@fluidrwa.com."
ctaLabel: "Submit payment requirements"
ctaUrl: "/submit-requirement"
faq1q: "Does voiding a ledger transfer cancel a stablecoin payment?"
faq1a: "No. A ledger operation changes your internal record or releases a reservation. Recovering funds already transferred requires a separate operational process and, where possible, a new external transaction."
faq2q: "Can a chain confirmation be used as the reconciliation record?"
faq2a: "It is one piece of evidence. You still need to match the chain movement to the internal instruction and reconcile any fiat settlement or off-ramp activity using its own records."
---

A customer requests a payout, the stablecoin transfer confirms, and the off-ramp later rejects the bank payment. What does the customer have available to spend, and who can correct that balance? The answer should come from your ledger and your payment records together. A blockchain explorer only shows one leg.

## What each ledger gives your engineering team

| Provider | Documented behavior | What your team still needs to decide |
| --- | --- | --- |
| Modern Treasury | Ledger transactions have pending, posted and archived statuses. Correcting posted entries uses a separate reversal transaction. See [transaction states and balances](https://docs.moderntreasury.com/ledgers/docs/transaction-status-and-balances) and [ledger guarantees](https://docs.moderntreasury.com/ledgers/docs/ledgers-guarantees). | What event authorizes posting? Which balance can users spend while a payout is pending, and how do you match external evidence to the original transaction? |
| Formance | The Ledger API supports postings or Numscript to describe movements. Reverting a transaction creates compensating postings. See [transaction creation](https://docs.formance.com/api-reference/endpoints/ledger/transactions/create-a-new-transaction-to-a-ledger) and [reverting transactions](https://docs.formance.com/v3.2/modules/ledger/working-with/reverting-transactions). | Design the accounts and postings for funds available, reserved and in transit. Decide which workflow steps can release a reservation or authorize a correction. |
| TigerBeetle | Two-phase transfers can reserve balances with a pending transfer, then post or void it; pending transfers can also expire. Reliable submission relies on reusing the transfer ID when retrying the same operation. See [two-phase transfers](https://docs.tigerbeetle.com/coding/two-phase-transfers/) and [reliable submission](https://docs.tigerbeetle.com/coding/reliable-transaction-submission/). | How will your service map each payout to transfer IDs? Who builds the operational reports and handles exceptions when an external provider replies after a reservation expires? |

Provider documentation establishes the behaviors above. We did not test throughput, chain integrations, commercial terms or any provider's suitability for a particular regulated activity.

## Trace one payout before deciding

Give all three options the same acceptance test. A customer has 100 units available and requests a payout of 30, ignoring fees for this example. Record the 30 as reserved before submitting the external instruction. Confirm that the customer cannot immediately spend the same 30 elsewhere. A timeout should prompt a status lookup or a retry tied to the original instruction, not a second payout.

Next, run two versions of the failure. In the first, the payout never leaves your control and the reservation can be released. In the second, the chain transfer succeeds but the bank payout fails. The 30 may now be in transit or in a recoverable balance with a third party. Do not credit it back to the customer as available until the recovery policy and evidence support that entry. Preserve the original event and record any correction separately.

## Check the evidence finance gets at close

- Carry an internal payment ID through the ledger, chain transfer and payout provider records. A transaction hash alone may not identify an individual movement in a batch; retain the event identifier where relevant.
- Reconcile each asset and network separately. Record fees explicitly and keep fiat amounts separate from token amounts, even when a token targets the same unit of account.
- Replay a duplicate callback, an out-of-order status and a late success after a timeout. In each case, ask an operator to show why the recorded balance is correct without reading application logs.

Start with the implementation your team can explain and operate during a failed payout. For the separate decision of who moves the money, see the [stablecoin payment provider RFP](/blog/stablecoin-payment-provider-rfp-questions).
