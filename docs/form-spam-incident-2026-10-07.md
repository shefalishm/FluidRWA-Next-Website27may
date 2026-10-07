# Form scanner incident: 7 October 2026

## Verified evidence
- Gmail notification threads contain SQL injection probes (PG_SLEEP, WAITFOR DELAY, DBMS_PIPE) and the scanner marker pHqghUme, not ordinary enquiries.
- Read-only Supabase audit, 6 October 23:30 to 7 October 07:30 IST: 5,586 saved rows, of which 5,585 match the scanner email/marker. All identified scanner rows occurred during the 01:00 IST hour; first saved row at 01:03:42. The remaining row must not be treated as spam automatically.
- Cloudflare last-24-hour analytics: approximately 6,800 form-endpoint requests from 92.255.57.7; approximately 272,400 requests from this IP across the site. Cloudflare labels its network location United States, which does not establish the operator's physical location or identity.
- No retrospective per-row IP link is possible: historical form records do not contain a trusted source IP. The time, volume and single-source concentration strongly support this source attribution, not a record-by-record proof.
- None of the identified scanner rows populated the honeypot. Only 511 included elapsed-time data. The existing timing/honeypot checks could be bypassed by omitting these optional browser fields.
- The handler inserts JSON through Supabase REST, not interpolated SQL. Notification HTML escapes submitted values. The probes being saved/emailed are not themselves evidence of successful SQL execution or compromise; this is not a complete forensic clearance.

## Containment
- Temporarily reject the verified source IP before OpenNext rendering, expiring 21 October UTC.
- Cloudflare Worker binding: 30 POST attempts per source IP per 60 seconds across lead-intake routes. This is deliberately generous for shared networks and does not apply to normal page views or search crawlers. Cloudflare counters are location-local/eventually consistent, not a global hard quota.
- Reject unrelated browser origins and oversized declared bodies on those intake routes. Missing Origin headers remain compatible; this is not an authentication mechanism.
- Main contact/vendor/project intake rejects reserved example/test email domains, known scanner markers and narrow SQL/XSS probes in identity/context fields before database writes or email notifications. Free-text security enquiries are not keyword-blocked.
- Retain direct contact@fluidrwa.com email access and existing form error handling. No site-wide challenge, country block, compulsory CAPTCHA or form redesign.

## Limitations and next steps
- This reduces the observed abuse, but cannot promise that all future bots will be stopped. An attacker can rotate IPs and change payloads.
- If clean-looking distributed abuse continues, add managed Cloudflare Turnstile to intake forms with mandatory server-side token validation; do not rely on browser-only checks.
- Preserve historical emails and database records as evidence. Do not delete the attack batch or the unmatched row without explicit approval; use a reversible spam classification if cleanup is approved.
- API request volume is not human traffic. GA4 and Search Console cannot identify every direct API probe, and Google security reports lag.
- Read-only Google checks during the incident investigation: the FluidRWA GA4 Today card displayed 19 active users and 73 events, not thousands of visitors; the FluidRWA Search Console Security issues report displayed "No issues detected". Neither is a forensic guarantee.
- No private lead addresses, credentials or full submitted payloads are included in this report.
