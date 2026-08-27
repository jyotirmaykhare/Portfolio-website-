import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/** Page-width container with consistent gutters */
export function Container({ children, className }: ContainerProps) {
  return <div className={cn("container-page", className)}>{children}</div>;
}
