"use client";

import { useEffect, useRef, useState } from "react";

const DURATION = 7000; // 7 seconds, exactly
const SEEN_KEY = "skylabs.intro.seen";

export default function CinematicIntro() {
  const [mounted, setMounted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    // Only once per session, and never for reduced-motion users.
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      /* ignore */
    }
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (seen || reduced) {
      setGone(true);
      return;
    }

    setMounted(true);
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* ignore */
    }
    document.body.style.overflow = "hidden";

    const start = performance.now();
    const tick = (now: number) => {
      const t = now - start;
      setElapsed(t);
      if (t >= DURATION) {
        finish();
        return;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function finish() {
    if (raf.current) cancelAnimationFrame(raf.current);
    setExiting(true);
    document.body.style.overflow = "";
    window.setTimeout(() => setGone(true), 700);
  }

  if (gone || !mounted) return null;

  // Freefall speed climbs 0 → 195 km/h over the first 3.4s, then holds.
  const speed = Math.min(195, Math.round((elapsed / 3400) * 195));
  const altitude = Math.max(0, 13000 - Math.round((elapsed / DURATION) * 9000));

  const phase =
    elapsed < 2000 ? 0 : elapsed < 3700 ? 1 : elapsed < 5500 ? 2 : 3;

  return (
    <div
      className={`intro${exiting ? " intro--exit" : ""}`}
      data-phase={phase}
      role="dialog"
      aria-label="Skylabs intro"
    >
      <div className="intro__sky" />
      <div className="intro__grain" />
      <div className="intro__clouds">
        <span className="cloud cloud--1" />
        <span className="cloud cloud--2" />
        <span className="cloud cloud--3" />
        <span className="cloud cloud--4" />
      </div>
      <div className="intro__sun" />
      <div className="intro__horizon" />

      <div className="intro__bar intro__bar--top" />
      <div className="intro__bar intro__bar--bottom" />

      {/* HUD */}
      <div className={`intro__hud${phase < 2 ? " is-in" : " is-out"}`}>
        <span className="intro__hud-label">Altitude</span>
        <span className="intro__hud-value">
          {altitude.toLocaleString("en-US")}
          <em>ft</em>
        </span>
        <span className="intro__hud-sep" />
        <span className="intro__hud-label">Freefall</span>
        <span className="intro__hud-value">
          {speed}
          <em>km/h</em>
        </span>
      </div>

      {/* Scene 1 word */}
      <div className={`intro__line intro__line--1${phase === 1 ? " is-in" : ""}`}>
        <span className="intro__mask">
          <span>Terminal</span>
        </span>
        <span className="intro__mask">
          <span>Velocity</span>
        </span>
      </div>

      {/* Logo lockup */}
      <div className={`intro__logo${phase >= 2 ? " is-in" : ""}`}>
        <span className="intro__rule" />
        <h1>Skylabs</h1>
        <span className="intro__rule" />
        <p className={`intro__tag${phase >= 3 ? " is-in" : ""}`}>Own the sky</p>
      </div>

      <button className="intro__skip" onClick={finish}>
        Skip
      </button>
    </div>
  );
}
