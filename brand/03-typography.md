# Kumelen Running — Tipografía

## Fuentes del sistema

### Tipografía principal — Títulos y acentos
**Kumelen Sport** (custom) — Sans serif deportiva, fuerte y dinámica.
- Peso: Bold
- Uso: H1, H2, nombres de sección, taglines, elementos de impacto
- Carácter: Agresiva, atlética, con personalidad propia
- **Alternativa Google Fonts:** `Barlow Condensed` (ExtraBold/Black) o `Oswald` (Bold)
- **Segunda alternativa:** `Black Han Sans` para máximo impacto

### Tipografía secundaria — Cuerpo y UI
**Inter** (Google Fonts) — Sans serif moderna y legible.
- Pesos usados: Regular (400), Semi Bold (600)
- Uso: párrafos, botones, labels, microtextos, nav, formularios
- Carácter: Neutral, limpia, funcional

```html
<!-- Google Fonts import -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Barlow+Condensed:wght@700;800;900&display=swap" rel="stylesheet">
```

---

## Jerarquía tipográfica

| Nivel | Fuente | Tamaño | Line-height | Tracking | Uso |
|---|---|---|---|---|---|
| H1 | Kumelen Sport Bold | 56px | 64px | -1% | Títulos hero, taglines principales |
| H2 | Kumelen Sport Bold | 28px | 36px | 0% | Títulos de sección |
| H3 | Inter Bold / Kumelen Sport | 20px | 28px | 0% | Subtítulos, nombres de pilares |
| Body | Inter Regular | 16px | 24px | 0% | Párrafos, descripciones |
| Button / CTA | Inter Semi Bold | 16px | — | 0% | Texto de botones |
| Label / Chip | Inter Semi Bold | 13–14px | — | 1–2% | Etiquetas, badges |
| Microtext | Inter Regular | 12px | 18px | 0% | Disclaimers, notas al pie |

---

## Escala responsive recomendada

| Nivel | Desktop | Tablet | Mobile |
|---|---|---|---|
| H1 | 56px | 42px | 32px |
| H2 | 28px | 24px | 22px |
| Body | 16px | 16px | 15px |
| CTA | 16px | 16px | 15px |

---

## Estilos de texto clave

### Títulos hero (H1)
- Todo en mayúsculas o capitalizado según el caso
- Las palabras clave en **naranja** (#FF6A00), el resto en blanco o azul
- Ejemplo: `"Entrená en grupo."` + `"Mejorá tu rendimiento."` (esta en naranja)

### Títulos de sección (H2)
- Capitalizado normal o mayúsculas según énfasis
- Azul intenso (#0D3D9F) sobre fondos claros
- Blanco sobre fondos azul

### CTAs y botones
- Siempre Inter Semi Bold o Bold
- Todo en mayúsculas
- Ejemplos: `SUMATE AHORA`, `QUIERO ENTRENAR`, `VER HORARIOS`

---

## CSS base recomendado

```css
h1, h2, .headline {
  font-family: 'Barlow Condensed', sans-serif; /* reemplaza Kumelen Sport */
  font-weight: 800;
  letter-spacing: -0.01em;
  text-transform: uppercase;
}

body, p, button, input {
  font-family: 'Inter', system-ui, sans-serif;
  font-weight: 400;
}

.cta-text {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}
```
