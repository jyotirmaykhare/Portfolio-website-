import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/utils";

interface MagneticOptions {
  /** Max pull in px (brief: 2–8px). */
  strength?: number;
}

/**
 * Magnetic pull for important buttons. The element drifts toward the cursor
 * by a few pixels and springs back on leave. Implemented on rAF with a soft
 * lerp (no per-frame React state). Disabled for touch and reduced-motion.
 */
export function useMagnetic<T extends HTMLElement = HTMLButtonElement>({
  strength = 6,
}: MagneticOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const pos = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
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
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const len = Math.hypot(dx, dy) || 1;
      // Cap the pull so it never exceeds `strength` px.
      const pull = Math.min(len, strength * 4);
      target.x = (dx / len) * Math.min(pull, strength);
      target.y = (dy / len) * Math.min(pull, strength);
      start();
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      start();
    };

    const tick = () => {
      const k = 0.16;
      pos.x += (target.x - pos.x) * k;
      pos.y += (target.y - pos.y) * k;
      const settled = Math.abs(target.x - pos.x) < 0.05 && Math.abs(target.y - pos.y) < 0.05;
      if (settled && (target.x === 0 && target.y === 0)) {
        el.style.transform = "";
        running = false;
        return;
      }
      el.style.transform = `translate3d(${pos.x.toFixed(2)}px, ${pos.y.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
      running = false;
      el.style.transform = "";
    };
  }, [strength]);

  return ref;
}