# Sprint 2 · Esqueleto de rutas y modelo de contenido

**Duración:** 2 semanas
**Objetivo:** que todas las rutas existan, naveguen y se indexen correctamente, aunque su contenido sea placeholder. Terminado este sprint, el sitio completo se puede recorrer.

## Por qué este sprint existe

Es el que más proyectos retrasa, porque se salta. Si el contenido se escribe mientras se construye cada página, el sitio se diseña alrededor de textos que después cambian. Aquí se fija la estructura y se expone, con nombre y apellido, todo lo que falta.

## Fuera de alcance

Diseño final de páginas, integración con WooCommerce, formularios funcionales.

## Tareas

### Rutas

- [ ] **S2-01** Crear todas las rutas de `docs/01-arquitectura-informacion.md`, cada una con su layout y un placeholder visible.
- [ ] **S2-02** Grupos de rutas `(marca)` y `(legal)` con sus layouts propios.
- [ ] **S2-03** Rutas dinámicas con `generateStaticParams`: método, motivos, evaluaciones, coaches, historias, protocolos, artículos.
- [ ] **S2-04** Navegación principal y pie conectados a rutas reales.
- [ ] **S2-05** Migas de pan automáticas por jerarquía de ruta.
- [ ] **S2-06** Barra inferior fija en móvil con las tres rutas y el carrito.

### Modelo de contenido

- [ ] **S2-07** Esquemas Zod del frontmatter de cada tipo de contenido. Frontmatter inválido rompe el build.
- [ ] **S2-08** Cargador de contenido con tipos inferidos desde los esquemas.
- [ ] **S2-09** Un archivo MDX de ejemplo por tipo, con `status: draft`, para validar el renderizado.
- [ ] **S2-10** Componentes MDX: encabezados, listas, citas, tablas, imágenes, llamados y bloque de advertencia.

### SEO base

- [ ] **S2-11** `generateMetadata` en toda ruta, con título y descripción propios.
- [ ] **S2-12** Imágenes Open Graph generadas dinámicamente con la marca.
- [ ] **S2-13** Datos estructurados: `Organization` y `LocalBusiness` en el layout raíz, `Person` en la página de Juan Carlos Simó.
- [ ] **S2-14** Sitemap alimentado desde las rutas reales y el contenido publicado.
- [ ] **S2-15** URLs canónicas en todas las páginas.

### Instrumentación de placeholders

- [ ] **S2-16** Componente `Pendiente` que renderiza `{{PENDIENTE: ...}}` de forma visible en desarrollo y preview, y **rompe el build en producción**.
- [ ] **S2-17** Script `pnpm pendientes` que recorre el repositorio y lista todo lo pendiente con su ruta. Exportar a `backlog.md`.
- [ ] **S2-18** Generar el inventario de contenido faltante y entregarlo al cliente como lista de materiales a producir, con responsable y fecha.

## Criterios de aceptación

- Toda ruta del mapa carga sin error y es alcanzable desde la navegación
- No hay enlaces rotos: verificado con un rastreador sobre el preview
- `pnpm pendientes` produce una lista completa y legible
- El build de producción falla si queda un `Pendiente` sin resolver — compruébalo a propósito una vez
- El sitemap incluye todas las rutas publicables y ninguna en borrador
