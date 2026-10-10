import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "link" | "inverse";
export type ButtonSize = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold transition-colors select-none disabled:cursor-not-allowed aria-disabled:cursor-not-allowed";

const variants: Record<ButtonVariant, string> = {
  // El ámbar solo significa acción (docs/02-sistema-diseno.md).
  primary:
    "rounded-md bg-amber text-surface hover:bg-amber-strong active:bg-amber-strong disabled:bg-line-strong",
  secondary:
    "rounded-md border-2 border-ink text-ink hover:bg-ink hover:text-bone active:bg-ink active:text-bone disabled:border-line-strong disabled:bg-transparent disabled:text-stone",
  ghost:
    "rounded-md text-ink hover:bg-mist active:bg-line disabled:bg-transparent disabled:text-stone",
  link: "min-h-tap text-ink underline decoration-2 underline-offset-4 hover:decoration-amber disabled:text-stone",
  inverse: "rounded-md bg-bone text-ink hover:bg-surface active:bg-mist",
};

const sizes: Record<ButtonSize, string> = {
  md: "min-h-tap px-5 text-body",
  lg: "min-h-12 px-7 text-body",
};

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="size-4 animate-spin rounded-pill border-2 border-current border-r-transparent"
    />
  );
}

type Comunes = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
};

export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md") {
  return cn(base, variants[variant], variant !== "link" && sizes[size]);
}

export type ButtonProps = Comunes & { loading?: boolean } & Omit<
    ComponentProps<"button">,
    keyof Comunes
  >;

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(buttonClasses(variant, size), className)}
      {...rest}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
}

export type ButtonLinkProps = Comunes & Omit<ComponentProps<typeof Link>, keyof Comunes>;

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link className={cn(buttonClasses(variant, size), className)} {...rest}>
      {children}
    </Link>
  );
}
