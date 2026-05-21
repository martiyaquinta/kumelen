# Kumelen Running — Elementos Visuales

## 1. Recursos gráficos / Motivos de marca

Estos elementos son el "lenguaje visual" de Kumelen y deben aparecer en la landing como fondos, decoraciones y separadores.

| Elemento | Descripción | Uso en web |
|---|---|---|
| Líneas de pista / ruta | Líneas paralelas azules que convergen en perspectiva | Hero, fondos, separadores |
| Curvas de movimiento | Líneas curvas dinámicas azul/naranja | Secciones de transición, fondos |
| Franjas diagonales | Bandas diagonales azul y naranja | Banners CTA, strips, botones |
| Ondas | Formas onduladas azules suaves | Fondos de sección, separadores orgánicos |
| Degradados | Azul → azul claro, naranja → amarillo cálido | Overlays en fotos, fondos de sección |
| Detalles de velocidad | Líneas de motion blur horizontal | Decoración en hero, elementos de acción |

### Aplicación en CSS/SVG
- Las líneas de pista pueden implementarse como SVG backgrounds o `border-image`
- Las franjas diagonales se logran con `transform: skewX(-15deg)` en pseudo-elementos
- Los degradados van de `#0D3D9F` a `#E6F0FF` (azul) o `#FF6A00` a `#FFB347` (naranja cálido)

---

## 2. Iconografía

Iconos de línea (outline), grosor medio, redondeados. Color: azul intenso (#0D3D9F) o naranja (#FF6A00) según contexto.

| Ícono | Representación | Contexto |
|---|---|---|
| Running / corredor | Figura humana en movimiento | Entrenamientos, actividad |
| Cronómetro | Tiempo, rendimiento | Horarios, marcas personales |
| Grupo / comunidad | Tres siluetas | Comunidad, grupos |
| Ubicación / pin | Lugar de encuentro | Parque Independencia, Tandil |
| Trofeo / logro | Metas, competencia, celebración | Superación, carreras |
| Corazón con pulso | Bienestar, salud | Bienestar, motivación |

**Librería recomendada:** Lucide Icons o Heroicons (estilo outline consistente con la identidad)

---

## 3. Formas y contenedores

| Componente | Estilo | Especificaciones |
|---|---|---|
| Tarjetas | Blanco, sombra suave, bordes redondeados | `border-radius: 12–16px`, `box-shadow: 0 4px 20px rgba(13,61,159,0.08)` |
| Chips / etiquetas | Pill shape, fondo azul o naranja, texto blanco | `border-radius: 999px`, padding `6px 16px` |
| Cajas destacadas | Borde izquierdo naranja o azul, fondo azul claro | `border-left: 4px solid #FF6A00` |
| Módulos web | Tarjeta con imagen arriba, contenido abajo | Relación de aspecto imagen: 16:9 o 4:3 |
| Separadores de sección | Diagonal o wave SVG | Transiciones entre secciones de color |

---

## 4. Texturas

Para aplicar sutilmente como overlays o fondos, sin sobrecargar.

| Textura | Intensidad | Uso |
|---|---|---|
| Grano suave | Muy sutil (5–10% opacity) | Fondos hero, secciones azules |
| Salpicaduras controladas | Media (sobre fotos o zonas de impacto) | Decoración junto al logo, hero |
| Patrón de puntos | Bajo (sobre fondos claros) | Secciones secundarias |
| Tramas deportivas | Bajo (líneas diagonales finas) | Fondos de sección, tarjetas |

---

## 5. Botones y CTAs

### Botón primario
```css
background: #FF6A00;
color: #FFFFFF;
border-radius: 8px; /* o pill con 999px */
padding: 14px 28px;
font: 600 16px 'Inter';
text-transform: uppercase;
/* Hover: */
background: #e05e00; /* oscurecer ~10% */
transform: translateY(-1px);
```
Ejemplos de texto: `SUMATE AL GRUPO →` · `QUIERO ENTRENAR →` · `VER HORARIOS →`

### Botón secundario (outline)
```css
background: transparent;
border: 2px solid #0D3D9F; /* o #FF6A00 sobre fondos oscuros */
color: #0D3D9F;
/* mismo padding y tipografía que primario */
/* Hover: fondo del color del borde, texto blanco */
```
Ejemplos de texto: `CONOCÉ MÁS` · `MÁS SOBRE MARTÍN` · `VER HORARIOS`

### Strip / banner CTA
- Fondo: `#FF6A00` o `#0D3D9F`
- Texto grande en blanco + botón contrastante
- Ancho completo (full-width), padding generoso

---

## 6. DO / DON'T

### DO ✓
- Usar recursos gráficos limpios y coherentes (no mezclar estilos)
- Transmitir movimiento, energía y comunidad en cada sección
- Mantener jerarquía visual clara y ordenada
- Respetar la paleta: azul, naranja y blanco como base siempre
- Bordes redondeados consistentes en todos los componentes
- Alinear los elementos decorativos (líneas de pista) con la dirección de lectura

### DON'T ✗
- No sobrecargar con efectos, sombras o animaciones excesivas
- No usar más de 2 fuentes en toda la página
- No usar colores fuera de la paleta sin justificación
- No distorsionar el logo ni estirar los recursos gráficos
- No perder legibilidad por contrastes insuficientes
- No acumular texturas en la misma sección
- No usar degradados genéricos (ej. morado → rosa — esto NO es Kumelen)
