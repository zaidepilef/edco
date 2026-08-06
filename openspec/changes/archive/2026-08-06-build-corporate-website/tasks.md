## Fase 1 · Semana 1 — Setup y dominio

- [x] 1.1 Inicializar proyecto Astro con TypeScript (`npm create astro`) y estructura de carpetas componentizada (layouts, components, pages, content, styles)
- [x] 1.2 Instalar Tailwind CSS y configurar los tokens de diseño de la marca EDCO (paleta por definir, tipografías, radios, sombras)
- [x] 1.3 Configurar ajustes básicos de Astro: título/sitio base, plugin de sitemap y optimización de imágenes (assets)
- [x] 1.4 Crear el layout raíz con `<head>` gestionable (title/description por página), estructura semántica (header, main, footer) y carga del CSS
- [ ] 1.5 Comprar el dominio y configurar DNS apuntando al hosting (bloqueante del despliegue)

## Fase 1 · Semana 1 — Identidad de marca y componentes base

- [x] 2.1 Crear el componente de logotipo y los placeholders de marca (a reemplazar por activos definitivos)
- [x] 2.2 Crear componentes base reutilizables: botones, tarjetas, títulos de sección, encabezado y pie de página
- [x] 2.3 Implementar la navegación principal (Inicio, DS44, Servicios, Nosotros, Contacto) con menú colapsable mobile-first y navegación por teclado
- [x] 2.4 Crear el botón/CTA fijo "Evalúa tu Empresa" visible en todas las páginas
- [x] 2.5 Crear el pie de página con datos de contacto de EDCO (razón social, email, teléfono) y accesos a las secciones

## Fase 1 · Semana 1 — Páginas core

- [x] 3.1 Construir la página de inicio como landing de propuesta de valor: CTA al diagnóstico y a contacto, resumen de servicios y beneficios
- [x] 3.2 Construir la página explicativa del DS44: qué es, a quién aplica, beneficios y llamado a solicitar diagnóstico (educativa, sin afirmaciones legales absolutas)
- [x] 3.3 Construir la página institucional: presentación de EDCO, misión, trayectoria y respaldo acreditado (con placeholders hasta tener datos reales)
- [x] 3.4 Construir el listado del catálogo de servicios
- [x] 3.5 Construir la página de detalle de cada servicio con llamado a la acción de contacto/diagnóstico
- [x] 3.6 Construir la página de detalle del diagnóstico "Evalúa tu Empresa" como servicio vendible, derivando al formulario

## Fase 1 · Semana 1 — Formularios y backend de prospectos

- [x] 4.1 Construir el formulario "Evalúa tu Empresa" de mínima fricción: solo nombre y correo y/o teléfono, con validación en cliente y mensajes de error
- [x] 4.2 Construir el formulario de contacto con validación en cliente
- [x] 4.3 Definir el contrato de la API de prospectos (campos, formato, autenticación, despliegue)
- [x] 4.4 Implementar la API que recibe los envíos: validación en servidor, honeypot y rate limit
- [x] 4.5 Crear la base de datos PostgreSQL con la tabla `prospecto` y la persistencia de solicitudes
- [x] 4.6 Conectar la API con el envío de notificación inmediata por email transaccional a EDCO (dirección en variable de entorno)
- [x] 4.7 Conectar los formularios del frontend con la API (POST desde JavaScript) y manejar errores de envío
- [x] 4.8 Mostrar confirmación de recepción al usuario tras un envío exitoso

## Fase 1 · Semana 1 — Maqueta de área de cliente

- [x] 5.1 Crear la maqueta sin funcionalidad del login/área de cliente con mensaje de "próximamente"

## Fase 1 · Semana 1 — SEO básico DS44 y analítica

- [x] 6.1 Garantizar title y description únicos por página desde el layout raíz, orientados a términos del DS44
- [x] 6.2 Verificar HTML semántico (header, nav, main, section, article, footer) en todas las páginas
- [x] 6.3 Añadir JSON-LD de Organization con razón social, actividad y datos de contacto de EDCO
- [x] 6.4 Generar y publicar el sitemap.xml con las URLs públicas
- [x] 6.5 Revisar URLs descriptivas (ej. /ds44, /servicios, /evalua-tu-empresa) y referencias canónicas
- [x] 6.6 Configurar analytics y Search Console para el dominio desde el día 1

## Fase 1 · Semana 1 — Despliegue y verificación

- [ ] 7.1 Configurar el despliegue en el hosting estático (Vercel/Netlify) con la API de prospectos y las variables de entorno
- [ ] 7.2 Verificar el sitio en producción: dominio/DNS, formularios operativos, persistencia en PostgreSQL, notificación por email y sitemap accesible

## Fase 2 · Post-lanzamiento — Blog de recursos

- [x] 8.1 Crear la colección de contenido del blog (Markdown con frontmatter: título, resumen, fecha, autor)
- [x] 8.2 Construir la página de listado de recursos ordenada cronológicamente y añadirla a la navegación
- [x] 8.3 Construir las páginas de detalle de artículo con fecha y autor
- [x] 8.4 Publicar los primeros artículos iniciales con contenido solicitado a EDCO (enfoque en DS44 y prevención de riesgos)

## Fase 2 · Post-lanzamiento — Confianza y recursos

- [x] 9.1 Crear la sección de badges/acreditaciones con los datos reales de EDCO cuando estén disponibles
- [x] 9.2 Crear la sección de preguntas frecuentes (FAQ) orientada a dudas sobre DS44 y servicios
- [x] 9.3 Crear los descargables (checklist DS44) como recurso de nutrición de prospectos

## Fase 2 · Post-lanzamiento — Refinamiento

- [x] 10.1 Auditoría de accesibilidad: navegación por teclado, textos alternativos y contraste
- [x] 10.2 Auditoría de rendimiento: optimización de imágenes (AVIF), lazy loading y medición de carga <3 segundos
- [x] 10.3 Evaluar el flujo de nutrición de prospectos no convertidos usando el blog y los descargables
