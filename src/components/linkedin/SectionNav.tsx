import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Sticky profile sub-nav with IntersectionObserver scroll-spy. */
const ITEMS = [
  { id: "snapshot", label: "Snapshot" },
  { id: "about", label: "About" },
  { id: "archive", label: "Activity" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "relationships", label: "Projects" },
  { id: "explorers", label: "Tags" },
  { id: "analytics", label: "Analytics" },
] as const;

export function SectionNav() {
  const [active, setActive] = useState<string>("snapshot");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-25% 0px -65% 0px" }
    );
    for (const { id } of ITEMS) {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    }
    return () => obs.disconnect();
  }, []);

  const jump = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <nav
      aria-label="Profile sections"
      className="sticky top-16 z-40 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] backdrop-blur"
    >
      <div className="no-scrollbar container-page flex items-center gap-1 overflow-x-auto py-2">
        {ITEMS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => jump(id)}
            aria-current={active === id ? "true" : undefined}
            className={cn(
              "relative shrink-0 rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors",
              active === id
                ? "text-white"
                : "text-[var(--text-muted)] hover:bg-[var(--surface)] hover:text-[var(--text)]"
            )}
          >
            {active === id && (
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-[var(--accent-fill)]"
              />
            )}
            <span className="relative">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
