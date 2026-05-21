# Kumelen Running — Paleta de Colores

## Paleta principal

| Nombre | Hex | RGB | Uso principal |
|---|---|---|---|
| Azul Intenso | `#0D3D9F` | 13, 61, 159 | Color primario — títulos, fondos hero, CTAs secundarios, enlaces |
| Naranja Energía | `#FF6A00` | 255, 106, 0 | Acento — CTAs primarios, énfasis, elementos clave, highlights |
| Blanco | `#FFFFFF` | 255, 255, 255 | Fondos principales, texto sobre azul/naranja, limpieza visual |
| Azul Claro | `#E6F0FF` | 230, 240, 255 | Fondos de sección alternados, chips, tarjetas suaves |
| Gris Suave | `#F2F4F7` | 242, 244, 247 | Fondos neutros, separadores, secciones de descanso visual |
| Gris Oscuro | `#2B2F36` | 43, 47, 54 | Textos de cuerpo, elementos de apoyo, fondos oscuros opcionales |

---

## Reglas de uso

### Azul Intenso `#0D3D9F`
- Color dominante de la identidad
- Usar en: navbar, fondos hero, títulos principales, íconos, CTAs secundarios, footer
- Combina con blanco (texto) y naranja (acento)

### Naranja Energía `#FF6A00`
- Color de acción y energía
- Usar en: botones primarios, highlights de texto, badges, iconos de énfasis, elementos decorativos diagonales
- Nunca como fondo de sección completa — es un acento, no un fondo
- Combina con blanco (texto encima) y azul (contexto)

### Blanco `#FFFFFF`
- Fondo base de la página
- Texto sobre fondos azul o naranja
- Aporta respiración y jerarquía

### Azul Claro `#E6F0FF`
- Para secciones que necesitan diferenciarse del blanco sin usar el azul intenso
- Fondos de tarjetas, chips/etiquetas, secciones secundarias

### Grises (`#F2F4F7` y `#2B2F36`)
- Gris suave: fondos de sección alternados, bordes suaves
- Gris oscuro: texto de cuerpo, pie de página, microtextos

---

## Combinaciones recomendadas

| Fondo | Texto | Acento | Uso |
|---|---|---|---|
| `#0D3D9F` | `#FFFFFF` | `#FF6A00` | Hero, navbar, secciones destacadas |
| `#FFFFFF` | `#2B2F36` | `#0D3D9F` + `#FF6A00` | Secciones de contenido principal |
| `#F2F4F7` | `#2B2F36` | `#0D3D9F` | Secciones de información secundaria |
| `#FF6A00` | `#FFFFFF` | `#0D3D9F` | Banners CTA, strips de urgencia |
| `#E6F0FF` | `#0D3D9F` | `#FF6A00` | Tarjetas, chips, módulos suaves |

---

## CSS Custom Properties recomendadas

```css
:root {
  --color-primary: #0D3D9F;
  --color-accent: #FF6A00;
  --color-white: #FFFFFF;
  --color-blue-light: #E6F0FF;
  --color-gray-soft: #F2F4F7;
  --color-gray-dark: #2B2F36;
}
```

---

## Accesibilidad
- `#FFFFFF` sobre `#0D3D9F` → ratio ~8.6:1 ✓ (WCAG AAA)
- `#FFFFFF` sobre `#FF6A00` → ratio ~3.1:1 ✓ (WCAG AA para texto grande)
- `#2B2F36` sobre `#FFFFFF` → ratio ~13.4:1 ✓ (WCAG AAA)
- Evitar texto naranja sobre blanco en tamaños pequeños — contraste insuficiente para body text
