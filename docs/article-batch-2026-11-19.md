# November 19 editorial batch

Seven reader-first source articles: five approved operational guides and two new
comparison trios. The comparisons cover screening architecture and AI research
APIs; no existing article compares either exact trio. Existing vendor, onboarding,
tax RFP and transfer-lot articles remain the canonical pages for their narrower
original jobs. New pages link to those resources instead of replacing them.

The screening comparison uses ComplyAdvantage rather than the initially proposed
Dow Jones product because its public API reference could be inspected. Relevant
Dow Jones pages were inaccessible in the research tool; that is an access
observation, not evidence that the company or product is unavailable.

## Evidence boundaries

- Public primary documentation was inspected November 19, 2026. Inline links
  preserve the precise sources. Availability checks do not establish complete
  coverage, production entitlement, accuracy, latency or legal compliance.
- Examples, costs, trading prices, identities and cohorts are explicitly fictional.
  No paid API calls or real financial transactions were run for these articles.
- Regulatory references are scoped. The guides provide proposed operational
  methods, not published legal interpretations or universal review intervals.
- No exact vendor pricing, match-quality ranking or measured performance winner
  is invented. Buyer pilot recommendations remain recommendations.
- The supplied Bing support reply says support knows of no reporting calculation
  change explaining the decline. It does not establish a root cause or a recovery
  forecast. This batch makes no citation-growth guarantee.

## Page preparation

- Each source body exceeds 3,000 words excluding frontmatter and link URLs.
- Existing generator supplies one H1, canonical URL, metadata, Article and
  BreadcrumbList JSON-LD, plus matching visible FAQs and FAQPage data.
- Seven original workflow illustrations are rendered to WebP previews and
  1200 by 630 JPEG social images. No vendor logos or fake product screenshots.
- Blog discovery, sitemap and the Blog insights section of llms.txt include the
  seven pages. The established Core pages order is unchanged.
- Generation was scoped to the new slugs, avoiding unrelated article rewrites.

## Reproduction

Run `node scripts/build-article-batch-previews-2026-11-19.mjs` for visuals and
`python3 scripts/test-article-batch-2026-11-19.py` for focused source/page checks.
Publication status must be established from the production deployment and live
checks, not inferred from the dates in the article frontmatter.

## Verification notes

The focused seven-article checks and the full site build passed. The unrelated
standalone `test-blog-source-preservation.mjs` reports insufficient regression
coverage because its old identifying phrase matches no pages, including in the
unchanged HEAD baseline. No existing article or test was rewritten to hide that
condition. Browser automation was unavailable for this chat; desktop and mobile
browser layout checks have not been claimed as completed.

The same seven-article assertions also passed against the local production
server: all seven routes returned 200 with the expected canonical URLs, titles,
visible FAQ sections, FAQPage data, Article citations and unique heading IDs.
Body counts excluding metadata and link URLs: tax evidence 3,354; execution
3,418; ongoing KYC 3,321; on-ramp failures 3,353; wallet policies 3,250;
screening comparison 3,302; research API comparison 3,331.
