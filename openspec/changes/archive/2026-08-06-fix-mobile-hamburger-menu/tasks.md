## Fase 1 · Corrección del markup

- [x] 1.1 En `src/components/Header.astro`, eliminar la clase `hidden` del contenedor `#menu-mobile`, dejando `class="border-t border-slate-200 bg-white lg:hidden"` y conservando el atributo `hidden` (estado inicial cerrado)
- [x] 1.2 Verificar que el script de toggle (`menu.hidden = !open`), el cierre por `Escape` y por clic en enlace, y el sync de `aria-expanded`/`aria-label` permanecen intactos

## Fase 2 · Verificación

- [x] 2.1 Ejecutar `npm run check` (typecheck de Astro) y `npm run build` sin errores
- [ ] 2.2 Verificación manual en viewport móvil (< 1024px): tocar el botón hamburguesa despliega el menú con los enlaces y el CTA "Evalúa tu Empresa"
- [ ] 2.3 Verificar cierre del menú: segundo toque al botón, tecla `Escape` y selección de un enlace
- [ ] 2.4 Verificar que `aria-expanded` y `aria-label` cambian de forma coherente al abrir/cerrar
- [ ] 2.5 Verificar ausencia de regresión en escritorio (≥ 1024px): navegación horizontal visible, botón hamburguesa oculto y menú móvil no muestra
