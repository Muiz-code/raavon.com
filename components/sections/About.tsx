'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import ScrollReveal from '@/components/ui/ScrollReveal'

const PILLARS = [
  {
    title: 'Who We Are',
    body: 'A global holding company built to bring ambitious ideas to life across industries and continents.',
  },
  {
    title: 'Our Ventures',
    body: 'Spanning fintech, fashion, digital infrastructure, and AI — each venture built to define its category.',
  },
  {
    title: 'How We Build',
    body: "We don't consult. We embed, build with obsession, and deliver ventures that stand on their own.",
  },
  {
    title: 'Our Legacy',
    body: 'The greatest ideas are not invented — they are revealed. Every Raavon venture is built to outlast trends.',
  },
]

interface Arrow { d: string }

function buildArrows(
  cards: (HTMLDivElement | null)[],
  container: HTMLDivElement,
): Arrow[] {
  const base = container.getBoundingClientRect()
  const r = cards.map((c) => {
    const rect = c?.getBoundingClientRect()
    if (!rect) return null
    return {
      top:    rect.top    - base.top,
      bottom: rect.bottom - base.top,
      left:   rect.left   - base.left,
      right:  rect.right  - base.left,
      cx:     rect.left   - base.left + rect.width  / 2,
      cy:     rect.top    - base.top  + rect.height / 2,
    }
  })
  if (r.some((x) => !x)) return []
  const [a, b, c, d] = r as NonNullable<(typeof r)[number]>[]

  return [
    { d: `M ${a.right},${a.cy} C ${a.right + 40},${a.cy} ${b.left - 40},${b.cy} ${b.left},${b.cy}` },
    { d: `M ${b.cx},${b.bottom} C ${b.cx},${b.bottom + 55} ${c.cx},${c.top - 55} ${c.cx},${c.top}` },
    { d: `M ${c.right},${c.cy} C ${c.right + 40},${c.cy} ${d.left - 40},${d.cy} ${d.left},${d.cy}` },
  ]
}

function ArrowPath({ d }: Arrow) {
  const ref    = useRef<SVGPathElement>(null)
  const inView = useInView(ref, { once: true, margin: '-5% 0px' })

  return (
    <>
      <path d={d} stroke="rgba(193,154,107,0.1)" strokeWidth="6" fill="none" strokeLinecap="round" />
      <motion.path
        ref={ref}
        d={d}
        stroke="rgba(193,154,107,0.55)"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        markerEnd="url(#tip)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
      />
    </>
  )
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs     = useRef<(HTMLDivElement | null)[]>([null, null, null, null])
  const [arrows, setArrows]       = useState<Arrow[]>([])
  const [svgHeight, setSvgHeight] = useState(0)

  const measure = useCallback(() => {
    const el = containerRef.current
    if (!el || window.innerWidth < 768) { setArrows([]); return }
    setArrows(buildArrows(cardRefs.current, el))
    setSvgHeight(el.offsetHeight)
  }, [])

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  return (
    <section id="about" className="px-10 py-28 md:py-36" aria-labelledby="about-heading">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_1.5fr] gap-16 md:gap-20 items-center">

        {/* Left — text */}
        <div>
          <ScrollReveal>
            <p
              className="font-dm text-xs tracking-[0.25em] uppercase mb-5"
              style={{ color: '#C19A6B' }}
            >
              Who We Are
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2
              id="about-heading"
              className="font-jakarta font-bold leading-tight mb-7"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: 'var(--text)' }}
            >
              We don&apos;t just build companies.{' '}
              <span className="font-fraunces italic font-light" style={{ color: '#C19A6B' }}>
                We build legacies.
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p
              className="font-dm leading-relaxed mb-6"
              style={{ color: 'var(--muted)', fontSize: '1.05rem' }}
            >
              Raavon is a global holding company built to bring ambitious ideas to life.
              We are not a consultancy. Not an agency. We are builders.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.28}>
            <p
              className="font-dm leading-relaxed"
              style={{ color: 'var(--muted)', fontSize: '1.05rem' }}
            >
              Every venture that carries the Raavon name is built with the same obsession:
              quality that makes people feel it was made specifically for them.
            </p>
          </ScrollReveal>
        </div>

        {/* Right — staggered cards */}
        <div ref={containerRef} className="relative pb-16">
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {PILLARS.map((pillar, i) => {
              const yClass = [
                '',
                'md:[transform:translateY(60px)]',
                '',
                'md:[transform:translateY(48px)]',
              ][i]

              return (
                <div
                  key={pillar.title}
                  className={yClass}
                  ref={(el) => { cardRefs.current[i] = el }}
                >
                  <ScrollReveal delay={i * 0.12}>
                    <div
                      className="p-6 md:p-7 rounded-2xl h-full"
                      style={{
                        background: 'var(--card)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <h3
                        className="font-jakarta font-bold text-base mb-3 text-center"
                        style={{ color: 'var(--text)' }}
                      >
                        {pillar.title}
                      </h3>
                      <p
                        className="font-dm text-xs leading-relaxed text-center mx-auto"
                        style={{ color: 'var(--muted)' }}
                      >
                        {pillar.body}
                      </p>
                    </div>
                  </ScrollReveal>
                </div>
              )
            })}
          </div>

          {/* Animated arrows */}
          {arrows.length > 0 && (
            <svg
              aria-hidden="true"
              className="absolute top-0 left-0 pointer-events-none overflow-visible hidden md:block"
              width="100%"
              height={svgHeight}
            >
              <defs>
                <marker id="tip" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,1 L0,8 L8,4.5 z" fill="rgba(193,154,107,0.7)" />
                </marker>
              </defs>
              {arrows.map((arrow, i) => (
                <ArrowPath key={i} {...arrow} />
              ))}
            </svg>
          )}
        </div>

      </div>
    </section>
  )
}
