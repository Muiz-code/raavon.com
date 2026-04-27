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

interface Arrow { d: string; length: number }

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

  const paths = [
    // card 0 right-center → card 1 left-center
    `M ${a.right},${a.cy} C ${a.right + 50},${a.cy} ${b.left - 50},${b.cy} ${b.left},${b.cy}`,
    // card 1 bottom-center → card 2 top-center (big sweep back left)
    `M ${b.cx},${b.bottom} C ${b.cx},${b.bottom + 60} ${c.cx},${c.top - 60} ${c.cx},${c.top}`,
    // card 2 right-center → card 3 left-center
    `M ${c.right},${c.cy} C ${c.right + 50},${c.cy} ${d.left - 50},${d.cy} ${d.left},${d.cy}`,
  ]

  return paths.map((path) => {
    /* Approximate path length for stroke-dasharray animation */
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    el.setAttribute('d', path)
    document.body.appendChild(el)
    const len = el.getTotalLength()
    document.body.removeChild(el)
    return { d: path, length: len }
  })
}

/* Draws one arrow that animates its stroke when it enters the viewport */
function ArrowPath({ d, length }: Arrow) {
  const ref    = useRef<SVGPathElement>(null)
  const inView = useInView(ref, { once: true, margin: '-5% 0px' })

  return (
    <>
      <defs>
        <marker
          id="tip"
          markerWidth="9"
          markerHeight="9"
          refX="7"
          refY="4.5"
          orient="auto"
          markerUnits="strokeWidth"
        >
          {/* Solid filled arrowhead */}
          <path d="M0,1 L0,8 L8,4.5 z" fill="rgba(193,154,107,0.7)" />
        </marker>
      </defs>

      {/* Shadow / glow layer */}
      <path
        d={d}
        stroke="rgba(193,154,107,0.12)"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />

      {/* Animated stroke */}
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
        <div ref={containerRef} className="relative pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {PILLARS.map((pillar, i) => {
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

          {/* Animated arrows — desktop only */}
          {arrows.length > 0 && (
            <svg
              aria-hidden="true"
              className="absolute top-0 left-0 pointer-events-none overflow-visible hidden md:block"
              width="100%"
              height={svgHeight}
            >
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
