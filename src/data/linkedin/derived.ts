import type { Hashtag, Technology } from "@/types";
import { posts } from "@/data/linkedin/posts";
import { linkedinProjects } from "@/data/linkedin/projects";
import { derivedSource } from "@/data/linkedin/sources";

/**
 * Derived tag lists — computed from confirmed post/project data, never
 * hand-authored separately. These power the hashtag / technology explorers
 * so filters can only ever reflect what actually exists in the archive.
 */

/** Aggregated hashtag index across all confirmed shares. */
export const hashtags: Hashtag[] = (() => {
  const byTag = new Map<string, Hashtag>();
  for (const p of posts) {
    for (const tag of p.hashtags) {
      const key = tag.toLowerCase();
      const existing = byTag.get(key);
      if (existing) {
        existing.usageCount += 1;
        existing.posts.push(p.id);
      } else {
        byTag.set(key, {
          tag,
          usageCount: 1,
          posts: [p.id],
          source: {
            ...derivedSource,
            note: `Derived from the URL slug of LinkedIn share ${p.id}.`,
          },
        });
      }
    }
  }
  return Array.from(byTag.values()).sort(
    (a, b) => b.usageCount - a.usageCount || a.tag.localeCompare(b.tag)
  );
})();

/** Aggregated technology index across posts AND LinkedIn-confirmed project tech. */
export const technologies: Technology[] = (() => {
  const byName = new Map<string, Technology>();

  const touch = (name: string) => {
    const key = name.toLowerCase();
    let entry = byName.get(key);
    if (!entry) {
      entry = { name, posts: [], projects: [], source: { ...derivedSource } };
      byName.set(key, entry);
    }
    return entry;
  };

  for (const p of posts) {
    for (const tech of p.tech) {
      touch(tech).posts.push(p.id);
    }
  }
  for (const proj of linkedinProjects) {
    for (const tech of proj.tech) {
      touch(tech).projects.push(proj.slug);
    }
  }

  return Array.from(byName.values()).sort(
    (a, b) =>
      b.posts.length - a.posts.length || a.name.localeCompare(b.name)
  );
})();

export function getTechnology(name: string): Technology | undefined {
  const key = name.toLowerCase();
  return technologies.find((t) => t.name.toLowerCase() === key);
}

export function getHashtag(tag: string): Hashtag | undefined {
  const key = tag.toLowerCase().replace(/^#/, "");
  return hashtags.find((h) => h.tag.toLowerCase() === key);
}

/** Posts sharing any tech with a given post (used by the detail modal). */
export function relatedPostsByTech(postId: string, limit = 3): string[] {
  const current = posts.find((p) => p.id === postId);
  if (!current || current.tech.length === 0) return [];
  return posts
    .filter((p) => p.id !== postId)
    .map((p) => ({
      id: p.id,
      overlap: p.tech.filter((t) => current.tech.includes(t)).length,
    }))
    .filter((x) => x.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, limit)
    .map((x) => x.id);
}
