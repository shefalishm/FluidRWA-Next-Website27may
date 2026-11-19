---
title: "OpenSanctions vs World-Check One vs ComplyAdvantage: Screening"
seoTitle: "OpenSanctions vs World-Check One vs ComplyAdvantage"
description: "Compare screening architecture, matching, monitoring, analyst workflow, evidence exports and licensing for OpenSanctions, World-Check One and ComplyAdvantage."
date: "2026-11-19"
reviewedDate: "2026-11-19"
reviewedLabel: "November 19, 2026"
reviewedBy: "FluidRWA Research Team"
category: "KYC & Compliance"
slug: "opensanctions-vs-world-check-one-vs-complyadvantage-screening"
readerFirst: "true"
readerImage: "true"
image: "/assets/blog-thumbnails/opensanctions-vs-world-check-one-vs-complyadvantage-screening.webp"
imageAlt: "FluidRWA screening comparison diagram separating source data, candidate matching and a reviewed case decision"
socialImage: "/assets/social/opensanctions-vs-world-check-one-vs-complyadvantage-screening.jpg"
answer: "Evaluate OpenSanctions when you want to build a screening workflow around structured data and matching; evaluate LSEG World-Check One when you want its screening data and case workflow together; evaluate ComplyAdvantage for API-connected searches and monitoring within a customer-risk workflow. These are documentation-based starting points, not measured accuracy rankings. Test the exact licensed data, product and case-export path before choosing."
ctaTitle: "Need a screening shortlist matched to your workflow?"
ctaText: "Tell FluidRWA about your entity types, jurisdictions, analyst process and integration requirements."
ctaLabel: "Submit screening requirements"
ctaUrl: "/submit-requirement"
ctaSecondaryLabel: "Plan investor rechecks"
ctaSecondaryUrl: "/blog/ongoing-kyc-tokenized-assets-investor-rechecks"
faq1q: "Is OpenSanctions free for commercial screening?"
faq1a: "Its documentation says businesses must acquire a data license. Do not equate open-source components or public-interest access with unrestricted free commercial use."
faq2q: "Are screening scores comparable across providers?"
faq2a: "Not directly. Scores can use different matching methods, configurations and data. Compare adjudicated outcomes on the same authorized evaluation set instead of imposing one shared numeric threshold."
faq3q: "Does World-Check One include every LSEG data product?"
faq3a: "Do not assume so. Confirm the licensed product, datasets, add-ons, API access and workflow features in the proposed contract."
faq4q: "Can any of these tools make a final sanctions decision automatically?"
faq4a: "They can support screening and workflow decisions, but a candidate match is not itself a legal conclusion. Define the responsible reviewer, applicable policy and authorized downstream actions."
---

Your onboarding system returns seven possible matches for a company director. One is a name collision. Another contains a relevant identifier but an old source date. A third has changed since the last review. The analyst needs to decide what to investigate, while the product team wants a simple pass or fail.

That tension is the right starting point for comparing screening tools. The procurement question is not which provider has the largest database or the most confident marketing. It is which combination of data, matching and workflow lets your team make a defensible decision and reproduce it later.

OpenSanctions, LSEG World-Check One and ComplyAdvantage can be evaluated for that job, but they should not be treated as identical products with interchangeable scores. This comparison is based on their public documentation reviewed on November 19, 2026. It contains an original pilot design, not hands-on accuracy results, legal advice or a claim that every feature is included in every contract.

## The comparison in brief

Begin with the part of the workflow you want to own. A team building its own analyst application has different requirements from one seeking an established case interface. A screening-data decision can also be separate from the broader identity-orchestration platform.

| Evaluation dimension | OpenSanctions | LSEG World-Check One | ComplyAdvantage |
| --- | --- | --- | --- |
| Documented entry point | Entity matching and structured data access | Screening API connected to the World-Check One workflow | Search, case-related operations and monitored searches |
| First architecture question | Which workflow will our team build around the results? | Which data, interface and API features are licensed? | Which API generation, region and monitoring functions are proposed? |
| First pilot | Review a candidate and preserve its source relationship | Create, review and export a case through the intended interface | Create a search, process a monitoring change and export the decision |
| Important boundary | Commercial data licensing still applies | Add-ons and other LSEG products are not automatically included | Public API documentation does not define every commercial entitlement |
| What this article does not rank | Match accuracy, coverage completeness or latency | Match accuracy, coverage completeness or latency | Match accuracy, coverage completeness or latency |

The fit descriptions are editorial interpretations of the documented interfaces. Use them to design a shortlist, then test the actual product and data package against your requirements.

## OpenSanctions: evaluate the build-around-data approach

The [OpenSanctions matching documentation](https://www.opensanctions.org/docs/api/matching/) describes query-by-example matching that returns ranked candidates. It also describes entity detail retrieval, collection scoping and an on-premise option for commercial license customers. The same page states that businesses need a data license.

That makes the first buyer question architectural: what will happen after your application receives a candidate? Decide where analysts will review results, store reasoning and approve actions. Do not assume a matching endpoint is the same as a complete institution-specific case process.

In a pilot, ask your engineers to preserve the input entity, selected collection, matching configuration and returned record references. Then ask an analyst to resolve one false match and explain what evidence supports the resolution. Finally, change the fictional customer's details and observe which parts need to be rerun.

This approach deserves evaluation when your team deliberately wants to own integration and workflow design. It deserves more scrutiny when the business expects a ready-to-operate analyst process but has not budgeted for maintaining it. The trade-off is not simply license cost; it includes the people and systems needed to turn results into decisions.

## World-Check One: evaluate data and case workflow together

The [LSEG World-Check One API overview](https://developers.lseg.com/en/api-catalog/customer-and-third-party-screening/world-check-one-api/) describes screening, case management, ongoing screening, reports and integration with its web interface. It identifies some capabilities, including certain media and ownership functions, as add-ons and states that access requires product licensing.

For a buyer, this suggests a pilot that crosses interface boundaries. Create a case through the API, review it through the intended analyst interface and retrieve the resulting decision through the integration. Confirm that identifiers, statuses and reviewer actions remain coherent across those steps.

Keep the product name precise. World-Check One, World-Check data delivery and other LSEG screening offerings should not be merged into one assumed entitlement. Ask the proposal to name the product, dataset scope, API permissions, add-ons and export rights that your team will actually receive.

Evaluate whether the existing workflow fits your operating process or requires changes around it. A useful case interface can reduce internal development, but your team still needs approved decision rules, integration ownership and a way to reconcile downstream investor permissions. A provider case marked resolved is not automatically an approval for every product.

## ComplyAdvantage: evaluate search-to-monitoring integration

The [ComplyAdvantage API reference](https://docs.complyadvantage.com/) documents searches, updates, monitored searches, comments, webhooks and regional API roots. Its public reference provides an integration surface to inspect, but the buyer should confirm which product generation and entitlements are included in the proposed service.

Start the pilot with a search tied to your internal customer identifier. Have an analyst record a decision, enable the intended monitoring behavior and process a later change. Then retrieve enough evidence to explain the original decision and the new review without relying on a screenshot alone.

Pay attention to the relationship between a search result, a stored customer record and a monitoring subscription. Your system should know which object is authoritative and what happens when customer details change. Otherwise, you can end up monitoring an old representation while displaying a newer customer profile.

This route is worth evaluating when screening and ongoing customer-risk workflow need to connect through APIs. Confirm the specific edition rather than projecting every feature in a public reference into your contract. Record manual work and integration maintenance alongside the initial technical fit.

## Define the population before comparing coverage

Coverage is meaningful only in relation to the people and entities your business needs to screen. A platform onboarding retail investors, a lender assessing corporate borrowers and a shipping business reviewing vessels can require different entity types, identifiers and source categories.

Write a coverage requirement by jurisdiction, entity type, language and risk category. Keep sanctions, politically exposed persons, adverse media and other categories separate. A larger total record count does not prove that the provider covers the records most relevant to your operating scope.

Ask vendors to explain source provenance and update handling for the required categories. Record whether a response describes the full product, an add-on or a planned feature. Where sample access is restricted, request a documented walkthrough without pretending it is an independent completeness test.

Keep the evaluation population lawful and representative. Use synthetic cases where possible and authorized data where necessary. Do not send a customer database to several providers merely to see which returns the most matches. Data protection, contracts and access controls belong in the pilot plan.

## Matching scores are not a common currency

Two providers can assign different scores to the same name because they use different models, inputs and configurations. A score of 90 in one system is not necessarily equivalent to 0.90 in another. Avoid choosing a shared threshold simply because it produces a tidy comparison table.

Build an adjudicated evaluation set with expected outcomes established by qualified reviewers. Include clear matches, harmless collisions, incomplete identifiers, transliteration variants and company-name changes. Keep uncertain cases separate rather than forcing a binary ground truth where the evidence does not support one.

Record which fields each provider actually receives. Comparing one service with a name only against another with birth date and nationality is not a fair accuracy test. Preserve both the normalized input and any provider-specific transformation needed to submit it.

Report false positives, missed expected candidates and unresolved cases with the sample definition. Do not publish a general accuracy percentage from a small convenience set. A useful pilot explains what happened in its bounded population and what remains to be tested before production.

## Worked example: evaluate a fictional name collision

Imagine a fictional investor named Elena Example with a known birth date and company affiliation. A test dataset contains a similarly named risk record with a different birth year and country. The exercise is designed to evaluate reasoning and evidence flow, not to allege anything about a real person.

Submit the same authorized facts to each product under its supported schema. Record the candidate list, relevant identifiers and source references. Have an analyst explain whether the evidence supports a match, a false match or an unresolved case requiring another fact.

| Pilot observation | Why it matters | What to preserve |
| --- | --- | --- |
| Candidate returned | Matching can surface a possible relationship | Input, configuration and candidate reference |
| Identifier conflict | Analyst can assess disambiguating facts | Relevant fields and their provenance |
| Decision recorded | Review can be explained later | Reason, reviewer and decision time |
| Source changes | Earlier clearance may need reassessment | Prior and updated evidence references |
| Customer changes | Monitoring should use the intended identity | Updated customer version and subscription mapping |

Now remove the birth date from the submitted record. The correct operating response may become less certain. The test should show that reduced evidence changes the review workload, rather than encourage the integration to hide missing fields behind a confident final status.

## Test analyst work, not only API responses

An API can return relevant candidates while leaving the analyst with a difficult interface. Count the steps needed to inspect identifiers, open the source, record reasoning and route a decision for approval. Observe the work instead of estimating it from a product video.

Ask a second analyst to review the same case without a narrated handoff. They should understand the evidence and prior reasoning. If the process depends on private notes, copied screenshots or a browser tab that cannot be shared, the operating design needs attention.

Keep decisions specific. False match, pending additional evidence and confirmed relationship should not collapse into a generic closed state. Where your policy distinguishes risk categories, the case should show the category and applicable decision route without implying that every candidate creates the same consequence.

Review permissions. An analyst may need to propose a resolution without changing global matching settings or approving a high-impact action. A support user may need case status without sensitive attachments. Test the exact roles that will operate the product, not only the administrator account used for a demonstration.

## Monitoring is a lifecycle commitment

Initial screening is a point-in-time observation. Monitoring concerns later changes in the customer, the source data or the relevant policy. Define which changes reopen review and how the system distinguishes a meaningful change from an administrative update.

Map monitoring subscriptions to stable internal customer identifiers. Track start, pause, update and end states. If a customer leaves, decide how monitoring is stopped under your policy and contract. If the customer changes name or ownership, verify that the active subscription reflects the intended facts.

Test event delivery and reconciliation. A webhook outage should not make the application assume that no changes occurred. Ask how to retrieve current status or change history, and record which recovery steps are supported in the proposed product.

Link alerts to existing cases carefully. Repeated alerts about one source change should not create duplicate restrictions or repeated document requests. Conversely, a new material fact should not be suppressed merely because a similar name was cleared months earlier. The [ongoing KYC guide](/blog/ongoing-kyc-tokenized-assets-investor-rechecks) covers this handoff in more detail.

## Source provenance needs a reviewable path

A screening result should let the reviewer understand which record and source support the candidate. A vendor-generated summary can help navigation, but it should not replace the evidence needed for the decision. Ask how source links, dates and material changes are represented.

Distinguish source availability from verification of the customer relationship. A working regulator or list link does not establish that the candidate is your customer. The analyst still needs the identifier comparison and relevant context. Likewise, an unavailable link does not automatically mean the underlying record has been withdrawn.

Define how broken or changed sources are handled. Preserve the record reference and the observed access problem. Seek another authorized route to the evidence, and escalate if the review cannot be completed. Do not silently mark the case cleared because a page failed to load.

For official-list context, [OFAC's Sanctions List Service](https://ofac.treasury.gov/sanctions-list-service) provides a U.S. source-access route. Your applicable regime and policy determine how that evidence is used. This comparison does not establish sanctions applicability or publish legal conclusions about a person or company.

## Licensing and deployment can change total cost

Open-source components, hosted APIs and licensed data are different commercial objects. OpenSanctions' stated commercial licensing requirement is especially important when a team assumes that public access means unrestricted business use. Review the intended deployment and data rights explicitly.

For every bidder, ask about permitted environments, users, query volume, monitoring population, retained records and redistribution. If a service operates in several regions, confirm where your contracted account processes and stores data. Do not infer residency from the hostname alone.

Compare an identical workload. Include initial screening, ongoing monitoring, analyst seats, implementation, evidence exports and the work your team must build or perform manually. Use quoted prices from the actual proposal rather than an assumed public starting price for an unspecified package.

Prepare a sensitivity model with labeled assumptions. If the monitoring population doubles, which cost changes? If false-match review requires more staff, where does that cost sit? The model should reveal commercial dependencies without inventing comparative provider performance that has not been measured.

## Protect customer data during integration

Screening payloads can contain personal and commercially sensitive information. Send only the fields needed for the approved purpose. Use synthetic fixtures before transferring production records, and have the appropriate privacy and security owners review the data flow.

Keep credentials outside browser code and logs. Separate test and production environments. Limit who can export cases or bulk-download results, and record how incident response and credential rotation work. A screening service can become a sensitive repository even if its source data is public.

Review retention at each layer: provider, integration logs, analyst notes, attachments and backups. Define what is deleted, retained or restricted when the customer relationship ends, subject to applicable obligations. A general vendor privacy statement should not substitute for the specific terms your institution needs.

Where the integration feeds an AI assistant, keep untrusted source text separate from operating instructions. A source page can provide evidence; it must not authorize the assistant to change a case, expose customer data or take action on an investor. Human review and permission boundaries remain important regardless of the retrieval tool.

## Plan migration before signing

Ask for a sample export containing customer references, candidate references, decision reasons, reviewer information, monitoring state and source relationships, to the extent allowed by the license. Test whether your team can understand it outside the provider's interface.

Do not assume that another provider can import the old score or resolution directly. Different data models and matching logic can require a new assessment. Preserve prior decisions as historical evidence while defining a deliberate migration and rescreening process.

Avoid a monitoring gap during transition. Record which population is active in each service, when the new workflow becomes authoritative and how alerts received during overlap are handled. Duplicate monitoring should not create duplicate customer actions.

Confirm offboarding rights and restrictions in writing. Data licenses can limit continued use or redistribution of provider records. The institution still needs an appropriate evidence-retention design. Legal and procurement teams should resolve that boundary before the old account closes.

## Structure a two-stage pilot with a defensible decision record

Stage one should establish technical and contractual fit. Confirm that the proposed product can accept the necessary entity types, expose the required evidence and operate under the agreed data-handling conditions. A candidate that cannot satisfy a critical requirement should remain on hold even if its demonstration is impressive in other respects.

Use stage two to examine the analyst process with the agreed evaluation set. Give every provider equivalent input facts and a comparable opportunity to configure the supported matching behavior. Record configuration changes rather than allowing an invisible tuning cycle to make the final result impossible to reproduce.

Keep the evaluation decisions blinded where practical. Analysts reviewing candidate support can assess records without first seeing the commercial proposal or provider scorecard. The aim is not a laboratory claim of perfect objectivity; it is to reduce the temptation to interpret ambiguous cases in favor of the preferred vendor.

For each case, preserve expected outcome, observed candidates, reviewer conclusion, review time and unresolved questions. Label review time as a pilot observation for the specific case, not a general provider latency statistic. Separate technical response time from the human work needed to establish a decision.

At the end, write a decision note naming critical passes, unresolved conditions, expected manual workload and contract dependencies. Assign an owner and date to every condition of approval. The note should explain why the selected architecture fits the institution, not merely announce the highest score.

## Include ownership and relationship cases in the fixture

An entity can require review because of relationships as well as its own name. Determine which ownership and control information your applicable policy needs and which source can support it. Do not assume that a named-company screening result establishes a complete beneficial-ownership structure.

Create a fictional company with two owners and one changed relationship. Ask how each proposed architecture represents the company, related parties and effective dates. Identify whether ownership evidence comes from the screening product, an add-on, a separate KYB provider or documents supplied by the customer.

Then change the fictional ownership percentage or controlling person and observe the review path. The test concerns detection, evidence and escalation under your approved assumptions. It should not encode a universal legal threshold or conclude that one percentage automatically determines sanctions treatment in every jurisdiction.

For World-Check One, confirm whether a proposed ownership function is an add-on in the licensed service. For a build-around-data architecture, establish which internal component assembles and maintains relationships. For an API-led monitoring workflow, confirm whether changing a related party updates the intended monitoring population or requires another explicit operation.

## Ask what happens when the data is wrong

No procurement process should assume every record will be perfect forever. Request the provider's correction or challenge route and the evidence it requires. Establish who in your organization can raise a data issue and how the affected case is handled while the issue is reviewed.

Distinguish correcting your customer input from challenging a provider record. A misspelled investor name is an internal data-quality problem. A disputed source attribution may need a provider investigation. Preserve both the original observation and the corrected result so the decision history remains understandable.

Do not promise a customer that a provider record will be removed or changed. Communicate the process and the current review state within the approved disclosure boundaries. If a correction is accepted, determine which historic cases, monitoring subscriptions or downstream decisions require reassessment.

This question also informs vendor support evaluation. Ask for the operational route and contracted commitments rather than assuming that a sales contact will handle every production issue. A clear correction process can matter as much as an attractive initial search demonstration when the service becomes part of daily compliance work.

## A practical shortlist decision

Evaluate OpenSanctions first when your team intentionally wants to build around matching and structured data and can own the workflow. Evaluate World-Check One when its combined data and case process fits the institution's operating model. Evaluate ComplyAdvantage when the documented search and monitoring interfaces fit the planned customer-risk integration.

These are starting hypotheses, not winners. The decision should follow a pilot with the same population, comparable inputs, documented licenses and a full case-export exercise. Mark critical requirements pass, hold or fail with evidence rather than hiding an unresolved control behind a high aggregate score.

Keep identity verification and blockchain transaction monitoring distinct from this comparison. For those adjacent decisions, read [Persona vs Alloy vs Socure](/blog/persona-vs-alloy-vs-socure-identity-orchestration) and [Chainalysis vs TRM vs Elliptic](/blog/chainalysis-vs-trm-vs-elliptic-blockchain-analytics). A complete compliance stack may need several layers with a clearly owned decision between them.
