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
          <p>Search 1000+ Web3, RWA and AI infrastructure vendors across 30+ categories, use cases and blockchain ecosystems.</p>
          <nav className="footer-social-links" aria-label="FluidRWA social profiles">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={`FluidRWA on ${link.label}`}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <nav className="footer-link-column" aria-label="Vendor directory">
          <h3>Web3 Vendors</h3>
          <Link href="/web3vendorecosystem">All Web3 Vendors</Link>
          <Link href="/vendors/tokenization-platforms">Tokenization</Link>
          <Link href="/vendors/crypto-custody-providers">Custody</Link>
          <Link href="/vendors/kyc-aml-providers">KYC / AML</Link>
          <Link href="/vendors/stablecoin-infrastructure-providers">Stablecoins</Link>
          <Link href="/vendors/smart-contract-development-companies">Smart Contracts</Link>
        </nav>
        <nav className="footer-link-column" aria-label="AI vendor directory">
          <h3>AI Vendors</h3>
          <Link href="/ai-vendors">All AI Vendors</Link>
          <Link href="/vendors/ai-social-media-tools">AI Social Media</Link>
          <Link href="/vendors/ai-video-generation-tools">AI Video</Link>
          <Link href="/vendors/ai-voiceover-avatar-tools">Voice and Avatars</Link>
          <Link href="/vendors/ai-sales-outreach-tools">Sales AI</Link>
          <Link href="/vendors/ai-compliance-document-tools">Compliance AI</Link>
        </nav>
        <nav className="footer-link-column" aria-label="Use cases">
          <h3>Use Cases</h3>
          <Link href="/use-cases">All Use Cases</Link>
          <Link href="/use-cases/real-estate-fund-administration">Real Estate Funds</Link>
          <Link href="/use-cases/tokenized-treasury-products">Tokenized Treasuries</Link>
          <Link href="/use-cases/maritime-trade-documents">Trade Documents</Link>
          <Link href="/use-cases/healthcare-credentials-consent">Healthcare Credentials</Link>
          <Link href="/use-cases/carbon-credit-mrv">Carbon Markets</Link>
        </nav>
        <nav className="footer-link-column" aria-label="Blockchain projects">
          <h3>Blockchains</h3>
          <Link href="/blockchain-projects">All Projects</Link>
          <Link href="/blockchain-projects/solana">Solana</Link>
          <Link href="/blockchain-projects/ethereum">Ethereum</Link>
          <Link href="/blockchain-projects/base">Base</Link>
          <Link href="/blockchain-projects/polygon">Polygon</Link>
          <Link href="/blockchain-projects/tron">Tron</Link>
        </nav>
        <nav className="footer-link-column" aria-label="Tools and company">
          <h3>FluidRWA</h3>
          <Link href="/apply-as-freelancer">Apply as a Freelancer</Link>
          <Link href="/tools">Tools</Link>
          <Link href="/news">News</Link>
          <Link href="/jobs">Jobs</Link>
          <Link href="/tokenization-readiness-assessment-tool">Readiness Tool</Link>
          <Link href="/family-office-service-stack-builder">Stack Builder</Link>
          <Link href="/vendor-membership">Become a Vetted Listing</Link>
          <Link href="/submit-requirement">Submit Project Brief</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
      <div className="light-container footer-bottom-lite">
        <span>© 2026 FluidRWA.</span>
        <nav aria-label="Legal">
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact Us</Link>
          <Link href="/refund-cancellation">Refund &amp; Cancellation</Link>
          <Link href="/shipping-delivery">Delivery &amp; Shipping</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms & Conditions</Link>
        </nav>
      </div>
    </footer>
  );
}
