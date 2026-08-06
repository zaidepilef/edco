# Flujo de nutrición de prospectos no convertidos

Evaluación del flujo posterior a la captación (tarea 10.3). Define cómo EDCO
aprovecha el contenido para seguir comunicándose con prospectos que aún no
contratan.

## Estado actual (MVP)

- El sitio captura prospectos en PostgreSQL (tabla `prospecto`).
- El seguimiento es manual y lo realiza una persona (el dueño) por llamada o
  correo.
- Los canales de nutrición disponibles hoy son **estáticos**: el blog
  (`/recursos`), el checklist descargable (`/recursos/checklist-ds44`) y el FAQ
  (`/preguntas-frecuentes`).

## Mecanismo de nutrición actual

1. Un prospecto no convierte a la primera.
2. EDCO puede re-contactarlo por correo enlazando contenido nuevo del blog.
3. El checklist sirve como material de valor que el prospecto puede usar
   incluso antes de contratar.
4. Cada artículo del blog termina con un CTA al diagnóstico (reconversión).

## Limitaciones y siguientes pasos

- **Sin newsletter automatizada:** no existe envío masivo programado. La
  nutrición depende de acción manual.
- **Sin estados de prospecto automatizados:** la columna `estado` existe en la
  tabla, pero la transición (nuevo → contactado → cotizado → cliente) se
  gestiona manualmente.
- **Próximo paso sugerido:** cuando se defina la plataforma SaaS, automatizar
  la nutrición (newsletter por segmento, recordatorios de seguimiento) sobre la
  misma base de prospectos.
