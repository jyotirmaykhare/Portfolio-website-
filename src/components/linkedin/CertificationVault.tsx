import { useState } from "react";
import { BadgeCheck, CalendarDays, ExternalLink, Fingerprint, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Modal, NeedsInput } from "@/components/linkedin/shared";
import { certifications, certificationsMeta } from "@/data/linkedin";
import type { Certification } from "@/types";

const fmt = (iso: string | null) =>
  iso ? new Date(iso + (iso.length === 7 ? "-01" : "")).toLocaleDateString("en-US", { year: "numeric", month: "short" }) : null;

export function CertificationVault() {
  const [active, setActive] = useState<Certification | null>(null);

  return (
    <section id="certifications" className="section-band border-b border-[var(--border)]">
      <Container className="py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Certification vault"
            title={
              <>
                Credentials on <span className="text-gradient">record</span>
              </>
            }
            description="Each credential keeps its issuer, dates, ID and verification link together so nothing is paraphrased or guessed."
          />
        </Reveal>

        <div className="mt-10">
          {certifications.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {certifications.map((c) => (
                <CertCard key={c.name} cert={c} onOpen={() => setActive(c)} />
              ))}
            </div>
          ) : (
            <NeedsInput>Certification vault unavailable</NeedsInput>
          )}
          {!certificationsMeta.available && (
            <p className="mt-4 max-w-3xl font-mono-tag text-[11px] leading-relaxed text-[var(--text-faint)]">
              {certificationsMeta.note}
            </p>
          )}
        </div>
      </Container>

      <Modal open={active !== null} onClose={() => setActive(null)} labelledBy="cert-modal-title">
        {active && <CertDetail cert={active} />}
      </Modal>
    </section>
  );
}

function CertCard({ cert, onOpen }: { cert: Certification; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`glass card-lift group flex h-full flex-col rounded-2xl p-6 text-left ${
        cert.featured ? "border border-[var(--accent)] shadow-[0_0_0_1px_var(--accent)]" : ""
      }`}
      aria-haspopup="dialog"
    >
      <div className="flex items-start justify-between gap-3">
        <BadgeCheck className="h-5 w-5 text-[var(--accent)]" aria-hidden="true" />
        {cert.featured && (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--accent-fill)] px-2.5 py-0.5 font-mono-tag text-[10px] uppercase tracking-[0.12em] text-white">
            <Sparkles className="h-3 w-3" aria-hidden="true" /> Featured
          </span>
        )}
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-[var(--text)]">{cert.name}</h3>
      <p className="mt-1 text-sm text-[var(--text-muted)]">{cert.issuer}</p>
      {(cert.issueDate || cert.expiryDate) && (
        <p className="mt-4 font-mono-tag text-[11px] uppercase tracking-wider text-[var(--text-faint)]">
          {[fmt(cert.issueDate), cert.expiryDate ? `→ ${fmt(cert.expiryDate)}` : "No expiry"].filter(Boolean).join(" ")}
        </p>
      )}
      <span className="mt-auto pt-5 text-[13px] font-medium text-[var(--accent)]">View credential</span>
    </button>
  );
}

function CertDetail({ cert }: { cert: Certification }) {
  const issued = fmt(cert.issueDate);
  const expires = fmt(cert.expiryDate);
  const hasDetails = Boolean(issued || expires || cert.credentialId);
  return (
    <div className="p-6 sm:p-8">
      <p id="cert-modal-title" className="overline-label">
        Credential detail
      </p>
      <h3 className="type-h3 mt-4 pr-10 text-[var(--text)]">{cert.name}</h3>
      <p className="mt-1 text-sm text-[var(--text-muted)]">{cert.issuer}</p>

      {cert.image && (
        <img
          src={cert.image}
          alt={`${cert.name} badge`}
          loading="lazy"
          decoding="async"
          className="mt-6 max-h-56 rounded-xl border border-[var(--border)] object-contain"
        />
      )}

      {hasDetails && (
        <dl className="mt-6 space-y-3 text-sm">
          {issued && <Row label="Issued" value={issued} />}
          {expires && <Row label="Expires" value={expires} />}
          {cert.credentialId && <Row label="Credential ID" value={cert.credentialId} mono />}
        </dl>
      )}

      {cert.skills.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {cert.skills.map((s) => (
            <span key={s} className="tag-pill">{s}</span>
          ))}
        </div>
      )}

      {/* Proof method 1 — certificate image */}
      <div className="mt-8">
        <p className="caption-label">Method 1 · Certificate image</p>
        {cert.image ? (
          <a
            href={cert.image}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-[var(--accent-fill)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-fill-hover)]"
          >
            <CalendarDays className="h-4 w-4" aria-hidden="true" /> View full certificate image
          </a>
        ) : (
          <p className="mt-2 inline-flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <CalendarDays className="h-4 w-4" aria-hidden="true" /> Certificate image is not available currently.
          </p>
        )}
      </div>

      {/* Proof method 2 — online verification */}
      <div className="mt-5">
        <p className="caption-label">Method 2 · Online verification</p>
        {cert.credentialUrl && cert.verificationWorking !== false ? (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-[var(--accent-fill)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-fill-hover)]"
          >
            <Fingerprint className="h-4 w-4" aria-hidden="true" /> Verify credential
          </a>
        ) : (
          <p className="mt-2 inline-flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <ExternalLink className="h-4 w-4" aria-hidden="true" /> Verification link is not working currently.
          </p>
        )}
      </div>
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-[var(--border)] pb-2">
      <dt className="caption-label">{label}</dt>
      <dd className={mono ? "font-mono-tag text-[13px] text-[var(--text)]" : "text-[var(--text)]"}>{value}</dd>
    </div>
  );
}
