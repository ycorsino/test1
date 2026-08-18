import Link from "next/link";
import CinematicIntro from "./components/CinematicIntro";

export default function Home() {
  return (
    <>
      <CinematicIntro />

      <main className="home">
        <section className="hero">
          <div className="hero__meta">
            <span>Est. 15,000 ft</span>
            <span>Skydiving · Gear</span>
          </div>
          <h1 className="hero__display">
            <span>Own</span>
            <span>the</span>
            <span className="hero__display-accent">Sky</span>
          </h1>
          <div className="hero__foot">
            <p className="hero__lead">
              Tandem jumps, freefall courses and a shop built for people who
              live above the clouds. No experience required — only altitude.
            </p>
            <div className="hero__cta">
              <Link href="/services" className="btn btn--solid">
                Book a jump
              </Link>
              <Link href="/shop" className="btn btn--line">
                Shop gear
              </Link>
            </div>
          </div>
        </section>

        <section className="split">
          <Link href="/services" className="split__card">
            <span className="split__no">01</span>
            <h2>Experiences</h2>
            <p>
              Tandem, AFF courses, licensed fun jumps, wind-tunnel time and gift
              vouchers.
            </p>
            <span className="split__go">Explore →</span>
          </Link>
          <Link href="/shop" className="split__card">
            <span className="split__no">02</span>
            <h2>The Shop</h2>
            <p>
              Altimeters, helmets, containers, canopies, jumpsuits, apparel and
              accessories.
            </p>
            <span className="split__go">Browse →</span>
          </Link>
        </section>

        <section className="stats">
          <div className="stat">
            <span className="stat__num">15,000</span>
            <span className="stat__label">Feet exit altitude</span>
          </div>
          <div className="stat">
            <span className="stat__num">195</span>
            <span className="stat__label">km/h in freefall</span>
          </div>
          <div className="stat">
            <span className="stat__num">07</span>
            <span className="stat__label">Levels to your license</span>
          </div>
          <div className="stat">
            <span className="stat__num">100%</span>
            <span className="stat__label">Certified instructors</span>
          </div>
        </section>
      </main>
    </>
  );
}
