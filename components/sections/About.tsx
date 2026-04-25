import ScrollReveal from '@/components/ui/ScrollReveal'
import { STAT_CARDS } from '@/lib/constants'

export default function About() {
  return (
    <section
      id="about"
      className="px-6 md:px-12 py-28 md:py-36"
      aria-labelledby="about-heading"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 md:gap-20 items-start">
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
              We build products
              <br />
              <span style={{ color: '#C19A6B' }}>people actually need.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="font-dm leading-relaxed" style={{ color: 'var(--muted)', fontSize: '1.05rem' }}>
              Raavon is a digital studio that builds products people actually need.
              We start with a problem, we build the solution, and we ship it.
              Kairo is our first product — and it is only the beginning.
            </p>
          </ScrollReveal>
        </div>

        {/* Right — stat cards */}
        <div className="grid grid-cols-2 gap-4">
          {STAT_CARDS.map((card, i) => (
            <ScrollReveal key={card.label} delay={i * 0.1}>
              <div
                className="p-6 flex flex-col gap-2"
                style={{
                  background: 'rgba(78,44,32,0.06)',
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
