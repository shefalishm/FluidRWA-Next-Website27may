"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const openOnHover = (pointerType: string, menu: string) => {
    if (pointerType === "mouse" && window.matchMedia("(min-width: 1121px)").matches) setOpenMenu(menu);
  };
  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpenMenu(null);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      headerRef.current?.querySelector<HTMLAnchorElement>('[aria-expanded="true"][aria-haspopup]')?.focus();
      setOpenMenu(null);
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", closeOutside); document.removeEventListener("keydown", escape); };
  }, []);
  return (
    <header ref={headerRef} className="site-header light-header" data-site-header onPointerLeave={(event) => { if (event.pointerType === "mouse") setOpenMenu(null); }} onClick={(event) => {
      const trigger = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[aria-haspopup]');
      if (!trigger) { if ((event.target as HTMLElement).closest('.nav-mega a')) setOpenMenu(null); return; }
      event.preventDefault();
      const name = trigger.parentElement?.getAttribute('data-menu') || null;
      setOpenMenu(current => window.matchMedia("(max-width: 1120px)").matches && current === name ? null : name);
    }}>
      <nav className="nav" aria-label="Main navigation">
        <a className="brand light-brand" href="/" aria-label="FluidRWA home">
          <Image src="/assets/fluidrwa-small-logo.png" alt="FluidRWA" width={190} height={60} priority />
          <span>FluidRWA</span>
        </a>
        <button className="mobile-toggle light-toggle" type="button" aria-label="Open navigation" aria-expanded="false" data-nav-toggle>
          <span />
          <span />
          <span />
        </button>
        <div className="nav-links light-nav-links" data-nav-links>
          <a href="/">Home</a>
          <div className="nav-menu" data-menu="web3" data-open={openMenu === "web3"} onPointerEnter={(e) => openOnHover(e.pointerType, "web3")}>
            <a href="/web3vendorecosystem" aria-haspopup="true" aria-expanded={openMenu === "web3"}>
              Web3 Vendors
            </a>
            <div className="nav-mega" aria-label="Web3 vendor categories">
              <div>
                <strong>Core Web3 Infrastructure</strong>
                <a href="/web3vendorecosystem">All vendor categories</a>
                <a href="/vendors/smart-contract-development-companies">Smart contract companies</a>
                <a href="/vendors/blockchain-development-companies">Blockchain development</a>
                <a href="/vendors/tokenization-platforms">Tokenization platforms</a>
                <a href="/vendors/defi-trading-margin-infrastructure">DeFi trading and margin</a>
                <a href="/vendors/crypto-custody-providers">Custody and wallets</a>
                <a href="/vendors/kyc-aml-providers">KYC and AML providers</a>
                <a href="/vendors/stablecoin-infrastructure-providers">Payments and stablecoins</a>
              </div>
              <div>
                <strong>Specialist Infrastructure</strong>
                <a href="/vendors/security-audit-companies">Security and audits</a>
                <a href="/vendors/legal-regulatory-vendors">Legal and regulatory</a>
                <a href="/vendors/oracles-data-proof-of-reserve">Oracles and data providers</a>
                <a href="/vendors/node-as-a-service-rpc-providers">RPC and node providers</a>
                <a href="/vendors/rollup-as-a-service-appchains">RaaS and appchains</a>
                <a href="/vendors/fund-administration-transfer-agents">Fund administration</a>
                <a href="/vendors/growth-marketing-companies">Growth marketing</a>
              </div>
            </div>
          </div>
          <div className="nav-menu" data-menu="ai" data-open={openMenu === "ai"} onPointerEnter={(e) => openOnHover(e.pointerType, "ai")}>
            <a href="/ai-vendors" aria-haspopup="true" aria-expanded={openMenu === "ai"}>
              AI Vendors
            </a>
            <div className="nav-mega nav-mega-ai" aria-label="AI vendor categories">
              <div>
                <strong>AI for Growth</strong>
                <a href="/ai-vendors">All AI vendors</a>
                <a href="/vendors/ai-social-media-tools">AI social media tools</a>
                <a href="/vendors/ai-video-generation-tools">AI video tools</a>
                <a href="/vendors/ai-voiceover-avatar-tools">Voiceovers and avatars</a>
                <a href="/vendors/ai-marketing-content-tools">Marketing and content</a>
                <a href="/vendors/ai-sales-outreach-tools">Sales and outreach</a>
                <a href="/vendors/ai-crm-revops-tools">CRM and RevOps</a>
              </div>
              <div>
                <strong>AI for Operations</strong>
                <a href="/vendors/ai-research-market-intelligence-tools">Research and market intelligence</a>
                <a href="/vendors/ai-customer-support-tools">Customer support</a>
                <a href="/vendors/ai-design-creative-tools">Design and creative</a>
                <a href="/vendors/ai-automation-agent-tools">Automation and agents</a>
                <a href="/vendors/ai-compliance-document-tools">Compliance and documents</a>
                <a href="/vendors/ai-infrastructure-providers">AI infrastructure</a>
                <a href="/vendors/ai-agents-autonomous-systems">Crypto-native AI agents</a>
              </div>
            </div>
          </div>
          <div className="nav-menu" data-menu="use-cases" data-open={openMenu === "use-cases"} onPointerEnter={(e) => openOnHover(e.pointerType, "use-cases")}>
            <a href="/use-cases" aria-haspopup="true" aria-expanded={openMenu === "use-cases"}>
              Use Cases
            </a>
            <div className="nav-mega nav-mega-use-cases" aria-label="Use case library">
              <div>
                <strong>Industry Workflows</strong>
                <a href="/use-cases">All use cases</a>
                <a href="/use-cases/real-estate-fund-administration">Real estate funds</a>
                <a href="/use-cases/maritime-trade-documents">Trade documents</a>
                <a href="/use-cases/healthcare-credentials-consent">Healthcare credentials</a>
                <a href="/use-cases/carbon-credit-mrv">Carbon credit MRV</a>
              </div>
              <div>
                <strong>Capital Markets</strong>
                <a href="/use-cases/tokenized-treasury-products">Tokenized treasuries</a>
                <a href="/use-cases/tokenized-collateral-liquidity">Tokenized collateral</a>
                <a href="/use-cases/digital-fund-administration-transfer-agent">Digital fund administration</a>
                <a href="/use-cases/proof-of-reserve-tokenized-assets">Proof of reserve</a>
                <a href="/use-cases/private-credit-servicing">Private credit servicing</a>
                <a href="/use-cases/stablecoin-payouts-remittances">Stablecoin payouts</a>
              </div>
            </div>
          </div>
          <a href="/blockchain-projects">Blockchain Projects</a>
          <div className="nav-menu" data-menu="insights" data-open={openMenu === "insights"} onPointerEnter={(e) => openOnHover(e.pointerType, "insights")}>
            <a href="/blog" aria-haspopup="true" aria-expanded={openMenu === "insights"}>
              Insights
            </a>
            <div className="nav-mega nav-mega-resources" aria-label="FluidRWA insights and resources">
              <div>
                <strong>Learn and research</strong>
                <a href="/learn">FluidRWA Learn</a>
                <a href="/blog">Insights library</a>
                <a href="/news">News and market signals</a>
                <a href="/web3-events">Web3 events calendar</a>
                <a href="/reports-research">Reports and research</a>
                <a href="/apply-as-freelancer">Apply as a freelancer</a>
              </div>
              <div>
                <strong>Operator resources</strong>
                <a href="/tools">Tools and assessments</a>
                <a href="/jobs">RWA and Web3 jobs</a>
                <a href="/tokenization-readiness-assessment-tool">Tokenization readiness</a>
                <a href="/submit-requirement">Submit a project brief</a>
              </div>
            </div>
          </div>
          <div className="nav-menu" data-menu="tools" data-open={openMenu === "tools"} onPointerEnter={(e) => openOnHover(e.pointerType, "tools")}>
            <a href="/tools" aria-haspopup="true" aria-expanded={openMenu === "tools"}>
              Tools
            </a>
            <div className="nav-mega nav-mega-tools" aria-label="FluidRWA tools">
              <div>
                <strong>Project Planning Tools</strong>
                <a href="/tools/vendor-comparison">Vendor Comparison Tool</a>
                <a href="/tokenization-readiness-assessment-tool">Tokenization Readiness Tool</a>
                <a href="/family-office-service-stack-builder">Family Office Stack Builder</a>
                <a href="/submit-requirement">Project Brief Intake</a>
              </div>
            </div>
          </div>
          <a className="nav-secondary-cta" href="/vendor-membership">
            Become a Vetted Listing
          </a>
          <a className="nav-ecosystem-cta" href="/submit-requirement">
            Submit Requirements
          </a>
        </div>
      </nav>
    </header>
  );
}
