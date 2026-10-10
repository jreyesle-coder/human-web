# Sprint 7 · Pago y migración

**Duración:** 2 semanas
**Objetivo:** cerrar el circuito comercial y mover la operación al nuevo sitio sin perder posicionamiento, pedidos ni clientes.

## Principio rector

**No se reimplementa el pago.** La pasarela actual ya funciona con verificación 3D Secure, y en República Dominicana integrar una pasarela local es el punto más lento y riesgoso de cualquier proyecto de comercio. El carrito se entrega a WooCommerce y ahí se paga. Ver D-003 en `docs/03-stack-y-decisiones.md`.

Este sprint es el de mayor riesgo operativo del proyecto: si algo sale mal, el cliente deja de vender. Nada se publica sin plan de reversión.

## Tareas

### Handoff de carrito

- [ ] **S7-01** Mecanismo de traspaso del carrito del frontend al checkout de WooCommerce, preservando productos, cantidades y variantes.
- [ ] **S7-02** Verificar que el carrito llega completo y con los precios correctos, incluidos protocolos agregados en un solo paso.
- [ ] **S7-03** Manejar el regreso desde el checkout: compra exitosa, compra cancelada, sesión vencida.
- [ ] **S7-04** Página de confirmación en el sitio nuevo tras compra exitosa, con siguiente paso sugerido.

### Continuidad visual

- [ ] **S7-05** Personalizar el checkout de WooCommerce con el logotipo, los colores y la tipografía del sistema nuevo.
- [ ] **S7-06** Verificar que el checkout funciona bien en móvil: es donde ocurre la mayoría de las compras.
- [ ] **S7-07** Mostrar el costo de envío antes de salir del sitio nuevo, no como sorpresa en el pago.

### Cuenta de cliente

- [ ] **S7-08** Decidir y registrar: cuenta en Woo con enlace desde el sitio nuevo, o cuenta propia. Lo más simple es lo primero.
- [ ] **S7-09** Enlaces a pedidos y cuenta desde la navegación.
- [ ] **S7-10** Si el alcance lo permite, vista de "mi protocolo activo" con opción de repetir compra.

### Suscripción al protocolo

- [ ] **S7-11** Verificar si WooCommerce Subscriptions está disponible en la instalación. Si no lo está, **registrar como decisión de negocio y no improvisar** una alternativa.
- [ ] **S7-12** Si está disponible: suscripción con periodicidad calculada según la duración real del envase.
- [ ] **S7-13** Texto de suscripción anclado en no quedarse sin producto a mitad del protocolo, no en el descuento.

### Migración y redirecciones

- [ ] **S7-14** Construir el mapa de redirecciones a partir de `docs/rutas-actuales.csv`. Toda ruta viva necesita destino.
- [ ] **S7-15** Implementar redirecciones permanentes (301) en `next.config`.
- [ ] **S7-16** Verificar que ninguna ruta antigua devuelve 404: rastreo automatizado contra la lista.
- [ ] **S7-17** Conservar las URL de producto si es posible. Si cambian, redirección uno a uno, nunca todo a la portada.
- [ ] **S7-18** Migrar el contenido de las páginas legales vigentes.
- [ ] **S7-19** Enviar el sitemap nuevo a las herramientas de búsqueda y vigilar la cobertura las dos semanas siguientes.

### Pruebas y reversión

- [ ] **S7-20** Compra completa de prueba en producción, con tarjeta real y verificación 3D Secure.
- [ ] **S7-21** Prueba de compra de protocolo completo, no solo de producto individual.
- [ ] **S7-22** Plan de reversión escrito: cómo se vuelve al estado anterior en menos de 15 minutos y quién lo ejecuta.
- [ ] **S7-23** Medición de abandono de carrito activa desde el primer día.

## Criterios de aceptación

- Compra completa realizada de principio a fin en producción, con dinero real
- Ninguna ruta anterior devuelve error
- El checkout no se ve como un sitio distinto
- Plan de reversión escrito y probado al menos una vez
- Abandono de carrito medible desde el día uno
