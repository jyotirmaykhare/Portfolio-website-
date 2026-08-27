import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useTilt } from "@/hooks/useTilt";
import { prefersReducedMotion } from "@/lib/utils";

interface GlassTiltCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * A glass card with two restrained premium behaviors:
 *  - subtle 3D tilt (≈4–5°, springs back on leave) via useTilt
 *  - an extremely subtle "light reflecting across glass" highlight that
 *    tracks the pointer (opacity ≈ 7%, soft 420px radial) — deliberately
 *    NOT a bright circle following the cursor.
 *
 * The card owns the glass surface itself (rounded-2xl + frost), so the
 * highlight sits *inside* the glass — the content is laid on top.
 * Skipped visually for touch devices and reduced-motion visitors.
 */
export function GlassTiltCard({ children, className }: GlassTiltCardProps) {
  const tiltRef = useTilt<HTMLDivElement>({ max: 4 });
  const shell = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = shell.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--hx", `${(x * 100).toFixed(2)}%`);
    el.style.setProperty("--hy", `${(y * 100).toFixed(2)}%`);
  }, []);

  const onLeave = useCallback(() => {
    const el = shell.current;
    if (!el) return;
    el.style.setProperty("--hx", "0%");
    el.style.setProperty("--hy", "-80%");
  }, []);

  useEffect(() => {
    const el = shell.current;
    if (!el) return;
    el.style.setProperty("--hx", "0%");
    el.style.setProperty("--hy", "-80%");
  }, []);

  return (
    <div ref={tiltRef} className={cn("will-change-transform", className)}>
      <div
        ref={shell}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="glass relative h-full overflow-hidden rounded-3xl"
      >
        {/* Glass pointer-light — sits INSIDE the glass, above the frost,
            under the content. Opacity kept tiny so it reads as glaze. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{
            background:
              "radial-gradient(420px circle at var(--hx, 0%) var(--hy, -80%), color-mix(in srgb, #ffffff 8%, transparent), transparent 64%)",
          }}
        />
        <div className="relative h-full">{children}</div>
      </div>
    </div>
  );
}