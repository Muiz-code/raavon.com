import type { CSSProperties, ReactNode, Ref } from 'react'
import {
  fonts,
  resolveTheme,
  templates,
  withAlpha,
  type Device,
  type SectionId,
  type StudioState,
  type Theme,
} from './presets'

/**
 * The generated website preview, styled inline from the theme. It renders
 * lower-level headings and inert spans so it does not compete with the
 * Studio page's own structure. The preview cannot be downloaded or exported.
 */

type Props = {
  state: StudioState
  device: Device
  reducedMotion?: boolean
  ref?: Ref<HTMLDivElement>
}

const SIZES = {
  desktop: { pad: 64, hero: 72, heroEditorial: 104, h2: 44, body: 18, cols: 3, visual: 380 },
  tablet: { pad: 40, hero: 56, heroEditorial: 76, h2: 36, body: 17, cols: 3, visual: 320 },
  mobile: { pad: 20, hero: 40, heroEditorial: 48, h2: 30, body: 16, cols: 1, visual: 240 },
} as const

const SECTION_PAD = {
  comfortable: { desktop: 112, tablet: 88, mobile: 64 },
  compact: { desktop: 72, tablet: 56, mobile: 44 },
} as const

type Ctx = {
  t: Theme
  s: (typeof SIZES)[Device]
  device: Device
  r: number
  btnR: number
  sectionPad: number
  headingFont: string
  headingWeight: number
  labelFont: string
  tags: { h1: 'h3'; h2: 'h4'; h3: 'h5' }
  state: StudioState
}

/* ── Small render helpers (plain functions, not components) ─────────── */

function action(c: Ctx, label: string, variant: 'primary' | 'secondary' | 'inverse', key?: string): ReactNode {
  const base: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    padding: '0 24px',
    borderRadius: c.btnR,
    fontWeight: 600,
    fontSize: 16,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    border: '1px solid transparent',
  }
  const styles: Record<typeof variant, CSSProperties> = {
    primary: { ...base, background: c.t.accent, color: c.t.onAccent },
    secondary: { ...base, background: 'transparent', color: c.t.text, borderColor: withAlpha(c.t.text, 0.35) },
    inverse: { ...base, background: c.t.onAccent, color: c.t.accent },
  }
  return (
    <span key={key} style={styles[variant]}>
      {label}
    </span>
  )
}

function eyebrow(c: Ctx, text: string, align: CSSProperties['textAlign'] = 'left'): ReactNode {
  return (
    <p
      style={{
        margin: 0,
        fontFamily: c.labelFont,
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: c.t.accentText,
        textAlign: align,
      }}
    >
      {text}
    </p>
  )
}

function heading(c: Ctx, level: 'h1' | 'h2' | 'h3', text: string, size: number, extra?: CSSProperties): ReactNode {
  const Tag = c.tags[level]
  const serif = c.headingFont.includes('serif') && !c.headingFont.includes('sans-serif')
  return (
    <Tag
      style={{
        margin: 0,
        fontFamily: c.headingFont,
        fontWeight: c.headingWeight,
        fontSize: size,
        lineHeight: level === 'h3' ? 1.25 : 1.04,
        letterSpacing: serif ? '-0.01em' : '-0.025em',
        color: c.t.text,
        ...extra,
      }}
    >
      {text}
    </Tag>
  )
}

function para(c: Ctx, text: string, extra?: CSSProperties): ReactNode {
  return <p style={{ margin: 0, fontSize: c.s.body, lineHeight: 1.55, color: c.t.muted, ...extra }}>{text}</p>
}

function grid(c: Ctx, cols: number, gap: number, children: ReactNode, extra?: CSSProperties): ReactNode {
  return (
    <div data-stack="" style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap, ...extra }}>
      {children}
    </div>
  )
}

/** Abstract artwork built from simple shapes. No photos, no fake interfaces. */
function art(c: Ctx, variant: number, style?: CSSProperties): ReactNode {
  const { t } = c
  const box: CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    background: t.surface,
    border: `1px solid ${t.border}`,
    borderRadius: c.r * 1.25,
    ...style,
  }
  const abs = (s: CSSProperties): CSSProperties => ({ position: 'absolute', ...s })
  const dots: CSSProperties = {
    backgroundImage: `radial-gradient(${withAlpha(t.text, 0.18)} 1.2px, transparent 1.4px)`,
    backgroundSize: '18px 18px',
  }
  switch (variant % 4) {
    case 0:
      return (
        <div style={box} aria-hidden="true">
          <div style={abs({ inset: 0, ...dots })} />
          <div style={abs({ width: '62%', aspectRatio: '1', borderRadius: '50%', background: t.accent, right: '-14%', top: '12%' })} />
          <div style={abs({ width: '38%', aspectRatio: '1', borderRadius: '50%', border: `2px solid ${t.text}`, left: '10%', bottom: '-10%', opacity: 0.55 })} />
          <div style={abs({ width: '22%', aspectRatio: '1', background: t.text, left: '34%', top: '18%', borderRadius: c.r / 2, opacity: 0.9 })} />
        </div>
      )
    case 1:
      return (
        <div style={{ ...box, background: t.accent }} aria-hidden="true">
          <div style={abs({ width: '120%', aspectRatio: '1', borderRadius: '50%', background: withAlpha(t.onAccent, 0.12), left: '-10%', top: '45%' })} />
          <div style={abs({ width: '30%', aspectRatio: '1', borderRadius: '50%', background: t.onAccent, right: '14%', top: '16%' })} />
        </div>
      )
    case 2:
      return (
        <div style={box} aria-hidden="true">
          <div style={abs({ width: '70%', aspectRatio: '1', border: `2px solid ${withAlpha(t.text, 0.5)}`, borderRadius: '50%', left: '15%', top: '15%' })} />
          <div style={abs({ width: '34%', aspectRatio: '1', background: t.accent, left: '33%', top: '33%', transform: 'rotate(45deg)', borderRadius: c.r / 3 })} />
        </div>
      )
    default:
      return (
        <div style={{ ...box, background: t.text }} aria-hidden="true">
          <div style={abs({ inset: 0, backgroundImage: `radial-gradient(${withAlpha(t.bg, 0.25)} 1.2px, transparent 1.4px)`, backgroundSize: '16px 16px' })} />
          <div style={abs({ width: '56%', height: '56%', background: t.accent, left: '-8%', bottom: '-8%', borderRadius: `0 ${c.r * 2}px 0 0` })} />
          <div style={abs({ width: '26%', aspectRatio: '1', borderRadius: '50%', background: t.bg, right: '16%', top: '18%' })} />
        </div>
      )
  }
}

/** A phone silhouette holding abstract shapes, for the app template. */
function phoneArt(c: Ctx, height: number): ReactNode {
  const { t } = c
  const w = Math.round(height * 0.5)
  return (
    <div aria-hidden="true" style={{ position: 'relative', height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', width: height * 0.8, aspectRatio: '1', borderRadius: '50%', background: withAlpha(t.accent, 0.22) }} />
      <div
        style={{
          position: 'relative',
          width: w,
          height: height * 0.96,
          borderRadius: Math.max(24, c.r * 1.5),
          background: t.text,
          padding: 8,
          boxShadow: `0 30px 60px -30px ${withAlpha('#000000', 0.5)}`,
        }}
      >
        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: Math.max(18, c.r * 1.2), background: t.surface }}>
          <div style={{ position: 'absolute', left: '12%', right: '12%', top: '14%', height: '26%', borderRadius: c.r, background: t.accent }} />
          <div style={{ position: 'absolute', left: '12%', width: '34%', top: '46%', aspectRatio: '1', borderRadius: '50%', border: `2px solid ${withAlpha(t.text, 0.4)}` }} />
          <div style={{ position: 'absolute', right: '12%', width: '30%', top: '48%', aspectRatio: '1', borderRadius: c.r / 2, background: withAlpha(t.text, 0.12) }} />
          <div style={{ position: 'absolute', left: '12%', right: '12%', bottom: '8%', height: '12%', borderRadius: 999, background: withAlpha(t.text, 0.08) }} />
        </div>
      </div>
    </div>
  )
}

function container(c: Ctx, children: ReactNode, extra?: CSSProperties): ReactNode {
  return <div style={{ maxWidth: 1152, margin: '0 auto', padding: `0 ${c.s.pad}px`, ...extra }}>{children}</div>
}

/* ── Sections ───────────────────────────────────────────────────────── */

function nav(c: Ctx): ReactNode {
  const copy = templates[c.state.template].copy
  return (
    <header style={{ borderBottom: `1px solid ${c.t.border}` }}>
      {container(
        c,
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, minHeight: 76 }}>
          <span style={{ fontFamily: c.headingFont, fontWeight: c.headingWeight, fontSize: 22, color: c.t.text, letterSpacing: '-0.01em' }}>
            {c.state.brandName}
          </span>
          {c.device === 'mobile' ? (
            <span aria-hidden="true" style={{ display: 'grid', gap: 5, width: 24 }}>
              <span style={{ height: 2, background: c.t.text, borderRadius: 2 }} />
              <span style={{ height: 2, background: c.t.text, borderRadius: 2 }} />
              <span style={{ height: 2, background: c.t.text, borderRadius: 2 }} />
            </span>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
              {copy.nav.map((item) => (
                <span key={item} style={{ fontSize: 15, fontWeight: 600, color: c.t.muted }}>
                  {item}
                </span>
              ))}
              {action(c, c.state.ctaLabel, 'primary')}
            </div>
          )}
        </div>,
      )}
    </header>
  )
}

function hero(c: Ctx): ReactNode {
  const { state, s, device } = c
  const copy = templates[state.template].copy
  const visual = state.template === 'app' ? phoneArt(c, s.visual + 60) : art(c, 0, { height: s.visual })
  const buttons = (justify: CSSProperties['justifyContent']) => (
    <div data-row="" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: justify, marginTop: 36 }}>
      {action(c, state.ctaLabel, 'primary')}
      {action(c, 'Learn more', 'secondary')}
    </div>
  )

  if (state.heroLayout === 'split') {
    return (
      <section style={{ padding: `${c.sectionPad}px 0` }}>
        {container(
          c,
          grid(
            c,
            device === 'mobile' ? 1 : 2,
            device === 'mobile' ? 40 : 56,
            <>
              <div style={{ alignSelf: 'center' }}>
                {eyebrow(c, copy.eyebrow)}
                <div style={{ height: 20 }} />
                {heading(c, 'h1', state.headline, s.hero)}
                {para(c, state.subline, { marginTop: 24, fontSize: s.body + 2, maxWidth: 520 })}
                {buttons('flex-start')}
              </div>
              <div style={{ alignSelf: 'center' }}>{visual}</div>
            </>,
          ),
        )}
      </section>
    )
  }

  if (state.heroLayout === 'editorial') {
    return (
      <section style={{ padding: `${c.sectionPad}px 0 ${c.sectionPad * 0.75}px` }}>
        {container(
          c,
          <>
            {eyebrow(c, copy.eyebrow)}
            <div style={{ height: 28 }} />
            {heading(c, 'h1', state.headline, s.heroEditorial, { lineHeight: 0.98, maxWidth: 1040 })}
            <div
              data-row=""
              style={{
                display: 'flex',
                alignItems: device === 'mobile' ? 'flex-start' : 'flex-end',
                flexDirection: device === 'mobile' ? 'column' : 'row',
                justifyContent: 'space-between',
                gap: 32,
                marginTop: 48,
                paddingTop: 32,
                borderTop: `1px solid ${c.t.border}`,
              }}
            >
              {para(c, state.subline, { fontSize: s.body + 2, maxWidth: 520 })}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>{action(c, state.ctaLabel, 'primary')}</div>
            </div>
          </>,
        )}
      </section>
    )
  }

  return (
    <section style={{ padding: `${c.sectionPad}px 0` }}>
      {container(
        c,
        <>
          <div style={{ maxWidth: 880, margin: '0 auto', textAlign: 'center' }}>
            {eyebrow(c, copy.eyebrow, 'center')}
            <div style={{ height: 20 }} />
            {heading(c, 'h1', state.headline, s.hero)}
            {para(c, state.subline, { marginTop: 24, fontSize: s.body + 2, maxWidth: 620, marginLeft: 'auto', marginRight: 'auto' })}
            {buttons('center')}
          </div>
          <div style={{ marginTop: device === 'mobile' ? 48 : 72 }}>
            {state.template === 'app' ? phoneArt(c, s.visual + 60) : art(c, 0, { height: s.visual })}
          </div>
        </>,
      )}
    </section>
  )
}

function sectionHead(c: Ctx, label: string, title: string, body?: string): ReactNode {
  return (
    <div style={{ maxWidth: 720, marginBottom: c.device === 'mobile' ? 32 : 48 }}>
      {eyebrow(c, label)}
      <div style={{ height: 14 }} />
      {heading(c, 'h2', title, c.s.h2)}
      {body && para(c, body, { marginTop: 16 })}
    </div>
  )
}

function features(c: Ctx): ReactNode {
  const copy = templates[c.state.template].copy
  return (
    <section style={{ padding: `${c.sectionPad}px 0` }}>
      {container(
        c,
        <>
          {sectionHead(c, 'Features', copy.featuresTitle)}
          {grid(
            c,
            c.s.cols,
            20,
            copy.features.map((f, i) => (
              <div key={f.title + i} style={{ background: c.t.surface, border: `1px solid ${c.t.border}`, borderRadius: c.r, padding: 28 }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: Math.min(c.r, 20),
                    background: c.t.accent,
                    color: c.t.onAccent,
                    fontFamily: c.labelFont,
                    fontWeight: 700,
                    fontSize: 15,
                  }}
                >
                  {i + 1}
                </span>
                <div style={{ height: 20 }} />
                {heading(c, 'h3', f.title, 20)}
                {para(c, f.body, { marginTop: 10, fontSize: c.s.body - 1 })}
              </div>
            )),
          )}
        </>,
      )}
    </section>
  )
}

function showcase(c: Ctx): ReactNode {
  const copy = templates[c.state.template].copy
  return (
    <section style={{ padding: `${c.sectionPad}px 0`, background: c.t.surface, borderTop: `1px solid ${c.t.border}`, borderBottom: `1px solid ${c.t.border}` }}>
      {container(
        c,
        <>
          {sectionHead(c, 'Showcase', copy.showcaseTitle, copy.showcaseBody)}
          {grid(
            c,
            c.s.cols,
            24,
            copy.showcaseItems.map((item, i) => (
              <div key={item.title + i}>
                {art(c, i + 1, { aspectRatio: '4 / 5', background: i === 1 ? c.t.accent : c.t.bg })}
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginTop: 14 }}>
                  <span style={{ fontWeight: 600, color: c.t.text, fontSize: 16 }}>{item.title}</span>
                  <span style={{ color: c.t.muted, fontSize: 15 }}>{item.meta}</span>
                </div>
              </div>
            )),
          )}
        </>,
      )}
    </section>
  )
}

function steps(c: Ctx): ReactNode {
  const copy = templates[c.state.template].copy
  return (
    <section style={{ padding: `${c.sectionPad}px 0` }}>
      {container(
        c,
        <>
          {sectionHead(c, 'How it works', copy.stepsTitle)}
          {grid(
            c,
            c.s.cols,
            c.device === 'mobile' ? 28 : 40,
            copy.steps.map((st, i) => (
              <div key={st.title + i} style={{ borderTop: `2px solid ${c.t.text}`, paddingTop: 20 }}>
                <span style={{ fontFamily: c.headingFont, fontWeight: c.headingWeight, fontSize: 44, lineHeight: 1, color: c.t.accentText }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div style={{ height: 16 }} />
                {heading(c, 'h3', st.title, 20)}
                {para(c, st.body, { marginTop: 8, fontSize: c.s.body - 1 })}
              </div>
            )),
          )}
        </>,
      )}
    </section>
  )
}

function pricing(c: Ctx): ReactNode {
  const copy = templates[c.state.template].copy
  return (
    <section style={{ padding: `${c.sectionPad}px 0` }}>
      {container(
        c,
        <>
          {sectionHead(c, 'Pricing', copy.pricingTitle)}
          {grid(
            c,
            c.s.cols,
            20,
            copy.tiers.map((tier, i) => {
              const featured = i === 1
              return (
                <div
                  key={tier.name}
                  style={{
                    background: c.t.surface,
                    border: `${featured ? 2 : 1}px solid ${featured ? c.t.accent : c.t.border}`,
                    borderRadius: c.r,
                    padding: 28,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 18,
                  }}
                >
                  {heading(c, 'h3', tier.name, 20)}
                  <span style={{ fontFamily: c.headingFont, fontWeight: c.headingWeight, fontSize: 28, color: c.t.text }}>{tier.note}</span>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 10 }}>
                    {tier.items.map((item) => (
                      <li key={item} style={{ display: 'flex', gap: 10, alignItems: 'baseline', color: c.t.muted, fontSize: 15 }}>
                        <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: '50%', background: c.t.accent, flexShrink: 0, transform: 'translateY(-1px)' }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div style={{ marginTop: 'auto' }}>{action(c, featured ? c.state.ctaLabel : 'Choose plan', featured ? 'primary' : 'secondary')}</div>
                </div>
              )
            }),
          )}
        </>,
      )}
    </section>
  )
}

function faq(c: Ctx): ReactNode {
  const copy = templates[c.state.template].copy
  return (
    <section style={{ padding: `${c.sectionPad}px 0` }}>
      {container(
        c,
        <div data-stack="" style={{ display: 'grid', gridTemplateColumns: c.device === 'mobile' ? '1fr' : '1fr 1.4fr', gap: 40 }}>
          {sectionHead(c, 'Questions', copy.faqTitle)}
          <div style={{ borderTop: `1px solid ${c.t.border}` }}>
            {copy.faq.map((item, i) => (
              <details key={item.q} open={i === 0} style={{ borderBottom: `1px solid ${c.t.border}`, padding: '20px 0' }}>
                <summary style={{ cursor: 'pointer', fontWeight: 600, fontSize: c.s.body, color: c.t.text }}>{item.q}</summary>
                {para(c, item.a, { marginTop: 10 })}
              </details>
            ))}
          </div>
        </div>,
      )}
    </section>
  )
}

function cta(c: Ctx): ReactNode {
  const copy = templates[c.state.template].copy
  const mobile = c.device === 'mobile'
  return (
    <section style={{ padding: `${c.sectionPad * 0.6}px 0 ${c.sectionPad}px` }}>
      {container(
        c,
        <div
          data-row=""
          style={{
            position: 'relative',
            overflow: 'hidden',
            background: c.t.accent,
            borderRadius: c.r * 1.25,
            padding: mobile ? '40px 24px' : '64px 56px',
            display: 'flex',
            flexDirection: mobile ? 'column' : 'row',
            alignItems: mobile ? 'flex-start' : 'center',
            justifyContent: 'space-between',
            gap: 28,
          }}
        >
          <div aria-hidden="true" style={{ position: 'absolute', width: 320, height: 320, borderRadius: '50%', border: `2px solid ${withAlpha(c.t.onAccent, 0.18)}`, right: -80, top: -120 }} />
          <div style={{ position: 'relative', maxWidth: 560 }}>
            {heading(c, 'h2', copy.ctaTitle, c.s.h2 - 4, { color: c.t.onAccent })}
            <p style={{ margin: '12px 0 0', fontSize: c.s.body, lineHeight: 1.55, color: c.t.onAccent, opacity: 0.85 }}>{copy.ctaBody}</p>
          </div>
          <div style={{ position: 'relative' }}>{action(c, c.state.ctaLabel, 'inverse')}</div>
        </div>,
      )}
    </section>
  )
}

function footer(c: Ctx): ReactNode {
  const copy = templates[c.state.template].copy
  return (
    <footer style={{ borderTop: `1px solid ${c.t.border}`, padding: '40px 0' }}>
      {container(
        c,
        <div data-row="" style={{ display: 'flex', flexDirection: c.device === 'mobile' ? 'column' : 'row', justifyContent: 'space-between', gap: 20 }}>
          <span style={{ fontFamily: c.headingFont, fontWeight: c.headingWeight, fontSize: 20, color: c.t.text }}>{c.state.brandName}</span>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {copy.nav.map((item) => (
              <span key={item} style={{ color: c.t.muted, fontSize: 15 }}>
                {item}
              </span>
            ))}
          </div>
          <span style={{ color: c.t.muted, fontSize: 14 }}>
            © {new Date().getFullYear()} {c.state.brandName}
          </span>
        </div>,
      )}
    </footer>
  )
}

const RENDERERS: Record<SectionId, (c: Ctx) => ReactNode> = {
  hero,
  features,
  showcase,
  steps,
  pricing,
  faq,
  cta,
  footer,
}

/* ── Preview ────────────────────────────────────────────────────────── */

export default function Preview({ state, device, reducedMotion = false, ref }: Props) {
  const t = resolveTheme(state)
  const pairing = fonts[state.font]
  const c: Ctx = {
    t,
    s: SIZES[device],
    device,
    r: state.radius,
    btnR: state.radius === 28 ? 999 : state.radius,
    sectionPad: SECTION_PAD[state.density][device],
    headingFont: pairing.heading,
    headingWeight: pairing.headingWeight,
    labelFont: pairing.labelFont,
    tags: { h1: 'h3', h2: 'h4', h3: 'h5' },
    state,
  }

  // Only the exported file gets its own <main>; the Studio page already has one.
  const Main = 'div'

  return (
    <div
      ref={ref}
      data-studio-site=""
      style={{
        background: t.bg,
        color: t.text,
        fontFamily: pairing.body,
        fontSize: SIZES[device].body,
        lineHeight: 1.55,
        WebkitFontSmoothing: 'antialiased',
        transition: reducedMotion ? undefined : 'background-color 0.4s ease, color 0.4s ease',
      }}
    >
      {nav(c)}
      <Main>
        {state.sections
          .filter((s) => s.on && s.id !== 'footer')
          .map((s) => (
            <div key={s.id}>{RENDERERS[s.id](c)}</div>
          ))}
      </Main>
      {state.sections.find((s) => s.id === 'footer')?.on && footer(c)}
    </div>
  )
}
