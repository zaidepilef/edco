## Purpose

Define los formularios de captación de prospectos del sitio: el formulario "Evalúa tu Empresa" para solicitar un diagnóstico preventivo y el formulario de contacto general, su persistencia y la notificación a EDCO.

## ADDED Requirements

### Requirement: Formulario "Evalúa tu Empresa" de mínima fricción
El sitio SHALL incluir un formulario que permita al visitante solicitar un diagnóstico preventivo con el mínimo de campos obligatorios: solo nombre y correo electrónico y/o teléfono de contacto. El sitio SHALL NOT pedir en el formulario datos de negocio (nº de trabajadores, tamaño, rubro); esos datos se recopilan en el seguimiento comercial posterior.

#### Scenario: Envío de solicitud de diagnóstico
- **WHEN** el usuario completa el formulario "Evalúa tu Empresa" con nombre y un medio de contacto válido y lo envía
- **THEN** la solicitud se registra y el usuario recibe una confirmación de que ha sido recibida

#### Scenario: Campos mínimos obligatorios
- **WHEN** el usuario intenta enviar el formulario sin completar los campos obligatorios
- **THEN** el sistema muestra mensajes de validación que indican los campos faltantes sin perder los datos ya ingresados

#### Scenario: Sin datos de negocio en el formulario
- **WHEN** el usuario revisa el formulario "Evalúa tu Empresa"
- **THEN** solo se le piden datos de contacto (nombre y correo y/o teléfono) y no se le solicitan datos de su empresa como nº de trabajadores, tamaño o rubro

### Requirement: Formulario de contacto
El sitio SHALL incluir un formulario de contacto general para consultas, con los campos mínimos de identificación del usuario y su mensaje.

#### Scenario: Envío de consulta
- **WHEN** el usuario completa el formulario de contacto con datos válidos y lo envía
- **THEN** la consulta se registra y el usuario recibe una confirmación de recepción

#### Scenario: Validación de consulta
- **WHEN** el usuario envía el formulario de contacto con datos inválidos o faltantes
- **THEN** el sistema muestra mensajes de validación claros y no envía la consulta

### Requirement: Persistencia de prospectos
El sistema SHALL persistir cada solicitud de diagnóstico y cada consulta en un almacenamiento persistente (tabla `prospecto` en PostgreSQL), de modo que el registro quede guardado aunque falle la notificación a EDCO.

#### Scenario: Registro persistente
- **WHEN** el usuario envía una solicitud de diagnóstico o una consulta
- **THEN** la solicitud queda guardada en la base de datos de prospectos

#### Scenario: Respaldo ante fallo de notificación
- **WHEN** se registra una solicitud pero la notificación a EDCO falla
- **THEN** la solicitud permanece guardada en la base de datos y no se pierde

### Requirement: Notificación inmediata de solicitudes
El sitio SHALL notificar a EDCO de forma inmediata cuando se recibe una solicitud de diagnóstico o una consulta, para que una única persona de la empresa pueda hacer seguimiento comercial por llamada o correo.

#### Scenario: Notificación al equipo
- **WHEN** se registra una solicitud de diagnóstico o una consulta de contacto
- **THEN** EDCO recibe una notificación inmediata con los datos de la solicitud

### Requirement: Privacidad de datos
El sitio SHALL tratar los datos enviados a través de los formularios de forma segura y no exponerlos públicamente ni a terceros no autorizados.

#### Scenario: Protección de datos personales
- **WHEN** un usuario envía sus datos a través de un formulario
- **THEN** sus datos personales se almacenan y transmiten de forma segura y solo son accesibles para el equipo de EDCO

### Requirement: Prevención de spam
El sitio SHALL proteger los formularios contra envíos automatizados no deseados.

#### Scenario: Bloqueo de envío automatizado
- **WHEN** un bot intenta enviar el formulario de forma automatizada
- **THEN** el envío se rechaza o se exige una verificación adicional, sin afectar la experiencia de usuarios reales
