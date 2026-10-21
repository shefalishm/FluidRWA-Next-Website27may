# Frozen research editions

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
