# Sistema de diseño

Fuente única: `src/styles/tokens.css`. Ningún valor de color, espaciado o tipografía se escribe directo en un componente.

## Estado de la paleta

La identidad visible de la marca hoy es monocroma: el logotipo que usa el sitio actual es una pieza en negro sobre fondo claro, sin acento de color. Esa base se conserva.

**La paleta de abajo es una propuesta construida sobre esa evidencia pública.** Si el cliente entrega un manual de identidad formal, ese manual manda y los tokens se ajustan en el Sprint 1. Está registrado como decisión pendiente en `docs/03-stack-y-decisiones.md`.

## Tokens de color

```css
:root {
  /* Base de marca */
  --color-ink:        #101010;  /* negro Human: titulares, logotipo */
  --color-bone:       #F4F1EC;  /* hueso: fondo principal */
  --color-surface:    #FFFFFF;  /* tarjetas, superficies elevadas */

  /* Acentos */
  --color-functional: #1C5D4C;  /* verde funcional: consultorio y método */
  --color-amber:      #B06B2C;  /* llamados a la acción, destacados */

  /* Soporte */
  --color-stone:      #6B6B6B;  /* texto secundario */
  --color-line:       #D9D4CC;  /* bordes y separadores */

  /* Estados */
  --color-error:      #B42318;
  --color-success:    #067647;
  --color-warning:    #B54708;
}
```

### Uso por sección

| Sección | Color dominante | Razón |
|---|---|---|
| Núcleo de marca | Negro sobre hueso | Es la marca |
| Entrenar | Negro, alto contraste | Lenguaje del rendimiento |
| Sanar | Verde funcional | Salud, alimentación que sana |
| Tienda | Hueso y blanco, producto al frente | El producto aporta el color |
| Llamados a la acción | Ámbar | Único en todo el sitio, siempre significa lo mismo |

**El ámbar no se usa para decorar.** Si aparece, es una acción.

## Tipografía

```css
:root {
  --font-display: /* sans geométrica, pesos 500–800 */;
  --font-body:    /* sans humanista, pesos 400–600 */;
}
```

Candidatas a evaluar en el Sprint 1 (decidir una de cada par, registrar la decisión):
- Display: Archivo, Söhne, Neue Haas Grotesk, Inter Tight
- Body: Inter, Source Sans 3, IBM Plex Sans

Criterio: deben soportar bien tildes y la ñ, y rendir en pesos medios a 16px en móvil.

### Escala

| Token | Móvil | Escritorio | Uso |
|---|---|---|---|
| `--text-display` | 36px | 64px | Portada |
| `--text-h1` | 28px | 44px | Título de página |
| `--text-h2` | 22px | 32px | Sección |
| `--text-h3` | 18px | 24px | Subsección |
| `--text-body` | 16px | 17px | Cuerpo |
| `--text-small` | 14px | 14px | Apoyo |
| `--text-micro` | 12px | 12px | Legales |

Nunca por debajo de 14px para texto que el usuario debe leer. Los legales a 12px son la única excepción.

La palabra **HUMAN** siempre va en mayúsculas. El resto en caja mixta.

## Espaciado

Escala de 4px: `4 8 12 16 24 32 48 64 96 128`.
Gutter lateral en móvil: 16px fijo. Ancho máximo de contenido: 1200px. Ancho de lectura: 68 caracteres.

## Componentes a construir (Sprint 1)

### Primitivos — `src/components/ui/`
`Button` (primary, secondary, ghost, link) · `Input` · `Select` · `Textarea` · `Checkbox` · `RadioGroup` · `Label` · `FieldError` · `Card` · `Badge` · `Tabs` · `Accordion` · `Dialog` · `Toast` · `Skeleton` · `Breadcrumb` · `Pagination`

Cada uno con estados: normal, hover, focus-visible, activo, deshabilitado, cargando, error.

### Bloques — `src/components/blocks/`
`Hero` · `RouteCards` (las tres rutas) · `MethodSteps` · `StoryCard` · `CoachCard` · `ProtocolCard` · `ProductCard` · `FAQ` · `CTABand` · `ContactStrip` · `TrustSignals` · `NewsletterForm`

## Accesibilidad — requisito, no mejora

- Contraste AA mínimo en todo texto; AAA en cuerpos de lectura. Verificar cada par de tokens, no asumir.
- `focus-visible` perceptible en todo elemento interactivo. Nunca `outline: none` sin reemplazo.
- Áreas táctiles de 44×44px mínimo.
- Formularios con etiqueta visible (no solo placeholder), error en texto además de color, y `aria-describedby` enlazando el error.
- Jerarquía de encabezados sin saltos. Un solo `h1` por página.
- Respeta `prefers-reduced-motion`.
- Todo contenido alcanzable por teclado en orden lógico.

## Fotografía

- Personas reales del centro: coaches, pacientes, entrenamientos. **Ninguna imagen de banco.**
- Luz natural, alto contraste, piel real sin retoque agresivo.
- Comida presentada como alimento, no como plato de revista.
- Mientras no haya material, usar `components/ui/ImagePlaceholder` con las dimensiones correctas y registrar la falta en `backlog.md`.

## Movimiento

Discreto y funcional. Transiciones de 150–250ms, curva `ease-out`. Nada que se mueva solo, nada en bucle, nada que retrase la lectura.
