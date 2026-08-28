import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ConfidenceDot } from "@/components/linkedin/shared";
import { linkedinData } from "@/data/linkedin";

/** About — rendered as a LinkedIn-style card: a large quote-mark, the
 *  user-confirmed summary, and its provenance. Truncated bodies flag. */
export function AboutSection() {
  const p = linkedinData.profile;

  return (
    <section id="about" className="section-band border-b border-[var(--border)]">
      <Container className="max-w-4xl py-20">
        <Reveal>
          <div className="glass rounded-3xl p-8 sm:p-10">
            <div className="flex items-center justify-between gap-4">
              <p className="overline-label">About</p>
              <Quote
                className="h-6 w-6 text-[var(--accent)] opacity-60"
                aria-hidden="true"
              />
            </div>

            {p.summary ? (
              <>
                <p className="mt-6 text-[length:var(--font-body-lg)] leading-[1.75] text-[var(--text)]">
                  {p.summary}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-[var(--border)] pt-5">
                  <ConfidenceDot
                    confidence={p.summaryComplete ? "user_provided" : "publicly_discovered"}
                    label={
                      p.summaryComplete
                        ? "Confirmed against resume"
                        : "Indexed preview only — full body login-walled"
                    }
                  />
                  {p.location && (
                    <span className="font-mono-tag text-[11px] text-[var(--text-faint)]">
                      {p.location}
                    </span>
                  )}
                </div>
              </>
            ) : (
              <p className="mt-6 text-sm text-[var(--text-muted)]">
                About body could not be confirmed from public sources.
              </p>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

