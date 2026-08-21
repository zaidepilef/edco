## Context

El sitio (Astro 5.18, Tailwind v4 vía `@tailwindcss/vite`, Content Collections) estaba configurado para Vercel con `@astrojs/vercel/static` y una API serverless de prospectos (`src/pages/api/prospecto.ts` con `prerender = false`, PostgreSQL + Resend). Ese adapter ya fue retirado del config y de `package.json`, lo que provoca el error `NoAdapterInstalled`: en Astro 5, una sola ruta con `prerender = false` fuerza `buildOutput = "server"` y el build exige adapter.

El objetivo es un sitio 100% estático para demostración al cliente publicado en GitHub Pages (`zaidepilef/edco` → `https://zaidepilef.github.io/edco/`), sin backend, sin GitHub Actions, con deploy manual vía CLI `gh-pages` (ya instalado como devDependency). La rama `gh-pages` remota existe pero está contaminada con contenido de builds anteriores (`client/`, `src/`, `openspec/`, `.env.example`).

## Goals / Non-Goals

**Goals:**
- Build estático puro que termine sin adapter y genere `dist/index.html` en la raíz.
- Sitio funcional bajo `/edco/` (assets, links internos, favicon, formularios).
- Deploy manual reproducible con un script npm que use `gh-pages`.
- Formularios de demostración que no dependan de red ni backend.

**Non-Goals:**
- No se publica ni mantiene backend de prospectos (ni Vercel, ni Formspree, ni otro).
- No se configura GitHub Actions.
- No se compra ni configura dominio propio todavía (queda para un cambio futuro).
- No se conserva la persistencia ni notificación de prospectos.

## Decisions

**D1. `base: "/edco/"` en `astro.config.mjs`**
GitHub Pages sirve el proyecto en `https://zaidepilef.github.io/edco/`, pero Astro por defecto genera URLs root-relative (`/`). Sin `base`, assets y rutas apuntarían a `zaidepilef.github.io/...` (404). Se mantiene `site: "https://zaidepilef.github.io/edco/"` (ya correcto, lo usan sitemap y canonical) y se añade `base: "/edco/"`.
*Alternativa evaluada*: URLs relativas en todo el markup — descartada porque rompen en páginas anidadas (`/servicios/x/`) y crean fricción futura al migrar al dominio.

**D2. Enlaces internos prefijados con `/edco/`**
Astro no reescribe automáticamente los `href`/`src` root-relative escritos en el markup (documentado oficialmente: los enlaces internos deben llevar el prefijo de `base`). Se prefijan todos los enlaces internos (`Header`, `Footer`, `CtaBanner`, `Button` y páginas) y referencias a archivos de `public/` (`/favicon.svg` en `Base.astro`). Uso de literal `/edco/` (simple y explícito); se documenta que al comprar dominio hay que revertirlo a `/`.
*Alternativa evaluada*: `import.meta.env.BASE_URL` para todos los enlaces — más correcta a largo plazo, pero cambia más código; se deja como mejora opcional.

**D3. Eliminación total del backend**
Se eliminan `src/pages/api/prospecto.ts`, `src/lib/prospecto.ts`, `src/lib/notify.ts` y las dependencias `pg`/`@types/pg`. Con `output: "static"`, una ruta `prerender = false` aborta el build (`NoAdapterInstalled`); además GitHub Pages no puede ejecutarlas.
*Alternativas evaluadas*: (a) extraer la API a una función serverless separada con CORS — descartada porque no se necesita backend para la demo; (b) Formspree/Web3Forms — descartada: aporta complejidad y dependencia externa sin valor para la demostración al cliente.

**D4. Formularios de demostración**
`prospect-form.ts` se simplifica: al enviar un formulario válido se muestra la confirmación simulada y el correo `contacto@edco.cl` (manteniendo la validación client-side existente). Se elimina el `fetch("/api/prospecto")`. Se conserva el patrón actual de estados de éxito/error (`data-form-status`), con el mensaje de éxito y el contacto como acción del usuario (`mailto:contacto@edco.cl`).

**D5. Script de deploy con `.nojekyll`**
`package.json` gana `"deploy": "gh-pages -d dist --nojekyll"`. El flag `--nojekyll` es obligatorio: por defecto `gh-pages` NO lo crea y sin él GitHub Pages ignora el directorio `_astro/` (prefijo `_`), rompiendo CSS/JS. El `-d dist` publica desde la raíz del directorio de salida estático.

**D6. Higiene del repo**
`dist/` se añade a `.gitignore` (hoy está commiteado del build Vercel: commit `e807edb`), se elimina `dist/client` y el directorio `.vercel/` restante, y se marca `docs/api-prospecto.md` y `db/schema.sql` como obsoletos (se eliminan o conservan como referencia histórica).

## Risks / Trade-offs

- [Enlaces sin prefijar → 404 en navegación] → Verificación manual post-deploy de todas las páginas y `curl -I` de assets.
- [`_astro/` ignorado por Jekyll sin `.nojekyll`] → El flag va fijo en el script `deploy`; validación con `curl` del CSS publicado.
- [Canonical apunta a `edco.cl` (dominio no comprado) vía `src/lib/site.ts`] → Fuera del alcance de la demo; se revisa al comprar el dominio (mismo cambio que quitar `base`). Se puede ajustar la URL canónica a la de GitHub Pages si se desea consistencia inmediata.
- [Rama `gh-pages` contaminada con archivos viejos (`client/`, `src/`, `openspec/`)] → Depuración única: borrar la rama y redesplegar con el script nuevo; alternativamente limpiar la rama a mano antes del primer deploy.
- [Sitemap apunta a `zaidepilef.github.io/edco`] → Aceptable para la demo; cambia automáticamente al actualizar `site` con el dominio real.
- [Formularios ya no capturan leads reales] → Es el propósito declarado de la demo (ver proposal.md); el correo de contacto queda visible como CTA.

## Migration Plan

1. Eliminar backend y dependencias; simplificar `prospect-form.ts`.
2. Añadir `base` y prefijar enlaces internos; ajustar `.gitignore`.
3. `npm run build` + `npm run preview` para validación local.
4. Depurar rama `gh-pages` y ejecutar `npm run deploy`.
5. Validación en `https://zaidepilef.github.io/edco/` (navegación, assets, formularios).
6. Rollback: restaurar configuración previa desde git (el backend removido puede restaurarse desde historia de la rama `master`).

## Open Questions

- ¿Eliminar o conservar como referencia `docs/api-prospecto.md` y `db/schema.sql`? (No afecta specs ni tasks.)
- ¿Ajustar la canónica a la URL de GitHub Pages o mantener `edco.cl` para cuando se compre el dominio? (Decidible en implementación sin cambiar specs.)
