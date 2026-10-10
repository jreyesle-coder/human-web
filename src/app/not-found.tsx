import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-content flex-1 px-gutter py-16">
      <p className="text-small font-semibold tracking-widest text-stone uppercase">
        Error 404
      </p>
      <h1 className="mt-2 font-display text-h1 font-bold">
        Esta página no existe
      </h1>
      <p className="mt-4 max-w-reading text-body">
        Puede que la dirección haya cambiado o que el enlace esté incompleto.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-tap items-center rounded-sm bg-ink px-6 font-semibold text-bone"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
