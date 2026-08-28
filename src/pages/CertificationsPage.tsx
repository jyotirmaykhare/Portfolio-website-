import { BadgeCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CertificationVault } from "@/components/linkedin/CertificationVault";
import "@/styles/lab.css";

/**
 * /certifications — dedicated proof-of-work page, themed in the site's
 * "aurora console" language: deep-space canvas, drifting accent auroras,
 * and a blueprint grid fading from the hero. The vault below renders the
 * credential grid + detail modals.
 */
export function CertificationsPage() {
  return (
    <div className="lab-page-shell">
      {/* drifting auroras */}
      <div
        aria-hidden="true"
        className="lab-aurora pointer-events-none absolute -top-32 left-[8%] h-80 w-80 rounded-full bg-[#0a66c2]/25 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="lab-aurora pointer-events-none absolute right-[4%] top-40 h-96 w-96 rounded-full bg-[#a78bfa]/15 blur-[140px]"
        style={{ animationDelay: "-8s" }}
      />

      <header className="relative border-b border-[var(--border)]">
        <Container className="py-20 lg:py-28">
          <Reveal>
            <p className="overline-label inline-flex items-center gap-2 text-[var(--accent)]">
              <BadgeCheck className="h-4 w-4" aria-hidden="true" />
              Certifications
            </p>
            <h1 className="type-hero mt-6 max-w-4xl text-[var(--text)]">
              Proof of <span className="text-gradient">work</span>, not promises.
            </h1>
            <p className="mt-7 max-w-2xl text-[length:var(--font-body-lg)] leading-[1.65] text-[var(--text-muted)]">
              Hackathons and MOOCs I've completed — each entry can be checked two
              ways: view the certificate image itself, or follow its verification
              link to the issuer. Where an issuer page is login-walled, it says so
              instead of pretending.
            </p>
          </Reveal>
        </Container>
      </header>

      <CertificationVault />
    </div>
  );
}
