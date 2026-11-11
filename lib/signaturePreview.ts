export const signaturePlacementLabel = "Signature Listing";

const previewLabel = `<p class="signature-placement-label">${signaturePlacementLabel}</p>`;

export function addSignaturePreview(file: string, html: string) {
  if (!/^vendors\/[^/]+\/index\.html$/.test(file)) return html;

  const card = /<article class="(?:bc-company-card|bc-provider-card|vc-firm-card)\b[^>]*>/;
  if (card.test(html)) {
    return html.replace(card, (tag) => tag.replace('class="', 'class="signature-placement-preview ') + previewLabel);
  }

  if (html.includes('<table class="ai-vendor-table">')) {
    return html.replace(/(<table class="ai-vendor-table">[\s\S]*?<tbody>\s*)<tr(\s[^>]*>\s*<td\b[^>]*>)/,
      (_match, before: string, row: string) =>
        `${before}<tr class="signature-placement-preview"${row}${previewLabel}`);
  }

  if (!/^vendors\/(?:family-offices|broker-dealers)\//.test(file)) return html;
  return html.replace(/(<tbody\b[^>]*>\s*)<tr(\s[^>]*>\s*<td\b[^>]*>[\s\S]*?<\/td>\s*<td\b[^>]*>)/,
    (_match, before: string, row: string) =>
      `${before}<tr class="signature-placement-preview"${row}${previewLabel}`);
}
