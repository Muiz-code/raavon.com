# RAAVON.COM — Full Build Prompt & Brand Guide
> Save this file as `PROMPT.md` in your repo root.
> This is the single source of truth for every design and development decision.

---

## 01. WHO IS RAAVON

Raavon is a Nigerian digital studio that builds products people
actually need. We start with a problem, we build the solution,
and we ship it. Not an agency. Not a consultancy. We build our
own things.

Kairo is the first product coming out of Raavon — an AI-powered
Personal Finance Management (PFM) app for Nigerians. If Kairo
succeeds, Raavon evolves. The holding company structure, the
multiple industries, the broader portfolio — that all comes later,
only after Kairo proves itself in the market.

For now: one studio, one product, one mission.

**Tagline:** The spirit behind every brand.
**Philosophy:** We build products people actually need. We ship things that matter.
**Origin:** Born in Nigeria. Built for the world.
**First product:** Kairo — an AI-powered Personal Finance Management (PFM) app
that unifies all your Nigerian bank accounts, tracks spending with AI,
automates savings, and pays your bills — all in one place.

---

## 02. COLOURS

Use these exact values. No purple gradients. No generic palettes.

```css
:root {
  /* Primary */
  --caramel:     #C19A6B;   /* warm, inviting, earthy gold */
  --mahogany:    #4E2C20;   /* deep, rich, grounded brown */
  --tan:         #D2B48C;   /* soft sand, light accent */
  --black:       #0A0A0A;   /* near black, not pure */
  --off-white:   #FAF7F2;   /* warm white, never cold */

  /* Supporting */
  --caramel-dim: rgba(193,154,107,0.15);
  --caramel-mid: rgba(193,154,107,0.45);
  --mahogany-dim: rgba(78,44,32,0.08);
  --tan-soft:    rgba(210,180,140,0.2);

  /* Dark mode surfaces */
  --dark-surface:  #111009;
  --dark-card:     #1A1610;
  --dark-border:   rgba(193,154,107,0.12);

  /* Light mode surfaces */
  --light-surface: #FAF7F2;
  --light-card:    #F2EDE4;
  --light-border:  rgba(78,44,32,0.1);
}
```

**Colour meaning:**
- Caramel `#C19A6B` — warmth, creativity, ambition, approachable wealth
- Mahogany `#4E2C20` — depth, trust, heritage, authority
- Tan `#D2B48C` — softness, balance, the in-between
- Black — grounding, precision, contrast
- Off-white — cleanliness, breathing room, premium feel

**Logo colours:**
- "Raav" — `#C19A6B` (caramel)
- "on" — `#4E2C20` (mahogany)
- Together they contrast but belong to each other

---

## 03. TYPOGRAPHY

Not too serious. Not too playful. The sweet spot.

```
Display font:  Plus Jakarta Sans (700, 800)
               — modern, friendly, confident, not stiff
               — use for hero headlines, section titles

Body font:     DM Sans (300, 400, 500)
               — clean, readable, approachable
               — use for body text, labels, nav

Accent font:   Fraunces (300, italic)
               — poetic, warm, slightly editorial
               — use for quotes, taglines, italic emphasis

Load via next/font/google — never CDN in production
```

**Why this combination works:**
Plus Jakarta Sans brings energy and friendliness.
Fraunces brings soul and warmth when used in italics.
DM Sans keeps everything readable and grounded.
Together they feel human — not corporate, not childish.

---

## 04. FAVICON & LOADER

**Favicon:**
- The letter "R." with a full stop
- Left half of R in caramel `#C19A6B`
- Right half + dot in mahogany `#4E2C20`
- Clean, geometric, sans-serif — Plus Jakarta Sans 800
- Export as `favicon.ico`, `favicon.svg`, `apple-touch-icon.png`
- Place in `/public/`

**Page Loader:**
- Full screen dark overlay on page load
- Start with just "R." centred on screen
- Then "aavon" types/slides out from inside the R — letter by letter
- Once "Raavon" is complete, pause 400ms
- Fade out loader, fade in page
- Smooth, confident, memorable
- Implement in `components/ui/Loader.tsx`
- Use `useEffect` + `useState` to control load sequence
- Remove loader from DOM after animation completes

```tsx
// Loader sequence
// 0ms     → show "R."
// 300ms   → "Ra."
// 500ms   → "Raa."
// 700ms   → "Raav."
// 900ms   → "Raavo."
// 1100ms  → "Raavon"  (dot disappears)
// 1500ms  → fade out loader
// 1700ms  → page visible
```

---

## 05. ICONS

**UI Icons — Lucide React:**
```bash
npm install lucide-react
```
Use for: navigation arrows, chevrons, menu, close, 
external links, check marks, social icons

```tsx
import { ArrowRight, Menu, X, ChevronDown } from 'lucide-react'
```

**Animated & Decorative Icons — Lord Icon:**
```html
<!-- Add to layout.tsx head -->
<script src="https://cdn.lordicon.com/lordicon.js"></script>
```

Use Lord Icon for:
- 404 page error illustration (animated broken link or ghost)
- Empty states
- Success animations
- Loading spinners as fallback

```tsx
// Example Lord Icon usage in TSX
<lord-icon
  src="https://cdn.lordicon.com/[icon-id].json"
  trigger="hover"
  colors={`primary:#C19A6B,secondary:#4E2C20`}
  style={{ width: '120px', height: '120px' }}
/>
```

---

## 06. IMAGES

**Source:** Unsplash (free, no attribution needed in production)

Use these Unsplash collections for now — replace with real brand images later:

```
Hero background texture:
https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe
(abstract warm gradient — browns and golds)

About section — team/studio feel:
https://images.unsplash.com/photo-1497366216548-37526070297c
(modern office, warm tones)

Ventures section — fintech/app:
https://images.unsplash.com/photo-1563013544-824ae1b704d3
(phone with finance app)

Fashion placeholder:
https://images.unsplash.com/photo-1558618666-fcd25c85cd64
(fashion editorial, warm tones)

Philosophy/quote section:
https://images.unsplash.com/photo-1506905925346-21bda4d32df4
(landscape, vast, inspiring)
```

**Image rules:**
- Always use `next/image` — never `<img>` directly
- Set explicit `width` and `height` for all images
- Use `priority` prop on hero image
- Add meaningful `alt` text on every image
- Apply warm overlay on all images: `rgba(193,154,107,0.15)`

---

## 07. FILE STRUCTURE

```
raavon.com/
├── app/
│   ├── layout.tsx              # Fonts, metadata, ThemeProvider, Loader
│   ├── page.tsx                # Home — imports all sections
│   ├── globals.css             # CSS variables, resets, base styles
│   ├── not-found.tsx           # Custom 404 page
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── apple-touch-icon.png
│   ├── robots.txt
│   └── sitemap.ts              # Dynamic sitemap for SEO
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Fixed nav, logo, theme toggle, mobile menu
│   │   └── Footer.tsx          # Logo, tagline, links, copyright
│   │
│   ├── sections/
│   │   ├── Hero.tsx            # Headline, subtext, CTA, hero image
│   │   ├── Marquee.tsx         # Scrolling phrases strip
│   │   ├── About.tsx           # Story + stat cards
│   │   ├── Ventures.tsx        # Kairo card + 2 coming soon cards
│   │   ├── Philosophy.tsx      # Quote + watermark
│   │   └── Contact.tsx         # Contact info + CTA
│   │
│   └── ui/
│       ├── Loader.tsx          # R. → Raavon loader animation
│       ├── Cursor.tsx          # Custom caramel cursor
│       ├── ThemeToggle.tsx     # Dark/light switch
│       ├── ScrollReveal.tsx    # Intersection observer reveal wrapper
│       ├── MarqueeTrack.tsx    # Inner scrolling track
│       ├── VentureCard.tsx     # Individual venture card
│       └── Logo.tsx            # Two-tone Raavon logo component
│
├── context/
│   └── ThemeContext.tsx        # Dark/light state + localStorage
│
├── hooks/
│   ├── useTheme.ts             # Access theme from context
│   ├── useScrollReveal.ts      # Scroll reveal logic
│   └── useCursor.ts            # Cursor tracking
│
├── lib/
│   ├── constants.ts            # All static data — ventures, nav, phrases
│   ├── metadata.ts             # Shared SEO metadata config
│   └── utils.ts                # clsx helper, shared utilities
│
├── public/
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── apple-touch-icon.png
│   ├── og-image.png            # 1200x630 Open Graph image
│   └── logo.svg                # Full Raavon logo SVG
│
├── styles/
│   └── animations.css          # Keyframe animations, reveal classes
│
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── .env.local
├── .gitignore
├── README.md
└── PROMPT.md                   # ← This file
```

---

## 08. SECTIONS — CONTENT & DESIGN

### NAVBAR
- Fixed top, full width
- Left: Two-tone Logo — "Raav" in caramel, "on" in mahogany
- Right: Nav links + Theme Toggle
- Mobile: Hamburger (Lucide `Menu`) → full screen overlay menu
- On scroll: subtle backdrop blur + border bottom appears
- Links: About, Ventures, Contact

---

### HERO
```
Eyebrow:  "Raavon Group — Est. 2025"  [small, caramel, letter-spaced]

Headline: We bring         [Plus Jakarta Sans 800, large]
          ideas            [Fraunces italic, caramel]
          to life.         [Plus Jakarta Sans 800]

Subtext:  A digital studio that builds products people need.
          Born in Nigeria — built for everywhere.

CTA:      [Our Ventures →]   [caramel border button]
          [Get in Touch]     [text link with arrow]

Visual:   Warm abstract texture or gradient in background
          Floating ambient orbs — caramel and mahogany, blurred
```

---

### MARQUEE
Scrolling left, pauses on hover:
```
Ideas Made Real · Built to Last · We Ship Things That Matter ·
Born in Nigeria · Built for the World · We Build Products ·
Ideas Made Real · Start With a Problem ·
```
Style: Fraunces italic, tan colour, separator dots in caramel

---

### ABOUT
Two column grid:

**Left:**
```
Section label: "Who We Are"
Heading: We build products
         people actually need.

Body: Raavon is a digital studio that builds products people
      actually need. We start with a problem, we build the
      solution, and we ship it. Kairo is our first product —
      and it is only the beginning.
```

**Right — 4 stat cards:**
```
[ Founded ]    [ Industries ]
  2025           Unlimited

[ Origin ]     [ Reach ]
  Nigeria 🇳🇬    Global 🌍
```
Card style: caramel border left accent, mahogany-dim background

---

### VENTURES
3 card grid:

**Card 1 — Kairo (Active)**
```
Tag:    Fintech · AI · Personal Finance
Name:   Kairo
Desc:   Nigeria's first AI-powered Personal Finance
        Management app. Connect all your bank accounts,
        track spending with AI, automate savings, and
        pay bills — all in one place.
Status: 🟡 In Development  [pulsing caramel dot]
Arrow:  ↗ top right corner
```

**Card 2 — Coming Soon**
```
Tag:    Coming Soon
Name:   Coming Soon
Desc:   Something is being built. We will tell you
        when it is ready.
Status: ○ In Conception  [static, dimmed]
```

**Card 3 — Coming Soon**
```
Tag:    Coming Soon
Name:   Coming Soon
Desc:   Something is being built. We will tell you
        when it is ready.
Status: ○ In Conception  [static, dimmed]
```

Card hover: caramel left border slides up, background warms slightly

---

### PHILOSOPHY
Full width, centered:
```
Background watermark: "RAAVON" — giant, ghost text, caramel stroke only

Quote:  "The greatest ideas are not invented —
         they are revealed.
         We reveal them."

Attr:   — Raavon Group
```

---

### CONTACT
Two column:

**Left:**
```
Heading: Have an idea?
         Let's make it real.

Body:    Whether you are a partner, investor, or
         someone with an idea that deserves to
         exist — we want to hear from you.
```

**Right — contact links:**
```
→  hello@raavon.com
→  raavon.com
→  Lagos, Nigeria
```
Each link: animated line extends on hover

---

### 404 PAGE
```
Lord Icon animated error illustration (broken link / lost)
Heading: "Lost in the void."
Subtext: "This page doesn't exist — but your idea does."
CTA:     [Take me home →]
```

---

### FOOTER
```
Left:    RAAVON  [two-tone logo]
Center:  "The spirit behind every brand."  [Fraunces italic, tan]
Right:   © 2025 Raavon Group. All rights reserved.
```
Top border: subtle caramel gradient line

---

## 09. DARK / LIGHT MODE

Default: **Dark**

```
DARK MODE:
  Background:  #0A0A0A
  Surface:     #111009
  Card:        #1A1610
  Text:        #FAF7F2
  Muted text:  rgba(250,247,242,0.45)
  Border:      rgba(193,154,107,0.12)
  Accent:      #C19A6B

LIGHT MODE:
  Background:  #FAF7F2
  Surface:     #F2EDE4
  Card:        #EDE5D8
  Text:        #0A0A0A
  Muted text:  rgba(10,10,10,0.45)
  Border:      rgba(78,44,32,0.1)
  Accent:      #4E2C20
```

Toggle: Sun/Moon icon (Lucide), saves to `localStorage`
Use `next-themes` for flicker-free hydration

---

## 10. ANIMATIONS

```css
/* Scroll reveal — apply .reveal class, JS adds .visible */
.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger children */
.reveal:nth-child(2) { transition-delay: 0.1s; }
.reveal:nth-child(3) { transition-delay: 0.2s; }
.reveal:nth-child(4) { transition-delay: 0.3s; }

/* Marquee */
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

/* Ambient orbs */
@keyframes drift {
  from { transform: translate(0,0) scale(1); }
  to   { transform: translate(30px,20px) scale(1.06); }
}

/* Button fill */
.btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--caramel);
  transform: translateX(-101%);
  transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
}
.btn:hover::before { transform: translateX(0); }
```

---

## 11. SEO

```tsx
// app/metadata.ts
export const siteMetadata = {
  title: 'Raavon — The Spirit Behind Every Brand',
  description: 'Raavon is a global holding company born in Nigeria, bringing ideas to life across fintech, fashion, technology, and beyond.',
  keywords: 'Raavon, holding company, Nigeria, fintech, fashion, technology, Kairo, startup studio, African brands',
  url: 'https://raavon.com',
  ogImage: 'https://raavon.com/og-image.png',
  twitterHandle: '@raavon',
}
```

```tsx
// app/layout.tsx
export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  authors: [{ name: 'Raavon Group' }],
  creator: 'Raavon Group',
  openGraph: {
    type: 'website',
    url: siteMetadata.url,
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [{ url: siteMetadata.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.ogImage],
  },
  robots: { index: true, follow: true },
  canonical: siteMetadata.url,
}
```

---

## 12. INSTALL COMMANDS

```bash
# Create project
npx create-next-app@latest raavon.com \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --import-alias="@/*"

cd raavon.com

# Dependencies
npm install next-themes          # Dark/light mode, no flicker
npm install framer-motion        # Scroll reveal, loader animation
npm install lucide-react         # UI icons
npm install clsx                 # Conditional classnames
npm install tailwind-merge       # Merge tailwind classes safely

# Dev dependencies
npm install -D @types/node
```

---

## 13. TAILWIND CONFIG

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        caramel:  '#C19A6B',
        mahogany: '#4E2C20',
        tan:      '#D2B48C',
        'off-white': '#FAF7F2',
        'dark-surface': '#111009',
        'dark-card':    '#1A1610',
      },
      fontFamily: {
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
        dm:      ['DM Sans', 'sans-serif'],
        fraunces: ['Fraunces', 'serif'],
      },
      animation: {
        marquee: 'marquee 24s linear infinite',
        drift:   'drift 12s ease-in-out infinite alternate',
        pulse:   'pulse 2s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        drift: {
          from: { transform: 'translate(0,0) scale(1)' },
          to:   { transform: 'translate(30px,20px) scale(1.06)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
```

---

## 14. README CONTENT

```md
# Raavon

> The spirit behind every brand.

Official website for Raavon Group — a global holding company
born in Nigeria, bringing ideas to life across fintech,
fashion, technology, and beyond.

## Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- next-themes
- Lucide React
- Lord Icon

## Ventures
- **Kairo** — AI-powered Personal Finance Management app for Nigeria

## Getting Started
npm install
npm run dev

## Deployment
Deployed on Vercel. Push to main → auto deploy.
```

---

*PROMPT.md — Raavon Group · raavon.com · 2025*
