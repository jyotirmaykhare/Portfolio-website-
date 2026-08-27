/**
 * LinkedIn Professional Archive — typed content layer.
 *
 * Design rules enforced by this schema (see the build brief):
 *  - EVERY record carries a `source` descriptor, so no value is ever shown
 *    to a visitor without a traceable origin.
 *  - No field is ever invented. Anything that could not be confirmed against
 *    a real, public source is modelled as `null` with a `CollectionNote`
 *    explaining why, and the UI renders "Data unavailable / Requires manual input".
 *  - Post-level analytics never leak between posts: engagement lives only on
 *    its own post record.
 */

/** Where a value came from. This is the single source of truth for "is it real?". */
export type Confidence =
  | "verified" // confirmed against a live, reachable source
  | "publicly_discovered" // read from a public search-engine index (Exa / Google) of the live profile
  | "user_provided" // authored directly by the user (their verified portfolio content)
  | "derived" // computed from other confirmed data
  | "unavailable"; // could not be confirmed → render "Requires manual input"

export interface Source {
  /** Origin platform / tool that surfaced this record. */
  platform:
    | "linkedin"
    | "linkedin-index"
    | "portfolio"
    | "search-index"
    | "derivation"
    | "manual";
  /** Canonical URL the value was read from (for transparency / verification). */
  url: string;
  /** Whether the value has been confirmed against the live source. */
  verified: boolean;
  /** Confidence tier — never fabricated. */
  confidence: Confidence;
  /** Optional human-readable provenance note (staleness, inference, etc.). */
  note?: string;
}

/** Per-collection availability metadata. Lets sections degrade gracefully
 *  instead of silently rendering empty space. */
export interface CollectionNote {
  available: boolean;
  confidence: Confidence;
  note: string;
  source: Source;
}

/** Reusable "this whole section is currently unavailable" source block. */
export const UNAVAILABLE: Source = {
  platform: "manual",
  url: "",
  verified: false,
  confidence: "unavailable",
  note: "Could not be confirmed from any public source; live LinkedIn fetch was blocked (HTTP 999).",
};

export interface ProfileCta {
  label: string;
  href: string;
  source: Source;
}

export interface LinkedInProfile {
  name: string;
  headline: string | null;
  location: string | null;
  photoUrl: string | null;
  summary: string | null;
  /** True when the summary is the full body vs. a truncated indexed preview. */
  summaryComplete: boolean;
  connections: {
    display: string;
    exact: number | null;
    source: Source;
  } | null;
  followers: {
    value: number;
    source: Source;
  } | null;
  ctas: ProfileCta[];
  source: Source;
}

export interface Experience {
  title: string;
  company: string;
  location: string | null;
  employmentType: string | null;
  startDate: string | null; // ISO "YYYY-MM"
  endDate: string | null; // null => Present
  current: boolean;
  description: string | null;
  source: Source;
}

export interface Education {
  institution: string;
  degree: string | null;
  fieldOfStudy: string | null;
  startDate: string | null;
  endDate: string | null;
  current: boolean;
  grade: string | null;
  activities: string | null;
  source: Source;
}

export interface Certification {
  name: string;
  issuer: string;
  issueDate: string | null;
  expiryDate: string | null;
  credentialId: string | null;
  credentialUrl: string | null;
  image: string | null;
  skills: string[];
  /** When true, the UI highlights this certification (user-designated). */
  featured?: boolean;
  /**
   * Whether the credentialUrl publicly opens for visitors. When false, the UI
   * shows a "link not working currently" note instead of a verify button.
   */
  verificationWorking?: boolean;
  source: Source;
}

export interface LinkedInProjectLink {
  label: string;
  href: string;
  external: boolean;
  source?: Source;
}

export interface LinkedInProject {
  slug: string;
  name: string;
  description: string | null;
  /** Technologies confirmed present on LinkedIn (derived from post hashtags / headline). */
  tech: string[];
  /** True when at least one confirming post exists. */
  linkedInConfirmed: boolean;
    links: LinkedInProjectLink[];
  /** Post IDs this project is explicitly mentioned in. */
  relatedPostIds: string[];
  source: Source;
}

export type MediaType = "image" | "video" | "document" | "link" | "unknown";

export interface PostMedia {
  type: MediaType;
  url: string | null;
  alt: string | null;
  source: Source;
}

export interface PostEngagement {
  views: number | null;
  likes: number | null;
  comments: number | null;
  reposts: number | null;
  /** The single source of these numbers — always this post's own record. */
  source: Source;
}

export interface Post {
  /** Stable identifier (LinkedIn activity ID). */
  id: string;
  url: string;
  /** ISO date string when confirmed, else null. */
  date: string | null;
  /** 1-based relative chronology derived from activity-ID magnitude (confidence: derived). */
  order: number;
  /** Full post body — null where login-walled / not indexed. */
  fullText: string | null;
  /** Confirmed share title / first line captured from the search index. */
  indexedPreview: string | null;
  /** Hashtags derived from the post URL slug (confirmed public surface). */
  hashtags: string[];
  mentions: string[];
  media: PostMedia[];
  /** E.g. "Project showcase" | "Tutorial" — derived from content. */
  category: string | null;
  /** Portfolio project slugs this post is confirmed / inferred to relate to. */
  relatedProjectIds: string[];
  /** Technologies derived from this post's hashtags. */
  tech: string[];
  engagement: PostEngagement;
  source: Source;
}

export interface Person {
  name: string;
  relation: string; // "teammate" | "mentor" | "connection" | ...
  link: string | null;
  source: Source;
}

export interface Organization {
  name: string;
  relation: string;
  link: string | null;
  source: Source;
}

export interface Hashtag {
  tag: string;
  usageCount: number;
  /** Post IDs using this hashtag. */
  posts: string[];
  source: Source;
}

export interface Technology {
  name: string;
  posts: string[];
  projects: string[];
  source: Source;
}

/** One canonical fact sheet consumed by the page. */
export interface LinkedInData {
  profile: LinkedInProfile;
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  projects: LinkedInProject[];
  posts: Post[];
  people: Person[];
  organizations: Organization[];
  hashtags: Hashtag[];
  technologies: Technology[];
}