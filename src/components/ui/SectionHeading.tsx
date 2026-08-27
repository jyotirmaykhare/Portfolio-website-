import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Eyebrow";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "right";
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "right" && "ml-auto text-right", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Tag className="type-h2 mt-5 text-[var(--text)]">{title}</Tag>
      {description && (
        <p className="mt-6 text-[length:var(--font-body-lg)] leading-[1.65] text-[var(--text-muted)]">
          {description}
        </p>
      )}
    </div>
  );
}
