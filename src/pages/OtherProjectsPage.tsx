import type { CSSProperties, MouseEvent } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Award,
  BookOpen,
  Cpu,
  Gamepad2,
  Hammer,
  Lightbulb,
  Trophy,
  Users,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { certifications, experience } from "@/data/linkedin";
import { projects } from "@/data/projects";
import "@/styles/lab.css";

/**
 * Other Projects — hardware / IoT work, game development and hackathons,
 * presented in the same "aurora console" visual language as the Tech
 * Projects page: drifting auroras, blueprint grid, accent-tinted glass
 * cards with cursor spotlights. Content is sourced from the verified data
 * layer; nothing is invented.
 */

/** Cursor-tracked spotlight position for .lab-card surfaces. */
function trackSpot(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
  el.style.setProperty("--my", `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
}

export function OtherProjectsPage() {
  const others = projects.filter(
    (p) => !p.links.some((l) => l.href.includes("github.com"))
  );
  const hauntCert = certifications.find((c) => c.name.includes("Code-A-Haunt"));
  const sih = experience.find((e) => e.title.includes("Smart India Hackathon"));

  return (
    <div className="lab-page-shell section-pad">
      {/* drifting auroras behind the content */}
      <div
        aria-hidden="true"
        className="lab-aurora pointer-events-none absolute -left-24 -top-32 h-[420px] w-[420px] rounded-full bg-[#7c3aed]/20 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="lab-aurora pointer-events-none absolute -right-20 top-40 h-[380px] w-[380px] rounded-full bg-[#0066ff]/15 blur-[130px]"
      />

      <Container className="relative">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <Reveal>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="overline-label text-[var(--accent)]">Other projects</p>
              <h1 className="type-hero mt-5 text-[var(--text)]">
                Beyond the{" "}
                <span className="text-gradient">browser</span>
              </h1>
              <p className="mt-7 max-w-xl text-[length:var(--font-body-lg)] leading-[1.65] text-[var(--text-muted)]">
                Team engineering that doesn't live in a GitHub repo: Arduino
                and sensor work on real circuits, gameplay programming in
                Godot, and national-level hackathon builds.
              </p>
            </div>

            <div className="flex gap-3 lg:min-w-[380px]">
              {[
                { label: "Hackathons", value: "02", icon: Trophy },
                { label: "Team builds", value: "02", icon: Users },
                { label: "Hardware", value: "01", icon: Hammer },
              ].map((s) => (
                <div
                  key={s.label}
                  className="glass flex-1 rounded-2xl px-4 py-5 text-center"
                >
                  <s.icon
                    className="mx-auto h-4 w-4 text-[var(--accent)]"
                    aria-hidden="true"
                  />
                  <p className="mt-2.5 font-display text-2xl font-bold tabular-nums text-[var(--text)]">
                    {s.value}
                  </p>
                  <p className="mt-1 font-mono-tag text-[10px] uppercase tracking-[0.12em] text-[var(--text-faint)]">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ── 01 · Hackathons ──────────────────────────────────── */}
        <section id="hackathons" className="mt-24 scroll-mt-24">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="font-mono-tag text-[13px] font-medium text-[var(--accent)]">01</span>
              <h2 className="flex items-center gap-3 font-display text-2xl font-semibold text-[var(--text)]">
                <Trophy className="h-6 w-6 text-[var(--accent)]" aria-hidden />
                Hackathons
              </h2>
              <span className="h-px flex-1 bg-[var(--border)]" aria-hidden="true" />
            </div>
          </Reveal>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {/* Code-A-Haunt */}
            {hauntCert && (
              <Reveal className="h-full">
                <article
                  onPointerMove={trackSpot}
                  style={{ "--card-accent": "#f59e0b" } as CSSProperties}
                  className="lab-card card-lift flex h-full flex-col rounded-2xl p-7"
                >
                  <span className="lab-spotlight" aria-hidden="true" />
                  <div className="flex items-start justify-between gap-4">
                    <Award className="h-6 w-6 shrink-0 text-[#f59e0b]" aria-hidden />
                    <span className="rounded-full bg-[#f59e0b]/15 px-2.5 py-0.5 font-mono-tag text-[10px] uppercase tracking-[0.12em] text-[#fbbf24]">
                      Certificate of Participation
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold leading-snug text-[var(--text)]">
                    Code-A-Haunt 3.0
                  </h3>
                  <p className="mt-1 font-mono-tag text-[11px] uppercase tracking-wider text-[var(--text-faint)]">
                    National-Level Inter-University Hackathon · 13–14 March 2026
                  </p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--text-muted)]">
                    Organized by CodingBlocks LPU at Lovely Professional University.
                    Led a four-member team — with Atharva Saxena, Adit Chaudhary and
                    Abhijeet Yadav — building{" "}
                    <Link
                      to="/projects/lpu-campus-navigator"
                      className="font-medium text-[var(--accent)] hover:underline"
                    >
                      LPU Campus Navigator
                    </Link>
                    , a web platform that helps freshers navigate the campus with an
                    interactive map, smart routing and a campus-query chatbot.
                  </p>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] pt-4">
                    <span className="inline-flex items-center gap-2 text-[13px] text-[var(--text-muted)]">
                      <Users className="h-4 w-4 text-[var(--accent)]" aria-hidden />
                      Team Leader · 4-member team
                    </span>
                    {hauntCert.credentialUrl && hauntCert.verificationWorking !== false && (
                      <a
                        href={hauntCert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-fill)] px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-[var(--accent-fill-hover)]"
                      >
                        Verify certificate
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            )}

            {/* Smart India Hackathon (internal round) */}
            {sih && (
              <Reveal delay={0.06} className="h-full">
                <article
                  onPointerMove={trackSpot}
                  style={{ "--card-accent": "#a78bfa" } as CSSProperties}
                  className="lab-card card-lift flex h-full flex-col rounded-2xl p-7"
                >
                  <span className="lab-spotlight" aria-hidden="true" />
                  <Cpu className="h-6 w-6 text-[#a78bfa]" aria-hidden />
                  <h3 className="mt-5 font-display text-xl font-semibold leading-snug text-[var(--text)]">
                    Internal Hackathon — Smart India Hackathon 2025
                  </h3>
                  <p className="mt-1 font-mono-tag text-[11px] uppercase tracking-wider text-[var(--text-faint)]">
                    Team project · Game development track
                  </p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--text-muted)]">
                    {sih.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-1.5 border-t border-[var(--border)] pt-4">
                    {["GDScript", "Godot Engine", "Aseprite", "2D Game Development"].map(
                      (t) => (
                        <span key={t} className="tag-pill">
                          {t}
                        </span>
                      )
                    )}
                  </div>
                </article>
              </Reveal>
            )}
          </div>
        </section>

        {/* ── 02 · Hardware & IoT ───────────────────────────────── */}
        <section id="iot" className="mt-24 scroll-mt-24">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="font-mono-tag text-[13px] font-medium text-[var(--accent)]">02</span>
              <h2 className="flex items-center gap-3 font-display text-2xl font-semibold text-[var(--text)]">
                <Lightbulb className="h-6 w-6 text-[var(--accent)]" aria-hidden />
                Hardware & IoT
              </h2>
              <span className="h-px flex-1 bg-[var(--border)]" aria-hidden="true" />
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div
              onPointerMove={trackSpot}
              style={{ "--card-accent": "#fbbf24" } as CSSProperties}
              className="lab-card mt-8 overflow-hidden rounded-2xl"
            >
              <span className="lab-spotlight" aria-hidden="true" />
              <div className="grid lg:grid-cols-[1.3fr_1fr]">
                <div className="p-7 sm:p-9">
                  <span className="caption-label">Team project</span>
                  <h3 className="mt-3 font-display text-xl font-semibold text-[var(--text)]">
                    IoT-Based Project — Arduino & Sensors
                  </h3>
                  <p className="mt-4 text-sm leading-[1.75] text-[var(--text-muted)]">
                    A team build integrating an Arduino board with sensor modules over
                    C++, exploring practical solutions such as body-posture correction
                    alongside related sensing applications.
                  </p>
                  <p className="mt-4 text-sm leading-[1.75] text-[var(--text-muted)]">
                    The electronics work was grounded in a full LED study:
                    electroluminescence and P-N junction behaviour, V-I characteristics
                    across colors (~1.8 V red to ~3.5 V blue/white), current-limiting
                    resistor design via R = (Vs − Vf) / If, and hands-on
                    brightness-vs-current measurements on a standard red GaAsP LED at a
                    5 V supply — confirming luminous intensity tracks forward current,
                    manageable through PWM.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {["Arduino", "C++", "Sensors", "IoT", "LED circuits", "Electronics"].map(
                      (t) => (
                        <span key={t} className="tag-pill">
                          {t}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div className="border-t border-[var(--border)] bg-[var(--surface)] p-7 sm:p-9 lg:border-l lg:border-t-0">
                  <p className="caption-label">Measured data · red LED @ 5 V</p>
                  <table className="mt-4 w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-[var(--border-strong)] font-mono-tag text-[11px] uppercase tracking-wider text-[var(--text-faint)]">
                        <th scope="col" className="pb-2 pr-3">Resistor</th>
                        <th scope="col" className="pb-2 pr-3">Current</th>
                        <th scope="col" className="pb-2">Brightness</th>
                      </tr>
                    </thead>
                    <tbody className="font-mono-tag text-[13px] text-[var(--text-muted)]">
                      {[
                        ["100 Ω", "31 mA", "Very bright"],
                        ["220 Ω", "14.2 mA", "Bright"],
                        ["470 Ω", "6.7 mA", "Moderate"],
                        ["10 kΩ", "3.2 mA", "Dim"],
                      ].map(([r, i, b]) => (
                        <tr key={r} className="border-b border-[var(--border)] last:border-0">
                          <td className="py-2.5 pr-3 text-[var(--text)]">{r}</td>
                          <td className="py-2.5 pr-3">{i}</td>
                          <td className="py-2.5">{b}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="mt-4 text-[12px] leading-relaxed text-[var(--text-faint)]">
                    Luminous intensity is proportional to forward current; current
                    limiting prevents thermal runaway.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── 03 · Game development & learning builds ────────────── */}
        <section id="games" className="mt-24 scroll-mt-24">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="font-mono-tag text-[13px] font-medium text-[var(--accent)]">03</span>
              <h2 className="flex items-center gap-3 font-display text-2xl font-semibold text-[var(--text)]">
                <Gamepad2 className="h-6 w-6 text-[var(--accent)]" aria-hidden />
                Game development & more
              </h2>
              <span className="h-px flex-1 bg-[var(--border)]" aria-hidden="true" />
            </div>
          </Reveal>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {others.map((project, i) => {
              const isGame = project.category.toLowerCase().includes("game");
              const Icon = isGame ? Gamepad2 : BookOpen;
              return (
                <Reveal key={project.slug} delay={i * 0.06} className="h-full">
                  <Link
                    to={`/projects/${project.slug}`}
                    onPointerMove={trackSpot}
                    style={{ "--card-accent": project.accent } as CSSProperties}
                    className="lab-card card-lift group flex h-full flex-col rounded-2xl p-7"
                  >
                    <span className="lab-spotlight" aria-hidden="true" />
                    <span
                      className="lab-index pointer-events-none absolute -right-1 -top-5 text-[92px]"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Icon className="h-6 w-6" style={{ color: project.accent }} aria-hidden />
                    <h3 className="mt-5 font-display text-lg font-semibold text-[var(--text)]">
                      <span className="title-underline">
                        {project.name}
                      </span>
                    </h3>
                    <p className="mt-1 font-mono-tag text-[11px] uppercase tracking-wider text-[var(--text-faint)]">
                      {project.category}
                    </p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--text-muted)]">
                      {project.tagline}
                    </p>
                    {project.metrics.length > 0 && (
                      <div className="mt-5 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--border)]">
                        {project.metrics.slice(0, 3).map((m) => (
                          <div
                            key={m.label}
                            className="bg-[var(--bg-elevated)] px-2 py-2.5 text-center"
                          >
                            <p className="font-mono-tag text-[13px] font-semibold text-[var(--text)]">
                              {m.value}
                            </p>
                            <p className="mt-0.5 truncate font-mono-tag text-[9px] uppercase tracking-[0.1em] text-[var(--text-faint)]">
                              {m.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                    <span className="mt-5 inline-flex items-center gap-1 text-[14px] font-medium text-[var(--accent)]">
                      Case study
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden
                      />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </section>

        <Reveal delay={0.1}>
          <p className="mt-16 border-t border-[var(--border)] pt-8 font-mono-tag text-[12px] text-[var(--text-faint)]">
            Looking for the GitHub-hosted products?{" "}
            <Link to="/projects/tech" className="text-[var(--accent)] hover:underline">
              See tech projects
            </Link>
            .
          </p>
        </Reveal>
      </Container>
    </div>
  );
}
