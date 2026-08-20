## MODIFIED Requirements

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