# Stack y registro de decisiones

Cada decisión técnica de peso se registra aquí. Formato: contexto, decisión, alternativas, consecuencias.

---

## D-001 · Un solo sitio, no tres

**Contexto.** El grupo tiene tres unidades. La tentación es un sitio por unidad.

**Decisión.** Un solo dominio, una marca paraguas, tres rutas de entrada.

**Alternativas.** Tres sitios independientes; subdominios por unidad.

**Consecuencias.** El recorrido Evaluación → Protocolo → Entrenamiento + Suplementación queda intacto. La confianza se construye una vez y no tres. A cambio, la navegación tiene que trabajar más para que el visitante no se pierda entre las unidades.

---

## D-002 · Next.js App Router + TypeScript + Tailwind

**Contexto.** Sitio de contenido con comercio, prioridad en móvil y en posicionamiento.

**Decisión.** Next.js 15+ con App Router, TypeScript estricto, Tailwind con tokens CSS.

**Alternativas.** Astro (excelente para contenido, más fricción para carrito y estado); WordPress rediseñado (mantiene el problema actual); Shopify Hydrogen (ata todo al comercio y el 70% del sitio no es tienda).

**Consecuencias.** Renderizado de servidor y estático para las páginas de contenido, cliente solo donde hace falta. Despliegue en Vercel con preview por rama.

---

## D-003 · WooCommerce headless de solo lectura, checkout en Woo

**Contexto.** La tienda actual corre en WooCommerce y **ya tiene pasarela de pago funcionando con verificación 3D Secure**. En República Dominicana, integrar una pasarela local es el punto más lento y riesgoso de cualquier proyecto de comercio.

**Decisión.** El frontend nuevo consume el catálogo vía **WooCommerce Store API** (solo lectura: productos, categorías, etiquetas, precios, existencias). El **checkout se entrega a WooCommerce** mediante handoff del carrito. No se reimplementa el pago.

**Alternativas.**
- Rehacer la tienda completa en Shopify o Medusa — obliga a re-integrar la pasarela, re-certificar 3D Secure y migrar historial. Alto riesgo, poco retorno en esta etapa.
- Dejar la tienda tal como está en otro dominio — rompe la marca y el recorrido.

**Consecuencias.** El salto visual entre catálogo y pago hay que mitigarlo: el checkout de Woo se personaliza con los colores y el logotipo del sistema nuevo. Queda como deuda técnica declarada, revisable en una fase posterior.

**Riesgo a vigilar.** Si la Store API está deshabilitada o el tema actual la interfiere, el Sprint 6 se bloquea. **Verificar disponibilidad en el Sprint 0, antes que nada.**

---

## D-004 · Contenido en MDX, no CMS

**Contexto.** El cliente no tiene equipo editorial. El volumen de contenido es moderado y cambia poco.

**Decisión.** MDX versionado en el repositorio.

**Alternativas.** Sanity o Payload (mejor para equipos que publican a diario; sobredimensionado aquí y agrega un costo mensual más).

**Consecuencias.** Publicar requiere un commit. Si el cliente empieza a publicar con frecuencia semanal, se reevalúa.

---

## D-005 · Next.js 16 con Cache Components

**Contexto.** El plan pedía Next.js 15+. Al iniciar el repositorio (S0-06, 2026-10-10) la versión estable es la 16.4.

**Decisión.** Next.js 16.4 con `cacheComponents` y `partialPrefetching` activos (valores por defecto del generador), React 19.3, Tailwind 4, TypeScript estricto con `noUncheckedIndexedAccess`.

**Alternativas.** Fijar Next 15 (menos cambios respecto a la documentación pública, pero arranca un proyecto nuevo con una versión ya superada).

**Consecuencias.** Esta versión cambió APIs: antes de usar una función de Next, consultar `node_modules/next/dist/docs/` (lo pide `AGENTS.md`). `pnpm typecheck` corre `next typegen` primero para generar los tipos de rutas (`LayoutProps`, `PageProps`).

---

## D-006 · Contenido: frontmatter con gray-matter + Zod, cuerpo con @next/mdx

**Contexto.** S0-15 a S0-17 piden MDX con frontmatter validado y reglas de visibilidad.

**Decisión.** `src/lib/content` lee `content/<colección>/*.mdx`, valida el frontmatter con Zod (un archivo inválido rompe el build con su ruta) y filtra: en producción solo `published`; en historias, solo `autorizacion: true`, en cualquier entorno. El cuerpo lo compila `@next/mdx` con `remark-frontmatter` para que el YAML no aparezca en la página. Los archivos se importan con el alias `@content/*`.

**“Producción”** es `VERCEL_ENV=production` en Vercel; los previews por rama muestran borradores y no se indexan (`robots` bloquea todo y las páginas llevan `noindex`). Fuera de Vercel, cualquier build de producción.

**Alternativas.** Contentlayer (abandonado); next-mdx-remote (otra capa más para el mismo resultado).

---

## D-007 · Registro de dependencias

| Paquete | Uso | Razón |
|---|---|---|
| `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx` | Compilar MDX | Soporte oficial de Next para MDX en Server Components |
| `remark-frontmatter` | Quitar el YAML del cuerpo | `@next/mdx` no maneja frontmatter |
| `gray-matter` | Leer el frontmatter | Estándar, sin dependencias de compilación |
| `zod` | Validación de frontmatter y formularios | Exigido por el stack |
| `prettier`, `prettier-plugin-tailwindcss`, `eslint-config-prettier` | Formato | S0-07; el plugin ordena clases de Tailwind |
| `vitest`, `@vitejs/plugin-react`, `jsdom`, `@testing-library/react`, `@testing-library/dom` | Pruebas unitarias | S0-11; jsdom solo en pruebas de componentes |
| `@playwright/test` | Pruebas de extremo a extremo | S0-11; corre en móvil (Pixel 7) y escritorio |
| `@axe-core/playwright` | Auditoría de accesibilidad automatizada | S1-20; corre en CI sobre las rutas clave |

Tipografías provisionales con `next/font` (sin dependencia nueva): Inter Tight para títulos e Inter para texto, ambas de la lista de candidatas. La elección final es del Sprint 1.

---

## D-008 · El sitio solo es "producción" cuando se lanza

**Contexto.** El despliegue de producción de Vercel sirve hoy como sitio de presentación para el cliente. Con la regla original (producción = Vercel production), ese despliegue ocultaría los borradores y, desde S2-16, un `{{PENDIENTE}}` rompería el build.

**Decisión.** `isProduction()` es verdadero solo con la variable `HUMAN_LANZAMIENTO=si`. Sin ella, cualquier despliegue es de presentación: muestra borradores y pendientes, `robots.txt` bloquea todo y las páginas llevan `noindex`.

**Alternativas.** Usar `VERCEL_ENV` (obliga a trabajar en ramas para mostrar avances y deja vacía la URL principal); una bandera inversa de "demo" (si se olvida en el lanzamiento, se publicarían borradores).

**Consecuencias.** El día del lanzamiento hay que definir `HUMAN_LANZAMIENTO=si` en Vercel (Sprint 8). Si se olvida, el sitio sigue sin indexarse: es el error seguro.

---

## D-009 · Ámbar oscurecido para cumplir AA

**Contexto.** El ámbar propuesto `#B06B2C` da 4,21:1 con texto blanco y 3,74:1 sobre hueso. No cumple AA (4,5:1), y el ámbar es el color de todos los llamados a la acción.

**Decisión.** `--color-amber: #965821` (5,65:1 con blanco; 5,02:1 sobre hueso) y `--color-amber-strong: #7A4719` para hover. Mismo tono, más profundo. `--color-stone` pasa de `#6B6B6B` a `#5F5F5F` para cumplir también sobre `mist`.

**Alternativas.** Texto negro sobre ámbar (cumple, pero el botón pierde fuerza); ámbar solo en texto grande (no sirve para botones de 16 px).

**Consecuencias.** `scripts/contraste.mjs` verifica 26 pares en cada build y en las pruebas. Si P-002 trae otra paleta, el build dirá qué pares no cumplen.

---

## D-010 · Tipografías: Archivo + Source Sans 3

**Contexto.** S1-03 pide elegir una display (Archivo, Söhne, Neue Haas Grotesk, Inter Tight) y una de texto (Inter, Source Sans 3, IBM Plex Sans).

**Decisión.** **Archivo** para títulos (500–800) y **Source Sans 3** para texto (400 y 600), servidas por `next/font` sin dependencia nueva.

**Alternativas.** Söhne y Neue Haas son de pago. Inter Tight + Inter quedaban demasiado parecidas entre sí. Source Sans 3 es humanista, como pide el sistema, y rinde bien a 16 px.

**Consecuencias.** El subset `latin` cubre tildes y ñ en todos los pesos (verificado en `/ui`). Si el manual de identidad (P-002) define otras tipografías, se cambian en `src/app/layout.tsx`.

---

## D-011 · Contenido cacheado por build y rutas nunca vacías

**Contexto.** Con Cache Components, leer archivos durante el prerender cuenta como dato no cacheado y rompe el build. Además, toda ruta dinámica debe generar al menos un parámetro.

**Decisión.** El cargador de `src/lib/content` usa `"use cache"`: el contenido solo cambia con un despliegue. Si una colección no tiene nada visible (por ejemplo, historias sin autorización), `slugsDe()` devuelve el slug `sin-contenido`, que responde 404.

**Alternativas.** `export const instant = false` en cada ruta (renderizado bloqueante, más lento para el visitante).

**Consecuencias.** Las páginas de contenido se sirven estáticas. Un MDX nuevo exige un despliegue, igual que ya establecía D-004.

**Ajuste (Sprint 3).** Se desactivó `partialPrefetching`, que venía activo en el proyecto generado. Con esa opción, una URL no listada (por ejemplo, `/historias/inventada`) se servía con el esqueleto ya enviado y respondía 200 aunque mostrara la página de error: un "soft 404" que perjudica el posicionamiento. Sin ella, `notFound()` responde un 404 real. Verificado con historias, motivos, protocolos y pasos del método.

---

## Pendientes — bloquean el arranque

Estas tres se cierran en el Sprint 0. No las resuelvas por tu cuenta.

### P-001 · Dominio
¿El ecosistema vive en `humanstores.com`, en un dominio nuevo de marca, o en una estructura con subrutas? Afecta directamente el posicionamiento acumulado de la tienda y el plan de redirecciones del Sprint 7.

### P-002 · Manual de identidad
¿Existe un manual de marca formal con colores, tipografías y usos del logotipo? Si existe, reemplaza la paleta propuesta en `docs/02-sistema-diseno.md`.

### P-003 · Alcance de Human Balance
¿La sección incluye reserva de clases con cupos en línea, o solo solicitud de clase de prueba? La primera opción agrega un sprint completo y probablemente un sistema de reservas externo.

---

## Verificaciones técnicas del Sprint 0

Ejecutadas el 2026-10-10 desde fuera (sin credenciales), contra `https://humanstores.com`.

- [x] **¿WooCommerce Store API responde?** Sí. `GET /wp-json/wc/store/v1/products` → **200**, `X-WP-Total: 46`, una sola página con `per_page=100`. Expone nombre, precios (DOP en centavos), existencias, imágenes, categorías, SKU y permalink. CORS expone `Cart-Token`, lo que habilita el handoff de carrito. **D-003 se sostiene.**
- [x] **¿Qué pasarela está configurada?** `GET /wp-json/wc/store/v1/cart` → `payment_methods: ["e_commerce_azul"]`: **AZUL** (Banco Popular Dominicano), única pasarela activa, moneda DOP. El plugin de Stripe (`wc-stripe/v1`) está instalado pero no ofrecido en el checkout. Confirmar con el cliente que AZUL tiene 3D Secure activo.
- [x] **¿Cuántos productos activos y con descripción completa?** 46 publicados; 45 con imagen; solo 3 con descripción larga (el texto vive en la descripción corta). Detalle en `docs/inventario-catalogo.md`.
- [ ] **¿Hay acceso administrativo a WordPress, al hosting y al DNS?** No verificable desde fuera. Hosting y DNS en **SiteGround** (`ns1/ns2.siteground.net`, IP 35.209.173.76). Bloqueo B-004 sigue abierto.
- [x] **¿Dónde está registrado el dominio?** **GoDaddy** (creado 2023-09-27, vence 2028-09-27). Falta saber qué cuenta lo controla (B-004).
- [ ] **¿Existe cuenta de analítica?** La portada no carga Google Analytics/GTM ni píxel de Meta. Hay Jetpack Stats y WooCommerce Analytics en el servidor. Preguntar al cliente (B-004).

Otros hallazgos útiles: sitio en Elementor, SEO con Yoast (sitemap en `/sitemap_index.xml`), Wordfence, WP Fusion (sugiere un CRM conectado — preguntar cuál), y el plugin All-in-One WP Migration instalado. Rutas vivas en `docs/rutas-actuales.csv` (125 URLs).

---

## Variables de entorno

Documentar toda nueva en `.env.example` con valor vacío y comentario.

```
NEXT_PUBLIC_SITE_URL=
WOO_STORE_API_URL=
WOO_CHECKOUT_URL=
RESEND_API_KEY=
LEAD_NOTIFICATION_EMAIL=
NEXT_PUBLIC_WHATSAPP_VENTAS=
NEXT_PUBLIC_WHATSAPP_CONSULTORIO=
NEXT_PUBLIC_WHATSAPP_ENTRENAMIENTO=
NEXT_PUBLIC_ANALYTICS_ID=
TURNSTILE_SECRET_KEY=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
```

**Ninguna credencial real entra al repositorio.** Nunca.
