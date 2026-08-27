import { LinkedInLogo } from "@/components/ui/BrandIcons";
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
 * Themed differently from the rest of the site: a LinkedIn-blue accent is
 * scoped to this page via CSS-variable overrides, with the official LinkedIn
 * wordmark in the banner. Sections with no confirmed data (organizations,
 * people) degrade gracefully rather than showing fake content.
 */
const LINKEDIN_THEME = {
  "--accent": "#0A66C2",
  "--accent-fill": "#0A66C2",
  "--accent-fill-hover": "#004182",
} as React.CSSProperties;

export function LinkedInPage() {
  return (
    <div style={LINKEDIN_THEME}>
      {/* Brand banner */}
      <div
        className="flex items-center justify-center gap-3 border-b border-[var(--border)] py-3"
        style={{ background: "linear-gradient(90deg, #0A66C2, #004182)" }}
      >
        <LinkedInLogo className="h-5 w-5 text-white" />
        <span className="font-mono-tag text-[12px] uppercase tracking-[0.18em] text-white/90">
          linkedin.com/in/jyotirmay-khare · Professional Archive
        </span>
        <LinkedInLogo className="h-5 w-5 text-white/70" aria-hidden />
      </div>

      <LinkedInHero />
      <Snapshot />
      <AboutSection />
      <ExperienceTimeline />
      <EducationTimeline />
      <CertificationVault />
      <FeaturedPosts />
      <ActivityArchive />
      <ProjectsPosts />
      <Explorers />
      <Analytics />
      <FollowCta />

      {/* Footer logo sign-off */}
      <div className="flex items-center justify-center gap-2 border-t border-[var(--border)] py-6">
        <LinkedInLogo className="h-4 w-4" style={{ color: "#0A66C2" } as React.CSSProperties} />
        <span className="font-mono-tag text-[11px] uppercase tracking-wider text-[var(--text-faint)]">
          Archived from the public LinkedIn profile
        </span>
      </div>
    </div>
  );
}
