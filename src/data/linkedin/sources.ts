/**
 * Provenance constants for the LinkedIn content layer.
 *
 * IMPORTANT: a live fetch of https://www.linkedin.com/in/jyotirmay-khare
 * was attempted at build/content time and returned HTTP 999 (LinkedIn's
 * anti-bot block). Public profile facts below were therefore confirmed via
 * the Exa.ai search index + Google snippet indexing of the public profile,
 * NOT by scraping the live LinkedIn page per visitor. See build notes.
 */
import type { Source } from "@/types";
import { site } from "@/data/site";

/** Canonical LinkedIn profile URL (matches the portfolio's own link). */
export const LINKEDIN_PROFILE_URL = site.linkedin; // https://www.linkedin.com/in/jyotirmay-khare

/** The Exa.ai public-index entry that mirrored the profile. */
export const EXA_INDEX_URL =
  "https://exa.ai/library/person/5h4xcgy07wn";

/**
 * Used for facts read from the public search-engine index of the profile.
 * `verified: false` because we could not reach the live profile directly.
 */
export const linkedinIndexSource: Source = {
  platform: "linkedin-index",
  url: LINKEDIN_PROFILE_URL,
  verified: false,
  confidence: "publicly_discovered",
  note:
    "Read from the Exa.ai public index of the LinkedIn profile; a direct " +
    "profile fetch returned HTTP 999 (bot block). Values are real but not live-verified.",
};

/** Portfolio values the user authored and verified (live links in projects.ts). */
export const portfolioSource: Source = {
  platform: "portfolio",
  url: site.url,
  verified: true,
  confidence: "user_provided",
  note: "From the portfolio's own verified content (live URLs confirmed).",
};

/** Computed from confirmed data (post hashtags, activity-ID order, inverse maps). */
export const derivedSource: Source = {
  platform: "derivation",
  url: LINKEDIN_PROFILE_URL,
  verified: false,
  confidence: "derived",
  note: "Derived from confirmed post/project data.",
};

/** A single "unavailable — requires manual input" record source. */
export const manualInputSource: Source = {
  platform: "manual",
  url: "",
  verified: false,
  confidence: "unavailable",
  note: "Requires manual input. Not present in any public index.",
};
