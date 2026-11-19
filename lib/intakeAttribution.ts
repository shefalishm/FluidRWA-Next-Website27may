const storageKey = "fluidrwa:campaign:v1";
const campaignNames = ["utm_source", "utm_medium", "utm_campaign", "utm_id", "utm_content", "utm_term", "utm_source_platform"];

export function captureIntakeAttribution(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  let campaign: Record<string, string> = {};
  try {
    const stored = JSON.parse(window.sessionStorage.getItem(storageKey) || "{}");
    if (stored && typeof stored === "object" && !Array.isArray(stored)) campaign = stored;
  } catch { /* Storage can be unavailable in private browsing. */ }
  if (campaignNames.some(name => params.has(name))) {
    campaign = {};
    for (const name of campaignNames) {
      const value = params.get(name)?.trim();
      if (value) campaign[name] = value.slice(0, 100);
    }
    campaign.landing_path = window.location.pathname;
  }
  const allowed = new Set([...campaignNames, "landing_path"]);
  campaign = Object.fromEntries(Object.entries(campaign).filter(([key, value]) =>
    allowed.has(key) && typeof value === "string" && !/[\w.+-]+@[\w.-]+\.[a-z]{2,}/i.test(value)
  ).map(([key, value]) => [key, value.slice(0, key === "landing_path" ? 500 : 100)]));
  try { window.sessionStorage.setItem(storageKey, JSON.stringify(campaign)); } catch { /* Submission must not depend on storage access. */ }
  return campaign;
}

export function appendIntakeAttribution(data: FormData) {
  for (const [name, value] of Object.entries(captureIntakeAttribution())) {
    data.set(`ATTRIBUTION_${name.toUpperCase()}`, value);
  }
}
