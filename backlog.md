# Backlog

Registro vivo. Se actualiza al cierre de cada sprint y cada vez que aparece un bloqueo.

## Bloqueos activos

Lo que impide avanzar y no se resuelve del lado técnico.

| ID | Bloqueo | Bloquea | Responsable | Desde |
|---|---|---|---|---|
| B-001 | Decisión de dominio (P-001) | S2, S7 | Cliente | — |
| B-002 | Manual de identidad, si existe (P-002) | S1 | Cliente | — |
| B-003 | Alcance de Human Balance: ¿reserva con cupos? (P-003) | S4 | Cliente | — |
| B-004 | Accesos: WordPress, hosting SiteGround (también DNS), registrador GoDaddy, analítica, CRM de WP Fusion | S0, S6, S7 | Cliente | 2026-10-10 |

## Contenido pendiente del cliente

Se llena con la salida de `pnpm pendientes` al cerrar el Sprint 2. Es la causa más frecuente de retraso en este tipo de proyecto, así que cada línea necesita responsable y fecha.

| Pieza | Tipo | Responsable | Fecha comprometida | Estado |
|---|---|---|---|---|
| Promesa de portada aprobada | Texto | Juan Carlos Simó | — | Pendiente |
| Textos del método: eliminar, reparar, liberar | Texto | Juan Carlos Simó | — | Pendiente |
| Fotografía de instalaciones | Imagen | Cliente | — | Pendiente |
| Fotografía y perfil de coaches | Imagen + texto | Cliente | — | Pendiente |
| Historias con autorización firmada | Texto + imagen | Cliente | — | Pendiente |
| Textos clínicos por motivo de consulta | Texto | Juan Carlos Simó | — | Pendiente |
| Descripciones de evaluaciones, incluida OligoScan | Texto | Juan Carlos Simó | — | Pendiente |
| Narrativa de los cinco protocolos | Texto | Juan Carlos Simó | — | Pendiente |
| Dosis y duración por producto | Datos | Cliente | — | Pendiente |
| Certificaciones y respaldo de productos | Documentos | Cliente | — | Pendiente |
| Políticas legales vigentes | Texto | Cliente | — | Pendiente |
| Logotipo oficial en vector (SVG) | Imagen | Cliente | — | Pendiente |
| Horarios por unidad | Texto | Cliente | — | Pendiente |
| Números de WhatsApp por unidad | Datos | Cliente | — | Pendiente |
| Enlaces oficiales de redes sociales | Datos | Cliente | — | Pendiente |

## Bloqueos resueltos

| ID | Resolución | Fecha |
|---|---|---|
| B-005 | Store API responde 200 con 46 productos (S0-01). D-003 se sostiene. | 2026-10-10 |

### Pendientes en el sitio

<!-- pendientes:inicio -->
_Generado con `pnpm pendientes --backlog`. No editar a mano._

| Ruta | Tipo | Qué falta | Archivo |
|---|---|---|---|
| (componente compartido) | Imagen | foto de ${nombre} | `src/components/blocks/Cards.tsx:134` |
| (componente compartido) | Imagen | foto autorizada de ${nombre} | `src/components/blocks/Cards.tsx:21` |
| (componente compartido) | Imagen | retrato de ${nombre} | `src/components/blocks/Cards.tsx:50` |
| (componente compartido) | Texto | número de WhatsApp de ${label.toLowerCase()} (variable de entorno) | `src/components/blocks/ContactStrip.tsx:43` |
| (componente compartido) | Texto | horarios de Human Balance, consultorio y tienda | `src/components/blocks/ContactStrip.tsx:70` |
| (componente compartido) | Texto | horarios de atención por unidad | `src/components/blocks/Footer.tsx:37` |
| (componente compartido) | Texto | enlaces oficiales a redes sociales | `src/components/blocks/Footer.tsx:67` |
| / | Texto | frecuencia y contenido del boletín (cliente) | `src/app/(marca)/page.tsx:123` |
| / | Texto | promesa de portada aprobada por Juan Carlos Simó: a quién sirve y qué resuelve, en una frase | `src/app/(marca)/page.tsx:41` |
| / | Texto | historias con resultados concretos y autorización firmada (cliente) | `src/app/(marca)/page.tsx:89` |
| /aviso-legal | Texto | aviso legal vigente, migrado desde humanstores.com/aviso-legal | `src/app/(legal)/aviso-legal/page.tsx:16` |
| /contenido | Texto | artículos publicados (Juan Carlos Simó / equipo de contenido) | `src/app/(marca)/contenido/page.tsx:28` |
| /contenido | Texto | enlace al canal oficial de video (cliente) | `src/app/(marca)/contenido/page.tsx:86` |
| /contenido/articulo-ejemplo | Texto | artículos reales para la sección de contenido (Juan Carlos Simó / equipo de contenido) | `content/contenido/articulo-ejemplo.mdx:9` |
| /entrenar | Imagen | fotografía de entrenamiento en Human Balance | `src/app/entrenar/page.tsx:66` |
| /entrenar | Texto | propuesta de Human Balance en palabras del equipo, validada por Juan Carlos Simó | `src/app/entrenar/page.tsx:87` |
| /entrenar/clase-de-prueba/gracias | Texto | tiempo de respuesta comprometido por Human Balance (por ejemplo, en menos de un día laborable) | `src/app/entrenar/clase-de-prueba/gracias/page.tsx:31` |
| /entrenar/coaches | Texto | fotografía y perfil de cada coach del equipo (Human Balance) | `src/app/entrenar/coaches/page.tsx:43` |
| /entrenar/coaches/coach-ejemplo | Imagen | retrato del coach | `content/coaches/coach-ejemplo.mdx:10` |
| /entrenar/coaches/coach-ejemplo | Texto | perfil de cada coach: especialidad, formación y enfoque (Human Balance) | `content/coaches/coach-ejemplo.mdx:12` |
| /entrenar/instalaciones | Imagen | área de entrenamiento | `src/app/entrenar/instalaciones/page.tsx:35` |
| /entrenar/instalaciones | Imagen | área de evaluación | `src/app/entrenar/instalaciones/page.tsx:36` |
| /entrenar/instalaciones | Imagen | fachada y acceso | `src/app/entrenar/instalaciones/page.tsx:37` |
| /entrenar/instalaciones | Texto | horario de Human Balance por día de la semana | `src/app/entrenar/instalaciones/page.tsx:44` |
| /entrenar/instalaciones | Texto | dirección exacta con número y referencia | `src/app/entrenar/instalaciones/page.tsx:53` |
| /entrenar/modalidades | Texto | lista de modalidades de Human Balance con nombre y descripción (Human Balance) | `src/app/entrenar/modalidades/page.tsx:35` |
| /historias | Texto | historias con autorización firmada: punto de partida, proceso y resultado (cliente) | `src/app/(marca)/historias/page.tsx:41` |
| /juan-carlos-simo | Texto | enlaces oficiales a la cobertura del libro (Diario Libre, Listín Diario, El Caribe, Hoy) y a podcasts (cliente) | `src/app/(marca)/juan-carlos-simo/page.tsx:115` |
| /juan-carlos-simo | Imagen | fotografía oficial de Juan Carlos Simó | `src/app/(marca)/juan-carlos-simo/page.tsx:57` |
| /juan-carlos-simo | Texto | trayectoria completa con fechas e instituciones, verificada por Juan Carlos Simó | `src/app/(marca)/juan-carlos-simo/page.tsx:75` |
| /metodo | Texto | lógica completa del método y criterios para pasar de un paso al siguiente (Juan Carlos Simó) | `src/app/(marca)/metodo/page.tsx:47` |
| /metodo/eliminar | Texto | qué se elimina y por qué: texto de Juan Carlos Simó para el paso Eliminar | `content/metodo/eliminar.mdx:11` |
| /metodo/liberar | Texto | qué se libera: texto de Juan Carlos Simó para el paso Liberar | `content/metodo/liberar.mdx:11` |
| /metodo/reparar | Texto | qué se repara y cómo: texto de Juan Carlos Simó para el paso Reparar | `content/metodo/reparar.mdx:11` |
| /politica-de-entrega | Texto | política de entrega vigente, migrada desde humanstores.com/politicas-de-entrega | `src/app/(legal)/politica-de-entrega/page.tsx:16` |
| /politica-de-reembolsos | Texto | política de reembolsos vigente, migrada desde humanstores.com/politicas-de-reembolsos | `src/app/(legal)/politica-de-reembolsos/page.tsx:16` |
| /privacidad | Texto | aviso de privacidad vigente del cliente, migrado desde humanstores.com/politica-privacidad, con revisión legal conforme a la Ley No. 172-13 | `src/app/(legal)/privacidad/page.tsx:21` |
| /privacidad | Texto | responsable del tratamiento, plazo de conservación y canal para ejercer los derechos de acceso, rectificación y cancelación (cliente, revisión legal) | `src/app/(legal)/privacidad/page.tsx:72` |
| /sanar | Texto | qué es la dietética funcional y en qué se diferencia de una consulta nutricional tradicional, con la respuesta en la primera frase (Juan Carlos Simó) | `src/app/sanar/page.tsx:44` |
| /sanar/agendar/gracias | Texto | qué traer a la evaluación y cómo prepararse (ayuno, ropa, estudios previos), definido por el consultorio | `src/app/sanar/agendar/gracias/page.tsx:30` |
| /sanar/agendar/gracias | Texto | tiempo de respuesta comprometido por el consultorio | `src/app/sanar/agendar/gracias/page.tsx:31` |
| /sanar/evaluaciones | Texto | lista completa de evaluaciones disponibles además de OligoScan (consultorio) | `src/app/sanar/evaluaciones/page.tsx:46` |
| /sanar/evaluaciones/oligoscan | Texto | OligoScan: qué mide, en lenguaje llano (Juan Carlos Simó) | `content/evaluaciones/oligoscan.mdx:12` |
| /sanar/evaluaciones/oligoscan | Texto | OligoScan: cómo se hace | `content/evaluaciones/oligoscan.mdx:16` |
| /sanar/evaluaciones/oligoscan | Texto | OligoScan: duración | `content/evaluaciones/oligoscan.mdx:20` |
| /sanar/evaluaciones/oligoscan | Texto | OligoScan: qué recibe el paciente | `content/evaluaciones/oligoscan.mdx:24` |
| /sanar/motivos/[motivo] | Texto | preguntas frecuentes sobre ${entry?.frontmatter.nombre.toLowerCase() ?? "este motivo"}, con respuesta directa (Juan Carlos Simó) | `src/app/sanar/motivos/[motivo]/page.tsx:97` |
| /sanar/motivos/composicion-corporal | Texto | composición corporal: qué se siente (texto clínico aprobado por Juan Carlos Simó) | `content/motivos/composicion-corporal.mdx:14` |
| /sanar/motivos/composicion-corporal | Texto | composición corporal: qué puede haber detrás | `content/motivos/composicion-corporal.mdx:18` |
| /sanar/motivos/composicion-corporal | Texto | composición corporal: cómo se aborda en consulta | `content/motivos/composicion-corporal.mdx:22` |
| /sanar/motivos/composicion-corporal | Texto | composición corporal: qué esperar del proceso, sin promesas de resultado | `content/motivos/composicion-corporal.mdx:26` |
| /sanar/motivos/digestion | Texto | digestión: qué se siente (texto clínico aprobado por Juan Carlos Simó) | `content/motivos/digestion.mdx:14` |
| /sanar/motivos/digestion | Texto | digestión: qué puede haber detrás | `content/motivos/digestion.mdx:18` |
| /sanar/motivos/digestion | Texto | digestión: cómo se aborda en consulta | `content/motivos/digestion.mdx:22` |
| /sanar/motivos/digestion | Texto | digestión: qué esperar del proceso, sin promesas de resultado | `content/motivos/digestion.mdx:26` |
| /sanar/motivos/fatiga | Texto | fatiga: qué se siente (texto clínico aprobado por Juan Carlos Simó) | `content/motivos/fatiga.mdx:14` |
| /sanar/motivos/fatiga | Texto | fatiga: qué puede haber detrás | `content/motivos/fatiga.mdx:18` |
| /sanar/motivos/fatiga | Texto | fatiga: cómo se aborda en consulta | `content/motivos/fatiga.mdx:22` |
| /sanar/motivos/fatiga | Texto | fatiga: qué esperar del proceso, sin promesas de resultado | `content/motivos/fatiga.mdx:26` |
| /sanar/motivos/inflamacion | Texto | inflamación: qué se siente (texto clínico aprobado por Juan Carlos Simó) | `content/motivos/inflamacion.mdx:14` |
| /sanar/motivos/inflamacion | Texto | inflamación: qué puede haber detrás | `content/motivos/inflamacion.mdx:18` |
| /sanar/motivos/inflamacion | Texto | inflamación: cómo se aborda en consulta | `content/motivos/inflamacion.mdx:22` |
| /sanar/motivos/inflamacion | Texto | inflamación: qué esperar del proceso, sin promesas de resultado | `content/motivos/inflamacion.mdx:26` |
| /sanar/motivos/prevencion | Texto | prevención: qué se siente (texto clínico aprobado por Juan Carlos Simó) | `content/motivos/prevencion.mdx:14` |
| /sanar/motivos/prevencion | Texto | prevención: qué puede haber detrás | `content/motivos/prevencion.mdx:18` |
| /sanar/motivos/prevencion | Texto | prevención: cómo se aborda en consulta | `content/motivos/prevencion.mdx:22` |
| /sanar/motivos/prevencion | Texto | prevención: qué esperar del proceso, sin promesas de resultado | `content/motivos/prevencion.mdx:26` |
| /sanar/motivos/sueno | Texto | sueño: qué se siente (texto clínico aprobado por Juan Carlos Simó) | `content/motivos/sueno.mdx:14` |
| /sanar/motivos/sueno | Texto | sueño: qué puede haber detrás | `content/motivos/sueno.mdx:18` |
| /sanar/motivos/sueno | Texto | sueño: cómo se aborda en consulta | `content/motivos/sueno.mdx:22` |
| /sanar/motivos/sueno | Texto | sueño: qué esperar del proceso, sin promesas de resultado | `content/motivos/sueno.mdx:26` |
| /sanar/primera-consulta | Texto | primera consulta: ${m.toLowerCase()} (consultorio) | `src/app/sanar/primera-consulta/page.tsx:45` |
| /terminos | Texto | términos y condiciones vigentes del cliente (revisión legal) | `src/app/(legal)/terminos/page.tsx:16` |
| /tienda | Texto | catálogo conectado a WooCommerce (Sprint 6) | `src/app/tienda/page.tsx:25` |
| /tienda/carrito | Texto | carrito (Sprint 6) | `src/app/tienda/carrito/page.tsx:25` |
| /tienda/omni | Texto | historia y respaldo de la línea OMNI (cliente) | `src/app/tienda/omni/page.tsx:24` |
| /tienda/productos | Texto | catálogo con filtros (Sprint 6) | `src/app/tienda/productos/page.tsx:24` |
| /tienda/protocolos | Texto | índice de protocolos (Sprint 6) | `src/app/tienda/protocolos/page.tsx:25` |
| /tienda/protocolos/estres-y-sueno-cronico | Texto | narrativa del protocolo Estrés y Sueño Crónico: para quién es, cómo se toma, por cuánto tiempo, qué esperar y qué no es (Juan Carlos Simó) | `content/protocolos/estres-y-sueno-cronico.mdx:12` |
| /tienda/protocolos/fat-loss | Texto | narrativa del protocolo Fat Loss: para quién es, cómo se toma, por cuánto tiempo, qué esperar y qué no es (Juan Carlos Simó) | `content/protocolos/fat-loss.mdx:12` |
| /tienda/protocolos/higado | Texto | narrativa del protocolo Hígado: para quién es, cómo se toma, por cuánto tiempo, qué esperar y qué no es (Juan Carlos Simó) | `content/protocolos/higado.mdx:12` |
| /tienda/protocolos/inmunidad | Texto | narrativa del protocolo Inmunidad: para quién es, cómo se toma, por cuánto tiempo, qué esperar y qué no es (Juan Carlos Simó) | `content/protocolos/inmunidad.mdx:12` |
| /tienda/protocolos/requerimiento-diario | Texto | narrativa del protocolo Requerimiento Diario: para quién es, cómo se toma, por cuánto tiempo, qué esperar y qué no es (Juan Carlos Simó) | `content/protocolos/requerimiento-diario.mdx:12` |
<!-- pendientes:fin -->

## Deuda técnica declarada

| ID | Deuda | Origen | Cuándo revisarla |
|---|---|---|---|
| DT-001 | Salto visual entre el catálogo nuevo y el checkout de WooCommerce | D-003 | Tras 3 meses en operación, con datos de abandono |
| DT-002 | Publicar contenido requiere un commit | D-004 | Si el cliente publica más de una vez por semana |
| DT-003 | Límite de intentos de formularios en memoria, por instancia de Vercel | D-012 | Si aparece spam que pase Turnstile |
| DT-004 | Las solicitudes solo quedan en el correo del equipo, sin historial consultable | D-012 | Si el cliente pide reportes de solicitudes |

## Ideas fuera de alcance

No entran a ningún sprint actual. Se registran para no perderlas y para que nadie las cuele a medio proyecto.

- Reserva de clases con cupos en línea
- Portal de paciente con resultados de evaluaciones
- Integración del CRM con el sitio (depende de la decisión de CRM del cliente)
- Versión en inglés
- Aplicación móvil
- Comunidad o membresía de contenido
