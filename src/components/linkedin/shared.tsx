import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Confidence } from "@/types";

/** Confidence dot + optional label. Rendered only where provenance matters. */
const TONE: Record<Confidence, string> = {
  verified: "bg-emerald-400",
  publicly_discovered: "bg-sky-400",
  user_provided: "bg-violet-400",
  derived: "bg-amber-400",
  unavailable: "bg-zinc-500",
};

export function ConfidenceDot({
  confidence,
  label,
  className,
}: {
  confidence: Confidence;
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-mono-tag text-[10px] uppercase tracking-[0.12em] text-[var(--text-faint)]",
        className
      )}
      title={`Source confidence: ${confidence}`}
    >
      <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", TONE[confidence])} aria-hidden="true" />
      {label ?? confidence.replace(/_/g, " ")}
    </span>
  );
}

/** Shown only where a value genuinely needs the owner's input. */
export function NeedsInput({ children }: { children?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-[var(--border-strong)] px-2.5 py-0.5 font-mono-tag text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
      {children ?? "Requires manual input"}
    </span>
  );
}

/** Honest empty state for any collection that could not be confirmed. */
export function UnavailablePanel({
  title,
  note,
  compact = false,
}: {
  title: string;
  note: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-dashed border-[var(--border-strong)] bg-transparent",
        compact ? "p-4" : "p-6"
      )}
    >
      <p className="caption-label">{title}</p>
      <p className={cn("leading-relaxed text-[var(--text-muted)]", compact ? "mt-2 text-[13px]" : "mt-3 text-sm")}>
        {note}
      </p>
      {!compact && (
        <div className="mt-4">
          <NeedsInput />
        </div>
      )}
    </div>
  );
}

/** Accessible modal shell matching the site's dark glass language. */
interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  labelledBy?: string;
  className?: string;
}

export function Modal({ open, onClose, children, labelledBy, className }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => panelRef.current?.focus());
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      onClick={onClose}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        className={cn(
          "relative mt-[6vh] w-full max-w-2xl rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] shadow-[var(--shadow-2)] outline-none",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-lg text-[var(--text-muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--text)]"
          aria-label="Close"
        >
          <X className="h-4.5 w-4.5" />
        </button>
        {children}
      </div>
    </div>
  );
}
