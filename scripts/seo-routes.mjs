/**
 * Shared SEO route source — the single source of truth used by both the
 * sitemap generator (scripts/generate-seo.mjs) and the prerenderer
 * (scripts/prerender.mjs). Project routes are derived directly from the
 * typed data layer (src/data/projects.ts) so new projects are picked up
 * automatically on every build.
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

export const SITE_URL = "https://jyotirmaykhare.dev";

export function getProjectSlugs() {
  const src = readFileSync(resolve(ROOT, "src/data/projects.ts"), "utf8");
  const slugs = [...src.matchAll(/^\s*slug:\s*"([^"]+)"/gm)].map((m) => m[1]);
  if (slugs.length === 0) {
    throw new Error("No project slugs found in src/data/projects.ts");
  }
  return slugs;
}

/** All indexable routes, in crawl priority order. */
export function getRoutes() {
  return [
    "/",
    "/about",
    "/projects",
    "/projects/tech",
    "/projects/other",
    ...getProjectSlugs().map((slug) => `/projects/${slug}`),
    "/certifications",
    "/contact",
    "/linkedin",
  ];
}

/** Sitemap tuning per route (defaults applied to project routes). */
export function getRouteMeta() {
  return {
    "/": { changefreq: "weekly", priority: "1.0" },
    "/about": { changefreq: "monthly", priority: "0.8" },
    "/projects": { changefreq: "weekly", priority: "0.9" },
    "/projects/tech": { changefreq: "weekly", priority: "0.9" },
    "/projects/other": { changefreq: "monthly", priority: "0.8" },
    "/certifications": { changefreq: "monthly", priority: "0.8" },
    "/contact": { changefreq: "yearly", priority: "0.6" },
    "/linkedin": { changefreq: "monthly", priority: "0.6" },
  };
}
