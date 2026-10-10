"use client";

import { createContext, type ReactNode, useCallback, useContext, useState } from "react";
import { cn } from "@/lib/cn";

type ToastTone = "neutral" | "success" | "error";
type ToastItem = { id: number; message: string; tone: ToastTone };

const ToastContext = createContext<(message: string, tone?: ToastTone) => void>(() => {});

export function useToast() {
  return useContext(ToastContext);
}

const tones: Record<ToastTone, string> = {
  neutral: "bg-ink text-bone",
  success: "bg-success-soft text-success border-2 border-success",
  error: "bg-error-soft text-error border-2 border-error",
};

const icon: Record<ToastTone, string> = {
  neutral: "•",
  success: "✓",
  error: "✕",
};

/** Avisos breves. La región aria-live existe siempre para que los lectores de pantalla los anuncien. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const show = useCallback((message: string, tone: ToastTone = "neutral") => {
    const id = Date.now() + Math.random();
    setItems((prev) => [...prev, { id, message, tone }]);
    setTimeout(() => setItems((prev) => prev.filter((t) => t.id !== id)), 5000);
  }, []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-[calc(var(--bottom-bar)+1rem)] z-50 flex flex-col items-center gap-2 px-gutter lg:bottom-6"
      >
        {items.map((t) => (
          <div
            key={t.id}
            className={cn(
              "pointer-events-auto flex w-full max-w-form items-center gap-3 rounded-md px-4 py-3 font-semibold shadow-float",
              tones[t.tone],
            )}
          >
            <span aria-hidden="true">{icon[t.tone]}</span>
            <span className="flex-1">{t.message}</span>
            <button
              type="button"
              onClick={() => setItems((prev) => prev.filter((x) => x.id !== t.id))}
              className="inline-flex min-h-tap min-w-tap items-center justify-center rounded-md"
            >
              <span aria-hidden="true">✕</span>
              <span className="sr-only">Cerrar aviso</span>
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("animate-pulse rounded-md bg-mist", className)} />;
}
