import assert from "node:assert/strict";
import fs from "node:fs";
import sharp from "sharp";

const batch = JSON.parse(fs.readFileSync(process.argv[2] || "data/creative-thumbnails-2026-11-19.json"));
const previews = JSON.parse(fs.readFileSync("data/blog-card-previews.json"));
const index = fs.readFileSync("blog.html", "utf8");
for (const { slug } of batch) {
  const source = fs.readFileSync("content/blog/" + slug + ".md", "utf8");
  const field = (key) => JSON.parse(source.match(new RegExp("^" + key + ": (.+)$", "m"))[1]);
  const title = field("title");
  const preview = previews[slug];
  assert.equal(preview.src, field("image"));
  assert.equal(preview.alt, field("imageAlt"));
  assert.ok(preview.alt.includes("FluidRWA") && preview.alt.includes(title), slug);
  assert.equal(field("imageLocked"), "true");
  assert.equal(field("socialImageLocked"), "true");
  const card = index.match(new RegExp('<a class="blog-card"[^>]*href="/blog/' + slug + '">([\\s\\S]*?)</a>'))?.[1];
  assert.ok(card?.includes(preview.src), "Wrong rendered card: " + slug);
  const html = fs.readFileSync("blog/" + slug + "/index.html", "utf8");
  assert.ok(html.includes(field("socialImage")), "Wrong social preview: " + slug);
  for (const key of ["image", "socialImage"]) {
    const relative = field(key).slice(1);
    assert.deepEqual(fs.readFileSync(relative), fs.readFileSync("public/" + relative));
    const meta = await sharp(relative).metadata();
    assert.equal(meta.width, 1200);
    assert.equal(meta.height, key === "image" ? 675 : 630);
  }
  assert.ok(fs.statSync(preview.src.slice(1)).size < 81920);
}
console.log(`PASS: all ${batch.length} rendered cards, article and FluidRWA alt text, compression, dimensions, social images, asset parity and image locks.`);
