import { useEffect, useRef, useState } from "react";
import "./Loading.css";
import { useLoading } from "./LoadingProvider";

/**
 * Aurora Boot Sequence — the site's loading screen.
 *
 * Keeps the exact orchestration contract the Scene + landing intro depend on
 * (percent → loaded → isLoaded → import(initialFX) → portal-wipe → unmount),
 * but restyles it as a dark "boot console": aurora backdrop, blueprint grid,
 * a gradient progress ring with a live percentage, a terminal-style boot log
 * and a bottom marquee ticker. Timings are tighter than the original so the
 * screen never outlives the real work it's masking (the 3D character model
 * streams in behind it).
 */

/** Boot-log entries revealed as progress crosses each threshold. */
const BOOT_LINES: Array<{ at: number; text: string }> = [
  { at: 4, text: "init renderer" },
  { at: 22, text: "fetch models/character.enc" },
  { at: 38, text: "decrypt aes-256 … ok" },
  { at: 56, text: "compile shaders" },
  { at: 74, text: "load draco geometry" },
  { at: 90, text: "ignite lights" },
];

/** Roles for the bottom edge ticker. */
const TICKER = [
  "Full Stack Developer",
  "Software Engineer",
  "Building in Public",
  "Web · Games · Cloud",
];

const RING_RADIUS = 54;
const RING_CIRC = 2 * Math.PI * RING_RADIUS;
const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false); // 100% reached → "Welcome"
  const [isLoaded, setIsLoaded] = useState(false); // handshake stage
  const [clicked, setClicked] = useState(false); // portal-wipe exit
  const firedAt100 = useRef(false);
  const timers = useRef<number[]>([]);

  // Lock page scroll while the boot screen is up, restore on unmount.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Fire the "100% → loaded → reveal" chain exactly once.
  useEffect(() => {
    if (percent >= 100 && !firedAt100.current) {
      firedAt100.current = true;
      const t1 = window.setTimeout(() => {
        setLoaded(true);
        timers.current.push(window.setTimeout(() => setIsLoaded(true), 550));
      }, 400);
      timers.current.push(t1);
    }
  }, [percent]);

  // Once the handshake completes, import the landing intro FX and unmount
  // after the portal-wipe has had a beat to expand.
  useEffect(() => {
    if (!isLoaded) return;
    let cancelled = false;
    import("../character/initialFX").then((module) => {
      if (cancelled) return;
      setClicked(true);
      timers.current.push(
        window.setTimeout(() => {
          if (cancelled) return;
          module.initialFX?.();
          setIsLoading(false);
        }, 650)
      );
    });
    return () => {
      cancelled = true;
    };
  }, [isLoaded, setIsLoading]);

  // Clear pending timers if the loader is torn down early.
  useEffect(
    () => () => {
      timers.current.forEach((t) => window.clearTimeout(t));
    },
    []
  );

  const pct = Math.min(percent, 100);
  const offset = RING_CIRC - (pct / 100) * RING_CIRC;
  const visibleLog = BOOT_LINES.filter((l) => pct >= l.at);

  return (
    <div
      className={`boot-root${clicked ? " boot-clicked" : ""}`}
      role="status"
      aria-live="polite"
      aria-label={`Loading — ${pct}%`}
    >
      {/* ambient aurora backdrop */}
      <div className="boot-aurora boot-aurora--a" aria-hidden="true" />
      <div className="boot-aurora boot-aurora--b" aria-hidden="true" />
      <div className="boot-aurora boot-aurora--c" aria-hidden="true" />
      <div className="boot-grid" aria-hidden="true" />
      <div className="boot-scanline" aria-hidden="true" />

      {/* top bar */}
      <div className="boot-top">
        <span className="boot-wordmark">
          <span className="boot-wordmark-badge">JK</span>
          Jyotirmay Khare
        </span>
        <span className="boot-version">
          {loaded ? "ready" : "booting"} · v2.0
        </span>
      </div>

      {/* center stage — ring + boot log */}
      <div className="boot-stage">
        <div className="boot-core">
          <svg className="boot-ring" viewBox="0 0 128 128" aria-hidden="true">
            <defs>
              <linearGradient id="bootRingGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#5eead4" />
                <stop offset="55%" stopColor="#4d9aff" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
            </defs>
            <circle className="boot-ring-track" cx="64" cy="64" r={RING_RADIUS} />
            <circle
              className="boot-ring-progress"
              cx="64"
              cy="64"
              r={RING_RADIUS}
              style={{ strokeDashoffset: offset }}
            />
          </svg>
          <span className="boot-readout">
            <span className="boot-percent">
              {pct}
              <em>%</em>
            </span>
            <span className={`boot-status${loaded ? " boot-status--done" : ""}`}>
              {loaded ? "Welcome" : "Loading"}
            </span>
          </span>
        </div>

        <div className="boot-console">
          {visibleLog.map((l) => (
            <p key={l.text} className="boot-line">
              <span className="boot-line-prompt" aria-hidden="true">
                ›
              </span>
              {l.text}
            </p>
          ))}
          <p className="boot-line boot-line--live">
            <span className="boot-line-prompt" aria-hidden="true">
              {loaded ? "✓" : "›"}
            </span>
            {loaded ? "welcome to the lab" : "standing by"}
            <span className="boot-cursor" aria-hidden="true" />
          </p>
        </div>
      </div>

      {/* bottom edge ticker */}
      <div className="boot-ticker" aria-hidden="true">
        <div className="boot-ticker-track">
          {[0, 1].map((i) => (
            <span key={i} className="boot-ticker-row">
              {TICKER.map((t) => (
                <em key={t}>{t}</em>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* portal-wipe used for the exit */}
      <div className="boot-wipe" aria-hidden="true" />
    </div>
  );
};

export default Loading;