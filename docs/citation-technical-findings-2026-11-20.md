# Citation recovery technical findings

## What was observed

Five live requests on November 20 returned HTTP 200 with no Cloudflare mitigation header or challenge marker: the homepage, main tokenization guide, Talos comparison, custody category and sitemap. The client used a Bingbot user-agent string. It was not a verified Microsoft crawler IP, so this does not prove that every real crawler request succeeds.

A read-only Cloudflare GraphQL query for November 1-5 returned 360 sampled security-event rows, below the requested limit of 1,000. No row in that sample used Bingbot, BingPreview or msnbot in its user agent. Adaptive sampling, identity uncertainty and the limited returned event set mean this cannot exclude a historical crawler block.

Read-only requests for bot management and rulesets returned HTTP 403, Cloudflare code 10000, Authentication error. Security-level access returned HTTP 403, code 9109, Unauthorized to access requested resource. The existing login cannot establish the current settings through those endpoints. No settings, permissions, routes or bindings were changed. Reading these settings in an authorized Cloudflare dashboard remains necessary before closing this part of the investigation.

## Corrections made

- The runtime sitemap used May 27 for the homepage; the legacy sitemap used May 25. Both now use November 19, supported by the homepage's actual source history at 86b6e694c72d8120fcfb810cfd3168ef53db90e6. This is a content-change date, not a claim about crawler verification.
- Unsupported generic May 27 and September 22 fallback dates were removed from runtime static-route entries. Routes with specifically assigned dates keep them. Unknown last-modification dates are omitted, not refreshed globally.
- The blog sitemap generator now prefers an actual modifiedDate in both the full and scoped-new-entry paths. A scoped build retains other articles' dates.
- The use-case template displayed a hard-coded September 26 date despite newer metadata. It now displays the same per-page modification date used by metadata and structured data.
- Seventeen pre-release blog sources carrying November 19 modifiedDate fields were checked against the commit introducing that value. All seventeen contained body changes; none was a date-only change. The report is data/citation-modification-date-audit-2026-11-20.json. This does not verify every factual claim in those pages.
- Existing IndexNow setup is retained. A successful submission is a notification to a participating search engine, not proof of indexing or citation recovery.

## What this does not establish

There is no demonstrated single technical cause for the November citation decline. Current HTTP availability, search index inclusion and AI citation selection are different observations. Organic competitor candidates are not automatically replacement Copilot citations. Do not describe the before/after export as proof that competitors copied FluidRWA or caused the drop.

The prior matched-period analysis and 100-page candidate worklist remain the source for prioritization. A repeated fixed-query AI-answer audit, with visible citation URLs and observation dates, is still needed across the whole affected set.

## Sources

- [Cloudflare Security Events documentation](https://developers.cloudflare.com/waf/analytics/security-events/)
- [Cloudflare GraphQL limits](https://developers.cloudflare.com/analytics/graphql-api/limits/)
- [Cloudflare firewall-events query tutorial](https://developers.cloudflare.com/analytics/graphql-api/tutorials/querying-firewall-events/)

The 403 responses are an access limitation, not evidence of disabled security or absence of rules.
