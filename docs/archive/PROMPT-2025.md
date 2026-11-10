# RAAVON.COM — Full Build Prompt & Brand Guide
> Save this file as `PROMPT.md` in your repo root.
> This is the single source of truth for every design and development decision.

---

## 01. WHO IS RAAVON

Raavon is a global holding company that brings ambitious ideas to life
across multiple industries — fintech, fashion, technology, and beyond.

Not a startup. Not an agency. Not a consultancy.
An empire being built one venture at a time.

**Tagline:** The spirit behind every brand.
**Philosophy:** We don't just build companies. We build legacies.
**Origin:** Born with purpose. Built for the world.
**Status:** Raavon is currently in its studio phase — building and proving
its first venture. The holding company structure grows as the ventures prove themselves.

### Company Objectives
1. To carry on business as a digital solutions studio, designing,
   developing, and deploying software products, mobile applications,
   and web-based platforms.
2. To develop, own, operate, and commercialise technology products and
   digital services across multiple industries including but not limited
   to financial technology, e-commerce, and digital media.
3. To provide software development, product design, user experience design,
   and technology consulting services to individuals, businesses, and
   organisations globally.
4. To develop, own, and operate financial technology products and platforms
   that provide personal finance management, budgeting, savings, and
   financial intelligence services to consumers.
5. To carry on business as a technology company providing artificial
   intelligence powered tools, data analytics, and automation solutions
   to businesses and individuals.
6. To acquire, hold, manage, and commercialise intellectual property
   including trademarks, patents, software licences, domain names,
   and brand assets.
7. To enter into partnerships, joint ventures, and commercial agreements
   with local and international companies, financial institutions, and
   regulatory bodies in furtherance of the company's business objectives.
8. To carry on any other business which may seem to the company capable
   of being conveniently carried on in connection with the above objects
   or calculated to enhance the value of or render profitable any of the
   company's property or rights.

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
  --tan-soft:    rgba(210,180,140,0.2);

  /* Dark mode surfaces */
  --dark-bg:       #0A0A0A;
  --dark-surface:  #111009;
  --dark-card:     #1A1610;
  --dark-border:   rgba(193,154,107,0.12);

  /* Light mode surfaces */
  --light-bg:      #FAF7F2;
  --light-surface: #F2EDE4;
  --light-card:    #EDE5D8;
  --light-border:  rgba(78,44,32,0.1);

  /* Text */
  --text-primary:  #FAF7F2;   /* dark mode */
  --text-muted:    #8A7A6A;
  --text-body:     #BEB0A0;
}
```

**Colour meaning:**
- Caramel `#C19A6B` — warmth, creativity, ambition, approachable wealth
- Mahogany `#4E2C20` — depth, trust, heritage, authority
- Tan `#D2B48C` — softness, balance, the in-between
- Black — grounding, precision, contrast
- Off-white — cleanliness, breathing room, premium feel

**Logo colours (CRITICAL):**
- "Raa" — `#FAF7F2` (off-white) — light, open, inviting
- "von" — `#4E2C20` (mahogany) — dark, grounded, authoritative
- On light backgrounds: "Raa" becomes `#4E2C20`, "von" becomes `#0A0A0A`

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

---

## 04. FAVICON & LOADER

**Favicon:**
- The letter "R" with a full stop — "R."
- "R" in off-white `#FAF7F2`, dot "." in mahogany `#4E2C20`
- Clean geometric R — Plus Jakarta Sans 800
- Export as `favicon.ico`, `favicon.svg`, `apple-touch-icon.png`

**Page Loader:**
```
0ms     → show "R."        (caramel dot pulses)
300ms   → "Ra."
500ms   → "Raa."
700ms   → "Raav."          (wait — the break before "von")
900ms   → "Raavon"         (dot disappears, full wordmark appears)
1200ms  → subtle fade — two-tone colours snap in
1600ms  → fade out loader, page fades in
```

Implement in `components/ui/Loader.tsx`.
Use `framer-motion` for the letter reveal animation.
Remove loader from DOM after animation completes (not just hidden).

---

## 05. ICONS

**UI Icons — Lucide React:**
```bash
npm install lucide-react
```
Use for: navigation arrows, chevrons, menu, close, links, checks.

**Animated Icons — Lord Icon:**
```html
<script src="https://cdn.lordicon.com/lordicon.js"></script>
```
Use for: 404 animation, success states, empty states, loading fallback.
Always set colours: `primary:#C19A6B,secondary:#4E2C20`

---

## 06. IMAGES

Source from Unsplash — replace with brand photography later.

Warm overlay rule: always apply `rgba(193,154,107,0.08)` tint over images.
Always use `next/image`. Never `<img>`. Always set `alt` text.
Use `priority` on hero image.

**Search terms for Pinterest/Unsplash:**
```
warm abstract texture dark background
brown gold gradient wallpaper
dark editorial luxury background
warm earthy tone abstract art
moody warm workspace photography
dark caramel aesthetic wallpaper 4k
```

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
│   └── sitemap.ts
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Fixed nav, logo, theme toggle, mobile menu
│   │   └── Footer.tsx
│   │
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Marquee.tsx
│   │   ├── About.tsx
│   │   ├── Ventures.tsx
│   │   ├── Philosophy.tsx
│   │   ├── Stats.tsx           # Numbers and proof
│   │   └── Contact.tsx
│   │
│   └── ui/
│       ├── Loader.tsx          # R. → Raavon loader
│       ├── Cursor.tsx          # Custom caramel cursor
│       ├── ThemeToggle.tsx
│       ├── ScrollReveal.tsx
│       ├── MarqueeTrack.tsx
│       ├── VentureCard.tsx
│       ├── StatCard.tsx
│       └── Logo.tsx            # Two-tone logo component
│
├── context/
│   └── ThemeContext.tsx
│
├── hooks/
│   ├── useTheme.ts
│   ├── useScrollReveal.ts
│   └── useCursor.ts
│
├── lib/
│   ├── constants.ts            # All static data
│   ├── metadata.ts             # SEO config
│   └── utils.ts
│
├── public/
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── apple-touch-icon.png
│   └── og-image.png            # 1200x630
│
├── styles/
│   └── animations.css
│
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── .env.local
├── .gitignore
├── README.md
└── PROMPT.md
```

---

## 08. SECTIONS — DETAILED DESIGN

### NAVBAR
- Fixed top, full width, `backdrop-blur` on scroll
- Left: Two-tone Logo — "Raa" off-white, "von" mahogany
- Center: nav links (hidden on mobile)
- Right: Theme Toggle + CTA button "Get in touch"
- Mobile: Hamburger → fullscreen dark overlay menu with large nav links
- Scroll behaviour: transparent → dark bg + border bottom at 80px scroll

---

### HERO
This is the most important section. Make it cinematic. Not bland.

```
Layout: Full viewport height. Dark background. Ambient orbs.
        Grain texture overlay. Diagonal gold rule line right side.

Top badge: Small pill — "Raavon Group  ·  Est. 2025"
           Caramel border, caramel text, dark fill

Headline (3 lines, large):
  Line 1: "We bring"          — Plus Jakarta Sans 800, off-white, huge
  Line 2: "ideas"             — Fraunces italic, caramel
  Line 3: "to life."          — Plus Jakarta Sans 800, off-white

Subtext (below headline):
  "One holding company. Many ventures. Built for the world."
  DM Sans 300, muted, max-width 480px

CTAs:
  Primary: [Our Ventures →]   — caramel border, fill-on-hover
  Secondary: [Get in touch]   — text link, muted, arrow

Right side visual:
  Large ghost wordmark "RAAVON" — vertical, rotated 90°, very faint caramel
  OR: Abstract warm texture image with caramel overlay

Bottom of hero:
  Scroll indicator — animated bouncing dot + "Scroll" text
  Three quick stats inline:
  [ 2025 Founded ]  [ ∞ Industries ]  [ Global Reach ]
```

**Hero must NOT be:**
- A plain centered text block with nothing else
- Generic gradient background
- Stock photo of a laptop
- Just words with no visual hierarchy

---

### MARQUEE
Scrolling strip between hero and about. Pauses on hover.

Content:
```
Ideas Made Real · Built to Last · One Spirit · Many Ventures ·
Born with Purpose · Built for the World · We Build Legacies ·
From Idea to Empire · The Spirit Behind Every Brand ·
```
Style: Fraunces italic, tan colour, caramel dot separators, dark background strip.
Top and bottom: 1px caramel-dim border lines.

---

### ABOUT
Two column — 55% left / 45% right.

**Left column:**
```
Section label: "WHO WE ARE"  [small, caramel, spaced]
Heading: We don't just
         build companies.  [Fraunces italic, caramel]
         We build legacies.

Body paragraph 1:
Raavon is a global holding company built to bring ambitious
ideas to life. We are not a consultancy. Not an agency.
We are builders.

Body paragraph 2:
Every venture that carries the Raavon name is built with the
same obsession: quality that makes people feel it was made
specifically for them.

Small text list (with caramel dot leaders):
· Financial Technology
· Fashion & Culture
· Digital Infrastructure
· AI & Automation
```

**Right column — floating card:**
```
Dark card, caramel border, slight rotation (-1deg), shadow

Inside:
"The greatest ideas are not invented —
 they are revealed. We reveal them."

— Raavon Group
```

Below the two columns — 4 stat cards in a row:
```
[ 2025        ] [ Unlimited  ] [ Global     ] [ Active     ]
[ Founded     ] [ Industries ] [ Reach      ] [ Building   ]
```
Cards: caramel left border, dark card bg, hover lifts slightly.

---

### VENTURES
```
Section label: "OUR VENTURES"
Heading: Every brand begins
         with one idea.    [Fraunces italic, caramel]
```

**3-card grid:**

Card 1 — Active venture:
```
Tag: FINTECH · AI · PERSONAL FINANCE
Name: Venture 01
Desc: An AI-powered Personal Finance Management platform.
      Unified accounts. Intelligent tracking. Real savings.
Status: [pulsing caramel dot] In Development
Arrow: ↗ top right corner
Hover: caramel left border slides up, card warms
```

Cards 2 & 3 — Coming soon (dimmed):
```
Card 2: FASHION · CULTURE · IDENTITY
        Venture 02 — Coming Soon

Card 3: TECHNOLOGY · TOOLS · INFRASTRUCTURE
        Venture 03 — Coming Soon
```

**Below cards — empire statement:**
```
Centered, Fraunces italic, tan:
"Raavon is the studio. Each venture proves the model.
 Together they build the empire."
```

---

### PHILOSOPHY (full width)
```
Giant ghost watermark: "RAAVON" — 15vw font, almost invisible, caramel outline only

Above quote: section label "OUR PHILOSOPHY"

Quote (large, centered, Fraunces italic):
"The greatest ideas are not invented —
 they are revealed.
 We reveal them."

Below: — Raavon Group  [small, caramel, spaced]
```

Background: Can use a subtle warm landscape or texture image behind this section with dark overlay.

---

### STATS (new section — makes it feel real and not bland)
```
Full-width dark section. Background slightly lighter than page.
4 stat blocks in a row, separated by vertical caramel lines.

[ $543B+        ] [ 8            ] [ 3            ] [ 2025        ]
[ Global        ] [ Company      ] [ Active       ] [ Year we     ]
[ Fintech       ] [ Objectives   ] [ Ventures     ] [ started     ]
[ Opportunity   ] [ Defined      ] [ In Pipeline  ] [ building    ]

Below each number: small descriptor in muted text.
Each stat fades up on scroll with staggered delay.
```

---

### CONTACT
Two column. Left: text. Right: links + form.

**Left:**
```
Heading: Have an idea?
         Let's make it  [Fraunces italic, caramel]
         real.

Body:
Whether you are a potential partner, investor, or
someone with an idea that deserves to exist in the
world — we want to hear from you.
```

**Right — contact options:**
```
→  hello@raavon.com      [caramel hover line extends]
→  Partnerships          [opens email with subject]
→  Investments           [opens email with subject]
→  General enquiries     [opens email with subject]
```

Simple, clean. No complex form. Email is enough for now.

---

### FOOTER
Three sections in a row:
```
Left:   RAAVON logo (two-tone, smaller)
        "The spirit behind every brand."
        [Fraunces italic, tan]

Center: Nav links stacked vertically
        About / Ventures / Contact / Brand Guide

Right:  Social links (if applicable)
        © 2025 Raavon Group. All rights reserved.
```

Top: caramel gradient rule line.
Background: slightly darker than page (#080806).

---

## 09. DARK / LIGHT MODE

Default: **Dark**

```
DARK MODE:
  Page bg:     #0A0A0A
  Surface:     #111009
  Card:        #1A1610
  Text:        #FAF7F2
  Muted:       rgba(250,247,242,0.45)
  Border:      rgba(193,154,107,0.12)
  Accent:      #C19A6B

LIGHT MODE:
  Page bg:     #FAF7F2
  Surface:     #F2EDE4
  Card:        #EDE5D8
  Text:        #0A0A0A
  Muted:       rgba(10,10,10,0.5)
  Border:      rgba(78,44,32,0.12)
  Accent:      #4E2C20
```

Use `next-themes` — prevents hydration flicker.
Toggle: Sun/Moon Lucide icon. Saves to `localStorage`.

---

## 10. ANIMATIONS (make it feel alive, not bland)

```css
/* Scroll reveal */
.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1);
}
.reveal.visible { opacity: 1; transform: translateY(0); }
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

/* Stat counter — numbers count up on scroll */
/* Use JS counter animation — 0 → target over 1.5s */

/* Hero headline — lines reveal from bottom */
@keyframes lineReveal {
  from { opacity: 0; transform: translateY(100%); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Button fill from left */
.btn::before {
  content: '';
  position: absolute; inset: 0;
  background: var(--caramel);
  transform: translateX(-101%);
  transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
}
.btn:hover::before { transform: translateX(0); }

/* Venture card border reveal */
.venture-card::before {
  content: '';
  position: absolute;
  left: 0; top: 0;
  width: 2px; height: 100%;
  background: var(--caramel);
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
}
.venture-card:hover::before { transform: scaleY(1); }
```

**What must animate:**
- Hero headline lines — reveal from bottom on load
- Stat numbers — count up when scrolled into view
- Venture cards — border slides up on hover + card warms
- About quote card — subtle parallax on scroll
- All sections — fade up on scroll (staggered)
- Marquee — left scroll, pause on hover
- Cursor — custom caramel dot with lagging ring
- Nav — appears from top on page load
- Theme toggle — smooth icon swap

---

## 11. MAKING IT NOT BLAND — KEY RULES

The site must feel like it took months to build, not an afternoon.
These rules make the difference:

1. **Grain texture overlay** — fixed, 0.3 opacity, on dark mode
2. **Ambient orbs** — 2-3 blurred circles, caramel/mahogany, 4-6% opacity, drifting
3. **Custom cursor** — caramel dot 8px, ring 36px that lags behind
4. **Diagonal rule line** — 1px caramel, runs down 60% of hero right side
5. **Ghost typography** — "RAAVON" as 15vw outline text in philosophy section
6. **Rotating badge** — small circular "Raavon Group · 2025 ·" badge that rotates
7. **Scroll progress bar** — thin caramel line at very top of viewport
8. **Hover states** — every interactive element has a deliberate, designed hover
9. **Loading state** — the R. loader is the first impression. Make it count.
10. **Micro-typography** — every eyebrow label is letter-spaced 0.3em, uppercase, 7px

---

## 12. SEO

```tsx
export const siteMetadata = {
  title: 'Raavon — The Spirit Behind Every Brand',
  description: 'Raavon is a global holding company bringing ambitious ideas to life across fintech, fashion, technology, and beyond. One spirit. Many ventures.',
  keywords: 'Raavon, holding company, fintech, fashion, technology, ventures, startup studio, global brands, digital products',
  url: 'https://raavon.com',
  ogImage: 'https://raavon.com/og-image.png',
}
```

Schema markup: `Organization` type with `sameAs`, `url`, `name`, `description`.
Sitemap: auto-generated via `app/sitemap.ts`.
Robots: `index: true, follow: true`.
Canonical: `raavon.com`.

---

## 13. INSTALL

```bash
npx create-next-app@latest raavon.com \
  --typescript --tailwind --eslint --app \
  --src-dir=false --import-alias="@/*"

cd raavon.com

npm install next-themes framer-motion lucide-react clsx tailwind-merge
```

---

## 14. TAILWIND CONFIG

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        caramel:    '#C19A6B',
        mahogany:   '#4E2C20',
        tan:        '#D2B48C',
        'off-white':'#FAF7F2',
        'dark-bg':  '#0A0A0A',
        'dark-surface':'#111009',
        'dark-card':'#1A1610',
      },
      fontFamily: {
        jakarta:  ['Plus Jakarta Sans', 'sans-serif'],
        dm:       ['DM Sans', 'sans-serif'],
        fraunces: ['Fraunces', 'serif'],
      },
      animation: {
        marquee: 'marquee 24s linear infinite',
        drift:   'drift 12s ease-in-out infinite alternate',
        'line-reveal': 'lineReveal 0.9s cubic-bezier(0.16,1,0.3,1) forwards',
      },
      keyframes: {
        marquee: { from:{transform:'translateX(0)'}, to:{transform:'translateX(-50%)'} },
        drift: { from:{transform:'translate(0,0) scale(1)'}, to:{transform:'translate(30px,20px) scale(1.06)'} },
        lineReveal: { from:{opacity:'0',transform:'translateY(100%)'}, to:{opacity:'1',transform:'translateY(0)'} },
      },
    },
  },
  plugins: [],
}
export default config
```

---

## 15. DO NOT BUILD A BLAND WEBSITE

When reviewing the site, ask:
- Does the hero make you stop scrolling?
- Does the loader feel like an experience?
- Does every hover state feel intentional?
- Does it look like it was made by someone who cares deeply?
- Would you be proud to show this to a banking partner or investor?

If the answer to any of these is no — keep building.

---

*PROMPT.md — Raavon Group · raavon.com · 2025*
*The spirit behind every brand.*
