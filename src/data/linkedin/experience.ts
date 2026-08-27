import type { CollectionNote, Experience } from "@/types";
import { site } from "@/data/site";
import type { Source } from "@/types";

/**
 * Experience section.
 *
 * These are NOT conventional employment positions — no companies, employers,
 * exact dates or team-member names exist in the source. They are hackathon /
 * team-project experiences confirmed by the user against their resume /
 * previous portfolio (`user_provided`). The `company` field stays "" and the
 * UI renders only what exists; `employmentType` carries the honest category.
 */
const userProvidedSource: Source = {
  platform: "portfolio",
  url: site.url,
  verified: true,
  confidence: "user_provided",
  note: "Confirmed by the user against their resume / previous portfolio source.",
};

export const experience: Experience[] = [
  {
    title: "Internal Hackathon – Smart India Hackathon (2025)",
    company: "",
    location: null,
    employmentType: "Hackathon / Team Project",
    startDate: "2025",
    endDate: null,
    current: false,
    description:
      "Worked as part of a team in an Internal Hackathon for Smart India Hackathon (2025), developing a 2D story-based game using GDScript on the Godot Engine. Also used Aseprite for designing characters and related game assets/tools.",
    source: {
      ...userProvidedSource,
      note:
        "Team hackathon experience — not an employment position. Exact dates, " +
        "employer and team member names were not provided and remain unknown.",
    },
  },
  {
    title: "IoT Based Project",
    company: "",
    location: null,
    employmentType: "Team Project",
    startDate: null,
    endDate: null,
    current: false,
    description:
      "Worked on a team-based IoT project involving Arduino integration with sensors using C++. The project explored solutions for problems such as body-posture correction and related applications. As part of this work, completed an in-depth Light Emitting Diode (LED) project study and hands-on circuit experimentation: analyzed electroluminescence and P-N junction operation, V-I characteristics and color-dependent forward-threshold voltages (~1.8 V red to ~3.5 V blue/white), designed current-limiting resistors using R = (Vs − Vf) / If, and reviewed key specifications (If 10–30 mA typical, 100 mA peak pulsed, ~100 mW dissipation for standard 5 mm parts, −40 °C to +85 °C operating range) and application areas from displays and indicators to automotive and medical devices. Ran brightness-vs-current measurements on a standard red GaAsP LED at a 5 V supply across resistor values — 100 Ω → 31 mA (very bright), 220 Ω → 14.2 mA (bright), 470 Ω → 6.7 mA (moderate), 10 kΩ → 3.2 mA (dim) — confirming that luminous intensity is proportional to forward current and that brightness can be managed through PWM or current control, with current limiting essential to prevent thermal runaway.",
    source: {
      ...userProvidedSource,
      note:
        "Team project experience — not an employment position. Exact dates and " +
        "affiliation were not provided and remain unknown.",
    },
  },
];

export const experienceMeta: CollectionNote = {
  available: true,
  confidence: "user_provided",
  note:
    "Both entries are hackathon / team-project experiences (not employment) " +
    "confirmed by the user. No companies, employers or exact dates exist in " +
    "the source, so none are shown.",
  source: userProvidedSource,
};

