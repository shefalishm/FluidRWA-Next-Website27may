const base = 'https://fluidrwa-backup.fluidrwa-may-25-full-website.workers.dev';
const response = await fetch(`${base}/sitemap.xml`);
if (!response.ok) throw new Error(`Sitemap returned ${response.status}`);
const sitemap = await response.text();
const paths = [...new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1]).pathname))];
if (paths.length < 100) throw new Error(`Unexpected sitemap size: ${paths.length}`);
const failures = [];
let cursor = 0;
let checked = 0;
async function check() {
  while (cursor < paths.length) {
    const path = paths[cursor++];
    try {
      const result = await fetch(`${base}${path}`, { signal: AbortSignal.timeout(30000) });
      const html = await result.text();
      if (!result.ok || !html.includes('<main')) failures.push({ path, status: result.status });
    } catch (error) { failures.push({ path, error: error.message }); }
    if (++checked % 50 === 0) console.log(`Checked ${checked}/${paths.length}`);
  }
}
await Promise.all(Array.from({ length: 4 }, check));
console.log(JSON.stringify({ checked, failures }, null, 2));
process.exitCode = failures.length ? 1 : 0;
