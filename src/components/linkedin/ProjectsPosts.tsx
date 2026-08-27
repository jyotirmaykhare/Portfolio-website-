import { useState } from "react";
import { ArrowUpRight, MessagesSquare } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NeedsInput } from "@/components/linkedin/shared";
import { PostDetailModal } from "@/components/linkedin/PostDetailModal";
import { getPost, linkedinProjects, postsForProject } from "@/data/linkedin";

/**
 * Projects ↔ Posts relationships. Every link shown is derived from the
 * post records themselves (share hashtags / explicit topics) — nothing is
 * hand-wired in the UI.
 */
export function ProjectsPosts() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="relationships" className="section-band border-b border-[var(--border)]">
      <Container className="py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Projects ↔ posts"
            title={<>Where the work shows up <span className="text-gradient">in public</span></>}
            description="Each project links back to the shares that mention it, and each share links to its project — one relationship graph, two directions."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {linkedinProjects.map((proj, i) => {
            const ids = postsForProject(proj.slug);
            return (
              <Reveal key={proj.slug} delay={(i % 2) * 0.07} className="h-full">
                <article
                  className={`flex h-full flex-col rounded-2xl border p-7 transition-colors ${
                    proj.linkedInConfirmed
                      ? "border-[var(--border-strong)] bg-[var(--bg-elevated)]"
                      : "border-dashed border-[var(--border)] bg-transparent"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-xl font-semibold text-[var(--text)]">{proj.name}</h3>
                    {proj.linkedInConfirmed ? (
                      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--accent-soft)] px-3 py-1 font-mono-tag text-[10px] uppercase tracking-wider text-[var(--accent)]">
                        <MessagesSquare className="h-3 w-3" aria-hidden="true" />
                        {ids.length} {ids.length === 1 ? "post" : "posts"}
                      </span>
                    ) : (
                      <NeedsInput>No posts confirmed</NeedsInput>
                    )}
                  </div>

                  {proj.description && (
                    <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{proj.description}</p>
                  )}

                  {proj.tech.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {proj.tech.map((t) => (<span key={t} className="tag-pill">{t}</span>))}
                      <span className="ml-1 self-center font-mono-tag text-[10px] uppercase tracking-wider text-[var(--text-faint)]">
                        via LinkedIn
                      </span>
                    </div>
                  )}

                  {ids.length > 0 && (
                    <ul className="mt-5 space-y-1.5 border-t border-[var(--border)] pt-4">
                      {ids.map((id) => {
                        const rp = getPost(id);
                        if (!rp) return null;
                        return (
                          <li key={id}>
                            <button
                              type="button"
                              onClick={() => setOpenId(id)}
                              className="line-clamp-1 w-full rounded-lg px-2 py-1.5 text-left text-[13px] text-[var(--text-muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--text)]"
                            >
                              → {rp.indexedPreview}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}

                  <div className="mt-auto flex flex-wrap gap-4 pt-6">
                    <a href={`/projects/${proj.slug}`} className="link-underline inline-flex items-center gap-1 text-[13px] font-medium text-[var(--text)]">
                      Case study <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                    {proj.links.map((l) => (
                      <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-1 text-[13px] font-medium text-[var(--text-muted)] hover:text-[var(--text)]">
                        {l.label}
                      </a>
                    ))}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>

      <PostDetailModal postId={openId} onClose={() => setOpenId(null)} onSelect={setOpenId} />
    </section>
  );
}
