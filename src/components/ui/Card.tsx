import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = {
  children: ReactNode;
  /** Si existe, toda la tarjeta es un enlace (área táctil completa). */
  href?: string;
  tone?: "surface" | "bone" | "functional" | "ink";
  className?: string;
};

const tones = {
  surface: "bg-surface text-ink",
  bone: "bg-bone text-ink border border-line",
  functional: "bg-functional text-surface",
  ink: "bg-ink text-bone",
};

export function Card({ children, href, tone = "surface", className }: CardProps) {
  const clases = cn("block rounded-lg p-6 shadow-card", tones[tone], className);
  if (href) {
    return (
      <Link
        href={href}
        className={cn(clases, "transition-transform hover:-translate-y-0.5 active:translate-y-0")}
      >
        {children}
      </Link>
    );
  }
  return <div className={clases}>{children}</div>;
}

type BadgeProps = {
  children: ReactNode;
  tone?: "neutral" | "functional" | "success" | "warning" | "error" | "pending";
  className?: string;
};

const badgeTones = {
  neutral: "bg-mist text-ink",
  functional: "bg-functional-soft text-functional",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  error: "bg-error-soft text-error",
  pending: "border border-dashed border-line-strong bg-surface text-stone",
};

export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-3 py-1 text-small font-semibold",
        badgeTones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
