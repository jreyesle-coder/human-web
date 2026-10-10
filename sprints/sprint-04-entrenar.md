# Sprint 4 · Entrenar (Human Balance)

**Duración:** 2 semanas
**Objetivo:** dar presencia propia al gimnasio y convertir la clase de prueba en un flujo medible, con registro, en lugar de un mensaje suelto de WhatsApp.

## Decisión previa

Confirmar P-003 antes de empezar. Si el cliente quiere reserva de clases con cupos en línea, **este sprint no alcanza** y hay que planificar uno adicional con sistema de reservas. Este sprint asume solicitud de clase de prueba, no reserva con cupos.

## Tareas

### Páginas

- [ ] **S4-01** `/entrenar` — propuesta diferencial. El material público dice que el diferencial es la evaluación que detecta problemas que el cliente no sabía que tenía. Construir sobre eso, no sobre "el mejor gimnasio".
- [ ] **S4-02** `/entrenar/modalidades` — tipos de entrenamiento y en qué se diferencian entre sí.
- [ ] **S4-03** `/entrenar/coaches` — índice del equipo.
- [ ] **S4-04** `/entrenar/coaches/[slug]` — perfil individual con especialidad y formación.
- [ ] **S4-05** `/entrenar/instalaciones` — espacios, horarios y ubicación con mapa.
- [ ] **S4-06** Enlace al método desde la sección: el entrenamiento es parte del mismo recorrido.

### Flujo de clase de prueba

- [ ] **S4-07** `/entrenar/clase-de-prueba` con formulario: nombre, teléfono, correo, objetivo general, disponibilidad aproximada.
- [ ] **S4-08** Esquema Zod compartido entre cliente y servidor.
- [ ] **S4-09** Route handler `POST /api/leads/clase-de-prueba` con validación en servidor y limitación de intentos.
- [ ] **S4-10** Protección anti-spam (Turnstile o equivalente), verificada del lado del servidor.
- [ ] **S4-11** Correo de notificación al equipo con todos los datos y el origen del envío.
- [ ] **S4-12** Correo de confirmación al solicitante, con qué esperar y en cuánto tiempo lo contactan.
- [ ] **S4-13** Página de agradecimiento con siguiente paso sugerido: conocer el método.
- [ ] **S4-14** Registro del origen de cada solicitud (página de procedencia y campaña, si existe).
- [ ] **S4-15** WhatsApp como canal secundario, con parámetro de origen en el enlace para poder distinguirlo después.

### Datos y privacidad

- [ ] **S4-16** Aviso de privacidad y casilla de consentimiento explícita en el formulario.
- [ ] **S4-17** Verificar que no se solicita ninguna información clínica.

### Medición

- [ ] **S4-18** Eventos: vista de formulario, inicio de llenado, envío exitoso, envío fallido.
- [ ] **S4-19** Prueba de extremo a extremo con Playwright del flujo completo.

## Criterios de aceptación

- Solicitud enviada y correo recibido, probado en producción con un caso real
- Cada solicitud queda con origen trazable
- El formulario rechaza envíos inválidos con mensajes claros en texto
- Probado con la persona del cliente que recibe las solicitudes, no solo técnicamente
- La prueba de Playwright pasa en CI
