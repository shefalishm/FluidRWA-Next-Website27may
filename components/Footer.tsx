import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/fluidrwa" },
  { label: "X", href: "https://x.com/fluid_rwa" },
  { label: "Instagram", href: "https://www.instagram.com/fluidrwa/" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UCsiBOepcGO78f64tI5la_Qg" }
];

export function Footer() {
  return (
    <footer className="light-footer">
      <div className="light-container footer-directory">
        <div className="footer-intro">
          <Link className="footer-brand-link" href="/" aria-label="FluidRWA home">
            <Image className="footer-logo-lite" src="/assets/fluidrwa-small-logo.png" alt="FluidRWA" width={190} height={60} />
          </Link>
          <p>Vendor discovery and market intelligence for Web3, RWA, AI and digital-asset teams.</p>
        </div>
        <nav aria-label="Vendor directories"><strong>Directories</strong><Link href="/web3vendorecosystem">All vendors</Link><Link href="/ai-vendors">AI vendors</Link><Link href="/vendors/tokenization-platforms">Tokenization platforms</Link><Link href="/blockchain-projects">Blockchain projects</Link></nav>
        <nav aria-label="Buyer resources"><strong>Buyer resources</strong><Link href="/submit-requirement">Submit a project brief</Link><Link href="/tools/vendor-comparison">Compare vendors</Link><Link href="/tools">Tools</Link><Link href="/reports-research">Reports and research</Link></nav>
        <nav aria-label="Company and trust"><strong>Company &amp; trust</strong><Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/vendor-membership">Become a Vetted Listing</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></nav>
      </div>
      <div className="light-container footer-meta-row">
        <nav className="footer-social-links" aria-label="FluidRWA social profiles">
          {socialLinks.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={`FluidRWA on ${link.label}`}>
              {link.label}
            </a>
          ))}
        </nav>
        <nav className="footer-policy-links" aria-label="Service policies"><Link href="/refund-cancellation">Refunds</Link><Link href="/shipping-delivery">Delivery</Link></nav>
      </div>
      <div className="light-container footer-bottom-lite">© 2026 FluidRWA.</div>
    </footer>
  );
}
