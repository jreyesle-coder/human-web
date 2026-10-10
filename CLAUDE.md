# HUMAN — Ecosistema Digital

Instrucciones de proyecto para Claude Code. Léelas completas antes de tocar código.

## Qué estamos construyendo

Un solo sitio para tres unidades de negocio del grupo Human Performance Center (Santo Domingo, RD):

| Ruta | Unidad | Acción principal |
|---|---|---|
| Entrenar | Human Balance (gimnasio de entrenamiento personalizado) | Agendar clase de prueba |
| Sanar | Centro de Dietética Funcional | Agendar evaluación |
| Sostener | Human Stores (tienda de suplementación) | Comprar el protocolo |

No son tres sitios. Son tres puertas de entrada al mismo recorrido, unidas por la filosofía de Juan Carlos Simó: **Eliminar · Reparar · Liberar**.

Contexto completo de marca en `docs/00-marca-y-filosofia.md`. Léelo antes de escribir cualquier texto de interfaz.

## Stack

- **Next.js 16** (App Router, Cache Components), TypeScript estricto — ver D-005 y `AGENTS.md`
- **Tailwind CSS** con tokens definidos en `src/styles/tokens.css`
- **MDX** para contenido editorial (`content/`)
- **WooCommerce Store API** como backend de catálogo (headless de solo lectura)
- **Checkout en WooCommerce**, no reimplementado — ver `docs/03-stack-y-decisiones.md`
- **Vercel** para despliegue y previews por rama
- **Resend** (o equivalente) para correos transaccionales
- **Zod** para validación de formularios en cliente y servidor

## Comandos

```bash
pnpm dev          # desarrollo local
pnpm build        # build de producción
pnpm lint         # ESLint + Prettier
pnpm typecheck    # tsc --noEmit
pnpm test         # Vitest
pnpm e2e          # Playwright
pnpm check        # lint + typecheck + test (correr antes de cada commit)
```

## Estructura

```
src/
  app/                      # rutas (App Router)
    (marca)/                # home, método, JC Simó, historias
    entrenar/               # Human Balance
    sanar/                  # Consultorio
    tienda/                 # Catálogo y protocolos
    api/                    # route handlers (formularios, webhooks)
  components/
    ui/                     # primitivos del sistema de diseño
    blocks/                 # secciones compuestas de página
  lib/
    woo/                    # cliente de WooCommerce Store API
    forms/                  # esquemas Zod y envío
    analytics/              # eventos
  styles/
    tokens.css              # fuente única de color, tipografía y espaciado
content/                    # MDX: método, protocolos, artículos
docs/                       # contexto, decisiones, sistema de diseño
sprints/                    # plan de trabajo
```

## Reglas que no se rompen

### Contenido

1. **Nunca inventes testimonios, cifras de resultados, nombres de pacientes ni afirmaciones de salud.** Este es un negocio clínico en un país con regulación de datos personales. Todo texto que afirme un resultado va en un placeholder marcado y lo aprueba el cliente.
2. **Los placeholders se marcan de forma visible y rastreable:** `{{PENDIENTE: descripción de lo que falta}}`. Nunca texto de relleno tipo lorem ipsum ni inventado que parezca real.
3. **Ninguna foto de banco de imágenes.** Si falta una imagen, usa un bloque de placeholder con las dimensiones correctas y regístralo en `backlog.md`.
4. **El idioma es español dominicano.** Tono directo, sin anglicismos innecesarios, sin signos de exclamación de más. "Agendar", no "bookear".

### Datos personales

5. **Ningún formulario público pide información clínica detallada.** Solo motivo general de consulta, nombre, teléfono y correo. El detalle se levanta en consulta presencial.
6. **Todo formulario que capte datos lleva aviso de privacidad y casilla de consentimiento explícita**, conforme a la Ley No. 172-13 de República Dominicana.
7. **Nunca escribas credenciales, llaves de API ni tokens en el repositorio.** Todo va a variables de entorno, documentadas en `.env.example` con valores vacíos.

### Código

8. **Accesibilidad AA es requisito, no mejora.** Contraste verificado, áreas táctiles de 44px mínimo, etiquetas visibles en formularios, errores en texto y no solo en color.
9. **Móvil primero.** El cliente llega por Instagram y WhatsApp desde el teléfono. Si algo se ve bien en escritorio y mal en móvil, está roto.
10. **Un componente nuevo solo se crea si no existe en `src/components/ui/`.** Antes de crear, busca.
11. **No instales dependencias sin registrarlas** en `docs/03-stack-y-decisiones.md` con la razón.
12. **Corre `pnpm check` antes de dar por terminada cualquier tarea.**

### Trabajo por sprints

13. **Un sprint a la vez.** El archivo del sprint activo manda; no adelantes trabajo de sprints posteriores.
14. **Las tareas tienen ID** (`S3-04`). Al completarlas, marca la casilla en el archivo del sprint.
15. **Si una tarea está bloqueada por una decisión del cliente**, no la resuelvas por tu cuenta: regístrala en `backlog.md` bajo "Bloqueos" y sigue con la siguiente.
16. **Cada decisión técnica de peso se documenta** como entrada nueva en `docs/03-stack-y-decisiones.md`, con alternativas consideradas.

## Estado actual

- Sprints S0 a S6 entregados (2026-10-10). **Siguiente: S7 (pago y migración), bloqueado** hasta tener el dominio (P-001) y los accesos de WordPress (B-004). Lo que falta del cliente está en `docs/materiales-pendientes.md`.
- El despliegue de Vercel es el sitio de presentación: sin `HUMAN_LANZAMIENTO=si` muestra borradores y pendientes (D-008).
- Sitio heredado: `humanstores.com` — WordPress + WooCommerce con tema comercial, implementación sin terminar. No se toca hasta el Sprint 7.
- Decisiones de cliente pendientes: ver `docs/03-stack-y-decisiones.md`, sección "Pendientes".
