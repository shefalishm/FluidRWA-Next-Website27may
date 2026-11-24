import assert from 'node:assert/strict';
import fs from 'node:fs';
import sharp from 'sharp';
import ts from 'typescript';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {parse}=require('next/dist/compiled/node-html-parser');
const categories=JSON.parse(fs.readFileSync('data/vendor-social-previews.json','utf8'));
const source=ts.createSourceFile('routes.ts',fs.readFileSync('lib/routes.ts','utf8'),ts.ScriptTarget.Latest,true);
let slugs=[];
function walk(n){if(ts.isVariableDeclaration(n)&&n.name.getText(source)==='vendorSlugs'){let init=n.initializer;while(ts.isAsExpression(init))init=init.expression;slugs=init.elements.map(x=>x.text);}ts.forEachChild(n,walk);}
walk(source);
assert.ok(slugs.length>=48);
for(const slug of slugs)assert.ok(categories[slug],`Missing category ${slug}`);
assert.equal(Object.keys(categories).length,slugs.length+2);
const origin=process.argv[2];
for(const [slug,lines] of Object.entries(categories)){
 const image=`/assets/social/vendor-categories/${slug}-glass-v1.jpg`;
 const bytes=fs.readFileSync(`public${image}`);
 assert.ok(bytes.equals(fs.readFileSync(image.slice(1))));
 const m=await sharp(bytes).metadata();
 assert.equal(m.width,1200);assert.equal(m.height,630);assert.equal(m.format,'jpeg');assert.ok(bytes.length<220*1024);
 if(origin){
  const route=slugs.includes(slug)?`/vendors/${slug}`:`/${slug}`;
  const res=await fetch(new URL(route,origin),{signal:AbortSignal.timeout(30000)});
  assert.equal(res.status,200,route);
  const html=parse(await res.text());
  const expected=`https://www.fluidrwa.com${image}`;
  assert.equal(html.querySelector('meta[property="og:image"]')?.getAttribute('content'),expected,route);
  assert.equal(html.querySelector('meta[name="twitter:image"]')?.getAttribute('content'),expected,route);
  assert.ok(html.querySelector('meta[property="og:image:alt"]')?.getAttribute('content').includes(lines.join(' ')),route);
  const asset=await fetch(new URL(image,origin),{signal:AbortSignal.timeout(30000)});
  assert.equal(asset.status,200,image);
  assert.ok(Buffer.from(await asset.arrayBuffer()).equals(bytes),image);
 }
}
console.log(`PASS: ${slugs.length} categories and 2 hubs; matching OG/Twitter images, descriptive category alt text, 1200x630 JPEGs under 220 KiB${origin?'; all live routes and image bytes verified':''}.`);
