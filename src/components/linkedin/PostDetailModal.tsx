import { ArrowUpRight, CalendarClock, ExternalLink, Github, Link2 } from "lucide-react";
import { Modal, NeedsInput } from "@/components/linkedin/shared";
import { getLinkedinProject, getPost, relatedPostsByTech } from "@/data/linkedin";
import type { Post } from "@/types";

interface Props {
  postId: string | null;
  onClose: () => void;
  /** Lets a related-post row swap which record is open. */
  onSelect?: (id: string) => void;
}

/** Full-post modal. Renders ONLY fields that exist; gaps get honest markers. */
export function PostDetailModal({ postId, onClose, onSelect }: Props) {
  const post = postId ? getPost(postId) : null;
  const relatedIds = post ? relatedPostsByTech(post.id) : [];

  return (
    <Modal open={post !== null} onClose={onClose} labelledBy="post-modal-title" className="max-w-3xl">
      {post && (
        <div className="p-6 sm:p-8">
          <p className="overline-label">{post.category ?? "Post"}</p>
          <h3 id="post-modal-title" className="type-h3 mt-4 pr-10 leading-snug text-[var(--text)]">
            {post.indexedPreview ?? "Untitled share"}
          </h3>

          {/* Body — full text is login-walled, so we say so instead of faking it. */}
          {post.fullText ? (
            <p className="mt-5 whitespace-pre-line text-[15px] leading-relaxed text-[var(--text)]">{post.fullText}</p>
          ) : (
            <div className="mt-5 rounded-xl border border-dashed border-[var(--border-strong)] p-4">
              <NeedsInput>Full post body unavailable</NeedsInput>
              <p className="mt-2 font-mono-tag text-[11px] leading-relaxed text-[var(--text-faint)]">
                Only the share title/first line above could be confirmed from public indexing.
                Open the post on LinkedIn for the complete text.
              </p>
            </div>
          )}

          {(post.hashtags.length > 0 || post.tech.length > 0) && (
            <div className="mt-6 flex flex-wrap gap-1.5">
              {post.tech.map((t) => (
                <span key={t} className="tag-pill">{t}</span>
              ))}
              {post.hashtags.map((h) => (
                <span key={h} className="font-mono-tag text-[12px] text-[var(--accent)]">#{h}</span>
              ))}
            </div>
          )}

          <dl className="mt-6 space-y-2 border-t border-[var(--border)] pt-5 text-sm">
            <MetaRow label="Date">
              {post.date
                ? new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
                : (
                  <span className="inline-flex items-center gap-2 text-[var(--text-muted)]">
                    <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" /> Requires manual input
                  </span>
                )}
            </MetaRow>
            <MetaRow label="Engagement">
              {hasEngagement(post) ? <EngagementValues post={post} /> : <span className="text-[var(--text-muted)]">Requires manual input</span>}
            </MetaRow>
          </dl>

          {post.relatedProjectIds.map((slug) => {
            const proj = getLinkedinProject(slug);
            if (!proj) return null;
            return (
              <div key={slug} className="mt-6 rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] p-4">
                <p className="caption-label">Related project</p>
                <p className="mt-1 font-display text-base font-semibold text-[var(--text)]">{proj.name}</p>
                {proj.description && (
                  <p className="mt-1 text-[13px] leading-relaxed text-[var(--text-muted)]">{proj.description}</p>
                )}
                <div className="mt-3 flex flex-wrap gap-4">
                  <a href={`/projects/${proj.slug}`} className="link-underline inline-flex items-center gap-1 text-[13px] font-medium text-[var(--text)]">
                    Case study <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                  {proj.links.filter((l) => /github/i.test(l.label)).map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-1 text-[13px] font-medium text-[var(--text)]">
                      <Github className="h-3.5 w-3.5" aria-hidden="true" /> GitHub
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
          {/* Related posts via shared technology */}
          {relatedIds.length > 0 && (
            <div className="mt-6">
              <p className="overline-label">Related posts</p>
              <ul className="mt-3 space-y-1.5">
                {relatedIds.map((id) => {
                  const rp = getPost(id);
                  if (!rp) return null;
                  return (
                    <li key={id}>
                      <button
                        type="button"
                        onClick={() => onSelect?.(id)}
                        className="w-full rounded-lg px-3 py-2 text-left transition-colors hover:bg-[var(--surface)]"
                      >
                        <span className="line-clamp-1 text-sm text-[var(--text)]">{rp.indexedPreview}</span>
                        <span className="mt-0.5 block font-mono-tag text-[11px] uppercase tracking-wider text-[var(--text-faint)]">
                          {rp.category} · shares {rp.tech.join(", ")}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-[var(--border)] pt-5">
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-fill)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-fill-hover)]"
            >
              Open on LinkedIn <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <span className="inline-flex items-center gap-1.5 font-mono-tag text-[11px] text-[var(--text-faint)]">
              <Link2 className="h-3.5 w-3.5" aria-hidden="true" /> ID {post.id}
            </span>
          </div>
        </div>
      )}
    </Modal>
  );
}

function hasEngagement(post: Post): boolean {
  const e = post.engagement;
  return e.views !== null || e.likes !== null || e.comments !== null || e.reposts !== null;
}

function MetaRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="caption-label">{label}</dt>
      <dd className="text-right text-[var(--text)]">{children}</dd>
    </div>
  );
}

function EngagementValues({ post }: { post: Post }) {
  const e = post.engagement;
  return (
    <span className="font-mono-tag text-[13px]">
      {[
        e.views != null ? `${e.views.toLocaleString("en-US")} views` : null,
        e.likes != null ? `${e.likes.toLocaleString("en-US")} likes` : null,
        e.comments != null ? `${e.comments.toLocaleString("en-US")} comments` : null,
        e.reposts != null ? `${e.reposts.toLocaleString("en-US")} reposts` : null,
      ]
        .filter(Boolean)
        .join(" · ")}
    </span>
  );
}
