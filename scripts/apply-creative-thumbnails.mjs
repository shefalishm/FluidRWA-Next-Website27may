import fs from "node:fs";

const manifest = process.argv[2];
const version = process.argv[3];
if (!manifest || !/^\d{8}$/.test(version || "")) throw new Error("Pass manifest and eight-digit version.");
const rows = JSON.parse(fs.readFileSync(manifest, "utf8"));
const previewsPath = "data/blog-card-previews.json";
const previews = JSON.parse(fs.readFileSync(previewsPath, "utf8"));
for (const row of rows) {
  const file = `content/blog/${row.slug}.md`;
  const original = fs.readFileSync(file, "utf8");
  const match = original.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) throw new Error("Missing frontmatter: " + row.slug);
  let frontmatter = match[1];
  const title = JSON.parse(frontmatter.match(/^title: (.+)$/m)[1]);
  const image = `/assets/blog-thumbnails/${row.slug}-creative-${version}.webp`;
  const socialImage = `/assets/social/${row.slug}-creative-${version}.jpg`;
  const imageAlt = `FluidRWA: ${title}${/[.!?]$/.test(title) ? "" : "."} ${row.altDescription}`;
  for (const [key, value] of Object.entries({ image, imageAlt, socialImage, imageLocked: "true", socialImageLocked: "true" })) {
    const line = `${key}: ${JSON.stringify(value)}`;
    const field = new RegExp(`^${key}: .+$`, "m");
    frontmatter = field.test(frontmatter) ? frontmatter.replace(field, () => line) : frontmatter + "\n" + line;
  }
  fs.writeFileSync(file, original.replace(match[1], () => frontmatter));
  previews[row.slug] = { ...previews[row.slug], src: image, alt: imageAlt };
}
fs.writeFileSync(previewsPath, JSON.stringify(previews, null, 2) + "\n");
console.log(`Updated ${rows.length} article image references; article bodies and dates preserved.`);
