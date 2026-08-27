/**
 * Barrel for the LinkedIn content layer.
 * UI components import from "@/data/linkedin" only.
 */
export { LINKEDIN_PROFILE_URL, EXA_INDEX_URL, linkedinIndexSource, portfolioSource, derivedSource, manualInputSource } from "@/data/linkedin/sources";
export { profile } from "@/data/linkedin/profile";
export { education, educationMeta } from "@/data/linkedin/education";
export { experience, experienceMeta } from "@/data/linkedin/experience";
export { certifications, certificationsMeta } from "@/data/linkedin/certifications";
export { people, peopleMeta } from "@/data/linkedin/people";
export { organizations, organizationsMeta } from "@/data/linkedin/organizations";
export { getPost, postById, posts, postsMeta } from "@/data/linkedin/posts";
export {
  MODELED_PROJECT_SLUGS,
  getLinkedinProject,
  linkedinProjects,
  linkedinProjectsMeta,
  postsForProject,
} from "@/data/linkedin/projects";
export {
  getHashtag,
  getTechnology,
  hashtags,
  relatedPostsByTech,
  technologies,
} from "@/data/linkedin/derived";
export {
  collectionNotes,
  linkedinData,
} from "@/data/linkedin/data";
