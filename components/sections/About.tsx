'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
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
      top:     rect.top    - base.top,
      bottom:  rect.bottom - base.top,
      left:    rect.left   - base.left,
      right:   rect.right  - base.left,
      cx:      rect.left   - base.left + rect.width  / 2,
      cy:      rect.top    - base.top  + rect.height / 2,
    }
  })
  if (r.some((x) => !x)) return []
  const [a, b, c, d] = r as NonNullable<(typeof r)[number]>[]

  return [
    // card 0 right-center → card 1 left-center
    { d: `M ${a.right},${a.cy} C ${a.right + 36},${a.cy} ${b.left - 36},${b.cy} ${b.left},${b.cy}` },
    // card 1 bottom-center → card 2 top-center (long diagonal sweep)
    { d: `M ${b.cx},${b.bottom} C ${b.cx},${b.bottom + 50} ${c.cx},${c.top - 50} ${c.cx},${c.top}` },
    // card 2 right-center → card 3 left-center
    { d: `M ${c.right},${c.cy} C ${c.right + 36},${c.cy} ${d.left - 36},${d.cy} ${d.left},${d.cy}` },
  ]
}

export default function About() {
  const containerRef  = useRef<HTMLDivElement>(null)
  const cardRefs      = useRef<(HTMLDivElement | null)[]>([null, null, null, null])
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
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <ScrollReveal>
          <p
            className="font-dm text-xs tracking-[0.25em] uppercase mb-4 text-center"
            style={{ color: '#C19A6B' }}
          >
            Who We Are
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2
            id="about-heading"
            className="font-jakarta font-bold text-center mb-20 leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text)' }}
          >
            We don&apos;t just build companies.{' '}
            <span className="font-fraunces italic font-light" style={{ color: '#C19A6B' }}>
              We build legacies.
            </span>
          </h2>
        </ScrollReveal>

        {/* Staggered cards */}
        <div ref={containerRef} className="relative pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {PILLARS.map((pillar, i) => {
              /* Desktop-only Y offsets via Tailwind arbitrary variants */
              const yClass = [
                '',
                'md:[transform:translateY(80px)]',
                '',
                'md:[transform:translateY(64px)]',
              ][i]

              return (
                <div
                  key={pillar.title}
                  className={yClass}
                  ref={(el) => { cardRefs.current[i] = el }}
                >
                  <ScrollReveal delay={i * 0.12}>
                    <div
                      className="p-8 md:p-10 rounded-2xl"
                      style={{
                        background: 'var(--card)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <h3
                        className="font-jakarta font-bold text-xl mb-4 text-center"
                        style={{ color: 'var(--text)' }}
                      >
                        {pillar.title}
                      </h3>
                      <p
                        className="font-dm text-sm leading-relaxed text-center mx-auto"
                        style={{ color: 'var(--muted)', maxWidth: '28ch' }}
                      >
                        {pillar.body}
                      </p>
                    </div>
                  </ScrollReveal>
                </div>
              )
            })}
          </div>

          {/* Arrows drawn from measured card positions — desktop only */}
          {arrows.length > 0 && (
            <svg
              aria-hidden="true"
              className="absolute top-0 left-0 pointer-events-none overflow-visible hidden md:block"
              width="100%"
              height={svgHeight}
            >
              <defs>
                <marker
                  id="tip"
                  markerWidth="7"
                  markerHeight="7"
                  refX="5"
                  refY="3.5"
                  orient="auto"
                >
                  <path d="M0,0.5 L0,6.5 L6,3.5 z" fill="rgba(193,154,107,0.55)" />
                </marker>
              </defs>
              {arrows.map((arrow, i) => (
                <path
                  key={i}
                  d={arrow.d}
                  stroke="rgba(193,154,107,0.4)"
                  strokeWidth="1.5"
                  fill="none"
                  markerEnd="url(#tip)"
                />
              ))}
            </svg>
          )}
        </div>
      </div>
    </section>
  )
}
