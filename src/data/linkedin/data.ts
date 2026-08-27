import type { CollectionNote, LinkedInData } from "@/types";
import { profile } from "@/data/linkedin/profile";
import { education, educationMeta } from "@/data/linkedin/education";
import { experience, experienceMeta } from "@/data/linkedin/experience";
import { certifications, certificationsMeta } from "@/data/linkedin/certifications";
import { people, peopleMeta } from "@/data/linkedin/people";
import { organizations, organizationsMeta } from "@/data/linkedin/organizations";
import { getPost, postById, posts, postsMeta } from "@/data/linkedin/posts";
import {
  MODELED_PROJECT_SLUGS,
  getLinkedinProject,
  linkedinProjects,
  linkedinProjectsMeta,
} from "@/data/linkedin/projects";
import {
  getHashtag,
  getTechnology,
  hashtags,
  relatedPostsByTech,
  technologies,
} from "@/data/linkedin/derived";

/**
 * The single composed fact sheet consumed by the /linkedin page.
 * Sections read from here — never from ad-hoc literals inside components.
 */
export const linkedinData: LinkedInData = {
  profile,
  experience,
  education,
  certifications,
  projects: linkedinProjects,
  posts,
  people,
  organizations,
  hashtags,
  technologies,
};

/** Per-collection availability notes, keyed by section name. */
export const collectionNotes: Record<string, CollectionNote> = {
  profile: {
    available: true,
    confidence: "publicly_discovered",
    note:
      "Headline, location, network metrics and About preview confirmed via the " +
      "Exa.ai public index (direct profile fetch blocked: HTTP 999).",
    source: profile.source,
  },
  experience: experienceMeta,
  education: educationMeta,
  certifications: certificationsMeta,
  projects: linkedinProjectsMeta,
  posts: postsMeta,
  people: peopleMeta,
  organizations: organizationsMeta,
};

export {
  MODELED_PROJECT_SLUGS,
  getLinkedinProject,
  getPost,
  postById,
  getHashtag,
  getTechnology,
  relatedPostsByTech,
};
