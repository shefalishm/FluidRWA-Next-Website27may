# Analytics Measurement

Production GA4: G-Q5L2HZK162. Only fluidrwa.com and www.fluidrwa.com load tracking. Local, Vercel previews and workers.dev backups are excluded. Add analytics=off to production testing URLs; source=qa-test is also excluded.

Google enhanced measurement owns initial and history-change page views. Do not re-add route-level config calls. Confirm history-change tracking is enabled in the GA4 web stream before release. The zero-engaged-session anomaly needs a separate GA4 configuration/network audit; do not fabricate engagement events or assume this implementation fixes historical data.

Successful saved intake events additionally send generate_lead. Submission attempts have an _attempt suffix and are not conversions. Filtered spam is excluded by existing success handlers. Mark generate_lead as a key event in GA4; leave attempts unmarked.

Campaign parameters persist within the browser session and are attached to FormData as ATTRIBUTION_UTM_* fields. Existing rawPayload storage retains these fields. Track source, medium, campaign, id, content, term and source platform. Never put contact details or free-text requirements in UTMs. Referrer alone cannot identify an untagged campaign.

Use UTMs only for external campaigns, never internal site links:

- LinkedIn: https://www.fluidrwa.com/?utm_source=linkedin&utm_medium=organic_social&utm_campaign=vendor_discovery_2026_09&utm_content=founder_post
- Newsletter: https://www.fluidrwa.com/?utm_source=fluidrwa_newsletter&utm_medium=email&utm_campaign=weekly_2026_09_18&utm_content=primary_cta
- Outreach: https://www.fluidrwa.com/vendor-membership?utm_source=outreach&utm_medium=email&utm_campaign=vendor_membership_2026_09&utm_content=invitation

Keep source and medium lowercase and campaign names stable. Google Ads auto-tagging should remain authoritative; do not override gclid campaigns with manual UTMs.

Recommended GA4 reports: hostname + device; date/hour + source/medium; landing page + campaign; successful leads by landing page/campaign; form starts vs successful leads. Register form_type, form_variant, vendor_category and interaction_source as event-scoped custom dimensions. Do not register submission_id (high cardinality). Use the property timezone consistently when comparing hosting logs.

Test with node scripts/check-measurement.mjs. Before publishing, verify consent behaviour, one page view per navigation, campaign fields in a saved test lead, generate_lead only after success, and no tracking requests on backup/local hosts. No hostname filter can conclusively identify bot traffic; do not block countries based solely on GA4 geolocation.
