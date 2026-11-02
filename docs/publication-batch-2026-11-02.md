# November 2, 2026 publication batch

## Scope

- New comparison: CargoX / Bolero / Enigio electronic trade documents.
- New comparison: Regen / Toucan / Open Forest Protocol carbon infrastructure.
- Refreshed comparison: OpenSpace / DroneDeploy / SiteAware construction evidence (existing canonical preserved).
- New company use case: HSBC Gold Token retail ownership, separate from Siemens and other existing cases.
- Approved homepage change: dark `you can trust` on its own line.

## Evidence review

The articles link the official records supporting their product descriptions. No third-party reviews or performance rankings were used. Procurement questions are FluidRWA analysis, not measured vendor outcomes.

- CargoX help and eBL developer documentation: document-specific blockchain support, actions and signing requirements.
- Bolero Galileo and title-registry pages: lifecycle, rulebook and switch-to-paper process; no universal legal-equivalence claim adopted.
- Enigio trace:original: digital originals and verifiable copies; no universal interoperability claim adopted.
- UNCITRAL MLETR page: model-law scope, not jurisdiction-specific legal advice. Direct automated retrieval returned 403, while the official page's indexed text was available for review.
- Regen Registry and credit protocols: registry and methodology scope, not verified project quality.
- Toucan Puro bridge, retirements and open-source transition FAQ: eligible CORCs, pending registry finalization and maintenance/support diligence.
- Open Forest Protocol project-developer page: ground monitoring, verification and issuance workflow, not independently audited climate outcomes.
- OpenSpace Capture / progress tracking, DroneDeploy construction / Progress AI help, SiteAware how-it-works / service terms: documented scope, not common-project price or accuracy comparisons. DroneDeploy help still labels Progress AI early access.
- HSBC March 27, 2024 launch, current Hong Kong product page and September 19, 2024 security announcement: retail deployment distinguished from the later security trial. No physical-delivery entitlement, unrestricted trading or independently audited savings inferred.

## Images

Built-in image generation was used, followed by Sharp WebP compression. Images are illustrative, not company photographs or product screenshots. Full-size assets are 1200 x 675 and below 200 KB. Blog card variants are 640 x 360 and below 80 KiB. Each asset is mirrored under `public/assets/blog-thumbnails/`.

Prompt set (all requested wide 16:9, realistic editorial detail, no readable text, logos or watermarks):

- `assets/blog-thumbnails/trade-documents-november2.webp`: daylight container terminal, tablet with abstract document rectangles and paper bill of lading.
- `assets/blog-thumbnails/carbon-monitoring-november2.webp`: forest researcher measuring a trunk beside a tablet with abstract monitoring charts.
- `assets/blog-thumbnails/construction-evidence-november2.webp`: engineer with tablet, unfinished concrete structure and small quadcopter above site.
- `assets/blog-thumbnails/hsbc-gold-november2.webp`: unbranded bullion beside a tablet with abstract account lines in a neutral banking office.

## Verification

Run `npm run verify:source`, `npm run build`, `node scripts/test-november2-content.mjs` and `node scripts/test-november2-browser.mjs`. The browser test accepts `TEST_BASE_URL` for production rechecking and `TEST_SCREENSHOT_DIR` for evidence storage. It checks desktop/mobile rendering, loaded images, FAQ interaction, homepage line break and internal links without submitting forms.

Publish only through the documented clean-main, push, `npm run deploy:production` workflow. Live publication status is reported separately after deployment and production checks, not inferred from this record.

The optional historical `test-blog-source-preservation.mjs` reports zero matching legacy fixtures in the current repository and fails its minimum-20-fixture assertion. No source-preservation logic was changed in this batch. The required source suite, reader-first regression and batch-specific checks pass.
