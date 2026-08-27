import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PostDetailModal } from "@/components/linkedin/PostDetailModal";
import { GlassTiltCard } from "@/components/linkedin/GlassTiltCard";
import { getLinkedinProject, posts } from "@/data/linkedin";

/** Newest three shares that are explicitly tied to a project. */
const FEATURED = [...posts]
  .sort((a, b) => b.order - a.order)
  .filter((p) => p.relatedProjectIds.length > 0 && p.indexedPreview)
  .slice(0, 3);

export function FeaturedPosts() {
  const [openId, setOpenId] = useState<string | null>(null);
  if (FEATURED.length === 0) return null;

  return (
    <section id="featured" className="section-band border-b border-[var(--border)]">
      <Container className="py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Featured posts"
            title={<>Work worth <span className="text-gradient">re-reading</span></>}
            description="The three most recent shares tied directly to shipped projects. Full text stays on LinkedIn; the archive keeps what was publicly confirmed."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {FEATURED.map((post, i) => {
            const proj = getLinkedinProject(post.relatedProjectIds[0]);
            return (
              <Reveal key={post.id} delay={i * 0.07} className="h-full">
                <GlassTiltCard className="h-full">
                  <button
                    type="button"
                    onClick={() => setOpenId(post.id)}
                    aria-haspopup="dialog"
                    className="flex h-full w-full flex-col rounded-3xl p-7 text-left"
                  >
                    <span className="font-mono-tag text-[11px] uppercase tracking-wider text-[var(--text-faint)]">
                      {post.category}
                    </span>
                    <h3 className="mt-4 font-display text-[19px] font-semibold leading-snug text-[var(--text)]">
                      {post.indexedPreview}
                    </h3>
                    {proj && (
                      <p className="mt-3 font-mono-tag text-[12px] uppercase tracking-wider text-[var(--accent)]">
                        {proj.name}
                      </p>
                    )}
                    <p className="mt-auto pt-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--text-muted)] transition-colors group-hover:text-[var(--text)]">
                      Open archive record
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </p>
                  </button>
                </GlassTiltCard>
              </Reveal>
            );
          })}
        </div>
      </Container>

      <PostDetailModal postId={openId} onClose={() => setOpenId(null)} onSelect={setOpenId} />
    </section>
  );
}
