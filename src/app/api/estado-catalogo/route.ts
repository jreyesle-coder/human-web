import { listarProductos } from "@/lib/woo";

/**
 * Diagnóstico: ¿este despliegue lee el catálogo real? Responde cuántos productos ve y de dónde.
 * No expone datos personales ni credenciales (la Store API es pública).
 */
export async function GET() {
  const r = await listarProductos();
  const origen = (
    process.env.WOO_STORE_API_URL || "https://humanstores.com/wp-json/wc/store/v1"
  ).replace(/^https?:\/\/([^/]+).*$/, "$1");
  return Response.json(
    r.ok
      ? {
          ok: true,
          origen,
          productos: r.datos.length,
          enExistencia: r.datos.filter((p) => p.enExistencia).length,
        }
      : { ok: false, origen, error: r.error },
    { status: r.ok ? 200 : 503 },
  );
}
