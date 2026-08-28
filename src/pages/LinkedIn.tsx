import type { CSSProperties } from "react";
import { LinkedInLogo } from "@/components/ui/BrandIcons";
import { SectionNav } from "@/components/linkedin/SectionNav";
import { LinkedInHero } from "@/components/linkedin/Hero";
import { Snapshot } from "@/components/linkedin/Snapshot";
import { AboutSection } from "@/components/linkedin/About";
import { ExperienceTimeline, EducationTimeline } from "@/components/linkedin/Timeline";
import { CertificationVault } from "@/components/linkedin/CertificationVault";
import { FeaturedPosts } from "@/components/linkedin/FeaturedPosts";
import { ActivityArchive } from "@/components/linkedin/ActivityArchive";
import { ProjectsPosts } from "@/components/linkedin/ProjectsPosts";
import { Explorers } from "@/components/linkedin/Explorers";
import { Analytics } from "@/components/linkedin/Analytics";
import { FollowCta } from "@/components/linkedin/FollowCta";

/**
 * /linkedin — Professional Archive.
 *
 * Structured like a real LinkedIn profile: brand banner → sticky section
 * nav (scroll-spy) → profile card hero → dashboard snapshot → About →
 * activity → experience/education → certifications → analytics → CTA.
 * Themed with a LinkedIn-blue accent scoped to this page via CSS-variable
 * overrides. Sections with no confirmed data degrade gracefully rather
 * than showing fake content.
 */
const LINKEDIN_THEME = {
  "--accent": "#4A9BE8",
  "--accent-strong": "#0A66C2",
  "--accent-fill": "#0A66C2",
  "--accent-fill-hover": "#004182",
  "--accent-soft": "rgba(10, 102, 194, 0.12)",
} as CSSProperties;

export function LinkedInPage() {
  return (
    <div style={LINKEDIN_THEME}>
      {/* Brand banner */}
      <div
        className="relative flex items-center justify-center gap-3 border-b border-white/10 py-2.5"
        style={{ background: "linear-gradient(90deg, #004182, #0A66C2 55%, #004182)" }}
      >
        <LinkedInLogo className="h-4 w-4 text-white/90" aria-hidden />
        <span className="font-mono-tag text-[11px] uppercase tracking-[0.18em] text-white/85">
          linkedin.com/in/jyotirmay-khare · Professional Archive
        </span>
        <LinkedInLogo className="h-4 w-4 text-white/60" aria-hidden />
      </div>

      {/* Sticky profile sub-nav — scroll-spies the sections below */}
      <SectionNav />

      <LinkedInHero />
      <Snapshot />
      <AboutSection />
      <ActivityArchive />
      <ExperienceTimeline />
      <EducationTimeline />
      <CertificationVault />
      <FeaturedPosts />
      <ProjectsPosts />
      <Explorers />
      <Analytics />
      <FollowCta />

      {/* Footer logo sign-off */}
      <div className="flex items-center justify-center gap-2 border-t border-[var(--border)] py-6">
        <LinkedInLogo className="h-4 w-4" style={{ color: "#0A66C2" } as CSSProperties} />
        <span className="font-mono-tag text-[11px] uppercase tracking-wider text-[var(--text-faint)]">
          Archived from the public LinkedIn profile
        </span>
      </div>
    </div>
  );
}

