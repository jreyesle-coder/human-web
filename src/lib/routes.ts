import type { Miga } from "@/components/ui/Navigation";

/**
 * Mapa de rutas estáticas (docs/01-arquitectura-informacion.md). `indexable` decide si entra al sitemap.
 * Las rutas dinámicas salen del contenido y del catálogo.
 */
export const RUTAS: Record<string, { label: string; indexable: boolean }> = {
  "/": { label: "Inicio", indexable: true },
  "/metodo": { label: "Método", indexable: true },
  "/juan-carlos-simo": { label: "Juan Carlos Simó", indexable: true },
  "/historias": { label: "Historias", indexable: true },
  "/contenido": { label: "Contenido", indexable: true },
  "/contacto": { label: "Contacto", indexable: true },
  "/entrenar": { label: "Entrenar", indexable: true },
  "/entrenar/modalidades": { label: "Modalidades", indexable: true },
  "/entrenar/coaches": { label: "Coaches", indexable: true },
  "/entrenar/instalaciones": { label: "Instalaciones", indexable: true },
  "/entrenar/clase-de-prueba": { label: "Clase de prueba", indexable: true },
  "/entrenar/clase-de-prueba/gracias": { label: "Solicitud recibida", indexable: false },
  "/sanar": { label: "Sanar", indexable: true },
  "/sanar/evaluaciones": { label: "Evaluaciones", indexable: true },
  "/sanar/primera-consulta": { label: "Primera consulta", indexable: true },
  "/sanar/agendar": { label: "Agendar evaluación", indexable: true },
  "/sanar/agendar/gracias": { label: "Solicitud recibida", indexable: false },
  "/tienda": { label: "Tienda", indexable: true },
  "/tienda/protocolos": { label: "Protocolos", indexable: true },
  "/tienda/productos": { label: "Productos", indexable: true },
  "/tienda/omni": { label: "OMNI", indexable: true },
  "/tienda/carrito": { label: "Carrito", indexable: false },
  "/privacidad": { label: "Privacidad", indexable: true },
  "/terminos": { label: "Términos", indexable: true },
  "/politica-de-entrega": { label: "Política de entrega", indexable: true },
  "/politica-de-reembolsos": { label: "Política de reembolsos", indexable: true },
  "/aviso-legal": { label: "Aviso legal", indexable: true },
};

export const STATIC_ROUTES: readonly string[] = Object.entries(RUTAS)
  .filter(([, r]) => r.indexable)
  .map(([path]) => path);

/**
 * Migas de pan por jerarquía de ruta. Los tramos sin página propia (p. ej. /sanar/motivos) se saltan;
 * el último tramo usa `actual` si es una página de contenido.
 */
export function migasPara(path: string, actual?: string): Miga[] {
  const tramos = path.split("/").filter(Boolean);
  const migas: Miga[] = [{ label: "Inicio", href: "/" }];
  tramos.forEach((_, i) => {
    const href = `/${tramos.slice(0, i + 1).join("/")}`;
    const ultimo = i === tramos.length - 1;
    const label = ultimo && actual ? actual : RUTAS[href]?.label;
    if (label) migas.push({ label, href });
  });
  return migas;
}
