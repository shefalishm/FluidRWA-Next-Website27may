import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const esc = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const decodeEntities = (value = "") =>
  String(value)
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

const stripTags = (value = "") => decodeEntities(value.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim());

const requestHref = (vendor, category = "", source = "vendor-directory") => {
  const params = new URLSearchParams();
  if (vendor) params.set("vendor", vendor);
  if (category) params.set("category", category);
  params.set("source", source);
  return `/submit-requirement?${params.toString()}`;
};

const walkHtml = (dir) => {
  if (!fs.existsSync(dir)) return [];
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...walkHtml(full));
    if (entry.isFile() && entry.name.endsWith(".html")) results.push(full);
  }
  return results;
};

let updated = 0;

for (const file of walkHtml(path.join(root, "fluidrwa"))) {
  let html = fs.readFileSync(file, "utf8");
  const before = html;
  const name = stripTags(html.match(/<h1>([\s\S]*?)\s+Vendor Profile<\/h1>/)?.[1] || "");
  const category = stripTags(html.match(/<aside class="company-logo-card">[\s\S]*?<p class="company-kicker">([\s\S]*?)<\/p>/)?.[1] || "");
  const href = esc(requestHref(name, category, "company-profile"));

  html = html.replace(
    /<a class="company-btn primary" href="https?:\/\/[^"]+" target="_blank" rel="noopener noreferrer nofollow">Visit Website<\/a>/g,
    `<a class="company-btn primary" href="${href}">Request Intro</a>`,
  );
  html = html.replace(
    /Official source used: <a href="https?:\/\/[^"]+" target="_blank" rel="noopener noreferrer nofollow">([\s\S]*?)<\/a>/g,
    (_match, label) => `Official source used: ${label}`,
  );

  if (html !== before) {
    fs.writeFileSync(file, html);
    updated += 1;
  }
}

for (const file of walkHtml(path.join(root, "vendors"))) {
  let html = fs.readFileSync(file, "utf8");
  const before = html;
  const category = stripTags(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] || path.basename(path.dirname(file)));

  html = html.replace(/<tr([^>]*)>([\s\S]*?)<\/tr>/g, (rowMatch, attrs, rowBody) => {
    const vendor = stripTags(rowBody.match(/<strong[^>]*>([\s\S]*?)<\/strong>/)?.[1] || "");
    if (!vendor) return rowMatch;
    const href = esc(requestHref(vendor, category, "vendor-table"));
    const nextBody = rowBody.replace(
      /<a href="https?:\/\/[^"]+" target="_blank" rel="noopener noreferrer nofollow">Official website<\/a>/g,
      `<a href="${href}">Request intro</a>`,
    );
    return `<tr${attrs}>${nextBody}</tr>`;
  });

  html = html.replace(/<article([^>]*class="[^"]*(?:bc-company-card|vc-firm-card)[^"]*"[^>]*)>([\s\S]*?)<\/article>/g, (cardMatch, attrs, body) => {
    const vendor = stripTags(body.match(/<h3[^>]*>([\s\S]*?)<\/h3>/)?.[1] || "");
    if (!vendor) return cardMatch;
    const href = esc(requestHref(vendor, category, "vendor-card"));
    const nextBody = body
      .replace(/<a[^>]*href="https?:\/\/[^"]+"[^>]*>Visit Website<\/a>/g, `<a href="${href}">Request Intro</a>`)
      .replace(/<a[^>]*href="https?:\/\/[^"]+"[^>]*>Visit firm website<\/a>/g, `<a href="${href}">Request intro</a>`);
    return `<article${attrs}>${nextBody}</article>`;
  });

  if (html !== before) {
    fs.writeFileSync(file, html);
    updated += 1;
  }
}

console.log(`Routed vendor inquiry CTAs on ${updated} pages.`);
