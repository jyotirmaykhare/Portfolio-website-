import { useState } from "react";
import { Hash } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PostDetailModal } from "@/components/linkedin/PostDetailModal";
import { getPost, hashtags, technologies } from "@/data/linkedin";

/**
 * Technology + hashtag explorers. Both lists are COMPUTED from the archive
 * (see data/linkedin/derived.ts) — a tag only appears here if a real post
 * or project uses it.
 */
export function Explorers() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="explorers" className="section-band border-b border-[var(--border)]">
      <Container className="py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Explorers"
            title={<>Tags that actually <span className="text-gradient">exist</span></>}
            description="Aggregated straight from the archived shares and their linked projects — no hand-maintained keyword list."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Technologies */}
          <Reveal>
            <div className="glass h-full rounded-2xl p-7">
              <p className="caption-label">Technologies</p>
              <ul className="mt-5 space-y-1.5">
                {technologies.map((t) => {
                  const key = `tech:${t.name}`;
                  const open = expanded === key;
                  return (
                    <li key={t.name}>
                      <button
                        type="button"
                        onClick={() => setExpanded(open ? null : key)}
                        aria-expanded={open}
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-colors hover:bg-[var(--surface)]"
                      >
                        <span className="font-mono-tag text-[14px] text-[var(--text)]">{t.name}</span>
                        <span className="font-mono-tag text-[11px] text-[var(--text-faint)]">
                          {t.posts.length} {t.posts.length === 1 ? "post" : "posts"}
                          {t.projects.length > 0 ? ` · ${t.projects.length} project${t.projects.length === 1 ? "" : "s"}` : ""}
                        </span>
                      </button>
                      {open && (
                        <ul className="mb-2 ml-3 space-y-0.5 border-l border-[var(--border)] pl-4">
                          {t.posts.map((id) => {
                            const p = getPost(id);
                            if (!p) return null;
                            return (
                              <li key={id}>
                                <button
                                  type="button"
                                  onClick={() => setOpenId(id)}
                                  className="line-clamp-1 w-full py-1 text-left text-[13px] text-[var(--text-muted)] hover:text-[var(--text)]"
                                >
                                  → {p.indexedPreview}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>

          {/* Hashtags */}
          <Reveal delay={0.07}>
            <div className="glass h-full rounded-2xl p-7">
              <p className="caption-label">Hashtags</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {hashtags.map((h) => (
                  <button
                    key={h.tag}
                    type="button"
                    onClick={() => setOpenId(h.posts[0])}
                    title={`${h.usageCount} use${h.usageCount === 1 ? "" : "s"} — click to open most recent`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-strong)] px-3 py-1.5 font-mono-tag text-[12px] text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    <Hash className="h-3 w-3" aria-hidden="true" />
                    {h.tag}
                    <span className="text-[10px] text-[var(--text-faint)]">{h.usageCount}</span>
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>

      <PostDetailModal postId={openId} onClose={() => setOpenId(null)} onSelect={setOpenId} />
    </section>
  );
}
