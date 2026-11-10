/**
 * Studio presets, state shape and helpers.
 * Everything here is plain data so the preview can be rendered with inline
 * styles and exported as a standalone HTML file.
 */

/* ── Types ──────────────────────────────────────────────────────────── */

export type TemplateKey = 'launch' | 'store' | 'portfolio' | 'app'
export type HeroLayout = 'centered' | 'split' | 'editorial'
export type PaletteKey = 'noir' | 'paper' | 'ocean' | 'forest' | 'citrus' | 'plum'
export type FontKey = 'grotesque' | 'editorial' | 'technical' | 'classic' | 'friendly'
export type Radius = 0 | 8 | 16 | 28
export type Density = 'compact' | 'comfortable'
export type Device = 'desktop' | 'tablet' | 'mobile'
export type SectionId = 'hero' | 'features' | 'showcase' | 'steps' | 'pricing' | 'faq' | 'cta' | 'footer'

export type SectionEntry = { id: SectionId; on: boolean }

export type StudioState = {
  v: 1
  template: TemplateKey
  brandName: string
  headline: string
  subline: string
  ctaLabel: string
  heroLayout: HeroLayout
  palette: PaletteKey
  /** Custom accent (#rrggbb) or null to use the palette accent */
  accent: string | null
  font: FontKey
  radius: Radius
  density: Density
  sections: SectionEntry[]
}

export type Palette = {
  label: string
  bg: string
  surface: string
  text: string
  muted: string
  accent: string
  onAccent: string
  border: string
}

/* ── Palettes (all text pairs checked at 4.5:1 or better) ──────────── */

export const palettes: Record<PaletteKey, Palette> = {
  noir: {
    label: 'Noir & Gold',
    bg: '#0B0B0E',
    surface: '#16161B',
    text: '#ECE6D8',
    muted: '#A9A397',
    accent: '#E6C989',
    onAccent: '#0B0B0E',
    border: '#2A2A31',
  },
  paper: {
    label: 'Paper & Ink',
    bg: '#F6F3EC',
    surface: '#FFFFFF',
    text: '#15140F',
    muted: '#5C584F',
    accent: '#1E3A8A',
    onAccent: '#FFFFFF',
    border: '#DDD7CA',
  },
  ocean: {
    label: 'Ocean',
    bg: '#F2F7FA',
    surface: '#FFFFFF',
    text: '#0B2233',
    muted: '#4A6273',
    accent: '#0A6E8C',
    onAccent: '#FFFFFF',
    border: '#D3E1EA',
  },
  forest: {
    label: 'Forest',
    bg: '#0F1A14',
    surface: '#17251D',
    text: '#E8EFE6',
    muted: '#A3B5A6',
    accent: '#9BCB7A',
    onAccent: '#0F1A14',
    border: '#2A3D31',
  },
  citrus: {
    label: 'Citrus',
    bg: '#FFFBEF',
    surface: '#FFFFFF',
    text: '#1C1A12',
    muted: '#5E5847',
    accent: '#F2B705',
    onAccent: '#1C1A12',
    border: '#EEE3C4',
  },
  plum: {
    label: 'Plum',
    bg: '#1A1020',
    surface: '#251830',
    text: '#F3EAF5',
    muted: '#BBA8C2',
    accent: '#E58FB5',
    onAccent: '#1A1020',
    border: '#3A2A45',
  },
}

/* ── Font pairings ──────────────────────────────────────────────────── */

export type FontPairing = {
  label: string
  description: string
  heading: string
  headingWeight: number
  body: string
  labelFont: string
  /** Google Fonts css2 query used in the exported HTML */
}

export const fonts: Record<FontKey, FontPairing> = {
  grotesque: {
    label: 'Grotesque',
    description: 'Bricolage Grotesque',
    heading: "var(--font-bricolage, 'Bricolage Grotesque'), system-ui, sans-serif",
    headingWeight: 800,
    body: "var(--font-bricolage, 'Bricolage Grotesque'), system-ui, sans-serif",
    labelFont: "var(--font-bricolage, 'Bricolage Grotesque'), system-ui, sans-serif",
  },
  editorial: {
    label: 'Editorial',
    description: 'Fraunces and Inter',
    heading: "var(--studio-fraunces, 'Fraunces'), Georgia, serif",
    headingWeight: 600,
    body: "var(--studio-inter, 'Inter'), system-ui, sans-serif",
    labelFont: "var(--studio-inter, 'Inter'), system-ui, sans-serif",
  },
  technical: {
    label: 'Technical',
    description: 'Space Grotesk, Inter and IBM Plex Mono',
    heading: "var(--studio-space, 'Space Grotesk'), system-ui, sans-serif",
    headingWeight: 700,
    body: "var(--studio-inter, 'Inter'), system-ui, sans-serif",
    labelFont: "var(--studio-plex-mono, 'IBM Plex Mono'), ui-monospace, monospace",
  },
  classic: {
    label: 'Classic',
    description: 'Playfair Display and Source Sans 3',
    heading: "var(--studio-playfair, 'Playfair Display'), Georgia, serif",
    headingWeight: 700,
    body: "var(--studio-source, 'Source Sans 3'), system-ui, sans-serif",
    labelFont: "var(--studio-source, 'Source Sans 3'), system-ui, sans-serif",
  },
  friendly: {
    label: 'Friendly',
    description: 'Nunito',
    heading: "var(--studio-nunito, 'Nunito'), system-ui, sans-serif",
    headingWeight: 800,
    body: "var(--studio-nunito, 'Nunito'), system-ui, sans-serif",
    labelFont: "var(--studio-nunito, 'Nunito'), system-ui, sans-serif",
  },
}

/* ── Option lists ───────────────────────────────────────────────────── */

export const radii: { value: Radius; label: string }[] = [
  { value: 0, label: 'Sharp' },
  { value: 8, label: 'Soft' },
  { value: 16, label: 'Round' },
  { value: 28, label: 'Extra round' },
]

export const densities: { value: Density; label: string }[] = [
  { value: 'compact', label: 'Compact' },
  { value: 'comfortable', label: 'Comfortable' },
]

export const heroLayouts: { value: HeroLayout; label: string }[] = [
  { value: 'centered', label: 'Centred' },
  { value: 'split', label: 'Split' },
  { value: 'editorial', label: 'Editorial' },
]

export const devices: { value: Device; label: string; width: number }[] = [
  { value: 'desktop', label: 'Desktop', width: 1280 },
  { value: 'tablet', label: 'Tablet', width: 820 },
  { value: 'mobile', label: 'Mobile', width: 390 },
]

export const sectionLabels: Record<SectionId, string> = {
  hero: 'Hero',
  features: 'Features',
  showcase: 'Showcase',
  steps: 'How it works',
  pricing: 'Pricing',
  faq: 'Questions',
  cta: 'Call to action',
  footer: 'Footer',
}

const ALL_SECTIONS: SectionId[] = ['hero', 'features', 'showcase', 'steps', 'pricing', 'faq', 'cta', 'footer']

/* ── Templates ──────────────────────────────────────────────────────── */

export type TemplateCopy = {
  nav: string[]
  eyebrow: string
  features: { title: string; body: string }[]
  featuresTitle: string
  showcaseTitle: string
  showcaseBody: string
  showcaseItems: { title: string; meta: string }[]
  stepsTitle: string
  steps: { title: string; body: string }[]
  pricingTitle: string
  tiers: { name: string; note: string; items: string[] }[]
  faqTitle: string
  faq: { q: string; a: string }[]
  ctaTitle: string
  ctaBody: string
}

export type Template = {
  label: string
  description: string
  brandName: string
  headline: string
  subline: string
  ctaLabel: string
  heroLayout: HeroLayout
  sections: SectionEntry[]
  copy: TemplateCopy
}

const order = (on: SectionId[], sequence: SectionId[] = ALL_SECTIONS): SectionEntry[] => {
  const seq = [...sequence, ...ALL_SECTIONS.filter((id) => !sequence.includes(id))]
  return seq.map((id) => ({ id, on: on.includes(id) }))
}

const pricingTiers = [
  { name: 'Starter', note: 'Set your price', items: ['What is included', 'Who it suits', 'How support works'] },
  { name: 'Growth', note: 'Set your price', items: ['Everything in Starter', 'Your main upgrade', 'A second upgrade'] },
  { name: 'Custom', note: 'Talk to us', items: ['For larger teams', 'Tailored set-up', 'A named contact'] },
]

export const templates: Record<TemplateKey, Template> = {
  launch: {
    label: 'Product launch',
    description: 'A software product or start-up',
    brandName: 'Your brand',
    headline: 'Say what you do in one clear sentence.',
    subline: 'Explain who it is for and the difference it makes. Two short sentences is plenty.',
    ctaLabel: 'Get started',
    heroLayout: 'centered',
    sections: order(['hero', 'features', 'showcase', 'steps', 'pricing', 'faq', 'cta', 'footer']),
    copy: {
      nav: ['Product', 'How it works', 'Pricing'],
      eyebrow: 'Introducing your product',
      featuresTitle: 'Why people choose it',
      features: [
        { title: 'A clear first benefit', body: 'Describe one specific thing your customer can do, and why it matters to them.' },
        { title: 'A second benefit', body: 'Keep each point short. One idea per card reads best.' },
        { title: 'A third benefit', body: 'Finish with the reason people pick you over the alternative.' },
      ],
      showcaseTitle: 'Show the product at its best',
      showcaseBody: 'Use a strong image or a short video here. Real screenshots work better than illustrations.',
      showcaseItems: [
        { title: 'Main view', meta: 'Add a screenshot' },
        { title: 'Key feature', meta: 'Add a screenshot' },
        { title: 'On mobile', meta: 'Add a screenshot' },
      ],
      stepsTitle: 'How it works',
      steps: [
        { title: 'Sign up', body: 'Say how long it takes and what people need to begin.' },
        { title: 'Set up', body: 'Explain the one thing they do to get value quickly.' },
        { title: 'Carry on', body: 'Describe what using it looks like week to week.' },
      ],
      pricingTitle: 'Simple plans',
      tiers: pricingTiers,
      faqTitle: 'Questions',
      faq: [
        { q: 'Who is this for?', a: 'Describe your ideal customer in a sentence or two.' },
        { q: 'How long does it take to get started?', a: 'Give an honest answer, with what affects it.' },
        { q: 'Can I cancel at any time?', a: 'Explain your terms in plain language.' },
      ],
      ctaTitle: 'Ready when you are.',
      ctaBody: 'One last line to invite people to take the next step.',
    },
  },
  store: {
    label: 'Online shop',
    description: 'Products, collections and delivery',
    brandName: 'Your shop',
    headline: 'Well made things, chosen with care.',
    subline: 'Introduce your shop and what makes your products worth owning.',
    ctaLabel: 'Shop the collection',
    heroLayout: 'split',
    sections: order(['hero', 'showcase', 'features', 'faq', 'cta', 'footer'], ['hero', 'showcase', 'features', 'steps', 'pricing', 'faq', 'cta', 'footer']),
    copy: {
      nav: ['Shop', 'About', 'Delivery'],
      eyebrow: 'New collection',
      featuresTitle: 'Why shop with us',
      features: [
        { title: 'Considered materials', body: 'Say where your products come from and how they are made.' },
        { title: 'Delivery and returns', body: 'Set out delivery times and your returns policy clearly.' },
        { title: 'Secure checkout', body: 'Name the payment methods you accept.' },
      ],
      showcaseTitle: 'Featured collection',
      showcaseBody: 'A small edit of the pieces you want people to see first.',
      showcaseItems: [
        { title: 'Product name', meta: 'Your price' },
        { title: 'Product name', meta: 'Your price' },
        { title: 'Product name', meta: 'Your price' },
      ],
      stepsTitle: 'How ordering works',
      steps: [
        { title: 'Choose', body: 'Browse the collection and pick what you like.' },
        { title: 'Order', body: 'Check out securely in a few steps.' },
        { title: 'Receive', body: 'Say how and when orders arrive.' },
      ],
      pricingTitle: 'Memberships',
      tiers: pricingTiers,
      faqTitle: 'Questions',
      faq: [
        { q: 'How long does delivery take?', a: 'Give delivery times for each area you serve.' },
        { q: 'What is your returns policy?', a: 'Explain how and when people can return an item.' },
        { q: 'Which payment methods do you accept?', a: 'List the options available at checkout.' },
      ],
      ctaTitle: 'Find something you will keep.',
      ctaBody: 'Invite people to browse the full collection.',
    },
  },
  portfolio: {
    label: 'Studio portfolio',
    description: 'Creative work and services',
    brandName: 'Your studio',
    headline: 'Selected work, made with care.',
    subline: 'A line about your practice: what you make, who you make it for and how you work.',
    ctaLabel: 'Start a project',
    heroLayout: 'editorial',
    sections: order(['hero', 'showcase', 'steps', 'cta', 'footer'], ['hero', 'showcase', 'steps', 'features', 'pricing', 'faq', 'cta', 'footer']),
    copy: {
      nav: ['Work', 'About', 'Contact'],
      eyebrow: 'Design and direction',
      featuresTitle: 'What we do',
      features: [
        { title: 'First discipline', body: 'Describe the work you do most often.' },
        { title: 'Second discipline', body: 'Add a related service clients ask for.' },
        { title: 'Third discipline', body: 'Round off with how you support clients after launch.' },
      ],
      showcaseTitle: 'Selected work',
      showcaseBody: 'Three projects that show your range. Lead with your strongest.',
      showcaseItems: [
        { title: 'Project name', meta: 'Discipline' },
        { title: 'Project name', meta: 'Discipline' },
        { title: 'Project name', meta: 'Discipline' },
      ],
      stepsTitle: 'How we work',
      steps: [
        { title: 'Brief', body: 'We listen, ask questions and agree the goal.' },
        { title: 'Make', body: 'We explore, refine and share work as it develops.' },
        { title: 'Deliver', body: 'We hand over everything you need to use it well.' },
      ],
      pricingTitle: 'Ways to work together',
      tiers: pricingTiers,
      faqTitle: 'Questions',
      faq: [
        { q: 'What size of project do you take on?', a: 'Describe the projects you are best suited to.' },
        { q: 'How do you charge?', a: 'Explain whether you quote per project or by time.' },
        { q: 'When can you start?', a: 'Share how far ahead you usually book.' },
      ],
      ctaTitle: 'Have a project in mind?',
      ctaBody: 'Tell people how to get in touch and what to include.',
    },
  },
  app: {
    label: 'Mobile app',
    description: 'An app for iOS and Android',
    brandName: 'Your app',
    headline: 'The one job your app does best, in a sentence.',
    subline: 'Describe who uses it and what changes for them once they do.',
    ctaLabel: 'Download the app',
    heroLayout: 'split',
    sections: order(['hero', 'features', 'steps', 'showcase', 'faq', 'cta', 'footer'], ['hero', 'features', 'steps', 'showcase', 'pricing', 'faq', 'cta', 'footer']),
    copy: {
      nav: ['Features', 'How it works', 'Questions'],
      eyebrow: 'Available on iOS and Android',
      featuresTitle: 'Made for everyday use',
      features: [
        { title: 'The main feature', body: 'What people open the app for, in one or two lines.' },
        { title: 'A helpful extra', body: 'Something that saves time or removes a hassle.' },
        { title: 'Privacy and control', body: 'Explain plainly how you handle people’s data.' },
      ],
      showcaseTitle: 'A closer look',
      showcaseBody: 'Show real screens from the app. Three is usually enough.',
      showcaseItems: [
        { title: 'Home', meta: 'Add a screen' },
        { title: 'Main task', meta: 'Add a screen' },
        { title: 'Settings', meta: 'Add a screen' },
      ],
      stepsTitle: 'Get going in three steps',
      steps: [
        { title: 'Download', body: 'Get the app from your app store.' },
        { title: 'Set up', body: 'Say what people need to do first.' },
        { title: 'Use it daily', body: 'Describe the habit the app supports.' },
      ],
      pricingTitle: 'Plans',
      tiers: pricingTiers,
      faqTitle: 'Questions',
      faq: [
        { q: 'Which phones does it work on?', a: 'List the supported platforms and versions.' },
        { q: 'Is it free?', a: 'Explain what is free and what is paid.' },
        { q: 'How is my data handled?', a: 'Summarise your privacy approach and link to the policy.' },
      ],
      ctaTitle: 'Try it today.',
      ctaBody: 'A final nudge, with links to the app stores.',
    },
  },
}

/* ── Defaults ───────────────────────────────────────────────────────── */

export function stateFromTemplate(key: TemplateKey, look?: Partial<StudioState>): StudioState {
  const t = templates[key]
  return {
    v: 1,
    template: key,
    brandName: t.brandName,
    headline: t.headline,
    subline: t.subline,
    ctaLabel: t.ctaLabel,
    heroLayout: t.heroLayout,
    palette: look?.palette ?? 'noir',
    accent: look?.accent ?? null,
    font: look?.font ?? 'grotesque',
    radius: look?.radius ?? 16,
    density: look?.density ?? 'comfortable',
    sections: t.sections.map((s) => ({ ...s })),
  }
}

export const defaultState: StudioState = stateFromTemplate('launch')

export const limits = { brandName: 40, headline: 120, subline: 240, ctaLabel: 30 }

/* ── Colour helpers ─────────────────────────────────────────────────── */

function luminance(hex: string): number {
  const h = hex.replace('#', '')
  const [r, g, b] = [0, 2, 4].map((i) => {
    const v = parseInt(h.slice(i, i + 2), 16) / 255
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function contrast(a: string, b: string): number {
  const x = luminance(a)
  const y = luminance(b)
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)
}

export function withAlpha(hex: string, alpha: number): string {
  const h = hex.replace('#', '')
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16))
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const HEX_RE = /^#[0-9a-fA-F]{6}$/

export type Theme = Palette & {
  /** Accent safe to use as text on the background (falls back to text colour) */
  accentText: string
}

export function resolveTheme(state: StudioState): Theme {
  const base = palettes[state.palette]
  const accent = state.accent && HEX_RE.test(state.accent) ? state.accent : base.accent
  const onAccent = contrast('#FFFFFF', accent) >= contrast('#0B0B0E', accent) ? '#FFFFFF' : '#0B0B0E'
  const accentText = contrast(accent, base.bg) >= 4.5 ? accent : base.text
  return { ...base, accent, onAccent: state.accent ? onAccent : base.onAccent, accentText }
}

/* ── Share link encoding ────────────────────────────────────────────── */

export function encodeState(state: StudioState): string {
  const bytes = new TextEncoder().encode(JSON.stringify(state))
  let bin = ''
  bytes.forEach((b) => (bin += String.fromCharCode(b)))
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

const pick = <T extends string | number>(value: unknown, allowed: readonly T[], fallback: T): T =>
  allowed.includes(value as T) ? (value as T) : fallback

const text = (value: unknown, max: number, fallback: string): string =>
  typeof value === 'string' && value.trim() ? value.slice(0, max) : fallback

/** Decode and validate a share token. Returns null if anything is unusable. */
export function decodeState(token: string): StudioState | null {
  try {
    const b64 = token.replace(/-/g, '+').replace(/_/g, '/')
    const bin = atob(b64 + '='.repeat((4 - (b64.length % 4)) % 4))
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0))
    const raw = JSON.parse(new TextDecoder().decode(bytes)) as Record<string, unknown>
    if (!raw || typeof raw !== 'object') return null

    const template = pick(raw.template, Object.keys(templates) as TemplateKey[], 'launch')
    const base = stateFromTemplate(template)

    const seen = new Set<SectionId>()
    const sections: SectionEntry[] = []
    const rawSections = Array.isArray(raw.sections) && raw.sections.length > 0 ? raw.sections : base.sections
    {
      for (const s of rawSections as { id?: unknown; on?: unknown }[]) {
        const id = pick(s?.id, ALL_SECTIONS, 'hero')
        if (s?.id !== id || seen.has(id)) continue
        seen.add(id)
        sections.push({ id, on: id === 'hero' ? true : Boolean(s.on) })
      }
    }
    for (const s of base.sections) if (!seen.has(s.id)) sections.push({ id: s.id, on: false })
    // Hero always first and always on
    const hero = sections.findIndex((s) => s.id === 'hero')
    sections.unshift(...sections.splice(hero, 1))
    sections[0].on = true

    return {
      v: 1,
      template,
      brandName: text(raw.brandName, limits.brandName, base.brandName),
      headline: text(raw.headline, limits.headline, base.headline),
      subline: text(raw.subline, limits.subline, base.subline),
      ctaLabel: text(raw.ctaLabel, limits.ctaLabel, base.ctaLabel),
      heroLayout: pick(raw.heroLayout, heroLayouts.map((h) => h.value), base.heroLayout),
      palette: pick(raw.palette, Object.keys(palettes) as PaletteKey[], base.palette),
      accent: typeof raw.accent === 'string' && HEX_RE.test(raw.accent) ? raw.accent : null,
      font: pick(raw.font, Object.keys(fonts) as FontKey[], base.font),
      radius: pick(raw.radius, radii.map((r) => r.value), base.radius),
      density: pick(raw.density, densities.map((d) => d.value), base.density),
      sections,
    }
  } catch {
    return null
  }
}

/* ── Brief for the contact form ─────────────────────────────────────── */

export function briefFrom(state: StudioState): string {
  const radius = radii.find((r) => r.value === state.radius)?.label.toLowerCase()
  const layout = heroLayouts.find((h) => h.value === state.heroLayout)?.label.toLowerCase()
  const sections = state.sections
    .filter((s) => s.on)
    .map((s) => sectionLabels[s.id].toLowerCase())
    .join(', ')
  const brief =
    `Studio brief: ${templates[state.template].label.toLowerCase()} website for "${state.brandName}". ` +
    `Headline: ${state.headline.trim().replace(/[.!?]*$/, '.')} ` +
    `Look: ${palettes[state.palette].label} palette${state.accent ? ` with accent ${state.accent}` : ''}, ` +
    `${fonts[state.font].label.toLowerCase()} type, ${radius} corners, ${state.density} spacing, ${layout} hero. ` +
    `Sections: ${sections}.`
  return brief.length > 500 ? `${brief.slice(0, 497)}...` : brief
}

export function randomLook(current: StudioState): Partial<StudioState> {
  const choose = <T,>(list: readonly T[], not?: T): T => {
    const options = list.filter((x) => x !== not)
    return options[Math.floor(Math.random() * options.length)]
  }
  return {
    palette: choose(Object.keys(palettes) as PaletteKey[], current.palette),
    font: choose(Object.keys(fonts) as FontKey[], current.font),
    radius: choose(radii.map((r) => r.value)),
    heroLayout: choose(heroLayouts.map((h) => h.value)),
    accent: null,
  }
}

export function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'website'
  )
}
