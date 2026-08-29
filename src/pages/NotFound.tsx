import { Link } from "react-router-dom";
import { ArrowLeft, Compass } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Seo } from "@/components/Seo";

export function NotFoundPage() {
  return (
    <div className="section-pad">
      <Seo
        title="Page not found | Jyotirmay Khare"
        description="The route you're looking for doesn't exist. Head back to the portfolio home page or explore the projects."
        noindex
      />
      <Reveal>
      <Container className="max-w-2xl text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)]">
          <Compass className="h-7 w-7 text-[var(--accent)]" aria-hidden />
        </div>
        <p className="mt-8 font-mono-tag text-[13px] uppercase tracking-widest text-[var(--text-faint)]">
          404 — route not found
        </p>
        <h1 className="mt-4 font-display text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-tight text-[var(--text)]">
          This page wandered off the map.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-[16px] leading-relaxed text-[var(--text-muted)]">
          The route you’re looking for doesn’t exist. Let’s get you back to something real.
        </p>
        <div className="mt-9 flex justify-center">
          <Button as="link" to="/">
            <ArrowLeft className="h-4 w-4" aria-hidden /> Back to home
          </Button>
        </div>
        <div className="mt-6">
          <Link to="/projects" className="text-[15px] font-medium text-[var(--text-muted)] hover:text-[var(--accent)]">
            or explore the projects
          </Link>
        </div>
      </Container>
      </Reveal>
    </div>
  );
}
