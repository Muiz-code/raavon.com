import ScrollReveal from '@/components/ui/ScrollReveal'
import VentureCard from '@/components/ui/VentureCard'
import { VENTURES } from '@/lib/constants'

export default function Ventures() {
  return (
    <section
      id="ventures"
      className="px-6 md:px-12 py-28 md:py-36"
      style={{ background: 'var(--surface)' }}
      aria-labelledby="ventures-heading"
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="font-dm text-xs tracking-[0.25em] uppercase mb-4" style={{ color: '#C19A6B' }}>
            Our Ventures
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2
            id="ventures-heading"
            className="font-jakarta font-bold mb-14"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text)' }}
          >
            Every brand begins
            <br />
            <span
              className="font-fraunces italic font-light"
              style={{ color: '#C19A6B' }}
            >
              with one idea.
            </span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {VENTURES.map((v, i) => (
            <ScrollReveal key={v.name + i} delay={i * 0.12}>
              <VentureCard
                tag={v.tag}
                name={v.name}
                description={v.description}
                status={v.status}
                active={v.active}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* Empire statement */}
        <ScrollReveal delay={0.4}>
          <p
            className="font-fraunces italic text-center mt-16 mx-auto max-w-2xl leading-relaxed"
            style={{ color: '#D2B48C', fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}
          >
            &ldquo;Raavon is the studio. Each venture proves the model.
            Together they build the empire.&rdquo;
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
