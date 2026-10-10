"use client";

import { ErrorScreen } from "@/components/ui/ErrorScreen";
import "./globals.css";

// Reemplaza al layout raíz cuando este falla: debe traer su propio <html> y estilos.
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="es-DO">
      <body className="flex min-h-dvh flex-col">
        <title>Error · HUMAN</title>
        <ErrorScreen onRetry={reset} />
      </body>
    </html>
  );
}
