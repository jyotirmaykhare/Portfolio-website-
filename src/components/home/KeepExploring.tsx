import { Link } from "react-router-dom";
import { ArrowRight, Award, Cpu, FolderGit2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const destinations = [
  {
    to: "/projects/tech",
    icon: FolderGit2,
    title: "Tech projects",
    text: "Real products with live demos and open-source code on GitHub.",
  },
  {
    to: "/projects/other",
    icon: Cpu,
    title: "Other projects",
    text: "Arduino & IoT builds, game development and hackathon work.",
  },
  {
    to: "/certifications",
    icon: Award,
    title: "Certifications",
    text: "Hackathon and MOOC certificates — image proof plus verify links.",
  },
] as const;

/**
 * Keep exploring — quick jumps to the rest of the site. Upgraded cards:
 * gradient border glow, shine sweep, icon badges and corner indices.
 */
export function KeepExploring() {
  return (
    <section className="section-pad section-band relative z-[2]">
      <Container>
        <Reveal>
          <p className="font-mono-tag text-[12px] uppercase tracking-wider text-[var(--text-faint)]">
            Keep exploring
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.25rem)] font-semibold leading-tight text-[var(--text)]">
            There&apos;s more <span className="text-gradient">behind the homepage</span>
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.to} delay={i * 0.06} className="h-full">
                <Link
                  to={item.to}
                  className="keep-card glass card-lift group flex h-full flex-col rounded-2xl p-6"
                >
                  <span className="keep-index font-mono-tag" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="keep-icon">
                    <Icon className="h-5 w-5 text-[var(--accent)]" aria-hidden />
                  </span>

                  <h3 className="mt-4 font-display text-lg font-semibold text-[var(--text)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-muted)]">
                    {item.text}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-1 text-[14px] font-medium text-[var(--accent)]">
                    Visit
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                      aria-hidden
                    />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
