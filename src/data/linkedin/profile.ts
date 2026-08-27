import type { LinkedInProfile, ProfileCta, Source } from "@/types";
import {
  LINKEDIN_PROFILE_URL,
  linkedinIndexSource,
} from "@/data/linkedin/sources";
import { site } from "@/data/site";

/**
 * LinkedIn profile fact sheet.
 *
 * Headline, location, About summary, phone and education details were later
 * CONFIRMED BY THE USER against their own resume / previous portfolio source,
 * and are recorded as `user_provided`. Remaining network metrics come from
 * the Exa.ai public index of https://www.linkedin.com/in/jyotirmay-khare
 * (a direct profile fetch returned HTTP 999, LinkedIn's anti-bot block).
 * Anything still unconfirmed stays `null` and the UI hides it gracefully —
 * never invented.
 * Note on the connections/followers numbers:
 *  - "500+" is LinkedIn's own capped display (>=500, exact hidden by LinkedIn).
 *  - "1,030 followers" is the indexed follower count; it is real but is NOT
 *    live-verified (index snapshot) and may be stale. It is recorded as
 *    `publicly_discovered`, not `verified`, and the UI labels it as such.
 */
export const profile: LinkedInProfile = {
  name: "Jyotirmay Khare",
  headline: "Entry-Level Developer | Web Development | Game Development",
  location: "Jalandhar, Punjab, India",
  photoUrl: null, // profile photo is login-walled / not surfaced by the index
  summary:
    "Detail-oriented entry-level developer skilled in HTML, CSS, JavaScript, Python, and GDScript, with a strong focus on building clean and maintainable solutions. Known for quick learning and effective problem-solving. Seeking to begin my career in web development while expanding my expertise in both web and interactive application workflows.",
  summaryComplete: true,
  connections: {
    display: "500+", // LinkedIn's own capped display
    exact: null, // LinkedIn hides the exact count above 500+
    source: {
      ...linkedinIndexSource,
      note:
        "LinkedIn renders '500+ connections' (capped); exact count is " +
        "intentionally hidden and therefore unavailable.",
    },
  },
  followers: {
    value: 1030,
    source: {
      ...linkedinIndexSource,
      note:
        "Indexed follower count (1,030). From a search-engine index snapshot, " +
        "so it is real but not live-verified and may be stale.",
    },
  },
  ctas: buildCtas(),
  source: {
    platform: "portfolio",
    url: site.url,
    verified: true,
    confidence: "user_provided",
    note:
      "Headline, location and About summary confirmed by the user against " +
      "their resume / previous portfolio. Network metrics (connections, " +
      "followers) remain an Exa.ai public-index snapshot of the LinkedIn " +
      "profile (direct fetch blocked: HTTP 999).",
  },
};

function buildCtas(): ProfileCta[] {
  const ctas: ProfileCta[] = [
    {
      label: "View on LinkedIn",
      href: LINKEDIN_PROFILE_URL,
      source: linkedinIndexSource,
    },
  ];
  // The portfolio already exposes an email/contact; surface it as a real CTA
  // but attribute it to the user-provided portfolio source.
  if (site.email) {
    const emailSource: Source = {
      platform: "portfolio",
      url: site.url,
      verified: true,
      confidence: "user_provided",
      note: "Portfolio contact email (user-provided).",
    };
    ctas.push({
      label: "Email",
      href: `mailto:${site.email}`,
      source: emailSource,
    });
  }
  // Phone number supplied by the user (resume / previous portfolio source).
  if (site.phone) {
    const phoneSource: Source = {
      platform: "portfolio",
      url: site.url,
      verified: true,
      confidence: "user_provided",
      note: "Phone number provided by the user (resume source).",
    };
    ctas.push({
      label: "Call",
      href: `tel:${site.phone.replace(/[^+\d]/g, "")}`,
      source: phoneSource,
    });
  }
  return ctas;
}
