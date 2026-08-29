import { Link } from "react-router-dom";
import {
  ArrowRight,
  Cpu,
  Gamepad2,
  GraduationCap,
  MapPin,
  Sparkles,
  Terminal,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Seo } from "@/components/Seo";
import { profile, education } from "@/data/linkedin";
import { ecosystems } from "@/data/skills";

/**
 * /about — rebuilt around the verified data layer, focused on the FULL STACK
 * story only: frontend, backend, databases and cloud deployment. Hardware /
 * game / hackathon content lives on /projects/other instead.
 */

/** Only the full-stack domains belong here, per the site's information design. */
const CORE_DOMAINS = ["Frontend", "Backend & APIs", "Data & Storage", "Cloud & Infrastructure"];
const stackEcosystems = ecosystems.filter((e) => CORE_DOMAINS.includes(e.title));

const ACHIEVEMENTS = [
  "Built and deployed multiple responsive web pages using HTML5, CSS3, and JavaScript.",
  "Completed a personal portfolio website demonstrating UI/UX, responsive layout and front-end development.",
  "Created interactive game prototypes using GDScript in the Godot Engine.",
  "Used Linux CLI for running applications, managing files and system navigation.",
];

export function AboutPage() {
  const edu = education[0];

  return (
    <div className="section-pad section-band">
      <Seo
        title="About Jyotirmay Khare — Full Stack Developer"
        description="Learn about Jyotirmay Khare — a full stack developer working across React, TypeScript, Flask, Node.js, PostgreSQL and MongoDB, deploying to Vercel, Netlify and AWS. B.Tech CSE at Lovely Professional University."
        path="/about"
      />
      <Container>
        {/* Identity header */}
        <Reveal>
          <Eyebrow>About me</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.05] tracking-[-0.025em] text-[var(--text)]">
            Entry-level developer, <span className="text-gradient">learning by shipping</span>.
          </h1>
          {profile.location && (
            <p className="mt-5 inline-flex items-center gap-2 font-mono-tag text-[12px] uppercase tracking-wider text-[var(--text-faint)]">
              <MapPin className="h-4 w-4" aria-hidden />
              {profile.location}
            </p>
          )}
        </Reveal>

        {/* Narrative + quick facts */}
        <Reveal delay={0.06}>
          <div className="mt-12 grid gap-10 lg:grid-cols-[1.35fr_1fr]">
            <div className="space-y-5 text-[length:var(--font-body-lg)] leading-[1.75] text-[var(--text)]">
              <p>{profile.summary}</p>
              <p className="text-[var(--text-muted)]">
                On the frontend I work with React, TypeScript and modern CSS to build
                interfaces that feel fast and considered. On the backend I design
                REST APIs with Python/Flask, Node.js and Express, and model data in
                PostgreSQL and MongoDB — then deploy it all to Vercel, Netlify and AWS.
              </p>
              <p className="text-[var(--text-muted)]">
                What ties it all together is care: for how the interface feels, how the
                data flows, and how the systems underneath behave under real load.
              </p>
            </div>

            <aside className="glass h-fit rounded-2xl p-6">
              <h2 className="font-display text-base font-semibold text-[var(--text)]">Quick facts</h2>
              <dl className="mt-4 space-y-4 text-sm">
                {edu && (
                  <div className="flex gap-3">
                    <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden />
                    <div>
                      <dt className="font-medium text-[var(--text)]">
                        {[edu.degree, edu.fieldOfStudy].filter(Boolean).join(" · ")}
                      </dt>
                      <dd className="mt-0.5 text-[13px] text-[var(--text-muted)]">
                        {edu.institution} · {edu.startDate?.slice(0, 4)}–{edu.endDate?.slice(0, 4)}
                      </dd>
                    </div>
                  </div>
                )}
                <div className="flex gap-3">
                  <Terminal className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden />
                  <div>
                    <dt className="font-medium text-[var(--text)]">Full-stack focus</dt>
                    <dd className="mt-0.5 text-[13px] text-[var(--text-muted)]">
                      Frontend UI · Backend APIs · Databases
                    </dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Cpu className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden />
                  <div>
                    <dt className="font-medium text-[var(--text)]">Deployment</dt>
                    <dd className="mt-0.5 text-[13px] text-[var(--text-muted)]">
                      Vercel · Netlify · AWS EC2 · Cloudflare
                    </dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden />
                  <div>
                    <dt className="font-medium text-[var(--text)]">Currently exploring</dt>
                    <dd className="mt-0.5 text-[13px] text-[var(--text-muted)]">
                      System design, caching strategies & real-time data pipelines
                    </dd>
                  </div>
                </div>
              </dl>
            </aside>
          </div>
        </Reveal>

        {/* Skills cloud — grouped chips (different style than home's ecosystem cards) */}
        <Reveal delay={0.08}>
          <section className="mt-16">
            <h2 className="font-display text-xl font-semibold text-[var(--text)]">Tools & technologies</h2>
            <div className="mt-6 space-y-5">
              {stackEcosystems.map((eco) => (
                <div key={eco.title} className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-4">
                  <span className="w-48 shrink-0 font-mono-tag text-[11px] uppercase tracking-wider text-[var(--text-faint)]">
                    {eco.title}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {eco.items.map((item) => (
                      <span key={item} className="tag-pill">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Achievements */}
        <Reveal delay={0.08}>
          <section className="mt-16">
            <h2 className="font-display text-xl font-semibold text-[var(--text)]">Milestones so far</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {ACHIEVEMENTS.map((a) => (
                <li key={a} className="glass rounded-xl p-4 text-sm leading-relaxed text-[var(--text-muted)]">
                  {a}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        {/* Beyond code */}
        <Reveal delay={0.1}>
          <figure className="mt-14 border-l-2 border-[var(--accent)] pl-6 sm:pl-8">
            <blockquote className="pull-quote">
              “Design thinking beyond the screen — I re-engineered an outdated laptop:
              unlocked advanced BIOS features, enabled dual-channel memory and pushed
              the hardware far past its stock performance.”
            </blockquote>
            <figcaption className="mt-3 font-mono-tag text-[11px] uppercase tracking-wider text-[var(--text-faint)]">
              Extra-curricular · hardware tinkering
            </figcaption>
          </figure>
        </Reveal>

        {/* CTAs */}
        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-wrap items-center gap-3">
            <Button as="link" to="/projects/tech">
              Tech projects <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
            <Button as="link" to="/projects/other" variant="secondary">
              <Gamepad2 className="h-4 w-4" aria-hidden /> Other projects
            </Button>
            <Link
              to="/contact"
              className="inline-flex h-11 items-center justify-center rounded-xl px-5 text-sm font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
            >
              Get in touch
            </Link>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}

