import { clsx, type ClassValue } from "clsx";

/** Merge class names */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Respect user reduced-motion preference */
export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
