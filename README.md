# raavon.com

The website for RaaVon, a venture builder and technology partner.

Built with Next.js 16 (App Router, Turbopack), React 19 and Tailwind CSS 4. Brand rules come from
[docs/brand/RaaVon_Brand_Guide_V1_Draft.pdf](docs/brand/RaaVon_Brand_Guide_V1_Draft.pdf).

## Run it

```bash
npm install
cp .env.example .env.local   # fill in the values you have
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
npm run lint
```

## Folder structure

```
app/
  layout.tsx              Root: font, metadata, structured data, intro gate script
  globals.css             Design tokens (brand colours, type, buttons, motion)
  (site)/                 Public pages, sharing the header and footer
    layout.tsx
    page.tsx              Home
    work/                 All projects, with a filter
    work/[slug]/          One page per project, generated from content/projects
    capabilities/  ventures/  studio/  about/  contact/
  admin/                  Private console (noindex), with its own components
  api/                    contact, newsletter, unsubscribe, admin/*
  unsubscribe/            Email preference result page
  not-found.tsx  opengraph-image.tsx  sitemap.ts  robots.ts  icon.png  apple-icon.png

components/
  brand/      Logo, HeroRosette, Intro (first-visit animation)
  layout/     SiteHeader, SiteFooter
  sections/   Page sections (Hero, WorkTrack, CapabilitiesSection, AdminPromise, ...)
  projects/   Device frames, ProjectCard, WorkIndex, ScreenTrack
  studio/     The website builder at /studio
  forms/      ContactForm, NewsletterForm
  ui/         SectionIntro, PageHero
  motion/     GSAP: ScrollEffects (reveals, scrubbed lines, parallax),
              ScrollTracker (progress bar), CustomCursor (home page)

content/      All site copy and facts. Edit these to update the site.
  site.ts           Name, email, navigation, social links
  capabilities.ts   Service areas
  projects/         One file per project (Klario, Sync, client work), plus
                    index.ts, which decides what is published and in what order
  engagement.ts     Ways to work together, process, form options

lib/
  email/       Resend client and email templates
  security/    HTML escaping, HMAC signing, admin session, rate limit
  validation/  Contact form rules shared by client and server
  storage.ts   Local JSON storage for the admin console (not durable on Vercel)
  metadata.ts  Per-page SEO helper

public/
  brand/                       Official rosette and web versions of the RaaVon logo
  projects/<slug>/             Product screenshots for each project

docs/
  OUTSTANDING.md     Facts, assets and integrations still needed
  brand/             Current brand guide, source logo files in logos/, superseded 2025 material in legacy/
  archive/           Superseded build brief
```

## Updating content

- **Add a project:** create `content/projects/<slug>.ts` (copy an existing one), put its
  screenshots in `public/projects/<slug>/`, then add it to the list in
  `content/projects/index.ts`. Its page at `/work/<slug>` is generated automatically.
  Set `featured: true` to show it in the home page work track. Leave `outcomes` empty
  until results are measured. Never add NDA work.
- **Change services:** edit `content/capabilities.ts`.
- **Add social links:** add verified profiles to `site.social` in `content/site.ts`.
- **Set the legal name:** set `site.legalName` in `content/site.ts` once confirmed. It then
  appears in the footer and structured data.

## How the forms behave

- The contact form validates on the client and the server with the same rules.
- Success is shown only after Resend accepts the notification to the team inbox.
- If `RESEND_API_KEY` is missing, the form says the message was not sent and offers a
  prefilled email to contact@raavon.com instead.
- Submissions also go to local JSON storage for `/admin`. On Vercel this storage is
  temporary. Email is the system of record until a database is connected.

## Motion and accessibility

Scroll motion uses GSAP ScrollTrigger (`lib/gsap.ts`):
- `.reveal` elements fade up once. `.draw-x`/`.draw-y` lines are scrubbed by scroll.
  `data-parallax="N"` drifts an element N% while its section passes.
- The home work track and project screenshot galleries pin and scroll sideways on
  tablet and desktop, and stack on phones.
- The scrollbar is hidden; scrolling stays native, and the gold bar at the top shows progress.
- The home page has a custom cursor and cursor-reactive headline for mouse users.


- The intro plays once per browser session on the home page, and never when the visitor
  prefers reduced motion. Click, scroll or press any key to skip it.
- Scroll reveals only hide content when JavaScript runs and motion is allowed.
- Focus rings follow the brand guide: burgundy on light surfaces, gold on dark.
- The mobile menu traps focus, closes on Escape and returns focus to the menu button.
