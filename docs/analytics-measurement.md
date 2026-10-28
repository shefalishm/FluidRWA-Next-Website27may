# Analytics Measurement

Production GA4: G-Q5L2HZK162, property 534444955. Reporting dates use UTC. Only fluidrwa.com and www.fluidrwa.com load tracking. Local, Vercel previews and workers.dev backups are excluded. Add analytics=off to production testing URLs; source=qa-test is also excluded.

## October 28 reader measurement

`article_scroll` records 25, 50, 75 and 90 percent reached through the article element, once per page view. It runs on actual visible-page scrolls, not timers; it does not establish that text was read. SPA return visits reset the thresholds. Short pages are excluded. `percent_scrolled` and `article_slug` are the only new allowed parameters. No engagement duration is fabricated or overridden.

`directory_click` records an internal link into `/vendors/` or `/web3vendorecosystem`, with `origin_path` and `directory_path`. Existing `enquiry_cta_click` now also recognises trailing-slash enquiry URLs. Email intent remains `contact_email_click`; it means a mail link was clicked, not that an email arrived. Capture listeners are installed once. Query strings and entered text are not sent.

Funnel: article page_view -> article_scroll/directory_click/enquiry_cta_click -> project_form_view or vendor_application_view -> typed form start -> form_request_sent -> saved submission event -> generate_lead. Email intent is a separate branch. Only generate_lead is a conversion; scrolls, clicks, form views and attempts must remain ordinary events. Existing successful-submission handlers and ID deduplication are retained and tested.

The October 28 private audit traces residual `vendor-card-contact` acquisition labels to non-converting page-view sessions, including dates after the earlier code fix. The active implementation has no internal UTM/campaign-source assignment. Retained historical attribution/internal previews are plausible, not proven. Do not rewrite historical source data or claim these are enquiries. The in-app production test browser was opened with `internal=1` on October 28; other browsers need their own exclusion.

October 23 account check: enhanced measurement is OFF in the production web stream. The site now owns page views explicitly: the GA config uses `send_page_view: false`, and a pathname-aware effect sends one initial view after analytics readiness and one per subsequent path change. Repeated readiness events and same-path renders do not add views. Keep enhanced history/page-view collection disabled while this implementation owns navigation; do not add another page-view listener or config call. Basic GA foreground engagement remains separate; no artificial timer events are used. This corrects future collection, not historical data.

Successful saved intake events additionally send generate_lead. Submission attempts have an _attempt suffix and are not conversions. Filtered spam is excluded by existing success handlers. Mark generate_lead as a key event in GA4; leave attempts unmarked.

From the October 23 revision, `form_submit_attempt` includes invalid client-side attempts (previously it only fired after validation). `form_validation_failed` records an attempt stopped by browser validation; field-level errors remain deduplicated by field/reason for each mounted form. `form_request_sent` identifies requests actually sent to the server. Do not compare the old and new attempt totals without this annotation. No entered field values are sent. Website domains are normalized on submit as well as change, so Enter/autofill paths do not depend on a blur event.

`project_form_view` and `vendor_application_view` mean the first required field became at least 50% visible, not merely that the route loaded. Keep route views and form visibility separate in reports. An elevated route-view count alone is not a count of prospective buyers.

Campaign parameters persist within the browser session and are attached to FormData as ATTRIBUTION_UTM_* fields. Existing rawPayload storage retains these fields. Track source, medium, campaign, id, content, term and source platform. Never put contact details or free-text requirements in UTMs. Referrer alone cannot identify an untagged campaign.

Use UTMs only for external campaigns, never internal site links:

- LinkedIn: https://www.fluidrwa.com/?utm_source=linkedin&utm_medium=organic_social&utm_campaign=vendor_discovery_2026_09&utm_content=founder_post
- Newsletter: https://www.fluidrwa.com/?utm_source=fluidrwa_newsletter&utm_medium=email&utm_campaign=weekly_2026_09_18&utm_content=primary_cta
- Outreach: https://www.fluidrwa.com/vendor-membership?utm_source=outreach&utm_medium=email&utm_campaign=vendor_membership_2026_09&utm_content=invitation

Keep source and medium lowercase and campaign names stable. Google Ads auto-tagging should remain authoritative; do not override gclid campaigns with manual UTMs.

Recommended GA4 reports: hostname + device; date/hour + source/medium; landing page + campaign; successful leads by landing page/campaign; form starts vs successful leads. Register form_type, form_variant, vendor_category and interaction_source as event-scoped custom dimensions. Do not register submission_id (high cardinality). Use the property timezone consistently when comparing hosting logs.

## Traffic quality controls

- Analytics only loads on `fluidrwa.com` and `www.fluidrwa.com`; Cloudflare preview and local hostnames are excluded.
- Automated browsers and common monitoring user agents are excluded before GA loads.
- QA links using `?source=qa-test` are excluded.
- Team members should open any production page once with `?internal=1`. That browser is then excluded from future measurement via local storage.
- `?analytics=off` permanently disables analytics for that browser until the `fluidrwa:analytics-disabled` local-storage key is removed.
- Register `site_host` and `deployment_platform` as event-scoped custom dimensions in GA4. Use hostname, city, device, engagement and conversion rate together when investigating data-centre traffic; city alone is not a reliable bot rule.
- Review Cloudflare Security > Analytics before blocking a network. On October 28 the dashboard showed Bot Fight Mode OFF, despite the earlier recommendation. It was left unchanged: no country, network or crawler block was added. Search crawlers and legitimate enterprise networks can also originate from data centres. Verify crawler exceptions and the exact impact before changing this setting.

Test with node scripts/check-measurement.mjs. Before publishing, verify consent behaviour, one page view per navigation, campaign fields in a saved test lead, generate_lead only after success, and no tracking requests on backup/local hosts. No hostname filter can conclusively identify bot traffic; do not block countries based solely on GA4 geolocation.
