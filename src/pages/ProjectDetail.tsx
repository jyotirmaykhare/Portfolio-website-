import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, ChevronRight, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectVisual } from "@/components/home/ProjectVisual";
import { getProject, projects } from "@/data/projects";
import { site } from "@/data/site";
import type { Project } from "@/types";
import { Seo } from "@/components/Seo";

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProject(slug) : undefined;
  const isTech = project?.links.some((l) => l.href.includes("github.com")) ?? true;
  const backTo = isTech ? "/projects/tech" : "/projects/other";
  const backLabel = isTech ? "Tech projects" : "Other projects";

  if (!project) {
    return (
      <div className="section-pad">
        <Seo
          title="Project not found | Jyotirmay Khare"
          description="The project you're looking for doesn't exist or has moved. Explore the full project portfolio instead."
          path={`/projects${slug ? `/${slug}` : ""}`}
        />
        <Container className="max-w-xl">
          <h1 className="font-display text-3xl font-semibold text-[var(--text)]">Project not found</h1>
          <p className="mt-4 text-[var(--text-muted)]">
            The project you're looking for doesn't exist or has moved.
          </p>
          <div className="mt-8">
            <Button as="link" to="/projects">
              Back to projects
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <article>
      <Seo
        title={`${project.name} — ${project.category} | Jyotirmay Khare`}
        description={`${project.category}. ${project.summary}`}
        path={`/projects/${project.slug}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
            {
              "@type": "ListItem",
              position: 2,
              name: isTech ? "Tech projects" : "Other projects",
              item: `${site.url}${backTo}`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: project.name,
              item: `${site.url}/projects/${project.slug}`,
            },
          ],
        }}
      />
      <Hero project={project} backTo={backTo} backLabel={backLabel} />
      <Visual project={project} />
      <Body project={project} backTo={backTo} backLabel={backLabel} />
    </article>
  );
}

function Hero({ project, backTo, backLabel }: { project: Project; backTo: string; backLabel: string }) {
  return (
    <header className="border-b border-[var(--border)]">
      <Container className="py-24 lg:py-32">
        <nav className="flex items-center gap-2 font-mono-tag text-[12px] text-[var(--text-faint)]" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-[var(--text)]">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden />
          <Link to={backTo} className="hover:text-[var(--text)]">{backLabel}</Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden />
          <span className="text-[var(--text-muted)]">{project.name}</span>
        </nav>

        <Reveal>
        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: project.accent }} aria-hidden="true" />
              <span className="font-mono-tag text-[12px] uppercase tracking-wider text-[var(--text-faint)]">{project.category}</span>
            </div>
            <h1 className="mt-5 font-display text-[clamp(2.6rem,6vw,4.8rem)] font-semibold leading-[1.02] text-[var(--text)]">
              {project.name}
            </h1>
            <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-[var(--text-muted)]">{project.summary}</p>
          </div>

          <div className="flex flex-col gap-6">
            {project.links.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {project.links.map((link) => (
                  <Button key={link.label} as="a" href={link.href} variant={link.label === "Live demo" ? "primary" : "secondary"}>
                    {link.label}
                  </Button>
                ))}
              </div>
            )}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {project.metrics.map((m) => (
                <div key={m.label} className="glass rounded-xl p-4">
                  <p className="font-display text-2xl font-semibold" style={{ color: project.accent }}>{m.value}</p>
                  <p className="mt-1 font-mono-tag text-[10px] uppercase tracking-wider text-[var(--text-faint)]">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        </Reveal>
      </Container>
    </header>
  );
}

function Visual({ project }: { project: Project }) {
  return (
    <div className="container-page py-16">
      <Reveal>
        <ProjectVisual project={project} className="mx-auto max-w-4xl" />
      </Reveal>
    </div>
  );
}

function Body({ project, backTo, backLabel }: { project: Project; backTo: string; backLabel: string }) {
  return (
    <div className="pb-24">
      <Container className="grid gap-14 lg:grid-cols-[1fr_280px]">
        <Reveal>
        <div className="space-y-14">
          {/* Overview */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-[var(--text)]">Overview</h2>
            <div className="mt-5 space-y-5 text-[16px] leading-relaxed text-[var(--text-muted)]">
              {project.intro.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          {/* System flow */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-[var(--text)]">System flow</h2>
            <ol className="mt-6 flex flex-col gap-3">
              {project.flow.map((step, i) => (
                <li key={i} className="flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-5 py-4">
                  <span
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-lg font-mono-tag text-[12px] font-medium"
                    style={{ background: `color-mix(in srgb, ${project.accent} 15%, transparent)`, color: project.accent }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-display text-[15px] font-semibold text-[var(--text)]">{step.label}</p>
                    {step.detail && <p className="font-mono-tag text-[12px] text-[var(--text-faint)]">{step.detail}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Features */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-[var(--text)]">Features</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {project.featureGroups.map((group) => (
                <div key={group.title} className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6">
                  <h3 className="font-display text-[15px] font-semibold text-[var(--text)]">{group.title}</h3>
                  <ul className="mt-4 space-y-2.5">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[14px] leading-snug text-[var(--text-muted)]">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: project.accent }} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Challenges */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-[var(--text)]">Engineering challenges</h2>
            <ul className="mt-6 space-y-3">
              {project.challenges.map((c, i) => (
                <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed text-[var(--text-muted)]">
                  <span className="mt-1 font-mono-tag text-[13px]" style={{ color: project.accent }}>{String(i + 1).padStart(2, "0")}</span>
                  {c}
                </li>
              ))}
            </ul>
          </section>

          {/* Accuracy notes */}
          {project.accuracyNotes.length > 0 && (
            <section className="rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] p-6">
              <h2 className="font-mono-tag text-[12px] uppercase tracking-wider text-[var(--text-faint)]">Scope & accuracy</h2>
              <ul className="mt-4 space-y-2 text-[14px] leading-relaxed text-[var(--text-muted)]">
                {project.accuracyNotes.map((note, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span aria-hidden="true">·</span>
                    {note}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
        </Reveal>

        <Sidebar project={project} backTo={backTo} backLabel={backLabel} />
      </Container>
    </div>
  );
}

function Sidebar({ project, backTo, backLabel }: { project: Project; backTo: string; backLabel: string }) {
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <div className="mb-8">
        <Button as="link" to={backTo} variant="ghost" className="pl-0">
          <ArrowLeft className="h-4 w-4" aria-hidden /> {backLabel}
        </Button>
      </div>

      {project.links.length > 0 && (
        <>
          <h3 className="overline-label mb-4">Links</h3>
          <div className="flex flex-col gap-3">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3 text-[14px] font-medium text-[var(--text)] transition-colors hover:border-[var(--border-strong)]"
              >
                {link.label}
                <ArrowUpRight className="h-4 w-4 text-[var(--text-muted)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </a>
            ))}
          </div>
        </>
      )}

      <h3 className="overline-label mb-4 mt-9">Stack</h3>
      <div className="flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span key={tech} className="tag-pill">
            {tech}
          </span>
        ))}
      </div>

      <h3 className="overline-label mb-4 mt-9">Next project</h3>
      <NextProject currentSlug={project.slug} />
    </aside>
  );
}

function NextProject({ currentSlug }: { currentSlug: string }) {
  const idx = projects.findIndex((p) => p.slug === currentSlug);
  if (idx === -1) return null;
  const next = projects[(idx + 1) % projects.length];
  return (
    <Link
      to={`/projects/${next.slug}`}
      className="group block rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-5 transition-colors hover:border-[var(--border-strong)]"
    >
      <p className="font-mono-tag text-[11px] text-[var(--text-faint)]">Up next</p>
      <p className="mt-1 inline-flex items-center gap-1 font-display text-lg font-semibold text-[var(--text)] group-hover:text-[var(--accent)]">
        {next.name} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
      </p>
      <p className="mt-1 text-[13px] text-[var(--text-muted)]">{next.category}</p>
    </Link>
  );
}

