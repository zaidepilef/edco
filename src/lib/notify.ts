import { site } from "./site";

interface ProspectForNotify {
  tipo: "diagnostico" | "contacto";
  nombre: string;
  email: string | null;
  telefono: string | null;
  mensaje: string | null;
}

/**
 * Envía la notificación inmediata a EDCO usando la API REST de Resend.
 * Si no hay RESEND_API_KEY o NOTIFY_EMAIL configurados, registra en consola.
 * El envío nunca lanza: la persistencia en la base ya respalda el registro.
 */
export async function notifyProspect(prospect: ProspectForNotify): Promise<void> {
  const apiKey = import.meta.env.RESEND_API_KEY;
  const to = import.meta.env.NOTIFY_EMAIL;

  if (!apiKey || !to) {
    console.warn("[notify] Sin RESEND_API_KEY o NOTIFY_EMAIL: notificación omitida", {
      prospect,
    });
    return;
  }

  const asunto =
    prospect.tipo === "diagnostico"
      ? `🎯 Nuevo diagnóstico solicitado: ${prospect.nombre}`
      : `✉️ Nueva consulta de contacto: ${prospect.nombre}`;

  const cuerpo = [
    `Tipo: ${prospect.tipo}`,
    `Nombre: ${prospect.nombre}`,
    `Email: ${prospect.email ?? "—"}`,
    `Teléfono: ${prospect.telefono ?? "—"}`,
    prospect.mensaje ? `Mensaje: ${prospect.mensaje}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `EDCO Web <onboarding@resend.dev>`,
        to,
        subject: asunto,
        text: cuerpo,
      }),
    });
    if (!response.ok) {
      console.error("[notify] Error al enviar email", response.status, await response.text());
    }
  } catch (error) {
    console.error("[notify] Falló la notificación (la base ya respalda el registro)", error);
  }
}
