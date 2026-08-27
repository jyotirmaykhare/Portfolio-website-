import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ecosystems } from "@/data/skills";

/**
 * Technical Ecosystem — upgraded interactive cards: staggered chip reveal,
 * hover glow bar, per-domain counters. Pure CSS/motion, data-driven.
 */
export function TechnicalEcosystem() {
  return (
    <section className="section-band pb-[clamp(4.5rem,9vw,8rem)]">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Technical Ecosystem"
            title={
              <>
                A stack I reach for <span className="text-gradient">by system</span>
              </>
            }
            description="Grouped by the systems they serve rather than stars or percentages — the frontend, the backend, the data, the cloud and the browser platform underneath it all. Hover a domain to light it up."
          />
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ecosystems.map((ecosystem, i) => (
            <Reveal key={ecosystem.title} delay={(i % 3) * 0.07} className="h-full">
              <div className="glass card-lift group relative h-full overflow-hidden rounded-2xl p-6 transition-colors duration-300 hover:border-[var(--accent)]">
                {/* top accent bar — sweeps in on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-500 ease-out group-hover:scale-x-100"
                />
                {/* watermark index */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-2 -top-4 select-none font-display text-[5rem] font-bold leading-none text-[var(--surface)]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative flex items-start justify-between gap-3">
                  <h3 className="caption-label">{ecosystem.title}</h3>
                  <span className="rounded-full border border-[var(--border-strong)] px-2 py-0.5 font-mono-tag text-[10px] text-[var(--text-faint)] transition-colors group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
                    {ecosystem.items.length}
                  </span>
                </div>
                <p className="relative mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  {ecosystem.blurb}
                </p>

                {/* chips brighten & rise with a stagger on card hover */}
                <ul className="relative mt-5 flex flex-wrap gap-1.5">
                  {ecosystem.items.map((item, idx) => (
                    <li
                      key={item}
                      style={{ transitionDelay: `${idx * 25}ms` }}
                      className="tag-pill translate-y-1 opacity-50 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
