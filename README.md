# HUMAN — Plan de trabajo para Claude Code

Paquete de arranque del ecosistema digital de Human Performance Center (Human Balance · Consultorio · Tienda).

## Cómo usarlo

1. Copia estos archivos a la raíz del repositorio nuevo.
2. Abre Claude Code en esa carpeta.
3. Primer mensaje:

```
Lee CLAUDE.md y docs/. Vamos a ejecutar sprints/sprint-00-fundacion.md.
Empieza por las tareas de verificación S0-01 a S0-05 y reporta
antes de tocar código.
```

Claude Code lee `CLAUDE.md` automáticamente al iniciar, pero conviene decirlo de todas formas la primera vez.

## Qué hay aquí

```
CLAUDE.md                 Instrucciones permanentes. Stack, convenciones, reglas que no se rompen.
docs/
  00-marca-y-filosofia.md Contexto de marca. Obligatorio antes de escribir cualquier texto.
  01-arquitectura-...md   Mapa de rutas y modelo de contenido.
  02-sistema-diseno.md    Tokens, componentes, accesibilidad.
  03-stack-y-decisiones.md Decisiones registradas y pendientes del cliente.
  04-definicion-de-hecho.md Lista de verificación de cada tarea.
sprints/                  Nueve sprints, con tareas numeradas y casillas.
backlog.md                Bloqueos, contenido pendiente y deuda técnica.
```

## Orden de los sprints

| Sprint | Foco | Duración |
|---|---|---|
| 0 | Fundación técnica y verificaciones | 1 semana |
| 1 | Sistema de diseño | 2 semanas |
| 2 | Esqueleto de rutas y contenido | 2 semanas |
| 3 | Núcleo de marca | 2 semanas |
| 4 | Entrenar (Human Balance) | 2 semanas |
| 5 | Sanar (Consultorio) | 2 semanas |
| 6 | Tienda: catálogo y protocolos | 2 semanas |
| 7 | Pago y migración | 2 semanas |
| 8 | Medición y lanzamiento | 2 semanas |

Diecisiete semanas en total. Los sprints 3, 4 y 5 pueden paralelizarse si hay más de una persona trabajando.

## Tres cosas que no se saltan

**El Sprint 0 primero, completo.** La tarea S0-01 verifica que la Store API de WooCommerce responde. Si no responde, la decisión D-003 se cae y el Sprint 6 cambia de forma. Es mejor descubrirlo la primera semana que la décima.

**Las tres decisiones pendientes del cliente** (dominio, manual de identidad, alcance de Human Balance) se plantean en el Sprint 0. Están en `docs/03-stack-y-decisiones.md` y registradas como bloqueos en `backlog.md`.

**El Sprint 2 es el que hunde estos proyectos.** No es diseño ni código: es que el cliente entregue fotos, testimonios y fichas de producto. Por eso el sprint termina generando la lista de materiales con responsable y fecha, y por eso el build de producción falla si queda un placeholder sin resolver.

## Sobre el contenido

Este es un negocio clínico en un país con ley de protección de datos vigente. Las reglas de `CLAUDE.md` sobre no inventar testimonios, resultados ni afirmaciones de salud no son formalismo: son el límite del proyecto. Todo texto no aprobado va como `{{PENDIENTE: ...}}` y se registra.
