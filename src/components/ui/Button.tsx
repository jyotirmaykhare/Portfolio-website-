import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 select-none whitespace-nowrap";
const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--accent-fill)] text-white hover:bg-[var(--accent-fill-hover)] shadow-[var(--shadow-1)]",
  secondary:
    "border border-[var(--border-strong)] text-[var(--text)] hover:border-[var(--text-muted)] hover:bg-[var(--surface)]",
  ghost: "text-[var(--text-muted)] hover:text-[var(--text)]",
};
const sizes = {
  sm: "h-9 px-4 text-sm rounded-full",
  md: "h-11 px-6 text-sm rounded-full",
  lg: "h-[52px] px-8 text-[15px] rounded-full",
};

interface BaseProps {
  variant?: ButtonVariant;
  size?: keyof typeof sizes;
  className?: string;
  children: ReactNode;
}

type ButtonProps = BaseProps &
  (
    | { as: "a"; href: string; target?: string; rel?: string }
    | { as: "link"; to: string }
    | { as?: "button"; onClick?: () => void; type?: "button" | "submit" | "reset" }
  );

/**
 * A polymorphic button that renders an anchor, router link or button.
 * External anchors open in a new tab with safe rel attributes.
 */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (props.as === "a") {
    const { href } = props;
    const isExternal = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
        {isExternal && <ArrowUpRight className="h-4 w-4" aria-hidden />}
      </a>
    );
  }

  if (props.as === "link") {
    const { to } = props;
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  const { type = "button" } = props;
  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
}
