import assert from 'node:assert/strict';
const base = process.env.TEST_BASE_URL || 'http://localhost:3036';
const valid = ['/', '/blog/top-tokenization-companies-2026', '/vendors/tokenization-platforms', '/vendors/crypto-custody-providers', '/web3vendorecosystem', '/vendor-membership', '/submit-requirement', '/fluidrwa/nownodes', '/contact', '/network-explorer'];
for (const route of valid) {
  const response = await fetch(`${base}${route}`, { redirect: 'follow' });
  const html = await response.text();
  assert.equal(response.status, 200, route);
  assert.ok(!html.includes('<h1>Page not found.</h1>'), route);
  if (route !== '/') assert.ok(!html.includes('<h1 id="hero-title">Finding a '), `Homepage fallback: ${route}`);
  console.log(`PASS 200 intended page: ${route}`);
}
for (const route of ['/vendors/vendors/crypto-custody-providers', '/vendors/blog/how-to-find-web3-vendors', '/blog/no-such-fluidrwa-article', '/fluidrwa/no-such-fluidrwa-company', '/blog/alchemy-vs-quicknode-vs-infura-rpc-node-providers)[[2', '/no-such-fluidrwa-page']) {
  const response = await fetch(`${base}${route}`);
  const html = await response.text();
  assert.equal(response.status, 404, route);
  assert.ok(/noindex/.test(html), route);
  assert.ok(!html.includes('<h1 id="hero-title">Finding a '), route);
  console.log(`PASS 404/noindex: ${route}`);
}
