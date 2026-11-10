'use client'

import { usePathname } from 'next/navigation'
import { gsap, MOTION, ScrollTrigger, useGSAP } from '@/lib/gsap'

/**
 * Site-wide scroll behaviour, driven by GSAP ScrollTrigger:
 *
 *  .reveal            fades and rises in once, in staggered batches
 *  .draw-x            a rule whose length is scrubbed by scroll position
 *  .draw-y            the vertical equivalent
 *  [data-parallax=N]  drifts N% of its height while its section scrolls past
 *
 * Content is only hidden when JS runs and motion is allowed (globals.css),
 * and everything is revealed immediately for reduced-motion visitors.
 * Re-runs on every route change.
 */
export default function ScrollEffects() {
  const pathname = usePathname()

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(MOTION.ok, () => {
        ScrollTrigger.batch('.reveal', {
          start: 'top 90%',
          once: true,
          onEnter: (batch) => {
            batch.forEach((el) => el.classList.add('is-visible'))
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'expo.out',
              stagger: 0.08,
              overwrite: true,
            })
          },
        })

        gsap.utils.toArray<HTMLElement>('.draw-x, .draw-y').forEach((el) => {
          const vertical = el.classList.contains('draw-y')
          gsap.fromTo(
            el,
            vertical ? { scaleY: 0 } : { scaleX: 0 },
            {
              ...(vertical ? { scaleY: 1 } : { scaleX: 1 }),
              ease: 'none',
              scrollTrigger: {
                trigger: el.closest('[data-track]') ?? el,
                start: 'top 80%',
                end: el.closest('[data-track]') ? 'bottom 60%' : 'top 35%',
                scrub: 0.6,
              },
            },
          )
        })

        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
          const amount = Number(el.dataset.parallax) || 10
          gsap.fromTo(
            el,
            { yPercent: -amount / 2 },
            {
              yPercent: amount / 2,
              ease: 'none',
              scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        })
      })

      mm.add(MOTION.reduce, () => {
        gsap.set('.reveal', { opacity: 1, y: 0 })
        gsap.set('.draw-x', { scaleX: 1 })
        gsap.set('.draw-y', { scaleY: 1 })
      })

      // Images and fonts change layout after load; recalculate positions.
      const refresh = () => ScrollTrigger.refresh()
      window.addEventListener('load', refresh)
      document.fonts?.ready.then(refresh)
      return () => window.removeEventListener('load', refresh)
    },
    { dependencies: [pathname], revertOnUpdate: true },
  )

  return null
}
