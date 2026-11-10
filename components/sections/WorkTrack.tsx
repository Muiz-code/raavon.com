'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Device, { ExampleDataNote } from '@/components/projects/Device'
import { kindLabel, type TrackItem } from '@/content/projects'
import { gsap, MOTION, useGSAP } from '@/lib/gsap'

/**
 * Selected work as a horizontal track. On tablet and desktop the section
 * pins and vertical scrolling moves the track sideways, one panel per
 * featured project, with a scrubbed progress line and counter. On phones,
 * or with reduced motion, panels simply stack.
 */
export default function WorkTrack({ items }: { items: TrackItem[] }) {
  const section = useRef<HTMLElement>(null)
  const viewport = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const progress = useRef<HTMLDivElement>(null)
  const counter = useRef<HTMLSpanElement>(null)
  const total = items.length

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION.desktopOk, () => {
        const t = track.current
        const v = viewport.current
        if (!t || !v) return
        const distance = () => Math.max(0, t.scrollWidth - v.clientWidth)

        const tween = gsap.to(t, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section.current,
            pin: true,
            start: 'top top',
            end: () => `+=${distance()}`,
            scrub: 0.8,
            invalidateOnRefresh: true,
            snap: total > 1 ? { snapTo: 1 / (total - 1), duration: { min: 0.2, max: 0.6 }, ease: 'power2.inOut' } : undefined,
            onUpdate: (self) => {
              gsap.set(progress.current, { scaleX: self.progress })
              if (counter.current) {
                const n = Math.min(total, Math.round(self.progress * (total - 1)) + 1)
                counter.current.textContent = String(n).padStart(2, '0')
              }
            },
          },
        })

        // Media drifts against the track, and the phone a little faster, for depth
        gsap.utils.toArray<HTMLElement>('[data-track-media]', t).forEach((media) => {
          const st = { trigger: media, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true }
          gsap.fromTo(media, { xPercent: 5 }, { xPercent: -5, ease: 'none', scrollTrigger: st })
          const phone = media.querySelector('[data-track-phone]')
          if (phone) gsap.fromTo(phone, { yPercent: 10 }, { yPercent: -10, ease: 'none', scrollTrigger: st })
        })
      })
    },
    { scope: section },
  )

  return (
    <section
      ref={section}
      id="work"
      aria-labelledby="work-title"
      className="surface-noir relative overflow-hidden md:flex md:h-svh md:flex-col"
    >
      <div className="container-site flex flex-col gap-6 pb-10 pt-24 md:flex-row md:items-end md:justify-between md:pb-6 md:pt-28">
        <div>
          <p className="eyebrow reveal">Selected work</p>
          <h2 id="work-title" className="display-l reveal mt-4 max-w-3xl">
            Products we have designed and built.
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <p className="tabular hidden text-sm font-semibold text-soft md:block" aria-hidden="true">
            <span ref={counter} className="text-cream">
              01
            </span>{' '}
            / {String(total).padStart(2, '0')}
          </p>
          <Link href="/work" className="btn btn-secondary" data-cursor="View">
            All work
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div ref={viewport} className="md:min-h-0 md:flex-1 md:overflow-hidden">
        <div
          ref={track}
          className="container-site flex flex-col gap-24 pb-20 md:h-full md:w-max md:max-w-none md:flex-row md:gap-16 md:pb-0 md:pr-[8vw]"
        >
          {items.map(({ project, desktop, phone }, i) => (
            <article
              key={project.slug}
              aria-labelledby={`track-${project.slug}`}
              className="grid items-center gap-10 md:h-full md:w-[min(86vw,82rem)] md:shrink-0 md:grid-cols-12 md:gap-10"
            >
              <div className="md:col-span-4">
                <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="tabular text-soft">{String(i + 1).padStart(2, '0')}</span>
                  {kindLabel[project.kind]}
                  <span className="text-soft">· {project.sector}</span>
                </p>
                <h3 id={`track-${project.slug}`} className="display-m mt-4 md:text-[clamp(2rem,1.2rem+1.8vw,3.25rem)]">
                  {project.name}
                </h3>
                <p className="mt-3 text-lg font-semibold">{project.tagline}</p>
                <p className="mt-4 text-soft">{project.summary}</p>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label="What we built">
                  {project.surfaces.map((s) => (
                    <li key={s.id} className="rounded-full border border-(--line-strong) px-3 py-1 text-sm">
                      {s.name}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <span className="status">{project.stage}</span>
                  <Link href={`/work/${project.slug}`} className="arrow-link" data-cursor="View">
                    View project
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <Link
                href={`/work/${project.slug}`}
                data-track-media
                data-cursor="View"
                tabIndex={-1}
                aria-hidden="true"
                className="relative block md:col-span-8"
              >
                {desktop ? (
                  <>
                    <Device screen={desktop} sizes="(min-width: 768px) 56vw, 92vw" decorative className="md:mr-[9%]" />
                    {phone && (
                      <div data-track-phone className="absolute -bottom-6 right-0 w-[24%] max-w-[13rem]">
                        <Device screen={phone} sizes="(min-width: 768px) 13vw, 24vw" decorative />
                      </div>
                    )}
                    <p className="mt-5 flex flex-wrap justify-between gap-2 text-sm text-soft">
                      <span>{desktop.caption}</span>
                      <ExampleDataNote screen={desktop} />
                    </p>
                  </>
                ) : (
                  phone && <Device screen={phone} sizes="40vw" decorative className="mx-auto w-[42%] max-w-[17rem]" />
                )}
              </Link>
            </article>
          ))}
        </div>
      </div>

      <div aria-hidden="true" className="container-site hidden pb-8 pt-8 md:block">
        <div className="h-px bg-(--line)">
          <div ref={progress} className="h-px origin-left bg-gold" style={{ transform: 'scaleX(0)' }} />
        </div>
      </div>
    </section>
  )
}
