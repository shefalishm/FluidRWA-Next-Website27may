export const signaturePlacementLabel = "Signature Listing";

const previewLabel = `<p class="signature-placement-label">${signaturePlacementLabel}</p>`;

// Existing members and featured partners are not candidates for a Signature slot.
const excludedMemberIds = ["nowpayments", "nownodes", "minddeft", "surestack", "brandsessential", "lium", "golt"];

export function isSignatureCandidate(id: string) {
  const normalized = id.toLowerCase().replace(/[^a-z0-9]/g, "");
  return Boolean(normalized) && !excludedMemberIds.some((member) => normalized.startsWith(member));
}

function markFirstEligible(html: string, listings: RegExp, mark: (listing: string) => string) {
  let marked = false;
  return html.replace(listings, (listing) => {
    const id = listing.match(/^[^>]*\bid="([^"]+)"/)?.[1] || "";
    if (marked || !isSignatureCandidate(id)) return listing;
    marked = true;
    return mark(listing);
  });
}

export function addSignaturePreview(file: string, html: string) {
  if (!/^vendors\/[^/]+\/index\.html$/.test(file)) return html;

  const card = /<article class="(?:bc-company-card|bc-provider-card|vc-firm-card)\b[^>]*>/g;
  if (card.test(html)) {
    return markFirstEligible(html, card, (tag) => tag.replace('class="', 'class="signature-placement-preview ') + previewLabel);
  }

  const isAi = html.includes('<table class="ai-vendor-table">');
  if (!isAi && !/^vendors\/(?:family-offices|broker-dealers)\//.test(file)) return html;
  return html.replace(/(<tbody\b[^>]*>)([\s\S]*?)(<\/tbody>)/, (_match, start: string, body: string, end: string) => {
    const rows = /<tr\b[^>]*>[\s\S]*?<\/tr>/g;
    return start + markFirstEligible(body, rows, (row) => {
      const target = isAi ? /<td\b[^>]*>/ : /<\/td>\s*<td\b[^>]*>/;
      return row.replace(/^<tr\b[^>]*>/, (tag) => tag.includes('class="')
        ? tag.replace('class="', 'class="signature-placement-preview ')
        : tag.replace("<tr", '<tr class="signature-placement-preview"'))
        .replace(target, (cell) => cell + previewLabel);
    }) + end;
  });
}
