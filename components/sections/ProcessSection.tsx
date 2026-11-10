'use client'

import { useRef } from 'react'
import SectionIntro from '@/components/ui/SectionIntro'
import { process, timelineNote } from '@/content/engagement'
import { gsap, MOTION, useGSAP } from '@/lib/gsap'

/**
 * "How we work" as a scroll-driven sequence (GSAP ScrollTrigger).
 *
 * Tablet and desktop: the steps pin in the middle of the screen while the
 * rail fills from left to right. As it reaches each step, the dot fills
 * burgundy and that step comes into full focus.
 *
 * Phones: the vertical rail fills with scroll and each step activates as it
 * reaches the middle of the screen.
 *
 * Reduced motion or no JS: everything is shown, fully, with no pinning.
 */
export default function ProcessSection() {
  const list = useRef<HTMLOListElement>(null)
  const n = process.length

  useGSAP(
    () => {
      const ol = list.current
      if (!ol) return
      const dots = gsap.utils.toArray<HTMLElement>('[data-dot]', ol)
      const bodies = gsap.utils.toArray<HTMLElement>('[data-step-body]', ol)
      const activeDot = { backgroundColor: '#6f1d1b', borderColor: '#6f1d1b', scale: 1.4 }
      const idleDot = { backgroundColor: '#e3dccb', borderColor: '#0b0b0e', scale: 1 }

      const mm = gsap.matchMedia()

      mm.add(MOTION.desktopOk, () => {
        gsap.set(bodies.slice(1), { opacity: 0.28, y: 14 })
        gsap.set(dots.slice(1), idleDot)
        gsap.set(dots[0], activeDot)
        gsap.set('[data-fill-x]', { scaleX: 0 })

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: ol,
            pin: true,
            start: 'center center',
            end: () => `+=${Math.round(window.innerHeight * 0.55 * n)}`,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
        // The rail runs across the whole row: step i sits at i / n of the way.
        tl.to('[data-fill-x]', { scaleX: 1, duration: n }, 0)
        for (let i = 1; i < n; i++) {
          const at = i // step i sits i/n of the way along a rail that fills over n units
          tl.to(dots[i], { ...activeDot, duration: 0.3, ease: 'back.out(3)' }, at)
          tl.to(bodies[i], { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, at - 0.1)
        }
      })

      mm.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.set(bodies, { opacity: 0.28, y: 14 })
        gsap.set(dots, idleDot)
        gsap.fromTo(
          '[data-fill-y]',
          { scaleY: 0 },
          { scaleY: 1, ease: 'none', scrollTrigger: { trigger: ol, start: 'top 60%', end: 'bottom 60%', scrub: 0.5 } },
        )
        bodies.forEach((body, i) => {
          gsap.timeline({
            scrollTrigger: { trigger: body.parentElement, start: 'top 62%', toggleActions: 'play none none reverse' },
          })
            .to(dots[i], { ...activeDot, duration: 0.3, ease: 'back.out(3)' }, 0)
            .to(body, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0)
        })
      })
    },
    { scope: list },
  )

  return (
    <section id="process" aria-labelledby="process-title" className="surface-cream section bg-cream-raised">
      <div className="container-site">
        <SectionIntro id="process-title" eyebrow="How we work" title="A practical sequence." lead={timelineNote} />

        <ol ref={list} className="relative mt-16 grid gap-12 py-6 md:mt-20 md:grid-cols-4 md:gap-8 md:py-10">
          {/* Horizontal rail (tablet and up): faint track plus the scroll-filled line */}
          <span aria-hidden="true" className="absolute inset-x-0 top-[calc(2.5rem+0.4rem)] hidden h-px bg-(--line-strong) md:block" />
          <span
            aria-hidden="true"
            data-fill-x
            className="absolute inset-x-0 top-[calc(2.5rem+0.4rem)] hidden h-0.5 origin-left -translate-y-px bg-burgundy md:block"
          />
          {/* Vertical rail (phones) */}
          <span aria-hidden="true" className="absolute bottom-6 left-[0.4rem] top-8 w-px bg-(--line-strong) md:hidden" />
          <span
            aria-hidden="true"
            data-fill-y
            className="absolute bottom-6 left-[0.4rem] top-8 w-0.5 origin-top -translate-x-px bg-burgundy md:hidden"
          />

          {process.map((p) => (
            <li key={p.step} className="relative pl-9 md:pl-0 md:pt-12">
              <span
                aria-hidden="true"
                data-dot
                className="absolute left-0 top-1.5 z-10 size-3.5 rounded-full border-2 border-noir bg-cream-raised md:top-0"
              />
              <div data-step-body>
                <p className="tabular text-sm font-semibold text-burgundy">{p.step}</p>
                <h3 className="mt-3 text-xl font-extrabold leading-snug tracking-[-0.01em]">{p.title}</h3>
                <p className="mt-3 text-soft">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
