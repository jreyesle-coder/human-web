# Datos personales: qué se capta, dónde vive y cuánto dura

S5-21. Documento técnico para la revisión legal del cliente (Ley No. 172-13). Describe lo que el sitio hace hoy. El aviso público está en `/privacidad`.

## Qué se capta

| Formulario | Ruta de envío | Campos | Texto libre |
|---|---|---|---|
| Boletín | `POST /api/leads/boletin` | correo, consentimiento | No |
| Clase de prueba | `POST /api/leads/clase-de-prueba` | nombre, teléfono, correo, objetivo (lista cerrada), disponibilidad (lista cerrada), coach (opcional) | Solo el nombre |
| Evaluación | `POST /api/leads/evaluacion` | nombre, teléfono, correo, motivo general (lista cerrada), horario (lista cerrada) | Solo el nombre |

En los tres: consentimiento explícito no premarcado y origen del envío (página, referente, `utm_source`, `utm_medium`, `utm_campaign`).

**Ningún formulario acepta texto libre sobre síntomas, historial o medicación.** El esquema de servidor descarta cualquier campo que no esté en la lista: un campo `sintomas` enviado a mano no pasa (prueba en `src/lib/forms/forms.test.ts`).

## Dónde viaja y dónde se almacena

1. El navegador envía los datos en el **cuerpo** de una petición `POST` por HTTPS. Nunca en la URL (verificado en `e2e/formularios.spec.ts`).
2. El servidor (función de Vercel) valida, verifica el reto anti-spam con Cloudflare Turnstile (solo recibe el token y la IP, no los datos) y envía dos correos por Resend: uno al equipo (`LEAD_NOTIFICATION_EMAIL`) y una confirmación a la persona.
3. **El sitio no guarda los datos en ninguna base de datos.** Quedan en:
   - el buzón del equipo que recibe los avisos;
   - el registro de envíos de Resend (proveedor de correo).
4. La analítica recibe solo el nombre del evento y propiedades de una lista cerrada (`formulario`, `unidad`, `origen`, `producto_id`, `protocolo`, `valor`, `cantidad`). El motivo de consulta, el nombre, el teléfono y el correo nunca se envían (prueba en `src/lib/forms/forms.test.ts`).

## Cuánto tiempo se conservan

| Dónde | Plazo | Quién lo decide |
|---|---|---|
| Buzón del equipo | `{{PENDIENTE: plazo de conservación definido por el cliente}}` | Cliente |
| Registro de Resend | Según el plan contratado en Resend (los registros de envío se purgan automáticamente) | Cliente, al contratar |
| Límite de intentos (IP + hora) | Diez minutos, en memoria; se pierde al reiniciar la función | Técnico |

## Terceros que intervienen

| Proveedor | Qué recibe | Para qué |
|---|---|---|
| Vercel | La petición completa (en tránsito) | Alojamiento del sitio |
| Cloudflare Turnstile | Token del reto e IP | Anti-spam |
| Resend | Contenido de los correos | Envío de avisos y confirmaciones |

## Pendiente del cliente

- Responsable del tratamiento y su contacto.
- Plazo de conservación en el buzón del equipo.
- Canal para ejercer los derechos de acceso, rectificación y cancelación.
- Revisión legal del aviso público en `/privacidad`.
