# Diseño: Migración de Kumelen Running a Astro

**Fecha:** 2026-05-21  
**Estado:** Aprobado

---

## Objetivo

Migrar el sitio actual (`index.html`, 1592 líneas, CSS inline) a un proyecto Astro con componentes por sección, Tailwind CSS, y deploy estático en Vercel. La migración es 1:1 — mismo contenido y visual, mejor arquitectura.

**Motivaciones:**
- Mantenibilidad: separar 1592 líneas en componentes independientes
- Performance/SEO: output HTML estático puro de Astro (sin JS innecesario)
- Escalabilidad: facilitar la adición de páginas futuras (blog, galería, etc.)

---

## Stack

| Herramienta | Versión / Config |
|---|---|
| Astro | latest (create astro) |
| Tailwind CSS | @astrojs/tailwind |
| Adapter | @astrojs/vercel/static |
| Output | static (SSG) |
| Tipografías | Google Fonts CDN (Barlow Condensed + Inter) |

---

## Estructura de archivos

```
kumelen-running/
├── public/
│   └── images/
│       ├── matias-urrutia.jpg
│       └── matias-2.jpg
├── src/
│   ├── layouts/
│   │   └── Layout.astro          # <head>, meta, fuentes, body wrapper
│   ├── components/
│   │   ├── Nav.astro             # Navegación fija + scroll listener
│   │   ├── Hero.astro            # Sección hero con CTA
│   │   ├── Problema.astro        # Sección 2 - problema
│   │   ├── ParaQuien.astro       # Sección 3 - para quién
│   │   ├── QueEncontrar.astro    # Sección 4 - qué vas a encontrar
│   │   ├── Profe.astro           # Sección 4.5 - conocé al profe
│   │   ├── Diferencial.astro     # Sección 5 - diferencial
│   │   ├── ComoFunciona.astro    # Sección 6 - cómo funciona
│   │   ├── Horarios.astro        # Sección 7 - horarios
│   │   ├── Comunidad.astro       # Sección 8 - comunidad
│   │   ├── Testimonios.astro     # Sección 9 - testimonios
│   │   ├── FAQ.astro             # Sección 10 - FAQ + accordion JS
│   │   ├── Cierre.astro          # Sección 11 - CTA final
│   │   ├── Footer.astro          # Footer
│   │   └── FloatingWA.astro      # Botón flotante de WhatsApp
│   └── pages/
│       └── index.astro           # Ensambla Layout + todos los componentes
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

---

## Configuración de Tailwind

Los tokens de color del CSS actual se trasladan a `tailwind.config.mjs` como colores extendidos:

```js
// tailwind.config.mjs
export default {
  content: ['./src/**/*.{astro,html,js}'],
  theme: {
    extend: {
      colors: {
        azul:        '#0D3D9F',
        naranja:     '#FF6A00',
        'azul-claro':'#E6F0FF',
        'gris-suave':'#F2F4F7',
        'gris-oscuro':'#2B2F36',
      },
      fontFamily: {
        display: ['Barlow Condensed', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
      },
    },
  },
};
```

Las clases CSS existentes (`.btn`, `.tag`, `.h1`, `.h2`, etc.) se reescriben como clases Tailwind inline en cada componente. No se genera una hoja de estilos global aparte.

---

## JavaScript

El sitio tiene exactamente dos comportamientos JS, ambos migran sin cambios funcionales:

| Script | Componente destino | Descripción |
|---|---|---|
| FAQ accordion | `FAQ.astro` | Toggle clase `open` + `maxHeight` al clickear pregunta |
| Nav scroll | `Nav.astro` | Resalta link activo según sección visible + sombra al scrollear |

Cada `<script>` vive dentro del componente correspondiente. Astro los encapsula automáticamente.

---

## Layout.astro

Contiene todo lo que es común a nivel de `<head>`:
- Meta tags (charset, viewport, description, title)
- Preconnect a Google Fonts
- Link a Barlow Condensed + Inter
- `<slot />` para el contenido de la página

---

## index.astro

Solo importa y ensambla los componentes en orden:

```astro
---
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import Problema from '../components/Problema.astro';
// ... etc
---
<Layout>
  <Nav />
  <main>
    <Hero />
    <Problema />
    <!-- ... -->
  </main>
  <Footer />
  <FloatingWA />
</Layout>
```

---

## Imágenes

Las dos imágenes locales (`matias-urrutia.jpg`, `matias-2.jpg`) se mueven a `public/images/` y se referencian con rutas absolutas (`/images/matias-urrutia.jpg`). No se usa `<Image />` de Astro para mantener la migración simple y 1:1.

---

## Deploy en Vercel

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/static';

export default defineConfig({
  output: 'static',
  adapter: vercel(),
  integrations: [tailwind()],
});
```

Output: HTML estático. Vercel lo sirve como archivos estáticos, sin funciones serverless.

---

## Fuera del alcance

- Formulario de contacto funcional
- Blog o sección de novedades
- Astro Content Collections
- Optimización de imágenes con `<Image />`
- Internacionalización

---

## Criterio de éxito

El sitio migrado debe ser visualmente idéntico al `index.html` actual en desktop y mobile, con el mismo comportamiento del accordion FAQ y la navegación activa. El build de Astro debe completar sin errores y el deploy en Vercel debe funcionar.
