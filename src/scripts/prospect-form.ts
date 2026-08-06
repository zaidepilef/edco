export interface ProspectFormConfig {
  type: "diagnostico" | "contacto";
  /** true si el campo mensaje debe mostrarse */
  withMessage?: boolean;
  successTitle: string;
  successText: string;
  submitLabel: string;
}

function setStatus(form: HTMLFormElement, message: string, kind: "error" | "success") {
  const status = form.querySelector<HTMLElement>("[data-form-status]");
  if (!status) return;
  status.textContent = message;
  status.dataset.kind = kind;
}

function setError(field: HTMLElement | null, message: string) {
  const error = field?.querySelector<HTMLElement>("[data-error]");
  if (!error) return;
  error.textContent = message;
}

function fieldValue(form: HTMLFormElement, name: string): string {
  const input = form.elements.namedItem(name) as HTMLInputElement | null;
  return input ? input.value.trim() : "";
}

function validEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

/** Habilita el envío del formulario a la API de prospectos (tarea 4.7/4.8). */
export function initProspectForm(form: HTMLFormElement, config: ProspectFormConfig) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nombre = fieldValue(form, "nombre");
    const email = fieldValue(form, "email");
    const telefono = fieldValue(form, "telefono");
    const mensaje = fieldValue(form, "mensaje");
    const website = fieldValue(form, "website");

    setStatus(form, "", "error");
    setError(form.querySelector('[data-field="nombre"]'), "");
    setError(form.querySelector('[data-field="email"]'), "");
    setError(form.querySelector('[data-field="telefono"]'), "");

    let valid = true;

    if (!nombre) {
      setError(form.querySelector('[data-field="nombre"]'), "Ingresa tu nombre.");
      valid = false;
    }
    if (email && !validEmail(email)) {
      setError(form.querySelector('[data-field="email"]'), "Ingresa un correo válido.");
      valid = false;
    }
    if (config.type === "diagnostico" && !email && !telefono) {
      setError(
        form.querySelector('[data-field="email"]'),
        "Deja al menos un correo o teléfono para que podamos contactarte."
      );
      valid = false;
    }
    if (config.type === "contacto" && !email) {
      setError(form.querySelector('[data-field="email"]'), "Ingresa tu correo.");
      valid = false;
    }
    if (config.type === "contacto" && !mensaje) {
      setError(form.querySelector('[data-field="mensaje"]'), "Escribe tu mensaje.");
      valid = false;
    }

    if (!valid) return;

    const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (submit) {
      submit.disabled = true;
      submit.textContent = "Enviando…";
    }

    try {
      const response = await fetch("/api/prospecto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo: config.type,
          nombre,
          email: email || null,
          telefono: telefono || null,
          mensaje: mensaje || null,
          website,
        }),
      });

      if (!response.ok) {
        throw new Error("error");
      }

      setStatus(form, `${config.successTitle} ${config.successText}`, "success");
      form.reset();
    } catch {
      setStatus(
        form,
        "No pudimos enviar tu solicitud. Intenta nuevamente o escríbenos a contacto@edco.cl.",
        "error"
      );
    } finally {
      if (submit) {
        submit.disabled = false;
        submit.textContent = config.submitLabel;
      }
    }
  });
}
