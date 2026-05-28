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
              <a className="btn btn-primary light-primary" href="/">
                Go Home
              </a>
              <a className="btn btn-soft" href="/vendor-ecosystem">
                Explore Vendors
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
