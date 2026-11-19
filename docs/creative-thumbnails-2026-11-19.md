# Creative editorial thumbnails

Ten approved bitmap illustrations replace generic workflow graphics on the three November 9 comparisons and seven November 19 articles. The article text and reporting dates are unchanged.

## Art Direction And Prompt Set

Each illustration was generated individually as a landscape editorial image, without article titles, vendor logos, generic dashboards, status bars or decorative node networks. Concepts and original filenames are recorded in data/creative-thumbnails-2026-11-19.json.

- Real estate offering: architectural model with translucent modular storeys above blueprints and legal documents; teal, coral and ivory; tactile premium 3D.
- Property investor rights: interlocking townhouse sections, title deed, key and a glass ownership fragment held by a hand; cobalt, mint and coral.
- Gold redemption: a physical gold bar passed through a vault aperture into white-gloved hands; forest green, gold and brushed silver. Conceptual, not reserve evidence.
- Tax audit evidence: papercraft binder and receipt ribbons, magnifying glass over a coral exception, mint calculator; indigo, coral and mint.
- Crypto execution: three sculptural routes, a stepped glass ladder, direct brass bridge and cobalt conveyor, leading to a settlement vault.
- Ongoing KYC: hand-painted editorial analyst comparing translucent silhouette identity records beside investor documents; emerald, rose and ivory; fictional people.
- On-ramp failures: miniature payment conveyor, held package, hourglass inspection gate and coral refund return chute; cobalt, copper and emerald.
- Wallet policy: precision cutaway glass vault, opposed keys and interlocking gears with a separately sealed recovery key; titanium, brass, emerald and coral.
- Screening: fictional archive of silhouette records examined through optical lenses, with a coral file selected for human review; petrol blue, sage and coral.
- AI research APIs: mechanical arm retrieving a page from a sculptural folded-paper library, accompanied by compass and prism; cobalt, coral, white and emerald.

## Delivery And Safeguards

Versioned assets end in -creative-20261119. Blog thumbnails are 1200 x 675 WebP, strictly under 80 KiB. Social images are separate 1200 x 630 optimized JPEGs. Both assets and public/assets contain identical copies.

Every alt text contains FluidRWA, the exact article title and a description of the conceptual illustration. Existing imageLocked and new socialImageLocked flags protect these choices from generic image generators. The obsolete three-comparison card override has been removed.

Do not use generic workflow templates for future editorial thumbnails. Create article-specific artwork, review it at thumbnail size, optimize it and set both locks.

To reproduce compression from approved PNG originals, run:

```sh
node scripts/build-creative-thumbnails-2026-11-19.mjs /path/to/approved-originals
```
