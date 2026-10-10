# Resumen de la corrida S1–S6

Fecha: 2026-10-10. Ejecutada de corrido, con un commit y un despliegue en Vercel por sprint.

## Estado general

| Sprint | Resultado | Tareas cerradas | Abiertas | Commit |
|---|---|---|---|---|
| S0 · Fundación | Cerrado salvo accesos | 21 / 22 | S0-05 accesos (cliente) | `a82e5f5` y siguientes |
| S1 · Sistema de diseño | Cerrado | 19 / 21 | S1-01 manual de identidad (cliente) · S1-21 revisión en teléfono (Julio) | `66a218c` |
| S2 · Esqueleto | Cerrado | 18 / 18 | — | `20bd287` |
| S3 · Núcleo de marca | Cerrado con pendientes | 22 / 25 | S3-16 enlaces de prensa (cliente) · S3-24 imágenes (cliente) · S3-25 medición 4G en Vercel | `70ac04a` |
| S4 · Entrenar | Cerrado con pendientes | 17 / 19 | S4-11 y S4-12 correos reales (Resend) | `f730aa6` |
| S5 · Sanar | Cerrado con pendientes | 22 / 23 | S5-15 correos reales (Resend) | `10bebf9` |
| S6 · Tienda | Cerrado con pendientes | 27 / 28 | S6-21 reseñas (no existen en la tienda actual) | `b26163b` |

**Verificación:** 57 pruebas unitarias y 52 de navegador (móvil y escritorio), incluida la auditoría de accesibilidad axe en 40 rutas, un rastreador de enlaces rotos y los flujos completos de clase de prueba, evaluación y carrito. Todas en verde en local y en GitHub Actions.

## Qué se construyó

- **Sistema de diseño:** paleta con contraste AA verificado en cada build (26 pares), tipografías Archivo y Source Sans 3, 17 primitivos y 15 bloques, catálogo en `/ui`.
- **Todas las rutas del mapa:** 62 páginas de contenido, más 45 fichas de producto generadas desde el catálogo real.
- **Portada y método:** las tres puertas, Eliminar · Reparar · Liberar con navegación por pasos y la página de Juan Carlos Simó con datos estructurados.
- **Entrenar:** propuesta de Human Balance, modalidades, coaches, instalaciones y el flujo completo de clase de prueba.
- **Sanar:** navegación por motivo, seis motivos, evaluaciones (OligoScan), primera consulta, agendamiento sin datos clínicos y aviso de privacidad del consultorio.
- **Tienda:** catálogo real de WooCommerce (46 productos), cinco protocolos agregables en un paso, filtros, buscador, fichas, OMNI, carrito con envío estimado y modo degradado si la tienda cae.
- **SEO:** metadatos propios por página, canónicas, imagen para compartir con la marca, sitemap sin borradores y datos estructurados (Organization, LocalBusiness, Person, Product, FAQPage, Article, BreadcrumbList).
- **Salvaguardas:** ningún `{{PENDIENTE}}` llega al lanzamiento (el build falla), ninguna historia sin autorización se publica y ningún dato personal viaja en la URL ni a la analítica.

## Decisiones tomadas en la corrida

D-008 a D-013 en `docs/03-stack-y-decisiones.md`. Las de mayor impacto:

- **D-008:** el sitio de Vercel es de presentación hasta que se defina `HUMAN_LANZAMIENTO=si`.
- **D-009:** el ámbar de los botones se oscureció a `#965821` porque el propuesto no cumplía contraste AA.
- **D-013:** los protocolos se arman con las etiquetas de WooCommerce; su calidad depende de que el cliente etiquete bien.

## Pendiente y quién lo tiene

### Cliente (HUMAN)

Lista completa con 44 piezas en `docs/materiales-pendientes.md`. Lo más crítico:

1. **Decisiones:** dominio (P-001), manual de identidad (P-002), alcance de Human Balance (P-003).
2. **Accesos:** WordPress, SiteGround, GoDaddy, analítica y el CRM conectado por WP Fusion (B-004).
3. **Textos de Juan Carlos Simó:** promesa de portada, método, motivos clínicos, OligoScan y narrativa de los protocolos.
4. **Fotografía real:** Juan Carlos Simó, coaches, instalaciones y entrenamiento.
5. **WooCommerce:** etiquetar los productos de cada protocolo, asignar la marca OMNI y cargar dosis, duración e ingredientes por producto.
6. **Contacto y legales:** WhatsApp por unidad, horarios, redes y las políticas vigentes.

### Julio

1. Abrir el sitio de Vercel en el teléfono y revisarlo (S1-21).
2. Crear la cuenta de Resend y cargar en Vercel `RESEND_API_KEY`, `RESEND_FROM` y `LEAD_NOTIFICATION_EMAIL` para probar los formularios con correo real.
3. Decidir cómo se comparte el sitio con HUMAN: hoy Vercel pide iniciar sesión para verlo.

### Técnico (siguiente fase)

1. **Sprint 7:** traspaso del carrito al pago de WooCommerce (AZUL), personalización del checkout, redirecciones desde `docs/rutas-actuales.csv` y migración de legales. Bloqueado por el dominio y los accesos.
2. **Sprint 8:** analítica, cabeceras de seguridad, rendimiento, manual de operación y lanzamiento.
3. Medir la carga de la portada en 4G (S3-25) cuando el despliegue sea accesible.
