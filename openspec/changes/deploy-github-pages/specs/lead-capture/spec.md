## MODIFIED Requirements

### Requirement: Formulario "Evalúa tu Empresa" de mínima fricción
El sitio SHALL incluir un formulario que permita al visitante solicitar un diagnóstico preventivo con el mínimo de campos obligatorios: solo nombre y correo electrónico y/o teléfono de contacto. El sitio SHALL NOT pedir en el formulario datos de negocio (nº de trabajadores, tamaño, rubro); esos datos se recopilan en el seguimiento comercial posterior. El formulario es de demostración: los datos ingresados SHALL NOT transmitirse a ningún servidor; al enviar, el sitio SHALL mostrar una confirmación simulada y ofrecer el correo de contacto de EDCO como vía real de contacto.

#### Scenario: Envío de solicitud de diagnóstico
- **WHEN** el usuario completa el formulario "Evalúa tu Empresa" con nombre y un medio de contacto válido y lo envía
- **THEN** el sitio muestra una confirmación simulada de recepción y el correo de contacto de EDCO, sin transmitir los datos a ningún servidor

#### Scenario: Campos mínimos obligatorios
- **WHEN** el usuario intenta enviar el formulario sin completar los campos obligatorios
- **THEN** el sistema muestra mensajes de validación que indican los campos faltantes sin perder los datos ya ingresados

#### Scenario: Sin datos de negocio en el formulario
- **WHEN** el usuario revisa el formulario "Evalúa tu Empresa"
- **THEN** solo se le piden datos de contacto (nombre y correo y/o teléfono) y no se le solicitan datos de su empresa como nº de trabajadores, tamaño o rubro

### Requirement: Formulario de contacto
El sitio SHALL incluir un formulario de contacto general para consultas, con los campos mínimos de identificación del usuario y su mensaje. El formulario es de demostración: los datos ingresados SHALL NOT transmitirse a ningún servidor; al enviar, el sitio SHALL mostrar una confirmación simulada y ofrecer el correo de contacto de EDCO como vía real de contacto.

#### Scenario: Envío de consulta
- **WHEN** el usuario completa el formulario de contacto con datos válidos y lo envía
- **THEN** el sitio muestra una confirmación simulada de recepción y el correo de contacto de EDCO, sin transmitir los datos a ningún servidor

#### Scenario: Validación de consulta
- **WHEN** el usuario envía el formulario de contacto con datos inválidos o faltantes
- **THEN** el sistema muestra mensajes de validación claros y no envía la consulta

### Requirement: Privacidad de datos
El sitio SHALL tratar los datos ingresados en los formularios de forma local al navegador del usuario: SHALL NOT transmitirlos, persistirlos ni exponerlos a terceros.

#### Scenario: Protección de datos personales
- **WHEN** un usuario envía sus datos a través de un formulario
- **THEN** sus datos no se transmiten a ningún servidor ni tercero y solo el usuario puede decidir contactar a EDCO por el correo mostrado

## REMOVED Requirements

### Requirement: Persistencia de prospectos
**Reason**: Se elimina el backend (API serverless, PostgreSQL) porque el sitio se publica como estático puro en GitHub Pages para demostración al cliente.
**Migration**: Los formularios pasan a ser de demostración: muestran confirmación simulada y ofrecen el correo de contacto de EDCO (`contacto@edco.cl`) para el contacto real.

### Requirement: Notificación inmediata de solicitudes
**Reason**: Depende del backend de prospectos (email transaccional vía Resend), que se elimina junto con la API.
**Migration**: La vía de contacto real es el correo de EDCO mostrado en la confirmación simulada del formulario.

### Requirement: Prevención de spam
**Reason**: Sin transmisión de datos a servidores no existen envíos automatizados que bloquear; la protección contra spam deja de aplicar.
**Migration**: Sin reemplazo necesario en el sitio estático de demostración.