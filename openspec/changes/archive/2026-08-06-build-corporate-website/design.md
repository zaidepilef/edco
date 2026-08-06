## Context

El repositorio está vacío (sin commits ni código previo): el sitio se construye desde cero. Ver proposal.md para la motivación y los specs/ para los requisitos de comportamiento.

Restricciones que condicionan el diseño: Mobile First, accesibilidad (buenas prácticas), sitio escalable y componentizado, arquitectura limpia, carga <3 segundos, lanzamiento del core mínimo **en una semana** y una base preparada para una futura plataforma SaaS de gestión preventiva basada en DS44. El posicionamiento estratégico es **DS44-first**: se espera que el tráfico inicial provenga casi por completo de búsquedas sobre el Decreto Supremo N°44.

## Goals / Non-Goals

**Goals:**

- Elegir un stack que produzca un sitio estático rápido (<3s), con mínimo JavaScript en el cliente.
- Estructura de código componentizada y con separación de responsabilidades (contenido, presentación, datos).
- Identidad de marca desde cero, expresada como tokens de diseño reutilizables (paleta a definir con el cliente).
- Formularios de mínima fricción con persistencia de prospectos en un backend propio (PostgreSQL) y notificación inmediata a una única persona.
- SEO enfocado en términos DS44 aplicado por defecto a cada página.
- Analytics y Search Console activos desde el día 1 para medir leads y legitimar la marca.

**Non-Goals:**

- Construir la plataforma SaaS, el login/área de cliente funcional, panel administrativo, dashboard, firma electrónica o sistema de clientes (fuera del MVP; el login es solo una maqueta sin vida).
- Publicar el blog de recursos en el lanzamiento: entra en una fase post-lanzamiento inmediata.
- Integrar un CMS con panel de edición (el blog se gestiona por archivos de contenido).
- Implementar i18n en esta fase.
- Capturar datos de negocio (nº de trabajadores, rubro, tamaño) en los formularios: se recopilan en el seguimiento comercial posterior.

## Decisions

### 1. Framework: Astro

Se adopta Astro (con TypeScript) para el sitio.

- **Por qué:** genera HTML estático con cero JavaScript por defecto (clave para el <3s), está orientado a sitios de contenido, es componentizado y su modelo de "islas" permite añadir interactividad solo donde se necesita. Su pipeline de build optimiza assets automáticamente.
- **Alternativas:** Next.js (más peso y complejidad de servidor de la que el MVP necesita; útil más adelante si el SaaS lo requiere), HTML/CSS puro (no escala ni es componentizado).

### 2. Estilo: tokens de diseño + Tailwind CSS

La identidad de EDCO se define como tokens CSS (paleta, tipografías, radios, sombras) y se consume mediante Tailwind CSS para velocidad de desarrollo y consistencia.

- **Por qué:** los tokens permiten cambiar la identidad en un solo lugar; Tailwind acelera la maquetación sin romper la componentización.
- **Nota:** la paleta propuesta (azul profundo, verde seguridad, ámbar) es una **propuesta pendiente de aprobación** — la identidad se crea desde cero.
- **Alternativas:** CSS puro con BEM (más verboso), bibliotecas de componentes como Material (imponen una estética ajena a la marca).

### 3. Contenido: Content Collections (Markdown)

Servicios, artículos del blog y recursos se modelan como colecciones de contenido en Markdown con frontmatter tipado.

- **Por qué:** cumple el requisito de gestionar contenido sin panel administrativo, valida el frontmatter en build (error temprano) y separa contenido de presentación.
- **Alternativas:** CMS headless (complejidad y dependencia innecesaria para el MVP), contenido hardcodeado (dificulta el crecimiento).

### 4. Backend de prospectos: API + PostgreSQL

El frontend envía los formularios por JavaScript (POST) a una **API propia (contrato aún por definir)** que persiste cada solicitud en una base de datos **PostgreSQL con la tabla `prospecto`**.

- **Por qué:** los datos quedan bajo control de EDCO (privacidad), la base actúa como **respaldo ante fallas de notificación** (el lead nunca se pierde), y la pieza evoluciona hacia el backend del futuro SaaS.
- **Alternativas:** proveedor de formularios tipo Formspree (más rápido de montar pero introduce un tercero que retiene los datos y limita el control), solo notificación por email sin persistencia (pierde leads si el email falla).
- **Pendiente:** definir el contrato de la API (campos, formato, autenticación, despliegue).

### 5. Formularios de mínima fricción

Los formularios "Evalúa tu Empresa" y de contacto piden solo datos de contacto (nombre + correo y/o teléfono). Los datos de negocio se capturan en el seguimiento comercial posterior, cuando la persona de EDCO contacta al prospecto.

- **Por qué:** minimizar la fricción maximiza la conversión; los datos de negocio son más fiables en una conversación que en un formulario.
- **Alternativa:** formulario completo con nº de trabajadores/rubro (más datos, pero menor conversión) — descartada.

### 6. Notificación y seguimiento comercial

Cada solicitud dispara una notificación inmediata a EDCO (email transaccional). Una única persona (el dueño) realiza el seguimiento por llamada o correo, cumpliendo la promesa de contacto inmediato. Los prospectos no convertidos reciben seguimiento y nutrición vía contenido.

- **Por qué:** el proceso comercial actual es unipersonal; la notificación debe ser fiable y la base de datos garantiza que nada se pierda.
- **Riesgo asumido:** la capacidad de respuesta depende de una sola persona.

### 7. SEO: DS44-first y por defecto

Layout raíz con gestión de `<head>` (title/description únicos por página), plugin de sitemap (`@astrojs/sitemap`), JSON-LD de Organization y URLs descriptivas con canonical. El contenido y las keywords priorizan los términos del DS44.

- **Por qué:** el tráfico inicial vendrá de búsquedas DS44; el SEO básico debe ser automático para no depender de la memoria del autor de cada página.
- **Alternativas:** SEO manual por página (propenso a omisiones).

### 8. Despliegue: hosting estático con funciones serverless

Build estático desplegado en un hosting tipo Vercel/Netlify, que además hospeda la función de los formularios/API. **El dominio se debe comprar antes del despliegue** (prerequisito crítico de la semana de lanzamiento).

- **Por qué:** simplicidad, escalado automático y cero administración de servidores para un sitio público.
- **Alternativas:** servidor propio (costo de operación injustificado), GitHub Pages (no permite las funciones del formulario).

## Risks / Trade-offs

- [Envío de spam en formularios] → Honeypot oculto, rate limit en el endpoint y validación estricta en servidor.
- [Emails de notificación que caen en spam o fallan] → Uso de servicio transaccional con SPF/DKIM; la base de datos (PostgreSQL) respalda el registro aunque el aviso falle.
- [Capacidad de seguimiento limitada a una persona] → Notificación inmediata y priorizada; el core mínimo no genera volumen insostenible al inicio.
- [Contenido DS44 con riesgo de interpretación legal incorrecta] → El contenido educa sin afirmar obligaciones absolutas y deriva siempre a un diagnóstico profesional.
- [Tiempo de carga >3s por imágenes pesadas] → Imágenes optimizadas/AVIF, lazy loading y mínimo JS; medición en build con auditoría de rendimiento.
- [Dominio no comprado a tiempo para el lanzamiento] → Compra y DNS son tarea de la primera semana; reservar como bloqueante del despliegue.
- [Branding dependiente de activos y decisiones pendientes (logo, paleta, datos institucionales)] → Placeholders de marca hasta contar con los activos definitivos; los tokens centralizan el cambio.
- [Crecimiento futuro hacia SaaS] → La separación de contenidos/presentación, el backend de prospectos y la estructura de rutas dejan espacio para crecer.

## Migration Plan

Al ser un sitio nuevo no hay migración de datos. La "migración" es el despliegue inicial:

1. Compra del dominio y configuración de DNS.
2. Build estático del sitio.
3. Publicación en el hosting (Vercel/Netlify) conectado al repositorio.
4. Despliegue de la API/backend de prospectos y verificación de la persistencia en PostgreSQL.
5. Verificación de DNS/dominio, de la notificación por email y de analytics en producción.
6. Rollback: redeploy del último build bueno (el hosting mantiene versiones anteriores).

## Open Questions

- Contrato de la API de prospectos (campos, formato, autenticación, dónde se despliega) — se define junto con la implementación.
- Definición exacta del diagnóstico "Evalúa tu Empresa" (qué recibe el cliente y a qué costo) — no bloquea el diseño del formulario.
- Datos reales de prueba social (años de operación, certificaciones, nº de empresas atendidas) — se integran como contenido una vez entregados.
- Dirección de paleta/identidad visual (la propuesta azul/verde/ámbar está pendiente de aprobación).
- Correo de destino de las notificaciones (se parametriza como variable de entorno).
- Explicación de los procesos actuales por parte de EDCO, requerida para definir la plataforma SaaS futura.
