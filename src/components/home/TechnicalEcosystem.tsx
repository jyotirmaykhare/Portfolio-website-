import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Marquee from "react-fast-marquee";
import {
  BarChart3,
  Braces,
  Cloud,
  Code2,
  Database,
  Gamepad2,
  Globe,
  Server,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ecosystems } from "@/data/skills";
import { cn } from "@/lib/utils";

/**
 * Technical Ecosystem — a "stack console". A domain rail (tabs with roving
 * focus and arrow-key navigation) drives a terminal-style detail panel that
 * staggers in the matching technologies. The console auto-cycles until the
 * visitor takes over, and a marquee of every technology runs underneath.
 */

const domainIcons: LucideIcon[] = [
  Code2, // Frontend
  Server, // Backend & APIs
  Braces, // Languages
  Database, // Data & Storage
  Cloud, // Cloud & Infrastructure
  Globe, // Interactive & Browser APIs
  BarChart3, // Data visualization
  Wrench, // Testing & tooling
  Gamepad2, // Game development & IoT
];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const allTech = [...new Set(ecosystems.flatMap((e) => e.items))];
const CYCLE_MS = 4400;

export function TechnicalEcosystem() {
  const [active, setActive] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const reduced = useReducedMotion();
  const railRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const ecosystem = ecosystems[active];
  const DomainIcon = domainIcons[active % domainIcons.length];

  // Auto-cycle until the visitor shows intent; never on touch or reduced motion.
  useEffect(() => {
    if (engaged || reduced) return;
    if (window.matchMedia("(hover: none)").matches) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % ecosystems.length);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [engaged, reduced]);

  const select = (index: number) => {
    setActive(index);
    setEngaged(true);
  };

  const onRailKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (
      e.key !== "ArrowDown" &&
      e.key !== "ArrowRight" &&
      e.key !== "ArrowUp" &&
      e.key !== "ArrowLeft"
    ) {
      return;
    }
    e.preventDefault();
    const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1;
    const next = (active + dir + ecosystems.length) % ecosystems.length;
    select(next);
    railRefs.current[next]?.focus();
  };

  return (
    <section
      id="techEcosystem"
      className="section-band relative z-[2] pb-[clamp(4.5rem,9vw,8rem)]"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Technical Ecosystem"
            title={
              <>
                A stack organized <span className="text-gradient">by system</span>
              </>
            }
            description="Pick a domain to inspect what powers it — the frontend, the backend, the data, the cloud and the browser platform underneath it all. The console cycles on its own until you take over."
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div
            className="eco-console glass mt-16 grid rounded-2xl lg:grid-cols-[290px_minmax(0,1fr)]"
            onPointerEnter={() => setEngaged(true)}
            onPointerDownCapture={() => setEngaged(true)}
            onFocusCapture={() => setEngaged(true)}
          >
            {/* Domain rail — horizontal pills on mobile, sidebar on desktop */}
            <div
              role="tablist"
              aria-label="Technology domains"
              onKeyDown={onRailKeyDown}
              className="eco-rail relative flex gap-2 overflow-x-auto border-b border-[var(--border)] p-3 lg:flex-col lg:gap-1 lg:overflow-visible lg:border-b-0 lg:border-r lg:p-4"
            >
              <p
                className="hidden px-3.5 pb-2 pt-1 font-mono-tag text-[10px] uppercase tracking-[0.18em] text-[var(--text-faint)] lg:block"
                aria-hidden="true"
              >
                domains
              </p>
              {ecosystems.map((eco, i) => {
                const RailIcon = domainIcons[i % domainIcons.length];
                const isActive = active === i;
                return (
                  <button
                    key={eco.title}
                    ref={(el) => {
                      railRefs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`eco-tab-${i}`}
                    aria-selected={isActive}
                    aria-controls="eco-panel"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => select(i)}
                    onMouseEnter={() => select(i)}
                    className={cn(
                      "group relative flex shrink-0 items-center gap-3 rounded-xl px-3.5 py-3 text-left outline-none transition-colors duration-300 focus-visible:ring-1 focus-visible:ring-[var(--accent)] lg:w-full lg:shrink",
                      isActive
                        ? "eco-rail-item is-active bg-[color-mix(in_srgb,var(--accent)_8%,transparent)] text-[var(--text)]"
                        : "eco-rail-item text-[var(--text-muted)] hover:bg-white/[0.04] hover:text-[var(--text)]"
                    )}
                  >
                    {/* active indicator */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute left-0 top-1/2 h-6 w-[2px] -translate-y-1/2 rounded-full bg-[var(--accent)] transition-all duration-300",
                        isActive ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
                      )}
                    />
                    <span
                      className={cn(
                        "font-mono-tag text-[10px] tabular-nums transition-colors",
                        isActive ? "text-[var(--accent)]" : "text-[var(--text-faint)]"
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <RailIcon
                      aria-hidden="true"
                      className={cn(
                        "h-4 w-4 shrink-0 transition-colors",
                        isActive
                          ? "text-[var(--accent)]"
                          : "text-[var(--text-faint)] group-hover:text-[var(--text-muted)]"
                      )}
                    />
                    <span className="flex-1 whitespace-nowrap text-sm font-medium lg:truncate">
                      {eco.title}
                    </span>
                    <span
                      className={cn(
                        "font-mono-tag text-[10px] tabular-nums transition-colors",
                        isActive ? "text-[var(--text-muted)]" : "text-[var(--text-faint)]"
                      )}
                    >
                      {eco.items.length}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Detail panel */}
            <div
              id="eco-panel"
              role="tabpanel"
              aria-labelledby={`eco-tab-${active}`}
              className="flex min-h-[380px] flex-col lg:min-h-[420px]"
            >
              {/* terminal-style header */}
              <div className="flex items-center justify-between gap-4 border-b border-[var(--border)] px-5 py-3.5">
                <div className="flex items-center gap-2" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)] opacity-80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                </div>
                <p className="font-mono-tag text-[11px] text-[var(--text-faint)]">
                  ~/stack/{slugify(ecosystem.title)}.config
                </p>
                <p className="font-mono-tag text-[11px] tabular-nums text-[var(--text-faint)]">
                  {String(active + 1).padStart(2, "0")}/
                  {String(ecosystems.length).padStart(2, "0")}
                </p>
              </div>

              {/* domain body — crossfades between domains */}
              <div className="flex flex-1 items-start p-6 sm:p-8">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={ecosystem.title}
                    initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? { opacity: 1 } : { opacity: 0, y: -12 }}
                    transition={{ duration: reduced ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full"
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--border-strong)] bg-[rgba(34,211,238,0.06)]">
                        <DomainIcon aria-hidden="true" className="h-5 w-5 text-[var(--accent)]" />
                      </span>
                      <div>
                        <h3 className="font-display text-xl font-semibold text-[var(--text)]">
                          {ecosystem.title}
                        </h3>
                        <p className="mt-0.5 font-mono-tag text-[11px] uppercase tracking-[0.14em] text-[var(--text-faint)]">
                          {ecosystem.items.length} tools deployed
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--text-muted)]">
                      {ecosystem.blurb}
                    </p>

                    <ul className="mt-6 flex max-w-2xl flex-wrap gap-2">
                      {ecosystem.items.map((item, idx) => (
                        <motion.li
                          key={item}
                          initial={reduced ? false : { opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: reduced ? 0 : 0.35,
                            delay: reduced ? 0 : 0.1 + idx * 0.04,
                            ease: "easeOut",
                          }}
                        >
                          <span className="tag-pill">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* console footer */}
              <div className="flex items-center justify-between gap-4 border-t border-[var(--border)] px-5 py-3 font-mono-tag text-[10px] uppercase tracking-[0.14em] text-[var(--text-faint)]">
                <span>{engaged ? "manual control" : "auto-cycling — hover to take over"}</span>
                <span className="hidden sm:inline" aria-hidden="true">
                  ←→ / ↑↓ to browse
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Marquee — every technology, one continuous strip */}
        <Reveal delay={0.12}>
          <div className="mt-12">
            <p className="sr-only">Technologies: {allTech.join(", ")}</p>
            <div className="eco-marquee" aria-hidden="true">
              <Marquee pauseOnHover speed={38} gradient={false}>
                {allTech.map((tech) => (
                  <span key={tech} className="mx-4 flex items-center gap-4">
                    <span className="whitespace-nowrap font-mono-tag text-[12px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                      {tech}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-[var(--accent)] opacity-50" />
                  </span>
                ))}
              </Marquee>
            </div>

            <p className="mt-10 flex flex-wrap items-center gap-3 font-mono-tag text-[12px] uppercase tracking-wider text-[var(--text-faint)]">
              <span className="inline-block h-px w-10 bg-[var(--border-strong)]" aria-hidden />
              {allTech.length} technologies across {ecosystems.length} domains
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
