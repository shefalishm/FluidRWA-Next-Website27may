import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const cards = fs.readFileSync(path.join(root, "blog.html"), "utf8");
const images = [...cards.matchAll(/<a class="blog-card"[^>]*><img\s+([^>]+)>/g)].map((match) => {
  const src = match[1].match(/\bsrc="([^"]+)"/)?.[1];
  const alt = match[1].match(/\balt="([^"]+)"/)?.[1];
  return { src, alt };
});

assert.ok(images.length > 200, "Blog card count is unexpectedly low");
assert.equal(new Set(images.map(({ src }) => src)).size, images.length, "Blog card images must be unique");

for (const { src, alt } of images) {
  const reportCover = src === "/assets/blog-images/asset-tokenization-2026-100-questions-answered.svg";
  assert.ok(reportCover || (src?.startsWith("/assets/blog-thumbnails/") && src.endsWith(".webp")), `Unexpected preview: ${src}`);
  assert.ok(alt?.includes("FluidRWA") && alt.length >= 30, `Missing descriptive FluidRWA alt text: ${src}`);
  const file = path.join(root, src.slice(1));
  assert.ok(fs.existsSync(file), `Missing preview image: ${src}`);
  if (!reportCover) assert.ok(fs.statSync(file).size <= 80 * 1024, `Preview image exceeds 80 KiB: ${src}`);
}

console.log(`${images.length} unique blog previews have descriptive alt text; non-report WebP files are at or below 80 KiB.`);
