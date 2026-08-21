# corporate-website Specification

## Purpose

Define el sitio web corporativo de EDCO: identidad de marca, estructura de páginas, información institucional, navegación responsive y la página explicativa del Decreto Supremo N°44.

## Requirements

### Requirement: Sitio responsive mobile-first
El sitio SHALL ser desarrollado mobile-first y adaptarse correctamente a pantallas de móvil, tablet y escritorio sin pérdida de contenido ni funcionalidad. La maquetación SHALL reordenar o redimensionar componentes según el ancho de la pantalla.

#### Scenario: Visualización en móvil
- **WHEN** el sitio se visualiza en un viewport de 360px de ancho
- **THEN** el contenido es legible, los botones son táctiles y no aparece scroll horizontal

#### Scenario: Visualización en escritorio
- **WHEN** el sitio se visualiza en un viewport de 1440px de ancho
- **THEN** el contenido aprovecha el ancho disponible con una composición equilibrada

### Requirement: Identidad de marca aplicada
El sitio SHALL aplicar la identidad visual oficial de EDCO en todas las páginas: logotipo, paleta de colores (amarillo-verde #BAFF39, gris tenue #6E6E6E y blanco #FFFFFF, con casi-negro y paper cálido como superficies), tipografías y tono de comunicación definidos para EDCO. El amarillo-verde SHALL usarse como color de acento y destello (llamados a la acción, elementos destacados y foco visible), no como color de texto sobre fondos claros.

#### Scenario: Consistencia visual
- **WHEN** se navega entre páginas del sitio
- **THEN** los elementos de marca (logotipo, colores y tipografía) se mantienen consistentes en todas ellas

#### Scenario: Logotipo en el encabezado
- **WHEN** el sitio se carga
- **THEN** el logotipo de EDCO aparece en el encabezado y enlaza a la página de inicio

#### Scenario: Paleta oficial aplicada
- **WHEN** el usuario revisa cualquier página del sitio
- **THEN** los colores utilizados corresponden a la paleta oficial de EDCO (amarillo-verde, gris tenue, blanco, casi-negro y paper) y no se emplean colores de la paleta anterior (azul, ámbar, verde esmeralda)

#### Scenario: Acento legible sobre fondo claro
- **WHEN** el amarillo-verde se usa como texto o elemento gráfico fino sobre un fondo claro
- **THEN** el contenido mantiene contraste legible (el amarillo-verde no se usa como texto principal sobre blanco o paper)

### Requirement: Navegación principal
El sitio SHALL incluir una navegación principal que permita acceder a las secciones principales desde cualquier página. En móvil SHALL estar disponible una versión colapsable de la navegación que el usuario pueda abrir y cerrar con el botón de menú (hamburguesa).

#### Scenario: Navegación en escritorio
- **WHEN** el usuario está en cualquier página del sitio en escritorio
- **THEN** la navegación principal muestra enlaces a Inicio, DS44, Servicios, Nosotros y Contacto

#### Scenario: Menú en móvil
- **WHEN** el usuario abre el menú en un dispositivo móvil
- **THEN** los enlaces de navegación se muestran en un menú colapsable y son accesibles

#### Scenario: El botón hamburguesa abre el menú
- **WHEN** el usuario toca el botón de menú (hamburguesa) en un viewport menor a `lg` (1024px)
- **THEN** el menú colapsable se despliega y muestra los enlaces de navegación, incluido el CTA "Evalúa tu Empresa"

#### Scenario: El botón hamburguesa cierra el menú
- **WHEN** el menú está abierto y el usuario vuelve a tocar el botón hamburguesa
- **THEN** el menú colapsable se oculta

#### Scenario: Cierre por Escape o selección de enlace
- **WHEN** el menú está abierto y el usuario pulsa la tecla `Escape` o selecciona un enlace del menú
- **THEN** el menú colapsable se oculta

#### Scenario: Estado accesible del botón
- **WHEN** el menú colapsable se abre o se cierra
- **THEN** el botón hamburguesa actualiza los atributos `aria-expanded` y `aria-label` ("Abrir menú" / "Cerrar menú") de forma coherente con el estado visual

### Requirement: Llamado a la acción fijo
El sitio SHALL mostrar un llamado a la acción "Evalúa tu Empresa" de forma persistente y visible desde cualquier página del sitio, además de contar con una página propia para el formulario.

#### Scenario: CTA siempre visible
- **WHEN** el usuario navega por cualquier página del sitio
- **THEN** ve un botón o enlace destacado "Evalúa tu Empresa" que conduce a la solicitud de diagnóstico

#### Scenario: Página propia del formulario
- **WHEN** el usuario accede a la página "Evalúa tu Empresa"
- **THEN** encuentra el formulario de solicitud de diagnóstico junto con información de apoyo

### Requirement: Página de inicio
El sitio SHALL incluir una página de inicio con propuesta de valor, llamados a la acción para solicitar un diagnóstico o contactar, y un resumen de los servicios ofrecidos.

#### Scenario: Llamados a la acción visibles
- **WHEN** el usuario visita la página de inicio
- **THEN** ve al menos un llamado a la acción hacia el formulario "Evalúa tu Empresa" y uno hacia el formulario de contacto

#### Scenario: Resumen de servicios
- **WHEN** el usuario visita la página de inicio
- **THEN** ve un resumen de los servicios ofrecidos con enlace al catálogo completo

### Requirement: Información institucional
El sitio SHALL publicar información institucional de EDCO: presentación de la empresa, misión y trayectoria en Seguridad y Salud en el Trabajo.

#### Scenario: Página institucional
- **WHEN** el usuario accede a la página institucional
- **THEN** encuentra la presentación de la empresa, su misión y antecedentes relevantes de trayectoria

### Requirement: Página explicativa del DS44
El sitio SHALL incluir una página que explique el Decreto Supremo N°44, su relevancia para las empresas y los beneficios de un diagnóstico preventivo.

#### Scenario: Contenido del DS44
- **WHEN** el usuario accede a la página del DS44
- **THEN** encuentra una explicación clara de la norma, a quién aplica y por qué es relevante para su empresa

#### Scenario: Derivación a diagnóstico
- **WHEN** el usuario lee la página del DS44
- **THEN** ve un llamado a la acción para solicitar el diagnóstico "Evalúa tu Empresa"

### Requirement: Maqueta de área de cliente
El sitio SHALL incluir un acceso visual al futuro área de cliente (login) como una maqueta sin funcionalidad real, comunicando que está próxima.

#### Scenario: Acceso al área de cliente
- **WHEN** el usuario accede al área de cliente o login
- **THEN** ve una maqueta informativa que indica que la plataforma está próxima, sin poder autenticarse ni operar

### Requirement: Accesibilidad
El sitio SHALL aplicar buenas prácticas de accesibilidad: uso de etiquetas semánticas, alternativas textuales para imágenes, contraste suficiente y navegación operable por teclado.

#### Scenario: Navegación por teclado
- **WHEN** el usuario navega el sitio usando solo el teclado
- **THEN** todos los enlaces, botones y formularios son alcanzables y operables

#### Scenario: Textos alternativos
- **WHEN** una imagen decorativa o informativa se carga
- **THEN** la imagen dispone de un texto alternativo apropiado (alt) en el código

### Requirement: Rendimiento
El sitio SHALL cargar en menos de 3 segundos en una conexión de banda ancha típica.

#### Scenario: Tiempo de carga
- **WHEN** un usuario visita cualquier página del sitio en una conexión de banda ancha
- **THEN** la carga completa se produce en menos de 3 segundos

### Requirement: Pie de página
El sitio SHALL incluir un pie de página con datos de contacto de EDCO, accesos a las secciones principales y redes sociales si existen.

#### Scenario: Información de contacto
- **WHEN** el usuario consulta el pie de página
- **THEN** encuentra los datos de contacto de EDCO y accesos a las secciones del sitio
