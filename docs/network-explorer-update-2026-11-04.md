# Network Explorer update - November 4, 2026

Edition `2026-11-04.1`. Free first-party sources were reviewed November 4. Reporting dates below are publisher dates, not the release date.

| Asset | Reported USD | As of | Evidence |
| --- | ---: | --- | --- |
| WTGXX | 668,412,990 | 2026-11-02 | [WisdomTree fund table](https://www.wisdomtree.com/onchain/tokenized-funds), 668,412.99 in USD thousands |
| USDC | 69.8 billion (rounded) | 2026-11-02 | [Circle circulation disclosure](https://www.circle.com/usdc) |
| USTB | 635,618,049 | 2026-11-02 | [Superstate headline AUM](https://superstate.com/assets/ustb) |
| USCC | 177,579,856 | 2026-11-02 | [Superstate headline AUM](https://superstate.com/assets/uscc) |
| VBDC | 10,030,430 | 2026-11-02 | [Superstate headline AUM](https://superstate.com/assets/vbdc) |

The November 3 WTGXX NAV date does not date the AUM table. The [product overview](https://www.wisdomtree.com/onchain/tokenized-funds/wtgxx) separately displays $666,246,876 of total assets with no date attached to that row; it is not substituted for dated AUM. The October 27 AUM of $761,984,900 and September net assets remain in the archive. The October 30 figure of $668,147,900 supplied in the release brief could not be independently recovered from the rolling source, so no verified archive row was added for it.

Fourteen companion WisdomTree AUM records use the same November 2 table and unit conversion; prior October 27 rows are retained. The Superstate figures include book-entry and tokenized shares. USCC's network table does not reconcile with headline AUM and is not used for allocations. USTB's holdings are dated September 21. VBDC's page still does not name an appointed auditor. No values are added together or described as token supply, returns or net flows.

[FOBXX](https://www.franklintempleton.com/investments/options/money-market-funds/products/29386/SINGLCLASS/franklin-on-chain-u-s-) remains $667,960,000 in total net assets; [CUSHY](https://superstate.com/assets/cushy) remains $27,671,353 in fund AUM. Both disclosures are dated September 30 and the published records retain their original review dates.

[BitGo's October 27 announcement](https://bitgo.com/resources/blog/bitgo-to-add-native-mint-and-burn-for-wisdomtrees-tokenized-money-market-fund/) documents shareholder servicing and sub-accounting under an agreement with WisdomTree Digital Management, Inc. [WisdomTree](https://www.wisdomtree.com/onchain/insights/blog/wtgxx-is-coming-to-bitgo-mint) also describes BitGo Mint access as forthcoming. The map does not count a fund custody or transfer-agent appointment, or claim the integration is live. Registry coverage is 1,855 identification records and 94 source-linked role statements.

Regenerate with `node scripts/build-network-intelligence.mjs --registry-only`. The October comparison, original report, ramp research, regulatory records and saved supply observations are unchanged. Test the release with `npm run verify:source`, `npm run build`, and `TEST_BASE_URL=<origin> node scripts/test-network-november4.mjs`.
