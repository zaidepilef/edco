# Estado Actual del Proyecto

## Fecha

2026-08-20

## Resumen

Sitio web corporativo de EDCO Gestión Preventiva SpA construido con Astro + TypeScript + Tailwind CSS v4, publicado como sitio 100% estático en GitHub Pages para demostración al cliente (sin backend ni dominio propio).

## Funcionalidades implementadas

- Sitio responsive mobile-first (6 specs activas: `corporate-website`, `service-catalog`, `lead-capture`, `resource-blog`, `seo-basics`, `github-pages-deployment`).
- Identidad de marca EDCO como tokens de diseño en `src/styles/global.css`.
- Navegación principal con versión colapsable en móvil.
- CTA fijo "Evalúa tu Empresa" con página propia y formulario de mínima fricción.
- Formularios de demostración ("Evalúa tu Empresa" y contacto): validación client-side, confirmación simulada y enlace de contacto por correo (`contacto@edco.cl`). Sin backend, sin persistencia ni notificación.
- Catálogo de servicios y blog de recursos gestionados por Content Collections (Markdown).
- Página explicativa del DS44 orientada a SEO.
- Maqueta sin funcionalidad del área de cliente/login.
- SEO básico: metadatos por página, semántica HTML, JSON-LD de Organization, sitemap, URLs legibles con canonical.
- Preguntas frecuentes, sección de acreditaciones y checklist DS44 descargable.

## Estado del despliegue

- Publicado en GitHub Pages desde la raíz de la rama `gh-pages` en `https://zaidepilef.github.io/edco/` (con `base: "/edco/"` y `.nojekyll`).
- Deploy manual local con el script `npm run deploy` (`gh-pages -d dist --nojekyll`); sin GitHub Actions.
- Eliminados: backend de prospectos (`src/pages/api/prospecto.ts`, `src/lib/prospecto.ts`, `src/lib/notify.ts`, `pg`), configuración de Vercel y restos de builds anteriores (`dist/client`, `.vercel/`).
- Pendientes: dominio propio y configuración DNS (al comprarlo: cambiar `site`, quitar `base` y revertir los prefijos `/edco/` de los enlaces).

## Cambios recientes (archivados)

- `2026-08-06-build-corporate-website`: construcción inicial del sitio (specs activas de las 5 capabilities originales).
- `2026-08-06-fix-mobile-hamburger-menu`: corrección del menú hamburguesa en móvil.
- `2026-08-20-redesign-brand-palette`: rediseño de la paleta de marca acorde a la identidad oficial.

## Cambio en curso

- `deploy-github-pages`: migración a GitHub Pages como sitio estático puro para demostración al cliente, con eliminación del backend de prospectos. Implementación completada; pendiente de archivo.