# corporate-website Specification

## MODIFIED: Navegación principal

El sitio SHALL incluir una navegación principal que permita acceder a las secciones principales desde cualquier página. En móvil SHALL estar disponible una versión colapsable de la navegación que el usuario pueda abrir y cerrar con el botón de menú (hamburguesa).

#### UNCHANGED scenario: Navegación en escritorio

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
