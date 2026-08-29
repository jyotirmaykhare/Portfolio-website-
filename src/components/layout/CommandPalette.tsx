import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileCode2,
  FolderOpen,
  Github,
  Home,
  Linkedin,
  Search,
  User,
  Wrench,
  Mail,
  Command,
  type LucideIcon,
} from "lucide-react";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

interface CmdItem {
  id: string;
  label: string;
  hint?: string;
  icon: LucideIcon;
  group: string;
  action: () => void;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const go = (route: string) => {
    onClose();
    navigate(route);
  };

  const items = useMemo<CmdItem[]>(() => {
    const base: CmdItem[] = [
      { id: "home", label: "Home", icon: Home, group: "Navigate", action: () => go("/") },
      { id: "tech", label: "Tech Projects", hint: "GitHub-hosted products", icon: FolderOpen, group: "Navigate", action: () => go("/projects/tech") },
      { id: "other", label: "Other Projects", hint: "IoT · games · hackathons", icon: Wrench, group: "Navigate", action: () => go("/projects/other") },
      { id: "certifications", label: "Certifications", hint: "Proof of work", icon: FileCode2, group: "Navigate", action: () => go("/certifications") },
      { id: "about", label: "About", icon: User, group: "Navigate", action: () => go("/about") },
      { id: "contact", label: "Contact", icon: Mail, group: "Navigate", action: () => go("/contact") },
      { id: "linkedin-archive", label: "LinkedIn Archive", icon: Linkedin, group: "Navigate", action: () => go("/linkedin") },
      {
        id: "github",
        label: "GitHub",
        hint: "Open",
        icon: Github,
        group: "External",
        action: () => window.open(site.github, "_blank", "noopener"),
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        hint: "Open",
        icon: Linkedin,
        group: "External",
        action: () => window.open(site.linkedin, "_blank", "noopener"),
      },
    ];
    const projectItems: CmdItem[] = projects.map((p) => ({
      id: p.slug,
      label: p.name,
      hint: p.category,
      icon: FileCode2,
      group: "Projects",
      action: () => go(`/projects/${p.slug}`),
    }));
    return [...base, ...projectItems];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) => i.label.toLowerCase().includes(q) || (i.hint ?? "").toLowerCase().includes(q)
    );
  }, [items, query]);

  // Focus input and reset when opened
  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Keyboard navigation within the palette
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => (a + 1) % Math.max(filtered.length, 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => (a - 1 + Math.max(filtered.length, 1)) % Math.max(filtered.length, 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        filtered[active]?.action();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, active, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 p-4 pt-[12vh] backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] shadow-[var(--shadow-2)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-[var(--border)] px-4">
          <Search className="h-5 w-5 text-[var(--text-faint)]" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            placeholder="Search projects, sections, actions…"
            className="h-14 w-full bg-transparent text-[15px] text-[var(--text)] placeholder:text-[var(--text-faint)] focus:outline-none"
            aria-label="Search command palette"
          />
          <kbd className="font-mono-tag hidden rounded border border-[var(--border-strong)] px-1.5 py-0.5 text-[11px] text-[var(--text-faint)] sm:inline">
            Esc
          </kbd>
        </div>

        <div className="max-h-[46vh] overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-[var(--text-muted)]">
              No results for “{query}”.
            </p>
          ) : (
            filtered.map((item, i) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={item.action}
                  onMouseEnter={() => setActive(i)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm ${
                    i === active ? "bg-[var(--accent-soft)] text-[var(--text)]" : "text-[var(--text-muted)]"
                  }`}
                >
                  <Icon className="h-4.5 w-4.5 shrink-0" aria-hidden />
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.hint && (
                    <span className="font-mono-tag text-[11px] text-[var(--text-faint)]">{item.hint}</span>
                  )}
                </button>
              );
            })
          )}
        </div>

        <div className="flex items-center gap-4 border-t border-[var(--border)] px-4 py-2.5 font-mono-tag text-[11px] text-[var(--text-faint)]">
          <span className="inline-flex items-center gap-1">
            <Command className="h-3 w-3" /> K
          </span>
          <span className="hidden sm:inline">↑↓ to navigate</span>
          <span className="hidden sm:inline">↵ to select</span>
          <span className="ml-auto hidden items-center gap-1 text-[var(--text-muted)] sm:inline-flex">
            <Wrench className="h-3 w-3" /> Build with intent
          </span>
        </div>
      </div>
    </div>
  );
}

