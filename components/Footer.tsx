import Image from "next/image";

export function Footer() {
  return (
    <footer className="light-footer">
      <div className="light-container footer-grid-lite footer-simple">
        <a className="footer-brand-link" href="/" aria-label="FluidRWA home">
          <Image className="footer-logo-lite" src="/assets/fluidrwa-small-logo.png" alt="FluidRWA" width={190} height={60} />
        </a>
        <nav className="footer-legal-links" aria-label="Footer navigation">
          <a href="/contact">Contact Us</a>
          <a href="/arcade">Arcade</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms & Conditions</a>
        </nav>
      </div>
      <div className="light-container footer-bottom-lite">© 2026 FluidRWA.</div>
    </footer>
  );
}
