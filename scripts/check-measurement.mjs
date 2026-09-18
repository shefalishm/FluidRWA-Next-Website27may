import vm from 'node:vm';
import fs from 'node:fs';
import assert from 'node:assert/strict';

const source = fs.readFileSync(new URL('../public/assets/measurement.js', import.meta.url), 'utf8');
const storage = new Map();
function boot(search) {
  const listeners = {};
  const window = {location: {search, pathname: '/blog/example', origin: 'https://www.fluidrwa.com'}};
  vm.runInNewContext(source, {window, URL, URLSearchParams, Set, WeakSet,
    sessionStorage: {getItem: key => storage.get(key), setItem: (key, value) => storage.set(key, value)},
    document: {addEventListener: (name, fn) => {listeners[name] = fn;}}});
  return {window, listeners};
}
boot('?utm_source=linkedin&utm_medium=organic_social&utm_campaign=september&utm_content=post');
const {window, listeners} = boot('');
const formData = new FormData();
listeners.formdata({formData});
assert.equal(formData.get('ATTRIBUTION_UTM_SOURCE'), 'linkedin');
assert.equal(formData.get('ATTRIBUTION_UTM_CONTENT'), 'post');
const clean = window.fluidRwaSanitizeAnalytics({contactEmail: 'private@example.com', link_text: 'private@example.com', link_url: 'https://vendor.com/path?email=private@example.com', form_type: 'project'});
assert.equal(clean.contactEmail, undefined);
assert.equal(clean.link_text, undefined);
assert.equal(clean.link_url, 'https://vendor.com/path');
assert.equal(clean.form_type, 'project');
boot('?utm_source=newsletter&utm_medium=email&utm_campaign=weekly');
assert.equal(JSON.parse([...storage.values()][0]).utm_content, undefined);
console.log('PASS: campaign persistence, form attribution, new campaign replacement, analytics privacy');
