import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="light-footer">
      <div className="light-container footer-grid-lite footer-simple">
        <Link className="footer-brand-link" href="/" aria-label="FluidRWA home">
          <Image className="footer-logo-lite" src="/assets/fluidrwa-small-logo.png" alt="FluidRWA" width={190} height={60} />
        </Link>
        <nav className="footer-legal-links" aria-label="Footer navigation">
          <Link href="/contact">Contact Us</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms & Conditions</Link>
        </nav>
      </div>
      <div className="light-container footer-bottom-lite">© 2026 FluidRWA.</div>
    </footer>
  );
}
