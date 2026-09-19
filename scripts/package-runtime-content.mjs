import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const files = {};
function collect(relative) {
  const full = path.join(root, relative);
  if (!fs.existsSync(full)) return;
  if (fs.statSync(full).isDirectory()) {
    for (const name of fs.readdirSync(full)) collect(path.join(relative, name));
  } else if (/\.(html|md)$/.test(relative) || relative === 'data/company-profiles.json' || relative === 'llms.txt') {
    files[relative.split(path.sep).join('/')] = fs.readFileSync(full, 'utf8');
  }
}
for (const name of fs.readdirSync(root).filter(name => name.endsWith('.html'))) collect(name);
for (const name of ['vendors', 'blog', 'fluidrwa', 'industries', 'content/blog', 'data/company-profiles.json', 'llms.txt']) collect(name);
fs.writeFileSync(path.join(root, 'lib/runtime-content.json'), JSON.stringify(files));
console.log(`Packaged ${Object.keys(files).length} content files`);
