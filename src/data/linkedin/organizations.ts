import type { CollectionNote, Organization } from "@/types";
import { manualInputSource } from "@/data/linkedin/sources";

/**
 * Organizations followed / affiliated on the profile.
 *
 * The public index surfaced only Education (Lovely Professional University)
 * and the headline "Frontend Developer | JavaScript | API Integration" — there
 * was no Experience/companies section, so no organizations can be confirmed.
 * The array is empty and the gap is explicit.
 */
export const organizations: Organization[] = [];

export const organizationsMeta: CollectionNote = {
  available: false,
  confidence: "unavailable",
  note:
    "No organizations could be confirmed from the public index and the " +
    "direct profile fetch was blocked (HTTP 999). Requires manual input.",
  source: manualInputSource,
};
