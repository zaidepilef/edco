## Purpose

Define el catálogo de servicios de EDCO en Seguridad y Salud en el Trabajo (SST), su presentación en el sitio y las páginas de detalle de cada servicio.

## ADDED Requirements

### Requirement: Catálogo de servicios
El sitio SHALL incluir un catálogo que presente los servicios de SST que ofrece EDCO, cada uno con nombre y descripción clara para el visitante.

#### Scenario: Listado de servicios
- **WHEN** el usuario accede a la sección de Servicios
- **THEN** ve un listado de los servicios de SST ofrecidos con nombre y descripción de cada uno

#### Scenario: Cobertura del listado
- **WHEN** el usuario consulta el catálogo de servicios
- **THEN** el listado refleja la oferta vigente de EDCO (prevención, asesorías, capacitaciones, diagnóstico y gestión de riesgo, entre otros)

### Requirement: Diagnóstico como servicio vendible
El catálogo SHALL presentar el diagnóstico preventivo "Evalúa tu Empresa" como un servicio de la oferta de EDCO, con su propia página de detalle que derive al formulario de solicitud.

#### Scenario: Diagnóstico en el catálogo
- **WHEN** el usuario consulta el catálogo de servicios
- **THEN** ve el diagnóstico preventivo "Evalúa tu Empresa" listado como un servicio de la oferta

#### Scenario: Detalle del diagnóstico
- **WHEN** el usuario abre la página de detalle del diagnóstico
- **THEN** encuentra la descripción del diagnóstico y un llamado a la acción hacia el formulario "Evalúa tu Empresa"

### Requirement: Página de detalle de servicio
El sitio SHALL incluir una página de detalle por cada servicio con información ampliada y un llamado a la acción para contactar o solicitar un diagnóstico.

#### Scenario: Detalle de servicio
- **WHEN** el usuario selecciona un servicio del catálogo
- **THEN** se muestra una página con la descripción ampliada del servicio

#### Scenario: Derivación a contacto
- **WHEN** el usuario consulta la página de detalle de un servicio
- **THEN** ve un llamado a la acción para contactar a EDCO o solicitar un diagnóstico

### Requirement: Presentación de valor del servicio
El catálogo SHALL comunicar el beneficio de cada servicio para el cliente, no solo sus características técnicas.

#### Scenario: Beneficio visible
- **WHEN** el usuario revisa la descripción de un servicio
- **THEN** se comunica claramente el beneficio que obtendrá su empresa al contratarlo
