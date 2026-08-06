# Contrato API de Prospectos

Definido como parte de la Fase 1 (core mínimo). La implementación de referencia
vive en `src/pages/api/prospecto.ts`.

## Endpoint

`POST /api/prospecto`

Formato: `application/json`.

### Solicitud

```json
{
  "tipo": "diagnostico",
  "nombre": "María Pérez",
  "email": "maria@empresa.cl",
  "telefono": "+56 9 1234 5678",
  "mensaje": null,
  "website": ""
}
```

| Campo       | Tipo   | Obligatorio                        | Reglas                                       |
|-------------|--------|------------------------------------|----------------------------------------------|
| `tipo`      | string | Sí                                 | `diagnostico` \| `contacto`                  |
| `nombre`    | string | Sí                                 | ≤ 120 caracteres                             |
| `email`     | string | Diagnóstico: al menos email o teléfono; Contacto: sí | Formato válido, ≤ 160 caracteres |
| `telefono`  | string | No                                 | ≤ 40 caracteres                              |
| `mensaje`   | string | Contacto: sí; Diagnóstico: no      | ≤ 2000 caracteres                            |
| `website`   | string | No                                 | Honeypot anti-spam: si viene lleno, se descarta |

### Respuestas

| Código | Caso                                   |
|--------|----------------------------------------|
| 201    | `{ "ok": true }` — solicitud persistida |
| 200    | `{ "ok": true }` — descartada por honeypot (simula éxito) |
| 400    | `{ "error": "..." }` — validación fallida |
| 429    | `{ "error": "Demasiadas solicitudes" }` — rate limit |
| 503    | `{ "error": "..." }` — fallo de persistencia |

### Nota sobre autenticación y rate limit (MVP)

- **Autenticación:** sin token. El endpoint es público (formulario público).
  La protección se basa en honeypot + rate limit + validación estricta.
- **Rate limit:** en memoria por IP (5 envíos / 10 min). Limitación conocida:
  al escalar a múltiples instancias el límite es por instancia. A evaluar con
  el backend de la plataforma futura.

## Persistencia

- Base de datos: PostgreSQL (`DATABASE_URL`).
- Tabla: `prospecto` (esquema canónico en `db/schema.sql`).
- El `CREATE TABLE IF NOT EXISTS` se ejecuta de forma idempotente en la API.

## Notificación

- Email transaccional vía Resend (`RESEND_API_KEY`, `NOTIFY_EMAIL`).
- No bloqueante: la respuesta al usuario no depende del email; la base respalda.

## Variables de entorno

| Variable        | Descripción                              |
|-----------------|------------------------------------------|
| `DATABASE_URL`  | Cadena de conexión PostgreSQL            |
| `RESEND_API_KEY`| API key de Resend (opcional en desarrollo) |
| `NOTIFY_EMAIL`  | Correo de destino de las notificaciones  |
