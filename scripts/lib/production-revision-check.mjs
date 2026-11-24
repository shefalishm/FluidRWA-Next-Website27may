export const revisionFromHtml = html => html.match(/data-fluidrwa-build="([^"]+)"/)?.[1] || null;

export async function fetchProductionPage(url, {
  fetchResponse,
  expectedRevision,
  attempts = 7,
  delayMs = 5000,
  sleep = ms => new Promise(resolve => setTimeout(resolve, ms)),
  onStale = () => {}
}) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const response = await fetchResponse(url);
    const html = await response.text();
    const revision = revisionFromHtml(html);
    // Only allow rollout time for successful HTML. Never accept a stale revision.
    if (!response.ok || !expectedRevision || revision === expectedRevision || attempt === attempts) {
      return { response, html, revision };
    }
    onStale({ url, revision, attempt, attempts });
    await sleep(delayMs);
  }
}
