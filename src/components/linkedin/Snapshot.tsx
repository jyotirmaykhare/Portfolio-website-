import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ConfidenceDot } from "@/components/linkedin/shared";
import { collectionNotes, linkedinData, posts, linkedinProjects } from "@/data/linkedin";

/**
 * Professional Snapshot — VERIFIED/CONFIRMED metrics only.
 * Anything that could not be confirmed is simply absent (never a guess),
 * and each number carries its confidence tier.
 */
export function Snapshot() {
  const stats: Array<{
    label: string;
    value: string;
    hint?: string;
    confidence: "verified" | "publicly_discovered" | "derived" | "user_provided" | "unavailable";
  }> = [];

  const connections = linkedinData.profile.connections?.display ?? null;
  if (connections) {
    stats.push({
      label: "Connections",
      value: connections,
      hint: "LinkedIn caps display at 500+",
      confidence: "publicly_discovered",
    });
  }
  if (linkedinData.profile.followers) {
    stats.push({
      label: "Followers",
      value: linkedinData.profile.followers.value.toLocaleString("en-US"),
      hint: "Indexed snapshot — may be stale",
      confidence: "publicly_discovered",
    });
  }
  stats.push({
    label: "Posts archived",
    value: String(posts.length),
    hint: "Confirmed public shares",
    confidence: "publicly_discovered",
  });
  const confirmedProjects = linkedinProjects.filter((p) => p.linkedInConfirmed).length;
  if (confirmedProjects > 0) {
    stats.push({
      label: "Projects cross-linked",
      value: String(confirmedProjects),
      hint: "Via share hashtags / topics",
      confidence: "derived",
    });
  }

  return (
    <section className="section-band border-b border-[var(--border)]">
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
              <div key={s.label} className="glass card-lift rounded-2xl p-6">
                <p className="stat-label">{s.label}</p>
                <p className="stat-value mt-2">{s.value}</p>
                {s.hint && (
                  <p className="mt-3 font-mono-tag text-[11px] leading-snug text-[var(--text-faint)]">{s.hint}</p>
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
