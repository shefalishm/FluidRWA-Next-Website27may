# Cloudflare standby deployment

## Production migration on September 19, 2026

- GoDaddy nameservers changed to `ajay.ns.cloudflare.com` and
  `surina.ns.cloudflare.com`; Cloudflare reports the zone as active.
- Production Worker routes cover `fluidrwa.com/*` and `www.fluidrwa.com/*`.
  The apex keeps its canonical redirect to `https://www.fluidrwa.com/`.
- The workers.dev preview remains `noindex`; production hostnames are indexable.
- All 480 sitemap URLs passed on the deployed Worker with zero failures.
- Mobile checks passed at 390px for the home page, vendor directory, use-case
  hub, new use cases and new comparison articles, with no overflow or broken images.
- Supabase capture and Resend notifications passed through both the preview and
  production hostname. Synthetic request IDs are recorded in the migration log.
- Google Workspace MX, SPF and DMARC records and the sending-domain MX record
  were verified after the nameserver change.
- Daily market-signal ingestion now runs on Cloudflare at `0 3 * * *` UTC.
- Existing Vercel DNS targets remain in the imported zone as an origin-level
  rollback path, while Worker routes serve production traffic.

## Status on September 17, 2026

- Cloudflare build passed for 559 routes with patched Next.js 16.3.5 and OpenNext 1.19.0.
- Dependency installation reported zero known vulnerabilities after updating Next,
  sharp and nanoid. These local changes have not been pushed to Vercel.
- Cloudflare authorization succeeded and the worker was deployed successfully.
- Deployment compressed worker size: 7,968.08 KiB; 928 asset files.
- Standby URL: https://fluidrwa-backup.fluidrwa-may-25-full-website.workers.dev
- Version: b0b7e326-a58b-433c-a299-80f92838b69a.
- HTTPS activated after initial propagation. The use-case hub returned HTTP 200
  with the expected `X-Robots-Tag: noindex, nofollow` header.
- Packaged 552 legacy content files into a build-time runtime snapshot to remove
  disk dependencies. Enabled catch-all runtime routing for OpenNext compatibility.
- Membership and tokenization-directory pages now return HTTP 200.
- Final full sitemap audit: all 473 URLs returned successful HTML responses.
  Initial industry-page failures were corrected before the final scan.
- Supabase runtime credentials configured securely. A synthetic enquiry saved
  successfully with request ID 67fb36b6-fea3-4399-b0b7-fdbff7ed68de.
- Email notification was skipped: no local email-provider credentials available.
- Mobile membership and tokenization-directory checks at 390px: no horizontal
  overflow or broken images. Membership screenshot reviewed.
- Local image requests serve original assets without paid image transformations.
- Persistent ISR caching, auth, payment callbacks, scheduled ingestion and email
  notifications still require a separate cutover review. Do not change DNS yet.
- Production DNS, Vercel settings and scheduled jobs were not changed.
- GoDaddy and Resend account access verified. Existing production notification
  deliveries are successful; the Resend domain is verified. New restricted
  sending-key creation is awaiting explicit user confirmation.
- Cloudflare free domain setup started without changing authoritative nameservers.
  Compared all 19 GoDaddy records: the automatic import found 15 transferable
  records, excluding the old NS/SOA and missing the Google SPF include record.
  Restored `dc-aa8e722993._spfm` with `v=spf1 include:_spf.google.com ~all`.
  Authoritative nameservers remain ns17.domaincontrol.com and ns18.domaincontrol.com.
  Do not activate until final record comparison and runtime checks are complete.

The wrapper adds a noindex header only on the workers.dev preview so the standby
does not compete in search. The production custom domain remains indexable when
it is attached after acceptance checks pass.

## Preparation

1. Sign in with `npx wrangler login`, then check `npx wrangler whoami`.
2. Build with `npx opennextjs-cloudflare build`.
3. Validate the worker with `npx wrangler deploy --dry-run`.
4. Review compressed worker size against the account's plan limits.
5. Configure required runtime secrets through Wrangler; never commit credentials.
6. Add persistent incremental caching before relying on ISR pages as a fallback.
7. Verify image optimization: the standby currently has no paid Images binding.
8. Deploy with `npx opennextjs-cloudflare deploy` only after those checks pass.

## Acceptance checks

Check home, membership, vendor categories, blog, all use cases, mobile layouts,
redirects, image loading, assessment and comparison tools, authentication,
and test form writes. Do not call the backup operational until submissions
and runtime integrations have been verified. Existing third-party storage
is not backed up by a hosting deployment.

## Failover

Before switching DNS, confirm runtime secrets, persistent caching, auth callback
allowlists and payment callback URLs. Move scheduled ingestion separately to
avoid duplicate execution. Remove the noindex wrapper only for the deployment
that will serve the production domain. Keep Vercel available for rollback.
