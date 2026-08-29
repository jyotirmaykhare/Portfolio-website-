import { Link } from "react-router-dom";
import { ArrowRight, Cpu, FolderGit2, Trophy } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Seo } from "@/components/Seo";

/**
 * /projects — overview hub. The detailed listings live on their own pages
 * (/projects/tech and /projects/other); this page summarizes both routes
 * in a deliberately different, compact style.
 */
export function ProjectsPage() {
  return (
    <div className="section-pad section-band">
      <Seo
        title="Projects — Jyotirmay Khare | Full Stack Developer Portfolio"
        description="Browse the project portfolio of Jyotirmay Khare — deployed software products, hardware builds, game development and hackathon projects with live demos and open-source code."
        path="/projects"
      />
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Projects"
            title={
              <>
                Two worlds, <span className="text-gradient">one builder</span>
              </>
            }
            description="Software products you can open and use — plus hardware, games and hackathon builds that live outside a repo."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal className="h-full">
            <Link
              to="/projects/tech"
              className="card-lift group flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-8 transition-colors hover:border-[var(--accent)]"
            >
              <FolderGit2 className="h-7 w-7 text-[var(--accent)]" aria-hidden />
              <h2 className="mt-6 font-display text-2xl font-semibold text-[var(--text)]">
                Tech Projects
              </h2>
              <p className="mt-1 font-mono-tag text-[11px] uppercase tracking-wider text-[var(--text-faint)]">
                6 products · live & open-source
              </p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--text-muted)]">
                Streaming platforms, market terminals, price intelligence, campus
                mapping, observability dashboards and an offline learning platform —
                each one deployed and browsable on GitHub.
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium text-[var(--accent)]">
                Browse tech projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          </Reveal>

          <Reveal delay={0.06} className="h-full">
            <Link
              to="/projects/other"
              className="card-lift group flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-8 transition-colors hover:border-[var(--accent)]"
            >
              <Cpu className="h-7 w-7 text-[var(--accent)]" aria-hidden />
              <h2 className="mt-6 font-display text-2xl font-semibold text-[var(--text)]">
                Other Projects
              </h2>
              <p className="mt-1 font-mono-tag text-[11px] uppercase tracking-wider text-[var(--text-faint)]">
                IoT · game dev · hackathons
              </p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--text-muted)]">
                Arduino sensor builds with measured LED circuit data, gameplay
                programming in Godot, and hackathon teams — including Code-A-Haunt 3.0,
                where I led development of LPU Campus Navigator.
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium text-[var(--accent)]">
                Browse other projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <Link
            to="/certifications"
            className="group mt-6 flex items-center justify-between rounded-2xl border border-dashed border-[var(--border-strong)] px-7 py-5 transition-colors hover:border-[var(--accent)]"
          >
            <span className="inline-flex items-center gap-3 font-display text-base font-semibold text-[var(--text)]">
              <Trophy className="h-5 w-5 text-[var(--accent)]" aria-hidden />
              Certifications & hackathon proof
            </span>
            <ArrowRight
              className="h-5 w-5 text-[var(--text-faint)] transition-all group-hover:translate-x-1 group-hover:text-[var(--accent)]"
              aria-hidden
            />
          </Link>
        </Reveal>
      </Container>
    </div>
  );
}

