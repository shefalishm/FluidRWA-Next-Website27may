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
      <div className="light-container footer-grid-lite footer-simple">
        <Link className="footer-brand-link" href="/" aria-label="FluidRWA home">
          <Image className="footer-logo-lite" src="/assets/fluidrwa-small-logo.png" alt="FluidRWA" width={190} height={60} />
        </Link>
        <nav className="footer-legal-links" aria-label="Footer navigation">
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact Us</Link>
          <Link href="/vendor-membership">Become a Vetted Listing</Link>
          <Link href="/refund-cancellation">Refund &amp; Cancellation</Link>
          <Link href="/shipping-delivery">Delivery &amp; Shipping</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms & Conditions</Link>
        </nav>
        <nav className="footer-social-links" aria-label="FluidRWA social profiles">
          {socialLinks.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={`FluidRWA on ${link.label}`}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="light-container footer-bottom-lite">© 2026 FluidRWA.</div>
    </footer>
  );
}
