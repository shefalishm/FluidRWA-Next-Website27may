---
title: "Modern Treasury vs Formance vs TigerBeetle: Ledgers for Stablecoin Payments"
seoTitle: "Modern Treasury vs Formance vs TigerBeetle: Stablecoin Ledgers"
description: "Compare three double-entry ledger approaches for stablecoin payments: pending balances, retries, reversals and reconciliation across chain and bank records."
date: "2026-11-14"
reviewedDate: "2026-11-14"
modifiedDate: "2026-11-15"
reviewedLabel: "November 14, 2026"
reviewedBy: "FluidRWA Research Team"
category: "Payments"
slug: "modern-treasury-vs-formance-vs-tigerbeetle-stablecoin-ledgers"
image: "/assets/blog-thumbnails/modern-treasury-vs-formance-vs-tigerbeetle-stablecoin-ledgers-creative-20261120.webp"
imageAlt: "FluidRWA: Modern Treasury vs Formance vs TigerBeetle: Ledgers for Stablecoin Payments. A balanced payment mechanism and return arrow represent reconciliation and reversals."
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
socialImage: "/assets/social/modern-treasury-vs-formance-vs-tigerbeetle-stablecoin-ledgers-creative-20261120.jpg"
imageLocked: "true"
socialImageLocked: "true"
---

A customer requests a payout, the stablecoin transfer confirms, and the off-ramp later rejects the bank payment. What does the customer have available to spend, and who can correct that balance? The answer should come from your ledger and your payment records together. A blockchain explorer only shows one leg.

## What each ledger gives your engineering team

| Provider | Documented behavior | What your team still needs to decide |
| --- | --- | --- |
| Modern Treasury | Ledger transactions have pending, posted and archived statuses. Correcting posted entries uses a separate reversal transaction. See [transaction states and balances](https://docs.moderntreasury.com/ledgers/docs/transaction-status-and-balances) and [ledger guarantees](https://docs.moderntreasury.com/ledgers/docs/ledgers-guarantees). | What event authorizes posting? Which balance can users spend while a payout is pending, and how do you match external evidence to the original transaction? |
| Formance | The Ledger API supports postings or Numscript to describe movements. Reverting a transaction creates compensating postings. See [transaction creation](https://docs.formance.com/api-reference/endpoints/ledger/transactions/create-a-new-transaction-to-a-ledger) and [reverting transactions](https://docs.formance.com/v3.2/modules/ledger/working-with/reverting-transactions). | Design the accounts and postings for funds available, reserved and in transit. Decide which workflow steps can release a reservation or authorize a correction. |
| TigerBeetle | Two-phase transfers can reserve balances with a pending transfer, then post or void it; pending transfers can also expire. Reliable submission relies on reusing the transfer ID when retrying the same operation. See [two-phase transfers](https://docs.tigerbeetle.com/coding/two-phase-transfers/) and [reliable submission](https://docs.tigerbeetle.com/coding/reliable-transaction-submission/). | How will your service map each payout to transfer IDs? Who builds the operational reports and handles exceptions when an external provider replies after a reservation expires? |

Provider documentation establishes the behaviors above. We did not test throughput, chain integrations, commercial terms or any provider's suitability for a particular regulated activity.

## Modern Treasury: Start with the transaction lifecycle

The documented pending, posted and archived states give your operations team a common vocabulary. Decide what each means for your product before wiring it to a payment status. A chain confirmation might allow movement into an in-transit balance, while the final bank statement is still needed to finish reconciliation. Pick the state from your own accounting policy, then prove the integration can enforce it consistently.

Ask for an operator walkthrough of an already posted transaction and its correction. The finance team should see the original, the linked reversal and who approved it. Also ask the provider to show what happens when the same application request is retried after an ambiguous response. A ledger retry and a retry of the off-ramp request are two different operations.

## Formance: Make the posting rules readable to finance

Formance documents explicit postings and Numscript. Bring examples of where your product's rules differ, such as a network fee your customer pays versus one you absorb. Model the paths separately and ask a finance reviewer to read the resulting entries without help from the engineer who wrote them.

For reservations, design the accounts that distinguish available funds from reserved or in-transit funds. Agree what happens when one business event generates multiple postings, and use stable references to tie them back to the payout. A revert produces compensating postings; it does not guarantee the external operator can send your funds back. Test the two workflows separately.

## TigerBeetle: Keep reservation mechanics separate from the payout workflow

TigerBeetle documents pending transfers that reserve balances and can be posted or voided. Its submission guidance explains reusing the same ID for retries of the same transfer. Use that property to reason about an application timeout, and keep a separate link from the business instruction to the IDs used for reserve and post or void operations.

The difficult operational case is a late reply: an internal reservation may expire while an external transfer is still being processed. Decide how you will detect this and what your support team will show while the issue is under review. Test it explicitly. The availability of a two-phase transfer does not resolve the external payment state.

## Trace one payout before deciding

Give all three options the same acceptance test. A customer has 100 units available and requests a payout of 30, ignoring fees for this example. Record the 30 as reserved before submitting the external instruction. Confirm that the customer cannot immediately spend the same 30 elsewhere. A timeout should prompt a status lookup or a retry tied to the original instruction, not a second payout.

Next, run two versions of the failure. In the first, the payout never leaves your control and the reservation can be released. In the second, the chain transfer succeeds but the bank payout fails. The 30 may now be in transit or in a recoverable balance with a third party. Do not credit it back to the customer as available until the recovery policy and evidence support that entry. Preserve the original event and record any correction separately.

## What a common acceptance test should prove

| Scenario | Evidence reviewers should expect |
| --- | --- |
| Request times out after acceptance | A retry of the same instruction does not reserve funds twice or originate a second payout. |
| Similar events arrive out of order | A late pending event does not reopen a completed transaction or erase a recorded failure. |
| The chain transfer confirms but the off-ramp rejects the payout | The chain evidence stays attached, the unresolved balance is visible, and an operator has a documented recovery procedure. |
| A correction is approved after the daily close | The original and correcting entries remain traceable, with effective date and approval recorded under your close policy. |
| The network fee differs from the estimate | The final posting explains the difference without obscuring the payout amount. |

## Check the evidence finance gets at close

- Carry an internal payment ID through the ledger, chain transfer and payout provider records. A transaction hash alone may not identify an individual movement in a batch; retain the event identifier where relevant.
- Reconcile each asset and network separately. Record fees explicitly and keep fiat amounts separate from token amounts, even when a token targets the same unit of account.
- Replay a duplicate callback, an out-of-order status and a late success after a timeout. In each case, ask an operator to show why the recorded balance is correct without reading application logs.

Run a sample close with a ledger movement, a chain transfer and an off-ramp statement. Let someone outside engineering investigate a deliberate mismatch. They should be able to identify which evidence is missing, who owns the exception and whether the difference affects customer availability. Ask each vendor what is available in its product and what your team will need to build or export.

These products are compared as ledger options, not as interchangeable payment processors or custody providers. Start with the implementation your team can explain and operate during a failed payout. For the separate decision of who moves the money, see the [stablecoin payment provider RFP](/blog/stablecoin-payment-provider-rfp-questions).
