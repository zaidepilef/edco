export interface ProspectFormConfig {
  type: "diagnostico" | "contacto";
  /** true si el campo mensaje debe mostrarse */
  withMessage?: boolean;
  successTitle: string;
  successText: string;
  submitLabel: string;
}

const CONTACT_EMAIL = "contacto@edco.cl";

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

/** Muestra la confirmación simulada de la demo con el correo de contacto de EDCO. */
function showSuccess(form: HTMLFormElement, config: ProspectFormConfig) {
  const status = form.querySelector<HTMLElement>("[data-form-status]");
  if (!status) return;
  status.dataset.kind = "success";
  status.innerHTML = `${config.successTitle} ${config.successText} Escríbenos a <a href="mailto:${CONTACT_EMAIL}" class="font-semibold underline">${CONTACT_EMAIL}</a>.`;
}

/** Habilita el envío de los formularios de demostración (sitio estático sin backend). */
export function initProspectForm(form: HTMLFormElement, config: ProspectFormConfig) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = fieldValue(form, "nombre");
    const email = fieldValue(form, "email");
    const telefono = fieldValue(form, "telefono");
    const mensaje = fieldValue(form, "mensaje");

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

    showSuccess(form, config);
    form.reset();
  });
}