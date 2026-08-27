import type { CollectionNote, LinkedInProject, LinkedInProjectLink, Source } from "@/types";
import { getProject } from "@/data/projects";
import { posts } from "@/data/linkedin/posts";
import { derivedSource, linkedinIndexSource, portfolioSource } from "@/data/linkedin/sources";

/**
 * Projects modelled for the LinkedIn archive.
 *
 * Names, links and descriptions are reused from the portfolio's own verified
 * project records (live URLs confirmed). Tech is taken ONLY from the
 * technologies confirmed by the project's related LinkedIn posts (derived from
 * their share hashtags). The portfolio's fuller stack is NOT claimed here —
 * it lives in the portfolio and is linked out to.
 */
export const MODELED_PROJECT_SLUGS = [
  "wavebeats",
  "tradescope-pro",
  "priceradar",
  "postgresql-mastery",
  "status-radar", // API Status Radar — no confirming post found
  "lpu-navigator", // LPU Campus Navigator — no confirming post found
] as const;

function distinct<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

function slugToLinkedInProject(slug: string): LinkedInProject | undefined {
  const p = getProject(slug);
  if (!p) return undefined;

  const projectPosts = posts.filter((post) => post.relatedProjectIds.includes(slug));
  const tech = distinct(projectPosts.flatMap((post) => post.tech));
  const relatedPostIds = distinct(projectPosts.map((post) => post.id));
  const confirmed = relatedPostIds.length > 0;

  const links: LinkedInProjectLink[] = p.links.map((l) => ({
    label: l.label,
    href: l.href,
    external: l.external ?? true,
    source: portfolioSource,
  }));

  const source: Source = {
    ...portfolioSource,
    note:
      "Project identity + links from the verified portfolio " +
      `(live URLs confirmed). Tech is derived only from ${relatedPostIds.length} ` +
      "LinkedIn post(s); the portfolio's fuller stack is not claimed here. " +
      `LinkedIn presence: ${confirmed ? "confirmed" : "NOT confirmed (no related post indexed)"}.`,
  };

  return {
    slug: p.slug,
    name: p.name,
    description: p.tagline,
    tech,
    linkedInConfirmed: confirmed,
    links,
    relatedPostIds,
    source,
  };
}

export const linkedinProjects: LinkedInProject[] = MODELED_PROJECT_SLUGS.map(slugToLinkedInProject).filter(
  (p): p is LinkedInProject => p !== undefined
);

export function getLinkedinProject(slug: string): LinkedInProject | undefined {
  return linkedinProjects.find((p) => p.slug === slug);
}

/** Posts mentioning a given project slug (inverse of relatedProjectIds). */
export function postsForProject(slug: string): string[] {
  return distinct(
    posts.filter((post) => post.relatedProjectIds.includes(slug)).map((post) => post.id)
  );
}

export const linkedinProjectsMeta: CollectionNote = {
  available: true,
  confidence: "derived",
  note:
    "Project records cross-reference the verified portfolio (name/links/description) " +
    "with LinkedIn presence derived from confirmed share hashtags. Tech shown here is " +
    "only what the posts confirm; the full stack lives in the portfolio.",
  source: derivedSource,
};

// Re-exported so the barrel can surface a single provenance note.
export { linkedinIndexSource };
