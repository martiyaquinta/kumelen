# Kumelen Running — Landing Page Design Spec

**Fecha:** 2026-05-21
**Estado:** Aprobado para construcción

---

## Objetivo

Construir una landing page de una sola página para **Kumelen Running**, grupo de running en Tandil, Argentina. El objetivo es convertir visitas en nuevos miembros, usando WhatsApp como canal de conversión. Primera clase gratis como gancho principal.

**Conversión primaria:** Botón WhatsApp → mensaje pre-armado para agendar clase gratis.

---

## Decisiones de diseño

### Dirección visual
**Bold e inmersiva** — alta energía visual, foco en comunidad y progreso. No es una marca de élite: es cercana, humana y motivadora.

### Assets
- Imágenes: Unsplash (stock) en esta versión. Reemplazar con fotos reales del grupo en versión final.
- Logo: Usar texto con Barlow Condensed como proxy hasta tener SVG del logo real.
- Fuentes: `Barlow Condensed` (800/900) para títulos + `Inter` (400/600) para cuerpo. Ambas via Google Fonts.

### Paleta (de `brand/02-color-palette.md`)
```
--blue:       #0D3D9F
--blue-dark:  #081f50
--blue-light: #E6F0FF
--orange:     #FF6A00
--white:      #FFFFFF
--gray-soft:  #F2F4F7
--gray-dark:  #2B2F36
```

---

## Estructura de secciones (Layout A)

```
1. Navbar
2. Hero
3. Pilares (¿Por qué Kumelen?)
4. Niveles de entrenamiento
5. Conocé a Martín
6. Horarios y lugar
7. CTA final → WhatsApp
8. Footer
```

---

## Especificación por sección

### 1. Navbar
- Fijo al hacer scroll (`position: sticky` o `fixed`)
- Fondo: transparente sobre hero → `#081f50` con blur al hacer scroll (scroll-triggered class)
- Logo: `KUMELEN` (K en naranja) + `RUNNING` en subtexto
- Links: Inicio · Sobre Nosotros · Entrenamientos · Horarios · Contacto
- CTA: `UNIRME AL GRUPO` → botón naranja, scroll al CTA final
- Mobile: hamburger menu, drawer desde la derecha

### 2. Hero
- **Tratamiento:** Foto full-bleed con overlay degradado azul oscuro
  - `linear-gradient(110deg, rgba(6,13,26,0.97) 35%, rgba(6,13,26,0.6) 65%, transparent 100%)`
- **Foto:** Grupo de corredores al atardecer. Foto desde atrás o lateral, Tandil si es posible.
- **"K" watermark:** Letra K gigante (font-size: ~55vw) en color `rgba(13,61,159,0.12)`, posicionada a la derecha del hero, detrás de todo.
- **Líneas de velocidad (SVG):** 3 líneas diagonales naranjas/blancas en la parte inferior del hero. `stroke="rgba(255,106,0,0.45)"` la más intensa.
- **Clip-path inferior:** `polygon(0 0, 100% 0, 100% 94%, 0 100%)` para crear corte diagonal
- **Eyebrow:** `Tandil · Al aire libre · Todos los niveles` — estilo pill naranja
- **Título H1:**
  ```
  CORRÉ CON
  UN EQUIPO        ← italic + -webkit-text-stroke (outline), NO relleno
  QUE TE IMPULSA.
  ```
  Font-size: clamp(58px, 8vw, 90px). Line-height: 0.95.
- **Subtítulo:** `rgba(255,255,255,0.55)`, 14–15px, max-width 340px
- **CTAs:**
  - Primario: `PROBAR UNA CLASE →` — naranja, con `clip-path` en forma de flecha (corte diagonal derecha)
  - Secundario: `VER HORARIOS` — texto con underline, color rgba blanco suave
- **Stats strip:** Barra naranja diagonal debajo del hero usando `clip-path: polygon(0 8%, 100% 0%, 100% 92%, 0 100%)`
  - 4 stats: `3 días/semana` · `4 niveles` · `100% aire libre` · `1ª clase gratis`

### 3. Pilares — ¿Por qué Kumelen?
- Fondo: `#060d1a` (azul muy oscuro, no negro puro)
- Número fantasma de sección: `01` — font-size 120px, `rgba(255,255,255,0.03)`, absolute arriba a la derecha
- Eyebrow pequeño con línea naranja antes del texto
- H2: `¿POR QUÉ KUMELEN RUNNING?` — "RUNNING" en outline (`-webkit-text-stroke`)
- **Formato: lista editorial** (no cards en grilla)
  - Cada pillar: fila horizontal con icono (44×44px, bg naranja tenue) + texto + número alineado a la derecha
  - Separados por `border-bottom: 1px solid rgba(255,255,255,0.06)`
  - Hover sutil: icon border se ilumina en naranja
- 4 pilares: Entrenamientos guiados · Comunidad real · Mejora progresiva · Motivación grupal

### 4. Niveles de entrenamiento
- Fondo: `#060d1a` con separador diagonal
- Número fantasma: `02`
- H2 bold
- **4 cards** en grilla (2×2 en mobile, 4 columnas en desktop)
  - Borde superior de 3px: azul para 3 niveles, naranja para "Avanzado" (featured)
  - Chip de nivel (Inicial / Intermedio / Avanzado / Competencia)
  - Número grande `01–04` como elemento decorativo interno (`rgba` muy bajo)
  - H3 + descripción corta
- Fondo de cards: `rgba(255,255,255,0.04)` con border sutil

### 5. Conocé a Martín
- Fondo: blanco (contraste intencional — rompe la oscuridad)
- Layout: 2 columnas — foto izquierda, texto derecha
- Foto: aspect-ratio 4/5, border-radius 20px
- Badge naranja (absolute bottom-right de la foto): texto como `+10 años entrenando`
- Nombre: `Martín Arregui` en Barlow Condensed 46px, color `#081f50`
- Role: `Entrenador · Atleta · Apasionado por el running` — naranja
- Bio + tags (chips azul claro)
- CTA secundario outline: `MÁS SOBRE MARTÍN`

### 6. Horarios y lugar
- Fondo: `#0D3D9F` (azul intenso)
- 3 cards horizontales con icono + título + detalle
  - Martes y Jueves: 19:30 hs
  - Sábados: 08:00 hs
  - Parque Independencia, Tandil
- Cards: `rgba(255,255,255,0.06)` con border `rgba(255,255,255,0.1)`

### 7. CTA final
- Fondo: `#FF6A00` (naranja sólido)
- Líneas de velocidad sutiles como pseudo-elemento (mismo SVG que el hero, blancas)
- H2: `SUMATE AL GRUPO QUE TE IMPULSA A IR MÁS LEJOS`
- Subtítulo: `Primera clase gratis. ¡Animate a ser parte!`
- Botón: blanco con texto naranja, `box-shadow` para elevación
  - `href`: `https://wa.me/549XXXXXXXXXX?text=Hola!%20Me%20interesa%20probar%20una%20clase%20de%20Kumelen%20Running`
  - Número de WhatsApp a completar por el cliente

### 8. Footer
- Fondo: `#2B2F36`
- Logo (versión blanca) + tagline: *"Corremos juntos, vamos más lejos."*
- Links secundarios + Facebook `/kumelen running`
- Copyright

---

## Comportamiento responsive

| Breakpoint | Cambios clave |
|---|---|
| `< 768px` | Navbar hamburger, hero H1 ~42px, pilares en columna, 2×2 cards niveles, coach en columna, stats 2×2 |
| `768–1024px` | Navbar completo, hero H1 ~58px, 4 columnas niveles reducidas |
| `> 1024px` | Diseño completo como spec |

---

## Interacciones

- **Navbar:** Al hacer scroll > 80px → fondo `rgba(8,31,80,0.95)` + `backdrop-filter: blur(12px)`, transición suave
- **Hover pilares:** Border naranja aparece en el icono
- **Hover cards niveles:** `translateY(-3px)` + shadow
- **Hover botón primario:** `background: #e05e00` + `translateY(-1px)`
- **Scroll behavior:** `scroll-behavior: smooth` en `html`
- Sin dependencias JS externas. Alpine.js solo si es necesario para el navbar móvil.

---

## Archivos de referencia
- `brand/01-brand-identity.md` — concepto y valores
- `brand/02-color-palette.md` — paleta completa
- `brand/03-typography.md` — jerarquía tipográfica
- `brand/04-visual-elements.md` — recursos gráficos, DO/DON'T
- `brand/05-photography.md` — dirección fotográfica
- `brand/06-landing-content.md` — copy completo y CTAs
- `brand/07-logo.md` — uso del logo

---

## Fuera de scope (esta versión)
- Formulario de contacto (se usa WhatsApp)
- Páginas adicionales (es una landing de una sola página)
- Animaciones de scroll (GSAP/ScrollTrigger) — pueden agregarse después
- CMS o backend de cualquier tipo
- Versión en inglés
