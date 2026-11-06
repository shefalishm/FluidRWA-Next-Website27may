---
title: "Dock vs cheqd vs KILT: Verifiable Credential Infrastructure"
seoTitle: "Dock vs cheqd vs KILT: Verifiable Credentials"
description: "Compare Dock's Truvera platform, cheqd identity infrastructure and KILT's credential model, including their relationships, trust and revocation checks."
date: "2026-11-06"
reviewedDate: "2026-11-06"
reviewedLabel: "November 6, 2026"
reviewedBy: "FluidRWA Research Team"
readerFirst: "true"
readerImage: "true"
category: "Identity Solutions"
slug: "dock-vs-cheqd-vs-kilt-verifiable-credentials"
image: "/assets/blog-thumbnails/credentials-november5.webp"
socialImage: "/assets/blog-thumbnails/credentials-november5.webp"
imageLocked: "true"
imageAlt: "Editorial illustration of an issuer, credential holder and verifier exchanging an abstract identity card with a separate status marker"
answer: "Dock's current site presents Truvera as an enterprise identity platform; cheqd supplies underlying identity infrastructure and lists Truvera as a partner platform using cheqd. They are related options at different layers, not three independent competitors alongside KILT. Evaluate KILT's protocol model separately and verify current network and support conditions before procurement."
considerationAfterTable: "true"
ctaTitle: "Designing a reusable credential workflow?"
ctaText: "Share your issuer, holder, verifier and status requirements, or email contact@fluidrwa.com."
ctaLabel: "Submit requirements"
ctaUrl: "/submit-requirement?source=article&article=dock-vs-cheqd-vs-kilt-verifiable-credentials"
ctaSecondaryLabel: "Email FluidRWA"
ctaSecondaryUrl: "mailto:contact@fluidrwa.com"
faq1q: "Are Dock and cheqd independent alternatives?"
faq1a: "Do not evaluate them that way. cheqd reports a 2024 alliance and approved token merger; its product documentation lists Dock's Truvera as a platform using cheqd. Confirm the current contracting and technical boundaries."
faq2q: "Does a valid credential prove the claim is true?"
faq2a: "No. Cryptographic verification must be combined with issuer trust, appropriate status and expiry checks, and a policy explaining which claims the verifier accepts."
faq3q: "Was KILT's current network availability tested?"
faq3a: "No. The official SDK repository and historical white paper support the protocol discussion. The documentation host was unavailable to the research tool; current endpoint health, maintenance and support remain diligence requirements."
---

## Compare the issuer-to-verifier path, not three logos

A supplier has passed an organization's onboarding review. Another business unit wants to reuse that decision without collecting the same documents again. The useful credential workflow must answer who issued the statement, what it means, whether it is still valid and whether the second business unit accepts that issuer. A signature check answers only part of the problem.

Dock, cheqd and KILT already appear in FluidRWA's identity catalog. Their product and protocol layers differ. Dock's site now presents Truvera, while cheqd's documentation lists Truvera as a platform using cheqd as its primary DID method. cheqd also records a 2024 alliance and token-merger approval. A shortlist that treats all three names as unrelated, like-for-like suppliers would obscure an important dependency.

| Decision | Dock / Truvera | cheqd | KILT |
|---|---|---|---|
| Reviewed scope | Enterprise reusable identity platform | Network, APIs and SDKs for identity resources and credentials | Protocol and SDK model for claims and attestations |
| Layer to evaluate | Issuance, management and business-system integration | DID, status and trust-resource infrastructure | Claim structure, attester relationship and onchain evidence |
| Relationship | Listed as a cheqd partner platform | Underlying infrastructure used by Truvera | Separate protocol model |
| First procurement question | Which complete workflow is included in the agreement? | Which functions will we build and operate ourselves? | What current supported deployment can be demonstrated? |
| Evidence limit | No authenticated enterprise workflow tested | No interoperability or payment test performed | Current documentation host unavailable; no live health test |

Reviewed November 6, 2026: [Dock's current site](https://www.dock.io/), [cheqd's product overview](https://docs.cheqd.io/product) and the [official KILT SDK repository](https://github.com/KILTprotocol/sdk-js). These sources establish the limited product-layer descriptions, not deployment suitability or independent compliance approval.

## Dock / Truvera: define the complete business handoff

Dock's current website describes Truvera as infrastructure for reusable identity across internal systems and partners. cheqd's product overview describes Truvera as supporting credential issuance and management using cheqd. That is a reason to evaluate the application workflow and its dependencies together. Do not assume a platform agreement and a network relationship cover the same responsibilities.

For the supplier example, ask the operator to issue a synthetic credential containing the review category and expiry date. The verifier should request only the information its policy needs. Then ask what happens if the supplier's status changes after issuance. A demonstration ending at an attractive credential card has not shown the ongoing business process.

Keep the source review separate from the portable statement. A credential might say that a supplier met a particular internal policy on a specified date. It does not automatically transfer all the underlying documents or make the recipient's policy identical. Have the issuer and verifier agree the claim's meaning, permitted uses and refresh rules before technical acceptance.

Ask for the operational inventory: issuer keys, schemas, status resources, wallets, APIs, hosting and export formats. Identify which components are managed, which are customer-controlled and which depend on another service. A buyer should be able to explain how verification continues, or safely stops, during a platform outage or contract exit.

## cheqd: choose the integration layer deliberately

cheqd's [product documentation](https://docs.cheqd.io/product) offers REST-based Studio, SDK integrations and lower-level ledger interaction. It lists DIDs, linked resources, status lists, trust registries and credential payments. This range gives an engineering team several entry points; it also means a bare statement that a product 'uses cheqd' tells the buyer little about what has actually been implemented.

The [2024 token-merger announcement](https://cheqd.io/blog/cheq-dock-token-merger-approved-an-alliance-for-decentralised-identity-adoption/) records approval and a planned migration. Approval is a historical governance event, not evidence that every customer's migration completed. The later [CHEQ information record](https://cheqd.io/mica-cheqd-foundation/) describes the alliance and Dock platform support. Confirm your own deployment and commercial arrangement rather than extrapolating from a token announcement.

For a direct integration, assign responsibility for updating and checking status. A verifier needs a defined response when a status resource cannot be reached. 'No response' must not quietly become 'valid.' Consider cache age, permitted offline use and a review path when a status check fails. Those are buyer policies to establish, not product defaults asserted here.

If the design includes paid credential access, document which party pays for which event and what happens after an interrupted attempt. Payment for access is separate from the truth of the credential. Ask for a synthetic replay and reconciliation exercise, with the access decision and billing evidence visible as separate records. No credential-payment flow was exercised for this article.

## KILT: separate the documented model from present operating evidence

KILT's official SDK repository describes a TypeScript toolkit for applications using its protocol and Claim Types, or CTYPEs. Its [attestation documentation](https://docs.kilt.io/docs/concepts/credentials/attestation/) describes on-chain attestations and revocation. The protocol documentation is not a service-level commitment or a guarantee that a particular verifier handles revocation correctly.

The documentation host returned an availability error during research. We therefore do not assert current endpoint health, network capacity, supported SDK/runtime versions or staffed support arrangements. A buyer considering a new deployment should make those evidence requests explicit. An accessible repository is useful but does not establish that an integration can be operated under the buyer's requirements.

For a demonstration, ask a qualified implementer to show a credential from a trusted test issuer, a revoked version and a credential with the same structure from an unapproved issuer. The verifier should explain three different outcomes. If all it shows is a successful signature check, it has not demonstrated issuer policy or revocation handling.

Also ask what recovery changes. Replacing a holder device, rotating an issuer key and revoking a business claim are separate operations. Have the proposed supplier map each action to a responsible party and retained evidence. Do not infer that a historical statement about decentralized identity supplies a complete recovery process.

## Write a credential acceptance contract before a pilot

Use synthetic identities and do not put personal records on a public ledger to make a demo more convincing. The protocol's data placement is only one part of privacy review; application logs, status lookups and correlation across verifiers also deserve attention. Qualified reviewers should determine the relevant obligations for the intended use.

| Test credential | Expected policy outcome | Evidence to inspect |
|---|---|---|
| Trusted issuer, current claim | Accept only for the approved purpose | Issuer policy and exact claim meaning |
| Unapproved issuer, valid signature | Reject or send for review | Trust decision separate from cryptography |
| Expired claim | Apply expiry policy | Clock source and expiry interpretation |
| Revoked claim | Refuse reliance on the old statement | Status result and observation time |
| Status service unavailable | Explicit unresolved state | Cache age and failure handling |
| Holder device replaced | Controlled recovery path | Rebinding decision and access history |

Measure a bounded workflow, including exceptions and export. A successful pilot should leave the buyer with a clear account of who issued what, which verifier accepted it and which dependencies are required to check it later. It should not end with a generic interoperability claim.

Use the [identity-solutions directory](/vendors/identity-solutions) to frame the procurement brief. [SpruceID, Privado ID and Civic Auth](/blog/spruceid-vs-privado-id-vs-civic-auth-digital-identity) address adjacent identity and access patterns. This page's narrower decision is how an issued claim is managed and relied upon across organizations, including when its status changes.
