## Why

EDCO Gestión Preventiva SpA no cuenta con identidad visual ni presencia digital. Los potenciales clientes no tienen una forma sencilla de conocer sus servicios de Seguridad y Salud en el Trabajo (SST), solicitar un diagnóstico ni contactar a la empresa, lo que limita la captación de nuevos clientes y deja sin base a la futura plataforma de gestión preventiva basada en el DS44.

## What Changes

- Construir la identidad digital de EDCO desde cero: marca, paleta de colores, tipografías y tono de comunicación.
- Desarrollar un sitio web corporativo responsive, mobile-first y accesible, con arquitectura componentizada y preparada para crecer.
- **Lanzar un core mínimo en una semana**: Inicio (propuesta de valor), DS44, Servicios, Institucional y Contacto, con el blog de recursos como fase post-lanzamiento.
- Publicar la información institucional de la empresa (presentación, misión, trayectoria).
- Implementar el catálogo de servicios de SST, incluyendo "Evalúa tu Empresa" como **producto de diagnóstico vendible** con su página de detalle.
- Crear una página explicativa del Decreto Supremo N°44 como **cuña estratégica de captación** (estrategia SEO DS44-first).
- Implementar el formulario "Evalúa tu Empresa" **de mínima fricción** (solo datos de contacto) y el formulario de contacto.
- Guardar los prospectos en un **backend propio con PostgreSQL (tabla `prospecto`)** a través de una API, como respaldo ante fallas de notificación.
- Añadir una **maqueta sin funcionalidad** del futuro login/área de cliente.
- Aplicar SEO básico orientado a términos del DS44 (metadatos, semántica, sitemap, datos estructurados).
- Activar **analytics y Search Console desde el día 1** para medir leads y legitimar la marca.
- Lograr tiempos de carga menores a 3 segundos y un diseño profesional que genere confianza.

## Capabilities

### New Capabilities

- `corporate-website`: Sitio corporativo responsive y accesible con identidad de marca, información institucional, navegación, página explicativa del DS44 y maqueta del área de cliente.
- `service-catalog`: Catálogo de servicios de SST con descripción clara de cada oferta, incluido el diagnóstico "Evalúa tu Empresa" como servicio vendible.
- `lead-capture`: Formularios "Evalúa tu Empresa" y de contacto de mínima fricción, con persistencia de prospectos en PostgreSQL y notificación a EDCO.
- `resource-blog`: Blog de recursos con listado de artículos y páginas de detalle (fase post-lanzamiento).
- `seo-basics`: Optimización para motores de búsqueda con foco en términos del DS44: metadatos, semántica, sitemap y datos estructurados.

### Modified Capabilities

_(Ninguna: no existen specs previas en el repositorio.)_

## Impact

- Repositorio actualmente vacío: se crea el sitio web desde cero.
- Nuevo stack de tecnologías frontend (a definir en design.md).
- **Nuevo backend de datos**: API + PostgreSQL con la tabla `prospecto` para persistir solicitudes.
- **Dominio por comprar** (prerequisito del despliegue).
- Sin impacto en sistemas existentes: no hay código, APIs ni dependencias previas.
- Base para futuras funcionalidades (SaaS, login, panel administrativo), que quedan fuera del alcance del MVP.
