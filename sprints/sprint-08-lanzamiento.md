# Sprint 8 · Medición, posicionamiento y lanzamiento

**Duración:** 2 semanas
**Objetivo:** poner el sitio en vivo instrumentado, y entregar al cliente la capacidad de operarlo sin depender del proveedor.

## El criterio que importa

Las tasas de conversión en salud y bienestar promedian entre 3,0 % y 4,2 %; los mejores sitios alcanzan entre 8 % y 10 %. La diferencia casi nunca está en el diseño visual, sino en el flujo de agendamiento y en la claridad del nicho. Sin medición, no se sabe en cuál de los dos está el problema.

## Tareas

### Medición

- [ ] **S8-01** Analítica configurada con eventos definidos, no con instalación por defecto.
- [ ] **S8-02** Eventos de conversión: solicitud de clase de prueba, solicitud de evaluación, compra, suscripción, suscripción a boletín.
- [ ] **S8-03** Embudos por ruta: Entrenar, Sanar y Tienda por separado.
- [ ] **S8-04** Atribución de origen: de qué página y de qué campaña viene cada conversión, incluidos los contactos por WhatsApp.
- [ ] **S8-05** Verificar que ningún dato personal ni motivo de consulta viaja a analítica.
- [ ] **S8-06** Banner de consentimiento de cookies con opción real de rechazar, no solo aceptar.

### Posicionamiento y respuesta a IA

- [ ] **S8-07** Revisar títulos y descripciones de todas las páginas: únicos, descriptivos, con la promesa específica.
- [ ] **S8-08** Datos estructurados completos y validados: `Organization`, `LocalBusiness`, `Person`, `Product`, `FAQPage`, `Article`.
- [ ] **S8-09** Estructura de respuesta primero en toda página informativa: la respuesta en el primer párrafo, la explicación después. Buena parte del recorrido del paciente hoy empieza en un buscador o en un modelo de lenguaje, y las páginas que no están organizadas para ser recuperadas y resumidas pierden visibilidad antes de ser encontradas.
- [ ] **S8-10** Preguntas frecuentes en las páginas de motivo, protocolo y producto.
- [ ] **S8-11** Ficha local completa y coherente con el sitio: dirección, horarios, teléfono.

### Rendimiento

- [ ] **S8-12** Auditoría de métricas de carga en móvil en las cinco páginas de mayor tráfico previsto.
- [ ] **S8-13** Optimizar imágenes: formato moderno, tamaños correctos, carga diferida salvo el hero.
- [ ] **S8-14** Revisar el peso del JavaScript enviado al cliente y eliminar lo que no se use.
- [ ] **S8-15** Verificar que no hay desplazamiento de contenido al cargar.

### Seguridad

- [ ] **S8-16** Cabeceras de seguridad: política de contenido, tipo de contenido, referente, permisos.
- [ ] **S8-17** Verificar certificado y redirección forzada a HTTPS.
- [ ] **S8-18** Confirmar respaldos automáticos del sitio y de la base de datos de la tienda, con prueba de restauración.
- [ ] **S8-19** Doble verificación activa en todos los accesos administrativos.
- [ ] **S8-20** Verificar que no hay credenciales en el historial del repositorio.

### Entrega al cliente

- [ ] **S8-21** Manual de operación en `docs/manual-operacion.md`: cómo publicar un artículo, cómo agregar una historia, cómo actualizar un protocolo, a quién llamar si algo falla.
- [ ] **S8-22** Capacitación a **dos** personas del cliente, no una. Con constancia firmada.
- [ ] **S8-23** Entrega de credenciales registradas, en custodia del cliente.
- [ ] **S8-24** Tablero de resultados para la dirección: conversiones por ruta, origen del tráfico y ventas.

### Lanzamiento

- [ ] **S8-25** Revisión final: enlaces rotos, errores de consola, ortografía, textos pendientes.
- [ ] **S8-26** Confirmar que `pnpm pendientes` devuelve vacío.
- [ ] **S8-27** Lanzamiento con plan de reversión activo y una persona de guardia las primeras 48 horas.
- [ ] **S8-28** Vigilancia de la primera semana: errores, cobertura de indexación y primeras conversiones.

## Criterios de aceptación

- Sitio en vivo sin errores de consola ni enlaces rotos
- Métricas de carga en verde en móvil
- Toda conversión medible y atribuible a su origen
- Dos personas del cliente capacitadas, con constancia
- Credenciales entregadas y registradas
- `pnpm pendientes` vacío
