import { LandingHero } from "@/character/LandingHero";
import { SelectedWork } from "@/components/home/SelectedWork";
import { TechnicalEcosystem } from "@/components/home/TechnicalEcosystem";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Cpu, FolderGit2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function HomePage() {
  return (
    <div className="home-canvas">
      {/* Full-page animated introduction */}
      <LandingHero />
      <SelectedWork />
      <TechnicalEcosystem />

      {/* Explore band — quick jumps to the rest of the site */}
      <section className="section-pad section-band">
        <Container>
          <Reveal>
            <p className="font-mono-tag text-[12px] uppercase tracking-wider text-[var(--text-faint)]">
              Keep exploring
            </p>
          </Reveal>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
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
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.to} delay={i * 0.06} className="h-full">
                  <Link
                    to={item.to}
                    className="glass card-lift group flex h-full flex-col rounded-2xl p-6 hover:border-[var(--border-strong)]"
                  >
                    <Icon className="h-5 w-5 text-[var(--accent)]" aria-hidden />
                    <h3 className="mt-4 font-display text-lg font-semibold text-[var(--text)]">
                      {item.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-muted)]">
                      {item.text}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1 text-[14px] font-medium text-[var(--accent)]">
                      Visit
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
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
    </div>
  );
}

