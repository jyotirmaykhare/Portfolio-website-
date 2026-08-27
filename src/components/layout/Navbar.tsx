import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Github, Menu, X } from "lucide-react";
import { site } from "@/data/site";

interface NavItem {
  label: string;
  to: string;
}

const NAV: NavItem[] = [
  { label: "Tech Projects", to: "/projects/tech" },
  { label: "Other Projects", to: "/projects/other" },
  { label: "Certifications", to: "/certifications" },
  { label: "LinkedIn", to: "/linkedin" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

interface NavbarProps {
  onOpenCommand: () => void;
}

export function Navbar({ onOpenCommand }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] backdrop-blur border-b border-[var(--border)]" : "bg-transparent"
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between" aria-label="Primary">
        <Link to="/" className="group inline-flex items-center gap-2.5" aria-label="Home — Jyotirmay Khare">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--accent-fill)] font-display text-sm font-bold text-white">
            JK
          </span>
          <span className="font-display text-[15px] font-semibold tracking-tight text-[var(--text)]">
            Jyotirmay Khare
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active =
              location.pathname === item.to || location.pathname.startsWith(item.to + "/");
            return (
              <Link
                key={item.label}
                to={item.to}
                className={`group relative rounded-lg px-3 py-2 text-sm transition-colors ${
                  active ? "text-[var(--text)]" : "text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-lg border border-[var(--border-strong)] bg-[var(--surface)]"
                  />
                )}
                <span className="relative">
                  {item.label}
                  {/* animated underline sweep */}
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-[var(--accent)] transition-transform duration-300 ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onOpenCommand}
            className="hidden items-center gap-2 rounded-lg border border-[var(--border-strong)] px-2.5 py-1.5 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text)] sm:inline-flex"
            aria-label="Open command palette"
          >
            <span className="font-mono-tag text-xs">⌘K</span>
          </button>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-9 w-9 place-items-center rounded-lg text-[var(--text-muted)] transition-colors hover:text-[var(--text)] lg:grid"
            aria-label="GitHub profile"
          >
            <Github className="h-[18px] w-[18px]" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="grid h-9 w-9 place-items-center rounded-lg text-[var(--text)] md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-[var(--border)] bg-[var(--bg)] md:hidden">
          <div className="container-page flex flex-col gap-1 py-3">
            {NAV.map((item) => {
              const active =
                location.pathname === item.to || location.pathname.startsWith(item.to + "/");
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`rounded-lg px-3 py-3 text-base hover:bg-[var(--surface)] ${
                    active ? "font-medium text-[var(--accent)]" : "text-[var(--text)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg px-3 py-3 text-base text-[var(--text)] hover:bg-[var(--surface)]"
            >
              <Github className="h-5 w-5" /> GitHub
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
