## Why

El sitio se desplegaba en Vercel con backend de prospectos (PostgreSQL + Resend). El objetivo cambia: publicar solo el sitio estático en GitHub Pages para mostrarlo al cliente, sin backend ni funciones serverless. Hoy `npm run build` falla con `NoAdapterInstalled` porque `src/pages/api/prospecto.ts` usa `prerender = false` y no hay adapter instalado.

## What Changes

- **BREAKING**: Se elimina el backend de captación de prospectos: `src/pages/api/prospecto.ts`, `src/lib/prospecto.ts` y `src/lib/notify.ts`, junto con las dependencias `pg` y `@types/pg`. Los formularios dejan de persistir y de notificar por email.
- Los formularios pasan a ser de demostración: al enviar muestran confirmación simulada y ofrecen el correo `contacto@edco.cl` como vía de contacto real (fallback que ya existe en `src/scripts/prospect-form.ts`).
- Se configura `base: "/edco/"` en `astro.config.mjs` (con `site` ya apuntando a `https://zaidepilef.github.io/edco/`) para que GitHub Pages sirva el sitio desde la raíz de la rama `gh-pages`.
- Se prefijan con `/edco/` todos los enlaces internos y referencias root-relative (favicon, skip-link) para que funcionen bajo el subdirectorio.
- Se agrega el script `deploy` con `gh-pages -d dist --nojekyll` y se añade `dist/` a `.gitignore`.
- Se eliminan restos de Vercel (config, `.vercel/`, `dist/client` commiteado) y se documenta la API como obsoleta (`docs/api-prospecto.md`, `db/schema.sql`).

## Capabilities

### New Capabilities

- `github-pages-deployment`: Cómo el sitio se construye y publica como sitio estático en GitHub Pages desde la rama `gh-pages` con `base /edco/`, sin GitHub Actions.

### Modified Capabilities

- `lead-capture`: Los formularios dejan de persistir en PostgreSQL y de notificar por email; pasan a ser de demostración con confirmación simulada y enlace de contacto (`mailto`).

## Impact

- **Código**: `astro.config.mjs`, `package.json`, `.gitignore`, `src/pages/api/` (eliminado), `src/lib/prospecto.ts` y `notify.ts` (eliminados), `src/scripts/prospect-form.ts`, formularios y páginas con enlaces internos, `src/layouts/Base.astro` (favicon).
- **Dependencias**: se eliminan `pg` y `@types/pg`; se conserva `gh-pages` (ya instalado).
- **Sistemas**: ya no depende de Vercel, PostgreSQL ni Resend. GitHub Pages es el único destino.
- **Documentación**: `docs/api-prospecto.md` y `db/schema.sql` quedan obsoletos; se actualiza `openspec/current-state.md`.
- **Spec**: `lead-capture` cambia requisitos; nueva capability `github-pages-deployment`.
