import Link from "next/link";
import { cn } from "@/lib/cn";

/** Logotipo provisional en texto. El archivo vectorial oficial está pendiente (backlog). HUMAN siempre en mayúsculas. */
export function Logo({ className, tone = "ink" }: { className?: string; tone?: "ink" | "bone" }) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex min-h-tap items-center font-display text-h3 font-extrabold tracking-[0.2em]",
        tone === "ink" ? "text-ink" : "text-bone",
        className,
      )}
    >
      HUMAN
      <span className="sr-only">, ir al inicio</span>
    </Link>
  );
}
