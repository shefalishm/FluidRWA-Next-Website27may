---
title: "HQLAx vs Baton Systems vs Fnality: Settlement and Collateral Infrastructure"
description: "Compare HQLAx, Baton Systems and Fnality for collateral mobility, post-trade orchestration, wholesale payments, DvD, DvP and intraday liquidity."
date: "2026-09-25"
reviewedDate: "2026-09-25"
reviewedLabel: "September 25, 2026"
category: "Institutional Settlement Infrastructure"
slug: "hqlax-vs-baton-systems-vs-fnality-institutional-settlement-collateral"
image: "/assets/blog-images/hqlax-vs-baton-systems-vs-fnality-institutional-settlement-collateral.svg"
imageAlt: "HQLAx vs Baton Systems vs Fnality: Settlement and Collateral Infrastructure editorial infrastructure visual"
answer: "HQLAx is the natural starting point for institutions seeking ledger-based collateral mobility without repeatedly moving securities between custodians; Baton Systems for banks modernizing collateral, FX and payment orchestration across existing accounts and market infrastructure; and Fnality when the requirement is regulated wholesale payment using a digital representation of funds held at a central bank. They solve adjacent layers and may complement rather than replace one another."
ctaTitle: "Map your settlement operating model"
ctaText: "Compare institutional infrastructure by asset leg, cash leg, finality, custody and control ownership."
ctaLabel: "Explore Institutional Vendors"
ctaUrl: "/web3vendorecosystem"
ctaSecondaryLabel: "Submit Requirements"
ctaSecondaryUrl: "/submit-requirement"
faq1q: "Are HQLAx, Baton Systems and Fnality direct competitors?"
faq1a: "Not in every workflow. HQLAx focuses on collateral ownership and mobility, Baton on post-trade orchestration across existing infrastructure, and Fnality on wholesale payment settlement."
faq2q: "Which platform provides central bank money?"
faq2a: "The Sterling Fnality Payment System uses a digital representation of funds held through an omnibus account at the Bank of England. Confirm current participation and operating limits directly."
faq3q: "Does DLT remove custodians and settlement systems?"
faq3a: "No. Each model connects to legal, custody, payment and market infrastructure. Buyers must map where assets and cash legally sit and when ownership becomes final."
faq4q: "What is the most important proof-of-concept test?"
faq4a: "Run a real collateral or payment lifecycle through normal, cut-off, failed-instruction, participant-default and recovery scenarios, then reconcile every record."
faq5q: "How current is this comparison?"
faq5a: "It was reviewed on September 25, 2026 using provider materials and public regulatory sources. Participation, currencies and production functions should be reverified."
socialImage: "/assets/social/blog-hqlax-vs-baton-systems-vs-fnality-institutional-settlement-collateral.png"
socialTitle: "HQLAx vs Baton Systems vs Fnality"
---

## The short answer

HQLAx, Baton Systems and Fnality all address costly post-trade friction, but they enter the workflow at different points. HQLAx provides a digital collateral registry and delivery-versus-delivery model intended to improve securities mobility across existing custody locations. Baton Systems orchestrates collateral, FX, liquidity and payment processes across existing accounts and infrastructures. Fnality operates a regulated wholesale payment system whose sterling settlement asset represents funds held at the Bank of England.

A buyer should therefore start with the broken workflow, not the technology label. If the problem is trapped securities inventory, investigate HQLAx. If the problem is fragmented instructions and visibility across CCPs, custodians and payment accounts, investigate Baton. If the requirement is programmable wholesale cash settlement for tokenized transactions, investigate Fnality.

## Side-by-side comparison

| Decision factor | HQLAx | Baton Systems | Fnality |
|---|---|---|---|
| Primary job | Collateral mobility and ownership transfer | Post-trade, collateral, FX and liquidity orchestration | Regulated wholesale payments |
| Core asset | Digital collateral records linked to securities held in existing infrastructure | Cash and securities instructions across client and third-party systems | Digital representation of wholesale funds backed through a central-bank omnibus account |
| Distinctive workflow | DvD securities lending, margin management and DvP repo | Core-Collateral, Core-FX, Core-Liquidity and Core-Payments | Payment, PvP and DvP cash-leg settlement |
| Relationship to legacy rails | Integrates custodians and triparty agents | Connects existing accounts, CCPs, custodians and payment systems | Connects a DLT payment ledger to central-bank money arrangements |
| Likely buyer | Dealer, bank, custodian or market infrastructure | Global bank, clearing member or treasury operation | Eligible wholesale financial institution or connected market infrastructure |
| Key diligence point | Legal effect of the digital record and custodian reconciliation | Instruction authority, finality, exception handling and ledger reconciliation | Participation, currency scope, funding, operating limits and settlement finality |

## Platform profiles

### HQLAx

HQLAx describes a model in which securities remain with participating custodians or triparty agents while ownership is recorded and transferred through a digital collateral registry. Its public materials cover delivery-versus-delivery securities lending, margin workflows and repo, with the objective of reducing cross-custodian movements and intraday liquidity consumption.

**Good fit:** Institutions with fragmented securities inventory and material collateral obligations across locations.

**Verify:** Eligible assets and custodians, legal title, digital-record finality, reuse, corporate actions, default procedures, reconciliation, operating hours and the exact production status of each workflow.

### Baton Systems

Baton's products focus on aggregating data, assessing obligations and activating instructions across existing market infrastructure. Public product information emphasizes real-time visibility, CCP and custodian connectivity, collateral optimization, PvP FX settlement and intraday-liquidity management. Its model does not require every asset to be converted into a new token.

**Good fit:** Banks and clearing members seeking a staged modernization path across current accounts, systems and counterparties.

**Verify:** Source-system integration, instruction permissions, settlement rules, CCP and custodian coverage, exception ownership, resilience, data lineage, implementation effort and measurable liquidity benefit.

### Fnality

Fnality's Sterling Payment System is a recognized U.K. payment system that began live operations in 2023. It uses a distributed ledger and a digital representation of funds held through an omnibus account in the Bank of England's RTGS service. The system is intended to support wholesale payment and, as capabilities expand, atomic cash settlement for tokenized assets and other transactions.

**Good fit:** Regulated institutions and market infrastructures that need a wholesale cash leg designed for programmable settlement.

**Verify:** Participation eligibility, managed operating phase, currency availability, funding and defunding, legal claim, transaction limits, connection model, cut-offs, finality and interoperability with the target asset network.

## Why these platforms can be complementary

A tokenized repo or collateral exchange needs more than one ledger. The securities leg needs an authoritative ownership model. The cash leg needs a legally robust settlement asset. Instructions need orchestration, matching, controls and recovery. One provider may handle only one or two of those responsibilities.

An institution could therefore encounter HQLAx on the collateral leg, Fnality on the sterling cash leg and Baton in orchestration or liquidity-management workflows. That does not mean the three should automatically be combined. Every integration adds operational dependency and a new record that must be reconciled.

## Architecture questions before procurement

1. Which legal entity owns the security and cash at every stage?
2. Which record proves ownership, payment and final settlement?
3. What is exchanged atomically, and what remains a coordinated but separate instruction?
4. Which custodian, triparty agent, CCP, RTGS system or correspondent bank remains in the path?
5. Can the transaction complete outside traditional market cut-offs?
6. What happens if one leg succeeds and the other is delayed?
7. Who can cancel, amend, pause or reverse an instruction?
8. How are defaults, disputes, insolvency and participant suspension handled?
9. Which records are exported to treasury, risk, accounting and regulatory reporting?
10. What measurable reduction in liquidity, fails or manual work is expected?

## Proof-of-concept design

Use a real transaction type, production-like accounts and actual operating cut-offs. Include a normal settlement, substitution, failed eligibility check, delayed custodian response, insufficient balance, duplicate instruction and participant suspension. Reconcile all timestamps and identifiers between the provider, custodian, payment system and internal books.

The proof should measure more than speed. Record peak liquidity usage, collateral buffer, number of manual touches, failed instructions, exception resolution time, accounting breaks and recovery time. A faster screen is not a successful infrastructure change if the bank still carries the same funding buffer and manual reconciliation.

## Best fit by scenario

| Buyer scenario | Likely starting point | Reason |
|---|---|---|
| Cross-custodian collateral optimization | HQLAx | The digital registry and reduced need for settlement movements are central. |
| CCP margin and collateral automation | Baton Core-Collateral | Existing CCP, custodian and inventory connectivity are the key questions. |
| Non-CLS FX settlement modernization | Baton Core-FX | PvP orchestration is closer to the requirement than a collateral registry. |
| Sterling cash leg for tokenized assets | Fnality | The regulated wholesale payment-system model deserves direct evaluation. |
| Atomic repo using securities and cash ledgers | HQLAx plus a compatible cash system, potentially Fnality | Validate actual production interoperability rather than relying on a conceptual diagram. |

## Final recommendation

Do not run this as a generic "blockchain platform" RFP. Define whether the purchase is for collateral ownership mobility, instruction orchestration, wholesale cash or a combination. HQLAx is most relevant to securities collateral movement, Baton to modernization across current post-trade systems, and Fnality to regulated programmable wholesale payment.

Use FluidRWA's [vendor ecosystem](/web3vendorecosystem) to identify adjacent custody, settlement, compliance and integration providers. Require current production references and legal analysis for the exact entities and markets in scope.

## Primary sources reviewed

- [HQLAx platform](https://www.hqla-x.com/our-platform)
- [HQLAx solutions](https://www.hqla-x.com/solutions)
- [Baton Systems overview](https://batonsystems.com/company/about/)
- [Baton Core-Collateral information sheet](https://resources.batonsystems.com/wp-content/uploads/2024/01/Core-Collateral-Information-Sheet-1.pdf)
- [Fnality sterling operations](https://fnality.com/news/fnality-commences-initial-phase-of-sterling-payment-operations-in-a-world-first)
- [Bank of England supervised financial market infrastructures](https://www.bankofengland.co.uk/financial-stability/financial-market-infrastructure-supervision/who-are-we)

