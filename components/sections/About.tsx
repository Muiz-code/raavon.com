import ScrollReveal from '@/components/ui/ScrollReveal'
import { STAT_CARDS } from '@/lib/constants'

const INDUSTRIES = [
  'Financial Technology',
  'Fashion & Culture',
  'Digital Infrastructure',
  'AI & Automation',
]

export default function About() {
  return (
    <section
      id="about"
      className="px-10 py-28 md:py-36"
      aria-labelledby="about-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Two-column — 55% left / 45% right */}
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-16 md:gap-20 items-start mb-16 md:mb-20">

          {/* Left */}
          <div>
            <ScrollReveal>
              <p className="font-dm text-xs tracking-[0.25em] uppercase mb-6" style={{ color: '#C19A6B' }}>
                Who We Are
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2
                id="about-heading"
                className="font-jakarta font-bold leading-tight mb-8"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text)' }}
              >
                We don&apos;t just{' '}
                <br />
                <span
                  className="font-fraunces italic font-light"
                  style={{ color: '#C19A6B' }}
                >
                  build companies.
                </span>
                <br />
                We build legacies.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="font-dm leading-relaxed mb-5" style={{ color: 'var(--muted)', fontSize: '1.05rem' }}>
                Raavon is a global holding company built to bring ambitious ideas to life.
                We are not a consultancy. Not an agency. We are builders.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.28}>
              <p className="font-dm leading-relaxed mb-8" style={{ color: 'var(--muted)', fontSize: '1.05rem' }}>
                Every venture that carries the Raavon name is built with the same obsession:
                quality that makes people feel it was made specifically for them.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.36}>
              <ul className="flex flex-col gap-3">
                {INDUSTRIES.map((item) => (
                  <li key={item} className="flex items-center gap-3 font-dm text-sm" style={{ color: 'var(--muted)' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#C19A6B',
                        flexShrink: 0,
                      }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          {/* Right — floating quote card */}
          <ScrollReveal delay={0.2}>
            <div
              style={{
                transform: 'rotate(-1deg)',
                background: 'var(--card)',
                border: '1px solid rgba(193,154,107,0.25)',
                borderLeft: '2px solid #C19A6B',
                padding: '2.5rem',
                boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
                marginTop: '3rem',
              }}
            >
              <p
                className="font-fraunces italic leading-relaxed mb-6"
                style={{ color: 'var(--text)', fontSize: 'clamp(1.1rem, 2vw, 1.35rem)' }}
              >
                &ldquo;The greatest ideas are not invented —
                they are revealed. We reveal them.&rdquo;
              </p>
              <p
                className="font-dm text-xs tracking-[0.25em] uppercase"
                style={{ color: '#C19A6B' }}
              >
                — Raavon Group
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* 4 stat cards in a row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STAT_CARDS.map((card, i) => (
            <ScrollReveal key={card.label} delay={i * 0.08}>
              <div
                className="p-6 flex flex-col gap-2 transition-transform duration-300 hover:-translate-y-1"
                style={{
                  background: 'var(--card)',
                  borderLeft: '2px solid #C19A6B',
                  border: '1px solid var(--border)',
                  borderLeftWidth: '2px',
                  borderLeftColor: '#C19A6B',
                }}
              >
                <p className="font-dm text-xs tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
                  {card.label}
                </p>
                <p className="font-jakarta font-bold text-2xl" style={{ color: 'var(--text)' }}>
                  {card.value}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
