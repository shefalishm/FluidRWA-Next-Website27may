import fs from "node:fs";
import path from "node:path";
import { getBlogResearch } from "./blog-research.mjs";

const root = process.cwd();
const contentDir = path.join(root, "content/blog");
const blogDir = path.join(root, "blog");
const site = "https://www.fluidrwa.com";
const today = "2026-05-27";
const reviewedDate = "2026-06-06";
const reviewedLabel = "June 6, 2026";
const reports = [
  {
    title: "The 2025 Geography of Cryptocurrency Report",
    author: "Chainalysis",
    description: "A global view of crypto adoption, regional market activity and the forces shaping institutional and consumer use of digital assets.",
    href: "https://www.chainalysis.com/blog/2025-global-crypto-adoption-index/",
    label: "Global adoption",
    date: "2025-09-02",
    dateLabel: "September 2025",
    cover: "/assets/report-covers/chainalysis-geography-2025.png"
  },
  {
    title: "State of Crypto 2025",
    author: "Andreessen Horowitz",
    description: "A data-led assessment of crypto adoption, stablecoins, infrastructure, market activity and the technologies moving onchain.",
    href: "https://a16zcrypto.com/posts/article/state-of-crypto-report-2025/",
    label: "Industry outlook",
    date: "2025-08-01",
    dateLabel: "2025",
    cover: "/assets/report-covers/a16z-state-crypto-2025.png"
  },
  {
    title: "The Next-Generation Monetary and Financial System",
    author: "Bank for International Settlements",
    description: "A central-bank perspective on tokenisation, unified ledgers, settlement, programmable finance and the future architecture of money.",
    href: "https://www.bis.org/publ/arpdf/ar2025e3.htm",
    label: "Financial system",
    date: "2025-06-24",
    dateLabel: "June 2025",
    cover: "/assets/report-covers/bis-next-generation-2025.png"
  },
  {
    title: "Asset Tokenization in Financial Markets",
    author: "World Economic Forum",
    description: "A market-structure report covering tokenization use cases, interoperability, regulation and infrastructure for the next generation of value exchange.",
    href: "https://www.weforum.org/publications/asset-tokenization-in-financial-markets-the-next-generation-of-value-exchange/",
    label: "Tokenization",
    date: "2025-05-13",
    dateLabel: "May 2025",
    cover: "/assets/blog-images/what-is-rwa-tokenization-infrastructure.svg"
  },
  {
    title: "Crypto-Asset Reporting Framework and 2023 Update to the Common Reporting Standard",
    author: "OECD",
    description: "The international framework for tax transparency and information exchange covering crypto-assets, intermediaries and reporting obligations.",
    href: "https://www.oecd.org/en/publications/international-standards-for-automatic-exchange-of-information-in-tax-matters_896d79d1-en.html",
    label: "Tax and reporting",
    date: "2023-06-08",
    dateLabel: "June 2023"
  },
  {
    title: "From Ripples to Waves: The Transformational Power of Tokenizing Assets",
    author: "McKinsey & Company",
    description: "An institutional view of tokenization adoption, market momentum, implementation barriers and the conditions needed for scaled financial-asset tokenization.",
    href: "https://www.mckinsey.com/industries/financial-services/our-insights/from-ripples-to-waves-the-transformational-power-of-tokenizing-assets",
    label: "Market outlook",
    date: "2024-06-20",
    dateLabel: "June 2024"
  },
  {
    title: "The Financial Stability Risks of Decentralised Finance",
    author: "Financial Stability Board",
    description: "An examination of DeFi vulnerabilities, transmission channels, data gaps and the policy questions facing financial authorities.",
    href: "https://www.fsb.org/2023/02/the-financial-stability-risks-of-decentralised-finance/",
    label: "DeFi risk",
    date: "2023-02-16",
    dateLabel: "February 2023"
  },
  {
    title: "Global Regulatory Framework for Crypto-asset Activities",
    author: "Financial Stability Board",
    description: "High-level recommendations for consistent and comprehensive regulation, supervision and oversight of crypto-asset activities and markets.",
    href: "https://www.fsb.org/2023/07/global-regulatory-framework-for-crypto-asset-activities/",
    label: "Global regulation",
    date: "2023-07-17",
    dateLabel: "July 2023"
  },
  {
    title: "The Tokenisation Continuum",
    author: "Bank for International Settlements",
    description: "Research into how tokenisation may reshape financial-market infrastructure, asset representation and settlement arrangements.",
    href: "https://www.bis.org/publ/bisbull72.htm",
    label: "Market infrastructure",
    date: "2023-04-11",
    dateLabel: "April 2023"
  }
].sort((a, b) => String(b.date).localeCompare(String(a.date)));
const latestReports = reports.slice(0, 4);

function esc(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function slugify(value) {
  return String(value).toLowerCase().replaceAll("&", "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error("Missing frontmatter");
  const data = {};
  for (const line of match[1].split("\n")) {
    const i = line.indexOf(":");
    if (i < 0) continue;
    const key = line.slice(0, i).trim();
    let value = line.slice(i + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    if (value.includes("|")) data[key] = value.split("|").map((v) => v.trim()).filter(Boolean);
    else data[key] = value;
  }
  return { data, body: match[2].trim() };
}

function inlineMarkdown(text) {
  return esc(text)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

function markdownToHtml(body) {
  const lines = body.split("\n");
  const out = [];
  let list = false;
  let paragraph = [];
  const flushP = () => {
    if (paragraph.length) {
      out.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
      paragraph = [];
    }
  };
  const closeList = () => {
    if (list) {
      out.push("</ul>");
      list = false;
    }
  };
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushP();
      closeList();
      continue;
    }
    if (trimmed.startsWith("### ")) {
      flushP();
      closeList();
      out.push(`<h3>${inlineMarkdown(trimmed.slice(4))}</h3>`);
    } else if (trimmed.startsWith("## ")) {
      flushP();
      closeList();
      out.push(`<h2>${inlineMarkdown(trimmed.slice(3))}</h2>`);
    } else if (trimmed.startsWith("- ")) {
      flushP();
      if (!list) {
        out.push("<ul>");
        list = true;
      }
      out.push(`<li>${inlineMarkdown(trimmed.slice(2))}</li>`);
    } else {
      paragraph.push(trimmed);
    }
  }
  flushP();
  closeList();
  return out.join("\n");
}

function readPosts() {
  return fs.readdirSync(contentDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const parsed = parseFrontmatter(fs.readFileSync(path.join(contentDir, file), "utf8"));
      const slug = parsed.data.slug || slugify(parsed.data.title);
      return { ...parsed.data, slug, body: parsed.body, html: markdownToHtml(parsed.body) };
    })
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));
}

function header(active = "") {
  return `<header class="site-header light-header" data-site-header><nav class="nav" aria-label="Main navigation"><a class="brand light-brand" href="/" aria-label="FluidRWA home"><img src="/assets/fluidrwa-small-logo.png" alt="FluidRWA"></a><button class="mobile-toggle light-toggle" type="button" aria-label="Open navigation" aria-expanded="false" data-nav-toggle><span></span><span></span><span></span></button><div class="nav-links light-nav-links" data-nav-links><a href="/">Home</a><a href="/solutions">Solutions</a><a href="/blog"${active === "blog" ? ' aria-current="page"' : ""}>Insights</a><a href="/arcade">Arcade</a><a href="/about">About</a><a href="/contact">Contact</a><a class="nav-ecosystem-cta" href="/web3vendorecosystem">Explore Vendor Ecosystem</a></div></nav></header>`;
}

function footer() {
  return `<footer class="light-footer"><div class="light-container footer-grid-lite footer-simple"><a class="footer-brand-link" href="/" aria-label="FluidRWA home"><img class="footer-logo-lite" src="/assets/fluidrwa-small-logo.png" alt="FluidRWA"></a><nav class="footer-legal-links" aria-label="Footer navigation"><a href="/contact">Contact Us</a><a href="/about">About</a><a href="/arcade">Arcade</a><a href="/privacy">Privacy Policy</a><a href="/terms">Terms & Conditions</a></nav></div><div class="light-container footer-bottom-lite">© <span data-year></span> FluidRWA.</div></footer>`;
}

function blogStyles() {
  return `<style>
    .blog-page{background:#f8fbff;overflow-x:hidden}.blog-hero{padding:136px 0 52px;background:radial-gradient(circle at 12% 18%,rgba(255,227,110,.38),transparent 28%),radial-gradient(circle at 86% 16%,rgba(76,178,224,.24),transparent 30%),linear-gradient(135deg,#fffdf1 0%,#eff8ff 55%,#f8fbff 100%)}.blog-hero h1,.post-hero h1{margin:0;color:#12213a;font-family:var(--fluid-display);font-size:clamp(34px,5vw,58px);font-weight:650;letter-spacing:-.006em;line-height:1.08;overflow-wrap:anywhere}.blog-hero p,.post-hero p{max-width:760px;color:rgba(18,33,58,.72);font-size:18px;line-height:1.7}.reviewed-line{font-size:13px!important;font-weight:850;letter-spacing:.03em}.blog-category-link{display:inline-flex;margin-top:16px;border:1px solid rgba(38,100,169,.18);border-radius:999px;background:rgba(255,255,255,.72);box-shadow:0 14px 34px rgba(18,33,58,.08);color:#12213a;padding:12px 18px;text-decoration:none;font-weight:950}.report-library{padding:58px 0 20px}.report-library-shell{border:1px solid rgba(38,100,169,.13);border-radius:34px;background:radial-gradient(circle at 92% 8%,rgba(116,210,239,.32),transparent 25%),radial-gradient(circle at 8% 100%,rgba(255,227,110,.36),transparent 26%),linear-gradient(145deg,rgba(255,255,255,.96),rgba(238,248,255,.9));box-shadow:0 28px 80px rgba(18,33,58,.09);padding:clamp(22px,4vw,48px)}.report-library-head{display:flex;gap:24px;align-items:end;justify-content:space-between;margin-bottom:28px}.report-library-head h2{max-width:720px;margin:7px 0 0;color:#12213a;font-family:var(--fluid-display);font-size:clamp(30px,4vw,48px);font-weight:650;line-height:1.08}.report-library-head p:last-child{max-width:440px;margin:0;color:rgba(18,33,58,.64);line-height:1.65}.report-grid{display:grid;grid-template-columns:1.35fr repeat(3,minmax(0,1fr));gap:14px}.report-card{position:relative;display:flex;min-height:350px;flex-direction:column;overflow:hidden;border:1px solid rgba(38,100,169,.13);border-radius:24px;background:rgba(255,255,255,.72);box-shadow:0 18px 44px rgba(18,33,58,.06);padding:22px;text-decoration:none;transition:transform .22s ease,box-shadow .22s ease,background .22s ease}.report-card:first-child{background:linear-gradient(155deg,#12213a,#1d416b);box-shadow:0 28px 70px rgba(18,33,58,.2)}.report-card:after{content:"↗";position:absolute;right:18px;bottom:17px;width:38px;height:38px;display:grid;place-items:center;border-radius:50%;background:#12213a;color:#fff;font-size:18px}.report-card:first-child:after{background:#ffe36e;color:#12213a}.report-card:hover{transform:translateY(-5px);box-shadow:0 28px 70px rgba(38,100,169,.16);background:#fff}.report-card:first-child:hover{background:linear-gradient(155deg,#173152,#22527f)}.report-card span{color:#2664a9;font-size:10px;font-weight:950;letter-spacing:.12em;text-transform:uppercase}.report-card:first-child span,.report-card:first-child strong,.report-card:first-child p,.report-card:first-child b{color:rgba(255,255,255,.78)}.report-card h3{margin:16px 0 8px;color:#12213a;font-family:var(--fluid-display);font-size:22px;font-weight:650;line-height:1.13}.report-card:first-child h3{color:#fff;font-size:clamp(26px,3vw,38px)}.report-card strong{color:rgba(18,33,58,.56);font-size:12px}.report-card time{display:block;margin-top:7px;color:rgba(18,33,58,.48);font-size:11px;font-weight:900}.report-card:first-child time{color:rgba(255,255,255,.58)}.report-card p{margin:18px 0 54px;color:rgba(18,33,58,.68);font-size:14px;line-height:1.62}.report-card b{margin-top:auto;color:#2664a9;font-size:12px;font-weight:950;text-transform:uppercase;letter-spacing:.08em}.report-library-action{display:flex;justify-content:flex-end;margin-top:24px}.report-library-action a{display:inline-flex;align-items:center;gap:12px;border-radius:999px;background:#ffe36e;color:#12213a;padding:14px 20px;text-decoration:none;font-weight:950;box-shadow:0 14px 32px rgba(18,33,58,.1)}.report-archive{padding:48px 0 70px}.report-archive .report-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.report-archive .report-card:first-child{background:rgba(255,255,255,.72);box-shadow:0 18px 44px rgba(18,33,58,.06)}.report-archive .report-card:first-child h3{color:#12213a;font-size:22px}.report-archive .report-card:first-child span,.report-archive .report-card:first-child strong,.report-archive .report-card:first-child p,.report-archive .report-card:first-child b{color:inherit}.report-archive .report-card:first-child span,.report-archive .report-card:first-child b{color:#2664a9}.report-archive .report-card:first-child strong{color:rgba(18,33,58,.56)}.report-archive .report-card:first-child p{color:rgba(18,33,58,.68)}.report-archive .report-card:first-child time{color:rgba(18,33,58,.48)}.report-archive .report-card:first-child:after{background:#12213a;color:#fff}.blog-tools{padding:28px 0 0}.blog-search-wrap{display:flex;align-items:center;border:1px solid rgba(38,100,169,.16);border-radius:26px;background:rgba(255,255,255,.82);box-shadow:0 18px 44px rgba(18,33,58,.06);padding:10px}.blog-search-wrap input{width:100%;border:0;background:transparent;color:#12213a;font:700 17px/1.4 var(--fluid-body);outline:0;padding:12px 14px}.blog-search-wrap input::placeholder{color:rgba(18,33,58,.45)}.blog-category-tabs{display:flex;flex-wrap:wrap;gap:10px;margin-top:16px}.blog-category-tabs button{border:1px solid rgba(38,100,169,.14);border-radius:999px;background:rgba(255,255,255,.72);color:#12213a;cursor:pointer;font:900 13px/1 var(--fluid-body);padding:11px 14px;transition:background .2s ease,box-shadow .2s ease,transform .2s ease}.blog-category-tabs button:hover{transform:translateY(-1px)}.blog-category-tabs button.is-active{background:#ffe36e;box-shadow:0 12px 28px rgba(18,33,58,.08)}.blog-empty{margin:24px 0 0;color:rgba(18,33,58,.66);font-weight:800}.blog-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;padding:42px 0 64px}.blog-card{overflow:hidden;border:1px solid rgba(38,100,169,.12);border-radius:24px;background:rgba(255,255,255,.78);box-shadow:0 18px 44px rgba(18,33,58,.06);text-decoration:none;color:#12213a;transition:transform .22s ease,box-shadow .22s ease}.blog-card:hover{transform:translateY(-4px);box-shadow:0 28px 70px rgba(38,100,169,.12)}.blog-card img{width:100%;height:auto;aspect-ratio:16/10;object-fit:cover;object-position:center center;display:block;flex:0 0 auto}.blog-card div{position:relative;z-index:1;padding:20px;background:rgba(255,255,255,.78)}.blog-card span,.post-meta{color:#2664a9;font-size:11px;font-weight:950;letter-spacing:.12em;text-transform:uppercase}.blog-card h2{margin:10px 0;color:#12213a;font-size:22px;line-height:1.16}.blog-card p{color:rgba(18,33,58,.68);line-height:1.62}.post-hero{padding:132px 0 38px;background:linear-gradient(135deg,#fffdf1 0%,#eff8ff 58%,#f8fbff 100%)}.post-layout{display:grid;grid-template-columns:minmax(0,1fr)280px;gap:44px;padding:52px 0}.post-main{max-width:830px;min-width:0}.post-main img{width:100%;border-radius:24px;box-shadow:0 24px 70px rgba(18,33,58,.09);margin-bottom:30px}.answer-box,.post-cta,.toc,.research-block{border:1px solid rgba(38,100,169,.12);border-radius:22px;background:rgba(255,255,255,.78);box-shadow:0 18px 44px rgba(18,33,58,.06);padding:24px}.answer-box{margin-bottom:28px;background:linear-gradient(135deg,rgba(255,227,110,.26),rgba(234,249,255,.8))}.research-block{margin:0 0 34px;background:linear-gradient(145deg,rgba(255,255,255,.95),rgba(236,248,255,.86))}.research-kicker{margin:0!important;color:#2664a9!important;font-size:11px!important;font-weight:950;letter-spacing:.12em;text-transform:uppercase}.research-block h2{margin:8px 0 12px}.research-table-wrap{overflow-x:auto;margin:20px 0;border:1px solid rgba(38,100,169,.14);border-radius:16px;background:#fff}.research-table{width:100%;min-width:650px;border-collapse:collapse}.research-table th,.research-table td{border-bottom:1px solid rgba(38,100,169,.1);padding:14px;text-align:left;vertical-align:top;color:#12213a;line-height:1.45}.research-table th{background:#eef8ff;font-size:13px}.research-table td{font-size:14px}.research-links,.source-list{margin-top:20px}.research-links strong,.source-list strong{display:block;color:#12213a;margin-bottom:10px}.research-links a{display:inline-flex;margin:0 8px 8px 0;border-radius:999px;background:#ffe89a;padding:9px 13px;text-decoration:none}.source-list ul{margin:0;padding-left:20px}.post-main h2{margin:36px 0 12px;color:#12213a;font-family:var(--fluid-display);font-size:30px;font-weight:650}.post-main h3{margin:28px 0 10px;color:#12213a;font-size:21px}.post-main p,.post-main li{color:rgba(18,33,58,.74);font-size:17px;line-height:1.76}.post-main a{color:#2664a9;font-weight:850;overflow-wrap:anywhere}.toc{position:sticky;top:110px;height:max-content;min-width:0}.toc strong{display:block;margin-bottom:12px;color:#12213a}.toc a{display:block;margin:10px 0;color:#2664a9;text-decoration:none;font-weight:800;overflow-wrap:anywhere}.post-cta{margin-top:36px;background:#12213a;color:#fff}.post-cta h2{margin:0 0 8px;color:#fff}.post-cta p{color:rgba(255,255,255,.76)}.post-cta a{display:inline-flex;margin-top:12px;border-radius:999px;background:#ffe36e;color:#12213a;padding:12px 18px;text-decoration:none;font-weight:950}.faq-list details{border:1px solid rgba(38,100,169,.12);border-radius:16px;background:#fff;margin:10px 0;padding:18px}.faq-list summary{cursor:pointer;color:#12213a;font-weight:900}@media(max-width:1180px){.report-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.report-card:first-child{grid-column:span 2}.report-archive .report-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.report-archive .report-card:first-child{grid-column:auto}}@media(max-width:980px){.blog-grid,.post-layout{grid-template-columns:1fr}.toc{position:static}.report-library-head{display:block}.report-library-head p:last-child{max-width:760px;margin-top:12px}}@media(max-width:620px){.blog-grid{padding:28px 0 40px}.post-layout{padding:32px 0}.blog-hero,.post-hero{padding-top:116px}.post-hero h1,.blog-hero h1{font-size:clamp(30px,8.8vw,38px)}.post-main h2{font-size:27px}.research-block{padding:18px}.report-library{padding-top:32px}.report-library-shell{border-radius:24px;padding:18px}.report-grid,.report-archive .report-grid{display:flex;gap:12px;overflow-x:auto;scroll-snap-type:x mandatory;padding:0 0 14px}.report-card,.report-card:first-child{grid-column:auto;flex:0 0 min(84vw,320px);min-height:330px;scroll-snap-align:start}.report-library-action{justify-content:stretch}.report-library-action a{justify-content:center;width:100%}.blog-card{display:flex;flex-direction:column}.blog-card img{height:auto;max-height:210px;aspect-ratio:16/9}.blog-card div{background:rgba(255,255,255,.82);padding:18px}.blog-card h2{font-size:21px}.blog-card p{font-size:15px;line-height:1.55}.blog-category-tabs{flex-wrap:nowrap;overflow-x:auto;padding-bottom:8px}.blog-category-tabs button{white-space:nowrap}}
    .report-library{padding:30px 0 16px}.report-library-shell{padding:26px 28px 24px}.report-library-head{align-items:center;margin-bottom:18px}.report-library-head h2{font-size:clamp(27px,3vw,39px)}.report-library-head p:last-child{font-size:14px;line-height:1.5}.report-grid{grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}.report-card,.report-card:first-child{min-height:0;padding:0;background:rgba(255,255,255,.84);box-shadow:0 14px 34px rgba(18,33,58,.08)}.report-card:first-child h3{color:#12213a;font-size:20px}.report-card:first-child span,.report-card:first-child strong,.report-card:first-child p,.report-card:first-child b{color:inherit}.report-card:first-child span,.report-card:first-child b{color:#2664a9}.report-card:first-child strong{color:rgba(18,33,58,.56)}.report-card:first-child p{color:rgba(18,33,58,.68)}.report-card:first-child time{color:rgba(18,33,58,.48)}.report-card:first-child:after{background:#12213a;color:#fff}.report-cover{position:relative;height:150px;overflow:hidden;background:#dcebf8}.report-cover img{width:100%;height:100%;display:block;object-fit:cover;object-position:center top;transition:transform .35s ease}.report-card:hover .report-cover img{transform:scale(1.035)}.report-card-copy{display:flex;min-height:174px;flex-direction:column;padding:16px 16px 17px}.report-card h3,.report-card:first-child h3{margin:8px 0 6px;font-family:var(--fluid-body);font-size:17px;font-weight:950;line-height:1.14}.report-card p{display:none}.report-card b{margin-top:auto}.report-card:after{right:14px;bottom:13px;width:32px;height:32px;font-size:15px}.report-library-action{margin-top:17px}.report-library-action a{padding:11px 17px;font-size:13px}.report-archive .report-card{padding:0}.report-archive .report-card-copy{min-height:260px;padding:20px}.report-archive .report-card p{display:block;margin:14px 0 48px}.report-archive .report-cover{height:190px}@media(max-width:1180px){.report-grid{grid-template-columns:repeat(4,minmax(0,1fr))}.report-card:first-child{grid-column:auto}}@media(max-width:900px){.report-library-head{display:block}.report-library-head p:last-child{margin-top:8px}.report-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:620px){.report-library-shell{padding:18px}.report-grid,.report-archive .report-grid{display:flex}.report-card,.report-card:first-child{flex:0 0 min(78vw,290px)}.report-cover{height:145px}.report-card-copy{min-height:170px}.report-library-head h2{font-size:29px}}
  </style>`;
}

function reportLibrary() {
  return `<section class="report-library" aria-labelledby="reports-title"><div class="light-container"><div class="report-library-shell"><div class="report-library-head"><div><p class="eyebrow light-eyebrow">Latest reports</p><h2 id="reports-title">Research worth having on your desk</h2></div><p>The newest institutional reports and published research across digital assets, tokenization, regulation and market infrastructure.</p></div><div class="report-grid">${latestReports.map(reportCard).join("")}</div><div class="report-library-action"><a href="/reports-research">Access Reports &amp; Research <span aria-hidden="true">→</span></a></div></div></div></section>`;
}

function reportCard(report) {
  const cover = report.cover ? `<div class="report-cover"><img src="${esc(report.cover)}" alt="${esc(`${report.title} report preview`)}" width="600" height="400" loading="lazy" decoding="async"></div>` : "";
  return `<a class="report-card" href="${esc(report.href)}" target="_blank" rel="noopener noreferrer">${cover}<div class="report-card-copy"><span>${esc(report.label)}</span><h3>${esc(report.title)}</h3><strong>By ${esc(report.author)}</strong><time datetime="${esc(report.date)}">${esc(report.dateLabel)}</time><p>${esc(report.description)}</p><b>Access Report</b></div></a>`;
}

function reportsPage() {
  const url = `${site}/reports-research`;
  const description = "Access published reports and institutional research covering digital assets, tokenization, Web3, DeFi, regulation and financial infrastructure.";
  const schema = { "@context": "https://schema.org", "@type": "CollectionPage", name: "Digital Asset Reports and Research", url, description, mainEntity: { "@type": "ItemList", numberOfItems: reports.length, itemListElement: reports.map((report, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "Report", name: report.title, author: { "@type": "Organization", name: report.author }, datePublished: report.date, url: report.href, description: report.description } })) } };
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Digital Asset Reports and Research | FluidRWA</title><meta name="description" content="${esc(description)}"><meta name="robots" content="index, follow, max-snippet:-1"><link rel="canonical" href="${url}"><link rel="icon" href="/assets/favicon.png" type="image/png"><link rel="stylesheet" href="/assets/styles-yellow-blue.css?v=forms-1">${blogStyles()}<script type="application/ld+json">${JSON.stringify(schema)}</script></head><body class="light-home blog-page">${header("blog")}<main><section class="blog-hero"><div class="light-container"><p class="eyebrow light-eyebrow">Reports and research</p><h1>Published intelligence for digital asset teams</h1><p>${esc(description)}</p><a class="blog-category-link" href="/blog">Back to Insights</a></div></section><section class="report-archive"><div class="light-container"><div class="report-library-head"><div><p class="eyebrow light-eyebrow">Newest first</p><h2>Research library</h2></div><p>Reports are ordered by publication date so the latest market intelligence is always easiest to find.</p></div><div class="report-grid">${reports.map(reportCard).join("")}</div></div></section></main>${footer()}<script src="/assets/site.js?v=forms-1" defer></script></body></html>`;
}

function cardDescription(post) {
  const repeated = "A practical answer for teams evaluating asset tokenization, RWA infrastructure and tokenization providers.";
  const description = String(post.description || "").replace(repeated, "").replace(/\s+/g, " ").trim();
  if (description) return description;
  return String(post.answer || "A focused FluidRWA guide for teams comparing Web3 infrastructure partners.").replace(/\s+/g, " ").trim();
}

function cleanDescription(post) {
  const repeated = "A practical answer for teams evaluating asset tokenization, RWA infrastructure and tokenization providers.";
  const description = String(post.description || "").replace(repeated, "").replace(/\s+/g, " ").trim();
  return description || String(post.answer || "").replace(/\s+/g, " ").trim();
}

function researchBlock(post) {
  const research = getBlogResearch(post.slug);
  if (!research) return "";
  const table = `<div class="research-table-wrap"><table class="research-table"><thead><tr>${research.headers.map((item) => `<th>${esc(item)}</th>`).join("")}</tr></thead><tbody>${research.rows.map((row) => `<tr>${row.map((item) => `<td>${esc(item)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  const links = research.links?.length ? `<div class="research-links"><strong>Continue your research</strong>${research.links.map(([label, href]) => `<a href="${esc(href)}">${esc(label)}</a>`).join("")}</div>` : "";
  const sources = research.sources?.length ? `<div class="source-list"><strong>Primary and authoritative sources</strong><ul>${research.sources.map(([label, href]) => `<li><a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a></li>`).join("")}</ul></div>` : "";
  return `<section class="research-block" aria-labelledby="research-${esc(post.slug)}"><p class="research-kicker">FluidRWA research brief</p><h2 id="research-${esc(post.slug)}">${esc(research.label)}</h2><p>${esc(research.intro)}</p>${table}${links}${sources}</section>`;
}

function postPage(post, posts) {
  const url = `${site}/blog/${post.slug}/`;
  const description = cleanDescription(post);
  const socialImage = post.socialImage || post.image;
  const imageUrl = socialImage && socialImage.startsWith("/") ? `${site}${socialImage}` : socialImage;
  const faqs = [1, 2, 3].map((n) => ({ q: post[`faq${n}q`], a: post[`faq${n}a`] })).filter((f) => f.q && f.a).map((faq) => {
    if (/^Is .+ a legal question or a technology question\?$/i.test(faq.q)) {
      return {
        q: "What should teams verify before acting on this guidance?",
        a: "Verify the underlying asset rights, jurisdiction, investor eligibility, vendor responsibilities and operating controls with qualified legal, tax, security and financial specialists where relevant."
      };
    }
    return faq;
  });
  const headings = [...post.html.matchAll(/<h2>(.*?)<\/h2>/g)].map((m) => m[1].replace(/<[^>]+>/g, ""));
  const related = posts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category))
    .slice(0, 4);
  const research = getBlogResearch(post.slug);
  const citations = research?.sources?.map(([, href]) => href) || [];
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Article", headline: post.title, description, image: imageUrl, datePublished: post.date, dateModified: reviewedDate, author: { "@type": "Organization", name: "FluidRWA", url: site }, publisher: { "@type": "Organization", name: "FluidRWA", logo: { "@type": "ImageObject", url: `${site}/assets/fluidrwa-small-logo.png` } }, mainEntityOfPage: url, citation: citations, speakable: { "@type": "SpeakableSpecification", cssSelector: [".answer-box", ".research-block"] }, about: [{ "@type": "Thing", name: post.category }, { "@type": "Thing", name: "Web3 vendor discovery" }, { "@type": "Thing", name: "Digital asset infrastructure" }] },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: site }, { "@type": "ListItem", position: 2, name: "Insights", item: `${site}/blog.html` }, { "@type": "ListItem", position: 3, name: post.title, item: url }] },
      { "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }
    ]
  };
  const toc = headings.map((h) => `<a href="#${slugify(h)}">${esc(h)}</a>`).join("");
  const html = post.html.replace(/<h2>(.*?)<\/h2>/g, (_, h) => `<h2 id="${slugify(h.replace(/<[^>]+>/g, ""))}">${h}</h2>`);
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(post.title)} | FluidRWA</title><meta name="description" content="${esc(description)}"><meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1"><meta name="author" content="FluidRWA"><meta property="article:modified_time" content="${reviewedDate}"><link rel="canonical" href="${url}"><link rel="icon" href="/assets/favicon.png" type="image/png"><link rel="preload" as="image" href="/assets/fluidrwa-small-logo.png" fetchpriority="high"><link rel="stylesheet" href="/assets/styles-yellow-blue.css?v=forms-1"><meta property="og:type" content="article"><meta property="og:site_name" content="FluidRWA"><meta property="og:title" content="${esc(post.title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${esc(imageUrl)}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${esc(imageUrl)}">${blogStyles()}<script type="application/ld+json">${JSON.stringify(schema)}</script></head><body class="light-home blog-page">${header("blog")}<main><section class="post-hero"><div class="light-container"><p class="post-meta">${esc(post.category)}</p><h1>${esc(post.title)}</h1><p>${esc(description)}</p><p class="reviewed-line">Reviewed and updated by FluidRWA · ${reviewedLabel}</p></div></section><div class="light-container post-layout"><article class="post-main"><img src="${esc(post.image)}?v=visual-6" alt="${esc(post.imageAlt || post.title)}" width="960" height="540" loading="eager" decoding="async"><div class="answer-box"><strong>Short answer</strong><p>${esc(post.answer)}</p></div>${researchBlock(post)}${html}<section class="faq-list" aria-labelledby="faq-title"><h2 id="faq-title">FAQ</h2>${faqs.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("")}</section><section class="post-cta"><h2>${esc(post.ctaTitle || "Find the right vendor faster.")}</h2><p>${esc(post.ctaText || "Use FluidRWA to move from broad research to a focused vendor path.")}</p><a href="${esc(post.ctaUrl || "/submit-requirement")}">${esc(post.ctaLabel || "Submit Project")}</a></section></article><aside class="toc"><strong>In this article</strong>${research ? `<a href="#research-${esc(post.slug)}">${esc(research.label)}</a>` : ""}${toc}<strong style="margin-top:24px">Related insights</strong>${related.map((p) => `<a href="/blog/${p.slug}/">${esc(p.title)}</a>`).join("")}</aside></div></main>${footer()}<script src="/assets/site.js?v=forms-1" defer></script></body></html>`;
}

function indexPage(posts) {
  const schema = { "@context": "https://schema.org", "@type": "CollectionPage", name: "FluidRWA Insights", url: `${site}/blog.html`, description: "SEO and AEO optimized guides about RWA, Web3 vendor discovery and digital asset infrastructure.", hasPart: reports.map((report) => ({ "@type": "CreativeWork", name: report.title, author: { "@type": "Organization", name: report.author }, url: report.href, description: report.description })), mainEntity: { "@type": "ItemList", numberOfItems: posts.length, itemListElement: posts.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.title, url: `${site}/blog/${p.slug}/` })) } };
  const imageUrl = `${site}/assets/social/blog.png`;
  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category).filter(Boolean))).sort()];
  const filters = `<section class="light-container blog-tools" data-blog-tools><div class="blog-search-wrap"><input data-blog-search type="search" placeholder="Search insights by topic, vendor category or question" aria-label="Search FluidRWA insights"></div><div class="blog-category-tabs" aria-label="Insight categories">${categories.map((category) => `<button type="button" data-blog-category="${esc(category.toLowerCase())}" class="${category === "All" ? "is-active" : ""}">${esc(category)}</button>`).join("")}</div><p class="blog-empty" data-blog-empty hidden>No insights match your search.</p></section>`;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>FluidRWA Insights | Web3 Vendor Discovery Guides</title><meta name="description" content="Read practical FluidRWA guides on RWA tokenization, Web3 infrastructure vendors, custody, compliance, payments, AI and digital asset operations."><meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1"><link rel="canonical" href="${site}/blog.html"><link rel="icon" href="/assets/favicon.png" type="image/png"><link rel="stylesheet" href="/assets/styles-yellow-blue.css?v=forms-1"><meta property="og:type" content="website"><meta property="og:site_name" content="FluidRWA"><meta property="og:title" content="FluidRWA Insights"><meta property="og:description" content="Clear guides for Web3 vendor discovery, RWA infrastructure and tokenized finance teams."><meta property="og:url" content="${site}/blog.html"><meta property="og:image" content="${imageUrl}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${imageUrl}">${blogStyles()}<script type="application/ld+json">${JSON.stringify(schema)}</script></head><body class="light-home blog-page">${header("blog")}<main><section class="blog-hero"><div class="light-container"><p class="eyebrow light-eyebrow">FluidRWA Insights</p><h1>Clear guides for Web3 vendor discovery.</h1><p>Explainers for teams choosing infrastructure across tokenization, compliance, custody, payments, AI, legal, audits and digital asset operations.</p><a class="blog-category-link" href="/blog/tokenization/">Browse Tokenization Guides</a></div></section>${reportLibrary()}${filters}<section class="light-container blog-grid" data-blog-grid>${posts.map((p) => `<a class="blog-card" data-blog-card data-category="${esc(String(p.category || "").toLowerCase())}" data-search="${esc(`${p.title} ${p.category} ${p.description} ${p.answer}`.toLowerCase())}" href="/blog/${p.slug}/"><img src="${esc(p.image)}?v=visual-6" alt="${esc(p.imageAlt || p.title)}" width="640" height="400" loading="lazy" decoding="async"><div><span>${esc(p.category)}</span><h2>${esc(p.title)}</h2><p>${esc(cardDescription(p))}</p></div></a>`).join("")}</section></main>${footer()}<script src="/assets/site.js?v=forms-1" defer></script></body></html>`;
}

function categoryPage(posts, category, slug, title, description) {
  const categoryPosts = posts.filter((p) => p.category === category);
  const url = `${site}/blog/${slug}/`;
  const schema = { "@context": "https://schema.org", "@type": "CollectionPage", name: title, url, description, mainEntity: { "@type": "ItemList", numberOfItems: categoryPosts.length, itemListElement: categoryPosts.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.title, url: `${site}/blog/${p.slug}/` })) } };
  const imageUrl = `${site}/assets/social/blog.png`;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(title)} | FluidRWA</title><meta name="description" content="${esc(description)}"><meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1"><link rel="canonical" href="${url}"><link rel="icon" href="/assets/favicon.png" type="image/png"><link rel="stylesheet" href="/assets/styles-yellow-blue.css?v=forms-1"><meta property="og:type" content="website"><meta property="og:site_name" content="FluidRWA"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${imageUrl}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${imageUrl}">${blogStyles()}<script type="application/ld+json">${JSON.stringify(schema)}</script></head><body class="light-home blog-page">${header("blog")}<main><section class="blog-hero"><div class="light-container"><p class="eyebrow light-eyebrow">Tokenization Blogs</p><h1>${esc(title)}</h1><p>${esc(description)}</p></div></section><section class="light-container blog-grid">${categoryPosts.map((p) => `<a class="blog-card" href="/blog/${p.slug}/"><img src="${esc(p.image)}?v=visual-6" alt="${esc(p.imageAlt || p.title)}" width="640" height="400" loading="lazy" decoding="async"><div><span>${esc(p.category)}</span><h2>${esc(p.title)}</h2><p>${esc(cardDescription(p))}</p></div></a>`).join("")}</section></main>${footer()}<script src="/assets/site.js?v=forms-1" defer></script></body></html>`;
}

function updateSitemap(posts) {
  const sitemapPath = path.join(root, "sitemap.xml");
  let sitemap = fs.readFileSync(sitemapPath, "utf8");
  sitemap = sitemap.replace(/\s*<url><loc>https:\/\/www\.fluidrwa\.com\/blog(?:\.html|\/[^<]*)<\/loc>[\s\S]*?<\/url>/g, "");
  sitemap = sitemap.replace(/\s*<url><loc>https:\/\/www\.fluidrwa\.com\/reports-research<\/loc>[\s\S]*?<\/url>/g, "");
  const entries = [`  <url><loc>${site}/blog.html</loc><lastmod>${reviewedDate}</lastmod><changefreq>weekly</changefreq><priority>0.85</priority></url>`, `  <url><loc>${site}/reports-research</loc><lastmod>${reviewedDate}</lastmod><changefreq>weekly</changefreq><priority>0.82</priority></url>`, `  <url><loc>${site}/blog/tokenization/</loc><lastmod>${reviewedDate}</lastmod><changefreq>weekly</changefreq><priority>0.78</priority></url>`, ...posts.map((p) => `  <url><loc>${site}/blog/${p.slug}/</loc><lastmod>${reviewedDate}</lastmod><changefreq>monthly</changefreq><priority>0.72</priority></url>`)].join("\n");
  sitemap = sitemap.replace(/\s*<\/urlset>/, `\n${entries}\n</urlset>`);
  fs.writeFileSync(sitemapPath, sitemap);
}

function updateLlms(posts) {
  const llmsPath = path.join(root, "llms.txt");
  let text = fs.readFileSync(llmsPath, "utf8");
  text = text.replace(/\n## Blog insights[\s\S]*?(?=\n## |$)/, "");
  const block = `\n## Blog insights\n\n- Blog index: ${site}/blog.html\n- Tokenization blog category: ${site}/blog/tokenization/\n${posts.map((p) => `- ${p.title}: ${site}/blog/${p.slug}/`).join("\n")}\n`;
  text = text.replace("\n## Core vendor categories", `${block}\n## Core vendor categories`);
  fs.writeFileSync(llmsPath, text);
}

const posts = readPosts();
fs.rmSync(blogDir, { recursive: true, force: true });
fs.mkdirSync(blogDir, { recursive: true });
for (const post of posts) {
  const dir = path.join(blogDir, post.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), postPage(post, posts));
}
fs.writeFileSync(path.join(root, "blog.html"), indexPage(posts));
fs.writeFileSync(path.join(root, "reports-research.html"), reportsPage());
fs.mkdirSync(path.join(blogDir, "tokenization"), { recursive: true });
fs.writeFileSync(path.join(blogDir, "tokenization", "index.html"), categoryPage(posts, "Tokenization", "tokenization", "Tokenization Blogs and Asset Tokenization Guides", "Answer-first guides for asset tokenization, RWA infrastructure, tokenization platforms, compliance, costs, risks, investors and implementation."));
updateSitemap(posts);
updateLlms(posts);
console.log(`Built ${posts.length} blog posts.`);
