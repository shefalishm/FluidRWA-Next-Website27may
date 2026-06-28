import Image from "next/image";

const navItems = [
  ["Home", "/"],
  ["Solutions", "/solutions"],
  ["Insights", "/blog"],
  ["Chain Ecosystem", "/ecosystem"]
] as const;

export function Header() {
  return (
    <header className="site-header light-header" data-site-header>
      <nav className="nav" aria-label="Main navigation">
        <a className="brand light-brand" href="/" aria-label="FluidRWA home">
          <Image src="/assets/fluidrwa-small-logo.png" alt="FluidRWA" width={190} height={60} priority />
        </a>
        <button className="mobile-toggle light-toggle" type="button" aria-label="Open navigation" aria-expanded="false" data-nav-toggle>
          <span />
          <span />
          <span />
        </button>
        <div className="nav-links light-nav-links" data-nav-links>
          {navItems.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
          <div className="nav-tool-item">
            <a href="/tools" aria-haspopup="true">
              Tools
            </a>
            <div className="nav-tool-menu" aria-label="FluidRWA tools">
              <a href="/tokenization-readiness-assessment-tool">Free tokenization readiness tool</a>
              <a href="/family-office-service-stack-builder">Family office service stack builder</a>
            </div>
          </div>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a className="nav-ecosystem-cta" href="/web3vendorecosystem">
            Explore Vendor Ecosystem
          </a>
        </div>
      </nav>
    </header>
  );
}
