## Why

En desktop la navegación principal funciona correctamente. En móvil, el botón hamburguesa (`#menu-toggle`) aparece visible pero al tocarlo el menú colapsable (`#menu-mobile`) no se despliega: el usuario no puede acceder a la navegación principal, lo que incumple el requisito de "navegación colapsable en móvil" de la capability `corporate-website` y degrada la experiencia móvil (que es mobile-first).

## What Changes

- Corregir el mecanismo de visibilidad del menú colapsable en móvil para que el botón hamburguesa abra y cierre el menú de forma fiable.
- Garantizar que el estado visual del menú y los atributos de accesibilidad (`aria-expanded`, `aria-label`) permanezcan sincronizados.
- Añadir cobertura de verificación (manual + build/typecheck) para evitar regresiones del menú móvil.

## Capabilities

### Modified Capabilities

- `corporate-website`: se corrige el requisito "Navegación principal" — la versión colapsable del menú en móvil SHALL abrirse y cerrarse mediante el botón hamburguesa, cumpliendo el escenario "Menú en móvil".

## Impact

- Archivo principal afectado: `src/components/Header.astro` (markup del contenedor `#menu-mobile` y su script de toggle).
- Sin cambios de arquitectura, dependencias ni backend.
- Sin impacto en desktop: la navegación de escritorio (`lg:flex`) no se toca.
- Actualización futura de la spec principal `openspec/specs/corporate-website/spec.md` tras archivar el cambio (sync del delta).
