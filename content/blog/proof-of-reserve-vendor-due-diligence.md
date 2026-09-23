---
title: "Proof-of-Reserve Vendor Due Diligence: Methods, Limits and RFP Questions"
description: "Evaluate proof-of-reserve providers by asset control, liability coverage, methodology, frequency, independence, oracle design and exception handling."
date: "2026-09-23"
reviewedDate: "2026-09-23"
reviewedLabel: "September 23, 2026"
category: "Oracles and Data"
slug: "proof-of-reserve-vendor-due-diligence"
image: "/assets/blog-images/proof-of-reserve-vendor-due-diligence.svg"
imageAlt: "Proof-of-Reserve Vendor Due Diligence: Methods, Limits and RFP Questions editorial infrastructure visual"
answer: "Proof of reserve is useful only when the evidence matches the claim. Buyers must define which assets, liabilities, entities, accounts and time periods are covered; how ownership and control are established; who performs the work; how often data updates; and what happens when evidence is stale or insufficient. An onchain balance or oracle feed alone does not prove solvency, legal ownership or complete liabilities."
ctaTitle: "Compare reserve verification and oracle infrastructure"
ctaText: "Build a shortlist around the claim, evidence, update model and response required when reserves fall outside policy."
ctaLabel: "Compare Oracle Providers"
ctaUrl: "/vendors/oracles-data-proof-of-reserve/"
ctaSecondaryLabel: "Submit Verification Requirements"
ctaSecondaryUrl: "/submit-requirement?category=Oracles%20and%20proof%20of%20reserve&source=por-diligence"
faq1q: "What does proof of reserve prove?"
faq1a: "It can provide evidence about specified assets controlled or held at a point in time or through an update process. The conclusion depends on the scope, methodology and evidence."
faq2q: "Does proof of reserve prove solvency?"
faq2a: "Not by itself. Solvency also depends on complete liabilities, legal ownership, encumbrances, valuation, liquidity and other obligations."
faq3q: "Is an onchain wallet balance enough?"
faq3a: "No. The buyer must establish who controls the wallet, whether assets are encumbered, whether the wallet population is complete and which liabilities the assets support."
faq4q: "What is proof of liabilities?"
faq4a: "It is evidence concerning obligations owed to customers or token holders. Liability completeness and privacy-preserving customer verification are separate challenges from proving assets."
faq5q: "How often should reserves update?"
faq5a: "The frequency should match the risk and claim. A fast-moving token or collateral product may require continuous or frequent updates, while another use case may use periodic independent procedures."
faq6q: "What should happen when reserve data is stale?"
faq6a: "The product should define age limits, visible stale status, alerting and protective actions instead of silently treating old data as current."
faq7q: "Can an oracle replace an auditor?"
faq7a: "No. An oracle transports or publishes data under a technical model. Assurance, audit and attestation are professional engagements with defined standards and scope."
faq8q: "Where can buyers compare providers?"
faq8a: "FluidRWA maintains directories for oracle, data and proof-of-reserve providers, physical-asset verification services, auditors and compliance infrastructure."
socialImage: "/assets/social/blog-proof-of-reserve-vendor-due-diligence.png"
socialTitle: "Proof-of-Reserve Vendor Due Diligence"
---

## Short Answer

Proof of reserve is not one standardized product. It may describe an independent point-in-time procedure, an onchain asset feed, a cryptographic customer-verification mechanism or a control embedded in a token or lending protocol.

Before comparing providers, write the exact statement the organization wants users to rely on. Then ask whether the proposed evidence actually supports that statement.

"These addresses held these assets at this block" is different from "the issuer owns unencumbered assets sufficient to meet every token holder claim." The second statement requires evidence about legal entities, ownership, liabilities, encumbrances, valuation and timing that a wallet balance alone cannot supply.

## Start With the Claim

Use a claim-evidence matrix before discussing vendors.

| Intended claim | Evidence required | What remains unproven |
|---|---|---|
| Named wallets hold specified tokens | Verified address population, control evidence and onchain balances | Legal ownership, encumbrances and offchain liabilities |
| Custodian holds assets for an issuer | Custodian records, account ownership and independently verified balances | Other accounts, liens and complete token-holder obligations |
| Tokens are fully backed | Defined reserve assets plus complete eligible token supply or liabilities | Redemption liquidity, timing and legal enforceability unless separately tested |
| Physical assets support tokens | Asset existence, identity, ownership, condition and custody evidence | Valuation, saleability and legal priority |
| Collateral remains above a threshold | Reliable price, quantity, ownership and continuously applied calculation | Performance during data failure unless fallback controls are tested |

## The Due-Diligence Framework

### Scope and legal entities

Identify every issuer, custodian, account owner, trustee, special-purpose vehicle and data provider. Confirm whether the procedure covers one entity or a consolidated group and whether assets held through subcustodians or omnibus accounts are included.

Ask what the reserve is intended to satisfy: circulating tokens, customer balances, redemption obligations, protocol collateral or another defined liability. Record exclusions explicitly.

### Asset existence, ownership and control

For onchain assets, verify how the address population is established and how control is demonstrated without unsafe key movement. For bank, custody, fund or physical assets, identify the primary records and independent confirmations used.

Ownership is not identical to visibility. An address may be observable while beneficial ownership, liens, borrowing arrangements or third-party claims remain unknown.

### Liabilities and token supply

Reserve evidence becomes misleading when the denominator is incomplete. Determine how customer obligations, circulating supply, burned or locked tokens, pending redemptions, accrued amounts and off-ledger claims are captured.

Merkle-tree approaches can allow a customer to verify inclusion without publishing every balance, but buyers should still test data completeness, duplicate or negative records, privacy design and whether excluded customers can detect omission.

### Valuation and eligibility

Define permitted reserve assets, pricing sources, haircuts, concentration limits and valuation times. A reserve made entirely of volatile, related-party or illiquid assets does not provide the same protection as cash or short-duration instruments, even if the headline ratio is identical.

### Frequency and publication

Match frequency to the product's risk. A periodic report may be suitable for one claim while a rapidly changing collateral position requires frequent updates. For automated feeds, document update triggers, heartbeat, finality assumptions, data age and fallback behavior.

## 18 Questions for Providers

1. What exact claim is the service designed to support?
2. Which legal entities, accounts, wallets, assets and liabilities are in scope?
3. Which material items are excluded and why?
4. How is control of onchain addresses demonstrated?
5. How are bank, custody, fund or physical-asset records confirmed?
6. How are liens, pledges, borrowing and other encumbrances identified?
7. How is the complete token supply or customer-liability population obtained?
8. Can individual customers verify inclusion without learning other customers' data?
9. How are negative balances, duplicates, omnibus records and pending transactions treated?
10. Which valuation sources, times, currencies and haircuts are used?
11. Who performs the work, and what independence or professional standard applies?
12. Is the result an audit, attestation, agreed-upon procedure, oracle feed or management assertion?
13. How often does the evidence update, and what event triggers a new observation?
14. How are stale, missing, disputed or inconsistent records displayed?
15. Which alerts or protective actions occur when coverage falls below policy?
16. Can users retrieve methodology, history, timestamps and prior exceptions?
17. What controls protect data ingestion, signing, publication and contract upgrades?
18. How can the organization migrate providers without interrupting evidence or losing history?

## Test Failure, Not Only Success

Run a proof-of-concept that introduces deliberate breaks:

- Remove one wallet or account from the population.
- Add a pending mint or redemption at the measurement cutoff.
- Delay a custodian file or oracle update beyond the permitted age.
- Supply an unsupported or illiquid reserve asset.
- Create a mismatch between token supply and the liability source.
- Interrupt the price source or blockchain data provider.
- Change an address or contract without completing the approval process.

The system should expose the problem clearly. A reserve page that remains green because data stopped updating is worse than no dashboard: it creates false confidence.

## Scorecard

| Criterion | Illustrative weight |
|---|---:|
| Claim and scope integrity | 25% |
| Asset, ownership and liability evidence | 25% |
| Independence and methodology | 15% |
| Frequency, freshness and failure behavior | 15% |
| Security, auditability and history | 10% |
| Integration, portability and cost | 10% |

Do not award points simply because the provider uses cryptography or a blockchain. Score whether the evidence is complete enough for the specific decision and whether users can understand its limits.

## Procurement Recommendation

Combine professional assurance and technical monitoring where the risk warrants it. Independent procedures may evaluate records and controls at a defined time, while an oracle or data service may provide more frequent operational signals. Each layer should state what it does and does not establish.

Compare [oracle and proof-of-reserve providers](/vendors/oracles-data-proof-of-reserve/), [physical-asset verification services](/vendors/physical-asset-verification-oracles/), [security audit companies](/vendors/security-audit-companies/) and [compliance infrastructure](/vendors/compliance-infrastructure-providers/). The related [proof-of-reserve use case](/use-cases/proof-of-reserve-tokenized-assets/) maps the operating workflow.

## Primary and Authoritative Sources

- [PCAOB investor advisory on proof-of-reserve reports](https://pcaobus.org/news-events/news-releases/news-release-detail/office-of-the-investor-advocate-issues-investor-advisory-on-proof-of-reserve-reports)
- [Chainlink Proof of Reserve documentation](https://docs.chain.link/data-feeds/proof-of-reserve)
- [Ethereum.org explanation of Merkle trees](https://ethereum.org/en/developers/tutorials/merkle-proofs-for-offline-data-integrity/)
- [NIST guidance on cryptographic standards and key management](https://csrc.nist.gov/Projects/Key-Management/Key-Management-Guidelines)

This guide does not establish that a reserve arrangement is solvent, safe or legally enforceable. Obtain appropriate accounting, assurance, legal and technical advice.
