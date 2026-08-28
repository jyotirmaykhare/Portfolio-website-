import type { Certification, CollectionNote } from "@/types";
import { site } from "@/data/site";
import type { Source } from "@/types";

/**
 * Certifications.
 *
 * All entries are user-provided (`user_provided`). Per user request only ONE
 * Infosys Springboard certification is listed. Each certificate supports two
 * proof methods in the UI: (1) certificate image, (2) online verification
 * link — with a graceful "link not working currently" note where the issuer
 * page is login-walled / JS-only (verified at build time).
 */
const userProvidedSource: Source = {
  platform: "portfolio",
  url: site.url,
  verified: true,
  confidence: "user_provided",
  note: "Confirmed by the user against their resume / previous portfolio source.",
};

export const certifications: Certification[] = [
  {
    name: "Code-A-Haunt 3.0 — Certificate of Participation",
    issuer: "CodingBlocks LPU",
    issueDate: "2026-03", // event held 13–14 March 2026
    expiryDate: null,
    credentialId: "fb913042-9d29-4758-855e-75af9996adf9",
    credentialUrl:
      "https://verification.givemycertificate.com/v/fb913042-9d29-4758-855e-75af9996adf9",
    image: "/certificates/code-a-haunt-3.0.jpg",
    verificationWorking: true,
    skills: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "shadcn-ui",
      "Leaflet",
      "Express",
    ],
    source: {
      platform: "portfolio",
      url: "https://verification.givemycertificate.com/v/fb913042-9d29-4758-855e-75af9996adf9",
      verified: true,
      confidence: "user_provided",
      note:
        "Certificate of Participation awarded to Jyotirmay Khare for participating " +
        "in Code-A-Haunt 3.0, a National-Level Inter-University Hackathon organized " +
        "by CodingBlocks LPU at Lovely Professional University (13–14 March 2026), " +
        "showcasing skills in coding and problem-solving. PARTICIPATION ONLY — this " +
        "is not an award, rank or winning position. Per the publicly indexed LinkedIn " +
        "activity, Jyotirmay Khare participated as TEAM LEADER of a four-member team " +
        "(with Atharva Saxena, Adit Chaudhary and Abhijeet Yadav); the team built LPU " +
        "Campus Navigator — a web platform helping freshers navigate the LPU campus " +
        "(interactive map, smart routing, location clustering, smart suggestions, " +
        "campus-query chatbot, notifications, events, profile management, facilities " +
        "info, issue reporting, responsive UI, dark mode). Credential ID and " +
        "verification URL were decoded from the QR code printed on the actual " +
        "certificate; the certificate scan is used as-is as the badge asset.",
    },
  },
  {
    name: "Learning Full Stack React — Infosys Springboard",
    issuer: "Infosys Springboard",
    issueDate: null,
    expiryDate: null,
    credentialId: null,
    credentialUrl:
      "https://infyspringboard.onwingspan.com/web/en/app/toc/lex_auth_013009443190092817922301_shared/overview",
    image: "/certificates/infosys-springboard-react.jpg",
    imageAlt:
      "Learning Full Stack React — Infosys Springboard course completion certificate",
    featured: true,
    verificationWorking: false,
    skills: ["React", "JSX", "Components", "State & Props", "Hooks", "Routing", "API integration"],
    source: {
      platform: "portfolio",
      url: "https://infyspringboard.onwingspan.com/web/en/app/toc/lex_auth_013009443190092817922301_shared/overview",
      verified: false,
      confidence: "user_provided",
      note:
        "MOOC course completed on Infosys Springboard (Cohort MOOC). Verification " +
        "link taken verbatim from the user's CSE121 CA2 academic submission. Course " +
        "covers building complete full-stack applications with React — components, " +
        "JSX, state and props, hooks, routing and UI logic — plus server-side " +
        "integration with APIs, backend services and databases. Certificate scan " +
        "provided by the user is attached as the badge asset.",
    },
  },
  {
        name: "CS105: Introduction to Python — Saylor Academy",
    issuer: "Saylor Academy",
    issueDate: null,
    expiryDate: null,
    credentialId: null,
    credentialUrl:
      "https://learn.saylor.org/mod/coursecertificate/view.php?id=59017",
        image: "/certificates/saylor-python-1.jpg",
    imageAlt:
      "CS105: Introduction to Python — Saylor Academy course completion certificate (page 1 of 2)",
    images: ["/certificates/saylor-python-2.jpg"],
    imageAlts: [
      "CS105: Introduction to Python — Saylor Academy course completion certificate (page 2 of 2)",
    ],
    verificationWorking: false,
    skills: ["Python", "Programming fundamentals", "Problem solving"],
    source: {
      platform: "portfolio",
      url: "https://learn.saylor.org/mod/coursecertificate/view.php?id=59017",
      verified: false,
      confidence: "user_provided",
      note:
        "Course completion certificate for Saylor Academy CS105: Introduction to " +
        "Python. Verification link taken verbatim from the user's CSE121 MOOC " +
        "academic submission (the page itself is login-walled). Certificate scan " +
        "attached by the user as the badge asset.",
    },
  },
    {
    name: "Productivity Time Management Mastery",
    issuer: "Mindluster",
    issueDate: null,
    expiryDate: null,
    credentialId: null,
    credentialUrl: "https://www.mindluster.com/profile#c_courses",
    image: "/certificates/mindluster-time-management.jpg",
    verificationWorking: true,
    skills: [],
    source: {
      ...userProvidedSource,
      note:
        "Non-technical MOOC course completed on Mindluster. Issue/expiry dates " +
        "and credential ID were not provided and remain unknown. A certificate " +
        "scan was provided by the user and is attached as the badge asset.",
    },
  },
];

export const certificationsMeta: CollectionNote = {
  available: true,
  confidence: "user_provided",
  note:
    "Certifications are user-provided. The Code-A-Haunt 3.0 entry carries its " +
    "QR-decoded GiveMyCertificate verification link and certificate scan; the " +
    "Infosys Springboard entry carries its official TOC link from the user's " +
    "CSE121 academic records (issuer page requires JavaScript/login, so it is " +
    "marked as not currently verifiable). Issue/expiry dates that were never " +
    "supplied remain intentionally empty rather than invented.",
  source: userProvidedSource,
};

