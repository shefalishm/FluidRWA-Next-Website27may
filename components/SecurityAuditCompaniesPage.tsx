import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { siteUrl } from "@/lib/routes";

type SecurityVendor = {
  name: string;
  role: string;
  bestFor: string;
  summary: string;
  services: string;
  coverage: string;
  website: string;
  tags: string[];
  logo?: string;
};

const securityVendors: SecurityVendor[] = [
  {
    name: "SureStack",
    role: "Vetted Risk Management & Security Partner",
    bestFor:
      "Digital asset issuers, tokenization teams, funds and Web3 operators that need risk intelligence, threat monitoring and proactive security visibility.",
    summary:
      "SureStack is an AI-powered Web3 risk intelligence platform focused on vulnerability detection, threat monitoring and digital asset risk protection before threats hit the chain.",
    services: "Risk intelligence, threat monitoring, digital asset security, tokenization risk management",
    coverage: "Global",
    website: "https://surestack.tech/",
    logo: "/assets/company-logos/surestack.png",
    tags: ["Vetted", "Risk intelligence", "Threat monitoring", "Tokenization security", "Atlas Intelligence"]
  },
  {
    name: "Trail of Bits",
    role: "Elite Security Research & Auditing",
    bestFor: "Complex protocols, novel cryptography, ZK systems, consensus logic and high-assurance engineering reviews.",
    summary:
      "Trail of Bits is widely respected for deep security research and tooling such as Slither and Echidna, making it a strong fit for sophisticated smart contract and protocol audits.",
    services: "Smart contract audits, formal methods, security tooling, protocol security research",
    coverage: "United States, Global",
    website: "https://trailofbits.com",
    logo: "/assets/company-logos/trail-of-bits.png",
    tags: ["Research-grade", "Formal methods", "Tool builders", "Protocol security"]
  },
  {
    name: "OpenZeppelin",
    role: "Smart Contract Security & Standards",
    bestFor: "EVM teams using OpenZeppelin contracts, upgradeable contracts, Defender, access controls and standard token patterns.",
    summary:
      "OpenZeppelin combines the most widely used Solidity libraries with audit services and Defender operations tooling for live smart contract management.",
    services: "Smart contract audits, security libraries, Defender, monitoring and operations",
    coverage: "United States, Global",
    website: "https://openzeppelin.com",
    logo: "/assets/company-logos/openzeppelin.png",
    tags: ["EVM standard", "Contracts library", "Defender", "Audits"]
  },
  {
    name: "Halborn",
    role: "Full-Stack Web3 Security",
    bestFor: "Teams that need smart contract, cloud, API, DevOps, key management and infrastructure security reviewed together.",
    summary:
      "Halborn provides broad Web3 security services across smart contracts, infrastructure, penetration testing and operational security.",
    services: "Smart contract audits, penetration testing, cloud security, DevOps security",
    coverage: "United States, Global",
    website: "https://halborn.com",
    tags: ["Full stack", "Pen testing", "Infra security", "Cloud"]
  },
  {
    name: "CertiK",
    role: "AI-Powered Security & On-Chain Analytics",
    bestFor: "Projects that need widely recognized audit reports, exchange-facing credibility and ongoing monitoring.",
    summary:
      "CertiK is one of the most visible Web3 security brands, combining audit services with Skynet monitoring and public security scoring.",
    services: "Audits, formal verification, Skynet monitoring, security scoring",
    coverage: "United States, Global",
    website: "https://certik.com",
    logo: "/assets/company-logos/certik.png",
    tags: ["Audit reports", "Skynet", "Security score", "Monitoring"]
  },
  {
    name: "Spearbit",
    role: "Elite Auditor Marketplace",
    bestFor: "Protocols that want curated independent security researchers assembled around a specific codebase or engagement.",
    summary:
      "Spearbit gives projects access to a curated network of senior Web3 security researchers for protocol-specific reviews.",
    services: "Curated audits, independent researcher teams, protocol reviews",
    coverage: "United States, Global",
    website: "https://spearbit.com",
    tags: ["Curated network", "Independent researchers", "Protocol audits"]
  },
  {
    name: "Cyfrin",
    role: "Security Auditing & Education",
    bestFor: "Teams that want smart contract audits paired with clear developer education and practical remediation guidance.",
    summary:
      "Cyfrin combines audit work with developer education, CodeHawks contests and security training for smart contract teams.",
    services: "Smart contract audits, security education, audit contests, remediation",
    coverage: "United States, Global",
    website: "https://cyfrin.io",
    tags: ["Education", "CodeHawks", "Developer led", "Audits"]
  },
  {
    name: "Quantstamp",
    role: "Enterprise & Institutional Security",
    bestFor: "Banks, asset managers and enterprise teams that need institutional communication and blockchain security review.",
    summary:
      "Quantstamp focuses on blockchain security audits with enterprise and institutional experience across digital asset projects.",
    services: "Smart contract audits, enterprise blockchain security, institutional reporting",
    coverage: "United States, Global",
    website: "https://quantstamp.com",
    tags: ["Enterprise", "Institutional", "Audits", "Reporting"]
  },
  {
    name: "Forta Network",
    role: "Decentralized Threat Detection",
    bestFor: "Live protocols that need real-time monitoring for exploits, anomalies and suspicious on-chain activity.",
    summary:
      "Forta is a decentralized monitoring network for real-time threat detection across smart contracts and on-chain systems.",
    services: "Runtime monitoring, detection bots, threat alerts, protocol monitoring",
    coverage: "Global",
    website: "https://forta.org",
    tags: ["Real-time", "Monitoring", "Detection bots", "Runtime security"]
  },
  {
    name: "Hypernative",
    role: "Proactive Web3 Security Platform",
    bestFor: "Teams that need monitoring across smart contracts, governance, bridges, oracles and infrastructure.",
    summary:
      "Hypernative provides proactive Web3 security monitoring designed to identify threats before they turn into incidents.",
    services: "Threat detection, infrastructure monitoring, governance risk, bridge monitoring",
    coverage: "Israel, Global",
    website: "https://hypernative.io",
    tags: ["Proactive", "Multi-vector", "Monitoring", "Security operations"]
  },
  {
    name: "Immunefi",
    role: "Web3 Bug Bounty Platform",
    bestFor: "Protocols that want ongoing external vulnerability discovery after audits and before major upgrades.",
    summary:
      "Immunefi connects Web3 projects with security researchers through bug bounty programs and responsible disclosure workflows.",
    services: "Bug bounties, responsible disclosure, researcher community, vulnerability triage",
    coverage: "Global",
    website: "https://immunefi.com",
    tags: ["Bug bounty", "Whitehats", "Continuous security", "Disclosure"]
  },
  {
    name: "Code4rena",
    role: "Competitive Audit Platform",
    bestFor: "Teams that want many independent reviewers looking at a codebase in a time-boxed security contest.",
    summary:
      "Code4rena runs competitive audit contests where security researchers compete to find vulnerabilities in protocol code.",
    services: "Audit contests, competitive security review, researcher marketplace",
    coverage: "Global",
    website: "https://code4rena.com",
    tags: ["Competitive audit", "Contest", "Researchers", "Coverage"]
  }
];

export function SecurityAuditCompaniesPage() {
  const canonical = `${siteUrl}/vendors/security-audit-companies`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        url: canonical,
        name: "Security Audit Companies",
        description:
          "Compare smart contract audit companies, Web3 security platforms, bug bounty providers and digital asset risk management vendors.",
        isPartOf: { "@type": "WebSite", name: "FluidRWA", url: siteUrl },
        mainEntity: { "@id": `${canonical}#providers` }
      },
      {
        "@type": "ItemList",
        "@id": `${canonical}#providers`,
        name: "Security Audit Companies",
        numberOfItems: securityVendors.length,
        itemListElement: securityVendors.map((vendor, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${canonical}#${vendor.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`,
          item: {
            "@type": "Organization",
            name: vendor.name,
            url: vendor.website,
            description: vendor.summary,
            additionalType: vendor.role,
            knowsAbout: vendor.tags
          }
        }))
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "When should a tokenization project hire a security audit company?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "A tokenization project should engage security reviewers before launch, after major contract changes, before investor or exchange diligence, and whenever custody, wallet, bridge or smart contract controls expose user funds."
            }
          },
          {
            "@type": "Question",
            name: "Is one smart contract audit enough?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Usually no. Higher-risk Web3 and tokenization projects often combine development review, independent audit, remediation testing, monitoring, bug bounties and incident response planning."
            }
          }
        ]
      }
    ]
  };

  return (
    <main className="security-category-page">
      <JsonLd data={schema} />
      <section className="security-category-hero">
        <div className="light-container security-category-hero-grid">
          <div>
            <p className="eyebrow light-eyebrow">Security and audits</p>
            <h1>Security audit companies for Web3 and tokenization teams</h1>
            <p>
              Compare smart contract auditors, Web3 security platforms, bug bounty providers and risk intelligence
              vendors by the security workflow they are strongest for.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary light-primary" href="#security-vendors">
                Compare providers
              </Link>
              <Link className="btn btn-soft" href="/submit-requirement">
                Submit requirements
              </Link>
            </div>
          </div>
          <aside className="security-category-panel" aria-label="Security shortlist guide">
            <span>Security stack</span>
            <strong>Audit + monitor + respond</strong>
            <p>
              Use this page to shortlist the right kind of provider first: independent audit, formal verification,
              runtime monitoring, bug bounty or broader digital asset risk intelligence.
            </p>
          </aside>
        </div>
      </section>

      <section className="light-container security-guide-strip" aria-label="Security selection path">
        {[
          ["01", "Pre-launch audit", "Review contract logic, permissions, upgrade paths and external integrations."],
          ["02", "Runtime monitoring", "Track deployed contracts, bridges, governance and transaction anomalies."],
          ["03", "Ongoing assurance", "Add bug bounties, retesting and incident-response workflows after launch."]
        ].map((item) => (
          <article key={item[0]}>
            <span>{item[0]}</span>
            <h2>{item[1]}</h2>
            <p>{item[2]}</p>
          </article>
        ))}
      </section>

      <section className="light-container security-table-section" id="security-vendors">
        <div className="security-section-head">
          <div>
            <p className="eyebrow light-eyebrow">Directory</p>
            <h2>Compare security audit companies</h2>
          </div>
          <p>
            Listings are for discovery and shortlist building. Buyers should verify scope, methodology, references,
            availability and commercial terms directly with each provider.
          </p>
        </div>

        <div className="security-vendor-list">
          {securityVendors.map((vendor, index) => {
            const id = vendor.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
            return (
              <article className="security-vendor-card" id={id} key={vendor.name}>
                <div className="security-vendor-rank">{String(index + 1).padStart(2, "0")}</div>
                <div className="security-vendor-main">
                  <div className="security-vendor-title-row">
                    <div className="security-vendor-logo" aria-hidden="true">
                      {vendor.logo ? <img src={vendor.logo} alt="" loading="lazy" decoding="async" /> : vendor.name.slice(0, 2)}
                    </div>
                    <div>
                      <p>{vendor.role}</p>
                      <h3>{vendor.name}</h3>
                      <span className="bc-vetted-badge">Vetted</span>
                    </div>
                  </div>
                  <p className="security-best-fit">
                    <strong>Best for:</strong> {vendor.bestFor}
                  </p>
                  <p>{vendor.summary}</p>
                </div>
                <div className="security-vendor-side">
                  <dl>
                    <div>
                      <dt>Services</dt>
                      <dd>{vendor.services}</dd>
                    </div>
                    <div>
                      <dt>Coverage</dt>
                      <dd>{vendor.coverage}</dd>
                    </div>
                  </dl>
                  <div className="security-tag-row">
                    {vendor.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="security-action-row">
                    <a className="btn btn-primary light-primary" href={vendor.website} target="_blank" rel="noopener noreferrer">
                      Visit Website
                    </a>
                    <Link
                      className="btn btn-soft"
                      href={`/submit-requirement?vendor=${encodeURIComponent(vendor.name)}&category=Security%20Audit%20Companies`}
                    >
                      Request Intro
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="light-container security-faq-section">
        <div>
          <p className="eyebrow light-eyebrow">Buyer questions</p>
          <h2>How to choose a Web3 security provider</h2>
        </div>
        <div className="security-faq-grid">
          <article>
            <h3>Should I choose a large audit firm or a specialist?</h3>
            <p>
              Large firms can help with brand recognition and institutional comfort. Specialists may be better for a
              specific chain, language, risk model or protocol design. Match the provider to the riskiest part of your
              stack.
            </p>
          </article>
          <article>
            <h3>What should I prepare before asking for quotes?</h3>
            <p>
              Share repositories, technical documentation, chain, contracts in scope, admin permissions, upgrade model,
              external dependencies, testing coverage, launch timeline and whether you need retesting after remediation.
            </p>
          </article>
          <article>
            <h3>What comes after the audit?</h3>
            <p>
              Teams should remediate findings, get fixes retested, add monitoring, create incident-response playbooks and
              consider bug bounties or ongoing risk intelligence for production systems.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
