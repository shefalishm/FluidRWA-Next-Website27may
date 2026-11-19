---
title: "RFQ vs Order Book vs OTC: Institutional Crypto Execution Compared"
seoTitle: "RFQ vs Order Book vs OTC Crypto Execution"
description: "Compare institutional crypto execution models using a worked trade, all-in costs, quote expiry, partial fills, counterparty exposure and settlement controls."
date: "2026-11-19"
reviewedDate: "2026-11-19"
reviewedLabel: "November 19, 2026"
reviewedBy: "FluidRWA Research Team"
category: "Institutional Trading"
slug: "rfq-vs-order-book-vs-otc-crypto-execution"
readerFirst: "true"
readerImage: "true"
image: "/assets/blog-thumbnails/rfq-vs-order-book-vs-otc-crypto-execution.webp"
imageAlt: "FluidRWA execution diagram connecting an approved trading instruction, execution records and final settlement evidence"
socialImage: "/assets/social/rfq-vs-order-book-vs-otc-crypto-execution.jpg"
answer: "An order book exposes orders available under a venue's rules; an RFQ requests a price for a specified trade; OTC describes trading outside a public exchange order book and can itself use RFQs. Compare executable size, all-in cost, timing, counterparty obligations and settlement arrangements rather than assuming one label always produces a better price."
ctaTitle: "Comparing institutional execution infrastructure?"
ctaText: "Tell FluidRWA about your trading workflow, venues, custody arrangements and reporting requirements."
ctaLabel: "Submit trading requirements"
ctaUrl: "/submit-requirement"
ctaSecondaryLabel: "Compare trading platforms"
ctaSecondaryUrl: "/blog/talos-vs-wyden-vs-finery-markets-institutional-trading"
faq1q: "Are RFQ and OTC the same thing?"
faq1a: "No. RFQ is a method of asking for a quote. OTC describes an execution relationship outside a public exchange order book. An OTC desk or electronic OTC network can use RFQs."
faq2q: "Is the tightest quoted spread always the cheapest execution?"
faq2a: "No. Include explicit fees, executable quantity, price movement, funding, transfers and settlement costs using consistent assumptions."
faq3q: "Does a filled trade mean assets are available in custody?"
faq3a: "No. Execution and settlement are separate states. Confirm the actual cash and asset movements, account credits and restrictions."
faq4q: "Does this article establish a legal best-execution standard?"
faq4a: "No. It provides an operational comparison method. Applicable execution duties depend on the entity, client relationship, instrument and jurisdiction."
---

A treasury team needs to buy a digital asset before an afternoon payment. One screen shows a tight spread. A dealer offers a firm-looking quote. A trading platform suggests splitting the order across venues. The prices appear comparable until someone asks when the purchased assets will actually reach the approved custody account.

That is where institutional execution decisions become practical. A quote is useful only for the quantity, time and settlement arrangement it covers. An exchange fill may leave assets on a venue. An OTC transaction may create an obligation to pay a specific legal counterparty. An algorithm can improve order handling while introducing more records to reconcile.

This guide compares operating models rather than ranking dealers or recommending a trade. All prices, sizes, fees and timelines in the worked examples are fictional. They illustrate how to evaluate execution evidence. For named software platforms, use [Talos vs Wyden vs Finery Markets](/blog/talos-vs-wyden-vs-finery-markets-institutional-trading); for liquidity relationships, use the [institutional OTC comparison](/blog/falconx-vs-b2c2-vs-gsr-institutional-crypto-liquidity-otc).

## RFQ, order book and OTC answer different questions

An order book is a mechanism for organizing buy and sell interest under a venue's matching rules. An RFQ, or request for quote, asks one or more providers for terms on a defined transaction. OTC, or over the counter, describes a trading arrangement outside a public exchange order book. These categories overlap.

| Model | What the buyer interacts with | Evidence to preserve |
| --- | --- | --- |
| Order book | Orders and fills under venue rules | Submitted instruction, order changes, fills and fee records |
| RFQ | Quote for defined size, instrument and validity | Request, responses, expiry, acceptance and trade confirmation |
| Bilateral OTC | A legal trading relationship with a counterparty | Agreement, capacity, trade terms and settlement obligations |
| Agency routing | An intermediary executing under an agreed mandate | Routing instructions, fills, conflicts and post-trade reports |

An electronic OTC network can provide RFQs. A broker can access order books on your behalf. A dealer can hedge after giving you a quote. Avoid treating the labels as mutually exclusive product categories. Ask instead who is quoting, who becomes your counterparty, where execution occurs and who owes delivery.

## Start with the trading instruction

Before comparing prices, write the instruction in operational terms. Identify the asset precisely, buy or sell direction, target quantity, quote currency, approved accounts, timing requirement and any price or venue restrictions. A token symbol without a network or contract context can be insufficient when settlement involves multiple representations.

Specify whether the priority is immediate completion, a maximum price, reduced market impact, or delivery to a particular account. These priorities can conflict. An instruction to buy the whole quantity immediately at any available price is different from an instruction to wait for a limit price.

Define who can change the instruction and how changes are recorded. A trader should not have to infer whether an informal chat message authorizes a larger quantity. Preserve the initial instruction, approved changes and cancellation requests under a stable order identifier.

Set the evaluation benchmark before observing the outcome. A reference midpoint at the decision time answers a different question from the midpoint at execution time. Neither should be selected afterward merely because it makes a route look favorable. Keep the timestamp and reference source with the instruction.

## What an order book can show you

An order book can display prices and quantities available at different levels. The best displayed offer may cover only a small part of the intended purchase. Buying a larger quantity can consume several levels, producing a volume-weighted execution price above the first price shown.

Displayed depth is also a snapshot. Other orders can arrive, cancel or execute before yours. The relevant comparison is therefore the executable result under the actual instruction, not a screenshot taken several seconds earlier. Capture market data in a way that makes the timing relationship clear.

A limit order sets a price boundary but does not guarantee a fill. A market order prioritizes execution under the venue's behavior but does not guarantee a specific price. Other order types introduce additional conditions that need to be understood in the proposed platform and venue combination.

The [Coinbase Prime trading page](https://www.coinbase.com/prime/trading) describes multi-venue routing, market and limit orders, iceberg and TWAP strategies, and post-trade reporting. This is an example of documented functionality, not evidence that one strategy will outperform another for your order. Ask for the actual supported configuration and reports in the service you are considering.

## What an RFQ can show you

An RFQ should define the instrument, direction, size and requested settlement terms. The response should state the quoted price, covered quantity, validity and conditions. A price without these details is a conversation starter rather than a complete execution record.

Distinguish indicative interest from an executable quote. An indicative response can help a trader understand the market without committing the provider to transact at that level. A quote described as firm still needs its expiry, acceptance process and exceptional conditions understood in the agreement.

Compare simultaneous responses where possible. If one provider quotes before a market move and another afterward, the difference is not a clean measure of provider quality. Preserve the request and response times and record whether the buyer changed the requested size or settlement terms.

For a concrete product example, [Kraken's institutional OTC page](https://www.kraken.com/institutions/otc) describes an RFQ portal as well as chat-based execution. That illustrates why RFQ and OTC are overlapping labels. Its stated settlement arrangements and eligibility are specific to the service; confirm the terms available to your entity rather than applying the page to every institution or route.

Ask what information each requested provider receives. Sharing size and direction with several counterparties may have information implications. That does not make RFQs inappropriate; it means the process should match the buyer's objectives and confidentiality requirements rather than maximize the number of quotes by default.

## OTC introduces a counterparty relationship

For a bilateral OTC trade, identify the legal entity entering the transaction and whether it acts as principal or agent. A group brand or trading application does not answer that question. The agreement should describe the obligations and remedies that matter if one side fails to deliver.

Ask whether trading requires prefunding, uses a credit arrangement, or settles after execution. Each model changes exposure and operations. A quoted price that assumes immediate prefunding is not directly comparable with one that includes a different credit or settlement arrangement.

Confirm the destination accounts and supported networks before accepting a trade. If the counterparty can deliver only to an account your policy does not approve, an attractive execution price can create a new transfer, fee and review step. That step belongs in the comparison.

Do not assume the term OTC implies either superior liquidity or weaker oversight. Assess the specific entity, instrument and service. Likewise, a venue's public order book does not eliminate custody, operational or counterparty questions. Document the relationship you actually have, not the reputation of the category.

## Worked example: compare the same purchase three ways

Suppose a fictional institution wants 100 units of asset X. The decision-time reference price is USD 100 per unit. Ignore taxes and currency conversion for this exercise. Every route must ultimately deliver the same asset representation to the same approved account. These are invented prices, not market observations.

Route A uses an order book. Thirty units fill at USD 100, forty at USD 100.10 and thirty at USD 100.20. The total purchase consideration is USD 10,010. An assumed 0.10% trading fee adds USD 10.01. An assumed withdrawal cost adds USD 4.

Route B accepts an RFQ at USD 100.18 for all 100 units, with no separately charged trading fee in this example. The consideration is USD 10,018, and an assumed delivery cost adds USD 2. Route C uses an agency route with an average fill price of USD 100.05, an assumed USD 15 agency charge and an assumed USD 8 combined transfer cost.

| Fictional route | Trade consideration | Other assumed costs | Total |
| --- | --- | --- | --- |
| A: Order book | USD 10,010.00 | USD 14.01 | USD 10,024.01 |
| B: RFQ | USD 10,018.00 | USD 2.00 | USD 10,020.00 |
| C: Agency route | USD 10,005.00 | USD 23.00 | USD 10,028.00 |

The route with the lowest average fill price has the highest total in this constructed example. That is why the evaluation needs a common end point and an explicit cost boundary. It is not proof that RFQ is generally cheaper. Change the quantity, fees or delivery requirement and the result can change.

## Calculate a consistent cost measure

For this fictional buy, define all-in cost as purchase consideration plus the separately included costs. Compare it with the reference notional of USD 10,000. Route A costs USD 24.01 above that reference, Route B USD 20 and Route C USD 28.

Expressed in basis points, divide each difference by USD 10,000 and multiply by 10,000. The resulting values are 24.01, 20 and 28 basis points respectively. These are arithmetic checks on the stated assumptions, not a universal transaction-cost-analysis methodology.

Keep cost components separate even when reporting a total. A fee controlled by the execution provider is different from a network cost or an internal funding cost. A useful review can explain which part changed and whether it was known before the trade.

For a sell, define the sign convention explicitly rather than copying the buy formula without explanation. For partially filled or time-distributed orders, decide how the benchmark and residual quantity are treated. Have the trading and risk owners approve the method before using it to assess staff or vendors.

## Partial fills change the operational picture

An instruction for 100 units can finish with 70 filled and 30 still open. The average price of the 70 units says nothing about whether the remaining obligation has been canceled, repriced or routed elsewhere. Keep requested, filled, canceled and outstanding quantities separately visible.

Use a stable parent instruction and child order identifiers. Each fill should reference the relevant child and venue record. If a trader replaces an order, the replacement must not make the earlier fill disappear or cause the original quantity to be counted twice.

Test cancellation races. A cancellation request can cross in time with a fill. Your system needs to reconcile the authoritative outcome instead of assuming that pressing cancel means no further execution occurred. Keep both the request and the venue's response.

For a time-sensitive treasury payment, define what happens if the order is incomplete near the deadline. Who can authorize a different price limit? Can the payment be reduced or postponed? This escalation belongs in the operating instruction, not in a last-minute chat after the market moves.

## Quote expiry and timeouts need explicit handling

An RFQ can expire while the user is reading the screen or while the acceptance request travels to the provider. Treat local time, provider time and network delay as separate observations. Synchronize clocks and preserve timestamps with enough precision for the workflow.

An ambiguous response requires a status lookup or an agreed operational escalation. Blindly submitting a second acceptance can create a duplicate obligation. Design the integration around a stable request identifier and the provider's documented idempotency or reconciliation behavior.

Ask the provider to demonstrate a quote accepted at the edge of validity. The test should show whether the acceptance is rejected, confirmed, or left temporarily uncertain, and how the buyer learns the final result. Use a safe test environment and fictional data for this exercise.

Present the user with a clear state such as acceptance awaiting confirmation. Do not show completed merely because the browser sent a request. Likewise, do not tell a trader the order failed if the connection dropped before the platform could determine whether the provider accepted it.

## Separate execution from settlement

A trade confirmation establishes a transaction under its terms. Settlement concerns the delivery of the cash and asset obligations. The states should be linked but distinct. A filled trade can still require funding, an account transfer or a blockchain withdrawal before the purchased units are available for their intended use.

Record settlement instructions with the trade. Include the legal account holder, approved destination, network, asset identifier and any reference or memo. A valid address on the wrong network is not a successful operational delivery. Verify instructions through the approved change process.

Track the actual evidence of settlement. A provider may first mark an obligation ready, then submitted, then confirmed or credited. Your treasury system should know which state makes the asset available for the next action. A transaction hash alone may not establish a usable balance in a custody account.

For systems research, the [custody, wallet and settlement roles guide](/blog/tokenized-asset-custody-wallet-settlement-roles) helps separate these responsibilities. When evaluating a trading service, request a complete example from instruction to final account reconciliation rather than ending the demo at the fill notification.

## Review exposure, funding and concentration

Execution access can create balances across several venues. A route that improves price might require prefunding more accounts, maintaining operational reserves or accepting additional counterparty exposure. Include those consequences in the decision instead of treating them as unrelated treasury work.

Set limits for the actual relationships: legal entity, account, asset and service where relevant. A single group-level brand can include several counterparties with different terms. Record whether a limit is based on funds already held, unsettled obligations or potential future exposure.

Do not assume a third-party platform removes the underlying venue relationship. Ask which accounts are in your name, which are held through an intermediary and which agreements govern loss or insolvency scenarios. These questions require legal and risk review, not a marketing checklist.

Stress the workflow with an unavailable venue and a delayed withdrawal. Can the institution still meet its payment requirement? What remains accessible, who can authorize rerouting and which records demonstrate the change? The purpose is to expose dependency before a real deadline creates pressure.

## Build a post-trade evidence pack

Preserve the approved instruction, quotes or market-data reference, acceptance or submission event, order updates, fills, fees, trade confirmation and settlement evidence. Link them through stable identifiers so a reviewer does not have to match by amount and time alone.

Export a reconciliation that compares requested quantity with executed quantity and settled quantity. These numbers can differ for legitimate reasons, but each difference needs a state and an owner. Separate an open trade from a settled trade whose internal ledger has not yet updated.

Record corrections without overwriting history. A fee adjustment, allocation change or canceled trade can alter reports after the first export. Show which output version changed and whether the approval needs to be repeated. Preserve the original confirmation as well as the corrected record.

For allocated block trades, document how fills and costs are assigned to portfolios. A mathematically balanced allocation can still violate the institution's approved method. Make the method and approval visible, and test whether the export lets the finance team reproduce it independently.

## Evaluate vendors with a controlled pilot

Give every shortlisted platform the same fictional instruction and failure cases. Include a normal fill, partial fill, cancel race, expired quote, connection timeout and delayed settlement. Ask the vendor to show the records produced at each stage and what your team must repair manually.

Separate documented availability from observed behavior. A product page can establish that a provider offers an order type; it does not establish how your account, instrument and jurisdiction are configured. Record the edition, environment and contract assumptions used in the pilot.

Avoid a single composite winner score that hides a critical failure. Reproducible order status, correct duplicate handling and clear settlement obligations can be pass-or-hold requirements. Price, integration effort and reporting ergonomics can then distinguish vendors that meet those conditions.

Keep the evaluation narrow enough to be meaningful. If your main need is a treasury conversion delivered to custody, test that path first. A broad platform demonstration featuring many exchanges and charts may reveal less than one carefully reconciled transaction that reaches the account your team actually uses.

## Build an execution decision sheet before the pilot

Use one sheet for each proposed instruction, with the same fields for every route. Record the intended asset, quantity, reference source, decision time, latest acceptable completion and required settlement destination. Leave unknown values explicitly open instead of filling them with an assumed market convention.

For the order-book route, request the relevant depth observation, submitted order, individual fills and actual fee schedule applicable to the test account. For the RFQ route, request the original size, quote validity, acceptance evidence and separately charged costs. For the agency route, record the mandate, routing behavior and the information the buyer will receive about execution and allocations.

Have the risk team record exposure and funding conditions in a separate field. Do not reduce a counterparty concern to a few extra basis points without an approved methodology. A route can be outside policy regardless of its apparent cost advantage. Mark that route ineligible or on hold rather than allowing a weighted score to recommend it anyway.

Ask operations to list manual steps from execution to usable settlement. An attractive quote may require a phone confirmation, a new address approval or a manual withdrawal. These are not automatically disqualifying, but they affect staffing and deadline risk. Observe them during the pilot instead of assuming that an API implies full automation.

Finally, write the unresolved questions and assign owners. One question may belong to the provider's trading desk, another to your custodian and another to legal counsel. A short list of owned questions is more useful than a long list of unanswered due-diligence prompts copied into a procurement document.

## Test stressed conditions without inventing a performance claim

A pilot can use controlled scenarios to expose process behavior even when it cannot reproduce a stressed market. Simulate an unavailable venue, a delayed acceptance response and a custody withdrawal hold in the approved environment. Label the results as workflow observations rather than evidence of live-market resilience.

For a venue outage, inspect whether the router changes destination under the original authority or asks for another approval. Confirm what happens to open orders on the unavailable venue. A new order elsewhere can create excess exposure if the old order later executes. The system needs a reconciliation path for both obligations.

For a delayed RFQ response, confirm that the buyer cannot accept an expired price from a stale screen. For a delayed settlement, observe whether the treasury payment workflow remains pending and whether the responsible operator is notified. The interface should distinguish a market decision from an operational incident.

For an allocation correction, preserve the original portfolio records and demonstrate the approved change. Ask finance to reconstruct the effect without changing the underlying economic trade twice. That test can reveal weaknesses that a simple single-account execution would never expose.

Record the limitations of the exercise. A sandbox with fixed liquidity does not establish real slippage. A rehearsed provider response does not establish twenty-four-hour incident support. A successful test for one instrument does not establish every supported asset. The value of the pilot is the evidence it actually generates, together with a clear account of what remains to be assessed.

## Keep execution analysis useful over time

Retain a consistent method across reporting periods, then explain justified changes. If a reference-price source changes, do not compare new and old results without noting the difference. If a new fee tier applies, separate the commercial change from a change in routing behavior.

Group observations by comparable instruction types and sizes. A small immediate purchase and a large time-distributed sell are not interchangeable samples. Do not rank providers from a handful of unlike trades. Use the analysis to identify questions for a controlled follow-up, such as a recurring settlement delay or an unexplained cost component, before making broad conclusions.

## Choose the route for the instruction, not the label

Order books can offer flexible execution and visible depth. RFQs can make a defined-size quote easier to compare. OTC relationships can support negotiated trading and settlement arrangements. Each still needs evidence about executable terms, cost and responsibility.

Create a one-page decision record for the next pilot: instruction, reference price, route, quantity, all-in cost, funding assumptions, settlement destination and unresolved risks. Then attach the supporting records. This is a more useful procurement artifact than a generic claim that one model has deeper liquidity.

Applicable legal execution duties vary by entity, client relationship, instrument and jurisdiction. Have the appropriate specialists determine those requirements. Use this guide to make the operating evidence clear enough for that review and to identify the questions a provider must answer before trading access is approved.
