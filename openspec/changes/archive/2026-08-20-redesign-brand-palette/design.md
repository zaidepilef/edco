## Context

El sitio consume los colores exclusivamente a través de los tokens `@theme` de `src/styles/global.css` (Tailwind v4 genera las utilities). Hoy existen 4 familias: `brand` (azul), `safety` (verde esmeralda), `accent` (ámbar) y `paper` (cálido), más neutros `slate`. La paleta fue declarada como provisional en un comentario del propio archivo. Esta fase 1 solo reasigna colores; el modo oscuro es una fase 2 futura que requerirá refactorizar a tokens semánticos y queda fuera de este diseño.

Ver proposal.md — Why para la motivación.

## Goals / Non-Goals

**Goals:**
- Sustituir la paleta azul/ámbar/esmeralda por la oficial: amarillo-verde #BAFF39, gris tenue #6E6E6E, blanco #FFFFFF, casi-negro y paper cálido.
- Mantener una única fuente de verdad en `global.css` y eliminar los hex hardcodeados del logo.
- Preservar accesibilidad (foco visible y CTAs legibles) en claro y oscuro desde la fase 1.

**Non-Goals:**
- No modo oscuro (fase 2, proposal futuro).
- No cambios de layout, contenido, API ni dependencias.
- No refactorizar a tokens semánticos aún (se hará junto con el dark mode para evitar re-trabajo doble).

## Decisions

**D1 — Escala `brand` remapeada a verde lima, anclada en #BAFF39**
Se conserva la estructura de escala (50–950) que el sitio ya usa. #BAFF39 es el `brand-500`; los tonos 600–950 son verdes oscuros sobrios derivados (para fondos de sección, bordes y texto sobre claro) y los 50–400 tintes claros sobre fondo blanco/paper. Alternativa descartada: usar solo los 3 hex oficiales sin escala — rompería los ~95 usos existentes de `brand-*` en distintos niveles.

**D2 — Nuevos tokens `ink` y `muted`; `accent` y `safety` eliminados**
- `ink`: casi-negro (#0a0a0a → #111) para texto principal.
- `muted`: gris tenue #6E6E6E para texto secundario (en claro; en dark la fase 2 aclarará la escala).
- Se eliminan por completo `--color-accent-*` y `--color-safety-*` de `@theme`; sus usos (CTA, diferenciadores SST, `:focus-visible`, fondos de acreditaciones) se reasignan a lime/ink/paper/blanco.

**D3 — Regla de contraste: lime es acento, no texto sobre claro**
#BAFF39 tiene luminancia ~0.82: sobre blanco/paper el contraste es ~1.2:1 (falla). Por eso el lime se usa en superficies destacadas (CTA con texto casi-negro, ~18.4:1, AAA), bordes de acento, badges y `:focus-visible`. Para texto destacado sobre claro se usan verdes oscuros de la escala (600+) o casi-negro. Este es el criterio que también la fase 2 respetará.

**D4 — Logo: casi-negro + lime + paper**
`Logo.astro` deja los hex hardcodeados (#1e4fac, #fbbf24) y pasa a CSS variables: rectángulo casi-negro, shield y check en lime, texto de marca en paper/claro. Estando en SVG inline, se usa `currentColor`/`var(--color-...)` donde aplique.

**D5 — Secciones oscuras hoy (fondo brand-900 azul) → fondo casi-negro**
Las ~8 páginas con héros `bg-brand-900` pasan a casi-negro con texto blanco y acentos lime. Secciones de acento previo `safety` (acreditaciones, detalles de servicio) pasan a tintes de lima o paper, según su rol.

## Risks / Trade-offs

- [El lime sobre paper pierde fuerza cromática] → Se prioriza el lime sobre oscuro y como superficie con texto negro; en claro se usan tintes oscuros de la escala para legibilidad.
- [Cambio global de identidad puede alterar percepción de "seguridad laboral" del verde esmeralda] → Aceptado: es la decisión de marca de EDCO; el amor/verde lime es ahora el elemento de marca distintivo.
- [Fase 2 (dark) obligará a refactorizar tokens] → Asumido deliberadamente; cambiar solo valores ahora evita tocar ~20 archivos dos veces.

## Migration Plan

1. Redefinir tokens en `global.css`.
2. Actualizar `Logo.astro`.
3. Reasignar usos por archivo: formularios, botones, header, footer, tarjetas, heroes.
4. Build + revisión visual manual en desktop y móvil.
5. Rollback: revert del commit; los tokens viven en un solo lugar.

## Open Questions

- Ajuste fino de tonos intermedios de la escala lime (400–700) según vista en pantalla — se puede afinar después sin tocar specs.