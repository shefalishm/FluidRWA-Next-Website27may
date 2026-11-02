# Three Learn tutorials: research and validation

Research date: 2 November 2026. Scope: NotebookLM document review; Circle developer-controlled test wallets; Safe testnet treasury approvals. No demand, ranking or traffic claims are added to the public guides. The existing opportunity memo is retained unchanged.

## Primary-source decisions

- Google chat help (`https://support.google.com/notebooklm/answer/16179559`) redirected to Gemini Notebook Help, with the official app link pointing to `notebook.google.com`. Keep the earlier search name but explain the observed naming. Do not describe old interface screenshots as current.
- Google source help (`https://support.google.com/notebooklm/answer/16215270`) documents selected sources, pasted text, import limitations and current Drive synchronization. Use a stable, explicitly fictional three-document fixture with a manually checked answer key; do not imply model execution.
- Google notebook creation/sharing help (`https://support.google.com/notebooklm/answer/16206563`) supports the notebook workflow. Privacy and source rights remain prerequisites.
- Circle create-wallet and transfer quickstarts under `/wallets/dev-controlled/` currently use Arc Testnet. This guide explicitly chooses supported `ETH-SEPOLIA` EOA wallets and separate test ETH gas. It does not confuse Wallets with Mint, CCTP or Payments Network.
- Circle's supported-blockchains page confirms Ethereum Sepolia EOAs. Its USDC contract list identifies `0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238` for Ethereum Sepolia and states that testnet tokens have no financial value.
- Circle entity-secret setup documents registration, encrypted signing requests and recovery-file handling. The lab never registers or replaces a secret itself.
- Safe creation/setup help supports three signer addresses, threshold two and immediate test-gas deployment. Sponsored creation is not assumed.
- Safe rejection/cancellation help distinguishes queue deletion and rejection signatures from an executed replacement at the same nonce. Service descriptions distinguish basic wallet-paid execution from relay/sponsorship. The tutorial does not require a paid plan.
- Every public guide contains its exact official reference URLs. Relevant adjacent comparison and operating guides are linked without duplicating their scope. External article links default to `nofollow noopener noreferrer`.

## Implemented outputs

- `/learn/notebooklm-tutorial-compare-vendor-documents`
- `/learn/circle-api-tutorial-test-wallets-usdc-transfer`
- `/learn/safe-wallet-tutorial-testnet-treasury-approvals`
- Six original labelled SVG workflow diagrams (desktop and mobile variants), not product screenshots.
- Downloadable `public/learn-assets/circle-wallet-lab.mjs`, with TEST-key guard, fixed Sepolia chain, saved request intent/idempotency keys, atomic state replacement, a single-process lock and bounded status polling. Public IDs/balances only are logged; SDK errors are not dumped.
- Existing Learn article registry drives routes, index, canonical metadata, Open Graph, Article/FAQ schema and sitemap entries. Learn collection modification date updated.

## Local evidence

- `node scripts/test-learn-tutorials.mjs`: passed three new guides, substantive body length, numbered steps, troubleshooting, source links, unique slugs/section IDs and desktop/mobile asset presence.
- `node scripts/test-circle-wallet-lab.mjs`: passed missing/non-test key rejection, entity-secret format, wrong-chain/duplicate wallet rejection, mock create, saved intent, lost-response idempotency-key reuse, repeat-send protection, balance shape, COMPLETE/failed terminal states and bounded polling.
- Installed Circle SDK **10.8.1** in `/private/tmp/fluidrwa-circle-validation`, not in the website dependency tree. `node scripts/test-circle-sdk-contract.mjs /private/tmp/fluidrwa-circle-validation/package.json` passed against a loopback mock HTTP server: encrypted entity-secret requests, set/wallet creation, balances, amount-to-amounts wire mapping, contract/chain/destination, fee serialization and COMPLETE response. Synthetic credentials only; no Circle API called.
- `npx tsc --noEmit`: passed after correcting the tutorial mapper's return type.
- `npm run verify:source`: passed existing source, blog, network, fund-research, comparison-link and Learn checks.
- `npm run build`: passed production compilation, TypeScript and 700 static pages, including all three slugs.
- Local HTTP publication check: article responses, canonical URLs, descriptions, Open Graph, index, sitemap, JSON-LD, section anchors, internal destinations, six diagrams and exact downloaded-code checksum passed. The same checker accepts the production origin for post-deployment verification.
- Browser QA at **1280x900** and **390x844**: all three article headings and diagrams render; no document horizontal overflow; mobile article width 342px at 390px viewport; mobile diagrams selected. Fixed the pre-existing two-column mobile article issue. Desktop anchor target positioned below the header; FAQ expansion worked; new index links present. Browser reported no errors/warnings in the inspected session. Local QA screenshots retained in `/private/tmp/fluidrwa-learn-qa/`.

## Honest limits

No authenticated Google response, Circle account setup/faucet/transfer or Safe deployment/signing was executed. Those actions require the reader's own eligible accounts and test credentials/signers. Mock SDK validation is not blockchain validation. Each guide discloses this and provides an acceptance sheet for a real testnet run. No real assets, purchases, secrets or private vendor documents were used.

Publication follows the existing main-branch Cloudflare workflow in `DEPLOYMENT_SOURCE_OF_TRUTH.md`; final deployment and live-verification results are reported in the task close-out.
