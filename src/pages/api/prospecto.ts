// Endpoint de prospectos (API) — se despliega como función serverless.
export const prerender = false;

import type { APIRoute } from "astro";
import { insertProspect } from "../../lib/prospecto";
import { notifyProspect } from "../../lib/notify";

// Rate limit simple en memoria (por instancia). Suficiente para el MVP;
// documentado como limitación en design.md. Máximo 5 envíos / 10 min / IP.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const recent = (hits.get(ip) ?? []).filter((t) => t > windowStart);
  if (recent.length >= RATE_LIMIT_MAX) return true;
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

const MAX_LEN = {
  nombre: 120,
  email: 160,
  telefono: 40,
  mensaje: 2000,
};

function validEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const ip = clientAddress ?? "unknown";

  // Honeypot: si el campo oculto viene lleno, descartar silenciosamente.
  const raw = await request.text();
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return new Response(JSON.stringify({ error: "JSON inválido" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (body.website) {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (isRateLimited(ip)) {
    return new Response(JSON.stringify({ error: "Demasiadas solicitudes" }), {
      status: 429,
      headers: { "Content-Type": "application/json" },
    });
  }

  const tipo = body.tipo as string;
  const nombre = typeof body.nombre === "string" ? body.nombre.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const telefono = typeof body.telefono === "string" ? body.telefono.trim() : "";
  const mensaje = typeof body.mensaje === "string" ? body.mensaje.trim() : "";

  if (tipo !== "diagnostico" && tipo !== "contacto") {
    return bad("Tipo de solicitud inválido.");
  }
  if (!nombre || nombre.length > MAX_LEN.nombre) {
    return bad("Nombre inválido.");
  }
  if (email && (!validEmail(email) || email.length > MAX_LEN.email)) {
    return bad("Correo electrónico inválido.");
  }
  if (telefono && telefono.length > MAX_LEN.telefono) {
    return bad("Teléfono inválido.");
  }
  if (mensaje.length > MAX_LEN.mensaje) {
    return bad("Mensaje demasiado largo.");
  }

  if (tipo === "diagnostico" && !email && !telefono) {
    return bad("Indica al menos un correo o teléfono de contacto.");
  }
  if (tipo === "contacto" && !email) {
    return bad("Indica tu correo de contacto.");
  }
  if (tipo === "contacto" && !mensaje) {
    return bad("Escribe tu mensaje.");
  }

  try {
    await insertProspect({
      tipo,
      nombre,
      email: email || null,
      telefono: telefono || null,
      mensaje: mensaje || null,
      ip,
    });
  } catch (error) {
    console.error("[api/prospecto] Error al persistir", error);
    return new Response(
      JSON.stringify({ error: "No se pudo registrar la solicitud." }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  // La notificación es no-bloqueante: no debe impedir la respuesta al usuario.
  void notifyProspect({
    tipo,
    nombre,
    email: email || null,
    telefono: telefono || null,
    mensaje: mensaje || null,
  });

  return new Response(JSON.stringify({ ok: true }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
};

function bad(error: string) {
  return new Response(JSON.stringify({ error }), {
    status: 400,
    headers: { "Content-Type": "application/json" },
  });
}
