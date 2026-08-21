## 1. Tokens de diseño

- [x] 1.1 Redefinir la escala `brand` en `src/styles/global.css` (anclada en #BAFF39 como brand-500, tonos 600–950 verdes oscuros sobrios, 50–400 tintes claros) y eliminar `--color-accent-*` y `--color-safety-*` de `@theme`; agregar `ink` (casi-negro) y `muted` (#6E6E6E); verificar con `rg` que global.css no referencia accent/safety
- [x] 1.2 Reasignar `:focus-visible` en `global.css` al lime (brand-500/400) con contraste visible sobre paper y casi-negro; verificar visualmente el foco de teclado en un elemento en cada fondo
- [x] 1.3 Actualizar el comentario de cabecera de global.css (paleta aprobada, no provisional); verificar que el archivo compile con el build de Astro

## 2. Logo y componentes

- [x] 2.1 Actualizar `src/components/Logo.astro`: rectángulo casi-negro, shield/check en lime, texto de marca legible (sin hex hardcodeados); verificar en hero, header y footer que el logo se ve nítido en claro y en secciones oscuras
- [x] 2.2 Reasignar colores en `Button.astro`, `CtaBanner.astro`, `Card.astro`, `SectionTitle.astro` y `Header.astro` (CTAs a lime con texto casi-negro, títulos a casi-negro/verdes oscuros, sin accent ni safety); verificar visualmente cada componente en una página que lo use
- [x] 2.3 Reasignar colores en `Footer.astro` (fondo casi-negro, textos paper/gris tenue, acentos lime) y `Acreditaciones.astro` (eliminar tintes emerald); verificar ambos en `index.astro` y `nosotros.astro` (o donde se rendericen)
- [x] 2.4 Reasignar colores en `ContactForm.astro` y `EvaluaForm.astro` (bordes/headers a verde oscuro o casi-negro, mensajes de validación en rojo solo para errores); verificar el flujo de validación visualmente

## 3. Páginas

- [x] 3.1 Reasignar colores en `index.astro`, `nosotros.astro`, `ds44.astro`, `contacto.astro`, `area-cliente.astro` y `evalua-tu-empresa.astro` (héros y bandas `bg-brand-900` → casi-negro; textos brand-100 → blanco; accent-400 → lime; textos slate secundarios → muted); verificar contraste y coherencia en cada ruta
- [x] 3.2 Reasignar colores en `servicios/index.astro`, `servicios/[slug].astro`, `recursos/index.astro`, `recursos/[slug].astro`, `recursos/checklist-ds44.astro` y `preguntas-frecuentes.astro` (igual criterio, sin safety ni accent); verificar contenido Markdown y checklist legible
- [x] 3.3 Verificar con `rg -i "accent-|safety-" src` que no quedan referencias a las familias eliminadas; si quedan, corregirlas

## 4. Verificación final

- [x] 4.1 Ejecutar `npm run build` y confirmar build exitoso sin errores de clases
- [ ] 4.2 Revisión manual en desktop y móvil de toda la navegación (hero, servicios, recursos, DS44, formularios, footer) confirmando paleta lime/negro/paper coherente y foco visible funcional
- [x] 4.3 Validar el change con `openspec validate --change redesign-brand-palette` y sincronizar specs a `openspec/specs/corporate-website/spec.md` si no se archiva