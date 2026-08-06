# resource-blog Specification

## Purpose

Define el blog de recursos de EDCO: un listado de artículos informativos sobre prevención de riesgos, normativa y seguridad laboral, con páginas de detalle por artículo.

## Requirements

### Requirement: Listado de recursos
El sitio SHALL incluir un blog de recursos que muestre los artículos publicados en orden cronológico, con título, resumen y fecha de cada uno.

#### Scenario: Visualización del listado
- **WHEN** el usuario accede a la sección de recursos
- **THEN** ve los artículos publicados con su título, resumen y fecha

#### Scenario: Acceso al artículo
- **WHEN** el usuario selecciona un artículo del listado
- **THEN** se abre la página de detalle del artículo

### Requirement: Página de detalle de artículo
El sitio SHALL incluir una página de detalle por cada artículo con su contenido completo, fecha de publicación y autor o fuente cuando corresponda.

#### Scenario: Lectura de artículo
- **WHEN** el usuario abre un artículo
- **THEN** puede leer el contenido completo junto con su fecha de publicación y autor o fuente si corresponde

### Requirement: Gestión de contenido del blog
Los artículos del blog SHALL poder publicarse mediante archivos de contenido gestionables, sin requerir un panel administrativo.

#### Scenario: Publicación de nuevo artículo
- **WHEN** se agrega un nuevo archivo de contenido al blog
- **THEN** el artículo aparece en el listado con su título, resumen y fecha sin cambios en el código de la aplicación
