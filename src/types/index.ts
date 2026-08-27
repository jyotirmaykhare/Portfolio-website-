export interface ProjectLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface Metric {
  label: string;
  value: string;
}

export interface FeatureGroup {
  title: string;
  items: string[];
}

export interface TechGroup {
  title: string;
  items: string[];
}

export interface FlowStep {
  label: string;
  detail?: string;
}

export interface Chapter {
  numeral: string;
  title: string;
  detail?: string;
}

export interface Project {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  summary: string;
  accent: string;
  index: number;
  links: ProjectLink[];
  /** Verified headline metrics only */
  metrics: Metric[];
  /** Overview paragraphs */
  intro: string[];
  chapters?: Chapter[];
  featureGroups: FeatureGroup[];
  techGroups: TechGroup[];
  flow: FlowStep[];
  challenges: string[];
  stack: string[];
    /** Automata — statements that must be phrased carefully. Rendered only when present. */
  accuracyNotes: string[];
}

export * from "./linkedin";
