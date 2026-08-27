import { BadgeCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { CertificationVault } from "@/components/linkedin/CertificationVault";

/**
 * /certifications — dedicated proof-of-work page. The vault component renders
 * the full grid + detail modals; the intro strip above gives the page its own
 * framing (different summary style than the LinkedIn archive).
 */
export function CertificationsPage() {
  return (
    <div>
      <header className="border-b border-[var(--border)]">
        <Container className="py-20 lg:py-24">
          <Reveal>
            <Eyebrow>Certifications</Eyebrow>
            <h1 className="mt-6 max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.02] tracking-[-0.025em] text-[var(--text)]">
              Proof of <span className="text-gradient">work</span>, not promises.
            </h1>
            <p className="mt-6 max-w-2xl text-[length:var(--font-body-lg)] leading-[1.65] text-[var(--text-muted)]">
              Hackathons and MOOCs I've completed — each entry can be checked two
              ways: view the certificate image itself, or follow its verification
              link to the issuer. Where an issuer page is login-walled, it says so
              instead of pretending.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono-tag text-[12px] uppercase tracking-wider text-[var(--text-faint)]">
              <span className="inline-flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-[var(--accent)]" aria-hidden />
                Image proof available where shown
              </span>
              <span className="inline-flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-[var(--accent)]" aria-hidden />
                Honest link status on every entry
              </span>
            </div>
          </Reveal>
        </Container>
      </header>

      <CertificationVault />
    </div>
  );
}
