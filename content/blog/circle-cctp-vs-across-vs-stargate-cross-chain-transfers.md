---
title: "Circle CCTP vs Across vs Stargate: Cross-Chain Transfer Models"
seoTitle: "Circle CCTP vs Across vs Stargate: Transfer Models"
description: "Compare issuer burn-and-mint, intent-based relayers and liquidity/OFT routes for cross-chain transfers; learn what to test before integrating."
date: "2026-10-17"
reviewedDate: "2026-10-17"
reviewedLabel: "October 17, 2026"
reviewedBy: "FluidRWA Research Team"
category: "Vendor Comparisons"
slug: "circle-cctp-vs-across-vs-stargate-cross-chain-transfers"
image: "/assets/blog-images/chainlink-ccip-vs-layerzero-vs-axelar-cross-chain-messaging.svg"
imageAlt: "Illustrative cross-chain messaging and asset transfer infrastructure"
infographicImage: "/assets/infographics/circle-cctp-vs-across-vs-stargate-cross-chain-transfers-comparison.png"
infographicMobileImage: "/assets/infographics/circle-cctp-vs-across-vs-stargate-cross-chain-transfers-comparison-mobile.png"
infographicName: "Circle CCTP, Across and Stargate cross-chain transfer model matrix"
infographicAlt: "Circle CCTP, Across and Stargate compared by transfer model, asset scope and first integration test"
infographicCaption: "Models and routes from provider documentation checked October 17, 2026. Confirm live chains, assets, fees and limits before integration."
considerationAfterTable: "true"
answer: "Circle CCTP uses issuer-supported burn-and-mint transfers for supported Circle assets. Across uses user intents and relayers that fill on the destination before protocol settlement. Stargate V2 documents same-asset routes through shared liquidity and OFT-based paths. They solve different transfer problems; the right test is the exact asset, origin, destination, recipient and failure mode."
ctaTitle: "Choose a route for the actual asset"
ctaText: "Map token identity, transfer restrictions, liquidity, finality and reconciliation before quoting a bridge. Prefer email? contact@fluidrwa.com."
ctaLabel: "Submit integration requirements"
ctaUrl: "/submit-requirement?source=cross-chain-transfer-models"
ctaSecondaryLabel: "Explore interoperability providers"
ctaSecondaryUrl: "/vendors/cross-chain-interoperability-providers"
faq1q: "Is CCTP a bridge for any ERC-20 token?"
faq1a: "No. Circle documents support for specified assets and domains. Verify the current asset and origin/destination pair in Circle's documentation."
faq2q: "Is an Across fill the same event as final relayer settlement?"
faq2a: "No. Across documents a sequence of origin deposit, destination fill and later verification and repayment of relayers. Track the customer outcome and settlement separately."
faq3q: "Does Stargate always deliver a native token?"
faq3a: "No universal rule applies. Its routes can involve native liquidity or OFT representations depending on the asset and route. Confirm the exact destination contract."
faq4q: "Can these routes move a permissioned security token?"
faq4a: "Do not assume so. Asset support, issuer approval, transfer restrictions, custody and legal permissions must be confirmed for the exact token and chains."
---

## Short answer

"Move this asset to another chain" hides three different architectures. [Circle CCTP](https://www.circle.com/cross-chain-transfer-protocol) is an issuer-supported burn-and-mint path for supported assets. [Across](https://docs.across.to/guides/concepts/intent-lifecycle) takes an origin deposit and has a relayer fill the requested destination outcome before the relayer is settled. [Stargate V2](https://docs.stargate.finance/developers/protocol-docs/transfer) documents same-asset transfers with route-specific liquidity and OFT mechanics. Those models are not interchangeable and do not imply support for every tokenized asset.

## Model comparison

| Decision factor | Circle CCTP | Across | Stargate V2 |
|---|---|---|---|
| Documented transfer model | Native burn and mint for [supported Circle assets and domains](https://www.circle.com/cross-chain-transfer-protocol) | Origin escrow, destination relayer fill, later [verification and settlement](https://docs.across.to/guides/concepts/intent-lifecycle) | Same-asset routes; [shared liquidity and OFT representations](https://docs.stargate.finance/primitives/routes/stargateV2) depend on route |
| Asset-scope question | Is this exact asset supported by CCTP on both domains? | Is the input/output pair available and quoted for the exact chains? | Is the pair a supported route and what token arrives? |
| First operational test | Attestation and destination mint recovery | Fill status, expiry and relayer settlement | Taxi/bus timing and destination token identity |
| What not to assume | Any ERC-20 can use CCTP | Destination fill is the same as final relayer repayment | Every route delivers the native asset |

## When Circle CCTP fits

Start here if the asset and both chains are supported by the issuer's protocol and the desired outcome is native issuance on the destination. [Circle's CCTP overview](https://www.circle.com/cross-chain-transfer-protocol) describes burn-and-mint transfers for supported Circle-issued assets. Check its current domain, asset and version documentation before committing to a route. Test a delayed or missing attestation, a rejected destination message, amount limits and reconciliation of burn versus mint.

This is not an answer for an unrelated security token merely because it is an ERC-20. Issuer authorization and asset-specific mint/burn controls are separate questions.

## When Across fits

[Across's intent lifecycle](https://docs.across.to/guides/concepts/intent-lifecycle) separates deposit, fill and settlement. A relayer delivers the destination outcome, and the protocol later verifies and repays relayers. That distinction matters for customer communications: the recipient may see funds before back-end settlement is complete. Record the origin deposit ID, destination fill event, refund/expiry path and final settlement evidence independently.

In a pilot, request quotes for the actual asset, amount, chain pair and recipient. Test an unfilled intent, a deadline expiry, a recipient error and a chain reorganization. Do not quote a generic speed or fee from a different route.

## When Stargate fits

[Stargate's transfer guide](https://docs.stargate.finance/developers/protocol-docs/transfer) describes same-asset routes and a taxi/bus choice. Its [V2 architecture](https://docs.stargate.finance/primitives/routes/stargateV2) also distinguishes liquidity-pool transfers from Hydra/OFT representations. Ask what exact token contract appears on the destination and what redemption path exists back to a core chain. Test the same route in both directions; a name such as "USDC" is not enough to establish native versus bridged token identity.

## Procurement test for a tokenized-asset platform

1. Specify origin and destination chain IDs, exact contract addresses, amount and recipient type.
2. Verify that the route is live **today** and permitted by the asset issuer. Check transfer restrictions before bridging a security token.
3. Write the sequence of custody, approval, burn or escrow, destination delivery, settlement and refund events.
4. Test delayed delivery, duplicate messages, unavailable relayer, incorrect address, unsupported destination and paused token.
5. Reconcile both chains and the platform ledger, with a human-owned exception queue.

This page compares **transfer mechanics**. The existing [deBridge vs Squid vs Socket comparison](/blog/debridge-vs-squid-vs-socket-cross-chain-liquidity) focuses on cross-chain liquidity and routing products; the [CCIP vs LayerZero vs Axelar comparison](/blog/chainlink-ccip-vs-layerzero-vs-axelar-cross-chain-messaging) focuses on messaging infrastructure. For security tokens, read the [transfer-control guide](/blog/how-to-design-transfer-controls-tokenized-securities) before selecting any route. Neither product documentation nor this table establishes legal transferability or production eligibility.

## Primary sources

- [Circle CCTP product and developer entry point](https://www.circle.com/cross-chain-transfer-protocol)
- [Across intent lifecycle](https://docs.across.to/guides/concepts/intent-lifecycle)
- [Stargate V2 transfer guide](https://docs.stargate.finance/developers/protocol-docs/transfer)
- [Stargate V2 route architecture](https://docs.stargate.finance/primitives/routes/stargateV2)
