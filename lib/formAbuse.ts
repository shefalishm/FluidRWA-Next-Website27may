// Temporary containment for the source verified against the October 7 incident.
const incidentIp = '92.255.57.7';
const incidentBlockUntil = Date.parse('2026-10-21T00:00:00Z');

export function blockedIncidentSource(request: Request, now = Date.now()) {
  return now < incidentBlockUntil && request.headers.get('cf-connecting-ip') === incidentIp;
}

export function formRequestRejection(request: Request) {
  if (blockedIncidentSource(request)) return 'incident_source';
  if (request.headers.get('sec-fetch-site') === 'cross-site') return 'cross_site';
  const origin = request.headers.get('origin');
  if (origin) {
    try {
      const incoming = new URL(request.url);
      const sender = new URL(origin);
      const productionHost = (host: string) => ['fluidrwa.com', 'www.fluidrwa.com'].includes(host);
      if (sender.origin !== incoming.origin && !(sender.protocol === 'https:' && productionHost(sender.hostname) && productionHost(incoming.hostname))) return 'cross_site';
    } catch {
      return 'invalid_origin';
    }
  }
  const size = Number(request.headers.get('content-length') || 0);
  if (size > 65536) return 'request_too_large';
  return null;
}

export function formPayloadRejection(payload: Record<string, unknown>) {
  const email = typeof payload.contactEmail === 'string' ? payload.contactEmail.trim().toLowerCase() : '';
  const domain = email.split('@')[1] || '';
  if (['example.com', 'example.net', 'example.org'].includes(domain) || /\.(invalid|test|localhost)$/.test(domain)) return 'non_deliverable_email';
  const identityKeys = ['firstName', 'lastName', 'companyName', 'title', 'phone', 'country', 'website', 'linkedin', 'source', 'requestSource', 'pageUrl', 'vendorName', 'vendorCategory'];
  // Inspect identity/context fields, not free-text project descriptions about security work.
  const probe = /pHqghUme|\b(?:pg_sleep|sleep|benchmark)\s*\(\s*\d|\bwaitfor\s+delay\b|\bdbms_pipe\s*\.|\bunion\s+(?:all\s+)?select\b|\b(?:select\s+\d+\s*\*\s*\d+)|<\s*(?:script|iframe)\b/i;
  for (const key of identityKeys) {
    const value = typeof payload[key] === 'string' ? payload[key] as string : '';
    if (probe.test(value)) return 'scanner_payload';
  }
  const limits: Record<string, number> = { firstName: 200, lastName: 200, companyName: 300, title: 300, contactEmail: 254, source: 200, requestSource: 200, phone: 100, country: 150, website: 2048, linkedin: 2048, pageUrl: 12000, projectDescription: 10000 };
  for (const [key, max] of Object.entries(limits)) {
    if (typeof payload[key] === 'string' && (payload[key] as string).length > max) return 'field_too_long';
  }
  return null;
}
