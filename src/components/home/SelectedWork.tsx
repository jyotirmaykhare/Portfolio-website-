import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectVisual } from "@/components/home/ProjectVisual";
import { projects } from "@/data/projects";
import type { Project } from "@/types";

export function SelectedWork() {
  const reduced = useReducedMotion();

  return (
    <section id="work" className="section-pad section-band relative z-[2]">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Selected Work"
            title={
              <>
                Products I’ve built, <span className="text-gradient">end to end</span>
              </>
            }
            description="Seven projects across audio engineering, market intelligence, commerce, campus mapping, observability, education and game development — each with its own systems story."
          />
          <Link
            to="/projects"
            className="link-underline group hidden shrink-0 items-center gap-2 text-[15px] font-medium text-[var(--text)] hover:text-[var(--accent)] md:inline-flex"
          >
            All projects
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </Link>
        </div>

        <div className="mt-16 flex flex-col gap-20 lg:gap-28">
          {projects.map((project, i) => (
            <ProjectRow key={project.slug} project={project} index={i} reduced={Boolean(reduced)} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProjectRow({
  project,
  index,
  reduced,
}: {
  project: Project;
  index: number;
  reduced: boolean;
}) {
  const flipped = index % 2 === 1;
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 30 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
        flipped ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <Link to={`/projects/${project.slug}`} className="group block">
        <ProjectVisual project={project} className="transition-transform duration-500 group-hover:scale-[1.015]" />
      </Link>

      <div>
        <div className="flex items-center gap-3">
          <span className="font-mono-tag text-[13px]" style={{ color: project.accent }}>
            {num}
          </span>
          <span className="h-px w-8 bg-[var(--border-strong)]" aria-hidden />
          <span className="font-mono-tag text-[11px] uppercase tracking-wider text-[var(--text-faint)]">
            {project.category}
          </span>
        </div>
        <h3 className="mt-4 text-[1.5rem] font-semibold leading-[1.15] text-[var(--text)]">
          <Link to={`/projects/${project.slug}`} className="transition-colors hover:text-[var(--accent)]">
            {project.name}
          </Link>
        </h3>
        <p className="mt-3 max-w-lg text-[length:var(--font-body)] leading-[1.6] text-[var(--text-muted)]">
          {project.summary}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.slice(0, 5).map((tech) => (
            <span key={tech} className="tag-pill">
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-5">
          <Link
            to={`/projects/${project.slug}`}
            className="link-underline group inline-flex items-center gap-2 text-[15px] font-medium text-[var(--text)]"
          >
            Case study
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
