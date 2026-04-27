import ScrollReveal from '@/components/ui/ScrollReveal'

const STATS = [
  {
    value: '$5T+',
    line1: 'Global technology',
    line2: 'market — the space',
    line3: 'we are entering',
  },
  {
    value: '8',
    line1: 'Business objectives',
    line2: 'formally defined',
    line3: 'and registered',
  },
  {
    value: '∞',
    line1: 'Industries we',
    line2: 'can and will',
    line3: 'build in',
  },
  {
    value: '1',
    line1: 'Venture actively',
    line2: 'in development',
    line3: 'right now',
  },
]

export default function Stats() {
  return (
    <section
      aria-label="Key statistics"
      className="px-10 py-20 md:py-24"
      style={{ background: '#111009' }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((stat, i) => (
          <ScrollReveal key={stat.value} delay={i * 0.1}>
            <div
              className="flex flex-col items-center justify-center text-center gap-4 py-10 px-6"
              style={{
                border: '1px solid rgba(193,154,107,0.15)',
                background: 'rgba(193,154,107,0.03)',
              }}
            >
              <p
                className="font-jakarta font-extrabold"
                style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: '#C19A6B' }}
              >
                {stat.value}
              </p>
              <p className="font-dm text-xs leading-relaxed" style={{ color: 'rgba(250,247,242,0.38)' }}>
                {stat.line1}
                <br />
                {stat.line2}
                <br />
                {stat.line3}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
