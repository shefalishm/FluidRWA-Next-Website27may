import fs from "node:fs";
import path from "node:path";

// Publicly visible family offices, family-backed investment companies and family-owned
// investment platforms. Official websites are included as the primary verification source.
const offices = [
  ["Bezos Expeditions","Single-family office","North America","Technology, consumer and long-term innovation","Fintech and infrastructure adjacent","Bezos family","https://www.bezosexpeditions.com"],
  ["Emerson Collective","Family-backed investment company","North America","Technology, climate, education and media","Fintech and infrastructure adjacent","Powell Jobs family","https://www.emersoncollective.com"],
  ["BDT & MSD Partners","Family-backed investment company","North America","Merchant banking, private capital and growth","Alternatives and private markets","Dell family and merchant-banking partners","https://www.bdtmsd.com"],
  ["Pritzker Group","Family-backed investment company","North America","Venture capital and private equity","Fintech and infrastructure adjacent","Pritzker family","https://www.pritzkergroup.com"],
  ["Mousse Partners","Single-family office","North America","Private equity, venture and real estate","Alternatives and private markets","Wertheimer family","https://www.moussepartners.com"],
  ["ICONIQ Capital","Multi-family office","North America","Technology growth, private markets and wealth","Fintech and infrastructure adjacent","Founder and family network","https://www.iconiqcapital.com"],
  ["Bessemer Trust","Multi-family office","North America","Wealth management and private investments","Alternatives and private markets","Phipps family heritage","https://www.bessemertrust.com"],
  ["Rockefeller Capital Management","Multi-family office","North America","Wealth, alternatives and strategic advisory","Alternatives and private markets","Rockefeller family heritage","https://www.rockco.com"],
  ["S-Cubed Capital","Single-family office","North America","Technology and venture capital","Fintech and infrastructure adjacent","Schmidt family","https://www.s-cubed.com"],
  ["Wildcat Capital Management","Single-family office","North America","Private equity, real estate and venture","Alternatives and private markets","Ziff family","https://www.wildcatcapitalmanagement.com"],
  ["Willett Advisors","Single-family office","North America","Diversified private and public markets","Alternatives and private markets","Bloomberg family","https://www.willettadvisors.com"],
  ["Moore Strategic Ventures","Family-backed investment company","North America","Growth technology and strategic venture","Fintech and infrastructure adjacent","Moore family","https://www.msv.com"],
  ["Omidyar Network","Family-backed investment company","North America","Technology, financial inclusion and impact","Fintech and infrastructure adjacent","Omidyar family","https://omidyar.com"],
  ["Declaration Partners","Single-family office","North America","Venture, growth and real estate","Fintech and infrastructure adjacent","Lauder family","https://www.declarationpartners.com"],
  ["Koch Disruptive Technologies","Family-backed investment company","North America","Growth technology and industrial innovation","Fintech and infrastructure adjacent","Koch family","https://kochdisruptivetechnologies.com"],
  ["Koch Equity Development","Family-backed investment company","North America","Principal investments and acquisitions","Alternatives and private markets","Koch family","https://www.kochinc.com/about/businesses/ked"],
  ["Ballmer Group","Single-family office","North America","Impact investing and systems change","Public digital-asset focus not disclosed","Ballmer family","https://www.ballmergroup.org"],
  ["Arnold Ventures","Single-family office","North America","Evidence-led philanthropy and impact","Public digital-asset focus not disclosed","Arnold family","https://www.arnoldventures.org"],
  ["Schmidt Futures","Family-backed investment company","North America","Science, technology and public-interest innovation","Fintech and infrastructure adjacent","Schmidt family","https://www.schmidtfutures.com"],
  ["Chan Zuckerberg Initiative","Family-backed investment company","North America","Science, education and technology","Fintech and infrastructure adjacent","Zuckerberg-Chan family","https://chanzuckerberg.com"],
  ["Revolution","Family-backed investment company","North America","Venture and growth investing","Fintech and infrastructure adjacent","Steve Case","https://revolution.com"],
  ["Walden Catalyst Ventures","Family-backed investment company","North America","Deep technology and infrastructure","Fintech and infrastructure adjacent","Lip-Bu Tan family office","https://www.waldencatalyst.com"],
  ["The Friedkin Group","Single-family office","North America","Automotive, entertainment, hospitality and investments","Alternatives and private markets","Friedkin family","https://www.friedkin.com"],
  ["Hillwood","Single-family office","North America","Real estate, logistics and private investments","RWA and real-asset adjacent","Perot family","https://www.hillwood.com"],
  ["Cox Enterprises","Family-owned investment platform","North America","Media, automotive, climate and venture","Fintech and infrastructure adjacent","Cox family","https://www.coxenterprises.com"],
  ["Hearst","Family-owned investment platform","North America","Media, data, healthcare and venture","Fintech and infrastructure adjacent","Hearst family","https://www.hearst.com"],
  ["Advance","Family-owned investment platform","North America","Media, technology and communications","Fintech and infrastructure adjacent","Newhouse family","https://www.advance.com"],
  ["Sands Capital","Family-owned investment platform","North America","Growth equity and venture","Fintech and infrastructure adjacent","Sands family leadership","https://www.sandscapital.com"],
  ["Blue Pool Capital","Single-family office","Asia","Global private and public investments","Direct digital asset activity","Ma and Tsai family interests","https://www.bluepoolcapital.com"],
  ["Horizons Ventures","Single-family office","Asia","Disruptive technology and venture","Direct digital asset activity","Li Ka-shing family","https://www.horizonsventures.com"],
  ["C Ventures","Single-family office","Asia","Consumer technology, Web3 and culture","Direct digital asset activity","Cheng family","https://www.cventures.com"],
  ["Nan Fung Group","Family-owned investment platform","Asia","Real estate, life sciences and technology","RWA and real-asset adjacent","Chen family","https://www.nanfung.com"],
  ["Tsangs Group","Single-family office","Asia","Fintech, technology and impact","Direct digital asset activity","Tsang family","https://www.tsangsgroup.co"],
  ["Raffles Family Office","Multi-family office","Asia","Wealth management and private markets","Direct digital asset activity","Asian family network","https://rafflesgroup.co"],
  ["Tolaram","Family-owned investment platform","Asia","Consumer, fintech and emerging markets","Fintech and infrastructure adjacent","Tolaram family","https://www.tolaram.com"],
  ["Premji Invest","Single-family office","Asia","Technology, financial services and growth equity","Fintech and infrastructure adjacent","Premji family","https://www.premjiinvest.com"],
  ["Aarin Capital","Single-family office","Asia","Technology and life sciences venture","Fintech and infrastructure adjacent","Pai and Ranjan families","https://www.aarincapital.com"],
  ["Burman Family Holdings","Single-family office","Asia","Consumer, healthcare and technology","Fintech and infrastructure adjacent","Burman family","https://burmanfamilyholdings.com"],
  ["JSW Ventures","Family-backed investment company","Asia","Technology venture capital","Fintech and infrastructure adjacent","Jindal family","https://www.jswventures.com"],
  ["TVS Capital Funds","Family-backed investment company","Asia","Financial services and enterprise technology","Fintech and infrastructure adjacent","TVS family ecosystem","https://www.tvscapital.in"],
  ["KIRKBI","Single-family office","Europe","Long-term capital, real assets and growth","RWA and real-asset adjacent","Kirk Kristiansen family","https://www.kirkbi.com"],
  ["Heartland","Single-family office","Europe","Long-term ownership and private investments","Alternatives and private markets","Holch Povlsen family","https://heartland.co"],
  ["Interogo Holding","Family-backed investment company","Europe","Long-term investments, real estate and private equity","RWA and real-asset adjacent","Kamprad family foundation ecosystem","https://www.interogoholding.com"],
  ["Ferd","Single-family office","Europe","Private equity, venture and public markets","Fintech and infrastructure adjacent","Andresen family","https://www.ferd.no"],
  ["Waypoint Capital","Single-family office","Europe","Life sciences, asset management and alternatives","Alternatives and private markets","Bertarelli family","https://www.waypointcapital.net"],
  ["Verlinvest","Single-family office","Europe","Consumer growth and technology","Fintech and infrastructure adjacent","de Mévius family","https://www.verlinvest.com"],
  ["COFRA Holding","Family-owned investment platform","Europe","Real estate, private equity and sustainable growth","RWA and real-asset adjacent","Brenninkmeijer family","https://www.cofraholding.com"],
  ["Jacobs Holding","Single-family office","Europe","Long-term private equity and education","Alternatives and private markets","Jacobs family","https://www.jacobsholding.com"],
  ["Exor","Family-owned investment platform","Europe","Long-term ownership and venture","Fintech and infrastructure adjacent","Agnelli family","https://www.exor.com"],
  ["Aglaé Ventures","Single-family office","Europe","Technology venture capital","Fintech and infrastructure adjacent","Arnault family","https://www.aglaeventures.com"],
  ["Peugeot Invest","Family-owned investment platform","Europe","Diversified long-term investments","Alternatives and private markets","Peugeot family","https://www.peugeot-invest.com"],
  ["Wendel","Family-owned investment platform","Europe","Long-term private equity","Alternatives and private markets","Wendel family","https://www.wendelgroup.com"],
  ["Jacobs Foundation Investment Office","Single-family office","Europe","Mission-aligned and diversified investments","Alternatives and private markets","Jacobs family foundation","https://jacobsfoundation.org"],
  ["Reuben Brothers","Single-family office","Europe","Real estate, private equity and venture","RWA and real-asset adjacent","Reuben family","https://www.reubenbrothers.com"],
  ["JAB Holding Company","Family-backed investment company","Europe","Consumer platforms and long-term ownership","Alternatives and private markets","Reimann family","https://www.jabholco.com"],
  ["Sofina","Family-owned investment platform","Europe","Growth capital and private markets","Fintech and infrastructure adjacent","Boël family interests","https://www.sofinagroup.com"],
  ["Compagnie Nationale à Portefeuille","Family-owned investment platform","Europe","Long-term private and public investments","Alternatives and private markets","Frère family","https://www.cnp.be"],
  ["Brederode","Family-owned investment platform","Europe","Private equity and listed investments","Alternatives and private markets","Family-controlled investment company","https://www.brederode.eu"],
  ["Korys","Single-family office","Europe","Venture, private equity and sustainable investing","Fintech and infrastructure adjacent","Colruyt family","https://www.korys.be"],
  ["GBL","Family-owned investment platform","Europe","Long-term capital and growth investing","Fintech and infrastructure adjacent","Frère and Desmarais family interests","https://www.gbl.com"],
  ["Bregal Investments","Single-family office","Europe","Private equity and growth capital","Alternatives and private markets","Brenninkmeijer family","https://www.bregal.com"],
  ["Schörghuber Group","Family-owned investment platform","Europe","Real estate, hospitality and diversified holdings","RWA and real-asset adjacent","Schörghuber family","https://www.schoerghuber.group"],
  ["LGT Group","Family-owned investment platform","Europe","Wealth, private markets and impact","Direct digital asset activity","Princely Family of Liechtenstein","https://www.lgt.com"],
  ["Stonehage Fleming","Multi-family office","Europe","Family wealth, governance and investments","Alternatives and private markets","Global family network","https://www.stonehagefleming.com"],
  ["HQ Trust","Multi-family office","Europe","Family wealth and alternative investments","Alternatives and private markets","Harald Quandt family heritage","https://www.hqtrust.de"],
  ["Marcuard Family Office","Multi-family office","Europe","Wealth and private-market advisory","Alternatives and private markets","European family network","https://www.marcuardfamilyoffice.com"],
  ["Pictet Group","Family-owned investment platform","Europe","Wealth and asset management","Direct digital asset activity","Managing-partner families","https://www.group.pictet"],
  ["Lombard Odier","Family-owned investment platform","Europe","Wealth, alternatives and sustainable investment","Direct digital asset activity","Managing-partner families","https://www.lombardodier.com"],
  ["Edmond de Rothschild","Family-owned investment platform","Europe","Private banking, real assets and alternatives","Direct digital asset activity","Rothschild family","https://www.edmond-de-rothschild.com"],
  ["Crescent Enterprises","Family-owned investment platform","Middle East","Venture, infrastructure and diversified business","Fintech and infrastructure adjacent","Jafar family","https://www.crescententerprises.com"],
  ["Al Ghurair Investment","Family-owned investment platform","Middle East","Diversified industries and private investments","RWA and real-asset adjacent","Al Ghurair family","https://www.al-ghurair.com"],
  ["Al-Futtaim","Family-owned investment platform","Middle East","Real estate, automotive, finance and retail","RWA and real-asset adjacent","Al-Futtaim family","https://www.alfuttaim.com"],
  ["Abdul Latif Jameel","Family-owned investment platform","Middle East","Mobility, finance, energy and technology","Fintech and infrastructure adjacent","Jameel family","https://www.alj.com"],
  ["KBW Ventures","Single-family office","Middle East","Technology venture capital","Fintech and infrastructure adjacent","Prince Khaled bin Alwaleed","https://kbw-ventures.com"],
  ["Chalhoub Group","Family-owned investment platform","Middle East","Luxury, retail and digital commerce","Fintech and infrastructure adjacent","Chalhoub family","https://www.chalhoubgroup.com"],
  ["Al Tayer Group","Family-owned investment platform","Middle East","Retail, automotive and real estate","RWA and real-asset adjacent","Al Tayer family","https://www.altayer.com"],
  ["Majid Al Futtaim","Family-owned investment platform","Middle East","Real estate, retail and entertainment","RWA and real-asset adjacent","Al Futtaim family","https://www.majidalfuttaim.com"],
  ["AW Rostamani Group","Family-owned investment platform","Middle East","Mobility, real estate and financial services","Fintech and infrastructure adjacent","Rostamani family","https://www.awrostamani.com"],
  ["Seddiqi Holding","Family-owned investment platform","Middle East","Luxury, retail and venture","Fintech and infrastructure adjacent","Seddiqi family","https://www.seddiqiholding.com"],
  ["YBA Kanoo Group","Family-owned investment platform","Middle East","Shipping, logistics, real estate and technology","RWA and real-asset adjacent","Kanoo family","https://www.kanoo.com"],
  ["Easa Saleh Al Gurg Group","Family-owned investment platform","Middle East","Diversified industrial and real-estate holdings","RWA and real-asset adjacent","Al Gurg family","https://www.algurg.com"],
  ["Al Naboodah Group Enterprises","Family-owned investment platform","Middle East","Construction, mobility and real estate","RWA and real-asset adjacent","Al Naboodah family","https://www.alnaboodah.com"],
  ["Grok Ventures","Single-family office","Oceania","Climate technology and venture capital","Fintech and infrastructure adjacent","Cannon-Brookes family","https://www.grok.ventures"],
  ["Wollemi Capital","Single-family office","Oceania","Climate and growth investments","Fintech and infrastructure adjacent","Cannon-Brookes family","https://www.wollemi.com"],
  ["Tenacious Ventures","Family-backed investment company","Oceania","Agri-food technology and venture","RWA and real-asset adjacent","Kirsten and Matthew Henzell","https://www.tenacious.ventures"],
  ["Victor Smorgon Group","Single-family office","Oceania","Diversified private investments","Alternatives and private markets","Smorgon family","https://www.victorsmorgongroup.com.au"],
  ["Yellowwoods","Single-family office","Africa","Consumer, insurance and growth businesses","Fintech and infrastructure adjacent","Enthoven family","https://www.yellowwoods.co.za"],
  ["Votorantim","Family-owned investment platform","Latin America","Industrials, finance and long-term investments","RWA and real-asset adjacent","Ermírio de Moraes family","https://www.votorantim.com.br"],
  ["23S Capital","Single-family office","Latin America","Private equity and growth investments","Fintech and infrastructure adjacent","Votorantim family ecosystem","https://www.23scapital.com"],
  ["Grupo Werthein","Family-owned investment platform","Latin America","Technology, insurance, media and agribusiness","Fintech and infrastructure adjacent","Werthein family","https://www.grupowerthein.com"],
  ["Grupo Sura Ventures","Family-backed investment company","Latin America","Financial services innovation and venture","Fintech and infrastructure adjacent","Family-influenced regional group","https://www.gruposura.com"],
  ["Cemex Ventures","Family-backed investment company","Latin America","Construction technology and built environment","RWA and real-asset adjacent","Zambrano family heritage","https://www.cemexventures.com"],
  ["Access Industries","Single-family office","North America","Technology, media and strategic investments","Fintech and infrastructure adjacent","Blavatnik family","https://www.accessindustries.com"],
  ["Tavistock Group","Single-family office","North America","Global private investments and real assets","RWA and real-asset adjacent","Lewis family","https://www.tavistock.com"],
  ["Claridge","Single-family office","North America","Private equity, real estate and technology","Fintech and infrastructure adjacent","Bronfman family","https://claridgeinc.com"],
  ["Wittington Investments","Single-family office","Europe","Long-term private and public investments","Alternatives and private markets","Weston family","https://www.wittington-investments.co.uk"],
  ["Souter Investments","Single-family office","Europe","Private equity, infrastructure and growth","Fintech and infrastructure adjacent","Souter family","https://www.souterinvestments.com"],
  ["Caledonia Investments","Family-owned investment platform","Europe","Long-term public and private capital","Alternatives and private markets","Cayzer family","https://www.caledonia.com"],
  ["AlTi Global","Multi-family office","Global","Wealth, alternatives and impact investing","Alternatives and private markets","Global family network","https://alti-global.com"],
  ["Matter Family Office","Multi-family office","North America","Family wealth and private-market strategy","Alternatives and private markets","Family client network","https://matterfamilyoffice.com"],
  ["WE Family Offices","Multi-family office","North America","Family wealth and investment advisory","Alternatives and private markets","Family client network","https://wefamilyoffices.com"],
  ["Pitcairn","Multi-family office","North America","Family wealth, governance and investments","Alternatives and private markets","Pitcairn family heritage","https://www.pitcairn.com"],
  ["Pathstone","Multi-family office","North America","Family wealth and private-market advisory","Alternatives and private markets","Family client network","https://www.pathstone.com"],
  ["Northwood Family Office","Multi-family office","North America","Integrated family wealth and investments","Alternatives and private markets","Family client network","https://northwoodfamilyoffice.com"],
  ["Cresset","Multi-family office","North America","Family wealth, private markets and alternatives","Alternatives and private markets","Family client network","https://cressetcapital.com"],
  ["Bezos Earth Fund","Family-backed investment company","North America","Climate technology and environmental innovation","Fintech and infrastructure adjacent","Bezos family","https://www.bezosearthfund.org"],
  ["Vulcan","Single-family office","North America","Technology, science, real estate and impact","RWA and real-asset adjacent","Allen family estate","https://vulcan.com"],
  ["Durable Capital Partners","Family-backed investment company","North America","Long-duration public and private growth","Fintech and infrastructure adjacent","Henry family office-backed platform","https://www.durablecapital.com"]
];

const esc = (value = "") => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const slug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const introHref = (name) => `/submit-requirement?vendor=${encodeURIComponent(name)}&category=${encodeURIComponent("Family Offices")}&source=family-office-directory`;
const geographyKey = (value) => slug(value);
const typeKey = (value) => slug(value);
const signalKey = (value) => value.startsWith("Direct") ? "direct" : value.startsWith("Fintech") ? "adjacent" : value.startsWith("RWA") ? "real-assets" : value.startsWith("Alternatives") ? "alternatives" : "not-disclosed";

const rows = offices.map((office, index) => {
  const [name, type, geography, focus, signal, principal, website] = office;
  return `<tr id="${slug(name)}" data-name="${esc(name.toLowerCase())}" data-type="${typeKey(type)}" data-geography="${geographyKey(geography)}" data-signal="${signalKey(signal)}" data-search="${esc(office.join(" ").toLowerCase())}">
    <td data-label="#"><span class="fo-rank">${String(index + 1).padStart(3, "0")}</span></td>
    <td data-label="Family office"><strong>${esc(name)}</strong><small>${esc(principal)}</small></td>
    <td data-label="Type">${esc(type)}</td>
    <td data-label="Geography">${esc(geography)}</td>
    <td data-label="Investment focus">${esc(focus)}</td>
    <td data-label="Web3 / RWA relevance"><span class="fo-signal fo-${signalKey(signal)}">${esc(signal)}</span></td>
    <td data-label="Source"><a href="${esc(introHref(name))}">Request intro</a></td>
  </tr>`;
}).join("\n");

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://www.fluidrwa.com/vendors/family-offices#webpage",
      url: "https://www.fluidrwa.com/vendors/family-offices",
      name: "Family Offices Investing in RWA, Web3 and Technology | FluidRWA",
      description: "Compare verified family offices and family-backed investment firms by geography, investment focus and publicly visible Web3 or RWA relevance.",
      dateModified: "2026-06-14",
      mainEntity: { "@id": "https://www.fluidrwa.com/vendors/family-offices#directory" }
    },
    {
      "@type": "ItemList",
      "@id": "https://www.fluidrwa.com/vendors/family-offices#directory",
      name: "Verified Family Office Directory",
      numberOfItems: offices.length,
      itemListElement: offices.map((office, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://www.fluidrwa.com/vendors/family-offices#${slug(office[0])}`,
        item: { "@type": "Organization", name: office[0], url: office[6], areaServed: office[2], description: `${office[1]} focused on ${office[3].toLowerCase()}.` }
      }))
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        ["What is a family office?","A family office is an organization that manages investments, governance, wealth planning or operating interests for one family or multiple families."],
        ["Do family offices invest in Web3 and tokenization?","Some family offices publicly invest directly in digital assets and Web3. Others approach the market through fintech, infrastructure, private markets or real assets. Public activity varies substantially."],
        ["How should Web3 founders approach family offices?","Founders should research investment focus, geography, preferred structure, decision process and relevant portfolio activity before outreach. A warm introduction and a clear explanation of fit are often important."],
        ["How does FluidRWA verify this directory?","Every listed organization includes an official website as its primary verification source. Web3 and RWA relevance is described conservatively using publicly visible positioning and should be confirmed directly before outreach."],
        ["Can FluidRWA match projects with family offices?","Projects can submit their raise and investment requirements. FluidRWA uses the information to identify potentially relevant capital partners for further diligence and outreach."]
      ].map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } }))
    }
  ]
};

const html = `<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Family Offices Investing in RWA and Web3 | FluidRWA</title>
<meta name="description" content="Explore 100+ verified family offices and family-backed investment firms. Compare geography, investment focus, and Web3 or RWA relevance.">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1"><link rel="canonical" href="https://www.fluidrwa.com/vendors/family-offices">
<link rel="stylesheet" href="../../assets/styles-yellow-blue.css"><meta property="og:type" content="website"><meta property="og:site_name" content="FluidRWA"><meta property="og:title" content="Family Offices Investing in RWA and Web3"><meta property="og:description" content="A verified, filterable directory of family offices and family-backed investment firms."><meta property="og:url" content="https://www.fluidrwa.com/vendors/family-offices"><meta property="og:image" content="https://www.fluidrwa.com/assets/social/vendor-ecosystem.png"><meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">${JSON.stringify(schema)}</script>
<style>
.fo-page{--fo-ink:#15233e;--fo-blue:#2866a5;--fo-coral:#d96b59;--fo-sky:#e9f5ff;--fo-peach:#fff0e7;background:linear-gradient(180deg,#fffaf1,#f6fbff 45%,#fff8ee);color:var(--fo-ink)}
.fo-hero{padding:112px 0 72px;background:radial-gradient(circle at 88% 20%,rgba(143,210,244,.45),transparent 32%),radial-gradient(circle at 10% 88%,rgba(255,200,169,.55),transparent 34%),linear-gradient(135deg,#fff9e9,#f4fbff)}
.fo-hero-grid{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(300px,.65fr);gap:52px;align-items:end}.fo-hero h1,.fo-section h2{font-family:var(--fluid-display);letter-spacing:0}.fo-hero h1{max-width:800px;margin:12px 0 20px;font-size:clamp(46px,6.2vw,84px);line-height:.98}.fo-hero p{max-width:760px;color:#5c687c;font-size:18px;line-height:1.7}.fo-stats{display:grid;grid-template-columns:1fr 1fr;gap:12px}.fo-stats div{min-height:134px;padding:22px;border:1px solid rgba(40,102,165,.13);border-radius:22px;background:rgba(255,255,255,.75);box-shadow:0 22px 55px rgba(42,72,110,.1)}.fo-stats strong{display:block;color:var(--fo-coral);font-family:var(--fluid-display);font-size:42px}.fo-stats span{color:#657186;font-size:11px;font-weight:900;letter-spacing:.09em;text-transform:uppercase}
.fo-section{padding:76px 0}.fo-section-head{max-width:860px;margin-bottom:26px}.fo-section h2{margin:8px 0 12px;font-size:clamp(34px,4.5vw,58px);line-height:1.05}.fo-section-head p,.fo-note{color:#657186;line-height:1.68}
.fo-method{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.fo-method article{padding:24px;border:1px solid rgba(40,102,165,.12);border-radius:22px;background:#fff;box-shadow:0 18px 45px rgba(39,72,110,.07)}.fo-method article:nth-child(2){background:linear-gradient(145deg,#fff,#eef8ff)}.fo-method article:nth-child(3){background:linear-gradient(145deg,#fff,#fff0e8)}.fo-method h3{font-family:var(--fluid-display);font-size:25px}.fo-method p{color:#657186;line-height:1.62}
.fo-directory{background:linear-gradient(180deg,rgba(232,246,255,.72),rgba(255,240,230,.48),rgba(255,250,239,.75))}.fo-filters{display:grid;grid-template-columns:1.5fr repeat(3,minmax(150px,1fr));gap:10px;margin-bottom:15px;padding:18px;border:1px solid rgba(40,102,165,.13);border-radius:22px;background:rgba(255,255,255,.8);box-shadow:0 18px 50px rgba(39,72,110,.08)}.fo-filters label{display:grid;gap:7px;color:#6b7588;font-size:10px;font-weight:950;letter-spacing:.1em;text-transform:uppercase}.fo-filters input,.fo-filters select{width:100%;min-width:0;height:46px;border:1px solid rgba(40,102,165,.15);border-radius:12px;background:#fff;padding:0 12px;color:var(--fo-ink);font:inherit;font-size:13px;font-weight:750}.fo-results{display:flex;justify-content:space-between;gap:15px;align-items:center;margin:0 0 16px;color:#657186;font-size:12px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}.fo-reset{border:0;border-radius:999px;background:var(--fo-blue);color:#fff;padding:10px 16px;font:inherit;font-weight:850;cursor:pointer}
.fo-table-shell{overflow:auto;border:1px solid rgba(40,102,165,.13);border-radius:22px;background:rgba(255,255,255,.86);box-shadow:0 22px 60px rgba(39,72,110,.09)}.fo-table{width:100%;min-width:1120px;border-collapse:collapse}.fo-table th{position:sticky;top:0;z-index:1;background:#e9f5ff;color:#274c76;text-align:left;font-size:10px;letter-spacing:.09em;text-transform:uppercase}.fo-table th button{width:100%;border:0;background:transparent;padding:16px 14px;color:inherit;text-align:left;font:inherit;font-weight:950;cursor:pointer}.fo-table td{padding:15px 14px;border-top:1px solid rgba(40,102,165,.08);color:#5f6b7e;font-size:13px;line-height:1.45;vertical-align:top}.fo-table tbody tr:hover{background:#fffaf1}.fo-table tr[hidden]{display:none}.fo-table td strong{display:block;color:var(--fo-ink);font-size:14px}.fo-table td small{display:block;margin-top:4px;color:#7c8697}.fo-rank{display:inline-grid;place-items:center;min-width:43px;height:30px;border-radius:10px;background:#fff0e7;color:var(--fo-coral);font-weight:950}.fo-signal{display:inline-flex;padding:6px 9px;border-radius:999px;font-size:10px;font-weight:850}.fo-direct{background:#e1f3ff;color:#205f9b}.fo-adjacent{background:#e9f7f1;color:#296b55}.fo-real-assets{background:#fff0e4;color:#9a563c}.fo-alternatives{background:#f0edfa;color:#655282}.fo-not-disclosed{background:#f2f3f5;color:#687181}.fo-table a{color:var(--fo-blue);font-weight:850}.fo-note{margin-top:20px;padding:18px 20px;border-left:4px solid var(--fo-coral);border-radius:12px;background:rgba(255,255,255,.74)}.fo-note strong{color:var(--fo-ink)}
.fo-faq{display:grid;gap:12px;max-width:920px}.fo-faq details{padding:20px 22px;border:1px solid rgba(40,102,165,.12);border-radius:18px;background:#fff}.fo-faq summary{cursor:pointer;font-weight:850}.fo-faq p{color:#657186;line-height:1.65}.fo-cta{padding:76px 0;background:linear-gradient(135deg,#e8f6ff,#fff0e7)}.fo-cta-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}.fo-cta article{padding:32px;border:1px solid rgba(40,102,165,.13);border-radius:24px;background:rgba(255,255,255,.78);box-shadow:0 20px 55px rgba(39,72,110,.09)}.fo-cta h2{font-family:var(--fluid-display);font-size:clamp(32px,4vw,50px)}.fo-cta p{color:#657186;line-height:1.62}.fo-cta a{display:inline-flex;margin-top:14px;padding:13px 18px;border-radius:999px;background:var(--fo-blue);color:#fff;text-decoration:none;font-weight:900}.fo-cta article:last-child a{background:var(--fo-coral)}
@media(max-width:900px){.fo-hero-grid{grid-template-columns:1fr}.fo-method{grid-template-columns:1fr}.fo-filters{grid-template-columns:1fr 1fr}.fo-filters label:first-child{grid-column:1/-1}}@media(max-width:680px){.fo-hero{padding:82px 0 52px}.fo-hero h1{font-size:clamp(39px,12vw,54px)}.fo-stats,.fo-cta-grid{grid-template-columns:1fr}.fo-section{padding:58px 0}.fo-filters{grid-template-columns:1fr}.fo-filters label:first-child{grid-column:auto}.fo-results{align-items:flex-start}.fo-table-shell{margin-right:-14px;border-radius:18px 0 0 18px}.fo-table{min-width:1020px}}
</style></head><body><main class="fo-page">
<section class="fo-hero"><div class="light-container fo-hero-grid"><div><p class="eyebrow light-eyebrow">FluidRWA capital directory</p><h1>Family Offices for RWA and Web3</h1><p>Family offices can move with a different mandate, time horizon and decision process than traditional venture funds. This directory helps founders and infrastructure teams research family offices and family-backed investment platforms using public, verifiable information.</p><div class="hero-actions"><a class="btn btn-primary light-primary" href="#family-office-directory">Explore directory</a><a class="btn btn-soft" href="/submit-requirement">Submit your raise</a></div></div><aside class="fo-stats"><div><strong>${offices.length}+</strong><span>officially sourced organizations</span></div><div><strong>6</strong><span>global regions</span></div><div><strong>4</strong><span>relevance signals</span></div><div><strong>1</strong><span>filterable capital layer</span></div></aside></div></section>
<section class="fo-section"><div class="light-container"><div class="fo-section-head"><p class="eyebrow light-eyebrow">How to use this directory</p><h2>Separate public evidence from assumptions</h2><p>Family offices are private by design. FluidRWA uses official websites as the verification baseline and separates direct digital-asset activity from adjacent areas that may still matter to RWA and Web3 teams.</p></div><div class="fo-method"><article><h3>Officially sourced</h3><p>Every row links to the organization’s official website as the primary verification source.</p></article><article><h3>Conservative relevance</h3><p>Direct activity is distinguished from fintech adjacency, real assets, alternatives and undisclosed public positioning.</p></article><article><h3>Built for research</h3><p>Search, filter and sort the table before starting deeper diligence or outreach.</p></article></div></div></section>
<section class="fo-section fo-directory" id="family-office-directory"><div class="light-container"><div class="fo-section-head"><p class="eyebrow light-eyebrow">Interactive family office table</p><h2>Research ${offices.length} family offices and family-backed investors</h2><p>Use the filters to narrow the directory. Inclusion confirms an official public presence, not current appetite, allocation capacity or FluidRWA endorsement.</p></div>
<div class="fo-filters" data-fo-filters><label>Search<input type="search" data-fo-search placeholder="Office, family, focus or region"></label><label>Geography<select data-fo-filter="geography"><option value="">All regions</option>${[...new Set(offices.map(x=>x[2]))].map(x=>`<option value="${geographyKey(x)}">${x}</option>`).join("")}</select></label><label>Organization type<select data-fo-filter="type"><option value="">All types</option>${[...new Set(offices.map(x=>x[1]))].map(x=>`<option value="${typeKey(x)}">${x}</option>`).join("")}</select></label><label>Web3 / RWA relevance<select data-fo-filter="signal"><option value="">All signals</option><option value="direct">Direct digital asset activity</option><option value="adjacent">Fintech and infrastructure adjacent</option><option value="real-assets">RWA and real-asset adjacent</option><option value="alternatives">Alternatives and private markets</option><option value="not-disclosed">Not publicly disclosed</option></select></label></div>
<div class="fo-results"><span data-fo-count>Showing ${offices.length} family offices</span><button class="fo-reset" type="button" data-fo-reset>Reset filters</button></div>
<div class="fo-table-shell"><table class="fo-table" data-fo-table><thead><tr><th>#</th><th><button type="button" data-fo-sort="name">Family office ↕</button></th><th><button type="button" data-fo-sort="type">Type ↕</button></th><th><button type="button" data-fo-sort="geography">Geography ↕</button></th><th>Investment focus</th><th><button type="button" data-fo-sort="signal">Web3 / RWA relevance ↕</button></th><th>Verification source</th></tr></thead><tbody>${rows}</tbody></table></div>
<p class="fo-note"><strong>Research and verification note:</strong> Family offices frequently change mandates and disclose limited information. Verify current strategy, decision makers, eligibility, investment structure and interest directly with each organization before outreach.</p></div></section>
<section class="fo-section"><div class="light-container"><div class="fo-section-head"><p class="eyebrow light-eyebrow">FAQ</p><h2>Family office questions for Web3 teams</h2></div><div class="fo-faq">${schema["@graph"][2].mainEntity.map(x=>`<details><summary>${x.name}</summary><p>${x.acceptedAnswer.text}</p></details>`).join("")}</div></div></section>
<section class="fo-cta"><div class="light-container fo-cta-grid"><article><h2>Looking for aligned capital?</h2><p>Submit your raise, stage, geography and target investor profile. FluidRWA helps identify potentially relevant capital partners.</p><a href="/submit-requirement">Submit your raise</a></article><article><h2>Represent a family office?</h2><p>Request a verified profile or update your organization’s public investment focus in the FluidRWA capital directory.</p><a href="/apply-as-vendor">Request a verified listing</a></article></div></section>
</main></body></html>`;

const out = path.join(process.cwd(), "vendors/family-offices/index.html");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, html);
console.log(`Wrote ${out} with ${offices.length} family offices`);
