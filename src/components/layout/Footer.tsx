import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { site } from "@/data/site";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const year = new Date().getFullYear();

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[var(--border)]">
      <Container className="flex flex-col gap-10 py-16">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <div className="max-w-sm">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--accent-fill)] font-display text-sm font-bold text-white">
                JK
              </span>
              <span className="font-display text-[15px] font-semibold text-[var(--text)]">
                Jyotirmay Khare
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">
              Full Stack Developer building real software products across web, data, cloud and
              interactive experiences.
            </p>
          </div>

          <nav className="flex flex-col gap-2" aria-label="Footer">
            <span className="overline-label mb-1">Navigate</span>
            <Link to="/" className="text-sm text-[var(--text-muted)] hover:text-[var(--text)]">Home</Link>
            <Link to="/projects/tech" className="text-sm text-[var(--text-muted)] hover:text-[var(--text)]">Tech Projects</Link>
            <Link to="/projects/other" className="text-sm text-[var(--text-muted)] hover:text-[var(--text)]">Other Projects</Link>
            <Link to="/certifications" className="text-sm text-[var(--text-muted)] hover:text-[var(--text)]">Certifications</Link>
            <Link to="/linkedin" className="text-sm text-[var(--text-muted)] hover:text-[var(--text)]">LinkedIn Archive</Link>
            <Link to="/about" className="text-sm text-[var(--text-muted)] hover:text-[var(--text)]">About</Link>
            <Link to="/contact" className="text-sm text-[var(--text-muted)] hover:text-[var(--text)]">Contact</Link>
          </nav>

          <div className="flex flex-col gap-2">
            <span className="overline-label mb-1">Elsewhere</span>
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)]">
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)]">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)]">
              <Mail className="h-4 w-4" /> Email
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-[var(--border)] pt-8 sm:flex-row">
          <p className="text-sm text-[var(--text-faint)]">
            © {year} Jyotirmay Khare. Built by hand with React & TypeScript.
          </p>
          <button
            type="button"
            onClick={scrollTop}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
            aria-label="Back to top"
          >
            Back to top <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </Container>
    </footer>
  );
}
