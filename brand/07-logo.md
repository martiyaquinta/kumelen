# Kumelen Running — Sistema de Logo

## Descripción del logo

El logo de Kumelen Running combina:
- **Tipografía display custom** con corte diagonal en la "K" (bicolor naranja/azul)
- **Texto "KUMELEN"** en mayúsculas, fuente deportiva bold
- **Texto "RUNNING"** en azul oscuro, fuente más compacta, debajo o al lado
- **Franjas dinámicas** (swoosh/líneas de velocidad) debajo del wordmark, en azul
- **Silueta de corredor** en azul, opcional — aparece en versiones más completas

### La "K" especial
La letra K tiene un corte diagonal que la divide en dos colores:
- Parte superior: naranja (#FF6A00)
- Parte inferior/diagonal: azul intenso (#0D3D9F)
Este detalle es el elemento más distintivo del isotipo.

---

## Variaciones del logo

### 1. Logo principal (uso recomendado)
- Horizontal: KUMELEN grande + RUNNING abajo a la derecha
- Con franja dinámica / swoosh de líneas debajo
- Colores: naranja + azul + blanco
- **Uso:** Navbar, materiales de comunicación principal, landing page

### 2. Logo secundario
- Igual al principal pero sin la franja dinámica
- Más compacto
- **Uso:** Cuando el espacio es limitado o el fondo tiene mucha actividad visual

### 3. Versión vertical
- K grande centrada arriba
- KUMELEN debajo
- RUNNING debajo con líneas horizontales a los lados
- **Uso:** Posts cuadrados, avatares grandes, merchandising

### 4. Isotipo (solo la K)
- La K bicolor (naranja/azul) con la franja dinámica mínima
- Sin texto
- **Uso:** Favicon, íconos de app, sellos pequeños, bordados

### 5. Versiones monocromáticas
| Versión | Fondo | Color logo | Uso |
|---|---|---|---|
| Azul sobre blanco | Blanco | #0D3D9F | Documentos, impresión económica |
| Blanco sobre azul | #0D3D9F | #FFFFFF | Navbar oscura, fondos de color |
| Negro sobre blanco | Blanco | #000000 | Impresión b/n, bordados oscuros |

### 6. Favicon / App Icon
- Isotipo K sobre fondo blanco con bordes redondeados (squircle)
- Tamaño mínimo: 32x32px funcional, 512x512px para manifests
- **Uso:** Pestaña del navegador, PWA, notificaciones

---

## Reglas de uso del logo

### Espacio de protección
Mantener un espacio libre alrededor del logo equivalente a la altura de la "R" de RUNNING en todas las direcciones.

### Tamaños mínimos
- Logo horizontal: mínimo 120px de ancho
- Isotipo K: mínimo 24px
- Nunca usar el logo completo a menos de 80px de ancho

### Sobre fondos de color
| Fondo | Versión a usar |
|---|---|
| Blanco / claro | Logo completo (naranja + azul) |
| Azul intenso (#0D3D9F) | Versión blanco sobre azul |
| Naranja (#FF6A00) | Versión blanco monocromático |
| Fotografía clara | Logo con shadow o sobre área oscura |
| Fotografía oscura | Logo completo o versión blanca |

---

## Lo que NO se puede hacer con el logo
- No estirar ni deformar las proporciones
- No cambiar los colores fuera de las versiones definidas
- No agregar efectos (sombras exageradas, biselados, glows)
- No rotar el logo
- No separar "KUMELEN" de "RUNNING" en contextos donde se lea como marca
- No usar el logotipo sobre fondos que no ofrezcan suficiente contraste

---

## Implementación en web (SVG inline recomendado)

Para la navbar y el footer, usar el logo como SVG inline o como `<img>` con alt descriptivo:

```html
<!-- Como imagen -->
<img src="/images/kumelen-logo.svg" alt="Kumelen Running" width="160" height="48">

<!-- Clases Tailwind para responsive -->
<img src="/images/kumelen-logo.svg" alt="Kumelen Running" class="h-10 w-auto">
```

**Versiones de archivo recomendadas a tener:**
- `kumelen-logo-full-color.svg` — principal
- `kumelen-logo-white.svg` — para fondos oscuros
- `kumelen-logo-mono-blue.svg` — para impresión
- `kumelen-isotipo.svg` — solo la K
- `favicon.ico` + `favicon-512.png` — para web
