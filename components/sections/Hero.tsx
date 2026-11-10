'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import HeroRosette from '@/components/brand/HeroRosette'
import { gsap, MOTION, useGSAP } from '@/lib/gsap'

const d = (ms: number) => ({ '--d': `${ms}ms` }) as React.CSSProperties

const LINES = ['Ambitious ideas.', 'Thoughtfully built.']
const RADIUS = 190 // px of cursor influence around each letter

/** Splits a line into letters, keeping each word unbreakable. */
function SplitLine({ text }: { text: string }) {
  return text.split(' ').map((word, w, words) => (
    <span key={w} className="inline-block whitespace-nowrap">
      {word.split('').map((ch, c) => (
        <span key={c} className="hero-char">
          {ch}
        </span>
      ))}
      {w < words.length - 1 && <span className="inline-block">&nbsp;</span>}
    </span>
  ))
}

type Props = { now?: { label: string; href: string } }

export default function Hero({ now }: Props) {
  const section = useRef<HTMLElement>(null)
  const content = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = section.current
      if (!el) return
      const mm = gsap.matchMedia()

      // Cursor-reactive type and rosette drift (precise pointers only)
      mm.add(MOTION.finePointer, () => {
        const chars = gsap.utils.toArray<HTMLElement>('.hero-char', el)
        const setters = chars.map((c) => gsap.quickTo(c, '--p', { duration: 0.6, ease: 'power3.out' }))
        let centres: { x: number; y: number }[] = []
        const measure = () => {
          centres = chars.map((c) => {
            const r = c.getBoundingClientRect()
            return { x: r.left + r.width / 2 + window.scrollX, y: r.top + r.height / 2 + window.scrollY }
          })
        }

        const pointer = el.querySelector<HTMLElement>('[data-rosette-pointer]')
        const px = pointer && gsap.quickTo(pointer, 'x', { duration: 1.4, ease: 'power3.out' })
        const py = pointer && gsap.quickTo(pointer, 'y', { duration: 1.4, ease: 'power3.out' })
        const pr = pointer && gsap.quickTo(pointer, 'rotation', { duration: 1.6, ease: 'power3.out' })

        const onEnter = () => measure()
        const onMove = (e: PointerEvent) => {
          if (!centres.length) measure()
          for (let i = 0; i < chars.length; i++) {
            const dist = Math.hypot(e.pageX - centres[i].x, e.pageY - centres[i].y)
            const t = Math.max(0, 1 - dist / RADIUS)
            setters[i](t * t * (3 - 2 * t)) // smoothstep
          }
          const nx = e.clientX / window.innerWidth - 0.5
          const ny = e.clientY / window.innerHeight - 0.5
          px?.(nx * -36)
          py?.(ny * -28)
          pr?.(nx * 10)
        }
        const onLeave = () => {
          setters.forEach((s) => s(0))
          px?.(0)
          py?.(0)
          pr?.(0)
        }

        el.addEventListener('pointerenter', onEnter)
        el.addEventListener('pointermove', onMove)
        el.addEventListener('pointerleave', onLeave)
        window.addEventListener('resize', measure)
        return () => {
          el.removeEventListener('pointerenter', onEnter)
          el.removeEventListener('pointermove', onMove)
          el.removeEventListener('pointerleave', onLeave)
          window.removeEventListener('resize', measure)
        }
      })

      // Scroll: the rosette turns and the copy lifts away as the hero leaves
      mm.add(MOTION.ok, () => {
        const trigger = { trigger: el, start: 'top top', end: 'bottom top', scrub: true }
        gsap.to('[data-rosette-scroll]', { rotation: 55, scale: 1.08, ease: 'none', scrollTrigger: trigger })
        gsap.to(content.current, { yPercent: -18, opacity: 0.15, ease: 'none', scrollTrigger: trigger })
      })
    },
    { scope: section },
  )

  return (
    <section
      ref={section}
      aria-labelledby="hero-title"
      className="surface-noir relative flex min-h-svh flex-col overflow-hidden pt-28 md:justify-center md:pb-24 md:pt-32"
    >
      <div ref={content} className="container-site relative z-10">
        <div className="max-w-[44rem] lg:max-w-[52rem]">
          <p className="eyebrow hero-rise" style={d(0)}>
            The spirit behind every brand.
          </p>

          <h1 id="hero-title" className="display-hero mt-7">
            <span className="sr-only">{LINES.join(' ')}</span>
            {LINES.map((line, i) => (
              <span key={line} className="hero-line" aria-hidden="true">
                <span className="hero-rise block" style={d(60 + i * 100)}>
                  <SplitLine text={line} />
                </span>
              </span>
            ))}
          </h1>

          <p className="lead hero-rise mt-8 max-w-[34rem] text-soft" style={d(300)}>
            RaaVon builds digital products, creates ventures, and works with businesses to turn complex challenges
            into useful technology.
          </p>

          <div className="hero-rise mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4" style={d(400)}>
            <Link href="/contact" className="btn btn-primary">
              Build with us
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/ventures" className="btn btn-secondary">
              Explore our ventures
            </Link>
          </div>

          {now && (
            <p className="hero-rise mt-14 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-soft md:mt-20" style={d(520)}>
              <span className="status text-cream">Now building</span>
              <Link href={now.href} className="link text-cream">
                {now.label}
              </Link>
            </p>
          )}
        </div>
      </div>

      <HeroRosette />
    </section>
  )
}
