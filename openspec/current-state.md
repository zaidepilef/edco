# Estado Actual del Proyecto

## Fecha

2026-08-06

## Resumen

Sitio web corporativo de EDCO Gestión Preventiva SpA construido con Astro + TypeScript + Tailwind CSS v4. El sitio está funcional en desktop y en gran parte en móvil; hay un cambio en curso para corregir el menú de navegación en móvil.

## Funcionalidades implementadas

- Sitio responsive mobile-first (5 specs activas: `corporate-website`, `service-catalog`, `lead-capture`, `resource-blog`, `seo-basics`).
- Identidad de marca EDCO como tokens de diseño en `src/styles/global.css`.
- Navegación principal con versión colapsable en móvil (en corrección, ver Cambio en curso).
- CTA fijo "Evalúa tu Empresa" con página propia y formulario de mínima fricción.
- Backend de prospectos: API `src/pages/api/prospecto.ts` + PostgreSQL (tabla `prospecto`), con validación en servidor, honeypot y notificación por email.
- Catálogo de servicios y blog de recursos gestionados por Content Collections (Markdown).
- Página explicativa del DS44 orientada a SEO.
- Maqueta sin funcionalidad del área de cliente/login.
- SEO básico: metadatos por página, semántica HTML, JSON-LD de Organization, sitemap, URLs legibles con canonical.
- Preguntas frecuentes, sección de acreditaciones y checklist DS44 descargable.

## Estado del despliegue

- Configurado para Vercel (`@astrojs/vercel`) con build estático + funciones serverless.
- Pendientes: compra del dominio y configuración de DNS (tareas 1.5 y 7.x del cambio archivado).

## Cambios recientes (archivados)

- `2026-08-06-build-corporate-website`: construcción inicial del sitio (specs activas de las 5 capabilities).
- `2026-08-06-fix-mobile-hamburger-menu`: corrección del menú hamburguesa en móvil. Eliminada la clase `hidden` redundante en `#menu-mobile` (`src/components/Header.astro`); el atributo `hidden` gestionado por JS es ahora la única fuente de visibilidad. Build verificado y delta de "Navegación principal" sincronizado a `openspec/specs/corporate-website/spec.md`. Archivado con advertencia: 3 tareas de verificación manual (2.3–2.5) quedaron sin ejecutar en navegador.

## Siguiente paso pendiente

- Verificar manualmente en viewport móvil el menú hamburguesa (abrir/cerrar, `Escape`, clic en enlace, `aria-expanded`, sin regresión en escritorio). Si surgiera un fallo, abrir un nuevo change para corregirlo.
