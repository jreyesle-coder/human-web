# Arquitectura de información

Mapa de rutas definitivo. Cualquier ruta nueva se agrega aquí antes de crearse.

## Principios

1. **Tres puertas, un recorrido.** La navegación principal ofrece Entrenar / Sanar / Sostener, más el Método como eje transversal.
2. **Navegación por motivo, no por servicio.** El visitante entra por lo que le pasa ("no duermo", "estoy inflamado"), no por el nombre comercial del programa. Es el patrón de los mejores sitios de salud funcional del mundo.
3. **Una acción principal por página.** Si una página tiene dos llamados del mismo peso, no tiene ninguno.
4. **El método es transversal.** Aparece referenciado desde las tres rutas.

## Rutas

### Núcleo de marca — `src/app/(marca)/`

| Ruta | Archivo | Acción principal |
|---|---|---|
| `/` | `page.tsx` | Elegir ruta (Entrenar / Sanar / Sostener) |
| `/metodo` | `metodo/page.tsx` | Entender el método, pasar a evaluación |
| `/metodo/eliminar` | `metodo/[paso]/page.tsx` | Avanzar al siguiente paso |
| `/metodo/reparar` | idem | idem |
| `/metodo/liberar` | idem | Agendar evaluación |
| `/juan-carlos-simo` | `juan-carlos-simo/page.tsx` | Conocer el método |
| `/historias` | `historias/page.tsx` | Filtrar por objetivo, agendar |
| `/historias/[slug]` | `historias/[slug]/page.tsx` | Agendar evaluación |
| `/contenido` | `contenido/page.tsx` | Leer / suscribirse |
| `/contenido/[slug]` | `contenido/[slug]/page.tsx` | Protocolo relacionado |
| `/contacto` | `contacto/page.tsx` | Enviar mensaje |

### Entrenar — `src/app/entrenar/`

| Ruta | Acción principal |
|---|---|
| `/entrenar` | Agendar clase de prueba |
| `/entrenar/modalidades` | Agendar clase de prueba |
| `/entrenar/coaches` | Agendar clase de prueba |
| `/entrenar/coaches/[slug]` | Agendar con ese coach |
| `/entrenar/instalaciones` | Agendar clase de prueba |
| `/entrenar/clase-de-prueba` | Enviar formulario |

### Sanar — `src/app/sanar/`

| Ruta | Acción principal |
|---|---|
| `/sanar` | Agendar evaluación |
| `/sanar/motivos/[motivo]` | Agendar evaluación |
| `/sanar/evaluaciones` | Agendar evaluación |
| `/sanar/evaluaciones/[slug]` | Agendar esa evaluación |
| `/sanar/primera-consulta` | Agendar evaluación |
| `/sanar/agendar` | Enviar formulario |

Motivos iniciales (slugs): `fatiga`, `inflamacion`, `sueno`, `digestion`, `composicion-corporal`, `prevencion`.

### Tienda — `src/app/tienda/`

| Ruta | Acción principal |
|---|---|
| `/tienda` | Elegir protocolo |
| `/tienda/protocolos` | Ver protocolo |
| `/tienda/protocolos/[slug]` | Comprar el protocolo completo |
| `/tienda/productos` | Filtrar |
| `/tienda/productos/[slug]` | Agregar al carrito |
| `/tienda/omni` | Ver productos OMNI |
| `/tienda/carrito` | Ir a pagar |

Protocolos iniciales (slugs): `estres-y-sueno-cronico`, `inmunidad`, `fat-loss`, `higado`, `requerimiento-diario`.

### Legales — `src/app/(legal)/`

`/privacidad`, `/terminos`, `/politica-de-entrega`, `/politica-de-reembolsos`, `/aviso-legal`

Las políticas existentes de `humanstores.com` se migran como contenido. **No las redactes de cero**: pídelas al cliente o migra el texto vigente, y marca con `{{PENDIENTE: revisión legal}}` cualquier ajuste necesario.

### Internas (no indexables)

| Ruta | Uso |
|---|---|
| `/ui` | Catálogo de componentes del sistema de diseño (Sprint 1). `noindex` y bloqueada en `robots.txt`. |

## Navegación principal

```
[HUMAN]   Entrenar   Sanar   Tienda   Método        [Agendar evaluación]
```

- Máximo cinco elementos. Si hay que agregar uno, se quita otro.
- "Agendar evaluación" es el llamado persistente: botón diferenciado, visible en todo momento.
- En móvil: barra inferior fija con las tres rutas más el carrito.

## Pie de página

Cuatro columnas: Unidades · Método y contenido · Ayuda (WhatsApp, horarios, ubicación) · Legales.
Más: redes sociales, medios de pago y aviso de alcance de ventas (solo República Dominicana).

## Modelo de contenido (MDX en `content/`)

```
content/
  metodo/{eliminar,reparar,liberar}.mdx
  protocolos/[slug].mdx          # narrativa; los productos vienen de Woo
  motivos/[motivo].mdx           # páginas de síntoma del consultorio
  evaluaciones/[slug].mdx
  coaches/[slug].mdx
  historias/[slug].mdx           # requiere campo autorizacion: true
  contenido/[slug].mdx           # artículos
```

Frontmatter mínimo en todos: `title`, `description`, `updated`, `status` (`draft` | `review` | `published`).
Solo se renderiza en producción lo que tenga `status: published`.

Las historias llevan además `autorizacion: true`. **Si falta ese campo, no se renderiza.** Es una salvaguarda, no una formalidad.
