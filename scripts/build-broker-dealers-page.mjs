import fs from "node:fs";
import path from "node:path";

const parseCsv = (source) => {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    if (quoted) {
      if (char === '"' && source[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        field += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
};

const source = fs.readFileSync(path.join(process.cwd(), "data/broker-dealer-vendor-research.csv"), "utf8");
const parsed = parseCsv(source);
const headers = parsed[0];
const records = parsed.slice(1).filter((row) => row.length === headers.length);
const get = (row, name) => row[headers.indexOf(name)] || "";
const esc = (value = "") => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const slug = (value = "") => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// Strict inclusion rule: explicit broker-dealer reference, no relationship-only claims,
// and High or Medium FluidRWA research priority.
const dealers = records.filter((row) => {
  const license = get(row, "Regulatory / License Notes");
  const priority = get(row, "FluidRWA Priority");
  return /broker-dealer/i.test(license) && !/relationship/i.test(license) && priority !== "Low";
});

const signalKey = (value) => {
  const normalized = value.toLowerCase();
  if (/token|digital asset|digital securities|rwa|real-world/.test(normalized)) return "digital";
  if (/alternative|private market|private placement|real estate/.test(normalized)) return "alternatives";
  if (/fintech|embedded|infrastructure|clearing|custody/.test(normalized)) return "infrastructure";
  return "capital-markets";
};

const regionKey = (value) => {
  if (/United States/i.test(value)) return "united-states";
  if (/United Kingdom/i.test(value)) return "united-kingdom";
  if (/Canada/i.test(value)) return "canada";
  return "international";
};

const rows = dealers.map((row, index) => {
  const name = get(row, "Company Name");
  const segment = get(row, "FluidRWA Segment");
  const region = get(row, "Country / Region");
  const license = get(row, "Regulatory / License Notes");
  const services = get(row, "Services Offered");
  const signal = get(row, "Digital Asset / Tokenization Signal");
  const bestFor = get(row, "Best For");
  const priority = get(row, "FluidRWA Priority");
  const website = get(row, "Website");
  const search = [name, segment, region, license, services, signal, bestFor].join(" ").toLowerCase();
  return `<tr id="${slug(name)}" data-name="${esc(name.toLowerCase())}" data-segment="${slug(segment)}" data-region="${regionKey(region)}" data-priority="${slug(priority)}" data-signal="${signalKey(signal)}" data-search="${esc(search)}">
    <td data-label="#"><span class="bd-rank">${String(index + 1).padStart(3, "0")}</span></td>
    <td data-label="Broker-dealer"><strong>${esc(name)}</strong><small>${esc(license)}</small></td>
    <td data-label="Segment"><span class="bd-segment">${esc(segment)}</span></td>
    <td data-label="Services">${esc(services)}</td>
    <td data-label="Best for">${esc(bestFor)}</td>
    <td data-label="Digital asset signal"><span class="bd-signal bd-${signalKey(signal)}">${esc(signal)}</span></td>
    <td data-label="Region">${esc(region)}</td>
    <td data-label="Source"><a href="${esc(website)}" target="_blank" rel="noopener noreferrer nofollow">Official website</a></td>
  </tr>`;
}).join("\n");

const faq = [
  ["What is a broker-dealer?","A broker-dealer is a regulated entity that may execute securities transactions for customers, for its own account, or both. Permitted activities depend on its registrations, licenses, jurisdictions and regulatory approvals."],
  ["Why do tokenization and RWA projects need broker-dealers?","When a tokenized asset is treated as a security, broker-dealers may support compliant placement, investor access, transaction execution, distribution or secondary-market activity. The required structure depends on the asset and jurisdiction."],
  ["How should issuers compare broker-dealers?","Issuers should compare active registrations, approved activities, jurisdictions, product experience, investor network, offering exemptions, technology integrations, economics and willingness to support the proposed asset."],
  ["Are all firms in this directory digital-asset broker-dealers?","No. The table separates digital-securities specialists from traditional, embedded, wealth, clearing and alternative-investment broker-dealers. Use the digital-asset signal and segment filters to narrow the list."],
  ["How does FluidRWA verify broker-dealer status?","The directory includes firms whose public research records explicitly reference broker-dealer status. Users must confirm current registration, approved activities and disciplinary history through FINRA BrokerCheck, the SEC, or the relevant local regulator before engagement."],
  ["Can FluidRWA help identify a broker-dealer for a project?","Yes. Submit the asset type, target investors, offering structure, geography, stage and required services so FluidRWA can identify potentially relevant providers for further diligence."]
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://www.fluidrwa.com/vendors/broker-dealers#webpage",
      url: "https://www.fluidrwa.com/vendors/broker-dealers",
      name: "Broker-Dealers for RWA, Tokenization and Web3 | FluidRWA",
      description: "Compare 100 broker-dealers by segment, services, geography, buyer fit, and digital-asset or tokenization relevance.",
      dateModified: "2026-06-15",
      mainEntity: { "@id": "https://www.fluidrwa.com/vendors/broker-dealers#directory" }
    },
    {
      "@type": "ItemList",
      "@id": "https://www.fluidrwa.com/vendors/broker-dealers#directory",
      name: "Broker-Dealer Directory for RWA and Web3",
      numberOfItems: dealers.length,
      itemListElement: dealers.map((row, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://www.fluidrwa.com/vendors/broker-dealers#${slug(get(row, "Company Name"))}`,
        item: {
          "@type": "Organization",
          name: get(row, "Company Name"),
          url: get(row, "Website"),
          areaServed: get(row, "Country / Region"),
          description: `${get(row, "FluidRWA Segment")} offering ${get(row, "Services Offered").toLowerCase()}.`
        }
      }))
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } }))
    }
  ]
};

const options = (values, key = slug) => [...new Set(values)].sort().map((value) => `<option value="${key(value)}">${esc(value)}</option>`).join("");
const segments = dealers.map((row) => get(row, "FluidRWA Segment"));

const html = `<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Broker-Dealers for RWA, Tokenization and Web3 | FluidRWA</title>
<meta name="description" content="Find and compare 100 broker-dealers for RWA, tokenization, private markets and Web3. Filter by segment, services, buyer fit, geography and digital-asset relevance.">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1"><link rel="canonical" href="https://www.fluidrwa.com/vendors/broker-dealers">
<link rel="stylesheet" href="../../assets/styles-yellow-blue.css"><meta property="og:type" content="website"><meta property="og:site_name" content="FluidRWA"><meta property="og:title" content="Broker-Dealers for RWA, Tokenization and Web3"><meta property="og:description" content="A filterable directory of 100 broker-dealers across digital securities, private markets, investment banking, embedded brokerage and alternatives."><meta property="og:url" content="https://www.fluidrwa.com/vendors/broker-dealers"><meta property="og:image" content="https://www.fluidrwa.com/assets/social/vendor-ecosystem.png"><meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">${JSON.stringify(schema)}</script>
<style>
.bd-page{--bd-ink:#14233f;--bd-blue:#2768a8;--bd-gold:#d5a52d;--bd-sky:#e9f5ff;--bd-cream:#fff8e8;background:linear-gradient(180deg,#fffaf0,#f5fbff 44%,#fff9ed);color:var(--bd-ink)}
.bd-hero{padding:112px 0 72px;background:radial-gradient(circle at 84% 20%,rgba(145,211,245,.48),transparent 31%),radial-gradient(circle at 8% 90%,rgba(255,223,132,.48),transparent 34%),linear-gradient(135deg,#fff9e7,#f3fbff)}
.bd-hero-grid{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(300px,.62fr);gap:52px;align-items:end}.bd-hero h1,.bd-section h2,.bd-cta h2{font-family:var(--fluid-display);letter-spacing:0}.bd-hero h1{max-width:830px;margin:12px 0 20px;font-size:clamp(46px,6vw,82px);line-height:.98}.bd-hero p{max-width:780px;color:#5e6a7e;font-size:18px;line-height:1.7}.bd-stats{display:grid;grid-template-columns:1fr 1fr;gap:12px}.bd-stats div{min-height:134px;padding:22px;border:1px solid rgba(39,104,168,.13);border-radius:22px;background:rgba(255,255,255,.78);box-shadow:0 22px 55px rgba(42,72,110,.1)}.bd-stats strong{display:block;color:var(--bd-blue);font-family:var(--fluid-display);font-size:42px}.bd-stats span{color:#657186;font-size:11px;font-weight:900;letter-spacing:.09em;text-transform:uppercase}
.bd-section{padding:76px 0}.bd-section-head{max-width:920px;margin-bottom:26px}.bd-section h2{margin:8px 0 12px;font-size:clamp(34px,4.5vw,58px);line-height:1.05}.bd-section-head p,.bd-note{color:#657186;line-height:1.68}.bd-method{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.bd-method article{padding:24px;border:1px solid rgba(39,104,168,.12);border-radius:22px;background:#fff;box-shadow:0 18px 45px rgba(39,72,110,.07)}.bd-method article:nth-child(2){background:linear-gradient(145deg,#fff,#eef8ff)}.bd-method article:nth-child(3){background:linear-gradient(145deg,#fff,#fff8df)}.bd-method h3{font-family:var(--fluid-display);font-size:25px}.bd-method p{color:#657186;line-height:1.62}
.bd-directory{background:linear-gradient(180deg,rgba(232,246,255,.72),rgba(255,248,224,.56),rgba(255,250,239,.76))}.bd-filters{display:grid;grid-template-columns:1.5fr repeat(4,minmax(140px,1fr));gap:10px;margin-bottom:15px;padding:18px;border:1px solid rgba(39,104,168,.13);border-radius:22px;background:rgba(255,255,255,.82);box-shadow:0 18px 50px rgba(39,72,110,.08)}.bd-filters label{display:grid;gap:7px;color:#6b7588;font-size:10px;font-weight:950;letter-spacing:.1em;text-transform:uppercase}.bd-filters input,.bd-filters select{width:100%;min-width:0;height:46px;border:1px solid rgba(39,104,168,.15);border-radius:12px;background:#fff;padding:0 12px;color:var(--bd-ink);font:inherit;font-size:13px;font-weight:750}.bd-results{display:flex;justify-content:space-between;gap:15px;align-items:center;margin:0 0 16px;color:#657186;font-size:12px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}.bd-reset{border:0;border-radius:999px;background:var(--bd-blue);color:#fff;padding:10px 16px;font:inherit;font-weight:850;cursor:pointer}
.bd-table-shell{overflow:auto;border:1px solid rgba(39,104,168,.13);border-radius:22px;background:rgba(255,255,255,.88);box-shadow:0 22px 60px rgba(39,72,110,.09)}.bd-table{width:100%;min-width:1480px;border-collapse:collapse}.bd-table th{position:sticky;top:0;z-index:1;background:#e9f5ff;color:#274c76;text-align:left;font-size:10px;letter-spacing:.09em;text-transform:uppercase}.bd-table th button{width:100%;border:0;background:transparent;padding:16px 14px;color:inherit;text-align:left;font:inherit;font-weight:950;cursor:pointer}.bd-table td{padding:15px 14px;border-top:1px solid rgba(39,104,168,.08);color:#5f6b7e;font-size:13px;line-height:1.45;vertical-align:top}.bd-table tbody tr:hover{background:#fffaf0}.bd-table tr[hidden]{display:none}.bd-table td strong{display:block;color:var(--bd-ink);font-size:14px}.bd-table td small{display:block;max-width:300px;margin-top:4px;color:#7c8697}.bd-rank{display:inline-grid;place-items:center;min-width:43px;height:30px;border-radius:10px;background:#fff4ce;color:#9b7414;font-weight:950}.bd-segment,.bd-signal{display:inline-flex;padding:6px 9px;border-radius:999px;font-size:10px;font-weight:850}.bd-segment{background:#e9f5ff;color:#27649d}.bd-digital{background:#e5f1ff;color:#235e9c}.bd-alternatives{background:#fff1dc;color:#965b25}.bd-infrastructure{background:#e8f7f1;color:#266b55}.bd-capital-markets{background:#f0edfa;color:#655282}.bd-table a{color:var(--bd-blue);font-weight:850}.bd-note{margin-top:20px;padding:18px 20px;border-left:4px solid var(--bd-gold);border-radius:12px;background:rgba(255,255,255,.78)}.bd-note strong{color:var(--bd-ink)}
.bd-links{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px}.bd-links a{padding:10px 14px;border:1px solid rgba(39,104,168,.15);border-radius:999px;background:#fff;color:var(--bd-blue);font-weight:850;text-decoration:none}.bd-faq{display:grid;gap:12px;max-width:940px}.bd-faq details{padding:20px 22px;border:1px solid rgba(39,104,168,.12);border-radius:18px;background:#fff}.bd-faq summary{cursor:pointer;font-weight:850}.bd-faq p{color:#657186;line-height:1.65}.bd-cta{padding:76px 0;background:linear-gradient(135deg,#e8f6ff,#fff4d5)}.bd-cta-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}.bd-cta article{padding:32px;border:1px solid rgba(39,104,168,.13);border-radius:24px;background:rgba(255,255,255,.8);box-shadow:0 20px 55px rgba(39,72,110,.09)}.bd-cta h2{font-size:clamp(32px,4vw,50px)}.bd-cta p{color:#657186;line-height:1.62}.bd-cta a{display:inline-flex;margin-top:14px;padding:13px 18px;border-radius:999px;background:var(--bd-blue);color:#fff;text-decoration:none;font-weight:900}.bd-cta article:last-child a{background:#a77614}
@media(max-width:1100px){.bd-filters{grid-template-columns:1fr 1fr 1fr}.bd-filters label:first-child{grid-column:1/-1}}@media(max-width:900px){.bd-hero-grid{grid-template-columns:1fr}.bd-method{grid-template-columns:1fr}.bd-filters{grid-template-columns:1fr 1fr}.bd-filters label:first-child{grid-column:1/-1}}@media(max-width:680px){.bd-hero{padding:82px 0 52px}.bd-hero h1{font-size:clamp(39px,12vw,54px)}.bd-stats,.bd-cta-grid{grid-template-columns:1fr}.bd-section{padding:58px 0}.bd-filters{grid-template-columns:1fr}.bd-filters label:first-child{grid-column:auto}.bd-results{align-items:flex-start}.bd-table-shell{margin-right:-14px;border-radius:18px 0 0 18px}.bd-table{min-width:1380px}}
</style></head><body><main class="bd-page">
<section class="bd-hero"><div class="light-container bd-hero-grid"><div><p class="eyebrow light-eyebrow">FluidRWA regulated distribution directory</p><h1>Broker-Dealers for RWA, Tokenization and Web3</h1><p>Broker-dealers can be essential when digital securities, tokenized assets and private-market offerings need regulated placement, distribution, execution or secondary-market access. Compare firms by segment, buyer fit, services, geography and public digital-asset signal.</p><div class="hero-actions"><a class="btn btn-primary light-primary" href="#broker-dealer-directory">Explore broker-dealers</a><a class="btn btn-soft" href="/submit-requirement">Submit your requirements</a></div></div><aside class="bd-stats"><div><strong>${dealers.length}</strong><span>strict broker-dealer candidates</span></div><div><strong>${new Set(segments).size}</strong><span>broker-dealer segments</span></div><div><strong>${dealers.filter((row) => get(row, "FluidRWA Priority") === "High").length}</strong><span>high-priority research matches</span></div><div><strong>1</strong><span>filterable regulated distribution layer</span></div></aside></div></section>
<section class="bd-section"><div class="light-container"><div class="bd-section-head"><p class="eyebrow light-eyebrow">How to use this directory</p><h2>Start with regulatory fit, then compare distribution capability</h2><p>Broker-dealer is not one universal permission. Before engagement, confirm that the legal entity, registrations and approved activities match your asset, investor type, offering structure and target jurisdiction.</p></div><div class="bd-method"><article><h3>Strict inclusion rule</h3><p>Every included research record explicitly references broker-dealer status and carries a High or Medium FluidRWA priority. Relationship-only and low-fit candidates are excluded.</p></article><article><h3>Segmented by buyer need</h3><p>Separate digital-securities specialists, private-placement firms, investment banks, clearing firms, embedded brokers and alternative-investment distributors.</p></article><article><h3>Verify before engagement</h3><p>Use official websites for initial research, then verify active status and approved activities with FINRA BrokerCheck, the SEC or the relevant local regulator.</p></article></div></div></section>
<section class="bd-section bd-directory" id="broker-dealer-directory"><div class="light-container"><div class="bd-section-head"><p class="eyebrow light-eyebrow">Interactive broker-dealer table</p><h2>Research ${dealers.length} broker-dealers and regulated distribution firms</h2><p>Search and filter the table to build a shortlist. Inclusion is a research signal, not an endorsement or confirmation that a firm accepts your proposed mandate.</p></div>
<div class="bd-filters" data-bd-filters><label>Search<input type="search" data-bd-search placeholder="Firm, service, buyer fit or signal"></label><label>Broker-dealer segment<select data-bd-filter="segment"><option value="">All segments</option>${options(segments)}</select></label><label>Region<select data-bd-filter="region"><option value="">All regions</option><option value="united-states">United States</option><option value="united-kingdom">United Kingdom</option><option value="canada">Canada</option><option value="international">Other international</option></select></label><label>Digital asset signal<select data-bd-filter="signal"><option value="">All signals</option><option value="digital">Digital assets / tokenization</option><option value="alternatives">Alternatives / private markets</option><option value="infrastructure">Infrastructure / clearing</option><option value="capital-markets">Broader capital markets</option></select></label><label>FluidRWA priority<select data-bd-filter="priority"><option value="">All priorities</option><option value="high">High</option><option value="medium">Medium</option></select></label></div>
<div class="bd-results"><span data-bd-count>Showing ${dealers.length} broker-dealers</span><button class="bd-reset" type="button" data-bd-reset>Reset filters</button></div>
<div class="bd-table-shell"><table class="bd-table" data-bd-table><thead><tr><th>#</th><th><button type="button" data-bd-sort="name">Broker-dealer ↕</button></th><th><button type="button" data-bd-sort="segment">Segment ↕</button></th><th>Services</th><th>Best for</th><th><button type="button" data-bd-sort="signal">Digital asset signal ↕</button></th><th><button type="button" data-bd-sort="region">Region ↕</button></th><th>Official source</th></tr></thead><tbody>${rows}</tbody></table></div>
<p class="bd-note"><strong>Regulatory verification note:</strong> Broker-dealer registrations, permissions and disciplinary histories can change. Confirm the exact legal entity and its current status using <a href="https://brokercheck.finra.org/" target="_blank" rel="noopener noreferrer nofollow">FINRA BrokerCheck</a>, the <a href="https://www.sec.gov/edgar/search/" target="_blank" rel="noopener noreferrer nofollow">SEC</a>, or the relevant regulator before engagement.</p></div></section>
<section class="bd-section"><div class="light-container"><div class="bd-section-head"><p class="eyebrow light-eyebrow">Related infrastructure</p><h2>Map the complete capital and distribution stack</h2><p>Broker-dealers often work alongside tokenization platforms, legal advisers, capital providers and compliance infrastructure.</p><div class="bd-links"><a href="/vendors/tokenization-platforms">Tokenization platforms</a><a href="/vendors/legal-regulatory-vendors">Legal and regulatory vendors</a><a href="/vendors/compliance-infrastructure-providers">Compliance infrastructure</a><a href="/vendors/venture-capital">Venture capital</a><a href="/vendors/family-offices">Family offices</a></div></div><div class="bd-faq">${faq.map(([name, text]) => `<details><summary>${name}</summary><p>${text}</p></details>`).join("")}</div></div></section>
<section class="bd-cta"><div class="light-container bd-cta-grid"><article><h2>Need regulated distribution support?</h2><p>Submit your asset, offering structure, target investors, geography and required broker-dealer services so FluidRWA can help identify potentially relevant providers.</p><a href="/submit-requirement">Submit your requirements</a></article><article><h2>Represent a broker-dealer?</h2><p>Request a verified profile, correct public information, or explain the mandates and jurisdictions your firm supports.</p><a href="/apply-as-vendor">Apply for a verified listing</a></article></div></section>
</main></body></html>`;

const out = path.join(process.cwd(), "vendors/broker-dealers/index.html");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, html);
console.log(`Wrote ${out} with ${dealers.length} broker-dealers`);
