# Selective form-page protection, 23 October 2026

Rule: `Form pages: unverified legacy Chrome cloud traffic`

Cloudflare custom rule ID: `bdc24960a57545b29af050c874179184`.
Action: Managed Challenge. Active status verified in the dashboard.

```text
(http.request.method eq "GET" and http.request.uri.path in {"/submit-requirement" "/vendor-membership" "/apply-as-vendor" "/contact"} and ip.src.asnum eq 132203 and http.user_agent contains "Chrome/105.0.0.0" and not cf.client.bot)
```

Basis: the inspected 20 October security sample contained form-page requests
from multiple Tencent-network addresses advertising this obsolete Chrome version,
without a verified-bot classification. This is a suspicious pattern, not proof
that every matching visitor is malicious. A managed challenge is preferable to
blocking everyone from a country or network. Verified bots are explicitly excluded;
article pages, ordinary browsers and POST requests are outside this rule.

The Worker retains form-only rate limiting, origin checks and server-side spam
controls. This rule does not guarantee that no future spam can arrive. Monitor
challenge events and genuine lead delivery. Disable this named rule if genuine
customers encounter unexpected challenges; do not turn off all security rules.

Cloudflare HTTP request totals include bots, assets and tests; they are not users,
citations or form submissions. Correct malformed-path 404s are not an outage.
