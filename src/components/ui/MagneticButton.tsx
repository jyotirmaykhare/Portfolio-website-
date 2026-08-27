import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { useMagnetic } from "@/hooks/useMagnetic";

interface MagneticButtonProps {
  as: "a" | "link" | "button";
  href?: string;
  to?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: ReactNode;
}

/**
 * A `Button` wrapped in magnetic behavior — the wrapper drifts a few pixels
 * toward the pointer and springs back on leave. Only for the few important
 * CTAs (View/GitHub/LinkedIn/Contact), never every button. Touch and
 * reduced-motion safely fall through to the plain button.
 */
export function MagneticButton({
  as,
  href = "",
  to = "",
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  children,
}: MagneticButtonProps) {
  const ref = useMagnetic<HTMLSpanElement>({ strength: 6 });
  const common = { variant, size, className };

  return (
    <span ref={ref} className="inline-flex will-change-transform">
      {as === "a" ? (
        <Button as="a" href={href} {...common}>{children}</Button>
      ) : as === "link" ? (
        <Button as="link" to={to} {...common}>{children}</Button>
      ) : (
        <Button as="button" type="button" onClick={onClick} {...common}>{children}</Button>
      )}
    </span>
  );
}