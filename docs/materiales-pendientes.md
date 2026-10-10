# Materiales pendientes del cliente

S2-18. Lista consolidada de lo que HUMAN tiene que producir o entregar para que el sitio pueda lanzarse. Generada al cierre de la corrida S1–S6 (2026-10-10) a partir de `pnpm pendientes`: el sitio ya muestra cada pieza en su lugar, marcada como `{{PENDIENTE: ...}}`.

**Cómo usarla:** asignar un responsable y una fecha comprometida a cada línea en la reunión de revisión. Mientras exista una sola línea abierta, el build de lanzamiento falla a propósito (D-008).

Responsables sugeridos: **JCS** = Juan Carlos Simó · **HB** = equipo de Human Balance · **CDF** = Centro de Dietética Funcional · **HS** = Human Stores · **Admin** = administración / legal.

## 1. Textos de marca y método

| # | Pieza | Dónde se ve | Sugerido | Responsable | Fecha |
|---|---|---|---|---|---|
| 1 | Promesa de portada: a quién sirve y qué resuelve, en una frase | `/` | JCS | | |
| 2 | Lógica completa del método y criterios para pasar de un paso al siguiente | `/metodo` | JCS | | |
| 3 | Texto de cada paso: Eliminar, Reparar, Liberar | `/metodo/*` | JCS | | |
| 4 | Trayectoria completa con fechas e instituciones | `/juan-carlos-simo` | JCS | | |
| 5 | Enlaces a la cobertura del libro en Diario Libre, Listín Diario, El Caribe y Hoy. Los podcasts ya están (Clean Health, TWUP #45, Emprende Ahora, su canal Vida Sana) | `/juan-carlos-simo` | JCS | | |
| 6 | Artículos para la sección de contenido. El canal de video ya está enlazado (youtube.com/@jcsimo) | `/contenido` | JCS | | |

## 2. Fotografía (ninguna de banco)

| # | Pieza | Dónde se ve | Sugerido | Responsable | Fecha |
|---|---|---|---|---|---|
| 7 | ~~Fotografía oficial de Juan Carlos Simó~~ **Resuelto:** se usa el retrato publicado en la biblioteca de humanstores.com (2023). Confirmar que es la foto vigente | `/juan-carlos-simo` | JCS | | Confirmar |
| 8 | Fotografía de entrenamiento | `/entrenar` | HB | | |
| 9 | Instalaciones: área de entrenamiento, área de evaluación, fachada | `/entrenar/instalaciones` | HB | | |
| 10 | Retrato de cada coach | `/entrenar/coaches` | HB | | |
| 11 | Logotipo oficial en vector (SVG) | Encabezado y pie | Admin | | |

## 3. Human Balance

| # | Pieza | Dónde se ve | Sugerido | Responsable | Fecha |
|---|---|---|---|---|---|
| 12 | Propuesta de Human Balance en palabras del equipo | `/entrenar` | HB + JCS | | |
| 13 | Lista de modalidades con nombre y descripción | `/entrenar/modalidades` | HB | | |
| 14 | Perfil de cada coach: especialidad, formación y enfoque | `/entrenar/coaches/*` | HB | | |
| 15 | Horario por día de la semana y dirección exacta | `/entrenar/instalaciones` | HB | | |
| 16 | Tiempo de respuesta comprometido a una solicitud de clase | `/entrenar/clase-de-prueba/gracias` | HB | | |
| 17 | ¿Reserva con cupos o solo solicitud de clase de prueba? (P-003) | Decide el alcance del Sprint 4 | Dirección | | |

## 4. Centro de Dietética Funcional (textos clínicos: solo con aprobación de JCS)

| # | Pieza | Dónde se ve | Sugerido | Responsable | Fecha |
|---|---|---|---|---|---|
| 18 | Qué es la dietética funcional y en qué se diferencia de una consulta tradicional | `/sanar` | JCS | | |
| 19 | Seis motivos (fatiga, inflamación, sueño, digestión, composición corporal, prevención): qué se siente, qué puede haber detrás, cómo se aborda, qué esperar | `/sanar/motivos/*` | JCS | | |
| 20 | Preguntas frecuentes por motivo, con la respuesta en la primera frase | `/sanar/motivos/*` | JCS | | |
| 21 | Lista completa de evaluaciones además de OligoScan | `/sanar/evaluaciones` | CDF | | |
| 22 | OligoScan: qué mide, cómo se hace, cuánto dura, qué recibe el paciente | `/sanar/evaluaciones/oligoscan` | JCS | | |
| 23 | Primera consulta paso a paso (antes, al llegar, durante, al terminar, después) | `/sanar/primera-consulta` | CDF | | |
| 24 | Qué traer y cómo prepararse; tiempo de respuesta | `/sanar/agendar/gracias` | CDF | | |
| 25 | Historias con autorización firmada: punto de partida, proceso y resultado | `/historias` y portada | CDF + HB | | |

## 5. Human Stores

| # | Pieza | Dónde se ve | Sugerido | Responsable | Fecha |
|---|---|---|---|---|---|
| 26 | Narrativa de los cinco protocolos: para quién es, cómo se toma, por cuánto tiempo, qué esperar, qué no es | `/tienda/protocolos/*` | JCS | | |
| 27 | Preguntas frecuentes por protocolo | `/tienda/protocolos/*` | JCS | | |
| 28 | **Etiquetar en WooCommerce los productos de cada protocolo.** Hoy Requerimiento Diario tiene 1 producto e Inmunidad 2; OMNI MAG aparece en casi todos. | WordPress → Productos → Etiquetas | HS | | |
| 29 | **Asignar la marca OMNI** a todos sus productos (hoy solo uno la tiene) e historia de la línea OMNI | `/tienda/omni` | HS | | |
| 30 | Por cada producto (45): dosis, días que rinde el envase, qué esperar, ingredientes por porción | `/tienda/productos/*` | HS + JCS | | |
| 31 | Por cada producto: certificaciones, país de fabricación y preguntas frecuentes | `/tienda/productos/*` | HS | | |
| 32 | Clasificación por sistema del cuerpo (para el filtro del catálogo) | `/tienda/productos` | HS + JCS | | |
| 33 | Reseñas verificadas: la tienda actual no tiene ninguna. ¿Se habilitan en WooCommerce? | Fichas de producto | HS | | |
| 34 | Limpiar categorías duplicadas en WooCommerce ("Todos" aparece dos veces) | WordPress | HS | | |

## 6. Contacto, legales y datos

| # | Pieza | Dónde se ve | Sugerido | Responsable | Fecha |
|---|---|---|---|---|---|
| 35 | Números de WhatsApp por unidad (entrenamiento, consultorio, tienda) | Todo el sitio | Admin | | |
| 36 | Horarios de atención por unidad | Pie y contacto | Admin | | |
| 37 | ~~Redes sociales~~ **Resuelto:** Instagram @jc_simo, YouTube @jcsimo y Facebook Human Performance Center. **Ojo:** el enlace a YouTube del sitio actual (`@vidasana-juancarlossimo`) está roto; el canal real es `@jcsimo` | Pie | Admin | | Confirmar |
| 38 | Políticas vigentes para migrar: privacidad, términos, entrega, reembolsos, aviso legal | `/privacidad` y legales | Admin | | |
| 39 | Responsable del tratamiento de datos, plazo de conservación y canal de derechos (Ley 172-13) | `/privacidad` | Admin + legal | | |
| 40 | Frecuencia y contenido real del boletín (hoy: "Protocolos cada semana") | Portada | HS | | |
| 45 | Aprobar el video de la portada (hoy: Ep. 28, "El estilo de vida The Simó Diet: fase 1 y fase 2") o indicar otro | Portada | JCS | | |

## 7. Accesos y decisiones (bloquean fases siguientes)

| # | Pieza | Bloquea | Responsable | Fecha |
|---|---|---|---|---|
| 41 | Dominio definitivo (P-001) | Sprint 7 (redirecciones) y lanzamiento | Dirección | |
| 42 | Manual de identidad, si existe (P-002) | Ajuste final de colores y tipografías | Dirección | |
| 43 | Accesos: WordPress, SiteGround, GoDaddy, analítica y el CRM conectado por WP Fusion (B-004) | Sprint 7 | Admin | |
| 44 | Cuenta de Resend y correo que recibe las solicitudes | Prueba real de formularios | Admin | |
