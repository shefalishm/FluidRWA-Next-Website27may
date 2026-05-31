import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "industries");
const site = "https://www.fluidrwa.com";

const industries = [
  {
    slug: "asset-managers",
    title: "Asset Managers",
    headline: "Digital asset infrastructure for asset managers",
    description: "How asset managers can use Web3, tokenization and blockchain infrastructure to launch, service and distribute modern investment products.",
    image: "https://images.unsplash.com/photo-1560472355-536de3962603?auto=format&fit=crop&w=980&q=70",
    intro: "Asset managers need infrastructure that makes digital asset products operationally credible: issuance, custody, compliance, investor onboarding, distributions, reporting and transfer controls. FluidRWA helps teams move from broad market research to the vendor categories that matter for regulated digital asset programs.",
    useCases: ["Tokenized funds and feeder structures", "Treasury, money market and private credit products", "Investor onboarding and eligibility checks", "Custody, wallets and approval workflows", "Reporting, distributions and lifecycle servicing"],
    vendors: ["/vendors/tokenization-platforms", "/vendors/crypto-custody-providers", "/vendors/kyc-aml-providers", "/vendors/compliance-infrastructure-providers", "/vendors/legal-regulatory-vendors"]
  },
  {
    slug: "financial-institutions",
    title: "Financial Institutions",
    headline: "Blockchain infrastructure for financial institutions",
    description: "How banks, fintechs and regulated financial institutions can evaluate Web3 infrastructure for payments, custody, compliance and digital asset operations.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=980&q=70",
    intro: "Financial institutions can use blockchain infrastructure for faster settlement, tokenized deposits, compliant stablecoin workflows, digital identity, custody and regulated asset servicing. The challenge is not finding hype; it is finding providers that fit governance, compliance, risk and integration requirements.",
    useCases: ["Stablecoin settlement and treasury workflows", "Digital asset custody and wallet infrastructure", "KYC, AML and sanctions screening", "Tokenized collateral and payment operations", "Compliance monitoring and audit trails"],
    vendors: ["/vendors/stablecoin-infrastructure-providers", "/vendors/crypto-custody-providers", "/vendors/compliance-infrastructure-providers", "/vendors/identity-solution-providers", "/vendors/fiat-on-off-ramp-providers"]
  },
  {
    slug: "real-estate-firms",
    title: "Real Estate Firms",
    headline: "Tokenization infrastructure for real estate firms",
    description: "How real estate firms can use blockchain and tokenization for ownership records, investor access, distributions and digital investment workflows.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=980&q=70",
    intro: "Real estate tokenization can support fractional ownership, investor onboarding, secondary transfer controls, automated distributions and clearer ownership records. FluidRWA helps real estate teams understand the legal, compliance, custody and technology layers needed before choosing providers.",
    useCases: ["Tokenized real estate offerings", "Fractional ownership and investor access", "Digital cap tables and transfer records", "Distribution and income payment workflows", "Cross-border investor onboarding"],
    vendors: ["/vendors/tokenization-platforms", "/vendors/legal-regulatory-vendors", "/vendors/kyc-aml-providers", "/vendors/compliance-infrastructure-providers", "/vendors/stablecoin-infrastructure-providers"]
  },
  {
    slug: "enterprises",
    title: "Enterprises",
    headline: "Web3 infrastructure for enterprise adoption",
    description: "How enterprises can use blockchain for traceability, identity, settlement, loyalty, data workflows and digital asset operations.",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=980&q=70",
    intro: "Enterprises do not need Web3 theatre. They need infrastructure that solves operational problems: provenance, settlement, identity, asset records, partner coordination and programmable workflows. FluidRWA helps enterprise teams compare provider categories before committing budget.",
    useCases: ["Supply chain and provenance records", "Partner settlement and payment automation", "Digital identity and credential workflows", "Tokenized loyalty or access systems", "Audit-ready operational records"],
    vendors: ["/vendors/blockchain-development-companies", "/vendors/identity-solution-providers", "/vendors/compliance-infrastructure-providers", "/vendors/stablecoin-infrastructure-providers", "/vendors/security-audit-companies"]
  },
  {
    slug: "web3-startups",
    title: "Web3 Startups",
    headline: "Infrastructure discovery for Web3 startups",
    description: "How Web3 startups can find providers for launch, compliance, smart contracts, audits, payments, identity and growth.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=980&q=70",
    intro: "Startups need to move fast without creating compliance, security or operational debt. FluidRWA helps founders identify the provider stack needed to launch products that investors, users and partners can trust.",
    useCases: ["Smart contract design and development", "Security audits before launch", "KYC and compliance readiness", "Fiat and stablecoin payment access", "Growth, PR and ecosystem positioning"],
    vendors: ["/vendors/smart-contract-development-companies", "/vendors/security-audit-companies", "/vendors/kyc-aml-providers", "/vendors/fiat-on-off-ramp-providers", "/vendors/growth-marketing-companies"]
  },
  {
    slug: "funds-investment-platforms",
    title: "Funds & Investment Platforms",
    headline: "Tokenized finance infrastructure for funds and investment platforms",
    description: "How funds and investment platforms can evaluate providers for tokenized funds, private markets, custody, compliance and distribution workflows.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=980&q=70",
    intro: "Funds and investment platforms need infrastructure that connects investor eligibility, asset issuance, custody, payment movement, reporting and secondary transfer rules. FluidRWA helps teams map the stack before vendor selection.",
    useCases: ["Tokenized fund launch infrastructure", "Private markets and RWA investment workflows", "Investor access and eligibility rules", "Custody and treasury operations", "Distribution, reporting and servicing"],
    vendors: ["/vendors/tokenization-platforms", "/vendors/crypto-custody-providers", "/vendors/legal-regulatory-vendors", "/vendors/kyc-aml-providers", "/vendors/compliance-infrastructure-providers"]
  },
  {
    slug: "governments-regulatory-initiatives",
    title: "Governments & Regulatory Initiatives",
    headline: "Blockchain infrastructure for public sector and regulated innovation",
    description: "How governments and regulatory initiatives can use blockchain for identity, registries, public records, compliance sandboxes and digital finance pilots.",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=980&q=70",
    intro: "Public sector blockchain projects require trust, governance and clear public benefit. FluidRWA helps teams identify categories for digital identity, registries, regulated pilots, compliance infrastructure and secure blockchain development.",
    useCases: ["Digital identity and credential systems", "Land, license and public record registries", "Regulatory sandbox infrastructure", "Public sector blockchain pilots", "Transparent audit trails and reporting"],
    vendors: ["/vendors/identity-solution-providers", "/vendors/blockchain-development-companies", "/vendors/compliance-infrastructure-providers", "/vendors/legal-regulatory-vendors", "/vendors/security-audit-companies"]
  },
  {
    slug: "service-providers-infrastructure-companies",
    title: "Service Providers & Infrastructure Companies",
    headline: "Visibility for Web3 infrastructure and service providers",
    description: "How Web3 vendors, service firms and infrastructure companies can be discovered by institutions and enterprises exploring digital asset adoption.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=980&q=70",
    intro: "Infrastructure companies need the right buyers to understand where they fit in the digital asset stack. FluidRWA is built around category-first discovery so institutions can find providers by operational need, not by noise.",
    useCases: ["Category-specific vendor visibility", "Institutional discovery and positioning", "Education-led buyer journeys", "Use-case alignment across sectors", "Inbound demand from teams researching infrastructure"],
    vendors: ["/apply-as-vendor", "/web3vendorecosystem", "/contact"]
  },
  {
    slug: "healthcare-life-sciences",
    title: "Healthcare & Life Sciences",
    headline: "Blockchain use cases for healthcare and life sciences",
    description: "How healthcare, biotech and life sciences organizations can use blockchain for data integrity, consent, credentials, supply chain and payments.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=980&q=70",
    intro: "Healthcare blockchain adoption is strongest where trust, traceability and consent matter. Potential use cases include credential verification, clinical data integrity, consent logs, pharmaceutical supply chain provenance and compliant payment workflows.",
    useCases: ["Patient consent and data access records", "Clinical trial data integrity", "Provider credential verification", "Pharmaceutical supply chain traceability", "Healthcare payment and settlement workflows"],
    vendors: ["/vendors/identity-solution-providers", "/vendors/compliance-infrastructure-providers", "/vendors/blockchain-development-companies", "/vendors/security-audit-companies", "/vendors/legal-regulatory-vendors"]
  },
  {
    slug: "maritime-logistics",
    title: "Maritime & Logistics",
    headline: "Blockchain infrastructure for maritime and logistics",
    description: "How maritime, shipping and logistics teams can use blockchain for trade documents, provenance, settlement and supply chain coordination.",
    image: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=980&q=70",
    intro: "Maritime and logistics workflows depend on multi-party coordination, documentation, compliance and settlement. Blockchain can support digital trade documents, cargo provenance, automated payments and shared audit trails across ports, carriers and financiers.",
    useCases: ["Digital bills of lading and trade documents", "Cargo provenance and chain-of-custody", "Port, carrier and insurer coordination", "Stablecoin settlement for cross-border workflows", "Compliance logs and audit records"],
    vendors: ["/vendors/blockchain-development-companies", "/vendors/stablecoin-infrastructure-providers", "/vendors/compliance-infrastructure-providers", "/vendors/legal-regulatory-vendors", "/vendors/security-audit-companies"]
  },
  {
    slug: "data-centers-compute-infrastructure",
    title: "Data Centers & Compute Infrastructure",
    headline: "Blockchain and tokenization use cases for data centers",
    description: "How data center and compute infrastructure companies can use tokenization, blockchain records and digital finance infrastructure.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=980&q=70",
    intro: "Data centers and compute infrastructure are becoming financial, energy and digital asset infrastructure at the same time. Blockchain can support tokenized infrastructure financing, energy attribution, usage records, compute marketplaces and transparent revenue participation models.",
    useCases: ["Tokenized infrastructure finance", "Compute usage and settlement records", "Energy attribution and certificate tracking", "Data center investment access", "Operational audit trails for counterparties"],
    vendors: ["/vendors/tokenization-platforms", "/vendors/blockchain-development-companies", "/vendors/stablecoin-infrastructure-providers", "/vendors/compliance-infrastructure-providers", "/vendors/security-audit-companies"]
  },
  {
    slug: "carbon-credits-climate-markets",
    title: "Carbon Credits & Climate Markets",
    headline: "Blockchain use cases for carbon credits and climate markets",
    description: "How carbon credit, climate finance and sustainability teams can use blockchain for registry integrity, retirement tracking and market transparency.",
    image: "https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=980&q=70",
    intro: "Climate markets depend on trust in issuance, ownership, transfer and retirement records. Blockchain can help improve transparency for carbon credits, renewable energy certificates, project-level provenance and climate finance workflows.",
    useCases: ["Carbon credit issuance and registry integrity", "Credit transfer and retirement tracking", "Renewable energy certificate workflows", "Project provenance and impact reporting", "Climate finance and tokenized participation"],
    vendors: ["/vendors/tokenization-platforms", "/vendors/blockchain-development-companies", "/vendors/compliance-infrastructure-providers", "/vendors/legal-regulatory-vendors", "/vendors/ai-infrastructure-providers"]
  }
];

function esc(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function nav() {
  return `<header class="site-header light-header" data-site-header><nav class="nav" aria-label="Main navigation"><a class="brand light-brand" href="/" aria-label="FluidRWA home"><img src="/assets/fluidrwa-small-logo.png" alt="FluidRWA"></a><button class="mobile-toggle light-toggle" type="button" aria-label="Open navigation" aria-expanded="false" data-nav-toggle><span></span><span></span><span></span></button><div class="nav-links light-nav-links" data-nav-links><a href="/">Home</a><a href="/solutions">Solutions</a><a href="/blog">Insights</a><a href="/arcade">Arcade</a><a href="/about">About</a><a href="/contact">Contact</a><a class="nav-ecosystem-cta" href="/web3vendorecosystem">Explore Vendor Ecosystem</a></div></nav></header>`;
}

function footer() {
  return `<footer class="light-footer"><div class="light-container footer-grid-lite footer-simple"><a class="footer-brand-link" href="/" aria-label="FluidRWA home"><img class="footer-logo-lite" src="/assets/fluidrwa-small-logo.png" alt="FluidRWA"></a><nav class="footer-legal-links" aria-label="Footer navigation"><a href="/contact">Contact Us</a><a href="/about">About</a><a href="/arcade">Arcade</a><a href="/privacy">Privacy Policy</a><a href="/terms">Terms & Conditions</a></nav></div><div class="light-container footer-bottom-lite">© <span data-year></span> FluidRWA.</div></footer>`;
}

function styles() {
  return `<style>
    .industry-page{background:#fffdf1;color:#12213a;overflow-x:hidden}.industry-hero{padding:140px 0 68px;background:radial-gradient(circle at 12% 20%,rgba(255,227,110,.36),transparent 28%),radial-gradient(circle at 84% 18%,rgba(93,201,228,.28),transparent 30%),linear-gradient(135deg,#fff9df 0%,#f2fbff 58%,#fffdf1 100%)}.industry-hero-grid{display:grid;grid-template-columns:minmax(0,1fr)460px;gap:50px;align-items:center}.industry-hero h1{margin:0;color:#12213a;font-family:var(--fluid-display);font-size:clamp(38px,5vw,68px);font-weight:650;line-height:1.05;letter-spacing:-.006em}.industry-hero p{color:rgba(18,33,58,.72);font-size:18px;line-height:1.75;max-width:760px}.industry-image{overflow:hidden;border:1px solid rgba(38,100,169,.16);border-radius:34px;background:rgba(255,255,255,.72);box-shadow:0 28px 80px rgba(38,100,169,.12)}.industry-image img{display:block;width:100%;aspect-ratio:4/3;object-fit:cover}.industry-section{padding:64px 0}.industry-head{max-width:780px;margin-bottom:28px}.industry-head h2{margin:0 0 10px;color:#12213a;font-family:var(--fluid-display);font-size:clamp(30px,4vw,48px);font-weight:650}.industry-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}.industry-card{border:1px solid rgba(38,100,169,.13);border-radius:24px;background:rgba(255,255,255,.78);box-shadow:0 18px 44px rgba(18,33,58,.06);padding:24px}.industry-card span{display:inline-flex;width:34px;height:34px;align-items:center;justify-content:center;border-radius:50%;background:#e0f8ff;color:#2664a9;font-weight:950}.industry-card h3{margin:16px 0 8px;font-size:22px;line-height:1.2}.industry-card p,.industry-card li{color:rgba(18,33,58,.72);font-size:16px;line-height:1.65}.industry-card ul{padding-left:18px;margin:0}.industry-vendor-links{display:flex;flex-wrap:wrap;gap:12px}.industry-vendor-links a{display:inline-flex;border:1px solid rgba(38,100,169,.16);border-radius:999px;background:#fff;color:#2664a9;padding:12px 16px;text-decoration:none;font-weight:950;box-shadow:0 12px 30px rgba(18,33,58,.06)}.industry-cta{margin:36px 0 70px;border-radius:34px;background:#12213a;color:#fff;padding:42px;box-shadow:0 28px 80px rgba(18,33,58,.18)}.industry-cta h2{margin:0 0 10px;color:#fff;font-family:var(--fluid-display);font-size:clamp(30px,4vw,46px);font-weight:650}.industry-cta p{color:rgba(255,255,255,.76);font-size:17px;line-height:1.7}.industry-cta a{display:inline-flex;margin-top:12px;border-radius:999px;background:#ffe36e;color:#12213a;padding:13px 18px;text-decoration:none;font-weight:950}@media(max-width:980px){.industry-hero-grid,.industry-grid{grid-template-columns:1fr}.industry-image{max-width:560px}}@media(max-width:620px){.industry-hero{padding:118px 0 42px}.industry-section{padding:44px 0}.industry-hero h1{font-size:clamp(34px,10vw,44px)}.industry-card,.industry-cta{border-radius:22px;padding:22px}.industry-vendor-links a{width:100%;justify-content:center}}
  </style>`;
}

function page(industry) {
  const url = `${site}/industries/${industry.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", name: `${industry.title} | FluidRWA`, url, description: industry.description },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site },
        { "@type": "ListItem", position: 2, name: "Industries", item: `${site}/solutions` },
        { "@type": "ListItem", position: 3, name: industry.title, item: url }
      ] },
      { "@type": "FAQPage", mainEntity: [
        { "@type": "Question", name: `How can Web3 help ${industry.title.toLowerCase()}?`, acceptedAnswer: { "@type": "Answer", text: industry.intro } },
        { "@type": "Question", name: `What vendor categories should ${industry.title.toLowerCase()} compare first?`, acceptedAnswer: { "@type": "Answer", text: "Most teams should begin with the categories linked on this page, then narrow by jurisdiction, asset type, compliance needs, custody model and implementation timeline." } }
      ] }
    ]
  };
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(industry.title)} | Web3 and Blockchain Use Cases | FluidRWA</title><meta name="description" content="${esc(industry.description)}"><meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1"><link rel="canonical" href="${url}"><link rel="icon" href="/assets/favicon.png" type="image/png"><link rel="stylesheet" href="/assets/styles-yellow-blue.css?v=forms-1"><meta property="og:type" content="website"><meta property="og:site_name" content="FluidRWA"><meta property="og:title" content="${esc(industry.title)} | FluidRWA"><meta property="og:description" content="${esc(industry.description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="https://www.fluidrwa.com/assets/social/fluidrwa-preview.jpg"><meta name="twitter:card" content="summary_large_image">${styles()}<script type="application/ld+json">${JSON.stringify(schema)}</script></head><body class="light-home industry-page">${nav()}<main><section class="industry-hero"><div class="light-container industry-hero-grid"><div><p class="eyebrow light-eyebrow">FluidRWA Industry Guide</p><h1>${esc(industry.headline)}</h1><p>${esc(industry.description)}</p><div class="hero-actions"><a class="btn btn-primary light-primary" href="/submit-requirement">Submit Requirements</a><a class="btn btn-soft" href="/web3vendorecosystem">Explore Vendors</a></div></div><div class="industry-image"><img src="${esc(industry.image)}" alt="${esc(industry.title)} blockchain and digital asset infrastructure" width="980" height="735" loading="eager" decoding="async"></div></div></section><section class="industry-section"><div class="light-container"><div class="industry-head"><p class="eyebrow light-eyebrow">How Web3 can help</p><h2>Practical use cases for ${esc(industry.title)}</h2><p>${esc(industry.intro)}</p></div><div class="industry-grid">${industry.useCases.map((item, index) => `<article class="industry-card reveal"><span>${String(index + 1).padStart(2, "0")}</span><h3>${esc(item)}</h3><p>Use blockchain, digital asset infrastructure or tokenization where shared records, programmable settlement, trusted identity, compliance visibility or asset lifecycle automation create a measurable operational advantage.</p></article>`).join("")}</div></div></section><section class="industry-section"><div class="light-container"><div class="industry-head"><p class="eyebrow light-eyebrow">Vendor path</p><h2>Provider categories to compare</h2><p>FluidRWA helps ${esc(industry.title.toLowerCase())} move from “who should we use?” to a focused shortlist of infrastructure categories.</p></div><div class="industry-vendor-links">${industry.vendors.map((href) => `<a href="${esc(href)}">${esc(labelForHref(href))}</a>`).join("")}</div><div class="industry-cta"><h2>Need a vendor path for ${esc(industry.title)}?</h2><p>Share what you are building, your stage, market and vendor need. FluidRWA helps you identify the infrastructure categories that fit your workflow.</p><a href="/submit-requirement">Submit Requirements</a></div></div></section></main>${footer()}<script src="/assets/site.js?v=forms-1" defer></script></body></html>`;
}

function labelForHref(href) {
  const labels = {
    "/vendors/tokenization-platforms": "Tokenization Platforms",
    "/vendors/crypto-custody-providers": "Custody Providers",
    "/vendors/kyc-aml-providers": "KYC / AML Providers",
    "/vendors/compliance-infrastructure-providers": "Compliance Infrastructure",
    "/vendors/legal-regulatory-vendors": "Legal & Regulatory Vendors",
    "/vendors/stablecoin-infrastructure-providers": "Stablecoin Infrastructure",
    "/vendors/identity-solution-providers": "Identity Solutions",
    "/vendors/fiat-on-off-ramp-providers": "Fiat On & Off Ramps",
    "/vendors/blockchain-development-companies": "Blockchain Development",
    "/vendors/security-audit-companies": "Security & Audit Companies",
    "/vendors/smart-contract-development-companies": "Smart Contract Development",
    "/vendors/growth-marketing-companies": "Growth & Marketing",
    "/apply-as-vendor": "Apply as Vendor",
    "/web3vendorecosystem": "Explore Vendor Ecosystem",
    "/contact": "Contact FluidRWA",
    "/vendors/ai-infrastructure-providers": "AI Infrastructure Providers"
  };
  return labels[href] || href.replace(/^\//, "").replaceAll("-", " ");
}

fs.mkdirSync(outDir, { recursive: true });
for (const industry of industries) {
  fs.writeFileSync(path.join(outDir, `${industry.slug}.html`), page(industry));
}
console.log(`Generated ${industries.length} industry pages.`);
