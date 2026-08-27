import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { ConfidenceDot, NeedsInput } from "@/components/linkedin/shared";
import { LINKEDIN_PROFILE_URL, profile } from "@/data/linkedin";

/**
 * Hero — identity only. Every value traces back to the indexed public
 * profile; the photo is login-walled so we render an initials monogram
 * instead of a placeholder image that would look like real media.
 */
export function LinkedInHero() {
  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <header className="relative overflow-hidden border-b border-[var(--border)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-72"
        style={{
          background:
            "radial-gradient(60% 70% at 50% 0%, color-mix(in srgb, var(--accent) 9%, transparent), transparent 70%)",
        }}
      />
      <Container className="relative py-20 lg:py-28">
        <Reveal>
          <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-5">
              {profile.photoUrl ? (
                <img
                  src={profile.photoUrl}
                  alt={profile.name}
                  loading="lazy"
                  decoding="async"
                  className="h-20 w-20 rounded-full border border-[var(--border-strong)] object-cover"
                />
              ) : (
                <span
                  aria-label={`${profile.name} — profile photo unavailable`}
                  className="grid h-20 w-20 shrink-0 place-items-center rounded-full border border-[var(--border-strong)] bg-[var(--surface)] font-display text-2xl font-semibold text-[var(--text-muted)]"
                >
                  {initials}
                </span>
              )}
              <div>
                <p className="overline-label">LinkedIn archive</p>
                <h1 className="mt-3 font-display text-[clamp(2.2rem,5vw,3.6rem)] font-semibold leading-[1.02] tracking-tight text-[var(--text)]">
                  {profile.name}
                </h1>
                {profile.headline && (
                  <p className="mt-3 max-w-xl text-[length:var(--font-body-lg)] leading-relaxed text-[var(--text-muted)]">
                    {profile.headline}
                  </p>
                )}
                {profile.location && (
                  <p className="mt-4 inline-flex items-center gap-2 text-sm text-[var(--text-faint)]">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    {profile.location}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-3">
                <MagneticButton as="a" href={LINKEDIN_PROFILE_URL}>
                  View on LinkedIn <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </MagneticButton>
                {profile.ctas
                  .filter((c) => c.href.startsWith("mailto:"))
                  .map((cta) => (
                    <MagneticButton key={cta.href} as="a" href={cta.href} variant="secondary">
                      <Mail className="h-4 w-4" aria-hidden="true" /> Email
                    </MagneticButton>
                  ))}
              </div>
              {!profile.source.verified && (
                <div className="flex flex-wrap items-center gap-2">
                  <ConfidenceDot confidence={profile.source.confidence} label="Indexed snapshot" />
                  {!profile.photoUrl && <NeedsInput>Photo unavailable</NeedsInput>}
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </header>
  );
}
