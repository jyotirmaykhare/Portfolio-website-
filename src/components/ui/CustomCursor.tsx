import { useEffect, useRef, useState } from "react";

/**
 * CustomCursor — a lightweight trailing cursor (dot + trailing ring) in the
 * spirit of 3D portfolios like the akashrmalhotra site.
 *
 * - The dot snaps to the pointer; the ring chases it with a soft lerp driven
 *   by a single rAF loop (no per-frame React state).
 * - Over interactive targets (`<a>`, `<button>`, `[data-cursor]`, ...) the
 *   ring grows into a soft, accents-tinted halo; `[data-cursor="disable"]`
 *   hides it entirely.
 * - The native cursor is only hidden over interactive elements — the text
 *   caret in inputs is never suppressed — so it never feels broken.
 *
 * Deliberately off for touch devices (`hover: none`) and reduced-motion users.
 */
const HOVER_SELECTOR =
  "a, button, [data-cursor], [role='button'], summary, label, input[type='submit'], input[type='checkbox'], input[type='radio']";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("custom-cursor-active");

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { x: mouse.x, y: mouse.y };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
    };

    const tick = () => {
      // Ring lags behind the dot with a light lerp for a fluid "chase".
      pos.x += (mouse.x - pos.x) * 0.18;
      pos.y += (mouse.y - pos.y) * 0.18;
      ring.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("[data-cursor='disable']")) {
        ring.classList.add("is-hidden");
        return;
      }
      ring.classList.remove("is-hidden");
      if (t.closest(HOVER_SELECTOR)) ring.classList.add("is-hover");
    };
    const onOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("[data-cursor='disable']")) {
        ring.classList.remove("is-hidden");
        return;
      }
      ring.classList.remove("is-hover");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mouseout", onOut, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden />
      <div ref={ringRef} className="custom-cursor-ring" aria-hidden />
    </>
  );
}