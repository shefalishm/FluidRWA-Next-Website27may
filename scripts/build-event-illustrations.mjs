import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const source = process.argv[2];
if (!source) throw new Error("Pass the generated illustration atlas path");
const names = ["mumbai", "london", "dubai", "zurich", "hong-kong", "miami", "new-york", "singapore", "cannes", "amsterdam", "ai", "capital"];
const { width, height } = await sharp(source).metadata();
const output = "public/assets/events";
fs.mkdirSync(output, { recursive: true });
for (const [index, name] of names.entries()) {
  const left = Math.round(index % 4 * width / 4);
  const top = Math.round(Math.floor(index / 4) * height / 3);
  const right = Math.round((index % 4 + 1) * width / 4);
  const bottom = Math.round((Math.floor(index / 4) + 1) * height / 3);
  const file = path.join(output, `${name}.webp`);
  await sharp(source).extract({ left: left + 2, top: top + 2, width: right - left - 4, height: bottom - top - 4 }).resize(480, 270, { fit: "cover" }).webp({ quality: 76 }).toFile(file);
  console.log(`${file}: ${fs.statSync(file).size} bytes`);
}
