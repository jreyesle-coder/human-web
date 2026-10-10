import type { ReactNode } from "react";

/** Grupo legal: fondo de superficie para lectura larga. */
export default function LegalLayout({ children }: { children: ReactNode }) {
  return <div className="flex flex-1 flex-col bg-surface">{children}</div>;
}
