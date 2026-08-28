import { useMemo, useState } from "react";
import type { CSSProperties, MouseEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  FlaskConical,
  Github,
  Search,
  X,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { useTilt } from "@/hooks/useTilt";
import { projects } from "@/data/projects";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";
import "@/styles/lab.css";

/**
 * Tech Projects — "Aurora Console". A searchable, filterable product index on
 * the site's dark canvas, upgraded with drifting accent auroras, a blueprint
 * hero grid, per-project accent-tinted glass cards, cursor spotlights,
 * 3D tilt and animated grid re-flow.
 */

const tech = projects.filter((p) => p.links.length > 0);
const categories = ["All", ...new Set(tech.map((p) => p.category))];
const liveCount = tech.filter((p) =>
  p.links.some((l) => l.label.toLowerCase().includes("live"))
).length;
const repoCount = tech.filter((p) =>
  p.links.some((l) => l.href.includes("github.com"))
).length;

export function TechProjectsPage() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const reduced = useReducedMotion();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tech.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (!q) return true;
      const haystack = [p.name, p.category, p.tagline, p.summary, ...p.stack]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [category, query]);

  return (
    <div className="lab-page-shell section-pad">
      {/* drifting aurora washes behind the canvas */}
      <div
        aria-hidden="true"
        className="lab-aurora pointer-events-none absolute -top-32 left-[4%] h-96 w-96 rounded-full bg-[#0066ff]/20 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="lab-aurora pointer-events-none absolute right-[2%] top-40 h-80 w-80 rounded-full bg-[#8b5cf6]/15 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[40%] top-[540px] h-72 w-72 rounded-full bg-[#e8a13d]/10 blur-[120px]"
      />

      <Container className="relative">
        {/* hero */}
        <Reveal>
          <p className="overline-label inline-flex items-center gap-2 text-[var(--accent)]">
            <FlaskConical className="h-4 w-4" aria-hidden="true" />
            Tech projects — product index
          </p>
          <h1 className="type-hero mt-6 max-w-4xl">
            Products that <span className="text-gradient">actually ship</span>
          </h1>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
            <p className="max-w-xl text-[length:var(--font-body-lg)] leading-[1.65] text-[var(--text-muted)]">
              Every product here is deployed and open-source. Search the index,
              filter by domain, then open the code, the live app or the full
              case study.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {[
                { label: "Products", value: tech.length },
                { label: "Live demos", value: liveCount },
                { label: "Open-source", value: repoCount },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] px-5 py-3"
                >
                  <p className="font-display text-2xl font-bold tabular-nums text-[var(--accent)]">
                    {stat.value}
                  </p>
                  <p className="font-mono-tag text-[10px] uppercase tracking-[0.14em] text-[var(--text-faint)]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* toolbar — category filters + search */}
        <Reveal delay={0.06}>
          <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by domain">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  aria-pressed={category === c}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-[13px] font-medium transition-colors",
                    category === c
                      ? "border-transparent bg-[var(--accent-fill)] text-white"
                      : "border-[var(--border-strong)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <label className="relative block flex-1 lg:w-72">
                <span className="sr-only">Search tech projects</span>
                <Search
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-faint)]"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products, stacks…"
                  className="w-full rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] py-2.5 pl-10 pr-9 text-sm text-[var(--text)] outline-none transition-colors placeholder:text-[var(--text-faint)] focus:border-[var(--accent)]"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-faint)] transition-colors hover:text-[var(--text)]"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </label>
              <span
                className="whitespace-nowrap font-mono-tag text-[11px] tabular-nums text-[var(--text-faint)]"
                aria-live="polite"
              >
                {filtered.length}/{tech.length}
              </span>
            </div>
          </div>
        </Reveal>

        {/* animated product grid */}
        <motion.ol
          layout
          className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => {
              const featured = i === 0 && category === "All" && !query;
              return (
              <motion.li
                key={project.slug}
                layout
                className={cn(featured && "sm:col-span-2")}
                initial={reduced ? false : { opacity: 0, scale: 0.94, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, scale: 0.94 }}
                transition={{ type: "spring", stiffness: 260, damping: 28 }}
              >
                <ProjectCard project={project} index={i} featured={featured} />
              </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ol>

        {/* empty state */}
        {filtered.length === 0 && (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--bg-elevated)] py-16 text-center"
          >
            <p className="font-display text-lg font-semibold text-[var(--text)]">
              No products match “{query}”
            </p>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Try a different keyword or clear the filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
              className="mt-6 rounded-full bg-[var(--accent-fill)] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-fill-hover)]"
            >
              Reset filters
            </button>
          </motion.div>
        )}

        {/* footer note */}
        <Reveal delay={0.1}>
          <p className="mt-12 font-mono-tag text-[12px] leading-relaxed text-[var(--text-faint)]">
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

/**
 * A single product card. Per-project accent theming via --card-accent,
 * cursor-tracked spotlight, ghost index numeral, metrics mini-grid, and a
 * stretched case-study link so the whole card is clickable.
 */
function ProjectCard({
  project,
  index,
  featured,
}: {
  project: Project;
  index: number;
  featured?: boolean;
}) {
  const tiltRef = useTilt({ max: featured ? 3 : 4 });
  const live = project.links.find((l) => l.label.toLowerCase().includes("live"));
  const repo = project.links.find((l) => l.href.includes("github.com"));

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    e.currentTarget.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <div
      ref={tiltRef}
      onMouseMove={onMove}
      style={{ "--card-accent": project.accent } as CSSProperties}
      className="lab-card group flex h-full flex-col rounded-2xl"
    >
      {/* stretched link — the entire card opens the case study */}
      <Link
        to={`/projects/${project.slug}`}
        className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-none"
        aria-label={`${project.name} — read the full case study`}
      />
      <div className="lab-spotlight" aria-hidden="true" />

      {/* accent top strip sweeps in on hover */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
        style={{
          background: `linear-gradient(90deg, ${project.accent}, color-mix(in srgb, ${project.accent} 35%, transparent))`,
        }}
      />

      <div className={cn("relative flex flex-1 flex-col", featured ? "p-8" : "p-6")}>
        <div className="flex items-start justify-between gap-4">
          <span className="lab-index text-5xl" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-right font-mono-tag text-[10px] uppercase tracking-[0.14em] text-[var(--text-faint)]">
            {project.category}
          </span>
        </div>

        <h2
          className={cn(
            "mt-4 font-display font-semibold tracking-tight text-[var(--text)]",
            featured ? "text-2xl" : "text-xl"
          )}
        >
          {project.name}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
          {featured ? project.summary : project.tagline}
        </p>

        {/* metrics mini-grid */}
        <div className="mt-5 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--border)]">
          {project.metrics.slice(0, featured ? 6 : 3).map((m) => (
            <div key={m.label} className="bg-white/[0.04] px-3 py-2.5">
              <p className="truncate font-display text-base font-bold text-[var(--text)]">{m.value}</p>
              <p className="truncate font-mono-tag text-[9px] uppercase tracking-[0.12em] text-[var(--text-faint)]">
                {m.label}
              </p>
            </div>
          ))}
          {project.metrics.length === 0 && (
            <div className="col-span-3 bg-white/[0.04] px-3 py-2.5">
              <p className="font-mono-tag text-[10px] uppercase tracking-[0.12em] text-[var(--text-faint)]">
                Full breakdown inside the case study
              </p>
            </div>
          )}
        </div>

        {/* stack pills */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, featured ? 10 : 4).map((t) => (
            <span
              key={t}
              className="rounded-md border border-[var(--border)] bg-white/[0.04] px-2 py-1 font-mono-tag text-[10px] uppercase tracking-[0.08em] text-[var(--text-muted)]"
            >
              {t}
            </span>
          ))}
          {project.stack.length > (featured ? 10 : 4) && (
            <span className="rounded-md px-1.5 py-1 font-mono-tag text-[10px] text-[var(--text-faint)]">
              +{project.stack.length - (featured ? 10 : 4)}
            </span>
          )}
        </div>

        {/* actions — pinned to the card bottom */}
        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)]">
            Case study
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </span>
          <span className="relative z-20 flex items-center gap-1.5">
            {repo && (
              <a
                href={repo.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--text-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
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
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-3 text-sm text-[var(--text-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                Live
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
