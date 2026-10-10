# Sprint 1 · Sistema de diseño

**Duración:** 2 semanas
**Objetivo:** construir el lenguaje visual completo antes de diseñar una sola página, para que todo lo que venga después sea ensamblaje y no invención.

## Fuera de alcance

Páginas reales, contenido, rutas de negocio.

## Tareas

### Tokens

- [ ] **S1-01** Resolver P-002 con el cliente. Si hay manual de identidad, sustituir la paleta propuesta y registrar la decisión. Si no lo hay, confirmar la propuesta por escrito.
- [ ] **S1-02** Finalizar tokens de color en `src/styles/tokens.css`, incluidos los de estado.
- [ ] **S1-03** Elegir las dos familias tipográficas, cargarlas con `next/font` y verificar que soporten tildes y ñ en todos los pesos usados.
- [ ] **S1-04** Implementar la escala tipográfica como tokens, con tamaños distintos en móvil y escritorio.
- [ ] **S1-05** Escala de espaciado, radios, sombras y anchos máximos.
- [ ] **S1-06** Escribir una prueba automatizada que verifique contraste AA en todos los pares de color definidos. **Debe fallar el build si un par no cumple.**

### Primitivos — `src/components/ui/`

- [ ] **S1-07** `Button` con variantes primary, secondary, ghost y link, más estado de carga y tamaños.
- [ ] **S1-08** Campos de formulario: `Input`, `Textarea`, `Select`, `Checkbox`, `RadioGroup`, con `Label` y `FieldError`.
- [ ] **S1-09** `Card`, `Badge`, `Breadcrumb`, `Pagination`.
- [ ] **S1-10** `Tabs`, `Accordion`, `Dialog` — accesibles por teclado, con foco atrapado en el diálogo.
- [ ] **S1-11** `Toast` y `Skeleton`.
- [ ] **S1-12** Todos los primitivos con sus estados: normal, hover, focus-visible, activo, deshabilitado, cargando, error.

### Bloques — `src/components/blocks/`

- [ ] **S1-13** `Hero` con variantes para marca, unidad y producto.
- [ ] **S1-14** `RouteCards` — las tres rutas, pieza central de la portada.
- [ ] **S1-15** `MethodSteps` — Eliminar, Reparar, Liberar, con estado activo.
- [ ] **S1-16** `CTABand`, `FAQ`, `TrustSignals`.
- [ ] **S1-17** `StoryCard`, `CoachCard`, `ProtocolCard`, `ProductCard` — estructura, sin datos reales.
- [ ] **S1-18** Encabezado y pie globales, con navegación móvil y barra inferior fija.

### Catálogo y verificación

- [ ] **S1-19** Construir `/ui`: todos los componentes con todas sus variantes y estados en una sola página.
- [ ] **S1-20** Pruebas de accesibilidad automatizadas sobre `/ui` (axe en Playwright), integradas al CI.
- [ ] **S1-21** Revisión manual de `/ui` en un teléfono real.

## Criterios de aceptación

- `/ui` muestra todos los componentes con todos sus estados
- La prueba de contraste pasa y rompería el build si un token cambiara a un valor no conforme
- Axe no reporta violaciones en `/ui`
- Recorrido completo por teclado en `/ui` sin trampas de foco
- Ningún componente usa un color, tamaño o espaciado escrito directo
