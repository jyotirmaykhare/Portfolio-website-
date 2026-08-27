import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NeedsInput } from "@/components/linkedin/shared";
import { linkedinData } from "@/data/linkedin";

/** About — renders the indexed preview only; flags that the body is truncated. */
export function AboutSection() {
  const p = linkedinData.profile;

  return (
    <section id="about" className="section-band border-b border-[var(--border)]">
      <Container className="max-w-4xl py-20">
        <Reveal>
          <SectionHeading
            eyebrow="About"
            title={
              <>
                From the public <span className="text-gradient">profile</span>
              </>
            }
          />
        </Reveal>

        <Reveal delay={0.08}>
          {p.summary ? (
            <>
              <p className="mt-8 text-[length:var(--font-body-lg)] leading-[1.7] text-[var(--text)]">
                {p.summary}
              </p>
              {!p.summaryComplete && (
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <NeedsInput>Full About body is login-walled</NeedsInput>
                  <p className="font-mono-tag text-[11px] text-[var(--text-faint)]">
                    Only the indexed preview above could be confirmed.
                  </p>
                </div>
              )}
            </>
          ) : (
            <NeedsInput>About unavailable</NeedsInput>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
