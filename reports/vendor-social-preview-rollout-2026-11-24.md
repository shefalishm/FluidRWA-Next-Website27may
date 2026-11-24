# Vendor-category sharing images

Scope: all 48 canonical vendorSlugs in lib/routes.ts plus Web3 and AI directory hubs. The homepage image and article previews remain unchanged. No on-page page design or content changes.

The user-approved legal-category image established the blue glass architecture, FluidRWA branding, pale readable text area and gold accent. A text-free master was generated from that approved image. A reusable native typography template assigns exact category titles using data/vendor-social-previews.json. The master is retained in assets/social/vendor-glass-master-v1.png; build-vendor-social-previews.mjs produces versioned JPEGs in the root and public asset trees. Exact dimensions, font sizes and byte counts are in vendor-social-previews-2026-11-24.json.

All 50 images are 1200x630 JPEGs. Largest file: 119,815 bytes. Labels use at least 48px type and are measured before rendering. Preview metadata does not insert these images into page layouts; image loading is for social/link consumers. Versioned filenames prevent reuse of old image URLs. Social platforms may still retain an old page-card cache until they recrawl.

legacyMetadata uses the category-specific image and descriptive title-bearing alt text for both Open Graph and Twitter. The source verification step checks complete canonical category coverage, dimensions, compression limits and mirrored file equality. Optional origin verification checks all page responses, image metadata, alt labels and actual served image bytes.

Local verification passed for all 48 category routes, both hubs and all 50 image assets. Homepage and blog paths receive no new category-preview mapping. No credentials, routing, D1 bindings, lead capture or vendor status data changed.
