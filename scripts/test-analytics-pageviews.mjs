import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import ts from 'typescript';

const source = ts.transpileModule(fs.readFileSync('components/GoogleAnalytics.tsx', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX }
}).outputText;
const effects = [], refs = [], listeners = new Map();
let hook = 0, ref = 0, pathname = '/blog/example';
const context = {
  exports: {}, URL, URLSearchParams, Date, Event,
  location: { hostname: 'www.fluidrwa.com', pathname, href: 'https://www.fluidrwa.com/blog/example?email=private@example.com&utm_source=newsletter' },
  navigator: { userAgent: 'Normal browser', webdriver: false },
  localStorage: { getItem: () => null, setItem() {} },
  addEventListener(name, fn) { if (!listeners.has(name)) listeners.set(name, new Set()); listeners.get(name).add(fn); },
  removeEventListener(name, fn) { listeners.get(name)?.delete(fn); },
  dispatchEvent(event) { for (const fn of listeners.get(event.type) || []) fn(event); },
  require(name) {
    if (name === 'next/script') return { default: 'Script' };
    if (name === 'next/navigation') return { usePathname: () => pathname };
    if (name === 'react/jsx-runtime') return { Fragment: 'Fragment', jsx: (type, props) => ({ type, props }), jsxs: (type, props) => ({ type, props }) };
    if (name === 'react') return {
      useState: () => [true, () => {}],
      useRef: value => refs[ref++] ||= { current: value },
      useEffect(fn, deps) {
        const i = hook++, prior = effects[i];
        if (prior && deps.every((d, n) => d === prior.deps[n])) return;
        prior?.cleanup?.();
        effects[i] = { deps, cleanup: fn() };
      }
    };
    throw Error(name);
  }
};
context.window = context;
vm.createContext(context);
vm.runInContext(source, context);
const render = () => { hook = 0; ref = 0; return context.exports.GoogleAnalytics(); };
const tree = render();
function findScript(node) {
  if (!node || typeof node !== 'object') return null;
  if (node.props?.id === 'fluidrwa-google-analytics') return node.props.children;
  for (const child of [node.props?.children].flat()) { const result = findScript(child); if (result) return result; }
}
vm.runInContext(findScript(tree), context);
const events = () => context.dataLayer.filter(args => args[0] === 'event' && args[1] === 'page_view');
assert.equal(events().length, 1, 'One initial view after readiness');
assert.equal(events()[0][2].page_location.includes('private@'), false);
assert.ok(events()[0][2].page_location.includes('utm_source=newsletter'));
const config = context.dataLayer.find(args => args[0] === 'config' && args[1] === 'G-Q5L2HZK162');
assert.equal(config[2].send_page_view, false, 'No automatic initial duplicate');
render(); context.dispatchEvent(new Event('fluidrwa:analytics-ready'));
assert.equal(events().length, 1);
pathname = '/vendor-membership'; context.location.pathname = pathname; context.location.href = 'https://www.fluidrwa.com/vendor-membership';
render(); assert.equal(events().length, 2);
render(); assert.equal(events().length, 2);
pathname = '/blog/example'; context.location.pathname = pathname; context.location.href = 'https://www.fluidrwa.com/blog/example';
render(); assert.equal(events().length, 3, 'Return navigation is a new view');
console.log('PASS: one initial view, one per pathname change, return visits, readiness/render deduplication, sanitized location and no automatic config view.');
