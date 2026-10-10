"use client";

import { type ReactNode, useEffect, useId, useRef } from "react";
import { cn } from "@/lib/cn";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  /** "center" para confirmaciones; "side" para paneles (carrito, menú). */
  placement?: "center" | "side";
  className?: string;
};

/**
 * Diálogo modal sobre <dialog>.showModal(): el navegador atrapa el foco, vuelve inerte el resto
 * de la página y cierra con Escape. Al cerrar, el foco regresa al elemento que lo abrió.
 */
export function Dialog({
  open,
  onClose,
  title,
  children,
  placement = "center",
  className,
}: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className={cn(
        "bg-surface text-ink shadow-float backdrop:bg-ink/60",
        placement === "center"
          ? "m-auto w-[calc(100%-2*var(--gutter))] max-w-form rounded-lg"
          : "my-0 mr-0 ml-auto h-dvh max-h-dvh w-full max-w-md",
        className,
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-4 border-b-2 border-line px-6 py-3">
          <h2 id={titleId} className="font-display text-h3 font-bold">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-tap min-w-tap items-center justify-center rounded-md text-h3 hover:bg-mist"
          >
            <span aria-hidden="true">✕</span>
            <span className="sr-only">Cerrar</span>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </dialog>
  );
}
