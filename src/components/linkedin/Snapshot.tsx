import { Eye, Link2, Sparkles, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ConfidenceDot } from "@/components/linkedin/shared";
import { collectionNotes, linkedinData, posts, linkedinProjects } from "@/data/linkedin";

type Confidence = "verified" | "publicly_discovered" | "derived" | "user_provided" | "unavailable";
interface Stat {
  label: string;
  value: string;
  hint?: string;
  confidence: Confidence;
  icon: React.ComponentType<{ className?: string }>;
}

/**
 * Professional Snapshot — VERIFIED metrics only, framed like LinkedIn's
 * creator dashboard. Anything unconfirmed is intentionally absent.
 */
export function Snapshot() {
  const stats: Stat[] = [];

  const connections = linkedinData.profile.connections?.display ?? null;
  if (connections) {
    stats.push({
      label: "Connections",
      value: connections,
      hint: "LinkedIn caps display at 500+",
      confidence: "publicly_discovered",
      icon: Users,
    });
  }
  if (linkedinData.profile.followers) {
    stats.push({
      label: "Followers",
      value: linkedinData.profile.followers.value.toLocaleString("en-US"),
      hint: "Indexed snapshot — may be stale",
      confidence: "publicly_discovered",
      icon: Eye,
    });
  }
  stats.push({
    label: "Posts archived",
    value: String(posts.length),
    hint: "Confirmed public shares",
    confidence: "publicly_discovered",
    icon: Sparkles,
  });
  const confirmedProjects = linkedinProjects.filter((p) => p.linkedInConfirmed).length;
  if (confirmedProjects > 0) {
    stats.push({
      label: "Projects cross-linked",
      value: String(confirmedProjects),
      hint: "Via share hashtags / topics",
      confidence: "derived",
      icon: Link2,
    });
  }

  return (
    <section id="snapshot" className="section-band border-b border-[var(--border)]">
      <Container className="py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Professional snapshot"
            title={
              <>
                Confirmed numbers <span className="text-gradient">only</span>
              </>
            }
            description="Metrics are shown only where a real source exists. Anything unconfirmed is intentionally omitted rather than estimated."
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="glass card-lift group relative overflow-hidden rounded-2xl p-6"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[var(--accent)] opacity-[0.07] blur-2xl transition-opacity group-hover:opacity-[0.16]"
                />
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--accent-soft)]">
                  <s.icon className="h-5 w-5 text-[var(--accent)]" aria-hidden="true" />
                </span>
                <p className="stat-value mt-4">{s.value}</p>
                <p className="stat-label mt-1">{s.label}</p>
                {s.hint && (
                  <p className="mt-2 font-mono-tag text-[11px] leading-snug text-[var(--text-faint)]">
                    {s.hint}
                  </p>
                )}
                <div className="mt-3">
                  <ConfidenceDot confidence={s.confidence} />
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {!collectionNotes.experience.available && (
          <Reveal delay={0.12}>
            <p className="mt-8 font-mono-tag text-[11px] leading-relaxed text-[var(--text-faint)]">
              Experience roles &amp; certifications: {collectionNotes.experience.note}
            </p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
