## 1. Eliminación del backend

- [x] 1.1 Eliminar `src/pages/api/prospecto.ts`, `src/lib/prospecto.ts` y `src/lib/notify.ts` y verificar con `npm run build` que el error `NoAdapterInstalled` desaparece (el build ahora debe completar)
- [x] 1.2 Remover `pg` y `@types/pg` de `package.json` y ejecutar `npm install` verificando que `npm ls pg` no lista el paquete
- [x] 1.3 Marcar `docs/api-prospecto.md` y `db/schema.sql` como obsoletos (o eliminarlos, según preferencia) y verificar que ninguna ruta o script del sitio los referencia

## 2. Formularios de demostración

- [x] 2.1 Simplificar `src/scripts/prospect-form.ts`: eliminar el `fetch("/api/prospecto")` y, tras la validación client-side, mostrar la confirmación simulada con el correo `contacto@edco.cl` (enlace `mailto:`) y verificar manualmente el envío de ambos formularios en `npm run dev`
- [x] 2.2 Verificar que `ContactForm.astro` y `EvaluaForm.astro` conservan los campos, validaciones y estados de éxito/error existentes, y que ningún archivo en `src/` referencia `/api/prospecto` (`grep -rn "api/prospecto" src/` sin resultados)

## 3. Configuración de GitHub Pages

- [x] 3.1 Añadir `base: "/edco/"` en `astro.config.mjs` (manteniendo `site: "https://zaidepilef.github.io/edco/"` y `output: "static"`) y verificar que `npm run build` genera `dist/index.html` en la raíz (sin `dist/client`)
- [x] 3.2 Prefijar con `/edco/` los enlaces internos root-relative en `Header.astro`, `Footer.astro`, `CtaBanner.astro`, `Button.astro` y todas las páginas (`index`, `nosotros`, `ds44`, `contacto`, `evalua-tu-empresa`, `servicios/[slug]`, `recursos/[slug]`, `recursos/index`) y verificar con `grep -rn 'href="/[^e]' src/` que no quedan enlaces internos sin prefijar
- [x] 3.3 Prefijar con `/edco/` la referencia `href="/favicon.svg"` en `src/layouts/Base.astro` y verificar en el HTML generado (`dist/**/index.html`) que el favicon apunta a `/edco/favicon.svg`
- [x] 3.4 Añadir `dist/` a `.gitignore` y eliminar del índice de git los archivos commiteados de `dist/client` (restos del build Vercel) verificando con `git status` que `dist/` ya no aparece
- [x] 3.5 Eliminar el directorio local `.vercel/` (resto del deploy anterior) y verificar que `git status` no muestra cambios relacionados

## 4. Script de despliegue

- [x] 4.1 Añadir en `package.json` el script `"deploy": "gh-pages -d dist --nojekyll"` y verificar con `npm run deploy -- --dry-run` que la CLI gh-pages procesa `dist/` sin errores
- [x] 4.2 Depurar la rama `gh-pages` (eliminar archivos contaminantes como `client/`, `src/`, `openspec/`, `.env.example`, o borrar y recrear la rama) y ejecutar `npm run deploy` verificando que `index.html` y `.nojekyll` quedan en la raíz de la rama

## 5. Validación final

- [x] 5.1 Ejecutar `npm run build` y `npm run preview`, verificando con `curl -I` que `http://localhost:4321/edco/` y un asset de `_astro/` responden 200
- [x] 5.2 Tras el deploy, verificar en `https://zaidepilef.github.io/edco/` con `curl -I` la página de inicio, el sitemap (`/edco/sitemap-index.xml`) y un asset `_astro`, y navegar manualmente todas las secciones (incluido el envío de ambos formularios) sin errores 404
- [x] 5.3 Sincronizar las specs delta a `openspec/specs/` (`lead-capture`, nueva `github-pages-deployment`) y actualizar `openspec/current-state.md` con el nuevo estado de despliegue, verificando que `openspec validate --change "deploy-github-pages"` pasa