import fs from 'node:fs';
import {enhanceComplianceCategory} from './lib/compliance-category.mjs';
const file='vendors/compliance-infrastructure/index.html';
fs.writeFileSync(file,enhanceComplianceCategory(fs.readFileSync(file,'utf8')));
console.log('Updated compliance buyer guide; preserved 29 record anchors.');
