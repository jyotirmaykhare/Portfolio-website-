import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NeedsInput } from "@/components/linkedin/shared";
import { posts } from "@/data/linkedin";
import type { Post } from "@/types";

/**
 * Analytics dashboard.
 *
 * Renders ONLY numbers explicitly authored into the content layer —
 * one post at a time, each bar bound to that post's own engagement record
 * (numbers can never leak between posts). No interpolated trend lines,
 * no inferred totals.
 *
 * If no post has any engagement numbers yet, the section shows a calm
 * "Requires manual input" panel instead of disappearing or guessing.
 */
export function Analytics() {
  const measured = posts.filter(hasNumbers);
  const hasData = measured.length > 0;

  return (
    <section id="analytics" className="section-band border-b border-[var(--border)]">
      <Container className="py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Analytics"
            title={<>Numbers I can <span className="text-gradient">stand behind</span></>}
            description="Per-post performance, shown only from numbers on record. Each engagement figure stays attached to its own share — nothing averaged, nothing copied."
          />
        </Reveal>

        {hasData ? (
          <div className="mt-12">
            <Reveal delay={0.06}>
              <div>
                <p className="overline-label">Top performing content</p>
                <ol className="mt-5 space-y-3">
                  {measured
                    .map((p) => ({ post: p, metric: dominantMetric(p) }))
                    .sort((a, b) => (b.metric.value ?? 0) - (a.metric.value ?? 0))
                    .map(({ post, metric }, i) => (
                      <li key={post.id} className="flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-5 py-4">
                        <span className="font-mono-tag text-[13px] text-[var(--text-faint)]">#{i + 1}</span>
                        <span className="line-clamp-1 flex-1 text-sm font-medium text-[var(--text)]">
                          {post.indexedPreview ?? "Untitled share"}
                        </span>
                        <span className="font-mono-tag text-[12px] text-[var(--accent)]">
                          {metric.value?.toLocaleString("en-US")} {metric.label}
                        </span>
                      </li>
                    ))}
                </ol>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-10">
                <p className="overline-label">Per-post engagement</p>
                <ul className="mt-5 space-y-4">
                  {posts.map((p) => <EngagementRow key={p.id} post={p} />)}
                </ul>
              </div>
            </Reveal>
          </div>
        ) : (
          <NoEngagementData />
        )}
      </Container>
    </section>
  );
}

function NoEngagementData() {
  return (
    <Reveal delay={0.08}>
      <div className="mt-10 rounded-2xl border border-dashed border-[var(--border-strong)] p-8">
        <p className="caption-label">No engagement data yet</p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--text-muted)]">
          LinkedIn does not make view/reaction counts available to the public archive, and no
          per-post numbers have been provided manually. When real numbers are added to a
          post&rsquo;s engagement record, this dashboard renders that post&rsquo;s bars — never
          anyone else&rsquo;s.
        </p>
        <div className="mt-5"><NeedsInput>Requires manual input</NeedsInput></div>
      </div>
    </Reveal>
  );
}

function hasNumbers(p: Post): boolean {
  const e = p.engagement;
  return e.views !== null || e.likes !== null || e.comments !== null || e.reposts !== null;
}

interface Metric { label: string; value: number | null }

/** The strongest available metric for a post — the only thing it can be ranked by. */
function dominantMetric(p: Post): Metric {
  const e = p.engagement;
  const candidates: Array<[number | null, string]> = [
    [e.views, "views"],
    [e.likes, "likes"],
    [e.comments, "comments"],
    [e.reposts, "reposts"],
  ];
  let best: Metric = { label: "views", value: null };
  for (const [v, l] of candidates) {
    if (v !== null && (best.value === null || v > best.value)) {
      best = { label: l, value: v };
    }
  }
  return best;
}

function EngagementRow({ post }: { post: Post }) {
  const e = post.engagement;
  const bars: Array<{ label: string; value: number | null }> = [
    { label: "Views", value: e.views },
    { label: "Likes", value: e.likes },
    { label: "Comments", value: e.comments },
    { label: "Reposts", value: e.reposts },
  ];
  const max = Math.max(...bars.map((b) => b.value ?? 0), 1);

  return (
    <li className="border-b border-[var(--border)] pb-4 last:border-0">
      <p className="line-clamp-1 text-sm font-medium text-[var(--text)]">
        {post.indexedPreview ?? "Untitled share"}
      </p>
      <div className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
        {bars.map((b) => (
          <div key={b.label} className="flex items-center gap-3">
            <span className="w-20 shrink-0 font-mono-tag text-[11px] uppercase tracking-wider text-[var(--text-faint)]">
              {b.label}
            </span>
            <span className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--surface)]">
              <span
                className="block h-full rounded-full bg-[var(--accent)]"
                style={{ width: `${b.value === null ? 0 : (b.value / max) * 100}%` }}
              />
            </span>
            <span className="w-16 shrink-0 text-right font-mono-tag text-[12px] text-[var(--text)]">
              {b.value === null ? "—" : b.value.toLocaleString("en-US")}
            </span>
          </div>
        ))}
      </div>
    </li>
  );
}