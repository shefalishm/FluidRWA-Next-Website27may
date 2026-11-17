---
title: "What Is ERC-7540? Asynchronous Vaults for Tokenized Funds Explained"
seoTitle: "ERC-7540 Async Vaults Explained"
description: "ERC-7540 explained: how asynchronous deposits and redemptions work for tokenized funds, how it extends ERC-4626, and what to ask a vendor before you buy."
date: "2026-11-17"
reviewedDate: "2026-11-17"
reviewedLabel: "November 17, 2026"
category: "Smart Contracts"
slug: "erc-7540-async-vaults-explained"
image: "/assets/social/blog-erc-7540-async-vaults-explained-editorial.jpg"
imageAlt: "Developer reviewing smart contract code on a monitor."
socialImage: "/assets/social/blog-erc-7540-async-vaults-explained-editorial.jpg"
answer: "ERC-7540 is an Ethereum standard that extends ERC-4626 so a vault can handle deposits and redemptions in two steps instead of one. The investor first calls requestDeposit or requestRedeem, the vault manager processes the request, and the investor then claims the result with the familiar deposit, mint, withdraw or redeem functions. Exchange rates are set when the request is fulfilled, not when it is made, which suits tokenized funds that do not settle in a single transaction."
ctaTitle: "Need a smart contract audit for a tokenized vault?"
ctaText: "Compare smart contract developers and audit firms on FluidRWA by project type and chain."
ctaLabel: "Compare Smart Contract Developers"
ctaUrl: "/vendors/smart-contract-development-companies/"
ctaSecondaryLabel: "Submit Requirements"
ctaSecondaryUrl: "/submit-requirement"
faq1q: "Does ERC-7540 replace ERC-4626?"
faq1a: "No. ERC-7540 extends ERC-4626 and keeps the same interface. The existing deposit, mint, withdraw and redeem functions become the claim step once a request is fulfilled."
faq2q: "Can a vault use asynchronous flows for redemptions only?"
faq2a: "Yes. The standard lets an implementation choose asynchronous deposits, asynchronous redemptions or both. Any flow that is not asynchronous follows the synchronous ERC-4626 pattern."
faq3q: "Does the standard mean a vault is audited or safe?"
faq3a: "No. ERC-7540 is a specification. Audit the implementation you are buying, including how pending requests behave if the vault is paused."
---

## Short answer

ERC-7540 is the standard that lets an Ethereum vault settle deposits and redemptions over time. It [extends ERC-4626](https://ethereum.org/developers/docs/standards/tokens/erc-7540/), which settles in a single transaction, by adding a request step before the claim step.

## How it works

In ERC-4626 a deposit settles atomically: the investor sends assets and receives shares in one transaction. ERC-7540 splits this into two steps.

1. **Request.** The investor calls requestDeposit to lock assets, or requestRedeem to lock shares.
2. **Fulfil.** The vault manager processes the request.
3. **Claim.** The investor calls deposit, mint, withdraw or redeem to collect the result.

Exchange rates are set at fulfilment, not at request.

## What it adds

ERC-7540 adds two entry points, requestDeposit and requestRedeem, plus [four view functions](https://docs.openzeppelin.com/community-contracts/erc7540) that show whether a request is pending or claimable: pendingDepositRequest, claimableDepositRequest, pendingRedeemRequest and claimableRedeemRequest.

## Why it matters for tokenized funds

Because share price depends on the net asset value at settlement, the vault can queue, order and gate redemptions the way offchain funds already do. [OpenZeppelin and the Tokenized Vault Foundation](https://www.openzeppelin.com/news/tokenized-vault-foundation-and-openzeppelin-bring-erc-7540-asynchronous-vaults-to-onchain-funds) describe this request-then-settle pattern as a fit for institutional onchain funds.

## What to ask a vendor

- Does the vault use asynchronous flows for deposits, redemptions or both?
- Who is the operator that can fulfil requests, and how is that role controlled?
- What happens to a pending request if the vault is paused or upgraded?
- How is the net asset value used at fulfilment sourced and checked?

Related reading: [how to select pricing data for a tokenized fund's NAV](/blog/how-to-select-pricing-data-tokenized-fund-nav) and [ERC-7518 DyCIST standard explained](/blog/erc-7518-dycist-standard-explained).

## Technical references

- [EIP-7540: Asynchronous ERC-4626 Tokenized Vaults](https://eips.ethereum.org/EIPS/eip-7540): the specification.
- [ethereum.org: ERC-7540 asynchronous tokenized vault standard](https://ethereum.org/developers/docs/standards/tokens/erc-7540/): explanation of ERC-4626 versus ERC-7540.
- [OpenZeppelin: ERC-7540 asynchronous tokenized vaults](https://docs.openzeppelin.com/community-contracts/erc7540): functions and request lifecycle.
