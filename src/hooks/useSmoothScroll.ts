import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "@/character/gsapSetup";
import { prefersReducedMotion } from "@/lib/utils";

/**
 * Sets up Lenis smooth scrolling and — critically — syncs it with GSAP
 * ScrollTrigger so that scroll-based animations (e.g. the hero camera sweep
 * in Scene.tsx) fire at the correct position and timing.
 *
 * Without the `lenis.on("scroll", ScrollTrigger.update)` line, ScrollTrigger
 * never hears about Lenis scroll events and its scrub-based tweens stay stuck
 * at their starting state. This is the #1 cause of "scroll animation not
 * working / jumping on desktop".
 *
 * Disabled when the user prefers reduced motion.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Keep ScrollTrigger in lock-step with Lenis scroll position.
    lenis.on("scroll", ScrollTrigger.update);

    // Lenis drives scroll via RAF; start the loop and refresh triggers
    // so they measure element positions against the correct scroll offset.
    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    ScrollTrigger.refresh();

    return () => {
      cancelAnimationFrame(rafId);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
    };
  }, []);
}
