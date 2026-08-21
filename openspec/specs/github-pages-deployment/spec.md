# github-pages-deployment Specification

## Purpose

Define cómo el sitio corporativo de EDCO se construye y publica como sitio estático puro en GitHub Pages desde la raíz de la rama `gh-pages`, servido bajo el subdirectorio `/edco/` y publicado manualmente con la CLI `gh-pages`, sin GitHub Actions ni backend.

## Requirements

### Requirement: Build estático sin adapter
El sitio SHALL construirse con generación estática pura: `npm run build` SHALL completarse sin adapter instalado y SHALL generar el sitio con `index.html` en la raíz del directorio de salida. El sitio SHALL NOT incluir rutas que requieran renderizado en servidor.

#### Scenario: Build exitoso sin adapter
- **WHEN** se ejecuta `npm run build` en un entorno sin adapters de servidor configurados
- **THEN** el build completa sin el error de adapter faltante y produce un sitio estático con `index.html` en la raíz

#### Scenario: Sin rutas server-rendered
- **WHEN** se inspecciona la salida del build
- **THEN** no existe ninguna ruta o endpoint que requiera ejecución en servidor (por ejemplo, `/api/prospecto`)

### Requirement: Servido bajo el subdirectorio /edco/
El sitio SHALL funcionar publicado en `https://zaidepilef.github.io/edco/`: todos los enlaces internos, hojas de estilo, scripts y recursos del sitio SHALL resolverse bajo ese prefijo `/edco/` sin depender de la raíz del dominio.

#### Scenario: Navegación interna funcional
- **WHEN** un visitante navega el sitio desde cualquier página
- **THEN** todos los enlaces internos y assets se resuelven bajo `/edco/` y cargan sin errores 404

#### Scenario: Página de inicio accesible
- **WHEN** se solicita `https://zaidepilef.github.io/edco/`
- **THEN** el sitio responde con la página de inicio y sus estilos y scripts cargan correctamente

### Requirement: Publicación manual en la rama gh-pages
El sitio SHALL publicarse manualmente desde la máquina local con la CLI `gh-pages`, desplegando el contenido del directorio de salida en la raíz de la rama `gh-pages`. La publicación SHALL incluir un archivo `.nojekyll` para que GitHub Pages no procese el contenido con Jekyll.

#### Scenario: Despliegue a la rama gh-pages
- **WHEN** se ejecuta el script de despliegue con la CLI `gh-pages`
- **THEN** el contenido del directorio de salida queda en la raíz de la rama `gh-pages` junto con un archivo `.nojekyll`

#### Scenario: Sitio publicado en la raíz
- **WHEN** se revisa la rama `gh-pages` remota
- **THEN** `index.html` y los assets están en la raíz de la rama (sin subdirectorios intermedios tipo `client/`)

### Requirement: Formularios sin backend
El sitio SHALL presentar los formularios de captación de prospectos como demostración sin requerir ningún backend: el envío SHALL funcionar sin conexión a servidores propios y SHALL NOT depender de una API desplegada.

#### Scenario: Envío de formulario sin backend
- **WHEN** un usuario envía un formulario en el sitio publicado
- **THEN** el formulario responde con confirmación simulada y la información de contacto de EDCO, sin intentar llamadas a una API inexistente