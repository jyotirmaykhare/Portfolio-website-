import type { CollectionNote, Education } from "@/types";
import { site } from "@/data/site";
import type { Source } from "@/types";

/**
 * Education — confirmed by the user against their resume / previous
 * portfolio source (recorded as `user_provided`, never invented).
 *
 * Grade and activities/societies were NOT provided → modelled as null
 * and simply omitted by the UI. CGPA/percentage intentionally unknown.
 */
const userProvidedSource: Source = {
  platform: "portfolio",
  url: site.url,
  verified: true,
  confidence: "user_provided",
  note: "Confirmed by the user against their resume / previous portfolio source.",
};

export const education: Education[] = [
  {
    institution: "Lovely Professional University",
    degree: "Bachelor of Technology",
    fieldOfStudy: "Computer Science and Engineering",
    startDate: "2025-01",
    endDate: "2029-01", // expected graduation; currently pursuing
    current: true,
    grade: null,
    activities: null,
    source: {
      ...userProvidedSource,
      note:
        "Degree, field of study, institution and 2025–2029 duration confirmed " +
        "by the user. Location: Jalandhar, Punjab, India.",
    },
  },
  {
    institution: "Maharishi Vidya Mandir",
    degree: "Class XII (CBSE Board)",
    fieldOfStudy: null,
    startDate: "2024",
    endDate: "2025",
    current: false,
    grade: null,
    activities: null,
    source: {
      ...userProvidedSource,
      note:
        "Class XII at Maharishi Vidya Mandir, Chhatarpur (Madhya Pradesh), " +
        "CBSE Board, 2024–25, confirmed by the user.",
    },
  },
  {
    institution: "Maharishi Vidya Mandir",
    degree: "Class X (CBSE Board)",
    fieldOfStudy: null,
    startDate: "2024",
    endDate: "2025",
    current: false,
    grade: null,
    activities: null,
    source: {
      ...userProvidedSource,
      note:
        "Class X at Maharishi Vidya Mandir, Chhatarpur (Madhya Pradesh), " +
        "CBSE Board, 2024–25, confirmed by the user.",
    },
  },
];

export const educationMeta: CollectionNote = {
  available: true,
  confidence: "user_provided",
  note:
    "All three education entries are user-provided from the resume / previous " +
    "portfolio. Grades, percentages and activities were not supplied and are " +
    "intentionally left empty rather than invented.",
  source: userProvidedSource,
};

