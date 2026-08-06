## Context

El menú hamburguesa de `src/components/Header.astro` no abre en móvil. El componente se renderiza en todas las páginas a través de `src/layouts/Base.astro`. El script del componente (bloque `<script>` de Astro, ejecutado como módulo tras parsear el DOM) es el único responsable de la visibilidad del menú.

### Análisis del problema (causa raíz)

En el markup, el contenedor `#menu-mobile` combina **dos mecanismos de ocultamiento simultáneos**:

```html
<div id="menu-mobile" class="hidden border-t border-slate-200 bg-white lg:hidden" hidden>
```

1. **Clase de utilidad Tailwind `hidden`** → genera `display: none` (estática, siempre presente en el HTML).
2. **Atributo HTML `hidden`** → `display: none` vía estilos de agente de usuario, reforzado en Tailwind v4 por el preflight `[hidden]:where(:not([hidden='until-found'])) { display: none !important; }` (`node_modules/tailwindcss/preflight.css:396`).

El script de toggle solo gestiona **el atributo**:

```ts
function setMenu(open: boolean) {
  menu!.hidden = !open;          // toggles el atributo `hidden`
  toggle!.setAttribute("aria-expanded", String(open));
  ...
}
```

Secuencia del fallo al tocar el botón:

- Estado inicial: atributo `hidden` presente → `menu.hidden === true`.
- El handler lee `menu.hidden` y llama `setMenu(true)` → elimina el atributo `hidden`.
- **La clase `hidden` permanece** y sigue aplicando `display: none` → el menú queda invisible.
- Visualmente el menú "no abre"; solo cambian `aria-expanded` y `aria-label` (por eso el estado accesible parece actualizarse sin resultado visible).

La navegación de escritorio no se ve afectada: el `<ul>` de desktop usa `hidden lg:flex` y no depende de este script.

### Archivos involucrados

- `src/components/Header.astro` — markup del botón y del contenedor `#menu-mobile`, y script de toggle. **Único archivo con cambios de código.**
- `src/layouts/Base.astro` — renderiza `<Header />` en todas las páginas (sin cambios; contexto).
- `openspec/specs/corporate-website/spec.md` — spec principal de la capability; se sincroniza al archivar (sin cambios de código).

## Goals / Non-Goals

**Goals:**

- Que el botón hamburguesa abra y cierre el menú colapsable en viewports móviles (< 1024px) de forma fiable.
- Que el estado visual del menú y los atributos `aria-expanded` / `aria-label` permanezcan sincronizados.
- Que no haya regresión en la navegación de escritorio.
- Mantener el "mínimo JavaScript en cliente" que escribe el proyecto: sin librerías ni hidratación adicional.

**Non-Goals:**

- Rediseñar la navegación ni cambiar breakpoints existentes.
- Añadir animaciones de transición, drawer full-screen o scroll-lock.
- Migrar el menú a un framework de UI.
- Cambiar el comportamiento en desktop (`lg:flex`).

## Decisions

### 1. Fuente única de verdad: el atributo `hidden`, gestionado por JS

Se elimina la clase de utilidad `hidden` del markup de `#menu-mobile`, dejando solo el atributo `hidden` (estado cerrado por defecto) y la clase `lg:hidden` (el menú móvil nunca se muestra en escritorio):

```html
<div id="menu-mobile" class="border-t border-slate-200 bg-white lg:hidden" hidden>
```

El script existente (`menu.hidden = !open`) pasa a ser el único mecanismo de visibilidad.

- **Por qué:** el atributo `hidden` ya es `display: none !important` en el preflight de Tailwind v4, así que basta con que el JS alterne el atributo; la clase `hidden` era redundante y quedaba estática, impidiendo que el menú se mostrara. Con un solo mecanismo, el estado visual coincide con el estado del atributo.
- **Comportamiento resultante:**
  - Cerrado (atributo presente): `display: none` en cualquier viewport.
  - Abierto (atributo eliminado), viewport < 1024px: el `<div>` recupera su `display` por defecto y se muestra.
  - Abierto (atributo eliminado), viewport ≥ 1024px: `lg:hidden` lo oculta (el usuario ya ve la nav de escritorio).
- **Alternativas evaluadas:**
  - Alternativa B: mantener el markup y añadir `menu.classList.toggle("hidden", !open)` en el script. Funciona pero gestiona dos mecanismos redundantes para lo mismo; más frágil y propenso a divergir.
  - Alternativa C: estado CSS vía `data-open` / `aria-expanded`. Más "moderno" pero añade CSS extra y más estado que mantener sin beneficio real para un toggle simple.
- **Motivo:** el cambio es mínimo (1 atributo de clase), corrige la causa raíz y se apoya en comportamiento nativo del navegador + preflight ya presente.

### 2. Reforzar el script de toggle (robustez sin dependencias)

Se mantiene el handler actual pero se hace tolerante a ausencia de nodos (los `?.` ya lo cubren) y se conservan los cierres por `Escape`, por clic en un enlace y el sync de `aria-expanded`/`aria-label`. No se modifica la lógica de toggle.

- **Por qué:** la lógica existente es correcta; el bug es exclusivamente el conflicto de CSS. No conviene sobre-ingeniería.

## Risks / Trade-offs

- [Regresión visual por falta de la clase `hidden` si un entorno no aplicara `[hidden]`] → Mitigado: el atributo `hidden` lo oculta el agente de usuario por estándar y el preflight de Tailwind v4 lo refuerza con `!important`; no hay entorno Astro sin preflight.
- [Menú abierto al cambiar de viewport móvil a escritorio y volver] → Aceptado: en escritorio lo oculta `lg:hidden`; al volver a móvil el menú se muestra abierto (comportamiento común y no bloqueante).
- [Sin test framework en el repo] → La verificación es manual en viewport móvil + `npm run check` (typecheck Astro). La tarea 3 documenta el checklist.

## Files to Change

- `src/components/Header.astro`: quitar la clase `hidden` del contenedor `#menu-mobile` (línea 61). Sin cambios en el script.
