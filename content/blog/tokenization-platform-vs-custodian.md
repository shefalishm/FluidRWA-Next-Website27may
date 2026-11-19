---
title: "Tokenization Platform vs Custodian: Roles, Controls and Evidence"
description: "Compare issuance software, asset custody and key custody, including the evidence to request before appointing either provider."
date: "2026-11-18"
reviewedDate: "2026-11-18"
reviewedLabel: "November 18, 2026"
category: "Guides"
slug: "tokenization-platform-vs-custodian"
readerFirst: "true"
image: "/assets/blog-thumbnails/tokenization-platform-vs-custodian-creative-20261120.webp"
imageAlt: "FluidRWA: Tokenization Platform vs Custodian: Roles, Controls and Evidence. Issuance machinery and a separate custody vault represent distinct responsibilities."
answer: "A tokenization platform supports issuance, transfer controls and ongoing token administration. A custodian safeguards specified assets or keys under a separate service agreement; using a platform does not establish that those custody arrangements exist."
ctaTitle: "Planning your infrastructure shortlist?"
ctaText: "Share the asset, service requirements and jurisdictions your project needs."
ctaLabel: "Submit requirements"
ctaUrl: "/submit-requirement"
faq1q: "Does a platform remove the need for custody?"
faq1a: "No. Identify who safeguards the underlying assets, cash and token keys. The required arrangements depend on the product and jurisdiction."
faq2q: "Can one group provide both services?"
faq2a: "Yes, but check the contracting entities, permissions, independent approvals and concentration of control rather than assuming a group brand covers every function."
faq3q: "Who is liable for an incorrect mint?"
faq3a: "That depends on the facts and contracts. Request a written responsibility split and have counsel review it."
socialImage: "/assets/social/tokenization-platform-vs-custodian-creative-20261120.jpg"
imageLocked: "true"
socialImageLocked: "true"
---
Imagine your first investor has subscribed, the tokens are ready and the launch team is about to celebrate. Then someone asks: who can actually move the backing assets, and who is responsible if the ownership register is wrong? The issuance demo may have looked complete, but those two questions belong to different parts of the operating model.

That is why a platform-versus-custodian decision is less about choosing a brand and more about assigning responsibility. Start with one investor's money and follow it through the entire transaction.

## Compare responsibilities before comparing brands

| Question | Tokenization platform | Custody arrangement |
| --- | --- | --- |
| Core job | Configure issuance and lifecycle workflows | Safeguard the assets or keys explicitly covered by the contract |
| Control to inspect | Minting, transfer permissions, upgrades and register synchronization | Signing policy, asset segregation, withdrawals and recovery |
| Failure to rehearse | Incorrect mint, stale eligibility decision, register mismatch | Lost access, unauthorized transfer, insolvency or account freeze |
| Evidence | Deployed contract, permission matrix, sample register and export | Named contracting entity, account terms, applicable permission and asset reconciliation |

Neither label establishes the whole operating model. A tokenization provider may offer custody through another entity, and a custodian may supply issuance technology. Ask which entity signs each agreement, which assets the agreement covers, and which party can change the arrangement. A brand-level presentation is not a responsibility matrix.

## Distinguish three different custody questions

First identify the underlying asset: a property interest, loan, fund unit or security. Then identify subscription cash and distribution accounts. Finally identify the tokens and their private keys. These can have different owners, administrators and legal safeguards. Custody of a token does not establish control of the property or debt it references.

The [BIS discussion of tokenisation](https://www.bis.org/publ/arpdf/ar2025e3.htm) is useful context for separating financial claims from the infrastructure that records and transfers them. Your offering documents and service agreements must establish the actual rights.

## Run a control rehearsal

Ask the proposed providers to walk through an erroneous issuance followed by a lost signing device. Record who can pause transfers, change an eligibility rule, replace a signer and restore the holder record. Require named approvers and evidence of each action. If the same administrator can change token rules and move backing assets without independent approval, document that concentration of control.

Repeat the exercise for an exit: obtain a register export, deployed contract addresses, reconciled balances and the destination custody requirements. Do not accept a promise of portability without a file your team can open.

## Questions to put in the contract

Who reconciles onchain balances to the legally authoritative register? Who handles a corporate action when the network is unavailable? What happens to assets and records if a provider becomes insolvent? Which losses are excluded from insurance? Have counsel assess the answers for your structure rather than assuming that a technology feature settles liability.

Read the [asset, wallet and settlement roles guide](/blog/tokenized-asset-custody-wallet-settlement-roles), [platform responsibilities](/blog/what-does-a-tokenization-platform-do) and [vendor evidence checklist](/blog/rwa-vendor-due-diligence-checklist). Compare [custody providers](/vendors/crypto-custody-providers) separately from [tokenization platforms](/vendors/tokenization-platforms).

