import { Briefcase, GraduationCap } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NeedsInput } from "@/components/linkedin/shared";
import { collectionNotes, education, experience } from "@/data/linkedin";

/** Shared timeline shell — vertical rail with node dots. */
function Rail({ children }: { children: React.ReactNode }) {
  return <ol className="relative ml-2 border-l border-[var(--border)] pl-8">{children}</ol>;
}

function Node({ icon: Icon, title, meta, children }: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  meta: string | null;
  children?: React.ReactNode;
}) {
  return (
    <li className="relative pb-10 last:pb-0">
      <span
        aria-hidden="true"
        className="absolute -left-[41px] top-1 grid h-5 w-5 place-items-center rounded-full border border-[var(--border-strong)] bg-[var(--bg-elevated)] text-[var(--accent)]"
      >
        <Icon className="h-3 w-3" />
      </span>
      <h3 className="font-display text-lg font-semibold text-[var(--text)]">{title}</h3>
      {meta && <p className="mt-1 font-mono-tag text-[12px] uppercase tracking-wider text-[var(--text-faint)]">{meta}</p>}
      {children}
    </li>
  );
}

/** Experience timeline — degrades to an explicit manual-input panel. */
export function ExperienceTimeline() {
  return (
    <section id="experience" className="section-band border-b border-[var(--border)]">
      <Container className="py-20">
        <Reveal>
          <SectionHeading eyebrow="Experience" title="Roles" />
        </Reveal>
        <div className="mt-10">
          {experience.length > 0 ? (
            <Reveal delay={0.06}>
              <Rail>
                {experience.map((e) => (
                  <Node key={e.title} icon={Briefcase} title={e.title} meta={e.employmentType}>
                    {e.company && <p className="mt-1 text-sm text-[var(--text-muted)]">{e.company}</p>}
                    {e.description && (
                      <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[var(--text-muted)]">
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
          <SectionHeading eyebrow="Education" title="Study" />
        </Reveal>
        <div className="mt-10">
          {education.length > 0 ? (
            <Reveal delay={0.06}>
              <Rail>
                {education.map((e) => {
                  const span =
                    e.startDate && e.endDate
                      ? `${e.startDate.slice(0, 4)} – ${e.endDate.slice(0, 4)}${e.current ? " (expected)" : ""}`
                      : null;
                  return (
                    <Node key={e.institution} icon={GraduationCap} title={e.institution} meta={span}>
                      {(e.degree || e.fieldOfStudy) && (
                        <p className="mt-1 text-sm text-[var(--text-muted)]">
                          {[e.degree, e.fieldOfStudy].filter(Boolean).join(" · ")}
                        </p>
                      )}
                    </Node>
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
