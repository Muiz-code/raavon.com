'use client'

import { useRef } from 'react'
import Device, { ExampleDataNote } from '@/components/projects/Device'
import type { Screen } from '@/content/projects'
import { gsap, MOTION, useGSAP } from '@/lib/gsap'

/**
 * A run of desktop screenshots. On tablet and desktop it pins and scrolls
 * sideways with a scrubbed progress line; on phones or with reduced motion
 * the screens stack.
 */
export default function ScreenTrack({ screens, label }: { screens: Screen[]; label: string }) {
  const root = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLUListElement>(null)
  const bar = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION.desktopOk, () => {
        const t = track.current
        if (!t) return
        const distance = () => Math.max(0, t.scrollWidth - window.innerWidth)
        gsap.to(t, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            pin: true,
            start: 'center center',
            end: () => `+=${distance()}`,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => gsap.set(bar.current, { scaleX: self.progress }),
          },
        })
      })
    },
    { scope: root },
  )

  return (
    <div ref={root} className="overflow-hidden py-6">
      <ul
        ref={track}
        aria-label={label}
        className="container-site flex flex-col gap-12 md:w-max md:max-w-none md:flex-row md:gap-10 md:pr-[12vw]"
      >
        {screens.map((s) => (
          <li key={s.src} className="md:w-[min(72vw,68rem)] md:shrink-0">
            <figure>
              <Device screen={s} sizes="(min-width: 768px) 72vw, 92vw" />
              <figcaption className="mt-4 flex flex-wrap justify-between gap-2 text-sm text-soft">
                <span>{s.caption}</span>
                <ExampleDataNote screen={s} />
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <div aria-hidden="true" className="container-site mt-8 hidden md:block">
        <div className="h-px bg-(--line)">
          <div ref={bar} className="h-px origin-left bg-gold" style={{ transform: 'scaleX(0)' }} />
        </div>
      </div>
    </div>
  )
}
