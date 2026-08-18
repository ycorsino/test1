import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <div className="brand brand--footer">
            <span className="brand__mark" aria-hidden="true" />
            Skylabs
          </div>
          <p className="site-footer__tagline">
            Skydiving experiences &amp; gear. Built in the clouds.
          </p>
        </div>
        <nav className="site-footer__links" aria-label="Footer">
          <Link href="/services">Experiences</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/cart">Cart</Link>
        </nav>
        <p className="site-footer__fine">
          © {new Date().getFullYear()} Skylabs · Demo site — no real bookings or
          payments are processed.
        </p>
      </div>
    </footer>
  );
}
