# Creative thumbnail replacement: November 20, 2026

## Scope

Replace the 23 old-style images identified in the user's supplied article list. Each article receives distinct generated editorial artwork, a versioned WebP thumbnail and a separate JPEG social preview. No article bodies, publication dates, review dates, navigation, routes or Worker configuration are changed by this image batch.

The exact article inventory, original generated-image filenames and visual concepts are preserved in `data/creative-thumbnails-2026-11-20.json`.

## Image requirements

- Blog thumbnail: 1200 x 675 WebP, strictly below 81,920 bytes.
- Social preview: 1200 x 630 JPEG, independently compressed and mirrored into public assets.
- Alt text: FluidRWA, the exact article title and a concise visual description. This is accessibility text, not an assertion that alt text causes citations.
- Both image locks remain enabled so generic asset generators do not replace approved artwork.
- New versioned paths avoid reusing cached old-image URLs.
- Article body and all date fields remain unchanged.

## Reproduction and verification

Run `scripts/build-creative-thumbnails-2026-11-19.mjs` with the source directory, this batch's manifest and version `20261120`. Apply references with `scripts/apply-creative-thumbnails.mjs`, then refresh the selected article pages and blog index.

Run `node scripts/test-creative-thumbnails.mjs data/creative-thumbnails-2026-11-20.json` and `node scripts/verify-blog-previews.mjs`. Inspect the generated contact sheet and actual blog cards before production publication. Asset-size checks establish an image payload budget, not a measured improvement in Core Web Vitals.
