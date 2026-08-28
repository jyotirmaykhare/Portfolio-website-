import { ArrowUpRight, BadgeCheck, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ConfidenceDot, NeedsInput } from "@/components/linkedin/shared";
import { LINKEDIN_PROFILE_URL, profile } from "@/data/linkedin";

/**
 * Hero — rendered as a real LinkedIn-style profile card: cover banner,
 * overlapping monogram avatar, identity block, network stats and pill CTAs.
 * Every value traces to the verified data layer; the login-walled photo is
 * represented by an initials monogram, never a fake image.
 */
export function LinkedInHero() {
  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
  const emailCta = profile.ctas.find((c) => c.href.startsWith("mailto:"));
  const callCta = profile.ctas.find((c) => c.href.startsWith("tel:"));

  return (
    <section className="relative">
      <Container className="relative py-10 lg:py-14">
        <Reveal>
          <article className="mx-auto max-w-[860px] overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] shadow-[var(--shadow-2)]">
            {/* cover banner */}
            <div
              className="relative h-32 sm:h-44"
              style={{
                background:
                  "linear-gradient(120deg, #0A66C2 0%, #004182 55%, #032a52 100%)",
              }}
            >
              <div
                aria-hidden="true"
                className="absolute -right-16 -top-20 h-64 w-64 rounded-full border border-white/10"
              />
              <div
                aria-hidden="true"
                className="absolute -right-6 top-6 h-40 w-40 rounded-full border border-white/10"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(60% 90% at 20% 0%, rgba(255,255,255,0.14), transparent 65%)",
                }}
              />
              <span className="absolute bottom-3 right-4 font-mono-tag text-[10px] uppercase tracking-[0.2em] text-white/50">
                linkedin.com/in/jyotirmay-khare
              </span>
            </div>

            {/* identity */}
            <div className="relative px-6 pb-7 sm:px-9">
              {!profile.photoUrl ? (
                <span
                  aria-label={`${profile.name} — profile photo unavailable (login-walled)`}
                  className="-mt-12 grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-[#0A66C2] to-[#004182] font-display text-3xl font-bold text-white ring-4 ring-[var(--bg-elevated)]"
                >
                  {initials}
                </span>
              ) : (
                <img
                  src={profile.photoUrl}
                  alt={profile.name}
                  loading="lazy"
                  decoding="async"
                  className="-mt-12 h-24 w-24 rounded-full object-cover ring-4 ring-[var(--bg-elevated)]"
                />
              )}

              <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                  <h1 className="flex flex-wrap items-center gap-x-3 gap-y-2 font-display text-[clamp(1.7rem,4vw,2.4rem)] font-semibold leading-tight tracking-tight text-[var(--text)]">
                    {profile.name}
                    <BadgeCheck
                      className="h-6 w-6 shrink-0 text-[var(--accent)]"
                      aria-label="Identity facts user-confirmed"
                    />
                  </h1>
                  {profile.headline && (
                    <p className="mt-1.5 max-w-xl text-[15px] leading-relaxed text-[var(--text)]">
                      {profile.headline}
                    </p>
                  )}
                  {profile.location && (
                    <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)]">
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                      {profile.location}
                    </p>
                  )}

                  <p className="mt-3 text-sm">
                    {profile.connections && (
                      <span className="font-semibold text-[var(--accent)]">
                        {profile.connections.display}{" "}
                        <span className="font-normal text-[var(--text-muted)]">connections</span>
                      </span>
                    )}
                    {profile.connections && profile.followers && (
                      <span className="mx-2 text-[var(--border-strong)]">·</span>
                    )}
                    {profile.followers && (
                      <span
                        className="text-[var(--text-muted)]"
                        title="Indexed snapshot — may be stale"
                      >
                        <span className="font-semibold text-[var(--text)]">
                          {profile.followers.value.toLocaleString("en-US")}
                        </span>{" "}
                        followers
                      </span>
                    )}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <ConfidenceDot
                      confidence={profile.source.confidence}
                      label="Identity facts user-confirmed"
                    />
                    <NeedsInput>Photo login-walled</NeedsInput>
                  </div>
                </div>

                <div className="flex shrink-0 flex-wrap items-center gap-2.5">
                  <a
                    href={LINKEDIN_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-fill)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-fill-hover)]"
                  >
                    View on LinkedIn
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  {emailCta && (
                    <a
                      href={emailCta.href}
                      className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent)] transition-colors hover:bg-[var(--accent-soft)]"
                    >
                      <Mail className="h-4 w-4" aria-hidden="true" /> Email
                    </a>
                  )}
                  {callCta && (
                    <a
                      href={callCta.href}
                      aria-label="Call"
                      className="grid h-10 w-10 place-items-center rounded-full border border-[var(--border-strong)] text-[var(--text-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    >
                      <Phone className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        </Reveal>
      </Container>
    </section>
  );
}
