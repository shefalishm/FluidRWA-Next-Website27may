import Link from "next/link";

export default function NotFound() {
  return (
    <main className="light-home">
      <section className="light-hero">
        <div className="light-container hero-lite-grid">
          <div className="hero-copy-lite">
            <p className="eyebrow light-eyebrow">404</p>
            <h1>Page not found.</h1>
            <p>The page may have moved into the new FluidRWA routing system.</p>
            <div className="hero-actions">
              <Link className="btn btn-primary light-primary" href="/">
                Go Home
              </Link>
              <Link className="btn btn-soft" href="/vendor-ecosystem">
                Explore Vendors
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
