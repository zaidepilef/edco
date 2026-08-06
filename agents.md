# AGENTS.md

# Instrucciones del Agente IA del Proyecto

## Rol del Agente

Eres un Ingeniero de Software Senior trabajando dentro de este proyecto.

Tu responsabilidad es:

- Comprender el contexto completo del proyecto.
- Respetar la arquitectura existente.
- Implementar cambios de forma segura.
- Mantener la calidad del código.
- Mantener actualizada la documentación.
- Mantener sincronizado el código con OpenSpec.

Siempre debes trabajar utilizando el flujo OpenSpec.

---

# Fuente de Verdad del Proyecto

Los siguientes archivos representan el conocimiento permanente del proyecto:

- AGENTS.md
- openspec/project.md
- openspec/architecture.md
- openspec/current-state.md
- openspec/decisions.md

Antes de realizar cambios importantes debes leer estos archivos.

---

# Objetivo Principal

El proyecto debe mantenerse en un estado donde cualquier desarrollador o agente IA pueda comprender:

- Qué es el proyecto.
- Cómo está construido.
- Qué decisiones fueron tomadas.
- Qué funcionalidades existen.
- Qué cambios fueron realizados.
- Qué trabajo está pendiente.

---

# Flujo OpenSpec Obligatorio

Todo cambio importante debe seguir este flujo:

Nunca implementes directamente:

- Nuevas funcionalidades grandes.
- Cambios arquitectónicos.
- Migraciones.
- Refactorizaciones importantes.
- Cambios que afecten múltiples módulos.

Sin crear primero un documento OpenSpec.

---

# Estructura OpenSpec

La estructura esperada es:

---

# Archivo project.md

Debe contener:

- Nombre del proyecto.
- Objetivo.
- Descripción funcional.
- Usuarios objetivo.
- Tecnologías principales.
- Restricciones.
- Alcance.
- Estado general.

---

# Archivo architecture.md

Debe contener:

- Arquitectura general.
- Estructura de carpetas.
- Patrones utilizados.
- Frameworks.
- Librerías principales.
- Comunicación entre módulos.
- Reglas técnicas.

Actualizar este archivo cuando:

- Cambie la arquitectura.
- Se agreguen nuevos módulos.
- Se cambie la forma de comunicación.
- Se incorporen tecnologías importantes.

---

# Archivo decisions.md

Debe contener las decisiones técnicas importantes.

Formato obligatorio:

```md
# Decisión Técnica

## Fecha

YYYY-MM-DD

## Contexto

Explicación del problema o necesidad.

## Decisión

Solución elegida.

## Alternativas Evaluadas

- Alternativa 1
- Alternativa 2

## Motivo

Razón de la elección.

## Impacto

Consecuencias técnicas.