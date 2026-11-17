---
title: "Tokenized Assets: Who Holds the Asset, Controls the Wallet and Settles the Trade?"
description: "Map underlying custody, investor wallet control, official records and cash settlement across documented tokenized fund examples."
date: "2026-11-16"
reviewedDate: "2026-11-16"
reviewedLabel: "November 16, 2026"
reviewedBy: "FluidRWA Research Team"
category: "Digital Asset Infrastructure"
slug: "tokenized-asset-custody-wallet-settlement-roles"
image: "/assets/blog-images/asset-tokenization-platform-comparison.svg"
imageAlt: "Illustrative digital asset infrastructure, not a product screenshot"
answer: "Underlying-asset custody, control of the investor wallet, the official ownership record and cash settlement are separate functions. Pull evidence for each before assuming a single vendor is responsible."
ctaTitle: "Keep researching"
ctaLabel: "Open the related resource"
ctaUrl: "/network-explorer/fund-comparison"
socialImage: "/assets/social/blog-tokenized-asset-custody-wallet-settlement-roles-editorial.jpg"
faq1q: "Who holds a tokenized asset?"
faq1a: "Underlying-asset custody, control of the investor wallet, the official ownership record and cash settlement are separate functions. Pull evidence for each before assuming a single vendor is responsible."
faq2q: "What evidence should I ask for?"
faq2a: "A custody agreement or product disclosure naming the role, wallet terms with a key-control diagram and recovery test, the prospectus and transfer-agent appointment, and settlement instructions."
faq3q: "Why does this matter for shortlisting?"
faq3a: "Treating the four functions as one can lead to the wrong shortlist, because different providers may hold each responsibility."
---

## Four questions that prevent the wrong shortlist

| Responsibility | What you are verifying | Evidence |
| --- | --- | --- |
| Underlying-asset custody | Who holds fund portfolio assets under the relevant mandate? | Custody agreement or product disclosure naming the role |
| Investor wallet control | Who holds keys, authorizes movement or handles recovery? | Wallet terms, key-control diagram and recovery test |
| Ownership record | Which record determines who owns a share and who corrects it? | Prospectus, fund records and transfer-agent appointment |
| Cash settlement | Who moves cash or stablecoins, when is it final and what happens if it fails? | Settlement instructions, payment terms and a reconciliation sample |

## Three documented starting points

| Product | Fund custody named | Share records | Settlement evidence and boundary |
| --- | --- | --- | --- |
| USTB | The Bank of New York Mellon | Superstate Services LLC named as transfer agent; token and book-entry holding available | USD or USDC subscription and redemption routes described. This does not identify every cash or wallet actor. |
| USCC | Anchorage Digital, as named by the source | Superstate Services LLC named as transfer agent | USD or USDC routes described; confirm settlement provider and account arrangements before use. |
| FOBXX | Not attributed in this example | The prospectus says the transfer agent maintains the official share record through a blockchain-integrated system | A blockchain record does not establish atomic settlement or the identity of the investor wallet operator. |

Sources checked November 16, 2026: [USTB](https://superstate.com/assets/ustb), [USCC](https://superstate.com/assets/uscc), [FOBXX prospectus](https://www.franklintempleton.com/forms-literature/download-preview/9001-P). This is a product-role comparison, not an assessment of licenses, coverage or provider performance.

## Test an out-of-sync transfer

Suppose a transaction is confirmed onchain but the investor statement is unchanged. Record the chain, asset, wallet addresses, transaction identifier and required confirmation state. Ask the transfer agent, rather than assuming the custody provider can correct the register. Separately establish whether the cash leg settled; reconcile bank or stablecoin records to the order. Freeze downstream reporting until the record owner resolves or clearly flags the mismatch.

## Procurement checks

Ask which legal entity owns each responsibility and which contract establishes it. Request incident escalation and key-recovery procedures, then test a failed subscription and an attempted transfer to an ineligible destination. If cash and asset movements are described as atomic, ask for evidence of the specific rail and exception behavior rather than relying on labels.

[Compare fund operating models](/network-explorer/fund-comparison) for source-linked appointments or use the [institutional custody guide](/blog/institutional-crypto-custody-providers-tokenized-assets) for wallet and custody vendor evaluation.
