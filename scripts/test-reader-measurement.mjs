import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const listeners = new Map();
const events = [];
let articleTop = 200;
const location = { origin: 'https://www.fluidrwa.com', pathname: '/blog/example', search: '', href: 'https://www.fluidrwa.com/blog/example' };
const on = (name, fn) => listeners.set(name, fn);
const window = { location, innerHeight: 800, addEventListener: on, fluidRwaTrackEvent: (name, params) => events.push({ name, params }) };
const document = {
  visibilityState: 'visible', addEventListener: on,
  querySelector: () => ({ getBoundingClientRect: () => ({ top: articleTop, height: 2000 }) })
};
const context = { window, document, URL, URLSearchParams, Set, sessionStorage: { getItem: () => null, setItem() {} } };
const source = fs.readFileSync('public/assets/measurement.js', 'utf8');
vm.runInNewContext(source, context);
const scroll = () => listeners.get('scroll')();
scroll(); scroll();
assert.deepEqual(events.map(e => e.params.percent_scrolled), [25]);
articleTop = -1200; scroll(); scroll();
assert.deepEqual(events.map(e => e.params.percent_scrolled), [25, 50, 75, 90]);
document.visibilityState = 'hidden'; listeners.get('fluidrwa:page-view')(); scroll();
assert.equal(events.length, 4, 'Hidden tabs do not produce depth events');
document.visibilityState = 'visible';
location.pathname = '/vendor-membership'; scroll();
assert.equal(events.length, 4, 'Only articles produce depth events');
location.pathname = '/blog/other'; location.href = location.origin + location.pathname;
articleTop = 200; listeners.get('fluidrwa:page-view')(); scroll();
assert.equal(events.at(-1).params.article_slug, 'other');
location.pathname = '/blog/example'; listeners.get('fluidrwa:page-view')(); scroll();
assert.equal(events.length, 6, 'Return navigation starts a new article view');
vm.runInNewContext(source, context);
scroll(); assert.equal(events.length, 6, 'Reinstalling measurement cannot add listeners');

const click = href => listeners.get('click')({ target: { closest: () => ({ getAttribute: () => href }) } });
click('/vendors/tokenization-platforms/?source=article');
assert.equal(events.at(-1).name, 'directory_click');
assert.equal(events.at(-1).params.directory_path, '/vendors/tokenization-platforms');
const before = events.length;
click('https://external.test/vendors/example');
assert.equal(events.length, before, 'External links are not directory clicks');
click('/submit-requirement/?source=article&email=private@example.com');
assert.equal(events.at(-1).name, 'enquiry_cta_click');
assert.equal(events.length, before + 1, 'One click, one intent event');
assert.equal(events.at(-1).params.link_url.includes('?'), false);
click('mailto:contact@fluidrwa.com?subject=Private%20question');
assert.equal(events.at(-1).name, 'contact_email_click');
assert.equal(JSON.stringify(events).includes('Private'), false);
assert.equal(JSON.stringify(events).includes('private@example.com'), false);
assert.equal(events.some(e => e.name === 'generate_lead'), false, 'Reading and clicks are not leads');
assert.equal(window.fluidRwaSanitizeAnalytics({ percent_scrolled: 50, article_slug: 'example', campaign_source: 'vendor-card-contact' }).campaign_source, undefined);
console.log('PASS: article depth, per-view deduplication, hidden-tab exclusion, SPA returns, directory/enquiry/email clicks and privacy. No network requests.');
