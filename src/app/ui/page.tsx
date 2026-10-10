import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catálogo de componentes",
  robots: { index: false, follow: false },
};

// Reservada para el catálogo de componentes del Sprint 1.
export default function UiCatalog() {
  return (
    <main className="mx-auto w-full max-w-content flex-1 px-gutter py-16">
      <h1 className="font-display text-h1 font-bold">
        Catálogo de componentes
      </h1>
      <p className="mt-4 text-body text-stone">Se llena en el Sprint 1.</p>
    </main>
  );
}
