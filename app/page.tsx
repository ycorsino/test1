import Link from "next/link";

export default function Home() {
  return (
    <main className="home">
      <section className="hero">
        <p className="eyebrow">Skydiving experiences &amp; gear</p>
        <h1 className="hero__logo">Skylabs</h1>
        <p className="hero__tagline">
          Jump from 15,000ft, learn to fly, or kit out your rig. Two ways into
          the sky — pick yours.
        </p>
        <div className="hero__cta">
          <Link href="/services" className="btn btn--primary">
            Book an experience
          </Link>
          <Link href="/shop" className="btn btn--ghost">
            Shop the gear
          </Link>
        </div>
      </section>

      <section className="split">
        <Link href="/services" className="split__card">
          <span className="split__icon" aria-hidden="true">
            🪂
          </span>
          <h2>Experiences</h2>
          <p>
            Tandem jumps, AFF courses, licensed fun jumps, wind-tunnel time and
            gift vouchers.
          </p>
          <span className="split__go">Explore experiences →</span>
        </Link>
        <Link href="/shop" className="split__card">
          <span className="split__icon" aria-hidden="true">
            🛍️
          </span>
          <h2>The Shop</h2>
          <p>
            Altimeters, helmets, containers, canopies, jumpsuits, apparel and
            accessories — Skylabs-built.
          </p>
          <span className="split__go">Browse the shop →</span>
        </Link>
      </section>

      <section className="stats">
        <div className="stat">
          <span className="stat__num">15,000ft</span>
          <span className="stat__label">Exit altitude</span>
        </div>
        <div className="stat">
          <span className="stat__num">60s</span>
          <span className="stat__label">Freefall</span>
        </div>
        <div className="stat">
          <span className="stat__num">7</span>
          <span className="stat__label">AFF levels</span>
        </div>
        <div className="stat">
          <span className="stat__num">100%</span>
          <span className="stat__label">Grin guaranteed</span>
        </div>
      </section>
    </main>
  );
}
