import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/utils";

interface TiltOptions {
  /** Max tilt in degrees (brief: ~3–6°, keep restrained). */
  max?: number;
}

/**
 * Subtle 3D tilt for cards. Pointer position drives rotateX/rotateY
 * (≈ max degrees), sprung back to 0 on leave. Runs on rAF, never touches
 * React state per frame. Skipped entirely for touch devices and visitors
 * who prefer reduced motion (the card then stays perfectly flat).
 */
export function useTilt<T extends HTMLElement = HTMLDivElement>({ max = 5 }: TiltOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const current = { rx: 0, ry: 0 };
    const target = { rx: 0, ry: 0 };
    let raf = 0;
    let running = false;

    const start = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5; // -0.5..0.5
      const py = (e.clientY - r.top) / r.height - 0.5;
      target.ry = px * max * 2; // sway in Y
      target.rx = -py * max * 2;
      start();
    };
    const onLeave = () => {
      target.rx = 0;
      target.ry = 0;
      start();
    };

    const tick = () => {
      const k = 0.12; // soft spring-ish ease
      current.rx += (target.rx - current.rx) * k;
      current.ry += (target.ry - current.ry) * k;
      const settled = Math.abs(target.rx - current.rx) < 0.01 && Math.abs(target.ry - current.ry) < 0.01;
      el.style.transform = settled
        ? ""
        : `perspective(900px) rotateX(${current.rx.toFixed(2)}deg) rotateY(${current.ry.toFixed(2)}deg)`;
      if (!settled || target.rx !== 0 || target.ry !== 0) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
      running = false;
    };
  }, [max]);

  return ref;
}