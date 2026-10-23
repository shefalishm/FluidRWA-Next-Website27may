# Fund comparison release, 23 October 2026

## Scope

The overview now prioritizes documented fund responsibilities and the buyer's
research path. Contract supply, valuation snapshots and the 1,743-entry
identification registry remain available in separate views. No registry or
research observations were removed or assigned new verification dates.

`/network-explorer/fund-comparison` uses the frozen `2026-10-v1` 20-product research
edition checked 21 October. It is not the broader operating map's 23-product
cohort. The table, mobile view, selected CSV, complete CSV/JSON and fixed PNGs
derive from that same edition. The fixed PNGs illustrate FOBXX, Spiko USTBL and
WTGXX; they do not change with user selections. The selected-fund CSV does.

The shared source file is `lib/fund-comparison.ts`. The download/API endpoint is
`/api/network-explorer/v1/fund-comparison`; optional `funds` uses one to twenty
valid distinct IDs and `format` accepts json or csv. CSV has an attachment header.
No API authentication, billing or new database is introduced.

## Counts and names

Provider footprint is alphabetical, by one selected role, counting each product
once per provider. It is not a market-share, AUM or quality ranking. Four Spiko
sub-funds are four products under shared appointments, not four mandates.
The underlying fund is not counted as an additional appointment for its feeder.

BNY and Anchorage source-name variants have explicit display groups. Source names
and exact duties remain visible. Grouping does not resolve contracting legal
entities. CACEIS Bank/Administration and Superstate Services/Advisers remain
separate; unresolved NAV names are not silently merged. The coverage API retains
the existing `relationshipProviders` field as a raw source-label count and adds
`providerNameGroups` with explicit definitions. The operating-map heading no
longer calls raw labels unique organizations.

## Commercial paths

Research/shortlist enquiries preserve selected fund examples and responsibility
in existing form parameters. Contact email stays visible. No additional required
fields, promises of introductions, automatic charges, paid research ranking,
trust score or lead resale are introduced. Vendors can submit evidence or follow
a separate listing-application path. Any bespoke research fee requires a separate
agreement by email; research inclusion is not purchased.

## Readability and citation

Mobile comparison uses stacked responsibility rows, not a wide table. Every
claim has its source, original publication date when known, review date and
scope. Unknown roles stay unresolved. Dataset metadata identifies the edition,
sources, variables and downloads; the citation refers to the sample, not the
whole market. No blanket third-party content licence is applied.

## Supply initial HTML

`scripts/capture-supply-page-snapshot.mjs` saves dated readings from FluidRWA's
existing public API. It does not create new chain readings, change their block
timestamps or reverify issuer contract documentation. The initial rendered page
includes these saved observations, then refreshes from the existing live feed.
If refresh fails, the dated fallback remains with a warning. Current-day labels
are evaluated in the browser rather than frozen into tomorrow's HTML.

## Release checks

`npm run verify:source` now verifies regenerated PNG/CSV/JSON assets and runs
`scripts/test-fund-comparison.mjs`. Unit checks cover sample denominators,
unknowns, exact source dates, CSV parity, grouping boundaries, API input rejection,
contextual enquiry parameters and preserved supply dates. Production verification
includes the overview, comparison, asset observations and registry routes.

After publishing check the expected build revision. Cloudflare's cached HTML may
require a cache purge before all paths show a new revision. Do not mark a release
complete until the expected revision and live downloads have passed.
