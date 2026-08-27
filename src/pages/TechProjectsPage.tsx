import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, Github } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { projects } from "@/data/projects";

/**
 * Tech Projects — real, publicly hosted products with live demos and open
 * GitHub repositories. Presented as an editorial numbered index (a different
 * visual language than the overview grid or the "other projects" feature
 * blocks).
 */
export function TechProjectsPage() {
  const tech = projects.filter((p) =>
    p.links.some((l) => l.href.includes("github.com"))
  );

  return (
    <div className="section-pad section-band">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Tech projects"
            title={
              <>
                Real products,{" "}
                <span className="text-gradient">live on GitHub</span>
              </>
            }
            description={`${tech.length} shipped products — every one deployed and open-source. Browse the code, visit the live app, or read the full case study.`}
          />
        </Reveal>

        {/* Editorial index rows */}
        <ol className="mt-14 divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {tech.map((project, i) => {
            const live = project.links.find((l) => l.label.toLowerCase().includes("live"));
            const repo = project.links.find((l) => l.href.includes("github.com"));
            return (
              <Reveal key={project.slug} delay={i * 0.05}>
                <li className="group relative">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="grid grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-3 px-2 py-7 transition-colors hover:bg-[var(--surface)] sm:grid-cols-[3.5rem_1fr_auto] sm:gap-x-8 sm:px-4"
                  >
                    <span
                      className="font-mono-tag text-sm text-[var(--text-faint)] transition-colors group-hover:text-[var(--accent)]"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <span className="min-w-0">
                      <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span
                          className="inline-block h-2 w-2 shrink-0 rounded-full"
                          style={{ background: project.accent }}
                          aria-hidden="true"
                        />
                        <span className="font-display text-lg font-semibold tracking-tight text-[var(--text)] sm:text-xl">
                          {project.name}
                        </span>
                        <span className="font-mono-tag text-[11px] uppercase tracking-wider text-[var(--text-faint)]">
                          {project.category}
                        </span>
                      </span>
                      <span className="mt-1.5 block truncate text-sm text-[var(--text-muted)] sm:whitespace-normal">
                        {project.tagline}
                      </span>
                      <span className="mt-2 flex flex-wrap gap-1.5">
                        {project.stack.slice(0, 4).map((techItem) => (
                          <span key={techItem} className="tag-pill">
                            {techItem}
                          </span>
                        ))}
                      </span>
                    </span>

                    <span className="flex items-center gap-1.5">
                      {repo && (
                        <a
                          href={repo.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--border-strong)] text-[var(--text-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                          aria-label={`${project.name} on GitHub`}
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                      {live && (
                        <a
                          href={live.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--border-strong)] text-[var(--text-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                          aria-label={`${project.name} live demo`}
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                      <ArrowRight
                        className="h-5 w-5 text-[var(--text-faint)] transition-all group-hover:translate-x-1 group-hover:text-[var(--accent)]"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </li>
              </Reveal>
            );
          })}
        </ol>

        <Reveal delay={0.1}>
          <p className="mt-10 font-mono-tag text-[12px] leading-relaxed text-[var(--text-faint)]">
            Looking for hardware, game and hackathon work instead?{" "}
            <Link to="/projects/other" className="text-[var(--accent)] hover:underline">
              See other projects
            </Link>
            .
          </p>
        </Reveal>
      </Container>
    </div>
  );
}
