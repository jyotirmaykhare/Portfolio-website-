import { useMemo, useState } from "react";
import { LayoutGrid, Rows3, Search } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NeedsInput } from "@/components/linkedin/shared";
import { GlassTiltCard } from "@/components/linkedin/GlassTiltCard";
import { PostDetailModal } from "@/components/linkedin/PostDetailModal";
import { getLinkedinProject, posts } from "@/data/linkedin";
import type { Post } from "@/types";

type View = "feed" | "table";
interface Filters { category: string; tech: string; year: string }

/** Activity archive — filter options are derived from the records themselves,
 *  so a filter with no real values hides instead of faking options. */
export function ActivityArchive() {
  const [view, setView] = useState<View>("feed");
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Filters>({ category: "all", tech: "all", year: "all" });
  const [openId, setOpenId] = useState<string | null>(null);

  const categories = useMemo(() => unique(posts.map((p) => p.category)), []);
  const techs = useMemo(() => unique(posts.flatMap((p) => p.tech)), []);
  // No confirmed dates → stays empty and the control hides itself.
  const years = useMemo(() => unique(posts.filter((p) => p.date).map((p) => p.date!.slice(0, 4))), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return [...posts]
      .sort((a, b) => b.order - a.order)
      .filter((p) => {
        if (filters.category !== "all" && p.category !== filters.category) return false;
        if (filters.tech !== "all" && !p.tech.includes(filters.tech)) return false;
        if (filters.year !== "all" && !(p.date && p.date.startsWith(filters.year))) return false;
        if (!q) return true;
        return [p.indexedPreview ?? "", p.fullText ?? "", p.category ?? "", ...p.hashtags, ...p.tech, ...p.relatedProjectIds]
          .join(" ")
          .toLowerCase()
          .includes(q);
      });
  }, [query, filters]);

  return (
    <section id="archive" className="section-band border-b border-[var(--border)]">
      <Container className="py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Activity archive"
            title={<>Every confirmed share, <span className="text-gradient">searchable</span></>}
            description={`${posts.length} public shares on record. Full bodies and engagement stay private to LinkedIn — only publicly indexable content is archived.`}
          />
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1">
              <Select label="Type" value={filters.category} onChange={(v) => setFilters((f) => ({ ...f, category: v }))} options={categories} allLabel="All types" />
              <Select label="Tech" value={filters.tech} onChange={(v) => setFilters((f) => ({ ...f, tech: v }))} options={techs} allLabel="All tech" />
              {years.length > 0 ? (
                <Select label="Year" value={filters.year} onChange={(v) => setFilters((f) => ({ ...f, year: v }))} options={years} allLabel="All years" />
              ) : (
                <NeedsInput>Dates need manual input</NeedsInput>
              )}
            </div>

            <div className="flex items-center gap-2">
              <label className="relative flex-1 lg:w-64">
                <span className="sr-only">Search the archive</span>
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-faint)]" aria-hidden="true" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search posts, tags, tech…"
                  className="h-10 w-full rounded-full border border-[var(--border-strong)] bg-[var(--surface)] pl-9 pr-4 text-sm text-[var(--text)] placeholder:text-[var(--text-faint)] focus:border-[var(--accent)] focus:outline-none"
                />
              </label>
              <div className="flex rounded-full border border-[var(--border-strong)] p-0.5">
                <IconToggle active={view === "feed"} onClick={() => setView("feed")} label="Feed view"><LayoutGrid className="h-4 w-4" /></IconToggle>
                <IconToggle active={view === "table"} onClick={() => setView("table")} label="Table view"><Rows3 className="h-4 w-4" /></IconToggle>
              </div>
            </div>
          </div>
        </Reveal>

        <p className="mt-6 font-mono-tag text-[11px] uppercase tracking-wider text-[var(--text-faint)]" aria-live="polite">
          {filtered.length} of {posts.length} posts
        </p>

        {filtered.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-[var(--border-strong)] p-8 text-center">
            <p className="text-sm text-[var(--text-muted)]">No posts match this search.</p>
          </div>
        ) : view === "feed" ? (
          <div className="mt-4 grid gap-5 md:grid-cols-2">
            {filtered.map((post) => (
              <PostCard key={post.id} post={post} onOpen={() => setOpenId(post.id)} />
            ))}
          </div>
        ) : (
          <ArchiveTable rows={filtered} onOpen={setOpenId} />
        )}
      </Container>

      <PostDetailModal postId={openId} onClose={() => setOpenId(null)} onSelect={setOpenId} />
    </section>
  );
}

function unique(values: Array<string | null>): string[] {
  return Array.from(new Set(values.filter((v): v is string => Boolean(v)))).sort((a, b) => a.localeCompare(b));
}

export function projectLabel(post: Post): string | null {
  const slug = post.relatedProjectIds[0];
  if (!slug) return null;
  return getLinkedinProject(slug)?.name ?? slug;
}

function Select({ label, value, onChange, options, allLabel }: {
  label: string; value: string; onChange: (v: string) => void; options: string[]; allLabel: string;
}) {
  if (options.length === 0) return null;
  return (
    <label className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-3 py-1.5">
      <span className="font-mono-tag text-[10px] uppercase tracking-wider text-[var(--text-faint)]">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="bg-transparent text-sm text-[var(--text)] focus:outline-none">
        <option value="all">{allLabel}</option>
        {options.map((o) => (<option key={o} value={o}>{o}</option>))}
      </select>
    </label>
  );
}

function PostCard({ post, onOpen }: { post: Post; onOpen: () => void }) {
  const project = projectLabel(post);
  return (
    <GlassTiltCard className="h-full">
      <button
        type="button"
        onClick={onOpen}
        aria-haspopup="dialog"
        className="flex h-full w-full flex-col rounded-3xl p-6 text-left hover:border-[var(--border-strong)]"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="caption-label">{post.category ?? "Post"}</span>
          <span className="font-mono-tag text-[10px] uppercase tracking-wider text-[var(--text-faint)]">
            {post.date ? new Date(post.date).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Date n/a"}
          </span>
        </div>
        <h3 className="mt-4 line-clamp-2 font-display text-[17px] font-semibold leading-snug text-[var(--text)]">
          {post.indexedPreview ?? "Untitled share"}
        </h3>
        {project && <p className="mt-2 font-mono-tag text-[11px] uppercase tracking-wider text-[var(--accent)]">{project}</p>}
        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-5">
          {post.tech.map((t) => (<span key={t} className="tag-pill">{t}</span>))}
          {post.hashtags.slice(0, 2).map((h) => (
            <span key={h} className="font-mono-tag text-[11px] text-[var(--text-faint)]">#{h}</span>
          ))}
        </div>
      </button>
    </GlassTiltCard>
  );
}

/** Dense archive view — columns per the brief; unavailable cells say so. */
function ArchiveTable({ rows, onOpen }: { rows: Post[]; onOpen: (id: string) => void }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-2xl border border-[var(--border-strong)]">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-[var(--border-strong)] bg-[var(--surface)]">
            {["Date", "Type", "Title", "Project", "Tech", "Engagement", "Media"].map((h) => (
              <th key={h} scope="col" className="caption-label px-4 py-3">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((post) => (
            <tr key={post.id} className="border-b border-[var(--border)] transition-colors last:border-0 hover:bg-[var(--surface)]">
              <td className="px-4 py-3 font-mono-tag text-[12px] text-[var(--text-muted)]">{post.date ? post.date.slice(0, 10) : "—"}</td>
              <td className="px-4 py-3 text-[13px] text-[var(--text-muted)]">{post.category ?? "—"}</td>
              <td className="max-w-xs px-4 py-3">
                <button type="button" onClick={() => onOpen(post.id)} className="line-clamp-1 text-left font-medium text-[var(--text)] hover:text-[var(--accent)]">
                  {post.indexedPreview ?? "Untitled share"}
                </button>
              </td>
              <td className="px-4 py-3 text-[13px] text-[var(--text-muted)]">{projectLabel(post) ?? "—"}</td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1">
                  {post.tech.length > 0
                    ? post.tech.map((t) => (<span key={t} className="tag-pill !px-2 !py-0.5 !text-[10px]">{t}</span>))
                    : <span className="text-[var(--text-faint)]">—</span>}
                </div>
              </td>
              <td className="px-4 py-3 font-mono-tag text-[12px] text-[var(--text-faint)]">n/a</td>
              <td className="px-4 py-3 text-[13px] text-[var(--text-faint)]">{post.media.length > 0 ? String(post.media.length) : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function IconToggle({ active, onClick, label, children }: {
  active: boolean; onClick: () => void; label: string; children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={`grid h-9 w-9 place-items-center rounded-full transition-colors ${
        active ? "bg-[var(--accent-fill)] text-white" : "text-[var(--text-muted)] hover:text-[var(--text)]"
      }`}
    >
      {children}
    </button>
  );
}

