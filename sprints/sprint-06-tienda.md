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

- [ ] **S6-01** Cliente de WooCommerce Store API en `src/lib/woo/` con tipos propios, no los del API en crudo.
- [ ] **S6-02** Funciones de catálogo: listar productos, obtener por slug, listar por etiqueta, listar categorías.
- [ ] **S6-03** Caché con revalidación: productos cada 10 minutos, existencias en cada petición.
- [ ] **S6-04** Manejo de fallo del API: página de catálogo degradada con aviso, nunca una pantalla en blanco.
- [ ] **S6-05** Mapeo de las etiquetas de protocolo existentes en WooCommerce a los slugs de `docs/01-arquitectura-informacion.md`.

### Protocolos — la entrada principal

- [ ] **S6-06** `/tienda` con los protocolos como primera decisión, no una cuadrícula de productos.
- [ ] **S6-07** `/tienda/protocolos` — índice con objetivo de cada uno.
- [ ] **S6-08** `/tienda/protocolos/[slug]` — plantilla que combina narrativa en MDX con los productos que vienen de Woo.
- [ ] **S6-09** Estructura de la página de protocolo: para quién es, qué incluye, cómo se toma, por cuánto tiempo, qué esperar, qué no es.
- [ ] **S6-10** Botón de agregar el protocolo completo al carrito en un solo paso.
- [ ] **S6-11** Crear los cinco MDX de protocolo con narrativa en placeholder.
- [ ] **S6-12** Enlace cruzado: cada protocolo apunta al motivo de consulta relacionado en `/sanar`.

### Catálogo y producto

- [ ] **S6-13** `/tienda/productos` con filtros por objetivo, sistema del cuerpo y formato.
- [ ] **S6-14** Buscador del catálogo.
- [ ] **S6-15** `/tienda/productos/[slug]` — ficha nueva con la estructura: **para qué sirve · cómo se toma · por cuánto tiempo · qué esperar · qué contiene**.
- [ ] **S6-16** Bloque de duración: cuántos días rinde el envase según la dosis indicada.
- [ ] **S6-17** Protocolos a los que pertenece el producto, como enlaces.
- [ ] **S6-18** Producto agotado manejado con elegancia: aviso claro y alternativa sugerida, no un botón muerto.
- [ ] **S6-19** `/tienda/omni` — página de marca de la línea propia.

### Confianza

- [ ] **S6-20** Bloque de señales de confianza reutilizable: ingredientes, certificaciones, origen. **Solo datos reales**; lo que no exista va en placeholder.
- [ ] **S6-21** Reseñas verificadas en ficha de producto, si la fuente existe. Si no, registrar como pendiente y no simular.
- [ ] **S6-22** Preguntas frecuentes por producto y por protocolo, con datos estructurados `FAQPage`.
- [ ] **S6-23** Aviso de alcance: ventas solo en República Dominicana, visible antes del carrito.

### Carrito

- [ ] **S6-24** Estado de carrito del lado del cliente, persistente entre sesiones.
- [ ] **S6-25** Panel lateral de carrito con resumen y edición de cantidades.
- [ ] **S6-26** `/tienda/carrito` con resumen completo y costo de envío visible antes de ir a pagar.

### SEO y medición

- [ ] **S6-27** Datos estructurados `Product` con precio y disponibilidad reales.
- [ ] **S6-28** Eventos de comercio: ver producto, agregar al carrito, ver carrito, agregar protocolo completo.

## Criterios de aceptación

- Precios y existencias siempre desde la fuente real, nunca escritos a mano
- Al menos cinco protocolos publicados y agregables al carrito en un solo paso
- Toda ficha de producto activa con dosis y duración, o marcada como pendiente
- Catálogo degradado funciona: probarlo apagando el API a propósito
- Ficha de producto probada en móvil con un dispositivo real
- Ninguna reseña, certificación o afirmación inventada
