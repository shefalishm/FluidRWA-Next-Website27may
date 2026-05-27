import Image from "next/image";
import Link from "next/link";

const navItems = [
  ["Home", "/"],
  ["Vendors", "/vendor-ecosystem"],
  ["Solutions", "/solutions"],
  ["Insights", "/blog"],
  ["About", "/about"],
  ["Contact", "/contact"]
] as const;

export function Header() {
  return (
    <header className="site-header light-header" data-site-header>
      <nav className="nav" aria-label="Main navigation">
        <Link className="brand light-brand" href="/" aria-label="FluidRWA home">
          <Image src="/assets/fluidrwa-small-logo.png" alt="FluidRWA" width={190} height={60} priority />
        </Link>
        <button className="mobile-toggle light-toggle" type="button" aria-label="Open navigation" aria-expanded="false" data-nav-toggle>
          <span />
          <span />
          <span />
        </button>
        <div className="nav-links light-nav-links" data-nav-links>
          {navItems.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
          <Link className="nav-ecosystem-cta" href="/vendor-ecosystem">
            Explore Vendor Ecosystem
          </Link>
        </div>
      </nav>
    </header>
  );
}
