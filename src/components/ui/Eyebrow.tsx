import { cn } from "@/lib/utils";

/** Small monospaced overline label used above headings */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("overline-label inline-flex items-center gap-2", className)}>
      <span aria-hidden="true" className="h-px w-6 bg-current opacity-60" />
      {children}
    </span>
  );
}
