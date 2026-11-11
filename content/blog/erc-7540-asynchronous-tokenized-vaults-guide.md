---
title: "ERC-7540 Explained: Asynchronous Deposits and Redemptions for Tokenized Vaults"
description: "Understand ERC-7540 request states, controller permissions and what to test before integrating an asynchronous vault."
date: "2026-11-10"
reviewedDate: "2026-11-10"
reviewedLabel: "November 10, 2026"
category: "Guides"
slug: "erc-7540-asynchronous-tokenized-vaults-guide"
answer: "ERC-7540 extends ERC-4626 with asynchronous deposit and redemption flows. A user submits a request, waits until it becomes claimable, then claims the result. The interface standardizes that workflow; it does not guarantee when requests clear, what price applies or whether liquidity will be available."
image: "/assets/blog-images/erc-7540-asynchronous-tokenized-vaults-guide.svg"
imageAlt: "ERC-7540 Explained: Asynchronous Deposits and Redemptions for Tokenized Vaults editorial infrastructure visual"
socialImage: "/assets/social/blog-erc-7540-asynchronous-tokenized-vaults-guide.png"
---

ERC-7540 extends ERC-4626 with asynchronous deposit and redemption flows. A user submits a request, waits until it becomes claimable, then claims the result. The interface standardizes that workflow; it does not guarantee when requests clear, what price applies or whether liquidity will be available.

## Follow one request from start to finish

| State | What happened | What the interface should show |
| --- | --- | --- |
| Pending | A request exists but cannot yet be claimed. | Requested amount and pending status, not a guaranteed payout. |
| Claimable | The vault has made a result available to claim. | The claimable amount and the action the controller or authorized operator can take. |
| Claimed | A claim has been executed. | What the user actually received and the transaction reference. |

For an asynchronous deposit, the request comes first and the later deposit or mint call claims shares. For an asynchronous redemption, the request comes first and the later redeem or withdraw call claims assets. Do not assume both sides are asynchronous: integrations should detect the supported interfaces. On asynchronous sides, the associated ERC-4626 preview methods must revert, so do not treat a reverted preview as evidence that the vault is offline.

## Design for the controller and the receiver

Keep the request controller distinct from the asset owner and the destination of the claim. The controller owns the request workflow; an authorized operator may act on its behalf. Make the permissions visible before the user signs. Test with two accounts and verify that an unrelated account cannot claim someone else's request.

## Run an integration rehearsal

Use a vault test deployment. Submit a request and refresh the UI while it is pending. Advance it to claimable and check that the interface recovers after a dropped connection. Claim the result, then verify that a second claim cannot pay it again. Repeat for multiple requests associated with the same controller. Reconcile confirmed assets and shares separately from pending requests.

Ask the vault operator how it sets prices, handles queues and responds to cancelled or failed requests. Do not assume a cancellation feature or a settlement timetable from ERC-7540 alone. For tokenized funds, legal ownership and transfer-agent records remain separate diligence questions.

## Primary sources

- [ERC-7540 specification](https://eips.ethereum.org/EIPS/eip-7540)
- [ERC-4626 specification](https://eips.ethereum.org/EIPS/eip-4626)

## A partial fill in asset and share units

Suppose Alice requests a deposit of 1,000 asset units and Bob requests 500 under the same nonzero request ID. If the batch becomes 40% claimable, the claimable deposit amounts are 400 and 200 asset units respectively; the remainder is pending. At an illustrative exchange rate of 2 asset units per share, those claim amounts produce 200 and 100 shares, ignoring fees and rounding. The rate is an example, not a term of ERC-7540. Use the request ID and controller to track state, and check the actual claim output separately. The base standard does not define cancellation.
