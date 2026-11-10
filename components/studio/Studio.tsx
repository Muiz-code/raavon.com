'use client'

import { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Link as LinkIcon,
  Monitor,
  RotateCcw,
  Shuffle,
  Smartphone,
  Tablet,
} from 'lucide-react'
import Preview from './Preview'
import {
  briefFrom,
  decodeState,
  defaultState,
  densities,
  devices,
  encodeState,
  fonts,
  heroLayouts,
  limits,
  palettes,
  radii,
  randomLook,
  resolveTheme,
  sectionLabels,
  slugify,
  stateFromTemplate,
  templates,
  type Device,
  type FontKey,
  type PaletteKey,
  type StudioState,
  type TemplateKey,
} from './presets'

/* ── Client-only helpers ────────────────────────────────────────────── */

const noopSubscribe = () => () => {}

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}

function readHashState(): StudioState {
  const match = window.location.hash.match(/[#&]s=([A-Za-z0-9_-]+)/)
  return (match && decodeState(match[1])) || defaultState
}

/* ── Entry: render the builder only in the browser ──────────────────── */

export default function Studio() {
  // The share link lives in the URL hash, which the server cannot see.
  // Render a placeholder on the server, then the builder once mounted.
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false)
  if (!mounted) {
    return (
      <div aria-busy="true" className="flex min-h-[60vh] items-center justify-center rounded-2xl border border-(--line-strong) text-soft">
        Loading the Studio
      </div>
    )
  }
  return <Builder />
}

/* ── Builder ────────────────────────────────────────────────────────── */

function Builder() {
  const [state, setState] = useState<StudioState>(readHashState)
  const [device, setDevice] = useState<Device>('desktop')
  const [status, setStatus] = useState('')
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false,
  )

  const update = (patch: Partial<StudioState>) => setState((s) => ({ ...s, ...patch }))

  const moveSection = (index: number, dir: -1 | 1) =>
    setState((s) => {
      const next = [...s.sections]
      const target = index + dir
      if (target < 1 || target >= next.length || index < 1) return s
      ;[next[index], next[target]] = [next[target], next[index]]
      return { ...s, sections: next }
    })

  const toggleSection = (index: number, on: boolean) =>
    setState((s) => ({ ...s, sections: s.sections.map((sec, i) => (i === index ? { ...sec, on } : sec)) }))

  async function copyShareLink() {
    const url = `${window.location.origin}${window.location.pathname}#s=${encodeState(state)}`
    window.history.replaceState(null, '', url)
    try {
      await navigator.clipboard.writeText(url)
      setStatus('Link copied. Anyone with it will see this design.')
    } catch {
      setStatus('We could not copy the link automatically. It is now in your address bar, ready to copy.')
    }
  }

  function reset() {
    setState(defaultState)
    setDevice('desktop')
    window.history.replaceState(null, '', window.location.pathname)
    setStatus('Reset to the starting design.')
  }

  function surprise() {
    setState((s) => ({ ...s, ...randomLook(s) }))
    setStatus('New look applied.')
  }

  const brief = briefFrom(state)
  const contactHref = `/contact?type=new-product&brief=${encodeURIComponent(brief)}`
  const theme = resolveTheme(state)

  return (
    <div className="grid gap-10 lg:grid-cols-[23rem_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[25rem_minmax(0,1fr)]">
      {/* Controls */}
      <div className="lg:sticky lg:top-24 lg:max-h-[calc(100svh-7rem)] lg:self-start lg:overflow-y-auto lg:pr-3">
        <div className="flex flex-col gap-10 pb-4">
          <Group title="Start from">
            <p className="-mt-2 mb-4 text-sm text-soft">Choosing a starting point replaces the words and sections.</p>
            <RadioCards
              legend="Starting point"
              hideLegend
              name="template"
              value={state.template}
              columns={2}
              options={(Object.keys(templates) as TemplateKey[]).map((k) => ({
                value: k,
                label: templates[k].label,
                hint: templates[k].description,
              }))}
              onChange={(k) => setState((s) => stateFromTemplate(k, s))}
            />
          </Group>

          <Group title="Words">
            <div className="flex flex-col gap-5">
              <TextField label="Brand name" value={state.brandName} max={limits.brandName} onChange={(v) => update({ brandName: v })} />
              <TextField label="Headline" value={state.headline} max={limits.headline} multiline onChange={(v) => update({ headline: v })} />
              <TextField label="Supporting line" value={state.subline} max={limits.subline} multiline onChange={(v) => update({ subline: v })} />
              <TextField label="Button label" value={state.ctaLabel} max={limits.ctaLabel} onChange={(v) => update({ ctaLabel: v })} />
            </div>
          </Group>

          <Group title="Look">
            <div className="flex flex-col gap-6">
              <PaletteField value={state.palette} onChange={(p) => update({ palette: p, accent: null })} />
              <AccentField
                value={state.accent}
                fallback={palettes[state.palette].accent}
                onChange={(accent) => update({ accent })}
              />
              <FontField value={state.font} onChange={(font) => update({ font })} />
              <RadioCards
                legend="Corners"
                name="radius"
                value={state.radius}
                columns={4}
                compact
                options={radii.map((r) => ({ value: r.value, label: r.label }))}
                onChange={(radius) => update({ radius })}
              />
              <RadioCards
                legend="Spacing"
                name="density"
                value={state.density}
                columns={2}
                compact
                options={densities.map((d) => ({ value: d.value, label: d.label }))}
                onChange={(density) => update({ density })}
              />
              <RadioCards
                legend="Hero layout"
                name="heroLayout"
                value={state.heroLayout}
                columns={3}
                compact
                options={heroLayouts.map((h) => ({ value: h.value, label: h.label }))}
                onChange={(heroLayout) => update({ heroLayout })}
              />
            </div>
          </Group>

          <Group title="Sections">
            <p className="-mt-2 mb-4 text-sm text-soft">Turn sections on or off and change their order. The hero always comes first.</p>
            <ol className="flex flex-col border-t border-(--line-strong)">
              {state.sections.map((sec, i) => {
                const label = sectionLabels[sec.id]
                const isHero = sec.id === 'hero'
                return (
                  <li key={sec.id} className="flex items-center gap-2 border-b border-(--line-strong) py-1.5">
                    <label className="flex min-h-12 flex-1 cursor-pointer items-center gap-3 font-semibold">
                      <input
                        type="checkbox"
                        className="size-5 accent-burgundy"
                        checked={sec.on}
                        disabled={isHero}
                        onChange={(e) => toggleSection(i, e.target.checked)}
                      />
                      {label}
                      {isHero && <span className="text-sm font-normal text-soft">Always on</span>}
                    </label>
                    <button
                      type="button"
                      className="inline-flex size-12 items-center justify-center rounded-lg text-noir hover:bg-cream-raised disabled:opacity-30"
                      aria-label={`Move ${label} up`}
                      disabled={isHero || i <= 1}
                      onClick={() => moveSection(i, -1)}
                    >
                      <ArrowUp size={18} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className="inline-flex size-12 items-center justify-center rounded-lg text-noir hover:bg-cream-raised disabled:opacity-30"
                      aria-label={`Move ${label} down`}
                      disabled={isHero || i === state.sections.length - 1}
                      onClick={() => moveSection(i, 1)}
                    >
                      <ArrowDown size={18} aria-hidden="true" />
                    </button>
                  </li>
                )
              })}
            </ol>
          </Group>

          <Group title="Screen">
            <RadioCards
              legend="Preview screen size"
              hideLegend
              name="device"
              value={device}
              columns={3}
              compact
              options={devices.map((d) => ({
                value: d.value,
                label: d.label,
                icon: d.value === 'desktop' ? <Monitor size={17} aria-hidden="true" /> : d.value === 'tablet' ? <Tablet size={17} aria-hidden="true" /> : <Smartphone size={17} aria-hidden="true" />,
              }))}
              onChange={setDevice}
            />
          </Group>
        </div>
      </div>

      {/* Preview and actions */}
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className="btn btn-secondary" onClick={surprise}>
            <Shuffle size={17} aria-hidden="true" />
            Surprise me
          </button>
          <button type="button" className="btn btn-secondary" onClick={copyShareLink}>
            <LinkIcon size={17} aria-hidden="true" />
            Copy share link
          </button>
          <button type="button" className="btn text-burgundy underline underline-offset-4 hover:bg-cream-raised" onClick={reset}>
            <RotateCcw size={17} aria-hidden="true" />
            Reset
          </button>
        </div>
        <p role="status" aria-live="polite" className="mt-3 min-h-6 text-sm font-semibold">
          {status}
        </p>

        <PreviewFrame state={state} device={device} reducedMotion={reducedMotion} />

        <div className="mt-8 flex flex-col gap-5 rounded-2xl bg-noir p-7 text-cream sm:flex-row sm:items-center sm:justify-between sm:p-9">
          <div className="max-w-xl">
            <p className="text-xl font-extrabold tracking-[-0.01em]">Like where this is going?</p>
            <p className="mt-2 text-mist">
              Send this setup to us as a brief. We will use it as a starting point for a conversation about your real
              website.
            </p>
          </div>
          <Link href={contactHref} className="btn btn-primary shrink-0 self-start sm:self-auto">
            Build this with us
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>

        <p className="mt-4 text-sm text-soft">
          The Studio is a playground for ideas. Placeholder text and shapes stand in for your real content and imagery.
          Current accent: <span className="font-semibold text-noir">{theme.accent}</span>.
        </p>
      </div>
    </div>
  )
}

/* ── Preview frame with scaling ─────────────────────────────────────── */

function PreviewFrame({ state, device, reducedMotion }: { state: StudioState; device: Device; reducedMotion: boolean }) {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [available, setAvailable] = useState(0)
  const [contentHeight, setContentHeight] = useState(0)
  const width = devices.find((d) => d.value === device)!.width

  useEffect(() => {
    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner) return
    const ro = new ResizeObserver(() => {
      setAvailable(outer.clientWidth)
      setContentHeight(inner.offsetHeight)
    })
    ro.observe(outer)
    ro.observe(inner)
    return () => ro.disconnect()
  }, [])

  const scale = available ? Math.min(1, (available - 2) / width) : 1
  const host = `${slugify(state.brandName).replace(/-/g, '')}.com`

  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-(--line-strong) bg-cream-raised">
      <div className="flex items-center gap-3 border-b border-(--line-strong) px-4 py-3">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-(--line-strong)" />
          <span className="size-2.5 rounded-full bg-(--line-strong)" />
          <span className="size-2.5 rounded-full bg-(--line-strong)" />
        </span>
        <span className="truncate rounded-md bg-cream px-3 py-1 text-sm text-soft">{host}</span>
        <span className="ml-auto shrink-0 text-sm text-soft tabular">
          {width}px{scale < 1 ? `, shown at ${Math.round(scale * 100)}%` : ''}
        </span>
      </div>
      <div
        ref={outerRef}
        role="region"
        aria-label={`Website preview, ${device} size`}
        tabIndex={0}
        className="max-h-[78svh] overflow-y-auto overflow-x-hidden p-px"
      >
        <div style={{ position: 'relative', width: width * scale, height: contentHeight * scale, margin: '0 auto' }}>
          <div
            ref={innerRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
          >
            <Preview state={state} device={device} reducedMotion={reducedMotion} />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Form pieces ────────────────────────────────────────────────────── */

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  const id = useId()
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="eyebrow mb-4">
        {title}
      </h2>
      {children}
    </section>
  )
}

function TextField({
  label,
  value,
  max,
  multiline,
  onChange,
}: {
  label: string
  value: string
  max: number
  multiline?: boolean
  onChange: (v: string) => void
}) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      {multiline ? (
        <textarea id={id} rows={2} className="field resize-y" maxLength={max} value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input id={id} className="field" maxLength={max} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  )
}

type Option<T> = { value: T; label: string; hint?: string; icon?: React.ReactNode }

function RadioCards<T extends string | number>({
  legend,
  hideLegend,
  name,
  value,
  options,
  columns,
  compact,
  onChange,
}: {
  legend: string
  hideLegend?: boolean
  name: string
  value: T
  options: Option<T>[]
  columns: number
  compact?: boolean
  onChange: (v: T) => void
}) {
  const id = useId()
  return (
    <fieldset>
      <legend className={hideLegend ? 'sr-only' : 'field-label'}>{legend}</legend>
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
        {options.map((o) => (
          <label
            key={String(o.value)}
            className={`flex min-h-12 cursor-pointer rounded-lg border border-(--line-strong) bg-(--surface-raised) transition-colors hover:border-noir has-checked:border-noir has-checked:bg-noir has-checked:text-cream has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-burgundy ${
              compact ? 'items-center justify-center gap-2 px-2 text-center text-sm font-semibold' : 'flex-col justify-center px-4 py-3'
            }`}
          >
            <input
              type="radio"
              className="sr-only"
              name={`${id}-${name}`}
              value={String(o.value)}
              checked={o.value === value}
              onChange={() => onChange(o.value)}
            />
            {o.icon}
            <span className={compact ? undefined : 'font-semibold'}>{o.label}</span>
            {o.hint && <span className="mt-0.5 text-sm opacity-75">{o.hint}</span>}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

function PaletteField({ value, onChange }: { value: PaletteKey; onChange: (p: PaletteKey) => void }) {
  const id = useId()
  return (
    <fieldset>
      <legend className="field-label">Palette</legend>
      <div className="grid grid-cols-2 gap-2">
        {(Object.keys(palettes) as PaletteKey[]).map((key) => {
          const p = palettes[key]
          return (
            <label
              key={key}
              className="flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border border-(--line-strong) bg-(--surface-raised) px-3 py-2 text-sm font-semibold transition-colors hover:border-noir has-checked:border-2 has-checked:border-noir has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-burgundy"
            >
              <input type="radio" className="sr-only" name={`${id}-palette`} checked={value === key} onChange={() => onChange(key)} />
              <span aria-hidden="true" className="flex shrink-0 overflow-hidden rounded-full border border-(--line-strong)">
                <span className="size-5" style={{ background: p.bg }} />
                <span className="size-5" style={{ background: p.accent }} />
                <span className="size-5" style={{ background: p.text }} />
              </span>
              {p.label}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

function AccentField({
  value,
  fallback,
  onChange,
}: {
  value: string | null
  fallback: string
  onChange: (v: string | null) => void
}) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="field-label">
        Accent colour
      </label>
      <div className="flex items-center gap-3">
        <input
          id={id}
          type="color"
          className="h-12 w-16 cursor-pointer rounded-lg border border-(--line-strong) bg-(--surface-raised) p-1"
          value={(value ?? fallback).toLowerCase()}
          onChange={(e) => onChange(e.target.value)}
        />
        <span className="text-sm text-soft tabular">{(value ?? fallback).toUpperCase()}</span>
        <button type="button" className="btn ml-auto px-3 text-sm text-burgundy underline underline-offset-4 disabled:no-underline disabled:opacity-40" disabled={!value} onClick={() => onChange(null)}>
          Use palette accent
        </button>
      </div>
    </div>
  )
}

function FontField({ value, onChange }: { value: FontKey; onChange: (f: FontKey) => void }) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="field-label">
        Fonts
      </label>
      <select id={id} className="field" value={value} onChange={(e) => onChange(e.target.value as FontKey)}>
        {(Object.keys(fonts) as FontKey[]).map((k) => (
          <option key={k} value={k}>
            {fonts[k].label}: {fonts[k].description}
          </option>
        ))}
      </select>
    </div>
  )
}
