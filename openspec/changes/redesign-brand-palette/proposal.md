## Why

La paleta actual de EDCO (azul profundo + verde + ámbar) era una propuesta provisional pendiente de aprobación. EDCO definió una identidad oficial sobria: amarillo-verde (#BAFF39), gris tenue (#6E6E6E) y blanco (#FFFFFF), con una firma visual de casi-negro + lime. El sitio debe adoptar estos colores oficiales como primera fase, antes de un modo oscuro futuro.

## What Changes

- Reemplazar la escala `brand` (azul) por una escala lime (#BAFF39) como color primario/de destello.
- Eliminar por completo los tokens `accent` (ámbar) y `safety` (verde esmeralda); el lime absorbe los roles de CTA, foco visible y diferenciador SST.
- Introducir tokens de tinta y superficie: casi-negro (#0a0a0a/#111) y paper cálido (#fbfaf7/#f5f2eb) mantenido como fondo claro; gris tenue #6E6E6E como texto secundario.
- Actualizar `src/components/Logo.astro`: fondo casi-negro, shield/línea y check en lime, texto en paper/blanco.
- Reasignar usos de `bg-accent-*`, `text-accent-*`, `bg-safety-*`, `text-safety-*` hacia lime / casi-negro / paper.
- Reasignar `:focus-visible` a lime (funciona sobre fondo claro y oscuro).
- Nada de cambios en estructura, datos, API o contenido.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `corporate-website`: el requerimiento "Identidad de marca aplicada" pasa a describir la paleta oficial lime/negro/paper y elimina la referencia implícita al ámbar/safety de la identidad previa.

## Impact

- `src/styles/global.css`: redefinición de tokens `@theme` (brand=lime, ink, surface, muted; sin accent ni safety).
- `src/components/`: Logo.astro, Button.astro, Header.astro, Footer.astro, CtaBanner.astro, Card.astro, SectionTitle.astro, Acreditaciones.astro, formularios.
- Páginas en `src/pages/`: reasignación de clases de color.
- Sin cambios en backend, API, base de datos ni contenido.
- El modo oscuro (última fase) NO entra en este cambio; quedará anotado para un proposal futuro que requerirá refactorizar a tokens semánticos.