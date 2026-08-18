import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <span className="wordmark">Skylabs</span>
          <p className="site-footer__tagline">
            Skydiving &amp; gear. Own the sky.
          </p>
        </div>
        <nav className="site-footer__links" aria-label="Footer">
          <Link href="/services">Experiences</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/cart">Cart</Link>
        </nav>
      </div>
      <div className="site-footer__fine">
        <span>© {new Date().getFullYear()} Skylabs</span>
        <span>Demo site — no real bookings or payments are processed.</span>
      </div>
    </footer>
  );
}
