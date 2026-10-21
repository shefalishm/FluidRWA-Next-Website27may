# Frozen research editions

## Editorial standard for published reports

The public report is for a person making a business decision, not for a data auditor. Keep the research records rigorous without making the opening read like an internal verification checklist.

- Start with the subject and why it matters. Follow with an executive summary, an argument supported by examples, and practical implications.
- Explain terms where they first become useful. Use ordinary descriptions such as "who holds the assets" before specialist role names.
- Give each exhibit a point to explain and place it beside the relevant discussion. Do not stack unrelated charts ahead of the article.
- Keep record counts, field definitions, technical qualifications, inaccessible-document notes and version procedures in an accessible appendix. Keep material qualifications beside the claims they limit as well.
- Use source references in the text. Preserve source dates, unknowns and downloads; moving them out of the main story must not conceal limitations or strengthen a claim.
- Avoid public-facing internal phrases such as "product-role cells", "source-set coverage", "fixed edition" and instructions to AI systems or prospective citers.
- Use FluidRWA blue/yellow, a readable editorial column, restrained navigation and large-enough mobile exhibit text. No dashboard counters in a narrative report.

Structural references reviewed on 21 October 2026: BCG's *The Future of Digital Assets* (https://www.bcg.com/publications/2026/the-future-of-digital-assets-in-finance), the Ripple/BCG *Approaching the Tokenization Tipping Point* report (https://media-publications.bcg.com/Tokenized-Assets.pdf), and McKinsey's *From ripples to waves* (https://www.mckinsey.com/industries/financial-services/our-insights/from-ripples-to-waves-the-transformational-power-of-tokenizing-assets). These inform presentation, not the fund dataset or its conclusions. Their wording, forecasts and branding are not reproduced.

## October 2026 fund infrastructure baseline

Dataset: `tokenized-fund-infrastructure-2026-10-v1.json`.
Review date: 21 October 2026. This is an intra-month baseline, not a month-end measurement.

The review checks product identity, exact role, product/vehicle scope, publication date and source link separately. The `claims` arrays are a claim-to-source checklist, not merely a list of reachable URLs. No private onboarding, custody service, legal eligibility or current appointment was independently tested.

Source limitations retained in the edition:

- Four products use dated launch announcements. Re-reading those announcements does not establish an appointment continuing in October.
- WisdomTree's issuer-linked prospectus viewer was not retrievable during review; the direct SEC annual filing was also inaccessible. Accessible issuer product and regulatory pages support the product roster and ownership-record claims only. Custodian and administration gaps are source-access limits, not evidence of nondisclosure.
- Spiko's prospectus is dated 1 September 2026. Its common appointments cover the four named sub-funds in this roster; those are correlated observations, not independent service mandates.
- USTB and USCC list a NAV calculation agent, which is not recast as a fund administrator. USYC's token administrator is not a fund administrator. OpenEden's vault developer is not assumed to be a transfer agent.
- CUSHY's page title and heading leave its precise legal vehicle name unresolved. OpenEden's FAQ does not establish the exact fund legal entity. Neither uncertainty is filled from inference.
- No AUM is published in the report. Dynamic issuer values can change within a displayed reporting date, and figures for underlying funds, feeders and token deployments must not be added.

## Reproduce and verify

1. Run `node scripts/build-fund-research.mjs` to derive the summary, CSV, JSON and six chart files from the edition dataset.
2. Run `node scripts/build-fund-research.mjs --check` to validate the roster, source references, role uniqueness, 80 product-role observations and exact generated files. This also runs during source verification; it makes no network calls and does not change source dates.
3. Run `node scripts/verify-fund-research.mjs` against a preview server using `PREVIEW_URL`. It checks desktop/mobile rendering, filters, source details, downloads, schema, sitemap and discovery.

## Future editions and corrections

Do not silently overwrite published v1 downloads. Create a new numbered dataset, chart and download stem for a correction, and record the reason on the report page. Retain previous files. Recheck material claims, not only response statuses. Unknowns require better primary evidence, not guessed entities or family-level inheritance.

For a later monthly comparison, retain product IDs and role definitions, state both review dates and separate changes in source access from changes in provider appointments. Report a matched-cohort result separately if the sample changes. Never infer market share or monthly fund flows from these role counts.
