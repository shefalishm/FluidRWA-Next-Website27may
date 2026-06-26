type VendorFallback = {
  name: string;
  type: string;
  url: string;
  bestFor: string;
  description: string;
  intelligence: string;
  tags: string[];
  hq: string;
  founded: string;
  services: string;
  markets: string;
};

type VendorCategoryFallback = {
  slug: string;
  title: string;
  intro: string;
  vendors: VendorFallback[];
};

const fallbackCategories: Record<string, VendorCategoryFallback> = {
  "vendors/growth-marketing/index.html": {
    slug: "growth-marketing",
    title: "Compare Growth & Marketing Vendors",
    intro:
      "Web3-native agencies and ecosystem partners supporting positioning, PR, community, paid media, creator distribution, launches and long-term growth.",
    vendors: [
      {
        name: "Coinbound",
        type: "Web3 Growth & Influencer Marketing",
        url: "https://coinbound.io",
        bestFor: "Crypto and Web3 companies that need influencer marketing, PR, SEO, social and community growth in one specialist partner.",
        description:
          "Coinbound is a crypto-native marketing agency focused on influencer campaigns, PR, SEO, social media, community growth and Web3 brand strategy.",
        intelligence:
          "Best suited for teams that want a single Web3 marketing partner with deep creator network access and experience across token, protocol, exchange, NFT and infrastructure campaigns.",
        tags: ["Influencer", "PR", "SEO", "Community"],
        hq: "USA",
        founded: "2018",
        services: "Influencer marketing, PR, SEO, social, community",
        markets: "Global"
      },
      {
        name: "Lunar Strategy",
        type: "Crypto Marketing & GTM Agency",
        url: "https://www.lunarstrategy.com",
        bestFor: "Blockchain projects that need go-to-market strategy, PR, paid ads, social media, influencer programs and launch execution.",
        description:
          "Lunar Strategy supports crypto and Web3 companies with positioning, PR, social media, paid acquisition, influencer marketing and launch planning.",
        intelligence:
          "Useful for projects that need structured launch support and ongoing growth across paid, owned and earned channels without relying on generic Web2 playbooks.",
        tags: ["GTM", "Paid Media", "PR", "Launches"],
        hq: "Portugal / Global",
        founded: "2019",
        services: "GTM, PR, paid media, social, influencer campaigns",
        markets: "Global"
      },
      {
        name: "MarketAcross",
        type: "Blockchain PR & Communications",
        url: "https://marketacross.com",
        bestFor: "Web3 companies that need crypto-native PR, media relations, narrative building and launch communications.",
        description:
          "MarketAcross is a blockchain PR and marketing firm focused on earned media, thought leadership, ecosystem positioning and campaign visibility.",
        intelligence:
          "Strong fit for projects where institutional credibility, media coverage and category narrative matter more than short-term hype mechanics.",
        tags: ["PR", "Media Relations", "Narrative", "Launches"],
        hq: "Israel / Global",
        founded: "2013",
        services: "PR, communications, content, media strategy",
        markets: "Global"
      },
      {
        name: "Wachsman",
        type: "Strategic Communications",
        url: "https://wachsman.com",
        bestFor: "Digital asset firms that need executive communications, public relations, policy-aware messaging and corporate reputation support.",
        description:
          "Wachsman provides communications strategy, media relations, brand positioning and advisory for fintech, blockchain and digital asset organizations.",
        intelligence:
          "Appropriate for infrastructure companies, institutions and regulated projects where trust, language discipline and long-term reputation are central to growth.",
        tags: ["Communications", "Reputation", "Fintech", "PR"],
        hq: "USA / Ireland",
        founded: "2015",
        services: "Strategic communications, PR, positioning",
        markets: "USA, Europe, Global"
      },
      {
        name: "Serotonin",
        type: "Web3 Marketing & Product Studio",
        url: "https://www.serotonin.co",
        bestFor: "Protocols and infrastructure companies needing brand, growth, product marketing, content and ecosystem strategy.",
        description:
          "Serotonin works with Web3 teams on marketing, brand strategy, product positioning, ecosystem growth and communications.",
        intelligence:
          "A good match for technically complex projects that need translation from protocol language into clear market narratives and user-facing campaigns.",
        tags: ["Brand", "Product Marketing", "Ecosystem", "Content"],
        hq: "USA / Global",
        founded: "2020",
        services: "Brand, growth, content, product marketing",
        markets: "Global"
      },
      {
        name: "NinjaPromo",
        type: "Fintech & Crypto Marketing Agency",
        url: "https://ninjapromo.io",
        bestFor: "Teams that need full-service digital marketing across SEO, paid ads, social media, video, community and PR.",
        description:
          "NinjaPromo provides digital marketing services for fintech, SaaS, crypto and Web3 companies across performance, content and social channels.",
        intelligence:
          "Useful for companies that want a broader digital marketing partner with crypto capability alongside traditional performance marketing execution.",
        tags: ["Performance", "SEO", "Social", "Video"],
        hq: "UK / Global",
        founded: "2017",
        services: "SEO, paid ads, social, PR, video",
        markets: "Global"
      },
      {
        name: "Crowdcreate",
        type: "Investor & Community Growth",
        url: "https://crowdcreate.us",
        bestFor: "Projects that need investor outreach, community development, influencer campaigns and launch visibility.",
        description:
          "Crowdcreate supports blockchain, fintech and startup teams with community building, investor relations, influencer marketing and growth campaigns.",
        intelligence:
          "Fits teams that need access to investor, founder and creator networks as part of a broader launch or fundraising motion.",
        tags: ["Community", "Investor Relations", "Influencer", "Launch"],
        hq: "USA",
        founded: "2014",
        services: "Community, investor outreach, influencer campaigns",
        markets: "Global"
      },
      {
        name: "GuerrillaBuzz",
        type: "Crypto Content & PR",
        url: "https://guerrillabuzz.com",
        bestFor: "Blockchain startups that need content marketing, SEO, PR and organic visibility in crypto-native channels.",
        description:
          "GuerrillaBuzz focuses on content, PR, organic growth and awareness campaigns for blockchain and Web3 companies.",
        intelligence:
          "Best for founders that want sustained visibility through content and organic discovery rather than purely paid promotion.",
        tags: ["Content", "SEO", "PR", "Organic"],
        hq: "Global",
        founded: "2018",
        services: "Content marketing, PR, SEO, organic growth",
        markets: "Global"
      },
      {
        name: "ReBlonde",
        type: "Blockchain PR",
        url: "https://www.reblonde.com",
        bestFor: "Crypto and technology companies that need media relations, campaign strategy and launch announcements.",
        description:
          "ReBlonde is a PR agency working with blockchain, technology and consumer companies on media visibility and launch communications.",
        intelligence:
          "Useful for teams that want focused PR support around launches, partnerships, funding announcements and credibility-building campaigns.",
        tags: ["PR", "Media", "Launch", "Technology"],
        hq: "Israel",
        founded: "2015",
        services: "PR, media relations, launch communications",
        markets: "Global"
      },
      {
        name: "Coinzilla",
        type: "Crypto Advertising Network",
        url: "https://coinzilla.com",
        bestFor: "Companies that need crypto-focused display advertising, sponsored content and paid reach across crypto media.",
        description:
          "Coinzilla provides advertising infrastructure for crypto companies, including display ads, native placements and publisher network access.",
        intelligence:
          "Works best as a paid distribution channel for already-defined campaigns, not as a replacement for positioning, messaging or full growth strategy.",
        tags: ["Advertising", "Media Buying", "Display", "Crypto Media"],
        hq: "Romania",
        founded: "2016",
        services: "Display ads, native ads, publisher network",
        markets: "Global"
      }
    ]
  },
  "vendors/identity-solutions/index.html": {
    slug: "identity-solutions",
    title: "Compare Identity Solutions Vendors",
    intro:
      "Identity, credential and verification infrastructure for Web3 users, institutions, regulated ecosystems and privacy-preserving digital asset workflows.",
    vendors: [
      {
        name: "Privado ID",
        type: "Decentralized Identity Infrastructure",
        url: "https://www.privado.id",
        bestFor: "Organizations that need privacy-preserving identity verification using decentralized identifiers and zero-knowledge proofs.",
        description:
          "Privado ID provides decentralized identity infrastructure for issuing, holding and verifying credentials with privacy-preserving proof flows.",
        intelligence:
          "Useful for tokenization, compliance and access-control workflows where users need to prove eligibility without exposing unnecessary personal data.",
        tags: ["DID", "ZK Proofs", "Credentials", "Access Control"],
        hq: "Global",
        founded: "2024",
        services: "Decentralized identity, credentials, zero-knowledge proofs",
        markets: "Global"
      },
      {
        name: "SpruceID",
        type: "Digital Credentials & Wallet Infrastructure",
        url: "https://www.spruceid.com",
        bestFor: "Enterprises and public sector teams building verifiable credential, digital ID and wallet-based identity systems.",
        description:
          "SpruceID builds open-source and enterprise identity infrastructure for decentralized identifiers, verifiable credentials and digital wallets.",
        intelligence:
          "A strong fit where interoperability, standards alignment and user-controlled identity are more important than closed identity databases.",
        tags: ["Verifiable Credentials", "Wallets", "DID", "Open Standards"],
        hq: "USA",
        founded: "2020",
        services: "Digital ID, wallets, credentials, DID infrastructure",
        markets: "USA, Global"
      },
      {
        name: "Civic",
        type: "Web3 Identity Verification",
        url: "https://www.civic.com",
        bestFor: "dApps and protocols that need identity, uniqueness, age or access verification without building their own KYC stack.",
        description:
          "Civic provides Web3 identity tools including Civic Pass for access control, verification flows and user identity checks.",
        intelligence:
          "Useful for consumer-facing Web3 applications that need lightweight verification gates, sybil resistance and wallet-based access controls.",
        tags: ["Civic Pass", "Access Control", "Sybil Resistance", "Web3"],
        hq: "USA",
        founded: "2015",
        services: "Identity verification, access controls, Web3 credentials",
        markets: "Global"
      },
      {
        name: "Gitcoin Passport",
        type: "Humanity & Reputation Verification",
        url: "https://www.passport.xyz",
        bestFor: "Protocols and communities that need sybil resistance, proof of personhood and reputation signals for users.",
        description:
          "Gitcoin Passport helps users aggregate identity and reputation signals to prove uniqueness and trustworthiness across Web3 applications.",
        intelligence:
          "Best suited for grant programs, airdrops, governance and community workflows where sybil resistance matters but full KYC is not appropriate.",
        tags: ["Sybil Resistance", "Reputation", "Proof of Personhood", "Governance"],
        hq: "Global",
        founded: "2022",
        services: "Identity scoring, reputation, sybil resistance",
        markets: "Global"
      },
      {
        name: "World ID",
        type: "Proof of Human Infrastructure",
        url: "https://world.org/world-id",
        bestFor: "Applications that need a proof-of-human signal for user uniqueness, anti-bot protection and digital participation.",
        description:
          "World ID provides proof-of-human identity infrastructure designed to let users verify uniqueness while limiting personal data exposure.",
        intelligence:
          "Relevant for high-scale consumer applications where human verification, bot resistance and global reach are core operational requirements.",
        tags: ["Proof of Human", "Anti-Bot", "Global", "Privacy"],
        hq: "Global",
        founded: "2019",
        services: "Human verification, uniqueness, app integrations",
        markets: "Global"
      },
      {
        name: "Fractal ID",
        type: "KYC & Web3 Identity",
        url: "https://web.fractal.id",
        bestFor: "Web3 companies that need user verification, investor onboarding and credential-based compliance workflows.",
        description:
          "Fractal ID provides KYC, KYB and identity verification infrastructure for Web3 platforms, token launches and regulated digital asset workflows.",
        intelligence:
          "A practical option when a project needs more formal verification than wallet-based identity but wants a Web3-aware onboarding experience.",
        tags: ["KYC", "KYB", "Investor Onboarding", "Compliance"],
        hq: "Germany",
        founded: "2017",
        services: "KYC, KYB, user verification, credentials",
        markets: "Global"
      },
      {
        name: "Dock",
        type: "Verifiable Credential Platform",
        url: "https://www.dock.io",
        bestFor: "Organizations issuing and verifying digital credentials for users, employees, partners or ecosystem participants.",
        description:
          "Dock provides verifiable credential technology for issuing, managing and verifying tamper-resistant digital credentials.",
        intelligence:
          "Useful for education, workforce, compliance and membership workflows where credentials need to be portable and independently verifiable.",
        tags: ["Credentials", "Verification", "DID", "Issuer Tools"],
        hq: "Global",
        founded: "2017",
        services: "Credential issuance, verification, DID tooling",
        markets: "Global"
      },
      {
        name: "cheqd",
        type: "Trust Infrastructure & Credentials",
        url: "https://cheqd.io",
        bestFor: "Teams building trusted data ecosystems, reusable credentials and commercial credential networks.",
        description:
          "cheqd provides decentralized identity and trust infrastructure for verifiable credentials, trusted data and reusable identity ecosystems.",
        intelligence:
          "A strong fit for ecosystems that need credential exchange, trust registries and commercial models for verified data.",
        tags: ["Trust Registries", "Credentials", "DID", "Reusable Identity"],
        hq: "UK",
        founded: "2021",
        services: "Trust infrastructure, credentials, DID networks",
        markets: "Global"
      },
      {
        name: "KILT Protocol",
        type: "Decentralized Identity Protocol",
        url: "https://www.kilt.io",
        bestFor: "Developers and ecosystems building identity, attestation and credential systems on decentralized infrastructure.",
        description:
          "KILT Protocol provides decentralized identity infrastructure for creating, claiming and verifying credentials and attestations.",
        intelligence:
          "Relevant for projects that want a protocol-level identity layer rather than a purely SaaS-based verification provider.",
        tags: ["Protocol", "Attestations", "Credentials", "DID"],
        hq: "Germany / Global",
        founded: "2018",
        services: "DID protocol, credentials, attestations",
        markets: "Global"
      },
      {
        name: "Serto",
        type: "Enterprise Decentralized Identity",
        url: "https://www.serto.id",
        bestFor: "Enterprises needing decentralized identity tooling for credentials, trust networks and verifiable data flows.",
        description:
          "Serto provides decentralized identity tools and infrastructure for enterprise credential, verification and trusted data workflows.",
        intelligence:
          "Useful when organizations want to use verifiable credentials and decentralized identity in business networks without building the full stack internally.",
        tags: ["Enterprise ID", "Credentials", "Trust Networks", "DID"],
        hq: "USA",
        founded: "2017",
        services: "Enterprise identity, credentials, trust networks",
        markets: "Global"
      }
    ]
  },
};

function initials(name: string) {
  return name
    .replace(/\([^)]*\)/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function fallbackForLegacyFile(file: string) {
  return fallbackCategories[file] || null;
}

export function legacyVendorFallbackHtml(file: string) {
  const category = fallbackForLegacyFile(file);
  if (!category) return "";

  const cards = category.vendors
    .map((vendor, index) => {
      const id = slugify(vendor.name);
      const search = [
        vendor.name,
        vendor.type,
        vendor.bestFor,
        vendor.description,
        vendor.intelligence,
        vendor.tags.join(" "),
        vendor.hq,
        vendor.services,
        vendor.markets
      ]
        .join(" ")
        .toLowerCase();
      const tags = vendor.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");

      return `<article class="bc-company-card reveal" id="${id}" itemscope itemtype="https://schema.org/Organization" data-search="${escapeHtml(search)}">
        <div class="bc-company-top">
          <div class="bc-company-mark" aria-hidden="true">${escapeHtml(initials(vendor.name))}</div>
          <div><p class="bc-company-index">${String(index + 1).padStart(2, "0")} / ${escapeHtml(vendor.type)}</p><h3 itemprop="name">${escapeHtml(vendor.name)}</h3></div>
        </div>
        <p class="bc-best"><span>Best for</span>${escapeHtml(vendor.bestFor)}</p>
        <p class="bc-desc" itemprop="description">${escapeHtml(vendor.description)}</p>
        <div class="bc-tags">${tags}</div>
        <details class="bc-details">
          <summary>Vendor intelligence</summary>
          <p>${escapeHtml(vendor.intelligence)}</p>
          <dl>
            <div><dt>HQ</dt><dd>${escapeHtml(vendor.hq)}</dd></div>
            <div><dt>Founded</dt><dd>${escapeHtml(vendor.founded)}</dd></div>
            <div><dt>Services</dt><dd>${escapeHtml(vendor.services)}</dd></div>
            <div><dt>Markets</dt><dd>${escapeHtml(vendor.markets)}</dd></div>
          </dl>
        </details>
      </article>`;
    })
    .join("\n");

  return `<section class="bc-section" id="vendor-directory">
    <div class="light-container">
      <div class="bc-directory-head">
        <div><p class="eyebrow light-eyebrow">Directory</p><h2>${escapeHtml(category.title)}</h2><p>${escapeHtml(category.intro)}</p></div>
        <label class="bc-search">Search providers<input type="search" placeholder="Search by company, service or market" data-bc-search></label>
      </div>
      <p class="bc-count"><span data-bc-count>${category.vendors.length}</span> providers listed</p>
      <div class="bc-company-grid" id="bcGrid">${cards}</div>
    </div>
  </section>`;
}

export function legacyVendorFallbackJsonLd(file: string, siteUrl: string) {
  const category = fallbackForLegacyFile(file);
  if (!category) return null;
  const url = `${siteUrl}/vendors/${category.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: `${category.title} | FluidRWA`,
        description: category.intro,
        isPartOf: { "@type": "WebSite", name: "FluidRWA", url: siteUrl },
        inLanguage: "en",
        mainEntity: { "@id": `${url}#providers` }
      },
      {
        "@type": "ItemList",
        "@id": `${url}#providers`,
        name: category.title,
        numberOfItems: category.vendors.length,
        itemListElement: category.vendors.map((vendor, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${url}#${slugify(vendor.name)}`,
          item: {
            "@type": "Organization",
            name: vendor.name,
            url: vendor.url,
            description: vendor.description,
            address: {
              "@type": "PostalAddress",
              addressCountry: vendor.hq
            },
            knowsAbout: [...vendor.tags, vendor.type, vendor.services, vendor.markets],
            additionalType: vendor.type
          }
        }))
      }
    ]
  };
}
