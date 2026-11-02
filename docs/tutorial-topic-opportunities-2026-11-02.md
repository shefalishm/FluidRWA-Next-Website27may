# FluidRWA tutorial opportunities

Research observed **2 November 2026**. Recommendations only; no content published, campaigns changed, or keywords added to campaigns/plans.

## Measurement and limits

- Source: existing Chrome Keyword Planner tab `1221118433`, accessed through browser UI. Settings visibly confirmed: **All locations (worldwide), English, Google**, **1 October 2025-30 September 2026** (Last 12 months). These settings apply to every figure below.
- Numbers are Google's displayed **average monthly searches**, not traffic forecasts, unique searchers, or exact-match-only counts. Close variants may be grouped; do not add related rows together.
- **Low competition means advertiser competition only.** Organic assessments below are qualitative judgments from live web search results, not measured SEO difficulty scores. No backlink, authority, or rank-tracking dataset was used. Search results vary by location/personalization; this was not a controlled worldwide Google top-ten audit.
- The second batch was downloaded through the UI: `/Users/shefalisharma/Downloads/Keyword Stats 2026-11-02 at 12_13_27.csv` (UTF-16 tab-delimited despite the extension). It confirms the date window and the six numeric second-batch seed rows. First-batch figures were read directly from the visible Planner table.

## Twelve observed keyword figures

Exact row labels are preserved. Broad queries are explicitly distinguished from tutorial-intent queries.

| Exact keyword | Avg./month | Ad competition | YoY | Interpretation |
| --- | ---: | --- | --- | --- |
| notebooklm tutorial | 1,300 | Low | -52% | Direct tutorial intent; broad audience |
| perplexity tutorial | 210 | Low | -77% | Direct tutorial intent; declining baseline |
| claude api tutorial | 50 | Low | +150% | Direct developer/tutorial intent |
| document ai tutorial | 20 | Low | -67% | Tutorial intent; overlaps next keyword |
| google document ai tutorial | 10 | Low | -67% | Suggested row, not a submitted seed; same article cluster as above |
| safe wallet tutorial | 10 | Low | 0% | Direct tutorial intent; very small measured demand |
| ledger nano x setup | 70 | Low | -73% | Task intent; consumer/device support |
| trezor setup | 110 | Low | -71% | Task intent; mixed device models |
| transaction simulation | 50 | Low | -40% | Broad technical intent, not tutorial-only volume |
| circle api | 480 | Low | -64% | Mixed navigation/developer intent; also Circle community software |
| stablecoin payments | 880 | Low | 0% | Broad category/commercial/informational intent |
| payment api | 2,900 | Low | -56% | Very broad API intent; weak evidence for a specific tutorial |

Unavailable is not zero: `hardware wallet setup`, `wallet drainer checker`, `circle api tutorial`, and `stablecoin payment api` displayed a dash for monthly searches. `safe multisig tutorial` had an empty volume in the export (Unknown ad competition). `usdc payment gateway` and `how to accept usdc` were submitted but removed by Planner; no numeric estimate was obtained. Do not substitute the volume of a broader phrase for any of these exact queries.

## Ranked recommendations

Priority balances buyer relevance, distinct task, existing coverage, demand and competition. It is not a ranking-probability estimate. Suggested narrower titles have **no separately measured volume** unless their exact keyword appears above.

| Priority | Suggested tutorial / exact measured keyword | Observed volume | Organic competition assessment and differentiator | Repo overlap check |
| --- | --- | ---: | --- | --- |
| 1 | **Safe Wallet Tutorial: Set Up a Treasury Approval Workflow** / `safe wallet tutorial` | 10 | **Moderate-high**, not easy: Safe help, Coinbase's Safe account-creation guide, hardware-wallet guides and existing tutorials already answer setup. Differentiate with a reproducible testnet approval exercise, signer-availability failure case and evidence checklist for buyers. | `safe-vs-squads-vs-fordefi-treasury-wallets.md` and `safe-vs-fordefi-vs-utila-wallet-infrastructure.md` compare products. Existing access-controls tutorial is adjacent, but not a Safe UI workflow. Link to those pages; do not repeat their comparison. |
| 2 | **Transaction Simulation: Inspect a Token Transfer Before Signing** / `transaction simulation` | 50 | **Moderate-high**: Tenderly's own material and Moonbeam's step-by-step simulation/debugging guide are substantial competitors. Focus on interpreting balance changes, spender/call details and a deliberately failing example, rather than another generic feature tour. Simulation is not a safety guarantee. | `tenderly-vs-gelato-vs-openzeppelin-smart-contract-operations.md` covers capabilities; wallet comparisons mention simulation. Existing test/deploy and approvals tutorials are adjacent, not a concrete pre-signing simulation lab. |
| 3 | **Circle API Walkthrough: Create Two Test Wallets and Transfer Test USDC** / `circle api` | 480 | **High**, with ambiguous intent: Circle has tutorials, API references and a public Postman collection; Circle.so also has an unrelated API. Name the specific Circle product and test network. Add a buyer acceptance-test sheet for balance, transfer state, failure handling and operational handoff. Only a fraction of 480 searches is relevant. | `circle-vs-bridge-vs-bvnk-stablecoin-infrastructure.md` and `circle-vs-privy-vs-thirdweb-embedded-wallets.md` are adjacent comparisons. Do not reproduce `how-to-design-reliable-payment-webhook-processing` or the bank-reconciliation blog. |
| 4 | **NotebookLM Tutorial: Compare Vendor Documents With a Source-Linked Evidence Log** / `notebooklm tutorial` | 1,300 | **High** for the generic keyword: established video walkthroughs, educational resources and Google's ecosystem already serve beginners. The procurement/document-review angle is the opportunity, not a claim of low competition. Use public sample documents, conflicting claims and manual citation checks. | No NotebookLM match found in `content/blog` or tutorial definitions. AI research comparisons are adjacent; make this a worked document exercise, not another tools comparison. |
| 5 | **Claude API Tutorial: Extract Vendor Claims Into a Reviewable Evidence Table** / `claude api tutorial` | 50 | **High**: Anthropic's platform documentation and training ecosystem are authoritative alternatives to a generic quickstart. Differentiate with source excerpts, schema validation, missing-field handling and a small held-out evaluation. Never turn extraction into automatic compliance approval. | `chatgpt-vs-claude-vs-gemini-web3-fintech.md` and AI alternatives articles cover selection, not this implementation. Keep extraction distinct from the Document AI OCR workflow below. |
| 6 | **Document AI Tutorial: Benchmark Invoice Extraction Before Buying** / `document ai tutorial` | 20 | **High**: Google provides introductory videos, companion labs and API examples. A controlled benchmark of extraction accuracy and exception review is more useful than restating the quickstart. Include public/synthetic invoices and field-level error reporting. | `rossum-vs-nanonets-vs-google-document-ai.md` already discusses pilots, confidence and human review extensively. Only proceed with a genuinely executable lab and outputs; otherwise expand that article. `google document ai tutorial` (10) is a secondary keyword, not a second article. |
| 7 | **Perplexity Tutorial: Build and Verify a Vendor Shortlist** / `perplexity tutorial` | 210 | **High**: official getting-started material and mature video tutorials compete. A dated primary-source evidence sheet with unsupported-claim rejection is a useful narrow angle, but demand is down 77% YoY and internal overlap is substantial. Lower priority. | `perplexity-vs-chatgpt-vs-gemini-ai-research-web3.md` and `perplexity-alternatives-market-research-teams.md` already discuss evidence workflows. Proceed only with a concrete worked example, not more generic source-verification advice. |

## Defer or consolidate

- **Ledger/Trezor setup:** numeric demand exists, but device/vendor documentation is a strong competitor and consumer onboarding is less closely tied to FluidRWA vendor buying. Defer standalone setup guides; use official instructions as prerequisites for the Safe lab. The specific Ledger setup SERP evidence was weaker than the other candidates, so no low-difficulty claim is justified.
- **Stablecoin payments / payment API:** 880 and 2,900 are broad-query figures, not tutorial demand. Provider documentation and commercial pages already serve this space. Prefer the specific Circle lab over another generic introduction. Existing `stablecoin-payment-provider-rfp-questions.md`, `white-label-crypto-payment-gateway-buyer-guide.md`, `how-to-reconcile-stablecoin-payments-bank-statements.md` and payment-provider comparisons create substantial overlap.
- **Wallet drainer checker:** no numeric Planner evidence obtained, adjacent to the existing revoke-approvals tutorial, and a sensitive search intent where fake tools are a concern. Not a volume-backed recommendation.
- Do not create new MetaMask setup, approval-revocation, pending-transaction, gas-fee, explorer-reading, testnet-deployment, access-control, Chainlink-feed, fund-reconciliation, webhook-processing or fund-contract-identification tutorials: these already exist in `lib/learn-tutorials.ts`.

## Search evidence and primary references

Live searches checked Safe tutorial/multisig, NotebookLM tutorial, Claude API tutorial, Google Document AI tutorial, Perplexity tutorial, Circle API/tutorial, stablecoin payments integration, transaction simulation tutorial and hardware-wallet setup. Additional vendor-restricted checks verified primary references; these restricted checks are not evidence of organic ranking difficulty. No fixed rank positions are claimed.

- [Safe signer-wallet explanation](https://help.safe.global/articles/8997878213-why-do-i-need-to-connect-a-signer-wallet) and [Coinbase Safe account-creation walkthrough](https://help.coinbase.com/en/coinbase-token-manager/gnosis-safe/overview): existing authoritative task coverage.
- [Moonbeam: simulate and debug with Tenderly](https://docs.moonbeam.network/tutorials/eth-api/using-tenderly/) and [Tenderly documentation repository](https://github.com/Tenderly/tenderly-docs): concrete simulation guides already exist.
- [Circle developer tutorials](https://www.circle.com/developer/walkthroughs-tutorials), [Circle public Postman workspace](https://www.postman.com/circle-solutions/web3-services/overview), and [Circle.so public API](https://api-v1.circle.so/): strong first-party coverage and keyword ambiguity.
- [Claude API overview](https://platform.claude.com/docs/en/api/overview): first-party developer competition/reference.
- [Google Document AI videos and companion labs](https://docs.cloud.google.com/document-ai/docs/videos): first-party tutorial competition/reference.
- [Perplexity getting started](https://www.perplexity.ai/en-GB/hub/getting-started): official tutorial competition/reference.
- [Google NotebookLM mobile getting started](https://support.google.com/notebooklm/answer/16296687): primary product reference. General NotebookLM search results also surfaced full video tutorials and university teaching resources; those establish format competition, not a technical source for the proposed workflow.
- [Trezor Suite guide](https://trezor.io/guides/trezor-suite/getting-to-know-trezor-suite): existing first-party setup instructions.
- [Stripe stablecoin payments support](https://support.stripe.com/topics/stablecoin-payments?locale=en-GB) and [Paxos payments documentation](https://docs.paxos.com/guides/payments): provider-led payment integration coverage.

**Recommended first editorial batch:** Safe approval workflow, transaction simulation, Circle test-wallet transfer, then NotebookLM evidence review. Validate usefulness with real examples and screenshots before drafting; no traffic promise follows from these volumes.
