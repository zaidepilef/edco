# seo-basics Specification

## Purpose

Define la optimización para motores de búsqueda del sitio de EDCO con foco en términos del Decreto Supremo N°44: metadatos, marcado semántico, sitemap y datos estructurados que faciliten el posicionamiento orgánico.

## Requirements

### Requirement: Contenido orientado al DS44
El sitio SHALL priorizar el posicionamiento de términos relacionados con el Decreto Supremo N°44 y la prevención de riesgos laborales, dado que se espera que el tráfico inicial provenga principalmente de esas búsquedas.

#### Scenario: Foco en búsquedas DS44
- **WHEN** un buscador indexa el sitio
- **THEN** las páginas clave (DS44, Servicios, Diagnóstico) están orientadas a los términos de búsqueda del DS44 y la prevención de riesgos

#### Scenario: Derivación desde contenido informativo
- **WHEN** el usuario llega al sitio desde una búsqueda informativa sobre el DS44
- **THEN** el contenido educativo lo deriva hacia la solicitud de diagnóstico

### Requirement: Metadatos por página
El sitio SHALL incluir título (title) y descripción (description) únicos y relevantes en cada página para los motores de búsqueda.

#### Scenario: Metadatos en la página
- **WHEN** un buscador o usuario consulta el código de cualquier página
- **THEN** la página incluye un título y una descripción únicos y acordes a su contenido

### Requirement: Marcado semántico
El sitio SHALL usar HTML semántico (header, nav, main, section, article, footer) para que los buscadores comprendan la estructura del contenido.

#### Scenario: Estructura semántica
- **WHEN** un buscador analiza una página del sitio
- **THEN** el contenido está organizado con elementos HTML semánticos que describen su jerarquía

### Requirement: Datos estructurados
El sitio SHALL incluir datos estructurados (schema.org) que describan la organización y su información de contacto para enriquecer los resultados de búsqueda.

#### Scenario: Marcado de organización
- **WHEN** un buscador procesa el sitio
- **THEN** encuentra datos estructurados que describen a la organización EDCO, su actividad y datos de contacto

### Requirement: Sitemap
El sitio SHALL publicar un sitemap.xml con las URLs públicas del sitio para facilitar su indexación.

#### Scenario: Sitemap disponible
- **WHEN** un buscador solicita el sitemap del sitio
- **THEN** recibe un archivo sitemap.xml con las URLs públicas indexables

### Requirement: URLs legibles y canónicas
El sitio SHALL usar URLs descriptivas y legibles, con referencia canónica por página para evitar contenido duplicado.

#### Scenario: URLs descriptivas
- **WHEN** el usuario o un buscador consulta una sección del sitio
- **THEN** la URL es descriptiva y legible (por ejemplo, /servicios o /ds44)

#### Scenario: Canónica en cada página
- **WHEN** una página del sitio es accesible por más de una URL
- **THEN** la página declara una URL canónica única
