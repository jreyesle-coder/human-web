# Sprint 3 · Núcleo de marca

**Duración:** 2 semanas
**Objetivo:** levantar la portada y las páginas del método. Es lo que diferencia al grupo de cualquier competidor y lo que sostiene la credibilidad de las otras dos rutas.

## Contexto obligatorio

Lee `docs/00-marca-y-filosofia.md` antes de escribir una línea de texto. **No inventes afirmaciones de salud ni resultados.**

## Tareas

### Portada — `/`

- [ ] **S3-01** Hero con promesa específica. No "bienestar integral": una frase que diga a quién sirve y qué resuelve. Si no está aprobada, `{{PENDIENTE: promesa de portada aprobada por el cliente}}`.
- [ ] **S3-02** `RouteCards`: las tres rutas como decisión principal de la página, arriba del pliegue en escritorio y visible al primer scroll en móvil.
- [ ] **S3-03** Sección del método en tres pasos, con enlace a `/metodo`.
- [ ] **S3-04** Prueba social con resultados concretos. Solo historias con `autorizacion: true`. Si no hay ninguna aún, placeholder.
- [ ] **S3-05** Banda de autoridad: credenciales y formación de Juan Carlos Simó, con enlace a su página.
- [ ] **S3-06** Captación de correo con propuesta clara de qué se recibe.
- [ ] **S3-07** Franja de contacto: ubicación, horarios y WhatsApp por unidad.

### Método — `/metodo` y sus tres pasos

- [ ] **S3-08** Página índice del método, con la lógica de los tres pasos y en qué orden se recorren.
- [ ] **S3-09** `/metodo/eliminar` — qué se elimina y por qué.
- [ ] **S3-10** `/metodo/reparar` — qué se repara y cómo.
- [ ] **S3-11** `/metodo/liberar` — qué se libera, cierre hacia la evaluación.
- [ ] **S3-12** Navegación entre pasos con indicador de posición.
- [ ] **S3-13** El libro como pieza de soporte en cada paso, sin convertirlo en el protagonista.
- [ ] **S3-14** Cada paso cierra con un llamado distinto: los dos primeros al siguiente paso, el tercero a agendar evaluación.

### Juan Carlos Simó — `/juan-carlos-simo`

- [ ] **S3-15** Trayectoria, credenciales y formación. Todo verificable desde `docs/00-marca-y-filosofia.md`; nada agregado.
- [ ] **S3-16** Publicaciones y apariciones en medios, con enlaces externos reales.
- [ ] **S3-17** Datos estructurados `Person` completos.

### Historias — `/historias`

- [ ] **S3-18** Índice filtrable por objetivo.
- [ ] **S3-19** Plantilla de historia individual: punto de partida, proceso y resultado.
- [ ] **S3-20** Verificar que la salvaguarda de `autorizacion` funciona: crear una historia sin el campo y confirmar que no se renderiza.

### Contenido — `/contenido`

- [ ] **S3-21** Índice de artículos con paginación.
- [ ] **S3-22** Plantilla de artículo con tiempo de lectura y protocolo relacionado.
- [ ] **S3-23** Incrustado de video del canal existente, con carga diferida.

### Rendimiento

- [ ] **S3-24** Optimizar imágenes de la portada: formato moderno, tamaños adecuados, precarga solo de la imagen del hero.
- [ ] **S3-25** Verificar métricas de carga de la portada en móvil con conexión lenta simulada.

## Criterios de aceptación

- La portada carga en menos de 2,5 segundos en 4G simulado
- Las tres rutas conducen correctamente aunque las secciones estén en placeholder
- Ninguna afirmación de salud o resultado sin respaldo en el documento de marca
- Datos estructurados validados sin errores
- Revisión de contenido entregada al cliente
