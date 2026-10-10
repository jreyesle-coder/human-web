# Definición de hecho

Una tarea no está terminada hasta que cumple **todo** lo de abajo. Aplica a cada tarea de cada sprint, sin excepción.

## Siempre

- [ ] `pnpm check` pasa (lint + typecheck + test) sin advertencias nuevas
- [ ] El build de producción compila sin errores
- [ ] No hay `console.log`, `TODO` sueltos ni código comentado
- [ ] No se agregaron dependencias sin registrarlas en `docs/03-stack-y-decisiones.md`
- [ ] No hay credenciales ni URLs internas escritas en el código

## Para toda página o componente visual

- [ ] Se ve correcto a 375px, 768px y 1440px de ancho
- [ ] Sin desbordamiento horizontal a 375px
- [ ] Contraste verificado en nivel AA
- [ ] Navegable completo por teclado, con `focus-visible` perceptible
- [ ] Un solo `h1`, jerarquía de encabezados sin saltos
- [ ] Imágenes con `alt` descriptivo, o `alt=""` si son decorativas
- [ ] Estados cubiertos: carga, vacío y error
- [ ] Todo texto no definitivo marcado como `{{PENDIENTE: ...}}` y registrado en `backlog.md`

## Para toda página indexable

- [ ] `title` y `description` propios, no heredados
- [ ] Open Graph e imagen de compartir
- [ ] URL canónica
- [ ] Datos estructurados cuando aplique (`Organization`, `LocalBusiness`, `Product`, `FAQPage`, `Person`)
- [ ] Incluida en el sitemap

## Para todo formulario

- [ ] Validación con Zod en cliente **y** en servidor
- [ ] Etiquetas visibles, no solo placeholder
- [ ] Errores en texto, enlazados con `aria-describedby`
- [ ] Protección anti-spam activa
- [ ] Correo de notificación al equipo y de confirmación al usuario
- [ ] Aviso de privacidad visible y casilla de consentimiento explícita
- [ ] Origen del envío registrado para trazabilidad
- [ ] Probado de extremo a extremo: enviar y confirmar que el correo llega
- [ ] No solicita información clínica detallada

## Para toda ruta de la tienda

- [ ] Precios y existencias provienen de la fuente real, nunca escritos a mano
- [ ] Producto agotado y producto inexistente manejados con elegancia
- [ ] Datos estructurados `Product` con precio y disponibilidad
- [ ] Probado en móvil con un dispositivo real, no solo en el simulador

## Antes de cerrar un sprint

- [ ] Todas las casillas del archivo del sprint marcadas, o movidas a `backlog.md` con su razón
- [ ] Preview desplegado y revisado en un teléfono real
- [ ] `CLAUDE.md` actualizado con el sprint activo
- [ ] Bloqueos nuevos registrados en `backlog.md`
