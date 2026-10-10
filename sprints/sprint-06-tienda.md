# Sprint 6 · Tienda — catálogo y protocolos

**Duración:** 2 semanas
**Objetivo:** reorganizar la tienda alrededor del protocolo, que es como el negocio ya vende, y levantar la ficha de producto al estándar de las marcas líderes de suplementación.

## La ventaja que hay que aprovechar

El estándar internacional en suplementación es vender por protocolo y no por producto suelto: paquetes por objetivo, kits de inicio, educación de dosis y duración. **Este negocio ya vende así desde hace años** — Estrés y Sueño Crónico, Inmunidad, Fat Loss, Hígado, Requerimiento Diario. El sitio actual no lo refleja. No hay que inventar el modelo, solo mostrarlo.

En una categoría que el cliente ingiere, la confianza convierte más que el precio. Las señales de confianza no son decoración: son la palanca principal.

## Dependencia

Requiere S0-01 verificado. Si la Store API no responde, este sprint está bloqueado.

## Tareas

### Capa de datos

- [x] **S6-01** Cliente de WooCommerce Store API en `src/lib/woo/` con tipos propios, no los del API en crudo.
- [x] **S6-02** Funciones de catálogo: listar productos, obtener por slug, listar por etiqueta, listar categorías.
- [x] **S6-03** Caché con revalidación: productos cada 10 minutos, existencias en cada petición.
- [x] **S6-04** Manejo de fallo del API: página de catálogo degradada con aviso, nunca una pantalla en blanco.
- [x] **S6-05** Mapeo de las etiquetas de protocolo existentes en WooCommerce a los slugs de `docs/01-arquitectura-informacion.md`.

### Protocolos — la entrada principal

- [x] **S6-06** `/tienda` con los protocolos como primera decisión, no una cuadrícula de productos.
- [x] **S6-07** `/tienda/protocolos` — índice con objetivo de cada uno.
- [x] **S6-08** `/tienda/protocolos/[slug]` — plantilla que combina narrativa en MDX con los productos que vienen de Woo.
- [x] **S6-09** Estructura de la página de protocolo: para quién es, qué incluye, cómo se toma, por cuánto tiempo, qué esperar, qué no es.
- [x] **S6-10** Botón de agregar el protocolo completo al carrito en un solo paso.
- [x] **S6-11** Crear los cinco MDX de protocolo con narrativa en placeholder.
- [x] **S6-12** Enlace cruzado: cada protocolo apunta al motivo de consulta relacionado en `/sanar`.

### Catálogo y producto

- [x] **S6-13** `/tienda/productos` con filtros por objetivo, sistema del cuerpo y formato.
- [x] **S6-14** Buscador del catálogo.
- [x] **S6-15** `/tienda/productos/[slug]` — ficha nueva con la estructura: **para qué sirve · cómo se toma · por cuánto tiempo · qué esperar · qué contiene**.
- [x] **S6-16** Bloque de duración: cuántos días rinde el envase según la dosis indicada.
- [x] **S6-17** Protocolos a los que pertenece el producto, como enlaces.
- [x] **S6-18** Producto agotado manejado con elegancia: aviso claro y alternativa sugerida, no un botón muerto.
- [x] **S6-19** `/tienda/omni` — página de marca de la línea propia.

### Confianza

- [x] **S6-20** Bloque de señales de confianza reutilizable: ingredientes, certificaciones, origen. **Solo datos reales**; lo que no exista va en placeholder.
- [ ] **S6-21** Reseñas verificadas en ficha de producto, si la fuente existe. Si no, registrar como pendiente y no simular. _La tienda actual no tiene reseñas. La ficha muestra el bloque como pendiente; no se simula nada. Decide el cliente si las habilita._
- [x] **S6-22** Preguntas frecuentes por producto y por protocolo, con datos estructurados `FAQPage`.
- [x] **S6-23** Aviso de alcance: ventas solo en República Dominicana, visible antes del carrito.

### Carrito

- [x] **S6-24** Estado de carrito del lado del cliente, persistente entre sesiones.
- [x] **S6-25** Panel lateral de carrito con resumen y edición de cantidades.
- [x] **S6-26** `/tienda/carrito` con resumen completo y costo de envío visible antes de ir a pagar.

### SEO y medición

- [x] **S6-27** Datos estructurados `Product` con precio y disponibilidad reales.
- [x] **S6-28** Eventos de comercio: ver producto, agregar al carrito, ver carrito, agregar protocolo completo.

## Criterios de aceptación

- Precios y existencias siempre desde la fuente real, nunca escritos a mano
- Al menos cinco protocolos publicados y agregables al carrito en un solo paso
- Toda ficha de producto activa con dosis y duración, o marcada como pendiente
- Catálogo degradado funciona: probarlo apagando el API a propósito
- Ficha de producto probada en móvil con un dispositivo real
- Ninguna reseña, certificación o afirmación inventada
