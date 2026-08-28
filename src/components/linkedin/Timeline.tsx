import { Briefcase, GraduationCap } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ConfidenceDot, NeedsInput } from "@/components/linkedin/shared";
import { collectionNotes, education, experience } from "@/data/linkedin";

/** Shared timeline shell — vertical rail with node dots. */
function Rail({ children }: { children: React.ReactNode }) {
  return <ol className="relative ml-2 border-l border-[var(--border)] pl-8">{children}</ol>;
}

function Node({ icon: Icon, title, meta, badge, children }: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  meta: string | null;
  badge?: string | null;
  children?: React.ReactNode;
}) {
  return (
    <li className="group relative pb-8 last:pb-0">
      <span
        aria-hidden="true"
        className="absolute -left-[41px] top-1 grid h-5 w-5 place-items-center rounded-full border border-[var(--border-strong)] bg-[var(--bg-elevated)] text-[var(--accent)] transition-colors group-hover:border-[var(--accent)]"
      >
        <Icon className="h-3 w-3" />
      </span>
      <div className="card-lift rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6 transition-colors group-hover:border-[var(--accent)]">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold text-[var(--text)]">{title}</h3>
          {badge && (
            <span className="inline-flex shrink-0 items-center rounded-full bg-[var(--accent-soft)] px-3 py-1 font-mono-tag text-[10px] uppercase tracking-[0.12em] text-[var(--accent)]">
              {badge}
            </span>
          )}
        </div>
        {meta && (
          <p className="mt-1.5 font-mono-tag text-[12px] uppercase tracking-wider text-[var(--text-faint)]">
            {meta}
          </p>
        )}
        {children}
      </div>
    </li>
  );
}

/** Experience timeline — degrades to an explicit manual-input panel. */
export function ExperienceTimeline() {
  return (
    <section id="experience" className="section-band border-b border-[var(--border)]">
      <Container className="py-20">
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <h2 className="type-h3 text-[var(--text)]">Experience</h2>
            <span className="font-mono-tag text-[11px] uppercase tracking-wider text-[var(--text-faint)]">
              {experience.length} role{experience.length === 1 ? "" : "s"} on record
            </span>
          </div>
        </Reveal>
        <div className="mt-10">
          {experience.length > 0 ? (
            <Reveal delay={0.06}>
              <Rail>
                {experience.map((e) => (
                  <Node
                    key={e.title}
                    icon={Briefcase}
                    title={e.title}
                    meta={e.employmentType}
                    badge={e.company}
                  >
                    {e.description && (
                      <p className="mt-3 text-[15px] leading-relaxed text-[var(--text-muted)]">
                        {e.description}
                      </p>
                    )}
                  </Node>
                ))}
              </Rail>
            </Reveal>
          ) : (
            <Reveal delay={0.06}>
              <NeedsInput>Experience unavailable</NeedsInput>
              <p className="mt-4 max-w-2xl font-mono-tag text-[11px] leading-relaxed text-[var(--text-faint)]">
                {collectionNotes.experience.note}
              </p>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}

/** Education timeline — renders only confirmed fields; nulls are omitted,
 *  and a single note lists what could not be confirmed. */
export function EducationTimeline() {
  return (
    <section id="education" className="section-band border-b border-[var(--border)]">
      <Container className="py-20">
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <h2 className="type-h3 text-[var(--text)]">Education</h2>
            <ConfidenceDot confidence="user_provided" label="Resume-confirmed" />
          </div>
        </Reveal>
        <div className="mt-10">
          {education.length > 0 ? (
            <Reveal delay={0.06}>
              <Rail>
                {education.map((e) => {
                  const span =
                    e.startDate && e.endDate
                      ? `${e.startDate.slice(0, 4)} – ${e.endDate.slice(0, 4)}`
                      : null;
                  return (
                    <Node
                      key={e.institution}
                      icon={GraduationCap}
                      title={e.institution}
                      meta={[e.degree, e.fieldOfStudy].filter(Boolean).join(" · ") || null}
                      badge={span ? `${span}${e.current ? " · current" : ""}` : null}
                    />
                  );
                })}
              </Rail>
            </Reveal>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

