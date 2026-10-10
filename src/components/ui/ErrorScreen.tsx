import Link from "next/link";

type ErrorScreenProps = {
  onRetry: () => void;
};

export function ErrorScreen({ onRetry }: ErrorScreenProps) {
  return (
    <main className="mx-auto w-full max-w-content flex-1 px-gutter py-16">
      <p className="text-small font-semibold tracking-widest text-stone uppercase">Error 500</p>
      <h1 className="mt-2 font-display text-h1 font-bold">Algo salió mal de nuestro lado</h1>
      <p className="mt-4 max-w-reading text-body">
        No es algo que hayas hecho tú. Intenta de nuevo en unos segundos.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex min-h-tap items-center rounded-sm bg-ink px-6 font-semibold text-bone"
        >
          Intentar de nuevo
        </button>
        <Link
          href="/"
          className="inline-flex min-h-tap items-center rounded-sm border border-ink px-6 font-semibold"
        >
          Ir al inicio
        </Link>
      </div>
    </main>
  );
}
