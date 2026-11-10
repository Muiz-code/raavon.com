import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import Device, { ExampleDataNote } from '@/components/projects/Device'
import ScreenTrack from '@/components/projects/ScreenTrack'
import CtaBand from '@/components/sections/CtaBand'
import { coverScreen, getProject, kindLabel, projects } from '@/content/projects'
import { pageMetadata } from '@/lib/metadata'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps<'/work/[slug]'>) {
  const { slug } = await params
  const p = getProject(slug)
  if (!p) return {}
  return pageMetadata({ title: p.name, description: `${p.tagline} ${p.summary}`, path: `/work/${p.slug}` })
}

const d = (ms: number) => ({ '--d': `${ms}ms` }) as React.CSSProperties

export default async function ProjectPage({ params }: PageProps<'/work/[slug]'>) {
  const { slug } = await params
  const p = getProject(slug)
  if (!p) notFound()

  const cover = coverScreen(p)
  const index = projects.indexOf(p)
  const next = projects[(index + 1) % projects.length]

  const facts = [
    p.client && { term: 'Client', detail: p.client },
    { term: 'Type', detail: kindLabel[p.kind] },
    { term: 'RaaVon’s role', detail: p.role },
    { term: 'Stage', detail: p.stage },
    { term: 'Platforms', detail: p.platforms.join(', ') },
  ].filter(Boolean) as { term: string; detail: string }[]

  const story = [
    { label: 'The problem', body: p.problem },
    p.approach && { label: 'Our approach', body: p.approach },
    p.result && { label: 'What changed', body: p.result },
  ].filter(Boolean) as { label: string; body: string }[]

  return (
    <>
      {/* Hero */}
      <section aria-labelledby="project-title" className="surface-noir relative overflow-hidden pt-32 md:pt-44">
        <div className="container-site">
          <Link href="/work" className="arrow-link hero-rise text-soft hover:text-cream">
            <ArrowLeft size={18} aria-hidden="true" />
            All work
          </Link>

          <div className="mt-10 grid gap-14 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow hero-rise flex flex-wrap gap-x-3" style={d(40)}>
                {kindLabel[p.kind]}
                <span className="text-soft">
                  · {p.sector} · {p.year}
                </span>
              </p>
              <h1 id="project-title" className="hero-rise mt-6" style={d(80)}>
                {p.logo ? (
                  <Image
                    src={p.logo.onDark}
                    alt={p.name}
                    width={p.logo.width}
                    height={p.logo.height}
                    priority
                    sizes="440px"
                    className="h-auto w-[min(70vw,27.5rem)]"
                  />
                ) : (
                  <span className="display-xl block">{p.name}</span>
                )}
              </h1>
              <p className="display-m hero-rise mt-8 max-w-3xl" style={d(160)}>
                {p.tagline}
              </p>
              <p className="lead hero-rise mt-6 max-w-2xl text-soft" style={d(240)}>
                {p.summary}
              </p>
              <div className="hero-rise mt-10 flex flex-col gap-3 sm:flex-row" style={d(320)}>
                {p.url && (
                  <a href={p.url} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                    Visit {new URL(p.url).hostname.replace(/^www\./, '')}
                    <ArrowUpRight size={18} aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
                <Link href="/contact?type=new-product" className="btn btn-primary">
                  Start a similar project
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <dl className="hero-rise grid gap-px overflow-hidden rounded-xl bg-(--line) sm:grid-cols-2 lg:col-span-5" style={d(380)}>
              {facts.map((f) => (
                <div key={f.term} className="bg-noir-raised p-5">
                  <dt className="text-sm text-soft">{f.term}</dt>
                  <dd className="mt-1 font-semibold">{f.detail}</dd>
                </div>
              ))}
            </dl>
          </div>

          {cover && (
            <figure className="relative mt-20 md:mt-28">
              <div data-parallax="8">
                <Device screen={cover} sizes="(min-width: 1280px) 1280px, 100vw" priority />
              </div>
              <figcaption className="mt-4 flex flex-wrap justify-between gap-2 pb-16 text-sm text-soft md:pb-24">
                <span>{cover.caption}</span>
                <ExampleDataNote screen={cover} />
              </figcaption>
            </figure>
          )}
        </div>
      </section>

      {/* Story */}
      <section aria-label="Project story" className="surface-cream section">
        <div className="container-site grid gap-14 md:grid-cols-3 md:gap-10">
          {story.map((s, i) => (
            <div key={s.label} className="reveal">
              <p className="tabular text-sm font-semibold text-burgundy">0{i + 1}</p>
              <h2 className="display-m mt-3">{s.label}</h2>
              <p className="mt-5 text-lg text-soft">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Surfaces */}
      {p.surfaces.map((s, i) => {
        // The cover is already shown in the hero, so it is not repeated here
        const desktops = s.screens.filter((x) => x.device === 'desktop' && x !== cover)
        const phones = s.screens.filter((x) => x.device === 'phone')
        return (
          <section
            key={s.id}
            id={s.id}
            aria-labelledby={`${s.id}-title`}
            className="surface-noir border-t border-(--line) py-20 md:py-28"
          >
            <div className="container-site grid gap-10 md:grid-cols-12">
              <div className="md:col-span-5">
                <p className="eyebrow reveal flex gap-3">
                  <span className="tabular text-soft">{String(i + 1).padStart(2, '0')}</span>
                  {s.audience}
                </p>
                <h2 id={`${s.id}-title`} className="display-l reveal mt-4">
                  {s.name}
                </h2>
              </div>
              <div className="md:col-span-6 md:col-start-7 md:pt-3">
                <p className="lead reveal text-soft">{s.summary}</p>
                <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
                  {s.features.map((f) => (
                    <li key={f} className="reveal flex items-baseline gap-3 border-t border-(--line) py-3">
                      <span aria-hidden="true" className="size-1.5 shrink-0 -translate-y-0.5 rounded-full bg-caramel" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {desktops.length > 1 && (
              <div className="mt-16">
                <ScreenTrack screens={desktops} label={`${s.name} screens`} />
              </div>
            )}
            {desktops.length === 1 && (
              <figure className="container-site reveal mt-16">
                <Device screen={desktops[0]} sizes="(min-width: 1280px) 1280px, 100vw" />
                <figcaption className="mt-4 flex flex-wrap justify-between gap-2 text-sm text-soft">
                  <span>{desktops[0].caption}</span>
                  <ExampleDataNote screen={desktops[0]} />
                </figcaption>
              </figure>
            )}
            {phones.length > 0 && (
              <ul className="container-site mt-16 flex flex-wrap items-end justify-center gap-8 md:gap-14" aria-label={`${s.name} on a phone`}>
                {phones.map((ph, j) => (
                  <li key={ph.src} className="reveal w-[min(72vw,17rem)]" data-parallax={j % 2 ? '14' : '6'}>
                    <figure>
                      <Device screen={ph} sizes="272px" />
                      <figcaption className="mt-4 text-center text-sm text-soft">{ph.caption}</figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )
      })}

      {/* Delivered, stack, stage */}
      <section aria-label="Delivery" className="surface-cream section">
        <div className="container-site grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 className="eyebrow reveal">What RaaVon delivered</h2>
            <ul className="mt-6 border-t border-(--line-strong)">
              {p.delivered.map((item, i) => (
                <li key={item} className="reveal flex gap-5 border-b border-(--line-strong) py-4 text-lg font-semibold">
                  <span className="tabular text-sm text-burgundy">{String(i + 1).padStart(2, '0')}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-12 lg:col-span-5 lg:col-start-8">
            <div className="reveal">
              <h2 className="eyebrow">Built with</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <li key={t} className="rounded-full border border-(--line-strong) px-3.5 py-1.5 text-sm font-semibold">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal">
              <h2 className="eyebrow">Where it stands</h2>
              <p className="mt-4 text-lg">{p.stageDetail}</p>
            </div>
            <div className="reveal">
              <h2 className="eyebrow">Verified outcomes</h2>
              {p.outcomes.length > 0 ? (
                <ul className="mt-4 list-disc space-y-2 pl-5">
                  {p.outcomes.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-soft">Not yet published. We report results once they are measured and verified.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Next project */}
      {next && next !== p && (
        <section aria-label="Next project" className="surface-cream border-t border-(--line-strong)">
          <Link href={`/work/${next.slug}`} className="group container-site flex flex-col gap-3 py-16 md:flex-row md:items-end md:justify-between md:py-24" data-cursor="Next">
            <span>
              <span className="eyebrow block">Next project</span>
              <span className="display-xl mt-4 block transition-colors group-hover:text-burgundy">{next.name}</span>
            </span>
            <span className="flex items-center gap-3 text-lg font-semibold">
              {next.tagline}
              <ArrowRight size={22} aria-hidden="true" className="shrink-0 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </section>
      )}

      <CtaBand />
    </>
  )
}
