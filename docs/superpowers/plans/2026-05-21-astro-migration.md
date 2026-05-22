# Kumelen Running — Astro Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the existing `index.html` (1592 lines, inline CSS) to an Astro project with 15 components, Tailwind CSS, and static deploy on Vercel.

**Architecture:** One Astro component per page section. Shared utilities (reset, tokens, `.btn`, `.tag`, `.h1/.h2`, `.section`, `.container`) live in `src/styles/global.css`. Section-specific CSS lives in scoped `<style>` blocks inside each component. Tailwind config defines the color/font tokens so they're available as utilities anywhere.

**Tech Stack:** Astro (latest), @astrojs/tailwind, @astrojs/vercel (static adapter), Google Fonts CDN (Barlow Condensed + Inter).

---

## File Map

| File | Action | Purpose |
|---|---|---|
| `package.json` | Create | Astro project dependencies |
| `astro.config.mjs` | Create | Astro + Tailwind + Vercel config |
| `tailwind.config.mjs` | Create | Color tokens + font families |
| `src/styles/global.css` | Create | Reset, shared CSS utilities |
| `src/layouts/Layout.astro` | Create | `<head>`, fonts, body wrapper |
| `src/pages/index.astro` | Create | Assembles all components |
| `src/components/Nav.astro` | Create | Fixed nav + scroll JS |
| `src/components/Hero.astro` | Create | Hero section |
| `src/components/Problema.astro` | Create | Section 2 |
| `src/components/ParaQuien.astro` | Create | Section 3 |
| `src/components/QueEncontrar.astro` | Create | Section 4 |
| `src/components/Profe.astro` | Create | Section 4.5 |
| `src/components/Diferencial.astro` | Create | Section 5 |
| `src/components/ComoFunciona.astro` | Create | Section 6 |
| `src/components/Horarios.astro` | Create | Section 7 |
| `src/components/Comunidad.astro` | Create | Section 8 |
| `src/components/Testimonios.astro` | Create | Section 9 |
| `src/components/FAQ.astro` | Create | Section 10 + accordion JS |
| `src/components/Cierre.astro` | Create | Section 11 |
| `src/components/Footer.astro` | Create | Footer |
| `src/components/FloatingWA.astro` | Create | Floating WhatsApp button |
| `public/images/matias-urrutia.jpg` | Move | Photo of coach |
| `public/images/matias-2.jpg` | Move | Secondary photo |

---

## Task 1: Scaffold Astro project

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tailwind.config.mjs`

- [ ] **Step 1: Create the Astro project in the current directory**

```bash
cd "/Users/martinayaquinta/Downloads/project/Kumelen Running"
npm create astro@latest . -- --template minimal --no-install --no-git
```

When prompted: select "An empty project", no TypeScript, no git init (already a repo).

- [ ] **Step 2: Install dependencies**

```bash
cd "/Users/martinayaquinta/Downloads/project/Kumelen Running"
npm install
```

Expected: `node_modules/` created, no errors.

- [ ] **Step 3: Add Tailwind and Vercel integrations**

```bash
cd "/Users/martinayaquinta/Downloads/project/Kumelen Running"
npx astro add tailwind vercel --yes
```

Expected: `tailwind.config.mjs` created, `astro.config.mjs` updated, packages installed.

- [ ] **Step 4: Replace astro.config.mjs with full config**

Write `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'static',
  adapter: vercel(),
  integrations: [tailwind()],
});
```

- [ ] **Step 5: Replace tailwind.config.mjs with token config**

Write `tailwind.config.mjs`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts}'],
  theme: {
    extend: {
      colors: {
        azul:          '#0D3D9F',
        naranja:       '#FF6A00',
        'azul-claro':  '#E6F0FF',
        'gris-suave':  '#F2F4F7',
        'gris-oscuro': '#2B2F36',
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 6: Verify dev server starts**

```bash
cd "/Users/martinayaquinta/Downloads/project/Kumelen Running"
npm run dev
```

Expected: `http://localhost:4321` is reachable and shows a blank page (no errors in terminal).

Stop the server with Ctrl+C.

- [ ] **Step 7: Commit**

```bash
cd "/Users/martinayaquinta/Downloads/project/Kumelen Running"
git add package.json package-lock.json astro.config.mjs tailwind.config.mjs src/ .gitignore
git commit -m "feat: scaffold Astro project with Tailwind + Vercel"
```

---

## Task 2: Global CSS and Layout

**Files:**
- Create: `src/styles/global.css`
- Create: `src/layouts/Layout.astro`

- [ ] **Step 1: Create global.css with shared utilities**

Write `src/styles/global.css`:

```css
/* ===== TOKENS ===== */
:root {
  --azul:       #0D3D9F;
  --naranja:    #FF6A00;
  --blanco:     #FFFFFF;
  --azul-claro: #E6F0FF;
  --gris-suave: #F2F4F7;
  --gris-oscuro:#2B2F36;
}

/* ===== RESET ===== */
*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
html { scroll-behavior:smooth; }
body {
  font-family:'Inter', sans-serif;
  color: var(--gris-oscuro);
  overflow-x: hidden;
  line-height: 1.6;
}
img { display:block; max-width:100%; }
a  { text-decoration:none; }

/* ===== CONTAINER ===== */
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ===== ACCENT BAR ===== */
.accent-bar {
  height: 6px;
  background: linear-gradient(90deg, var(--naranja), var(--azul));
}

/* ===== TAGS ===== */
.tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .1em;
  padding: 5px 14px;
  border-radius: 50px;
}
.tag--blue  { background: var(--azul-claro); color: var(--azul); }
.tag--orange{ background: rgba(255,106,0,.12); color: var(--naranja); border:1px solid rgba(255,106,0,.25); }
.tag--white { background: rgba(255,255,255,.15); color:#fff; border:1px solid rgba(255,255,255,.25); }

/* ===== HEADINGS ===== */
.h1, .h2 {
  font-family:'Barlow Condensed', sans-serif;
  font-weight: 900;
  text-transform: uppercase;
  line-height: 1.03;
}
.h1 { font-size: clamp(42px,6vw,72px); }
.h2 { font-size: clamp(30px,4.5vw,54px); }
.h2--white { color:#fff; }
.h2--blue  { color: var(--azul); }
.accent    { color: var(--naranja); }

/* ===== BUTTONS ===== */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family:'Inter', sans-serif;
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: .04em;
  padding: 14px 28px;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  transition: transform .18s, box-shadow .18s, background .18s;
}
.btn--orange { background: var(--naranja); color: #fff; }
.btn--orange:hover {
  background: #e05a00;
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(255,106,0,.35);
}
.btn--blue { background: var(--azul); color: #fff; }
.btn--blue:hover {
  background: #0a2f7a;
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(13,61,159,.32);
}
.btn--outline-white {
  background: transparent;
  color: #fff;
  border: 2px solid rgba(255,255,255,.7);
}
.btn--outline-white:hover { background: rgba(255,255,255,.1); }
.btn-arrow::after { content: ' →'; }

/* ===== BODY TEXT ===== */
.body-text { font-size: 16px; line-height: 1.8; color: #556; }
.body-text--white { color: rgba(255,255,255,.8); }

/* ===== SHARED SECTIONS ===== */
.section { padding: 96px 0; }
.section--grey   { background: var(--gris-suave); }
.section--white  { background: var(--blanco); }
.section--blue   { background: var(--azul); }
.section--orange { background: var(--naranja); }
.section--dark   { background: linear-gradient(135deg,#0D3D9F 0%,#041640 100%); }

.section__header { text-align: center; margin-bottom: 60px; }
.section__header .tag  { margin-bottom: 12px; }
.section__header .h2   { margin-bottom: 16px; }
.section__header .body-text { max-width: 580px; margin: 0 auto; }
```

- [ ] **Step 2: Create Layout.astro**

Write `src/layouts/Layout.astro`:

```astro
---
import '../styles/global.css';

export interface Props {
  title?: string;
  description?: string;
}
const {
  title = 'Kumelen Running – Grupo de Running en Tandil',
  description = 'Grupo de running en Tandil para empezar, mejorar tu rendimiento y entrenar acompañado. Entrenamientos guiados para todos los niveles.',
} = Astro.props;
---
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content={description}>
  <title>{title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
  <slot />
</body>
</html>
```

- [ ] **Step 3: Verify build has no errors**

```bash
cd "/Users/martinayaquinta/Downloads/project/Kumelen Running"
npm run build 2>&1 | tail -20
```

Expected: `dist/` created, no errors.

- [ ] **Step 4: Commit**

```bash
git add src/styles/global.css src/layouts/Layout.astro
git commit -m "feat: add global styles and Layout component"
```

---

## Task 3: Move images to public/

**Files:**
- Move: `images/matias-urrutia.jpg` → `public/images/matias-urrutia.jpg`
- Move: `images/matias-2.jpg` → `public/images/matias-2.jpg`

- [ ] **Step 1: Create public/images/ and copy files**

```bash
cd "/Users/martinayaquinta/Downloads/project/Kumelen Running"
mkdir -p public/images
cp images/matias-urrutia.jpg public/images/
cp images/matias-2.jpg public/images/
```

- [ ] **Step 2: Verify files exist**

```bash
ls public/images/
```

Expected: `matias-2.jpg  matias-urrutia.jpg`

- [ ] **Step 3: Commit**

```bash
git add public/images/
git commit -m "feat: move images to public/images for Astro"
```

---

## Task 4: Nav component

**Files:**
- Create: `src/components/Nav.astro`

- [ ] **Step 1: Create Nav.astro**

Write `src/components/Nav.astro`:

```astro
<nav class="nav">
  <div class="nav__inner">
    <a href="#" class="nav__logo">
      <div><span class="nav__logo-k">K</span>UMELEN</div>
      <div class="nav__logo-sub">Running</div>
    </a>
    <ul class="nav__links">
      <li><a href="#para-quien">Para vos</a></li>
      <li><a href="#como-funciona">Cómo funciona</a></li>
      <li><a href="#horarios">Horarios</a></li>
      <li><a href="#faq">FAQ</a></li>
      <li>
        <a href="https://www.instagram.com/kumelenrunning_trail" target="_blank" rel="noopener"
           style="display:inline-flex;align-items:center;gap:5px;color:var(--naranja)">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
          </svg>
          Instagram
        </a>
      </li>
    </ul>
    <div class="nav__cta">
      <a href="https://wa.me/5492494673961?text=Hola%2C%20quiero%20sumarme%20a%20Kumelen%20Running"
         class="btn btn--orange btn-arrow" target="_blank" rel="noopener">Sumate ahora</a>
    </div>
    <button class="nav__hamburger" aria-label="Menú">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>

<style>
  .nav {
    position: fixed;
    inset: 0 0 auto 0;
    z-index: 1000;
    background: rgba(255,255,255,.96);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(13,61,159,.08);
  }
  .nav__inner {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 68px;
  }
  .nav__logo {
    font-family:'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 26px;
    text-transform: uppercase;
    color: var(--azul);
    display: flex;
    flex-direction: column;
    line-height: 1;
  }
  .nav__logo-k { color: var(--naranja); }
  .nav__logo-sub {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: .18em;
    color: var(--azul);
    margin-top: 1px;
  }
  .nav__links {
    display: flex;
    align-items: center;
    gap: 28px;
    list-style: none;
  }
  .nav__links a {
    font-size: 13px;
    font-weight: 600;
    color: var(--gris-oscuro);
    text-transform: uppercase;
    letter-spacing: .06em;
    transition: color .2s;
  }
  .nav__links a:hover { color: var(--azul); }
  .nav__hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    background: none;
    border: none;
    padding: 4px;
  }
  .nav__hamburger span {
    display: block;
    width: 24px; height: 2px;
    background: var(--azul);
    border-radius: 2px;
  }
  @media (max-width: 860px) {
    .nav__links, .nav__cta { display: none; }
    .nav__hamburger { display: flex; }
  }
</style>

<script>
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    sections.forEach(s => {
      if (scrollY >= s.offsetTop - 100 && scrollY < s.offsetTop + s.offsetHeight - 100) {
        navLinks.forEach(a => {
          a.style.color = a.getAttribute('href') === '#' + s.id ? 'var(--naranja)' : '';
        });
      }
    });
    document.querySelector('.nav').style.boxShadow =
      scrollY > 10 ? '0 4px 24px rgba(0,0,0,.1)' : '';
  });
</script>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Nav.astro
git commit -m "feat: add Nav component"
```

---

## Task 5: Hero component

**Files:**
- Create: `src/components/Hero.astro`

- [ ] **Step 1: Create Hero.astro**

Write `src/components/Hero.astro`:

```astro
<section class="hero" id="inicio">
  <div class="hero__lines">
    <svg viewBox="0 0 1440 400" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M-100 400 Q400 100 1600 350" stroke="white" stroke-width="3" fill="none"/>
      <path d="M-100 420 Q400 120 1600 370" stroke="white" stroke-width="2" fill="none"/>
      <path d="M-100 440 Q400 140 1600 390" stroke="white" stroke-width="1.5" fill="none"/>
      <path d="M-100 460 Q400 160 1600 410" stroke="white" stroke-width="1" fill="none"/>
      <path d="M-100 480 Q400 180 1600 430" stroke="white" stroke-width="0.8" fill="none"/>
    </svg>
  </div>
  <div class="hero__streaks">
    <div class="hero__streak"></div>
    <div class="hero__streak"></div>
    <div class="hero__streak"></div>
  </div>
  <div class="hero__glow"></div>

  <div class="hero__content">
    <div class="hero__text">
      <div class="hero__eyebrow">
        <span class="tag tag--orange">📍 Tandil · Todos los niveles</span>
      </div>
      <h1 class="h1 hero__h1">
        Grupo de running<br>
        en Tandil para<br>
        <span class="accent">empezar y mejorar</span>
      </h1>
      <p class="hero__subtitle">
        Entrenamientos guiados para distintos niveles, con acompañamiento profesional, planificación progresiva y una comunidad que te ayuda a sostener el hábito.
      </p>
      <div class="hero__ctas">
        <a href="https://wa.me/5492494673961?text=Hola%2C%20quiero%20sumarme%20a%20Kumelen%20Running"
           class="btn btn--orange btn-arrow" target="_blank" rel="noopener">Quiero sumarme al grupo</a>
        <a href="#como-funciona" class="btn btn--outline-white">Ver cómo funciona</a>
      </div>
      <p class="hero__micro">Consultanos por WhatsApp y te orientamos según tu nivel.</p>
    </div>
    <div class="hero__badge">
      <svg class="hero__runner" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="80" cy="22" r="10" fill="#FF6A00" opacity=".9"/>
        <path d="M80 32 Q72 48 60 58 Q52 64 42 78 L38 95" stroke="#FF6A00" stroke-width="5" stroke-linecap="round" fill="none" opacity=".9"/>
        <path d="M60 58 Q68 70 72 82 L80 96" stroke="#FF6A00" stroke-width="5" stroke-linecap="round" fill="none" opacity=".9"/>
        <path d="M74 38 Q60 30 46 35 Q38 38 32 44" stroke="#FF6A00" stroke-width="5" stroke-linecap="round" fill="none" opacity=".9"/>
        <path d="M74 38 Q82 44 88 55" stroke="#FF6A00" stroke-width="4" stroke-linecap="round" fill="none" opacity=".7"/>
        <path d="M20 72 L50 72" stroke="white" stroke-width="2" stroke-linecap="round" opacity=".25"/>
        <path d="M14 80 L44 80" stroke="white" stroke-width="1.5" stroke-linecap="round" opacity=".15"/>
        <path d="M22 88 L46 88" stroke="white" stroke-width="1" stroke-linecap="round" opacity=".12"/>
      </svg>
      <div class="hero__stats">
        <div class="hero__stat">
          <div class="hero__stat-n">AL AIRE</div>
          <div class="hero__stat-l">Libre</div>
        </div>
        <div class="hero__stat">
          <div class="hero__stat-n">TODOS</div>
          <div class="hero__stat-l">los niveles</div>
        </div>
        <div class="hero__stat">
          <div class="hero__stat-n">GUÍA</div>
          <div class="hero__stat-l">profesional</div>
        </div>
        <div class="hero__stat">
          <div class="hero__stat-n">TANDIL</div>
          <div class="hero__stat-l">Ciudad</div>
        </div>
      </div>
    </div>
  </div>
</section>
<div class="accent-bar"></div>

<style>
  .hero {
    min-height: 100vh;
    background: linear-gradient(140deg, #0D3D9F 0%, #082870 55%, #041640 100%);
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    padding-top: 68px;
  }
  .hero__lines {
    position: absolute; inset: 0; pointer-events: none; overflow: hidden;
  }
  .hero__lines svg {
    position: absolute; bottom: 0; left: 0; width: 100%; height: 55%; opacity: .1;
  }
  .hero__streaks { position: absolute; inset: 0; pointer-events: none; }
  .hero__streak {
    position: absolute; right: 0; height: 3px; border-radius: 2px;
  }
  .hero__streak:nth-child(1) {
    width:42%; top:38%;
    background: linear-gradient(90deg, transparent, var(--naranja)); opacity:.55;
  }
  .hero__streak:nth-child(2) {
    width:30%; top:calc(38% + 10px);
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.5)); opacity:.4;
  }
  .hero__streak:nth-child(3) {
    width:18%; top:calc(38% + 20px);
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.25)); opacity:.3;
  }
  .hero__glow {
    position: absolute; right: -180px; top: 50%;
    transform: translateY(-50%);
    width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,106,0,.18) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero__content {
    position: relative; z-index: 2;
    max-width: 1100px; margin: 0 auto;
    padding: 80px 24px;
    display: grid; grid-template-columns: 1fr auto;
    gap: 64px; align-items: center; width: 100%;
  }
  .hero__eyebrow { margin-bottom: 18px; }
  .hero__h1 { color:#fff; margin-bottom: 20px; }
  .hero__subtitle {
    font-size: 17px; line-height: 1.75;
    color: rgba(255,255,255,.82); max-width: 520px; margin-bottom: 36px;
  }
  .hero__ctas { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 16px; }
  .hero__micro { font-size: 12px; color: rgba(255,255,255,.45); }
  .hero__badge {
    background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.12);
    border-radius: 24px; padding: 32px 28px;
    display: flex; flex-direction: column; align-items: center;
    gap: 20px; min-width: 220px; backdrop-filter: blur(8px);
  }
  .hero__runner { width: 120px; height: 120px; }
  .hero__stats { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; width: 100%; }
  .hero__stat {
    background: rgba(255,255,255,.07); border-radius: 12px;
    padding: 10px 8px; text-align: center;
  }
  .hero__stat-n {
    font-family:'Barlow Condensed', sans-serif; font-weight: 900;
    font-size: 26px; color: var(--naranja); line-height: 1;
  }
  .hero__stat-l {
    font-size: 10px; font-weight: 600; text-transform: uppercase;
    letter-spacing: .05em; color: rgba(255,255,255,.55); margin-top: 2px;
  }
  @media(max-width:768px) {
    .hero__content { grid-template-columns:1fr; }
    .hero__badge   { display:none; }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat: add Hero component"
```

---

## Task 6: Problema component

**Files:**
- Create: `src/components/Problema.astro`

- [ ] **Step 1: Create Problema.astro**

Write `src/components/Problema.astro`:

```astro
<section class="section section--white" id="problema">
  <div class="container">
    <div class="problema__body">
      <span class="tag tag--blue">¿Te identificás?</span>
      <h2 class="h2 h2--blue" style="margin:12px 0 18px">
        ¿Querés correr, pero te cuesta<br><span class="accent">sostenerlo solo?</span>
      </h2>
      <p class="body-text">
        Empezar o mejorar en running no siempre es fácil cuando no tenés una guía clara, un grupo que te acompañe o una planificación adaptada a tu nivel.
      </p>
      <div class="problema__highlight">
        <p>
          En <strong>Kumelen</strong> entrenás acompañado, con profes que te orientan y un grupo que te motiva a avanzar paso a paso. No importa si estás arrancando desde cero o si ya corrés y querés mejorar tu rendimiento: la idea es que puedas entrenar de forma constante, segura y con objetivos claros.
        </p>
      </div>
    </div>
  </div>
</section>

<style>
  .problema__body { max-width: 680px; margin: 0 auto; text-align: center; }
  .problema__highlight {
    background: var(--azul-claro);
    border-left: 4px solid var(--naranja);
    border-radius: 0 14px 14px 0;
    padding: 22px 26px;
    margin-top: 36px;
    text-align: left;
  }
  .problema__highlight p {
    font-size: 16px; font-weight: 500; line-height: 1.75; color: var(--gris-oscuro);
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Problema.astro
git commit -m "feat: add Problema component"
```

---

## Task 7: ParaQuien component

**Files:**
- Create: `src/components/ParaQuien.astro`

- [ ] **Step 1: Create ParaQuien.astro**

Write `src/components/ParaQuien.astro`:

```astro
<section class="section section--grey" id="para-quien">
  <div class="container">
    <div class="section__header">
      <span class="tag tag--blue">Para quién es</span>
      <h2 class="h2 h2--blue">Este grupo es para vos si…</h2>
    </div>
    <div class="cards-3">
      <div class="check-card">
        <div class="check-card__icon"><svg viewBox="0 0 20 20"><path d="M4 10l5 5 7-7"/></svg></div>
        <p class="check-card__text">Querés empezar a correr y no sabés por dónde arrancar.</p>
      </div>
      <div class="check-card">
        <div class="check-card__icon"><svg viewBox="0 0 20 20"><path d="M4 10l5 5 7-7"/></svg></div>
        <p class="check-card__text">Ya corrés, pero sentís que necesitás una planificación para mejorar.</p>
      </div>
      <div class="check-card">
        <div class="check-card__icon"><svg viewBox="0 0 20 20"><path d="M4 10l5 5 7-7"/></svg></div>
        <p class="check-card__text">Te cuesta mantener la constancia entrenando solo.</p>
      </div>
      <div class="check-card">
        <div class="check-card__icon"><svg viewBox="0 0 20 20"><path d="M4 10l5 5 7-7"/></svg></div>
        <p class="check-card__text">Buscás un grupo que te motive y te acompañe.</p>
      </div>
      <div class="check-card">
        <div class="check-card__icon"><svg viewBox="0 0 20 20"><path d="M4 10l5 5 7-7"/></svg></div>
        <p class="check-card__text">Querés mejorar tu estado físico de forma progresiva.</p>
      </div>
      <div class="check-card">
        <div class="check-card__icon"><svg viewBox="0 0 20 20"><path d="M4 10l5 5 7-7"/></svg></div>
        <p class="check-card__text">Te interesa prepararte para carreras, desafíos o nuevos objetivos personales.</p>
      </div>
    </div>
  </div>
</section>

<style>
  .cards-3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
  @media(max-width:860px){ .cards-3{ grid-template-columns:repeat(2,1fr); } }
  @media(max-width:540px){ .cards-3{ grid-template-columns:1fr; } }
  .check-card {
    background: #fff; border-radius: 16px; padding: 22px 20px;
    display: flex; align-items: flex-start; gap: 14px;
    box-shadow: 0 2px 14px rgba(0,0,0,.06);
    transition: transform .2s, box-shadow .2s;
  }
  .check-card:hover {
    transform: translateY(-4px); box-shadow: 0 8px 32px rgba(13,61,159,.13);
  }
  .check-card__icon {
    width: 38px; height: 38px; background: var(--naranja); border-radius: 50%;
    display: flex; align-items:center; justify-content:center; flex-shrink: 0;
  }
  .check-card__icon svg { width:16px; height:16px; fill:#fff; }
  .check-card__text { font-size: 14px; font-weight: 500; line-height: 1.55; padding-top: 8px; }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ParaQuien.astro
git commit -m "feat: add ParaQuien component"
```

---

## Task 8: QueEncontrar component

**Files:**
- Create: `src/components/QueEncontrar.astro`

- [ ] **Step 1: Create QueEncontrar.astro**

Write `src/components/QueEncontrar.astro`:

```astro
<section class="section section--white" id="que-encontrar">
  <div class="container">
    <div class="section__header">
      <span class="tag tag--blue">Qué incluye</span>
      <h2 class="h2 h2--blue">Entrenamientos pensados para<br><span class="accent">que avances a tu ritmo</span></h2>
      <p class="body-text">
        En Kumelen vas a encontrar un espacio para entrenar running con guía, acompañamiento y comunidad. Trabajamos para que cada persona pueda mejorar desde su punto de partida, cuidando la progresión, la técnica y la constancia.
      </p>
    </div>
    <div class="features-grid">
      <div class="feat-card">
        <div class="feat-card__icon">
          <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        </div>
        <div class="feat-card__title">Entrenamientos grupales</div>
        <div class="feat-card__desc">Entrenás en grupo y avanzás junto a otros.</div>
      </div>
      <div class="feat-card feat-card--orange">
        <div class="feat-card__icon">
          <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        </div>
        <div class="feat-card__title">Acompañamiento profesional</div>
        <div class="feat-card__desc">Profes que te orientan y corrigen en cada entrenamiento.</div>
      </div>
      <div class="feat-card">
        <div class="feat-card__icon">
          <svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
        </div>
        <div class="feat-card__title">Planificación progresiva</div>
        <div class="feat-card__desc">Estructura pensada para que avances con seguridad.</div>
      </div>
      <div class="feat-card">
        <div class="feat-card__icon">
          <svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        </div>
        <div class="feat-card__title">Técnica de carrera</div>
        <div class="feat-card__desc">Mejorás la forma y prevenís lesiones desde el inicio.</div>
      </div>
      <div class="feat-card">
        <div class="feat-card__icon">
          <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </div>
        <div class="feat-card__title">Entrada en calor y movilidad</div>
        <div class="feat-card__desc">Cada sesión comienza con preparación correcta.</div>
      </div>
      <div class="feat-card feat-card--orange">
        <div class="feat-card__icon">
          <svg viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
        </div>
        <div class="feat-card__title">Grupos por nivel</div>
        <div class="feat-card__desc">Inicial, intermedio y avanzado para que entrenes a tu ritmo.</div>
      </div>
      <div class="feat-card">
        <div class="feat-card__icon">
          <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </div>
        <div class="feat-card__title">Motivación y comunidad</div>
        <div class="feat-card__desc">Un grupo que te ayuda a sostener el hábito.</div>
      </div>
      <div class="feat-card">
        <div class="feat-card__icon">
          <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        </div>
        <div class="feat-card__title">Al aire libre en Tandil</div>
        <div class="feat-card__desc">Entrenamos en los espacios naturales de la ciudad.</div>
      </div>
    </div>
  </div>
</section>

<style>
  .features-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; }
  @media(max-width:860px){ .features-grid{ grid-template-columns:repeat(2,1fr); } }
  @media(max-width:480px){ .features-grid{ grid-template-columns:repeat(2,1fr); gap:12px; } }
  .feat-card {
    background: var(--gris-suave); border-radius: 16px; padding: 26px 18px;
    text-align: center; transition: all .2s;
  }
  .feat-card:hover { background: var(--azul-claro); transform: translateY(-4px); }
  .feat-card__icon {
    width: 52px; height:52px; background: var(--azul); border-radius: 14px;
    display: flex; align-items:center; justify-content:center; margin: 0 auto 14px;
  }
  .feat-card__icon svg {
    width:24px; height:24px; stroke:#fff; fill:none;
    stroke-width:1.8; stroke-linecap:round; stroke-linejoin:round;
  }
  .feat-card__title {
    font-family:'Barlow Condensed', sans-serif; font-weight: 800; font-size: 15px;
    text-transform: uppercase; letter-spacing: .03em; color: var(--azul); margin-bottom: 6px;
  }
  .feat-card__desc { font-size: 12px; color:#777; line-height:1.5; }
  .feat-card--orange .feat-card__icon { background: var(--naranja); }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/QueEncontrar.astro
git commit -m "feat: add QueEncontrar component"
```

---

## Task 9: Profe component

**Files:**
- Create: `src/components/Profe.astro`

- [ ] **Step 1: Create Profe.astro**

Write `src/components/Profe.astro`:

```astro
<section class="section section--grey" id="profe">
  <div class="container">
    <div class="profe__inner">
      <div class="profe__photo-wrap">
        <img src="/images/matias-urrutia.jpg"
             alt="Matias Urrutia – Entrenador Kumelen Running"
             class="profe__photo"
             loading="lazy">
        <div class="profe__badge-sport">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>
          Entrenador certificado
        </div>
      </div>
      <div class="profe__text">
        <span class="tag tag--blue">Tu entrenador</span>
        <h2 class="h2 h2--blue" style="margin:12px 0 6px;">Matias <span class="accent">Urrutia</span></h2>
        <p class="profe__role">Entrenador · Atleta · Apasionado por el running</p>
        <p class="body-text" style="margin-top:18px;">
          Entrenador de running con experiencia en la preparación de corredores de todos los niveles. Su enfoque: constancia, disfrute y superación personal.
        </p>
        <p class="body-text" style="margin-top:12px;">
          Matias te acompaña desde el primer día, adaptando cada entrenamiento a tu nivel y objetivos, para que puedas avanzar de forma segura y sostenida.
        </p>
        <div class="profe__chips">
          <span class="profe__chip">Planificación progresiva</span>
          <span class="profe__chip">Técnica de carrera</span>
          <span class="profe__chip">Todos los niveles</span>
          <span class="profe__chip profe__chip--orange">Tandil</span>
        </div>
        <a href="https://wa.me/5492494673961?text=Hola%20Matias%2C%20quiero%20sumarme%20a%20Kumelen%20Running"
           class="btn btn--orange btn-arrow" target="_blank" rel="noopener"
           style="margin-top:28px;">Escribirle a Matias</a>
      </div>
    </div>
  </div>
</section>

<style>
  .profe__inner {
    display: grid; grid-template-columns: 380px 1fr; gap: 64px; align-items: center;
  }
  @media(max-width:900px){ .profe__inner{ grid-template-columns:1fr; gap:40px; } }
  .profe__photo-wrap { position: relative; }
  .profe__photo {
    width: 100%; max-width: 380px; aspect-ratio: 3/4;
    object-fit: cover; object-position: top center;
    border-radius: 24px; box-shadow: 0 20px 60px rgba(13,61,159,.18);
  }
  @media(max-width:900px){
    .profe__photo { max-width: 280px; margin: 0 auto; }
    .profe__photo-wrap { display:flex; justify-content:center; }
  }
  .profe__badge-sport {
    position: absolute; bottom: 20px; left: 20px;
    background: var(--azul); color: #fff;
    font-size: 12px; font-weight: 700;
    padding: 8px 14px; border-radius: 50px;
    display: flex; align-items: center; gap: 7px;
    box-shadow: 0 4px 16px rgba(13,61,159,.3);
  }
  .profe__role {
    font-size: 14px; font-weight: 600; color: var(--naranja);
    text-transform: uppercase; letter-spacing: .06em;
  }
  .profe__chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }
  .profe__chip {
    background: var(--azul-claro); color: var(--azul);
    font-size: 12px; font-weight: 600; padding: 5px 12px; border-radius: 50px;
  }
  .profe__chip--orange { background: rgba(255,106,0,.1); color: var(--naranja); }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Profe.astro
git commit -m "feat: add Profe component"
```

---

## Task 10: Diferencial component

**Files:**
- Create: `src/components/Diferencial.astro`

- [ ] **Step 1: Create Diferencial.astro**

Write `src/components/Diferencial.astro`:

```astro
<section class="section section--blue" id="diferencial">
  <div class="container">
    <div class="diferencial__inner">
      <div class="diferencial__text">
        <span class="tag tag--orange">Por qué Kumelen</span>
        <h2 class="h2 h2--white" style="margin:12px 0 16px;">No se trata solo de<br><span class="accent">salir a correr</span></h2>
        <p class="body-text body-text--white">
          Entrenar en grupo te ayuda a sostener el hábito, mejorar con más seguridad y disfrutar el proceso. En Kumelen combinamos entrenamiento, acompañamiento y comunidad para que puedas avanzar sin sentir que estás solo.
        </p>
        <p class="body-text body-text--white" style="margin-top:14px">
          Acá no necesitás llegar con experiencia previa ni estar en tu mejor estado físico. Te orientamos para que encuentres el grupo y el ritmo adecuados para vos.
        </p>
      </div>
      <div class="values-grid">
        <div class="value-card">
          <div class="value-card__icon">
            <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div class="value-card__title">Comunidad</div>
          <div class="value-card__desc">Entrenamos juntos, crecemos juntos. El grupo es parte fundamental.</div>
        </div>
        <div class="value-card">
          <div class="value-card__icon">
            <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          </div>
          <div class="value-card__title">Movimiento</div>
          <div class="value-card__desc">Cada paso nos lleva más lejos. Progresión real y medible.</div>
        </div>
        <div class="value-card">
          <div class="value-card__icon">
            <svg viewBox="0 0 24 24"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>
          </div>
          <div class="value-card__title">Superación</div>
          <div class="value-card__desc">Desafiamos límites y celebramos cada logro personal.</div>
        </div>
        <div class="value-card">
          <div class="value-card__icon">
            <svg viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
          </div>
          <div class="value-card__title">Bienestar</div>
          <div class="value-card__desc">Cuerpo, mente y energía en equilibrio. Más que correr.</div>
        </div>
      </div>
    </div>
  </div>
</section>
<div class="accent-bar"></div>

<style>
  .diferencial__inner {
    display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
  }
  @media(max-width:768px){ .diferencial__inner{ grid-template-columns:1fr; gap:48px; } }
  .values-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .value-card {
    background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.12);
    border-radius: 16px; padding: 20px 18px;
  }
  .value-card__icon {
    width: 40px; height:40px; background: rgba(255,106,0,.18);
    border-radius: 10px; display: flex; align-items:center; justify-content:center; margin-bottom: 10px;
  }
  .value-card__icon svg {
    width:20px; height:20px; stroke: var(--naranja); fill:none;
    stroke-width:1.8; stroke-linecap:round; stroke-linejoin:round;
  }
  .value-card__title {
    font-family:'Barlow Condensed', sans-serif; font-weight:800; font-size:15px;
    text-transform:uppercase; letter-spacing:.04em; color: var(--naranja); margin-bottom:4px;
  }
  .value-card__desc { font-size:12px; color:rgba(255,255,255,.6); line-height:1.5; }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Diferencial.astro
git commit -m "feat: add Diferencial component"
```

---

## Task 11: ComoFunciona component

**Files:**
- Create: `src/components/ComoFunciona.astro`

- [ ] **Step 1: Create ComoFunciona.astro**

Write `src/components/ComoFunciona.astro`:

```astro
<section class="section section--white" id="como-funciona">
  <div class="container">
    <div class="section__header">
      <span class="tag tag--blue">Proceso</span>
      <h2 class="h2 h2--blue">Sumarte es <span class="accent">simple</span></h2>
    </div>
    <div class="steps">
      <div class="step">
        <div class="step__num">1</div>
        <div class="step__title">Nos escribís por WhatsApp</div>
        <p class="step__desc">Contanos si ya venís corriendo, cuál es tu objetivo y qué disponibilidad tenés.</p>
      </div>
      <div class="step">
        <div class="step__num">2</div>
        <div class="step__title">Te orientamos según tu nivel</div>
        <p class="step__desc">Te recomendamos el grupo, horario o modalidad que mejor se adapte a vos.</p>
      </div>
      <div class="step">
        <div class="step__num">3</div>
        <div class="step__title">Venís a entrenar</div>
        <p class="step__desc">Te sumás al entrenamiento y empezás a avanzar acompañado por profes y por el grupo.</p>
      </div>
    </div>
    <div class="como__cta">
      <a href="https://wa.me/5492494673961?text=Hola%2C%20quiero%20sumarme%20a%20Kumelen%20Running"
         class="btn btn--orange btn-arrow" target="_blank" rel="noopener">Consultar por WhatsApp</a>
    </div>
  </div>
</section>

<style>
  .steps {
    display: grid; grid-template-columns: repeat(3,1fr);
    gap: 32px; position: relative; margin-bottom: 56px;
  }
  .steps::before {
    content:''; position:absolute; top: 40px;
    left: calc(16.67% + 20px); right: calc(16.67% + 20px);
    height: 2px; background: linear-gradient(90deg, var(--naranja), var(--azul));
  }
  @media(max-width:768px){
    .steps{ grid-template-columns:1fr; }
    .steps::before{ display:none; }
  }
  .step { text-align:center; padding:0 12px; }
  .step__num {
    width:80px; height:80px; margin: 0 auto 24px;
    background: var(--azul); border-radius:50%;
    display:flex; align-items:center; justify-content:center;
    font-family:'Barlow Condensed', sans-serif;
    font-weight:900; font-size:30px; color:#fff;
    position:relative; z-index:1; transition: transform .2s;
  }
  .step:nth-child(2) .step__num { background: var(--naranja); }
  .step:hover .step__num { transform:scale(1.08); }
  .step__title {
    font-family:'Barlow Condensed', sans-serif; font-weight:800; font-size:22px;
    text-transform:uppercase; color: var(--azul); margin-bottom:10px;
  }
  .step__desc { font-size:14px; color:#666; line-height:1.7; }
  .como__cta { text-align:center; }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ComoFunciona.astro
git commit -m "feat: add ComoFunciona component"
```

---

## Task 12: Horarios component

**Files:**
- Create: `src/components/Horarios.astro`

- [ ] **Step 1: Create Horarios.astro**

Write `src/components/Horarios.astro`:

```astro
<section class="section section--grey" id="horarios">
  <div class="container">
    <div class="horarios__inner">
      <div class="horarios__text">
        <span class="tag tag--blue">Ubicación</span>
        <h2 class="h2 h2--blue">Entrenamos<br><span class="accent">en Tandil</span></h2>
        <p class="body-text">
          Los entrenamientos se realizan en Tandil, con puntos de encuentro y horarios según el grupo y la planificación.
        </p>
        <div class="info-list">
          <div class="info-item">
            <div class="info-item__icon">
              <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </div>
            <div>
              <div class="info-item__label">Días</div>
              <div class="info-item__value">Según grupo y planificación</div>
            </div>
          </div>
          <div class="info-item">
            <div class="info-item__icon">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div>
              <div class="info-item__label">Horarios</div>
              <div class="info-item__value">Consultanos para conocer opciones disponibles</div>
            </div>
          </div>
          <div class="info-item">
            <div class="info-item__icon">
              <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div>
              <div class="info-item__label">Lugar</div>
              <div class="info-item__value">
                <a href="https://maps.app.goo.gl/bnzUndHMnfxhLKTAA" target="_blank" rel="noopener"
                   style="color:var(--azul);font-weight:600;text-decoration:underline;text-underline-offset:3px;">
                  Ver ubicación en Google Maps →
                </a>
              </div>
            </div>
          </div>
          <div class="info-item">
            <div class="info-item__icon">
              <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div>
              <div class="info-item__label">Modalidad</div>
              <div class="info-item__value">Grupal · Todos los niveles</div>
            </div>
          </div>
        </div>
      </div>
      <div class="horarios__card">
        <div class="horarios__card-icon">
          <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        </div>
        <h3 class="horarios__card-title">¿Cuándo entrenan?</h3>
        <p class="horarios__card-body">
          Escribinos por WhatsApp y te contamos qué opciones hay disponibles para tu nivel y tus objetivos.
        </p>
        <a href="https://wa.me/5492494673961?text=Hola%2C%20quiero%20saber%20los%20horarios%20de%20Kumelen%20Running"
           class="btn btn--orange btn-arrow" target="_blank" rel="noopener">Ver horarios por WhatsApp</a>
      </div>
    </div>
  </div>
</section>

<style>
  .horarios__inner { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center; }
  @media(max-width:768px){ .horarios__inner{ grid-template-columns:1fr; gap:40px; } }
  .info-list { display:flex; flex-direction:column; gap:12px; margin-top: 32px; }
  .info-item {
    display:flex; align-items:center; gap:14px;
    background:#fff; border-radius:12px; padding:14px 18px;
    box-shadow:0 2px 10px rgba(0,0,0,.05);
  }
  .info-item__icon {
    width:42px; height:42px; background: var(--azul-claro);
    border-radius:10px; display:flex; align-items:center; justify-content:center; flex-shrink:0;
  }
  .info-item__icon svg {
    width:20px; height:20px; stroke: var(--azul); fill:none;
    stroke-width:1.8; stroke-linecap:round; stroke-linejoin:round;
  }
  .info-item__label { font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:.1em; color:#aaa; margin-bottom:2px; }
  .info-item__value { font-size:14px; font-weight:600; }
  .horarios__card {
    background: var(--azul); border-radius:24px; padding:40px 36px; text-align:center; color:#fff;
  }
  .horarios__card-icon {
    width:64px; height:64px; background: rgba(255,106,0,.15);
    border-radius:16px; display:flex; align-items:center; justify-content:center; margin: 0 auto 20px;
  }
  .horarios__card-icon svg {
    width:30px; height:30px; stroke: var(--naranja); fill:none;
    stroke-width:1.8; stroke-linecap:round; stroke-linejoin:round;
  }
  .horarios__card-title {
    font-family:'Barlow Condensed', sans-serif; font-weight:900; font-size:28px;
    text-transform:uppercase; margin-bottom:10px;
  }
  .horarios__card-body { font-size:14px; color:rgba(255,255,255,.7); line-height:1.7; margin-bottom:28px; }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Horarios.astro
git commit -m "feat: add Horarios component"
```

---

## Task 13: Comunidad component

**Files:**
- Create: `src/components/Comunidad.astro`

- [ ] **Step 1: Create Comunidad.astro**

Write `src/components/Comunidad.astro`:

```astro
<section class="section section--orange" id="comunidad">
  <div class="container">
    <div class="comunidad__inner">
      <div class="comunidad__text">
        <span class="tag tag--white">Comunidad</span>
        <h2 class="h2" style="color:#fff;margin:12px 0 16px;">
          Un grupo que te ayuda<br>a <span style="color:#fff;text-decoration:underline;text-underline-offset:4px;">no abandonar</span>
        </h2>
        <p class="body-text body-text--white">
          Cuando entrenás acompañado, es más fácil sostener la constancia. En Kumelen vas a compartir entrenamientos, objetivos y avances con personas que también están buscando mejorar, moverse y sentirse mejor.
        </p>
        <p class="body-text body-text--white" style="margin-top:14px;">
          El grupo es parte fundamental de la experiencia: te motiva, te acompaña y hace que entrenar sea más disfrutable.
        </p>
      </div>
      <div class="com-stats">
        <div class="com-stat">
          <div class="com-stat__n">100%</div>
          <div class="com-stat__l">Al aire libre</div>
        </div>
        <div class="com-stat">
          <div class="com-stat__n">+</div>
          <div class="com-stat__l">Todos los niveles</div>
        </div>
        <div class="com-stat">
          <div class="com-stat__n">TANDIL</div>
          <div class="com-stat__l">Nuestra ciudad</div>
        </div>
        <div class="com-stat">
          <div class="com-stat__n">HOY</div>
          <div class="com-stat__l">Podés empezar</div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .comunidad__inner { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center; }
  @media(max-width:768px){ .comunidad__inner{ grid-template-columns:1fr; gap:40px; } }
  .com-stats { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
  .com-stat {
    background:rgba(255,255,255,.14); border:1px solid rgba(255,255,255,.2);
    border-radius:16px; padding:22px 18px; text-align:center; backdrop-filter:blur(8px);
  }
  .com-stat__n { font-family:'Barlow Condensed', sans-serif; font-weight:900; font-size:38px; color:#fff; line-height:1; }
  .com-stat__l {
    font-size:11px; font-weight:600; text-transform:uppercase;
    letter-spacing:.06em; color:rgba(255,255,255,.75); margin-top:4px;
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Comunidad.astro
git commit -m "feat: add Comunidad component"
```

---

## Task 14: Testimonios component

**Files:**
- Create: `src/components/Testimonios.astro`

- [ ] **Step 1: Create Testimonios.astro**

Write `src/components/Testimonios.astro`:

```astro
<section class="section section--white" id="testimonios">
  <div class="container">
    <div class="section__header">
      <span class="tag tag--blue">Testimonios</span>
      <h2 class="h2 h2--blue">Personas que ya se animaron<br><span class="accent">a empezar</span></h2>
    </div>
    <div class="testimonios-grid">
      <div class="test-card">
        <div class="test-card__stars">★★★★★</div>
        <p class="test-card__text">"Arranqué sin saber si iba a poder sostenerlo, pero el grupo me ayudó a crear el hábito."</p>
        <div class="test-card__author">
          <div class="test-card__avatar">M</div>
          <div>
            <div class="test-card__name">Miembro del grupo</div>
            <div class="test-card__role">Kumelen Running · Tandil</div>
          </div>
        </div>
      </div>
      <div class="test-card">
        <div class="test-card__stars">★★★★★</div>
        <p class="test-card__text">"Lo mejor es entrenar acompañado. Te motiva y te dan ganas de seguir mejorando."</p>
        <div class="test-card__author">
          <div class="test-card__avatar" style="background:var(--naranja)">A</div>
          <div>
            <div class="test-card__name">Miembro del grupo</div>
            <div class="test-card__role">Kumelen Running · Tandil</div>
          </div>
        </div>
      </div>
      <div class="test-card">
        <div class="test-card__stars">★★★★★</div>
        <p class="test-card__text">"Me ayudó mucho tener una planificación y profes que te corrigen y te acompañan."</p>
        <div class="test-card__author">
          <div class="test-card__avatar" style="background:#1a6b3c">L</div>
          <div>
            <div class="test-card__name">Miembro del grupo</div>
            <div class="test-card__role">Kumelen Running · Tandil</div>
          </div>
        </div>
      </div>
    </div>
    <p style="text-align:center;font-size:12px;color:#bbb;margin-top:24px;">
      * Reemplazar con testimonios reales cuando estén disponibles.
    </p>
  </div>
</section>

<style>
  .testimonios-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
  @media(max-width:860px){ .testimonios-grid{ grid-template-columns:1fr; max-width:480px; margin:0 auto; } }
  .test-card {
    background: var(--gris-suave); border-radius:20px; padding:30px 28px;
    position:relative; overflow:hidden;
  }
  .test-card::before {
    content:'\201C'; font-family:Georgia,serif; font-size:90px;
    color: var(--naranja); opacity:.2;
    position:absolute; top:0; left:14px; line-height:1;
  }
  .test-card__stars { color: var(--naranja); font-size:14px; margin-bottom:12px; }
  .test-card__text {
    font-size:15px; line-height:1.75; color: var(--gris-oscuro);
    margin-bottom:22px; position:relative; z-index:1;
  }
  .test-card__author { display:flex; align-items:center; gap:12px; }
  .test-card__avatar {
    width:42px; height:42px; border-radius:50%; background: var(--azul);
    display:flex; align-items:center; justify-content:center;
    font-family:'Barlow Condensed',sans-serif; font-weight:900; font-size:18px; color:#fff; flex-shrink:0;
  }
  .test-card__name { font-weight:700; font-size:14px; }
  .test-card__role { font-size:12px; color:#999; }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Testimonios.astro
git commit -m "feat: add Testimonios component"
```

---

## Task 15: FAQ component

**Files:**
- Create: `src/components/FAQ.astro`

- [ ] **Step 1: Create FAQ.astro**

Write `src/components/FAQ.astro`:

```astro
<section class="section section--grey" id="faq">
  <div class="container">
    <div class="section__header">
      <span class="tag tag--blue">Preguntas frecuentes</span>
      <h2 class="h2 h2--blue">Todo lo que<br><span class="accent">necesitás saber</span></h2>
    </div>
    <div class="faq-list">
      <div class="faq-item">
        <div class="faq-q">
          <span class="faq-q__text">¿Necesito experiencia previa?</span>
          <div class="faq-q__icon"><svg viewBox="0 0 14 14"><polyline points="2 4 7 9 12 4"/></svg></div>
        </div>
        <div class="faq-a">
          <div class="faq-a__inner">No necesariamente. Podés consultar aunque nunca hayas corrido o aunque estés retomando después de un tiempo. Te orientamos según tu punto de partida.</div>
        </div>
      </div>
      <div class="faq-item">
        <div class="faq-q">
          <span class="faq-q__text">¿El grupo es solo para corredores avanzados?</span>
          <div class="faq-q__icon"><svg viewBox="0 0 14 14"><polyline points="2 4 7 9 12 4"/></svg></div>
        </div>
        <div class="faq-a">
          <div class="faq-a__inner">No. La idea es que haya acompañamiento para distintos niveles, desde personas que quieren empezar hasta quienes buscan mejorar su rendimiento.</div>
        </div>
      </div>
      <div class="faq-item">
        <div class="faq-q">
          <span class="faq-q__text">¿Puedo probar una clase?</span>
          <div class="faq-q__icon"><svg viewBox="0 0 14 14"><polyline points="2 4 7 9 12 4"/></svg></div>
        </div>
        <div class="faq-a">
          <div class="faq-a__inner">Sí. Escribinos por WhatsApp y coordinamos la mejor opción para que puedas sumarte.</div>
        </div>
      </div>
      <div class="faq-item">
        <div class="faq-q">
          <span class="faq-q__text">¿Dónde entrenan?</span>
          <div class="faq-q__icon"><svg viewBox="0 0 14 14"><polyline points="2 4 7 9 12 4"/></svg></div>
        </div>
        <div class="faq-a">
          <div class="faq-a__inner">Entrenamos en Tandil. Los puntos de encuentro pueden variar según el grupo, la planificación y el tipo de entrenamiento.</div>
        </div>
      </div>
      <div class="faq-item">
        <div class="faq-q">
          <span class="faq-q__text">¿Qué tengo que llevar?</span>
          <div class="faq-q__icon"><svg viewBox="0 0 14 14"><polyline points="2 4 7 9 12 4"/></svg></div>
        </div>
        <div class="faq-a">
          <div class="faq-a__inner">Ropa cómoda, zapatillas para correr y ganas de empezar. Si tenés dudas sobre tu nivel o condición física, te orientamos antes de sumarte.</div>
        </div>
      </div>
      <div class="faq-item">
        <div class="faq-q">
          <span class="faq-q__text">¿Me puedo sumar si me da vergüenza o estoy fuera de ritmo?</span>
          <div class="faq-q__icon"><svg viewBox="0 0 14 14"><polyline points="2 4 7 9 12 4"/></svg></div>
        </div>
        <div class="faq-a">
          <div class="faq-a__inner">Sí. Muchas personas empiezan con esa misma duda. El objetivo es acompañarte para que puedas avanzar de forma progresiva y sin presión.</div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .faq-list { max-width:720px; margin:0 auto; display:flex; flex-direction:column; gap:10px; }
  .faq-item { background:#fff; border-radius:14px; overflow:hidden; box-shadow:0 2px 10px rgba(0,0,0,.05); }
  .faq-q {
    display:flex; align-items:center; justify-content:space-between;
    padding:18px 22px; cursor:pointer; user-select:none; gap:16px;
  }
  .faq-q__text { font-weight:600; font-size:15px; line-height:1.45; }
  .faq-q__icon {
    width:28px; height:28px; border-radius:50%; background: var(--azul-claro);
    display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:background .25s;
  }
  .faq-q__icon svg { width:13px; height:13px; stroke: var(--azul); fill:none; stroke-width:2.5; transition:transform .25s; }
  .faq-item.open .faq-q__icon { background: var(--naranja); }
  .faq-item.open .faq-q__icon svg { transform:rotate(180deg); stroke:#fff; }
  .faq-a { max-height:0; overflow:hidden; transition:max-height .3s ease, padding .3s; }
  .faq-a__inner {
    padding:0 22px 18px; font-size:14px; color:#666; line-height:1.8;
    border-top:1px solid #f0f0f0; padding-top:14px;
  }
</style>

<script>
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        const answer = item.querySelector('.faq-a');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
</script>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/FAQ.astro
git commit -m "feat: add FAQ component with accordion"
```

---

## Task 16: Cierre component

**Files:**
- Create: `src/components/Cierre.astro`

- [ ] **Step 1: Create Cierre.astro**

Write `src/components/Cierre.astro`:

```astro
<section class="section section--dark cierre" id="contacto">
  <div class="cierre__dots"></div>
  <div class="container">
    <div class="cierre__inner">
      <span class="tag tag--orange">Empezá hoy</span>
      <h2 class="h2" style="color:#fff;margin:14px auto 18px;">
        Empezá a correr<br><span class="accent">acompañado</span>
      </h2>
      <p class="body-text body-text--white" style="max-width:560px;margin:0 auto 40px;">
        Sumate al grupo de running de Kumelen en Tandil y entrená con guía, planificación y una comunidad que te ayuda a avanzar. Escribinos por WhatsApp y te contamos horarios, puntos de encuentro y cuál es el mejor grupo para tu nivel.
      </p>
      <div class="cierre__ctas">
        <a href="https://wa.me/5492494673961?text=Hola%2C%20quiero%20sumarme%20a%20Kumelen%20Running"
           class="btn btn--orange btn-arrow" target="_blank" rel="noopener">Quiero sumarme al grupo</a>
        <a href="https://wa.me/5492494673961?text=Hola%2C%20quisiera%20consultar%20sobre%20Kumelen%20Running"
           class="btn btn--outline-white" target="_blank" rel="noopener">Consultar por WhatsApp</a>
      </div>
      <p class="cierre__micro">Te respondemos por WhatsApp para orientarte según tu objetivo.</p>
    </div>
  </div>
</section>

<style>
  .cierre { position:relative; overflow:hidden; }
  .cierre__dots {
    position:absolute; inset:0; pointer-events:none;
    background-image: radial-gradient(rgba(255,255,255,.04) 1px, transparent 1px);
    background-size:28px 28px;
  }
  .cierre__inner { position:relative; z-index:2; text-align:center; }
  .cierre__ctas { display:flex; justify-content:center; flex-wrap:wrap; gap:14px; margin-bottom:18px; }
  .cierre__micro { font-size:12px; color:rgba(255,255,255,.4); }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Cierre.astro
git commit -m "feat: add Cierre component"
```

---

## Task 17: Footer and FloatingWA components

**Files:**
- Create: `src/components/Footer.astro`
- Create: `src/components/FloatingWA.astro`

- [ ] **Step 1: Create Footer.astro**

Write `src/components/Footer.astro`:

```astro
<footer class="footer">
  <div class="container">
    <div class="footer__inner">
      <div class="footer__logo">
        <span>K</span>UMELEN
        <span style="font-size:14px;font-weight:700;letter-spacing:.18em;color:rgba(255,255,255,.5);display:block;margin-top:2px;">RUNNING</span>
      </div>
      <div class="footer__links">
        <a href="#inicio">Inicio</a>
        <a href="#para-quien">Para vos</a>
        <a href="#como-funciona">Cómo funciona</a>
        <a href="#horarios">Horarios</a>
        <a href="#faq">FAQ</a>
        <a href="https://wa.me/5492494673961" target="_blank" rel="noopener">WhatsApp</a>
        <a href="https://www.instagram.com/kumelenrunning_trail" target="_blank" rel="noopener"
           style="display:inline-flex;align-items:center;gap:5px;">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
          </svg>
          @kumelenrunning_trail
        </a>
        <a href="https://maps.app.goo.gl/bnzUndHMnfxhLKTAA" target="_blank" rel="noopener"
           style="display:inline-flex;align-items:center;gap:5px;">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          Ubicación
        </a>
      </div>
      <div class="footer__copy">© 2025 Kumelen Running · Tandil, Buenos Aires</div>
    </div>
  </div>
</footer>

<style>
  .footer { background:#07122e; padding:40px 0; }
  .footer__inner { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:16px; }
  .footer__logo {
    font-family:'Barlow Condensed',sans-serif; font-weight:900; font-size:22px;
    text-transform:uppercase; color:#fff;
  }
  .footer__logo span { color: var(--naranja); }
  .footer__links { display:flex; gap:24px; flex-wrap:wrap; }
  .footer__links a { font-size:12px; color:rgba(255,255,255,.45); transition:color .2s; }
  .footer__links a:hover { color:#fff; }
  .footer__copy { font-size:11px; color:rgba(255,255,255,.25); }
</style>
```

- [ ] **Step 2: Create FloatingWA.astro**

Write `src/components/FloatingWA.astro`:

```astro
<div class="wa-float">
  <a href="https://wa.me/5492494673961?text=Hola%2C%20quiero%20sumarme%20a%20Kumelen%20Running"
     target="_blank" rel="noopener" aria-label="Escribinos por WhatsApp">
    <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
    <span>Escribinos</span>
  </a>
</div>

<style>
  .wa-float { position:fixed; bottom:28px; right:28px; z-index:900; }
  .wa-float a {
    display:flex; align-items:center; gap:9px;
    background:#25D366; color:#fff;
    font-weight:700; font-size:13px;
    padding:13px 20px; border-radius:50px;
    box-shadow:0 4px 20px rgba(37,211,102,.42);
    transition: transform .2s, box-shadow .2s;
  }
  .wa-float a:hover {
    transform: translateY(-3px);
    box-shadow:0 8px 30px rgba(37,211,102,.5);
  }
  .wa-float svg { width:22px; height:22px; flex-shrink:0; }
</style>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.astro src/components/FloatingWA.astro
git commit -m "feat: add Footer and FloatingWA components"
```

---

## Task 18: Assemble index.astro

**Files:**
- Create: `src/pages/index.astro`

- [ ] **Step 1: Create index.astro**

Write `src/pages/index.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import Problema from '../components/Problema.astro';
import ParaQuien from '../components/ParaQuien.astro';
import QueEncontrar from '../components/QueEncontrar.astro';
import Profe from '../components/Profe.astro';
import Diferencial from '../components/Diferencial.astro';
import ComoFunciona from '../components/ComoFunciona.astro';
import Horarios from '../components/Horarios.astro';
import Comunidad from '../components/Comunidad.astro';
import Testimonios from '../components/Testimonios.astro';
import FAQ from '../components/FAQ.astro';
import Cierre from '../components/Cierre.astro';
import Footer from '../components/Footer.astro';
import FloatingWA from '../components/FloatingWA.astro';
---
<Layout>
  <Nav />
  <main>
    <Hero />
    <Problema />
    <ParaQuien />
    <QueEncontrar />
    <Profe />
    <Diferencial />
    <ComoFunciona />
    <Horarios />
    <Comunidad />
    <Testimonios />
    <FAQ />
    <Cierre />
  </main>
  <Footer />
  <FloatingWA />
</Layout>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: assemble index.astro with all components"
```

---

## Task 19: Build verification

- [ ] **Step 1: Start dev server and verify visually**

```bash
cd "/Users/martinayaquinta/Downloads/project/Kumelen Running"
npm run dev
```

Open `http://localhost:4321` in the browser and check:
- Nav is fixed at top, shows logo + links
- Hero section fills screen with blue gradient and runner badge
- All 11 sections visible in order
- FAQ accordion works (click a question, it expands)
- Nav links highlight on scroll
- WhatsApp floating button visible bottom-right

Stop dev server with Ctrl+C.

- [ ] **Step 2: Production build**

```bash
cd "/Users/martinayaquinta/Downloads/project/Kumelen Running"
npm run build 2>&1
```

Expected: `✓ Completed in X.XXs`, `dist/` folder created, zero errors.

- [ ] **Step 3: Preview production build**

```bash
cd "/Users/martinayaquinta/Downloads/project/Kumelen Running"
npm run preview
```

Open `http://localhost:4321` and do a final visual check. Stop with Ctrl+C.

- [ ] **Step 4: Final commit**

```bash
git add .
git commit -m "feat: complete Astro migration — all 15 components, Tailwind, Vercel static"
```

---

## Task 20: Deploy to Vercel

- [ ] **Step 1: Install Vercel CLI if needed**

```bash
npm list -g vercel || npm install -g vercel
```

- [ ] **Step 2: Link project to Vercel**

```bash
cd "/Users/martinayaquinta/Downloads/project/Kumelen Running"
vercel link
```

Follow prompts: select existing project or create `kumelen-running`. Confirm settings.

- [ ] **Step 3: Deploy preview**

```bash
vercel
```

Expected: deployment URL printed (e.g. `https://kumelen-running-xxx.vercel.app`). Open it and do final visual check.

- [ ] **Step 4: Deploy to production**

```bash
vercel --prod
```

Expected: `https://kumelen-running.vercel.app` (or custom domain) is live.

---

## Known Limitations

- **Mobile hamburger menu**: The original `index.html` had the hamburger button visible on mobile but no JS to open a drawer. The migration preserves this same behavior — the hamburger shows but is non-functional. Implementing a mobile drawer is out of scope for this 1:1 migration.
- **CSS approach**: The spec mentioned "full Tailwind inline classes". In practice this plan uses scoped `<style>` blocks per component with the original CSS, plus the Tailwind config for color/font tokens. This is the Astro-idiomatic approach and is more reliable for a 1:1 visual match.
