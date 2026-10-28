import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const assets = [
  ["crypto-pr-october29", "photo-1478737270239-2f02b77fc618", "chainwire-vs-marketacross-vs-wachsman-crypto-pr", "FluidRWA crypto PR comparison: studio microphone illustrating media production, not a vendor event"],
  ["web3-campaigns-october29", "photo-1769798643237-8642a3fbe5bc", "galxe-vs-zealy-vs-layer3-web3-campaigns", "FluidRWA Web3 campaign comparison: conference audience, illustrative and not a Galxe, Zealy or Layer3 event"],
  ["document-verification-october29", "photo-1553697388-94e804e2f0f6", "regula-vs-incode-vs-jumio-document-verification", "FluidRWA document verification comparison: a person holding passports, an illustrative identity-document photograph"],
  ["gilt-settlement-october29", "photo-1513635269975-59663e0ac1ad", null, "Illustrative London skyline, not a photograph of the Lloyds and Archax transaction"],
  ["watch-passport-october29", "photo-1524805444758-089113d48a6d", null, "Illustrative wristwatch, not a verified Breitling product photograph"]
];
const mappingPath = path.join(root, "data/blog-card-previews.json");
const mapping = JSON.parse(fs.readFileSync(mappingPath, "utf8"));
const records = [];
for (const [name, photo, slug, alt] of assets) {
  const source = `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=1200&q=85`;
  const response = await fetch(source);
  if (!response.ok || !response.headers.get("content-type")?.startsWith("image/")) throw new Error(`Image failed: ${source}`);
  const input = Buffer.from(await response.arrayBuffer());
  let quality = 78;
  let output;
  do { output = await sharp(input).resize(1200, 630, { fit: "cover" }).webp({ quality }).toBuffer(); quality -= 5; } while (output.length > 80 * 1024 && quality >= 23);
  if (output.length > 80 * 1024) throw new Error(`Oversized image: ${name}`);
  const src = `/assets/blog-thumbnails/${name}.webp`;
  for (const prefix of ["", "public"]) {
    const destination = path.join(root, prefix, src.slice(1));
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, output);
  }
  if (slug) mapping[slug] = { src, alt };
  records.push({ name, source, src, bytes: output.length, width: 1200, height: 630, alt, use: "Illustrative editorial photograph; not evidence of the named implementation" });
}
fs.writeFileSync(mappingPath, `${JSON.stringify(mapping, null, 2)}\n`);
fs.mkdirSync(path.join(root, "reports"), { recursive: true });
fs.writeFileSync(path.join(root, "reports/october29-image-sources.json"), `${JSON.stringify(records, null, 2)}\n`);
console.log(records.map(({name,bytes})=>({name,bytes})));
