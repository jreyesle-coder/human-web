# Sprint 5 · Sanar (Consultorio)

**Duración:** 2 semanas
**Objetivo:** construir la sección clínica con navegación por motivo de consulta, que es el patrón de los mejores sitios de salud funcional del mundo, y el flujo de agendamiento.

## Advertencia

Esta es la sección de mayor riesgo del proyecto. Maneja salud y datos personales en un país con regulación vigente (Ley No. 172-13). **Ninguna afirmación clínica entra sin aprobación de Juan Carlos Simó.** Ante la duda, placeholder.

## Tareas

### Páginas

- [x] **S5-01** `/sanar` — qué es la dietética funcional y en qué se diferencia de una consulta nutricional tradicional. La respuesta primero, la explicación después.
- [x] **S5-02** `/sanar/motivos/[motivo]` — plantilla de página por motivo de consulta. Estructura: qué se siente, qué puede haber detrás, cómo se aborda, qué esperar.
- [x] **S5-03** Crear los seis motivos iniciales en `content/motivos/`: fatiga, inflamación, sueño, digestión, composición corporal, prevención. Textos en placeholder hasta aprobación.
- [x] **S5-04** `/sanar/evaluaciones` — índice de evaluaciones disponibles.
- [x] **S5-05** `/sanar/evaluaciones/[slug]` — plantilla individual. Incluir OligoScan. Explicar en lenguaje llano: qué mide, cómo se hace, cuánto dura, qué se obtiene.
- [x] **S5-06** `/sanar/primera-consulta` — expectativas paso a paso. Reduce la fricción de agendar más que cualquier argumento de venta.
- [x] **S5-07** Enlace al método desde la sección y a los protocolos de la tienda desde cada motivo.

### Navegación por motivo

- [x] **S5-08** Selector de motivo en el hero de `/sanar`, visible y usable con una mano en móvil.
- [x] **S5-09** Cada motivo enlaza a su evaluación sugerida y a su protocolo relacionado.
- [x] **S5-10** Datos estructurados `FAQPage` en las páginas de motivo, con respuesta directa en el primer párrafo de cada pregunta.

### Flujo de agendamiento

- [x] **S5-11** `/sanar/agendar` con formulario: nombre, teléfono, correo, motivo general (selección de la lista), preferencia de horario.
- [x] **S5-12** **Ningún campo de texto libre para síntomas, historial o medicación.** Si el cliente lo pide, explicar por qué no y registrar la conversación en `backlog.md`.
- [x] **S5-13** Route handler `POST /api/leads/evaluacion` con validación en servidor y limitación de intentos.
- [x] **S5-14** Protección anti-spam verificada en servidor.
- [ ] **S5-15** Correo de notificación al consultorio y confirmación al paciente. _Código listo y probado sin correo. Falta configurar Resend y el correo del consultorio en Vercel para probarlo de punta a punta (Julio + cliente)._
- [x] **S5-16** Página de agradecimiento con qué traer y cómo prepararse.

### Privacidad — Ley No. 172-13

- [x] **S5-17** Aviso de privacidad específico del consultorio, enlazado desde el formulario.
- [x] **S5-18** Casilla de consentimiento explícita, no premarcada, con texto que diga qué se hace con los datos.
- [x] **S5-19** Verificar que ningún dato del formulario viaja en parámetros de URL.
- [x] **S5-20** Verificar que el motivo de consulta no se envía a analítica como dato de evento.
- [x] **S5-21** Documentar en `docs/privacidad.md` qué datos se captan, dónde se almacenan y por cuánto tiempo.

### Medición

- [x] **S5-22** Eventos de embudo sin dato sensible: vista, inicio, envío, confirmación.
- [x] **S5-23** Prueba de extremo a extremo con Playwright.

## Criterios de aceptación

- Agendamiento probado de principio a fin con un caso real
- Ningún dato de salud detallado solicitado en formulario público
- Ningún dato personal en URL ni en eventos de analítica
- Textos clínicos aprobados por Juan Carlos Simó, o marcados como pendientes
- `docs/privacidad.md` escrito y revisado
