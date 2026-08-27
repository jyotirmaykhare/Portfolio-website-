import type { CollectionNote, Person } from "@/types";
import { manualInputSource } from "@/data/linkedin/sources";

/**
 * People mentioned on the profile (e.g. hackathon teammates).
 *
 * The seed brief named teammates for the LPU Campus Navigator entry
 * (Atharva Saxena, Adit Chaudhary, Abhijeet Yadav / Code-A-Haunt 3.0), but
 * no public index surfaced these names and the direct profile fetch was
 * blocked (HTTP 999). They are therefore NOT included as records — recording
 * only unconfirmed names would be fabrication. The array is empty and the
 * gap is called out explicitly.
 */
export const people: Person[] = [];

export const peopleMeta: CollectionNote = {
  available: false,
  confidence: "unavailable",
  note:
    "Hackathon teammates and other people were not surfaced by any public " +
    "index and the direct profile fetch was blocked (HTTP 999). The names in " +
    "the build brief could not be verified, so no records are created rather " +
    "than guessing. Requires manual input.",
  source: manualInputSource,
};
