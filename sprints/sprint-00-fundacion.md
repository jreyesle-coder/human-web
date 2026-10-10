# Sprint 0 · Fundación técnica

**Duración:** 1 semana
**Objetivo:** dejar el repositorio listo para construir y resolver las verificaciones que pueden invalidar el plan. Si la Store API no responde, el Sprint 6 cambia de forma y es mejor saberlo hoy.

## Fuera de alcance

Diseño visual, contenido, páginas. Aquí no se construye nada que el cliente vea.

## Tareas

### Verificación del activo existente — hacer primero

- [x] **S0-01** Probar `GET {WOO_STORE_API_URL}/wp-json/wc/store/v1/products` y documentar la respuesta en `docs/03-stack-y-decisiones.md`. Si falla, **detener y registrar bloqueo**: la decisión D-003 queda en entredicho.
- [x] **S0-02** Inventariar el catálogo: cantidad de productos activos, cuántos con descripción completa, cuántos con imagen. Guardar el resultado en `docs/inventario-catalogo.md`.
- [x] **S0-03** Documentar qué pasarela de pago está configurada y con qué proveedor.
- [x] **S0-04** Listar las rutas vivas del sitio actual (sitemap o rastreo) y guardarlas en `docs/rutas-actuales.csv`. Es la base del plan de redirecciones del Sprint 7.
- [ ] **S0-05** Confirmar accesos disponibles: WordPress, hosting, DNS, analítica. Lo que falte va a `backlog.md` como bloqueo.

### Repositorio

- [x] **S0-06** Inicializar Next.js 15 con App Router, TypeScript estricto y Tailwind.
- [x] **S0-07** Configurar ESLint, Prettier y `pnpm check` como script compuesto.
- [x] **S0-08** Crear la estructura de carpetas descrita en `CLAUDE.md`.
- [x] **S0-09** Crear `src/styles/tokens.css` con los tokens de `docs/02-sistema-diseno.md`. Valores provisionales hasta que se resuelva P-002.
- [x] **S0-10** Crear `.env.example` con todas las variables, sin valores.
- [x] **S0-11** Configurar Vitest y Playwright con una prueba trivial de cada uno que pase.
- [ ] **S0-12** CI en GitHub Actions: `pnpm check` + build en cada push. _Workflow escrito en `.github/workflows/ci.yml`; falta verlo correr en GitHub._
- [ ] **S0-13** Conectar el despliegue en Vercel con preview por rama. _Requiere el repositorio en GitHub._
- [x] **S0-14** Página `/ui` vacía, reservada para el catálogo de componentes del Sprint 1.

### Base de contenido

- [x] **S0-15** Configurar MDX con la estructura de `content/` y validación de frontmatter con Zod.
- [x] **S0-16** Implementar la regla de `status`: solo se renderiza `published` en producción.
- [x] **S0-17** Implementar la salvaguarda de historias: sin `autorizacion: true`, no se renderiza.

### Base técnica transversal

- [x] **S0-18** Layout raíz con metadatos por defecto, fuentes y tokens.
- [x] **S0-19** `robots.txt` y `sitemap.xml` generados dinámicamente.
- [x] **S0-20** Páginas de error 404 y 500 con la marca.
- [x] **S0-21** Componente `ImagePlaceholder` con dimensiones configurables.
- [x] **S0-22** Utilidad de enlaces a WhatsApp que lee los números de variables de entorno y agrega parámetro de origen.

## Criterios de aceptación

- `pnpm check` y `pnpm build` pasan en limpio
- El preview despliega y carga la página de inicio vacía
- CI corre en verde en un pull request de prueba
- Las verificaciones S0-01 a S0-05 están documentadas, incluso las que fallaron
- Los tres pendientes P-001, P-002 y P-003 están planteados al cliente por escrito

## Al cerrar

Actualizar `CLAUDE.md` con sprint activo S1 y registrar bloqueos en `backlog.md`.
